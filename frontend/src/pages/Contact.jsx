import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Phone, Mail, MapPin, Clock, Globe, Building } from 'lucide-react'
import Card from '../components/common/Card'
import { useSettings } from '../context/SettingsContext'

const Contact = () => {
  const { 
    siteName, 
    contactEmail, 
    contactPhone, 
    address,
    location: locationSettings
  } = useSettings()
  
  const location = useLocation()
  const hash = location.hash.substring(1)

  // Generate Google Maps embed URL from location settings
  const getMapEmbedUrl = () => {
    // Use default values if settings not loaded yet
    const latitude = locationSettings?.latitude || 23.1815
    const longitude = locationSettings?.longitude || 79.9864
    const zoom = locationSettings?.zoom || 15
    
    // Use a simpler Google Maps embed format
    return `https://maps.google.com/maps?width=100%25&height=600&hl=en&q=${latitude},${longitude}&t=&z=${zoom}&ie=UTF8&iwloc=&output=embed`
  }

  // Generate Google Maps URL for "Open in Google Maps" button
  const getMapUrl = () => {
    const latitude = locationSettings?.latitude || 23.1815
    const longitude = locationSettings?.longitude || 79.9864
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

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-blue-400 via-blue-500 to-green-400 text-white">
        <div className="container-max">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Contact Us
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Get in Touch with {siteName}
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
                  <p className="text-gray-700 text-sm">{contactPhone}</p>
                  <p className="text-gray-700 text-sm">Office: +91-761-2681971</p>
                  <p className="text-gray-700 text-sm">Fax: +91-761-2681970</p>
                </div>
              </Card>

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
                  <p className="text-gray-700 text-sm">{contactEmail}</p>
                  <p className="text-gray-700 text-sm">registrar@ndvsu.ac.in</p>
                  <p className="text-gray-700 text-sm">info.cof@ndvsu.ac.in</p>
                </div>
              </Card>

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
                  <p className="text-gray-700 text-sm">College of Fishery</p>
                  <p className="text-gray-700 text-sm">Nanaji Deshmukh Veterinary Science University</p>
                  <p className="text-gray-700 text-sm">Adhartal, Jabalpur - 482004</p>
                  <p className="text-gray-700 text-sm">Madhya Pradesh, India</p>
                </div>
              </Card>

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
                  <p className="text-gray-700 text-sm">Monday - Friday: 9:00 AM - 5:00 PM</p>
                  <p className="text-gray-700 text-sm">Saturday: 9:00 AM - 1:00 PM</p>
                  <p className="text-gray-700 text-sm">Sunday: Closed</p>
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
                      {locationSettings?.mapTitle || 'Location Map'}
                    </h3>
                    <p className="text-blue-600 text-sm">
                      {locationSettings?.mapDescription || 'Find Us Here'}
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
                    title={locationSettings?.mapTitle || 'College of Fishery Location'}
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
                  <div>
                    <p className="font-medium text-gray-900 text-sm">By Road:</p>
                    <p className="text-gray-700 text-sm">NH 34 from Bhopal (300 km), NH 7 from Nagpur (250 km)</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 text-sm">By Air:</p>
                    <p className="text-gray-700 text-sm">Nearest airport: Jabalpur Airport (15 km)</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 text-sm">By Train:</p>
                    <p className="text-gray-700 text-sm">Jabalpur Railway Station (12 km from campus)</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact





