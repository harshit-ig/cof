import React, { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, Search, FileText, Save } from 'lucide-react'
import { contentAPI } from '../../services/api'
import LoadingSpinner from '../common/LoadingSpinner'
import Modal, { ConfirmModal } from '../common/Modal'
import { Form, FormGroup, Input, Textarea, Select, SubmitButton } from '../common/Form'
import toast from 'react-hot-toast'

const ContentManagement = () => {
  const [contents, setContents] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [editingContent, setEditingContent] = useState(null)
  const [deletingContent, setDeletingContent] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [selectedSection, setSelectedSection] = useState('')
  const [pagination, setPagination] = useState({})

  const [formData, setFormData] = useState({
    key: '',
    title: '',
    content: '',
    section: '',
    type: 'text',
    metadata: {}
  })

  const contentSections = [
    { value: 'home', label: 'Home Page' },
    { value: 'about', label: 'About Us' },
    { value: 'academics', label: 'Academics' },
    { value: 'research', label: 'Research' },
    { value: 'extension', label: 'Extension & Outreach' },
    { value: 'infrastructure', label: 'Infrastructure' },
    { value: 'incubation', label: 'Incubation Centre' },
    { value: 'students', label: 'Students Corner' },
    { value: 'collaborations', label: 'Collaborations' },
    { value: 'contact', label: 'Contact Us' },
    { value: 'footer', label: 'Footer' }
  ]

  const contentTypes = [
    { value: 'text', label: 'Text Content' },
    { value: 'html', label: 'HTML Content' },
    { value: 'json', label: 'JSON Data' },
    { value: 'markdown', label: 'Markdown' }
  ]

  // Predefined content keys with descriptions
  const predefinedKeys = {
    home: [
      { key: 'dean_message', title: "Dean's Message", type: 'html' },
      { key: 'hero_title', title: 'Hero Section Title', type: 'text' },
      { key: 'hero_subtitle', title: 'Hero Section Subtitle', type: 'text' },
      { key: 'welcome_message', title: 'Welcome Message', type: 'html' }
    ],
    about: [
      { key: 'history', title: 'College History', type: 'html' },
      { key: 'vision', title: 'Vision Statement', type: 'text' },
      { key: 'mission', title: 'Mission Statement', type: 'text' },
      { key: 'objectives', title: 'Objectives', type: 'html' },
      { key: 'governing_body', title: 'Governing Body', type: 'json' }
    ],
    contact: [
      { key: 'address', title: 'College Address', type: 'html' },
      { key: 'phone_numbers', title: 'Phone Numbers', type: 'json' },
      { key: 'email_addresses', title: 'Email Addresses', type: 'json' },
      { key: 'office_hours', title: 'Office Hours', type: 'text' }
    ]
  }

  useEffect(() => {
    fetchContents()
  }, [searchTerm, selectedSection])

  const fetchContents = async () => {
    try {
      setLoading(true)
      const params = { page: 1, limit: 20 }
      if (searchTerm) params.search = searchTerm
      if (selectedSection) params.section = selectedSection

      const response = await contentAPI.getAll(params)
      if (response.data.success) {
        setContents(response.data.data.contents || [])
        setPagination(response.data.data.pagination || {})
      }
    } catch (error) {
      console.error('Error fetching contents:', error)
      toast.error('Failed to fetch contents')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      let processedContent = formData.content
      
      // Process JSON content
      if (formData.type === 'json') {
        try {
          processedContent = JSON.parse(formData.content)
        } catch (err) {
          toast.error('Invalid JSON format')
          setSubmitting(false)
          return
        }
      }

      const data = {
        ...formData,
        content: processedContent
      }

      if (editingContent) {
        await contentAPI.update(editingContent._id, data)
        toast.success('Content updated successfully')
      } else {
        await contentAPI.create(data)
        toast.success('Content created successfully')
      }

      setShowModal(false)
      resetForm()
      fetchContents()
    } catch (error) {
      console.error('Error saving content:', error)
      toast.error(error.response?.data?.message || 'Failed to save content')
    } finally {
      setSubmitting(false)
    }
  }

  const handleEdit = (content) => {
    setEditingContent(content)
    setFormData({
      key: content.key,
      title: content.title,
      content: typeof content.content === 'object' 
        ? JSON.stringify(content.content, null, 2) 
        : content.content,
      section: content.section,
      type: content.type,
      metadata: content.metadata || {}
    })
    setShowModal(true)
  }

  const handleDelete = async () => {
    if (!deletingContent) return

    try {
      await contentAPI.delete(deletingContent._id)
      toast.success('Content deleted successfully')
      setShowDeleteModal(false)
      setDeletingContent(null)
      fetchContents()
    } catch (error) {
      console.error('Error deleting content:', error)
      toast.error(error.response?.data?.message || 'Failed to delete content')
    }
  }

  const resetForm = () => {
    setFormData({
      key: '',
      title: '',
      content: '',
      section: '',
      type: 'text',
      metadata: {}
    })
    setEditingContent(null)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleQuickAdd = (section, predefined) => {
    setFormData({
      key: predefined.key,
      title: predefined.title,
      content: '',
      section: section,
      type: predefined.type,
      metadata: {}
    })
    setShowModal(true)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Content Management</h1>
          <p className="text-gray-600">Manage static content and page information</p>
        </div>
        
        <button
          onClick={() => {
            resetForm()
            setShowModal(true)
          }}
          className="btn-primary flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Content
        </button>
      </div>

      {/* Quick Add Buttons */}
      <div className="mb-6">
        <h2 className="text-lg font-medium text-gray-900 mb-3">Quick Add Common Content</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(predefinedKeys).map(([section, keys]) => (
            <div key={section} className="bg-white rounded-lg shadow p-4">
              <h3 className="font-medium text-gray-900 mb-2 capitalize">
                {contentSections.find(s => s.value === section)?.label}
              </h3>
              <div className="space-y-2">
                {keys.map((predefined) => (
                  <button
                    key={predefined.key}
                    onClick={() => handleQuickAdd(section, predefined)}
                    className="text-sm text-primary-600 hover:text-primary-800 block"
                  >
                    + {predefined.title}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Search and Filter */}
      <div className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search content..."
              className="form-input pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Select
            name="section"
            value={selectedSection}
            onChange={(e) => setSelectedSection(e.target.value)}
            options={[{ value: '', label: 'All Sections' }, ...contentSections]}
            placeholder="Filter by section"
          />
        </div>
      </div>

      {/* Content Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Content
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Section
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Updated
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center">
                    <LoadingSpinner />
                  </td>
                </tr>
              ) : contents.length > 0 ? (
                contents.map((content) => (
                  <tr key={content._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {content.title}
                        </div>
                        <div className="text-sm text-gray-500">
                          Key: {content.key}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {content.section}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {content.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(content.updatedAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(content)}
                          className="text-primary-600 hover:text-primary-900"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            setDeletingContent(content)
                            setShowDeleteModal(true)
                          }}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                    No content found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={editingContent ? 'Edit Content' : 'Add New Content'}
        size="xl"
      >
        <Form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormGroup label="Content Key" required>
              <Input
                name="key"
                value={formData.key}
                onChange={handleChange}
                placeholder="e.g., dean_message, hero_title"
                required
              />
            </FormGroup>

            <FormGroup label="Title" required>
              <Input
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Display title for this content"
                required
              />
            </FormGroup>

            <FormGroup label="Section" required>
              <Select
                name="section"
                value={formData.section}
                onChange={handleChange}
                options={contentSections}
                placeholder="Select section"
                required
              />
            </FormGroup>

            <FormGroup label="Content Type" required>
              <Select
                name="type"
                value={formData.type}
                onChange={handleChange}
                options={contentTypes}
                required
              />
            </FormGroup>
          </div>

          <FormGroup label="Content" required>
            <Textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder={
                formData.type === 'json' 
                  ? '{"key": "value", "array": [1, 2, 3]}'
                  : formData.type === 'html'
                  ? '<p>Your HTML content here</p>'
                  : 'Your text content here'
              }
              rows={formData.type === 'json' ? 10 : 6}
              required
            />
            {formData.type === 'html' && (
              <p className="text-sm text-gray-500 mt-1">
                You can use HTML tags for formatting
              </p>
            )}
            {formData.type === 'json' && (
              <p className="text-sm text-gray-500 mt-1">
                Enter valid JSON format
              </p>
            )}
          </FormGroup>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="btn-ghost"
            >
              Cancel
            </button>
            <SubmitButton isLoading={submitting}>
              <Save className="w-4 h-4 mr-2" />
              {editingContent ? 'Update Content' : 'Create Content'}
            </SubmitButton>
          </div>
        </Form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        title="Delete Content"
        message={`Are you sure you want to delete "${deletingContent?.title}"? This action cannot be undone.`}
        type="danger"
      />
    </div>
  )
}

export default ContentManagement