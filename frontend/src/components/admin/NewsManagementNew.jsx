import React, { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, Search, Calendar, User, Eye, Image as ImageIcon } from 'lucide-react'
import { newsAPI } from '../../services/api'
import LoadingSpinner from '../common/LoadingSpinner'
import Modal from '../common/Modal'
import ImageUpload from './ImageUpload'
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
  const [pagination, setPagination] = useState({})

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    summary: '',
    category: '',
    tags: '',
    images: [],
    isPublished: true,
    isFeatured: false,
    publishDate: new Date().toISOString().split('T')[0]
  })

  const categories = [
    'Announcement',
    'Academic',
    'Research',
    'Event',
    'Achievement',
    'Admission',
    'Notice',
    'General'
  ]

  useEffect(() => {
    fetchNews()
  }, [searchTerm])

  const fetchNews = async () => {
    try {
      setLoading(true)
      const params = {}
      if (searchTerm) params.search = searchTerm
      
      const response = await newsAPI.getAll(params)
      setNews(response.data.data.news)
      setPagination(response.data.data.pagination)
    } catch (error) {
      console.error('Error fetching news:', error)
      toast.error('Failed to fetch news')
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      summary: '',
      category: '',
      tags: '',
      images: [],
      isPublished: true,
      isFeatured: false,
      publishDate: new Date().toISOString().split('T')[0]
    })
    setEditingNews(null)
  }

  const handleOpenModal = (newsItem = null) => {
    if (newsItem) {
      setEditingNews(newsItem)
      setFormData({
        ...newsItem,
        tags: Array.isArray(newsItem.tags) ? newsItem.tags.join(', ') : newsItem.tags || '',
        publishDate: newsItem.publishDate ? newsItem.publishDate.split('T')[0] : new Date().toISOString().split('T')[0],
        images: newsItem.images || []
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const submitData = {
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        publishDate: new Date(formData.publishDate)
      }

      if (editingNews) {
        await newsAPI.update(editingNews._id, submitData)
        toast.success('News updated successfully!')
      } else {
        await newsAPI.create(submitData)
        toast.success('News created successfully!')
      }

      handleCloseModal()
      fetchNews()
    } catch (error) {
      console.error('Error saving news:', error)
      toast.error(error.response?.data?.message || 'Failed to save news')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async () => {
    if (!deletingNews) return

    try {
      await newsAPI.delete(deletingNews._id)
      toast.success('News deleted successfully!')
      setShowDeleteModal(false)
      setDeletingNews(null)
      fetchNews()
    } catch (error) {
      console.error('Error deleting news:', error)
      toast.error('Failed to delete news')
    }
  }

  const getImageUrl = (filename) => {
    if (!filename) return null
    return `/api/upload/serve/news/${filename}`
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const filteredNews = news.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.content.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">News Management</h1>
        <button
          onClick={() => handleOpenModal()}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700"
        >
          <Plus className="h-4 w-4" />
          <span>Add News</span>
        </button>
      </div>

      {/* Search & Filters */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search news..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* News List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="divide-y divide-gray-200">
          {filteredNews.map((item) => (
            <div key={item._id} className="p-6 hover:bg-gray-50">
              <div className="flex items-start space-x-4">
                {/* News Image */}
                <div className="flex-shrink-0">
                  {item.images && item.images.length > 0 ? (
                    <img
                      src={getImageUrl(item.images[0].url)}
                      alt={item.title}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                  ) : (
                    <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center">
                      <ImageIcon className="h-8 w-8 text-gray-400" />
                    </div>
                  )}
                </div>

                {/* News Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                        {item.summary || item.content.substring(0, 150) + '...'}
                      </p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>{formatDate(item.publishDate)}</span>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          item.category === 'Announcement' ? 'bg-red-100 text-red-800' :
                          item.category === 'Academic' ? 'bg-blue-100 text-blue-800' :
                          item.category === 'Research' ? 'bg-green-100 text-green-800' :
                          item.category === 'Event' ? 'bg-purple-100 text-purple-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {item.category}
                        </span>
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

                    {/* Actions */}
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleOpenModal(item)}
                        className="p-2 text-blue-600 hover:bg-blue-100 rounded"
                        title="Edit"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => {
                          setDeletingNews(item)
                          setShowDeleteModal(true)
                        }}
                        className="p-2 text-red-600 hover:bg-red-100 rounded"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Empty State */}
      {filteredNews.length === 0 && (
        <div className="text-center py-12">
          <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No news found</h3>
          <p className="text-gray-500 mb-4">
            {searchTerm ? 'Try adjusting your search criteria' : 'Get started by adding your first news article'}
          </p>
          {!searchTerm && (
            <button
              onClick={() => handleOpenModal()}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Add News Article
            </button>
          )}
        </div>
      )}

      {/* Add/Edit Modal */}
      <Modal
        isOpen={showModal}
        onClose={handleCloseModal}
        title={editingNews ? 'Edit News' : 'Add News'}
        size="large"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
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
                placeholder="Enter news title..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select category</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Publish Date *
                </label>
                <input
                  type="date"
                  name="publishDate"
                  value={formData.publishDate}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="space-y-3">
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
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Summary
              </label>
              <textarea
                name="summary"
                value={formData.summary}
                onChange={handleInputChange}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Brief summary of the news..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Content *
              </label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                required
                rows={8}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Full news content..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tags
              </label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Separate tags with commas..."
              />
              <p className="text-xs text-gray-500 mt-1">
                Example: college, education, announcement
              </p>
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Images
            </label>
            <ImageUpload
              onUploadSuccess={handleImageUpload}
              uploadType="news"
              maxFiles={5}
              acceptedTypes="image/*"
              showPreview={false}
            />
            
            {/* Uploaded Images */}
            {formData.images.length > 0 && (
              <div className="mt-4 space-y-3">
                <h4 className="text-sm font-medium text-gray-700">Uploaded Images:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {formData.images.map((image, index) => (
                    <div key={index} className="border rounded-lg p-3">
                      <div className="flex space-x-3">
                        <img
                          src={getImageUrl(image.url)}
                          alt={image.caption || 'News image'}
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
              <span>{editingNews ? 'Update' : 'Create'} News</span>
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false)
          setDeletingNews(null)
        }}
        title="Delete News"
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            Are you sure you want to delete <strong>{deletingNews?.title}</strong>? 
            This action cannot be undone.
          </p>
          <div className="flex justify-end space-x-3">
            <button
              onClick={() => {
                setShowDeleteModal(false)
                setDeletingNews(null)
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

export default NewsManagement
