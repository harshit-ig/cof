import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Users, Award, Building, FileText, Calendar, MapPin, Phone, Mail, GraduationCap, BookOpen, Trophy, Briefcase } from 'lucide-react'
import Section, { SectionHeader } from '../components/common/Section'
import Card from '../components/common/Card'

const Students = () => {
  const [loading, setLoading] = useState(true)

  // Sample student data based on reference site
  const studentData = {
    admission: {
      programs: [
        {
          name: 'Bachelor of Fishery Science (B.F.Sc.)',
          duration: '4 years (8 semesters)',
          seats: '60 seats',
          eligibility: [
            '10+2 with Physics, Chemistry, and Biology',
            'Minimum 50% marks in aggregate',
            'Age limit: 17-25 years as on 1st August',
            'Reservation as per government norms'
          ],
          admissionProcess: [
            'Online application submission',
            'Entrance examination',
            'Document verification',
            'Counseling and seat allocation',
            'Medical examination',
            'Admission confirmation'
          ],
          documents: [
            '10th and 12th mark sheets',
            'Transfer certificate',
            'Character certificate',
            'Caste certificate (if applicable)',
            'Income certificate (if applicable)',
            'Passport size photographs',
            'Aadhar card copy'
          ],
          fees: {
            tuition: '₹15,000 per semester',
            hostel: '₹8,000 per semester',
            mess: '₹6,000 per semester',
            other: '₹5,000 per semester',
            total: '₹34,000 per semester'
          }
        },
        {
          name: 'Master of Fishery Science (M.F.Sc.)',
          duration: '2 years (4 semesters)',
          seats: '30 seats',
          eligibility: [
            'B.F.Sc. or equivalent degree',
            'Minimum 60% marks in aggregate',
            'Valid ICAR-JRF score',
            'Age limit: 25 years as on 1st August'
          ],
          admissionProcess: [
            'ICAR-JRF examination',
            'Online application submission',
            'Document verification',
            'Counseling and seat allocation',
            'Medical examination',
            'Admission confirmation'
          ],
          documents: [
            'B.F.Sc. degree certificate',
            'ICAR-JRF score card',
            'Transfer certificate',
            'Character certificate',
            'Caste certificate (if applicable)',
            'Income certificate (if applicable)',
            'Passport size photographs',
            'Aadhar card copy'
          ],
          fees: {
            tuition: '₹20,000 per semester',
            hostel: '₹8,000 per semester',
            mess: '₹6,000 per semester',
            other: '₹5,000 per semester',
            total: '₹39,000 per semester'
          }
        }
      ],
      importantDates: [
        { event: 'Application Start Date', date: 'May 1, 2024' },
        { event: 'Application End Date', date: 'June 30, 2024' },
        { event: 'Entrance Examination', date: 'July 15, 2024' },
        { event: 'Result Declaration', date: 'July 25, 2024' },
        { event: 'Counseling Start', date: 'August 1, 2024' },
        { event: 'Classes Begin', date: 'August 15, 2024' }
      ]
    },
    scholarships: [
      {
        name: 'ICAR-JRF Fellowship',
        description: 'Junior Research Fellowship for M.F.Sc. students through ICAR examination.',
        amount: '₹31,000 per month',
        duration: '2 years',
        eligibility: [
          'B.F.Sc. degree with 60% marks',
          'Valid ICAR-JRF score',
          'Full-time enrollment'
        ],
        application: 'Through ICAR-JRF examination',
        contact: 'Academic Office',
        phone: '+91 761 2345681'
      },
      {
        name: 'State Government Scholarship',
        description: 'Merit-based scholarship for SC/ST/OBC students.',
        amount: '₹5,000 per month',
        duration: 'Full course duration',
        eligibility: [
          'SC/ST/OBC category',
          'Family income below ₹8 lakhs',
          'Minimum 60% marks'
        ],
        application: 'Through state scholarship portal',
        contact: 'Student Welfare Office',
        phone: '+91 761 2345689'
      },
      {
        name: 'Merit Scholarship',
        description: 'Merit-based scholarship for top-performing students.',
        amount: '₹10,000 per semester',
        duration: 'Per semester basis',
        eligibility: [
          'Top 10% of class',
          'Minimum 75% attendance',
          'No disciplinary issues'
        ],
        application: 'Automatic consideration',
        contact: 'Academic Office',
        phone: '+91 761 2345681'
      }
    ],
    studentCouncil: {
      name: 'Student Council',
      description: 'Elected body representing student interests and organizing various activities.',
      structure: [
        { position: 'President', name: 'Rahul Patel', year: 'B.F.Sc. 3rd Year' },
        { position: 'Vice President', name: 'Priya Singh', year: 'B.F.Sc. 3rd Year' },
        { position: 'General Secretary', name: 'Amit Kumar', year: 'B.F.Sc. 2nd Year' },
        { position: 'Joint Secretary', name: 'Neha Sharma', year: 'B.F.Sc. 2nd Year' },
        { position: 'Treasurer', name: 'Vikram Singh', year: 'B.F.Sc. 2nd Year' }
      ],
      activities: [
        'Cultural events and celebrations',
        'Sports competitions',
        'Technical symposiums',
        'Social service activities',
        'Student welfare programs',
        'Communication with administration'
      ],
      elections: 'Annual elections in September',
      contact: 'Student Council Office',
      phone: '+91 761 2345690'
    },
    clubs: [
      {
        name: 'Fishery Science Club',
        description: 'Technical club for fishery science enthusiasts.',
        activities: [
          'Technical presentations',
          'Field visits',
          'Industry interactions',
          'Research projects',
          'Competitions'
        ],
        members: '45 students',
        coordinator: 'Dr. Anil Kumar Jain',
        contact: '+91 761 2345680'
      },
      {
        name: 'Cultural Club',
        description: 'Promoting cultural activities and talent.',
        activities: [
          'Dance performances',
          'Music concerts',
          'Drama and theater',
          'Art exhibitions',
          'Cultural festivals'
        ],
        members: '60 students',
        coordinator: 'Mrs. Sunita Sharma',
        contact: '+91 761 2345684'
      },
      {
        name: 'Sports Club',
        description: 'Organizing sports activities and competitions.',
        activities: [
          'Inter-college tournaments',
          'Annual sports meet',
          'Fitness programs',
          'Adventure sports',
          'Team building activities'
        ],
        members: '80 students',
        coordinator: 'Physical Education Department',
        contact: '+91 761 2345689'
      },
      {
        name: 'Eco Club',
        description: 'Environmental awareness and conservation activities.',
        activities: [
          'Tree plantation',
          'Cleanliness drives',
          'Environmental workshops',
          'Awareness campaigns',
          'Green campus initiatives'
        ],
        members: '35 students',
        coordinator: 'Dr. Rajesh Kumar Sharma',
        contact: '+91 761 2345678'
      }
    ],
    alumni: [
      {
        name: 'Dr. Sanjay Kumar',
        batch: '2010-2014',
        currentPosition: 'Senior Scientist, ICAR-CIFRI',
        testimonial: 'The foundation I received at CoF Jabalpur was excellent. The practical exposure and research opportunities shaped my career in fishery research.',
        achievements: ['M.F.Sc from ICAR-CIFE', '15+ research papers', '2 patents'],
        contact: 'sanjay.kumar@icar.gov.in'
      },
      {
        name: 'Ms. Anjali Verma',
        batch: '2012-2016',
        currentPosition: 'Aquaculture Manager, Blue Revolution Aquaculture Ltd.',
        testimonial: 'The industry-oriented curriculum and internship opportunities helped me understand real-world challenges and prepared me for corporate roles.',
        achievements: ['MBA in Agribusiness', '5+ years industry experience', 'Team leadership'],
        contact: 'anjali.verma@bluerevolution.com'
      },
      {
        name: 'Mr. Rajesh Malhotra',
        batch: '2015-2019',
        currentPosition: 'Entrepreneur, Fresh Fish Farm',
        testimonial: 'CoF Jabalpur not only taught me fishery science but also entrepreneurship. I started my own fish farm and now employ 20 people.',
        achievements: ['Successful business', 'Employment generation', 'Innovation awards'],
        contact: 'rajesh@freshfishfarm.com'
      }
    ],
    placement: {
      overview: 'Excellent placement record with 95% placement rate in the last 3 years.',
      statistics: {
        placementRate: '95%',
        averagePackage: '₹4.5 LPA',
        highestPackage: '₹8.5 LPA',
        companiesVisited: '25+',
        studentsPlaced: '180+'
      },
      recruiters: [
        'ICAR Research Institutes',
        'State Fishery Departments',
        'Private Aquaculture Companies',
        'Feed Manufacturing Companies',
        'Processing Units',
        'Export Houses',
        'Consultancy Firms'
      ],
      roles: [
        'Fishery Officer',
        'Aquaculture Manager',
        'Research Associate',
        'Quality Control Officer',
        'Feed Technologist',
        'Processing Manager',
        'Extension Officer'
      ],
      placementCell: {
        incharge: 'Dr. Priya Verma',
        contact: '+91 761 2345679',
        email: 'placement@fisherycollegejabalpur.edu.in',
        activities: [
          'Industry partnerships',
          'Campus recruitment drives',
          'Career counseling',
          'Resume building workshops',
          'Interview preparation',
          'Internship coordination'
        ]
      }
    },
    internship: {
      overview: 'Mandatory internship program providing practical industry exposure.',
      duration: '6 months (Final year)',
      credits: '12 credits',
      types: [
        {
          name: 'Industry Internship',
          description: 'Training in commercial aquaculture units, processing plants, and feed mills.',
          duration: '4 months',
          locations: 'Various cities across India',
          stipend: '₹5,000 - ₹15,000 per month'
        },
        {
          name: 'Research Internship',
          description: 'Research projects in ICAR institutes and universities.',
          duration: '2 months',
          locations: 'ICAR institutes, universities',
          stipend: '₹8,000 - ₹20,000 per month'
        }
      ],
      partners: [
        'ICAR-CIFRI, Barrackpore',
        'ICAR-CIFE, Mumbai',
        'ICAR-CIBA, Chennai',
        'State Fishery Departments',
        'Private Aquaculture Companies',
        'Feed Manufacturing Units'
      ],
      coordinator: 'Dr. Anil Kumar Jain',
      contact: '+91 761 2345680',
      email: 'internship@fisherycollegejabalpur.edu.in'
    }
  }

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [])

  return (
    <div className="min-h-screen">
      <Section background="bg-gray-50">
        <SectionHeader
          title="Students Corner"
          subtitle="Comprehensive information for students including admissions, scholarships, student life, and career opportunities."
          align="left"
        />
        
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading student information...</p>
          </div>
        ) : (
          <div className="space-y-12">
            {/* Admission Guidelines */}
            <div id="admission">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <GraduationCap className="h-6 w-6 text-blue-600 mr-2" />
                Admission Guidelines
              </h2>
              
              {/* Programs */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Academic Programs</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {studentData.admission.programs.map((program) => (
                    <Card key={program.name} className="h-full">
                      <div className="p-6">
                        <h4 className="text-lg font-semibold text-gray-900 mb-3">{program.name}</h4>
                        
                        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                          <div>
                            <span className="font-semibold text-gray-700">Duration:</span>
                            <span className="text-gray-600 ml-2">{program.duration}</span>
                          </div>
                          <div>
                            <span className="font-semibold text-gray-700">Seats:</span>
                            <span className="text-gray-600 ml-2">{program.seats}</span>
                          </div>
                        </div>
                        
                        <div className="mb-4">
                          <h5 className="font-semibold text-gray-700 mb-2">Eligibility:</h5>
                          <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                            {program.eligibility.map((item, index) => (
                              <li key={index}>{item}</li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="mb-4">
                          <h5 className="font-semibold text-gray-700 mb-2">Admission Process:</h5>
                          <ol className="list-decimal list-inside text-sm text-gray-600 space-y-1">
                            {program.admissionProcess.map((step, index) => (
                              <li key={index}>{step}</li>
                            ))}
                          </ol>
                        </div>
                        
                        <div className="mb-4">
                          <h5 className="font-semibold text-gray-700 mb-2">Required Documents:</h5>
                          <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                            {program.documents.map((doc, index) => (
                              <li key={index}>{doc}</li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="mb-4">
                          <h5 className="font-semibold text-gray-700 mb-2">Fee Structure:</h5>
                          <div className="space-y-1 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Tuition Fee:</span>
                              <span className="font-medium">{program.fees.tuition}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Hostel Fee:</span>
                              <span className="font-medium">{program.fees.hostel}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Mess Fee:</span>
                              <span className="font-medium">{program.fees.mess}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Other Charges:</span>
                              <span className="font-medium">{program.fees.other}</span>
                            </div>
                            <div className="flex justify-between border-t pt-1">
                              <span className="font-semibold text-gray-700">Total:</span>
                              <span className="font-semibold text-blue-600">{program.fees.total}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
              
              {/* Important Dates */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Important Dates</h3>
                <Card>
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {studentData.admission.importantDates.map((item, index) => (
                        <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <span className="font-medium text-gray-700">{item.event}</span>
                          <span className="text-blue-600 font-semibold">{item.date}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            {/* Scholarships & Fellowships */}
            <div id="scholarships">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Award className="h-6 w-6 text-green-600 mr-2" />
                Scholarships & Fellowships
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {studentData.scholarships.map((scholarship) => (
                  <Card key={scholarship.name} className="h-full">
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">{scholarship.name}</h3>
                      <p className="text-gray-600 text-sm mb-4">{scholarship.description}</p>
                      
                      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                        <div>
                          <span className="font-semibold text-gray-700">Amount:</span>
                          <span className="text-green-600 ml-2">{scholarship.amount}</span>
                        </div>
                        <div>
                          <span className="font-semibold text-gray-700">Duration:</span>
                          <span className="text-gray-600 ml-2">{scholarship.duration}</span>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-700 mb-2">Eligibility:</h4>
                        <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                          {scholarship.eligibility.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="pt-4 border-t border-gray-200">
                        <div className="flex items-center space-x-2 mb-2">
                          <Users className="h-4 w-4 text-blue-600" />
                          <span className="text-sm font-semibold text-gray-700">{scholarship.contact}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Phone className="h-4 w-4 text-green-600" />
                          <span className="text-sm text-gray-600">{scholarship.phone}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Student Council & Clubs */}
            <div id="council">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Users className="h-6 w-6 text-purple-600 mr-2" />
                Student Council & Clubs
              </h2>
              
              {/* Student Council */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Student Council</h3>
                <Card>
                  <div className="p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">{studentData.studentCouncil.name}</h4>
                    <p className="text-gray-600 text-sm mb-4">{studentData.studentCouncil.description}</p>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <div>
                        <h5 className="font-semibold text-gray-700 mb-3">Council Structure:</h5>
                        <div className="space-y-2">
                          {studentData.studentCouncil.structure.map((member) => (
                            <div key={member.position} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                              <span className="font-medium text-gray-700">{member.position}</span>
                              <div className="text-right">
                                <div className="text-sm font-semibold text-gray-900">{member.name}</div>
                                <div className="text-xs text-gray-600">{member.year}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h5 className="font-semibold text-gray-700 mb-3">Activities:</h5>
                        <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                          {studentData.studentCouncil.activities.map((activity, index) => (
                            <li key={index}>{activity}</li>
                          ))}
                        </ul>
                        
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <div className="space-y-2 text-sm">
                            <div>
                              <span className="font-semibold text-gray-700">Elections:</span>
                              <span className="text-gray-600 ml-2">{studentData.studentCouncil.elections}</span>
                            </div>
                            <div>
                              <span className="font-semibold text-gray-700">Contact:</span>
                              <span className="text-gray-600 ml-2">{studentData.studentCouncil.contact}</span>
                            </div>
                            <div>
                              <span className="font-semibold text-gray-700">Phone:</span>
                              <span className="text-green-600 ml-2">{studentData.studentCouncil.phone}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
              
              {/* Student Clubs */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Student Clubs</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {studentData.clubs.map((club) => (
                    <Card key={club.name} className="h-full">
                      <div className="p-6">
                        <h4 className="text-lg font-semibold text-gray-900 mb-3">{club.name}</h4>
                        <p className="text-gray-600 text-sm mb-4">{club.description}</p>
                        
                        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                          <div>
                            <span className="font-semibold text-gray-700">Members:</span>
                            <span className="text-gray-600 ml-2">{club.members}</span>
                          </div>
                          <div>
                            <span className="font-semibold text-gray-700">Coordinator:</span>
                            <span className="text-gray-600 ml-2">{club.coordinator}</span>
                          </div>
                        </div>
                        
                        <div className="mb-4">
                          <h5 className="font-semibold text-gray-700 mb-2">Activities:</h5>
                          <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                            {club.activities.map((activity, index) => (
                              <li key={index}>{activity}</li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="pt-4 border-t border-gray-200">
                          <div className="flex items-center space-x-2">
                            <Phone className="h-4 w-4 text-green-600" />
                            <span className="text-sm text-gray-600">{club.contact}</span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>

            {/* Alumni Testimonials */}
            <div id="alumni">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Trophy className="h-6 w-6 text-yellow-600 mr-2" />
                Alumni Testimonials
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {studentData.alumni.map((alumni) => (
                  <Card key={alumni.name} className="h-full">
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{alumni.name}</h3>
                      <p className="text-sm text-gray-600 mb-3">Batch: {alumni.batch}</p>
                      <p className="text-sm font-semibold text-blue-600 mb-3">{alumni.currentPosition}</p>
                      
                      <p className="text-sm text-gray-700 mb-4 italic">"{alumni.testimonial}"</p>
                      
                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-700 mb-2">Key Achievements:</h4>
                        <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                          {alumni.achievements.map((achievement, index) => (
                            <li key={index}>{achievement}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="pt-4 border-t border-gray-200">
                        <div className="flex items-center space-x-2">
                          <Mail className="h-4 w-4 text-red-600" />
                          <span className="text-sm text-gray-600 break-all">{alumni.contact}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Internship & Placement */}
            <div id="placement">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Briefcase className="h-6 w-6 text-blue-600 mr-2" />
                Internship & Placement
              </h2>
              
              {/* Placement Overview */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Placement Overview</h3>
                <Card>
                  <div className="p-6">
                    <p className="text-gray-600 text-sm mb-6">{studentData.placement.overview}</p>
                    
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                      {Object.entries(studentData.placement.statistics).map(([key, value]) => (
                        <div key={key} className="text-center">
                          <div className="text-2xl font-bold text-blue-600 mb-1">{value}</div>
                          <div className="text-sm text-gray-600 capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <div>
                        <h4 className="font-semibold text-gray-700 mb-3">Top Recruiters:</h4>
                        <div className="flex flex-wrap gap-2">
                          {studentData.placement.recruiters.map((recruiter, index) => (
                            <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                              {recruiter}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-gray-700 mb-3">Job Roles:</h4>
                        <div className="flex flex-wrap gap-2">
                          {studentData.placement.roles.map((role, index) => (
                            <span key={index} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                              {role}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
              
              {/* Placement Cell */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Placement Cell</h3>
                <Card>
                  <div className="p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <div>
                        <div className="space-y-3 text-sm">
                          <div>
                            <span className="font-semibold text-gray-700">Incharge:</span>
                            <span className="text-gray-600 ml-2">{studentData.placement.placementCell.incharge}</span>
                          </div>
                          <div>
                            <span className="font-semibold text-gray-700">Phone:</span>
                            <span className="text-green-600 ml-2">{studentData.placement.placementCell.contact}</span>
                          </div>
                          <div>
                            <span className="font-semibold text-gray-700">Email:</span>
                            <span className="text-red-600 ml-2 break-all">{studentData.placement.placementCell.email}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-gray-700 mb-3">Activities:</h4>
                        <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                          {studentData.placement.placementCell.activities.map((activity, index) => (
                            <li key={index}>{activity}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
              
              {/* Internship Program */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Internship Program</h3>
                <Card>
                  <div className="p-6">
                    <p className="text-gray-600 text-sm mb-6">{studentData.internship.overview}</p>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <div>
                        <h4 className="font-semibold text-gray-700 mb-3">Internship Types:</h4>
                        <div className="space-y-4">
                          {studentData.internship.types.map((type) => (
                            <div key={type.name} className="p-3 bg-gray-50 rounded-lg">
                              <h5 className="font-semibold text-gray-900 mb-2">{type.name}</h5>
                              <p className="text-sm text-gray-600 mb-2">{type.description}</p>
                              <div className="grid grid-cols-2 gap-2 text-xs">
                                <div>
                                  <span className="font-semibold text-gray-700">Duration:</span>
                                  <span className="text-gray-600 ml-1">{type.duration}</span>
                                </div>
                                <div>
                                  <span className="font-semibold text-gray-700">Stipend:</span>
                                  <span className="text-green-600 ml-1">{type.stipend}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-gray-700 mb-3">Partner Organizations:</h4>
                        <div className="space-y-2">
                          {studentData.internship.partners.map((partner, index) => (
                            <div key={index} className="p-2 bg-blue-50 rounded text-sm text-blue-800">
                              {partner}
                            </div>
                          ))}
                        </div>
                        
                        <div className="mt-6 pt-4 border-t border-gray-200">
                          <div className="space-y-2 text-sm">
                            <div>
                              <span className="font-semibold text-gray-700">Coordinator:</span>
                              <span className="text-gray-600 ml-2">{studentData.internship.coordinator}</span>
                            </div>
                            <div>
                              <span className="font-semibold text-gray-700">Phone:</span>
                              <span className="text-green-600 ml-2">{studentData.internship.contact}</span>
                            </div>
                            <div>
                              <span className="font-semibold text-gray-700">Email:</span>
                              <span className="text-red-600 ml-2 break-all">{studentData.internship.email}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        )}
      </Section>
    </div>
  )
}

export default Students






