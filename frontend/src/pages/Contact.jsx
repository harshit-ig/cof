import React, { useState } from 'react'
import { Phone, Mail, MapPin, Clock, Users, Building, Car, Wifi } from 'lucide-react'
import Section, { SectionHeader } from '../components/common/Section'
import Card from '../components/common/Card'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })

  const [loading, setLoading] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    // Simulate form submission
    setTimeout(() => {
      setLoading(false)
      alert('Thank you for your message! We will get back to you soon.')
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      })
    }, 2000)
  }

  const contactInfo = {
    address: {
      main: 'College of Fisheries, Jabalpur',
      campus: 'NDVSU Campus',
      city: 'Jabalpur-482001',
      state: 'Madhya Pradesh',
      country: 'India'
    },
    phone: [
      { label: 'Main Office', number: '+91 761 2345678' },
      { label: 'Admission Cell', number: '+91 761 2345679' },
      { label: 'Dean Office', number: '+91 761 2345680' },
      { label: 'Academic Office', number: '+91 761 2345681' }
    ],
    email: [
      { label: 'General Enquiry', email: 'info@fisherycollegejabalpur.edu.in' },
      { label: 'Admission', email: 'admission@fisherycollegejabalpur.edu.in' },
      { label: 'Dean Office', email: 'dean@fisherycollegejabalpur.edu.in' },
      { label: 'Academic', email: 'academic@fisherycollegejabalpur.edu.in' }
    ],
    workingHours: {
      office: '9:00 AM - 5:00 PM (Monday to Saturday)',
      library: '8:00 AM - 8:00 PM (Monday to Saturday)',
      laboratories: '9:00 AM - 5:00 PM (Monday to Saturday)',
      hostels: '24/7'
    },
    departments: [
      {
        name: 'Aquaculture',
        incharge: 'Dr. Anil Kumar Jain',
        phone: '+91 761 2345680',
        email: 'aquaculture@fisherycollegejabalpur.edu.in'
      },
      {
        name: 'Fish Processing Technology',
        incharge: 'Dr. Priya Verma',
        phone: '+91 761 2345679',
        email: 'processing@fisherycollegejabalpur.edu.in'
      },
      {
        name: 'Fish Nutrition & Feed Technology',
        incharge: 'Dr. Priya Verma',
        phone: '+91 761 2345679',
        email: 'nutrition@fisherycollegejabalpur.edu.in'
      },
      {
        name: 'Fisheries Extension',
        incharge: 'Dr. Rajesh Kumar Sharma',
        phone: '+91 761 2345678',
        email: 'extension@fisherycollegejabalpur.edu.in'
      }
    ],
    howToReach: {
      byAir: {
        airport: 'Jabalpur Airport (JLR)',
        distance: '25 km from campus',
        details: 'Regular flights from Delhi, Mumbai, and other major cities'
      },
      byTrain: {
        station: 'Jabalpur Junction (JBP)',
        distance: '8 km from campus',
        details: 'Well connected to all major cities in India'
      },
      byRoad: {
        busStand: 'Jabalpur Bus Stand',
        distance: '6 km from campus',
        details: 'Regular bus services from nearby cities and towns'
      }
    }
  }

  return (
    <div className="min-h-screen">
      <Section background="bg-gray-50">
        <SectionHeader
          title="Contact Us"
          subtitle="Reach out for admissions, collaborations, or general inquiries. We're here to help you."
          align="left"
        />
        
        <div className="space-y-12">
          {/* Contact Information */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Address */}
            <Card>
              <div className="p-6 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                  <MapPin className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Address</h3>
                <div className="space-y-2 text-gray-600">
                  <p className="font-semibold">{contactInfo.address.main}</p>
                  <p>{contactInfo.address.campus}</p>
                  <p>{contactInfo.address.city}</p>
                  <p>{contactInfo.address.state}</p>
                  <p>{contactInfo.address.country}</p>
                </div>
              </div>
            </Card>

            {/* Phone Numbers */}
            <Card>
              <div className="p-6 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                  <Phone className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Phone Numbers</h3>
                <div className="space-y-3 text-sm">
                  {contactInfo.phone.map((item, index) => (
                    <div key={index} className="text-center">
                      <p className="font-semibold text-gray-700">{item.label}</p>
                      <p className="text-green-600">{item.number}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Email Addresses */}
            <Card>
              <div className="p-6 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
                  <Mail className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Email Addresses</h3>
                <div className="space-y-3 text-sm">
                  {contactInfo.email.map((item, index) => (
                    <div key={index} className="text-center">
                      <p className="font-semibold text-gray-700">{item.label}</p>
                      <p className="text-red-600 break-all">{item.email}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* Working Hours */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Clock className="h-6 w-6 text-blue-600 mr-2" />
              Working Hours
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {Object.entries(contactInfo.workingHours).map(([key, hours]) => (
                <Card key={key}>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </h3>
                    <p className="text-gray-600">{hours}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Department Contacts */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Building className="h-6 w-6 text-purple-600 mr-2" />
              Department Contacts
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {contactInfo.departments.map((dept) => (
                <Card key={dept.name}>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">{dept.name}</h3>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="font-semibold text-gray-700">Incharge:</span>
                        <span className="text-gray-600 ml-2">{dept.incharge}</span>
                      </div>
                      <div>
                        <span className="font-semibold text-gray-700">Phone:</span>
                        <span className="text-green-600 ml-2">{dept.phone}</span>
                      </div>
                      <div>
                        <span className="font-semibold text-gray-700">Email:</span>
                        <span className="text-red-600 ml-2 break-all">{dept.email}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* How to Reach */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Car className="h-6 w-6 text-orange-600 mr-2" />
              How to Reach
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {Object.entries(contactInfo.howToReach).map(([mode, info]) => (
                <Card key={mode}>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 capitalize">
                      By {mode.replace(/([A-Z])/g, ' $1').trim()}
                    </h3>
                    <div className="space-y-2 text-sm">
                      {Object.entries(info).map(([key, value]) => (
                        <div key={key}>
                          <span className="font-semibold text-gray-700 capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}:
                          </span>
                          <span className="text-gray-600 ml-2">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Mail className="h-6 w-6 text-blue-600 mr-2" />
              Send us a Message
            </h2>
            <Card>
              <div className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter your full name"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter your email address"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter your phone number"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                        Subject *
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter subject of your message"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter your message here..."
                    />
                  </div>
                  
                  <div className="text-right">
                    <button
                      type="submit"
                      disabled={loading}
                      className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? 'Sending...' : 'Send Message'}
                    </button>
                  </div>
                </form>
              </div>
            </Card>
          </div>
        </div>
      </Section>
    </div>
  )
}

export default Contact