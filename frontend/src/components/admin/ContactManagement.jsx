import React, { useState, useEffect } from 'react'
import { Phone, Mail, MapPin, Clock, Building, Users, AlertCircle, Edit, Trash2, Plus, Save, X, Globe } from 'lucide-react'
import { contactAPI } from '../../services/api'
import LoadingSpinner from '../common/LoadingSpinner'
import Modal from '../common/Modal'
import { Form, FormGroup, Input, Textarea, SubmitButton } from '../common/Form'
import toast from 'react-hot-toast'

const ContactManagement = () => {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [activeTab, setActiveTab] = useState('basic')
  const [contactData, setContactData] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [modalType, setModalType] = useState('') // 'department' or 'emergency'
  const [editingItem, setEditingItem] = useState(null)

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    head: '',
    description: '',
    title: ''
  })

  const tabs = [
    { id: 'basic', name: 'Basic Info', icon: Phone },
    { id: 'map', name: 'Map & Location', icon: MapPin },
    { id: 'departments', name: 'Departments', icon: Building },
    { id: 'emergency', name: 'Emergency Contacts', icon: AlertCircle },
    { id: 'social', name: 'Social Media', icon: Globe }
  ]

  useEffect(() => {
    fetchContactData()
  }, [])

  const fetchContactData = async () => {
    try {
      setLoading(true)
      const response = await contactAPI.get()
      if (response.data.success) {
        setContactData(response.data.data)
      }
    } catch (error) {
      console.error('Error fetching contact data:', error)
      toast.error('Failed to load contact data')
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async (section, data) => {
    try {
      setSaving(true)
      const response = await contactAPI.update({
        ...contactData,
        [section]: data
      })
      if (response.data.success) {
        setContactData(response.data.data)
        toast.success('Contact information updated successfully')
      }
    } catch (error) {
      console.error('Error updating contact data:', error)
      toast.error('Failed to update contact information')
    } finally {
      setSaving(false)
    }
  }

  const handleAddItem = (type) => {
    setModalType(type)
    setEditingItem(null)
    setFormData({
      name: '',
      phone: '',
      email: '',
      head: '',
      description: '',
      title: ''
    })
    setShowModal(true)
  }

  const handleEditItem = (type, item) => {
    setModalType(type)
    setEditingItem(item)
    setFormData({
      name: item.name || '',
      phone: item.phone || '',
      email: item.email || '',
      head: item.head || '',
      description: item.description || '',
      title: item.title || ''
    })
    setShowModal(true)
  }

  const handleSubmitItem = async (e) => {
    e.preventDefault()
    try {
      setSaving(true)
      let response
      
      if (modalType === 'department') {
        if (editingItem) {
          response = await contactAPI.updateDepartment(editingItem._id, formData)
        } else {
          response = await contactAPI.addDepartment(formData)
        }
      } else if (modalType === 'emergency') {
        if (editingItem) {
          response = await contactAPI.updateEmergencyContact(editingItem._id, formData)
        } else {
          response = await contactAPI.addEmergencyContact(formData)
        }
      }

      if (response.data.success) {
        setContactData(response.data.data)
        setShowModal(false)
        toast.success(`${modalType === 'department' ? 'Department' : 'Emergency contact'} ${editingItem ? 'updated' : 'added'} successfully`)
      }
    } catch (error) {
      console.error('Error saving item:', error)
      toast.error('Failed to save item')
    } finally {
      setSaving(false)
    }
  }

  const handleDeleteItem = async (type, id) => {
    if (!confirm(`Are you sure you want to delete this ${type}?`)) return

    try {
      setSaving(true)
      let response
      
      if (type === 'department') {
        response = await contactAPI.deleteDepartment(id)
      } else if (type === 'emergency') {
        response = await contactAPI.deleteEmergencyContact(id)
      }

      if (response.data.success) {
        setContactData(response.data.data)
        toast.success(`${type === 'department' ? 'Department' : 'Emergency contact'} deleted successfully`)
      }
    } catch (error) {
      console.error('Error deleting item:', error)
      toast.error('Failed to delete item')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner />
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Contact Management</h1>
        <p className="text-gray-600 mt-2">Manage contact information, departments, and emergency contacts.</p>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.name}</span>
              </button>
            )
          })}
        </nav>
      </div>

      {contactData && (
        <>
          {/* Basic Contact Information */}
          {activeTab === 'basic' && (
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900 mb-6">Basic Contact Information</h3>
              <BasicContactForm 
                contactInfo={contactData.contactInfo} 
                onSave={(data) => handleSave('contactInfo', data)}
                saving={saving}
              />
            </div>
          )}

          {/* Map & Location */}
          {activeTab === 'map' && (
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900 mb-6">Map Configuration & Directions</h3>
              <MapConfigForm 
                mapConfig={contactData.mapConfig}
                directions={contactData.directions}
                onSave={(mapData, directionsData) => {
                  handleSave('mapConfig', mapData)
                  handleSave('directions', directionsData)
                }}
                saving={saving}
              />
            </div>
          )}

          {/* Departments */}
          {activeTab === 'departments' && (
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-medium text-gray-900">Department Contacts</h3>
                <button
                  onClick={() => handleAddItem('department')}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center space-x-2"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Department</span>
                </button>
              </div>
              
              <DepartmentsList 
                departments={contactData.departments || []}
                onEdit={(item) => handleEditItem('department', item)}
                onDelete={(id) => handleDeleteItem('department', id)}
              />
            </div>
          )}

          {/* Emergency Contacts */}
          {activeTab === 'emergency' && (
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-medium text-gray-900">Emergency Contacts</h3>
                <button
                  onClick={() => handleAddItem('emergency')}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 flex items-center space-x-2"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Emergency Contact</span>
                </button>
              </div>
              
              <EmergencyContactsList 
                contacts={contactData.emergencyContacts || []}
                onEdit={(item) => handleEditItem('emergency', item)}
                onDelete={(id) => handleDeleteItem('emergency', id)}
              />
            </div>
          )}

          {/* Social Media */}
          {activeTab === 'social' && (
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900 mb-6">Social Media Links</h3>
              <SocialMediaForm 
                socialMedia={contactData.socialMedia}
                onSave={(data) => handleSave('socialMedia', data)}
                saving={saving}
              />
            </div>
          )}
        </>
      )}

      {/* Add/Edit Modal */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} size="md">
        <div className="p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            {editingItem ? 'Edit' : 'Add'} {modalType === 'department' ? 'Department' : 'Emergency Contact'}
          </h3>
          
          <Form onSubmit={handleSubmitItem}>
            {modalType === 'department' ? (
              <>
                <FormGroup>
                  <Input
                    label="Department Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Input
                    label="Phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </FormGroup>
                <FormGroup>
                  <Input
                    label="Email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </FormGroup>
                <FormGroup>
                  <Input
                    label="Department Head"
                    value={formData.head}
                    onChange={(e) => setFormData({ ...formData, head: e.target.value })}
                  />
                </FormGroup>
                <FormGroup>
                  <Textarea
                    label="Description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                  />
                </FormGroup>
              </>
            ) : (
              <>
                <FormGroup>
                  <Input
                    label="Title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Input
                    label="Contact Person"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </FormGroup>
                <FormGroup>
                  <Input
                    label="Phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Textarea
                    label="Description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                  />
                </FormGroup>
              </>
            )}
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                Cancel
              </button>
              <SubmitButton loading={saving}>
                {editingItem ? 'Update' : 'Add'}
              </SubmitButton>
            </div>
          </Form>
        </div>
      </Modal>
    </div>
  )
}

