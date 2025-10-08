import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { BookOpen, Calendar, Building, FileText, Users, Award, GraduationCap, Clock, ChevronRight } from 'lucide-react'
import Card from '../components/common/Card'
import LoadingSpinner from '../components/common/LoadingSpinner'
import ApplicationModal from '../components/common/ApplicationModal'
import { programsAPI, academicsAPI } from '../services/api'

const Academics = () => {
  const location = useLocation()
  const hash = location.hash.substring(1)
  const [programs, setPrograms] = useState([])
  const [academicsContent, setAcademicsContent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false)
  const [selectedProgram, setSelectedProgram] = useState({ name: '', id: '' })

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

  const handleApplyClick = (program) => {
    setSelectedProgram({
      name: program.name || program.title,
      id: program._id
    })
    setIsApplicationModalOpen(true)
  }

  // Scroll to section when hash changes
  useEffect(() => {
    if (hash) {
      setTimeout(() => scrollToSection(hash), 300)
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
      <section className="section-padding bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-16 left-16 w-40 h-40 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-16 right-16 w-32 h-32 bg-yellow-300 rounded-full blur-2xl"></div>
          <div className="absolute top-1/2 left-1/3 w-28 h-28 bg-green-300 rounded-full blur-2xl"></div>
        </div>
        
        {/* Floating academic-themed shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-20 w-6 h-6 bg-white/20 rotate-45 animate-float"></div>
          <div className="absolute bottom-32 left-16 w-4 h-4 bg-yellow-300/30 rounded-full animate-bounce"></div>
          <div className="absolute top-40 right-1/4 w-3 h-8 bg-green-300/25 animate-pulse"></div>
          <div className="absolute bottom-20 left-1/3 w-5 h-5 bg-white/15 rotate-12 animate-float" style={{animationDelay: '1.5s'}}></div>
          <div className="absolute top-1/3 left-20 w-2 h-6 bg-purple-300/20 animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>
        
        <div className="container-max relative z-10">
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
      <section id="programs" className="section-padding bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-16 right-16 w-32 h-32 bg-blue-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-16 left-16 w-28 h-28 bg-green-400 rounded-full blur-2xl"></div>
          <div className="absolute top-1/2 right-1/3 w-24 h-24 bg-purple-400 rounded-full blur-2xl"></div>
        </div>
        
        {/* Floating geometric shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-1/4 w-5 h-5 bg-blue-200 rotate-45 opacity-20 animate-float"></div>
          <div className="absolute bottom-20 right-1/4 w-3 h-3 bg-green-200 rounded-full opacity-30 animate-bounce" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/3 left-1/3 w-2 h-6 bg-purple-200 opacity-25 animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>
        
        <div className="container-max relative z-10">
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
                    <div key={level} className="text-center group">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-2 ${getLevelColor(level)} transform group-hover:scale-110 transition-all duration-300 shadow-lg group-hover:shadow-xl`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">{levelPrograms.length}</div>
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
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
                    {levelPrograms.map((program, index) => (
                      <Card key={program._id} className="p-6 bg-gradient-to-br from-white to-gray-50 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 relative overflow-hidden group hover:scale-105">
                        {/* Enhanced decorative elements */}
                        <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl opacity-20 group-hover:opacity-30 transition-opacity duration-300 ${
                          level === 'undergraduate' ? 'from-blue-200' : 
                          level === 'postgraduate' ? 'from-green-200' : 
                          level === 'diploma' ? 'from-orange-200' : 'from-purple-200'
                        } to-transparent`}></div>
                        <div className={`absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr opacity-15 group-hover:opacity-25 transition-opacity duration-300 ${
                          level === 'undergraduate' ? 'from-cyan-200' : 
                          level === 'postgraduate' ? 'from-emerald-200' : 
                          level === 'diploma' ? 'from-yellow-200' : 'from-pink-200'
                        } to-transparent`}></div>
                        
                        {/* Enhanced floating elements */}
                        <div className={`absolute top-3 left-3 w-3 h-3 rounded-full opacity-40 animate-pulse ${
                          level === 'undergraduate' ? 'bg-blue-400' : 
                          level === 'postgraduate' ? 'bg-green-400' : 
                          level === 'diploma' ? 'bg-orange-400' : 'bg-purple-400'
                        }`} style={{animationDelay: `${index * 0.5}s`}}></div>
                        <div className={`absolute bottom-4 right-4 w-6 h-3 rounded-full opacity-25 animate-float transform rotate-12 ${
                          level === 'undergraduate' ? 'bg-blue-300/30' : 
                          level === 'postgraduate' ? 'bg-green-300/30' : 
                          level === 'diploma' ? 'bg-orange-300/30' : 'bg-purple-300/30'
                        }`} style={{animationDelay: `${index * 0.7}s`}}></div>
                        <div className={`absolute top-1/2 right-2 w-2 h-4 rounded opacity-30 animate-bounce ${
                          level === 'undergraduate' ? 'bg-cyan-300/25' : 
                          level === 'postgraduate' ? 'bg-emerald-300/25' : 
                          level === 'diploma' ? 'bg-yellow-300/25' : 'bg-pink-300/25'
                        }`} style={{animationDelay: `${index * 0.3}s`}}></div>
                        
                        <div className="flex items-start justify-between mb-4 relative z-10">
                          <div className="flex-1">
                            <h4 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors duration-300">{program.title}</h4>
                            {program.shortName && (
                              <p className="text-blue-600 text-sm font-medium bg-blue-50 px-2 py-1 rounded-full inline-block">{program.shortName}</p>
                            )}
                          </div>
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getLevelColor(level)} transform group-hover:scale-110 transition-all duration-300 shadow-md`}>
                            {React.createElement(getLevelIcon(level), {
                              className: 'w-5 h-5'
                            })}
                          </div>
                        </div>
                        
                        <div className={`bg-gradient-to-r p-3 rounded-lg border mb-4 relative z-10 ${
                          level === 'undergraduate' ? 'from-blue-50 to-cyan-50 border-blue-200/50' : 
                          level === 'postgraduate' ? 'from-green-50 to-emerald-50 border-green-200/50' : 
                          level === 'diploma' ? 'from-orange-50 to-yellow-50 border-orange-200/50' : 'from-purple-50 to-pink-50 border-purple-200/50'
                        }`}>
                          <p className="text-gray-700 text-sm line-clamp-3 leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
                            {program.description}
                          </p>
                        </div>
                        
                        <div className="space-y-2 mb-4 relative z-10">
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
                        
                        <div className="flex space-x-2 relative z-10">
                          <Link
                            to={`/programs/${program.slug || program._id}`}
                            className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-300 text-center transform hover:scale-105 shadow-md hover:shadow-lg"
                          >
                            View Details
                          </Link>
                          <button
                            onClick={() => handleApplyClick(program)}
                            className="flex-1 bg-gradient-to-r from-green-600 to-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-green-700 hover:to-green-800 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
                          >
                            Apply
                          </button>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
              
              {/* View All Programs Button */}
              <div className="text-center mt-8">
                <Link
                  to="/academics#programs"
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
        <section id="calendar" className="section-padding bg-gradient-to-br from-white via-gray-50 to-blue-50 relative overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-16 left-16 w-28 h-28 bg-blue-400 rounded-full blur-2xl"></div>
            <div className="absolute bottom-16 right-16 w-32 h-32 bg-green-400 rounded-full blur-3xl"></div>
          </div>
          
          {/* Floating shapes */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 right-1/4 w-4 h-4 bg-blue-200 rounded-full opacity-30 animate-bounce" style={{animationDelay: '1s'}}></div>
            <div className="absolute bottom-20 left-1/4 w-3 h-6 bg-green-200 opacity-25 animate-pulse" style={{animationDelay: '2s'}}></div>
          </div>
          
          <div className="container-max relative z-10">
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
        <section id="departments" className="section-padding bg-gradient-to-br from-gray-50 via-white to-green-50 relative overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-16 right-16 w-28 h-28 bg-green-400 rounded-full blur-2xl"></div>
            <div className="absolute bottom-16 left-16 w-24 h-24 bg-blue-400 rounded-full blur-2xl"></div>
          </div>
          
          {/* Floating shapes */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-24 left-1/4 w-3 h-3 bg-green-200 rounded-full opacity-30 animate-pulse" style={{animationDelay: '1.5s'}}></div>
            <div className="absolute bottom-24 right-1/4 w-4 h-4 bg-blue-200 rotate-45 opacity-20 animate-float" style={{animationDelay: '2.5s'}}></div>
          </div>
          
          <div className="container-max relative z-10">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Departments</h2>
              <div className="w-16 h-1 bg-blue-400 rounded mx-auto"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              {academicsContent.departments.map((dept, index) => {
                const IconComponent = getIconComponent(dept.icon)
                return (
                  <Card key={index} className="p-6 bg-gradient-to-br from-white to-gray-50 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden group hover:scale-105">
                    {/* Enhanced decorative elements */}
                    <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl opacity-20 group-hover:opacity-30 transition-opacity duration-300 ${
                      index % 4 === 0 ? 'from-blue-200' : 
                      index % 4 === 1 ? 'from-green-200' : 
                      index % 4 === 2 ? 'from-orange-200' : 'from-purple-200'
                    } to-transparent`}></div>
                    <div className={`absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr opacity-15 group-hover:opacity-25 transition-opacity duration-300 ${
                      index % 4 === 0 ? 'from-cyan-200' : 
                      index % 4 === 1 ? 'from-emerald-200' : 
                      index % 4 === 2 ? 'from-yellow-200' : 'from-pink-200'
                    } to-transparent`}></div>
                    
                    {/* Enhanced floating elements */}
                    <div className={`absolute top-3 left-3 w-3 h-3 rounded-full opacity-40 animate-pulse ${
                      index % 4 === 0 ? 'bg-blue-400' : 
                      index % 4 === 1 ? 'bg-green-400' : 
                      index % 4 === 2 ? 'bg-orange-400' : 'bg-purple-400'
                    }`} style={{animationDelay: `${index * 0.3}s`}}></div>
                    <div className={`absolute bottom-4 right-4 w-5 h-3 rounded-full opacity-25 animate-float transform rotate-45 ${
                      index % 4 === 0 ? 'bg-blue-300/30' : 
                      index % 4 === 1 ? 'bg-green-300/30' : 
                      index % 4 === 2 ? 'bg-orange-300/30' : 'bg-purple-300/30'
                    }`} style={{animationDelay: `${index * 0.6}s`}}></div>
                    <div className={`absolute top-1/2 right-2 w-2 h-4 rounded opacity-20 animate-bounce ${
                      index % 4 === 0 ? 'bg-cyan-300/25' : 
                      index % 4 === 1 ? 'bg-emerald-300/25' : 
                      index % 4 === 2 ? 'bg-yellow-300/25' : 'bg-pink-300/25'
                    }`} style={{animationDelay: `${index * 0.4}s`}}></div>
                    
                    <div className="flex items-start space-x-4 relative z-10">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-all duration-300 shadow-md ${
                        index % 4 === 0 ? 'bg-blue-100' : 
                        index % 4 === 1 ? 'bg-green-100' : 
                        index % 4 === 2 ? 'bg-orange-100' : 'bg-purple-100'
                      }`}>
                        <IconComponent className={`w-6 h-6 ${getIconColor(index)}`} />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">{dept.name}</h3>
                        <div className={`p-3 rounded-lg border ${
                          index % 4 === 0 ? 'bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200/50' : 
                          index % 4 === 1 ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200/50' : 
                          index % 4 === 2 ? 'bg-gradient-to-r from-orange-50 to-yellow-50 border-orange-200/50' : 'bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200/50'
                        }`}>
                          <p className="text-gray-700 text-sm leading-relaxed group-hover:text-gray-800 transition-colors duration-300">{dept.description}</p>
                        </div>
                      </div>
                    </div>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>
      )}



      {/* Faculty Directory */}
      {academicsContent?.faculty && (
        <section id="faculty" className="section-padding bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-16 left-16 w-32 h-32 bg-purple-400 rounded-full blur-3xl"></div>
            <div className="absolute bottom-16 right-16 w-28 h-28 bg-blue-400 rounded-full blur-2xl"></div>
          </div>
          
          {/* Floating shapes */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 right-1/3 w-4 h-4 bg-purple-200 rounded-full opacity-30 animate-bounce" style={{animationDelay: '1s'}}></div>
            <div className="absolute bottom-20 left-1/3 w-3 h-6 bg-blue-200 opacity-25 animate-pulse" style={{animationDelay: '2s'}}></div>
          </div>
          
          <div className="container-max relative z-10">
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
                  <p className="text-gray-700 text-sm text-left">{regulation.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Application Modal */}
      <ApplicationModal
        isOpen={isApplicationModalOpen}
        onClose={() => setIsApplicationModalOpen(false)}
        programName={selectedProgram.name}
        programId={selectedProgram.id}
      />
    </div>
  )
}

export default Academics






