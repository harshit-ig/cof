import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Users, Building, Trophy, Calendar, Phone, Mail, MapPin, Wifi, Utensils, Car, BookOpen, GraduationCap, Award, Heart, Shield, Globe, ChevronRight } from 'lucide-react'
import Card from '../components/common/Card'

const Students = () => {
  const location = useLocation()
  const hash = location.hash.substring(1)
  const [activeTab, setActiveTab] = useState('hostels')

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

  const studentWelfare = {
    hostels: {
      title: 'Hostel Facilities',
      icon: Building,
      description: 'Comfortable and well-maintained hostel accommodation for students',
      features: [
        'Separate hostels for male and female students',
        '24/7 security and surveillance',
        'Modern amenities and facilities',
        'Regular maintenance and cleaning',
        'Hostel wardens for supervision',
        'Emergency contact systems'
      ],
      rooms: [
        'Single occupancy rooms',
        'Double sharing rooms',
        'Attached bathrooms',
        'Study tables and chairs',
        'Wardrobes and storage',
        'Balcony/verandah'
      ],
      amenities: [
        'High-speed WiFi connectivity',
        '24/7 power backup',
        'Drinking water facilities',
        'Common recreation areas',
        'Laundry services',
        'Medical assistance'
      ]
    },
    sports: {
      title: 'Sports Facilities',
      icon: Trophy,
      description: 'Comprehensive sports infrastructure for physical fitness and recreation',
      facilities: [
        'Multi-purpose sports ground',
        'Indoor sports complex',
        'Swimming pool',
        'Gymnasium with modern equipment',
        'Table tennis facilities',
        'Badminton courts'
      ],
      activities: [
        'Annual sports meet',
        'Inter-college tournaments',
        'Fitness training programs',
        'Sports coaching camps',
        'Recreational activities',
        'Team building events'
      ]
    },
    cultural: {
      title: 'Cultural Centre',
      icon: Heart,
      description: 'Platform for artistic expression and cultural development',
      activities: [
        'Music and dance performances',
        'Drama and theatre workshops',
        'Art and craft exhibitions',
        'Literary competitions',
        'Cultural festivals',
        'Talent shows'
      ],
      facilities: [
        'Auditorium with modern equipment',
        'Music room with instruments',
        'Art studio and gallery',
        'Dance practice rooms',
        'Multimedia facilities',
        'Performance spaces'
      ]
    },
    placement: {
      title: 'Placement Cell',
      icon: GraduationCap,
      description: 'Comprehensive career guidance and placement support',
      services: [
        'Career counseling sessions',
        'Resume building workshops',
        'Interview preparation',
        'Industry visits and tours',
        'Job fair organization',
        'Alumni networking'
      ],
      companies: [
        'Aquaculture companies',
        'Fisheries departments',
        'Research institutions',
        'Food processing units',
        'Environmental organizations',
        'Consultancy firms'
      ],
      statistics: {
        placementRate: '85%',
        averagePackage: '₹4.5 LPA',
        highestPackage: '₹8.2 LPA',
        companiesVisited: '25+'
      }
    },
    nss: {
      title: 'National Service Scheme (NSS)',
      icon: Shield,
      description: 'Community service and social responsibility programs',
      activities: [
        'Blood donation camps',
        'Tree plantation drives',
        'Health awareness programs',
        'Rural development projects',
        'Environmental conservation',
        'Social welfare activities'
      ],
      benefits: [
        'Community service experience',
        'Leadership development',
        'Social awareness',
        'Certificate recognition',
        'Skill development',
        'Networking opportunities'
      ]
    }
  }

  const studentLife = [
    {
      title: 'Academic Excellence',
      description: 'Rigorous academic programs with practical training',
      icon: BookOpen
    },
    {
      title: 'Research Opportunities',
      description: 'Access to cutting-edge research facilities and projects',
      icon: Globe
    },
    {
      title: 'Industry Exposure',
      description: 'Regular industry visits and internship opportunities',
      icon: Building
    },
    {
      title: 'Personal Development',
      description: 'Leadership programs and skill development workshops',
      icon: Award
    }
  ]

  const WelfarePlaceholder = ({ title }) => (
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Students Welfare</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Comprehensive support services and facilities designed to enhance your academic journey and overall development
            </p>
          </div>
        </div>
      </section>

      {/* Hostels Facilities */}
      <section id="hostels-facilities" className="section-padding bg-white">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Hostels Facilities</h2>
            <div className="w-20 h-1 bg-primary-500 rounded mx-auto"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mt-4">Comfortable and well-maintained hostel accommodation for students.</p>
          </div>
          {/* Hostel content or placeholder here */}
        </div>
      </section>

      {/* Sports Facilities */}
      <section id="sports-facilities" className="section-padding bg-gray-50">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Sports Facilities</h2>
            <div className="w-20 h-1 bg-primary-500 rounded mx-auto"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mt-4">Comprehensive sports infrastructure for physical fitness and recreation.</p>
                      </div>
          {/* Sports content or placeholder here */}
        </div>
      </section>

      {/* Cultural Centre */}
      <section id="cultural-centre" className="section-padding bg-white">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Cultural Centre</h2>
            <div className="w-20 h-1 bg-primary-500 rounded mx-auto"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mt-4">Platform for artistic expression and cultural development.</p>
          </div>
          {/* Cultural content or placeholder here */}
                    </div>
      </section>

      {/* Placement */}
      <section id="placement" className="section-padding bg-gray-50">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Placement</h2>
            <div className="w-20 h-1 bg-primary-500 rounded mx-auto"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mt-4">Comprehensive career guidance and placement support.</p>
          </div>
          {/* Placement content or placeholder here */}
        </div>
      </section>

      {/* NSS */}
      <section id="nss" className="section-padding bg-white">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">NSS</h2>
            <div className="w-20 h-1 bg-primary-500 rounded mx-auto"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mt-4">Community service and social responsibility programs.</p>
          </div>
          {/* NSS content or placeholder here */}
        </div>
      </section>

      {/* Student Life */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Student Life</h2>
            <div className="w-20 h-1 bg-primary-500 rounded mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {studentLife.map((item, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-xl transition-all duration-300">
                <div className="w-16 h-16 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section-padding bg-primary-600 text-white">
        <div className="container-max text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Student Community</h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Experience comprehensive student support, world-class facilities, and a 
            nurturing environment for your academic and personal growth
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/programs"
              className="btn-accent"
            >
              View Programs
            </Link>
            <Link
              to="/contact"
              className="btn-outline border-white text-white hover:bg-white hover:text-primary-600"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Students