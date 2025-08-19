import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ChevronRight, Users, FileText, Trophy, Newspaper, Calendar, BookOpen, Award, Building, Phone, Mail, MapPin } from 'lucide-react'
import Card from '../components/common/Card'
import LoadingSpinner from '../components/common/LoadingSpinner'
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
  const [currentSlide, setCurrentSlide] = useState(0)

  // Image slider data - using local images from public folder
  const sliderImages = [
    'slider.jpg',
    'slider-2.jpg',
    'slider-3.jpg',
    'slider-4.jpg'
  ]

  useEffect(() => {
    fetchHomeData()
    
    // Auto-slide every 5 seconds
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length)
    }, 5000)
    
    return () => clearInterval(interval)
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

  const goToSlide = (index) => {
    setCurrentSlide(index)
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % sliderImages.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + sliderImages.length) % sliderImages.length)
  }

  return (
    <div className="min-h-screen">
      {/* Image Slider Section */}
      <section className="relative h-96 md:h-[500px] overflow-hidden">
        {sliderImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30"></div>
          </div>
        ))}
        
        {/* Slider Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-800 p-2 rounded-full shadow-lg transition-all"
        >
          <ArrowRight className="h-6 w-6 rotate-180" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-800 p-2 rounded-full shadow-lg transition-all"
        >
          <ArrowRight className="h-6 w-6" />
        </button>
        
        {/* Slider Indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {sliderImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide ? 'bg-white' : 'bg-white bg-opacity-50'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="section-padding bg-gray-50">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-3 space-y-8">
              {/* Student Corner */}
              <Card>
                <div className="flex items-center mb-4">
                  <Users className="h-6 w-6 text-blue-600 mr-2" />
                  <h2 className="text-xl font-bold text-gray-900">Student Corner</h2>
                </div>
                <div className="space-y-3">
                  <Link to="/students#admission" className="block p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                    <h3 className="font-semibold text-blue-800">Admission Guidelines</h3>
                    <p className="text-sm text-blue-600">Complete information about admission process and requirements</p>
                  </Link>
                  <Link to="/students#scholarships" className="block p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                    <h3 className="font-semibold text-green-800">Scholarships & Fellowships</h3>
                    <p className="text-sm text-green-600">Available financial assistance for students</p>
                  </Link>
                  <Link to="/students#placement" className="block p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                    <h3 className="font-semibold text-purple-800">Placement Cell</h3>
                    <p className="text-sm text-purple-600">Career opportunities and placement support</p>
                  </Link>
                </div>
              </Card>

              {/* Notice Board */}
              <Card>
                <div className="flex items-center mb-4">
                  <FileText className="h-6 w-6 text-red-600 mr-2" />
                  <h2 className="text-xl font-bold text-gray-900">Notice Board</h2>
                </div>
                <div className="space-y-3">
                  {loading ? (
                    <div className="space-y-2">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="animate-pulse">
                          <div className="h-4 bg-gray-200 rounded w-3/4 mb-1"></div>
                          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                        </div>
                      ))}
                    </div>
                  ) : latestNews.length > 0 ? (
                    latestNews.slice(0, 3).map((news) => (
                      <div key={news._id} className="border-b border-gray-200 pb-3 last:border-b-0 last:pb-0">
                        <h3 className="font-medium text-gray-900 mb-1">{news.title}</h3>
                        <p className="text-sm text-gray-600">{news.excerpt}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {news.createdAt ? new Date(news.createdAt).toLocaleDateString() : 'Date TBD'}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500">No notices available at the moment.</p>
                  )}
                </div>
              </Card>

              {/* Achievement */}
              <Card>
                <div className="flex items-center mb-4">
                  <Trophy className="h-6 w-6 text-yellow-600 mr-2" />
                  <h2 className="text-xl font-bold text-gray-900">Achievement</h2>
                </div>
                <div className="space-y-3">
                  <div className="p-3 bg-yellow-50 rounded-lg">
                    <h3 className="font-semibold text-yellow-800">Research Excellence Award</h3>
                    <p className="text-sm text-yellow-700">Faculty member receives prestigious research recognition</p>
                  </div>
                  <div className="p-3 bg-yellow-50 rounded-lg">
                    <h3 className="font-semibold text-yellow-800">Student Innovation Prize</h3>
                    <p className="text-sm text-yellow-700">Student project wins national innovation competition</p>
                  </div>
                </div>
              </Card>

              {/* Publication */}
              <Card>
                <div className="flex items-center mb-4">
                  <Newspaper className="h-6 w-6 text-green-600 mr-2" />
                  <h2 className="text-xl font-bold text-gray-900">Publication</h2>
                </div>
                <div className="space-y-3">
                  <div className="p-3 bg-green-50 rounded-lg">
                    <h3 className="font-semibold text-green-800">Research Papers</h3>
                    <p className="text-sm text-green-700">Latest publications in international journals</p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <h3 className="font-semibold text-green-800">Extension Leaflets</h3>
                    <p className="text-sm text-green-700">Technical bulletins for farmers and industry</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-6">
              {/* Quick Links */}
              <Card>
                <h3 className="text-lg font-bold text-gray-900 mb-4">QUICK LINKS</h3>
                <div className="space-y-3">
                  <Link to="/programs" className="block p-2 bg-blue-50 rounded hover:bg-blue-100 transition-colors">
                    <span className="text-blue-800 font-medium">Academic Programmes</span>
                  </Link>
                  <Link to="/faculty" className="block p-2 bg-green-50 rounded hover:bg-green-100 transition-colors">
                    <span className="text-green-800 font-medium">Faculty Directory</span>
                  </Link>
                  <Link to="/research" className="block p-2 bg-purple-50 rounded hover:bg-purple-100 transition-colors">
                    <span className="text-purple-800 font-medium">Research Projects</span>
                  </Link>
                  <Link to="/infrastructure" className="block p-2 bg-orange-50 rounded hover:bg-orange-100 transition-colors">
                    <span className="text-orange-800 font-medium">Infrastructure</span>
                  </Link>
                  <Link to="/contact" className="block p-2 bg-red-50 rounded hover:bg-red-100 transition-colors">
                    <span className="text-red-800 font-medium">Contact Us</span>
                  </Link>
                </div>
              </Card>

              {/* Upcoming Events */}
              <Card>
                <div className="flex items-center mb-4">
                  <Calendar className="h-5 w-5 text-blue-600 mr-2" />
                  <h3 className="text-lg font-bold text-gray-900">UP-COMING EVENTS</h3>
                </div>
                <div className="space-y-3">
                  {loading ? (
                    <div className="space-y-2">
                      {[1, 2].map((i) => (
                        <div key={i} className="animate-pulse">
                          <div className="h-4 bg-gray-200 rounded w-3/4 mb-1"></div>
                          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                        </div>
                      ))}
                    </div>
                  ) : upcomingEvents.length > 0 ? (
                    upcomingEvents.slice(0, 3).map((event) => (
                      <div key={event._id} className="border-b border-gray-200 pb-2 last:border-b-0 last:pb-0">
                        <h4 className="font-medium text-gray-900 text-sm mb-1">{event.title}</h4>
                        <p className="text-xs text-gray-600">
                          {event.eventDate ? new Date(event.eventDate).toLocaleDateString() : 'Date TBD'}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-sm">No upcoming events.</p>
                  )}
                </div>
              </Card>

              {/* Events */}
              <Card>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Events</h3>
                <div className="space-y-2">
                  <div className="text-center p-3 bg-gray-100 rounded">
                    <p className="text-sm text-gray-600">Recent Events</p>
                  </div>
                  <div className="text-center p-3 bg-gray-100 rounded">
                    <p className="text-sm text-gray-600">Workshops</p>
                  </div>
                  <div className="text-center p-3 bg-gray-100 rounded">
                    <p className="text-sm text-gray-600">Seminars</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">About CoF</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto rounded"></div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="cllg.jpg"
                alt="College Campus"
                className="w-full h-96 object-cover rounded-lg shadow-lg"
              />
            </div>
            
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                The College of Fisheries, Jabalpur was established as a constituent college under the 
                Nanaji Deshmukh Veterinary Science University. This college offers a credible fisheries 
                education institution that nurtures the next-generation of professionals and entrepreneurs 
                in the fisheries sector.
              </p>
              <p>
                We contribute to the state and nation by pursuing innovations and research which is 
                relevant to local needs and directed towards maximizing outcomes for economic, social 
                and environmental well-being.
              </p>
              <Link
                to="/about"
                className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
              >
                Read More...
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Related Links & Contact Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Related Links */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">RELATED LINKS</h3>
              <div className="space-y-2">
                <a href="https://icar.org.in" target="_blank" rel="noopener noreferrer" className="block text-blue-600 hover:text-blue-800">ICAR</a>
                <a href="https://nbfgr.res.in" target="_blank" rel="noopener noreferrer" className="block text-blue-600 hover:text-blue-800">ICAR-NBFGR</a>
                <a href="https://cifri.org.in" target="_blank" rel="noopener noreferrer" className="block text-blue-600 hover:text-blue-800">ICAR-CIFRI</a>
                <a href="https://cife.edu.in" target="_blank" rel="noopener noreferrer" className="block text-blue-600 hover:text-blue-800">ICAR-CIFE</a>
                <a href="https://ciba.res.in" target="_blank" rel="noopener noreferrer" className="block text-blue-600 hover:text-blue-800">ICAR-CIBA</a>
                <a href="https://cmfri.org.in" target="_blank" rel="noopener noreferrer" className="block text-blue-600 hover:text-blue-800">ICAR-CMFRI</a>
                <a href="https://dcfr.res.in" target="_blank" rel="noopener noreferrer" className="block text-blue-600 hover:text-blue-800">ICAR-DCFR</a>
              </div>
            </div>

            {/* Contact Us */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">CONTACT US</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-2">
                  <MapPin className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">Address:</p>
                    <p className="text-gray-600">College of Fisheries, Jabalpur<br />
                    NDVSU Campus, Jabalpur-482001, Madhya Pradesh</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="h-5 w-5 text-blue-600 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">Phone:</p>
                    <p className="text-gray-600">+91 761 2345678</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="h-5 w-5 text-blue-600 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">Email:</p>
                    <p className="text-gray-600">dean@fisherycollegejabalpur.edu.in</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Visitor Counter */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">VISITOR COUNTER</h3>
              <div className="text-center p-6 bg-white rounded-lg shadow">
                <div className="text-3xl font-bold text-blue-600 mb-2">49,050</div>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>Users Today: 82</p>
                  <p>This Month: 2,087</p>
                  <p>This Year: 25,034</p>
                  <p>Total Users: 49,050</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home