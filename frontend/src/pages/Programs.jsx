import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { BookOpen, Users, Award, Calendar, Clock, MapPin, Phone, Mail, ChevronRight, Download, ExternalLink } from 'lucide-react'
import Card from '../components/common/Card'

const Programs = () => {
  const [activeTab, setActiveTab] = useState('undergraduate')

  const programs = {
    undergraduate: [
      {
        id: 'bfsc',
        name: 'Bachelor of Fisheries Science (B.F.Sc.)',
        duration: '4 Years (8 Semesters)',
        seats: 60,
        description: 'Comprehensive undergraduate program covering all aspects of fisheries science and aquaculture.',
        highlights: [
          'Core fisheries subjects',
          'Practical training in hatcheries',
          'Field visits and internships',
          'Research project in final year'
        ],
        subjects: [
          'Fish Biology & Physiology',
          'Aquaculture Engineering',
          'Fish Nutrition & Feed Technology',
          'Fish Processing Technology',
          'Fisheries Economics & Extension',
          'Aquatic Environment Management'
        ],
        career: [
          'Fisheries Officer',
          'Aquaculture Manager',
          'Fish Farm Consultant',
          'Research Assistant',
          'Extension Officer'
        ]
      }
    ],
    postgraduate: [
      {
        id: 'mfsc-aquaculture',
        name: 'Master of Fisheries Science (M.F.Sc.) - Aquaculture',
        duration: '2 Years (4 Semesters)',
        seats: 15,
        description: 'Advanced specialization in aquaculture techniques and management.',
        highlights: [
          'Advanced aquaculture methods',
          'Research methodology',
          'Thesis work',
          'Industry collaboration'
        ],
        subjects: [
          'Advanced Aquaculture Systems',
          'Aquaculture Biotechnology',
          'Aquaculture Economics',
          'Research Methods in Fisheries',
          'Seminar & Thesis'
        ],
        career: [
          'Aquaculture Specialist',
          'Research Scientist',
          'Project Manager',
          'Academic Faculty',
          'Industry Consultant'
        ]
      },
      {
        id: 'mfsc-fish-health',
        name: 'Master of Fisheries Science (M.F.Sc.) - Fish Health Management',
        duration: '2 Years (4 Semesters)',
        seats: 15,
        description: 'Specialized program in aquatic animal health and disease management.',
        highlights: [
          'Disease diagnosis techniques',
          'Preventive health measures',
          'Laboratory skills',
          'Field research'
        ],
        subjects: [
          'Fish Pathology',
          'Aquatic Animal Health',
          'Disease Prevention',
          'Laboratory Diagnostics',
          'Seminar & Thesis'
        ],
        career: [
          'Fish Health Specialist',
          'Diagnostic Lab Manager',
          'Health Consultant',
          'Research Scientist',
          'Regulatory Officer'
        ]
      }
    ],
    doctoral: [
      {
        id: 'phd-fisheries',
        name: 'Doctor of Philosophy (Ph.D.) in Fisheries Science',
        duration: '3-5 Years',
        seats: 10,
        description: 'Research-oriented doctoral program for advanced studies in fisheries science.',
        highlights: [
          'Original research work',
          'Publication requirements',
          'International exposure',
          'Academic leadership'
        ],
        specializations: [
          'Aquaculture & Fisheries',
          'Fish Health & Disease',
          'Fisheries Economics',
          'Aquatic Environment',
          'Fish Processing Technology'
        ],
        career: [
          'University Professor',
          'Research Director',
          'Policy Advisor',
          'Industry Expert',
          'International Consultant'
        ]
      }
    ]
  }

  const admissionInfo = {
    eligibility: {
      bfsc: '10+2 with Biology/Mathematics/Agriculture (50% marks)',
      mfsc: 'B.F.Sc. or B.Sc. in relevant field (60% marks)',
      phd: 'M.F.Sc. or M.Sc. in relevant field (65% marks)'
    },
    process: [
      'Online application submission',
      'Document verification',
      'Entrance examination',
      'Counseling and seat allocation',
      'Document submission and fee payment'
    ],
    documents: [
      'Mark sheets and certificates',
      'Transfer certificate',
      'Character certificate',
      'Caste certificate (if applicable)',
      'Income certificate (if applicable)',
      'Passport size photographs'
    ]
  }

  const feesStructure = {
    bfsc: {
      tuition: '₹15,000 per semester',
      other: '₹5,000 per semester',
      total: '₹20,000 per semester',
      hostel: '₹8,000 per semester'
    },
    mfsc: {
      tuition: '₹20,000 per semester',
      other: '₹7,000 per semester',
      total: '₹27,000 per semester',
      hostel: '₹8,000 per semester'
    },
    phd: {
      tuition: '₹25,000 per semester',
      other: '₹10,000 per semester',
      total: '₹35,000 per semester',
      hostel: '₹8,000 per semester'
    }
  }

  const academicCalendar = [
    {
      month: 'July',
      events: ['Academic session begins', 'Orientation program', 'Classes commence']
    },
    {
      month: 'September',
      events: ['Mid-semester examinations', 'Research presentations']
    },
    {
      month: 'December',
      events: ['End semester examinations', 'Winter break']
    },
    {
      month: 'January',
      events: ['New semester begins', 'Practical training starts']
    },
    {
      month: 'March',
      events: ['Mid-semester examinations', 'Field visits']
    },
    {
      month: 'May',
      events: ['End semester examinations', 'Summer break', 'Internship period']
    }
  ]

  const AcademicPlaceholder = ({ title }) => (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-8 text-center my-8">
      <h2 className="text-2xl font-bold text-blue-900 mb-2">{title}</h2>
      <div className="w-16 h-1 bg-yellow-500 rounded mx-auto mb-4"></div>
      <p className="text-gray-700 mb-2">Information about {title.toLowerCase()} will be updated soon.</p>
      <p className="text-blue-800 font-medium">Content coming soon. Please check back later.</p>
    </div>
  );

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600 text-white">
        <div className="container-max section-padding">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Academic Information</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Explore our comprehensive range of fisheries science programs and academic details.
            </p>
          </div>
        </div>
      </section>

      {/* Academic Programmes */}
      <section id="academic-programmes" className="section-padding bg-white">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Academic Programmes</h2>
            <div className="w-20 h-1 bg-primary-500 rounded mx-auto"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mt-4">Undergraduate, Postgraduate, and Doctoral programs in Fisheries Science.</p>
          </div>
          {/* Program Tabs and Details (reuse existing tab logic) */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <button
              onClick={() => setActiveTab('undergraduate')}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                activeTab === 'undergraduate'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Undergraduate
            </button>
            <button
              onClick={() => setActiveTab('postgraduate')}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                activeTab === 'postgraduate'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Postgraduate
            </button>
            <button
              onClick={() => setActiveTab('doctoral')}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                activeTab === 'doctoral'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Doctoral
            </button>
          </div>

          {/* Program Details */}
          <div className="space-y-8">
            {programs[activeTab].map((program) => (
              <Card key={program.id} className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Program Overview */}
                  <div className="lg:col-span-2">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">{program.name}</h2>
                    <p className="text-gray-700 leading-relaxed mb-6">{program.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div className="flex items-center space-x-3">
                        <Clock className="w-5 h-5 text-primary-600" />
                        <div>
                          <p className="font-semibold text-gray-900">Duration</p>
                          <p className="text-gray-600">{program.duration}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <Users className="w-5 h-5 text-primary-600" />
                        <div>
                          <p className="font-semibold text-gray-900">Seats Available</p>
                          <p className="text-gray-600">{program.seats}</p>
                        </div>
                      </div>
                    </div>

                    {/* Program Highlights */}
                    <div className="mb-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">Program Highlights</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {program.highlights.map((highlight, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                            <span className="text-gray-700">{highlight}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Core Subjects */}
                    <div className="mb-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">Core Subjects</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {program.subjects.map((subject, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <BookOpen className="w-4 h-4 text-primary-600" />
                            <span className="text-gray-700">{subject}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Career Opportunities */}
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">Career Opportunities</h3>
                      <div className="flex flex-wrap gap-2">
                        {program.career.map((career, index) => (
                          <span key={index} className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm">
                            {career}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Program Actions */}
                  <div className="space-y-4">
                    <Card className="p-6 bg-primary-50 border-primary-200">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                      <div className="space-y-3">
                        <button className="w-full btn-primary">
                          Apply Now
                        </button>
                        <button className="w-full btn-outline">
                          Download Brochure
                        </button>
                        <Link
                          to={`/programs/${program.id}`}
                          className="w-full btn-ghost text-center"
                        >
                          Learn More
                          <ChevronRight className="w-4 h-4 ml-2 inline" />
                        </Link>
                      </div>
                    </Card>

                    {program.specializations && (
                      <Card className="p-6 bg-secondary-50 border-secondary-200">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Specializations</h3>
                        <div className="space-y-2">
                          {program.specializations.map((spec, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <div className="w-2 h-2 bg-secondary-500 rounded-full"></div>
                              <span className="text-gray-700 text-sm">{spec}</span>
                            </div>
                          ))}
                        </div>
                      </Card>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Admission Eligibility */}
      <section id="admission-eligibility" className="section-padding bg-gray-50">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Admission Eligibility</h2>
            <div className="w-20 h-1 bg-primary-500 rounded mx-auto"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mt-4">Eligibility criteria for B.F.Sc., M.F.Sc., and Ph.D. programs.</p>
          </div>
          {/* Eligibility Details (reuse existing eligibility code) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Eligibility */}
            <Card>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Eligibility Criteria</h3>
              <div className="space-y-4">
                <div className="border-l-4 border-primary-500 pl-4">
                  <h4 className="font-semibold text-gray-900 mb-2">B.F.Sc.</h4>
                  <p className="text-gray-700">{admissionInfo.eligibility.bfsc}</p>
                </div>
                <div className="border-l-4 border-secondary-500 pl-4">
                  <h4 className="font-semibold text-gray-900 mb-2">M.F.Sc.</h4>
                  <p className="text-gray-700">{admissionInfo.eligibility.mfsc}</p>
                </div>
                <div className="border-l-4 border-accent-500 pl-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Ph.D.</h4>
                  <p className="text-gray-700">{admissionInfo.eligibility.phd}</p>
                </div>
              </div>
            </Card>

            {/* Admission Process */}
            <Card>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Admission Process</h3>
              <div className="space-y-3">
                {admissionInfo.process.map((step, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                      {index + 1}
                    </div>
                    <p className="text-gray-700">{step}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Required Documents */}
          <div className="mt-8">
            <Card>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Required Documents</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {admissionInfo.documents.map((doc, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                    <span className="text-gray-700">{doc}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Admission Capacity */}
      <section id="admission-capacity" className="section-padding bg-gray-50">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Admission Capacity</h2>
            <div className="w-20 h-1 bg-primary-500 rounded mx-auto"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mt-4">Annual intake capacity for each program.</p>
          </div>
          {/* Show a table or cards for seats per program, or placeholder if not available */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(programs).map(([programType, programList]) => (
              <Card key={programType} className="p-6 text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {programType.toUpperCase()}
                </h3>
                <div className="space-y-3">
                  {programList.map((program) => (
                    <div key={program.id} className="p-3 bg-primary-50 rounded-lg">
                      <p className="text-sm text-gray-600">Program: {program.name}</p>
                      <p className="font-semibold text-primary-700">Seats: {program.seats}</p>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Fees Structure */}
      <section id="fees-structure" className="section-padding bg-white">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Fees Structure</h2>
            <div className="w-20 h-1 bg-primary-500 rounded mx-auto"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mt-4">Detailed fee structure for all programs.</p>
          </div>
          {/* Fees Structure Details (reuse existing fees code) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(feesStructure).map(([program, fees]) => (
              <Card key={program} className="p-6 text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {program.toUpperCase()}
                </h3>
                <div className="space-y-3">
                  <div className="p-3 bg-primary-50 rounded-lg">
                    <p className="text-sm text-gray-600">Tuition Fee</p>
                    <p className="font-semibold text-primary-700">{fees.tuition}</p>
                  </div>
                  <div className="p-3 bg-secondary-50 rounded-lg">
                    <p className="text-sm text-gray-600">Other Charges</p>
                    <p className="font-semibold text-secondary-700">{fees.other}</p>
                  </div>
                  <div className="p-3 bg-accent-50 rounded-lg">
                    <p className="text-sm text-gray-600">Hostel Fee</p>
                    <p className="font-semibold text-accent-700">{fees.hostel}</p>
                  </div>
                  <div className="p-3 bg-gray-100 rounded-lg">
                    <p className="text-sm text-gray-600">Total per Semester</p>
                    <p className="font-bold text-gray-900">{fees.total}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Academic Regulations */}
      <section id="academic-regulations" className="section-padding bg-gray-50">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Academic Regulations</h2>
            <div className="w-20 h-1 bg-primary-500 rounded mx-auto"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mt-4">Rules and regulations governing academic programs and student conduct.</p>
          </div>
          {/* Placeholder or real content for academic regulations */}
          <AcademicPlaceholder title="Academic Regulations" />
        </div>
      </section>

      {/* Academic Calendar */}
      <section id="academic-calendar" className="section-padding bg-white">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Academic Calendar</h2>
            <div className="w-20 h-1 bg-primary-500 rounded mx-auto"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mt-4">Important academic dates and events for the current session.</p>
          </div>
          {/* Academic Calendar Details (reuse existing calendar code) */}
          {academicCalendar.length === 0 ? (
            <AcademicPlaceholder title="Academic Calendar" />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {academicCalendar.map((month, index) => (
                <Card key={index} className="p-6">
                  <div className="text-center mb-4">
                    <h3 className="text-xl font-bold text-primary-600">{month.month}</h3>
                  </div>
                  <div className="space-y-2">
                    {month.events.map((event, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-primary-500" />
                        <span className="text-gray-700 text-sm">{event}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="section-padding bg-primary-600 text-white">
        <div className="container-max text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Join our prestigious institution and become part of the next generation of 
            fisheries professionals and researchers
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-accent">
              Apply Now
            </button>
            
            <Link
              to="/contact"
              className="btn-outline border-white text-white hover:bg-white hover:text-primary-600"
            >
              Contact Admissions
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Programs