// Basic Contact Form Component
const BasicContactForm = ({ contactInfo, onSave, saving }) => {
  const [formData, setFormData] = useState(contactInfo || {})

  useEffect(() => {
    setFormData(contactInfo || {})
  }, [contactInfo])

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <Form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Phone Numbers */}
        <div>
          <h4 className="font-medium text-gray-900 mb-4">Phone Numbers</h4>
          <div className="space-y-4">
            <Input
              label="Main Phone"
              value={formData.phone?.main || ''}
              onChange={(e) => setFormData({
                ...formData,
                phone: { ...formData.phone, main: e.target.value }
              })}
            />
            <Input
              label="Office Phone"
              value={formData.phone?.office || ''}
              onChange={(e) => setFormData({
                ...formData,
                phone: { ...formData.phone, office: e.target.value }
              })}
            />
            <Input
              label="Fax"
              value={formData.phone?.fax || ''}
              onChange={(e) => setFormData({
                ...formData,
                phone: { ...formData.phone, fax: e.target.value }
              })}
            />
          </div>
        </div>

        {/* Email Addresses */}
        <div>
          <h4 className="font-medium text-gray-900 mb-4">Email Addresses</h4>
          <div className="space-y-4">
            <Input
              label="Main Email"
              type="email"
              value={formData.email?.main || ''}
              onChange={(e) => setFormData({
                ...formData,
                email: { ...formData.email, main: e.target.value }
              })}
            />
            <Input
              label="Registrar Email"
              type="email"
              value={formData.email?.registrar || ''}
              onChange={(e) => setFormData({
                ...formData,
                email: { ...formData.email, registrar: e.target.value }
              })}
            />
            <Input
              label="Info Email"
              type="email"
              value={formData.email?.info || ''}
              onChange={(e) => setFormData({
                ...formData,
                email: { ...formData.email, info: e.target.value }
              })}
            />
          </div>
        </div>
      </div>

      {/* Address */}
      <div className="mt-6">
        <h4 className="font-medium text-gray-900 mb-4">Address</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Institution"
            value={formData.address?.institution || ''}
            onChange={(e) => setFormData({
              ...formData,
              address: { ...formData.address, institution: e.target.value }
            })}
          />
          <Input
            label="University"
            value={formData.address?.university || ''}
            onChange={(e) => setFormData({
              ...formData,
              address: { ...formData.address, university: e.target.value }
            })}
          />
          <Input
            label="Street"
            value={formData.address?.street || ''}
            onChange={(e) => setFormData({
              ...formData,
              address: { ...formData.address, street: e.target.value }
            })}
          />
          <Input
            label="City"
            value={formData.address?.city || ''}
            onChange={(e) => setFormData({
              ...formData,
              address: { ...formData.address, city: e.target.value }
            })}
          />
          <Input
            label="State"
            value={formData.address?.state || ''}
            onChange={(e) => setFormData({
              ...formData,
              address: { ...formData.address, state: e.target.value }
            })}
          />
          <Input
            label="Pincode"
            value={formData.address?.pincode || ''}
            onChange={(e) => setFormData({
              ...formData,
              address: { ...formData.address, pincode: e.target.value }
            })}
          />
        </div>
      </div>

      {/* Office Hours */}
      <div className="mt-6">
        <h4 className="font-medium text-gray-900 mb-4">Office Hours</h4>
        <div className="space-y-4">
          <Input
            label="Weekdays"
            value={formData.officeHours?.weekdays || ''}
            onChange={(e) => setFormData({
              ...formData,
              officeHours: { ...formData.officeHours, weekdays: e.target.value }
            })}
          />
          <Input
            label="Saturday"
            value={formData.officeHours?.saturday || ''}
            onChange={(e) => setFormData({
              ...formData,
              officeHours: { ...formData.officeHours, saturday: e.target.value }
            })}
          />
          <Input
            label="Sunday"
            value={formData.officeHours?.sunday || ''}
            onChange={(e) => setFormData({
              ...formData,
              officeHours: { ...formData.officeHours, sunday: e.target.value }
            })}
          />
        </div>
      </div>

      <div className="mt-8">
        <SubmitButton loading={saving}>
          Save Basic Information
        </SubmitButton>
      </div>
    </Form>
  )
}

