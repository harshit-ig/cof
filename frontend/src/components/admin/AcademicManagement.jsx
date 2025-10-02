import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { GraduationCap, BookOpen, Users, FileText, Info } from 'lucide-react'
import ProgramsManagement from './ProgramsManagement'
import FacultyManagement from './FacultyManagement'
import ResearchManagement from './ResearchManagement'
import ProgramDetailsManagement from './ProgramDetailsManagement'

const AcademicManagement = () => {
  const location = useLocation()
  const navigate = useNavigate()
  
  // Extract tab from URL or default to programs
  const getActiveTabFromUrl = () => {
    const searchParams = new URLSearchParams(location.search)
    return searchParams.get('tab') || 'programs'
  }
  
  const [activeTab, setActiveTab] = useState(getActiveTabFromUrl())

  const tabs = [
    { 
      id: 'programs', 
      name: 'Programs', 
      icon: BookOpen,
      description: 'Academic programs and courses'
    },
    { 
      id: 'program-details', 
      name: 'Program Details', 
      icon: Info,
      description: 'Detailed program information and curriculum'
    },
    { 
      id: 'faculty', 
      name: 'Faculty', 
      icon: Users,
      description: 'Faculty members and staff'
    },
    { 
      id: 'research', 
      name: 'Research Topics', 
      icon: FileText,
      description: 'Research areas and projects'
    }
  ]

  const handleTabChange = (tabId) => {
    setActiveTab(tabId)
    navigate(`/admin/academic?tab=${tabId}`)
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'programs':
        return <ProgramsManagement />
      case 'program-details':
        return <ProgramDetailsManagement />
      case 'faculty':
        return <FacultyManagement />
      case 'research':
        return <ResearchManagement />
      default:
        return <ProgramsManagement />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
            <GraduationCap className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Academic Management</h1>
            <p className="text-gray-600">Manage academic programs, faculty, and research</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => {
            const IconComponent = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-green-600 text-white shadow-lg'
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                <IconComponent className="w-5 h-5" />
                <div className="text-left">
                  <div className="font-semibold">{tab.name}</div>
                  <div className={`text-xs ${activeTab === tab.id ? 'text-green-100' : 'text-gray-500'}`}>
                    {tab.description}
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div>
        {renderTabContent()}
      </div>
    </div>
  )
}

export default AcademicManagement