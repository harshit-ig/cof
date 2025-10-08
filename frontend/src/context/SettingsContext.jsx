import React, { createContext, useContext, useState, useEffect } from 'react'
import { contactAPI } from '../services/api'

const SettingsContext = createContext()

export const useSettings = () => {
  const context = useContext(SettingsContext)
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider')
  }
  return context
}

export const SettingsProvider = ({ children }) => {
  // Hardcoded site settings based on provided data
  const [siteSettings] = useState({
    siteName: 'College of Fishery Science, Jabalpur',
    siteDescription: 'Excellence in Fisheries Education & Research',
    established: '2012',
    affiliatedUniversity: 'NANAJI DESHMUKH VETERINARY SCIENCE UNIVERSITY, JABALPUR (NDVSU)',
    principalName: '',
    socialMedia: {
      facebook: '',
      twitter: '',
      linkedin: 'https://www.linkedin.com/company/cofs-jabalpur/',
      instagram: 'https://www.instagram.com/cofsc_jabalpur/'
    },
    admissionOpen: true,
    maintenanceMode: false,
    seoKeywords: ['fisheries', 'education', 'research', 'college', 'jabalpur'],
    primaryColor: '#3B82F6',
    footerText: 'College of Fishery Science, Jabalpur - Excellence in Fisheries Education & Research'
  })

  // Dynamic contact data from Contact API
  const [contactData, setContactData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch contact data on component mount
  useEffect(() => {
    fetchContactData()
  }, [])

  const fetchContactData = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await contactAPI.getPublic()
      if (response.data.success) {
        setContactData(response.data.data)
      }
    } catch (error) {
      console.error('Error fetching contact data:', error)
      setError('Failed to load contact information')
      // Use fallback contact data if API fails
      setContactData({
        contactInfo: {
          email: { main: 'info@fisheriescollege.edu' },
          phone: { main: '+91-761-2345678' },
          address: {
            institution: 'College of Fishery Science',
            university: 'NANAJI DESHMUKH VETERINARY SCIENCE UNIVERSITY',
            street: 'Livestock Farm (N.D.V.S.U), Near Adhartal Talab',
            city: 'Jabalpur',
            state: 'Madhya Pradesh',
            country: 'India',
            pincode: '482004'
          }
        },
        mapConfig: {
          latitude: 23.21394597114991,
          longitude: 79.95507593658256,
          zoom: 14
        }
      })
    } finally {
      setLoading(false)
    }
  }

  // Helper functions to get contact information
  const getContactEmail = () => {
    if (contactData?.contactInfo?.email) {
      return contactData.contactInfo.email.main || contactData.contactInfo.email.info || 'info@fisheriescollege.edu'
    }
    return 'info@fisheriescollege.edu'
  }

  const getContactPhone = () => {
    if (contactData?.contactInfo?.phone) {
      return contactData.contactInfo.phone.main || contactData.contactInfo.phone.office || '+91-761-2345678'
    }
    return '+91-761-2345678'
  }

  const getFormattedAddress = () => {
    if (contactData?.contactInfo?.address) {
      const addr = contactData.contactInfo.address
      return `${addr.institution}, ${addr.university}, ${addr.street}, ${addr.city}, ${addr.state} ${addr.pincode}, ${addr.country}`
    }
    return 'Livestock Farm (N.D.V.S.U), Near Adhartal Talab, Adhartal, Jabalpur, Madhya Pradesh, India 482004'
  }

  const getLocation = () => {
    if (contactData?.mapConfig) {
      return {
        latitude: contactData.mapConfig.latitude,
        longitude: contactData.mapConfig.longitude,
        zoom: contactData.mapConfig.zoom,
        mapTitle: siteSettings.siteName,
        mapDescription: 'Near Indian Coffee House Adhartal Suhagi Jabalpur, Madhya Pradesh'
      }
    }
    return {
      latitude: 23.21394597114991,
      longitude: 79.95507593658256,
      zoom: 14,
      mapTitle: siteSettings.siteName,
      mapDescription: 'Near Indian Coffee House Adhartal Suhagi Jabalpur, Madhya Pradesh'
    }
  }

  // Get a specific setting value
  const getSetting = (key, defaultValue = '') => {
    return siteSettings[key] || defaultValue
  }

  // Get nested setting value (e.g., 'socialMedia.facebook')
  const getNestedSetting = (path, defaultValue = '') => {
    return path.split('.').reduce((obj, key) => obj?.[key], siteSettings) || defaultValue
  }

  const value = {
    // Site settings (hardcoded)
    ...siteSettings,
    
    // Contact data (dynamic)
    contactEmail: getContactEmail(),
    contactPhone: getContactPhone(),
    address: getFormattedAddress(),
    location: getLocation(),
    
    // Contact data object for components that need it
    contactData,
    
    // Loading and error states
    loading,
    error,
    
    // Helper functions
    fetchContactData,
    getSetting,
    getNestedSetting,
    
    // Direct access to commonly used values
    siteName: siteSettings.siteName,
    siteDescription: siteSettings.siteDescription,
    established: siteSettings.established,
    affiliatedUniversity: siteSettings.affiliatedUniversity,
    principalName: siteSettings.principalName,
    socialMedia: siteSettings.socialMedia,
    admissionOpen: siteSettings.admissionOpen,
    maintenanceMode: siteSettings.maintenanceMode,
    primaryColor: siteSettings.primaryColor,
    footerText: siteSettings.footerText
  }

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  )
}

export default SettingsContext





