import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight, Bell, FileText, ExternalLink, Calendar, Users, Award, BookOpen } from 'lucide-react'
import Card from '../components/common/Card'
import HeroSlideshow from '../components/common/HeroSlideshow'
import { newsAPI, eventsAPI, contentAPI } from '../services/api'

const Home = () => {
  const [latestNews, setLatestNews] = useState([])
  const [upcomingEvents, setUpcomingEvents] = useState([])
  const [deanMessage, setDeanMessage] = useState('')
  const [welcomeData, setWelcomeData] = useState({
    deanName: 'Dr. Shashikant Mahajan',
    deanTitle: 'Dean, College of Fishery, Jabalpur',
    deanPhoto: '/cllg.jpg',
    welcomeMessage: 'Welcome to the College of Fishery, Jabalpur. We are committed to excellence in aquaculture education and research, developing skilled professionals for sustainable fishery management.'
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchHomeData()
  }, [])

  const fetchHomeData = async () => {
    try {
      setLoading(true)
      
      // Fetch essential data only with proper error handling
      const promises = [
        newsAPI.getAll({ limit: 4, featured: true }).catch(err => ({ error: true, message: err.message })),
        eventsAPI.getUpcoming({ limit: 3 }).catch(err => ({ error: true, message: err.message })),
        fetch('/api/content/key/dean-welcome-message').catch(err => ({ error: true, message: err.message }))
      ]

      const [newsResponse, eventsResponse, welcomeResponse] = await Promise.all(promises)

      // Process news data with safety checks
      if (newsResponse && !newsResponse.error && newsResponse.data?.success) {
        setLatestNews(Array.isArray(newsResponse.data.data?.newsEvents) ? newsResponse.data.data.newsEvents : [])
      }

      // Process events data with safety checks
      if (eventsResponse && !eventsResponse.error && eventsResponse.data?.success) {
        setUpcomingEvents(Array.isArray(eventsResponse.data.data?.events) ? eventsResponse.data.data.events : [])
      }

      // Process dean's welcome message with safety checks
      if (welcomeResponse && !welcomeResponse.error) {
        const welcomeData = await welcomeResponse.json()
        if (welcomeData.success && welcomeData.data.content) {
          const content = welcomeData.data.content
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
            deanName: welcomeInfo.deanName || 'Dr. Shashikant Mahajan',
            deanTitle: welcomeInfo.deanTitle || 'Dean, College of Fishery, Jabalpur',
            deanPhoto: welcomeInfo.deanPhoto || '/cllg.jpg',
            welcomeMessage: welcomeInfo.welcomeMessage || 'Welcome to the College of Fishery, Jabalpur. We are committed to excellence in aquaculture education and research, developing skilled professionals for sustainable fishery management.'
          })
        }
      }

    } catch (error) {
      console.error('Error fetching home data:', error)
      // Continue with default content if APIs fail
    } finally {
      setLoading(false)
    }
  }

  const quickLinks = [
    {
      title: 'Admission Guidelines',
      href: '/student-corner',
      icon: BookOpen,
      description: 'Information about admission process and requirements'
    },
    {
      title: 'Academic Programs',
      href: '/programs',
      icon: Award,
      description: 'Explore our undergraduate and postgraduate programs'
    },
    {
      title: 'Research Activities',
      href: '/research',
      icon: FileText,
      description: 'Ongoing research projects and publications'
    },
    {
      title: 'Campus Facilities',
      href: '/infrastructure',
      icon: Users,
      description: 'Modern labs, hatcheries, and campus amenities'
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Slideshow */}
      <HeroSlideshow />

      {/* Main Content */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Dean's Welcome Message */}
            <div className="lg:col-span-2">
              <Card className="mb-8">
                <div className="flex items-center mb-6">
                  <div className="w-1 h-8 bg-green-600 rounded mr-3"></div>
                  <h2 className="text-2xl font-bold text-gray-900">Welcome from the Dean</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-1">
                    <img
                      src={welcomeData.deanPhoto.startsWith('http') ? welcomeData.deanPhoto : welcomeData.deanPhoto}
                      alt={welcomeData.deanName}
                      className="w-full h-48 md:h-56 lg:h-64 object-cover rounded-lg shadow-md"
                      sizes="(max-width: 768px) 100vw, 33vw"
                      loading="lazy"
                      onError={(e) => {
                        e.target.src = '/COF NEW.png'
                      }}
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <blockquote className="text-gray-700 text-lg leading-relaxed italic mb-4">
                      "{welcomeData.welcomeMessage}"
                    </blockquote>
                    
                    <div className="border-t pt-4">
                      <p className="font-semibold text-gray-900">{welcomeData.deanName}</p>
                      <p className="text-gray-600">{welcomeData.deanTitle}</p>
                    </div>
                    
                    <Link
                      to="/about"
                      className="inline-flex items-center mt-4 text-green-700 hover:text-green-800 font-medium"
                    >
                      Read Full Message
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </Card>

              {/* Latest Updates */}
              <Card>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <Bell className="w-5 h-5 text-green-600 mr-2" />
                    <h3 className="text-xl font-semibold text-gray-900">Latest Updates & Announcements</h3>
                  </div>
                  <Link
                    to="/news"
                    className="text-green-700 hover:text-green-800 text-sm font-medium"
                  >
                    View All
                  </Link>
                </div>
                
                {loading ? (
                  <div className="space-y-4">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="animate-pulse">
                        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {latestNews.length > 0 ? (
                      latestNews.map((news, index) => (
                        <div key={index} className="border-l-4 border-green-500 pl-4 py-2 hover:bg-gray-50 transition-colors">
                          <h4 className="font-medium text-gray-900 mb-1">
                            <Link to={`/news/${news.id}`} className="hover:text-green-700">
                              {news.title}
                            </Link>
                          </h4>
                          <p className="text-sm text-gray-600 mb-1">{news.summary}</p>
                          <p className="text-xs text-gray-500">
                            {new Date(news.date).toLocaleDateString('en-US', { 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            })}
                          </p>
                        </div>
                      ))
                    ) : (
                      <div className="space-y-4">
                        <div className="border-l-4 border-yellow-500 pl-4 py-2">
                          <h4 className="font-medium text-gray-900 mb-1">Academic Calendar 2025-26</h4>
                          <p className="text-sm text-gray-600 mb-1">New academic session begins with orientation program</p>
                          <p className="text-xs text-gray-500">September 15, 2025</p>
                        </div>
                        <div className="border-l-4 border-blue-500 pl-4 py-2">
                          <h4 className="font-medium text-gray-900 mb-1">Admission Open for B.F.Sc Program</h4>
                          <p className="text-sm text-gray-600 mb-1">Applications are now being accepted for the new session</p>
                          <p className="text-xs text-gray-500">August 20, 2025</p>
                        </div>
                        <div className="border-l-4 border-green-500 pl-4 py-2">
                          <h4 className="font-medium text-gray-900 mb-1">Research Conference on Aquaculture</h4>
                          <p className="text-sm text-gray-600 mb-1">International conference on sustainable fishery practices</p>
                          <p className="text-xs text-gray-500">August 25, 2025</p>
                        </div>
                        <div className="border-l-4 border-purple-500 pl-4 py-2">
                          <h4 className="font-medium text-gray-900 mb-1">New Research Publications</h4>
                          <p className="text-sm text-gray-600 mb-1">Faculty publications in international journals</p>
                          <p className="text-xs text-gray-500">August 18, 2025</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Links */}
              <Card>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h3>
                <div className="space-y-3">
                  {quickLinks.map((link, index) => {
                    const IconComponent = link.icon
                    return (
                      <Link
                        key={index}
                        to={link.href}
                        className="flex items-start p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                      >
                        <IconComponent className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 group-hover:text-green-700 mb-1">
                            {link.title}
                          </h4>
                          <p className="text-sm text-gray-600">{link.description}</p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-green-600 mt-1" />
                      </Link>
                    )
                  })}
                </div>
              </Card>

              {/* Important Notice */}
              <Card className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200">
                <div className="flex items-center mb-3">
                  <FileText className="w-5 h-5 text-green-600 mr-2" />
                  <h3 className="text-lg font-semibold text-gray-900">Important Notice</h3>
                </div>
                <p className="text-gray-700 mb-3">
                  Admission process for B.F.Sc (Bachelor of Fishery Science) program 2025-26 is now open.
                </p>
                <Link
                  to="/student-corner"
                  className="inline-flex items-center text-green-700 hover:text-green-800 font-medium"
                >
                  Learn More
                  <ExternalLink className="ml-1 h-4 w-4" />
                </Link>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home







