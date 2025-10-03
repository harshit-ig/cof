import React, { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, Search, Users, Award, GraduationCap, Calendar, FileText, Upload, Save, X } from 'lucide-react'
import { studentCornerAPI, uploadAPI } from '../../services/api'
import LoadingSpinner, { LoadingCard } from '../common/LoadingSpinner'
import Modal, { ConfirmModal } from '../common/Modal'
import { Form, FormGroup, Input, Textarea, Select, SubmitButton } from '../common/Form'
import toast from 'react-hot-toast'

const StudentCornerManagement = () => {
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [activeTab, setActiveTab] = useState('admission')
  const [showModal, setShowModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [deletingItem, setDeletingItem] = useState(null)
  const [uploadingImage, setUploadingImage] = useState(false)

  const [admissionGuidelines, setAdmissionGuidelines] = useState([])
  const [scholarships, setScholarships] = useState([])
  const [clubs, setClubs] = useState([])

  const [formData, setFormData] = useState({
    category: '',
    description: '',
    name: '',
    eligibility: '',
    amount: '',
    duration: '',
    role: '',
    activities: [],
    positions: [],
    benefits: [],
    guidelines: [],
    batch: '',
    currentPosition: '',
    testimonial: '',
    achievements: [],
    contact: '',
    image: ''
  })

  const tabs = [
    { id: 'admission', name: 'Admission Guidelines', icon: GraduationCap },
    { id: 'scholarships', name: 'Scholarships', icon: Award },
    { id: 'clubs', name: 'Student Clubs', icon: Users }
  ]

  useEffect(() => {
    fetchStudentCornerData()
  }, [])

  const fetchStudentCornerData = async () => {
    try {
      setLoading(true)
      const response = await studentCornerAPI.getAll()
      if (response.data.success) {
        const data = response.data.data
        setAdmissionGuidelines(data.admissionGuidelines || [])
        setScholarships(data.scholarships || [])
        setClubs(data.clubs || [])
      }
    } catch (error) {
      console.error('Error fetching student corner data:', error)
      toast.error('Failed to fetch student corner data')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const data = {
        ...formData,
        activities: Array.isArray(formData.activities) 
          ? formData.activities 
          : formData.activities.split('\n').filter(Boolean),
        positions: Array.isArray(formData.positions) 
          ? formData.positions 
          : formData.positions.split('\n').filter(Boolean),
        benefits: Array.isArray(formData.benefits) 
          ? formData.benefits 
          : formData.benefits.split('\n').filter(Boolean),
        guidelines: Array.isArray(formData.guidelines) 
          ? formData.guidelines 
          : formData.guidelines.split('\n').filter(Boolean),
        achievements: Array.isArray(formData.achievements) 
          ? formData.achievements 
          : formData.achievements.split('\n').filter(Boolean),
        type: activeTab
      }

      if (editingItem) {
        await studentCornerAPI.update(editingItem._id, data)
        toast.success('Item updated successfully')
      } else {
        await studentCornerAPI.create(data)
        toast.success('Item created successfully')
      }

      setShowModal(false)
      resetForm()
      fetchStudentCornerData()
    } catch (error) {
      console.error('Error saving item:', error)
      toast.error(error.response?.data?.message || 'Failed to save item')
    } finally {
      setSubmitting(false)
    }
  }

  const handleEdit = (item) => {
    setEditingItem(item)
    setFormData({
      category: item.category || '',
      description: item.description || '',
      name: item.name || '',
      eligibility: item.eligibility || '',
      amount: item.amount || '',
      duration: item.duration || '',
      role: item.role || '',
      activities: Array.isArray(item.activities) ? item.activities.join('\n') : '',
      positions: Array.isArray(item.positions) ? item.positions.join('\n') : '',
      benefits: Array.isArray(item.benefits) ? item.benefits.join('\n') : '',
      guidelines: Array.isArray(item.guidelines) ? item.guidelines.join('\n') : '',
      batch: item.batch || '',
      currentPosition: item.currentPosition || '',
      testimonial: item.testimonial || '',
      achievements: Array.isArray(item.achievements) ? item.achievements.join('\n') : '',
      contact: item.contact || '',
      image: item.image || ''
    })
    setShowModal(true)
  }

  const handleDelete = async () => {
    try {
      await studentCornerAPI.delete(deletingItem._id)
      toast.success('Item deleted successfully')
      setShowDeleteModal(false)
      setDeletingItem(null)
      fetchStudentCornerData()
    } catch (error) {
      console.error('Error deleting item:', error)
      toast.error(error.response?.data?.message || 'Failed to delete item')
    }
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    try {
      setUploadingImage(true)
      const response = await uploadAPI.single(file, 'students')
      
      if (response.data.success) {
        const filename = response.data.data.filename
        setFormData(prev => ({
          ...prev,
          image: filename
        }))
        toast.success('Image uploaded successfully')
      }
    } catch (error) {
      console.error('Error uploading image:', error)
      toast.error('Failed to upload image')
    } finally {
      setUploadingImage(false)
    }
  }

  const resetForm = () => {
    setFormData({
      category: '',
      description: '',
      name: '',
      eligibility: '',
      amount: '',
      duration: '',
      role: '',
      activities: [],
      positions: [],
      benefits: [],
      guidelines: [],
      batch: '',
      currentPosition: '',
      testimonial: '',
      achievements: [],
      contact: '',
      image: ''
    })
    setEditingItem(null)
  }

  const openAddModal = () => {
    resetForm()
    setShowModal(true)
  }

  const getCurrentData = () => {
    switch (activeTab) {
      case 'admission':
        return admissionGuidelines
      case 'scholarships':
        return scholarships
      case 'clubs':
        return clubs
      default:
        return []
    }
  }

  const renderForm = () => {
    switch (activeTab) {
      case 'admission':
        return (
          <div className="space-y-6">
            <FormGroup>
              <Input
                label="Category"
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                placeholder="e.g., Eligibility Criteria"
                required
              />
            </FormGroup>

            <FormGroup>
              <Textarea
                label="Description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Brief description of this category"
                rows={3}
                required
              />
            </FormGroup>

            <FormGroup>
              <Textarea
                label="Guidelines (one per line)"
                value={formData.guidelines}
                onChange={(e) => setFormData(prev => ({ ...prev, guidelines: e.target.value }))}
                placeholder="Enter each guideline on a new line"
                rows={6}
                required
              />
            </FormGroup>
          </div>
        )

      case 'scholarships':
        return (
          <div className="space-y-6">
            <FormGroup>
              <Input
                label="Scholarship Name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="e.g., Merit-cum-Means Scholarship"
                required
              />
            </FormGroup>

            <FormGroup>
              <Textarea
                label="Description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Brief description of the scholarship"
                rows={3}
                required
              />
            </FormGroup>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormGroup>
                <Input
                  label="Amount"
                  value={formData.amount}
                  onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
                  placeholder="e.g., ₹12,000 per year"
                  required
                />
              </FormGroup>

              <FormGroup>
                <Input
                  label="Duration"
                  value={formData.duration}
                  onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                  placeholder="e.g., Throughout the course"
                  required
                />
              </FormGroup>
            </div>

            <FormGroup>
              <Textarea
                label="Eligibility"
                value={formData.eligibility}
                onChange={(e) => setFormData(prev => ({ ...prev, eligibility: e.target.value }))}
                placeholder="Eligibility criteria for this scholarship"
                rows={3}
                required
              />
            </FormGroup>

            <FormGroup>
              <Textarea
                label="Benefits (one per line)"
                value={formData.benefits}
                onChange={(e) => setFormData(prev => ({ ...prev, benefits: e.target.value }))}
                placeholder="Enter each benefit on a new line"
                rows={5}
                required
              />
            </FormGroup>
          </div>
        )

      case 'clubs':
        return (
          <div className="space-y-6">
            <FormGroup>
              <Input
                label="Club Name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="e.g., Student Council"
                required
              />
            </FormGroup>

            <FormGroup>
              <Input
                label="Role/Type"
                value={formData.role}
                onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
                placeholder="e.g., Student Governance"
                required
              />
            </FormGroup>

            <FormGroup>
              <Textarea
                label="Description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Brief description of the club"
                rows={3}
                required
              />
            </FormGroup>

            <FormGroup>
              <Textarea
                label="Activities (one per line)"
                value={formData.activities}
                onChange={(e) => setFormData(prev => ({ ...prev, activities: e.target.value }))}
                placeholder="Enter each activity on a new line"
                rows={6}
                required
              />
            </FormGroup>

            <FormGroup>
              <Textarea
                label="Key Positions (one per line)"
                value={formData.positions}
                onChange={(e) => setFormData(prev => ({ ...prev, positions: e.target.value }))}
                placeholder="Enter each position on a new line"
                rows={4}
                required
              />
            </FormGroup>
          </div>
        )

      default:
        return null
    }
  }

  const renderDataCard = (item, index) => {
    const getCardTitle = () => {
      switch (activeTab) {
        case 'admission':
          return item.category
        case 'scholarships':
        case 'clubs':
          return item.name
        default:
          return 'Item'
      }
    }

    const getCardSubtitle = () => {
      switch (activeTab) {
        case 'admission':
          return item.description
        case 'scholarships':
          return item.amount
        case 'clubs':
          return item.role
        default:
          return ''
      }
    }

    return (
      <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {getCardTitle()}
            </h3>
            <p className="text-sm text-gray-600 mb-3">
              {getCardSubtitle()}
            </p>
            {item.description && activeTab !== 'admission' && (
              <p className="text-sm text-gray-700">
                {item.description}
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-end space-x-2">
          <button
            onClick={() => handleEdit(item)}
            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              setDeletingItem(item)
              setShowDeleteModal(true)
            }}
            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner />
      </div>
    )
  }

  const currentData = getCurrentData()

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Student Corner Management</h1>
        <p className="text-gray-600 mt-2">
          Manage admission guidelines, scholarships, student clubs, and alumni testimonials.
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.name}</span>
              </button>
            )
          })}
        </nav>
      </div>

      {/* Action Bar */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <h2 className="text-xl font-semibold text-gray-900">
            {tabs.find(tab => tab.id === activeTab)?.name}
          </h2>
          <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
            {currentData.length} items
          </span>
        </div>
        <button
          onClick={openAddModal}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add {tabs.find(tab => tab.id === activeTab)?.name.slice(0, -1)}</span>
        </button>
      </div>

      {/* Data Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {currentData.length > 0 ? (
          currentData.map((item, index) => renderDataCard(item, index))
        ) : (
          <div className="col-span-full text-center py-12">
            <div className="text-gray-400 mb-4">
              <FileText className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No {tabs.find(tab => tab.id === activeTab)?.name.toLowerCase()} found
            </h3>
            <p className="text-gray-500 mb-6">
              Get started by adding your first item.
            </p>
            <button
              onClick={openAddModal}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Add {tabs.find(tab => tab.id === activeTab)?.name.slice(0, -1)}
            </button>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      <Modal 
        isOpen={showModal} 
        onClose={() => {
          setShowModal(false)
          resetForm()
        }}
        title={`${editingItem ? 'Edit' : 'Add'} ${tabs.find(tab => tab.id === activeTab)?.name.slice(0, -1)}`}
        size="lg"
      >
        <Form onSubmit={handleSubmit}>
          {renderForm()}

          <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={() => {
                setShowModal(false)
                resetForm()
              }}
              className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
            >
              Cancel
            </button>
            <SubmitButton isLoading={submitting}>
              {editingItem ? 'Update' : 'Create'}
            </SubmitButton>
          </div>
        </Form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false)
          setDeletingItem(null)
        }}
        onConfirm={handleDelete}
        title="Delete Item"
        message={`Are you sure you want to delete "${deletingItem?.name || deletingItem?.category}"? This action cannot be undone.`}
        confirmText="Delete"
        confirmButtonClass="bg-red-600 hover:bg-red-700"
      />
    </div>
  )
}

export default StudentCornerManagement