import React, { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, Search, Building, MapPin, Calendar, Users } from 'lucide-react'
import { infrastructureAPI } from '../../services/api'
import LoadingSpinner from '../common/LoadingSpinner'
import Modal from '../common/Modal'
import ImageUpload from './ImageUpload'
import toast from 'react-hot-toast'

const InfrastructureManagement = () => {
  const [infrastructure, setInfrastructure] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [editingInfrastructure, setEditingInfrastructure] = useState(null)
  const [deletingInfrastructure, setDeletingInfrastructure] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [pagination, setPagination] = useState({})

  const [formData, setFormData] = useState({
    name: '',
    type: '',
    description: '',
    location: '',
    capacity: '',
    area: '',
    yearBuilt: '',
    currentStatus: '',
    facilities: '',
    equipment: '',
    usage: '',
    maintenanceSchedule: '',
    contact: '',
    images: [],
    isActive: true,
    isPublic: true
  })

  const infrastructureTypes = [
    'Academic Building',
    'Laboratory',
    'Library',
    'Hostel',
    'Cafeteria',
    'Sports Facility',
    'Auditorium',
    'Conference Hall',
    'Administrative Building',
    'Research Center',
    'Workshop',
    'Seminar Hall',
    'Computer Center',
    'Medical Center',
    'Other'
  ]

  const statusOptions = [
    'Excellent',
    'Good',
    'Fair',
    'Under Maintenance',
    'Under Construction',
    'Renovation Required'
  ]

  useEffect(() => {
    fetchInfrastructure()
  }, [searchTerm])

  const fetchInfrastructure = async () => {
    try {
      setLoading(true)
      const params = {}
      if (searchTerm) params.search = searchTerm
      
      const response = await infrastructureAPI.getAll(params)
      setInfrastructure(response.data.data.infrastructure || [])
      setPagination(response.data.data.pagination || {})
    } catch (error) {
      console.error('Error fetching infrastructure:', error)
      toast.error('Failed to fetch infrastructure')
      setInfrastructure([])
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setFormData({
      name: '',
      type: '',
      description: '',
      location: '',
      capacity: '',
      area: '',
      yearBuilt: '',
      currentStatus: '',
      facilities: '',
      equipment: '',
      usage: '',
      maintenanceSchedule: '',
      contact: '',
      images: [],
      isActive: true,
      isPublic: true
    })
    setEditingInfrastructure(null)
  }

  const handleOpenModal = (infraItem = null) => {
    if (infraItem) {
      setEditingInfrastructure(infraItem)
      setFormData({
        ...infraItem,
        facilities: Array.isArray(infraItem.facilities) ? infraItem.facilities.join(', ') : infraItem.facilities || '',
        equipment: Array.isArray(infraItem.equipment) ? infraItem.equipment.join(', ') : infraItem.equipment || '',
        images: infraItem.images || []
      })
    } else {
      resetForm()
    }
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    resetForm()
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleImageUpload = (uploadedFile) => {
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, {
        url: uploadedFile.filename,
        caption: ''
      }]
    }))
    toast.success('Image uploaded successfully!')
  }

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }))
  }

  const updateImageCaption = (index, caption) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.map((img, i) => 
        i === index ? { ...img, caption } : img
      )
    }))
  }

  const parseArrayField = (field) => {
    if (!field) return []
    return field.split(',').map(item => item.trim()).filter(item => item)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const submitData = {
        ...formData,
        facilities: parseArrayField(formData.facilities),
        equipment: parseArrayField(formData.equipment),
        capacity: formData.capacity ? parseInt(formData.capacity) : undefined,
        area: formData.area ? parseFloat(formData.area) : undefined,
        yearBuilt: formData.yearBuilt ? parseInt(formData.yearBuilt) : undefined
      }

      if (editingInfrastructure) {
        await infrastructureAPI.update(editingInfrastructure._id, submitData)
        toast.success('Infrastructure updated successfully!')
      } else {
        await infrastructureAPI.create(submitData)
        toast.success('Infrastructure created successfully!')
      }

      handleCloseModal()
      fetchInfrastructure()
    } catch (error) {
      console.error('Error saving infrastructure:', error)
      toast.error(error.response?.data?.message || 'Failed to save infrastructure')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async () => {
    if (!deletingInfrastructure) return

    try {
      await infrastructureAPI.delete(deletingInfrastructure._id)
      toast.success('Infrastructure deleted successfully!')
      setShowDeleteModal(false)
      setDeletingInfrastructure(null)
      fetchInfrastructure()
    } catch (error) {
      console.error('Error deleting infrastructure:', error)
      toast.error('Failed to delete infrastructure')
    }
  }

  const getImageUrl = (filename) => {
    if (!filename) return null
    return `/api/upload/serve/images/${filename}`
  }

  const filteredInfrastructure = infrastructure.filter(item =>
    item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.location?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Infrastructure Management</h1>
        <button
          onClick={() => handleOpenModal()}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700"
        >
          <Plus className="h-4 w-4" />
          <span>Add Infrastructure</span>
        </button>
      </div>

      {/* Search */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search infrastructure..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Infrastructure Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredInfrastructure.map((item) => (
          <div key={item._id} className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Infrastructure Image */}
            <div className="h-48 bg-gray-200 relative">
              {item.images && item.images.length > 0 ? (
                <img
                  src={getImageUrl(item.images[0].url)}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Building className="h-16 w-16 text-gray-400" />
                </div>
              )}
              <div className="absolute top-2 right-2 space-x-1">
                <button
                  onClick={() => handleOpenModal(item)}
                  className="p-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                  title="Edit"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  onClick={() => {
                    setDeletingInfrastructure(item)
                    setShowDeleteModal(true)
                  }}
                  className="p-1 bg-red-600 text-white rounded hover:bg-red-700"
                  title="Delete"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <div className="absolute top-2 left-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  item.currentStatus === 'Excellent' ? 'bg-green-100 text-green-800' :
                  item.currentStatus === 'Good' ? 'bg-blue-100 text-blue-800' :
                  item.currentStatus === 'Fair' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {item.currentStatus}
                </span>
              </div>
            </div>

            {/* Infrastructure Info */}
            <div className="p-4">
              <h3 className="font-semibold text-lg text-gray-900 mb-2">{item.name}</h3>
              
              <div className="space-y-2 text-sm text-gray-600 mb-3">
                <div className="flex items-center">
                  <Building className="h-4 w-4 mr-2" />
                  <span>{item.type}</span>
                </div>
                
                {item.location && (
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span className="truncate">{item.location}</span>
                  </div>
                )}
                
                {item.capacity && (
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2" />
                    <span>Capacity: {item.capacity}</span>
                  </div>
                )}
                
                {item.yearBuilt && (
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>Built: {item.yearBuilt}</span>
                  </div>
                )}
              </div>

              <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                {item.description}
              </p>

              <div className="flex items-center justify-between">
                {item.area && (
                  <span className="text-sm font-medium text-gray-900">
                    {item.area} sq ft
                  </span>
                )}
                
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    item.isActive 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {item.isActive ? 'Active' : 'Inactive'}
                  </span>
                  {item.isPublic && (
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                      Public
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredInfrastructure.length === 0 && (
        <div className="text-center py-12">
          <Building className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No infrastructure found</h3>
          <p className="text-gray-500 mb-4">
            {searchTerm ? 'Try adjusting your search criteria' : 'Get started by adding your first infrastructure'}
          </p>
          {!searchTerm && (
            <button
              onClick={() => handleOpenModal()}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Add Infrastructure
            </button>
          )}
        </div>
      )}

      {/* Add/Edit Modal */}
      <Modal
        isOpen={showModal}
        onClose={handleCloseModal}
        title={editingInfrastructure ? 'Edit Infrastructure' : 'Add Infrastructure'}
        size="large"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Infrastructure name..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type *
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select type</option>
                  {infrastructureTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Current Status
                </label>
                <select
                  name="currentStatus"
                  value={formData.currentStatus}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select status</option>
                  {statusOptions.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Infrastructure description..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Location details..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contact Person
                </label>
                <input
                  type="text"
                  name="contact"
                  value={formData.contact}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Contact person..."
                />
              </div>
            </div>
          </div>

          {/* Physical Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Physical Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Capacity
                </label>
                <input
                  type="number"
                  name="capacity"
                  value={formData.capacity}
                  onChange={handleInputChange}
                  min="1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Maximum capacity..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Area (sq ft)
                </label>
                <input
                  type="number"
                  name="area"
                  value={formData.area}
                  onChange={handleInputChange}
                  min="0"
                  step="0.01"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Total area..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Year Built
                </label>
                <input
                  type="number"
                  name="yearBuilt"
                  value={formData.yearBuilt}
                  onChange={handleInputChange}
                  min="1900"
                  max={new Date().getFullYear()}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Construction year..."
                />
              </div>
            </div>
          </div>

          {/* Facilities & Equipment */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Facilities & Equipment</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Facilities
              </label>
              <input
                type="text"
                name="facilities"
                value={formData.facilities}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Separate facilities with commas..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Equipment
              </label>
              <input
                type="text"
                name="equipment"
                value={formData.equipment}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Separate equipment with commas..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Usage
              </label>
              <textarea
                name="usage"
                value={formData.usage}
                onChange={handleInputChange}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="How this infrastructure is used..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Maintenance Schedule
              </label>
              <textarea
                name="maintenanceSchedule"
                value={formData.maintenanceSchedule}
                onChange={handleInputChange}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Maintenance schedule and notes..."
              />
            </div>
          </div>

          {/* Images */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Infrastructure Images
            </label>
            <ImageUpload
              onUploadSuccess={handleImageUpload}
              uploadType="images"
              maxFiles={5}
              acceptedTypes="image/*"
              showPreview={false}
            />
            
            {formData.images.length > 0 && (
              <div className="mt-4 space-y-3">
                <h4 className="text-sm font-medium text-gray-700">Uploaded Images:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {formData.images.map((image, index) => (
                    <div key={index} className="border rounded-lg p-3">
                      <div className="flex space-x-3">
                        <img
                          src={getImageUrl(image.url)}
                          alt={image.caption || 'Infrastructure image'}
                          className="w-20 h-20 object-cover rounded"
                        />
                        <div className="flex-1 space-y-2">
                          <input
                            type="text"
                            placeholder="Image caption..."
                            value={image.caption}
                            onChange={(e) => updateImageCaption(index, e.target.value)}
                            className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="text-red-600 text-sm hover:text-red-800"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Settings */}
          <div className="flex items-center space-x-6">
            <div className="flex items-center">
              <input
                type="checkbox"
                name="isActive"
                id="isActive"
                checked={formData.isActive}
                onChange={handleInputChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="isActive" className="ml-2 text-sm text-gray-700">
                Active
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                name="isPublic"
                id="isPublic"
                checked={formData.isPublic}
                onChange={handleInputChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="isPublic" className="ml-2 text-sm text-gray-700">
                Public Access
              </label>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex justify-end space-x-3 pt-6 border-t">
            <button
              type="button"
              onClick={handleCloseModal}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              {submitting && <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>}
              <span>{editingInfrastructure ? 'Update' : 'Create'} Infrastructure</span>
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false)
          setDeletingInfrastructure(null)
        }}
        title="Delete Infrastructure"
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            Are you sure you want to delete <strong>{deletingInfrastructure?.name}</strong>? 
            This action cannot be undone.
          </p>
          <div className="flex justify-end space-x-3">
            <button
              onClick={() => {
                setShowDeleteModal(false)
                setDeletingInfrastructure(null)
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default InfrastructureManagement
