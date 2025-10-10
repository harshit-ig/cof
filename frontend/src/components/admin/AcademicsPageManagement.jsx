import React, { useState, useEffect } from 'react'
import { Save, Eye, RefreshCw, Calendar, Building, FileText, Users, GraduationCap, Plus, Edit, Trash2, X, Fish, Settings, Leaf, Shield } from 'lucide-react'
import Card from '../common/Card'
import Modal, { ConfirmModal } from '../common/Modal'
import { Form, FormGroup, Input, Textarea, Select, SubmitButton } from '../common/Form'
import toast from 'react-hot-toast'
import { academicsAPI } from '../../services/api'

const AcademicsPageManagement = () => {
  const getIconComponent = (iconName) => {
    switch (iconName) {
      case 'fish': return Fish
      case 'gear': return Settings
      case 'leaf': return Leaf
      case 'shield': return Shield
      case 'building':
      default: return Building
    }
  }

  const [academicsData, setAcademicsData] = useState({
    departments: [
      {
        name: 'Aquaculture',
        description: 'Fish culture, breeding, and production techniques',
        icon: 'fish'
      },
      {
        name: 'Fishery Resource Management',
        description: 'Sustainable fishery and resource conservation',
        icon: 'shield'
      },
      {
        name: 'Fish Processing Technology',
        description: 'Food technology and value addition in fishery',
        icon: 'gear'
      },
      {
        name: 'Aquatic Environment Management',
        description: 'Environmental aspects of aquatic ecosystems',
        icon: 'leaf'
      }
    ],
    calendar: {
      events: [
        { event: 'Admission Opens', date: 'June 2025' },
        { event: 'Classes Begin', date: 'July 2025' },
        { event: 'Examinations', date: 'December 2025' }
      ]
    },
    regulations: [
      {
        title: 'Attendance',
        description: 'Minimum 75% attendance required'
      },
      {
        title: 'Examinations',
        description: 'Mid-term & final examination system'
      },
      {
        title: 'Grading',
        description: 'Credit-based grading system'
      }
    ],
    faculty: {
      title: 'Expert Faculty Members',
      description: 'Highly qualified and experienced faculty members specializing in various fields of fishery science.'
    }
  })

  const [activeTab, setActiveTab] = useState('departments')
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(true)
  const [hasChanges, setHasChanges] = useState(false)

  // Department modal states
  const [showDepartmentModal, setShowDepartmentModal] = useState(false)
  const [editingDepartment, setEditingDepartment] = useState(null)
  const [departmentFormData, setDepartmentFormData] = useState({
    name: '',
    description: '',
    icon: 'building'
  })
  const [submittingDepartment, setSubmittingDepartment] = useState(false)

  // Confirmation modal states
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState({ type: '', index: null, item: null })

  const tabs = [
    { id: 'departments', name: 'Departments', icon: Building },
    { id: 'calendar', name: 'Academic Calendar', icon: Calendar },
    { id: 'regulations', name: 'Regulations', icon: FileText },
    { id: 'additional', name: 'Faculty Section', icon: Users }
  ]

  useEffect(() => {
    fetchAcademicsData()
  }, [])

  const fetchAcademicsData = async () => {
    try {
      setLoading(true)
      const response = await academicsAPI.getPage()
      if (response.data.success) {
        setAcademicsData(response.data.data)
      } else {
        toast.error('Failed to load academics page data')
      }
    } catch (error) {
      console.error('Error fetching academics data:', error)
      toast.error('Failed to load academics page data')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (section, field, value, index = null) => {
    setHasChanges(true)
    setAcademicsData(prev => {
      const newData = { ...prev }
      
      if (index !== null) {
        newData[section][index][field] = value
      } else if (field.includes('.')) {
        const [parentField, childField] = field.split('.')
        newData[section][parentField][childField] = value
      } else {
        newData[section][field] = value
      }
      
      return newData
    })
  }

  const addDepartment = () => {
    setEditingDepartment(null)
    setDepartmentFormData({
      name: '',
      description: '',
      icon: 'building'
    })
    setShowDepartmentModal(true)
  }

  const editDepartment = (index) => {
    const dept = academicsData.departments[index]
    setEditingDepartment(index)
    setDepartmentFormData({
      name: dept.name,
      description: dept.description,
      icon: dept.icon
    })
    setShowDepartmentModal(true)
  }

  const handleDepartmentSubmit = async (e) => {
    e.preventDefault()
    setSubmittingDepartment(true)

    try {
      setHasChanges(true)
      
      if (editingDepartment !== null) {
        // Update existing department
        setAcademicsData(prev => ({
          ...prev,
          departments: prev.departments.map((dept, index) => 
            index === editingDepartment ? departmentFormData : dept
          )
        }))
        toast.success('Department updated successfully')
      } else {
        // Add new department
        setAcademicsData(prev => ({
          ...prev,
          departments: [...prev.departments, departmentFormData]
        }))
        toast.success('Department added successfully')
      }

      setShowDepartmentModal(false)
      setEditingDepartment(null)
      setDepartmentFormData({ name: '', description: '', icon: 'building' })
    } catch (error) {
      toast.error('Failed to save department')
    } finally {
      setSubmittingDepartment(false)
    }
  }

  const confirmDeleteDepartment = (index) => {
    const dept = academicsData.departments[index]
    setDeleteTarget({ type: 'department', index, item: dept })
    setShowDeleteModal(true)
  }

  const handleDeleteConfirm = () => {
    setHasChanges(true)
    
    if (deleteTarget.type === 'department') {
      setAcademicsData(prev => ({
        ...prev,
        departments: prev.departments.filter((_, i) => i !== deleteTarget.index)
      }))
      toast.success('Department deleted successfully')
    } else if (deleteTarget.type === 'calendar') {
      setAcademicsData(prev => ({
        ...prev,
        calendar: {
          ...prev.calendar,
          events: prev.calendar.events.filter((_, i) => i !== deleteTarget.index)
        }
      }))
      toast.success('Calendar event deleted successfully')
    } else if (deleteTarget.type === 'regulation') {
      setAcademicsData(prev => ({
        ...prev,
        regulations: prev.regulations.filter((_, i) => i !== deleteTarget.index)
      }))
      toast.success('Regulation deleted successfully')
    }
    
    setShowDeleteModal(false)
    setDeleteTarget({ type: '', index: null, item: null })
  }

  const removeDepartment = (index) => {
    confirmDeleteDepartment(index)
  }

  const handleDepartmentFormChange = (e) => {
    const { name, value } = e.target
    setDepartmentFormData(prev => ({ ...prev, [name]: value }))
  }

  const addCalendarEvent = () => {
    setHasChanges(true)
    setAcademicsData(prev => ({
      ...prev,
      calendar: {
        ...prev.calendar,
        events: [
          ...prev.calendar.events,
          { event: '', date: '' }
        ]
      }
    }))
  }

  const removeCalendarEvent = (index) => {
    const event = academicsData.calendar.events[index]
    setDeleteTarget({ type: 'calendar', index, item: event })
    setShowDeleteModal(true)
  }

  const addRegulation = () => {
    setHasChanges(true)
    setAcademicsData(prev => ({
      ...prev,
      regulations: [
        ...prev.regulations,
        { title: '', description: '' }
      ]
    }))
  }

  const removeRegulation = (index) => {
    const regulation = academicsData.regulations[index]
    setDeleteTarget({ type: 'regulation', index, item: regulation })
    setShowDeleteModal(true)
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const response = await academicsAPI.updatePage(academicsData)
      
      if (response.data.success) {
        setHasChanges(false)
        toast.success('Academics page updated successfully!')
        
        // Trigger a custom event to notify other components about the update
        window.dispatchEvent(new CustomEvent('academicsDataUpdated', {
          detail: response.data.data
        }))
      } else {
        toast.error(response.data.message || 'Failed to save academics page data')
      }
    } catch (error) {
      console.error('Error saving academics data:', error)
      toast.error(error.response?.data?.message || 'Failed to save academics page data')
    } finally {
      setSaving(false)
    }
  }

  const previewPage = () => {
    // Open academics page in new tab
    window.open('/academics', '_blank')
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'departments':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Departments</h3>
                <p className="text-sm text-gray-600">Manage academic departments and their information</p>
              </div>
              <button
                onClick={addDepartment}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Department
              </button>
            </div>
            
            {academicsData.departments.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                <Building className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">No departments added yet</p>
                <button
                  onClick={addDepartment}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Your First Department
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {academicsData.departments.map((dept, index) => {
                  const IconComponent = getIconComponent(dept.icon)
                  return (
                    <Card key={index} className="p-4 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                            <IconComponent className="w-4 h-4 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">{dept.name || 'Untitled Department'}</h4>
                            <p className="text-xs text-gray-500 capitalize">Icon: {dept.icon}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => editDepartment(index)}
                            className="p-1.5 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition-colors"
                            title="Edit Department"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => confirmDeleteDepartment(index)}
                            className="p-1.5 text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-colors"
                            title="Delete Department"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {dept.description || 'No description provided'}
                      </p>
                    </Card>
                  )
                })}
              </div>
            )}
          </div>
        )

      case 'calendar':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">Academic Calendar Events</h3>
              <button
                onClick={addCalendarEvent}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Add Event
              </button>
            </div>
            
            {academicsData.calendar.events.map((event, index) => (
              <Card key={index} className="p-4">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="text-md font-medium text-gray-900">Event {index + 1}</h4>
                  <button
                    onClick={() => removeCalendarEvent(index)}
                    className="p-1.5 text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-colors"
                    title="Delete Event"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Event Name <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      value={event.event}
                      onChange={(e) => handleInputChange('calendar', 'event', e.target.value, index)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      value={event.date}
                      onChange={(e) => handleInputChange('calendar', 'date', e.target.value, index)}
                      placeholder="e.g., June 2025"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )

      case 'regulations':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">Academic Regulations</h3>
              <button
                onClick={addRegulation}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Add Regulation
              </button>
            </div>
            
            {academicsData.regulations.map((regulation, index) => (
              <Card key={index} className="p-4">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="text-md font-medium text-gray-900">Regulation {index + 1}</h4>
                  <button
                    onClick={() => removeRegulation(index)}
                    className="p-1.5 text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-colors"
                    title="Delete Regulation"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                    <input
                      type="text"
                      value={regulation.title}
                      onChange={(e) => handleInputChange('regulations', 'title', e.target.value, index)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <input
                      type="text"
                      value={regulation.description}
                      onChange={(e) => handleInputChange('regulations', 'description', e.target.value, index)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )

      case 'additional':
        return (
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Faculty Section</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    value={academicsData.faculty.title}
                    onChange={(e) => handleInputChange('faculty', 'title', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    value={academicsData.faculty.description}
                    onChange={(e) => handleInputChange('faculty', 'description', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </Card>
          </div>
        )

      default:
        return <div>Select a tab to edit content</div>
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading academics content...</p>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading academics content...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Academics Page Management</h1>
            <p className="text-gray-600">Manage the content and sections of the academics page</p>
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={previewPage}
              className="flex items-center px-4 py-2 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50"
            >
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </button>
            
            <button
              onClick={handleSave}
              disabled={saving || !hasChanges}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? (
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Save className="w-4 h-4 mr-2" />
              )}
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
        
        {hasChanges && (
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
            <p className="text-sm text-yellow-800">You have unsaved changes</p>
          </div>
        )}
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {tab.name}
                </button>
              )
            })}
          </nav>
        </div>
        
        <div className="p-6">
          {renderTabContent()}
        </div>
      </div>

      {/* Department Modal */}
      <Modal
        isOpen={showDepartmentModal}
        onClose={() => {
          setShowDepartmentModal(false)
          setEditingDepartment(null)
          setDepartmentFormData({ name: '', description: '', icon: 'building' })
        }}
        title={editingDepartment !== null ? 'Edit Department' : 'Add New Department'}
        size="md"
      >
        <Form onSubmit={handleDepartmentSubmit}>
          <div className="space-y-4">
            <FormGroup label="Department Name" required>
              <Input
                name="name"
                value={departmentFormData.name}
                onChange={handleDepartmentFormChange}
                placeholder="Enter department name"
                required
              />
            </FormGroup>

            <FormGroup label="Icon">
              <Select
                name="icon"
                value={departmentFormData.icon}
                onChange={handleDepartmentFormChange}
                options={[
                  { value: 'building', label: 'Building' },
                  { value: 'fish', label: 'Fish' },
                  { value: 'gear', label: 'Gear' },
                  { value: 'leaf', label: 'Leaf' },
                  { value: 'shield', label: 'Shield' }
                ]}
              />
            </FormGroup>

            <FormGroup label="Description" required>
              <Textarea
                name="description"
                value={departmentFormData.description}
                onChange={handleDepartmentFormChange}
                placeholder="Enter department description"
                rows={3}
                required
              />
            </FormGroup>
          </div>

          <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={() => {
                setShowDepartmentModal(false)
                setEditingDepartment(null)
                setDepartmentFormData({ name: '', description: '', icon: 'building' })
              }}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <SubmitButton isLoading={submittingDepartment}>
              {editingDepartment !== null ? 'Update Department' : 'Add Department'}
            </SubmitButton>
          </div>
        </Form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteConfirm}
        title={`Delete ${deleteTarget.type === 'department' ? 'Department' : deleteTarget.type === 'calendar' ? 'Calendar Event' : deleteTarget.type === 'regulation' ? 'Regulation' : 'Item'}`}
        message={
          deleteTarget.type === 'department' 
            ? `Are you sure you want to delete "${deleteTarget.item?.name}"? This action cannot be undone.`
            : deleteTarget.type === 'calendar'
            ? `Are you sure you want to delete the event "${deleteTarget.item?.event}"? This action cannot be undone.`
            : deleteTarget.type === 'regulation'
            ? `Are you sure you want to delete the regulation "${deleteTarget.item?.title}"? This action cannot be undone.`
            : 'Are you sure you want to delete this item? This action cannot be undone.'
        }
        type="danger"
      />
    </div>
  )
}

export default AcademicsPageManagement