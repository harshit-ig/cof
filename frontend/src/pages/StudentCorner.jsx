import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { GraduationCap, Award, Users, Star, Briefcase, FileText, Calendar, Mail, Phone, MapPin, ChevronRight, Download, AlertCircle } from 'lucide-react'
import Card from '../components/common/Card'
import { getDocumentUrl } from '../services/files'
import LoadingSpinner from '../components/common/LoadingSpinner'
import { studentCornerAPI } from '../services/api'

const StudentCorner = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [admissionGuidelines, setAdmissionGuidelines] = useState([])
  const [scholarshipsFellowships, setScholarshipsFellowships] = useState([])
  const [studentCouncilClubs, setStudentCouncilClubs] = useState([])

  useEffect(() => {
    fetchStudentCornerData()
  }, [])

  const fetchStudentCornerData = async () => {
    try {
      setLoading(true)
      const response = await studentCornerAPI.getAll()
      
      if (response.data.success) {
        const data = response.data.data
        setAdmissionGuidelines(data.admissionGuidelines || [])
        setScholarshipsFellowships(data.scholarships || [])
        setStudentCouncilClubs(data.clubs || [])
      }
    } catch (error) {
      console.error('Error fetching student corner data:', error)
      setError('Failed to load student corner data')
    } finally {
      setLoading(false)
    }
  }

  const EmptySection = ({ title, description, icon: Icon }) => (
    <div className="text-center py-12">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <Icon className="w-8 h-8 text-gray-400" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">No {title} Available</h3>
      <p className="text-gray-500 max-w-md mx-auto">
        {description} Please check back later for updates.
      </p>
    </div>
  )

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
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Something went wrong</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button 
            onClick={fetchStudentCornerData}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }



  return (
    <div className="min-h-screen text-left">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white">
        <div className="container-max section-padding">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Students Corner</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Your comprehensive guide to admissions, scholarships, student life, alumni experiences, 
              and career opportunities at College of Fishery, Jabalpur.
            </p>
          </div>
        </div>
      </section>


      {/* Admission Guidelines */}
      <section id="admission-guidelines" className="section-padding bg-gray-50">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Admission Guidelines</h2>
            <div className="w-20 h-1 bg-blue-400 rounded mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Complete information about admission process, eligibility criteria, required documents, 
              and important dates for B.F.Sc and M.F.Sc programs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {admissionGuidelines.length > 0 ? (
              admissionGuidelines.map((guideline, index) => (
                <Card key={index} className="p-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    {guideline.category && guideline.category.includes('Eligibility') ? 
                      <GraduationCap className="w-6 h-6 text-blue-500" /> :
                      guideline.category && guideline.category.includes('Process') ?
                      <FileText className="w-6 h-6 text-blue-500" /> :
                      guideline.category && guideline.category.includes('Documents') ?
                      <FileText className="w-6 h-6 text-blue-500" /> :
                      <Calendar className="w-6 h-6 text-blue-500" />
                    }
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{guideline.category}</h3>
                  <p className="text-gray-700 mb-4">{guideline.description}</p>
                  
                  <div>
                    <ul className="space-y-2">
                      {guideline.guidelines && guideline.guidelines.map((item, idx) => (
                        <li key={idx} className="flex items-start text-sm text-gray-700">
                          <div className="w-2 h-2 bg-blue-400 rounded-full mr-3 mt-1.5 flex-shrink-0"></div>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  {guideline.filename && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <a
                        href={getDocumentUrl(guideline.filename)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-3 py-2 bg-blue-100 text-blue-700 text-sm rounded-md hover:bg-blue-200 transition-colors"
                      >
                        <FileText className="w-4 h-4 mr-2" />
                        <Download className="w-4 h-4 mr-2" />
                        Download PDF
                      </a>
                    </div>
                  )}
                </Card>
              ))
            ) : (
              <div className="col-span-full">
                <EmptySection 
                  title="Admission Guidelines" 
                  description="Admission guidelines and requirements will be published here." 
                  icon={GraduationCap} 
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Scholarships & Fellowships */}
      <section id="scholarships" className="section-padding bg-white">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Scholarships & Fellowships</h2>
            <div className="w-20 h-1 bg-blue-400 rounded mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Financial assistance programs to support deserving students through scholarships, 
              fellowships, and incentive schemes for academic excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {scholarshipsFellowships.length > 0 ? (
              scholarshipsFellowships.map((scholarship, index) => (
                <Card key={index} className="p-6">
                  <div className="flex items-start space-x-4 mb-4">
                    <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                      <Award className="w-6 h-6 text-yellow-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{scholarship.name}</h3>
                      <div className="grid grid-cols-1 gap-2 text-sm text-gray-600 mb-3">
                        {scholarship.amount && (
                          <div>
                            <span className="font-medium">Amount:</span> {scholarship.amount}
                          </div>
                        )}
                        {scholarship.duration && (
                          <div>
                            <span className="font-medium">Duration:</span> {scholarship.duration}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {scholarship.description && (
                    <p className="text-gray-700 mb-4">{scholarship.description}</p>
                  )}
                  
                  {scholarship.eligibility && (
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Eligibility</h4>
                      <p className="text-sm text-gray-700">{scholarship.eligibility}</p>
                    </div>
                  )}
                  
                  {scholarship.benefits && scholarship.benefits.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Benefits</h4>
                      <ul className="space-y-2">
                        {scholarship.benefits.map((benefit, idx) => (
                          <li key={idx} className="flex items-center text-sm text-gray-700">
                            <ChevronRight className="w-4 h-4 text-yellow-600 mr-2" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {scholarship.filename && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <a
                        href={getDocumentUrl(scholarship.filename)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-3 py-2 bg-yellow-100 text-yellow-700 text-sm rounded-md hover:bg-yellow-200 transition-colors"
                      >
                        <FileText className="w-4 h-4 mr-2" />
                        <Download className="w-4 h-4 mr-2" />
                        Download PDF
                      </a>
                    </div>
                  )}
                </Card>
              ))
            ) : (
              <div className="col-span-full">
                <EmptySection 
                  title="Scholarships" 
                  description="Scholarship and fellowship information will be available here." 
                  icon={Award} 
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Student Council / Clubs */}
      <section id="student-council" className="section-padding bg-gray-50">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Student Council / Clubs</h2>
            <div className="w-20 h-1 bg-blue-400 rounded mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Active student organizations fostering leadership, technical skills, cultural activities, 
              and overall personality development through various clubs and societies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {studentCouncilClubs.length > 0 ? (
              studentCouncilClubs.map((club, index) => (
                <Card key={index} className="p-6">
                  <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center mb-4">
                    <Users className="w-6 h-6 text-secondary-600" />
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{club.name}</h3>
                  {club.role && (
                    <p className="text-sm text-secondary-600 mb-3 font-medium">{club.role}</p>
                  )}
                  {club.description && (
                    <p className="text-gray-700 mb-4">{club.description}</p>
                  )}
                  
                  {club.activities && club.activities.length > 0 && (
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-900 mb-3">Activities</h4>
                      <ul className="space-y-2">
                        {club.activities.map((activity, idx) => (
                          <li key={idx} className="flex items-start text-sm text-gray-700">
                            <div className="w-2 h-2 bg-secondary-500 rounded-full mr-3 mt-2"></div>
                            {activity}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {club.positions && club.positions.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Key Positions</h4>
                      <div className="flex flex-wrap gap-2">
                        {club.positions.map((position, idx) => (
                          <span key={idx} className="px-2 py-1 bg-secondary-100 text-secondary-800 text-xs rounded">
                            {position}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {club.filename && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <a
                        href={getDocumentUrl(club.filename)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-3 py-2 bg-secondary-100 text-secondary-700 text-sm rounded-md hover:bg-secondary-200 transition-colors"
                      >
                        <FileText className="w-4 h-4 mr-2" />
                        <Download className="w-4 h-4 mr-2" />
                        Download PDF
                      </a>
                    </div>
                  )}
                </Card>
              ))
            ) : (
              <div className="col-span-full">
                <EmptySection 
                  title="Student Clubs" 
                  description="Student council and club information will be displayed here." 
                  icon={Users} 
                />
              </div>
            )}
          </div>
        </div>
      </section>


      {/* Call to Action */}
      <section className="section-padding bg-blue-500 text-white">
        <div className="container-max text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Join Our Student Community?</h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Explore admission opportunities, connect with current students, and start your journey 
            towards a successful career in fishery science and aquaculture.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="btn-accent"
            >
              Contact Admission Office
            </Link>
            
            <Link
              to="/academics"
              className="btn-outline border-white text-white hover:bg-white hover:text-blue-500"
            >
              Explore Programs
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default StudentCorner







