import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Users, Award, Building, Globe, BookOpen, Target, Eye, User, Users2, Settings } from 'lucide-react'
import Card from '../components/common/Card'
import { contentAPI, uploadAPI } from '../services/api'

const About = () => {
  const location = useLocation()
  const hash = location.hash.substring(1)
  const [welcomeData, setWelcomeData] = useState({
    deanName: '',
    deanTitle: '',
    deanPhoto: '',
    welcomeMessage: ''
  })
  
  const [aboutContent, setAboutContent] = useState({
    vision: '',
    mission: '',
    history: ''
  })

  const [mandateContent, setMandateContent] = useState({
    core: [],
    objectives: [],
    thrust: []
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

  // Fetch dean's welcome message and about content
  useEffect(() => {
    fetchWelcomeData()
    fetchAboutContent()
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
          deanName: welcomeInfo.deanName || '',
          deanTitle: welcomeInfo.deanTitle || '',
          deanPhoto: welcomeInfo.deanPhoto || '',
          welcomeMessage: welcomeInfo.welcomeMessage || ''
        })
      }
    } catch (error) {
      console.error('Error fetching welcome data:', error)
      // Continue with default content if API fails
    }
  }

  const fetchAboutContent = async () => {
    try {
      // Fetch all about sections including mandate
      const [visionRes, missionRes, historyRes, mandateCoreRes, mandateObjectivesRes, mandateThrustRes] = await Promise.allSettled([
        contentAPI.getByKey('about-vision'),
        contentAPI.getByKey('about-mission'),
        contentAPI.getByKey('about-history'),
        contentAPI.getByKey('about-mandate-core'),
        contentAPI.getByKey('about-mandate-objectives'),
        contentAPI.getByKey('about-mandate-thrust')
      ])

      const newContent = { ...aboutContent }
      const newMandateContent = { ...mandateContent }

      // Process vision
      if (visionRes.status === 'fulfilled' && visionRes.value.data.success) {
        newContent.vision = visionRes.value.data.data.content.content || newContent.vision
      }

      // Process mission
      if (missionRes.status === 'fulfilled' && missionRes.value.data.success) {
        newContent.mission = missionRes.value.data.data.content.content || newContent.mission
      }

      // Process history
      if (historyRes.status === 'fulfilled' && historyRes.value.data.success) {
        newContent.history = historyRes.value.data.data.content.content || newContent.history
      }

      // Process mandate core
      if (mandateCoreRes.status === 'fulfilled' && mandateCoreRes.value.data.success) {
        const content = mandateCoreRes.value.data.data.content.content
        if (content) {
          try {
            newMandateContent.core = JSON.parse(content)
          } catch (e) {
            newMandateContent.core = content.split('\n').filter(item => item.trim())
          }
        }
      }

      // Process mandate objectives
      if (mandateObjectivesRes.status === 'fulfilled' && mandateObjectivesRes.value.data.success) {
        const content = mandateObjectivesRes.value.data.data.content.content
        if (content) {
          try {
            newMandateContent.objectives = JSON.parse(content)
          } catch (e) {
            newMandateContent.objectives = content.split('\n').filter(item => item.trim())
          }
        }
      }

      // Process mandate thrust
      if (mandateThrustRes.status === 'fulfilled' && mandateThrustRes.value.data.success) {
        const content = mandateThrustRes.value.data.data.content.content
        if (content) {
          try {
            newMandateContent.thrust = JSON.parse(content)
          } catch (e) {
            newMandateContent.thrust = content.split('\n').filter(item => item.trim())
          }
        }
      }

      setAboutContent(newContent)
      setMandateContent(newMandateContent)
    } catch (error) {
      console.error('Error fetching about content:', error)
      // Continue with default content if API fails
    }
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
            <section className="section-padding bg-blue-600 text-white">
        <div className="container-max">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              About Our College
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Excellence in Fishery Education & Research since 2012
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
              <p className="text-gray-700 mb-4 text-left">
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
            <Card className="p-6">
              <div className="text-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Eye className="w-6 h-6 text-blue-500" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Our Vision</h3>
              </div>
              <div className="text-gray-700 text-left" dangerouslySetInnerHTML={{ __html: aboutContent.vision }} />
            </Card>
            
            <Card className="p-6">
              <div className="text-center mb-4">
                <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Target className="w-6 h-6 text-secondary-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Our Mission</h3>
              </div>
              <div className="text-gray-700 text-left" dangerouslySetInnerHTML={{ __html: aboutContent.mission }} />
            </Card>
          </div>
        </div>
      </section>

      {/* History */}
      <section id="history" className="section-padding bg-gray-50">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">History of College</h2>
            <div className="w-20 h-1 bg-blue-400 rounded mx-auto mb-6"></div>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <Card className="p-8">
              <div className="prose prose-lg max-w-none text-gray-700 text-left" dangerouslySetInnerHTML={{ __html: aboutContent.history }} />
            </Card>
          </div>
        </div>
      </section>

      {/* Mandate */}
      <section id="mandate" className="section-padding bg-white">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Mandate</h2>
            <div className="w-20 h-1 bg-blue-400 rounded mx-auto mb-6"></div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Core Mandate */}
            <Card className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Target className="w-6 h-6 text-blue-500 mr-2" />
                Core Mandate
              </h3>
              <ul className="space-y-3 text-gray-700 text-left">
                {mandateContent.core.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </Card>

            {/* Objectives & Thrust Areas */}
            <div className="space-y-6">
              <Card className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <Award className="w-6 h-6 text-green-500 mr-2" />
                  Objectives
                </h3>
                <ul className="space-y-2 text-gray-700 text-left">
                  {mandateContent.objectives.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-green-500 mr-2">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <BookOpen className="w-6 h-6 text-purple-500 mr-2" />
                  Thrust Areas
                </h3>
                <ul className="space-y-2 text-gray-700 text-left">
                  {mandateContent.thrust.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-purple-500 mr-2">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About






