import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Users, Award, BookOpen, Mail, Phone, MapPin, Globe, ChevronRight, Filter, Search, Building, Microscope, Fish, FlaskConical, Calculator, Leaf, Globe2, Shield, GraduationCap, Clock } from 'lucide-react'
import Card from '../components/common/Card'
import { facultyAPI, uploadAPI } from '../services/api'
import LoadingSpinner from '../components/common/LoadingSpinner'

const Faculty = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDepartment, setSelectedDepartment] = useState('all')
  const [selectedDesignation, setSelectedDesignation] = useState('all')
  const [facultyMembers, setFacultyMembers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const departments = [
    { id: 'all', name: 'All Departments', icon: Building },
    { id: 'aquaculture', name: 'Aquaculture', icon: Fish },
    { id: 'fish-health', name: 'Fish Health Management', icon: Microscope },
    { id: 'processing', name: 'Fish Processing Technology', icon: Building },
    { id: 'extension', name: 'Fisheries Extension', icon: Globe },
    { id: 'biotechnology', name: 'Fish Biotechnology', icon: FlaskConical },
    { id: 'economics', name: 'Fisheries Economics', icon: Calculator },
    { id: 'environment', name: 'Aquatic Environment', icon: Leaf }
  ]

  const designations = [
    { id: 'all', name: 'All Designations' },
    { id: 'dean', name: 'Dean' },
    { id: 'professor', name: 'Professor' },
    { id: 'associate-professor', name: 'Associate Professor' },
    { id: 'assistant-professor', name: 'Assistant Professor' },
    { id: 'lecturer', name: 'Lecturer' }
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

  // Filter faculty based on search and filters
  const filteredFaculty = facultyMembers.filter((faculty) => {
    const matchesSearch = faculty.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faculty.specialization?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faculty.department?.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesDepartment = selectedDepartment === 'all' || 
                             faculty.department?.toLowerCase().includes(selectedDepartment.toLowerCase())
    
    const matchesDesignation = selectedDesignation === 'all' || 
                              faculty.designation?.toLowerCase().includes(selectedDesignation.toLowerCase())

    return matchesSearch && matchesDepartment && matchesDesignation
  })

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
      <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Faculty</h1>
            <p className="text-xl text-blue-100 mb-8">
              Meet our distinguished faculty members who are leading experts in fisheries science, 
              aquaculture, and marine biology. Our team combines academic excellence with practical 
              industry experience.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-600 rounded-lg mb-3">
                  <Users className="h-6 w-6" />
                </div>
                <div className="text-2xl font-bold">{facultyMembers.length}+</div>
                <div className="text-blue-200">Faculty Members</div>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-600 rounded-lg mb-3">
                  <Award className="h-6 w-6" />
                </div>
                <div className="text-2xl font-bold">50+</div>
                <div className="text-blue-200">Research Publications</div>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-600 rounded-lg mb-3">
                  <BookOpen className="h-6 w-6" />
                </div>
                <div className="text-2xl font-bold">15+</div>
                <div className="text-blue-200">Years Experience</div>
              </div>
            </div>
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
                {designations.map((designation) => (
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
                      className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-blue-100 group-hover:border-blue-200 transition-colors"
                      onError={(e) => {
                        e.target.src = '/images/default-avatar.jpg'
                      }}
                    />
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{faculty.name}</h3>
                    <p className="text-blue-600 font-medium">{faculty.designation}</p>
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
                        <span className="text-sm text-gray-700">{faculty.experience}</span>
                      </div>
                    )}

                    {faculty.email && (
                      <div className="flex items-start space-x-2">
                        <Mail className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                        <a
                          href={`mailto:${faculty.email}`}
                          className="text-sm text-blue-600 hover:text-blue-800 break-all"
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
                          className="text-sm text-blue-600 hover:text-blue-800"
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
                            className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
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
                          <div className="text-lg font-bold text-blue-600">{faculty.publications.length}</div>
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
                      className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium"
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
      <div className="bg-blue-50 py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Join Our Faculty</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Are you passionate about fisheries science and education? We're always looking for 
            dedicated professionals to join our team.
          </p>
          <Link
            to="/contact"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-flex items-center"
          >
            Contact Us
            <ChevronRight className="h-5 w-5 ml-2" />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Faculty


