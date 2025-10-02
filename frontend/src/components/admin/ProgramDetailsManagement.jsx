import React, { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, Save, X, BookOpen, Users, GraduationCap } from 'lucide-react'
import { contentAPI } from '../../services/api'
import LoadingSpinner from '../common/LoadingSpinner'
import Card from '../common/Card'
import toast from 'react-hot-toast'

const ProgramDetailsManagement = () => {
  const [programs, setPrograms] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingProgram, setEditingProgram] = useState(null)

  const [formData, setFormData] = useState({
    id: '',
    name: '',
    shortName: '',
    duration: '',
    seats: '',
    overview: '',
    description: '',
    highlights: [''],
    eligibility: {
      qualification: '',
      subjects: '',
      percentage: '',
      entrance: ''
    },
    fees: {
      tuition: '',
      total: ''
    },
    career: [''],
    curriculum: {
      semester1: [''],
      semester2: [''],
      semester3: [''],
      semester4: ['']
    }
  })

  const availablePrograms = [
    { id: 'bfsc', name: 'Bachelor of Fishery Science (B.F.Sc.)' },
    { id: 'mfsc-aquaculture', name: 'Master of Fishery Science - Aquaculture' },
    { id: 'mfsc-fishery-resource', name: 'Master of Fishery Science - Fishery Resource Management' },
    { id: 'phd-fishery', name: 'Doctor of Philosophy in Fishery Science' }
  ]

  useEffect(() => {
    fetchPrograms()
  }, [])

  const fetchPrograms = async () => {
    try {
      setLoading(true)
      const programList = []
      
      // Fetch each program's details
      for (const prog of availablePrograms) {
        try {
          const response = await contentAPI.getByKey(`program-details-${prog.id}`)
          if (response.data.success && response.data.data.content) {
            const programData = JSON.parse(response.data.data.content.content)
            programList.push(programData)
          }
        } catch (error) {
          console.log(`No data found for program: ${prog.id}`)
        }
      }
      
      setPrograms(programList)
    } catch (error) {
      console.error('Error fetching programs:', error)
      toast.error('Failed to fetch programs')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      // Clean up the form data
      const cleanedData = {
        ...formData,
        seats: parseInt(formData.seats) || 0,
        highlights: formData.highlights.filter(h => h.trim() !== ''),
        career: formData.career.filter(c => c.trim() !== ''),
        curriculum: Object.keys(formData.curriculum).reduce((acc, key) => {
          acc[key] = formData.curriculum[key].filter(subject => subject.trim() !== '')
          return acc
        }, {})
      }

      await contentAPI.updateByKey(`program-details-${formData.id}`, {
        content: JSON.stringify(cleanedData),
        section: 'academic',
        subsection: 'programs',
        title: `Program Details - ${cleanedData.name}`,
        type: 'json',
        isPublished: true
      })

      await fetchPrograms()
      resetForm()
      toast.success(editingProgram ? 'Program updated successfully' : 'Program created successfully')
    } catch (error) {
      console.error('Error saving program:', error)
      toast.error('Failed to save program')
    }
  }

  const handleEdit = (program) => {
    setEditingProgram(program)
    setFormData({
      ...program,
      highlights: [...program.highlights, ''],
      career: [...program.career, ''],
      curriculum: Object.keys(program.curriculum || {}).reduce((acc, key) => {
        acc[key] = [...(program.curriculum[key] || []), '']
        return acc
      }, {
        semester1: [''],
        semester2: [''],
        semester3: [''],
        semester4: ['']
      })
    })
    setShowForm(true)
  }

  const handleDelete = async (programId) => {
    if (!window.confirm('Are you sure you want to delete this program details?')) {
      return
    }

    try {
      // First fetch the content to get the ID, then delete
      const response = await contentAPI.getByKey(`program-details-${programId}`)
      if (response.data.success && response.data.data.content) {
        await contentAPI.delete(response.data.data.content._id)
      }
      await fetchPrograms()
      toast.success('Program deleted successfully')
    } catch (error) {
      console.error('Error deleting program:', error)
      toast.error('Failed to delete program')
    }
  }

  const resetForm = () => {
    setFormData({
      id: '',
      name: '',
      shortName: '',
      duration: '',
      seats: '',
      overview: '',
      description: '',
      highlights: [''],
      eligibility: {
        qualification: '',
        subjects: '',
        percentage: '',
        entrance: ''
      },
      fees: {
        tuition: '',
        total: ''
      },
      career: [''],
      curriculum: {
        semester1: [''],
        semester2: [''],
        semester3: [''],
        semester4: ['']
      }
    })
    setEditingProgram(null)
    setShowForm(false)
  }

  const addArrayField = (field, subField = null) => {
    if (subField) {
      setFormData({
        ...formData,
        [field]: {
          ...formData[field],
          [subField]: [...formData[field][subField], '']
        }
      })
    } else {
      setFormData({
        ...formData,
        [field]: [...formData[field], '']
      })
    }
  }

  const removeArrayField = (field, index, subField = null) => {
    if (subField) {
      const newArray = formData[field][subField].filter((_, i) => i !== index)
      setFormData({
        ...formData,
        [field]: {
          ...formData[field],
          [subField]: newArray
        }
      })
    } else {
      const newArray = formData[field].filter((_, i) => i !== index)
      setFormData({
        ...formData,
        [field]: newArray
      })
    }
  }

  const updateArrayField = (field, index, value, subField = null) => {
    if (subField) {
      const newArray = [...formData[field][subField]]
      newArray[index] = value
      setFormData({
        ...formData,
        [field]: {
          ...formData[field],
          [subField]: newArray
        }
      })
    } else {
      const newArray = [...formData[field]]
      newArray[index] = value
      setFormData({
        ...formData,
        [field]: newArray
      })
    }
  }

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Program Details Management</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Program Details
        </button>
      </div>

      {showForm && (
        <Card className="bg-white">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              {editingProgram ? 'Edit Program Details' : 'Add Program Details'}
            </h3>
            <button
              onClick={resetForm}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="border-b border-gray-200 pb-6">
              <h4 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Program ID
                  </label>
                  <select
                    value={formData.id}
                    onChange={(e) => setFormData({...formData, id: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    required
                  >
                    <option value="">Select Program</option>
                    {availablePrograms.map((prog) => (
                      <option key={prog.id} value={prog.id}>{prog.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Program Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Short Name
                  </label>
                  <input
                    type="text"
                    value={formData.shortName}
                    onChange={(e) => setFormData({...formData, shortName: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    placeholder="B.F.Sc., M.F.Sc., etc."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Duration
                  </label>
                  <input
                    type="text"
                    value={formData.duration}
                    onChange={(e) => setFormData({...formData, duration: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    placeholder="4 Years (8 Semesters)"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Number of Seats
                  </label>
                  <input
                    type="number"
                    value={formData.seats}
                    onChange={(e) => setFormData({...formData, seats: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Overview (Brief Description)
                </label>
                <input
                  type="text"
                  value={formData.overview}
                  onChange={(e) => setFormData({...formData, overview: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  maxLength={200}
                />
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Detailed Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  rows={4}
                />
              </div>
            </div>

            {/* Program Highlights */}
            <div className="border-b border-gray-200 pb-6">
              <h4 className="text-lg font-medium text-gray-900 mb-4">Program Highlights</h4>
              {formData.highlights.map((highlight, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={highlight}
                    onChange={(e) => updateArrayField('highlights', index, e.target.value)}
                    className="flex-1 border border-gray-300 rounded-lg px-3 py-2"
                    placeholder="Enter program highlight"
                  />
                  <button
                    type="button"
                    onClick={() => removeArrayField('highlights', index)}
                    className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayField('highlights')}
                className="text-blue-600 hover:text-blue-700"
              >
                + Add Highlight
              </button>
            </div>

            {/* Eligibility */}
            <div className="border-b border-gray-200 pb-6">
              <h4 className="text-lg font-medium text-gray-900 mb-4">Eligibility Criteria</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Qualification
                  </label>
                  <input
                    type="text"
                    value={formData.eligibility.qualification}
                    onChange={(e) => setFormData({
                      ...formData,
                      eligibility: { ...formData.eligibility, qualification: e.target.value }
                    })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    placeholder="10+2 or equivalent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Required Subjects
                  </label>
                  <input
                    type="text"
                    value={formData.eligibility.subjects}
                    onChange={(e) => setFormData({
                      ...formData,
                      eligibility: { ...formData.eligibility, subjects: e.target.value }
                    })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    placeholder="Physics, Chemistry, Biology"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Minimum Percentage
                  </label>
                  <input
                    type="text"
                    value={formData.eligibility.percentage}
                    onChange={(e) => setFormData({
                      ...formData,
                      eligibility: { ...formData.eligibility, percentage: e.target.value }
                    })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    placeholder="50% aggregate"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Entrance Exam
                  </label>
                  <input
                    type="text"
                    value={formData.eligibility.entrance}
                    onChange={(e) => setFormData({
                      ...formData,
                      eligibility: { ...formData.eligibility, entrance: e.target.value }
                    })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    placeholder="JEE/NEET/State Entrance"
                  />
                </div>
              </div>
            </div>

            {/* Fees */}
            <div className="border-b border-gray-200 pb-6">
              <h4 className="text-lg font-medium text-gray-900 mb-4">Fee Structure</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tuition Fee (Annual)
                  </label>
                  <input
                    type="text"
                    value={formData.fees.tuition}
                    onChange={(e) => setFormData({
                      ...formData,
                      fees: { ...formData.fees, tuition: e.target.value }
                    })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    placeholder="₹50,000 per year"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Total Fee (Annual)
                  </label>
                  <input
                    type="text"
                    value={formData.fees.total}
                    onChange={(e) => setFormData({
                      ...formData,
                      fees: { ...formData.fees, total: e.target.value }
                    })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    placeholder="₹1,15,000 per year"
                  />
                </div>
              </div>
            </div>

            {/* Career Opportunities */}
            <div className="border-b border-gray-200 pb-6">
              <h4 className="text-lg font-medium text-gray-900 mb-4">Career Opportunities</h4>
              {formData.career.map((career, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={career}
                    onChange={(e) => updateArrayField('career', index, e.target.value)}
                    className="flex-1 border border-gray-300 rounded-lg px-3 py-2"
                    placeholder="Enter career opportunity"
                  />
                  <button
                    type="button"
                    onClick={() => removeArrayField('career', index)}
                    className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayField('career')}
                className="text-blue-600 hover:text-blue-700"
              >
                + Add Career Option
              </button>
            </div>

            {/* Submit Button */}
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
                {editingProgram ? 'Update' : 'Create'} Program
              </button>
            </div>
          </form>
        </Card>
      )}

      {/* Programs List */}
      <div className="grid grid-cols-1 gap-4">
        {programs.length === 0 ? (
          <Card className="text-center py-8">
            <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No program details found. Add your first program!</p>
          </Card>
        ) : (
          programs.map((program) => (
            <Card key={program.id} className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-grow">
                  <div className="flex items-center mb-2">
                    <GraduationCap className="w-5 h-5 text-blue-600 mr-2" />
                    <h3 className="font-semibold text-gray-900">{program.name}</h3>
                  </div>
                  <p className="text-gray-600 mb-2">{program.overview}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>Duration: {program.duration}</span>
                    <span>•</span>
                    <span>Seats: {program.seats}</span>
                    {program.fees?.total && (
                      <>
                        <span>•</span>
                        <span>Fee: {program.fees.total}</span>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 ml-4">
                  <button
                    onClick={() => handleEdit(program)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                    title="Edit program"
                  >
                    <Edit className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleDelete(program.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                    title="Delete program"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      {programs.length > 0 && (
        <div className="text-sm text-gray-500 bg-blue-50 p-4 rounded-lg">
          <strong>Note:</strong> Program details are displayed on individual program pages accessible via the "Learn More" buttons on the Programs page.
        </div>
      )}
    </div>
  )
}

export default ProgramDetailsManagement