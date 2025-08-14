import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Search, Filter, Clock, Users, BookOpen, DollarSign } from 'lucide-react'
import Card from '../components/common/Card'
import LoadingSpinner, { LoadingCard } from '../components/common/LoadingSpinner'
import { programsAPI, uploadAPI } from '../services/api'
import toast from 'react-hot-toast'

const Programs = () => {
  const [programs, setPrograms] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedLevel, setSelectedLevel] = useState('')
  const [selectedDepartment, setSelectedDepartment] = useState('')
  const [pagination, setPagination] = useState({})

  useEffect(() => {
    fetchPrograms()
  }, [searchTerm, selectedLevel, selectedDepartment])

  const fetchPrograms = async () => {
    try {
      setLoading(true)
      
      const params = {
        page: 1,
        limit: 12
      }
      
      if (searchTerm) params.search = searchTerm
      if (selectedLevel) params.level = selectedLevel
      if (selectedDepartment) params.department = selectedDepartment
      
      const response = await programsAPI.getAll(params)
      
      if (response.data.success) {
        setPrograms(response.data.data.programs || [])
        setPagination(response.data.data.pagination || {})
      } else {
        toast.error('Failed to fetch programs')
      }
    } catch (error) {
      console.error('Error fetching programs:', error)
      toast.error('Failed to load programs. Please try again.')
      setPrograms([])
    } finally {
      setLoading(false)
    }
  }

  // Since we're filtering on the backend, we don't need client-side filtering
  const filteredPrograms = programs

  const departments = [...new Set(programs.map(p => p.department))]
  const levels = [
    { value: 'undergraduate', label: 'Undergraduate' },
    { value: 'postgraduate', label: 'Postgraduate' },
    { value: 'diploma', label: 'Diploma' },
    { value: 'certificate', label: 'Certificate' }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-secondary-600 text-white section-padding">
        <div className="container-max text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Academic Programs</h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto">
            Discover our comprehensive range of programs designed to prepare you for a successful career in fisheries science and aquaculture.
          </p>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="section-padding">
        <div className="container-max">
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search programs..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Level Filter */}
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <select
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 appearance-none bg-white"
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                >
                  <option value="">All Levels</option>
                  {levels.map((level) => (
                    <option key={level.value} value={level.value}>
                      {level.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Department Filter */}
              <div>
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 appearance-none bg-white"
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
                  setSelectedLevel('')
                  setSelectedDepartment('')
                }}
                className="btn-ghost"
              >
                Clear Filters
              </button>
            </div>
          </div>

          {/* Programs Grid */}
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
                  Showing {filteredPrograms.length} of {pagination.total || 0} programs
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPrograms.map((program) => (
                  <Card key={program._id} padding="p-0" className="h-full flex flex-col">
                    <div className="aspect-[16/9]">
                      <img
                        src={uploadAPI.getImageUrl(program.image) || 'https://via.placeholder.com/400x200?text=Program'}
                        alt={program.title}
                        className="w-full h-48 object-cover"
                      />
                    </div>
                    
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                            {program.level.charAt(0).toUpperCase() + program.level.slice(1)}
                          </span>
                        </div>
                        
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          {program.title}
                        </h3>
                        
                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                          {program.description}
                        </p>
                        
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center text-sm text-gray-600">
                            <Clock className="h-4 w-4 mr-2" />
                            <span>Duration: {program.duration}</span>
                          </div>
                          
                          <div className="flex items-center text-sm text-gray-600">
                            <Users className="h-4 w-4 mr-2" />
                            <span>Intake: {program.intake} students</span>
                          </div>
                          
                          <div className="flex items-center text-sm text-gray-600">
                            <BookOpen className="h-4 w-4 mr-2" />
                            <span>Eligibility: {program.eligibility}</span>
                          </div>
                          
                          <div className="flex items-center text-sm text-gray-600">
                            <DollarSign className="h-4 w-4 mr-2" />
                            <span>Fees: ₹{program.fees?.toLocaleString() || 'TBD'}/year</span>
                          </div>
                        </div>
                      </div>
                      
                      <Link
                        to={`/programs/${program._id}`}
                        className="btn-primary text-center"
                      >
                        View Details
                      </Link>
                    </div>
                  </Card>
                ))}
              </div>

              {!loading && filteredPrograms.length === 0 && (
                <div className="text-center py-12">
                  <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                    <BookOpen className="h-12 w-12 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-medium text-gray-900 mb-2">No programs found</h3>
                  <p className="text-gray-600 mb-4">
                    Try adjusting your search criteria or filters.
                  </p>
                  <button
                    onClick={() => {
                      setSearchTerm('')
                      setSelectedLevel('')
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

      {/* Call to Action */}
      <section className="section-padding bg-primary-600 text-white">
        <div className="container-max text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Apply?</h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Take the next step towards your career in fisheries science. 
            Check our admission guidelines and application process.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/students#admission" className="btn-accent">
              Admission Guidelines
            </Link>
            
            <Link to="/contact" className="btn-outline border-white text-white hover:bg-white hover:text-primary-600">
              Contact Admissions
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Programs