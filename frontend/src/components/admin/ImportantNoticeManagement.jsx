import React, { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, Eye, EyeOff, Save, X, Bell } from 'lucide-react'
import { contentAPI } from '../../services/api'
import LoadingSpinner from '../common/LoadingSpinner'
import Card from '../common/Card'
import toast from 'react-hot-toast'

const ImportantNoticeManagement = () => {
  const [notices, setNotices] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingNotice, setEditingNotice] = useState(null)

  const [formData, setFormData] = useState({
    title: 'Important Notice',
    message: '',
    link: '/student-corner',
    linkText: 'Learn More',
    isActive: true
  })

  useEffect(() => {
    fetchNotices()
  }, [])

  const fetchNotices = async () => {
    try {
      setLoading(true)
      const response = await contentAPI.getByKey('important-notices')
      if (response.data.success && response.data.data.content) {
        const noticesData = JSON.parse(response.data.data.content.content)
        setNotices(Array.isArray(noticesData) ? noticesData : [])
      }
    } catch (error) {
      console.error('Error fetching notices:', error)
      // If 404 or any error, initialize with default notice
      setNotices([{
        id: 1,
        title: 'Important Notice',
        message: 'Admission process for B.F.Sc (Bachelor of Fishery Science) program 2025-26 is now open.',
        link: '/student-corner',
        linkText: 'Learn More',
        isActive: true,
        createdAt: new Date().toISOString()
      }])
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      let updatedNotices = [...notices]
      
      if (editingNotice) {
        // Update existing notice
        const index = updatedNotices.findIndex(notice => notice.id === editingNotice.id)
        if (index !== -1) {
          updatedNotices[index] = {
            ...editingNotice,
            ...formData,
            updatedAt: new Date().toISOString()
          }
        }
      } else {
        // Add new notice
        const newNotice = {
          ...formData,
          id: Date.now(),
          createdAt: new Date().toISOString()
        }
        updatedNotices.unshift(newNotice)
      }

      // Save to backend
      await contentAPI.updateByKey('important-notices', {
        content: JSON.stringify(updatedNotices),
        section: 'homepage',
        subsection: 'notices',
        title: 'Important Notices',
        type: 'json',
        isPublished: true
      })

      setNotices(updatedNotices)
      resetForm()
      toast.success(editingNotice ? 'Notice updated successfully' : 'Notice created successfully')
    } catch (error) {
      console.error('Error saving notice:', error)
      toast.error('Failed to save notice')
    }
  }

  const handleEdit = (notice) => {
    setEditingNotice(notice)
    setFormData({
      title: notice.title,
      message: notice.message,
      link: notice.link,
      linkText: notice.linkText,
      isActive: notice.isActive
    })
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this notice?')) {
      return
    }

    try {
      const updatedNotices = notices.filter(notice => notice.id !== id)
      
      await contentAPI.updateByKey('important-notices', {
        content: JSON.stringify(updatedNotices),
        section: 'homepage',
        subsection: 'notices',
        title: 'Important Notices',
        type: 'json',
        isPublished: true
      })

      setNotices(updatedNotices)
      toast.success('Notice deleted successfully')
    } catch (error) {
      console.error('Error deleting notice:', error)
      toast.error('Failed to delete notice')
    }
  }

  const toggleActive = async (id) => {
    try {
      const updatedNotices = notices.map(notice => 
        notice.id === id ? { ...notice, isActive: !notice.isActive } : notice
      )
      
      await contentAPI.updateByKey('important-notices', {
        content: JSON.stringify(updatedNotices),
        section: 'homepage',
        subsection: 'notices',
        title: 'Important Notices',
        type: 'json',
        isPublished: true
      })

      setNotices(updatedNotices)
      toast.success('Notice status updated')
    } catch (error) {
      console.error('Error updating notice status:', error)
      toast.error('Failed to update notice status')
    }
  }

  const resetForm = () => {
    setFormData({
      title: 'Important Notice',
      message: '',
      link: '/student-corner',
      linkText: 'Learn More',
      isActive: true
    })
    setEditingNotice(null)
    setShowForm(false)
  }

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Important Notice Management</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add New Notice
        </button>
      </div>

      {showForm && (
        <Card className="bg-white">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              {editingNotice ? 'Edit Notice' : 'Create New Notice'}
            </h3>
            <button
              onClick={resetForm}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Notice Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                required
                maxLength={100}
                placeholder="Important Notice"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Notice Message
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                rows={3}
                required
                maxLength={500}
                placeholder="Enter your important notice message here..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Link URL
                </label>
                <input
                  type="text"
                  value={formData.link}
                  onChange={(e) => setFormData({...formData, link: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  required
                  placeholder="/student-corner, /programs, etc."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Link Text
                </label>
                <input
                  type="text"
                  value={formData.linkText}
                  onChange={(e) => setFormData({...formData, linkText: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  required
                  maxLength={50}
                  placeholder="Learn More"
                />
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="isActive"
                checked={formData.isActive}
                onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
                className="mr-2"
              />
              <label htmlFor="isActive" className="text-sm text-gray-700">
                Active (visible on website)
              </label>
            </div>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                {editingNotice ? 'Update' : 'Create'} Notice
              </button>
            </div>
          </form>
        </Card>
      )}

      <div className="grid grid-cols-1 gap-4">
        {notices.length === 0 ? (
          <Card className="text-center py-8">
            <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No notices found. Create your first notice!</p>
          </Card>
        ) : (
          notices.map((notice) => (
            <Card
              key={notice.id}
              className={`transition-all ${!notice.isActive ? 'opacity-60' : ''}`}
            >
              <div className="flex flex-col sm:flex-row items-start sm:justify-between gap-4">
                <div className="flex-grow">
                  <div className="flex items-center mb-2">
                    <Bell className="w-5 h-5 text-blue-600 mr-2" />
                    <h3 className="font-semibold text-gray-900">{notice.title}</h3>
                  </div>
                  <p className="text-gray-700 mb-3">{notice.message}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>Link: {notice.link}</span>
                    <span>•</span>
                    <span>Text: "{notice.linkText}"</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                  <button
                    onClick={() => toggleActive(notice.id)}
                    className={`p-2 rounded-lg ${
                      notice.isActive 
                        ? 'text-blue-600 hover:bg-blue-50' 
                        : 'text-gray-400 hover:bg-gray-50'
                    }`}
                    title={notice.isActive ? 'Deactivate notice' : 'Activate notice'}
                  >
                    {notice.isActive ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </button>

                  <button
                    onClick={() => handleEdit(notice)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                    title="Edit notice"
                  >
                    <Edit className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleDelete(notice.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                    title="Delete notice"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      {notices.length > 0 && (
        <div className="text-sm text-gray-500 bg-blue-50 p-4 rounded-lg">
          <strong>Note:</strong> Only active notices will be displayed on the homepage. Multiple notices can be active at the same time.
        </div>
      )}
    </div>
  )
}

export default ImportantNoticeManagement