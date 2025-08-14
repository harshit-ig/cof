import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Search, Filter, Mail, Phone, ExternalLink, Award } from 'lucide-react'
import Card from '../components/common/Card'
import LoadingSpinner, { LoadingCard } from '../components/common/LoadingSpinner'
import { facultyAPI, uploadAPI } from '../services/api'
import toast from 'react-hot-toast'

const Faculty = () => {
  const [faculty, setFaculty] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDepartment, setSelectedDepartment] = useState('')
  const [pagination, setPagination] = useState({})
  // Static snapshot (from data.txt) used when API has no data
  const ndvsuFaculty = [
    {
      _id: 'static-1',
      name: 'Dr. Shashikant Mahajan',
      designation: 'I/c Dean & Professor',
      qualification: 'Ph.D.',
      department: 'Fisheries',
      image: `/api/proxy/image?url=${encodeURIComponent('https://www.ndvsu.org/images/Shashikant.jpg')}`,
    },
    {
      _id: 'static-2',
      name: 'Dr. Madhuri Sharma',
      designation: 'Associate Professor',
      qualification: 'Ph.D.',
      department: 'Fisheries',
      image: `/api/proxy/image?url=${encodeURIComponent('https://www.ndvsu.org/images/MadhuriSharma.jpg')}`,
    },
    {
      _id: 'static-3',
      name: 'Dr. Sona Dubey',
      designation: 'Assistant Professor',
      qualification: 'Ph.D.',
      department: 'Fisheries',
      image: `/api/proxy/image?url=${encodeURIComponent('https://www.ndvsu.org/images/photo-college-jabalpur/FisheryCollege/Dr.-Sona-Dubey.jpg')}`,
    },
    {
      _id: 'static-4',
      name: 'Dr. Priti Mishra',
      designation: 'Assistant Professor',
      qualification: 'Ph.D.',
      department: 'Fisheries',
      image: `/api/proxy/image?url=${encodeURIComponent('https://www.ndvsu.org/images/PreetiMishra.jpg')}`,
    },
  ]

  useEffect(() => {
    fetchFaculty()
  }, [searchTerm, selectedDepartment])

  const fetchFaculty = async () => {
    try {
      setLoading(true)
      
      const params = {
        page: 1,
        limit: 12
      }
      
      if (searchTerm) params.search = searchTerm
      if (selectedDepartment) params.department = selectedDepartment
      
      const response = await facultyAPI.getAll(params)
      
      if (response.data.success) {
        const list = response.data.data.faculty || []
        if (list.length === 0) {
          setFaculty(ndvsuFaculty)
          setPagination({ total: ndvsuFaculty.length })
        } else {
          setFaculty(list)
          setPagination(response.data.data.pagination || {})
        }
      } else {
        setFaculty(ndvsuFaculty)
        setPagination({ total: ndvsuFaculty.length })
      }
    } catch (error) {
      console.error('Error fetching faculty:', error)
      setFaculty(ndvsuFaculty)
      setPagination({ total: ndvsuFaculty.length })
    } finally {
      setLoading(false)
    }
  }

  const departments = [...new Set(faculty.map(f => f.department))]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-secondary-600 text-white section-padding">
        <div className="container-max text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Faculty Directory</h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto">
            Meet our distinguished faculty members who are dedicated to excellence in fisheries education and research.
          </p>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="section-padding">
        <div className="container-max">
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search faculty..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Department Filter */}
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <select
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 appearance-none bg-white"
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                >
                  <option value="">All Departments</option>
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </div>

              {/* Clear Filters */}
              <button
                onClick={() => {
                  setSearchTerm('')
                  setSelectedDepartment('')
                }}
                className="btn-ghost"
              >
                Clear Filters
              </button>
            </div>
          </div>

          {/* Faculty Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <LoadingCard key={i} />
              ))}
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-6">
                <p className="text-gray-600">
                  Showing {faculty.length} of {pagination.total || 0} faculty members
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {faculty.map((member) => (
                  <Card key={member._id} padding="p-0" className="h-full flex flex-col">
                    <div className="aspect-[4/3]">
                      <img
                        src={uploadAPI.getImageUrl(member.image, 'faculty') || 'https://via.placeholder.com/300x300?text=Faculty'}
                        alt={member.name}
                        className="w-full h-64 object-cover"
                      />
                    </div>
                    
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          {member.name}
                        </h3>
                        
                        <p className="text-primary-600 font-medium mb-1">
                          {member.designation}
                        </p>
                        
                        <p className="text-gray-600 text-sm mb-3">
                          {member.department}
                        </p>
                        
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center text-sm text-gray-600">
                            <Award className="h-4 w-4 mr-2" />
                            <span>{member.qualification}</span>
                          </div>
                          
                          {member.specialization && (
                            <p className="text-sm text-gray-600">
                              <strong>Specialization:</strong> {member.specialization}
                            </p>
                          )}
                          
                          {member.experience && (
                            <p className="text-sm text-gray-600">
                              <strong>Experience:</strong> {member.experience} years
                            </p>
                          )}
                        </div>

                        {member.bio && (
                          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                            {member.bio}
                          </p>
                        )}

                        {/* Research Interests */}
                        {member.researchInterests && member.researchInterests.length > 0 && (
                          <div className="mb-4">
                            <p className="text-sm font-medium text-gray-900 mb-2">Research Interests:</p>
                            <div className="flex flex-wrap gap-1">
                              {member.researchInterests.slice(0, 3).map((interest, index) => (
                                <span
                                  key={index}
                                  className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-secondary-100 text-secondary-800"
                                >
                                  {interest}
                                </span>
                              ))}
                              {member.researchInterests.length > 3 && (
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-600">
                                  +{member.researchInterests.length - 3} more
                                </span>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Contact Info */}
                        <div className="space-y-2 mb-4">
                          {member.email && (
                            <div className="flex items-center text-sm text-gray-600">
                              <Mail className="h-4 w-4 mr-2" />
                              <a
                                href={`mailto:${member.email}`}
                                className="hover:text-primary-600 transition-colors"
                              >
                                {member.email}
                              </a>
                            </div>
                          )}
                          
                          {member.phone && (
                            <div className="flex items-center text-sm text-gray-600">
                              <Phone className="h-4 w-4 mr-2" />
                              <span>{member.phone}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <Link
                        to={`/faculty/${member._id}`}
                        className="btn-primary text-center flex items-center justify-center"
                      >
                        View Profile
                        <ExternalLink className="w-4 h-4 ml-2" />
                      </Link>
                    </div>
                  </Card>
                ))}
              </div>

              {!loading && faculty.length === 0 && (
                <div className="text-center py-12">
                  <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                    <Award className="h-12 w-12 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-medium text-gray-900 mb-2">No faculty found</h3>
                  <p className="text-gray-600 mb-4">
                    Try adjusting your search criteria or filters.
                  </p>
                  <button
                    onClick={() => {
                      setSearchTerm('')
                      setSelectedDepartment('')
                    }}
                    className="btn-primary"
                  >
                    Clear All Filters
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  )
}

export default Faculty