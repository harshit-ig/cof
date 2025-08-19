import React, { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, Search, FileText, ExternalLink, Award, User } from 'lucide-react'
import { researchAPI } from '../../services/api'
import LoadingSpinner from '../common/LoadingSpinner'
import Modal from '../common/Modal'
import ImageUpload from './ImageUpload'
import toast from 'react-hot-toast'

const ResearchManagement = () => {
  const [research, setResearch] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [editingResearch, setEditingResearch] = useState(null)
  const [deletingResearch, setDeletingResearch] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [pagination, setPagination] = useState({})

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    abstract: '',
    keywords: '',
    researchArea: '',
    status: '',
    startDate: '',
    endDate: '',
    budget: '',
    fundingAgency: '',
    principalInvestigator: '',
    coInvestigators: '',
    collaborators: '',
    publications: '',
    objectives: '',
    methodology: '',
    expectedOutcomes: '',
    images: [],
    documents: [],
    isPublished: true,
    isFeatured: false
  })

  const researchAreas = [
    'Aquaculture',
    'Fish Biology',
    'Fish Nutrition',
    'Fish Pathology',
    'Fish Processing',
    'Fisheries Management',
    'Marine Biology',
    'Genetics',
    'Environmental Science',
    'Biotechnology',
    'Economics',
    'Other'
  ]

  const statusOptions = [
    'Planned',
    'Ongoing',
    'Completed',
    'Published',
    'On Hold',
    'Cancelled'
  ]

  useEffect(() => {
    fetchResearch()
  }, [searchTerm])

  const fetchResearch = async () => {
    try {
      setLoading(true)
      const params = {}
      if (searchTerm) params.search = searchTerm
      
      const response = await researchAPI.getAll(params)
      setResearch(response.data.data.research || [])
      setPagination(response.data.data.pagination || {})
    } catch (error) {
      console.error('Error fetching research:', error)
      toast.error('Failed to fetch research projects')
      setResearch([])
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      abstract: '',
      keywords: '',
      researchArea: '',
      status: '',
      startDate: '',
      endDate: '',
      budget: '',
      fundingAgency: '',
      principalInvestigator: '',
      coInvestigators: '',
      collaborators: '',
      publications: '',
      objectives: '',
      methodology: '',
      expectedOutcomes: '',
      images: [],
      documents: [],
      isPublished: true,
      isFeatured: false
    })
    setEditingResearch(null)
  }

  const handleOpenModal = (researchItem = null) => {
    if (researchItem) {
      setEditingResearch(researchItem)
      setFormData({
        ...researchItem,
        startDate: researchItem.startDate ? researchItem.startDate.split('T')[0] : '',
        endDate: researchItem.endDate ? researchItem.endDate.split('T')[0] : '',
        keywords: Array.isArray(researchItem.keywords) ? researchItem.keywords.join(', ') : researchItem.keywords || '',
        coInvestigators: Array.isArray(researchItem.coInvestigators) ? researchItem.coInvestigators.join(', ') : researchItem.coInvestigators || '',
        collaborators: Array.isArray(researchItem.collaborators) ? researchItem.collaborators.join(', ') : researchItem.collaborators || '',
        publications: Array.isArray(researchItem.publications) 
          ? researchItem.publications.map(p => `${p.title} - ${p.journal} (${p.year})`).join('\\n')
          : researchItem.publications || '',
        images: researchItem.images || [],
        documents: researchItem.documents || []
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

  const handleDocumentUpload = (uploadedFile) => {
    setFormData(prev => ({
      ...prev,
      documents: [...prev.documents, {
        url: uploadedFile.filename,
        title: uploadedFile.originalName,
        type: uploadedFile.mimetype
      }]
    }))
    toast.success('Document uploaded successfully!')
  }

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }))
  }

  const removeDocument = (index) => {
    setFormData(prev => ({
      ...prev,
      documents: prev.documents.filter((_, i) => i !== index)
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

  const parsePublications = (publications) => {
    if (!publications) return []
    return publications.split('\\n').map(pub => {
      const parts = pub.split(' - ')
      if (parts.length >= 2) {
        const [title, rest] = parts
        const yearMatch = rest.match(/\\((\\d{4})\\)/)
        const year = yearMatch ? parseInt(yearMatch[1]) : new Date().getFullYear()
        const journal = rest.replace(/\\(\\d{4}\\)/, '').trim()
        return { title: title.trim(), journal, year }
      }
      return { title: pub.trim(), journal: '', year: new Date().getFullYear() }
    }).filter(pub => pub.title)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const submitData = {
        ...formData,
        keywords: parseArrayField(formData.keywords),
        coInvestigators: parseArrayField(formData.coInvestigators),
        collaborators: parseArrayField(formData.collaborators),
        publications: parsePublications(formData.publications),
        startDate: formData.startDate ? new Date(formData.startDate) : undefined,
        endDate: formData.endDate ? new Date(formData.endDate) : undefined,
        budget: formData.budget ? parseFloat(formData.budget) : undefined
      }

      if (editingResearch) {
        await researchAPI.update(editingResearch._id, submitData)
        toast.success('Research project updated successfully!')
      } else {
        await researchAPI.create(submitData)
        toast.success('Research project created successfully!')
      }

      handleCloseModal()
      fetchResearch()
    } catch (error) {
      console.error('Error saving research:', error)
      toast.error(error.response?.data?.message || 'Failed to save research project')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async () => {
    if (!deletingResearch) return

    try {
      await researchAPI.delete(deletingResearch._id)
      toast.success('Research project deleted successfully!')
      setShowDeleteModal(false)
      setDeletingResearch(null)
      fetchResearch()
    } catch (error) {
      console.error('Error deleting research:', error)
      toast.error('Failed to delete research project')
    }
  }

  const getImageUrl = (filename) => {
    if (!filename) return null
    return `/api/upload/serve/research/${filename}`
  }

  const getDocumentUrl = (filename) => {
    if (!filename) return null
    return `/api/upload/serve/documents/${filename}`
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const filteredResearch = research.filter(item =>
    item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.researchArea?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.principalInvestigator?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Research Management</h1>
        <button
          onClick={() => handleOpenModal()}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700"
        >
          <Plus className="h-4 w-4" />
          <span>Add Research</span>
        </button>
      </div>

      {/* Search */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search research projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Research Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResearch.map((item) => (
          <div key={item._id} className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Research Image */}
            <div className="h-48 bg-gray-200 relative">
              {item.images && item.images.length > 0 ? (
                <img
                  src={getImageUrl(item.images[0].url)}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <FileText className="h-16 w-16 text-gray-400" />
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
                    setDeletingResearch(item)
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
                  item.status === 'Completed' ? 'bg-green-100 text-green-800' :
                  item.status === 'Ongoing' ? 'bg-blue-100 text-blue-800' :
                  item.status === 'Planned' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {item.status}
                </span>
              </div>
            </div>

            {/* Research Info */}
            <div className="p-4">
              <h3 className="font-semibold text-lg text-gray-900 mb-2">{item.title}</h3>
              
              <div className="space-y-2 text-sm text-gray-600 mb-3">
                <div className="flex items-center">
                  <Award className="h-4 w-4 mr-2" />
                  <span>{item.researchArea}</span>
                </div>
                
                {item.principalInvestigator && (
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    <span className="truncate">{item.principalInvestigator}</span>
                  </div>
                )}
                
                {item.startDate && (
                  <div className="flex items-center">
                    <FileText className="h-4 w-4 mr-2" />
                    <span>Started: {formatDate(item.startDate)}</span>
                  </div>
                )}
                
                {item.fundingAgency && (
                  <div className="flex items-center">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    <span className="truncate">{item.fundingAgency}</span>
                  </div>
                )}
              </div>

              <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                {item.description}
              </p>

              <div className="flex items-center justify-between">
                {item.budget && (
                  <span className="text-sm font-medium text-gray-900">
                    ₹{item.budget.toLocaleString()}
                  </span>
                )}
                
                <div className="flex items-center space-x-2">
                  {item.isFeatured && (
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">
                      Featured
                    </span>
                  )}
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    item.isPublished 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {item.isPublished ? 'Published' : 'Draft'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredResearch.length === 0 && (
        <div className="text-center py-12">
          <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No research projects found</h3>
          <p className="text-gray-500 mb-4">
            {searchTerm ? 'Try adjusting your search criteria' : 'Get started by adding your first research project'}
          </p>
          {!searchTerm && (
            <button
              onClick={() => handleOpenModal()}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Add Research Project
            </button>
          )}
        </div>
      )}

      {/* Add/Edit Modal */}
      <Modal
        isOpen={showModal}
        onClose={handleCloseModal}
        title={editingResearch ? 'Edit Research Project' : 'Add Research Project'}
        size="large"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Research Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter research title..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Research Area *
                </label>
                <select
                  name="researchArea"
                  value={formData.researchArea}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select research area</option>
                  {researchAreas.map(area => (
                    <option key={area} value={area}>{area}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status *
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  required
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
                placeholder="Brief description of the research..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Abstract
              </label>
              <textarea
                name="abstract"
                value={formData.abstract}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Detailed abstract of the research..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Keywords
              </label>
              <input
                type="text"
                name="keywords"
                value={formData.keywords}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Separate keywords with commas..."
              />
            </div>
          </div>

          {/* Team & Funding */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Team & Funding</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Principal Investigator
                </label>
                <input
                  type="text"
                  name="principalInvestigator"
                  value={formData.principalInvestigator}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Lead researcher name..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Funding Agency
                </label>
                <input
                  type="text"
                  name="fundingAgency"
                  value={formData.fundingAgency}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Funding organization..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Budget (₹)
                </label>
                <input
                  type="number"
                  name="budget"
                  value={formData.budget}
                  onChange={handleInputChange}
                  min="0"
                  step="0.01"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Total budget..."
                />
              </div>

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
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Co-Investigators
              </label>
              <input
                type="text"
                name="coInvestigators"
                value={formData.coInvestigators}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Separate names with commas..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Collaborators
              </label>
              <input
                type="text"
                name="collaborators"
                value={formData.collaborators}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="External collaborating institutions/individuals..."
              />
            </div>
          </div>

          {/* Research Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Research Details</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Objectives
              </label>
              <textarea
                name="objectives"
                value={formData.objectives}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Research objectives..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Methodology
              </label>
              <textarea
                name="methodology"
                value={formData.methodology}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Research methodology..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Expected Outcomes
              </label>
              <textarea
                name="expectedOutcomes"
                value={formData.expectedOutcomes}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Expected research outcomes..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Publications
              </label>
              <textarea
                name="publications"
                value={formData.publications}
                onChange={handleInputChange}
                rows={3}
                placeholder="Title - Journal (Year)&#10;One publication per line"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Images */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Research Images
            </label>
            <ImageUpload
              onUploadSuccess={handleImageUpload}
              uploadType="research"
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
                          alt={image.caption || 'Research image'}
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

          {/* Documents */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Research Documents
            </label>
            <ImageUpload
              onUploadSuccess={handleDocumentUpload}
              uploadType="documents"
              maxFiles={10}
              acceptedTypes="document/*"
              showPreview={false}
            />
            
            {formData.documents.length > 0 && (
              <div className="mt-4 space-y-3">
                <h4 className="text-sm font-medium text-gray-700">Uploaded Documents:</h4>
                <div className="space-y-2">
                  {formData.documents.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <FileText className="h-5 w-5 text-gray-400" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{doc.title}</p>
                          <p className="text-xs text-gray-500">{doc.type}</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeDocument(index)}
                        className="text-red-600 text-sm hover:text-red-800"
                      >
                        Remove
                      </button>
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
                name="isPublished"
                id="isPublished"
                checked={formData.isPublished}
                onChange={handleInputChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="isPublished" className="ml-2 text-sm text-gray-700">
                Published
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
              <span>{editingResearch ? 'Update' : 'Create'} Research</span>
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false)
          setDeletingResearch(null)
        }}
        title="Delete Research Project"
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            Are you sure you want to delete <strong>{deletingResearch?.title}</strong>? 
            This action cannot be undone.
          </p>
          <div className="flex justify-end space-x-3">
            <button
              onClick={() => {
                setShowDeleteModal(false)
                setDeletingResearch(null)
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

export default ResearchManagement
