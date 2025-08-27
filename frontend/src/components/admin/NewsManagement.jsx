import React, { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, Search, Eye, Image, Calendar } from 'lucide-react'
import { newsAPI, uploadAPI } from '../../services/api'
import LoadingSpinner, { LoadingCard } from '../common/LoadingSpinner'
import Modal, { ConfirmModal } from '../common/Modal'
import { Form, FormGroup, Input, Textarea, Select, SubmitButton } from '../common/Form'
import toast from 'react-hot-toast'

const NewsManagement = () => {
  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [editingNews, setEditingNews] = useState(null)
  const [deletingNews, setDeletingNews] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [uploadingImage, setUploadingImage] = useState(false)
  const [pagination, setPagination] = useState({})

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    type: 'news',
    category: '',
    author: '',
    featured: false,
    published: true,
    publishDate: new Date().toISOString().split('T')[0],
    images: [],
    // Event-specific fields
    eventDate: '',
    eventTime: '',
    venue: '',
    registrationRequired: false,
    registrationLink: '',
    contactPerson: '',
    contactEmail: '',
    contactPhone: '',
    capacity: '',
    tags: []
  })

  const newsTypes = [
    { value: 'news', label: 'News Article' },
    { value: 'announcement', label: 'Announcement' },
    { value: 'press_release', label: 'Press Release' },
    { value: 'achievement', label: 'Achievement' },
    { value: 'event', label: 'Event' },
    { value: 'workshop', label: 'Workshop/Seminar' },
    { value: 'conference', label: 'Conference' },
    { value: 'competition', label: 'Competition' },
    { value: 'cultural', label: 'Cultural Event' }
  ]

  const categories = [
    { value: 'academic', label: 'Academic' },
    { value: 'research', label: 'Research' },
    { value: 'student', label: 'Student Life' },
    { value: 'faculty', label: 'Faculty' },
    { value: 'infrastructure', label: 'Infrastructure' },
    { value: 'collaboration', label: 'Collaboration' },
    { value: 'placement', label: 'Placement' },
    { value: 'sports', label: 'Sports' },
    { value: 'cultural', label: 'Cultural' },
    { value: 'general', label: 'General' }
  ]

  useEffect(() => {
    fetchNews()
  }, [searchTerm])

  const fetchNews = async () => {
    try {
      setLoading(true)
      const params = { page: 1, limit: 20 }
      if (searchTerm) params.search = searchTerm

      const response = await newsAPI.getAll(params)
      if (response.data.success) {
        setNews(response.data.data.newsEvents || [])
        setPagination(response.data.data.pagination || {})
      }
    } catch (error) {
      console.error('Error fetching news:', error)
      toast.error('Failed to fetch news')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const data = {
        ...formData,
        featured: Boolean(formData.featured),
        published: Boolean(formData.published)
      }

      if (editingNews) {
        await newsAPI.update(editingNews._id, data)
        toast.success('News updated successfully')
      } else {
        await newsAPI.create(data)
        toast.success('News created successfully')
      }

      setShowModal(false)
      resetForm()
      fetchNews()
    } catch (error) {
      console.error('Error saving news:', error)
      toast.error(error.response?.data?.message || 'Failed to save news')
    } finally {
      setSubmitting(false)
    }
  }

  const handleEdit = (newsItem) => {
    setEditingNews(newsItem)
    setFormData({
      title: newsItem.title,
      content: newsItem.content,
      excerpt: newsItem.excerpt,
      type: newsItem.type,
      category: newsItem.category,
      author: newsItem.author,
      featured: newsItem.featured,
      published: newsItem.published,
      publishDate: newsItem.publishDate ? newsItem.publishDate.split('T')[0] : new Date().toISOString().split('T')[0],
      images: newsItem.images || [],
      // Event-specific fields
      eventDate: newsItem.eventDate ? newsItem.eventDate.split('T')[0] : '',
      eventTime: newsItem.eventTime || '',
      venue: newsItem.venue || '',
      registrationRequired: newsItem.registrationRequired || false,
      registrationLink: newsItem.registrationLink || '',
      contactPerson: newsItem.contactPerson || '',
      contactEmail: newsItem.contactEmail || '',
      contactPhone: newsItem.contactPhone || '',
      capacity: newsItem.capacity || '',
      tags: newsItem.tags || []
    })
    setShowModal(true)
  }

  const handleDelete = async () => {
    if (!deletingNews) return

    try {
      await newsAPI.delete(deletingNews._id)
      toast.success('News deleted successfully')
      setShowDeleteModal(false)
      setDeletingNews(null)
      fetchNews()
    } catch (error) {
      console.error('Error deleting news:', error)
      toast.error(error.response?.data?.message || 'Failed to delete news')
    }
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    try {
      setUploadingImage(true)
      const response = await uploadAPI.single(file)
      
      if (response.data.success) {
        setFormData(prev => ({
          ...prev,
          images: [...prev.images, {
            url: response.data.data.url,
            filename: response.data.data.filename,
            alt: file.name
          }]
        }))
        toast.success('Image uploaded successfully')
      }
    } catch (error) {
      console.error('Error uploading image:', error)
      toast.error('Failed to upload image')
    } finally {
      setUploadingImage(false)
    }
  }

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }))
  }

  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      excerpt: '',
      type: 'news',
      category: '',
      author: '',
      featured: false,
      published: true,
      publishDate: new Date().toISOString().split('T')[0],
      images: [],
      // Event-specific fields
      eventDate: '',
      eventTime: '',
      venue: '',
      registrationRequired: false,
      registrationLink: '',
      contactPerson: '',
      contactEmail: '',
      contactPhone: '',
      capacity: '',
      tags: []
    })
    setEditingNews(null)
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }))
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">News Management</h1>
          <p className="text-gray-600">Create and manage news articles and announcements</p>
        </div>
        
        <button
          onClick={() => {
            resetForm()
            setShowModal(true)
          }}
          className="btn-primary flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add News
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search news..."
            className="form-input pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* News Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Article
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center">
                    <LoadingSpinner />
                  </td>
                </tr>
              ) : news.length > 0 ? (
                news.map((item) => (
                  <tr key={item._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        {item.images?.[0] && (
                          <img
                            src={uploadAPI.getImageUrl(item.images[0].url, 'news')}
                            alt=""
                            className="w-10 h-10 rounded object-cover mr-3"
                          />
                        )}
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {item.title}
                          </div>
                          <div className="text-sm text-gray-500">
                            {item.author}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {item.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {item.published ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Published
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            Draft
                          </span>
                        )}
                        {item.featured && (
                          <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                            Featured
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(item.publishDate || item.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(item)}
                          className="text-blue-500 hover:text-blue-600"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            setDeletingNews(item)
                            setShowDeleteModal(true)
                          }}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                    No news found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={editingNews ? 'Edit News' : 'Add New News'}
        size="xl"
      >
        <Form onSubmit={handleSubmit}>
          <FormGroup label="Title" required>
            <Input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter news title"
              required
            />
          </FormGroup>

          <FormGroup label="Excerpt" required>
            <Textarea
              name="excerpt"
              value={formData.excerpt}
              onChange={handleChange}
              placeholder="Brief summary of the news"
              rows={2}
              required
            />
          </FormGroup>

          <FormGroup label="Content" required>
            <Textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="Full content of the news article"
              rows={8}
              required
            />
          </FormGroup>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormGroup label="Type" required>
              <Select
                name="type"
                value={formData.type}
                onChange={handleChange}
                options={newsTypes}
                required
              />
            </FormGroup>

            <FormGroup label="Category" required>
              <Select
                name="category"
                value={formData.category}
                onChange={handleChange}
                options={categories}
                required
              />
            </FormGroup>

            <FormGroup label="Author" required>
              <Input
                name="author"
                value={formData.author}
                onChange={handleChange}
                placeholder="Author name"
                required
              />
            </FormGroup>

            <FormGroup label="Publish Date" required>
              <Input
                type="date"
                name="publishDate"
                value={formData.publishDate}
                onChange={handleChange}
                required
              />
            </FormGroup>
          </div>

          {/* Event-specific fields */}
          {(formData.type === 'event' || formData.type === 'workshop' || formData.type === 'conference' || formData.type === 'competition' || formData.type === 'cultural') && (
            <div className="border-t border-gray-200 pt-6 mt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Event Details</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormGroup label="Event Date" required>
                  <Input
                    type="date"
                    name="eventDate"
                    value={formData.eventDate}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>

                <FormGroup label="Event Time">
                  <Input
                    type="time"
                    name="eventTime"
                    value={formData.eventTime}
                    onChange={handleChange}
                    placeholder="e.g., 10:00 AM"
                  />
                </FormGroup>

                <FormGroup label="Venue" required>
                  <Input
                    name="venue"
                    value={formData.venue}
                    onChange={handleChange}
                    placeholder="Event venue/location"
                    required
                  />
                </FormGroup>

                <FormGroup label="Capacity">
                  <Input
                    type="number"
                    name="capacity"
                    value={formData.capacity}
                    onChange={handleChange}
                    placeholder="Maximum participants"
                  />
                </FormGroup>

                <FormGroup label="Contact Person">
                  <Input
                    name="contactPerson"
                    value={formData.contactPerson}
                    onChange={handleChange}
                    placeholder="Contact person name"
                  />
                </FormGroup>

                <FormGroup label="Contact Email">
                  <Input
                    type="email"
                    name="contactEmail"
                    value={formData.contactEmail}
                    onChange={handleChange}
                    placeholder="contact@example.com"
                  />
                </FormGroup>

                <FormGroup label="Contact Phone">
                  <Input
                    type="tel"
                    name="contactPhone"
                    value={formData.contactPhone}
                    onChange={handleChange}
                    placeholder="+91 XXXXXXXXXX"
                  />
                </FormGroup>

                <FormGroup label="Registration Link">
                  <Input
                    type="url"
                    name="registrationLink"
                    value={formData.registrationLink}
                    onChange={handleChange}
                    placeholder="https://registration-link.com"
                  />
                </FormGroup>
              </div>

              <FormGroup label="Event Tags">
                <Input
                  name="tags"
                  value={Array.isArray(formData.tags) ? formData.tags.join(', ') : ''}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    tags: e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag) 
                  }))}
                  placeholder="workshop, seminar, training (comma-separated)"
                />
              </FormGroup>

              <FormGroup>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="registrationRequired"
                    checked={formData.registrationRequired}
                    onChange={handleChange}
                    className="rounded border-gray-300 text-blue-500 focus:ring-primary-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Registration Required</span>
                </label>
              </FormGroup>
            </div>
          )}

          {/* Image Upload */}
          <FormGroup label="Images">
            <div className="space-y-4">
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Image className="w-8 h-8 mb-4 text-gray-500" />
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Click to upload</span> images
                    </p>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={uploadingImage}
                  />
                </label>
              </div>

              {uploadingImage && (
                <div className="flex items-center justify-center">
                  <LoadingSpinner size="sm" />
                  <span className="ml-2 text-sm text-gray-600">Uploading...</span>
                </div>
              )}

              {/* Display uploaded images */}
              {formData.images.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {formData.images.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={uploadAPI.getImageUrl(image.url, 'news')}
                        alt={image.alt}
                        className="w-full h-24 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </FormGroup>

          {/* Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormGroup>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleChange}
                  className="rounded border-gray-300 text-blue-500 focus:ring-primary-500"
                />
                <span className="ml-2 text-sm text-gray-700">Featured Article</span>
              </label>
            </FormGroup>

            <FormGroup>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="published"
                  checked={formData.published}
                  onChange={handleChange}
                  className="rounded border-gray-300 text-blue-500 focus:ring-primary-500"
                />
                <span className="ml-2 text-sm text-gray-700">Published</span>
              </label>
            </FormGroup>
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="btn-ghost"
            >
              Cancel
            </button>
            <SubmitButton isLoading={submitting}>
              {editingNews ? 'Update News' : 'Create News'}
            </SubmitButton>
          </div>
        </Form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        title="Delete News"
        message={`Are you sure you want to delete "${deletingNews?.title}"? This action cannot be undone.`}
        type="danger"
      />
    </div>
  )
}

export default NewsManagement

