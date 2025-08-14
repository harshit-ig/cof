import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Users, BookOpen, Award, Building, ChevronRight } from 'lucide-react'
import Card, { NewsCard, StatsCard, FeatureCard } from '../components/common/Card'
import LoadingSpinner, { LoadingCard } from '../components/common/LoadingSpinner'
import { newsAPI, eventsAPI, contentAPI, programsAPI, facultyAPI } from '../services/api'
import toast from 'react-hot-toast'

const Home = () => {
  const [latestNews, setLatestNews] = useState([])
  const [upcomingEvents, setUpcomingEvents] = useState([])
  const [deanMessage, setDeanMessage] = useState('')
  const [stats, setStats] = useState({
    programs: 0,
    faculty: 0,
    students: 1200,
    years: 25
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchHomeData()
  }, [])

  const fetchHomeData = async () => {
    try {
      setLoading(true)
      
      // Fetch multiple data sources in parallel
      const [newsResponse, eventsResponse, deanMessageResponse, programsResponse, facultyResponse] = await Promise.allSettled([
        newsAPI.getAll({ limit: 3, featured: true }),
        eventsAPI.getUpcoming({ limit: 5 }),
        contentAPI.getByKey('dean_message'),
        programsAPI.getAll({ limit: 1 }), // Just to get count
        facultyAPI.getAll({ limit: 1 }) // Just to get count
      ])

      // Process news data
      if (newsResponse.status === 'fulfilled' && newsResponse.value.data.success) {
        setLatestNews(newsResponse.value.data.data.newsEvents || [])
      }

      // Process events data
      if (eventsResponse.status === 'fulfilled' && eventsResponse.value.data.success) {
        setUpcomingEvents(eventsResponse.value.data.data.events || [])
      }

      // Process dean's message
      if (deanMessageResponse.status === 'fulfilled' && deanMessageResponse.value.data.success) {
        setDeanMessage(deanMessageResponse.value.data.data.content?.content || '')
      }

      // Update stats
      const newStats = { ...stats }
      if (programsResponse.status === 'fulfilled' && programsResponse.value.data.success) {
        newStats.programs = programsResponse.value.data.data.pagination?.total || 0
      }
      if (facultyResponse.status === 'fulfilled' && facultyResponse.value.data.success) {
        newStats.faculty = facultyResponse.value.data.data.pagination?.total || 0
      }
      setStats(newStats)

    } catch (error) {
      console.error('Error fetching home data:', error)
      toast.error('Failed to load some content. Please refresh the page.')
    } finally {
      setLoading(false)
    }
  }

  const statsDisplay = [
    { title: 'Students Enrolled', value: `${stats.students.toLocaleString()}+`, icon: Users },
    { title: 'Faculty Members', value: stats.faculty.toString(), icon: Users },
    { title: 'Programs Offered', value: stats.programs.toString(), icon: BookOpen },
    { title: 'Years of Excellence', value: `${stats.years}+`, icon: Award }
  ]

  const features = [
    {
      icon: BookOpen,
      title: 'Quality Education',
      description: 'Comprehensive programs in fisheries science and aquaculture with industry-relevant curriculum.'
    },
    {
      icon: Award,
      title: 'Research Excellence',
      description: 'Cutting-edge research facilities and ongoing projects in various aspects of fisheries science.'
    },
    {
      icon: Users,
      title: 'Expert Faculty',
      description: 'Highly qualified and experienced faculty members dedicated to student success.'
    },
    {
      icon: Building,
      title: 'Modern Infrastructure',
      description: 'State-of-the-art laboratories, hatcheries, and processing units for practical learning.'
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600 text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative container-max section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Excellence in
                <span className="block text-accent-400">Fisheries Education</span>
              </h1>
              
              <p className="text-lg md:text-xl text-blue-100 leading-relaxed">
                Leading institution in fisheries science and aquaculture education, 
                fostering innovation and sustainable practices in aquatic resource management.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/programs"
                  className="btn-accent"
                >
                  Explore Programs
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                
                <Link
                  to="/about"
                  className="btn-outline border-white text-white hover:bg-white hover:text-primary-600"
                >
                  Learn More
                </Link>
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-2xl">
                <img
                  src={`/api/proxy/image?url=${encodeURIComponent('https://www.ndvsu.org/images/fcj-slide-01.jpg')}`}
                  alt="Fishery College Campus"
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Floating Stats Card */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-lg shadow-xl p-4 text-gray-900">
                <div className="flex items-center space-x-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary-600">25+</div>
                    <div className="text-sm text-gray-600">Years</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-secondary-600">1200+</div>
                    <div className="text-sm text-gray-600">Students</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dean's Message Section */}
      <section className="section-padding bg-white">
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
                "Welcome to Fishery College Jabalpur, where we are committed to excellence 
                in fisheries education and research. Our mission is to develop skilled 
                professionals who will contribute to sustainable aquaculture and fisheries 
                management for the benefit of society."
              </blockquote>
              
              <div>
                <p className="font-semibold text-gray-900">Dr. Shashikant Mahajan</p>
                <p className="text-gray-600">I/c Dean, Fishery College Jabalpur</p>
              </div>
              
              <Link
                to="/about#dean-message"
                className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
              >
                Read Full Message
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Impact</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Numbers that reflect our commitment to excellence in fisheries education and research
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {statsDisplay.map((stat, index) => (
              <StatsCard
                key={index}
                title={stat.title}
                value={stat.value}
                icon={stat.icon}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Us</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Discover what makes Fishery College Jabalpur the premier choice for fisheries education
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Latest News & Events Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Latest News */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-gray-900">Latest News</h2>
                <Link
                  to="/news"
                  className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
                >
                  View All
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
              
              {loading ? (
                <div className="space-y-6">
                  {[1, 2, 3].map((i) => (
                    <LoadingCard key={i} />
                  ))}
                </div>
              ) : latestNews.length > 0 ? (
                <div className="space-y-6">
                  {latestNews.map((news) => (
                    <NewsCard
                      key={news._id}
                      title={news.title}
                      excerpt={news.excerpt}
                      date={news.createdAt}
                      type={news.type}
                      category={news.category}
                      image={news.images?.[0]?.url || 'https://via.placeholder.com/400x200'}
                      link={`/news/${news._id}`}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500">No news available at the moment.</p>
                </div>
              )}
            </div>
            
            {/* Upcoming Events & Quick Links */}
            <div className="space-y-8">
              {/* Upcoming Events */}
              <Card>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-900">Upcoming Events</h3>
                  <Link
                    to="/events"
                    className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                  >
                    View All
                  </Link>
                </div>
                
                {loading ? (
                  <div className="space-y-3">
                    {[1, 2].map((i) => (
                      <div key={i} className="animate-pulse">
                        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                      </div>
                    ))}
                  </div>
                ) : upcomingEvents.length > 0 ? (
                  <div className="space-y-4">
                    {upcomingEvents.map((event) => (
                      <div key={event._id} className="border-b border-gray-200 pb-3 last:border-b-0 last:pb-0">
                        <h4 className="font-medium text-gray-900 mb-1">{event.title}</h4>
                        <div className="text-sm text-gray-600">
                          <p>{event.eventDate ? new Date(event.eventDate).toLocaleDateString() : 'Date TBD'}</p>
                          <p>{event.venue || 'Venue TBD'}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <p className="text-gray-500 text-sm">No upcoming events.</p>
                  </div>
                )}
              </Card>
              
              {/* Quick Links */}
              <Card>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Quick Links</h3>
                <div className="space-y-3">
                  <Link
                    to="/students#admission"
                    className="flex items-center justify-between p-2 rounded hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-gray-700">Admission Guidelines</span>
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                  </Link>
                  
                  <Link
                    to="/academics#calendar"
                    className="flex items-center justify-between p-2 rounded hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-gray-700">Academic Calendar</span>
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                  </Link>
                  
                  <Link
                    to="/students#scholarships"
                    className="flex items-center justify-between p-2 rounded hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-gray-700">Scholarships</span>
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                  </Link>
                  
                  <Link
                    to="/students#placement"
                    className="flex items-center justify-between p-2 rounded hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-gray-700">Placement Cell</span>
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                  </Link>
                  
                  <Link
                    to="/contact"
                    className="flex items-center justify-between p-2 rounded hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-gray-700">Contact Us</span>
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                  </Link>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="section-padding bg-primary-600 text-white">
        <div className="container-max text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Join us in shaping the future of fisheries science and aquaculture. 
            Explore our programs and take the first step towards a rewarding career.
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
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home