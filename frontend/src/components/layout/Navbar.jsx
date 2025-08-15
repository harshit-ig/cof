import React, { useState, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu, X, ChevronDown } from 'lucide-react'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const location = useLocation()
  const navigate = useNavigate()

  const navigation = [
    { name: 'Home', href: '/' },
    {
      name: 'About CoF',
      href: '/about',
      dropdown: [
        { name: 'About College', href: '/about' },
        { name: 'Dean\'s Message', href: '/about', section: 'dean-message' },
        { name: 'Faculty', href: '/faculty' },
        { name: 'Infrastructure', href: '/infrastructure' }
      ]
    },
    {
      name: 'Academic',
      href: '/academics',
      dropdown: [
        { name: 'Academic Programs', href: '/programs' },
        { name: 'Departments', href: '/departments' },
        { name: 'Academic Regulations', href: '/academics', section: 'regulations' },
        { name: 'Academic Calendar', href: '/academics', section: 'calendar' },
        { name: 'Admission Process', href: '/academics', section: 'admission' },
        { name: 'Admission Capacity', href: '/academics', section: 'capacity' },
        { name: 'Fee Structure', href: '/academics', section: 'fees' }
      ]
    },
    {
      name: 'Student Corner',
      href: '/student-corner',
      dropdown: [
        { name: 'Student Information', href: '/student-corner' },
        { name: 'Time Table', href: '/student-corner', section: 'timetable' },
        { name: 'Examination Schedule', href: '/student-corner', section: 'examinations' },
        { name: 'List of Students', href: '/student-corner', section: 'students' },
        { name: 'Student Welfare', href: '/students' },
        { name: 'Hostel Facilities', href: '/students', section: 'hostels' },
        { name: 'Sports & Cultural', href: '/students', section: 'sports' }
      ]
    },
    { name: 'Notice Board', href: '/notice-board' },
    {
      name: 'Research & Extension',
      href: '/research',
      dropdown: [
        { name: 'Research Projects', href: '/research' },
        { name: 'Extension Activities', href: '/extension' },
        { name: 'Publications', href: '/publications' },
        { name: 'Collaborations', href: '/collaborations' }
      ]
    },
    { name: 'Library', href: '/library' },
    {
      name: 'Facilities',
      href: '/infrastructure',
      dropdown: [
        { name: 'Infrastructure', href: '/infrastructure' },
        { name: 'Incubation Center', href: '/incubation' },
        { name: 'Gallery', href: '/gallery' }
      ]
    },
    {
      name: 'Activities',
      href: '/events',
      dropdown: [
        { name: 'Events', href: '/events' },
        { name: 'Workshop', href: '/workshop' },
        { name: 'News', href: '/news' },
        { name: 'Achievements', href: '/achievements' },
        { name: 'Media', href: '/media' }
      ]
    },
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
        const headerOffset = 80
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
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 flex-shrink-0 mr-auto">
            <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-blue-700 to-green-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-base lg:text-lg">CoF</span>
            </div>
            <div className="hidden md:block">
              <h1 className="text-base lg:text-lg font-bold text-gray-900 leading-tight">College of Fisheries</h1>
              <p className="text-[10px] lg:text-xs text-gray-600 -mt-0.5 lg:-mt-1">Kishanganj, Bihar</p>
            </div>
          </Link>

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
                          ? 'text-green-700 bg-green-50'
                          : 'text-gray-700 hover:text-green-700 hover:bg-gray-50'
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
                      className={`absolute top-full left-0 mt-1 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 transform transition-all duration-200 ${
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
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors duration-150"
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
                        ? 'text-green-700 bg-green-50'
                        : 'text-gray-700 hover:text-green-700 hover:bg-gray-50'
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
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500"
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
          <div className="px-2 pt-2 pb-3 space-y-1 border-t border-gray-200">
            {navigation.map((item, index) => (
              <div key={item.name}>
                {item.dropdown ? (
                  <div>
                    <button
                      onClick={() => setActiveDropdown(activeDropdown === index ? null : index)}
                      className="w-full flex items-center justify-between px-3 py-2 text-base font-medium text-gray-700 hover:text-green-700 hover:bg-gray-50 rounded-md"
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
                            className="block w-full text-left px-3 py-2 text-sm text-gray-600 hover:text-green-700 hover:bg-gray-50 rounded-md"
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
                        ? 'text-green-700 bg-green-50'
                        : 'text-gray-700 hover:text-green-700 hover:bg-gray-50'
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
  )
}

export default Navbar