// Map Configuration Form Component
const MapConfigForm = ({ mapConfig, directions, onSave, saving }) => {
  const [mapData, setMapData] = useState(mapConfig || {})
  const [directionsData, setDirectionsData] = useState(directions || {})

  useEffect(() => {
    setMapData(mapConfig || {})
    setDirectionsData(directions || {})
  }, [mapConfig, directions])

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(mapData, directionsData)
  }

  return (
    <Form onSubmit={handleSubmit}>
      {/* Map Configuration */}
      <div className="mb-8">
        <h4 className="font-medium text-gray-900 mb-4">Map Configuration</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Map Title"
            value={mapData.title || ''}
            onChange={(e) => setMapData({ ...mapData, title: e.target.value })}
          />
          <Input
            label="Map Description"
            value={mapData.description || ''}
            onChange={(e) => setMapData({ ...mapData, description: e.target.value })}
          />
          <Input
            label="Latitude"
            type="number"
            step="any"
            value={mapData.latitude || ''}
            onChange={(e) => setMapData({ ...mapData, latitude: parseFloat(e.target.value) })}
          />
          <Input
            label="Longitude"
            type="number"
            step="any"
            value={mapData.longitude || ''}
            onChange={(e) => setMapData({ ...mapData, longitude: parseFloat(e.target.value) })}
          />
          <Input
            label="Zoom Level"
            type="number"
            min="1"
            max="20"
            value={mapData.zoom || ''}
            onChange={(e) => setMapData({ ...mapData, zoom: parseInt(e.target.value) })}
          />
        </div>
      </div>

      {/* Directions */}
      <div className="mb-8">
        <h4 className="font-medium text-gray-900 mb-4">Directions</h4>
        <div className="space-y-4">
          <Textarea
            label="By Road"
            value={directionsData.byRoad || ''}
            onChange={(e) => setDirectionsData({ ...directionsData, byRoad: e.target.value })}
            rows={2}
          />
          <Textarea
            label="By Air"
            value={directionsData.byAir || ''}
            onChange={(e) => setDirectionsData({ ...directionsData, byAir: e.target.value })}
            rows={2}
          />
          <Textarea
            label="By Train"
            value={directionsData.byTrain || ''}
            onChange={(e) => setDirectionsData({ ...directionsData, byTrain: e.target.value })}
            rows={2}
          />
        </div>
      </div>

      <SubmitButton loading={saving}>
        Save Map & Directions
      </SubmitButton>
    </Form>
  )
}

