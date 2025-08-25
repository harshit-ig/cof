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
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Fishery College Jabalpur</h3>
            <p className="text-gray-300">
              Leading institution in fisheries education and research
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
              Jabalpur, Madhya Pradesh<br />
              Phone: +91 761 2345678<br />
              Email: info@fisherycollegejabalpur.edu.in
            </p>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; {currentYear} Fishery College Jabalpur. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

