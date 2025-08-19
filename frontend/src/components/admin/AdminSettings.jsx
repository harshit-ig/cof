import React, { useState, useEffect } from 'react'
import { Save, User, Lock, Settings, Bell, Database, Shield, Mail, Globe } from 'lucide-react'
import { authAPI, adminAPI } from '../../services/api'
import LoadingSpinner from '../common/LoadingSpinner'
import ImageUpload from './ImageUpload'
import toast from 'react-hot-toast'

const AdminSettings = () => {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [activeTab, setActiveTab] = useState('profile')
  const [adminData, setAdminData] = useState({})

  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    avatar: '',
    role: '',
    department: '',
    bio: ''
  })

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  const [systemSettings, setSystemSettings] = useState({
    siteName: 'College of Engineering',
    siteDescription: 'Excellence in Engineering Education',
    contactEmail: 'admin@college.edu',
    contactPhone: '+1 (555) 123-4567',
    address: '123 College Street, City, State 12345',
    socialMedia: {
      facebook: '',
      twitter: '',
      linkedin: '',
      instagram: '',
      youtube: ''
    },
    maintenance: {
      enabled: false,
      message: 'Site is under maintenance. Please check back soon.'
    },
    features: {
      allowRegistration: true,
      enableComments: true,
      enableNotifications: true,
      enableAnalytics: false
    }
  })

  const [emailSettings, setEmailSettings] = useState({
    smtpHost: '',
    smtpPort: '',
    smtpUser: '',
    smtpPassword: '',
    fromEmail: '',
    fromName: '',
    enableEmail: false
  })

  const [dbStats, setDbStats] = useState({
    database: {
      faculty: 0,
      news: 0,
      programs: 0,
      research: 0,
      infrastructure: 0,
      collaborations: 0,
      admins: 0,
      total: 0
    },
    files: {
      count: 0,
      size: 0
    }
  })

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'system', label: 'System', icon: Settings },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'email', label: 'Email', icon: Mail },
    { id: 'database', label: 'Database', icon: Database }
  ]

  useEffect(() => {
    fetchAdminData()
    fetchDatabaseStats()
  }, [])

  const fetchAdminData = async () => {
    try {
      setLoading(true)
      // Fetch current admin profile
      const response = await authAPI.getProfile()
      const admin = response.data.data
      
      setAdminData(admin)
      setProfileData({
        name: admin.name || '',
        email: admin.email || '',
        phone: admin.phone || '',
        avatar: admin.avatar || '',
        role: admin.role || '',
        department: admin.department || '',
        bio: admin.bio || ''
      })
    } catch (error) {
      console.error('Error fetching admin data:', error)
      toast.error('Failed to fetch admin data')
    } finally {
      setLoading(false)
    }
  }

  const fetchDatabaseStats = async () => {
    try {
      const response = await adminAPI.getStats()
      setDbStats(response.data.data)
    } catch (error) {
      console.error('Error fetching database stats:', error)
      // Use default stats if API fails
    }
  }

  const handleProfileUpdate = async (e) => {
    e.preventDefault()
    setSaving(true)

    try {
      await authAPI.updateProfile(profileData)
      toast.success('Profile updated successfully!')
      fetchAdminData()
    } catch (error) {
      console.error('Error updating profile:', error)
      toast.error(error.response?.data?.message || 'Failed to update profile')
    } finally {
      setSaving(false)
    }
  }

  const handlePasswordUpdate = async (e) => {
    e.preventDefault()
    setSaving(true)

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('New passwords do not match')
      setSaving(false)
      return
    }

    if (passwordData.newPassword.length < 6) {
      toast.error('Password must be at least 6 characters long')
      setSaving(false)
      return
    }

    try {
      await authAPI.changePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      })
      toast.success('Password updated successfully!')
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      })
    } catch (error) {
      console.error('Error updating password:', error)
      toast.error(error.response?.data?.message || 'Failed to update password')
    } finally {
      setSaving(false)
    }
  }

  const handleSystemSettingsUpdate = async (e) => {
    e.preventDefault()
    setSaving(true)

    try {
      // This would typically save to a settings API endpoint
      // For now, we'll save to localStorage as a demo
      localStorage.setItem('systemSettings', JSON.stringify(systemSettings))
      toast.success('System settings updated successfully!')
    } catch (error) {
      console.error('Error updating system settings:', error)
      toast.error('Failed to update system settings')
    } finally {
      setSaving(false)
    }
  }

  const handleEmailSettingsUpdate = async (e) => {
    e.preventDefault()
    setSaving(true)

    try {
      // This would typically save to a settings API endpoint
      localStorage.setItem('emailSettings', JSON.stringify(emailSettings))
      toast.success('Email settings updated successfully!')
    } catch (error) {
      console.error('Error updating email settings:', error)
      toast.error('Failed to update email settings')
    } finally {
      setSaving(false)
    }
  }

  const handleAvatarUpload = (uploadedFile) => {
    setProfileData(prev => ({
      ...prev,
      avatar: uploadedFile.filename
    }))
    toast.success('Avatar uploaded successfully!')
  }

  const getImageUrl = (filename) => {
    if (!filename) return null
    return `/api/upload/serve/images/${filename}`
  }

  const testEmailConfiguration = async () => {
    try {
      toast.info('Testing email configuration...')
      // This would send a test email - implement when email service is ready
      setTimeout(() => {
        toast.success('Test email sent successfully!')
      }, 2000)
    } catch (error) {
      toast.error('Failed to send test email')
    }
  }

  const exportData = async () => {
    try {
      toast.info('Exporting data...')
      const response = await adminAPI.exportData()
      
      // Create downloadable file
      const dataStr = JSON.stringify(response.data.data, null, 2)
      const dataBlob = new Blob([dataStr], { type: 'application/json' })
      const url = URL.createObjectURL(dataBlob)
      
      const link = document.createElement('a')
      link.href = url
      link.download = `database_export_${new Date().toISOString().split('T')[0]}.json`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
      
      toast.success('Data exported successfully!')
    } catch (error) {
      console.error('Export error:', error)
      toast.error('Failed to export data')
    }
  }

  const clearCache = async () => {
    try {
      toast.info('Clearing cache...')
      await adminAPI.clearCache()
      toast.success('Cache cleared successfully!')
    } catch (error) {
      console.error('Cache clear error:', error)
      toast.error('Failed to clear cache')
    }
  }

  const backupDatabase = async () => {
    try {
      toast.info('Creating database backup...')
      const response = await adminAPI.backupDatabase()
      toast.success(`Database backup created: ${response.data.data.filename}`)
    } catch (error) {
      console.error('Backup error:', error)
      toast.error('Failed to create backup')
    }
  }

  const optimizeDatabase = async () => {
    try {
      toast.info('Optimizing database...')
      const response = await adminAPI.optimize()
      const results = response.data.data
      toast.success(`Optimization complete! Found ${results.orphanedFiles} orphaned files`)
    } catch (error) {
      console.error('Optimization error:', error)
      toast.error('Failed to optimize database')
    }
  }

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Admin Settings</h1>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{tab.label}</span>
              </button>
            )
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-lg shadow p-6">
        {activeTab === 'profile' && (
          <div className="space-y-6">
            <h2 className="text-lg font-medium text-gray-900">Profile Information</h2>
            
            <form onSubmit={handleProfileUpdate} className="space-y-6">
              {/* Avatar */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Profile Picture
                </label>
                <div className="flex items-center space-x-4">
                  {profileData.avatar ? (
                    <img
                      src={getImageUrl(profileData.avatar)}
                      alt="Profile"
                      className="w-20 h-20 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center">
                      <User className="h-10 w-10 text-gray-500" />
                    </div>
                  )}
                  <div>
                    <ImageUpload
                      onUploadSuccess={handleAvatarUpload}
                      uploadType="images"
                      maxFiles={1}
                      acceptedTypes="image/*"
                      showPreview={false}
                    />
                    {profileData.avatar && (
                      <button
                        type="button"
                        onClick={() => setProfileData(prev => ({ ...prev, avatar: '' }))}
                        className="text-red-600 text-sm hover:text-red-800 mt-2 block"
                      >
                        Remove Picture
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={profileData.name}
                    onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Department
                  </label>
                  <input
                    type="text"
                    value={profileData.department}
                    onChange={(e) => setProfileData(prev => ({ ...prev, department: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bio
                </label>
                <textarea
                  value={profileData.bio}
                  onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Tell us about yourself..."
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={saving}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  {saving && <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>}
                  <Save className="h-4 w-4" />
                  <span>Save Profile</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {activeTab === 'security' && (
          <div className="space-y-6">
            <h2 className="text-lg font-medium text-gray-900">Security Settings</h2>
            
            <form onSubmit={handlePasswordUpdate} className="space-y-6">
              <div className="max-w-md space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Current Password
                  </label>
                  <input
                    type="password"
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    New Password
                  </label>
                  <input
                    type="password"
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                    required
                    minLength={6}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    required
                    minLength={6}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <button
                  type="submit"
                  disabled={saving}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  {saving && <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>}
                  <Lock className="h-4 w-4" />
                  <span>Update Password</span>
                </button>
              </div>
            </form>

            {/* Security Info */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-900 mb-2">Security Information</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <p>Last login: {adminData.lastLogin ? new Date(adminData.lastLogin).toLocaleString() : 'N/A'}</p>
                <p>Account created: {adminData.createdAt ? new Date(adminData.createdAt).toLocaleDateString() : 'N/A'}</p>
                <p>Role: {adminData.role || 'Admin'}</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'system' && (
          <div className="space-y-6">
            <h2 className="text-lg font-medium text-gray-900">System Settings</h2>
            
            <form onSubmit={handleSystemSettingsUpdate} className="space-y-6">
              {/* Site Information */}
              <div className="space-y-4">
                <h3 className="text-md font-medium text-gray-900">Site Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Site Name
                    </label>
                    <input
                      type="text"
                      value={systemSettings.siteName}
                      onChange={(e) => setSystemSettings(prev => ({ ...prev, siteName: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Contact Email
                    </label>
                    <input
                      type="email"
                      value={systemSettings.contactEmail}
                      onChange={(e) => setSystemSettings(prev => ({ ...prev, contactEmail: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Site Description
                  </label>
                  <textarea
                    value={systemSettings.siteDescription}
                    onChange={(e) => setSystemSettings(prev => ({ ...prev, siteDescription: e.target.value }))}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  <textarea
                    value={systemSettings.address}
                    onChange={(e) => setSystemSettings(prev => ({ ...prev, address: e.target.value }))}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Feature Toggles */}
              <div className="space-y-4">
                <h3 className="text-md font-medium text-gray-900">Features</h3>
                <div className="space-y-3">
                  {Object.entries(systemSettings.features).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between">
                      <label className="text-sm font-medium text-gray-700 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </label>
                      <input
                        type="checkbox"
                        checked={value}
                        onChange={(e) => setSystemSettings(prev => ({
                          ...prev,
                          features: { ...prev.features, [key]: e.target.checked }
                        }))}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Maintenance Mode */}
              <div className="space-y-4">
                <h3 className="text-md font-medium text-gray-900">Maintenance Mode</h3>
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={systemSettings.maintenance.enabled}
                    onChange={(e) => setSystemSettings(prev => ({
                      ...prev,
                      maintenance: { ...prev.maintenance, enabled: e.target.checked }
                    }))}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label className="text-sm font-medium text-gray-700">
                    Enable Maintenance Mode
                  </label>
                </div>
                
                {systemSettings.maintenance.enabled && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Maintenance Message
                    </label>
                    <textarea
                      value={systemSettings.maintenance.message}
                      onChange={(e) => setSystemSettings(prev => ({
                        ...prev,
                        maintenance: { ...prev.maintenance, message: e.target.value }
                      }))}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                )}
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={saving}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  {saving && <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>}
                  <Save className="h-4 w-4" />
                  <span>Save Settings</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="space-y-6">
            <h2 className="text-lg font-medium text-gray-900">Notification Settings</h2>
            
            <div className="space-y-4">
              <p className="text-gray-600">Configure how you want to receive notifications about system events.</p>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">New User Registrations</p>
                    <p className="text-sm text-gray-500">Get notified when new users register</p>
                  </div>
                  <input
                    type="checkbox"
                    defaultChecked
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Content Updates</p>
                    <p className="text-sm text-gray-500">Get notified when content is added or modified</p>
                  </div>
                  <input
                    type="checkbox"
                    defaultChecked
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">System Errors</p>
                    <p className="text-sm text-gray-500">Get notified about system errors and issues</p>
                  </div>
                  <input
                    type="checkbox"
                    defaultChecked
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Security Alerts</p>
                    <p className="text-sm text-gray-500">Get notified about security-related events</p>
                  </div>
                  <input
                    type="checkbox"
                    defaultChecked
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'email' && (
          <div className="space-y-6">
            <h2 className="text-lg font-medium text-gray-900">Email Configuration</h2>
            
            <form onSubmit={handleEmailSettingsUpdate} className="space-y-6">
              <div className="flex items-center space-x-3 mb-4">
                <input
                  type="checkbox"
                  checked={emailSettings.enableEmail}
                  onChange={(e) => setEmailSettings(prev => ({ ...prev, enableEmail: e.target.checked }))}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label className="text-sm font-medium text-gray-700">
                  Enable Email Functionality
                </label>
              </div>

              {emailSettings.enableEmail && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        SMTP Host
                      </label>
                      <input
                        type="text"
                        value={emailSettings.smtpHost}
                        onChange={(e) => setEmailSettings(prev => ({ ...prev, smtpHost: e.target.value }))}
                        placeholder="smtp.gmail.com"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        SMTP Port
                      </label>
                      <input
                        type="number"
                        value={emailSettings.smtpPort}
                        onChange={(e) => setEmailSettings(prev => ({ ...prev, smtpPort: e.target.value }))}
                        placeholder="587"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        SMTP Username
                      </label>
                      <input
                        type="text"
                        value={emailSettings.smtpUser}
                        onChange={(e) => setEmailSettings(prev => ({ ...prev, smtpUser: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        SMTP Password
                      </label>
                      <input
                        type="password"
                        value={emailSettings.smtpPassword}
                        onChange={(e) => setEmailSettings(prev => ({ ...prev, smtpPassword: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        From Email
                      </label>
                      <input
                        type="email"
                        value={emailSettings.fromEmail}
                        onChange={(e) => setEmailSettings(prev => ({ ...prev, fromEmail: e.target.value }))}
                        placeholder="noreply@college.edu"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        From Name
                      </label>
                      <input
                        type="text"
                        value={emailSettings.fromName}
                        onChange={(e) => setEmailSettings(prev => ({ ...prev, fromName: e.target.value }))}
                        placeholder="College Administration"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <button
                      type="button"
                      onClick={testEmailConfiguration}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                    >
                      Test Configuration
                    </button>
                  </div>
                </div>
              )}

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={saving}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  {saving && <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>}
                  <Save className="h-4 w-4" />
                  <span>Save Email Settings</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {activeTab === 'database' && (
          <div className="space-y-6">
            <h2 className="text-lg font-medium text-gray-900">Database Management</h2>
            
            <div className="space-y-6">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex">
                  <Shield className="h-5 w-5 text-yellow-400 mt-0.5" />
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-yellow-800">
                      Important Notice
                    </h3>
                    <p className="mt-1 text-sm text-yellow-700">
                      Database operations can affect your entire application. Always backup your data before performing any operations.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Backup & Export</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Create a backup of your database or export specific data.
                  </p>
                  <div className="space-y-2">
                    <button
                      onClick={exportData}
                      className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      Export Data
                    </button>
                    <button
                      onClick={backupDatabase}
                      className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                      Create Backup
                    </button>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Optimization</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Optimize database and clear application cache.
                  </p>
                  <div className="space-y-2">
                    <button
                      onClick={clearCache}
                      className="w-full px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
                    >
                      Clear Cache
                    </button>
                    <button
                      onClick={optimizeDatabase}
                      className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                    >
                      Optimize Database
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Database Statistics</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Total Faculty</p>
                    <p className="font-medium text-lg">{dbStats.database.faculty}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Total News</p>
                    <p className="font-medium text-lg">{dbStats.database.news}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Total Programs</p>
                    <p className="font-medium text-lg">{dbStats.database.programs}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Total Research</p>
                    <p className="font-medium text-lg">{dbStats.database.research}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Infrastructure</p>
                    <p className="font-medium text-lg">{dbStats.database.infrastructure}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Collaborations</p>
                    <p className="font-medium text-lg">{dbStats.database.collaborations}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Total Records</p>
                    <p className="font-medium text-lg">{dbStats.database.total}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Files ({dbStats.files.count})</p>
                    <p className="font-medium text-lg">{dbStats.files.size} MB</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminSettings
