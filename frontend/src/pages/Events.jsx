import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Calendar, Users, MapPin, Clock, FileText, Image, ExternalLink, Award, BookOpen, Phone, Mail } from 'lucide-react'
import Section, { SectionHeader } from '../components/common/Section'
import Card from '../components/common/Card'

const Events = () => {
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('upcoming')
  const [error, setError] = useState(null)

  // Complete events data restored with blank page fixes
  const eventsData = {
    upcoming: [
      {
        id: 1,
        title: 'National Seminar on Sustainable Aquaculture',
        type: 'Seminar',
        date: '2024-03-15',
        time: '9:00 AM - 5:00 PM',
        venue: 'College Auditorium',
        description: 'National level seminar focusing on sustainable aquaculture practices, climate change adaptation, and technological innovations.',
        speakers: [
          'Dr. Rajesh Kumar Sharma (Dean, CoF Jabalpur)',
          'Dr. Anil Kumar Jain (HOD, Aquaculture)',
          'Dr. Priya Verma (HOD, Processing Technology)',
          'Dr. Sanjay Kumar (ICAR-CIFRI)',
          'Dr. Anjali Verma (Industry Expert)'
        ],
        topics: [
          'Sustainable aquaculture systems',
          'Climate-smart fisheries',
          'Innovative feed technologies',
          'Water quality management',
          'Market trends and opportunities'
        ],
        registration: 'Free for students, ₹500 for others',
        deadline: '2024-03-10',
        contact: 'Dr. Rajesh Kumar Sharma',
        phone: '+91 761 2345678',
        email: 'seminar@fisherycollegejabalpur.edu.in'
      },
      {
        id: 2,
        title: 'Workshop on Biofloc Technology',
        type: 'Workshop',
        date: '2024-03-20',
        time: '10:00 AM - 4:00 PM',
        venue: 'Biofloc Demonstration Unit',
        description: 'Hands-on workshop on biofloc technology for intensive fish production, including system setup and management.',
        speakers: [
          'Dr. Anil Kumar Jain (Expert in Biofloc)',
          'Mr. Suresh Kumar (Technical Officer)'
        ],
        topics: [
          'Biofloc system design',
          'Water quality parameters',
          'Feed management',
          'Disease prevention',
          'Economic analysis'
        ],
        registration: '₹1,000 (includes materials and lunch)',
        deadline: '2024-03-15',
        contact: 'Dr. Anil Kumar Jain',
        phone: '+91 761 2345680',
        email: 'biofloc@fisherycollegejabalpur.edu.in'
      },
      {
        id: 3,
        title: 'Field Visit to Commercial Fish Farms',
        type: 'Field Visit',
        date: '2024-03-25',
        time: '8:00 AM - 6:00 PM',
        venue: 'Various locations in Jabalpur region',
        description: 'Educational field visit to successful commercial fish farms, processing units, and hatcheries.',
        itinerary: [
          'Visit to integrated fish-cum-poultry farm',
          'Tour of fish processing unit',
          'Hatchery demonstration',
          'Interaction with successful farmers',
          'Case study presentations'
        ],
        registration: '₹500 (includes transportation and lunch)',
        deadline: '2024-03-20',
        contact: 'Dr. Priya Verma',
        phone: '+91 761 2345679',
        email: 'fieldvisit@fisherycollegejabalpur.edu.in'
      }
    ],
    recent: [
      {
        id: 4,
        title: 'International Conference on Fisheries Science',
        type: 'Conference',
        date: '2024-02-15',
        time: '9:00 AM - 6:00 PM',
        venue: 'College Auditorium & Conference Halls',
        description: 'Three-day international conference with participants from 15 countries, focusing on global fisheries challenges and solutions.',
        speakers: [
          'Dr. John Smith (USA)',
          'Dr. Maria Garcia (Spain)',
          'Dr. Rajesh Kumar Sharma (India)',
          'Dr. Anil Kumar Jain (India)',
          'Dr. Priya Verma (India)'
        ],
        topics: [
          'Global fisheries management',
          'Aquaculture innovations',
          'Climate change impacts',
          'Food security',
          'Technology transfer'
        ],
        participants: '200+ delegates',
        outcomes: [
          '15 research papers presented',
          '5 memorandums of understanding signed',
          'International collaboration established',
          'Student exchange programs initiated'
        ],
        photos: ['event1.jpg', 'event2.jpg', 'event3.jpg']
      },
      {
        id: 5,
        title: 'Training Program for Fish Farmers',
        type: 'Training',
        date: '2024-02-10',
        time: '9:00 AM - 5:00 PM',
        venue: 'College Campus & Demonstration Farms',
        description: 'Five-day comprehensive training program for fish farmers covering all aspects of modern aquaculture.',
        participants: '50 farmers from Madhya Pradesh',
        topics: [
          'Pond preparation and management',
          'Fish species selection',
          'Feed management',
          'Disease control',
          'Marketing strategies'
        ],
        outcomes: [
          'All participants certified',
          '5 farmers started new ventures',
          'Follow-up support established',
          'Success stories documented'
        ],
        photos: ['training1.jpg', 'training2.jpg']
      }
    ],
    workshops: [
      {
        id: 6,
        title: 'Fish Feed Formulation Workshop',
        type: 'Workshop',
        date: '2024-01-20',
        duration: '2 days',
        venue: 'Feed Technology Laboratory',
        description: 'Practical workshop on fish feed formulation using locally available ingredients.',
        participants: '30 students and industry professionals',
        topics: [
          'Feed ingredient analysis',
          'Formulation software',
          'Quality testing',
          'Cost optimization',
          'Storage and handling'
        ],
        outcomes: [
          'Participants learned feed formulation',
          'Industry partnerships strengthened',
          'Student projects initiated'
        ]
      },
      {
        id: 7,
        title: 'Water Quality Management Workshop',
        type: 'Workshop',
        date: '2024-01-15',
        duration: '1 day',
        venue: 'Aquaculture Laboratory',
        description: 'Workshop on water quality parameters and management for aquaculture systems.',
        participants: '25 students and farmers',
        topics: [
          'Water quality parameters',
          'Testing methods',
          'Management strategies',
          'Problem solving',
          'Best practices'
        ],
        outcomes: [
          'Practical skills developed',
          'Equipment demonstration',
          'Field applications planned'
        ]
      }
    ],
    fieldVisits: [
      {
        id: 8,
        title: 'Visit to ICAR-CIFRI, Barrackpore',
        type: 'Exposure Trip',
        date: '2024-01-10',
        duration: '3 days',
        venue: 'ICAR-CIFRI, Barrackpore, West Bengal',
        description: 'Educational exposure trip for final year students to premier fisheries research institute.',
        participants: '20 B.F.Sc. final year students',
        activities: [
          'Laboratory visits',
          'Research presentations',
          'Field demonstrations',
          'Interaction with scientists',
          'Cultural exchange'
        ],
        outcomes: [
          'Research exposure gained',
          'Career guidance received',
          'Networking established',
          'Knowledge enhanced'
        ],
        photos: ['visit1.jpg', 'visit2.jpg']
      },
      {
        id: 9,
        title: 'Industrial Visit to Fish Processing Units',
        type: 'Industrial Visit',
        date: '2024-01-05',
        duration: '2 days',
        venue: 'Various processing units in Mumbai',
        description: 'Industrial visit to understand commercial fish processing operations.',
        participants: '25 M.F.Sc. students',
        activities: [
          'Processing line tours',
          'Quality control demonstrations',
          'Management discussions',
          'Technology insights',
          'Career opportunities'
        ],
        outcomes: [
          'Industrial exposure gained',
          'Technology understanding',
          'Career prospects explored',
          'Industry contacts made'
        ]
      }
    ],
    pressReleases: [
      {
        id: 10,
        title: 'College of Fisheries Launches New Research Program',
        date: '2024-02-20',
        summary: 'CoF Jabalpur announces launch of innovative research program on sustainable aquaculture funded by ICAR.',
        content: 'The College of Fisheries, Jabalpur has launched a new research program focused on sustainable aquaculture practices. The program, funded by the Indian Council of Agricultural Research (ICAR), aims to develop eco-friendly aquaculture systems that can withstand climate change challenges while ensuring food security.',
        highlights: [
          '₹2 crore funding from ICAR',
          'Multi-disciplinary research approach',
          'Industry collaboration',
          'Student involvement',
          'Technology transfer focus'
        ],
        media: 'Covered by leading newspapers and TV channels',
        contact: 'Dr. Rajesh Kumar Sharma, Dean'
      },
      {
        id: 11,
        title: 'Student Wins National Innovation Award',
        date: '2024-02-15',
        summary: 'B.F.Sc. student Rahul Patel wins prestigious national innovation award for eco-friendly fish feed project.',
        content: 'Rahul Patel, a final year B.F.Sc. student at College of Fisheries, Jabalpur, has won the National Innovation Award for his project on developing eco-friendly fish feed using agricultural waste products. The project demonstrates innovative use of locally available resources.',
        highlights: [
          'National recognition',
          'Innovation in feed technology',
          'Sustainable approach',
          'Student achievement',
          'College pride'
        ],
        media: 'Featured in national media and social platforms',
        contact: 'Dr. Anil Kumar Jain, Project Guide'
      }
    ]
  }

  useEffect(() => {
    try {
      // Simulate loading with proper cleanup to prevent blank page
      const timer = setTimeout(() => {
        setLoading(false)
      }, 1000)
      
      return () => clearTimeout(timer)
    } catch (err) {
      console.error('Error in useEffect:', err)
      setError(err.message)
      setLoading(false)
    }
  }, [])

  const formatDate = (dateString) => {
    try {
      if (!dateString) return 'Date not available'
      const date = new Date(dateString)
      return date.toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    } catch (error) {
      console.error('Date formatting error:', error)
      return dateString || 'Invalid date'
    }
  }

  const getEventIcon = (type) => {
    try {
      switch (type?.toLowerCase()) {
        case 'seminar':
        case 'conference':
          return <Users className="h-5 w-5 text-blue-600" />
        case 'workshop':
        case 'training':
          return <BookOpen className="h-5 w-5 text-green-600" />
        case 'field visit':
        case 'exposure trip':
        case 'industrial visit':
          return <MapPin className="h-5 w-5 text-purple-600" />
        default:
          return <Calendar className="h-5 w-5 text-gray-600" />
      }
    } catch (err) {
      console.error('Icon rendering error:', err)
      return <Calendar className="h-5 w-5 text-gray-600" />
    }
  }

  const getEventColor = (type) => {
    try {
      switch (type?.toLowerCase()) {
        case 'seminar':
        case 'conference':
          return 'bg-blue-100 text-blue-800'
        case 'workshop':
        case 'training':
          return 'bg-green-100 text-green-800'
        case 'field visit':
        case 'exposure trip':
        case 'industrial visit':
          return 'bg-purple-100 text-purple-800'
        default:
          return 'bg-gray-100 text-gray-800'
      }
    } catch (err) {
      console.error('Color assignment error:', err)
      return 'bg-gray-100 text-gray-800'
    }
  }

  // Error handling to prevent blank page
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8">
          <div className="text-red-600 text-xl mb-4">⚠️ Error loading events</div>
          <div className="text-gray-600 mb-4">{error}</div>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Reload Page
          </button>
        </div>
      </div>
    )
  }

  // Loading state to prevent blank page
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading events information...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Section background="bg-gray-50">
        <SectionHeader
          title="News & Events"
          subtitle="Stay updated with seminars, conferences, workshops, training programs, field visits, and latest news."
          align="left"
        />
        
        <div className="space-y-12">
          {/* Event Tabs */}
          <div>
            <div className="flex flex-wrap gap-2 mb-6">
              <button
                onClick={() => setActiveTab('upcoming')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === 'upcoming'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Upcoming Events
              </button>
              <button
                onClick={() => setActiveTab('recent')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === 'recent'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Recent Events
              </button>
              <button
                onClick={() => setActiveTab('workshops')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === 'workshops'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Workshops
              </button>
              <button
                onClick={() => setActiveTab('fieldVisits')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === 'fieldVisits'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Field Visits
              </button>
              <button
                onClick={() => setActiveTab('pressReleases')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === 'pressReleases'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Press Releases
              </button>
            </div>

            {/* Event Content */}
            <div>
              {activeTab === 'upcoming' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Upcoming Events</h2>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {eventsData.upcoming?.map((event) => (
                      <Card key={event.id} className="h-full">
                        <div className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                              <h3 className="text-xl font-semibold text-gray-900 mb-2">{event.title}</h3>
                              <div className="flex items-center space-x-2 mb-2">
                                {getEventIcon(event.type)}
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getEventColor(event.type)}`}>
                                  {event.type}
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          <p className="text-gray-600 text-sm mb-4">{event.description}</p>
                          
                          <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                            <div>
                              <span className="font-semibold text-gray-700">Date:</span>
                              <span className="text-gray-600 ml-2">{formatDate(event.date)}</span>
                            </div>
                            <div>
                              <span className="font-semibold text-gray-700">Time:</span>
                              <span className="text-gray-600 ml-2">{event.time}</span>
                            </div>
                            <div>
                              <span className="font-semibold text-gray-700">Venue:</span>
                              <span className="text-gray-600 ml-2">{event.venue}</span>
                            </div>
                            <div>
                              <span className="font-semibold text-gray-700">Registration:</span>
                              <span className="text-gray-600 ml-2">{event.registration}</span>
                            </div>
                          </div>
                          
                          {event.speakers && event.speakers.length > 0 && (
                            <div className="mb-4">
                              <h4 className="font-semibold text-gray-700 mb-2">Speakers:</h4>
                              <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                                {event.speakers.map((speaker, index) => (
                                  <li key={index}>{speaker}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                          
                          {event.topics && event.topics.length > 0 && (
                            <div className="mb-4">
                              <h4 className="font-semibold text-gray-700 mb-2">Topics:</h4>
                              <div className="flex flex-wrap gap-2">
                                {event.topics.map((topic, index) => (
                                  <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                                    {topic}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                          
                          <div className="pt-4 border-t border-gray-200">
                            <div className="flex items-center space-x-2 mb-2">
                              <Users className="h-4 w-4 text-blue-600" />
                              <span className="text-sm font-semibold text-gray-700">{event.contact}</span>
                            </div>
                            <div className="flex items-center space-x-2 mb-2">
                              <Phone className="h-4 w-4 text-green-600" />
                              <span className="text-sm text-gray-600">{event.phone}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Mail className="h-4 w-4 text-red-600" />
                              <span className="text-sm text-gray-600">{event.email}</span>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'recent' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Events</h2>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {eventsData.recent?.map((event) => (
                      <Card key={event.id} className="h-full">
                        <div className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                              <h3 className="text-xl font-semibold text-gray-900 mb-2">{event.title}</h3>
                              <div className="flex items-center space-x-2 mb-2">
                                {getEventIcon(event.type)}
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getEventColor(event.type)}`}>
                                  {event.type}
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          <p className="text-gray-600 text-sm mb-4">{event.description}</p>
                          
                          <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                            <div>
                              <span className="font-semibold text-gray-700">Date:</span>
                              <span className="text-gray-600 ml-2">{formatDate(event.date)}</span>
                            </div>
                            <div>
                              <span className="font-semibold text-gray-700">Time:</span>
                              <span className="text-gray-600 ml-2">{event.time}</span>
                            </div>
                            <div>
                              <span className="font-semibold text-gray-700">Venue:</span>
                              <span className="text-gray-600 ml-2">{event.venue}</span>
                            </div>
                            <div>
                              <span className="font-semibold text-gray-700">Participants:</span>
                              <span className="text-gray-600 ml-2">{event.participants}</span>
                            </div>
                          </div>
                          
                          {event.speakers && event.speakers.length > 0 && (
                            <div className="mb-4">
                              <h4 className="font-semibold text-gray-700 mb-2">Key Speakers:</h4>
                              <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                                {event.speakers.map((speaker, index) => (
                                  <li key={index}>{speaker}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                          
                          {event.outcomes && event.outcomes.length > 0 && (
                            <div className="mb-4">
                              <h4 className="font-semibold text-gray-700 mb-2">Outcomes:</h4>
                              <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                                {event.outcomes.map((outcome, index) => (
                                  <li key={index}>{outcome}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                          
                          {event.photos && event.photos.length > 0 && (
                            <div className="pt-4 border-t border-gray-200">
                              <h4 className="font-semibold text-gray-700 mb-2">Event Photos:</h4>
                              <div className="flex space-x-2">
                                {event.photos.map((photo, index) => (
                                  <div key={index} className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center">
                                    <Image className="h-6 w-6 text-gray-400" />
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'workshops' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Workshops & Training</h2>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {eventsData.workshops?.map((workshop) => (
                      <Card key={workshop.id} className="h-full">
                        <div className="p-6">
                          <h3 className="text-lg font-semibold text-gray-900 mb-3">{workshop.title}</h3>
                          
                          <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                            <div>
                              <span className="font-semibold text-gray-700">Type:</span>
                              <span className="text-gray-600 ml-2">{workshop.type}</span>
                            </div>
                            <div>
                              <span className="font-semibold text-gray-700">Date:</span>
                              <span className="text-gray-600 ml-2">{formatDate(workshop.date)}</span>
                            </div>
                            <div>
                              <span className="font-semibold text-gray-700">Duration:</span>
                              <span className="text-gray-600 ml-2">{workshop.duration}</span>
                            </div>
                            <div>
                              <span className="font-semibold text-gray-700">Venue:</span>
                              <span className="text-gray-600 ml-2">{workshop.venue}</span>
                            </div>
                          </div>
                          
                          <p className="text-gray-600 text-sm mb-4">{workshop.description}</p>
                          
                          {workshop.topics && workshop.topics.length > 0 && (
                            <div className="mb-4">
                              <h4 className="font-semibold text-gray-700 mb-2">Topics Covered:</h4>
                              <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                                {workshop.topics.map((topic, index) => (
                                  <li key={index}>{topic}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                          
                          {workshop.outcomes && workshop.outcomes.length > 0 && (
                            <div className="mb-4">
                              <h4 className="font-semibold text-gray-700 mb-2">Outcomes:</h4>
                              <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                                {workshop.outcomes.map((outcome, index) => (
                                  <li key={index}>{outcome}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                          
                          <div className="pt-4 border-t border-gray-200">
                            <div className="text-center">
                              <span className="text-sm text-gray-600">Participants: {workshop.participants}</span>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'fieldVisits' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Field Visits & Exposure Trips</h2>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {eventsData.fieldVisits?.map((visit) => (
                      <Card key={visit.id} className="h-full">
                        <div className="p-6">
                          <h3 className="text-lg font-semibold text-gray-900 mb-3">{visit.title}</h3>
                          
                          <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                            <div>
                              <span className="font-semibold text-gray-700">Type:</span>
                              <span className="text-gray-600 ml-2">{visit.type}</span>
                            </div>
                            <div>
                              <span className="font-semibold text-gray-700">Date:</span>
                              <span className="text-gray-600 ml-2">{formatDate(visit.date)}</span>
                            </div>
                            <div>
                              <span className="font-semibold text-gray-700">Duration:</span>
                              <span className="text-gray-600 ml-2">{visit.duration}</span>
                            </div>
                            <div>
                              <span className="font-semibold text-gray-700">Venue:</span>
                              <span className="text-gray-600 ml-2">{visit.venue}</span>
                            </div>
                          </div>
                          
                          <p className="text-gray-600 text-sm mb-4">{visit.description}</p>
                          
                          {visit.activities && visit.activities.length > 0 && (
                            <div className="mb-4">
                              <h4 className="font-semibold text-gray-700 mb-2">Activities:</h4>
                              <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                                {visit.activities.map((activity, index) => (
                                  <li key={index}>{activity}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                          
                          {visit.outcomes && visit.outcomes.length > 0 && (
                            <div className="mb-4">
                              <h4 className="font-semibold text-gray-700 mb-2">Outcomes:</h4>
                              <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                                {visit.outcomes.map((outcome, index) => (
                                  <li key={index}>{outcome}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                          
                          <div className="pt-4 border-t border-gray-200">
                            <div className="text-center">
                              <span className="text-sm text-gray-600">Participants: {visit.participants}</span>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'pressReleases' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Press Releases</h2>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {eventsData.pressReleases?.map((release) => (
                      <Card key={release.id} className="h-full">
                        <div className="p-6">
                          <h3 className="text-lg font-semibold text-gray-900 mb-3">{release.title}</h3>
                          
                          <div className="mb-4">
                            <span className="text-sm text-gray-500">{formatDate(release.date)}</span>
                          </div>
                          
                          <p className="text-gray-600 text-sm mb-4">{release.summary}</p>
                          
                          <p className="text-gray-700 text-sm mb-4">{release.content}</p>
                          
                          {release.highlights && release.highlights.length > 0 && (
                            <div className="mb-4">
                              <h4 className="font-semibold text-gray-700 mb-2">Key Highlights:</h4>
                              <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                                {release.highlights.map((highlight, index) => (
                                  <li key={index}>{highlight}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                          
                          <div className="pt-4 border-t border-gray-200">
                            <div className="space-y-2 text-sm">
                              <div>
                                <span className="font-semibold text-gray-700">Media Coverage:</span>
                                <span className="text-gray-600 ml-2">{release.media}</span>
                              </div>
                              <div>
                                <span className="font-semibold text-gray-700">Contact:</span>
                                <span className="text-gray-600 ml-2">{release.contact}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Section>

      {/* Navigation Anchors */}
      <div id="workshops"></div>
      <div id="visits"></div>
      <div id="gallery"></div>

    </div>
  )
}

export default Events

