import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight, Bell, FileText, ExternalLink, Calendar, Users, Award, BookOpen } from 'lucide-react'
import Card from '../components/common/Card'
import LoadingSpinner from '../components/common/LoadingSpinner'
import HeroSlideshow from '../components/common/HeroSlideshow'
import { newsAPI, eventsAPI, contentAPI } from '../services/api'
import toast from 'react-hot-toast'

const Home = () => {
  const [latestNews, setLatestNews] = useState([])
  const [upcomingEvents, setUpcomingEvents] = useState([])
  const [deanMessage, setDeanMessage] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchHomeData()
  }, [])

  const fetchHomeData = async () => {
    try {
      setLoading(true)
      
      // Fetch essential data only
      const [newsResponse, eventsResponse, deanMessageResponse] = await Promise.allSettled([
        newsAPI.getAll({ limit: 4, featured: true }),
        eventsAPI.getUpcoming({ limit: 3 }),
        contentAPI.getByKey('dean_message')
      ])

      // Process news data
      if (newsResponse.status === 'fulfilled' && newsResponse.value?.data?.success) {
        setLatestNews(newsResponse.value.data.data.newsEvents || [])
      }

      // Process events data
      if (eventsResponse.status === 'fulfilled' && eventsResponse.value?.data?.success) {
        setUpcomingEvents(eventsResponse.value.data.data.events || [])
      }

      // Process dean's message
      if (deanMessageResponse.status === 'fulfilled' && deanMessageResponse.value?.data?.success) {
        setDeanMessage(deanMessageResponse.value.data.data.content?.content || '')
      }

    } catch (error) {
      console.error('Error fetching home data:', error)
      // Don't show error toast for failed API calls - just use fallback content
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
                      src="https://www.ndvsu.org/images/Shashikant.jpg"
                      alt="Dean's Photo"
                      className="w-full h-48 md:h-56 lg:h-64 object-cover rounded-lg shadow-md"
                      sizes="(max-width: 768px) 100vw, 33vw"
                      loading="lazy"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/300x200/0f766e/ffffff?text=Dean+Photo'
                      }}
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <blockquote className="text-gray-700 text-lg leading-relaxed italic mb-4">
                      "Welcome to College of Fisheries, Jabalpur, where we are committed to excellence 
                      in fisheries education and research. Our mission is to develop skilled 
                      professionals who will contribute to sustainable aquaculture and fisheries 
                      management for the benefit of society."
                    </blockquote>
                    
                    <div className="border-t pt-4">
                      <p className="font-semibold text-gray-900">Dr. Shashikant Mahajan</p>
                      <p className="text-gray-600">Dean, College of Fisheries, Jabalpur</p>
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
                          <p className="text-sm text-gray-600 mb-1">International conference on sustainable fisheries practices</p>
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

              {/* Upcoming Events */}
              <Card>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 text-blue-600 mr-2" />
                    <h3 className="text-lg font-semibold text-gray-900">Upcoming Events</h3>
                  </div>
                  <Link
                    to="/events"
                    className="text-blue-700 hover:text-blue-800 text-sm font-medium"
                  >
                    View All
                  </Link>
                </div>
                
                <div className="space-y-3">
                  {upcomingEvents.length > 0 ? (
                    upcomingEvents.map((event, index) => (
                      <div key={index} className="p-3 bg-blue-50 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-1">{event.title}</h4>
                        <p className="text-sm text-blue-700">
                          {new Date(event.date).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </p>
                      </div>
                    ))
                  ) : (
                    <div className="space-y-3">
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-1">Workshop on Fish Processing</h4>
                        <p className="text-sm text-blue-700">Sep 5</p>
                      </div>
                      <div className="p-3 bg-green-50 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-1">Guest Lecture Series</h4>
                        <p className="text-sm text-green-700">Sep 12</p>
                      </div>
                      <div className="p-3 bg-yellow-50 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-1">Field Visit to Hatchery</h4>
                        <p className="text-sm text-yellow-700">Sep 20</p>
                      </div>
                    </div>
                  )}
                </div>
              </Card>

              {/* Important Notice */}
              <Card className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200">
                <div className="flex items-center mb-3">
                  <FileText className="w-5 h-5 text-green-600 mr-2" />
                  <h3 className="text-lg font-semibold text-gray-900">Important Notice</h3>
                </div>
                <p className="text-gray-700 mb-3">
                  Admission process for B.F.Sc (Bachelor of Fisheries Science) program 2025-26 is now open.
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
