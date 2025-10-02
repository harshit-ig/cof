import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { BookOpen, Calendar, Building, FileText, Users, Award, GraduationCap, Clock, ChevronRight } from 'lucide-react'
import Card from '../components/common/Card'
import LoadingSpinner from '../components/common/LoadingSpinner'
import { programsAPI, academicsAPI } from '../services/api'

const Academics = () => {
  const location = useLocation()
  const hash = location.hash.substring(1)
  const [programs, setPrograms] = useState([])
  const [academicsContent, setAcademicsContent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch programs and academics content from API
  useEffect(() => {
    fetchPrograms()
    loadAcademicsContent()
    
    // Listen for updates from admin panel
    const handleAcademicsUpdate = (event) => {
      setAcademicsContent(event.detail)
    }
    
    window.addEventListener('academicsDataUpdated', handleAcademicsUpdate)
    
    return () => {
      window.removeEventListener('academicsDataUpdated', handleAcademicsUpdate)
    }
  }, [])

  const fetchPrograms = async () => {
    try {
      setLoading(true)
      const response = await programsAPI.getAll()
      if (response.data.success) {
        setPrograms(response.data.data.programs || [])
      }
    } catch (error) {
      console.error('Error fetching programs:', error)
      setError('Failed to load programs')
    } finally {
      setLoading(false)
    }
  }

  const loadAcademicsContent = async () => {
    try {
      const response = await academicsAPI.getPage()
      if (response.data.success) {
        setAcademicsContent(response.data.data)
      } else {
        console.error('Failed to load academics content')
      }
    } catch (error) {
      console.error('Error loading academics content:', error)
    }
  }

  // Group programs by level
  const programsByLevel = programs.reduce((acc, program) => {
    const level = program.level || 'other'
    if (!acc[level]) {
      acc[level] = []
    }
    acc[level].push(program)
    return acc
  }, {})

  const getLevelIcon = (level) => {
    switch (level) {
      case 'undergraduate':
        return BookOpen
      case 'postgraduate':
        return GraduationCap
      case 'diploma':
        return FileText
      case 'certificate':
        return Award
      default:
        return BookOpen
    }
  }

  const getLevelColor = (level) => {
    switch (level) {
      case 'undergraduate':
        return 'bg-blue-100 text-blue-600'
      case 'postgraduate':
        return 'bg-green-100 text-green-600'
      case 'diploma':
        return 'bg-orange-100 text-orange-600'
      case 'certificate':
        return 'bg-purple-100 text-purple-600'
      default:
        return 'bg-gray-100 text-gray-600'
    }
  }

  const getIconComponent = (iconName) => {
    switch (iconName) {
      case 'building':
        return Building
      case 'fish':
        return BookOpen
      case 'gear':
        return FileText
      case 'leaf':
        return GraduationCap
      case 'shield':
        return Award
      default:
        return Building
    }
  }

  const getIconColor = (index) => {
    const colors = ['text-blue-500', 'text-green-600', 'text-orange-600', 'text-purple-600']
    return colors[index % colors.length]
  }

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const headerOffset = 100
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  // Scroll to section when hash changes
  React.useEffect(() => {
    if (hash) {
      setTimeout(() => scrollToSection(hash), 100)
    }
  }, [hash])

  if (loading) {
    return <LoadingSpinner />
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Error Loading Content</h2>
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
            <section className="section-padding bg-blue-600 text-white">
        <div className="container-max">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Academics
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Quality Education in Fishery Science & Aquaculture
            </p>
          </div>
        </div>
      </section>


      {/* Programs Offered */}
      <section id="programs" className="section-padding bg-gray-50">
        <div className="container-max">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Programs Offered</h2>
            <div className="w-16 h-1 bg-blue-400 rounded mx-auto"></div>
            <p className="text-gray-600 mt-4">Explore our comprehensive range of academic programs</p>
          </div>
          
          {programs.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Programs Available</h3>
              <p className="text-gray-500">Programs will be displayed here once they are added.</p>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Program Statistics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {Object.entries(programsByLevel).map(([level, levelPrograms]) => {
                  const Icon = getLevelIcon(level)
                  return (
                    <div key={level} className="text-center">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-2 ${getLevelColor(level)}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="text-2xl font-bold text-gray-900">{levelPrograms.length}</div>
                      <div className="text-sm text-gray-600 capitalize">
                        {level === 'postgraduate' ? 'PG Programs' : `${level} Programs`}
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Programs by Level */}
              {Object.entries(programsByLevel).map(([level, levelPrograms]) => (
                <div key={level} className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 capitalize flex items-center">
                    {getLevelIcon(level) && React.createElement(getLevelIcon(level), {
                      className: 'w-5 h-5 mr-2'
                    })}
                    {level === 'postgraduate' ? 'Postgraduate Programs' : `${level} Programs`}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {levelPrograms.map((program) => (
                      <Card key={program._id} className="p-6 hover:shadow-lg transition-shadow">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <h4 className="text-lg font-semibold text-gray-900 mb-1">{program.title}</h4>
                            {program.shortName && (
                              <p className="text-blue-600 text-sm font-medium">{program.shortName}</p>
                            )}
                          </div>
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getLevelColor(level)}`}>
                            {React.createElement(getLevelIcon(level), {
                              className: 'w-5 h-5'
                            })}
                          </div>
                        </div>
                        
                        <p className="text-gray-700 text-sm mb-4 line-clamp-3">
                          {program.description}
                        </p>
                        
                        <div className="space-y-2 mb-4">
                          {program.duration && (
                            <div className="flex items-center text-sm text-gray-600">
                              <Clock className="w-4 h-4 mr-2" />
                              <span>Duration: {program.duration}</span>
                            </div>
                          )}
                          {program.intake && (
                            <div className="flex items-center text-sm text-gray-600">
                              <Users className="w-4 h-4 mr-2" />
                              <span>Intake: {program.intake} students</span>
                            </div>
                          )}
                        </div>
                        
                        <div className="flex space-x-2">
                          <Link
                            to={`/programs/${program.slug || program._id}`}
                            className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors text-center"
                          >
                            View Details
                          </Link>
                          <Link
                            to="/contact"
                            className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors text-center"
                          >
                            Apply
                          </Link>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
              
              {/* View All Programs Button */}
              <div className="text-center mt-8">
                <Link
                  to="/programs"
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  View All Programs
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Academic Calendar */}
      {academicsContent?.calendar?.events && (
        <section id="calendar" className="section-padding bg-white">
          <div className="container-max">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Academic Calendar</h2>
              <div className="w-16 h-1 bg-blue-400 rounded mx-auto"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {academicsContent.calendar.events.map((event, index) => (
                <Card key={index} className="p-4 text-center">
                  <Calendar className={`w-8 h-8 mx-auto mb-2 ${getIconColor(index)}`} />
                  <h4 className="font-semibold text-gray-900 text-sm">{event.event}</h4>
                  <p className="text-gray-600 text-xs">{event.date}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Departments */}
      {academicsContent?.departments && academicsContent.departments.length > 0 && (
        <section id="departments" className="section-padding bg-gray-50">
          <div className="container-max">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Departments</h2>
              <div className="w-16 h-1 bg-blue-400 rounded mx-auto"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {academicsContent.departments.map((dept, index) => {
                const IconComponent = getIconComponent(dept.icon)
                return (
                  <Card key={index} className="p-6">
                    <IconComponent className={`w-8 h-8 mb-3 ${getIconColor(index)}`} />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{dept.name}</h3>
                    <p className="text-gray-700 text-sm">{dept.description}</p>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>
      )}



      {/* Faculty Directory */}
      {academicsContent?.faculty && (
        <section id="faculty" className="section-padding bg-gray-50">
          <div className="container-max">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Faculty Directory</h2>
              <div className="w-16 h-1 bg-blue-400 rounded mx-auto"></div>
            </div>
            
            <Card className="p-6 text-center">
              <Users className="w-12 h-12 text-blue-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{academicsContent.faculty.title}</h3>
              <p className="text-gray-700 text-sm mb-4">
                {academicsContent.faculty.description}
              </p>
              <Link
                to="/faculty"
                className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition-colors"
              >
                View Faculty Profiles
              </Link>
            </Card>
          </div>
        </section>
      )}

      {/* Academic Regulations */}
      {academicsContent?.regulations && academicsContent.regulations.length > 0 && (
        <section id="regulations" className="section-padding bg-white">
          <div className="container-max">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Academic Regulations</h2>
              <div className="w-16 h-1 bg-blue-400 rounded mx-auto"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {academicsContent.regulations.map((regulation, index) => (
                <Card key={index} className="p-6 text-center">
                  <FileText className={`w-8 h-8 mx-auto mb-3 ${getIconColor(index)}`} />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{regulation.title}</h3>
                  <p className="text-gray-700 text-sm">{regulation.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

export default Academics






