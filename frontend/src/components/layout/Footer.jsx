import React from 'react'
import { Link } from 'react-router-dom'
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Youtube, ExternalLink, Globe } from 'lucide-react'
import { useSettings } from '../../context/SettingsContext'

const Footer = () => {
  const { 
    siteName, 
    contactEmail, 
    contactPhone, 
    address, 
    socialMedia, 
    footerText,
    location: locationSettings
  } = useSettings()
  
  const currentYear = new Date().getFullYear()

  // Generate Google Maps embed URL from location settings
  const getMapEmbedUrl = () => {
    // Use default values if settings not loaded yet
    const latitude = locationSettings?.latitude || 23.1815
    const longitude = locationSettings?.longitude || 79.9864
    const zoom = locationSettings?.zoom || 15
    
    // Use a simpler Google Maps embed format
    return `https://maps.google.com/maps?width=100%25&height=300&hl=en&q=${latitude},${longitude}&t=&z=${zoom}&ie=UTF8&iwloc=&output=embed`
  }

  // Generate Google Maps URL for "Open in Google Maps" button
  const getMapUrl = () => {
    const latitude = locationSettings?.latitude || 23.1815
    const longitude = locationSettings?.longitude || 79.9864
    return `https://maps.google.com/?q=${latitude},${longitude}`
  }

  const quickLinks = [
    { name: 'About CoF', href: '/about' },
    { name: 'Academic Programmes', href: '/academics' },
    { name: 'Departments', href: '/academics#departments' },
    { name: 'Faculty', href: '/faculty' },
    { name: 'Research Projects', href: '/research' },
    { name: 'Contact Us', href: '/contact' }
  ]

  const academicLinks = [
    { name: 'Admission Guidelines', href: '/student-corner' },
    { name: 'Scholarships & Fellowships', href: '/student-corner#scholarships' },
    { name: 'Academic Regulations', href: '/academics#regulations' },
    { name: 'Academic Calendar', href: '/academics#calendar' },
    { name: 'Course Curriculum', href: '/academics#curriculum' },
    { name: 'Internship & Placement', href: '/student-corner#placement' }
  ]

  const researchLinks = [
    { name: 'Ongoing Projects', href: '/research' },
    { name: 'Publications and Journals', href: '/research#publications' },
    { name: 'Student Research', href: '/research#student-research' },
    { name: 'Research Collaborations', href: '/research#collaborations' },
    { name: 'Research Facilities', href: '/research#facilities' },
    { name: 'Extension Activities', href: '/extension' }
  ]

  const relatedLinks = [
    { name: 'ICAR', href: 'https://icar.org.in', external: true },
    { name: 'ICAR-NBFGR', href: 'https://nbfgr.res.in', external: true },
    { name: 'ICAR-CIFRI', href: 'https://cifri.icar.gov.in', external: true },
    { name: 'ICAR-CIFE', href: 'https://cife.edu.in', external: true },
    { name: 'ICAR-CIBA', href: 'https://ciba.icar.gov.in', external: true },
    { name: 'ICAR-CMFRI', href: 'https://cmfri.org.in', external: true },
    { name: 'ICAR-DCFR', href: 'https://dcfr.res.in', external: true }
  ]

  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">{siteName}</h3>
            <p className="text-gray-300">
              Leading institution in fishery education and research
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-300">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-300 hover:text-primary-400 transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Info</h3>
            <p className="text-gray-300">
              {address}<br />
              Phone: {contactPhone}<br />
              Email: {contactEmail}
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              {socialMedia.facebook && (
                <a
                  href={socialMedia.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-blue-400 transition-colors"
                >
                  <Facebook className="w-6 h-6" />
                </a>
              )}
              {socialMedia.twitter && (
                <a
                  href={socialMedia.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-blue-400 transition-colors"
                >
                  <Twitter className="w-6 h-6" />
                </a>
              )}
              {socialMedia.linkedin && (
                <a
                  href={socialMedia.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-blue-400 transition-colors"
                >
                  <Linkedin className="w-6 h-6" />
                </a>
              )}
              {socialMedia.instagram && (
                <a
                  href={socialMedia.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-pink-400 transition-colors"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C8.396 0 7.931.013 6.727.06 5.525.107 4.73.28 4.088.527a5.82 5.82 0 0 0-2.119 1.442A5.82 5.82 0 0 0 .527 4.088C.28 4.73.107 5.526.06 6.727.013 7.931 0 8.396 0 12.017s.013 4.086.06 5.29c.047 1.201.22 1.997.467 2.64a5.82 5.82 0 0 0 1.442 2.118 5.82 5.82 0 0 0 2.119 1.442c.642.247 1.438.42 2.64.467 1.204.047 1.669.06 5.29.06s4.086-.013 5.29-.06c1.201-.047 1.997-.22 2.64-.467a5.82 5.82 0 0 0 2.118-1.442 5.82 5.82 0 0 0 1.442-2.118c.247-.643.42-1.44.467-2.64.047-1.204.06-1.669.06-5.29s-.013-4.086-.06-5.29c-.047-1.201-.22-1.997-.467-2.64a5.82 5.82 0 0 0-1.442-2.119A5.82 5.82 0 0 0 19.947.527c-.643-.247-1.44-.42-2.64-.467C16.103.013 15.638 0 12.017 0zm0 2.164c3.548 0 3.97.014 5.367.06 1.296.059 2.003.276 2.472.458a4.142 4.142 0 0 1 1.528.993 4.142 4.142 0 0 1 .993 1.528c.182.469.399 1.176.458 2.472.046 1.397.06 1.819.06 5.367s-.014 3.97-.06 5.367c-.059 1.296-.276 2.003-.458 2.472a4.142 4.142 0 0 1-.993 1.528 4.142 4.142 0 0 1-1.528.993c-.469.182-1.176.399-2.472.458-1.397.046-1.819.06-5.367.06s-3.97-.014-5.367-.06c-1.296-.059-2.003-.276-2.472-.458a4.142 4.142 0 0 1-1.528-.993 4.142 4.142 0 0 1-.993-1.528c-.182-.469-.399-1.176-.458-2.472-.046-1.397-.06-1.819-.06-5.367s.014-3.97.06-5.367c.059-1.296.276-2.003.458-2.472a4.142 4.142 0 0 1 .993-1.528A4.142 4.142 0 0 1 4.688 2.682c.469-.182 1.176-.399 2.472-.458 1.397-.046 1.819-.06 5.367-.06z"/>
                    <path d="M12.017 5.838a6.179 6.179 0 1 0 0 12.358 6.179 6.179 0 0 0 0-12.358zm0 10.194a4.015 4.015 0 1 1 0-8.03 4.015 4.015 0 0 1 0 8.03z"/>
                    <circle cx="18.407" cy="5.593" r="1.44"/>
                  </svg>
                </a>
              )}
            </div>
            
            {/* Google Map Section */}
            <div className="mt-6">
              <h4 className="text-lg font-semibold mb-3 flex items-center">
                <Globe className="w-5 h-5 mr-2" />
                Find Us
              </h4>
              <div className="w-full h-48 bg-gray-200 rounded-lg overflow-hidden">
                <iframe
                  src={getMapEmbedUrl()}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`${siteName} Location`}
                ></iframe>
              </div>
              <div className="mt-3 text-center">
                <a
                  href={getMapUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-3 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition-colors"
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  Open in Google Maps
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; {currentYear} {siteName}. All rights reserved.</p>
          {footerText && footerText !== `${siteName} - Excellence in Fishery Education & Research` && (
            <p className="mt-2 text-sm">{footerText}</p>
          )}
        </div>
      </div>
    </footer>
  )
}

export default Footer






