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
      <section className="section-padding bg-blue-600 text-white">
        <div className="container-max">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Contact Us
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Get in Touch with {contactData.contactInfo?.address?.institution || 'College of Fishery'}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Details & Google Map */}
      <section id="contact-details" className="section-padding bg-gray-50">
        <div className="container-max">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Contact Details & Google Map</h2>
            <div className="w-16 h-1 bg-blue-400 rounded mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Details */}
            <div className="space-y-6">
              {/* Phone Numbers */}
              <Card className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                    <Phone className="w-6 h-6 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Phone</h3>
                    <p className="text-blue-500 text-sm">Main Office</p>
                  </div>
                </div>
                <div className="space-y-2">
                  {contactData.contactInfo?.phone?.main && (
                    <p className="text-gray-700 text-sm">{contactData.contactInfo.phone.main}</p>
                  )}
                  {contactData.contactInfo?.phone?.office && (
                    <p className="text-gray-700 text-sm">Office: {contactData.contactInfo.phone.office}</p>
                  )}
                  {contactData.contactInfo?.phone?.fax && (
                    <p className="text-gray-700 text-sm">Fax: {contactData.contactInfo.phone.fax}</p>
                  )}
                </div>
              </Card>

              {/* Email Addresses */}
              <Card className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center mr-4">
                    <Mail className="w-6 h-6 text-secondary-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Email</h3>
                    <p className="text-secondary-600 text-sm">Official Communication</p>
                  </div>
                </div>
                <div className="space-y-2">
                  {contactData.contactInfo?.email?.main && (
                    <p className="text-gray-700 text-sm">{contactData.contactInfo.email.main}</p>
                  )}
                  {contactData.contactInfo?.email?.registrar && (
                    <p className="text-gray-700 text-sm">{contactData.contactInfo.email.registrar}</p>
                  )}
                  {contactData.contactInfo?.email?.info && (
                    <p className="text-gray-700 text-sm">{contactData.contactInfo.email.info}</p>
                  )}
                </div>
              </Card>

              {/* Address */}
              <Card className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center mr-4">
                    <MapPin className="w-6 h-6 text-accent-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Address</h3>
                    <p className="text-accent-600 text-sm">Main Campus Location</p>
                  </div>
                </div>
                <div className="space-y-2">
                  {contactData.contactInfo?.address?.institution && (
                    <p className="text-gray-700 text-sm">{contactData.contactInfo.address.institution}</p>
                  )}
                  {contactData.contactInfo?.address?.university && (
                    <p className="text-gray-700 text-sm">{contactData.contactInfo.address.university}</p>
                  )}
                  {contactData.contactInfo?.address?.street && contactData.contactInfo?.address?.city && (
                    <p className="text-gray-700 text-sm">
                      {contactData.contactInfo.address.street}, {contactData.contactInfo.address.city}
                      {contactData.contactInfo?.address?.pincode && ` - ${contactData.contactInfo.address.pincode}`}
                    </p>
                  )}
                  {contactData.contactInfo?.address?.state && contactData.contactInfo?.address?.country && (
                    <p className="text-gray-700 text-sm">
                      {contactData.contactInfo.address.state}, {contactData.contactInfo.address.country}
                    </p>
                  )}
                </div>
              </Card>

              {/* Office Hours */}
              <Card className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                    <Clock className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Office Hours</h3>
                    <p className="text-green-600 text-sm">Working Schedule</p>
                  </div>
                </div>
                <div className="space-y-2">
                  {contactData.contactInfo?.officeHours?.weekdays && (
                    <p className="text-gray-700 text-sm">{contactData.contactInfo.officeHours.weekdays}</p>
                  )}
                  {contactData.contactInfo?.officeHours?.saturday && (
                    <p className="text-gray-700 text-sm">{contactData.contactInfo.officeHours.saturday}</p>
                  )}
                  {contactData.contactInfo?.officeHours?.sunday && (
                    <p className="text-gray-700 text-sm">{contactData.contactInfo.officeHours.sunday}</p>
                  )}
                </div>
              </Card>
            </div>

            {/* Google Map */}
            <div className="space-y-6">
              <Card className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                    <Globe className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {contactData.mapConfig?.title || 'Location Map'}
                    </h3>
                    <p className="text-blue-600 text-sm">
                      {contactData.mapConfig?.description || 'Find Us Here'}
                    </p>
                  </div>
                </div>
                
                {/* Google Map Embed */}
                <div className="w-full h-80 bg-gray-200 rounded-lg overflow-hidden">
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
                
                <div className="mt-4 text-center">
                  <a
                    href={getMapUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition-colors"
                  >
                    <MapPin className="w-4 h-4 mr-2" />
                    Open in Google Maps
                  </a>
                </div>
              </Card>

              {/* Directions */}
              <Card className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                    <Building className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Directions</h3>
                    <p className="text-purple-600 text-sm">How to Reach</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {contactData.directions?.byRoad && (
                    <div>
                      <p className="font-medium text-gray-900 text-sm">By Road:</p>
                      <p className="text-gray-700 text-sm">{contactData.directions.byRoad}</p>
                    </div>
                  )}
                  {contactData.directions?.byAir && (
                    <div>
                      <p className="font-medium text-gray-900 text-sm">By Air:</p>
                      <p className="text-gray-700 text-sm">{contactData.directions.byAir}</p>
                    </div>
                  )}
                  {contactData.directions?.byTrain && (
                    <div>
                      <p className="font-medium text-gray-900 text-sm">By Train:</p>
                      <p className="text-gray-700 text-sm">{contactData.directions.byTrain}</p>
                    </div>
                  )}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Departments */}
      {contactData.departments && contactData.departments.length > 0 && (
        <section id="departments" className="section-padding bg-white">
          <div className="container-max">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Department Contacts</h2>
              <div className="w-20 h-1 bg-blue-400 rounded mx-auto mb-6"></div>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Get in touch with specific departments for detailed information and support.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {contactData.departments.map((dept, index) => (
                <Card key={index} className="p-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <Building className="w-6 h-6 text-blue-500" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{dept.name}</h3>
                  {dept.head && (
                    <p className="text-sm text-gray-600 mb-3">Head: {dept.head}</p>
                  )}
                  {dept.description && (
                    <p className="text-sm text-gray-700 mb-4">{dept.description}</p>
                  )}
                  <div className="space-y-2">
                    {dept.phone && (
                      <div className="flex items-center text-sm text-gray-600">
                        <Phone className="w-4 h-4 mr-2" />
                        {dept.phone}
                      </div>
                    )}
                    {dept.email && (
                      <div className="flex items-center text-sm text-gray-600">
                        <Mail className="w-4 h-4 mr-2" />
                        {dept.email}
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Emergency Contacts */}
      {contactData.emergencyContacts && contactData.emergencyContacts.length > 0 && (
        <section id="emergency" className="section-padding bg-red-50">
          <div className="container-max">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Emergency Contacts</h2>
              <div className="w-20 h-1 bg-red-400 rounded mx-auto mb-6"></div>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Important contact numbers for emergency situations and urgent matters.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {contactData.emergencyContacts.map((contact, index) => (
                <Card key={index} className="p-6 border-l-4 border-red-500">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <AlertCircle className="w-6 h-6 text-red-500" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{contact.title}</h3>
                      {contact.name && (
                        <p className="text-sm text-gray-600 mb-2">Contact: {contact.name}</p>
                      )}
                      {contact.phone && (
                        <p className="text-red-600 font-medium mb-2">📞 {contact.phone}</p>
                      )}
                      {contact.description && (
                        <p className="text-sm text-gray-700">{contact.description}</p>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

   
    </div>
  )
}

export default Contact





