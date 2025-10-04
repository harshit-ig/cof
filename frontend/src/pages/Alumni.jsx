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
    <div className="min-h-screen">
      {/* Hero Section */}
            <section className="section-padding bg-blue-600 text-white">
        <div className="container-max">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Alumni Network
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Connecting Generations of Fishery Professionals
            </p>
          </div>
        </div>
      </section>

      {/* Alumni Stats */}
      <section className="section-padding bg-white">
        <div className="container-max">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            </div>
          ) : stats.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No statistics available at the moment.</p>
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
                  <div key={stat._id || index} className="text-center">
                    <div className={`w-16 h-16 bg-${stat.color || 'blue'}-100 rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <IconComponent className={`w-8 h-8 text-${stat.color || 'blue'}-600`} />
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</h3>
                    <p className="text-gray-600">{stat.label}</p>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="section-padding bg-gray-50">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Alumni Testimonials</h2>
            <div className="w-20 h-1 bg-blue-400 rounded mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Hear from our successful alumni about their journey and experiences at COF Jabalpur
            </p>
          </div>
          
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            </div>
          ) : testimonials.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No testimonials available at the moment.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial) => (
                <Card key={testimonial._id} className="p-6">
                  <div className="text-center mb-4">
                    {testimonial.image && (
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                      />
                    )}
                    <h3 className="text-lg font-semibold text-gray-900">{testimonial.name}</h3>
                    <p className="text-blue-600 text-sm">Batch of {testimonial.batch}</p>
                    <p className="text-gray-600 text-sm">{testimonial.position}</p>
                    <p className="text-gray-500 text-xs">{testimonial.company}</p>
                  </div>
                  <div className="flex justify-center mb-4">
                    {[...Array(testimonial.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 text-sm italic">"{testimonial.testimonial || testimonial.description}"</p>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Alumni Events */}
      <section id="events" className="section-padding bg-white">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Alumni Events</h2>
            <div className="w-20 h-1 bg-blue-400 rounded mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Stay connected through our alumni events and networking opportunities
            </p>
          </div>
          
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            </div>
          ) : events.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No events scheduled at the moment.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.map((event) => (
                <Card key={event._id} className="p-6">
                  <div className="flex items-center mb-4">
                    <Calendar className="w-6 h-6 text-blue-500 mr-2" />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{event.title}</h3>
                      <p className="text-blue-600 text-sm">{event.date}</p>
                    </div>
                  </div>
                  <div className="space-y-2 mb-4">
                    {event.time && (
                      <p className="text-gray-600 text-sm flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        {event.time}
                      </p>
                    )}
                    <p className="text-gray-600 text-sm flex items-center">
                      <MapPin className="w-4 h-4 mr-2" />
                      {event.venue}
                    </p>
                  </div>
                  <p className="text-gray-700 text-sm mb-4">{event.description}</p>
                  <button 
                    onClick={() => handleRegisterClick(event)}
                    className={`w-full py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                      event.registrationOpen 
                        ? 'bg-blue-500 text-white hover:bg-blue-600' 
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                    disabled={!event.registrationOpen}
                  >
                    {event.registrationOpen ? 'Register Now' : 'Registration Closed'}
                  </button>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Contact Alumni Office */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Contact Alumni Office</h2>
            <div className="w-20 h-1 bg-blue-400 rounded mx-auto mb-6"></div>
          </div>
          
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            </div>
          ) : contacts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No contact information available at the moment.</p>
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
                  <Card key={contact._id} className="p-6 text-center">
                    <ContactIcon className="w-8 h-8 text-blue-500 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{contact.title}</h3>
                    <p className="text-gray-600">
                      {contact.contactType === 'address' ? (
                        <>{contactValue?.split(',').map((line, i) => <React.Fragment key={i}>{line.trim()}<br /></React.Fragment>)}</>
                      ) : (
                        contactValue
                      )}
                    </p>
                    {contact.description && (
                      <p className="text-sm text-gray-500 mt-2">{contact.description}</p>
                    )}
                  </Card>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* Event Registration Modal */}
      {showRegistrationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Register for Event</h2>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6">
              {selectedEvent && (
                <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{selectedEvent.title}</h3>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      {selectedEvent.date} at {selectedEvent.time}
                    </p>
                    <p className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2" />
                      {selectedEvent.venue}
                    </p>
                  </div>
                </div>
              )}

              <form onSubmit={handleRegistrationSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={registrationData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={registrationData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={registrationData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Batch Year <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="batch"
                    value={registrationData.batch}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., 2018"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Organization <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="currentOrganization"
                    value={registrationData.currentOrganization}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Your current company/organization"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Designation <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="designation"
                    value={registrationData.designation}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Your current position"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={closeModal}
                    disabled={submitting}
                    className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {submitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
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