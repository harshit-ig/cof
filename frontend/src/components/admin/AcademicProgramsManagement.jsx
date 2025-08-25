import React, { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, BookOpen, IndianRupee, Clock, Users, Save, X } from 'lucide-react'
import toast from 'react-hot-toast'

const AcademicProgramsManagement = () => {
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [programs, setPrograms] = useState([])
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingProgram, setEditingProgram] = useState(null)
  const [formData, setFormData] = useState({
    programName: '',
    degree: '',
    duration: '',
    eligibility: '',
    seats: '',
    fees: {
      tuitionFee: '',
      examFee: '',
      libraryFee: '',
      hostelFee: '',
      totalFee: ''
    },
    description: '',
    subjects: [],
    careerOpportunities: [],
    admissionProcess: '',
    isPublished: true
  })

  const degreeTypes = [
    { value: 'B.F.Sc', label: 'Bachelor of Fisheries Science (B.F.Sc)' },
    { value: 'M.F.Sc', label: 'Master of Fisheries Science (M.F.Sc)' },
    { value: 'Ph.D', label: 'Doctor of Philosophy (Ph.D)' },
    { value: 'Diploma', label: 'Diploma in Fisheries' },
    { value: 'Certificate', label: 'Certificate Course' }
  ]

  useEffect(() => {
    fetchPrograms()
  }, [])

  const fetchPrograms = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/content/academic-programs')
      const data = await response.json()
      
      if (data.success) {
        setPrograms(data.data.content || [])
      }
    } catch (error) {
      console.error('Error fetching programs:', error)
      toast.error('Failed to load academic programs')
    } finally {
      setLoading(false)
    }
  }

  const calculateTotalFee = (fees) => {
    const total = Object.values(fees).reduce((sum, fee) => {
      const numFee = parseFloat(fee) || 0
      return sum + numFee
    }, 0) - (parseFloat(fees.totalFee) || 0) // Subtract totalFee to avoid double counting
    return total.toString()
  }

  const handleInputChange = (field, value) => {
    if (field.startsWith('fees.')) {
      const feeField = field.split('.')[1]
      const newFees = {
        ...formData.fees,
        [feeField]: value
      }
      
      // Auto-calculate total fee
      if (feeField !== 'totalFee') {
        newFees.totalFee = calculateTotalFee(newFees)
      }

      setFormData(prev => ({
        ...prev,
        fees: newFees
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }))
    }
  }

  const handleArrayInput = (field, value) => {
    const items = value.split('\n').filter(item => item.trim() !== '')
    setFormData(prev => ({
      ...prev,
      [field]: items
    }))
  }

  const resetForm = () => {
    setFormData({
      programName: '',
      degree: '',
      duration: '',
      eligibility: '',
      seats: '',
      fees: {
        tuitionFee: '',
        examFee: '',
        libraryFee: '',
        hostelFee: '',
        totalFee: ''
      },
      description: '',
      subjects: [],
      careerOpportunities: [],
      admissionProcess: '',
      isPublished: true
    })
    setEditingProgram(null)
  }

  const handleEdit = (program) => {
    setFormData({
      programName: program.title || '',
      degree: program.data?.degree || '',
      duration: program.data?.duration || '',
      eligibility: program.data?.eligibility || '',
      seats: program.data?.seats || '',
      fees: program.data?.fees || {
        tuitionFee: '',
        examFee: '',
        libraryFee: '',
        hostelFee: '',
        totalFee: ''
      },
      description: program.data?.description || '',
      subjects: program.data?.subjects || [],
      careerOpportunities: program.data?.careerOpportunities || [],
      admissionProcess: program.data?.admissionProcess || '',
      isPublished: program.isPublished
    })
    setEditingProgram(program)
    setShowAddModal(true)
  }

  const handleSave = async () => {
    if (!formData.programName.trim()) {
      toast.error('Program name is required')
      return
    }

    try {
      setSaving(true)
      
      const payload = {
        section: 'academic-programs',
        subsection: formData.degree,
        title: formData.programName,
        data: {
          degree: formData.degree,
          duration: formData.duration,
          eligibility: formData.eligibility,
          seats: formData.seats,
          fees: formData.fees,
          description: formData.description,
          subjects: formData.subjects,
          careerOpportunities: formData.careerOpportunities,
          admissionProcess: formData.admissionProcess
        },
        isPublished: formData.isPublished,
        order: editingProgram ? editingProgram.order : programs.length + 1
      }

      const url = editingProgram 
        ? `/api/content/${editingProgram._id}`
        : '/api/content'
      
      const method = editingProgram ? 'PATCH' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(payload)
      })

      const data = await response.json()
      if (data.success) {
        toast.success(`Program ${editingProgram ? 'updated' : 'added'} successfully!`)
        setShowAddModal(false)
        resetForm()
        fetchPrograms()
      } else {
        throw new Error(data.message)
      }
    } catch (error) {
      console.error('Error saving program:', error)
      toast.error(`Failed to ${editingProgram ? 'update' : 'add'} program`)
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (programId) => {
    if (!window.confirm('Are you sure you want to delete this program?')) return

    try {
      const response = await fetch(`/api/content/${programId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })

      const data = await response.json()
      if (data.success) {
        toast.success('Program deleted successfully!')
        fetchPrograms()
      } else {
        throw new Error(data.message)
      }
    } catch (error) {
      console.error('Error deleting program:', error)
      toast.error('Failed to delete program')
    }
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
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Academic Programs & Fees</h2>
              <p className="text-sm text-gray-600">Manage degree programs, fees structure, and admission details</p>
            </div>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Program</span>
          </button>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600">Total Programs</p>
                <p className="text-2xl font-bold text-blue-900">{programs.length}</p>
              </div>
              <BookOpen className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600">Active Programs</p>
                <p className="text-2xl font-bold text-green-900">
                  {programs.filter(p => p.isPublished).length}
                </p>
              </div>
              <Users className="w-8 h-8 text-green-600" />
            </div>
          </div>
          <div className="bg-orange-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-orange-600">Undergraduate</p>
                <p className="text-2xl font-bold text-orange-900">
                  {programs.filter(p => p.data?.degree?.includes('B.')).length}
                </p>
              </div>
              <Clock className="w-8 h-8 text-orange-600" />
            </div>
          </div>
          <div className="bg-purple-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-600">Postgraduate</p>
                <p className="text-2xl font-bold text-purple-900">
                  {programs.filter(p => p.data?.degree?.includes('M.') || p.data?.degree?.includes('Ph.D')).length}
                </p>
              </div>
              <IndianRupee className="w-8 h-8 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Programs List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Programs List</h3>
        
        {programs.length === 0 ? (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No programs added yet</p>
            <button
              onClick={() => setShowAddModal(true)}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Add First Program
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {programs.map((program) => (
              <div key={program._id} className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="text-lg font-medium text-gray-900">{program.title}</h4>
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        {program.data?.degree}
                      </span>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        program.isPublished 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-orange-100 text-orange-800'
                      }`}>
                        {program.isPublished ? 'Published' : 'Draft'}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-600">Duration</p>
                        <p className="font-medium">{program.data?.duration}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Seats</p>
                        <p className="font-medium">{program.data?.seats}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Total Fee</p>
                        <p className="font-medium text-green-600">
                          ₹{program.data?.fees?.totalFee}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Eligibility</p>
                        <p className="font-medium text-sm">{program.data?.eligibility}</p>
                      </div>
                    </div>
                    
                    <p className="text-gray-700 text-sm mb-3 line-clamp-2">
                      {program.data?.description}
                    </p>
                    
                    {program.data?.subjects?.length > 0 && (
                      <div className="mb-3">
                        <p className="text-sm text-gray-600 mb-1">Key Subjects:</p>
                        <div className="flex flex-wrap gap-2">
                          {program.data.subjects.slice(0, 3).map((subject, idx) => (
                            <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                              {subject}
                            </span>
                          ))}
                          {program.data.subjects.length > 3 && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                              +{program.data.subjects.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-4">
                    <button
                      onClick={() => handleEdit(program)}
                      className="p-2 text-gray-400 hover:text-blue-600"
                      title="Edit"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(program._id)}
                      className="p-2 text-gray-400 hover:text-red-600"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add/Edit Program Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-screen overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-medium text-gray-900">
                  {editingProgram ? 'Edit Program' : 'Add New Program'}
                </h3>
                <button
                  onClick={() => {
                    setShowAddModal(false)
                    resetForm()
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Basic Information */}
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Basic Information</h4>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Program Name *
                    </label>
                    <input
                      type="text"
                      value={formData.programName}
                      onChange={(e) => handleInputChange('programName', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., Bachelor of Fisheries Science"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Degree Type *
                    </label>
                    <select
                      value={formData.degree}
                      onChange={(e) => handleInputChange('degree', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select degree type</option>
                      {degreeTypes.map(degree => (
                        <option key={degree.value} value={degree.value}>
                          {degree.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Duration
                      </label>
                      <input
                        type="text"
                        value={formData.duration}
                        onChange={(e) => handleInputChange('duration', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g., 4 Years"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Total Seats
                      </label>
                      <input
                        type="number"
                        value={formData.seats}
                        onChange={(e) => handleInputChange('seats', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g., 60"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Eligibility Criteria
                    </label>
                    <textarea
                      value={formData.eligibility}
                      onChange={(e) => handleInputChange('eligibility', e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., 12th pass with Physics, Chemistry, Biology"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Program Description
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Program overview and objectives"
                    />
                  </div>
                </div>

                {/* Fees and Additional Info */}
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Fees Structure (Per Year)</h4>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tuition Fee
                      </label>
                      <input
                        type="number"
                        value={formData.fees.tuitionFee}
                        onChange={(e) => handleInputChange('fees.tuitionFee', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Exam Fee
                      </label>
                      <input
                        type="number"
                        value={formData.fees.examFee}
                        onChange={(e) => handleInputChange('fees.examFee', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Library Fee
                      </label>
                      <input
                        type="number"
                        value={formData.fees.libraryFee}
                        onChange={(e) => handleInputChange('fees.libraryFee', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Hostel Fee
                      </label>
                      <input
                        type="number"
                        value={formData.fees.hostelFee}
                        onChange={(e) => handleInputChange('fees.hostelFee', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="0"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Total Fee (Auto-calculated)
                    </label>
                    <input
                      type="number"
                      value={formData.fees.totalFee}
                      onChange={(e) => handleInputChange('fees.totalFee', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                      placeholder="0"
                      readOnly
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Key Subjects (One per line)
                    </label>
                    <textarea
                      value={formData.subjects.join('\n')}
                      onChange={(e) => handleArrayInput('subjects', e.target.value)}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Aquaculture&#10;Fish Processing Technology&#10;Fish Nutrition"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Career Opportunities (One per line)
                    </label>
                    <textarea
                      value={formData.careerOpportunities.join('\n')}
                      onChange={(e) => handleArrayInput('careerOpportunities', e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Fisheries Officer&#10;Aquaculture Consultant&#10;Research Scientist"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Admission Process
                    </label>
                    <textarea
                      value={formData.admissionProcess}
                      onChange={(e) => handleInputChange('admissionProcess', e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Admission process details"
                    />
                  </div>

                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      id="publishProgram"
                      checked={formData.isPublished}
                      onChange={(e) => handleInputChange('isPublished', e.target.checked)}
                      className="w-4 h-4 text-blue-600 rounded"
                    />
                    <label htmlFor="publishProgram" className="text-sm text-gray-700">
                      Publish program on website
                    </label>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-3 mt-8 pt-6 border-t border-gray-200">
                <button
                  onClick={() => {
                    setShowAddModal(false)
                    resetForm()
                  }}
                  className="px-6 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
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
                      <span>{editingProgram ? 'Update' : 'Save'} Program</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AcademicProgramsManagement
