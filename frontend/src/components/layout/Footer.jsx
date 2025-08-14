import React from 'react'
import { Link } from 'react-router-dom'
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Youtube } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'Programs', href: '/programs' },
    { name: 'Faculty', href: '/faculty' },
    { name: 'Research', href: '/research' },
    { name: 'Infrastructure', href: '/infrastructure' },
    { name: 'Contact Us', href: '/contact' }
  ]

  const academicLinks = [
    { name: 'Admission Guidelines', href: '/students#admission' },
    { name: 'Academic Calendar', href: '/academics#calendar' },
    { name: 'Course Curriculum', href: '/academics#curriculum' },
    { name: 'Academic Regulations', href: '/academics#regulations' },
    { name: 'Scholarships', href: '/students#scholarships' },
    { name: 'Placement Cell', href: '/students#placement' }
  ]

  const researchLinks = [
    { name: 'Research Projects', href: '/research' },
    { name: 'Publications', href: '/research#publications' },
    { name: 'Collaborations', href: '/collaborations' },
    { name: 'Research Facilities', href: '/research#facilities' },
    { name: 'Student Research', href: '/research#student-research' },
    { name: 'Incubation Centre', href: '/incubation' }
  ]

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container-max section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* College Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">FC</span>
              </div>
              <div>
                <h3 className="text-lg font-bold">Fishery College</h3>
                <p className="text-gray-400 text-sm">Jabalpur</p>
              </div>
            </div>
            
            <p className="text-gray-300 text-sm leading-relaxed">
              Leading institution in fisheries education, research, and extension services. 
              Committed to excellence in aquaculture and fisheries science education.
            </p>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-3 text-sm">
                <MapPin className="h-4 w-4 text-primary-400 flex-shrink-0" />
                <span className="text-gray-300">
                  Fishery College Campus, Jabalpur, Madhya Pradesh, India
                </span>
              </div>
              
              <div className="flex items-center space-x-3 text-sm">
                <Phone className="h-4 w-4 text-primary-400 flex-shrink-0" />
                <span className="text-gray-300">+91 761 XXXXXXX</span>
              </div>
              
              <div className="flex items-center space-x-3 text-sm">
                <Mail className="h-4 w-4 text-primary-400 flex-shrink-0" />
                <span className="text-gray-300">info@fisherycollegejabalpur.edu.in</span>
              </div>
            </div>
            
            {/* Social Media Links */}
            <div className="flex space-x-4 pt-4">
              <a
                href="#"
                className="text-gray-400 hover:text-primary-400 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-primary-400 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-primary-400 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-primary-400 transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
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

          {/* Academic Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Academics</h4>
            <ul className="space-y-2">
              {academicLinks.map((link) => (
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

          {/* Research Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Research</h4>
            <ul className="space-y-2">
              {researchLinks.map((link) => (
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
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-400">
              © {currentYear} Fishery College Jabalpur. All rights reserved.
            </div>
            
            <div className="flex space-x-6 text-sm">
              <Link to="/privacy" className="text-gray-400 hover:text-primary-400 transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-primary-400 transition-colors">
                Terms of Service
              </Link>
              <Link to="/sitemap" className="text-gray-400 hover:text-primary-400 transition-colors">
                Sitemap
              </Link>
              <Link to="/admin/login" className="text-gray-400 hover:text-primary-400 transition-colors">
                Admin Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer