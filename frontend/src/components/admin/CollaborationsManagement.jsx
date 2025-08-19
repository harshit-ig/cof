import React, { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, Search, Users, Building, Globe, Calendar, ExternalLink } from 'lucide-react'
import { collaborationsAPI } from '../../services/api'
import LoadingSpinner from '../common/LoadingSpinner'
import Modal from '../common/Modal'
import ImageUpload from './ImageUpload'
import toast from 'react-hot-toast'

const CollaborationsManagement = () => {
  const [collaborations, setCollaborations] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [editingCollaboration, setEditingCollaboration] = useState(null)
  const [deletingCollaboration, setDeletingCollaboration] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [pagination, setPagination] = useState({})

  const [formData, setFormData] = useState({
    partnerName: '',
    partnerType: '',
    collaborationType: '',
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    status: '',
    contactPerson: '',
    contactEmail: '',
    contactPhone: '',
    partnerWebsite: '',
    partnerLogo: '',
    agreementDetails: '',
    objectives: '',
    expectedOutcomes: '',
    resources: '',
    location: '',
    scope: '',
    benefits: '',
    challenges: '',
    progress: '',
    isActive: true,
    isPublic: true,
    isFeatured: false
  })

  const partnerTypes = [
    'University',
    'College',
    'Research Institute',
    'Industry',
    'Government Agency',
    'NGO',
    'International Organization',
    'Startup',
    'Corporate',
    'Foundation',
    'Hospital',
    'Laboratory',
    'Other'
  ]

  const collaborationTypes = [
    'Research Collaboration',
    'Academic Exchange',
    'Student Exchange',
    'Faculty Exchange',
    'Joint Degree Program',
    'Internship Program',
    'Industry Partnership',
    'Technology Transfer',
    'Consulting Project',
    'Training Program',
    'Workshop/Seminar',
    'Conference',
    'Publication',
    'Grant Collaboration',
    'Infrastructure Sharing',
    'Other'
  ]

  const statusOptions = [
    'Planning',
    'Active',
    'Completed',
    'On Hold',
    'Cancelled',
    'Renewed'
  ]

  const scopeOptions = [
    'Local',
    'Regional',
    'National',
    'International'
  ]

  useEffect(() => {
    fetchCollaborations()
  }, [searchTerm])

  const fetchCollaborations = async () => {
    try {
      setLoading(true)
      const params = {}
      if (searchTerm) params.search = searchTerm
      
      const response = await collaborationsAPI.getAll(params)
      setCollaborations(response.data.data.collaborations || [])
      setPagination(response.data.data.pagination || {})
    } catch (error) {
      console.error('Error fetching collaborations:', error)
      toast.error('Failed to fetch collaborations')
      setCollaborations([])
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setFormData({
      partnerName: '',
      partnerType: '',
      collaborationType: '',
      title: '',
      description: '',
      startDate: '',
      endDate: '',
      status: '',
      contactPerson: '',
      contactEmail: '',
      contactPhone: '',
      partnerWebsite: '',
      partnerLogo: '',
      agreementDetails: '',
      objectives: '',
      expectedOutcomes: '',
      resources: '',
      location: '',
      scope: '',
      benefits: '',
      challenges: '',
      progress: '',
      isActive: true,
      isPublic: true,
      isFeatured: false
    })
    setEditingCollaboration(null)
  }

  const handleOpenModal = (collaboration = null) => {
    if (collaboration) {
      setEditingCollaboration(collaboration)
      setFormData({
        ...collaboration,
        startDate: collaboration.startDate ? collaboration.startDate.split('T')[0] : '',
        endDate: collaboration.endDate ? collaboration.endDate.split('T')[0] : '',
        objectives: Array.isArray(collaboration.objectives) ? collaboration.objectives.join(', ') : collaboration.objectives || '',
        expectedOutcomes: Array.isArray(collaboration.expectedOutcomes) ? collaboration.expectedOutcomes.join(', ') : collaboration.expectedOutcomes || '',
        resources: Array.isArray(collaboration.resources) ? collaboration.resources.join(', ') : collaboration.resources || '',
        benefits: Array.isArray(collaboration.benefits) ? collaboration.benefits.join(', ') : collaboration.benefits || ''
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

  const handleLogoUpload = (uploadedFile) => {
    setFormData(prev => ({
      ...prev,
      partnerLogo: uploadedFile.filename
    }))
    toast.success('Logo uploaded successfully!')
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
        objectives: parseArrayField(formData.objectives),
        expectedOutcomes: parseArrayField(formData.expectedOutcomes),
        resources: parseArrayField(formData.resources),
        benefits: parseArrayField(formData.benefits)
      }

      if (editingCollaboration) {
        await collaborationsAPI.update(editingCollaboration._id, submitData)
        toast.success('Collaboration updated successfully!')
      } else {
        await collaborationsAPI.create(submitData)
        toast.success('Collaboration created successfully!')
      }

      handleCloseModal()
      fetchCollaborations()
    } catch (error) {
      console.error('Error saving collaboration:', error)
      toast.error(error.response?.data?.message || 'Failed to save collaboration')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async () => {
    if (!deletingCollaboration) return

    try {
      await collaborationsAPI.delete(deletingCollaboration._id)
      toast.success('Collaboration deleted successfully!')
      setShowDeleteModal(false)
      setDeletingCollaboration(null)
      fetchCollaborations()
    } catch (error) {
      console.error('Error deleting collaboration:', error)
      toast.error('Failed to delete collaboration')
    }
  }

  const getImageUrl = (filename) => {
    if (!filename) return null
    return `/api/upload/serve/images/${filename}`
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A'
    return new Date(dateString).toLocaleDateString()
  }

  const getStatusColor = (status) => {
    const colors = {
      'Planning': 'bg-yellow-100 text-yellow-800',
      'Active': 'bg-green-100 text-green-800',
      'Completed': 'bg-blue-100 text-blue-800',
      'On Hold': 'bg-orange-100 text-orange-800',
      'Cancelled': 'bg-red-100 text-red-800',
      'Renewed': 'bg-purple-100 text-purple-800'
    }
    return colors[status] || 'bg-gray-100 text-gray-800'
  }

  const filteredCollaborations = collaborations.filter(item =>
    item.partnerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.collaborationType?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.partnerType?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Collaborations Management</h1>
        <button
          onClick={() => handleOpenModal()}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700"
        >
          <Plus className="h-4 w-4" />
          <span>Add Collaboration</span>
        </button>
      </div>

      {/* Search */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search collaborations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Collaborations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCollaborations.map((collaboration) => (
          <div key={collaboration._id} className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Header with Logo */}
            <div className="p-4 border-b">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  {collaboration.partnerLogo ? (
                    <img
                      src={getImageUrl(collaboration.partnerLogo)}
                      alt={collaboration.partnerName}
                      className="w-12 h-12 object-cover rounded-full"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                      <Building className="h-6 w-6 text-gray-400" />
                    </div>
                  )}
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900">{collaboration.partnerName}</h3>
                    <p className="text-sm text-gray-600">{collaboration.partnerType}</p>
                  </div>
                </div>
                
                <div className="flex space-x-1">
                  <button
                    onClick={() => handleOpenModal(collaboration)}
                    className="p-1 text-gray-400 hover:text-blue-600"
                    title="Edit"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => {
                      setDeletingCollaboration(collaboration)
                      setShowDeleteModal(true)
                    }}
                    className="p-1 text-gray-400 hover:text-red-600"
                    title="Delete"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              <h4 className="font-medium text-gray-900 mb-2">{collaboration.title}</h4>
              
              <div className="space-y-2 text-sm text-gray-600 mb-3">
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2" />
                  <span>{collaboration.collaborationType}</span>
                </div>
                
                {collaboration.scope && (
                  <div className="flex items-center">
                    <Globe className="h-4 w-4 mr-2" />
                    <span>{collaboration.scope}</span>
                  </div>
                )}
                
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>{formatDate(collaboration.startDate)} - {formatDate(collaboration.endDate)}</span>
                </div>
                
                {collaboration.partnerWebsite && (
                  <div className="flex items-center">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    <a 
                      href={collaboration.partnerWebsite}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 truncate"
                    >
                      Partner Website
                    </a>
                  </div>
                )}
              </div>

              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {collaboration.description}
              </p>

              {/* Contact Info */}
              {collaboration.contactPerson && (
                <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm font-medium text-gray-900">{collaboration.contactPerson}</p>
                  {collaboration.contactEmail && (
                    <p className="text-sm text-gray-600">{collaboration.contactEmail}</p>
                  )}
                  {collaboration.contactPhone && (
                    <p className="text-sm text-gray-600">{collaboration.contactPhone}</p>
                  )}
                </div>
              )}

              {/* Status and Badges */}
              <div className="flex items-center justify-between">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(collaboration.status)}`}>
                  {collaboration.status}
                </span>
                
                <div className="flex items-center space-x-2">
                  {collaboration.isFeatured && (
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">
                      Featured
                    </span>
                  )}
                  {collaboration.isPublic && (
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                      Public
                    </span>
                  )}
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    collaboration.isActive 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {collaboration.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredCollaborations.length === 0 && (
        <div className="text-center py-12">
          <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No collaborations found</h3>
          <p className="text-gray-500 mb-4">
            {searchTerm ? 'Try adjusting your search criteria' : 'Get started by adding your first collaboration'}
          </p>
          {!searchTerm && (
            <button
              onClick={() => handleOpenModal()}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Add Collaboration
            </button>
          )}
        </div>
      )}

      {/* Add/Edit Modal */}
      <Modal
        isOpen={showModal}
        onClose={handleCloseModal}
        title={editingCollaboration ? 'Edit Collaboration' : 'Add Collaboration'}
        size="large"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Partner Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Partner Information</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Partner Name *
              </label>
              <input
                type="text"
                name="partnerName"
                value={formData.partnerName}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Partner organization name..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Partner Type *
                </label>
                <select
                  name="partnerType"
                  value={formData.partnerType}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select type</option>
                  {partnerTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Collaboration Type *
                </label>
                <select
                  name="collaborationType"
                  value={formData.collaborationType}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select type</option>
                  {collaborationTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Partner Website
              </label>
              <input
                type="url"
                name="partnerWebsite"
                value={formData.partnerWebsite}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://partner-website.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Partner Logo
              </label>
              <ImageUpload
                onUploadSuccess={handleLogoUpload}
                uploadType="images"
                maxFiles={1}
                acceptedTypes="image/*"
                showPreview={false}
              />
              {formData.partnerLogo && (
                <div className="mt-2 flex items-center space-x-3">
                  <img
                    src={getImageUrl(formData.partnerLogo)}
                    alt="Partner logo"
                    className="w-16 h-16 object-cover rounded"
                  />
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, partnerLogo: '' }))}
                    className="text-red-600 text-sm hover:text-red-800"
                  >
                    Remove Logo
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Collaboration Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Collaboration Details</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Collaboration title..."
              />
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
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Detailed description of the collaboration..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Date
                </label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  End Date
                </label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
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
                  placeholder="Collaboration location..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Scope
                </label>
                <select
                  name="scope"
                  value={formData.scope}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select scope</option>
                  {scopeOptions.map(scope => (
                    <option key={scope} value={scope}>{scope}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Contact Information</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contact Person
              </label>
              <input
                type="text"
                name="contactPerson"
                value={formData.contactPerson}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Contact person name..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contact Email
                </label>
                <input
                  type="email"
                  name="contactEmail"
                  value={formData.contactEmail}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="contact@partner.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contact Phone
                </label>
                <input
                  type="tel"
                  name="contactPhone"
                  value={formData.contactPhone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>
          </div>

          {/* Additional Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Additional Details</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Objectives
              </label>
              <input
                type="text"
                name="objectives"
                value={formData.objectives}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Separate objectives with commas..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Expected Outcomes
              </label>
              <input
                type="text"
                name="expectedOutcomes"
                value={formData.expectedOutcomes}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Separate outcomes with commas..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Resources
              </label>
              <input
                type="text"
                name="resources"
                value={formData.resources}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Separate resources with commas..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Benefits
              </label>
              <input
                type="text"
                name="benefits"
                value={formData.benefits}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Separate benefits with commas..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Agreement Details
              </label>
              <textarea
                name="agreementDetails"
                value={formData.agreementDetails}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Details about the collaboration agreement..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Progress/Notes
              </label>
              <textarea
                name="progress"
                value={formData.progress}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Current progress and notes..."
              />
            </div>
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
            <div className="flex items-center">
              <input
                type="checkbox"
                name="isFeatured"
                id="isFeatured"
                checked={formData.isFeatured}
                onChange={handleInputChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="isFeatured" className="ml-2 text-sm text-gray-700">
                Featured
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
              <span>{editingCollaboration ? 'Update' : 'Create'} Collaboration</span>
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false)
          setDeletingCollaboration(null)
        }}
        title="Delete Collaboration"
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            Are you sure you want to delete the collaboration with <strong>{deletingCollaboration?.partnerName}</strong>? 
            This action cannot be undone.
          </p>
          <div className="flex justify-end space-x-3">
            <button
              onClick={() => {
                setShowDeleteModal(false)
                setDeletingCollaboration(null)
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

export default CollaborationsManagement
