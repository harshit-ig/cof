import React from 'react'
import { Link } from 'react-router-dom'
import { GraduationCap, Award, Users, Star, Briefcase, FileText, Calendar, Mail, Phone, MapPin, ChevronRight, Download } from 'lucide-react'
import Card from '../components/common/Card'

const StudentCorner = () => {
  const admissionGuidelines = [
    {
      category: 'Eligibility Criteria',
      description: 'Academic qualifications and requirements for admission to B.F.Sc and M.F.Sc programs.',
      guidelines: [
        'B.F.Sc: 10+2 with Physics, Chemistry, Biology/Mathematics (50% marks)',
        'M.F.Sc: B.F.Sc or equivalent degree (55% marks)',
        'Age limit: 17-25 years for UG, 21-35 years for PG',
        'Relaxation in marks and age as per Government norms',
        'Valid entrance test score (AUAT/NET/GATE as applicable)'
      ]
    },
    {
      category: 'Application Process',
      description: 'Step-by-step procedure for submitting admission applications.',
      guidelines: [
        'Online application through university portal',
        'Upload required documents in prescribed format',
        'Payment of application fee through online mode',
        'Print application form after successful submission',
        'Submit hard copy with documents at college office'
      ]
    },
    {
      category: 'Required Documents',
      description: 'List of documents to be submitted along with the application form.',
      guidelines: [
        'Mark sheets and certificates of qualifying examination',
        'Transfer certificate and migration certificate',
        'Character certificate from head of last institution',
        'Caste certificate (if applicable)',
        'Income certificate (for fee concession)',
        'Medical fitness certificate',
        'Recent passport size photographs'
      ]
    },
    {
      category: 'Important Dates',
      description: 'Key dates and deadlines for admission process.',
      guidelines: [
        'Application Start Date: May 15, 2025',
        'Last Date for Application: June 15, 2025',
        'Entrance Test Date: June 25, 2025',
        'Merit List Publication: July 5, 2025',
        'Counseling and Admission: July 10-20, 2025',
        'Commencement of Classes: August 1, 2025'
      ]
    }
  ]

  const scholarshipsFellowships = [
    {
      name: 'Merit-cum-Means Scholarship',
      eligibility: 'Students with >75% marks and annual family income <₹2 lakh',
      amount: '₹12,000 per year',
      duration: 'Throughout the course',
      description: 'Government scholarship for meritorious students from economically weaker sections.',
      benefits: [
        'Tuition fee waiver',
        'Maintenance allowance',
        'Book allowance',
        'Hostel fee concession'
      ]
    },
    {
      name: 'SC/ST Scholarship',
      eligibility: 'Students belonging to SC/ST category',
      amount: '₹15,000 per year',
      duration: 'Throughout the course',
      description: 'Special scholarship scheme for scheduled caste and scheduled tribe students.',
      benefits: [
        'Complete fee waiver',
        'Monthly stipend',
        'Hostel accommodation',
        'Medical assistance'
      ]
    },
    {
      name: 'Research Fellowship (PG)',
      eligibility: 'M.F.Sc students with >60% marks',
      amount: '₹8,000 per month',
      duration: '2 years',
      description: 'Fellowship for postgraduate students engaged in research activities.',
      benefits: [
        'Monthly stipend',
        'Research contingency',
        'Conference participation support',
        'Publication assistance'
      ]
    },
    {
      name: 'Girl Child Incentive',
      eligibility: 'Female students with >65% marks',
      amount: '₹10,000 per year',
      duration: 'Throughout the course',
      description: 'Special incentive scheme to promote higher education among girls.',
      benefits: [
        'Financial assistance',
        'Priority in hostel allocation',
        'Safety and security measures',
        'Career guidance support'
      ]
    }
  ]

  const studentCouncilClubs = [
    {
      name: 'Student Council',
      role: 'Student Governance',
      description: 'Representative body for student welfare and academic matters.',
      activities: [
        'Student grievance redressal',
        'Academic and administrative liaison',
        'Cultural and sports event organization',
        'Student welfare initiatives',
        'Discipline and conduct management'
      ],
      positions: ['President', 'Vice-President', 'Secretary', 'Cultural Secretary', 'Sports Secretary']
    },
    {
      name: 'Aquaculture Club',
      role: 'Technical Activities',
      description: 'Club focused on practical aspects of aquaculture and fishery management.',
      activities: [
        'Technical workshops and seminars',
        'Field visits to fish farms',
        'Hands-on training programs',
        'Research project discussions',
        'Industry interaction sessions'
      ],
      positions: ['President', 'Secretary', 'Technical Coordinator', 'Event Manager']
    },
    {
      name: 'Cultural Club',
      role: 'Cultural Activities',
      description: 'Organizing cultural events, festivals, and artistic activities on campus.',
      activities: [
        'Annual cultural festival',
        'Traditional and modern dance performances',
        'Music and drama competitions',
        'Art and craft exhibitions',
        'Inter-college cultural competitions'
      ],
      positions: ['Cultural Secretary', 'Dance Coordinator', 'Music Coordinator', 'Drama Coordinator']
    },
    {
      name: 'Sports Club',
      role: 'Sports & Recreation',
      description: 'Promoting sports activities and physical fitness among students.',
      activities: [
        'Inter-college sports competitions',
        'Annual sports meet',
        'Fitness and health awareness programs',
        'Sports equipment management',
        'Coaching and training sessions'
      ],
      positions: ['Sports Secretary', 'Indoor Games Coordinator', 'Outdoor Games Coordinator']
    },
    {
      name: 'Literary Society',
      role: 'Academic & Literary',
      description: 'Encouraging literary activities, debates, and academic discussions.',
      activities: [
        'Debates and elocution competitions',
        'Essay writing competitions',
        'Book reading sessions',
        'Academic seminars',
        'College magazine publication'
      ],
      positions: ['Editor', 'Literary Secretary', 'Debate Coordinator', 'Publication Head']
    }
  ]

  const alumniTestimonials = [
    {
      name: 'Dr. Rahul Sharma',
      batch: '2015-19',
      currentPosition: 'Aquaculture Officer, MP Fishery Department',
      photo: '/WhatsApp Image 2025-08-19 at 09.04.50_9e82a1f1.jpg',
      testimonial: 'My time at College of Fishery, Jabalpur was transformative. The practical exposure to modern aquaculture techniques and guidance from experienced faculty prepared me well for my career in government service.',
      achievements: [
        'Selected as Aquaculture Officer in MP Civil Services',
        'Implemented 5 successful aquaculture projects',
        'Trained over 500 farmers in modern techniques',
        'Received State Award for Excellence in Fishery'
      ],
      contact: 'rahul.sharma@mpgov.in'
    },
    {
      name: 'Ms. Priya Verma',
      batch: '2017-21',
      currentPosition: 'Research Scientist, ICAR-CIFA',
      photo: '/WhatsApp Image 2025-08-19 at 09.04.51_bd417a2e.jpg',
      testimonial: 'The research-oriented curriculum and state-of-the-art laboratories at COF provided excellent foundation for my research career. The faculty mentorship was exceptional.',
      achievements: [
        'Selected as Scientist in ICAR-CIFA through NET',
        'Published 12 research papers in international journals',
        'Awarded Young Scientist Fellowship',
        'Leading biofloc technology research project'
      ],
      contact: 'priya.verma@icar.gov.in'
    },
    {
      name: 'Mr. Anil Kumar Patel',
      batch: '2014-18',
      currentPosition: 'Entrepreneur, AquaTech Solutions',
      photo: '/WhatsApp Image 2025-08-19 at 09.04.52_8b313bd6.jpg',
      testimonial: 'The entrepreneurship development programs and industry exposure helped me start my own aquaculture consultancy. Today, our company serves farmers across three states.',
      achievements: [
        'Founded successful aquaculture consultancy',
        'Serves 1000+ farmers across MP, CG, UP',
        'Annual turnover of ₹2 crores',
        'Created employment for 25 youth'
      ],
      contact: 'anil@aquatechsolutions.com'
    },
    {
      name: 'Dr. Sunita Singh',
      batch: '2016-20',
      currentPosition: 'Assistant Professor, College of Fishery, Raipur',
      photo: '/WhatsApp Image 2025-08-19 at 09.04.53_8ff77827.jpg',
      testimonial: 'The academic excellence and research culture at COF inspired me to pursue higher studies and academic career. The institution shaped my passion for teaching and research.',
      achievements: [
        'Completed Ph.D. from ICAR-CIFE, Mumbai',
        'Appointed as Assistant Professor at age 26',
        'Published 8 research papers',
        'Guiding 6 M.F.Sc students'
      ],
      contact: 'sunita.singh@cofr.edu.in'
    }
  ]

  const internshipPlacement = [
    {
      category: 'Internship Opportunities',
      description: 'Mandatory internship programs for practical exposure and skill development.',
      details: [
        'Duration: 6 months for final year students',
        'Placement in government departments, research institutes, private companies',
        'Stipend range: ₹5,000 - ₹15,000 per month',
        'Industry mentorship and project-based learning',
        'Evaluation and grading based on performance'
      ],
      partners: [
        'ICAR Research Institutes',
        'State Fishery Departments',
        'Private Aquaculture Companies',
        'Fish Processing Industries',
        'NGOs and Development Organizations'
      ]
    },
    {
      category: 'Placement Statistics (2023-24)',
      description: 'Comprehensive placement support with excellent industry connections.',
      details: [
        'Overall Placement Rate: 85%',
        'Average Package: ₹4.5 LPA',
        'Highest Package: ₹12 LPA',
        'Government Job Selections: 35%',
        'Private Sector Placements: 50%'
      ],
      partners: [
        'Godrej Agrovet Limited',
        'Avanti Feeds Limited',
        'CP Aquaculture',
        'Growel Feeds',
        'Various State Governments'
      ]
    },
    {
      category: 'Career Services',
      description: 'Comprehensive support for career development and job placement.',
      details: [
        'Resume building and interview preparation',
        'Industry interaction and guest lectures',
        'Job portal access and application support',
        'Soft skills and personality development',
        'Entrepreneurship development programs'
      ],
      partners: [
        'Placement Cell Office',
        'Career Counseling Services',
        'Industry Mentorship Program',
        'Alumni Network Support',
        'Professional Development Workshops'
      ]
    },
    {
      category: 'Top Recruiters',
      description: 'Leading organizations that regularly recruit from our college.',
      details: [
        'Government Sectors: State Fishery Departments, ICAR Institutes',
        'Private Companies: Godrej, Avanti, CP Aquaculture, Growel',
        'Research Organizations: CIFA, CIFRI, NBFGR, CMFRI',
        'International Organizations: WorldFish, FAO projects',
        'Startups and Consulting Firms in aquaculture sector'
      ],
      partners: [
        'Recruitment drives: 2-3 times per year',
        'Pre-placement talks and company presentations',
        'On-campus interviews and selection process',
        'Industry-specific skill assessment tests',
        'Follow-up support for placed students'
      ]
    }
  ]

  return (
    <div className="min-h-screen">
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
            {admissionGuidelines.map((guideline, index) => (
              <Card key={index} className="p-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  {guideline.category.includes('Eligibility') ? 
                    <GraduationCap className="w-6 h-6 text-blue-500" /> :
                    guideline.category.includes('Process') ?
                    <FileText className="w-6 h-6 text-blue-500" /> :
                    guideline.category.includes('Documents') ?
                    <FileText className="w-6 h-6 text-blue-500" /> :
                    <Calendar className="w-6 h-6 text-blue-500" />
                  }
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{guideline.category}</h3>
                <p className="text-gray-700 mb-4">{guideline.description}</p>
                
                <div>
                  <ul className="space-y-2">
                    {guideline.guidelines.map((item, idx) => (
                      <li key={idx} className="flex items-start text-sm text-gray-700">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mr-3 mt-2"></div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            ))}
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
            {scholarshipsFellowships.map((scholarship, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-start space-x-4 mb-4">
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <Award className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{scholarship.name}</h3>
                    <div className="grid grid-cols-1 gap-2 text-sm text-gray-600 mb-3">
                      <div>
                        <span className="font-medium">Amount:</span> {scholarship.amount}
                      </div>
                      <div>
                        <span className="font-medium">Duration:</span> {scholarship.duration}
                      </div>
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-700 mb-4">{scholarship.description}</p>
                
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Eligibility</h4>
                  <p className="text-sm text-gray-700">{scholarship.eligibility}</p>
                </div>
                
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
              </Card>
            ))}
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
            {studentCouncilClubs.map((club, index) => (
              <Card key={index} className="p-6">
                <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-secondary-600" />
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{club.name}</h3>
                <p className="text-sm text-secondary-600 mb-3 font-medium">{club.role}</p>
                <p className="text-gray-700 mb-4">{club.description}</p>
                
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
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Alumni Testimonials */}
      <section id="alumni-testimonials" className="section-padding bg-white">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Alumni Testimonials</h2>
            <div className="w-20 h-1 bg-blue-400 rounded mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Success stories and experiences from our distinguished alumni who are making 
              significant contributions in various sectors of fishery and aquaculture.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {alumniTestimonials.map((alumni, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-start space-x-4 mb-4">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <Star className="w-8 h-8 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">{alumni.name}</h3>
                    <p className="text-sm text-gray-600">Batch: {alumni.batch}</p>
                    <p className="text-sm text-green-600 font-medium">{alumni.currentPosition}</p>
                  </div>
                </div>
                
                <blockquote className="text-gray-700 italic mb-4">
                  "{alumni.testimonial}"
                </blockquote>
                
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-3">Key Achievements</h4>
                  <ul className="space-y-2">
                    {alumni.achievements.map((achievement, idx) => (
                      <li key={idx} className="flex items-start text-sm text-gray-700">
                        <Star className="w-4 h-4 text-green-600 mr-2 mt-1" />
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-600">
                    <Mail className="w-4 h-4 inline mr-1" />
                    Contact: {alumni.contact}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Internship & Placement */}
      <section id="internship-placement" className="section-padding bg-gray-50">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Internship & Placement</h2>
            <div className="w-20 h-1 bg-blue-400 rounded mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Comprehensive placement support with excellent industry connections, internship opportunities, 
              and career development services for students.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {internshipPlacement.map((placement, index) => (
              <Card key={index} className="p-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Briefcase className="w-6 h-6 text-blue-600" />
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{placement.category}</h3>
                <p className="text-gray-700 mb-4">{placement.description}</p>
                
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-3">Key Details</h4>
                  <ul className="space-y-2">
                    {placement.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start text-sm text-gray-700">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-2"></div>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">
                    {placement.category.includes('Opportunities') ? 'Partner Organizations' :
                     placement.category.includes('Statistics') ? 'Major Recruiters' :
                     placement.category.includes('Services') ? 'Support Services' :
                     'Recruitment Process'}
                  </h4>
                  <ul className="space-y-2">
                    {placement.partners.map((partner, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-700">
                        <ChevronRight className="w-4 h-4 text-blue-600 mr-2" />
                        {partner}
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            ))}
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







