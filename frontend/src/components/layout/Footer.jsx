import React from 'react'
import { Link } from 'react-router-dom'
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Youtube, ExternalLink } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { name: 'About CoF', href: '/about' },
    { name: 'Academic Programmes', href: '/programs' },
    { name: 'Departments', href: '/departments' },
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
    <footer className="bg-gray-900 text-white">
      <div className="container-max section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* College Info */}
          <div className="space-y-4 lg:col-span-2">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">CoF</span>
              </div>
              <div>
                <h3 className="text-lg font-bold">College of Fisheries, Jabalpur</h3>
                <p className="text-gray-400 text-sm">(nanaji deshmukh veterinary science university)</p>
              </div>
            </div>
            
            <p className="text-gray-300 text-sm leading-relaxed">
              The College of Fisheries, Jabalpur is a constituent college of Nanaji Deshmukh Veterinary Science University. 
              This College offers a credible fisheries education institution that nurtures the next-generation of professionals and entrepreneurs in the fisheries sector.
            </p>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-3 text-sm">
                <MapPin className="h-4 w-4 text-primary-400 flex-shrink-0" />
                <span className="text-gray-300">
                  College of Fisheries, Jabalpur<br />
                  Nanaji Deshmukh Veterinary Science University<br />
                  Jabalpur, Madhya Pradesh
                </span>
              </div>
              
              <div className="flex items-center space-x-3 text-sm">
                <Phone className="h-4 w-4 text-primary-400 flex-shrink-0" />
                <span className="text-gray-300">0645-231375</span>
              </div>
              
              <div className="flex items-center space-x-3 text-sm">
                <Mail className="h-4 w-4 text-primary-400 flex-shrink-0" />
                <span className="text-gray-300">deancof_basu_bih@gov.in</span>
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
            <h4 className="text-lg font-semibold mb-4">Academic</h4>
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

          {/* Related Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Related Links</h4>
            <ul className="space-y-2">
              {relatedLinks.map((link) => (
                <li key={link.name}>
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-300 hover:text-primary-400 transition-colors text-sm flex items-center"
                    >
                      {link.name}
                      <ExternalLink className="h-3 w-3 ml-1" />
                    </a>
                  ) : (
                    <Link
                      to={link.href}
                      className="text-gray-300 hover:text-primary-400 transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-400">
              © {currentYear} College of Fisheries, Jabalpur. All rights reserved.
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