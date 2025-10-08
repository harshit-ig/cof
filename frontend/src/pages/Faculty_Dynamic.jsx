import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Users, Award, BookOpen, Mail, Phone, MapPin, Globe, ChevronRight, Filter, Search, Building, Microscope, Fish, FlaskConical, Calculator, Leaf, Globe2, Shield, GraduationCap, Clock } from 'lucide-react'
import Card from '../components/common/Card'
import JobApplicationModal from '../components/common/JobApplicationModal'
import { facultyAPI, uploadAPI } from '../services/api'
import LoadingSpinner from '../components/common/LoadingSpinner'

const Faculty = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDepartment, setSelectedDepartment] = useState('all')
  const [selectedDesignation, setSelectedDesignation] = useState('all')
  const [selectedStaffType, setSelectedStaffType] = useState('Teaching Staff')
  const [facultyMembers, setFacultyMembers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [isJobModalOpen, setIsJobModalOpen] = useState(false)
  const [selectedPositionType, setSelectedPositionType] = useState('faculty')

  // Generate departments dynamically from faculty data
  const getDepartments = () => {
    const uniqueDepartments = [...new Set(facultyMembers.map(f => f.department).filter(Boolean))]
    const departmentIcons = {
      'Fishery Science': Fish,
      'Aquaculture': Fish,
      'Fish Processing Technology': FlaskConical,
      'Fishery Resource Management': Shield,
      'Aquatic Environment Management': Leaf,
      'Fish Genetics and Biotechnology': Microscope,
      'Administration': Building,
      'Library': BookOpen,
      'IT Services': Globe2,
      'Maintenance': Building,
      'Accounts': Calculator,
      'Security': Shield
    }
    
    return [
      { id: 'all', name: 'All Departments', icon: Building },
      ...uniqueDepartments.sort().map(dept => ({
        id: dept,
        name: dept,
        icon: departmentIcons[dept] || Building
      }))
    ]
  }

  // Generate teaching designations dynamically from faculty data
  const getTeachingDesignations = () => {
    const teachingFaculty = facultyMembers.filter(f => f.staffType === 'Teaching Staff')
    const uniqueDesignations = [...new Set(teachingFaculty.map(f => f.designation).filter(Boolean))]
    
    return [
      { id: 'all', name: 'All Designations' },
      ...uniqueDesignations.sort().map(designation => ({
        id: designation,
        name: designation
      }))
    ]
  }

  // Generate non-teaching designations dynamically from faculty data
  const getNonTeachingDesignations = () => {
    const nonTeachingFaculty = facultyMembers.filter(f => f.staffType === 'Non-Teaching Staff')
    const uniqueDesignations = [...new Set(nonTeachingFaculty.map(f => f.designation).filter(Boolean))]
    
    return [
      { id: 'all', name: 'All Designations' },
      ...uniqueDesignations.sort().map(designation => ({
        id: designation,
        name: designation
      }))
    ]
  }

  const departments = getDepartments()
  const teachingDesignations = getTeachingDesignations()
  const nonTeachingDesignations = getNonTeachingDesignations()

  const staffTypes = [
    { id: 'Teaching Staff', name: 'Teaching Staff', icon: GraduationCap },
    { id: 'Non-Teaching Staff', name: 'Non-Teaching Staff', icon: Users }
  ]

  // Fetch faculty data from API
  useEffect(() => {
    const fetchFaculty = async () => {
      try {
        setLoading(true)
        setError('')
        console.log('Fetching faculty data...')
        const response = await facultyAPI.getAll()
        console.log('Faculty API response:', response)
        if (response.data.success) {
          const facultyData = response.data.data.faculty || []
          console.log('Faculty data:', facultyData)
          setFacultyMembers(facultyData)
          
          // Reset filters when new data is loaded
          setSelectedDepartment('all')
          setSelectedDesignation('all')
          setSearchTerm('')
        } else {
          console.error('API returned unsuccessful response:', response.data)
          setError('Failed to load faculty data')
        }
      } catch (error) {
        console.error('Error fetching faculty:', error)
        setError('Failed to load faculty: ' + error.message)
      } finally {
        setLoading(false)
      }
    }
    
    fetchFaculty()
  }, [])

  // Reset designation filter when staff type changes
  useEffect(() => {
    setSelectedDesignation('all')
  }, [selectedStaffType])

  // Filter faculty based on search and filters
  const filteredFaculty = facultyMembers.filter((faculty) => {
    const matchesSearch = faculty.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faculty.specialization?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faculty.department?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faculty.qualification?.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesDepartment = selectedDepartment === 'all' || 
                             faculty.department === selectedDepartment
    
    const matchesDesignation = selectedDesignation === 'all' || 
                              faculty.designation === selectedDesignation

    const matchesStaffType = faculty.staffType === selectedStaffType

    return matchesSearch && matchesDepartment && matchesDesignation && matchesStaffType
  })

  // Get staff statistics
  const getStaffStats = () => {
    const teachingStaff = facultyMembers.filter(f => f.staffType === 'Teaching Staff')
    const nonTeachingStaff = facultyMembers.filter(f => f.staffType === 'Non-Teaching Staff')
    
    return {
      teaching: teachingStaff.length,
      nonTeaching: nonTeachingStaff.length,
      total: facultyMembers.length,
      publications: teachingStaff.reduce((total, faculty) => total + (faculty.publications?.length || 0), 0),
      avgExperience: Math.round(facultyMembers.reduce((total, faculty) => total + (faculty.experience || 0), 0) / facultyMembers.length) || 0
    }
  }

  const stats = getStaffStats()

  const getImageUrl = (filename) => {
    if (!filename) return '/images/default-avatar.jpg'
    return uploadAPI.getImageUrl(filename, 'faculty')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Faculty</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-navy-700 to-primary-600 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Faculty</h1>
            <p className="text-xl text-primary-100 mb-8">
              Meet our distinguished faculty members who are leading experts in fisheries science, 
              aquaculture, and marine biology. Our team combines academic excellence with practical 
              industry experience.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-600 rounded-lg mb-3">
                  <Users className="h-6 w-6" />
                </div>
                <div className="text-2xl font-bold">{stats.total}</div>
                <div className="text-primary-100">Total Faculty & Staff</div>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-600 rounded-lg mb-3">
                  <GraduationCap className="h-6 w-6" />
                </div>
                <div className="text-2xl font-bold">{stats.teaching}</div>
                <div className="text-primary-100">Teaching Faculty</div>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-600 rounded-lg mb-3">
                  <Award className="h-6 w-6" />
                </div>
                <div className="text-2xl font-bold">{stats.publications}</div>
                <div className="text-primary-100">Publications</div>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-600 rounded-lg mb-3">
                  <Clock className="h-6 w-6" />
                </div>
                <div className="text-2xl font-bold">{stats.avgExperience}</div>
                <div className="text-primary-100">Avg. Experience (Years)</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Staff Type Tabs */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex space-x-8">
            {staffTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => {
                  setSelectedStaffType(type.id)
                  setSelectedDesignation('all')
                }}
                className={`flex items-center space-x-2 py-4 border-b-2 font-medium transition-colors ${
                  selectedStaffType === type.id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <type.icon className="h-5 w-5" />
                <span>{type.name}</span>
                <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-sm">
                  {facultyMembers.filter(f => f.staffType === type.id).length}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="flex items-center space-x-2 text-gray-600 flex-shrink-0">
              <Filter className="h-5 w-5" />
              <span className="font-medium">Filter Faculty:</span>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search faculty by name, specialization..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Department Filter */}
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {departments.map((dept) => (
                  <option key={dept.id} value={dept.id}>
                    {dept.name}
                  </option>
                ))}
              </select>

              {/* Designation Filter */}
              <select
                value={selectedDesignation}
                onChange={(e) => setSelectedDesignation(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {(selectedStaffType === 'Teaching Staff' ? teachingDesignations : nonTeachingDesignations).map((designation) => (
                  <option key={designation.id} value={designation.id}>
                    {designation.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Faculty Grid */}
      <div className="container mx-auto px-4 py-12">
        {filteredFaculty.length === 0 ? (
          <div className="text-center py-12">
            <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No faculty found</h3>
            <p className="text-gray-500">
              {facultyMembers.length === 0 
                ? 'No faculty members have been added yet.' 
                : 'Try adjusting your search criteria or filters.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredFaculty.map((faculty) => (
              <Card key={faculty._id} className="group hover:shadow-xl transition-all duration-300">
                <div className="p-6">
                  {/* Faculty Image */}
                  <div className="text-center mb-6">
                    <img
                      src={getImageUrl(faculty.image)}
                      alt={faculty.name}
                      className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-primary-100 group-hover:border-primary-200 transition-colors"
                      onError={(e) => {
                        if (!e.target.dataset.fallbackUsed) {
                          e.target.dataset.fallbackUsed = 'true'
                          e.target.src = uploadAPI.getImageUrl('default-avatar.jpg', 'images')
                        }
                      }}
                    />
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{faculty.name}</h3>
                    <p className="text-primary-600 font-medium">{faculty.designation}</p>
                    <p className="text-gray-600 text-sm">{faculty.department}</p>
                  </div>

                  {/* Faculty Details */}
                  <div className="space-y-3">
                    {faculty.qualification && (
                      <div className="flex items-start space-x-2">
                        <GraduationCap className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{faculty.qualification}</span>
                      </div>
                    )}

                    {faculty.specialization && (
                      <div className="flex items-start space-x-2">
                        <Award className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{faculty.specialization}</span>
                      </div>
                    )}

                    {faculty.experience && (
                      <div className="flex items-start space-x-2">
                        <Clock className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{faculty.experience} years experience</span>
                      </div>
                    )}

                    {faculty.email && (
                      <div className="flex items-start space-x-2">
                        <Mail className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                        <a
                          href={`mailto:${faculty.email}`}
                          className="text-sm text-primary-600 hover:text-primary-800 break-all"
                        >
                          {faculty.email}
                        </a>
                      </div>
                    )}

                    {faculty.phone && (
                      <div className="flex items-start space-x-2">
                        <Phone className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                        <a
                          href={`tel:${faculty.phone}`}
                          className="text-sm text-primary-600 hover:text-primary-800"
                        >
                          {faculty.phone}
                        </a>
                      </div>
                    )}
                  </div>

                  {/* Research Areas */}
                  {faculty.researchInterests && faculty.researchInterests.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Research Areas</h4>
                      <div className="flex flex-wrap gap-1">
                        {faculty.researchInterests.slice(0, 3).map((area, index) => (
                          <span
                            key={index}
                            className="inline-block px-2 py-1 bg-primary-100 text-primary-800 text-xs rounded-full"
                          >
                            {area}
                          </span>
                        ))}
                        {faculty.researchInterests.length > 3 && (
                          <span className="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                            +{faculty.researchInterests.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Stats */}
                  {(faculty.publications?.length > 0 || faculty.awards?.length > 0) && (
                    <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between text-center">
                      {faculty.publications?.length > 0 && (
                        <div>
                          <div className="text-lg font-bold text-primary-600">{faculty.publications.length}</div>
                          <div className="text-xs text-gray-600">Publications</div>
                        </div>
                      )}
                      {faculty.awards?.length > 0 && (
                        <div>
                          <div className="text-lg font-bold text-green-600">{faculty.awards.length}</div>
                          <div className="text-xs text-gray-600">Awards</div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* View Profile Link */}
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <Link
                      to={`/faculty/${faculty._id}`}
                      className="inline-flex items-center text-primary-600 hover:text-primary-800 text-sm font-medium"
                    >
                      View Full Profile
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* CTA Section */}
      <div className="bg-primary-50 py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Join Our Team</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Are you passionate about fisheries education and research? We welcome both teaching faculty 
            and supporting staff to join our growing institution.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => {
                setSelectedPositionType('faculty')
                setIsJobModalOpen(true)
              }}
              className="bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors inline-flex items-center justify-center"
            >
              Faculty Positions
              <ChevronRight className="h-5 w-5 ml-2" />
            </button>
            <button
              onClick={() => {
                setSelectedPositionType('staff')
                setIsJobModalOpen(true)
              }}
              className="bg-accent-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-accent-600 transition-colors inline-flex items-center justify-center"
            >
              Staff Positions
              <ChevronRight className="h-5 w-5 ml-2" />
            </button>
          </div>
        </div>
      </div>

      {/* Job Application Modal */}
      <JobApplicationModal
        isOpen={isJobModalOpen}
        onClose={() => setIsJobModalOpen(false)}
        positionType={selectedPositionType}
      />
    </div>
  )
}

export default Faculty







