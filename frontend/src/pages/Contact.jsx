<<<<<<< HEAD
import React from 'react'
import { Phone, Mail, MapPin, Clock, FileText, Globe, ChevronRight, Users } from 'lucide-react'
import Card from '../components/common/Card'

const Contact = () => {
  const contactDetails = [
=======
import React, { useState } from 'react'
<<<<<<< HEAD
import { Phone, Mail, MapPin, Clock, Users, Building, Car, Wifi } from 'lucide-react'
import Section, { SectionHeader } from '../components/common/Section'
=======
import { Phone, Mail, MapPin, Clock, Users, Building, Globe, Send, CheckCircle } from 'lucide-react'
>>>>>>> 41d7fb679926a7c665e36ecef449b8f21d657422
import Card from '../components/common/Card'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
<<<<<<< HEAD

  const [loading, setLoading] = useState(false)
=======
  const [isSubmitted, setIsSubmitted] = useState(false)
>>>>>>> 41d7fb679926a7c665e36ecef449b8f21d657422

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

<<<<<<< HEAD
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
=======
  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData)
    setIsSubmitted(true)
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    })
    
    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000)
  }

  const contactInfo = [
>>>>>>> 356a3acf66188d788cf322698f07ebf8ec85f7f3
    {
      icon: Phone,
      title: 'Phone Numbers',
      details: [
        'Principal Office: +91-761-2681375',
        'Administrative Office: +91-761-2681376',
        'Admission Office: +91-761-2681377',
        'Library: +91-761-2681378'
      ]
    },
    {
      icon: Mail,
      title: 'Email Addresses',
      details: [
        'Principal: principal@cofjabalpur.ac.in',
        'Admission: admissions@cofjabalpur.ac.in',
        'General Inquiry: info@cofjabalpur.ac.in',
        'Research: research@cofjabalpur.ac.in'
      ]
    },
    {
      icon: FileText,
      title: 'Fax & Other',
      details: [
        'Fax: +91-761-2681379',
        'Website: www.cofjabalpur.ac.in',
        'EPABX: +91-761-2681380',
        'Emergency: +91-761-2681381'
      ]
    },
    {
      icon: Clock,
      title: 'Office Hours',
      details: [
        'Monday to Friday: 9:00 AM - 5:00 PM',
        'Saturday: 9:00 AM - 1:00 PM',
        'Sunday: Closed',
        'Lunch Break: 1:00 PM - 2:00 PM'
      ]
    }
  ]

  const officeAddresses = [
    {
      title: 'Main Campus',
      address: [
        'College of Fisheries',
        'Nanaji Deshmukh Veterinary Science University',
        'Mhow-Neemuch Road, Jabalpur',
        'Madhya Pradesh - 482004, India'
      ],
      type: 'Primary Campus',
      landmark: 'Near Veterinary College'
    },
    {
      title: 'Administrative Office',
      address: [
        'Administrative Block',
        'College of Fisheries',
        'University Campus, Jabalpur',
        'Madhya Pradesh - 482004, India'
      ],
      type: 'Admin Block',
      landmark: 'Inside Main Campus'
    },
    {
      title: 'Research Center',
      address: [
        'Fisheries Research Unit',
        'College of Fisheries',
        'Research Complex, Jabalpur',
        'Madhya Pradesh - 482004, India'
      ],
      type: 'Research Facility',
      landmark: 'Near Main Laboratory Block'
    }
  ]

  const departmentContacts = [
    {
      department: 'Aquaculture',
      hod: 'Dr. Rajesh Kumar Singh',
      phone: '+91-761-2681385',
      email: 'aquaculture@cofjabalpur.ac.in',
      room: 'Room 201, Academic Block'
    },
    {
      department: 'Fish Processing Technology',
      hod: 'Dr. Priya Sharma',
      phone: '+91-761-2681386',
      email: 'processing@cofjabalpur.ac.in',
      room: 'Room 301, Technology Block'
    },
    {
      department: 'Fisheries Extension',
      hod: 'Dr. Amit Kumar Patel',
      phone: '+91-761-2681387',
      email: 'extension@cofjabalpur.ac.in',
      room: 'Room 101, Extension Wing'
    },
    {
      department: 'Fish Health Management',
      hod: 'Dr. Meera Singh',
      phone: '+91-761-2681388',
      email: 'fishhealth@cofjabalpur.ac.in',
      room: 'Room 401, Research Block'
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600 text-white">
        <div className="container-max section-padding">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Complete contact information and location details for College of Fisheries, Jabalpur. 
              Connect with us for admissions, research collaborations, and general inquiries.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Details & Google Map */}
      <section id="contact-details" className="section-padding bg-gray-50">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Contact Details & Google Map</h2>
            <div className="w-20 h-1 bg-primary-500 rounded mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Complete contact information including phone numbers, email addresses, office hours, 
              physical addresses, and interactive map location for easy navigation.
            </p>
          </div>

          {/* Main Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {contactDetails.map((contact, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <contact.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{contact.title}</h3>
                <div className="space-y-2">
                  {contact.details.map((detail, idx) => (
                    <p key={idx} className="text-sm text-gray-700 leading-relaxed">
                      {detail}
                    </p>
                  ))}
                </div>
              </Card>
            ))}
          </div>

          {/* Address Information */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {officeAddresses.map((office, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-primary-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{office.title}</h3>
                    <div className="space-y-1 mb-3">
                      {office.address.map((line, idx) => (
                        <p key={idx} className="text-sm text-gray-700">{line}</p>
                      ))}
                    </div>
                    <div className="flex flex-col space-y-1">
                      <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded w-fit">
                        {office.type}
                      </span>
                      <p className="text-xs text-gray-600">📍 {office.landmark}</p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Google Map Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Map */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-primary-600 text-white p-4">
                <h3 className="text-lg font-semibold flex items-center">
                  <Globe className="w-5 h-5 mr-2" />
                  Interactive Location Map
                </h3>
              </div>
              <div className="h-96 bg-gray-100 relative">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3666.1158659841544!2d79.9513652!3d23.1814992!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3981ae1b6b4b5555%3A0x9c8f8c8c8c8c8c8c!2sJabalpur%2C%20Madhya%20Pradesh!5e0!3m2!1sen!2sin!4v1692890000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="College of Fisheries Location"
                ></iframe>
                <div className="absolute top-4 left-4 bg-white p-2 rounded shadow-md">
                  <p className="text-xs text-gray-600">
                    <strong>Coordinates:</strong><br />
                    23.1815° N, 79.9514° E
                  </p>
                </div>
              </div>
            </div>

            {/* Location Details */}
            <div className="space-y-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Location Information</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">🚗 By Road</h4>
                    <p className="text-sm text-gray-700">
                      Located on Mhow-Neemuch Road, well-connected to major highways. 
                      Regular bus services from all major cities in Madhya Pradesh.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">🚂 By Train</h4>
                    <p className="text-sm text-gray-700">
                      Jabalpur Railway Junction (5 km) - Major railhead with excellent connectivity 
                      to Delhi, Mumbai, Chennai, and other major cities.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">✈️ By Air</h4>
                    <p className="text-sm text-gray-700">
                      Jabalpur Airport (8 km) - Dumna Airport with regular flights to major cities. 
                      Taxi and bus services available from airport.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">🏪 Nearby Landmarks</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• NDVSU Veterinary College (Adjacent)</li>
                      <li>• Jabalpur Engineering College (2 km)</li>
                      <li>• Medical College, Jabalpur (3 km)</li>
                      <li>• Rani Durgavati University (4 km)</li>
                    </ul>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <a
                    href="https://maps.google.com/?q=College+of+Fisheries+Jabalpur"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                  >
                    <span className="text-sm font-medium text-blue-900">Get Directions</span>
                    <ChevronRight className="w-4 h-4 text-blue-600" />
                  </a>
                  
                  <a
                    href="tel:+917612681375"
                    className="flex items-center justify-between p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors"
                  >
                    <span className="text-sm font-medium text-green-900">Call Main Office</span>
                    <Phone className="w-4 h-4 text-green-600" />
                  </a>
                  
                  <a
                    href="mailto:principal@cofjabalpur.ac.in"
                    className="flex items-center justify-between p-3 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors"
                  >
                    <span className="text-sm font-medium text-orange-900">Send Email</span>
                    <Mail className="w-4 h-4 text-orange-600" />
                  </a>
                </div>
              </Card>
            </div>
          </div>

          {/* Department Contacts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2 text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Department Contacts</h3>
              <div className="w-16 h-1 bg-primary-500 rounded mx-auto"></div>
            </div>
            
            {departmentContacts.map((dept, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-secondary-100 rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5 text-secondary-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-gray-900 mb-1">{dept.department}</h4>
                    <p className="text-sm text-gray-600 mb-3">Head: {dept.hod}</p>
                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-gray-700">
                        <Phone className="w-4 h-4 mr-2 text-gray-500" />
                        {dept.phone}
                      </div>
                      <div className="flex items-center text-sm text-gray-700">
                        <Mail className="w-4 h-4 mr-2 text-gray-500" />
                        {dept.email}
                      </div>
                      <div className="flex items-center text-sm text-gray-700">
                        <MapPin className="w-4 h-4 mr-2 text-gray-500" />
                        {dept.room}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section-padding bg-primary-600 text-white">
        <div className="container-max text-center">
          <h2 className="text-3xl font-bold mb-4">Visit Our Campus</h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Experience our state-of-the-art facilities, meet our faculty, and explore opportunities 
            at College of Fisheries, Jabalpur. Schedule a campus visit today!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+917612681375"
              className="btn-accent inline-flex items-center"
            >
              <Phone className="w-4 h-4 mr-2" />
              Call for Campus Visit
            </a>
            
            <a
              href="mailto:info@cofjabalpur.ac.in"
              className="btn-outline border-white text-white hover:bg-white hover:text-primary-600 inline-flex items-center"
            >
              <Mail className="w-4 h-4 mr-2" />
              Email for Information
            </a>
          </div>
        </div>
      </section>
>>>>>>> 41d7fb679926a7c665e36ecef449b8f21d657422
    </div>
  )
}

export default Contact
