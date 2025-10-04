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
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <Section background="bg-blue-600">
        <div className="text-center text-white">
          <Link to="/academics" className="inline-flex items-center text-blue-200 hover:text-white mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to All Programs
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{program.title}</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">{program.overview || program.description}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 max-w-3xl mx-auto">
            <div className="bg-white rounded-lg p-6 text-center shadow-lg">
              <Clock className="w-6 h-6 mx-auto mb-2 text-blue-600" />
              <div className="font-semibold text-gray-700">Duration</div>
              <div className="text-gray-900 font-bold text-lg">{program.duration}</div>
            </div>
            <div className="bg-white rounded-lg p-6 text-center shadow-lg">
              <Users className="w-6 h-6 mx-auto mb-2 text-blue-600" />
              <div className="font-semibold text-gray-700">Seats</div>
              <div className="text-gray-900 font-bold text-lg">{program.intake || program.seats || 'Contact for details'}</div>
            </div>
            <div className="bg-white rounded-lg p-6 text-center shadow-lg">
              <Award className="w-6 h-6 mx-auto mb-2 text-blue-600" />
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
            <Card className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">About the Program</h3>
              <p className="text-gray-700 mb-6">{program.description}</p>
              
              {program.highlights && program.highlights.length > 0 && (
                <>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Program Highlights</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {program.highlights.map((highlight, index) => (
                      <div key={index} className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </Card>
          </div>

          <div className="space-y-6">
            {/* Quick Info */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Information</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration:</span>
                  <span className="font-medium">{program.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Seats:</span>
                  <span className="font-medium">{program.intake || program.seats || 'Contact for details'}</span>
                </div>
                {program.fees && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Annual Fee:</span>
                    <span className="font-medium">
                      {program.fees.total || `₹${program.fees.annual?.toLocaleString() || 'Contact for details'}`}
                    </span>
                  </div>
                )}
              </div>
            </Card>

            {/* Contact */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Need Help?</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Phone className="w-4 h-4 text-blue-600 mr-3" />
                  <span className="text-gray-700">+91-761-2681948</span>
                </div>
                <div className="flex items-center">
                  <Mail className="w-4 h-4 text-blue-600 mr-3" />
                  <span className="text-gray-700">admission@cof.co.in</span>
                </div>
                <button
                  onClick={() => setIsApplicationModalOpen(true)}
                  className="w-full btn-primary text-center"
                >
                  Apply Now
                </button>
                <Link to="/contact" className="w-full btn-outline text-center">
                  Contact Us
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </Section>

      {/* Curriculum */}
      {(program.detailedCurriculum || program.curriculum) && (
        <Section id="curriculum" background="bg-gray-50">
          <SectionHeader title="Curriculum Structure" align="left" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {program.detailedCurriculum ? (
              Object.entries(program.detailedCurriculum).map(([semester, subjects], index) => (
                subjects && subjects.length > 0 && (
                  <Card key={semester} className="p-6">
                    <div className="flex items-center mb-4">
                      <BookOpen className="w-5 h-5 text-blue-600 mr-2" />
                      <h3 className="font-semibold text-gray-900">
                        Semester {index + 1}
                      </h3>
                    </div>
                    <ul className="space-y-2">
                      {subjects.map((subject, idx) => (
                        <li key={idx} className="text-sm text-gray-700">
                          {subject}
                        </li>
                      ))}
                    </ul>
                  </Card>
                )
              ))
            ) : (
              program.curriculum.map((sem, index) => (
                <Card key={index} className="p-6">
                  <div className="flex items-center mb-4">
                    <BookOpen className="w-5 h-5 text-blue-600 mr-2" />
                    <h3 className="font-semibold text-gray-900">
                      {sem.semester || `Semester ${index + 1}`}
                    </h3>
                  </div>
                  <ul className="space-y-2">
                    {sem.subjects.map((subject, idx) => (
                      <li key={idx} className="text-sm text-gray-700">
                        {subject}
                      </li>
                    ))}
                  </ul>
                </Card>
              ))
            )}
          </div>
        </Section>
      )}

      {/* Eligibility & Admission */}
      {program.eligibility && (
        <Section id="admission">
          <SectionHeader title="Eligibility & Admission" align="left" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="p-6">
              <div className="flex items-center mb-4">
                <GraduationCap className="w-6 h-6 text-blue-600 mr-3" />
                <h3 className="text-xl font-semibold text-gray-900">Eligibility Criteria</h3>
              </div>
              <div className="space-y-3">
                {program.eligibility.qualification && (
                  <div>
                    <span className="font-medium text-gray-900">Qualification: </span>
                    <span className="text-gray-700">{program.eligibility.qualification}</span>
                  </div>
                )}
                {program.eligibility.subjects && (
                  <div>
                    <span className="font-medium text-gray-900">Subjects: </span>
                    <span className="text-gray-700">{program.eligibility.subjects}</span>
                  </div>
                )}
                {program.eligibility.percentage && (
                  <div>
                    <span className="font-medium text-gray-900">Percentage: </span>
                    <span className="text-gray-700">{program.eligibility.percentage}</span>
                  </div>
                )}
                {program.eligibility.entrance && (
                  <div>
                    <span className="font-medium text-gray-900">Entrance: </span>
                    <span className="text-gray-700">{program.eligibility.entrance}</span>
                  </div>
                )}
              </div>
            </Card>

            {program.admissionProcess && program.admissionProcess.importantDates && (
              <Card className="p-6">
                <div className="flex items-center mb-4">
                  <Calendar className="w-6 h-6 text-blue-600 mr-3" />
                  <h3 className="text-xl font-semibold text-gray-900">Important Dates</h3>
                </div>
                <div className="space-y-3">
                  {program.admissionProcess.importantDates.map((item, index) => (
                    <div key={index} className="flex justify-between">
                      <span className="text-gray-700">{item.event}</span>
                      <span className="font-medium text-gray-900">{item.date}</span>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>
        </Section>
      )}

      {/* Fee Structure */}
      {program.fees && (
        <Section id="fees" background="bg-gray-50">
          <SectionHeader title="Fee Structure" align="left" />
          <div className="max-w-2xl mx-auto">
            <Card className="p-6">
              <div className="flex items-center mb-6">
                <IndianRupee className="w-6 h-6 text-blue-600 mr-3" />
                <h3 className="text-xl font-semibold text-gray-900">Annual Fees</h3>
              </div>
              <div className="space-y-4">
                {typeof program.fees === 'object' && program.fees !== null ? (
                  Object.entries(program.fees).map(([key, value]) => (
                    value && value !== '' && (
                      <div key={key} className="flex justify-between py-2 border-b border-gray-100 last:border-0">
                        <span className="text-gray-700 capitalize">
                          {key === 'annual' ? 'Annual Fee' : key}:
                        </span>
                        <span className={`font-medium ${key === 'total' || key === 'annual' ? 'text-blue-600 text-lg' : 'text-gray-900'}`}>
                          {typeof value === 'number' ? `₹${value.toLocaleString()}` : String(value)}
                        </span>
                      </div>
                    )
                  ))
                ) : (
                  <div className="text-center text-gray-700">
                    {typeof program.fees === 'string' ? program.fees : 'Contact for fee details'}
                  </div>
                )}
              </div>
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Note:</strong> Fee structure is subject to revision. Additional charges may apply for hostel, mess, and other facilities.
                </p>
              </div>
            </Card>
          </div>
        </Section>
      )}

      {/* Career Opportunities */}
      {program.careerOpportunities && program.careerOpportunities.length > 0 && (
        <Section>
          <SectionHeader title="Career Opportunities" align="left" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {program.careerOpportunities.map((career, index) => (
              <Card key={index} className="p-6 text-center">
                <Briefcase className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900">{career}</h3>
              </Card>
            ))}
          </div>
        </Section>
      )}

      {/* Call to Action */}
      <Section background="bg-blue-600">
        <div className="text-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Apply?</h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Join our prestigious program and embark on a rewarding career in fishery science.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => setIsApplicationModalOpen(true)}
              className="btn-secondary"
            >
              Apply Now
            </button>
            <Link to="/contact" className="btn-outline-white">
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






