import React, { useState, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu, X, ChevronDown } from 'lucide-react'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const location = useLocation()
  const navigate = useNavigate()

  // Updated navigation structure to match cofbasu-edu.in
  const navigation = [
    { name: 'Home', href: '/' },
    {
      name: 'About CoF',
      href: '/about',
      dropdown: [
        { name: 'Dean', href: '/about', section: 'dean-message' },
        { name: 'Teaching Faculty', href: '/faculty' },
        { name: 'Non-Teaching', href: '/about', section: 'non-teaching' },
        { name: 'Important Contact', href: '/contact' }
      ]
    },
    {
      name: 'Academic',
      href: '/programs',
      dropdown: [
        { name: 'Academic Programmes', href: '/programs' },
        { name: 'Admission Eligibility', href: '/students', section: 'admission' },
        { name: 'Admission Process', href: '/students', section: 'admission' },
        { name: 'Admission Capacity', href: '/students', section: 'admission' },
        { name: 'Fees Structure', href: '/students', section: 'fees' },
        { name: 'Academic Regulations', href: '/academics', section: 'regulations' },
        { name: 'Academic Calendar', href: '/academics', section: 'calendar' }
      ]
    },
    {
      name: 'Departments',
      href: '/departments',
      dropdown: [
        { name: 'Aquaculture', href: '/departments/aquaculture' },
        { name: 'Aquatic Animal Health Management', href: '/departments/health-management' },
        { name: 'Aquatic Environment Management', href: '/departments/environment' },
        { name: 'Fish Biotechnology', href: '/departments/biotechnology' },
        { name: 'Fish Breeding & Genetics', href: '/departments/breeding-genetics' },
        { name: 'Fish Nutrition & Feed Technology', href: '/departments/nutrition' },
        { name: 'Fish Physiology & Biochemistry', href: '/departments/physiology' },
        { name: 'Fish Processing Technology', href: '/departments/processing' },
        { name: 'Fisheries Economics & Statistics', href: '/departments/economics' },
        { name: 'Fisheries Extension', href: '/departments/extension' },
        { name: 'Fisheries Resource Management', href: '/departments/resource-management' }
      ]
    },
    { name: 'Library', href: '/library' },
    {
      name: 'Students Welfare',
      href: '/students',
      dropdown: [
        { name: 'Hostels Facilities', href: '/students', section: 'hostels' },
        { name: 'Sports Facilities', href: '/students', section: 'sports' },
        { name: 'Cultural Centre', href: '/students', section: 'cultural' },
        { name: 'Placement', href: '/students', section: 'placement' },
        { name: 'NSS', href: '/students', section: 'nss' }
      ]
    },
    { name: 'Research Projects', href: '/research' },
    { name: 'Publications', href: '/publications' },
    { name: 'Workshop', href: '/workshops' },
    { name: 'Video/Documentary', href: '/videos' },
    { name: 'Achievements', href: '/achievements' },
    { name: 'Contact Us', href: '/contact' }
  ]

  const isActive = (href) => {
    if (href === '/') {
      return location.pathname === href
    }
    return location.pathname.startsWith(href)
  }

  const scrollToSection = (sectionId) => {
    setTimeout(() => {
      const element = document.getElementById(sectionId)
      if (element) {
        const headerOffset = 120 // Increased offset for new header height
        const elementPosition = element.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        })
      }
    }, 100)
  }

  const handleNavClick = (item) => {
    if (item.section) {
      if (location.pathname === item.href) {
        scrollToSection(item.section)
      } else {
        navigate(item.href)
        scrollToSection(item.section)
      }
    } else {
      navigate(item.href)
    }
    setActiveDropdown(null)
    setIsOpen(false)
  }

  // Handle hash changes for direct URL access
  useEffect(() => {
    const hash = location.hash.substring(1)
    if (hash) {
      scrollToSection(hash)
    }
  }, [location.hash])

  // Improved hover handling with cancelable close timer
  const closeTimerRef = useRef(null)

  const openDropdown = (index) => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current)
      closeTimerRef.current = null
    }
    setActiveDropdown(index)
  }

  const scheduleClose = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current)
    closeTimerRef.current = setTimeout(() => {
      setActiveDropdown(null)
    }, 200)
  }

  return (
    <div className="sticky top-0 z-50">
      {/* College Name Header - Above Navbar */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center py-4">
            <div className="text-center">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
                College of Fisheries, Jabalpur
              </h1>
              <p className="text-sm md:text-base text-gray-600 mt-1">
                (Nanaji Deshmukh Veterinary Science University, Jabalpur)
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Bar - Dark Blue */}
      <nav className="bg-blue-800 shadow-lg">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14">
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navigation.map((item, index) => (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => openDropdown(index)}
                  onMouseLeave={scheduleClose}
                  onFocus={() => openDropdown(index)}
                  onBlur={scheduleClose}
                >
                  {item.dropdown ? (
                    <div>
                      <button
                        className={`px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 flex items-center ${
                          isActive(item.href)
                            ? 'text-white bg-blue-700'
                            : 'text-blue-100 hover:text-white hover:bg-blue-700'
                        }`}
                        aria-haspopup="true"
                        aria-expanded={activeDropdown === index}
                      >
                        {item.name}
                        <ChevronDown className={`ml-1 h-3 w-3 transition-transform duration-200 ${
                          activeDropdown === index ? 'rotate-180' : ''
                        }`} />
                      </button>
                      
                      {/* Dropdown Menu */}
                      <div
                        className={`absolute top-full left-0 mt-1 w-56 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 transform transition-all duration-200 ${
                          activeDropdown === index
                            ? 'opacity-100 visible translate-y-0'
                            : 'opacity-0 invisible -translate-y-2'
                        }`}
                      >
                        <div className="py-1">
                          {item.dropdown.map((dropdownItem) => (
                            <button
                              key={dropdownItem.name}
                              onClick={() => handleNavClick(dropdownItem)}
                              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-800 transition-colors duration-150"
                            >
                              {dropdownItem.name}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleNavClick(item)}
                      className={`px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                        isActive(item.href)
                          ? 'text-white bg-blue-700'
                          : 'text-blue-100 hover:text-white hover:bg-blue-700'
                      }`}
                    >
                      {item.name}
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-blue-200 hover:text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              >
                {isOpen ? (
                  <X className="block h-6 w-6" />
                ) : (
                  <Menu className="block h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className={`lg:hidden ${isOpen ? 'block' : 'hidden'}`}>
            <div className="px-2 pt-2 pb-3 space-y-1 border-t border-blue-700">
              {navigation.map((item, index) => (
                <div key={item.name}>
                  {item.dropdown ? (
                    <div>
                      <button
                        onClick={() => setActiveDropdown(activeDropdown === index ? null : index)}
                        className="w-full flex items-center justify-between px-3 py-2 text-base font-medium text-blue-100 hover:text-white hover:bg-blue-700 rounded-md"
                      >
                        {item.name}
                        <ChevronDown
                          className={`h-4 w-4 transition-transform duration-200 ${
                            activeDropdown === index ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      
                      {activeDropdown === index && (
                        <div className="mt-1 ml-4 space-y-1">
                          {item.dropdown.map((dropdownItem) => (
                            <button
                              key={dropdownItem.name}
                              onClick={() => handleNavClick(dropdownItem)}
                              className="block w-full text-left px-3 py-2 text-sm text-blue-200 hover:text-white hover:bg-blue-700 rounded-md"
                            >
                              {dropdownItem.name}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <button
                      onClick={() => handleNavClick(item)}
                      className={`block w-full text-left px-3 py-2 text-base font-medium rounded-md ${
                        isActive(item.href)
                          ? 'text-white bg-blue-700'
                          : 'text-blue-100 hover:text-white hover:bg-blue-700'
                      }`}
                    >
                      {item.name}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar