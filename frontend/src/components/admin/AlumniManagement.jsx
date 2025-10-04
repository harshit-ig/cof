import React, { useState, useEffect } from 'react'
import { Plus, Edit2, Trash2, Save, X, Users, Calendar, Award, TrendingUp } from 'lucide-react'
import { Form, FormGroup, Input, Textarea, SubmitButton } from '../common/Form'
import Modal from '../common/Modal'
import { alumniAPI, uploadAPI } from '../../services/api'
import { toast } from 'react-hot-toast'

const AlumniManagement = () => {
  const [activeTab, setActiveTab] = useState('testimonial')
  const [alumniItems, setAlumniItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [selectedContactType, setSelectedContactType] = useState(editingItem?.contactType || '')

  const tabs = [
    { id: 'testimonial', name: 'Alumni Testimonials', icon: Users },
    { id: 'event', name: 'Alumni Events', icon: Calendar },
    { id: 'contact', name: 'Contact Information', icon: Award },
    { id: 'stats', name: 'Alumni Statistics', icon: TrendingUp }
  ]

  useEffect(() => {
    fetchAlumni()
  }, [activeTab])

  const fetchAlumni = async () => {
    try {
      setLoading(true)
      const response = await alumniAPI.getAll({ section: activeTab })
      setAlumniItems(response.data.data.alumni || [])
    } catch (error) {
      toast.error('Failed to fetch alumni data')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    try {
      setUploading(true)
      const formData = new FormData()
      formData.append('file', file)
      
      const response = await uploadAPI.single(formData, 'faculty')
      if (response.data.success) {
        return response.data.data.url
      }
    } catch (error) {
      toast.error('Failed to upload image')
      console.error(error)
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const data = {
      section: activeTab,
      title: formData.get('title'),
      description: formData.get('description'),
      sortOrder: parseInt(formData.get('sortOrder') || 0),
      isPublished: formData.get('isPublished') === 'true'
    }

    // Add section-specific fields
    if (activeTab === 'testimonial') {
      data.name = formData.get('name')
      data.batch = formData.get('batch')
      data.position = formData.get('position')
      data.company = formData.get('company')
      data.image = formData.get('image')
      data.testimonial = formData.get('testimonial')
      data.rating = parseInt(formData.get('rating') || 5)
    } else if (activeTab === 'event') {
      data.date = formData.get('date')
      data.time = formData.get('time')
      data.venue = formData.get('venue')
      data.registrationOpen = formData.get('registrationOpen') === 'true'
      data.eventType = formData.get('eventType')
    } else if (activeTab === 'contact') {
      data.contactType = formData.get('contactType')
      data.email = formData.get('email')
      data.phone = formData.get('phone')
      data.address = formData.get('address')
    } else if (activeTab === 'stats') {
      data.icon = formData.get('icon')
      data.value = formData.get('value')
      data.label = formData.get('label')
      data.color = formData.get('color')
      data.order = parseInt(formData.get('order') || 0)
    }

    try {
      setSubmitting(true)
      if (editingItem) {
        await alumniAPI.update(editingItem._id, data)
        toast.success('Alumni item updated successfully')
      } else {
        await alumniAPI.create(data)
        toast.success('Alumni item created successfully')
      }
      setShowModal(false)
      setEditingItem(null)
      setSelectedContactType('')
      fetchAlumni()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Operation failed')
    } finally {
      setSubmitting(false)
    }
  }

  const handleEdit = (item) => {
    setEditingItem(item)
    if (item.section === 'contact') {
      setSelectedContactType(item.contactType || '')
    }
    setShowModal(true)
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return
    
    try {
      await alumniAPI.delete(id)
      toast.success('Alumni item deleted successfully')
      fetchAlumni()
    } catch (error) {
      toast.error('Failed to delete alumni item')
    }
  }

  const handleImageChange = async (e) => {
    const imageUrl = await handleImageUpload(e)
    if (imageUrl) {
      // Update the form field
      e.target.form.image.value = imageUrl
    }
  }

  const renderForm = () => {
    if (activeTab === 'testimonial') {
      return (
        <>
          <FormGroup label="Alumni Name" required>
            <Input name="name" defaultValue={editingItem?.name} required />
          </FormGroup>

          <div className="grid grid-cols-2 gap-4">
            <FormGroup label="Batch Year" required>
              <Input name="batch" defaultValue={editingItem?.batch} placeholder="e.g., 2020" required />
            </FormGroup>

            <FormGroup label="Rating">
              <select name="rating" defaultValue={editingItem?.rating || 5} className="form-select">
                <option value="5">5 Stars</option>
                <option value="4">4 Stars</option>
                <option value="3">3 Stars</option>
                <option value="2">2 Stars</option>
                <option value="1">1 Star</option>
              </select>
            </FormGroup>
          </div>

          <FormGroup label="Current Position" required>
            <Input name="position" defaultValue={editingItem?.position} placeholder="e.g., Senior Aquaculture Scientist" required />
          </FormGroup>

          <FormGroup label="Company/Organization" required>
            <Input name="company" defaultValue={editingItem?.company} placeholder="e.g., ICAR-CIFE, Mumbai" required />
          </FormGroup>

          <FormGroup label="Profile Image URL">
            <Input name="image" defaultValue={editingItem?.image} placeholder="Upload or enter image URL" />
            <input type="file" accept="image/*" onChange={handleImageChange} className="mt-2" disabled={uploading} />
            {uploading && <p className="text-sm text-blue-600 mt-1">Uploading...</p>}
          </FormGroup>

          <FormGroup label="Testimonial" required>
            <Textarea name="testimonial" defaultValue={editingItem?.testimonial} rows={4} required placeholder="Write the alumni's testimonial..." />
          </FormGroup>

          <FormGroup label="Title (Summary)" required>
            <Input name="title" defaultValue={editingItem?.title} placeholder="e.g., Success in Aquaculture Research" required />
          </FormGroup>

          <FormGroup label="Description">
            <Textarea name="description" defaultValue={editingItem?.description} rows={2} placeholder="Brief description..." />
          </FormGroup>
        </>
      )
    } else if (activeTab === 'event') {
      return (
        <>
          <FormGroup label="Event Title" required>
            <Input name="title" defaultValue={editingItem?.title} placeholder="e.g., Annual Alumni Meet 2025" required />
          </FormGroup>

          <div className="grid grid-cols-2 gap-4">
            <FormGroup label="Event Date" required>
              <Input name="date" defaultValue={editingItem?.date} placeholder="e.g., December 15, 2025" required />
            </FormGroup>

            <FormGroup label="Event Time">
              <Input name="time" defaultValue={editingItem?.time} placeholder="e.g., 10:00 AM - 6:00 PM" />
            </FormGroup>
          </div>

          <FormGroup label="Venue" required>
            <Input name="venue" defaultValue={editingItem?.venue} placeholder="e.g., COF Campus, Jabalpur" required />
          </FormGroup>

          <FormGroup label="Description" required>
            <Textarea name="description" defaultValue={editingItem?.description} rows={3} required placeholder="Event description..." />
          </FormGroup>

          <div className="grid grid-cols-2 gap-4">
            <FormGroup label="Event Type">
              <select name="eventType" defaultValue={editingItem?.eventType} className="form-select">
                <option value="upcoming">Upcoming</option>
                <option value="past">Past</option>
              </select>
            </FormGroup>

            <FormGroup label="Registration Status">
              <select name="registrationOpen" defaultValue={editingItem?.registrationOpen ? 'true' : 'false'} className="form-select">
                <option value="true">Open</option>
                <option value="false">Closed</option>
              </select>
            </FormGroup>
          </div>
        </>
      )
    } else if (activeTab === 'contact') {
      return (
        <>
          <FormGroup label="Contact Title" required>
            <Input name="title" defaultValue={editingItem?.title} placeholder="e.g., Main Email, Office Phone, Campus Address" required />
          </FormGroup>

          <FormGroup label="Contact Type" required>
            <select 
              name="contactType" 
              value={selectedContactType} 
              onChange={(e) => setSelectedContactType(e.target.value)}
              className="form-select" 
              required
            >
              <option value="">Select Contact Type</option>
              <option value="email">Email</option>
              <option value="phone">Phone</option>
              <option value="address">Address</option>
            </select>
          </FormGroup>

          {selectedContactType === 'email' && (
            <FormGroup label="Email Address" required>
              <Input 
                type="email" 
                name="email" 
                defaultValue={editingItem?.email} 
                placeholder="alumni@cofjabalpur.edu.in" 
                required 
              />
            </FormGroup>
          )}

          {selectedContactType === 'phone' && (
            <FormGroup label="Phone Number" required>
              <Input 
                name="phone" 
                defaultValue={editingItem?.phone} 
                placeholder="+91 761 2681239" 
                required 
              />
            </FormGroup>
          )}

          {selectedContactType === 'address' && (
            <FormGroup label="Address" required>
              <Textarea 
                name="address" 
                defaultValue={editingItem?.address} 
                rows={3} 
                placeholder="College of Fishery Science, Jabalpur, Madhya Pradesh" 
                required 
              />
            </FormGroup>
          )}

          <FormGroup label="Description">
            <Textarea name="description" defaultValue={editingItem?.description} rows={2} placeholder="Additional information (optional)" />
          </FormGroup>
        </>
      )
    } else if (activeTab === 'stats') {
      return (
        <>
          <FormGroup label="Statistic Title" required>
            <Input name="title" defaultValue={editingItem?.title} placeholder="e.g., Alumni Network" required />
          </FormGroup>

          <div className="grid grid-cols-2 gap-4">
            <FormGroup label="Value" required>
              <Input name="value" defaultValue={editingItem?.value} placeholder="e.g., 500+" required />
            </FormGroup>

            <FormGroup label="Label" required>
              <Input name="label" defaultValue={editingItem?.label} placeholder="e.g., Alumni Worldwide" required />
            </FormGroup>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormGroup label="Icon Name" required>
              <Input name="icon" defaultValue={editingItem?.icon} placeholder="e.g., GraduationCap" required />
              <p className="text-xs text-gray-500 mt-1">Lucide icon name</p>
            </FormGroup>

            <FormGroup label="Color">
              <select name="color" defaultValue={editingItem?.color || 'blue'} className="form-select">
                <option value="blue">Blue</option>
                <option value="green">Green</option>
                <option value="purple">Purple</option>
                <option value="red">Red</option>
                <option value="yellow">Yellow</option>
              </select>
            </FormGroup>
          </div>

          <FormGroup label="Display Order">
            <Input type="number" name="order" defaultValue={editingItem?.order || 0} />
          </FormGroup>

          <FormGroup label="Description">
            <Textarea name="description" defaultValue={editingItem?.description} rows={2} placeholder="Additional context..." />
          </FormGroup>
        </>
      )
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Alumni Management</h1>
        <button
          onClick={() => {
            setEditingItem(null)
            setSelectedContactType('')
            setShowModal(true)
          }}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add New
        </button>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {tab.name}
                </button>
              )
            })}
          </nav>
        </div>

        {/* Content */}
        <div className="p-6">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading...</p>
            </div>
          ) : alumniItems.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No items found. Click "Add New" to create one.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {alumniItems.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{item.title}</h3>
                    {activeTab === 'testimonial' && (
                      <p className="text-sm text-gray-600">
                        {item.name} - {item.position} at {item.company}
                      </p>
                    )}
                    {activeTab === 'event' && (
                      <p className="text-sm text-gray-600">
                        {item.date} | {item.venue} | {item.registrationOpen ? 'Registration Open' : 'Registration Closed'}
                      </p>
                    )}
                    {activeTab === 'contact' && (
                      <p className="text-sm text-gray-600">
                        {item.contactType && `${item.contactType.toUpperCase()}: `}
                        {item.email || item.phone || item.address}
                      </p>
                    )}
                    {activeTab === 'stats' && (
                      <p className="text-sm text-gray-600">
                        {item.value} {item.label}
                      </p>
                    )}
                    <p className="text-xs text-gray-500 mt-1">
                      {item.isPublished ? (
                        <span className="text-green-600">Published</span>
                      ) : (
                        <span className="text-red-600">Draft</span>
                      )}
                      {' | '}Sort: {item.sortOrder}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false)
          setEditingItem(null)
          setSelectedContactType('')
        }}
        title={`${editingItem ? 'Edit' : 'Add'} ${tabs.find(t => t.id === activeTab)?.name}`}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          {renderForm()}

          <div className="grid grid-cols-2 gap-4">
            <FormGroup label="Sort Order">
              <Input type="number" name="sortOrder" defaultValue={editingItem?.sortOrder || 0} />
            </FormGroup>

            <FormGroup label="Status">
              <select name="isPublished" defaultValue={editingItem?.isPublished !== false ? 'true' : 'false'} className="form-select">
                <option value="true">Published</option>
                <option value="false">Draft</option>
              </select>
            </FormGroup>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={() => {
                setShowModal(false)
                setEditingItem(null)
                setSelectedContactType('')
              }}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {submitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Save
                </>
              )}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default AlumniManagement
