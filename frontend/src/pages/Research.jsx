import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FlaskConical, Users, Award, BookOpen, Globe, Building, Fish, Microscope, Calendar, User, ExternalLink, DollarSign, FileText, Target, GraduationCap, Beaker, MapPin } from 'lucide-react'
import Card from '../components/common/Card'
import { getDocumentUrl } from '../services/files'
import { researchAPI } from '../services/api'

const Research = () => {
  const location = useLocation()
  const hash = location.hash.substring(1)
  const [researches, setResearches] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

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

  // Fetch research data
  useEffect(() => {
    const fetchResearches = async () => {
      try {
        setLoading(true)
        const response = await researchAPI.getAll()
        setResearches(response.data.data.research || [])
        setError(null)
      } catch (error) {
        console.error('Error fetching researches:', error)
        setError('Failed to load research data')
      } finally {
        setLoading(false)
      }
    }

    fetchResearches()
  }, [])

  // Filter data by section
  const getDataBySection = (section) => {
    return researches.filter(r => r.section === section).sort((a, b) => (a.order || 0) - (b.order || 0))
  }

  // Calculate statistics
  const getStats = () => {
    return {
      ongoingProjects: researches.filter(r => r.section === 'ongoing-projects').length,
      publications: researches.filter(r => r.section === 'publications').length,
      studentResearch: researches.filter(r => r.section === 'student-research').length,
      collaborations: researches.filter(r => r.section === 'collaborations').length,
      facilities: researches.filter(r => r.section === 'facilities').length,
      totalBudget: researches.reduce((sum, r) => sum + (r.budget || 0), 0)
    }
  }

  const stats = getStats()

  // Scroll to section when hash changes
  React.useEffect(() => {
    if (hash) {
      setTimeout(() => scrollToSection(hash), 100)
    }
  }, [hash])

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-r from-secondary-600 to-primary-600 text-white">
        <div className="container-max">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Research & Innovation
            </h1>
            <p className="text-xl text-primary-100 mb-8">
              Advancing Fishery Science Through Cutting-Edge Research & Technology
            </p>
            
            {/* Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">{stats.ongoingProjects}</div>
                <div className="text-primary-100 text-sm">Ongoing Projects</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">{stats.publications}</div>
                <div className="text-primary-100 text-sm">Publications</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">₹{(stats.totalBudget / 100000).toFixed(1)}L</div>
                <div className="text-primary-100 text-sm">Total Funding</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">{stats.facilities}</div>
                <div className="text-primary-100 text-sm">Research Facilities</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Research Sections */}
      <section className="section-padding bg-white">
        <div className="container-max">
          {loading && (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
              <p className="text-gray-500 mt-4">Loading research data...</p>
            </div>
          )}

          {error && (
            <div className="text-center py-12">
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
                <p className="text-red-600">{error}</p>
              </div>
            </div>
          )}

          {!loading && !error && (
            <div className="space-y-16">
              {/* 1. Ongoing Projects */}
              <div id="ongoing-projects">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">Ongoing Projects</h2>
                  <p className="text-gray-600 mb-4">ICAR, NFDB, PMMSY, DBT and other funding agencies</p>
                  <div className="w-16 h-1 bg-secondary-500 rounded mx-auto"></div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {getDataBySection('ongoing-projects').map((project) => (
                    <Card key={project._id} className="hover:shadow-xl transition-all duration-300">
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="w-12 h-12 rounded-lg bg-secondary-100 flex items-center justify-center">
                            <FlaskConical className="w-6 h-6 text-secondary-600" />
                          </div>
                          <div className="bg-primary-100 text-primary-800 text-xs px-2 py-1 rounded-full">
                            {project.status || 'ongoing'}
                          </div>
                        </div>
                        
                        <h3 className="text-lg font-bold text-gray-900 mb-3">{project.title}</h3>
                        <p className="text-gray-700 text-sm mb-4 line-clamp-3">{project.description}</p>
                        
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center text-sm text-gray-600">
                            <User className="w-4 h-4 mr-2" />
                            <span className="font-medium">PI:</span>
                            <span className="ml-1">{project.principalInvestigator}</span>
                          </div>
                          
                          {project.fundingAgency && (
                            <div className="flex items-center text-xs">
                              <Award className="w-3 h-3 mr-2 text-primary-500" />
                              <span className="text-primary-600 bg-primary-50 px-2 py-1 rounded">
                                {project.fundingAgency}
                              </span>
                            </div>
                          )}
                          
                          {project.budget && (
                            <div className="flex items-center text-xs">
                              <DollarSign className="w-3 h-3 mr-2 text-accent-600" />
                              <span className="text-accent-700 bg-accent-50 px-2 py-1 rounded">
                                ₹{(project.budget / 100000).toFixed(1)} Lakhs
                              </span>
                            </div>
                          )}
                          
                          {project.duration && (project.duration.startDate || project.duration.endDate) && (
                            <div className="flex items-center text-xs">
                              <Calendar className="w-3 h-3 mr-2 text-navy-500" />
                              <span className="text-navy-600 bg-navy-50 px-2 py-1 rounded">
                                {project.duration.startDate && new Date(project.duration.startDate).getFullYear()} - 
                                {project.duration.endDate ? new Date(project.duration.endDate).getFullYear() : 'Ongoing'}
                              </span>
                            </div>
                          )}
                        </div>
                        
                        {project.objectives && project.objectives.length > 0 && (
                          <div className="text-xs text-gray-600 bg-gray-50 p-2 rounded mb-3">
                            <div className="flex items-center text-sm font-medium text-gray-900 mb-1">
                              <Target className="w-3 h-3 mr-1" />
                              Key Objectives
                            </div>
                            {project.objectives.map((obj, index) => (
                              <div key={index} className="text-xs text-gray-600 mb-1">• {obj}</div>
                            ))}
                          </div>
                        )}
                        
                        {/* PDF Display */}
                        {project.filename && (
                          <div className="pt-3 border-t border-gray-100 mt-3">
                            <div className="flex flex-wrap gap-2">
                              <a
                                href={getDocumentUrl(project.filename)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center px-3 py-1 bg-primary-100 text-primary-700 text-xs rounded-full hover:bg-primary-200 transition-colors"
                              >
                                <FileText className="w-3 h-3 mr-1" />
                                View PDF
                                <ExternalLink className="w-3 h-3 ml-1" />
                              </a>
                            </div>
                          </div>
                        )}
                        
                        {project.documents && project.documents.length > 0 && (
                          <div className="pt-3 border-t border-gray-100">
                            <div className="flex flex-wrap gap-2">
                              {project.documents.map((doc, index) => (
                                <a
                                  key={index}
                                  href={doc.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center px-3 py-1 bg-primary-100 text-primary-700 text-xs rounded-full hover:bg-primary-200 transition-colors"
                                >
                                  <FileText className="w-3 h-3 mr-1" />
                                  View Details
                                  <ExternalLink className="w-3 h-3 ml-1" />
                                </a>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </Card>
                  ))}
                  
                  {getDataBySection('ongoing-projects').length === 0 && (
                    <div className="col-span-full text-center py-8">
                      <FlaskConical className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">No ongoing projects available</p>
                    </div>
                  )}
                </div>
              </div>

              {/* 2. Publications and Journals */}
              <div id="publications">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">Publications and Journals</h2>
                  <p className="text-gray-600 mb-4">Research publications and academic contributions</p>
                  <div className="w-16 h-1 bg-secondary-500 rounded mx-auto"></div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {getDataBySection('publications').map((publication) => (
                    <Card key={publication._id} className="hover:shadow-xl transition-all duration-300">
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="w-12 h-12 rounded-lg bg-secondary-100 flex items-center justify-center">
                            <BookOpen className="w-6 h-6 text-secondary-600" />
                          </div>
                          <div className="bg-primary-100 text-primary-800 text-xs px-2 py-1 rounded-full">
                            Publication
                          </div>
                        </div>
                        
                        <h3 className="text-lg font-bold text-gray-900 mb-3">{publication.title}</h3>
                        <p className="text-gray-700 text-sm mb-4 line-clamp-3">{publication.description}</p>
                        
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center text-sm text-gray-600">
                            <User className="w-4 h-4 mr-2" />
                            <span className="font-medium">Author:</span>
                            <span className="ml-1">{publication.principalInvestigator}</span>
                          </div>
                          
                          {publication.journal && (
                            <div className="flex items-center text-xs">
                              <BookOpen className="w-3 h-3 mr-2 text-secondary-500" />
                              <span className="text-secondary-600 bg-secondary-50 px-2 py-1 rounded">
                                {publication.journal}
                              </span>
                            </div>
                          )}
                          
                          {publication.publicationDate && (
                            <div className="flex items-center text-xs">
                              <Calendar className="w-3 h-3 mr-2 text-purple-500" />
                              <span className="text-purple-600 bg-purple-50 px-2 py-1 rounded">
                                {new Date(publication.publicationDate).getFullYear()}
                              </span>
                            </div>
                          )}
                        </div>
                        
                        {publication.doi && (
                          <div className="text-xs text-gray-600 bg-gray-50 p-2 rounded mb-3">
                            <span className="font-medium">DOI:</span> {publication.doi}
                          </div>
                        )}
                        
                        {/* PDF Display */}
                        {publication.filename && (
                          <div className="pt-3 border-t border-gray-100 mt-3">
                            <div className="flex flex-wrap gap-2">
                              <a
                                href={getDocumentUrl(publication.filename)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full hover:bg-green-200 transition-colors"
                              >
                                <FileText className="w-3 h-3 mr-1" />
                                View PDF
                                <ExternalLink className="w-3 h-3 ml-1" />
                              </a>
                            </div>
                          </div>
                        )}
                        
                        {publication.documents && publication.documents.length > 0 && (
                          <div className="pt-3 border-t border-gray-100">
                            <div className="flex flex-wrap gap-2">
                              {publication.documents.map((doc, index) => (
                                <a
                                  key={index}
                                  href={doc.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full hover:bg-green-200 transition-colors"
                                >
                                  <FileText className="w-3 h-3 mr-1" />
                                  View Publication
                                  <ExternalLink className="w-3 h-3 ml-1" />
                                </a>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </Card>
                  ))}
                  
                  {getDataBySection('publications').length === 0 && (
                    <div className="col-span-full text-center py-8">
                      <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">No publications available</p>
                    </div>
                  )}
                </div>
              </div>

              {/* 3. Student Research */}
              <div id="student-research">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">Student Research</h2>
                  <p className="text-gray-600 mb-4">M.F.Sc. and B.F.Sc. student research projects</p>
                  <div className="w-16 h-1 bg-accent-500 rounded mx-auto"></div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {getDataBySection('student-research').map((research) => (
                    <Card key={research._id} className="hover:shadow-xl transition-all duration-300">
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="w-12 h-12 rounded-lg bg-accent-100 flex items-center justify-center">
                            <Users className="w-6 h-6 text-accent-600" />
                          </div>
                          <div className="bg-accent-100 text-accent-800 text-xs px-2 py-1 rounded-full">
                            Student Research
                          </div>
                        </div>
                        
                        <h3 className="text-lg font-bold text-gray-900 mb-3">{research.title}</h3>
                        <p className="text-gray-700 text-sm mb-4 line-clamp-3">{research.description}</p>
                        
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center text-sm text-gray-600">
                            <User className="w-4 h-4 mr-2" />
                            <span className="font-medium">Student:</span>
                            <span className="ml-1">{research.studentName || research.principalInvestigator}</span>
                          </div>
                          
                          <div className="flex items-center text-sm text-gray-600">
                            <Award className="w-4 h-4 mr-2" />
                            <span className="font-medium">Supervisor:</span>
                            <span className="ml-1">{research.supervisor || research.principalInvestigator}</span>
                          </div>
                          
                          {research.degree && (
                            <div className="flex items-center text-xs">
                              <BookOpen className="w-3 h-3 mr-2 text-accent-500" />
                              <span className="text-accent-600 bg-accent-50 px-2 py-1 rounded">
                                {research.degree}
                              </span>
                            </div>
                          )}
                          
                          {research.completionYear && (
                            <div className="flex items-center text-xs">
                              <Calendar className="w-3 h-3 mr-2 text-navy-500" />
                              <span className="text-navy-600 bg-navy-50 px-2 py-1 rounded">
                                {research.completionYear}
                              </span>
                            </div>
                          )}
                        </div>
                        
                        {/* PDF Display */}
                        {research.filename && (
                          <div className="pt-3 border-t border-gray-100 mt-3">
                            <div className="flex flex-wrap gap-2">
                              <a
                                href={getDocumentUrl(research.filename)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center px-3 py-1 bg-accent-100 text-accent-700 text-xs rounded-full hover:bg-accent-200 transition-colors"
                              >
                                <FileText className="w-3 h-3 mr-1" />
                                View PDF
                                <ExternalLink className="w-3 h-3 ml-1" />
                              </a>
                            </div>
                          </div>
                        )}
                        
                        {research.documents && research.documents.length > 0 && (
                          <div className="pt-3 border-t border-gray-100 mt-3">
                            <div className="flex flex-wrap gap-2">
                              {research.documents.map((doc, index) => (
                                <a
                                  key={index}
                                  href={doc.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center px-3 py-1 bg-accent-100 text-accent-700 text-xs rounded-full hover:bg-accent-200 transition-colors"
                                >
                                  <FileText className="w-3 h-3 mr-1" />
                                  View Thesis
                                  <ExternalLink className="w-3 h-3 ml-1" />
                                </a>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </Card>
                  ))}
                  
                  {getDataBySection('student-research').length === 0 && (
                    <div className="col-span-full text-center py-8">
                      <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">No student research projects available</p>
                    </div>
                  )}
                </div>
              </div>

              {/* 4. Research Collaborations */}
              <div id="collaborations">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">Research Collaborations</h2>
                  <p className="text-gray-600 mb-4">Strategic partnerships and collaborative initiatives</p>
                  <div className="w-16 h-1 bg-secondary-500 rounded mx-auto"></div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {getDataBySection('collaborations').map((collaboration) => (
                    <Card key={collaboration._id} className="hover:shadow-xl transition-all duration-300">
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="w-12 h-12 rounded-lg bg-secondary-100 flex items-center justify-center">
                            <Users className="w-6 h-6 text-secondary-600" />
                          </div>
                          <div className="bg-secondary-100 text-secondary-800 text-xs px-2 py-1 rounded-full">
                            Collaboration
                          </div>
                        </div>
                        
                        <h3 className="text-lg font-bold text-gray-900 mb-3">{collaboration.title}</h3>
                        <p className="text-gray-700 text-sm mb-4 line-clamp-3">{collaboration.description}</p>
                        
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center text-sm text-gray-600">
                            <Building className="w-4 h-4 mr-2" />
                            <span className="font-medium">Partner:</span>
                            <span className="ml-1">{collaboration.partnerInstitution || collaboration.principalInvestigator}</span>
                          </div>
                          
                          {collaboration.collaborationType && (
                            <div className="flex items-center text-xs">
                              <Globe className="w-3 h-3 mr-2 text-secondary-500" />
                              <span className="text-secondary-600 bg-secondary-50 px-2 py-1 rounded">
                                {collaboration.collaborationType}
                              </span>
                            </div>
                          )}
                          
                          {collaboration.duration && (collaboration.duration.startDate || collaboration.duration.endDate) && (
                            <div className="flex items-center text-xs">
                              <Calendar className="w-3 h-3 mr-2 text-primary-500" />
                              <span className="text-primary-600 bg-primary-50 px-2 py-1 rounded">
                                {collaboration.duration.startDate && new Date(collaboration.duration.startDate).getFullYear()} - 
                                {collaboration.duration.endDate ? new Date(collaboration.duration.endDate).getFullYear() : 'Ongoing'}
                              </span>
                            </div>
                          )}
                        </div>
                        
                        {collaboration.objectives && collaboration.objectives.length > 0 && (
                          <div className="text-xs text-gray-600 bg-gray-50 p-2 rounded mb-3">
                            <div className="flex items-center text-sm font-medium text-gray-900 mb-1">
                              <Target className="w-3 h-3 mr-1" />
                              Objectives
                            </div>
                            {collaboration.objectives.map((obj, index) => (
                              <div key={index} className="text-xs text-gray-600 mb-1">• {obj}</div>
                            ))}
                          </div>
                        )}
                        
                        {/* PDF Display */}
                        {collaboration.filename && (
                          <div className="pt-3 border-t border-gray-100 mt-3">
                            <div className="flex flex-wrap gap-2">
                              <a
                                href={getDocumentUrl(collaboration.filename)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center px-3 py-1 bg-secondary-100 text-secondary-700 text-xs rounded-full hover:bg-secondary-200 transition-colors"
                              >
                                <FileText className="w-3 h-3 mr-1" />
                                View PDF
                                <ExternalLink className="w-3 h-3 ml-1" />
                              </a>
                            </div>
                          </div>
                        )}
                        
                        {collaboration.documents && collaboration.documents.length > 0 && (
                          <div className="pt-3 border-t border-gray-100">
                            <div className="flex flex-wrap gap-2">
                              {collaboration.documents.map((doc, index) => (
                                <a
                                  key={index}
                                  href={doc.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center px-3 py-1 bg-secondary-100 text-secondary-700 text-xs rounded-full hover:bg-secondary-200 transition-colors"
                                >
                                  <FileText className="w-3 h-3 mr-1" />
                                  View Agreement
                                  <ExternalLink className="w-3 h-3 ml-1" />
                                </a>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </Card>
                  ))}
                  
                  {getDataBySection('collaborations').length === 0 && (
                    <div className="col-span-full text-center py-8">
                      <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">No collaborations available</p>
                    </div>
                  )}
                </div>
              </div>

              {/* 5. Research Facilities */}
              <div id="facilities">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">Research Facilities</h2>
                  <p className="text-gray-600 mb-4">State-of-the-art research infrastructure and equipment</p>
                  <div className="w-16 h-1 bg-indigo-400 rounded mx-auto"></div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {getDataBySection('facilities').map((facility) => (
                    <Card key={facility._id} className="hover:shadow-xl transition-all duration-300">
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="w-12 h-12 rounded-lg bg-indigo-100 flex items-center justify-center">
                            <Building className="w-6 h-6 text-indigo-600" />
                          </div>
                          <div className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full">
                            Facility
                          </div>
                        </div>
                        
                        <h3 className="text-lg font-bold text-gray-900 mb-3">{facility.title}</h3>
                        <p className="text-gray-700 text-sm mb-4 line-clamp-3">{facility.description}</p>
                        
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center text-sm text-gray-600">
                            <User className="w-4 h-4 mr-2" />
                            <span className="font-medium">In-charge:</span>
                            <span className="ml-1">{facility.facilityIncharge || facility.principalInvestigator}</span>
                          </div>
                          
                          {facility.location && (
                            <div className="flex items-center text-xs">
                              <MapPin className="w-3 h-3 mr-2 text-indigo-500" />
                              <span className="text-indigo-600 bg-indigo-50 px-2 py-1 rounded">
                                {facility.location}
                              </span>
                            </div>
                          )}
                          
                          {facility.capacity && (
                            <div className="flex items-center text-xs">
                              <Users className="w-3 h-3 mr-2 text-green-500" />
                              <span className="text-green-600 bg-green-50 px-2 py-1 rounded">
                                Capacity: {facility.capacity}
                              </span>
                            </div>
                          )}
                        </div>
                        
                        {facility.equipment && facility.equipment.length > 0 && (
                          <div className="text-xs text-gray-600 bg-gray-50 p-2 rounded mb-3">
                            <div className="flex items-center text-sm font-medium text-gray-900 mb-1">
                              <FlaskConical className="w-3 h-3 mr-1" />
                              Key Equipment
                            </div>
                            {facility.equipment.slice(0, 3).map((eq, index) => (
                              <div key={index} className="text-xs text-gray-600 mb-1">• {eq}</div>
                            ))}
                            {facility.equipment.length > 3 && (
                              <div className="text-indigo-600 font-medium">+{facility.equipment.length - 3} more</div>
                            )}
                          </div>
                        )}
                        
                        {/* PDF Display */}
                        {facility.filename && (
                          <div className="pt-3 border-t border-gray-100 mt-3">
                            <div className="flex flex-wrap gap-2">
                              <a
                                href={getDocumentUrl(facility.filename)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center px-3 py-1 bg-indigo-100 text-indigo-700 text-xs rounded-full hover:bg-indigo-200 transition-colors"
                              >
                                <FileText className="w-3 h-3 mr-1" />
                                View PDF
                                <ExternalLink className="w-3 h-3 ml-1" />
                              </a>
                            </div>
                          </div>
                        )}
                        
                        {facility.documents && facility.documents.length > 0 && (
                          <div className="pt-3 border-t border-gray-100">
                            <div className="flex flex-wrap gap-2">
                              {facility.documents.map((doc, index) => (
                                <a
                                  key={index}
                                  href={doc.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center px-3 py-1 bg-indigo-100 text-indigo-700 text-xs rounded-full hover:bg-indigo-200 transition-colors"
                                >
                                  <FileText className="w-3 h-3 mr-1" />
                                  View Specifications
                                  <ExternalLink className="w-3 h-3 ml-1" />
                                </a>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </Card>
                  ))}
                  
                  {getDataBySection('facilities').length === 0 && (
                    <div className="col-span-full text-center py-8">
                      <Building className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">No research facilities available</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default Research