import React, { createContext, useContext, useState, useEffect } from 'react'
import { settingsAPI } from '../services/api'

const SettingsContext = createContext()

export const useSettings = () => {
  const context = useContext(SettingsContext)
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider')
  }
  return context
}

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState({
    siteName: 'College of Fishery, Jabalpur',
    siteDescription: 'Excellence in Fishery Education & Research',
    contactEmail: 'info@fisherycollege.edu',
    contactPhone: '+91-761-2345678',
    address: 'College of Fishery, Jabalpur, Madhya Pradesh',
    established: '2012',
    affiliatedUniversity: 'JNKVV, Jabalpur',
    principalName: 'Dr. Principal Name',
    location: {
      latitude: 23.1815,
      longitude: 79.9864,
      zoom: 15,
      mapTitle: 'College of Fishery, Jabalpur',
      mapDescription: 'Visit us at our campus in Jabalpur, Madhya Pradesh'
    },
    socialMedia: {
      facebook: '',
      twitter: '',
      linkedin: '',
      instagram: ''
    },
    admissionOpen: true,
    maintenanceMode: false,
    seoKeywords: ['fishery', 'education', 'research', 'college', 'jabalpur'],
    primaryColor: '#3B82F6',
    footerText: 'College of Fishery, Jabalpur - Excellence in Fishery Education & Research'
  })
  
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch settings on component mount
  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await settingsAPI.getPublic()
      if (response.data.success) {
        setSettings(response.data.data)
      }
    } catch (error) {
      console.error('Error fetching settings:', error)
      setError('Failed to load site settings')
      // Keep default settings on error
    } finally {
      setLoading(false)
    }
  }

  // Update settings and sync with backend
  const updateSettings = async (newSettings) => {
    try {
      const response = await settingsAPI.update(newSettings)
      if (response.data.success) {
        setSettings(response.data.data)
        return { success: true, message: 'Settings updated successfully' }
      }
    } catch (error) {
      console.error('Error updating settings:', error)
      return { 
        success: false, 
        message: error.response?.data?.message || 'Failed to update settings' 
      }
    }
  }

  // Get a specific setting value
  const getSetting = (key, defaultValue = '') => {
    return settings[key] || defaultValue
  }

  // Get nested setting value (e.g., 'socialMedia.facebook')
  const getNestedSetting = (path, defaultValue = '') => {
    return path.split('.').reduce((obj, key) => obj?.[key], settings) || defaultValue
  }

  const value = {
    settings,
    loading,
    error,
    updateSettings,
    fetchSettings,
    getSetting,
    getNestedSetting,
    // Commonly used settings as direct properties
    siteName: settings.siteName,
    siteDescription: settings.siteDescription,
    contactEmail: settings.contactEmail,
    contactPhone: settings.contactPhone,
    address: settings.address,
    established: settings.established,
    affiliatedUniversity: settings.affiliatedUniversity,
    principalName: settings.principalName,
    location: settings.location,
    socialMedia: settings.socialMedia,
    admissionOpen: settings.admissionOpen,
    maintenanceMode: settings.maintenanceMode,
    primaryColor: settings.primaryColor,
    footerText: settings.footerText
  }

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  )
}

export default SettingsContext





