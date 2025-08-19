import React, { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, Search, Calendar, MapPin, Clock, Users, Eye } from 'lucide-react'
import { eventsAPI } from '../../services/api'
import LoadingSpinner from '../common/LoadingSpinner'
import Modal from '../common/Modal'
import ImageUpload from './ImageUpload'
import toast from 'react-hot-toast'

const EventsManagement = () => {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [editingEvent, setEditingEvent] = useState(null)
  const [deletingEvent, setDeletingEvent] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [pagination, setPagination] = useState({})

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    eventDate: '',
    endDate: '',
    time: '',
    location: '',
    category: '',
    organizer: '',
    contactEmail: '',
    contactPhone: '',
    registrationRequired: false,
    registrationDeadline: '',
    maxParticipants: '',
    fees: '',
    images: [],
    tags: '',
    isPublished: true,
    isFeatured: false
  })

  const categories = [
    'Conference',
    'Workshop',
    'Seminar',
    'Training',
    'Competition',
    'Cultural',
    'Sports',
    'Academic',
    'Research',
    'Webinar'
  ]

  useEffect(() => {
    fetchEvents()
  }, [searchTerm])

  const fetchEvents = async () => {
    try {
      setLoading(true)
      const params = {}
      if (searchTerm) params.search = searchTerm
      
      const response = await eventsAPI.getAll(params)
      setEvents(response.data.data.events || [])
      setPagination(response.data.data.pagination || {})
    } catch (error) {
      console.error('Error fetching events:', error)
      toast.error('Failed to fetch events')
      setEvents([]) // Set empty array on error
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      eventDate: '',
      endDate: '',
      time: '',
      location: '',
      category: '',
      organizer: '',
      contactEmail: '',
      contactPhone: '',
      registrationRequired: false,
      registrationDeadline: '',
      maxParticipants: '',
      fees: '',
      images: [],
      tags: '',
      isPublished: true,
      isFeatured: false
    })
    setEditingEvent(null)
  }

  const handleOpenModal = (event = null) => {
    if (event) {
      setEditingEvent(event)
      setFormData({
        ...event,
        eventDate: event.eventDate ? event.eventDate.split('T')[0] : '',
        endDate: event.endDate ? event.endDate.split('T')[0] : '',
        registrationDeadline: event.registrationDeadline ? event.registrationDeadline.split('T')[0] : '',
        tags: Array.isArray(event.tags) ? event.tags.join(', ') : event.tags || '',
        images: event.images || []
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
        eventDate: new Date(formData.eventDate),
        endDate: formData.endDate ? new Date(formData.endDate) : undefined,
        registrationDeadline: formData.registrationDeadline ? new Date(formData.registrationDeadline) : undefined,
        maxParticipants: formData.maxParticipants ? parseInt(formData.maxParticipants) : undefined,
        fees: formData.fees ? parseFloat(formData.fees) : 0
      }

      if (editingEvent) {
        await eventsAPI.update(editingEvent._id, submitData)
        toast.success('Event updated successfully!')
      } else {
        await eventsAPI.create(submitData)
        toast.success('Event created successfully!')
      }

      handleCloseModal()
      fetchEvents()
    } catch (error) {
      console.error('Error saving event:', error)
      toast.error(error.response?.data?.message || 'Failed to save event')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async () => {
    if (!deletingEvent) return

    try {
      await eventsAPI.delete(deletingEvent._id)
      toast.success('Event deleted successfully!')
      setShowDeleteModal(false)
      setDeletingEvent(null)
      fetchEvents()
    } catch (error) {
      console.error('Error deleting event:', error)
      toast.error('Failed to delete event')
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

  const isUpcoming = (eventDate) => {
    return new Date(eventDate) > new Date()
  }

  const filteredEvents = events.filter(event =>
    event.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.location?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Events Management</h1>
        <button
          onClick={() => handleOpenModal()}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700"
        >
          <Plus className="h-4 w-4" />
          <span>Add Event</span>
        </button>
      </div>

      {/* Search */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((event) => (
          <div key={event._id} className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Event Image */}
            <div className="h-48 bg-gray-200 relative">
              {event.images && event.images.length > 0 ? (
                <img
                  src={getImageUrl(event.images[0].url)}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Calendar className="h-16 w-16 text-gray-400" />
                </div>
              )}
              <div className="absolute top-2 right-2 space-x-1">
                <button
                  onClick={() => handleOpenModal(event)}
                  className="p-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                  title="Edit"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  onClick={() => {
                    setDeletingEvent(event)
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
                  isUpcoming(event.eventDate)
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {isUpcoming(event.eventDate) ? 'Upcoming' : 'Past'}
                </span>
              </div>
            </div>

            {/* Event Info */}
            <div className="p-4">
              <h3 className="font-semibold text-lg text-gray-900 mb-2">{event.title}</h3>
              
              <div className="space-y-2 text-sm text-gray-600 mb-3">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>{formatDate(event.eventDate)}</span>
                </div>
                
                {event.time && (
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>{event.time}</span>
                  </div>
                )}
                
                {event.location && (
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span className="truncate">{event.location}</span>
                  </div>
                )}
                
                {event.organizer && (
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2" />
                    <span className="truncate">{event.organizer}</span>
                  </div>
                )}
              </div>

              <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                {event.description}
              </p>

              <div className="flex items-center justify-between">
                <span className={`px-2 py-1 rounded-full text-xs ${
                  event.category === 'Conference' ? 'bg-blue-100 text-blue-800' :
                  event.category === 'Workshop' ? 'bg-green-100 text-green-800' :
                  event.category === 'Seminar' ? 'bg-purple-100 text-purple-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {event.category}
                </span>
                
                <div className="flex items-center space-x-2">
                  {event.isFeatured && (
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">
                      Featured
                    </span>
                  )}
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    event.isPublished 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {event.isPublished ? 'Published' : 'Draft'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredEvents.length === 0 && (
        <div className="text-center py-12">
          <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No events found</h3>
          <p className="text-gray-500 mb-4">
            {searchTerm ? 'Try adjusting your search criteria' : 'Get started by adding your first event'}
          </p>
          {!searchTerm && (
            <button
              onClick={() => handleOpenModal()}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Add Event
            </button>
          )}
        </div>
      )}

      {/* Add/Edit Modal */}
      <Modal
        isOpen={showModal}
        onClose={handleCloseModal}
        title={editingEvent ? 'Edit Event' : 'Add Event'}
        size="large"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Event Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter event title..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  Organizer
                </label>
                <input
                  type="text"
                  name="organizer"
                  value={formData.organizer}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Event organizer..."
                />
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
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Event description..."
              />
            </div>
          </div>

          {/* Date & Time */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Date & Time</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Event Date *
                </label>
                <input
                  type="date"
                  name="eventDate"
                  value={formData.eventDate}
                  onChange={handleInputChange}
                  required
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
                  Time
                </label>
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Location & Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Location & Contact</h3>
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
                  placeholder="Event location..."
                />
              </div>

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
                  placeholder="contact@example.com"
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
                  placeholder="Phone number..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Event Fees (₹)
                </label>
                <input
                  type="number"
                  name="fees"
                  value={formData.fees}
                  onChange={handleInputChange}
                  min="0"
                  step="0.01"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0.00"
                />
              </div>
            </div>
          </div>

          {/* Registration */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Registration</h3>
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                name="registrationRequired"
                id="registrationRequired"
                checked={formData.registrationRequired}
                onChange={handleInputChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="registrationRequired" className="ml-2 text-sm text-gray-700">
                Registration Required
              </label>
            </div>

            {formData.registrationRequired && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Registration Deadline
                  </label>
                  <input
                    type="date"
                    name="registrationDeadline"
                    value={formData.registrationDeadline}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Max Participants
                  </label>
                  <input
                    type="number"
                    name="maxParticipants"
                    value={formData.maxParticipants}
                    onChange={handleInputChange}
                    min="1"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Maximum participants..."
                  />
                </div>
              </div>
            )}
          </div>

          {/* Images */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Event Images
            </label>
            <ImageUpload
              onUploadSuccess={handleImageUpload}
              uploadType="news"
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
                          alt={image.caption || 'Event image'}
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

          {/* Tags & Settings */}
          <div className="space-y-4">
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
            </div>

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
              <span>{editingEvent ? 'Update' : 'Create'} Event</span>
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false)
          setDeletingEvent(null)
        }}
        title="Delete Event"
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            Are you sure you want to delete <strong>{deletingEvent?.title}</strong>? 
            This action cannot be undone.
          </p>
          <div className="flex justify-end space-x-3">
            <button
              onClick={() => {
                setShowDeleteModal(false)
                setDeletingEvent(null)
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

export default EventsManagement
