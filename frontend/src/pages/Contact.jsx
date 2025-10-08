import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Phone, Mail, MapPin, Clock, Globe, Building, AlertCircle, Facebook, Twitter, Linkedin, Instagram, Youtube } from 'lucide-react'
import Card from '../components/common/Card'
import LoadingSpinner from '../components/common/LoadingSpinner'
import { contactAPI } from '../services/api'

const Contact = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [contactData, setContactData] = useState(null)
  const location = useLocation()
  const hash = location.hash.substring(1)

  useEffect(() => {
    fetchContactData()
  }, [])

  const fetchContactData = async () => {
    try {
      setLoading(true)
      const response = await contactAPI.getPublic()
      if (response.data.success) {
        setContactData(response.data.data)
      } else {
        setError('Failed to load contact information')
      }
    } catch (error) {
      console.error('Error fetching contact data:', error)
      setError('Failed to load contact information')
    } finally {
      setLoading(false)
    }
  }

  // Generate Google Maps embed URL from contact data
  const getMapEmbedUrl = () => {
    if (!contactData?.mapConfig) return ''
    
    const { latitude, longitude, zoom } = contactData.mapConfig
    return `https://maps.google.com/maps?width=100%25&height=600&hl=en&q=${latitude},${longitude}&t=&z=${zoom}&ie=UTF8&iwloc=&output=embed`
  }

  // Generate Google Maps URL for "Open in Google Maps" button
  const getMapUrl = () => {
    if (!contactData?.mapConfig) return ''
    
    const { latitude, longitude } = contactData.mapConfig
    return `https://maps.google.com/?q=${latitude},${longitude}`
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    )
  }

  if (error || !contactData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Unable to load contact information</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button 
            onClick={fetchContactData}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  const getSocialIcon = (platform) => {
    switch (platform) {
      case 'facebook': return Facebook
      case 'twitter': return Twitter
      case 'linkedin': return Linkedin
      case 'instagram': return Instagram
      case 'youtube': return Youtube
      default: return Globe
    }
  }

  return (
    <div className="min-h-screen text-left">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 text-white relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-16 left-16 w-40 h-40 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-16 right-16 w-32 h-32 bg-yellow-300 rounded-full blur-2xl"></div>
          <div className="absolute top-1/2 left-1/3 w-28 h-28 bg-teal-300 rounded-full blur-2xl"></div>
          <div className="absolute bottom-10 left-1/4 w-44 h-44 bg-cyan-300 rounded-full blur-4xl"></div>
        </div>
        
        {/* Contact/communication themed floating elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Communication symbols */}
          <div className="absolute top-20 right-20 w-10 h-8 bg-teal-300/15 rounded animate-float transform rotate-12" style={{animationDelay: '0s'}}></div>
          <div className="absolute bottom-24 left-24 w-8 h-8 bg-cyan-300/20 rounded-full animate-float transform -rotate-12" style={{animationDelay: '2s'}}></div>
          
          {/* Contact symbols */}
          <div className="absolute top-1/3 left-1/4 w-6 h-6 bg-white/15 rounded-full animate-bounce" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-1/3 right-1/4 w-12 h-6 bg-blue-300/25 rounded-lg animate-bounce transform rotate-45" style={{animationDelay: '3s'}}></div>
          <div className="absolute top-1/4 right-1/3 w-4 h-8 bg-teal-300/20 rounded-full animate-pulse" style={{animationDelay: '1.5s'}}></div>
          <div className="absolute bottom-1/4 left-1/3 w-8 h-4 bg-cyan-300/15 rounded-full animate-float" style={{animationDelay: '2.5s'}}></div>
        </div>
        
        <div className="container-max relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Contact Us
            </h1>
            <p className="text-xl text-teal-100 mb-8">
              Get in Touch with {contactData.contactInfo?.address?.institution || 'College of Fishery'}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Details & Google Map */}
      <section id="contact-details" className="section-padding bg-gradient-to-br from-gray-50 via-teal-50 to-cyan-100 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-15">
          <div className="absolute top-20 right-20 w-40 h-40 bg-teal-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-48 h-48 bg-cyan-400 rounded-full blur-4xl"></div>
          <div className="absolute top-1/3 left-1/2 w-32 h-32 bg-blue-400 rounded-full blur-2xl"></div>
        </div>

        {/* Contact-themed floating elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-24 left-24 w-8 h-8 bg-teal-500/20 rounded-full animate-pulse" style={{animationDelay: '0s'}}></div>
          <div className="absolute bottom-40 right-40 w-12 h-6 bg-cyan-500/25 rounded-lg animate-float transform rotate-45" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-1/2 right-1/4 w-6 h-6 bg-blue-500/20 rounded-full animate-bounce" style={{animationDelay: '1s'}}></div>
        </div>

        <div className="container-max relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Contact Details & Google Map</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-teal-400 to-cyan-500 rounded mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Details */}
            <div className="space-y-8">
              {/* Phone Numbers */}
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 border border-teal-100/50 group hover:scale-105 relative overflow-hidden">
                {/* Card corner decorations */}
                <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-teal-400/20 to-cyan-500/20 rounded-full transform -translate-x-10 -translate-y-10 group-hover:scale-110 transition-transform duration-300"></div>
                <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-blue-400/15 to-teal-500/15 rounded-full transform translate-x-12 translate-y-12 group-hover:scale-110 transition-transform duration-300"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center mb-6">
                    <div className="w-14 h-14 bg-gradient-to-br from-teal-100 to-cyan-200 rounded-xl flex items-center justify-center mr-4 shadow-md group-hover:shadow-lg transition-shadow duration-300">
                      <Phone className="w-7 h-7 text-teal-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-teal-600 transition-colors duration-300">Phone</h3>
                      <p className="text-teal-500 text-sm font-semibold">Main Office</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {contactData.contactInfo?.phone?.main && (
                      <div className="bg-gradient-to-r from-teal-50 to-cyan-50 p-3 rounded-lg border border-teal-200/50">
                        <p className="text-gray-700 font-medium">{contactData.contactInfo.phone.main}</p>
                      </div>
                    )}
                    {contactData.contactInfo?.phone?.office && (
                      <div className="bg-gradient-to-r from-cyan-50 to-blue-50 p-3 rounded-lg border border-cyan-200/50">
                        <p className="text-gray-700 font-medium">Office: {contactData.contactInfo.phone.office}</p>
                      </div>
                    )}
                    {contactData.contactInfo?.phone?.fax && (
                      <div className="bg-gradient-to-r from-blue-50 to-teal-50 p-3 rounded-lg border border-blue-200/50">
                        <p className="text-gray-700 font-medium">Fax: {contactData.contactInfo.phone.fax}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Email Addresses */}
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 border border-cyan-100/50 group hover:scale-105 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-full transform -translate-x-10 -translate-y-10 group-hover:scale-110 transition-transform duration-300"></div>
                <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-teal-400/15 to-cyan-500/15 rounded-full transform translate-x-12 translate-y-12 group-hover:scale-110 transition-transform duration-300"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center mb-6">
                    <div className="w-14 h-14 bg-gradient-to-br from-cyan-100 to-blue-200 rounded-xl flex items-center justify-center mr-4 shadow-md group-hover:shadow-lg transition-shadow duration-300">
                      <Mail className="w-7 h-7 text-cyan-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-cyan-600 transition-colors duration-300">Email</h3>
                      <p className="text-cyan-600 text-sm font-semibold">Official Communication</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {contactData.contactInfo?.email?.main && (
                      <div className="bg-gradient-to-r from-cyan-50 to-blue-50 p-3 rounded-lg border border-cyan-200/50">
                        <p className="text-gray-700 font-medium">{contactData.contactInfo.email.main}</p>
                      </div>
                    )}
                    {contactData.contactInfo?.email?.registrar && (
                      <div className="bg-gradient-to-r from-blue-50 to-teal-50 p-3 rounded-lg border border-blue-200/50">
                        <p className="text-gray-700 font-medium">{contactData.contactInfo.email.registrar}</p>
                      </div>
                    )}
                    {contactData.contactInfo?.email?.info && (
                      <div className="bg-gradient-to-r from-teal-50 to-cyan-50 p-3 rounded-lg border border-teal-200/50">
                        <p className="text-gray-700 font-medium">{contactData.contactInfo.email.info}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Address */}
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 border border-blue-100/50 group hover:scale-105 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-blue-400/20 to-teal-500/20 rounded-full transform -translate-x-10 -translate-y-10 group-hover:scale-110 transition-transform duration-300"></div>
                <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-cyan-400/15 to-blue-500/15 rounded-full transform translate-x-12 translate-y-12 group-hover:scale-110 transition-transform duration-300"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center mb-6">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-teal-200 rounded-xl flex items-center justify-center mr-4 shadow-md group-hover:shadow-lg transition-shadow duration-300">
                      <MapPin className="w-7 h-7 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">Address</h3>
                      <p className="text-blue-600 text-sm font-semibold">Main Campus Location</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {contactData.contactInfo?.address?.institution && (
                      <div className="bg-gradient-to-r from-blue-50 to-teal-50 p-3 rounded-lg border border-blue-200/50">
                        <p className="text-gray-700 font-medium">{contactData.contactInfo.address.institution}</p>
                      </div>
                    )}
                    {contactData.contactInfo?.address?.university && (
                      <div className="bg-gradient-to-r from-teal-50 to-cyan-50 p-3 rounded-lg border border-teal-200/50">
                        <p className="text-gray-700 font-medium">{contactData.contactInfo.address.university}</p>
                      </div>
                    )}
                    {contactData.contactInfo?.address?.street && contactData.contactInfo?.address?.city && (
                      <div className="bg-gradient-to-r from-cyan-50 to-blue-50 p-3 rounded-lg border border-cyan-200/50">
                        <p className="text-gray-700 font-medium">
                          {contactData.contactInfo.address.street}, {contactData.contactInfo.address.city}
                          {contactData.contactInfo?.address?.pincode && ` - ${contactData.contactInfo.address.pincode}`}
                        </p>
                      </div>
                    )}
                    {contactData.contactInfo?.address?.state && contactData.contactInfo?.address?.country && (
                      <div className="bg-gradient-to-r from-blue-50 to-teal-50 p-3 rounded-lg border border-blue-200/50">
                        <p className="text-gray-700 font-medium">
                          {contactData.contactInfo.address.state}, {contactData.contactInfo.address.country}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Office Hours */}
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 border border-green-100/50 group hover:scale-105 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-green-400/20 to-teal-500/20 rounded-full transform -translate-x-10 -translate-y-10 group-hover:scale-110 transition-transform duration-300"></div>
                <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-emerald-400/15 to-green-500/15 rounded-full transform translate-x-12 translate-y-12 group-hover:scale-110 transition-transform duration-300"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center mb-6">
                    <div className="w-14 h-14 bg-gradient-to-br from-green-100 to-emerald-200 rounded-xl flex items-center justify-center mr-4 shadow-md group-hover:shadow-lg transition-shadow duration-300">
                      <Clock className="w-7 h-7 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-green-600 transition-colors duration-300">Office Hours</h3>
                      <p className="text-green-600 text-sm font-semibold">Working Schedule</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {contactData.contactInfo?.officeHours?.weekdays && (
                      <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-3 rounded-lg border border-green-200/50">
                        <p className="text-gray-700 font-medium">{contactData.contactInfo.officeHours.weekdays}</p>
                      </div>
                    )}
                    {contactData.contactInfo?.officeHours?.saturday && (
                      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-3 rounded-lg border border-emerald-200/50">
                        <p className="text-gray-700 font-medium">{contactData.contactInfo.officeHours.saturday}</p>
                      </div>
                    )}
                    {contactData.contactInfo?.officeHours?.sunday && (
                      <div className="bg-gradient-to-r from-teal-50 to-green-50 p-3 rounded-lg border border-teal-200/50">
                        <p className="text-gray-700 font-medium">{contactData.contactInfo.officeHours.sunday}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Google Map */}
            <div className="space-y-8">
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 border border-teal-100/50 group hover:scale-[1.02] relative overflow-hidden">
                <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-teal-400/20 to-blue-500/20 rounded-full transform -translate-x-10 -translate-y-10 group-hover:scale-110 transition-transform duration-300"></div>
                <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-cyan-400/15 to-teal-500/15 rounded-full transform translate-x-12 translate-y-12 group-hover:scale-110 transition-transform duration-300"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center mb-6">
                    <div className="w-14 h-14 bg-gradient-to-br from-teal-100 to-blue-200 rounded-xl flex items-center justify-center mr-4 shadow-md group-hover:shadow-lg transition-shadow duration-300">
                      <Globe className="w-7 h-7 text-teal-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-teal-600 transition-colors duration-300">
                        {contactData.mapConfig?.title || 'Location Map'}
                      </h3>
                      <p className="text-teal-600 text-sm font-semibold">
                        {contactData.mapConfig?.description || 'Find Us Here'}
                      </p>
                    </div>
                  </div>
                  
                  {/* Google Map Embed */}
                  <div className="w-full h-80 bg-gray-200 rounded-2xl overflow-hidden shadow-inner border-4 border-teal-100/50">
                    <iframe
                      src={getMapEmbedUrl()}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title={contactData.mapConfig?.title || 'College Location'}
                    ></iframe>
                  </div>
                  
                  <div className="mt-6 text-center">
                    <a
                      href={getMapUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-teal-500 to-blue-600 text-white rounded-xl text-sm font-semibold hover:from-teal-600 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
                    >
                      <MapPin className="w-4 h-4 mr-2" />
                      Open in Google Maps
                    </a>
                  </div>
                </div>
              </div>

              {/* Directions */}
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 border border-purple-100/50 group hover:scale-105 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-purple-400/20 to-indigo-500/20 rounded-full transform -translate-x-10 -translate-y-10 group-hover:scale-110 transition-transform duration-300"></div>
                <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-indigo-400/15 to-purple-500/15 rounded-full transform translate-x-12 translate-y-12 group-hover:scale-110 transition-transform duration-300"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center mb-6">
                    <div className="w-14 h-14 bg-gradient-to-br from-purple-100 to-indigo-200 rounded-xl flex items-center justify-center mr-4 shadow-md group-hover:shadow-lg transition-shadow duration-300">
                      <Building className="w-7 h-7 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors duration-300">Directions</h3>
                      <p className="text-purple-600 text-sm font-semibold">How to Reach</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {contactData.directions?.byRoad && (
                      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-3 rounded-lg border border-purple-200/50">
                        <p className="font-semibold text-purple-600 text-sm mb-2">By Road:</p>
                        <p className="text-gray-700 text-sm">{contactData.directions.byRoad}</p>
                      </div>
                    )}
                    {contactData.directions?.byAir && (
                      <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-3 rounded-lg border border-indigo-200/50">
                        <p className="font-semibold text-indigo-600 text-sm mb-2">By Air:</p>
                        <p className="text-gray-700 text-sm">{contactData.directions.byAir}</p>
                      </div>
                    )}
                    {contactData.directions?.byTrain && (
                      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-3 rounded-lg border border-blue-200/50">
                        <p className="font-semibold text-blue-600 text-sm mb-2">By Train:</p>
                        <p className="text-gray-700 text-sm">{contactData.directions.byTrain}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Departments */}
      {contactData.departments && contactData.departments.length > 0 && (
        <section id="departments" className="section-padding bg-gradient-to-br from-cyan-50 via-blue-50 to-teal-50 relative overflow-hidden">
          {/* Floating background elements */}
          <div className="absolute top-20 left-20 w-24 h-24 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 rounded-full animate-float"></div>
          <div className="absolute top-40 right-32 w-16 h-16 bg-gradient-to-r from-blue-400/15 to-teal-500/15 rounded-full animate-float" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-32 left-1/4 w-20 h-20 bg-gradient-to-r from-teal-400/20 to-cyan-500/20 rounded-full animate-float" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-20 right-20 w-12 h-12 bg-gradient-to-r from-cyan-400/15 to-blue-500/15 rounded-full animate-float" style={{animationDelay: '0.5s'}}></div>

          <div className="container-max relative z-10">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-cyan-600 to-blue-700 bg-clip-text text-transparent mb-4">
                Department Contacts
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-600 rounded mx-auto mb-6"></div>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Get in touch with specific departments for detailed information and support.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {contactData.departments.map((dept, index) => (
                <div key={index} className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 border border-cyan-100/50 group hover:scale-105 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-full transform -translate-x-10 -translate-y-10 group-hover:scale-110 transition-transform duration-300"></div>
                  <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-blue-400/15 to-cyan-500/15 rounded-full transform translate-x-12 translate-y-12 group-hover:scale-110 transition-transform duration-300"></div>
                  
                  <div className="relative z-10">
                    <div className="w-14 h-14 bg-gradient-to-br from-cyan-100 to-blue-200 rounded-xl flex items-center justify-center mb-6 shadow-md group-hover:shadow-lg transition-shadow duration-300">
                      <Building className="w-7 h-7 text-cyan-600" />
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-cyan-600 transition-colors duration-300">
                      {dept.name}
                    </h3>
                    
                    <div className="space-y-4">
                      {dept.head && (
                        <div className="bg-gradient-to-r from-cyan-50 to-blue-50 p-3 rounded-lg border border-cyan-200/50">
                          <p className="text-gray-700 font-medium text-sm">
                            <span className="font-semibold text-cyan-600">Head:</span> {dept.head}
                          </p>
                        </div>
                      )}
                      
                      {dept.description && (
                        <div className="bg-gradient-to-r from-blue-50 to-teal-50 p-3 rounded-lg border border-blue-200/50">
                          <p className="text-gray-700 text-sm">{dept.description}</p>
                        </div>
                      )}
                      
                      <div className="space-y-2">
                        {dept.phone && (
                          <div className="bg-gradient-to-r from-teal-50 to-cyan-50 p-3 rounded-lg border border-teal-200/50">
                            <div className="flex items-center">
                              <Phone className="w-4 h-4 text-teal-600 mr-2" />
                              <span className="text-gray-700 font-medium">{dept.phone}</span>
                            </div>
                          </div>
                        )}
                        
                        {dept.email && (
                          <div className="bg-gradient-to-r from-cyan-50 to-blue-50 p-3 rounded-lg border border-cyan-200/50">
                            <div className="flex items-center">
                              <Mail className="w-4 h-4 text-cyan-600 mr-2" />
                              <span className="text-gray-700 font-medium text-sm">{dept.email}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Emergency Contacts */}
      {contactData.emergencyContacts && contactData.emergencyContacts.length > 0 && (
        <section id="emergency" className="section-padding bg-gradient-to-br from-red-50 via-orange-50 to-pink-50 relative overflow-hidden">
          {/* Floating background elements */}
          <div className="absolute top-20 left-20 w-24 h-24 bg-gradient-to-r from-red-400/20 to-orange-500/20 rounded-full animate-bounce"></div>
          <div className="absolute top-40 right-32 w-16 h-16 bg-gradient-to-r from-orange-400/15 to-red-500/15 rounded-full animate-bounce" style={{animationDelay: '0.5s'}}></div>
          <div className="absolute bottom-32 left-1/4 w-20 h-20 bg-gradient-to-r from-pink-400/20 to-red-500/20 rounded-full animate-bounce" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-20 right-20 w-12 h-12 bg-gradient-to-r from-red-400/15 to-orange-500/15 rounded-full animate-bounce" style={{animationDelay: '1.5s'}}></div>

          <div className="container-max relative z-10">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-red-600 to-orange-700 bg-clip-text text-transparent mb-4">
                Emergency Contacts
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-red-400 to-orange-600 rounded mx-auto mb-6"></div>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Important contact numbers for emergency situations and urgent matters.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {contactData.emergencyContacts.map((contact, index) => (
                <div key={index} className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 border border-red-100/50 group hover:scale-105 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-red-400/20 to-orange-500/20 rounded-full transform -translate-x-10 -translate-y-10 group-hover:scale-110 transition-transform duration-300"></div>
                  <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-orange-400/15 to-red-500/15 rounded-full transform translate-x-12 translate-y-12 group-hover:scale-110 transition-transform duration-300"></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-start space-x-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-red-100 to-orange-200 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md group-hover:shadow-lg transition-shadow duration-300">
                        <AlertCircle className="w-7 h-7 text-red-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors duration-300">
                          {contact.title}
                        </h3>
                        
                        <div className="space-y-3">
                          {contact.name && (
                            <div className="bg-gradient-to-r from-red-50 to-orange-50 p-3 rounded-lg border border-red-200/50">
                              <p className="text-gray-700 font-medium text-sm">
                                <span className="font-semibold text-red-600">Contact:</span> {contact.name}
                              </p>
                            </div>
                          )}
                          
                          {contact.phone && (
                            <div className="bg-gradient-to-r from-orange-50 to-red-50 p-3 rounded-lg border border-orange-200/50">
                              <div className="flex items-center">
                                <Phone className="w-5 h-5 text-red-600 mr-2" />
                                <span className="text-red-600 font-bold text-lg">{contact.phone}</span>
                              </div>
                            </div>
                          )}
                          
                          {contact.description && (
                            <div className="bg-gradient-to-r from-red-50 to-pink-50 p-3 rounded-lg border border-red-200/50">
                              <p className="text-gray-700 text-sm">{contact.description}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

   
    </div>
  )
}

export default Contact





