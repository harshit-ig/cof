import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Users, Star, Calendar, Award, ExternalLink, Mail, Phone, MapPin, GraduationCap, X } from 'lucide-react'
import Card from '../components/common/Card'
import { alumniAPI } from '../services/api'
import { toast } from 'react-hot-toast'

const Alumni = () => {
  const location = useLocation()
  const hash = location.hash.substring(1)

  const [testimonials, setTestimonials] = useState([])
  const [events, setEvents] = useState([])
  const [contacts, setContacts] = useState([])
  const [stats, setStats] = useState([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [showRegistrationModal, setShowRegistrationModal] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [registrationData, setRegistrationData] = useState({
    name: '',
    email: '',
    phone: '',
    batch: '',
    currentOrganization: '',
    designation: ''
  })

  useEffect(() => {
    fetchAlumniData()
  }, [])

  const fetchAlumniData = async () => {
    try {
      setLoading(true)
      const [testimonialsRes, eventsRes, contactsRes, statsRes] = await Promise.all([
        alumniAPI.getAll({ section: 'testimonial' }),
        alumniAPI.getAll({ section: 'event' }),
        alumniAPI.getAll({ section: 'contact' }),
        alumniAPI.getAll({ section: 'stats' })
      ])

      if (testimonialsRes.data.success) {
        setTestimonials(testimonialsRes.data.data.alumni || [])
      }
      if (eventsRes.data.success) {
        setEvents(eventsRes.data.data.alumni || [])
      }
      if (contactsRes.data.success) {
        setContacts(contactsRes.data.data.alumni || [])
      }
      if (statsRes.data.success) {
        // Sort stats by order field
        const sortedStats = (statsRes.data.data.alumni || []).sort((a, b) => a.order - b.order)
        setStats(sortedStats)
      }
    } catch (error) {
      console.error('Error fetching alumni data:', error)
    } finally {
      setLoading(false)
    }
  }

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

  const handleRegisterClick = (event) => {
    setSelectedEvent(event)
    setShowRegistrationModal(true)
  }

  const handleRegistrationSubmit = async (e) => {
    e.preventDefault()
    
    // Validation
    if (!registrationData.name || !registrationData.email || !registrationData.phone || 
        !registrationData.batch || !registrationData.currentOrganization || !registrationData.designation) {
      toast.error('Please fill in all required fields')
      return
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(registrationData.email)) {
      toast.error('Please enter a valid email address')
      return
    }

    // Phone validation (basic)
    if (registrationData.phone.replace(/\D/g, '').length < 10) {
      toast.error('Please enter a valid phone number')
      return
    }

    setSubmitting(true)
    
    try {
      const response = await alumniAPI.registerForEvent({
        eventId: selectedEvent._id,
        eventTitle: selectedEvent.title,
        ...registrationData
      })

      if (response.data.success) {
        toast.success(response.data.message || 'Registration successful! Check your email for confirmation.')
        
        // Reset form
        setRegistrationData({
          name: '',
          email: '',
          phone: '',
          batch: '',
          currentOrganization: '',
          designation: ''
        })
        setShowRegistrationModal(false)
        setSelectedEvent(null)
      } else {
        toast.error(response.data.message || 'Registration failed. Please try again.')
      }
      
    } catch (error) {
      console.error('Registration error:', error)
      toast.error(error.response?.data?.message || 'Registration failed. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleInputChange = (e) => {
    setRegistrationData({
      ...registrationData,
      [e.target.name]: e.target.value
    })
  }

  const closeModal = () => {
    setShowRegistrationModal(false)
    setSelectedEvent(null)
    setRegistrationData({
      name: '',
      email: '',
      phone: '',
      batch: '',
      currentOrganization: '',
      designation: ''
    })
  }

  return (
    <div className="min-h-screen text-left">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 text-white relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-16 left-16 w-40 h-40 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-16 right-16 w-32 h-32 bg-yellow-300 rounded-full blur-2xl"></div>
          <div className="absolute top-1/2 left-1/3 w-28 h-28 bg-purple-300 rounded-full blur-2xl"></div>
          <div className="absolute bottom-10 left-1/4 w-44 h-44 bg-blue-300 rounded-full blur-4xl"></div>
        </div>
        
        {/* Alumni/graduation themed floating elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Graduation caps and academic symbols */}
          <div className="absolute top-20 right-20 w-10 h-8 bg-purple-300/15 rounded animate-float transform rotate-12" style={{animationDelay: '0s'}}></div>
          <div className="absolute bottom-24 left-24 w-8 h-8 bg-indigo-300/20 rounded-full animate-float transform -rotate-12" style={{animationDelay: '2s'}}></div>
          
          {/* Network/connection symbols */}
          <div className="absolute top-1/3 left-1/4 w-6 h-6 bg-white/15 rounded-full animate-bounce" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-1/3 right-1/4 w-12 h-6 bg-purple-300/25 rounded-lg animate-bounce transform rotate-45" style={{animationDelay: '3s'}}></div>
          <div className="absolute top-1/4 right-1/3 w-4 h-8 bg-blue-300/20 rounded-full animate-pulse" style={{animationDelay: '1.5s'}}></div>
          <div className="absolute bottom-1/4 left-1/3 w-8 h-4 bg-indigo-300/15 rounded-full animate-float" style={{animationDelay: '2.5s'}}></div>
        </div>
        
        <div className="container-max relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Alumni Network
            </h1>
            <p className="text-xl text-purple-100 mb-8">
              Connecting Generations of Fishery Professionals
            </p>
          </div>
        </div>
      </section>

      {/* Alumni Stats */}
      <section className="section-padding bg-gradient-to-br from-white via-purple-50 to-blue-100 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-15">
          <div className="absolute top-10 left-20 w-32 h-32 bg-purple-300 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-36 h-36 bg-blue-300 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 right-1/3 w-28 h-28 bg-indigo-300 rounded-full blur-2xl"></div>
        </div>

        {/* Achievement-themed floating elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-16 right-16 w-8 h-8 bg-purple-400/20 rounded-full animate-pulse" style={{animationDelay: '0s'}}></div>
          <div className="absolute bottom-32 left-32 w-6 h-10 bg-blue-400/25 rounded-lg animate-float transform rotate-12" style={{animationDelay: '1.5s'}}></div>
          <div className="absolute top-1/3 left-1/4 w-10 h-6 bg-indigo-400/20 rounded-full animate-bounce" style={{animationDelay: '3s'}}></div>
        </div>

        <div className="container-max relative z-10">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
            </div>
          ) : stats.length === 0 ? (
            <div className="text-center py-12">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 border border-gray-200/50">
                <p className="text-gray-500">No statistics available at the moment.</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => {
                // Get icon component
                const IconComponent = stat.icon === 'GraduationCap' ? GraduationCap :
                                     stat.icon === 'Award' ? Award :
                                     stat.icon === 'Users' ? Users :
                                     stat.icon === 'Star' ? Star : GraduationCap
                
                return (
                  <div key={stat._id || index} className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 text-center border border-purple-100/50 group hover:scale-105 relative overflow-hidden">
                    {/* Card corner decorations */}
                    <div className="absolute top-0 left-0 w-16 h-16 bg-gradient-to-br from-purple-400/15 to-blue-500/15 rounded-full transform -translate-x-8 -translate-y-8 group-hover:scale-110 transition-transform duration-300"></div>
                    <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-indigo-400/10 to-purple-500/10 rounded-full transform translate-x-10 translate-y-10 group-hover:scale-110 transition-transform duration-300"></div>
                    
                    {/* Subtle pattern overlay */}
                    <div className="absolute inset-0 opacity-5 bg-gradient-to-br from-purple-600 via-transparent to-blue-600"></div>
                    
                    <div className="relative z-10">
                      <div className={`w-18 h-18 bg-gradient-to-br from-${stat.color || 'purple'}-100 to-${stat.color || 'purple'}-200 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-md group-hover:shadow-lg transition-shadow duration-300`}>
                        <IconComponent className={`w-9 h-9 text-${stat.color || 'purple'}-600`} />
                      </div>
                      <h3 className="text-3xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors duration-300">{stat.value}</h3>
                      <p className="text-gray-600 font-medium leading-relaxed">{stat.label}</p>
                    </div>
                    
                    {/* Hover effect indicator */}
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="section-padding bg-gradient-to-br from-gray-50 via-purple-50 to-indigo-100 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-20 w-32 h-32 bg-purple-300 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-36 h-36 bg-indigo-300 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 right-1/3 w-28 h-28 bg-blue-300 rounded-full blur-2xl"></div>
        </div>

        {/* Testimonial-themed floating elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-16 right-16 w-10 h-6 bg-purple-400/20 rounded-lg animate-float transform rotate-45" style={{animationDelay: '0s'}}></div>
          <div className="absolute bottom-32 left-32 w-8 h-8 bg-indigo-400/25 rounded-full animate-float" style={{animationDelay: '1.5s'}}></div>
          <div className="absolute top-1/3 left-1/4 w-6 h-12 bg-blue-400/20 rounded-full animate-float transform -rotate-12" style={{animationDelay: '3s'}}></div>
        </div>

        <div className="container-max relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Alumni Testimonials</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-purple-400 to-indigo-500 rounded mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Hear from our successful alumni about their journey and experiences at COF Jabalpur
            </p>
          </div>
          
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
            </div>
          ) : testimonials.length === 0 ? (
            <div className="text-center py-12">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 border border-gray-200/50">
                <p className="text-gray-500">No testimonials available at the moment.</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial) => (
                <div key={testimonial._id} className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 border border-purple-100/50 group hover:scale-105 relative overflow-hidden">
                  {/* Card corner decorations */}
                  <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-purple-400/20 to-indigo-500/20 rounded-full transform -translate-x-10 -translate-y-10 group-hover:scale-110 transition-transform duration-300"></div>
                  <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-blue-400/15 to-purple-500/15 rounded-full transform translate-x-12 translate-y-12 group-hover:scale-110 transition-transform duration-300"></div>
                  
                  {/* Subtle pattern overlay */}
                  <div className="absolute inset-0 opacity-5 bg-gradient-to-br from-purple-600 via-transparent to-indigo-600"></div>
                  
                  <div className="relative z-10">
                    <div className="text-center mb-6">
                      {testimonial.image && (
                        <div className="relative inline-block">
                          <img
                            src={testimonial.image}
                            alt={testimonial.name}
                            className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-white shadow-lg group-hover:shadow-xl transition-shadow duration-300"
                          />
                          <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center">
                            <GraduationCap className="w-4 h-4 text-white" />
                          </div>
                        </div>
                      )}
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors duration-300">{testimonial.name}</h3>
                      <p className="text-purple-600 text-sm font-semibold">Batch of {testimonial.batch}</p>
                      <p className="text-gray-700 text-sm font-medium">{testimonial.position}</p>
                      <p className="text-gray-500 text-xs">{testimonial.company}</p>
                    </div>
                    <div className="flex justify-center mb-6">
                      {[...Array(testimonial.rating || 5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-4 rounded-xl border border-purple-200/50">
                      <p className="text-gray-700 text-sm italic text-left leading-relaxed">"{testimonial.testimonial || testimonial.description}"</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Alumni Events */}
      <section id="events" className="section-padding bg-gradient-to-br from-white via-indigo-50 to-purple-100 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-15">
          <div className="absolute top-20 right-20 w-40 h-40 bg-indigo-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-48 h-48 bg-purple-400 rounded-full blur-4xl"></div>
          <div className="absolute top-1/3 left-1/2 w-32 h-32 bg-blue-400 rounded-full blur-2xl"></div>
        </div>

        {/* Event-themed floating elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-24 left-24 w-8 h-8 bg-indigo-500/20 rounded-full animate-pulse" style={{animationDelay: '0s'}}></div>
          <div className="absolute bottom-40 right-40 w-12 h-6 bg-purple-500/25 rounded-lg animate-float transform rotate-45" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-1/2 right-1/4 w-6 h-6 bg-blue-500/20 rounded-full animate-bounce" style={{animationDelay: '1s'}}></div>
        </div>

        <div className="container-max relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Alumni Events</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-indigo-400 to-purple-500 rounded mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Stay connected through our alumni events and networking opportunities
            </p>
          </div>
          
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
            </div>
          ) : events.length === 0 ? (
            <div className="text-center py-12">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 border border-gray-200/50">
                <p className="text-gray-500">No events scheduled at the moment.</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.map((event) => (
                <div key={event._id} className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 border border-indigo-100/50 group hover:scale-105 relative overflow-hidden">
                  {/* Card corner decorations */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-indigo-400/15 to-purple-500/15 rounded-full transform translate-x-12 -translate-y-12 group-hover:scale-110 transition-transform duration-300"></div>
                  <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-purple-400/10 to-indigo-500/10 rounded-full transform -translate-x-10 translate-y-10 group-hover:scale-110 transition-transform duration-300"></div>
                  
                  {/* Subtle pattern overlay */}
                  <div className="absolute inset-0 opacity-5 bg-gradient-to-r from-indigo-600 via-transparent to-purple-600"></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center mb-6">
                      <div className="w-14 h-14 bg-gradient-to-br from-indigo-100 to-purple-200 rounded-xl flex items-center justify-center shadow-md mr-4 group-hover:shadow-lg transition-shadow duration-300">
                        <Calendar className="w-7 h-7 text-indigo-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors duration-300">{event.title}</h3>
                        <p className="text-indigo-600 text-sm font-semibold">{event.date}</p>
                      </div>
                    </div>
                    <div className="space-y-3 mb-6">
                      {event.time && (
                        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-3 rounded-lg border border-indigo-200/50">
                          <p className="text-gray-700 text-sm flex items-center font-medium">
                            <Calendar className="w-4 h-4 mr-2 text-indigo-600" />
                            {event.time}
                          </p>
                        </div>
                      )}
                      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-3 rounded-lg border border-purple-200/50">
                        <p className="text-gray-700 text-sm flex items-center font-medium">
                          <MapPin className="w-4 h-4 mr-2 text-purple-600" />
                          {event.venue}
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-700 text-sm mb-6 leading-relaxed">{event.description}</p>
                    <button 
                      onClick={() => handleRegisterClick(event)}
                      className={`w-full py-3 px-6 rounded-xl text-sm font-bold transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 ${
                        event.registrationOpen 
                          ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700' 
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                      disabled={!event.registrationOpen}
                    >
                      {event.registrationOpen ? 'Register Now' : 'Registration Closed'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Contact Alumni Office */}
      <section id='office' className="section-padding bg-gradient-to-br from-gray-50 via-purple-50 to-indigo-100 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-16 left-16 w-36 h-36 bg-purple-300 rounded-full blur-3xl"></div>
          <div className="absolute bottom-16 right-16 w-40 h-40 bg-indigo-300 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 w-28 h-28 bg-blue-300 rounded-full blur-2xl"></div>
        </div>

        {/* Contact-themed floating elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-20 w-8 h-8 bg-purple-500/20 rounded-full animate-pulse" style={{animationDelay: '0s'}}></div>
          <div className="absolute bottom-28 left-28 w-6 h-12 bg-indigo-500/25 rounded-lg animate-float transform rotate-12" style={{animationDelay: '1.5s'}}></div>
          <div className="absolute top-1/3 right-1/3 w-10 h-6 bg-blue-500/20 rounded-full animate-bounce" style={{animationDelay: '2.5s'}}></div>
        </div>

        <div className="container-max relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Contact Alumni Office</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-purple-400 to-indigo-500 rounded mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Get in touch with our dedicated alumni office for any assistance or inquiries
            </p>
          </div>
          
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
            </div>
          ) : contacts.length === 0 ? (
            <div className="text-center py-12">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 border border-gray-200/50">
                <p className="text-gray-500">No contact information available at the moment.</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {contacts.map((contact) => {
                // Determine icon based on contact type
                const ContactIcon = contact.contactType === 'email' ? Mail :
                                   contact.contactType === 'phone' ? Phone :
                                   contact.contactType === 'address' ? MapPin : Mail
                
                // Get the contact value based on type
                const contactValue = contact.email || contact.phone || contact.address
                
                return (
                  <div key={contact._id} className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 text-center border border-purple-100/50 group hover:scale-105 relative overflow-hidden">
                    {/* Card corner decorations */}
                    <div className="absolute top-0 left-0 w-16 h-16 bg-gradient-to-br from-purple-400/15 to-indigo-500/15 rounded-full transform -translate-x-8 -translate-y-8 group-hover:scale-110 transition-transform duration-300"></div>
                    <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-indigo-400/10 to-purple-500/10 rounded-full transform translate-x-10 translate-y-10 group-hover:scale-110 transition-transform duration-300"></div>
                    
                    {/* Subtle pattern overlay */}
                    <div className="absolute inset-0 opacity-5 bg-gradient-to-br from-purple-600 via-transparent to-indigo-600"></div>
                    
                    <div className="relative z-10">
                      <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-indigo-200 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-md group-hover:shadow-lg transition-shadow duration-300">
                        <ContactIcon className="w-8 h-8 text-purple-600" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-purple-600 transition-colors duration-300">{contact.title}</h3>
                      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-4 rounded-xl border border-purple-200/50 mb-4">
                        <p className="text-gray-700 font-medium leading-relaxed">
                          {contact.contactType === 'address' ? (
                            <>{contactValue?.split(',').map((line, i) => <React.Fragment key={i}>{line.trim()}<br /></React.Fragment>)}</>
                          ) : (
                            contactValue
                          )}
                        </p>
                      </div>
                      {contact.description && (
                        <p className="text-sm text-gray-600 leading-relaxed">{contact.description}</p>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* Event Registration Modal */}
      {showRegistrationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-purple-100/50">
            <div className="sticky top-0 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-t-2xl px-8 py-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold">Register for Event</h2>
              <button
                onClick={closeModal}
                className="text-white hover:text-purple-200 transition-colors p-2 hover:bg-white/10 rounded-lg"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-8">
              {selectedEvent && (
                <div className="mb-8 p-6 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl border border-purple-200/50">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{selectedEvent.title}</h3>
                  <div className="text-sm text-gray-700 space-y-2">
                    <p className="flex items-center">
                      <Calendar className="w-4 h-4 mr-3 text-purple-600" />
                      {selectedEvent.date} at {selectedEvent.time}
                    </p>
                    <p className="flex items-center">
                      <MapPin className="w-4 h-4 mr-3 text-indigo-600" />
                      {selectedEvent.venue}
                    </p>
                  </div>
                </div>
              )}

              <form onSubmit={handleRegistrationSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={registrationData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent shadow-sm hover:shadow-md transition-shadow duration-300"
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={registrationData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent shadow-sm hover:shadow-md transition-shadow duration-300"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={registrationData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent shadow-sm hover:shadow-md transition-shadow duration-300"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Batch Year <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="batch"
                    value={registrationData.batch}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent shadow-sm hover:shadow-md transition-shadow duration-300"
                    placeholder="e.g., 2018"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Current Organization <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="currentOrganization"
                    value={registrationData.currentOrganization}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent shadow-sm hover:shadow-md transition-shadow duration-300"
                    placeholder="Your current company/organization"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Current Designation <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="designation"
                    value={registrationData.designation}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent shadow-sm hover:shadow-md transition-shadow duration-300"
                    placeholder="Your current position"
                  />
                </div>

                <div className="flex gap-4 pt-6">
                  <button
                    type="button"
                    onClick={closeModal}
                    disabled={submitting}
                    className="flex-1 px-6 py-4 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-300 font-semibold disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 px-6 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    {submitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                        Submitting...
                      </>
                    ) : (
                      'Submit Registration'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Alumni