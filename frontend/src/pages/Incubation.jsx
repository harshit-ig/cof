import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Building, Users, FileText, Lightbulb, TrendingUp, Target, Award, Calendar, Send, Mail, Phone, MapPin, User, Briefcase } from 'lucide-react'
import Card from '../components/common/Card'
import { toast } from 'react-hot-toast'
import { incubationAPI, uploadAPI } from '../services/api'

const Incubation = () => {
  const location = useLocation()
  const hash = location.hash.substring(1)
  const [incubationData, setIncubationData] = useState({
    'activity': [],
    'governing-body': [],
    'management-committee': []
  })
  const [loading, setLoading] = useState(true)

  // Fetch incubation data
  useEffect(() => {
    fetchIncubationData()
  }, [])

  const fetchIncubationData = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${import.meta.env.VITE_SERVER_HOST}/incubation`)
      
      if (response.ok) {
        const data = await response.json()
        setIncubationData(data.data.incubation)
      } else {
        console.error('Failed to fetch incubation data')
      }
    } catch (error) {
      console.error('Error fetching incubation data:', error)
    } finally {
      setLoading(false)
    }
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

  // Get icon component by name
  const getIconComponent = (iconName, className = "w-6 h-6") => {
    const icons = {
      'Users': Users,
      'Target': Target,
      'Award': Award,
      'Building': Building,
      'Lightbulb': Lightbulb,
      'TrendingUp': TrendingUp,
      'FileText': FileText,
      'Briefcase': Briefcase
    }
    
    const IconComponent = icons[iconName] || Lightbulb
    return <IconComponent className={className} />
  }

  // Get color classes
  const getColorClasses = (color) => {
    const colorMap = {
      'blue': 'bg-blue-100 text-blue-600',
      'green': 'bg-green-100 text-green-600',
      'purple': 'bg-purple-100 text-purple-600',
      'red': 'bg-red-100 text-red-600',
      'yellow': 'bg-yellow-100 text-yellow-600',
      'indigo': 'bg-indigo-100 text-indigo-600',
      'orange': 'bg-orange-100 text-orange-600',
      'gray': 'bg-gray-100 text-gray-600',
    }
    
    return colorMap[color] || 'bg-blue-100 text-blue-600'
  }

  // Render person card with clean, professional design
  const renderPersonCard = (person, index, isChairperson = false) => {
    return (
      <div key={person._id} className={`
        bg-white rounded-lg shadow-md border transition-all duration-200 hover:shadow-lg
        ${isChairperson 
          ? 'border-gray-300 ring-1 ring-gray-200' 
          : 'border-gray-200 hover:border-gray-300'
        }
      `}>
        <div className="p-6">
          {isChairperson && (
            <div className="text-center mb-4">
              <span className="inline-block bg-gray-100 text-gray-700 text-sm font-medium px-3 py-1 rounded-full">
                Chairperson
              </span>
            </div>
          )}
          
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-4">
              {person.image ? (
                <img
                  src={uploadAPI.getImageUrl(person.image, 'incubation')}
                  alt={person.name || person.title}
                  className="w-20 h-20 rounded-full object-cover border-4 border-gray-200"
                  onError={(e) => {
                    // Try fallback URL for legacy images in /images/ directory
                    const fallbackUrl = uploadAPI.getImageUrl(person.image, 'images');
                    if (e.target.src !== fallbackUrl) {
                      e.target.src = fallbackUrl;
                    } else {
                      // Hide image on error and show placeholder
                      e.target.style.display = 'none'
                      e.target.nextElementSibling.style.display = 'flex'
                    }
                  }}
                />
              ) : null}
              <div 
                className={`
                  w-20 h-20 rounded-full flex items-center justify-center border-4 border-gray-200
                  ${isChairperson ? 'bg-gray-600' : 'bg-gray-400'}
                  ${person.image ? 'hidden' : 'flex'}
                `}
              >
                <User className="w-10 h-10 text-white" />
              </div>
            </div>
            
            <h4 className={`
              font-semibold mb-1 
              ${isChairperson ? 'text-gray-900 text-lg' : 'text-gray-900'}
            `}>
              {person.name || person.title}
            </h4>
            
            {person.position && (
              <p className={`
                text-sm mb-2 
                ${isChairperson ? 'text-gray-700 font-medium' : 'text-gray-600'}
              `}>
                {person.position}
              </p>
            )}
            
            {person.designation && (
              <p className="text-gray-600 text-xs mb-1">{person.designation}</p>
            )}
            
            {person.organization && (
              <p className="text-gray-600 text-xs mb-1">{person.organization}</p>
            )}
            
            {person.location && (
              <p className="text-gray-600 text-xs mb-2">{person.location}</p>
            )}
            
            {person.email && (
              <p className="text-gray-500 text-xs mb-3 flex items-center justify-center">
                <Mail className="w-3 h-3 mr-1" />
                {person.email}
              </p>
            )}
            
            {person.expertise && person.expertise.length > 0 && (
              <div className="flex flex-wrap gap-1 justify-center">
                {person.expertise.slice(0, 2).map((skill, skillIndex) => (
                  <span key={skillIndex} className={`
                    px-2 py-1 text-xs rounded
                    ${isChairperson 
                      ? 'bg-gray-100 text-gray-700' 
                      : 'bg-gray-100 text-gray-600'
                    }
                  `}>
                    {skill}
                  </span>
                ))}
                {person.expertise.length > 2 && (
                  <span className="px-2 py-1 text-xs rounded bg-gray-50 text-gray-500">
                    +{person.expertise.length - 2}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  // Render hierarchy section with clean, professional layout
  const renderHierarchySection = (data, title, subtitle, iconComponent, colorScheme, isTopLevel = false) => {
    if (!data || data.length === 0) return null

    // Separate chairperson/head from other members
    const chairperson = data.find(person => 
      person.position?.toLowerCase().includes('chairperson') || 
      person.position?.toLowerCase().includes('chair') ||
      person.designation?.toLowerCase().includes('chairperson')
    )
    const otherMembers = data.filter(person => person._id !== chairperson?._id)

    return (
      <Card className="p-6 mb-6">
        <div className="text-center mb-6">
          <div className={`inline-flex items-center justify-center w-16 h-16 ${colorScheme.bg} rounded-full mb-4`}>
            {iconComponent}
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">{title}</h3>
          <p className={`${colorScheme.text} font-medium`}>{subtitle}</p>
        </div>

        {/* Hierarchical Layout */}
        <div className="space-y-6">
          {/* Chairperson/Head - Prominent position */}
          {chairperson && (
            <div className="flex justify-center mb-6">
              <div className="w-full max-w-sm">
                {renderPersonCard(chairperson, 0, true)}
              </div>
            </div>
          )}

          {/* Other Members - Grid layout */}
          {otherMembers.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {otherMembers.map((person, index) => renderPersonCard(person, index + 1, false))}
            </div>
          )}

          {/* Show total count */}
          {data.length > 1 && (
            <div className="text-center mt-4">
              <p className="text-sm text-gray-500">
                Total Members: <span className="font-semibold">{data.length}</span>
              </p>
            </div>
          )}
        </div>
      </Card>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="section-padding bg-blue-600 text-white">
        <div className="container-max">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Incubation Centre
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Fostering Innovation & Entrepreneurship in Fisheries
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => scrollToSection('registration')}
                className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors duration-300 flex items-center justify-center space-x-2"
              >
                <Send className="w-5 h-5" />
                <span>Register for Program</span>
              </button>
              <button
                onClick={() => scrollToSection('activities')}
                className="px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-colors duration-300"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Activities */}
      <section id="activities" className="section-padding bg-gray-50">
        <div className="container-max">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Activities</h2>
            <div className="w-16 h-1 bg-blue-400 rounded mx-auto"></div>
          </div>
          
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {incubationData.activity && incubationData.activity.length > 0 ? (
                incubationData.activity.map((activity) => (
                  <Card key={activity._id} className="p-6">
                    <div className="flex items-center mb-4">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center mr-4 ${getColorClasses(activity.color)}`}>
                        {getIconComponent(activity.icon)}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{activity.title}</h3>
                        {activity.subtitle && (
                          <p className={`text-sm ${activity.color ? `text-${activity.color}-600` : 'text-blue-600'}`}>
                            {activity.subtitle}
                          </p>
                        )}
                      </div>
                    </div>
                    <p className="text-gray-700 text-sm">
                      {activity.description}
                    </p>
                    {activity.tags && activity.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-3">
                        {activity.tags.map((tag, index) => (
                          <span key={index} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </Card>
                ))
              ) : (
                // Fallback static content if no dynamic data
                <>
                  <Card className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                        <Lightbulb className="w-6 h-6 text-blue-500" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">Startup Incubation</h3>
                        <p className="text-blue-500 text-sm">Business Development Support</p>
                      </div>
                    </div>
                    <p className="text-gray-700 text-sm">
                      Comprehensive support for fisheries startups from ideation to market launch with mentorship and funding assistance.
                    </p>
                  </Card>
                  
                  <Card className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                        <TrendingUp className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">Innovation Programs</h3>
                        <p className="text-green-600 text-sm">Creative Solutions</p>
                      </div>
                    </div>
                    <p className="text-gray-700 text-sm">
                      Innovation challenges, hackathons, and design thinking workshops to foster creativity in fisheries.
                    </p>
                  </Card>
                  
                  <Card className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                        <Users className="w-6 h-6 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">Entrepreneurship Training</h3>
                        <p className="text-purple-600 text-sm">Skill Development</p>
                      </div>
                    </div>
                    <p className="text-gray-700 text-sm">
                      Training programs on business planning, financial management, and marketing for aspiring entrepreneurs.
                    </p>
                  </Card>
                  
                  <Card className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-4">
                        <Target className="w-6 h-6 text-red-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">Technology Transfer</h3>
                        <p className="text-red-600 text-sm">Research Commercialization</p>
                      </div>
                    </div>
                    <p className="text-gray-700 text-sm">
                      Facilitating transfer of research innovations to commercial applications in aquaculture sector.
                    </p>
                  </Card>
                </>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Hierarchy Section */}
      <section className="section-padding bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Organizational Hierarchy</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-green-400 rounded mx-auto mb-8"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              The COFS Incubation Centre operates under a structured governance framework ensuring effective policy making and operational excellence through collaborative leadership.
            </p>
          </div>

          <div className="space-y-12">
            {/* Governing/Advisory Body */}
            {renderHierarchySection(
              incubationData['governing-body'],
              'Governing / Advisory Body',
              '(Policy Level)',
              <Building className="w-10 h-10 text-blue-600" />,
              {
                bg: 'bg-blue-100',
                text: 'text-blue-600',
                accent: 'bg-blue-400'
              },
              true
            )}

            {/* Connection between levels */}
            {incubationData['governing-body']?.length > 0 && incubationData['management-committee']?.length > 0 && (
              <div className="flex flex-col items-center py-8">
                <div className="w-px h-16 bg-gradient-to-b from-blue-400 to-green-400"></div>
                <div className="w-4 h-4 bg-gradient-to-br from-blue-400 to-green-400 rounded-full"></div>
                <div className="w-px h-16 bg-gradient-to-b from-blue-400 to-green-400"></div>
              </div>
            )}

            {/* Management Committee */}
            {renderHierarchySection(
              incubationData['management-committee'],
              'Management Committee',
              '(Operational Level)',
              <Target className="w-10 h-10 text-green-600" />,
              {
                bg: 'bg-green-100',
                text: 'text-green-600',
                accent: 'bg-green-400'
              }
            )}

            {/* Fallback content if no dynamic data */}
            {(!incubationData['governing-body'] || incubationData['governing-body'].length === 0) &&
             (!incubationData['management-committee'] || incubationData['management-committee'].length === 0) && (
              <div className="text-center py-16">
                <Building className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-500 mb-2">Organizational Structure</h3>
                <p className="text-gray-400">Hierarchy information will be displayed here once configured by administrators.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Incubation