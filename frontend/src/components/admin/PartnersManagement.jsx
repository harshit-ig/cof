import React, { useState, useEffect } from 'react'
import { 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  Filter, 
  Upload, 
  Save, 
  X, 
  ExternalLink,
  Eye,
  EyeOff,
  Move,
  Globe
} from 'lucide-react'
import toast from 'react-hot-toast'
import { partnersAPI, uploadAPI } from '../../services/api'

const PartnersManagement = () => {
  const [partners, setPartners] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [showForm, setShowForm] = useState(false)
  const [editingPartner, setEditingPartner] = useState(null)
  const [selectedPartners, setSelectedPartners] = useState([])

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    altText: '',
    link: '',
    description: '',
    category: 'other',
    isActive: true,
    order: 0
  })
  const [logoFile, setLogoFile] = useState(null)
  const [logoPreview, setLogoPreview] = useState('')
  const [saving, setSaving] = useState(false)

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'government', label: 'Government' },
    { value: 'research', label: 'Research' },
    { value: 'industry', label: 'Industry' },
    { value: 'academic', label: 'Academic' },
    { value: 'other', label: 'Other' }
  ]

  const statuses = [
    { value: 'all', label: 'All Status' },
    { value: 'true', label: 'Active' },
    { value: 'false', label: 'Inactive' }
  ]

  useEffect(() => {
    fetchPartners()
  }, [searchTerm, selectedCategory, selectedStatus])

  const fetchPartners = async () => {
    try {
      setLoading(true)
      const response = await partnersAPI.getAllAdmin({
        search: searchTerm,
        category: selectedCategory !== 'all' ? selectedCategory : undefined,
        active: selectedStatus !== 'all' ? selectedStatus : undefined,
        limit: 50
      })

      if (response.data.success) {
        setPartners(response.data.data.partners)
      }
    } catch (error) {
      console.error('Error fetching partners:', error)
      toast.error('Failed to fetch partners')
    } finally {
      setLoading(false)
    }
  }

  const handleCreateNew = () => {
    setFormData({
      name: '',
      altText: '',
      link: '',
      description: '',
      category: 'other',
      isActive: true,
      order: partners.length
    })
    setLogoFile(null)
    setLogoPreview('')
    setEditingPartner(null)
    setShowForm(true)
  }

  const handleEdit = (partner) => {
    setFormData({
      name: partner.name,
      altText: partner.altText,
      link: partner.link,
      description: partner.description || '',
      category: partner.category,
      isActive: partner.isActive,
      order: partner.order
    })
    setLogoFile(null)
    setLogoPreview(uploadAPI.getImageUrl(partner.logo, 'partners'))
    setEditingPartner(partner)
    setShowForm(true)
  }

  const handleLogoSelect = (e) => {
    const file = e.target.files[0]
    if (file) {
      setLogoFile(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setLogoPreview(e.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)

    try {
      const submitData = new FormData()
      Object.keys(formData).forEach(key => {
        submitData.append(key, formData[key])
      })

      if (logoFile) {
        submitData.append('logo', logoFile)
      } else if (editingPartner && !logoFile) {
        submitData.append('logo', editingPartner.logo)
      }

      let response
      if (editingPartner) {
        response = await partnersAPI.update(editingPartner._id, submitData)
      } else {
        response = await partnersAPI.create(submitData)
      }

      if (response.data.success) {
        toast.success(editingPartner ? 'Partner updated successfully!' : 'Partner created successfully!')
        setShowForm(false)
        fetchPartners()
      }
    } catch (error) {
      console.error('Error saving partner:', error)
      toast.error('Failed to save partner')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (partnerId) => {
    if (!window.confirm('Are you sure you want to delete this partner?')) return

    try {
      const response = await partnersAPI.delete(partnerId)
      if (response.data.success) {
        toast.success('Partner deleted successfully!')
        fetchPartners()
      }
    } catch (error) {
      console.error('Error deleting partner:', error)
      toast.error('Failed to delete partner')
    }
  }

  const handleBulkDelete = async () => {
    if (selectedPartners.length === 0) return
    
    if (!window.confirm(`Are you sure you want to delete ${selectedPartners.length} partners?`)) return

    try {
      const response = await partnersAPI.bulkDelete(selectedPartners)
      if (response.data.success) {
        toast.success(`${selectedPartners.length} partners deleted successfully!`)
        setSelectedPartners([])
        fetchPartners()
      }
    } catch (error) {
      console.error('Error bulk deleting partners:', error)
      toast.error('Failed to delete partners')
    }
  }

  const togglePartnerSelection = (partnerId) => {
    setSelectedPartners(prev => 
      prev.includes(partnerId) 
        ? prev.filter(id => id !== partnerId)
        : [...prev, partnerId]
    )
  }

  const selectAllPartners = () => {
    if (selectedPartners.length === partners.length) {
      setSelectedPartners([])
    } else {
      setSelectedPartners(partners.map(p => p._id))
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Partners Management</h1>
            <p className="text-gray-600 mt-1">Manage partner organizations and their logos</p>
          </div>
          <button
            onClick={handleCreateNew}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Partner</span>
          </button>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search partners..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
            />
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {categories.map(category => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {statuses.map(status => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </select>

          {selectedPartners.length > 0 && (
            <button
              onClick={handleBulkDelete}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 flex items-center space-x-2"
            >
              <Trash2 className="w-4 h-4" />
              <span>Delete ({selectedPartners.length})</span>
            </button>
          )}
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {partners.map((partner) => (
            <div
              key={partner._id}
              className={`bg-gray-50 rounded-lg p-4 border-2 transition-all ${
                selectedPartners.includes(partner._id) 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <input
                  type="checkbox"
                  checked={selectedPartners.includes(partner._id)}
                  onChange={() => togglePartnerSelection(partner._id)}
                  className="mt-1"
                />
                <div className="flex space-x-1">
                  {partner.isActive ? (
                    <Eye className="w-4 h-4 text-green-500" />
                  ) : (
                    <EyeOff className="w-4 h-4 text-gray-400" />
                  )}
                </div>
              </div>

              <div className="text-center mb-3">
                <img
                  src={uploadAPI.getImageUrl(partner.logo, 'partners')}
                  alt={partner.altText}
                  className="w-16 h-16 object-contain mx-auto rounded-lg border border-gray-200 bg-white p-2"
                  onError={(e) => {
                    e.target.style.display = 'none'
                    e.target.nextSibling.style.display = 'flex'
                  }}
                />
                <div className="hidden w-16 h-16 items-center justify-center mx-auto rounded-lg border border-gray-200 bg-white text-xs text-gray-400">
                  {partner.name}
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium text-gray-900 text-sm truncate">
                  {partner.name}
                </h3>
                <p className="text-xs text-gray-600 capitalize">
                  {partner.category}
                </p>
                {partner.description && (
                  <p className="text-xs text-gray-600 line-clamp-2">
                    {partner.description}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-200">
                <a
                  href={partner.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(partner)}
                    className="text-blue-600 hover:text-blue-700"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(partner._id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {partners.length === 0 && (
          <div className="text-center py-12">
            <Globe className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No partners found</p>
          </div>
        )}
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <form onSubmit={handleSubmit} className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  {editingPartner ? 'Edit Partner' : 'Add New Partner'}
                </h2>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Partner Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {categories.slice(1).map(category => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Alt Text *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.altText}
                    onChange={(e) => setFormData({...formData, altText: e.target.value})}
                    placeholder="Logo alt text for accessibility"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Website Link *
                  </label>
                  <input
                    type="url"
                    required
                    value={formData.link}
                    onChange={(e) => setFormData({...formData, link: e.target.value})}
                    placeholder="https://example.com"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Order
                  </label>
                  <input
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData({...formData, order: parseInt(e.target.value) || 0})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    value={formData.isActive}
                    onChange={(e) => setFormData({...formData, isActive: e.target.value === 'true'})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="true">Active</option>
                    <option value="false">Inactive</option>
                  </select>
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Optional description of the partner organization"
                />
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Logo {!editingPartner && '*'}
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoSelect}
                    className="hidden"
                    id="logo-upload"
                    required={!editingPartner}
                  />
                  <label
                    htmlFor="logo-upload"
                    className="cursor-pointer flex flex-col items-center space-y-2"
                  >
                    {logoPreview ? (
                      <img
                        src={logoPreview}
                        alt="Logo preview"
                        className="w-24 h-24 object-contain border border-gray-200 rounded-lg"
                      />
                    ) : (
                      <Upload className="w-8 h-8 text-gray-400" />
                    )}
                    <span className="text-sm text-gray-600">
                      {logoPreview ? 'Click to change logo' : 'Click to upload logo'}
                    </span>
                  </label>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-8">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center space-x-2"
                >
                  {saving ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      <span>{editingPartner ? 'Update' : 'Create'}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default PartnersManagement
