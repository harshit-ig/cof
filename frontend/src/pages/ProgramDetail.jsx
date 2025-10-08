import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { 
  BookOpen, 
  Users, 
  Clock, 
  Award, 
  CheckCircle, 
  ArrowLeft, 
  Calendar,
  IndianRupee,
  GraduationCap,
  Briefcase,
  FileText,
  Globe,
  Mail,
  Phone
} from 'lucide-react'
import Card from '../components/common/Card'
import Section, { SectionHeader } from '../components/common/Section'
import LoadingSpinner from '../components/common/LoadingSpinner'
import ApplicationModal from '../components/common/ApplicationModal'
import { programsAPI } from '../services/api'

const ProgramDetail = () => {
  const { slug } = useParams()
  const [program, setProgram] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false)

  useEffect(() => {
    fetchProgramDetails()
  }, [slug])

  const fetchProgramDetails = async () => {
    try {
      setLoading(true)
      setError(null)
      
      console.log('Fetching program details for slug:', slug)
      
      // First try to fetch by slug
      let response;
      try {
        response = await programsAPI.getBySlug(slug)
      } catch (slugError) {
        // If slug fails, try by ID (backward compatibility)
        console.log('Slug fetch failed, trying by ID:', slugError.message)
        response = await programsAPI.getById(slug)
      }
      
      if (response.data.success && response.data.data) {
        setProgram(response.data.data)
      } else {
        setError('Program not found')
      }
    } catch (error) {
      console.error('Error fetching program details:', error)
      setError('Failed to load program details')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <LoadingSpinner />
  }

  if (error || !program) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Section>
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Program Not Found</h1>
            <p className="text-gray-600 mb-6">{error || "The program you're looking for doesn't exist."}</p>
            <Link to="/academics" className="btn-primary">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Programs
            </Link>
          </div>
        </Section>
      </div>
    )
  }

  // Helper function to safely get nested values
  const safeGet = (obj, path, defaultValue = '') => {
    return path.split('.').reduce((current, key) => current && current[key], obj) || defaultValue
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 text-left relative overflow-hidden">
      {/* Floating background elements */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-blue-400/20 to-indigo-500/20 rounded-full animate-float"></div>
      <div className="absolute top-40 right-32 w-24 h-24 bg-gradient-to-r from-purple-400/15 to-blue-500/15 rounded-full animate-float" style={{animationDelay: '1s'}}></div>
      <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-gradient-to-r from-indigo-400/20 to-purple-500/20 rounded-full animate-float" style={{animationDelay: '2s'}}></div>
      <div className="absolute bottom-20 right-20 w-16 h-16 bg-gradient-to-r from-blue-400/15 to-indigo-500/15 rounded-full animate-float" style={{animationDelay: '0.5s'}}></div>

      {/* Hero Section */}
      <Section background="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 relative overflow-hidden">
        {/* Hero floating elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-float"></div>
        <div className="absolute top-20 right-20 w-16 h-16 bg-white/10 rounded-full animate-float" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-10 left-1/3 w-24 h-24 bg-white/10 rounded-full animate-float" style={{animationDelay: '2s'}}></div>
        
        <div className="text-center text-white relative z-10">
          <Link to="/academics" className="inline-flex items-center text-blue-200 hover:text-white mb-4 transition-colors duration-300">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to All Programs
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{program.title}</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">{program.overview || program.description}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 max-w-3xl mx-auto">
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 text-center shadow-xl border border-blue-200/50 hover:scale-105 transition-transform duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-200 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-md">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
              <div className="font-semibold text-gray-700">Duration</div>
              <div className="text-gray-900 font-bold text-lg">{program.duration}</div>
            </div>
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 text-center shadow-xl border border-indigo-200/50 hover:scale-105 transition-transform duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-100 to-purple-200 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-md">
                <Users className="w-6 h-6 text-indigo-600" />
              </div>
              <div className="font-semibold text-gray-700">Seats</div>
              <div className="text-gray-900 font-bold text-lg">{program.intake || program.seats || 'Contact for details'}</div>
            </div>
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 text-center shadow-xl border border-purple-200/50 hover:scale-105 transition-transform duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-blue-200 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-md">
                <Award className="w-6 h-6 text-purple-600" />
              </div>
              <div className="font-semibold text-gray-700">Degree</div>
              <div className="text-gray-900 font-bold text-lg">{program.shortName || program.level}</div>
            </div>
          </div>
        </div>
      </Section>

      {/* Program Overview */}
      <Section>
        <SectionHeader title="Program Overview" align="left" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 border border-blue-100/50 group relative overflow-hidden">
              <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-blue-400/20 to-indigo-500/20 rounded-full transform -translate-x-10 -translate-y-10 group-hover:scale-110 transition-transform duration-300"></div>
              <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-indigo-400/15 to-blue-500/15 rounded-full transform translate-x-12 translate-y-12 group-hover:scale-110 transition-transform duration-300"></div>
              
              <div className="relative z-10">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">About the Program</h3>
                <p className="text-gray-700 mb-6">{program.description}</p>
                
                {program.highlights && program.highlights.length > 0 && (
                  <>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Program Highlights</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {program.highlights.map((highlight, index) => (
                        <div key={index} className="flex items-center bg-gradient-to-r from-blue-50 to-indigo-50 p-3 rounded-lg border border-blue-200/50">
                          <CheckCircle className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0" />
                          <span className="text-gray-700">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {/* Quick Info */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border border-green-100/50 group relative overflow-hidden">
              <div className="absolute top-0 left-0 w-16 h-16 bg-gradient-to-br from-green-400/20 to-emerald-500/20 rounded-full transform -translate-x-8 -translate-y-8 group-hover:scale-110 transition-transform duration-300"></div>
              <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-emerald-400/15 to-green-500/15 rounded-full transform translate-x-10 translate-y-10 group-hover:scale-110 transition-transform duration-300"></div>
              
              <div className="relative z-10">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Information</h3>
                <div className="space-y-3">
                  <div className="flex justify-between bg-gradient-to-r from-green-50 to-emerald-50 p-3 rounded-lg border border-green-200/50">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-medium">{program.duration}</span>
                  </div>
                  <div className="flex justify-between bg-gradient-to-r from-emerald-50 to-teal-50 p-3 rounded-lg border border-emerald-200/50">
                    <span className="text-gray-600">Seats:</span>
                    <span className="font-medium">{program.intake || program.seats || 'Contact for details'}</span>
                  </div>
                  {program.fees && (
                    <div className="flex justify-between bg-gradient-to-r from-teal-50 to-green-50 p-3 rounded-lg border border-teal-200/50">
                      <span className="text-gray-600">Annual Fee:</span>
                      <span className="font-medium">
                        {program.fees.total || `₹${program.fees.annual?.toLocaleString() || 'Contact for details'}`}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Contact */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border border-purple-100/50 group relative overflow-hidden">
              <div className="absolute top-0 left-0 w-16 h-16 bg-gradient-to-br from-purple-400/20 to-pink-500/20 rounded-full transform -translate-x-8 -translate-y-8 group-hover:scale-110 transition-transform duration-300"></div>
              <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-pink-400/15 to-purple-500/15 rounded-full transform translate-x-10 translate-y-10 group-hover:scale-110 transition-transform duration-300"></div>
              
              <div className="relative z-10">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Need Help?</h3>
                <div className="space-y-3">
                  <div className="flex items-center bg-gradient-to-r from-purple-50 to-pink-50 p-3 rounded-lg border border-purple-200/50">
                    <Phone className="w-4 h-4 text-purple-600 mr-3" />
                    <span className="text-gray-700">+91-761-2681948</span>
                  </div>
                  <div className="flex items-center bg-gradient-to-r from-pink-50 to-purple-50 p-3 rounded-lg border border-pink-200/50">
                    <Mail className="w-4 h-4 text-pink-600 mr-3" />
                    <span className="text-gray-700">admission@cof.co.in</span>
                  </div>
                  <button
                    onClick={() => setIsApplicationModalOpen(true)}
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl py-3 font-semibold hover:from-purple-600 hover:to-pink-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
                  >
                    Apply Now
                  </button>
                  <Link to="/contact" className="w-full block text-center py-3 bg-white text-gray-700 border-2 border-gray-200 rounded-xl font-semibold hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105">
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Curriculum */}
      {(program.detailedCurriculum || program.curriculum) && (
        <Section id="curriculum" background="bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 relative overflow-hidden">
          {/* Section floating elements */}
          <div className="absolute top-10 left-10 w-16 h-16 bg-gradient-to-r from-blue-400/20 to-indigo-500/20 rounded-full animate-float"></div>
          <div className="absolute bottom-10 right-10 w-20 h-20 bg-gradient-to-r from-indigo-400/15 to-blue-500/15 rounded-full animate-float" style={{animationDelay: '1s'}}></div>
          
          <div className="relative z-10">
            <SectionHeader title="Curriculum Structure" align="left" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {program.detailedCurriculum ? (
                Object.entries(program.detailedCurriculum).map(([semester, subjects], index) => (
                  subjects && subjects.length > 0 && (
                    <div key={semester} className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border border-blue-100/50 group hover:scale-105 relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-16 h-16 bg-gradient-to-br from-blue-400/20 to-indigo-500/20 rounded-full transform -translate-x-8 -translate-y-8 group-hover:scale-110 transition-transform duration-300"></div>
                      <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-indigo-400/15 to-blue-500/15 rounded-full transform translate-x-10 translate-y-10 group-hover:scale-110 transition-transform duration-300"></div>
                      
                      <div className="relative z-10">
                        <div className="flex items-center mb-4">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-indigo-200 rounded-xl flex items-center justify-center mr-3 shadow-md">
                            <BookOpen className="w-5 h-5 text-blue-600" />
                          </div>
                          <h3 className="font-semibold text-gray-900">
                            Semester {index + 1}
                          </h3>
                        </div>
                        <ul className="space-y-2">
                          {subjects.map((subject, idx) => (
                            <li key={idx} className="text-sm text-gray-700 bg-gradient-to-r from-blue-50 to-indigo-50 p-2 rounded-lg border border-blue-200/50">
                              {subject}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )
                ))
              ) : (
                program.curriculum.map((sem, index) => (
                  <div key={index} className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border border-indigo-100/50 group hover:scale-105 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-16 h-16 bg-gradient-to-br from-indigo-400/20 to-purple-500/20 rounded-full transform -translate-x-8 -translate-y-8 group-hover:scale-110 transition-transform duration-300"></div>
                    <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-purple-400/15 to-indigo-500/15 rounded-full transform translate-x-10 translate-y-10 group-hover:scale-110 transition-transform duration-300"></div>
                    
                    <div className="relative z-10">
                      <div className="flex items-center mb-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-indigo-100 to-purple-200 rounded-xl flex items-center justify-center mr-3 shadow-md">
                          <BookOpen className="w-5 h-5 text-indigo-600" />
                        </div>
                        <h3 className="font-semibold text-gray-900">
                          {sem.semester || `Semester ${index + 1}`}
                        </h3>
                      </div>
                      <ul className="space-y-2">
                        {sem.subjects.map((subject, idx) => (
                          <li key={idx} className="text-sm text-gray-700 bg-gradient-to-r from-indigo-50 to-purple-50 p-2 rounded-lg border border-indigo-200/50">
                            {subject}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </Section>
      )}

      {/* Eligibility & Admission */}
      {program.eligibility && (
        <Section id="admission">
          <SectionHeader title="Eligibility & Admission" align="left" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 border border-green-100/50 group relative overflow-hidden">
              <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-green-400/20 to-emerald-500/20 rounded-full transform -translate-x-10 -translate-y-10 group-hover:scale-110 transition-transform duration-300"></div>
              <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-emerald-400/15 to-green-500/15 rounded-full transform translate-x-12 translate-y-12 group-hover:scale-110 transition-transform duration-300"></div>
              
              <div className="relative z-10">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-emerald-200 rounded-xl flex items-center justify-center mr-4 shadow-md">
                    <GraduationCap className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Eligibility Criteria</h3>
                </div>
                <div className="space-y-4">
                  {program.eligibility.qualification && (
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border border-green-200/50">
                      <span className="font-medium text-green-700">Qualification: </span>
                      <span className="text-gray-700">{program.eligibility.qualification}</span>
                    </div>
                  )}
                  {program.eligibility.subjects && (
                    <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-4 rounded-lg border border-emerald-200/50">
                      <span className="font-medium text-emerald-700">Subjects: </span>
                      <span className="text-gray-700">{program.eligibility.subjects}</span>
                    </div>
                  )}
                  {program.eligibility.percentage && (
                    <div className="bg-gradient-to-r from-teal-50 to-green-50 p-4 rounded-lg border border-teal-200/50">
                      <span className="font-medium text-teal-700">Percentage: </span>
                      <span className="text-gray-700">{program.eligibility.percentage}</span>
                    </div>
                  )}
                  {program.eligibility.entrance && (
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border border-green-200/50">
                      <span className="font-medium text-green-700">Entrance: </span>
                      <span className="text-gray-700">{program.eligibility.entrance}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {program.admissionProcess && program.admissionProcess.importantDates && (
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 border border-blue-100/50 group relative overflow-hidden">
                <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-blue-400/20 to-indigo-500/20 rounded-full transform -translate-x-10 -translate-y-10 group-hover:scale-110 transition-transform duration-300"></div>
                <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-indigo-400/15 to-blue-500/15 rounded-full transform translate-x-12 translate-y-12 group-hover:scale-110 transition-transform duration-300"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-200 rounded-xl flex items-center justify-center mr-4 shadow-md">
                      <Calendar className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">Important Dates</h3>
                  </div>
                  <div className="space-y-3">
                    {program.admissionProcess.importantDates.map((item, index) => (
                      <div key={index} className="flex justify-between bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200/50">
                        <span className="text-gray-700 font-medium">{item.event}</span>
                        <span className="font-semibold text-blue-600">{item.date}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </Section>
      )}

      {/* Fee Structure */}
      {program.fees && (
        <Section id="fees" background="bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 relative overflow-hidden">
          {/* Section floating elements */}
          <div className="absolute top-10 left-10 w-16 h-16 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-full animate-float"></div>
          <div className="absolute bottom-10 right-10 w-20 h-20 bg-gradient-to-r from-orange-400/15 to-red-500/15 rounded-full animate-float" style={{animationDelay: '1s'}}></div>
          
          <div className="relative z-10">
            <SectionHeader title="Fee Structure" align="left" />
            <div className="max-w-2xl mx-auto">
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 border border-yellow-100/50 group relative overflow-hidden">
                <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-yellow-400/20 to-orange-500/20 rounded-full transform -translate-x-10 -translate-y-10 group-hover:scale-110 transition-transform duration-300"></div>
                <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-orange-400/15 to-red-500/15 rounded-full transform translate-x-12 translate-y-12 group-hover:scale-110 transition-transform duration-300"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-yellow-100 to-orange-200 rounded-xl flex items-center justify-center mr-4 shadow-md">
                      <IndianRupee className="w-6 h-6 text-yellow-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">Annual Fees</h3>
                  </div>
                  <div className="space-y-4">
                    {typeof program.fees === 'object' && program.fees !== null ? (
                      Object.entries(program.fees).map(([key, value]) => (
                        value && value !== '' && (
                          <div key={key} className="flex justify-between py-3 px-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200/50">
                            <span className="text-gray-700 capitalize font-medium">
                              {key === 'annual' ? 'Annual Fee' : key}:
                            </span>
                            <span className={`font-bold ${key === 'total' || key === 'annual' ? 'text-orange-600 text-lg' : 'text-gray-900'}`}>
                              {typeof value === 'number' ? `₹${value.toLocaleString()}` : String(value)}
                            </span>
                          </div>
                        )
                      ))
                    ) : (
                      <div className="text-center text-gray-700 bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-lg border border-yellow-200/50">
                        {typeof program.fees === 'string' ? program.fees : 'Contact for fee details'}
                      </div>
                    )}
                  </div>
                  <div className="mt-6 p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl border border-orange-200/50">
                    <p className="text-sm text-orange-800">
                      <strong>Note:</strong> Fee structure is subject to revision. Additional charges may apply for hostel, mess, and other facilities.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Section>
      )}

      {/* Career Opportunities */}
      {program.careerOpportunities && program.careerOpportunities.length > 0 && (
        <Section>
          <SectionHeader title="Career Opportunities" align="left" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {program.careerOpportunities.map((career, index) => (
              <div key={index} className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 text-center border border-purple-100/50 group hover:scale-105 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-16 h-16 bg-gradient-to-br from-purple-400/20 to-pink-500/20 rounded-full transform -translate-x-8 -translate-y-8 group-hover:scale-110 transition-transform duration-300"></div>
                <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-pink-400/15 to-purple-500/15 rounded-full transform translate-x-10 translate-y-10 group-hover:scale-110 transition-transform duration-300"></div>
                
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-200 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md group-hover:shadow-lg transition-shadow duration-300">
                    <Briefcase className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors duration-300">{career}</h3>
                </div>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Call to Action */}
      <Section background="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 relative overflow-hidden">
        {/* CTA floating elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-float"></div>
        <div className="absolute top-20 right-20 w-16 h-16 bg-white/10 rounded-full animate-float" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-10 left-1/3 w-24 h-24 bg-white/10 rounded-full animate-float" style={{animationDelay: '2s'}}></div>
        
        <div className="text-center text-white relative z-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Apply?</h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Join our prestigious program and embark on a rewarding career in fishery science.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => setIsApplicationModalOpen(true)}
              className="px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Apply Now
            </button>
            <Link to="/contact" className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
              Contact Admissions
            </Link>
          </div>
        </div>
      </Section>

      {/* Application Modal */}
      <ApplicationModal
        isOpen={isApplicationModalOpen}
        onClose={() => setIsApplicationModalOpen(false)}
        programName={program?.name || program?.title}
        programId={program?._id}
      />
    </div>
  )
}

export default ProgramDetail