// Social Media Form Component
const SocialMediaForm = ({ socialMedia, onSave, saving }) => {
  const [formData, setFormData] = useState(socialMedia || {})

  useEffect(() => {
    setFormData(socialMedia || {})
  }, [socialMedia])

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <Form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Facebook URL"
          value={formData.facebook || ''}
          onChange={(e) => setFormData({ ...formData, facebook: e.target.value })}
          placeholder="https://facebook.com/yourpage"
        />
        <Input
          label="Twitter URL"
          value={formData.twitter || ''}
          onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
          placeholder="https://twitter.com/yourhandle"
        />
        <Input
          label="LinkedIn URL"
          value={formData.linkedin || ''}
          onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
          placeholder="https://linkedin.com/company/yourcompany"
        />
        <Input
          label="Instagram URL"
          value={formData.instagram || ''}
          onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
          placeholder="https://instagram.com/yourhandle"
        />
        <Input
          label="YouTube URL"
          value={formData.youtube || ''}
          onChange={(e) => setFormData({ ...formData, youtube: e.target.value })}
          placeholder="https://youtube.com/yourchannel"
        />
      </div>

      <div className="mt-8">
        <SubmitButton loading={saving}>
          Save Social Media Links
        </SubmitButton>
      </div>
    </Form>
  )
}

// Departments List Component
const DepartmentsList = ({ departments, onEdit, onDelete }) => {
  if (!departments || departments.length === 0) {
    return (
      <div className="text-center py-12">
        <Building className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-500">No departments added yet.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {departments.map((dept) => (
        <div key={dept._id} className="border border-gray-200 rounded-lg p-4">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h4 className="font-medium text-gray-900">{dept.name}</h4>
              {dept.head && <p className="text-sm text-gray-600 mt-1">Head: {dept.head}</p>}
              {dept.phone && <p className="text-sm text-gray-600">Phone: {dept.phone}</p>}
              {dept.email && <p className="text-sm text-gray-600">Email: {dept.email}</p>}
              {dept.description && <p className="text-sm text-gray-600 mt-2">{dept.description}</p>}
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => onEdit(dept)}
                className="text-blue-600 hover:text-blue-700"
              >
                <Edit className="h-4 w-4" />
              </button>
              <button
                onClick={() => onDelete(dept._id)}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

// Emergency Contacts List Component
const EmergencyContactsList = ({ contacts, onEdit, onDelete }) => {
  if (!contacts || contacts.length === 0) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-500">No emergency contacts added yet.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {contacts.map((contact) => (
        <div key={contact._id} className="border border-gray-200 rounded-lg p-4">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h4 className="font-medium text-gray-900">{contact.title}</h4>
              {contact.name && <p className="text-sm text-gray-600 mt-1">Contact: {contact.name}</p>}
              {contact.phone && <p className="text-sm text-red-600 font-medium">Phone: {contact.phone}</p>}
              {contact.description && <p className="text-sm text-gray-600 mt-2">{contact.description}</p>}
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => onEdit(contact)}
                className="text-blue-600 hover:text-blue-700"
              >
                <Edit className="h-4 w-4" />
              </button>
              <button
                onClick={() => onDelete(contact._id)}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ContactManagement