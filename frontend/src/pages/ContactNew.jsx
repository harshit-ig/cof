import React from 'react'
import { Phone, Mail, MapPin, Clock, Fax, Globe, ChevronRight, Users } from 'lucide-react'
import Card from '../components/common/Card'

const Contact = () => {
  const contactDetails = [
    {
      icon: Phone,
      title: 'Phone Numbers',
      details: [
        'Dean Office: +91-761-2681969',
        'Administrative Office: +91-761-2681971',
        'Admission Office: +91-761-2681972',
        'Library: +91-761-2681973'
      ]
    },
    {
      icon: Mail,
      title: 'Email Addresses',
      details: [
        'Dean: dean.fishery@ndvsu.ac.in',
        'Admission: admissions.cof@ndvsu.ac.in',
        'General Inquiry: info.cof@ndvsu.ac.in',
        'Research: research.cof@ndvsu.ac.in'
      ]
    },
    {
      icon: Fax,
      title: 'Fax & Other',
      details: [
        'Fax: +91-761-2681970',
        'University Website: www.ndvsu.ac.in',
        'EPABX: +91-761-2681969',
        'Emergency: +91-761-2681974'
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
        'College of Fishery',
        'Nanaji Deshmukh Veterinary Science University',
        'Adhartal, Jabalpur - 482004',
        'Madhya Pradesh, India'
      ],
      type: 'Primary Campus',
      landmark: 'Near Veterinary College'
    },
    {
      title: 'Administrative Office',
      address: [
        'Administrative Block',
        'College of Fishery',
        'Adhartal, Jabalpur - 482004',
        'Madhya Pradesh, India'
      ],
      type: 'Admin Block',
      landmark: 'Inside Main Campus'
    },
    {
      title: 'Research Center',
      address: [
        'Fisheries Research Unit',
        'College of Fishery',
        'Adhartal, Jabalpur - 482004',
        'Madhya Pradesh, India'
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
      email: 'aquaculture.cof@ndvsu.ac.in',
      room: 'Room 201, Academic Block'
    },
    {
      department: 'Fish Processing Technology',
      hod: 'Dr. Priya Sharma',
      phone: '+91-761-2681386',
      email: 'processing.cof@ndvsu.ac.in',
      room: 'Room 301, Technology Block'
    },
    {
      department: 'Fisheries Extension',
      hod: 'Dr. Amit Kumar Patel',
      phone: '+91-761-2681387',
      email: 'extension.cof@ndvsu.ac.in',
      room: 'Room 101, Extension Wing'
    },
    {
      department: 'Fish Health Management',
      hod: 'Dr. Meera Singh',
      phone: '+91-761-2681388',
      email: 'fishhealth.cof@ndvsu.ac.in',
      room: 'Room 401, Research Block'
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-400 via-blue-500 to-green-400 text-white">
        <div className="container-max section-padding">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Complete contact information and location details for College of Fishery, Jabalpur. 
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
            <div className="w-20 h-1 bg-blue-400 rounded mx-auto mb-6"></div>
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
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-blue-500" />
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
              <div className="bg-blue-500 text-white p-4">
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
                  title="College of Fishery Location"
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
              <div className="w-16 h-1 bg-blue-400 rounded mx-auto"></div>
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
      <section className="section-padding bg-blue-500 text-white">
        <div className="container-max text-center">
          <h2 className="text-3xl font-bold mb-4">Visit Our Campus</h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Experience our state-of-the-art facilities, meet our faculty, and explore opportunities 
            at College of Fishery, Jabalpur. Schedule a campus visit today!
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
              className="btn-outline border-white text-white hover:bg-white hover:text-blue-500 inline-flex items-center"
            >
              <Mail className="w-4 h-4 mr-2" />
              Email for Information
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact







