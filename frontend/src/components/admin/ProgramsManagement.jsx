import React, { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, Search, Eye } from 'lucide-react'
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
  const [submitting, setSubmitting] = useState(false)
  const [pagination, setPagination] = useState({})

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    duration: '',
    eligibility: '',
    fees: '',
    intake: '',
    department: '',
    level: '',
    curriculum: []
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

  const fetchPrograms = async () => {
    try {
      setLoading(true)
      const params = { page: 1, limit: 20 }
      if (searchTerm) params.search = searchTerm

      const response = await programsAPI.getAll(params)
      if (response.data.success) {
        setPrograms(response.data.data.programs || [])
        setPagination(response.data.data.pagination || {})
      }
    } catch (error) {
      console.error('Error fetching programs:', error)
      toast.error('Failed to fetch programs')
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
        fees: parseFloat(formData.fees),
        intake: parseInt(formData.intake)
      }

      if (editingProgram) {
        await programsAPI.update(editingProgram._id, data)
        toast.success('Program updated successfully')
      } else {
        await programsAPI.create(data)
        toast.success('Program created successfully')
      }

      setShowModal(false)
      resetForm()
      fetchPrograms()
    } catch (error) {
      console.error('Error saving program:', error)
      toast.error(error.response?.data?.message || 'Failed to save program')
    } finally {
      setSubmitting(false)
    }
  }

  const handleEdit = (program) => {
    setEditingProgram(program)
    setFormData({
      title: program.title,
      description: program.description,
      duration: program.duration,
      eligibility: program.eligibility,
      fees: program.fees.toString(),
      intake: program.intake.toString(),
      department: program.department,
      level: program.level,
      curriculum: program.curriculum || []
    })
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
      description: '',
      duration: '',
      eligibility: '',
      fees: '',
      intake: '',
      department: '',
      level: '',
      curriculum: []
    })
    setEditingProgram(null)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Programs Management</h1>
          <p className="text-gray-600">Manage academic programs and courses</p>
        </div>
        
        <button
          onClick={() => {
            resetForm()
            setShowModal(true)
          }}
          className="btn-primary flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Program
        </button>
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
              ) : programs.length > 0 ? (
                programs.map((program) => (
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
                      ₹{program.fees?.toLocaleString() || 'TBD'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(program)}
                          className="text-primary-600 hover:text-primary-900"
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
          <FormGroup label="Program Title" required>
            <Input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter program title"
              required
            />
          </FormGroup>

          <FormGroup label="Description" required>
            <Textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter program description"
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
                placeholder="e.g., 4 Years"
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

            <FormGroup label="Eligibility" required>
              <Input
                name="eligibility"
                value={formData.eligibility}
                onChange={handleChange}
                placeholder="e.g., 10+2 with PCB"
                required
              />
            </FormGroup>

            <FormGroup label="Annual Fees (₹)" required>
              <Input
                type="number"
                name="fees"
                value={formData.fees}
                onChange={handleChange}
                placeholder="Enter fees amount"
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

          <div className="flex justify-end space-x-3 mt-6">
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