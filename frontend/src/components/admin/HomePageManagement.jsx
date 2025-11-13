import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Home, User, Image, Globe, Bell, Share2 } from 'lucide-react'
import WelcomeMessageManagement from './WelcomeMessageManagement'
import SlideshowManagement from './SlideshowManagement'
import PartnersManagement from './PartnersManagement'
import ImportantNoticeManagement from './ImportantNoticeManagement'
import SocialMediaManagement from './SocialMediaManagement'

const HomePageManagement = () => {
  const location = useLocation()
  const navigate = useNavigate()
  
  // Extract tab from URL or default to welcome
  const getActiveTabFromUrl = () => {
    const searchParams = new URLSearchParams(location.search)
    return searchParams.get('tab') || 'welcome'
  }
  
  const [activeTab, setActiveTab] = useState(getActiveTabFromUrl())

  const tabs = [
    { 
      id: 'welcome', 
      name: 'Welcome Message', 
      icon: User,
      description: 'Dean\'s welcome message and photo'
    },
    { 
      id: 'notices', 
      name: 'Important Notices', 
      icon: Bell,
      description: 'Manage important announcements and notices'
    },
    { 
      id: 'social-media', 
      name: 'Social Media', 
      icon: Share2,
      description: 'LinkedIn and Twitter/X posts'
    },
    { 
      id: 'slideshow', 
      name: 'Hero Slideshow', 
      icon: Image,
      description: 'Homepage hero banner images'
    },
    { 
      id: 'partners', 
      name: 'Partners', 
      icon: Globe,
      description: 'Partner organizations and logos'
    }
  ]

  const handleTabChange = (tabId) => {
    setActiveTab(tabId)
    navigate(`/admin/homepage?tab=${tabId}`)
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'welcome':
        return <WelcomeMessageManagement />
      case 'notices':
        return <ImportantNoticeManagement />
      case 'social-media':
        return <SocialMediaManagement />
      case 'slideshow':
        return <SlideshowManagement />
      case 'partners':
        return <PartnersManagement />
      default:
        return <WelcomeMessageManagement />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <Home className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Home Page Management</h1>
            <p className="text-gray-600">Manage content that appears on the homepage</p>
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
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                <IconComponent className="w-5 h-5" />
                <div className="text-left">
                  <div className="font-semibold">{tab.name}</div>
                  <div className={`text-xs ${activeTab === tab.id ? 'text-blue-100' : 'text-gray-500'}`}>
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

export default HomePageManagement