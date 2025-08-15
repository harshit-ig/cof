import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Users, Award, Building, Globe, BookOpen, Target, Eye, Users2, Phone, Mail, MapPin, Calendar, ChevronRight } from 'lucide-react'
import Card from '../components/common/Card'

const About = () => {
  const location = useLocation()
  const hash = location.hash.substring(1)

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

  const achievements = [
    {
      icon: Award,
      title: 'ICAR Recognition',
      description: 'Recognized by Indian Council of Agricultural Research for excellence in fisheries education'
    },
    {
      icon: Users,
      title: 'Student Success',
      description: 'Over 1200+ students enrolled with excellent placement records'
    },
    {
      icon: Building,
      title: 'Modern Infrastructure',
      description: 'State-of-the-art laboratories and research facilities'
    },
    {
      icon: Globe,
      title: 'Research Excellence',
      description: 'Multiple research projects and publications in fisheries science'
    }
  ]

  const organizationalStructure = [
    {
      title: 'Dean',
      description: 'Dr. Shashikant Mahajan',
      responsibilities: ['Overall administration', 'Academic leadership', 'Strategic planning']
    },
    {
      title: 'Teaching Faculty',
      description: 'Expert faculty members',
      responsibilities: ['Academic delivery', 'Research guidance', 'Student mentoring']
    },
    {
      title: 'Non-Teaching Staff',
      description: 'Support staff',
      responsibilities: ['Administrative support', 'Technical assistance', 'Student services']
    },
    {
      title: 'Department Heads',
      description: 'Department coordinators',
      responsibilities: ['Department management', 'Curriculum coordination', 'Research oversight']
    }
  ]

  const importantContacts = [
    {
      icon: Phone,
      title: 'Phone',
      details: ['0645-231375', 'Office: 0645-231375'],
      description: 'Main office contact number'
    },
    {
      icon: Mail,
      title: 'Email',
      details: ['deancof_basu_bih@gov.in', 'info@cofbasu.edu.in'],
      description: 'Primary communication channels'
    },
    {
      icon: MapPin,
      title: 'Address',
      details: [
        'College of Fisheries, Kishanganj',
        'DKAC Campus, Arrabari',
        'Kishanganj-855107, Bihar'
      ],
      description: 'Main campus location'
    },
    {
      icon: Calendar,
      title: 'Office Hours',
      details: ['Monday - Friday: 9:00 AM - 5:00 PM', 'Saturday: 9:00 AM - 1:00 PM'],
      description: 'Administrative office timings'
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600 text-white">
        <div className="container-max section-padding">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About College of Fisheries</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Discover our rich history, vision, and commitment to excellence in fisheries education and research
            </p>
          </div>
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => scrollToSection('dean-message')}
              className="px-6 py-3 bg-primary-100 text-primary-700 rounded-lg hover:bg-primary-200 transition-colors"
            >
              Dean's Message
            </button>
            <button
              onClick={() => scrollToSection('history')}
              className="px-6 py-3 bg-secondary-100 text-secondary-700 rounded-lg hover:bg-secondary-200 transition-colors"
            >
              History
            </button>
            <button
              onClick={() => scrollToSection('vision')}
              className="px-6 py-3 bg-accent-100 text-accent-700 rounded-lg hover:bg-accent-200 transition-colors"
            >
              Vision & Mission
            </button>
            <button
              onClick={() => scrollToSection('structure')}
              className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Organizational Structure
            </button>
            <button
              onClick={() => scrollToSection('contacts')}
              className="px-6 py-3 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
            >
              Important Contacts
            </button>
          </div>
        </div>
      </section>

      {/* Dean's Message */}
      <section id="dean-message" className="section-padding bg-gray-50">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src={`/api/proxy/image?url=${encodeURIComponent('https://www.ndvsu.org/images/Shashikant.jpg')}`}
                alt="Dean's Photo"
                className="w-full h-96 object-cover rounded-lg shadow-lg"
              />
            </div>
            
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Dean's Message</h2>
                <div className="w-20 h-1 bg-primary-500 rounded"></div>
              </div>
              
              <blockquote className="text-lg text-gray-700 leading-relaxed italic">
                "Welcome to College of Fisheries, Kishanganj, where we are committed to excellence 
                in fisheries education and research. Our mission is to develop skilled 
                professionals who will contribute to sustainable aquaculture and fisheries 
                management for the benefit of society."
              </blockquote>
              
              <p className="text-gray-700 leading-relaxed">
                The College of Fisheries, Kishanganj was incorporated in the Bihar Animal Sciences University Act 
                as one of its constituent colleges. This College is situated on the banks of river Mahananda in 
                the campus of Dr. Kalam Agriculture College at Arrabari in Kishanganj district of Bihar.
              </p>
              
              <p className="text-gray-700 leading-relaxed">
                This college offers a credible fisheries education institution that nurtures the next-generation 
                of professionals and entrepreneurs in the fisheries sector and contributes to the state and nation 
                by pursuing innovations and research which is relevant to local needs and directed towards 
                maximizing outcomes for economic, social and environmental well-being.
              </p>
              
              <div>
                <p className="font-semibold text-gray-900">Dr. Shashikant Mahajan</p>
                <p className="text-gray-600">Dean, College of Fisheries, Kishanganj</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* History */}
      <section id="history" className="section-padding bg-white">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our History</h2>
            <div className="w-20 h-1 bg-primary-500 rounded mx-auto"></div>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              <div className="flex items-start space-x-6">
                <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">2018 - Foundation</h3>
                  <p className="text-gray-700">
                    The Hon'ble Chief Minister of Bihar, Shri Nitish Kumar formally inaugurated and announced 
                    the start of first academic session of this college on 29th August 2018.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-6">
                <div className="w-12 h-12 bg-secondary-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Building className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Strategic Location</h3>
                  <p className="text-gray-700">
                    Situated on the banks of river Mahananda in the campus of Dr. Kalam Agriculture College 
                    at Arrabari in Kishanganj district of Bihar, providing an ideal environment for fisheries studies.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-6">
                <div className="w-12 h-12 bg-accent-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Academic Excellence</h3>
                  <p className="text-gray-700">
                    Over the years, we have established ourselves as a leading institution in fisheries education, 
                    research, and extension services, contributing significantly to the development of the fisheries sector.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section id="vision" className="section-padding bg-gray-50">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Vision & Mission</h2>
            <div className="w-20 h-1 bg-primary-500 rounded mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="text-center p-8">
              <div className="w-16 h-16 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-6">
                <Eye className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-700 leading-relaxed">
                To be a globally recognized institution for excellence in fisheries education, research, 
                and extension services, fostering innovation and sustainable practices in aquatic resource management.
              </p>
            </Card>
            
            <Card className="text-center p-8">
              <div className="w-16 h-16 bg-secondary-100 rounded-lg flex items-center justify-center mx-auto mb-6">
                <Target className="w-8 h-8 text-secondary-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-700 leading-relaxed">
                To provide quality education in fisheries science and aquaculture, conduct cutting-edge research, 
                and disseminate knowledge to stakeholders for sustainable development of the fisheries sector.
              </p>
            </Card>
          </div>
          
          <div className="mt-12">
            <Card className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Core Values</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Award className="w-6 h-6 text-accent-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Excellence</h4>
                  <p className="text-gray-600 text-sm">Commitment to highest standards in education and research</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Globe className="w-6 h-6 text-green-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Sustainability</h4>
                  <p className="text-gray-600 text-sm">Promoting sustainable practices in fisheries management</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Users2 className="w-6 h-6 text-blue-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Innovation</h4>
                  <p className="text-gray-600 text-sm">Fostering creativity and technological advancement</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Achievements</h2>
            <div className="w-20 h-1 bg-primary-500 rounded mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-xl transition-all duration-300">
                <div className="w-16 h-16 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <achievement.icon className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{achievement.title}</h3>
                <p className="text-gray-600 text-sm">{achievement.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Organizational Structure */}
      <section id="structure" className="section-padding bg-gray-50">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Organizational Structure</h2>
            <div className="w-20 h-1 bg-primary-500 rounded mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {organizationalStructure.map((item, index) => (
              <Card key={index} className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-primary-600 font-medium mb-4">{item.description}</p>
                <ul className="space-y-2">
                  {item.responsibilities.map((responsibility, idx) => (
                    <li key={idx} className="flex items-center text-gray-700">
                      <div className="w-2 h-2 bg-primary-500 rounded-full mr-3"></div>
                      {responsibility}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Important Contacts */}
      <section id="contacts" className="section-padding bg-white">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Important Contacts</h2>
            <div className="w-20 h-1 bg-primary-500 rounded mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {importantContacts.map((contact, index) => (
              <Card key={index} className="text-center p-6">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <contact.icon className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{contact.title}</h3>
                <div className="space-y-2 mb-3">
                  {contact.details.map((detail, idx) => (
                    <p key={idx} className="text-gray-700 text-sm">{detail}</p>
                  ))}
                </div>
                <p className="text-gray-600 text-xs">{contact.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section-padding bg-primary-600 text-white">
        <div className="container-max text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Institution</h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Be part of our journey towards excellence in fisheries education and research. 
            Explore our programs and discover your potential.
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

export default About