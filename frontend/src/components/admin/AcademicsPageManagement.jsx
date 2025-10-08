import React, { useState, useEffect } from 'react'
import { Save, Eye, RefreshCw, Calendar, Building, FileText, Users, GraduationCap } from 'lucide-react'
import Card from '../common/Card'
import toast from 'react-hot-toast'
import { academicsAPI } from '../../services/api'

const AcademicsPageManagement = () => {
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
    setHasChanges(true)
    setAcademicsData(prev => ({
      ...prev,
      departments: [
        ...prev.departments,
        { name: '', description: '', icon: 'building' }
      ]
    }))
  }

  const removeDepartment = (index) => {
    setHasChanges(true)
    setAcademicsData(prev => ({
      ...prev,
      departments: prev.departments.filter((_, i) => i !== index)
    }))
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
    setHasChanges(true)
    setAcademicsData(prev => ({
      ...prev,
      calendar: {
        ...prev.calendar,
        events: prev.calendar.events.filter((_, i) => i !== index)
      }
    }))
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
    setHasChanges(true)
    setAcademicsData(prev => ({
      ...prev,
      regulations: prev.regulations.filter((_, i) => i !== index)
    }))
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
              <h3 className="text-lg font-medium text-gray-900">Departments</h3>
              <button
                onClick={addDepartment}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Add Department
              </button>
            </div>
            
            {academicsData.departments.map((dept, index) => (
              <Card key={index} className="p-4">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="text-md font-medium text-gray-900">Department {index + 1}</h4>
                  <button
                    onClick={() => removeDepartment(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Department Name <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      value={dept.name}
                      onChange={(e) => handleInputChange('departments', 'name', e.target.value, index)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Icon (optional)</label>
                    <select
                      value={dept.icon}
                      onChange={(e) => handleInputChange('departments', 'icon', e.target.value, index)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="building">Building</option>
                      <option value="fish">Fish</option>
                      <option value="gear">Gear</option>
                      <option value="leaf">Leaf</option>
                      <option value="shield">Shield</option>
                    </select>
                  </div>
                </div>
                
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description <span className="text-red-500">*</span></label>
                  <textarea
                    value={dept.description}
                    onChange={(e) => handleInputChange('departments', 'description', e.target.value, index)}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </Card>
            ))}
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
                    className="text-red-600 hover:text-red-800"
                  >
                    Remove
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
                    className="text-red-600 hover:text-red-800"
                  >
                    Remove
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
    </div>
  )
}

export default AcademicsPageManagement