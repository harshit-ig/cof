import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight, Bell, FileText, ExternalLink, Calendar, Users, Award, BookOpen } from 'lucide-react'
import Card from '../components/common/Card'
import HeroSlideshow from '../components/common/HeroSlideshow'
import LogoSlider from '../components/common/LogoSlider'
import { newsAPI, contentAPI, uploadAPI } from '../services/api'

const Home = () => {
  const [latestNews, setLatestNews] = useState([])
  const [upcomingEvents, setUpcomingEvents] = useState([])
  const [deanMessage, setDeanMessage] = useState('')
  const [importantNotices, setImportantNotices] = useState([])
  const [welcomeData, setWelcomeData] = useState({
    deanName: '',
    deanTitle: '',
    deanPhoto: '',
    welcomeMessage: ''
  })
  const [loading, setLoading] = useState(true)

  // Helper function to truncate text
  const truncateText = (text, maxLength = 200) => {
    if (text.length <= maxLength) return text
    const truncated = text.substring(0, maxLength)
    const lastSpaceIndex = truncated.lastIndexOf(' ')
    return lastSpaceIndex > 0 ? truncated.substring(0, lastSpaceIndex) + '...' : truncated + '...'
  }

  useEffect(() => {
    fetchHomeData()
  }, [])

  const fetchHomeData = async () => {
    try {
      setLoading(true)
      
      // Fetch essential data only with proper error handling
      const promises = [
        newsAPI.getAll({ limit: 4, featured: true }).catch(err => ({ error: true, message: err.message })),
        newsAPI.getAll({ limit: 3, type: 'event,seminar,workshop' }).catch(err => ({ error: true, message: err.message })),
        contentAPI.getByKey('dean-welcome-message').catch(err => ({ error: true, message: err.message })),
        contentAPI.getByKey('important-notices').catch(err => ({ error: true, message: err.message }))
      ]

      const [newsResponse, eventsResponse, welcomeResponse, noticesResponse] = await Promise.all(promises)

      // Process news data with safety checks
      if (newsResponse && !newsResponse.error && newsResponse.data?.success) {
        setLatestNews(Array.isArray(newsResponse.data.data?.newsEvents) ? newsResponse.data.data.newsEvents : [])
      }

      // Process events data with safety checks
      if (eventsResponse && !eventsResponse.error && eventsResponse.data?.success) {
        setUpcomingEvents(Array.isArray(eventsResponse.data.data?.newsEvents) ? eventsResponse.data.data.newsEvents : [])
      }

      // Process dean's welcome message with safety checks
      if (welcomeResponse && !welcomeResponse.error && welcomeResponse.data?.success) {
        const data = welcomeResponse.data
        if (data.data.content) {
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
      }

      // Process important notices with safety checks
      if (noticesResponse && !noticesResponse.error && noticesResponse.data?.success) {
        try {
          const contentData = noticesResponse.data.data.content
          const noticesData = JSON.parse(contentData.content || contentData)
          const activeNotices = Array.isArray(noticesData) 
            ? noticesData.filter(notice => notice.isActive) 
            : []
          setImportantNotices(activeNotices)
        } catch (e) {
          console.warn('Failed to parse notices content')
          setImportantNotices([])
        }
      } else {
        // No notices available
        setImportantNotices([])
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
      href: '/academics',
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

      {/* Dean's Welcome Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Dean's Welcome Message */}
            <div className="lg:col-span-2">
              <Card className="mb-8">
                <div className="flex items-center mb-6">
                  <div className="w-1 h-8 bg-blue-600 rounded mr-3"></div>
                  <h2 className="text-2xl font-bold text-gray-900">Welcome from the Dean</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-1">
                    <img
                      src={welcomeData.deanPhoto.startsWith('http') ? welcomeData.deanPhoto : uploadAPI.getImageUrl(welcomeData.deanPhoto, 'dean')}
                      alt={welcomeData.deanName}
                      className="w-full h-48 md:h-56 lg:h-64 object-cover rounded-lg shadow-md"
                      sizes="(max-width: 768px) 100vw, 33vw"
                      loading="lazy"
                      onError={(e) => {
                        if (!e.target.dataset.fallbackUsed) {
                          e.target.dataset.fallbackUsed = 'true'
                          e.target.src = uploadAPI.getImageUrl('COF NEW.png', 'images')
                        }
                      }}
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <blockquote className="text-gray-700 text-lg leading-relaxed italic mb-4">
                      "{truncateText(welcomeData.welcomeMessage, 180)}"
                    </blockquote>
                    
                    <div className="border-t pt-4">
                      <p className="font-semibold text-gray-900">{welcomeData.deanName}</p>
                      <p className="text-gray-600">{welcomeData.deanTitle}</p>
                    </div>
                    
                    <Link
                      to="/about"
                      className="inline-flex items-center mt-4 text-blue-700 hover:text-blue-800 font-medium"
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
                    to="/news-and-events"
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
                            <Link to={`/news-and-events/${news.slug || news._id}`} className="hover:text-green-700">
                              {news.title}
                            </Link>
                          </h4>
                          <p className="text-sm text-gray-600 mb-1">{news.excerpt}</p>
                          <p className="text-xs text-gray-500">
                            {new Date(news.createdAt || news.eventDate).toLocaleDateString('en-US', { 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            })}
                          </p>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-gray-500">No news updates available at this time.</p>
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

              {/* Important Notices */}
              {importantNotices.length > 0 && (
                <div className="space-y-4">
                  {importantNotices.map((notice) => (
                    <Card key={notice.id} className="bg-blue-50 border border-blue-200">
                      <div className="flex items-center mb-3">
                        <FileText className="w-5 h-5 text-blue-600 mr-2" />
                        <h3 className="text-lg font-semibold text-gray-900">{notice.title}</h3>
                      </div>
                      <p className="text-gray-700 mb-3">
                        {notice.message}
                      </p>
                      <Link
                        to={notice.link}
                        className="inline-flex items-center text-blue-700 hover:text-blue-800 font-medium"
                      >
                        {notice.linkText}
                        <ExternalLink className="ml-1 h-4 w-4" />
                      </Link>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Partner Logos Slider */}
      <LogoSlider />

    </div>
  )
}

export default Home







