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
import { contentAPI } from '../services/api'

const ProgramDetail = () => {
  const { id } = useParams()
  const [program, setProgram] = useState(null)
  const [loading, setLoading] = useState(true)

  // Default program data structure
  const defaultPrograms = {
    'bfsc': {
      id: 'bfsc',
      name: 'Bachelor of Fishery Science (B.F.Sc.)',
      shortName: 'B.F.Sc.',
      duration: '4 Years (8 Semesters)',
      seats: 60,
      overview: 'Comprehensive undergraduate program covering all aspects of fishery science and aquaculture.',
      description: 'The Bachelor of Fishery Science program is designed to provide students with comprehensive knowledge and practical skills in fishery science, aquaculture, and allied fields. Students gain hands-on experience through laboratory work, field visits, and internships.',
      highlights: [
        'Core fishery subjects',
        'Practical training in hatcheries',
        'Field visits and internships',
        'Research project in final year',
        'Industry exposure programs',
        'Placement assistance'
      ],
      curriculum: {
        semester1: [
          'Mathematics and Statistics',
          'Physics',
          'Chemistry',
          'Biology',
          'Introduction to Fisheries',
          'Computer Applications'
        ],
        semester2: [
          'Biochemistry',
          'Cell Biology',
          'Genetics',
          'Ecology',
          'Fish Biology',
          'Aquatic Environment'
        ],
        semester3: [
          'Fish Physiology',
          'Microbiology',
          'Taxonomy',
          'Limnology',
          'Soil Science',
          'Agricultural Extension'
        ],
        semester4: [
          'Fish Nutrition',
          'Fish Pathology',
          'Aquaculture Engineering',
          'Fish Breeding and Genetics',
          'Fishery Statistics',
          'Economics'
        ],
        semester5: [
          'Aquaculture',
          'Fish Processing Technology',
          'Fishery Resource Management',
          'Fish Feed Technology',
          'Fishery Economics',
          'Research Methodology'
        ],
        semester6: [
          'Marine Fisheries',
          'Inland Fisheries',
          'Ornamental Fisheries',
          'Fishery Extension',
          'Fishery Legislation',
          'Entrepreneurship Development'
        ],
        semester7: [
          'Fishery Management',
          'Fish Health Management',
          'Fishery Project Planning',
          'Industrial Training',
          'Seminar',
          'Research Project'
        ],
        semester8: [
          'Advanced Aquaculture',
          'Fishery Business Management',
          'Research Project Completion',
          'Comprehensive Viva',
          'Practical Training',
          'Dissertation'
        ]
      },
      eligibility: {
        qualification: '10+2 or equivalent',
        subjects: 'Physics, Chemistry, Biology/Mathematics',
        percentage: '50% aggregate marks',
        age: 'No age limit',
        additional: 'Valid JEE/NEET/State Entrance Test score'
      },
      fees: {
        tuition: '₹50,000 per year',
        hostel: '₹25,000 per year',
        mess: '₹30,000 per year',
        other: '₹10,000 per year',
        total: '₹1,15,000 per year'
      },
      career: [
        'Fishery Officer',
        'Aquaculture Manager',
        'Fish Farm Consultant',
        'Research Assistant',
        'Extension Officer',
        'Quality Control Officer',
        'Fish Feed Technologist',
        'Hatchery Manager',
        'Fish Processing Technologist',
        'Fishery Entrepreneur'
      ],
      facilities: [
        'Well-equipped laboratories',
        'Fish culture ponds',
        'Hatchery facilities',
        'Library with latest books and journals',
        'Computer lab with internet',
        'Hostel accommodation',
        'Sports facilities',
        'Medical facilities'
      ],
      admission: {
        process: 'Entrance Test + Counseling',
        application: 'Online application process',
        documents: [
          '10th & 12th Mark sheets',
          'Transfer Certificate',
          'Character Certificate',
          'Caste Certificate (if applicable)',
          'Income Certificate (if applicable)',
          'Medical Certificate',
          'Passport size photographs'
        ],
        importantDates: [
          { event: 'Application Start', date: 'March 1, 2025' },
          { event: 'Application End', date: 'May 15, 2025' },
          { event: 'Entrance Test', date: 'June 10, 2025' },
          { event: 'Result Declaration', date: 'June 25, 2025' },
          { event: 'Counseling Start', date: 'July 1, 2025' },
          { event: 'Classes Begin', date: 'August 1, 2025' }
        ]
      }
    },
    'mfsc-aquaculture': {
      id: 'mfsc-aquaculture',
      name: 'Master of Fishery Science (M.F.Sc.) - Aquaculture',
      shortName: 'M.F.Sc. (Aquaculture)',
      duration: '2 Years (4 Semesters)',
      seats: 15,
      overview: 'Advanced specialization in aquaculture techniques and management.',
      description: 'The Master of Fishery Science in Aquaculture is an advanced program designed for students who want to specialize in aquaculture research and development. The program focuses on cutting-edge aquaculture technologies, sustainable farming practices, and research methodologies.',
      highlights: [
        'Advanced aquaculture methods',
        'Research methodology',
        'Thesis work',
        'Industry collaboration',
        'International exposure',
        'Publication opportunities'
      ],
      eligibility: {
        qualification: 'B.F.Sc. or B.Sc. in relevant field',
        percentage: '60% aggregate marks',
        entrance: 'Valid ICAR-AIEEA (PG) score',
        additional: 'Work experience preferred'
      },
      fees: {
        tuition: '₹30,000 per year',
        total: '₹60,000 for 2 years'
      },
      career: [
        'Research Scientist',
        'Assistant Professor',
        'Senior Aquaculture Manager',
        'Consultant',
        'Project Manager'
      ]
    }
  }

  useEffect(() => {
    fetchProgramDetails()
  }, [id])

  const fetchProgramDetails = async () => {
    try {
      setLoading(true)
      
      // Try to fetch from API first
      const response = await contentAPI.getByKey(`program-details-${id}`)
      
      if (response.data.success && response.data.data.content) {
        const programData = JSON.parse(response.data.data.content.content)
        setProgram(programData)
      } else {
        // Fall back to default data
        const defaultProgram = defaultPrograms[id]
        if (defaultProgram) {
          setProgram(defaultProgram)
        } else {
          setProgram(null)
        }
      }
    } catch (error) {
      console.error('Error fetching program details:', error)
      // Use default data
      const defaultProgram = defaultPrograms[id]
      if (defaultProgram) {
        setProgram(defaultProgram)
      } else {
        setProgram(null)
      }
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <LoadingSpinner />
  }

  if (!program) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Section>
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Program Not Found</h1>
            <p className="text-gray-600 mb-6">The program you're looking for doesn't exist.</p>
            <Link to="/programs" className="btn-primary">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Programs
            </Link>
          </div>
        </Section>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <Section background="bg-blue-600">
        <div className="text-center text-white">
          <Link to="/programs" className="inline-flex items-center text-blue-200 hover:text-white mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to All Programs
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{program.name}</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">{program.overview}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 max-w-3xl mx-auto">
            <div className="bg-white bg-opacity-10 rounded-lg p-4">
              <Clock className="w-6 h-6 mx-auto mb-2" />
              <div className="font-semibold">Duration</div>
              <div className="text-blue-100">{program.duration}</div>
            </div>
            <div className="bg-white bg-opacity-10 rounded-lg p-4">
              <Users className="w-6 h-6 mx-auto mb-2" />
              <div className="font-semibold">Seats</div>
              <div className="text-blue-100">{program.seats}</div>
            </div>
            <div className="bg-white bg-opacity-10 rounded-lg p-4">
              <Award className="w-6 h-6 mx-auto mb-2" />
              <div className="font-semibold">Degree</div>
              <div className="text-blue-100">{program.shortName}</div>
            </div>
          </div>
        </div>
      </Section>

      {/* Quick Actions */}
      <Section background="bg-white">
        <div className="flex flex-wrap gap-4 justify-center">
          <a href="#curriculum" className="btn-primary">View Curriculum</a>
          <a href="#admission" className="btn-outline">Admission Process</a>
          <a href="#fees" className="btn-outline">Fee Structure</a>
          <Link to="/contact" className="btn-outline">Contact Us</Link>
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
              
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Program Highlights</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {program.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{highlight}</span>
                  </div>
                ))}
              </div>
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
                  <span className="font-medium">{program.seats}</span>
                </div>
                {program.fees && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Annual Fee:</span>
                    <span className="font-medium">{program.fees.total}</span>
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
                <Link to="/contact" className="w-full btn-primary text-center">
                  Contact Admission Office
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </Section>

      {/* Curriculum */}
      {program.curriculum && (
        <Section id="curriculum" background="bg-gray-50">
          <SectionHeader title="Curriculum Structure" align="left" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(program.curriculum).map(([semester, subjects], index) => (
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
            ))}
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
                <div>
                  <span className="font-medium text-gray-900">Qualification: </span>
                  <span className="text-gray-700">{program.eligibility.qualification}</span>
                </div>
                {program.eligibility.subjects && (
                  <div>
                    <span className="font-medium text-gray-900">Subjects: </span>
                    <span className="text-gray-700">{program.eligibility.subjects}</span>
                  </div>
                )}
                <div>
                  <span className="font-medium text-gray-900">Percentage: </span>
                  <span className="text-gray-700">{program.eligibility.percentage}</span>
                </div>
                {program.eligibility.entrance && (
                  <div>
                    <span className="font-medium text-gray-900">Entrance: </span>
                    <span className="text-gray-700">{program.eligibility.entrance}</span>
                  </div>
                )}
              </div>
            </Card>

            {program.admission && (
              <Card className="p-6">
                <div className="flex items-center mb-4">
                  <Calendar className="w-6 h-6 text-blue-600 mr-3" />
                  <h3 className="text-xl font-semibold text-gray-900">Important Dates</h3>
                </div>
                <div className="space-y-3">
                  {program.admission.importantDates.map((item, index) => (
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
                {Object.entries(program.fees).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-2 border-b border-gray-100 last:border-0">
                    <span className="text-gray-700 capitalize">
                      {key === 'total' ? 'Total Annual Fee' : key}:
                    </span>
                    <span className={`font-medium ${key === 'total' ? 'text-blue-600 text-lg' : 'text-gray-900'}`}>
                      {value}
                    </span>
                  </div>
                ))}
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
      {program.career && (
        <Section>
          <SectionHeader title="Career Opportunities" align="left" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {program.career.map((career, index) => (
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
            <Link to="/student-corner" className="btn-secondary">
              Start Application
            </Link>
            <Link to="/contact" className="btn-outline-white">
              Contact Admissions
            </Link>
          </div>
        </div>
      </Section>
    </div>
  )
}

export default ProgramDetail






