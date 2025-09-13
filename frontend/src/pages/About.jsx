import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Users, Award, Building, Globe, BookOpen, Target, Eye, User, Users2, Settings } from 'lucide-react'
import Card from '../components/common/Card'
import { contentAPI, uploadAPI } from '../services/api'

const About = () => {
  const location = useLocation()
  const hash = location.hash.substring(1)
  const [welcomeData, setWelcomeData] = useState({
    deanName: 'Dean',
    deanTitle: 'College of Fishery, Jabalpur',
    deanPhoto: '/cllg.jpg',
    welcomeMessage: 'Welcome to the College of Fishery, Jabalpur. Our institution is committed to providing quality education in fishery science and aquaculture, fostering innovation and sustainable practices. We prepare our students to become leaders in the fishery sector, contributing to food security and sustainable development.'
  })

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

  // Fetch dean's welcome message
  useEffect(() => {
    fetchWelcomeData()
  }, [])

  const fetchWelcomeData = async () => {
    try {
      const response = await contentAPI.getByKey('dean-welcome-message')
      const data = response.data
      
      if (data.success && data.data.content) {
        const content = data.data.content
        let welcomeInfo = {}
        
        // Parse the content based on type
        if (content.type === 'json') {
          try {
            welcomeInfo = JSON.parse(content.content)
          } catch (e) {
            console.warn('Failed to parse JSON content, using metadata')
            welcomeInfo = content.metadata || {}
          }
        } else {
          // Fallback to metadata
          welcomeInfo = content.metadata || {}
        }
        
        // Update welcome data with fetched information
        setWelcomeData({
          deanName: welcomeInfo.deanName || 'Dean',
          deanTitle: welcomeInfo.deanTitle || 'College of Fishery, Jabalpur',
          deanPhoto: welcomeInfo.deanPhoto || '/cllg.jpg',
          welcomeMessage: welcomeInfo.welcomeMessage || 'Welcome to the College of Fishery, Jabalpur. Our institution is committed to providing quality education in fishery science and aquaculture, fostering innovation and sustainable practices.'
        })
      }
    } catch (error) {
      console.error('Error fetching welcome data:', error)
      // Continue with default content if API fails
    }
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-blue-400 via-blue-500 to-green-400 text-white">
        <div className="container-max">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              About Our College
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Excellence in Fishery Education & Research since 2018
            </p>
          </div>
        </div>
      </section>

      {/* Dean's Message */}
      <section id="dean-message" className="section-padding bg-gray-50">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <img 
                src={welcomeData.deanPhoto.startsWith('http') ? welcomeData.deanPhoto : uploadAPI.getImageUrl(welcomeData.deanPhoto, 'dean')} 
                alt={welcomeData.deanName} 
                className="w-full max-w-sm h-80 object-contain rounded-lg shadow-lg mx-auto border-4 border-gray-200 bg-white"
                onError={(e) => {
                  if (!e.target.dataset.fallbackUsed) {
                    e.target.dataset.fallbackUsed = 'true'
                    e.target.src = uploadAPI.getImageUrl('COF NEW.png', 'images')
                  }
                }}
              />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Message from the Dean</h2>
              <p className="text-gray-700 mb-4">
                {welcomeData.welcomeMessage}
              </p>
              <div className="border-t pt-4 mt-6">
                <p className="font-semibold text-gray-900">{welcomeData.deanName}</p>
                <p className="text-gray-600">{welcomeData.deanTitle}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section id="vision" className="section-padding bg-white">
        <div className="container-max">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Vision & Mission</h2>
            <div className="w-16 h-1 bg-blue-400 rounded mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="text-center p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Eye className="w-6 h-6 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Our Vision</h3>
              <p className="text-gray-700">
                To be a globally recognized institution for excellence in fishery education, research, 
                and extension services, fostering innovation and sustainable practices.
              </p>
            </Card>
            
            <Card className="text-center p-6">
              <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Target className="w-6 h-6 text-secondary-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Our Mission</h3>
              <p className="text-gray-700">
                To provide quality education in fishery science and aquaculture, conduct cutting-edge research, 
                and disseminate knowledge for sustainable development of the fishery sector.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Organizational Structure */}
      <section id="structure" className="section-padding bg-gray-50">
        <div className="container-max">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Organizational Structure</h2>
            <div className="w-16 h-1 bg-blue-400 rounded mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="text-center p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <User className="w-6 h-6 text-blue-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Dean</h3>
              <p className="text-gray-600 text-sm">Academic & Administrative Leadership</p>
            </Card>
            
            <Card className="text-center p-6">
              <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-secondary-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Faculty</h3>
              <p className="text-gray-600 text-sm">Academic & Research Staff</p>
            </Card>
            
            <Card className="text-center p-6">
              <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Settings className="w-6 h-6 text-accent-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Administration</h3>
              <p className="text-gray-600 text-sm">Support & Operations</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Governing Body */}
      <section id="governing-body" className="section-padding bg-white">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Governing Body</h2>
            <div className="w-20 h-1 bg-blue-400 rounded mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our college is governed by a distinguished body of academics, administrators, and industry experts 
              who provide strategic direction and oversight for institutional excellence.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Chairman */}
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Chairman</h3>
              <p className="text-blue-600 font-medium mb-2">Vice Chancellor</p>
              <p className="text-sm text-gray-600">Nanaji Deshmukh Veterinary Science University</p>
            </Card>

            {/* Dean */}
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Dean & Director</h3>
              <p className="text-blue-600 font-medium mb-2">Ex-Officio Member</p>
              <p className="text-sm text-gray-600">College of Fishery, Jabalpur</p>
            </Card>

            {/* Registrar */}
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Settings className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Registrar</h3>
              <p className="text-blue-600 font-medium mb-2">Ex-Officio Member</p>
              <p className="text-sm text-gray-600">Administrative Affairs</p>
            </Card>

            {/* Director Research */}
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-10 h-10 text-gray-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Director of Research</h3>
              <p className="text-gray-600 font-medium mb-2">Ex-Officio Member</p>
              <p className="text-sm text-gray-600">Research & Development</p>
            </Card>

            {/* Government Representative */}
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building className="w-10 h-10 text-gray-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Government Representative</h3>
              <p className="text-gray-600 font-medium mb-2">Nominated Member</p>
              <p className="text-sm text-gray-600">Ministry of Fishery, Animal Husbandry & Dairying</p>
            </Card>

            {/* Industry Expert */}
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-10 h-10 text-gray-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Industry Expert</h3>
              <p className="text-gray-600 font-medium mb-2">External Member</p>
              <p className="text-sm text-gray-600">Aquaculture & Fishery Industry</p>
            </Card>
          </div>

          {/* Additional Information */}
          <div className="mt-12 bg-gray-50 rounded-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Key Responsibilities</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <Target className="w-5 h-5 text-blue-500 mr-2" />
                  Strategic Governance
                </h4>
                <ul className="text-gray-700 space-y-2 text-sm">
                  <li>• Policy formulation and implementation</li>
                  <li>• Academic quality assurance</li>
                  <li>• Resource allocation and planning</li>
                  <li>• Institutional development oversight</li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <Award className="w-5 h-5 text-blue-500 mr-2" />
                  Academic Excellence
                </h4>
                <ul className="text-gray-700 space-y-2 text-sm">
                  <li>• Curriculum development and review</li>
                  <li>• Faculty appointment and promotion</li>
                  <li>• Research program evaluation</li>
                  <li>• Student welfare and development</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Us */}
      <section className="section-padding bg-blue-500 text-white">
        <div className="container-max">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Contact Us</h2>
            <p className="text-blue-100 text-sm mb-4">Get in touch with our college for admissions and inquiries</p>
            <div className="space-y-2 text-sm">
              <p>📧 cofjabalpur@email.com</p>
              <p>📞 +91-761-2345678</p>
              <p>📍 Jabalpur, Madhya Pradesh</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About






