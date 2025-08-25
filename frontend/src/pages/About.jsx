import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Users, Award, Building, Globe, BookOpen, Target, Eye, User, Users2, Settings } from 'lucide-react'
import Card from '../components/common/Card'

const About = () => {
  const location = useLocation()
  const hash = location.hash.substring(1)
  const [welcomeData, setWelcomeData] = useState({
    deanName: 'Dean',
    deanTitle: 'College of Fisheries, Jabalpur',
    deanPhoto: '/cllg.jpg',
    welcomeMessage: 'Welcome to the College of Fisheries, Jabalpur. Our institution is committed to providing quality education in fisheries science and aquaculture, fostering innovation and sustainable practices. We prepare our students to become leaders in the fisheries sector, contributing to food security and sustainable development.'
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
      const response = await fetch('/api/content/key/dean-welcome-message')
      const data = await response.json()
      
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
          deanTitle: welcomeInfo.deanTitle || 'College of Fisheries, Jabalpur',
          deanPhoto: welcomeInfo.deanPhoto || '/cllg.jpg',
          welcomeMessage: welcomeInfo.welcomeMessage || 'Welcome to the College of Fisheries, Jabalpur. Our institution is committed to providing quality education in fisheries science and aquaculture, fostering innovation and sustainable practices.'
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
              Excellence in Fisheries Education & Research since 2018
            </p>
          </div>
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="section-padding-sm bg-white border-b border-gray-200">
        <div className="container-max">
          <div className="flex flex-wrap justify-center gap-3">
            <button 
              onClick={() => scrollToSection('dean-message')}
              className="px-4 py-2 text-sm border border-blue-300 text-blue-500 rounded-lg hover:bg-blue-50 transition-colors"
            >
              Dean's Message
            </button>
            <button 
              onClick={() => scrollToSection('vision')}
              className="px-4 py-2 text-sm border border-blue-300 text-blue-500 rounded-lg hover:bg-blue-50 transition-colors"
            >
              Vision & Mission
            </button>
            <button 
              onClick={() => scrollToSection('structure')}
              className="px-4 py-2 text-sm border border-blue-300 text-blue-500 rounded-lg hover:bg-blue-50 transition-colors"
            >
              Organization
            </button>
          </div>
        </div>
      </section>

      {/* Dean's Message */}
      <section id="dean-message" className="section-padding bg-gray-50">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <img 
                src={welcomeData.deanPhoto.startsWith('http') ? welcomeData.deanPhoto : welcomeData.deanPhoto} 
                alt={welcomeData.deanName} 
                className="w-full max-w-md h-80 object-cover rounded-lg shadow-lg mx-auto"
                onError={(e) => {
                  e.target.src = '/COF NEW.png'
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
                To be a globally recognized institution for excellence in fisheries education, research, 
                and extension services, fostering innovation and sustainable practices.
              </p>
            </Card>
            
            <Card className="text-center p-6">
              <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Target className="w-6 h-6 text-secondary-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Our Mission</h3>
              <p className="text-gray-700">
                To provide quality education in fisheries science and aquaculture, conduct cutting-edge research, 
                and disseminate knowledge for sustainable development of the fisheries sector.
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

