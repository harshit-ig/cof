import React, { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, Search, Eye, BookOpen, Users, DollarSign, Award } from 'lucide-react'
import { programsAPI } from '../../services/api'
import LoadingSpinner, { LoadingCard } from '../common/LoadingSpinner'
import Modal, { ConfirmModal } from '../common/Modal'
import { Form, FormGroup, Input, Textarea, Select, SubmitButton } from '../common/Form'
import toast from 'react-hot-toast'

const ProgramsManagement = () => {
  const [programs, setPrograms] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [editingProgram, setEditingProgram] = useState(null)
  const [deletingProgram, setDeletingProgram] = useState(null)
  const [error, setError] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [activeTab, setActiveTab] = useState('basic') // For form tabs

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    shortName: '',
    description: '',
    overview: '',
    duration: '',
    eligibility: {
      qualification: '',
      subjects: '',
      percentage: '',
      entrance: '',
      additional: ''
    },
    fees: {
      tuition: '',
      hostel: '',
      mess: '',
      other: '',
      total: '',
      annual: ''
    },
    intake: '',
    department: '',
    level: '',
    curriculum: [],
    detailedCurriculum: {
      semester1: [''],
      semester2: [''],
      semester3: [''],
      semester4: [''],
      semester5: [''],
      semester6: [''],
      semester7: [''],
      semester8: ['']
    },
    highlights: [''],
    careerOpportunities: [''],
    facilities: [''],
    admissionProcess: {
      process: '',
      application: '',
      documents: [''],
      importantDates: [{ event: '', date: '' }]
    }
  })

  const levels = [
    { value: 'undergraduate', label: 'Undergraduate' },
    { value: 'postgraduate', label: 'Postgraduate' },
    { value: 'diploma', label: 'Diploma' },
    { value: 'certificate', label: 'Certificate' }
  ]

  useEffect(() => {
    fetchPrograms()
  }, [searchTerm])

  // Add error handling wrapper
  const safeExecute = async (fn, errorMessage) => {
    try {
      setError(null)
      await fn()
    } catch (error) {
      console.error(errorMessage, error)
      setError(error.message || errorMessage)
      toast.error(error.response?.data?.message || errorMessage)
    }
  }

  const fetchPrograms = async () => {
    await safeExecute(async () => {
      setLoading(true)
      console.log('Fetching programs with search term:', searchTerm)
      
      const params = {}
      if (searchTerm) params.search = searchTerm

      console.log('API params:', params)
      const response = await programsAPI.getAll(params)
      console.log('Programs API response:', response)
      
      if (response?.data?.success) {
        setPrograms(response.data.data?.programs || [])
        console.log('Programs loaded:', response.data.data?.programs?.length || 0)
      } else {
        console.error('Unexpected API response format:', response)
        setPrograms([])
      }
    }, 'Failed to fetch programs')
    setLoading(false)
  }

  // Add a test function to debug API calls
  const testProgramCreation = async () => {
    try {
      console.log('Testing program creation with sample data...')
      
      // Check token
      const token = localStorage.getItem('token')
      console.log('Token exists:', !!token)
      console.log('Token preview:', token ? token.substring(0, 20) + '...' : 'NO TOKEN')
      
      const testData = {
        title: "Test Program API",
        description: "This is a test program to check API connectivity",
        duration: "4 Years",
        eligibility: "10+2 with PCB",
        fees: 50000,
        intake: 50,
        department: "Fisheries Science",
        level: "undergraduate"
      }
      
      console.log('Test data:', testData)
      const response = await programsAPI.create(testData)
      console.log('Test API response:', response)
      toast.success('Test program created successfully!')
      fetchPrograms()
    } catch (error) {
      console.error('Test API error:', error)
      console.error('Test error response:', error.response?.data)
      toast.error(`Test failed: ${error.response?.data?.message || error.message}`)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      // Validate required fields
      if (!formData.title?.trim()) {
        toast.error('Please enter program title')
        setSubmitting(false)
        return
      }

      if (!formData.description?.trim()) {
        toast.error('Please enter program description')
        setSubmitting(false)
        return
      }

      if (!formData.duration?.trim()) {
        toast.error('Please enter program duration')
        setSubmitting(false)
        return
      }

      if (!formData.department?.trim()) {
        toast.error('Please enter department')
        setSubmitting(false)
        return
      }

      if (!formData.level?.trim()) {
        toast.error('Please select program level')
        setSubmitting(false)
        return
      }

      if (!formData.intake || parseInt(formData.intake) <= 0) {
        toast.error('Please enter a valid intake capacity')
        setSubmitting(false)
        return
      }

      // Annual fee is optional; if provided, it must be a positive number
      if (formData.fees?.annual && parseFloat(formData.fees.annual) <= 0) {
        toast.error('Annual fee must be a positive number if provided')
        setSubmitting(false)
        return
      }

      // Clean up the data before submission
      const cleanedData = {
        title: formData.title.trim(),
        slug: formData.slug.trim() || generateSlug(formData.title),
        shortName: formData.shortName?.trim() || '',
        description: formData.description.trim(),
        overview: formData.overview?.trim() || '',
        duration: formData.duration.trim(),
        eligibility: formData.eligibility || {},
        fees: (() => {
          const f = { ...formData.fees }
          if (f.annual === '' || f.annual === undefined || f.annual === null) {
            delete f.annual
          } else {
            const n = parseFloat(f.annual)
            if (!Number.isNaN(n)) f.annual = n
            else delete f.annual
          }
          return f
        })(),
        intake: parseInt(formData.intake),
        department: formData.department.trim(),
        level: formData.level,
        curriculum: formData.curriculum || [],
        detailedCurriculum: formData.detailedCurriculum || {},
        highlights: (formData.highlights || []).filter(h => h.trim() !== ''),
        careerOpportunities: (formData.careerOpportunities || []).filter(c => c.trim() !== ''),
        facilities: (formData.facilities || []).filter(f => f.trim() !== ''),
        admissionProcess: formData.admissionProcess || {}
      }

      console.log('Submitting program data:', cleanedData)

      if (editingProgram) {
        const response = await programsAPI.update(editingProgram._id, cleanedData)
        console.log('Update response:', response)
        toast.success('Program updated successfully')
      } else {
        const response = await programsAPI.create(cleanedData)
        console.log('Create response:', response)
        toast.success('Program created successfully')
      }

      setShowModal(false)
      resetForm()
      fetchPrograms()
    } catch (error) {
      console.error('Error saving program:', error)
      console.error('Error response:', error.response?.data)
      
      if (error.response?.data?.errors) {
        // Handle validation errors
        const errorMessages = error.response.data.errors.map(err => err.msg || err.message || err).join(', ')
        toast.error(`Validation errors: ${errorMessages}`)
      } else if (error.response?.data?.message) {
        toast.error(error.response.data.message)
      } else if (error.message) {
        toast.error(error.message)
      } else {
        toast.error('Failed to save program. Please try again.')
      }
    } finally {
      setSubmitting(false)
    }
  }

  const handleEdit = (program) => {
    setEditingProgram(program)
    
    // Handle backward compatibility for eligibility field
    let eligibilityObj = {
      qualification: '',
      subjects: '',
      percentage: '',
      entrance: '',
      additional: ''
    }
    
    if (program.eligibility) {
      if (typeof program.eligibility === 'string') {
        // Old format: eligibility is a string
        eligibilityObj.qualification = program.eligibility
      } else if (typeof program.eligibility === 'object') {
        // New format: eligibility is an object
        eligibilityObj = { ...eligibilityObj, ...program.eligibility }
      }
    }
    
    // Handle backward compatibility for fees field
    let feesObj = {
      tuition: '',
      hostel: '',
      mess: '',
      other: '',
      total: '',
      annual: ''
    }
    
    if (program.fees) {
      if (typeof program.fees === 'number') {
        // Old format: fees is a number
        feesObj.annual = program.fees.toString()
        feesObj.total = `₹${program.fees.toLocaleString()}`
      } else if (typeof program.fees === 'object') {
        // New format: fees is an object
        feesObj = { ...feesObj, ...program.fees }
        if (program.fees.annual) {
          feesObj.annual = program.fees.annual.toString()
        }
      }
    }
    
    setFormData({
      title: program.title || '',
      slug: program.slug || '',
      shortName: program.shortName || '',
      description: program.description || '',
      overview: program.overview || '',
      duration: program.duration || '',
      eligibility: eligibilityObj,
      fees: feesObj,
      intake: program.intake?.toString() || '',
      department: program.department || '',
      level: program.level || '',
      curriculum: program.curriculum || [],
      detailedCurriculum: program.detailedCurriculum || {
        semester1: [''],
        semester2: [''],
        semester3: [''],
        semester4: [''],
        semester5: [''],
        semester6: [''],
        semester7: [''],
        semester8: ['']
      },
      highlights: program.highlights || [''],
      careerOpportunities: program.careerOpportunities || [''],
      facilities: program.facilities || [''],
      admissionProcess: program.admissionProcess || {
        process: '',
        application: '',
        documents: [''],
        importantDates: [{ event: '', date: '' }]
      }
    })
    setActiveTab('basic') // Start with basic tab
    setShowModal(true)
  }

  const handleDelete = async () => {
    if (!deletingProgram) return

    try {
      await programsAPI.delete(deletingProgram._id)
      toast.success('Program deleted successfully')
      setShowDeleteModal(false)
      setDeletingProgram(null)
      fetchPrograms()
    } catch (error) {
      console.error('Error deleting program:', error)
      toast.error(error.response?.data?.message || 'Failed to delete program')
    }
  }

  const resetForm = () => {
    setFormData({
      title: '',
      slug: '',
      shortName: '',
      description: '',
      overview: '',
      duration: '',
      eligibility: {
        qualification: '',
        subjects: '',
        percentage: '',
        entrance: '',
        additional: ''
      },
      fees: {
        tuition: '',
        hostel: '',
        mess: '',
        other: '',
        total: '',
        annual: ''
      },
      intake: '',
      department: '',
      level: '',
      curriculum: [],
      detailedCurriculum: {
        semester1: [''],
        semester2: [''],
        semester3: [''],
        semester4: [''],
        semester5: [''],
        semester6: [''],
        semester7: [''],
        semester8: ['']
      },
      highlights: [''],
      careerOpportunities: [''],
      facilities: [''],
      admissionProcess: {
        process: '',
        application: '',
        documents: [''],
        importantDates: [{ event: '', date: '' }]
      }
    })
    setEditingProgram(null)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    console.log(`Form field changed: ${name} = ${value}`)
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  // Handle nested object changes (like eligibility.qualification)
  const handleNestedChange = (path, value) => {
    setFormData(prev => {
      const newData = { ...prev }
      const keys = path.split('.')
      let current = newData
      
      // Create nested objects if they don't exist
      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]] || typeof current[keys[i]] !== 'object') {
          current[keys[i]] = {}
        }
        current = current[keys[i]]
      }
      
      current[keys[keys.length - 1]] = value
      return newData
    })
  }

  // Handle array changes (like highlights, careerOpportunities)
  const handleArrayChange = (fieldName, index, value) => {
    setFormData(prev => {
      const newArray = [...prev[fieldName]]
      newArray[index] = value
      return { ...prev, [fieldName]: newArray }
    })
  }

  // Add new item to array
  const addArrayItem = (fieldName) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: [...prev[fieldName], '']
    }))
  }

  // Remove item from array
  const removeArrayItem = (fieldName, index) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: prev[fieldName].filter((_, i) => i !== index)
    }))
  }

  // Generate slug from title
  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, '-')
      .substring(0, 50)
  }

  // Auto-generate slug when title changes
  const handleTitleChange = (e) => {
    const title = e.target.value
    setFormData(prev => ({
      ...prev,
      title,
      slug: generateSlug(title)
    }))
  }

  const handleAddNew = () => {
    console.log('Opening new program modal')
    resetForm()
    setActiveTab('basic') // Reset to first tab
    setShowModal(true)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Programs Management</h1>
          <p className="text-gray-600">Manage academic programs and courses</p>
        </div>
        
        <div className="flex space-x-2">
          <button
            onClick={handleAddNew}
            className="btn-primary flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Program
          </button>
          
          <button
            onClick={testProgramCreation}
            className="btn-secondary flex items-center"
          >
            Test API
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search programs..."
            className="form-input pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Programs Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Program
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Level
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Duration
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Intake
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fees
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center">
                    <LoadingSpinner />
                  </td>
                </tr>
              ) : (programs || []).length > 0 ? (
                (programs || []).map((program) => (
                  <tr key={program._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {program.title}
                        </div>
                        <div className="text-sm text-gray-500">
                          {program.department}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                        {program.level.charAt(0).toUpperCase() + program.level.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {program.duration}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {program.intake}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ₹{program.fees?.annual?.toLocaleString() || program.fees?.toLocaleString() || 'TBD'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(program)}
                          className="text-blue-500 hover:text-blue-600"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            setDeletingProgram(program)
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
                  <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                    No programs found
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
        title={editingProgram ? 'Edit Program' : 'Add New Program'}
        size="lg"
      >
        <Form onSubmit={handleSubmit}>
          {/* Tab Navigation */}
          <div className="border-b border-gray-200 mb-6">
            <nav className="flex space-x-8">
              {[
                { id: 'basic', name: 'Basic Info', icon: BookOpen },
                { id: 'curriculum', name: 'Curriculum', icon: Award },
                { id: 'fees', name: 'Fees & Admission', icon: DollarSign },
                { id: 'details', name: 'Additional Details', icon: Users }
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="w-4 h-4 mr-2" />
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          {activeTab === 'basic' && (
            <div className="space-y-4">
              <FormGroup label="Program Title" required>
                <Input
                  name="title"
                  value={formData.title}
                  onChange={handleTitleChange}
                  placeholder="Enter program title"
                  required
                />
              </FormGroup>

              <FormGroup label="Program Slug" required>
                <Input
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  placeholder="URL-friendly name (auto-generated)"
                  required
                />
                <p className="text-sm text-gray-500 mt-1">
                  URL will be: /programs/{formData.slug}
                </p>
              </FormGroup>

              <FormGroup label="Short Name">
                <Input
                  name="shortName"
                  value={formData.shortName}
                  onChange={handleChange}
                  placeholder="e.g., B.F.Sc., M.F.Sc."
                />
              </FormGroup>

              <FormGroup label="Overview">
                <Textarea
                  name="overview"
                  value={formData.overview}
                  onChange={handleChange}
                  placeholder="Brief program overview"
                  rows={3}
                />
              </FormGroup>

              <FormGroup label="Description" required>
                <Textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Detailed program description"
                  rows={4}
                  required
                />
              </FormGroup>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormGroup label="Level" required>
                  <Select
                    name="level"
                    value={formData.level}
                    onChange={handleChange}
                    options={levels}
                    placeholder="Select level"
                    required
                  />
                </FormGroup>

                <FormGroup label="Duration" required>
                  <Input
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    placeholder="e.g., 4 Years (8 Semesters)"
                    required
                  />
                </FormGroup>

                <FormGroup label="Department" required>
                  <Input
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    placeholder="Enter department"
                    required
                  />
                </FormGroup>

                <FormGroup label="Intake Capacity" required>
                  <Input
                    type="number"
                    name="intake"
                    value={formData.intake}
                    onChange={handleChange}
                    placeholder="Enter intake capacity"
                    required
                  />
                </FormGroup>
              </div>

              {/* Eligibility Section */}
              <div className="border rounded-lg p-4 bg-gray-50">
                <h3 className="font-medium text-gray-900 mb-3">Eligibility Criteria</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormGroup label="Qualification">
                    <Input
                      value={formData.eligibility?.qualification || ''}
                      onChange={(e) => handleNestedChange('eligibility.qualification', e.target.value)}
                      placeholder="e.g., 10+2 or equivalent"
                    />
                  </FormGroup>
                  <FormGroup label="Subjects">
                    <Input
                      value={formData.eligibility?.subjects || ''}
                      onChange={(e) => handleNestedChange('eligibility.subjects', e.target.value)}
                      placeholder="e.g., Physics, Chemistry, Biology"
                    />
                  </FormGroup>
                  <FormGroup label="Percentage">
                    <Input
                      value={formData.eligibility?.percentage || ''}
                      onChange={(e) => handleNestedChange('eligibility.percentage', e.target.value)}
                      placeholder="e.g., 50% aggregate marks"
                    />
                  </FormGroup>
                  <FormGroup label="Entrance Exam">
                    <Input
                      value={formData.eligibility?.entrance || ''}
                      onChange={(e) => handleNestedChange('eligibility.entrance', e.target.value)}
                      placeholder="e.g., Valid JEE/NEET score"
                    />
                  </FormGroup>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'curriculum' && (
            <div className="space-y-6">
              {/* Program Highlights */}
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Program Highlights</h3>
                {(formData.highlights || []).map((highlight, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <Input
                      value={highlight}
                      onChange={(e) => handleArrayChange('highlights', index, e.target.value)}
                      placeholder="Enter program highlight"
                      className="flex-1"
                    />
                    <button
                      type="button"
                      onClick={() => removeArrayItem('highlights', index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayItem('highlights')}
                  className="text-blue-600 hover:text-blue-800 text-sm"
                >
                  + Add Highlight
                </button>
              </div>

              {/* Semester-wise Curriculum */}
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Semester-wise Curriculum</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Object.entries(formData.detailedCurriculum || {}).map(([semester, subjects]) => (
                    <div key={semester} className="border rounded-lg p-4 bg-gray-50">
                      <h4 className="font-medium mb-3 capitalize">
                        {semester.replace('semester', 'Semester ')}
                      </h4>
                      {(subjects || []).map((subject, index) => (
                        <div key={index} className="flex gap-2 mb-2">
                          <Input
                            value={subject}
                            onChange={(e) => {
                              const newCurriculum = { ...formData.detailedCurriculum }
                              newCurriculum[semester][index] = e.target.value
                              setFormData(prev => ({ ...prev, detailedCurriculum: newCurriculum }))
                            }}
                            placeholder="Enter subject"
                            className="flex-1 text-sm"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const newCurriculum = { ...formData.detailedCurriculum }
                              newCurriculum[semester] = newCurriculum[semester].filter((_, i) => i !== index)
                              setFormData(prev => ({ ...prev, detailedCurriculum: newCurriculum }))
                            }}
                            className="text-red-600 hover:text-red-800 text-sm"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => {
                          const newCurriculum = { ...formData.detailedCurriculum }
                          newCurriculum[semester].push('')
                          setFormData(prev => ({ ...prev, detailedCurriculum: newCurriculum }))
                        }}
                        className="text-blue-600 hover:text-blue-800 text-sm"
                      >
                        + Add Subject
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'fees' && (
            <div className="space-y-6">
              {/* Fee Structure */}
              <div className="border rounded-lg p-4 bg-gray-50">
                <h3 className="font-medium text-gray-900 mb-3">Fee Structure</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormGroup label="Tuition Fee">
                    <Input
                      value={formData.fees?.tuition || ''}
                      onChange={(e) => handleNestedChange('fees.tuition', e.target.value)}
                      placeholder="e.g., ₹50,000"
                    />
                  </FormGroup>
                  <FormGroup label="Hostel Fee">
                    <Input
                      value={formData.fees?.hostel || ''}
                      onChange={(e) => handleNestedChange('fees.hostel', e.target.value)}
                      placeholder="e.g., ₹25,000"
                    />
                  </FormGroup>
                  <FormGroup label="Mess Fee">
                    <Input
                      value={formData.fees?.mess || ''}
                      onChange={(e) => handleNestedChange('fees.mess', e.target.value)}
                      placeholder="e.g., ₹30,000"
                    />
                  </FormGroup>
                  <FormGroup label="Other Fees">
                    <Input
                      value={formData.fees?.other || ''}
                      onChange={(e) => handleNestedChange('fees.other', e.target.value)}
                      placeholder="e.g., ₹10,000"
                    />
                  </FormGroup>
                  <FormGroup label="Total Annual Fee">
                    <Input
                      value={formData.fees?.total || ''}
                      onChange={(e) => handleNestedChange('fees.total', e.target.value)}
                      placeholder="e.g., ₹1,15,000"
                    />
                  </FormGroup>
                  <FormGroup label="Annual Fee (Numeric)">
                    <Input
                      type="number"
                      value={formData.fees?.annual || ''}
                      onChange={(e) => handleNestedChange('fees.annual', e.target.value)}
                      placeholder="115000"
                    />
                  </FormGroup>
                </div>
              </div>

              {/* Admission Process */}
              <div className="border rounded-lg p-4 bg-gray-50">
                <h3 className="font-medium text-gray-900 mb-3">Admission Process</h3>
                <div className="space-y-4">
                  <FormGroup label="Process">
                    <Input
                      value={formData.admissionProcess?.process || ''}
                      onChange={(e) => handleNestedChange('admissionProcess.process', e.target.value)}
                      placeholder="e.g., Entrance Test + Counseling"
                    />
                  </FormGroup>
                  <FormGroup label="Application Method">
                    <Input
                      value={formData.admissionProcess?.application || ''}
                      onChange={(e) => handleNestedChange('admissionProcess.application', e.target.value)}
                      placeholder="e.g., Online application process"
                    />
                  </FormGroup>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'details' && (
            <div className="space-y-6">
              {/* Career Opportunities */}
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Career Opportunities</h3>
                {(formData.careerOpportunities || []).map((career, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <Input
                      value={career}
                      onChange={(e) => handleArrayChange('careerOpportunities', index, e.target.value)}
                      placeholder="Enter career opportunity"
                      className="flex-1"
                    />
                    <button
                      type="button"
                      onClick={() => removeArrayItem('careerOpportunities', index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayItem('careerOpportunities')}
                  className="text-blue-600 hover:text-blue-800 text-sm"
                >
                  + Add Career Opportunity
                </button>
              </div>

              {/* Facilities */}
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Facilities</h3>
                {(formData.facilities || []).map((facility, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <Input
                      value={facility}
                      onChange={(e) => handleArrayChange('facilities', index, e.target.value)}
                      placeholder="Enter facility"
                      className="flex-1"
                    />
                    <button
                      type="button"
                      onClick={() => removeArrayItem('facilities', index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayItem('facilities')}
                  className="text-blue-600 hover:text-blue-800 text-sm"
                >
                  + Add Facility
                </button>
              </div>
            </div>
          )}

          <div className="flex justify-end space-x-3 mt-6 pt-6 border-t">
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="btn-ghost"
            >
              Cancel
            </button>
            <SubmitButton isLoading={submitting}>
              {editingProgram ? 'Update Program' : 'Create Program'}
            </SubmitButton>
          </div>
        </Form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        title="Delete Program"
        message={`Are you sure you want to delete "${deletingProgram?.title}"? This action cannot be undone.`}
        type="danger"
      />
    </div>
  )
}

export default ProgramsManagement






