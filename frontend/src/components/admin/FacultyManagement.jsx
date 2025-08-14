import React, { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, Search, User, Mail, Phone, Award } from 'lucide-react'
import { facultyAPI, uploadAPI } from '../../services/api'
import LoadingSpinner, { LoadingCard } from '../common/LoadingSpinner'
import Modal, { ConfirmModal } from '../common/Modal'
import { Form, FormGroup, Input, Textarea, Select, SubmitButton } from '../common/Form'
import toast from 'react-hot-toast'

const FacultyManagement = () => {
  const [faculty, setFaculty] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [editingFaculty, setEditingFaculty] = useState(null)
  const [deletingFaculty, setDeletingFaculty] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [uploadingImage, setUploadingImage] = useState(false)
  const [pagination, setPagination] = useState({})

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    designation: '',
    department: '',
    qualification: '',
    specialization: '',
    experience: '',
    bio: '',
    researchInterests: [],
    publications: [],
    awards: [],
    image: '',
    socialLinks: {
      linkedin: '',
      researchgate: '',
      googleScholar: '',
      orcid: ''
    }
  })

  const designations = [
    { value: 'Professor', label: 'Professor' },
    { value: 'Associate Professor', label: 'Associate Professor' },
    { value: 'Assistant Professor', label: 'Assistant Professor' },
    { value: 'Lecturer', label: 'Lecturer' },
    { value: 'Research Fellow', label: 'Research Fellow' },
    { value: 'Visiting Faculty', label: 'Visiting Faculty' }
  ]

  const departments = [
    { value: 'Fisheries Science', label: 'Fisheries Science' },
    { value: 'Aquaculture', label: 'Aquaculture' },
    { value: 'Fish Processing Technology', label: 'Fish Processing Technology' },
    { value: 'Fisheries Resource Management', label: 'Fisheries Resource Management' },
    { value: 'Aquatic Environment Management', label: 'Aquatic Environment Management' },
    { value: 'Fish Genetics and Biotechnology', label: 'Fish Genetics and Biotechnology' }
  ]

  useEffect(() => {
    fetchFaculty()
  }, [searchTerm])

  const fetchFaculty = async () => {
    try {
      setLoading(true)
      const params = { page: 1, limit: 20 }
      if (searchTerm) params.search = searchTerm

      const response = await facultyAPI.getAll(params)
      if (response.data.success) {
        setFaculty(response.data.data.faculty || [])
        setPagination(response.data.data.pagination || {})
      }
    } catch (error) {
      console.error('Error fetching faculty:', error)
      toast.error('Failed to fetch faculty')
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
        experience: formData.experience ? parseInt(formData.experience) : 0,
        researchInterests: Array.isArray(formData.researchInterests) 
          ? formData.researchInterests 
          : formData.researchInterests.split(',').map(s => s.trim()).filter(Boolean)
      }

      if (editingFaculty) {
        await facultyAPI.update(editingFaculty._id, data)
        toast.success('Faculty updated successfully')
      } else {
        await facultyAPI.create(data)
        toast.success('Faculty created successfully')
      }

      setShowModal(false)
      resetForm()
      fetchFaculty()
    } catch (error) {
      console.error('Error saving faculty:', error)
      toast.error(error.response?.data?.message || 'Failed to save faculty')
    } finally {
      setSubmitting(false)
    }
  }

  const handleEdit = (facultyMember) => {
    setEditingFaculty(facultyMember)
    setFormData({
      name: facultyMember.name,
      email: facultyMember.email,
      phone: facultyMember.phone,
      designation: facultyMember.designation,
      department: facultyMember.department,
      qualification: facultyMember.qualification,
      specialization: facultyMember.specialization,
      experience: facultyMember.experience?.toString() || '',
      bio: facultyMember.bio,
      researchInterests: Array.isArray(facultyMember.researchInterests) 
        ? facultyMember.researchInterests.join(', ') 
        : facultyMember.researchInterests || '',
      publications: facultyMember.publications || [],
      awards: facultyMember.awards || [],
      image: facultyMember.image || '',
      socialLinks: facultyMember.socialLinks || {
        linkedin: '',
        researchgate: '',
        googleScholar: '',
        orcid: ''
      }
    })
    setShowModal(true)
  }

  const handleDelete = async () => {
    if (!deletingFaculty) return

    try {
      await facultyAPI.delete(deletingFaculty._id)
      toast.success('Faculty deleted successfully')
      setShowDeleteModal(false)
      setDeletingFaculty(null)
      fetchFaculty()
    } catch (error) {
      console.error('Error deleting faculty:', error)
      toast.error(error.response?.data?.message || 'Failed to delete faculty')
    }
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    try {
      setUploadingImage(true)
      const response = await uploadAPI.single(file)
      
      if (response.data.success) {
        setFormData(prev => ({
          ...prev,
          image: response.data.data.url
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
      name: '',
      email: '',
      phone: '',
      designation: '',
      department: '',
      qualification: '',
      specialization: '',
      experience: '',
      bio: '',
      researchInterests: [],
      publications: [],
      awards: [],
      image: '',
      socialLinks: {
        linkedin: '',
        researchgate: '',
        googleScholar: '',
        orcid: ''
      }
    })
    setEditingFaculty(null)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name.startsWith('socialLinks.')) {
      const field = name.split('.')[1]
      setFormData(prev => ({
        ...prev,
        socialLinks: {
          ...prev.socialLinks,
          [field]: value
        }
      }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Faculty Management</h1>
          <p className="text-gray-600">Manage faculty profiles and information</p>
        </div>
        
        <button
          onClick={() => {
            resetForm()
            setShowModal(true)
          }}
          className="btn-primary flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Faculty
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search faculty..."
            className="form-input pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Faculty Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Faculty
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Designation
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Department
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Experience
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
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
              ) : faculty.length > 0 ? (
                faculty.map((member) => (
                  <tr key={member._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <img
                          src={uploadAPI.getImageUrl(member.image, 'faculty') || 'https://via.placeholder.com/40x40?text=User'}
                          alt={member.name}
                          className="w-10 h-10 rounded-full object-cover mr-3"
                        />
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {member.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {member.qualification}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {member.designation}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {member.department}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {member.experience} years
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        <div className="flex items-center mb-1">
                          <Mail className="w-3 h-3 mr-1" />
                          {member.email}
                        </div>
                        {member.phone && (
                          <div className="flex items-center">
                            <Phone className="w-3 h-3 mr-1" />
                            {member.phone}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(member)}
                          className="text-primary-600 hover:text-primary-900"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            setDeletingFaculty(member)
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
                    No faculty found
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
        title={editingFaculty ? 'Edit Faculty' : 'Add New Faculty'}
        size="xl"
      >
        <Form onSubmit={handleSubmit}>
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormGroup label="Full Name" required>
              <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter full name"
                required
              />
            </FormGroup>

            <FormGroup label="Email" required>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email address"
                required
              />
            </FormGroup>

            <FormGroup label="Phone">
              <Input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
              />
            </FormGroup>

            <FormGroup label="Designation" required>
              <Select
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                options={designations}
                placeholder="Select designation"
                required
              />
            </FormGroup>

            <FormGroup label="Department" required>
              <Select
                name="department"
                value={formData.department}
                onChange={handleChange}
                options={departments}
                placeholder="Select department"
                required
              />
            </FormGroup>

            <FormGroup label="Experience (Years)">
              <Input
                type="number"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                placeholder="Years of experience"
              />
            </FormGroup>
          </div>

          <FormGroup label="Qualification" required>
            <Input
              name="qualification"
              value={formData.qualification}
              onChange={handleChange}
              placeholder="e.g., Ph.D. in Fisheries Science"
              required
            />
          </FormGroup>

          <FormGroup label="Specialization">
            <Input
              name="specialization"
              value={formData.specialization}
              onChange={handleChange}
              placeholder="Area of specialization"
            />
          </FormGroup>

          <FormGroup label="Research Interests">
            <Input
              name="researchInterests"
              value={formData.researchInterests}
              onChange={handleChange}
              placeholder="Comma-separated research interests"
            />
          </FormGroup>

          <FormGroup label="Biography">
            <Textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Brief biography"
              rows={4}
            />
          </FormGroup>

          {/* Profile Image */}
          <FormGroup label="Profile Image">
            <div className="space-y-4">
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <User className="w-8 h-8 mb-4 text-gray-500" />
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Click to upload</span> profile image
                    </p>
                    <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={uploadingImage}
                  />
                </label>
              </div>

              {uploadingImage && (
                <div className="flex items-center justify-center">
                  <LoadingSpinner size="sm" />
                  <span className="ml-2 text-sm text-gray-600">Uploading...</span>
                </div>
              )}

              {formData.image && (
                <div className="flex justify-center">
                  <img
                    src={uploadAPI.getImageUrl(formData.image, 'faculty')}
                    alt="Profile"
                    className="w-24 h-24 rounded-full object-cover"
                  />
                </div>
              )}
            </div>
          </FormGroup>

          {/* Social Links */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Social Links</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormGroup label="LinkedIn">
                <Input
                  name="socialLinks.linkedin"
                  value={formData.socialLinks.linkedin}
                  onChange={handleChange}
                  placeholder="LinkedIn profile URL"
                />
              </FormGroup>

              <FormGroup label="ResearchGate">
                <Input
                  name="socialLinks.researchgate"
                  value={formData.socialLinks.researchgate}
                  onChange={handleChange}
                  placeholder="ResearchGate profile URL"
                />
              </FormGroup>

              <FormGroup label="Google Scholar">
                <Input
                  name="socialLinks.googleScholar"
                  value={formData.socialLinks.googleScholar}
                  onChange={handleChange}
                  placeholder="Google Scholar profile URL"
                />
              </FormGroup>

              <FormGroup label="ORCID">
                <Input
                  name="socialLinks.orcid"
                  value={formData.socialLinks.orcid}
                  onChange={handleChange}
                  placeholder="ORCID ID"
                />
              </FormGroup>
            </div>
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
              {editingFaculty ? 'Update Faculty' : 'Create Faculty'}
            </SubmitButton>
          </div>
        </Form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        title="Delete Faculty"
        message={`Are you sure you want to delete "${deletingFaculty?.name}"? This action cannot be undone.`}
        type="danger"
      />
    </div>
  )
}

export default FacultyManagement