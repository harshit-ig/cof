import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { BookOpen, Clock, Users, Award, ChevronRight, Building, Microscope, Fish, FlaskConical, Calculator, Leaf, Globe, Shield, GraduationCap, Calendar, MapPin } from 'lucide-react'
import Card from '../components/common/Card'
import { programsAPI } from '../services/api'
import LoadingSpinner from '../components/common/LoadingSpinner'

const Programs = () => {
  const [selectedLevel, setSelectedLevel] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [programs, setPrograms] = useState({ undergraduate: [], postgraduate: [], diploma: [], certificate: [] })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const levels = [
    { id: 'all', name: 'All Programs' },
    { id: 'undergraduate', name: 'Undergraduate' },
    { id: 'postgraduate', name: 'Postgraduate' },
    { id: 'diploma', name: 'Diploma' },
    { id: 'certificate', name: 'Certificate' }
  ]

  // Fetch programs from API
  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        setLoading(true)
        const response = await programsAPI.getAll()
        if (response.data.success) {
          // Convert flat array to categorized object
          const allPrograms = response.data.data.programs || []
          const categorized = {
            undergraduate: allPrograms.filter(p => p.level === 'undergraduate'),
            postgraduate: allPrograms.filter(p => p.level === 'postgraduate'),
            diploma: allPrograms.filter(p => p.level === 'diploma'),
            certificate: allPrograms.filter(p => p.level === 'certificate')
          }
          setPrograms(categorized)
        }
      } catch (error) {
        console.error('Error fetching programs:', error)
        setError('Failed to load programs')
      } finally {
        setLoading(false)
      }
    }
    
    fetchPrograms()
  }, [])

  // Get all programs for filtering
  const allPrograms = [
    ...programs.undergraduate.map(p => ({ ...p, level: 'undergraduate' })),
    ...programs.postgraduate.map(p => ({ ...p, level: 'postgraduate' })),
    ...programs.diploma.map(p => ({ ...p, level: 'diploma' })),
    ...programs.certificate.map(p => ({ ...p, level: 'certificate' }))
  ]

  // Filter programs based on search and level
  const filteredPrograms = allPrograms.filter((program) => {
    const matchesSearch = program.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         program.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         program.specialization?.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesLevel = selectedLevel === 'all' || program.level === selectedLevel

    return matchesSearch && matchesLevel
  })

  const getLevelIcon = (level) => {
    switch (level) {
      case 'undergraduate':
        return BookOpen
      case 'postgraduate':
        return GraduationCap
      case 'doctoral':
        return Award
      case 'diploma':
        return FlaskConical
      case 'certificate':
        return Shield
      default:
        return BookOpen
    }
  }

  const getLevelColor = (level) => {
    switch (level) {
      case 'undergraduate':
        return 'bg-blue-100 text-blue-800'
      case 'postgraduate':
        return 'bg-green-100 text-green-800'
      case 'doctoral':
        return 'bg-purple-100 text-purple-800'
      case 'diploma':
        return 'bg-orange-100 text-orange-800'
      case 'certificate':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return <LoadingSpinner />
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Error Loading Programs</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="btn-primary"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Academic Programs</h1>
            <p className="text-xl text-blue-100 mb-8">
              Discover our comprehensive range of fisheries and aquaculture programs designed to 
              prepare you for a successful career in marine sciences, sustainable aquaculture, 
              and fisheries management.
            </p>
            <div className="flex justify-center">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mt-8 max-w-4xl">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-600 rounded-lg mb-3">
                    <BookOpen className="h-6 w-6" />
                  </div>
                  <div className="text-2xl font-bold">{programs.undergraduate.length}</div>
                  <div className="text-blue-200">Undergraduate Programs</div>
                </div>
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-600 rounded-lg mb-3">
                    <GraduationCap className="h-6 w-6" />
                  </div>
                  <div className="text-2xl font-bold">{programs.postgraduate.length}</div>
                  <div className="text-blue-200">Postgraduate Programs</div>
                </div>
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-600 rounded-lg mb-3">
                    <FlaskConical className="h-6 w-6" />
                  </div>
                  <div className="text-2xl font-bold">{programs.diploma.length}</div>
                  <div className="text-blue-200">Diploma Programs</div>
                </div>
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-600 rounded-lg mb-3">
                    <Shield className="h-6 w-6" />
                  </div>
                  <div className="text-2xl font-bold">{programs.certificate.length}</div>
                  <div className="text-blue-200">Certificate Programs</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Section */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="flex items-center space-x-2 text-gray-600 flex-shrink-0">
              <Building className="h-5 w-5" />
              <span className="font-medium">Filter Programs:</span>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <input
                  type="text"
                  placeholder="Search programs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Level Filter */}
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {levels.map((level) => (
                  <option key={level.id} value={level.id}>
                    {level.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Programs Grid */}
      <div className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
        {filteredPrograms.length === 0 ? (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No programs found</h3>
            <p className="text-gray-500">
              {allPrograms.length === 0 
                ? 'No programs have been added yet.' 
                : 'Try adjusting your search criteria or filters.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredPrograms.map((program) => {
              const LevelIcon = getLevelIcon(program.level)
              
              return (
                <Card key={program._id} className="group hover:shadow-xl transition-all duration-300">
                  <div className="p-6">
                    {/* Program Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <div className="flex-shrink-0">
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                              <LevelIcon className="h-5 w-5 text-blue-600" />
                            </div>
                          </div>
                          <div>
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getLevelColor(program.level)}`}>
                              {program.level?.charAt(0).toUpperCase() + program.level?.slice(1)}
                            </span>
                          </div>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {program.title}
                        </h3>
                        {program.specialization && (
                          <p className="text-blue-600 font-medium">{program.specialization}</p>
                        )}
                      </div>
                    </div>

                    {/* Program Description */}
                    <p className="text-gray-600 mb-6 line-clamp-3">
                      {program.description}
                    </p>

                    {/* Program Details */}
                    <div className="space-y-3 mb-6">
                      {program.duration && (
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-700">Duration: {program.duration}</span>
                        </div>
                      )}

                      {program.intake && (
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-700">Intake: {program.intake}</span>
                        </div>
                      )}

                      {program.eligibility && (
                        <div className="flex items-start space-x-2">
                          <Award className="h-4 w-4 text-gray-400 mt-0.5" />
                          <span className="text-sm text-gray-700">Eligibility: {program.eligibility}</span>
                        </div>
                      )}

                      {program.fees && (
                        <div className="flex items-center space-x-2">
                          <Building className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-700">Fees: {program.fees}</span>
                        </div>
                      )}
                    </div>

                    {/* Subjects/Curriculum */}
                    {program.subjects && program.subjects.length > 0 && (
                      <div className="mb-6">
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Key Subjects</h4>
                        <div className="flex flex-wrap gap-2">
                          {program.subjects.slice(0, 4).map((subject, index) => (
                            <span
                              key={index}
                              className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                            >
                              {subject}
                            </span>
                          ))}
                          {program.subjects.length > 4 && (
                            <span className="inline-block px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                              +{program.subjects.length - 4} more
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Career Opportunities */}
                    {program.careers && program.careers.length > 0 && (
                      <div className="mb-6">
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Career Opportunities</h4>
                        <div className="flex flex-wrap gap-2">
                          {program.careers.slice(0, 3).map((career, index) => (
                            <span
                              key={index}
                              className="inline-block px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full"
                            >
                              {career}
                            </span>
                          ))}
                          {program.careers.length > 3 && (
                            <span className="inline-block px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                              +{program.careers.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Program Stats */}
                    {(program.seats || program.applicants) && (
                      <div className="flex justify-between items-center pt-4 border-t border-gray-100 mb-4">
                        {program.seats && (
                          <div className="text-center">
                            <div className="text-lg font-bold text-blue-600">{program.seats}</div>
                            <div className="text-xs text-gray-600">Available Seats</div>
                          </div>
                        )}
                        {program.applicants && (
                          <div className="text-center">
                            <div className="text-lg font-bold text-green-600">{program.applicants}</div>
                            <div className="text-xs text-gray-600">Applicants</div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex space-x-3 pt-4 border-t border-gray-100">
                      <Link
                        to={`/programs/${program._id}`}
                        className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-center"
                      >
                        View Details
                      </Link>
                      <Link
                        to="/contact"
                        className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-50 transition-colors text-center"
                      >
                        Apply Now
                      </Link>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        )}
      </div>

      {/* Additional Information */}
      <div className="bg-blue-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Why Choose Our Programs?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Award className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Industry Recognition</h3>
                <p className="text-gray-600">Our programs are recognized by leading industry bodies and professional organizations.</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Expert Faculty</h3>
                <p className="text-gray-600">Learn from industry experts and renowned researchers in fisheries science.</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Building className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Modern Facilities</h3>
                <p className="text-gray-600">Access state-of-the-art laboratories, research facilities, and aquaculture farms.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of successful graduates who have launched their careers through our comprehensive programs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-flex items-center justify-center"
            >
              Apply Now
              <ChevronRight className="h-5 w-5 ml-2" />
            </Link>
            <Link
              to="/contact"
              className="border border-gray-300 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors inline-flex items-center justify-center"
            >
              Download Brochure
            </Link>
          </div>
        </div>
        </div>
      </div>
    </div>
  )
}

export default Programs







