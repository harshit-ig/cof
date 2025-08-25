import React, { useState, useEffect } from 'react'
import { Save, Upload, Eye, Edit, Trash2, User, AlertCircle } from 'lucide-react'
import toast from 'react-hot-toast'

const WelcomeMessageManagement = () => {
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [welcomeData, setWelcomeData] = useState({
    deanName: '',
    deanTitle: '',
    deanPhoto: '',
    welcomeMessage: '',
    isPublished: true
  })
  const [photoPreview, setPhotoPreview] = useState('')
  const [selectedFile, setSelectedFile] = useState(null)

  useEffect(() => {
    fetchWelcomeData()
  }, [])

  const fetchWelcomeData = async () => {
    try {
      setLoading(true)
      
      // Try to get content by key first
      const response = await fetch('/api/content/key/dean-welcome-message')
      const data = await response.json()
      
      if (data.success && data.data.content) {
        const content = data.data.content
        let welcomeInfo = {}
        
        // Parse the content based on type
        if (content.type === 'json') {
          try {
            welcomeInfo = JSON.parse(content.content)
          } catch (e) {
            console.warn('Failed to parse JSON content, using metadata')
            welcomeInfo = content.metadata || {}
          }
        } else {
          // Fallback to metadata
          welcomeInfo = content.metadata || {}
        }
        
        const photoUrl = welcomeInfo.deanPhoto || ''
        setWelcomeData({
          deanName: welcomeInfo.deanName || '',
          deanTitle: welcomeInfo.deanTitle || '',
          deanPhoto: photoUrl,
          welcomeMessage: welcomeInfo.welcomeMessage || '',
          isPublished: content.isPublished
        })
        
        // Set photo preview - if it's a relative path, make it absolute
        if (photoUrl) {
          const fullPhotoUrl = photoUrl.startsWith('http') ? photoUrl : `${window.location.origin}${photoUrl}`
          setPhotoPreview(fullPhotoUrl)
        }
      } else {
        // No existing content found, initialize with defaults
        console.log('No existing welcome message found')
      }
    } catch (error) {
      console.error('Error fetching welcome data:', error)
      // Don't show error toast for missing content, just log it
      if (!error.message.includes('404')) {
        toast.error('Failed to load welcome message data')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleFileSelect = (e) => {
    const file = e.target.files[0]
    if (file) {
      setSelectedFile(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setPhotoPreview(e.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const uploadPhoto = async () => {
    if (!selectedFile) return null

    console.log('Starting photo upload...', {
      fileName: selectedFile.name,
      fileSize: selectedFile.size,
      fileType: selectedFile.type
    })

    const formData = new FormData()
    formData.append('file', selectedFile) // Changed from 'image' to 'file'
    formData.append('category', 'dean')

    try {
      const token = localStorage.getItem('token')
      if (!token) {
        toast.error('No authentication token found. Please login again.')
        return null
      }

      console.log('Making upload request to /api/upload/single...')

      const response = await fetch('/api/upload/single', { // Changed endpoint
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      })

      console.log('Upload response status:', response.status)

      if (!response.ok) {
        const errorText = await response.text()
        console.error('Upload response error:', response.status, errorText)
        throw new Error(`Upload failed: ${response.status} ${response.statusText}`)
      }

      const data = await response.json()
      console.log('Upload response data:', data)
      
      if (data.success) {
        console.log('Upload successful, returning URL:', data.data.url)
        return data.data.url // Return the full URL instead of path
      } else {
        throw new Error(data.message)
      }
    } catch (error) {
      console.error('Error uploading photo:', error)
      toast.error(`Failed to upload photo: ${error.message}`)
      return null
    }
  }

  const handleSave = async () => {
    try {
      setSaving(true)
      
      let photoPath = welcomeData.deanPhoto
      if (selectedFile) {
        photoPath = await uploadPhoto()
        if (!photoPath) return
      }

      const payload = {
        key: 'dean-welcome-message',
        title: 'Dean Welcome Message',
        content: JSON.stringify({
          deanName: welcomeData.deanName,
          deanTitle: welcomeData.deanTitle,
          deanPhoto: photoPath,
          welcomeMessage: welcomeData.welcomeMessage
        }),
        type: 'json',
        section: 'welcome-message',
        subsection: 'dean-welcome',
        metadata: {
          deanName: welcomeData.deanName,
          deanTitle: welcomeData.deanTitle,
          deanPhoto: photoPath,
          welcomeMessage: welcomeData.welcomeMessage
        },
        isPublished: welcomeData.isPublished,
        order: 1
      }

      console.log('Saving welcome message with payload:', payload)

      const response = await fetch('/api/content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(payload)
      })

      console.log('Save response status:', response.status)

      if (!response.ok) {
        const errorText = await response.text()
        console.error('Save response error:', response.status, errorText)
        throw new Error(`Save failed: ${response.status} ${response.statusText}`)
      }

      const data = await response.json()
      console.log('Save response data:', data)

      if (data.success) {
        toast.success('Welcome message updated successfully!')
        setSelectedFile(null)
        fetchWelcomeData()
      } else {
        throw new Error(data.message)
      }
    } catch (error) {
      console.error('Error saving welcome data:', error)
      toast.error(`Failed to save welcome message: ${error.message}`)
    } finally {
      setSaving(false)
    }
  }

  const handleInputChange = (field, value) => {
    setWelcomeData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <User className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Dean's Welcome Message</h2>
              <p className="text-sm text-gray-600">Manage the dean's photo and welcome message displayed on the homepage</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Dean's Name
              </label>
              <input
                type="text"
                value={welcomeData.deanName}
                onChange={(e) => handleInputChange('deanName', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter dean's full name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Dean's Title/Designation
              </label>
              <input
                type="text"
                value={welcomeData.deanTitle}
                onChange={(e) => handleInputChange('deanTitle', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Dean, College of Fisheries"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Dean's Photo
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="dean-photo"
                />
                <label
                  htmlFor="dean-photo"
                  className="cursor-pointer flex flex-col items-center space-y-2"
                >
                  <Upload className="w-8 h-8 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    Click to upload dean's photo
                  </span>
                  <span className="text-xs text-gray-500">
                    JPG, PNG up to 2MB
                  </span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Welcome Message
              </label>
              <textarea
                value={welcomeData.welcomeMessage}
                onChange={(e) => handleInputChange('welcomeMessage', e.target.value)}
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter the dean's welcome message..."
              />
            </div>

            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="isPublished"
                checked={welcomeData.isPublished}
                onChange={(e) => handleInputChange('isPublished', e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded"
              />
              <label htmlFor="isPublished" className="text-sm text-gray-700">
                Publish welcome message on website
              </label>
            </div>
          </div>

          {/* Preview Section */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Preview</h3>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  {photoPreview ? (
                    <img
                      src={photoPreview}
                      alt="Dean"
                      className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center">
                      <User className="w-8 h-8 text-gray-400" />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-gray-900">
                    {welcomeData.deanName || 'Dean Name'}
                  </h4>
                  <p className="text-sm text-gray-600 mb-3">
                    {welcomeData.deanTitle || 'Dean Title'}
                  </p>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {welcomeData.welcomeMessage || 'Welcome message will appear here...'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-3 mt-8 pt-6 border-t border-gray-200">
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            {saving ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save Changes</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default WelcomeMessageManagement
