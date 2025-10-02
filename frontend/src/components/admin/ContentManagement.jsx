import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { FileText, Image, Newspaper, Calendar } from 'lucide-react'
import GalleryManagement from './GalleryManagement'
import NewsManagement from './NewsManagement'
import EventsManagement from './EventsManagement'

const ContentManagement = () => {
  const location = useLocation()
  const navigate = useNavigate()
  
  // Extract tab from URL or default to gallery
  const getActiveTabFromUrl = () => {
    const searchParams = new URLSearchParams(location.search)
    return searchParams.get('tab') || 'gallery'
  }
  
  const [activeTab, setActiveTab] = useState(getActiveTabFromUrl())

  const tabs = [
    { 
      id: 'gallery', 
      name: 'Gallery', 
      icon: Image,
      description: 'Photo gallery and media'
    },
    { 
      id: 'news', 
      name: 'News', 
      icon: Newspaper,
      description: 'News articles and updates'
    },
    { 
      id: 'events', 
      name: 'Events', 
      icon: Calendar,
      description: 'Events and announcements'
    }
  ]

  const handleTabChange = (tabId) => {
    setActiveTab(tabId)
    navigate(`/admin/content?tab=${tabId}`)
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'gallery':
        return <GalleryManagement />
      case 'news':
        return <NewsManagement />
      case 'events':
        return <EventsManagement />
      default:
        return <GalleryManagement />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
            <FileText className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Content Management</h1>
            <p className="text-gray-600">Manage website content, media, and updates</p>
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
                    ? 'bg-purple-600 text-white shadow-lg'
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                <IconComponent className="w-5 h-5" />
                <div className="text-left">
                  <div className="font-medium">{tab.name}</div>
                  <div className="text-xs opacity-75">{tab.description}</div>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        {renderTabContent()}
      </div>
    </div>
  )
}

export default ContentManagement
