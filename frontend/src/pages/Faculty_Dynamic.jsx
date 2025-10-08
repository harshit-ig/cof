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
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 relative overflow-hidden">
      {/* Floating background elements */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-teal-400/20 to-cyan-500/20 rounded-full animate-float"></div>
      <div className="absolute top-40 right-32 w-24 h-24 bg-gradient-to-r from-cyan-400/15 to-blue-500/15 rounded-full animate-float" style={{animationDelay: '1s'}}></div>
      <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-gradient-to-r from-blue-400/20 to-teal-500/20 rounded-full animate-float" style={{animationDelay: '2s'}}></div>
      <div className="absolute bottom-20 right-20 w-16 h-16 bg-gradient-to-r from-teal-400/15 to-cyan-500/15 rounded-full animate-float" style={{animationDelay: '0.5s'}}></div>

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-teal-600 via-cyan-600 to-blue-600 text-white relative overflow-hidden">
        {/* Hero floating elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-float"></div>
        <div className="absolute top-20 right-20 w-16 h-16 bg-white/10 rounded-full animate-float" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-10 left-1/3 w-24 h-24 bg-white/10 rounded-full animate-float" style={{animationDelay: '2s'}}></div>
        
        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Faculty</h1>
            <p className="text-xl text-teal-100 mb-8">
              Meet our distinguished faculty members who are leading experts in fisheries science, 
              aquaculture, and marine biology. Our team combines academic excellence with practical 
              industry experience.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
              <div className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:scale-105 transition-transform duration-300">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-white/20 rounded-2xl mb-4 shadow-lg">
                  <Users className="h-7 w-7" />
                </div>
                <div className="text-3xl font-bold">{stats.total}</div>
                <div className="text-teal-200 text-sm">Total Faculty & Staff</div>
              </div>
              <div className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:scale-105 transition-transform duration-300">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-white/20 rounded-2xl mb-4 shadow-lg">
                  <GraduationCap className="h-7 w-7" />
                </div>
                <div className="text-3xl font-bold">{stats.teaching}</div>
                <div className="text-cyan-200 text-sm">Teaching Faculty</div>
              </div>
              <div className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:scale-105 transition-transform duration-300">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-white/20 rounded-2xl mb-4 shadow-lg">
                  <Award className="h-7 w-7" />
                </div>
                <div className="text-3xl font-bold">{stats.publications}</div>
                <div className="text-blue-200 text-sm">Publications</div>
              </div>
              <div className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:scale-105 transition-transform duration-300">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-white/20 rounded-2xl mb-4 shadow-lg">
                  <Clock className="h-7 w-7" />
                </div>
                <div className="text-3xl font-bold">{stats.avgExperience}</div>
                <div className="text-teal-200 text-sm">Avg. Experience (Years)</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Staff Type Tabs */}
      <div className="bg-white/90 backdrop-blur-sm border-b border-teal-200/50 relative z-10">
        <div className="container mx-auto px-4">
          <div className="flex space-x-8">
            {staffTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => {
                  setSelectedStaffType(type.id)
                  setSelectedDesignation('all')
                }}
                className={`flex items-center space-x-3 py-6 border-b-3 font-semibold transition-all duration-300 ${
                  selectedStaffType === type.id
                    ? 'border-teal-500 text-teal-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <type.icon className="h-5 w-5" />
                <span>{type.name}</span>
                <span className={`px-3 py-1 rounded-2xl text-sm font-bold ${
                  selectedStaffType === type.id 
                    ? 'bg-gradient-to-r from-teal-100 to-cyan-100 text-teal-700' 
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {facultyMembers.filter(f => f.staffType === type.id).length}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="bg-white/95 backdrop-blur-sm shadow-lg border-b border-cyan-200/50 relative z-10">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-6 items-center">
            <div className="flex items-center space-x-3 text-gray-600 flex-shrink-0">
              <div className="w-10 h-10 bg-gradient-to-br from-teal-100 to-cyan-200 rounded-xl flex items-center justify-center shadow-md">
                <Filter className="h-5 w-5 text-teal-600" />
              </div>
              <span className="font-semibold text-lg">Filter Faculty:</span>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 flex-1">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 bg-gradient-to-br from-teal-100 to-cyan-200 rounded-lg flex items-center justify-center">
                  <Search className="h-3 w-3 text-teal-600" />
                </div>
                <input
                  type="text"
                  placeholder="Search faculty by name, specialization..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 pr-4 py-3 border-2 border-gray-200 rounded-2xl w-full focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-300 bg-white/80 backdrop-blur-sm"
                />
              </div>

              {/* Department Filter */}
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="px-4 py-3 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-300 bg-white/80 backdrop-blur-sm font-medium"
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
                className="px-4 py-3 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-300 bg-white/80 backdrop-blur-sm font-medium"
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
      <div className="container mx-auto px-4 py-12 relative z-10">
        {filteredFaculty.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gradient-to-br from-teal-100 to-cyan-200 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Users className="h-12 w-12 text-teal-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">No faculty found</h3>
            <p className="text-gray-600 text-lg">
              {facultyMembers.length === 0 
                ? 'No faculty members have been added yet.' 
                : 'Try adjusting your search criteria or filters.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredFaculty.map((faculty) => (
              <div key={faculty._id} className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 group border border-teal-100/50 hover:scale-105 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-teal-400/20 to-cyan-500/20 rounded-full transform -translate-x-10 -translate-y-10 group-hover:scale-110 transition-transform duration-300"></div>
                <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-cyan-400/15 to-blue-500/15 rounded-full transform translate-x-12 translate-y-12 group-hover:scale-110 transition-transform duration-300"></div>
                
                <div className="p-8 relative z-10">
                  {/* Faculty Image */}
                  <div className="text-center mb-6">
                    <div className="relative inline-block">
                      <img
                        src={getImageUrl(faculty.image)}
                        alt={faculty.name}
                        className="w-28 h-28 rounded-3xl mx-auto mb-4 object-cover border-4 border-teal-200 group-hover:border-teal-300 transition-all duration-300 shadow-lg"
                        onError={(e) => {
                          if (!e.target.dataset.fallbackUsed) {
                            e.target.dataset.fallbackUsed = 'true'
                            e.target.src = uploadAPI.getImageUrl('default-avatar.jpg', 'images')
                          }
                        }}
                      />
                      <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
                        <GraduationCap className="w-4 h-4 text-white" />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-teal-600 transition-colors duration-300">{faculty.name}</h3>
                    <p className="text-teal-600 font-semibold text-lg">{faculty.designation}</p>
                    <p className="text-gray-600 font-medium">{faculty.department}</p>
                  </div>

                  {/* Faculty Details */}
                  <div className="space-y-4">
                    {faculty.qualification && (
                      <div className="flex items-start space-x-3 bg-gradient-to-r from-teal-50 to-cyan-50 p-3 rounded-xl border border-teal-200/50">
                        <div className="w-6 h-6 bg-gradient-to-br from-teal-100 to-cyan-200 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                          <GraduationCap className="h-3 w-3 text-teal-600" />
                        </div>
                        <span className="text-sm text-gray-700 font-medium">{faculty.qualification}</span>
                      </div>
                    )}

                    {faculty.specialization && (
                      <div className="flex items-start space-x-3 bg-gradient-to-r from-cyan-50 to-blue-50 p-3 rounded-xl border border-cyan-200/50">
                        <div className="w-6 h-6 bg-gradient-to-br from-cyan-100 to-blue-200 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Award className="h-3 w-3 text-cyan-600" />
                        </div>
                        <span className="text-sm text-gray-700 font-medium">{faculty.specialization}</span>
                      </div>
                    )}

                    {faculty.experience && (
                      <div className="flex items-start space-x-3 bg-gradient-to-r from-blue-50 to-teal-50 p-3 rounded-xl border border-blue-200/50">
                        <div className="w-6 h-6 bg-gradient-to-br from-blue-100 to-teal-200 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Clock className="h-3 w-3 text-blue-600" />
                        </div>
                        <span className="text-sm text-gray-700 font-medium">{faculty.experience} years experience</span>
                      </div>
                    )}

                    {faculty.email && (
                      <div className="flex items-start space-x-3 bg-gradient-to-r from-green-50 to-teal-50 p-3 rounded-xl border border-green-200/50">
                        <div className="w-6 h-6 bg-gradient-to-br from-green-100 to-teal-200 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Mail className="h-3 w-3 text-green-600" />
                        </div>
                        <a
                          href={`mailto:${faculty.email}`}
                          className="text-sm text-green-600 hover:text-green-800 break-all font-medium"
                        >
                          {faculty.email}
                        </a>
                      </div>
                    )}

                    {faculty.phone && (
                      <div className="flex items-start space-x-3 bg-gradient-to-r from-purple-50 to-pink-50 p-3 rounded-xl border border-purple-200/50">
                        <div className="w-6 h-6 bg-gradient-to-br from-purple-100 to-pink-200 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Phone className="h-3 w-3 text-purple-600" />
                        </div>
                        <a
                          href={`tel:${faculty.phone}`}
                          className="text-sm text-purple-600 hover:text-purple-800 font-medium"
                        >
                          {faculty.phone}
                        </a>
                      </div>
                    )}
                  </div>

                  {/* Research Areas */}
                  {faculty.researchInterests && faculty.researchInterests.length > 0 && (
                    <div className="mt-6 pt-6 border-t border-gray-200/50">
                      <h4 className="text-sm font-bold text-gray-900 mb-3">Research Areas</h4>
                      <div className="flex flex-wrap gap-2">
                        {faculty.researchInterests.slice(0, 3).map((area, index) => (
                          <span
                            key={index}
                            className="inline-block px-3 py-1 bg-gradient-to-r from-teal-100 to-cyan-100 text-teal-800 text-xs rounded-2xl font-semibold border border-teal-200/50"
                          >
                            {area}
                          </span>
                        ))}
                        {faculty.researchInterests.length > 3 && (
                          <span className="inline-block px-3 py-1 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-600 text-xs rounded-2xl font-semibold border border-gray-200/50">
                            +{faculty.researchInterests.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Stats */}
                  {(faculty.publications?.length > 0 || faculty.awards?.length > 0) && (
                    <div className="mt-6 pt-6 border-t border-gray-200/50 flex justify-center space-x-8">
                      {faculty.publications?.length > 0 && (
                        <div className="text-center bg-gradient-to-r from-blue-50 to-teal-50 px-4 py-3 rounded-2xl border border-blue-200/50">
                          <div className="text-2xl font-bold text-blue-600">{faculty.publications.length}</div>
                          <div className="text-xs text-gray-600 font-semibold">Publications</div>
                        </div>
                      )}
                      {faculty.awards?.length > 0 && (
                        <div className="text-center bg-gradient-to-r from-green-50 to-teal-50 px-4 py-3 rounded-2xl border border-green-200/50">
                          <div className="text-2xl font-bold text-green-600">{faculty.awards.length}</div>
                          <div className="text-xs text-gray-600 font-semibold">Awards</div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 py-16 relative overflow-hidden">
        {/* Section floating elements */}
        <div className="absolute top-10 left-10 w-16 h-16 bg-gradient-to-r from-teal-400/20 to-cyan-500/20 rounded-full animate-float"></div>
        <div className="absolute bottom-10 right-10 w-20 h-20 bg-gradient-to-r from-cyan-400/15 to-blue-500/15 rounded-full animate-float" style={{animationDelay: '1s'}}></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-teal-600 to-cyan-700 bg-clip-text text-transparent mb-6">
            Join Our Team
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Are you passionate about fisheries education and research? We welcome both teaching faculty 
            and supporting staff to join our growing institution.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button
              onClick={() => {
                setSelectedPositionType('faculty')
                setIsJobModalOpen(true)
              }}
              className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white px-10 py-4 rounded-2xl font-bold hover:from-teal-600 hover:to-cyan-700 transition-all duration-300 inline-flex items-center justify-center shadow-lg hover:shadow-2xl transform hover:scale-105"
            >
              Faculty Positions
              <ChevronRight className="h-5 w-5 ml-2" />
            </button>
            <button
              onClick={() => {
                setSelectedPositionType('staff')
                setIsJobModalOpen(true)
              }}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-10 py-4 rounded-2xl font-bold hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 inline-flex items-center justify-center shadow-lg hover:shadow-2xl transform hover:scale-105"
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







