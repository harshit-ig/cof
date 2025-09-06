import React, { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, Search, Eye, Calendar, MapPin, User, FileText } from 'lucide-react'
import { eventsAPI, uploadAPI } from '../../services/api'
import LoadingSpinner, { LoadingCard } from '../common/LoadingSpinner'
import Modal, { ConfirmModal } from '../common/Modal'
import { Form, FormGroup, Input, Textarea, Select, SubmitButton } from '../common/Form'
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
  const [uploadingImage, setUploadingImage] = useState(false)
  const [pagination, setPagination] = useState({})

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    type: 'event',
    category: 'general',
    eventDate: '',
    venue: '',
    organizer: '',
    images: [],
    attachments: [],
    isPublished: true,
    isFeatured: false,
    tags: ''
  })

  const eventTypes = [
    { value: 'event', label: 'General Event' },
    { value: 'seminar', label: 'Seminar' },
    { value: 'workshop', label: 'Workshop' },
    { value: 'visit', label: 'Visit/Tour' },
    { value: 'conference', label: 'Conference' },
    { value: 'training', label: 'Training Program' }
  ]

  const categories = [
    { value: 'academic', label: 'Academic' },
    { value: 'research', label: 'Research' },
    { value: 'extension', label: 'Extension' },
    { value: 'general', label: 'General' },
    { value: 'placement', label: 'Placement' },
    { value: 'cultural', label: 'Cultural' },
    { value: 'sports', label: 'Sports' }
  ]

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    try {
      setLoading(true)
      const response = await eventsAPI.getAll()
      if (response.data.success) {
        setEvents(response.data.data.events || [])
        setPagination(response.data.data.pagination || {})
      }
    } catch (error) {
      console.error('Error fetching events:', error)
      toast.error('Failed to fetch events')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      setSubmitting(true)
      
      // Format the data
      const eventData = {
        ...formData,
        tags: formData.tags ? formData.tags.split(',').map(tag => tag.trim()) : [],
        eventDate: formData.eventDate || null
      }

      let response
      if (editingEvent) {
        response = await eventsAPI.update(editingEvent._id, eventData)
        toast.success('Event updated successfully')
      } else {
        response = await eventsAPI.create(eventData)
        toast.success('Event created successfully')
      }

      if (response.data.success) {
        await fetchEvents()
        resetForm()
      }
    } catch (error) {
      console.error('Error saving event:', error)
      const errorMessage = error.response?.data?.message || 'Failed to save event'
      toast.error(errorMessage)
    } finally {
      setSubmitting(false)
    }
  }

  const handleEdit = (event) => {
    setEditingEvent(event)
    setFormData({
      title: event.title || '',
      content: event.content || '',
      excerpt: event.excerpt || '',
      type: event.type || 'event',
      category: event.category || 'general',
      eventDate: event.eventDate ? new Date(event.eventDate).toISOString().slice(0, 16) : '',
      venue: event.venue || '',
      organizer: event.organizer || '',
      images: event.images || [],
      attachments: event.attachments || [],
      isPublished: event.isPublished !== undefined ? event.isPublished : true,
      isFeatured: event.isFeatured || false,
      tags: event.tags ? event.tags.join(', ') : ''
    })
    setShowModal(true)
  }

  const handleDelete = (event) => {
    setDeletingEvent(event)
    setShowDeleteModal(true)
  }

  const confirmDelete = async () => {
    try {
      await eventsAPI.delete(deletingEvent._id)
      toast.success('Event deleted successfully')
      await fetchEvents()
      setShowDeleteModal(false)
      setDeletingEvent(null)
    } catch (error) {
      console.error('Error deleting event:', error)
      toast.error('Failed to delete event')
    }
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    try {
      setUploadingImage(true)
      
      const response = await uploadAPI.single(file, 'events')
      
      if (response.data.success && response.data.data.filename) {
        const imageUrl = `/api/upload/serve/events/${response.data.data.filename}`
        setFormData(prev => ({
          ...prev,
          images: [...prev.images, { url: imageUrl, caption: '' }]
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
      type: 'event',
      category: 'general',
      eventDate: '',
      venue: '',
      organizer: '',
      images: [],
      attachments: [],
      isPublished: true,
      isFeatured: false,
      tags: ''
    })
    setEditingEvent(null)
    setShowModal(false)
  }

  const filteredEvents = events.filter(event =>
    event.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.excerpt?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.type?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const formatDate = (dateString) => {
    if (!dateString) return 'No date set'
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getTypeColor = (type) => {
    const colors = {
      event: 'bg-blue-100 text-blue-800',
      seminar: 'bg-green-100 text-green-800',
      workshop: 'bg-purple-100 text-purple-800',
      visit: 'bg-orange-100 text-orange-800',
      conference: 'bg-red-100 text-red-800',
      training: 'bg-indigo-100 text-indigo-800'
    }
    return colors[type] || 'bg-gray-100 text-gray-800'
  }

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Events Management</h1>
          <p className="text-gray-600">Create and manage events, seminars, workshops, and visits</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Event
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm border">
        <div className="flex gap-4 items-center">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Events List */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Event
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date & Venue
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredEvents.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                    <Calendar className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p>No events found</p>
                  </td>
                </tr>
              ) : (
                filteredEvents.map((event) => (
                  <tr key={event._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">
                          {event.title}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                          {event.excerpt?.substring(0, 100)}...
                        </p>
                        {event.organizer && (
                          <div className="flex items-center mt-1">
                            <User className="w-3 h-3 text-gray-400 mr-1" />
                            <span className="text-xs text-gray-500">{event.organizer}</span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(event.type)}`}>
                        {event.type}
                      </span>
                      <div className="text-xs text-gray-500 mt-1 capitalize">
                        {event.category}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                          <span>{formatDate(event.eventDate)}</span>
                        </div>
                        {event.venue && (
                          <div className="flex items-center mt-1">
                            <MapPin className="w-4 h-4 text-gray-400 mr-2" />
                            <span className="text-gray-600">{event.venue}</span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          event.isPublished 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {event.isPublished ? 'Published' : 'Draft'}
                        </span>
                        {event.isFeatured && (
                          <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
                            Featured
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(event)}
                          className="text-blue-600 hover:text-blue-900 p-1"
                          title="Edit event"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(event)}
                          className="text-red-600 hover:text-red-900 p-1"
                          title="Delete event"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Event Modal */}
      <Modal
        isOpen={showModal}
        onClose={resetForm}
        title={editingEvent ? 'Edit Event' : 'Add New Event'}
        size="lg"
      >
        <Form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6">
            <FormGroup label="Event Title" required>
              <Input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Enter event title"
                required
              />
            </FormGroup>

            <div className="grid grid-cols-2 gap-4">
              <FormGroup label="Event Type" required>
                <Select
                  value={formData.type}
                  onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
                  options={eventTypes}
                  required
                />
              </FormGroup>

              <FormGroup label="Category" required>
                <Select
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  options={categories}
                  required
                />
              </FormGroup>
            </div>

            <FormGroup label="Event Description" required>
              <Textarea
                value={formData.excerpt}
                onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                placeholder="Brief description of the event (max 300 characters)"
                rows={3}
                maxLength={300}
                required
              />
              <p className="text-sm text-gray-500 mt-1">
                {formData.excerpt.length}/300 characters
              </p>
            </FormGroup>

            <FormGroup label="Detailed Content">
              <Textarea
                value={formData.content}
                onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                placeholder="Detailed event content, agenda, requirements, etc."
                rows={6}
              />
            </FormGroup>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormGroup label="Event Date & Time (Optional)">
                <Input
                  type="datetime-local"
                  value={formData.eventDate || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, eventDate: e.target.value }))}
                  min={new Date().toISOString().slice(0, 16)}
                />
              </FormGroup>

              <FormGroup label="Venue">
                <Input
                  type="text"
                  value={formData.venue}
                  onChange={(e) => setFormData(prev => ({ ...prev, venue: e.target.value }))}
                  placeholder="Event venue/location"
                />
              </FormGroup>
            </div>

            <FormGroup label="Organizer">
              <Input
                type="text"
                value={formData.organizer}
                onChange={(e) => setFormData(prev => ({ ...prev, organizer: e.target.value }))}
                placeholder="Event organizer (department, person, etc.)"
              />
            </FormGroup>

            <FormGroup label="Tags">
              <Input
                type="text"
                value={formData.tags}
                onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
                placeholder="Enter tags separated by commas"
              />
            </FormGroup>

            {/* Image Upload */}
            <FormGroup label="Event Images">
              <div className="space-y-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                />
                
                {uploadingImage && (
                  <div className="text-sm text-gray-500">Uploading image...</div>
                )}

                {formData.images.length > 0 && (
                  <div className="grid grid-cols-3 gap-4">
                    {formData.images.map((image, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={image.url}
                          alt={`Event image ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </FormGroup>

            {/* Status Options */}
            <div className="flex items-center space-x-6">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.isPublished}
                  onChange={(e) => setFormData(prev => ({ ...prev, isPublished: e.target.checked }))}
                  className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                />
                <span className="ml-2 text-sm text-gray-700">Published</span>
              </label>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.isFeatured}
                  onChange={(e) => setFormData(prev => ({ ...prev, isFeatured: e.target.checked }))}
                  className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                />
                <span className="ml-2 text-sm text-gray-700">Featured</span>
              </label>
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-6">
            <button
              type="button"
              onClick={resetForm}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <SubmitButton
              loading={submitting}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              {editingEvent ? 'Update Event' : 'Create Event'}
            </SubmitButton>
          </div>
        </Form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={confirmDelete}
        title="Delete Event"
        message={`Are you sure you want to delete "${deletingEvent?.title}"? This action cannot be undone.`}
        confirmText="Delete"
        confirmButtonClass="bg-red-600 hover:bg-red-700"
      />
    </div>
  )
}

export default EventsManagement
