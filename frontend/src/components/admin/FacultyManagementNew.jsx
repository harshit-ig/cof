import React, { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, Search, User, Mail, Phone, Award, Eye, EyeOff } from 'lucide-react'
import { facultyAPI } from '../../services/api'
import LoadingSpinner from '../common/LoadingSpinner'
import Modal from '../common/Modal'
import ImageUpload from './ImageUpload'
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
    researchInterests: '',
    publications: '',
    awards: '',
    image: '',
    socialLinks: {
      linkedin: '',
      researchgate: '',
      googleScholar: '',
      orcid: ''
    }
  })

  const designations = [
    'Professor',
    'Associate Professor', 
    'Assistant Professor',
    'Lecturer',
    'Research Fellow',
    'Visiting Faculty'
  ]

  const departments = [
    'Fisheries Science',
    'Aquaculture',
    'Fish Processing Technology',
    'Fisheries Resource Management',
    'Marine Biology',
    'Fish Nutrition',
    'Fish Pathology',
    'Fisheries Economics'
  ]

  useEffect(() => {
    fetchFaculty()
  }, [searchTerm])

  const fetchFaculty = async () => {
    try {
      setLoading(true)
      const params = {}
      if (searchTerm) params.search = searchTerm
      
      const response = await facultyAPI.getAll(params)
      setFaculty(response.data.data.faculty)
      setPagination(response.data.data.pagination)
    } catch (error) {
      console.error('Error fetching faculty:', error)
      toast.error('Failed to fetch faculty members')
    } finally {
      setLoading(false)
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
      researchInterests: '',
      publications: '',
      awards: '',
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

  const handleOpenModal = (facultyMember = null) => {
    if (facultyMember) {
      setEditingFaculty(facultyMember)
      setFormData({
        ...facultyMember,
        researchInterests: Array.isArray(facultyMember.researchInterests) 
          ? facultyMember.researchInterests.join(', ') 
          : facultyMember.researchInterests || '',
        publications: Array.isArray(facultyMember.publications)
          ? facultyMember.publications.map(p => `${p.title} - ${p.journal} (${p.year})`).join('\\n')
          : facultyMember.publications || '',
        awards: Array.isArray(facultyMember.awards)
          ? facultyMember.awards.map(a => `${a.title} - ${a.organization} (${a.year})`).join('\\n')
          : facultyMember.awards || '',
        socialLinks: facultyMember.socialLinks || {
          linkedin: '',
          researchgate: '',
          googleScholar: '',
          orcid: ''
        }
      })
    } else {
      resetForm()
    }
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    resetForm()
  }

  const handleInputChange = (e) => {
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
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }

  const handleImageUpload = (uploadedFile) => {
    setFormData(prev => ({
      ...prev,
      image: uploadedFile.filename
    }))
    toast.success('Image uploaded successfully!')
  }

  const parseArrayField = (field) => {
    if (!field) return []
    return field.split(',').map(item => item.trim()).filter(item => item)
  }

  const parsePublications = (publications) => {
    if (!publications) return []
    return publications.split('\\n').map(pub => {
      const parts = pub.split(' - ')
      if (parts.length >= 2) {
        const [title, rest] = parts
        const yearMatch = rest.match(/\\((\\d{4})\\)/)
        const year = yearMatch ? parseInt(yearMatch[1]) : new Date().getFullYear()
        const journal = rest.replace(/\\(\\d{4}\\)/, '').trim()
        return { title: title.trim(), journal, year }
      }
      return { title: pub.trim(), journal: '', year: new Date().getFullYear() }
    }).filter(pub => pub.title)
  }

  const parseAwards = (awards) => {
    if (!awards) return []
    return awards.split('\\n').map(award => {
      const parts = award.split(' - ')
      if (parts.length >= 2) {
        const [title, rest] = parts
        const yearMatch = rest.match(/\\((\\d{4})\\)/)
        const year = yearMatch ? parseInt(yearMatch[1]) : new Date().getFullYear()
        const organization = rest.replace(/\\(\\d{4}\\)/, '').trim()
        return { title: title.trim(), organization, year }
      }
      return { title: award.trim(), organization: '', year: new Date().getFullYear() }
    }).filter(award => award.title)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const submitData = {
        ...formData,
        researchInterests: parseArrayField(formData.researchInterests),
        publications: parsePublications(formData.publications),
        awards: parseAwards(formData.awards),
        experience: parseInt(formData.experience) || 0
      }

      if (editingFaculty) {
        await facultyAPI.update(editingFaculty._id, submitData)
        toast.success('Faculty member updated successfully!')
      } else {
        await facultyAPI.create(submitData)
        toast.success('Faculty member created successfully!')
      }

      handleCloseModal()
      fetchFaculty()
    } catch (error) {
      console.error('Error saving faculty:', error)
      toast.error(error.response?.data?.message || 'Failed to save faculty member')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async () => {
    if (!deletingFaculty) return

    try {
      await facultyAPI.delete(deletingFaculty._id)
      toast.success('Faculty member deleted successfully!')
      setShowDeleteModal(false)
      setDeletingFaculty(null)
      fetchFaculty()
    } catch (error) {
      console.error('Error deleting faculty:', error)
      toast.error('Failed to delete faculty member')
    }
  }

  const getImageUrl = (filename) => {
    if (!filename) return null
    return `/api/upload/serve/faculty/${filename}`
  }

  const filteredFaculty = faculty.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.designation.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Faculty Management</h1>
        <button
          onClick={() => handleOpenModal()}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700"
        >
          <Plus className="h-4 w-4" />
          <span>Add Faculty</span>
        </button>
      </div>

      {/* Search */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search faculty..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Faculty Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFaculty.map((member) => (
          <div key={member._id} className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Faculty Image */}
            <div className="h-48 bg-gray-200 relative">
              {member.image ? (
                <img
                  src={getImageUrl(member.image)}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <User className="h-16 w-16 text-gray-400" />
                </div>
              )}
              <div className="absolute top-2 right-2 space-x-1">
                <button
                  onClick={() => handleOpenModal(member)}
                  className="p-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                  title="Edit"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  onClick={() => {
                    setDeletingFaculty(member)
                    setShowDeleteModal(true)
                  }}
                  className="p-1 bg-red-600 text-white rounded hover:bg-red-700"
                  title="Delete"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Faculty Info */}
            <div className="p-4">
              <h3 className="font-semibold text-lg text-gray-900 mb-1">{member.name}</h3>
              <p className="text-blue-600 font-medium mb-1">{member.designation}</p>
              <p className="text-gray-600 text-sm mb-2">{member.department}</p>
              <p className="text-gray-500 text-sm mb-3">{member.qualification}</p>
              
              {member.email && (
                <div className="flex items-center text-sm text-gray-600 mb-1">
                  <Mail className="h-4 w-4 mr-2" />
                  <span className="truncate">{member.email}</span>
                </div>
              )}
              
              {member.phone && (
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <Phone className="h-4 w-4 mr-2" />
                  <span>{member.phone}</span>
                </div>
              )}

              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">
                  {member.experience} years exp.
                </span>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  member.isActive 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {member.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredFaculty.length === 0 && (
        <div className="text-center py-12">
          <User className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No faculty found</h3>
          <p className="text-gray-500 mb-4">
            {searchTerm ? 'Try adjusting your search criteria' : 'Get started by adding your first faculty member'}
          </p>
          {!searchTerm && (
            <button
              onClick={() => handleOpenModal()}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Add Faculty Member
            </button>
          )}
        </div>
      )}

      {/* Add/Edit Modal */}
      <Modal
        isOpen={showModal}
        onClose={handleCloseModal}
        title={editingFaculty ? 'Edit Faculty Member' : 'Add Faculty Member'}
        size="large"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Faculty Photo
            </label>
            <ImageUpload
              onUploadSuccess={handleImageUpload}
              uploadType="faculty"
              maxFiles={1}
              acceptedTypes="image/*"
              showPreview={false}
            />
            {formData.image && (
              <div className="mt-3">
                <img
                  src={getImageUrl(formData.image)}
                  alt="Preview"
                  className="w-32 h-32 object-cover rounded-lg"
                />
              </div>
            )}
          </div>

          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Designation *
              </label>
              <select
                name="designation"
                value={formData.designation}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select designation</option>
                {designations.map(designation => (
                  <option key={designation} value={designation}>{designation}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Department *
              </label>
              <select
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select department</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Years of Experience *
              </label>
              <input
                type="number"
                name="experience"
                value={formData.experience}
                onChange={handleInputChange}
                required
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Academic Information */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Qualification *
              </label>
              <input
                type="text"
                name="qualification"
                value={formData.qualification}
                onChange={handleInputChange}
                required
                placeholder="e.g., Ph.D. in Fisheries Science"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Specialization *
              </label>
              <input
                type="text"
                name="specialization"
                value={formData.specialization}
                onChange={handleInputChange}
                required
                placeholder="e.g., Aquaculture, Fish Nutrition"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Biography
              </label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                rows={3}
                placeholder="Brief biography of the faculty member..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Research Interests
              </label>
              <input
                type="text"
                name="researchInterests"
                value={formData.researchInterests}
                onChange={handleInputChange}
                placeholder="Separate multiple interests with commas"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Publications
              </label>
              <textarea
                name="publications"
                value={formData.publications}
                onChange={handleInputChange}
                rows={3}
                placeholder="Title - Journal (Year)&#10;One publication per line"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Awards & Honors
              </label>
              <textarea
                name="awards"
                value={formData.awards}
                onChange={handleInputChange}
                rows={3}
                placeholder="Award Title - Organization (Year)&#10;One award per line"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-3">Social Links</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  LinkedIn
                </label>
                <input
                  type="url"
                  name="socialLinks.linkedin"
                  value={formData.socialLinks.linkedin}
                  onChange={handleInputChange}
                  placeholder="https://linkedin.com/in/..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ResearchGate
                </label>
                <input
                  type="url"
                  name="socialLinks.researchgate"
                  value={formData.socialLinks.researchgate}
                  onChange={handleInputChange}
                  placeholder="https://researchgate.net/profile/..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Google Scholar
                </label>
                <input
                  type="url"
                  name="socialLinks.googleScholar"
                  value={formData.socialLinks.googleScholar}
                  onChange={handleInputChange}
                  placeholder="https://scholar.google.com/citations?user=..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ORCID
                </label>
                <input
                  type="url"
                  name="socialLinks.orcid"
                  value={formData.socialLinks.orcid}
                  onChange={handleInputChange}
                  placeholder="https://orcid.org/..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex justify-end space-x-3 pt-6 border-t">
            <button
              type="button"
              onClick={handleCloseModal}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              {submitting && <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>}
              <span>{editingFaculty ? 'Update' : 'Create'} Faculty</span>
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false)
          setDeletingFaculty(null)
        }}
        title="Delete Faculty Member"
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            Are you sure you want to delete <strong>{deletingFaculty?.name}</strong>? 
            This action cannot be undone.
          </p>
          <div className="flex justify-end space-x-3">
            <button
              onClick={() => {
                setShowDeleteModal(false)
                setDeletingFaculty(null)
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default FacultyManagement
