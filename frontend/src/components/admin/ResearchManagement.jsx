import React, { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, Search, Award, FileText, Save, X, Eye } from 'lucide-react'
import { researchAPI } from '../../services/api'
import toast from 'react-hot-toast'

const ResearchManagement = () => {
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [research, setResearch] = useState([])
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingResearch, setEditingResearch] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState('all')
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    objectives: [],
    methodology: '',
    keyFindings: [],
    researchTeam: [],
    duration: '',
    fundingAgency: '',
    budget: '',
    status: 'ongoing',
    publications: [],
    keywords: [],
    startDate: '',
    endDate: '',
    isPublished: true
  })

  const categories = [
    { value: 'project', label: 'Research Project' },
    { value: 'publication', label: 'Publication' },
    { value: 'collaboration', label: 'Collaboration' },
    { value: 'facility', label: 'Research Facility' }
  ]

  const statusOptions = [
    { value: 'ongoing', label: 'Ongoing' },
    { value: 'completed', label: 'Completed' },
    { value: 'proposed', label: 'Proposed' },
    { value: 'suspended', label: 'Suspended' }
  ]

  useEffect(() => {
    fetchResearch()
  }, [])

  const fetchResearch = async () => {
    try {
      setLoading(true)
      const response = await researchAPI.getAll()
      
      if (response.data.success) {
        setResearch(response.data.data.research || [])
      }
    } catch (error) {
      console.error('Error fetching research:', error)
      toast.error('Failed to load research topics')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleArrayInput = (field, value) => {
    const items = value.split('\n').filter(item => item.trim() !== '')
    setFormData(prev => ({
      ...prev,
      [field]: items
    }))
  }

  const resetForm = () => {
    setFormData({
      title: '',
      category: '',
      description: '',
      objectives: [],
      methodology: '',
      keyFindings: [],
      researchTeam: [],
      duration: '',
      fundingAgency: '',
      budget: '',
      status: 'ongoing',
      publications: [],
      keywords: [],
      startDate: '',
      endDate: '',
      isPublished: true
    })
    setEditingResearch(null)
  }

  const handleEdit = (item) => {
    setFormData({
      title: item.title || '',
      category: item.data?.category || '',
      description: item.data?.description || '',
      objectives: item.data?.objectives || [],
      methodology: item.data?.methodology || '',
      keyFindings: item.data?.keyFindings || [],
      researchTeam: item.data?.researchTeam || [],
      duration: item.data?.duration || '',
      fundingAgency: item.data?.fundingAgency || '',
      budget: item.data?.budget || '',
      status: item.data?.status || 'ongoing',
      publications: item.data?.publications || [],
      keywords: item.data?.keywords || [],
      startDate: item.data?.startDate || '',
      endDate: item.data?.endDate || '',
      isPublished: item.isPublished
    })
    setEditingResearch(item)
    setShowAddModal(true)
  }

  const handleSave = async () => {
    if (!formData.title.trim()) {
      toast.error('Research title is required')
      return
    }

    try {
      setSaving(true)
      
      // Transform frontend data to match backend Research model
      const data = {
        title: formData.title,
        description: formData.description,
        type: formData.category, // Map category to type
        status: formData.status,
        principalInvestigator: formData.researchTeam[0] || 'Not specified', // First team member as PI
        coInvestigators: formData.researchTeam.slice(1), // Rest as co-investigators
        department: 'College of Fishery', // Default department
        fundingAgency: formData.fundingAgency,
        budget: formData.budget ? parseFloat(formData.budget) : undefined,
        duration: {
          startDate: formData.startDate ? new Date(formData.startDate) : undefined,
          endDate: formData.endDate ? new Date(formData.endDate) : undefined
        },
        objectives: Array.isArray(formData.objectives) ? formData.objectives : 
                   formData.objectives ? formData.objectives.split('\n').filter(obj => obj.trim()) : [],
        methodology: formData.methodology,
        expectedOutcomes: Array.isArray(formData.keyFindings) ? formData.keyFindings : 
                         formData.keyFindings ? formData.keyFindings.split('\n').filter(finding => finding.trim()) : [],
        publications: Array.isArray(formData.publications) && formData.publications.length > 0 ? 
                     formData.publications.map(pub => {
                       if (typeof pub === 'string' && pub.trim()) {
                         // Convert string to publication object structure
                         return {
                           title: pub.trim(),
                           journal: '',
                           year: new Date().getFullYear(),
                           authors: [],
                           doi: '',
                           url: ''
                         }
                       }
                       return pub
                     }).filter(pub => pub && pub.title) : [],
        tags: Array.isArray(formData.keywords) ? formData.keywords :
              formData.keywords ? formData.keywords.split(',').map(k => k.trim()).filter(k => k) : [],
        isPublished: formData.isPublished
      }

      if (editingResearch) {
        await researchAPI.update(editingResearch._id, data)
        toast.success('Research updated successfully!')
      } else {
        await researchAPI.create(data)
        toast.success('Research added successfully!')
      }

      setShowAddModal(false)
      resetForm()
      fetchResearch()
    } catch (error) {
      console.error('Error saving research:', error)
      const message = error.response?.data?.message || 'Failed to save research'
      toast.error(message)
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (researchId) => {
    if (!window.confirm('Are you sure you want to delete this research topic?')) return

    try {
      await researchAPI.delete(researchId)
      toast.success('Research topic deleted successfully!')
      fetchResearch()
    } catch (error) {
      console.error('Error deleting research:', error)
      toast.error('Failed to delete research topic')
    }
  }

  const filteredResearch = research.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.data?.description?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === 'all' || item.data?.category === filterCategory
    return matchesSearch && matchesCategory
  })

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
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Search className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Research Topics & Projects</h2>
              <p className="text-sm text-gray-600">Manage ongoing and completed research projects</p>
            </div>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Research</span>
          </button>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-purple-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-600">Total Research</p>
                <p className="text-2xl font-bold text-purple-900">{research.length}</p>
              </div>
              <Search className="w-8 h-8 text-purple-600" />
            </div>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600">Ongoing</p>
                <p className="text-2xl font-bold text-green-900">
                  {research.filter(r => r.data?.status === 'ongoing').length}
                </p>
              </div>
              <Award className="w-8 h-8 text-green-600" />
            </div>
          </div>
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600">Completed</p>
                <p className="text-2xl font-bold text-blue-900">
                  {research.filter(r => r.data?.status === 'completed').length}
                </p>
              </div>
              <FileText className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <div className="bg-orange-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-orange-600">Published</p>
                <p className="text-2xl font-bold text-orange-900">
                  {research.filter(r => r.isPublished).length}
                </p>
              </div>
              <Eye className="w-8 h-8 text-orange-600" />
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search research topics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>
          <div>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Research List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Research Projects</h3>
        
        {filteredResearch.length === 0 ? (
          <div className="text-center py-12">
            <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">
              {searchTerm || filterCategory !== 'all' ? 'No research found matching your criteria' : 'No research topics added yet'}
            </p>
            {!searchTerm && filterCategory === 'all' && (
              <button
                onClick={() => setShowAddModal(true)}
                className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                Add First Research Topic
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredResearch.map((item) => (
              <div key={item._id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <h4 className="text-lg font-medium text-gray-900">{item.title}</h4>
                      <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                        {categories.find(cat => cat.value === item.data?.category)?.label}
                      </span>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        item.data?.status === 'ongoing' ? 'bg-green-100 text-green-800' :
                        item.data?.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                        item.data?.status === 'proposed' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {statusOptions.find(status => status.value === item.data?.status)?.label}
                      </span>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        item.isPublished 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-orange-100 text-orange-800'
                      }`}>
                        {item.isPublished ? 'Published' : 'Draft'}
                      </span>
                    </div>
                    
                    <p className="text-gray-700 text-sm mb-4 line-clamp-2">
                      {item.data?.description}
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                      {item.data?.duration && (
                        <div>
                          <p className="text-xs text-gray-500">Duration</p>
                          <p className="text-sm font-medium">{item.data.duration}</p>
                        </div>
                      )}
                      {item.data?.fundingAgency && (
                        <div>
                          <p className="text-xs text-gray-500">Funding Agency</p>
                          <p className="text-sm font-medium">{item.data.fundingAgency}</p>
                        </div>
                      )}
                      {item.data?.budget && (
                        <div>
                          <p className="text-xs text-gray-500">Budget</p>
                          <p className="text-sm font-medium text-green-600">₹{item.data.budget}</p>
                        </div>
                      )}
                      {item.data?.researchTeam?.length > 0 && (
                        <div>
                          <p className="text-xs text-gray-500">Team Size</p>
                          <p className="text-sm font-medium">{item.data.researchTeam.length} members</p>
                        </div>
                      )}
                    </div>
                    
                    {item.data?.keywords?.length > 0 && (
                      <div className="mb-3">
                        <p className="text-xs text-gray-500 mb-2">Keywords:</p>
                        <div className="flex flex-wrap gap-2">
                          {item.data.keywords.slice(0, 5).map((keyword, idx) => (
                            <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                              {keyword}
                            </span>
                          ))}
                          {item.data.keywords.length > 5 && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                              +{item.data.keywords.length - 5} more
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                    
                    {item.data?.publications?.length > 0 && (
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Publications: {item.data.publications.length}</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-4">
                    <button
                      onClick={() => handleEdit(item)}
                      className="p-2 text-gray-400 hover:text-purple-600"
                      title="Edit"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="p-2 text-gray-400 hover:text-red-600"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add/Edit Research Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-screen overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-medium text-gray-900">
                  {editingResearch ? 'Edit Research Topic' : 'Add New Research Topic'}
                </h3>
                <button
                  onClick={() => {
                    setShowAddModal(false)
                    resetForm()
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Basic Information */}
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Basic Information</h4>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Research Title *
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Research topic title"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category *
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => handleInputChange('category', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="">Select category</option>
                      {categories.map(category => (
                        <option key={category.value} value={category.value}>
                          {category.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Status
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) => handleInputChange('status', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      {statusOptions.map(status => (
                        <option key={status.value} value={status.value}>
                          {status.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Start Date
                      </label>
                      <input
                        type="date"
                        value={formData.startDate}
                        onChange={(e) => handleInputChange('startDate', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        End Date
                      </label>
                      <input
                        type="date"
                        value={formData.endDate}
                        onChange={(e) => handleInputChange('endDate', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Duration
                    </label>
                    <input
                      type="text"
                      value={formData.duration}
                      onChange={(e) => handleInputChange('duration', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="e.g., 2 Years"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Research Description *
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Detailed description of the research"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Research Objectives (One per line)
                    </label>
                    <textarea
                      value={formData.objectives.join('\n')}
                      onChange={(e) => handleArrayInput('objectives', e.target.value)}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="List research objectives"
                    />
                  </div>
                </div>

                {/* Additional Details */}
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Project Details</h4>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Funding Agency
                    </label>
                    <input
                      type="text"
                      value={formData.fundingAgency}
                      onChange={(e) => handleInputChange('fundingAgency', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="e.g., ICAR, DST, UGC"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Budget (in ₹)
                    </label>
                    <input
                      type="number"
                      value={formData.budget}
                      onChange={(e) => handleInputChange('budget', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Total budget amount"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Research Team (One per line)
                    </label>
                    <textarea
                      value={formData.researchTeam.join('\n')}
                      onChange={(e) => handleArrayInput('researchTeam', e.target.value)}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Dr. Name (Principal Investigator)&#10;Dr. Name (Co-Investigator)"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Methodology
                    </label>
                    <textarea
                      value={formData.methodology}
                      onChange={(e) => handleInputChange('methodology', e.target.value)}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Research methodology and approach"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Key Findings (One per line)
                    </label>
                    <textarea
                      value={formData.keyFindings.join('\n')}
                      onChange={(e) => handleArrayInput('keyFindings', e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Key research findings (if completed)"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Publications (One per line)
                    </label>
                    <textarea
                      value={formData.publications.join('\n')}
                      onChange={(e) => handleArrayInput('publications', e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Related publications"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Keywords (One per line)
                    </label>
                    <textarea
                      value={formData.keywords.join('\n')}
                      onChange={(e) => handleArrayInput('keywords', e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Research keywords"
                    />
                  </div>

                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      id="publishResearch"
                      checked={formData.isPublished}
                      onChange={(e) => handleInputChange('isPublished', e.target.checked)}
                      className="w-4 h-4 text-purple-600 rounded"
                    />
                    <label htmlFor="publishResearch" className="text-sm text-gray-700">
                      Publish research topic on website
                    </label>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-3 mt-8 pt-6 border-t border-gray-200">
                <button
                  onClick={() => {
                    setShowAddModal(false)
                    resetForm()
                  }}
                  className="px-6 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  {saving ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      <span>{editingResearch ? 'Update' : 'Save'} Research</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ResearchManagement





