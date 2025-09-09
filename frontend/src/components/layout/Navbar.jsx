import React, { useState, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu, X, ChevronDown } from 'lucide-react'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [showBanner, setShowBanner] = useState(true)
  const location = useLocation()
  const navigate = useNavigate()
  const [isClient, setIsClient] = useState(false)

  // Ensure we're on client side
  useEffect(() => {
    setIsClient(true)
  }, [])

  const navigation = [
    { name: 'Home', href: '/' },
    {
      name: 'About Us',
      href: '/about',
      dropdown: [
        { name: 'History and Vision', href: '/about', section: 'history' },
        { name: 'Mission & Objectives', href: '/about', section: 'mission' },
        { name: 'Message from the Dean', href: '/about', section: 'dean-message' },
        { name: 'Organizational Structure', href: '/about', section: 'structure' },
        { name: 'Governing Body', href: '/about', section: 'governing-body' }
      ]
    },
    {
      name: 'Academics',
      href: '/programs', 
      dropdown: [
        { name: 'Programs Offered', href: '/programs', section: 'programs' },
        { name: 'Academic Calendar', href: '/academics', section: 'calendar' },
        { name: 'Departments', href: '/departments', section: 'departments' },
        { name: 'Course Curriculum', href: '/academics', section: 'curriculum' },
        { name: 'Faculty Directory', href: '/faculty', section: 'faculty' },
        { name: 'Academic Regulations', href: '/academics', section: 'regulations' }
      ]
    },
    {
      name: 'Research',
      href: '/research',
      dropdown: [
        { name: 'Ongoing Projects', href: '/research', section: 'ongoing-projects' },
        { name: 'Publications and Journals', href: '/research', section: 'publications' },
        { name: 'Student Research', href: '/research', section: 'student-research' },
        { name: 'Research Collaborations', href: '/research', section: 'collaborations' },
        { name: 'Research Facilities', href: '/research', section: 'facilities' }
      ]
    },
    {
      name: 'Extension & Outreach',
      href: '/extension',
      dropdown: [
        { name: 'Farmer Training Programs', href: '/extension', section: 'farmer-training' },
        { name: 'FFPO and SHG Support', href: '/extension', section: 'ffpo-shg' },
        { name: 'Matsya Vigyan Kendra (MVK)', href: '/extension', section: 'mvk' },
        { name: 'Aquaculture Demonstrations', href: '/extension', section: 'demonstrations' },
        { name: 'Success Stories', href: '/extension', section: 'success-stories' }
      ]
    },
    {
      name: 'Infrastructure',
      href: '/infrastructure',
      dropdown: [
        { name: 'Classrooms and Labs', href: '/infrastructure', section: 'classrooms' },
        { name: 'Hatcheries and Demo Units', href: '/infrastructure', section: 'hatcheries' },
        { name: 'Library and e-Resources', href: '/infrastructure', section: 'library' },
        { name: 'Hostels and Campus Facilities', href: '/infrastructure', section: 'hostels' },
        { name: 'Fish Processing & Feed Units', href: '/infrastructure', section: 'processing' }
      ]
    },
    { name: 'Incubation Centre', href: '/incubation' },
    { name: 'Placement', href: '/placement' },
    {
      name: 'Students Corner',
      href: '/student-corner',
      dropdown: [
        { name: 'Admission Guidelines', href: '/student-corner', section: 'admissions' },
        { name: 'Scholarships & Fellowships', href: '/student-corner', section: 'scholarships' },
        { name: 'Student Council / Clubs', href: '/student-corner', section: 'clubs' },
        { name: 'Alumni Testimonials', href: '/student-corner', section: 'alumni' },
        { name: 'Internship & Placement', href: '/student-corner', section: 'placement' }
      ]
    },
    {
      name: 'News & Events',
      href: '/events', // Changed to match the primary dropdown item
      dropdown: [
        { name: 'Seminars & Conferences', href: '/events', section: 'seminars' },
        { name: 'Workshops and Training', href: '/events', section: 'workshops' },
        { name: 'Field Visits & Exposure Trips', href: '/events', section: 'visits' },
        { name: 'Photo Gallery', href: '/gallery', section: 'gallery' },
        { name: 'Press Releases', href: '/news', section: 'press-releases' }
      ]
    },
    { name: 'Collaborations', href: '/collaborations' },
    { name: 'Contact Us', href: '/contact' }
  ]

  const isActive = (href) => {
    if (href === '/') {
      return location.pathname === href
    }
    // Special handling for academics route - now points to programs
    if (href === '/programs') {
      return location.pathname === '/programs' || location.pathname === '/academics'
    }
    // Special handling for events route
    if (href === '/events') {
      return location.pathname === '/events' || location.pathname === '/news'
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
    try {
      if (item.section) {
        if (location.pathname === item.href) {
          scrollToSection(item.section)
        } else {
          navigate(item.href)
          // First scroll to top, then scroll to section
          window.scrollTo({ top: 0, behavior: 'instant' })
          scrollToSection(item.section)
        }
      } else {
        navigate(item.href)
        // Always scroll to top when navigating to a new page
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }, 50)
      }
    } catch (error) {
      console.error('Navigation error:', error)
      // Fallback navigation
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

  // Scroll to top when route changes (except for hash changes)
  useEffect(() => {
    if (!location.hash) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [location.pathname])

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current)
      }
    }
  }, [])

  // Handle scroll to hide/show banner
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      if (currentScrollY > 80) {
        // Hide banner when scrolled down more than 80px
        setShowBanner(false)
      } else {
        // Show banner when near top
        setShowBanner(true)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // Improved hover handling with cancelable close timer
  const closeTimerRef = useRef(null)
  const dropdownRef = useRef(null)

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
    }, 150)
  }

  const handleMouseEnter = (index) => {
    openDropdown(index)
  }

  const handleMouseLeave = () => {
    scheduleClose()
  }

  const keepDropdownOpen = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current)
      closeTimerRef.current = null
    }
  }

  if (!isClient) {
    return <div className="h-20 bg-white"></div> // Placeholder during SSR
  }

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      {/* Top Banner */}
      <div 
        className={`bg-white transition-all duration-400 ease-in-out overflow-hidden ${
          showBanner ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="max-w-full mx-auto">
          <Link to="/">
            <img 
              src="/top_banner.png" 
                            alt="College of Fishery, Jabalpur Banner" 
              className="w-full h-auto object-contain"
            />
          </Link>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="bg-gradient-to-r from-blue-700 to-green-600">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14">
            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-gray-900 hover:bg-white hover:bg-opacity-30 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition-all duration-200"
              >
                {isOpen ? (
                  <X className="block h-6 w-6" />
                ) : (
                  <Menu className="block h-6 w-6" />
                )}
              </button>
            </div>

            {/* Desktop Navigation - Centered */}
            <div className="hidden lg:flex items-center justify-center flex-1 space-x-1">
              {navigation.map((item, index) => (
              <div
                key={item.name}
                className="relative group"
                onMouseEnter={() => item.dropdown ? handleMouseEnter(index) : null}
                onMouseLeave={() => item.dropdown ? handleMouseLeave() : null}
              >
                {item.dropdown ? (
                  <div className="relative">
                    <button
                      className={`px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 flex items-center ${
                        isActive(item.href)
                          ? 'text-blue-900 bg-white bg-opacity-90'
                          : 'text-white hover:text-gray-900 hover:bg-white hover:bg-opacity-40'
                      }`}
                      aria-haspopup="true"
                      aria-expanded={activeDropdown === index}
                      onFocus={() => openDropdown(index)}
                      onClick={() => {
                        // Navigate to the main page and close dropdown
                        handleNavClick(item)
                        setActiveDropdown(null)
                      }}
                    >
                      {item.name}
                      <ChevronDown className={`ml-1 h-3 w-3 transition-transform duration-200 ${
                        activeDropdown === index ? 'rotate-180' : ''
                      }`} />
                    </button>
                    
                    {/* Dropdown Menu */}
                    <div
                      className={`absolute top-full left-0 mt-1 w-64 bg-white rounded-lg shadow-xl ring-1 ring-black ring-opacity-5 transform transition-all duration-200 z-50 ${
                        activeDropdown === index
                          ? 'opacity-100 visible translate-y-0'
                          : 'opacity-0 invisible -translate-y-2 pointer-events-none'
                      }`}
                      onMouseEnter={keepDropdownOpen}
                      onMouseLeave={scheduleClose}
                      style={{ minWidth: '250px' }}
                    >
                      <div className="py-2">
                        {item.dropdown && item.dropdown.map((dropdownItem, dropIndex) => (
                          <button
                            key={dropdownItem.name}
                            onClick={() => handleNavClick(dropdownItem)}
                            className={`block w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-all duration-150 font-medium border-l-4 border-transparent hover:border-blue-400 ${
                              dropIndex === 0 ? 'rounded-t-lg' : ''
                            } ${dropIndex === item.dropdown.length - 1 ? 'rounded-b-lg' : ''}`}
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
                    className={`px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                      isActive(item.href)
                        ? 'text-blue-900 bg-white bg-opacity-90'
                        : 'text-white hover:text-gray-900 hover:bg-white hover:bg-opacity-40'
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

        {/* Mobile Navigation */}
        <div className={`lg:hidden ${isOpen ? 'block' : 'hidden'}`}>
          <div className="px-2 pt-2 pb-3 space-y-1 border-t border-white border-opacity-20">
            {navigation.map((item, index) => (
              <div key={item.name}>
                {item.dropdown ? (
                  <div>
                    <button
                      onClick={() => {
                        // Navigate to main page if clicked without toggling dropdown
                        handleNavClick(item)
                        setActiveDropdown(null)
                      }}
                      onDoubleClick={() => setActiveDropdown(activeDropdown === index ? null : index)}
                      className={`w-full flex items-center justify-between px-3 py-2 text-base font-medium text-white hover:text-gray-900 hover:bg-white hover:bg-opacity-40 rounded-md transition-all duration-200 ${
                        activeDropdown === index ? 'bg-white bg-opacity-25' : ''
                      }`}
                    >
                      <span onClick={(e) => {
                        e.stopPropagation()
                        handleNavClick(item)
                      }}>{item.name}</span>
                      <ChevronDown
                        onClick={(e) => {
                          e.stopPropagation()
                          setActiveDropdown(activeDropdown === index ? null : index)
                        }}
                        className={`h-4 w-4 transition-transform duration-200 ${
                          activeDropdown === index ? 'rotate-180 text-gray-900' : 'text-white'
                        }`}
                      />
                    </button>
                    
                    {activeDropdown === index && (
                      <div className="mt-2 ml-4 space-y-1 bg-white bg-opacity-15 rounded-lg p-3 border-l-4 border-white border-opacity-30">
                        {item.dropdown && item.dropdown.map((dropdownItem) => (
                          <button
                            key={dropdownItem.name}
                            onClick={() => handleNavClick(dropdownItem)}
                            className="block w-full text-left px-3 py-2 text-sm text-gray-200 hover:text-gray-900 hover:bg-white hover:bg-opacity-40 rounded-md transition-all duration-200 font-medium"
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
                    className={`block w-full text-left px-3 py-2 text-base font-medium rounded-md transition-all duration-200 ${
                      isActive(item.href)
                        ? 'text-blue-900 bg-white bg-opacity-90'
                        : 'text-white hover:text-gray-900 hover:bg-white hover:bg-opacity-40'
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






