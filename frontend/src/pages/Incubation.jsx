import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Building, Users, FileText, Calendar, MapPin, Phone, Mail, ExternalLink, Award, Lightbulb, TrendingUp, Target } from 'lucide-react'
import Section, { SectionHeader } from '../components/common/Section'
import Card from '../components/common/Card'

const Incubation = () => {
  const [loading, setLoading] = useState(true)

  // Sample incubation data based on reference site
  const incubationData = {
    overview: {
      name: 'Fisheries Innovation & Incubation Center',
      description: 'A dedicated center for fostering innovation, entrepreneurship, and startup development in the fisheries and aquaculture sector.',
      vision: 'To become a leading hub for fisheries innovation and entrepreneurship in India, promoting sustainable aquaculture and food security.',
      mission: 'To nurture innovative ideas, support startups, and create an ecosystem for sustainable fisheries development through technology, mentorship, and funding support.',
      established: '2022',
      location: 'College Campus, Block C, First Floor',
      capacity: '20 startups',
      incharge: 'Dr. Priya Verma',
      contact: '+91 761 2345679',
      email: 'incubation@fisherycollegejabalpur.edu.in'
    },
    activities: [
      {
        id: 1,
        title: 'Startup Incubation',
        description: 'Comprehensive support for fisheries and aquaculture startups from ideation to market launch.',
        services: [
          'Business plan development',
          'Market research support',
          'Technical guidance',
          'Mentorship programs',
          'Networking opportunities',
          'Funding assistance'
        ],
        duration: '6-24 months',
        eligibility: 'Innovative fisheries/aquaculture ideas',
        contact: 'Dr. Priya Verma',
        phone: '+91 761 2345679'
      },
      {
        id: 2,
        title: 'Innovation Programs',
        description: 'Programs to foster innovation and creativity in fisheries sector.',
        services: [
          'Innovation challenges',
          'Hackathons',
          'Design thinking workshops',
          'Prototype development',
          'Testing and validation',
          'IPR support'
        ],
        duration: '3-12 months',
        eligibility: 'Students, researchers, entrepreneurs',
        contact: 'Dr. Anil Kumar Jain',
        phone: '+91 761 2345680'
      },
      {
        id: 3,
        title: 'Entrepreneurship Development',
        description: 'Training and development programs for aspiring entrepreneurs in fisheries sector.',
        services: [
          'Entrepreneurship training',
          'Business model canvas',
          'Financial planning',
          'Marketing strategies',
          'Legal compliance',
          'Risk management'
        ],
        duration: '3-6 months',
        eligibility: 'Students, farmers, professionals',
        contact: 'Mr. Suresh Kumar',
        phone: '+91 761 2345683'
      }
    ],
    startups: [
      {
        id: 1,
        name: 'AquaTech Solutions',
        founder: 'Rahul Patel',
        batch: '2023',
        description: 'Innovative water quality monitoring system using IoT and AI for aquaculture farms.',
        technology: 'IoT, AI, Water Quality Sensors',
        stage: 'Growth',
        funding: '₹25,00,000',
        achievements: [
          'Patent filed',
          '50+ customers',
          'Industry recognition',
          'Export orders'
        ],
        mentor: 'Dr. Anil Kumar Jain',
        status: 'Active',
        logo: 'cllg.jpg'
      },
      {
        id: 2,
        name: 'BioFeed Innovations',
        founder: 'Priya Singh',
        batch: '2023',
        description: 'Sustainable fish feed production using agricultural waste and bio-processing.',
        technology: 'Bio-processing, Waste Utilization',
        stage: 'Early Growth',
        funding: '₹15,00,000',
        achievements: [
          'Pilot plant established',
          'Farmer partnerships',
          'Quality certification',
          'Cost reduction 30%'
        ],
        mentor: 'Dr. Priya Verma',
        status: 'Active',
        logo: 'cllg.jpg'
      },
      {
        id: 3,
        name: 'FishCare Mobile',
        founder: 'Amit Kumar',
        batch: '2023',
        description: 'Mobile app for fish health monitoring and disease diagnosis.',
        technology: 'Mobile App, AI, Image Processing',
        stage: 'Validation',
        funding: '₹8,00,000',
        achievements: [
          'App development completed',
          'Beta testing phase',
          'Veterinary partnerships',
          'User feedback positive'
        ],
        mentor: 'Dr. Rajesh Kumar Sharma',
        status: 'Active',
        logo: 'cllg.jpg'
      }
    ],
    facilities: [
      {
        id: 1,
        name: 'Co-working Space',
        description: 'Modern co-working space with all essential amenities for startups.',
        features: [
          'Individual workstations',
          'Meeting rooms',
          'Conference facilities',
          'High-speed internet',
          'Printing services',
          '24/7 access'
        ],
        capacity: '50 people',
        incharge: 'Mr. Suresh Kumar',
        contact: '+91 761 2345683'
      },
      {
        id: 2,
        name: 'Prototype Lab',
        description: 'Well-equipped laboratory for prototype development and testing.',
        equipment: [
          '3D printers',
          'Electronics workbench',
          'Testing equipment',
          'Software tools',
          'Design software',
          'Measurement tools'
        ],
        capacity: '10 projects',
        incharge: 'Dr. Anil Kumar Jain',
        contact: '+91 761 2345680'
      },
      {
        id: 3,
        name: 'Business Development Center',
        description: 'Center for business development, mentoring, and networking.',
        features: [
          'Mentor meeting rooms',
          'Training facilities',
          'Library and resources',
          'Networking space',
          'Presentation equipment',
          'Video conferencing'
        ],
        capacity: '30 people',
        incharge: 'Dr. Priya Verma',
        contact: '+91 761 2345679'
      }
    ],
    programs: [
      {
        id: 1,
        name: 'Fisheries Startup Challenge',
        description: 'Annual competition to identify and support innovative fisheries startups.',
        duration: '6 months',
        prizes: [
          '1st Prize: ₹10,00,000 + Incubation support',
          '2nd Prize: ₹5,00,000 + Incubation support',
          '3rd Prize: ₹2,50,000 + Incubation support'
        ],
        eligibility: 'Students, researchers, entrepreneurs',
        timeline: [
          'Application: January',
          'Screening: February',
          'Pitch Day: March',
          'Incubation: April onwards'
        ],
        contact: 'Dr. Priya Verma',
        phone: '+91 761 2345679'
      },
      {
        id: 2,
        name: 'Innovation Fellowship',
        description: 'Fellowship program for innovative research and development in fisheries.',
        duration: '12 months',
        benefits: [
          'Monthly stipend: ₹50,000',
          'Research funding: ₹5,00,000',
          'Mentorship support',
          'Industry exposure',
          'Publication support'
        ],
        eligibility: 'PhD students, researchers',
        application: 'Annual call in December',
        contact: 'Dr. Anil Kumar Jain',
        phone: '+91 761 2345680'
      },
      {
        id: 3,
        name: 'Entrepreneurship Bootcamp',
        description: 'Intensive training program for aspiring entrepreneurs.',
        duration: '2 weeks',
        topics: [
          'Business model development',
          'Market research',
          'Financial planning',
          'Marketing strategies',
          'Pitch presentation',
          'Legal aspects'
        ],
        eligibility: 'Students, farmers, professionals',
        frequency: 'Quarterly',
        contact: 'Mr. Suresh Kumar',
        phone: '+91 761 2345683'
      }
    ],
    mentors: [
      {
        id: 1,
        name: 'Dr. Rajesh Kumar Sharma',
        designation: 'Dean, College of Fisheries',
        expertise: 'Fisheries Extension, Aquaculture',
        experience: '20+ years',
        specialization: [
          'Extension methodologies',
          'Farmer training',
          'Technology transfer',
          'Policy development'
        ],
        contact: '+91 761 2345678',
        email: 'dean@fisherycollegejabalpur.edu.in',
        availability: 'Monday to Friday, 10 AM - 4 PM'
      },
      {
        id: 2,
        name: 'Dr. Anil Kumar Jain',
        designation: 'HOD, Aquaculture',
        expertise: 'Aquaculture Systems, Water Quality',
        experience: '18+ years',
        specialization: [
          'Biofloc technology',
          'Water quality management',
          'System design',
          'Innovation in aquaculture'
        ],
        contact: '+91 761 2345680',
        email: 'anil.jain@fisherycollegejabalpur.edu.in',
        availability: 'Monday to Friday, 9 AM - 5 PM'
      },
      {
        id: 3,
        name: 'Dr. Priya Verma',
        designation: 'HOD, Processing Technology',
        expertise: 'Fish Processing, Feed Technology',
        experience: '15+ years',
        specialization: [
          'Feed formulation',
          'Processing technology',
          'Quality control',
          'Value addition'
        ],
        contact: '+91 761 2345679',
        email: 'priya.verma@fisherycollegejabalpur.edu.in',
        availability: 'Monday to Friday, 9 AM - 5 PM'
      },
      {
        id: 4,
        name: 'Mr. Suresh Kumar',
        designation: 'Industry Expert',
        expertise: 'Business Development, Marketing',
        experience: '25+ years',
        specialization: [
          'Business strategy',
          'Market analysis',
          'Financial planning',
          'Industry networking'
        ],
        contact: '+91 761 2345683',
        email: 'suresh.kumar@fisherycollegejabalpur.edu.in',
        availability: 'Monday to Friday, 2 PM - 6 PM'
      }
    ],
    successStories: [
      {
        id: 1,
        startup: 'AquaTech Solutions',
        founder: 'Rahul Patel',
        story: 'Started as a student project, now serving 50+ aquaculture farms with innovative water quality monitoring solutions.',
        impact: [
          '50+ farmers benefited',
          'Water quality improved 40%',
          'Disease incidence reduced 60%',
          'Farmer income increased 25%'
        ],
        recognition: [
          'National Innovation Award',
          'Industry partnership',
          'Export opportunities',
          'Patent filed'
        ],
        year: 2023
      },
      {
        id: 2,
        startup: 'BioFeed Innovations',
        founder: 'Priya Singh',
        story: 'Transformed agricultural waste into valuable fish feed, reducing costs and environmental impact.',
        impact: [
          '30% cost reduction',
          'Waste utilization 100%',
          'Quality improvement',
          'Sustainable practices'
        ],
        recognition: [
          'Sustainability Award',
          'Farmer adoption',
          'Industry recognition',
          'Research publication'
        ],
        year: 2023
      }
    ],
    contact: {
      address: 'Fisheries Innovation & Incubation Center, College of Fisheries, NDVSU Campus, Jabalpur-482001, Madhya Pradesh',
      phone: '+91 761 2345679',
      email: 'incubation@fisherycollegejabalpur.edu.in',
      website: 'https://incubation.fisherycollegejabalpur.edu.in',
      workingHours: 'Monday to Friday: 9:00 AM - 6:00 PM, Saturday: 9:00 AM - 1:00 PM',
      socialMedia: {
        linkedin: 'https://linkedin.com/company/cof-incubation',
        twitter: 'https://twitter.com/cof_incubation',
        facebook: 'https://facebook.com/cofincubation'
      }
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
          title="Incubation Centre"
          subtitle="Fostering innovation, entrepreneurship, and startup development in the fisheries and aquaculture sector."
          align="left"
        />
        
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading incubation information...</p>
          </div>
        ) : (
          <div className="space-y-12">
            {/* Overview */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Building className="h-6 w-6 text-blue-600 mr-2" />
                About the Incubation Centre
              </h2>
              <Card>
                <div className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">{incubationData.overview.name}</h3>
                      <p className="text-gray-600 text-sm mb-4">{incubationData.overview.description}</p>
                      
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-gray-700 mb-2">Vision</h4>
                          <p className="text-sm text-gray-600">{incubationData.overview.vision}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-700 mb-2">Mission</h4>
                          <p className="text-sm text-gray-600">{incubationData.overview.mission}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="space-y-4 text-sm">
                        <div>
                          <span className="font-semibold text-gray-700">Established:</span>
                          <span className="text-gray-600 ml-2">{incubationData.overview.established}</span>
                        </div>
                        <div>
                          <span className="font-semibold text-gray-700">Location:</span>
                          <span className="text-gray-600 ml-2">{incubationData.overview.location}</span>
                        </div>
                        <div>
                          <span className="font-semibold text-gray-700">Capacity:</span>
                          <span className="text-gray-600 ml-2">{incubationData.overview.capacity}</span>
                        </div>
                        <div>
                          <span className="font-semibold text-gray-700">Incharge:</span>
                          <span className="text-gray-600 ml-2">{incubationData.overview.incharge}</span>
                        </div>
                      </div>
                      
                      <div className="pt-4 border-t border-gray-200">
                        <div className="flex items-center space-x-2 mb-2">
                          <Phone className="h-4 w-4 text-green-600" />
                          <span className="text-sm text-gray-600">{incubationData.overview.contact}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Mail className="h-4 w-4 text-red-600" />
                          <span className="text-sm text-gray-600">{incubationData.overview.email}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Activities */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Lightbulb className="h-6 w-6 text-green-600 mr-2" />
                Core Activities
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {incubationData.activities.map((activity) => (
                  <Card key={activity.id} className="h-full">
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">{activity.title}</h3>
                      <p className="text-gray-600 text-sm mb-4">{activity.description}</p>
                      
                      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                        <div>
                          <span className="font-semibold text-gray-700">Duration:</span>
                          <span className="text-gray-600 ml-2">{activity.duration}</span>
                        </div>
                        <div>
                          <span className="font-semibold text-gray-700">Eligibility:</span>
                          <span className="text-gray-600 ml-2">{activity.eligibility}</span>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-700 mb-2">Services:</h4>
                        <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                          {activity.services.map((service, index) => (
                            <li key={index}>{service}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="pt-4 border-t border-gray-200">
                        <div className="flex items-center space-x-2 mb-2">
                          <Users className="h-4 w-4 text-blue-600" />
                          <span className="text-sm font-semibold text-gray-700">{activity.contact}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Phone className="h-4 w-4 text-green-600" />
                          <span className="text-sm text-gray-600">{activity.phone}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Incubated Startups */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <TrendingUp className="h-6 w-6 text-purple-600 mr-2" />
                Incubated Startups
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {incubationData.startups.map((startup) => (
                  <Card key={startup.id} className="h-full">
                    <div className="p-6">
                      <div className="flex items-start space-x-4 mb-4">
                        <img
                          src={startup.logo}
                          alt={startup.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">{startup.name}</h3>
                          <p className="text-sm text-gray-600 mb-2">Founder: {startup.founder}</p>
                          <p className="text-sm text-gray-600">Batch: {startup.batch}</p>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 text-sm mb-4">{startup.description}</p>
                      
                      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                        <div>
                          <span className="font-semibold text-gray-700">Technology:</span>
                          <span className="text-gray-600 ml-2">{startup.technology}</span>
                        </div>
                        <div>
                          <span className="font-semibold text-gray-700">Stage:</span>
                          <span className="text-gray-600 ml-2">{startup.stage}</span>
                        </div>
                        <div>
                          <span className="font-semibold text-gray-700">Funding:</span>
                          <span className="text-gray-600 ml-2">{startup.funding}</span>
                        </div>
                        <div>
                          <span className="font-semibold text-gray-700">Status:</span>
                          <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                            startup.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {startup.status}
                          </span>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-700 mb-2">Achievements:</h4>
                        <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                          {startup.achievements.map((achievement, index) => (
                            <li key={index}>{achievement}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="pt-4 border-t border-gray-200">
                        <div className="flex items-center space-x-2">
                          <Users className="h-4 w-4 text-blue-600" />
                          <span className="text-sm text-gray-600">Mentor: {startup.mentor}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Facilities */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Building className="h-6 w-6 text-orange-600 mr-2" />
                Facilities
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {incubationData.facilities.map((facility) => (
                  <Card key={facility.id} className="h-full">
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">{facility.name}</h3>
                      <p className="text-gray-600 text-sm mb-4">{facility.description}</p>
                      
                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-700 mb-2">Features:</h4>
                        <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                          {facility.features.map((feature, index) => (
                            <li key={index}>{feature}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                        <div>
                          <span className="font-semibold text-gray-700">Capacity:</span>
                          <span className="text-gray-600 ml-2">{facility.capacity}</span>
                        </div>
                        <div>
                          <span className="font-semibold text-gray-700">Incharge:</span>
                          <span className="text-gray-600 ml-2">{facility.incharge}</span>
                        </div>
                      </div>
                      
                      <div className="pt-4 border-t border-gray-200">
                        <div className="flex items-center space-x-2">
                          <Phone className="h-4 w-4 text-green-600" />
                          <span className="text-sm text-gray-600">{facility.contact}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Programs */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Award className="h-6 w-6 text-yellow-600 mr-2" />
                Programs & Challenges
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {incubationData.programs.map((program) => (
                  <Card key={program.id} className="h-full">
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">{program.name}</h3>
                      <p className="text-gray-600 text-sm mb-4">{program.description}</p>
                      
                      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                        <div>
                          <span className="font-semibold text-gray-700">Duration:</span>
                          <span className="text-gray-600 ml-2">{program.duration}</span>
                        </div>
                        <div>
                          <span className="font-semibold text-gray-700">Eligibility:</span>
                          <span className="text-gray-600 ml-2">{program.eligibility}</span>
                        </div>
                      </div>
                      
                      {program.prizes && (
                        <div className="mb-4">
                          <h4 className="font-semibold text-gray-700 mb-2">Prizes:</h4>
                          <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                            {program.prizes.map((prize, index) => (
                              <li key={index}>{prize}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {program.benefits && (
                        <div className="mb-4">
                          <h4 className="font-semibold text-gray-700 mb-2">Benefits:</h4>
                          <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                            {program.benefits.map((benefit, index) => (
                              <li key={index}>{benefit}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {program.topics && (
                        <div className="mb-4">
                          <h4 className="font-semibold text-gray-700 mb-2">Topics:</h4>
                          <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                            {program.topics.map((topic, index) => (
                              <li key={index}>{topic}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {program.timeline && (
                        <div className="mb-4">
                          <h4 className="font-semibold text-gray-700 mb-2">Timeline:</h4>
                          <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                            {program.timeline.map((item, index) => (
                              <li key={index}>{item}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      <div className="pt-4 border-t border-gray-200">
                        <div className="flex items-center space-x-2 mb-2">
                          <Users className="h-4 w-4 text-blue-600" />
                          <span className="text-sm font-semibold text-gray-700">{program.contact}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Phone className="h-4 w-4 text-green-600" />
                          <span className="text-sm text-gray-600">{program.phone}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Mentors */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Users className="h-6 w-6 text-indigo-600 mr-2" />
                Mentors & Experts
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {incubationData.mentors.map((mentor) => (
                  <Card key={mentor.id} className="h-full">
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">{mentor.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">{mentor.designation}</p>
                      
                      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                        <div>
                          <span className="font-semibold text-gray-700">Expertise:</span>
                          <span className="text-gray-600 ml-2">{mentor.expertise}</span>
                        </div>
                        <div>
                          <span className="font-semibold text-gray-700">Experience:</span>
                          <span className="text-gray-600 ml-2">{mentor.experience}</span>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-700 mb-2">Specialization:</h4>
                        <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                          {mentor.specialization.map((spec, index) => (
                            <li key={index}>{spec}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="pt-4 border-t border-gray-200">
                        <div className="space-y-2 text-sm">
                          <div>
                            <span className="font-semibold text-gray-700">Contact:</span>
                            <span className="text-gray-600 ml-2">{mentor.contact}</span>
                          </div>
                          <div>
                            <span className="font-semibold text-gray-700">Email:</span>
                            <span className="text-gray-600 ml-2">{mentor.email}</span>
                          </div>
                          <div>
                            <span className="font-semibold text-gray-700">Availability:</span>
                            <span className="text-gray-600 ml-2">{mentor.availability}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Success Stories */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Target className="h-6 w-6 text-green-600 mr-2" />
                Success Stories
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {incubationData.successStories.map((story) => (
                  <Card key={story.id} className="h-full">
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{story.startup}</h3>
                      <p className="text-sm text-gray-600 mb-3">Founder: {story.founder}</p>
                      <p className="text-sm text-gray-700 mb-4">{story.story}</p>
                      
                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-700 mb-2">Impact:</h4>
                        <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                          {story.impact.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-700 mb-2">Recognition:</h4>
                        <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                          {story.recognition.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="text-right">
                        <span className="text-xs text-gray-500">{story.year}</span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <MapPin className="h-6 w-6 text-red-600 mr-2" />
                Contact Information
              </h2>
              <Card>
                <div className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-gray-700 mb-2">Address</h4>
                          <p className="text-sm text-gray-600">{incubationData.contact.address}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-700 mb-2">Working Hours</h4>
                          <p className="text-sm text-gray-600">{incubationData.contact.workingHours}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-700 mb-2">Contact Details</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center space-x-2">
                              <Phone className="h-4 w-4 text-green-600" />
                              <span className="text-gray-600">{incubationData.contact.phone}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Mail className="h-4 w-4 text-red-600" />
                              <span className="text-gray-600">{incubationData.contact.email}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <ExternalLink className="h-4 w-4 text-blue-600" />
                              <a href={incubationData.contact.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                Visit Website
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-2">Social Media</h4>
                      <div className="space-y-2">
                        {Object.entries(incubationData.contact.socialMedia).map(([platform, url]) => (
                          <div key={platform} className="flex items-center space-x-2">
                            <ExternalLink className="h-4 w-4 text-blue-600" />
                            <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline capitalize">
                              {platform}
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}
      </Section>
    </div>
  )
}

export default Incubation