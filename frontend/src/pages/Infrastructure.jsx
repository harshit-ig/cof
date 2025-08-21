<<<<<<< HEAD
import React from 'react'
import { Link } from 'react-router-dom'
import { Building, Book, Home, Factory, Microscope, Fish, Utensils, Wifi, Car, Users, FlaskConical, Monitor, ChevronRight } from 'lucide-react'
import Card from '../components/common/Card'

const Infrastructure = () => {
  const classroomsLabs = [
    {
      name: 'Smart Classrooms',
      capacity: '60 students each',
      count: '8 Classrooms',
      description: 'Modern air-conditioned classrooms equipped with latest audio-visual technology and smart boards.',
      features: [
        'Interactive smart boards',
        'High-definition projectors',
        'Audio enhancement systems',
        'Comfortable ergonomic seating',
        'Wi-Fi connectivity'
      ]
    },
    {
      name: 'Fish Pathology Laboratory',
      capacity: '25 students',
      count: '500 sq.m',
      description: 'Advanced laboratory for fish disease diagnosis, treatment research, and health monitoring.',
      features: [
        'Microscopy and imaging systems',
        'Histopathology equipment',
        'Bacterial culture facilities',
        'Diagnostic kits and reagents',
        'Research-grade instruments'
      ]
    },
    {
      name: 'Aquaculture Nutrition Lab',
      capacity: '30 students',
      count: '400 sq.m',
      description: 'Specialized facility for fish feed analysis, nutrition research, and feed formulation studies.',
      features: [
        'Feed analysis equipment',
        'Proximate composition analyzers',
        'Digestibility testing setup',
        'Feed processing equipment',
        'Quality control instruments'
      ]
    },
    {
      name: 'Water Quality Testing Lab',
      capacity: '25 students',
      count: '300 sq.m',
      description: 'Comprehensive laboratory for water quality assessment and environmental monitoring.',
      features: [
        'Spectrophotometers',
        'pH and DO meters',
        'Ion chromatography',
        'Turbidity and conductivity meters',
        'Automated monitoring systems'
      ]
    },
    {
      name: 'Biotechnology Laboratory',
      capacity: '20 students',
      count: '350 sq.m',
      description: 'State-of-the-art facility for molecular biology research and genetic studies.',
      features: [
        'PCR machines',
        'Gel electrophoresis systems',
        'DNA sequencing equipment',
        'Tissue culture facilities',
        'Cryogenic storage systems'
      ]
    }
  ]

  const hatcheriesDemoUnits = [
    {
      name: 'Freshwater Fish Hatchery',
      area: '1 hectare',
      capacity: '10 million fry/year',
      description: 'Modern hatchery complex for breeding Indian Major Carps and other freshwater fish species.',
      features: [
        'Breeding tanks and spawning pools',
        'Incubation systems',
        'Nursery and rearing ponds',
        'Water filtration and recirculation',
        'Temperature control systems'
      ]
    },
    {
      name: 'Biofloc Technology Unit',
      area: '2000 sq.m',
      capacity: '50 tons/year',
      description: 'Advanced biofloc demonstration unit for sustainable and intensive aquaculture production.',
      features: [
        'Biofloc cultivation tanks',
        'Aeration and mixing systems',
        'Water quality monitoring',
        'Microbial management setup',
        'Zero discharge systems'
      ]
    },
    {
      name: 'Recirculating Aquaculture System (RAS)',
      area: '1500 sq.m',
      capacity: '30 tons/year',
      description: 'State-of-the-art RAS facility for intensive fish production with minimal water usage.',
      features: [
        'Culture tanks and raceways',
        'Biological and mechanical filtration',
        'UV sterilization systems',
        'Oxygen generation equipment',
        'Automated monitoring and control'
      ]
    },
    {
      name: 'Integrated Aquaculture Demo Unit',
      area: '3 hectares',
      capacity: 'Multi-species system',
      description: 'Demonstration facility for integrated farming systems combining aquaculture with agriculture.',
      features: [
        'Fish-rice integration ponds',
        'Duck-fish integrated systems',
        'Vegetable cultivation units',
        'Nutrient cycling systems',
        'Monitoring and evaluation setup'
      ]
    },
    {
      name: 'Ornamental Fish Breeding Unit',
      area: '800 sq.m',
      capacity: '1000 pairs/year',
      description: 'Specialized facility for breeding and rearing ornamental fish species for commercial purposes.',
      features: [
        'Climate-controlled breeding tanks',
        'Quarantine facilities',
        'Live feed culture units',
        'Water treatment systems',
        'Display and marketing setup'
      ]
    }
  ]

  const libraryResources = [
    {
      category: 'Physical Collection',
      description: 'Comprehensive collection of books, journals, and reference materials on fisheries science.',
      resources: [
        'Over 12,000 books on fisheries and aquaculture',
        '150+ national and international journals',
        'Reference books and encyclopedias',
        'Thesis and dissertation collection',
        'Government publications and reports'
      ]
    },
    {
      category: 'Digital Resources',
      description: 'Access to online databases, e-journals, and digital learning platforms.',
      resources: [
        'Online journal databases (ScienceDirect, Springer)',
        'E-book collections',
        'Research databases and repositories',
        'Video lectures and tutorials',
        'Virtual laboratory simulations'
      ]
    },
    {
      category: 'Library Facilities',
      description: 'Modern infrastructure and services to support academic and research activities.',
      resources: [
        'Reading halls with 200+ seating capacity',
        'Individual study carrels',
        'Group discussion rooms',
        'Computer lab with internet access',
        'Photocopying and printing services'
      ]
    },
    {
      category: 'Digital Infrastructure',
      description: 'Advanced technology systems for efficient library management and user services.',
      resources: [
        'Library management software',
        'RFID-based book tracking',
        'Online catalog and search system',
        'Digital repository platform',
        '24x7 Wi-Fi connectivity'
      ]
    }
  ]

  const hostelsCampus = [
    {
      facility: 'Boys Hostel',
      capacity: '150 students',
      description: 'Modern accommodation facility with all necessary amenities for male students.',
      amenities: [
        'Single and double occupancy rooms',
        'Furnished rooms with study tables',
        'Common areas and recreation rooms',
        '24x7 security and CCTV surveillance',
        'High-speed internet connectivity'
      ]
    },
    {
      facility: 'Girls Hostel',
      capacity: '100 students',
      description: 'Safe and comfortable accommodation for female students with enhanced security measures.',
      amenities: [
        'Well-furnished single rooms',
        'Common room with TV and games',
        'Study halls and library corner',
        'Enhanced security with biometric access',
        'Medical facilities and first aid'
      ]
    },
    {
      facility: 'Dining and Mess Facilities',
      capacity: '300 students',
      description: 'Hygienic dining halls serving nutritious meals with varied menu options.',
      amenities: [
        'Spacious dining halls',
        'Vegetarian and non-vegetarian options',
        'Special diet arrangements',
        'Clean kitchen with modern equipment',
        'Quality food with regular health checks'
      ]
    },
    {
      facility: 'Sports and Recreation',
      capacity: 'Campus-wide',
      description: 'Comprehensive sports and recreational facilities for physical fitness and entertainment.',
      amenities: [
        'Indoor games room (Table tennis, Chess)',
        'Outdoor sports ground',
        'Gymnasium with modern equipment',
        'Cultural activity halls',
        'Student common areas'
      ]
    },
    {
      facility: 'Medical and Support Services',
      capacity: 'All students',
      description: 'Essential support services for student health, safety, and convenience.',
      amenities: [
        'Medical dispensary with qualified staff',
        'Ambulance service for emergencies',
        'Banking and ATM facilities',
        'Transportation services',
        'Cafeteria and snack counters'
      ]
    }
  ]

  const processingFeedUnits = [
    {
      unit: 'Fish Processing Plant',
      area: '800 sq.m',
      capacity: '2 tons/day',
      description: 'Modern fish processing facility for value addition, preservation, and product development.',
      equipment: [
        'Fish cleaning and filleting machines',
        'Packaging and sealing equipment',
        'Blast freezing systems',
        'Quality control laboratory',
        'Waste management systems'
      ]
    },
    {
      unit: 'Feed Manufacturing Unit',
      area: '1000 sq.m',
      capacity: '5 tons/day',
      description: 'Comprehensive feed mill for producing high-quality fish feed for different species and growth stages.',
      equipment: [
        'Raw material storage silos',
        'Grinding and mixing equipment',
        'Pelletizing machines',
        'Feed coating and oil spraying systems',
        'Automated packaging systems'
      ]
    },
    {
      unit: 'Cold Storage Facility',
      area: '500 sq.m',
      capacity: '50 tons',
      description: 'Temperature-controlled storage facility for fish products, feed, and research samples.',
      equipment: [
        'Multi-temperature cold rooms',
        'Blast freezing chambers',
        'Refrigerated display units',
        'Temperature monitoring systems',
        'Backup power supply'
      ]
    },
    {
      unit: 'Quality Control Laboratory',
      area: '300 sq.m',
      capacity: '100 samples/day',
      description: 'Advanced laboratory for quality testing of fish products, feed, and raw materials.',
      equipment: [
        'Microbiological testing equipment',
        'Chemical analysis instruments',
        'Sensory evaluation facilities',
        'Rapid testing kits',
        'Data logging and analysis systems'
      ]
    },
    {
      unit: 'Research and Development Wing',
      area: '400 sq.m',
      capacity: 'Ongoing projects',
      description: 'Dedicated space for product development, process optimization, and innovation in fish processing.',
      equipment: [
        'Pilot scale processing equipment',
        'Product development laboratory',
        'Texture and shelf-life analyzers',
        'Packaging optimization setup',
        'Innovation and testing facilities'
      ]
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600 text-white">
        <div className="container-max section-padding">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Infrastructure</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              World-class facilities and modern infrastructure supporting excellence in fisheries education, 
              research, and practical training for comprehensive learning experience.
            </p>
          </div>
        </div>
      </section>
=======
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Building, BookOpen, Users, Phone, Mail, MapPin, Wifi, Car, Utensils, Shield, Clock } from 'lucide-react'
import Section, { SectionHeader } from '../components/common/Section'
import Card from '../components/common/Card'

const Infrastructure = () => {
  const [loading, setLoading] = useState(true)

  // Sample infrastructure data based on reference site
  const infrastructureData = {
    classrooms: [
      {
        id: 1,
        name: 'Main Lecture Hall',
        capacity: '120 students',
        area: '200 sq meters',
        features: [
          'Audio-visual equipment',
          'Projector and screen',
          'Air conditioning',
          'Comfortable seating',
          'Podium and whiteboard'
        ],
        location: 'Academic Block A, Ground Floor',
        incharge: 'Academic Office',
        contact: '+91 761 2345678'
      },
      {
        id: 2,
        name: 'Seminar Hall',
        capacity: '60 students',
        area: '120 sq meters',
        features: [
          'Conference facilities',
          'Video conferencing',
          'Interactive displays',
          'Flexible seating',
          'Presentation equipment'
        ],
        location: 'Academic Block B, First Floor',
        incharge: 'Academic Office',
        contact: '+91 761 2345678'
      },
      {
        id: 3,
        name: 'Tutorial Rooms',
        capacity: '30 students each',
        area: '60 sq meters each',
        features: [
          'Interactive learning setup',
          'Whiteboards',
          'Audio systems',
          'Comfortable seating',
          'Natural lighting'
        ],
        location: 'Academic Block A & B',
        incharge: 'Academic Office',
        contact: '+91 761 2345678'
      }
    ],
    laboratories: [
      {
        id: 1,
        name: 'Aquaculture Research Laboratory',
        description: 'Modern laboratory equipped with advanced instruments for water quality analysis, fish health monitoring, and feed analysis.',
        capacity: '50 students',
        area: '200 sq meters',
        location: 'Academic Block A, Ground Floor',
        equipment: [
          'Water quality testing equipment',
          'Microscopes and imaging systems',
          'Feed analysis instruments',
          'Fish health monitoring tools',
          'pH meters and DO meters',
          'Turbidity meters',
          'Conductivity meters'
        ],
        incharge: 'Dr. Anil Kumar Jain',
        contact: '+91 761 2345681',
        email: 'lab@fisherycollegejabalpur.edu.in',
        workingHours: '9:00 AM - 5:00 PM (Monday to Saturday)'
      },
      {
        id: 2,
        name: 'Fish Processing Laboratory',
        description: 'Specialized laboratory for fish processing, preservation, and value addition techniques.',
        capacity: '40 students',
        area: '150 sq meters',
        location: 'Processing Block, Ground Floor',
        equipment: [
          'Fish processing equipment',
          'Preservation facilities',
          'Quality testing instruments',
          'Packaging machines',
          'Cold storage units',
          'Smoking chambers',
          'Canning equipment'
        ],
        incharge: 'Dr. Priya Verma',
        contact: '+91 761 2345679',
        email: 'processing@fisherycollegejabalpur.edu.in',
        workingHours: '9:00 AM - 5:00 PM (Monday to Saturday)'
      },
      {
        id: 3,
        name: 'Feed Technology Laboratory',
        description: 'Laboratory for fish feed formulation, analysis, and quality testing.',
        capacity: '35 students',
        area: '120 sq meters',
        location: 'Feed Block, Ground Floor',
        equipment: [
          'Feed formulation equipment',
          'Nutritional analysis tools',
          'Quality testing instruments',
          'Storage and preservation facilities',
          'Pelletizing machines',
          'Grinding equipment',
          'Mixing systems'
        ],
        incharge: 'Dr. Priya Verma',
        contact: '+91 761 2345679',
        email: 'feedlab@fisherycollegejabalpur.edu.in',
        workingHours: '9:00 AM - 5:00 PM (Monday to Saturday)'
      }
    ],
    hatcheries: [
      {
        id: 1,
        name: 'Fish Hatchery Unit',
        description: 'Commercial scale fish hatchery for breeding and production of fish seed for research and commercial purposes.',
        capacity: '1 million fry per cycle',
        area: '500 sq meters',
        location: 'Behind Academic Block',
        features: [
          'Breeding pools',
          'Nursery tanks',
          'Water circulation system',
          'Temperature control system',
          'Aeration facilities',
          'Fry collection units'
        ],
        species: ['Carp', 'Catla', 'Rohu', 'Mrigal', 'Tilapia'],
        incharge: 'Mr. Suresh Kumar',
        contact: '+91 761 2345682',
        email: 'hatchery@fisherycollegejabalpur.edu.in',
        workingHours: '24/7 monitoring'
      },
      {
        id: 2,
        name: 'Biofloc Demonstration Unit',
        description: 'Modern biofloc technology demonstration for intensive fish production.',
        capacity: '10,000 liters',
        area: '200 sq meters',
        location: 'Demonstration Farm',
        features: [
          'Biofloc tanks',
          'Water quality monitoring',
          'Aeration systems',
          'Feed management',
          'Harvesting facilities'
        ],
        species: ['Tilapia', 'Catfish'],
        productivity: '15-20 kg/m³',
        incharge: 'Dr. Anil Kumar Jain',
        contact: '+91 761 2345680',
        email: 'biofloc@fisherycollegejabalpur.edu.in'
      },
      {
        id: 3,
        name: 'RAS Demonstration Unit',
        description: 'Recirculating Aquaculture System demonstration for high-density fish production.',
        capacity: '5,000 liters',
        area: '150 sq meters',
        location: 'Demonstration Farm',
        features: [
          'RAS tanks',
          'Filtration systems',
          'Water treatment units',
          'Monitoring systems',
          'Automated feeding'
        ],
        species: ['Trout', 'Bass'],
        productivity: '25-30 kg/m³',
        incharge: 'Dr. Anil Kumar Jain',
        contact: '+91 761 2345680',
        email: 'ras@fisherycollegejabalpur.edu.in'
      }
    ],
    library: {
      name: 'Central Library',
      description: 'Well-equipped library with extensive collection of books, journals, and digital resources related to fisheries science.',
      capacity: '100 readers',
      area: '300 sq meters',
      location: 'Academic Block B, First Floor',
      collections: [
        'Books: 5,000+ titles',
        'Journals: 100+ subscriptions',
        'E-resources: Online databases',
        'Theses: 500+ research works',
        'Reports: Government publications',
        'Maps: Aquaculture maps'
      ],
      facilities: [
        'Reading halls',
        'Computer terminals',
        'Wi-Fi access',
        'Photocopying services',
        'Reference section',
        'Digital library access'
      ],
      incharge: 'Mrs. Sunita Sharma',
      contact: '+91 761 2345686',
      email: 'library@fisherycollegejabalpur.edu.in',
      workingHours: '8:00 AM - 8:00 PM (Monday to Saturday)'
    },
    hostels: [
      {
        id: 1,
        name: 'Boys Hostel',
        capacity: '200 students',
        rooms: '100 double occupancy rooms',
        facilities: [
          'Attached bathrooms',
          '24/7 water supply',
          'Wi-Fi connectivity',
          'Common room with TV',
          'Indoor games',
          'Laundry services',
          'Security services'
        ],
        mess: 'Vegetarian and non-vegetarian options',
        incharge: 'Mr. Rajesh Kumar',
        contact: '+91 761 2345687',
        email: 'boyshostel@fisherycollegejabalpur.edu.in'
      },
      {
        id: 2,
        name: 'Girls Hostel',
        capacity: '150 students',
        rooms: '75 double occupancy rooms',
        facilities: [
          'Attached bathrooms',
          '24/7 water supply',
          'Wi-Fi connectivity',
          'Common room with TV',
          'Indoor games',
          'Laundry services',
          'Security services',
          'Separate entrance'
        ],
        mess: 'Vegetarian and non-vegetarian options',
        incharge: 'Mrs. Anita Singh',
        contact: '+91 761 2345688',
        email: 'girlshostel@fisherycollegejabalpur.edu.in'
      }
    ],
    campusFacilities: [
      {
        id: 1,
        name: 'Sports Complex',
        facilities: [
          'Cricket ground',
          'Football field',
          'Basketball court',
          'Volleyball court',
          'Badminton courts',
          'Indoor games room',
          'Gymnasium'
        ],
        incharge: 'Physical Education Department',
        contact: '+91 761 2345689'
      },
      {
        id: 2,
        name: 'Cafeteria',
        capacity: '100 students',
        facilities: [
          'Multi-cuisine food',
          'Beverage corner',
          'Snack bar',
          'Hygienic kitchen',
          'Comfortable seating'
        ],
        incharge: 'Catering Services',
        contact: '+91 761 2345690'
      },
      {
        id: 3,
        name: 'Transportation',
        facilities: [
          'College bus service',
          'City connectivity',
          'Railway station pickup',
          'Airport connectivity',
          'Local area coverage'
        ],
        incharge: 'Transport Office',
        contact: '+91 761 2345691'
      },
      {
        id: 4,
        name: 'Medical Facilities',
        facilities: [
          'First aid center',
          'Regular health checkups',
          'Emergency services',
          'Health awareness programs',
          'Tie-up with local hospitals'
        ],
        incharge: 'Medical Officer',
        contact: '+91 761 2345692'
      }
    ],
    processingUnits: [
      {
        id: 1,
        name: 'Fish Processing Unit',
        description: 'Commercial scale fish processing and preservation facility.',
        capacity: '2 tons/day',
        products: [
          'Fresh fish',
          'Frozen fish',
          'Smoked fish',
          'Canned fish',
          'Fish fillets'
        ],
        equipment: [
          'Processing line',
          'Freezing units',
          'Packaging machines',
          'Quality control lab',
          'Cold storage'
        ],
        incharge: 'Dr. Priya Verma',
        contact: '+91 761 2345679',
        email: 'processing@fisherycollegejabalpur.edu.in'
      },
      {
        id: 2,
        name: 'Feed Production Unit',
        description: 'Commercial fish feed production facility.',
        capacity: '500 kg/day',
        products: [
          'Floating pellets',
          'Sinking pellets',
          'Powder feed',
          'Specialized feeds',
          'Medicated feeds'
        ],
        equipment: [
          'Feed formulation system',
          'Pelletizing machines',
          'Drying units',
          'Packaging systems',
          'Quality testing lab'
        ],
        incharge: 'Dr. Priya Verma',
        contact: '+91 761 2345679',
        email: 'feedunit@fisherycollegejabalpur.edu.in'
      }
    ]
  }

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [])

  return (
    <div className="min-h-screen">
      <Section background="bg-gray-50">
        <SectionHeader
          title="Infrastructure"
          subtitle="Explore our state-of-the-art infrastructure including classrooms, laboratories, hatcheries, library, hostels, and processing units."
          align="left"
        />
        
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading infrastructure information...</p>
          </div>
        ) : (
          <div className="space-y-12">
            {/* Classrooms */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Building className="h-6 w-6 text-blue-600 mr-2" />
                Classrooms and Learning Spaces
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {infrastructureData.classrooms.map((classroom) => (
                  <Card key={classroom.id} className="h-full">
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">{classroom.name}</h3>
                      
                      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                        <div>
                          <span className="font-semibold text-gray-700">Capacity:</span>
                          <span className="text-gray-600 ml-2">{classroom.capacity}</span>
                        </div>
                        <div>
                          <span className="font-semibold text-gray-700">Area:</span>
                          <span className="text-gray-600 ml-2">{classroom.area}</span>
                        </div>
                        <div>
                          <span className="font-semibold text-gray-700">Location:</span>
                          <span className="text-gray-600 ml-2">{classroom.location}</span>
                        </div>
                        <div>
                          <span className="font-semibold text-gray-700">Incharge:</span>
                          <span className="text-gray-600 ml-2">{classroom.incharge}</span>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-700 mb-2">Features:</h4>
                        <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                          {classroom.features.map((feature, index) => (
                            <li key={index}>{feature}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="pt-4 border-t border-gray-200">
                        <div className="flex items-center space-x-2">
                          <Phone className="h-4 w-4 text-green-600" />
                          <span className="text-sm text-gray-600">{classroom.contact}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Laboratories */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <BookOpen className="h-6 w-6 text-green-600 mr-2" />
                Laboratories
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {infrastructureData.laboratories.map((lab) => (
                  <Card key={lab.id} className="h-full">
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">{lab.name}</h3>
                      <p className="text-gray-600 text-sm mb-4">{lab.description}</p>
                      
                      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                        <div>
                          <span className="font-semibold text-gray-700">Capacity:</span>
                          <span className="text-gray-600 ml-2">{lab.capacity}</span>
                        </div>
                        <div>
                          <span className="font-semibold text-gray-700">Area:</span>
                          <span className="text-gray-600 ml-2">{lab.area}</span>
                        </div>
                        <div>
                          <span className="font-semibold text-gray-700">Location:</span>
                          <span className="text-gray-600 ml-2">{lab.location}</span>
                        </div>
                        <div>
                          <span className="font-semibold text-gray-700">Working Hours:</span>
                          <span className="text-gray-600 ml-2">{lab.workingHours}</span>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-700 mb-2">Equipment:</h4>
                        <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                          {lab.equipment.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="pt-4 border-t border-gray-200">
                        <div className="flex items-center space-x-2 mb-2">
                          <Users className="h-4 w-4 text-blue-600" />
                          <span className="text-sm font-semibold text-gray-700">{lab.incharge}</span>
                        </div>
                        <div className="flex items-center space-x-2 mb-2">
                          <Phone className="h-4 w-4 text-green-600" />
                          <span className="text-sm text-gray-600">{lab.contact}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Mail className="h-4 w-4 text-red-600" />
                          <span className="text-sm text-gray-600">{lab.email}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Hatcheries and Demo Units */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Building className="h-6 w-6 text-purple-600 mr-2" />
                Hatcheries and Demo Units
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {infrastructureData.hatcheries.map((hatchery) => (
                  <Card key={hatchery.id} className="h-full">
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">{hatchery.name}</h3>
                      <p className="text-gray-600 text-sm mb-4">{hatchery.description}</p>
                      
                      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                        <div>
                          <span className="font-semibold text-gray-700">Capacity:</span>
                          <span className="text-gray-600 ml-2">{hatchery.capacity}</span>
                        </div>
                        <div>
                          <span className="font-semibold text-gray-700">Area:</span>
                          <span className="text-gray-600 ml-2">{hatchery.area}</span>
                        </div>
                        <div>
                          <span className="font-semibold text-gray-700">Location:</span>
                          <span className="text-gray-600 ml-2">{hatchery.location}</span>
                        </div>
                        <div>
                          <span className="font-semibold text-gray-700">Working Hours:</span>
                          <span className="text-gray-600 ml-2">{hatchery.workingHours}</span>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-700 mb-2">Features:</h4>
                        <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                          {hatchery.features.map((feature, index) => (
                            <li key={index}>{feature}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-700 mb-2">Species:</h4>
                        <div className="flex flex-wrap gap-2">
                          {hatchery.species.map((species, index) => (
                            <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                              {species}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      {hatchery.productivity && (
                        <div className="mb-4">
                          <h4 className="font-semibold text-gray-700 mb-2">Productivity:</h4>
                          <span className="text-sm text-gray-600">{hatchery.productivity}</span>
                        </div>
                      )}
                      
                      <div className="pt-4 border-t border-gray-200">
                        <div className="flex items-center space-x-2 mb-2">
                          <Users className="h-4 w-4 text-blue-600" />
                          <span className="text-sm font-semibold text-gray-700">{hatchery.incharge}</span>
                        </div>
                        <div className="flex items-center space-x-2 mb-2">
                          <Phone className="h-4 w-4 text-green-600" />
                          <span className="text-sm text-gray-600">{hatchery.contact}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Mail className="h-4 w-4 text-red-600" />
                          <span className="text-sm text-gray-600">{hatchery.email}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Library */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <BookOpen className="h-6 w-6 text-orange-600 mr-2" />
                Library and E-Resources
              </h2>
              <Card>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{infrastructureData.library.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{infrastructureData.library.description}</p>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                        <div>
                          <span className="font-semibold text-gray-700">Capacity:</span>
                          <span className="text-gray-600 ml-2">{infrastructureData.library.capacity}</span>
                        </div>
                        <div>
                          <span className="font-semibold text-gray-700">Area:</span>
                          <span className="text-gray-600 ml-2">{infrastructureData.library.area}</span>
                        </div>
                        <div>
                          <span className="font-semibold text-gray-700">Location:</span>
                          <span className="text-gray-600 ml-2">{infrastructureData.library.location}</span>
                        </div>
                        <div>
                          <span className="font-semibold text-gray-700">Working Hours:</span>
                          <span className="text-gray-600 ml-2">{infrastructureData.library.workingHours}</span>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-700 mb-2">Collections:</h4>
                        <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                          {infrastructureData.library.collections.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <div>
                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-700 mb-2">Facilities:</h4>
                        <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                          {infrastructureData.library.facilities.map((facility, index) => (
                            <li key={index}>{facility}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="pt-4 border-t border-gray-200">
                        <div className="flex items-center space-x-2 mb-2">
                          <Users className="h-4 w-4 text-blue-600" />
                          <span className="text-sm font-semibold text-gray-700">{infrastructureData.library.incharge}</span>
                        </div>
                        <div className="flex items-center space-x-2 mb-2">
                          <Phone className="h-4 w-4 text-green-600" />
                          <span className="text-sm text-gray-600">{infrastructureData.library.contact}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Mail className="h-4 w-4 text-red-600" />
                          <span className="text-sm text-gray-600">{infrastructureData.library.email}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Hostels and Campus Facilities */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Building className="h-6 w-6 text-indigo-600 mr-2" />
                Hostels and Campus Facilities
              </h2>
              
              {/* Hostels */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Hostel Accommodation</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {infrastructureData.hostels.map((hostel) => (
                    <Card key={hostel.id} className="h-full">
                      <div className="p-6">
                        <h4 className="text-lg font-semibold text-gray-900 mb-3">{hostel.name}</h4>
                        
                        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                          <div>
                            <span className="font-semibold text-gray-700">Capacity:</span>
                            <span className="text-gray-600 ml-2">{hostel.capacity}</span>
                          </div>
                          <div>
                            <span className="font-semibold text-gray-700">Rooms:</span>
                            <span className="text-gray-600 ml-2">{hostel.rooms}</span>
                          </div>
                          <div>
                            <span className="font-semibold text-gray-700">Mess:</span>
                            <span className="text-gray-600 ml-2">{hostel.mess}</span>
                          </div>
                          <div>
                            <span className="font-semibold text-gray-700">Incharge:</span>
                            <span className="text-gray-600 ml-2">{hostel.incharge}</span>
                          </div>
                        </div>
                        
                        <div className="mb-4">
                          <h5 className="font-semibold text-gray-700 mb-2">Facilities:</h5>
                          <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                            {hostel.facilities.map((facility, index) => (
                              <li key={index}>{facility}</li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="pt-4 border-t border-gray-200">
                          <div className="flex items-center space-x-2 mb-2">
                            <Phone className="h-4 w-4 text-green-600" />
                            <span className="text-sm text-gray-600">{hostel.contact}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Mail className="h-4 w-4 text-red-600" />
                            <span className="text-sm text-gray-600">{hostel.email}</span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
              
              {/* Campus Facilities */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Other Campus Facilities</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {infrastructureData.campusFacilities.map((facility) => (
                    <Card key={facility.id} className="h-full">
                      <div className="p-6">
                        <h4 className="text-lg font-semibold text-gray-900 mb-3">{facility.name}</h4>
                        
                        <div className="mb-4">
                          <h5 className="font-semibold text-gray-700 mb-2">Facilities:</h5>
                          <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                            {facility.facilities.map((item, index) => (
                              <li key={index}>{item}</li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="pt-4 border-t border-gray-200">
                          <div className="flex items-center space-x-2 mb-2">
                            <Users className="h-4 w-4 text-blue-600" />
                            <span className="text-sm font-semibold text-gray-700">{facility.incharge}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Phone className="h-4 w-4 text-green-600" />
                            <span className="text-sm text-gray-600">{facility.contact}</span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>

            {/* Fish Processing & Feed Units */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Building className="h-6 w-6 text-red-600 mr-2" />
                Fish Processing & Feed Units
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {infrastructureData.processingUnits.map((unit) => (
                  <Card key={unit.id} className="h-full">
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">{unit.name}</h3>
                      <p className="text-gray-600 text-sm mb-4">{unit.description}</p>
                      
                      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                        <div>
                          <span className="font-semibold text-gray-700">Capacity:</span>
                          <span className="text-gray-600 ml-2">{unit.capacity}</span>
                        </div>
                        <div>
                          <span className="font-semibold text-gray-700">Incharge:</span>
                          <span className="text-gray-600 ml-2">{unit.incharge}</span>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-700 mb-2">Products:</h4>
                        <div className="flex flex-wrap gap-2">
                          {unit.products.map((product, index) => (
                            <span key={index} className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                              {product}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-700 mb-2">Equipment:</h4>
                        <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                          {unit.equipment.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="pt-4 border-t border-gray-200">
                        <div className="flex items-center space-x-2 mb-2">
                          <Phone className="h-4 w-4 text-green-600" />
                          <span className="text-sm text-gray-600">{unit.contact}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Mail className="h-4 w-4 text-red-600" />
                          <span className="text-sm text-gray-600">{unit.email}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}
      </Section>
>>>>>>> 356a3acf66188d788cf322698f07ebf8ec85f7f3

      {/* Quick Navigation */}
      <section className="section-padding bg-white border-b">
        <div className="container-max">
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#classrooms-labs" className="px-6 py-3 bg-gray-100 hover:bg-primary-600 hover:text-white rounded-lg font-medium transition-colors">
              Classrooms and Labs
            </a>
            <a href="#hatcheries-demo" className="px-6 py-3 bg-gray-100 hover:bg-primary-600 hover:text-white rounded-lg font-medium transition-colors">
              Hatcheries and Demo Units
            </a>
            <a href="#library-resources" className="px-6 py-3 bg-gray-100 hover:bg-primary-600 hover:text-white rounded-lg font-medium transition-colors">
              Library and e-Resources
            </a>
            <a href="#hostels-campus" className="px-6 py-3 bg-gray-100 hover:bg-primary-600 hover:text-white rounded-lg font-medium transition-colors">
              Hostels and Campus Facilities
            </a>
            <a href="#processing-feed" className="px-6 py-3 bg-gray-100 hover:bg-primary-600 hover:text-white rounded-lg font-medium transition-colors">
              Fish Processing & Feed Units
            </a>
          </div>
        </div>
      </section>

      {/* Classrooms and Labs */}
      <section id="classrooms-labs" className="section-padding bg-gray-50">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Classrooms and Labs</h2>
            <div className="w-20 h-1 bg-primary-500 rounded mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Modern classrooms and state-of-the-art laboratories equipped with latest technology 
              to provide comprehensive theoretical and practical education.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {classroomsLabs.map((facility, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-start space-x-4 mb-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                    {facility.name.includes('Classroom') ? 
                      <Monitor className="w-6 h-6 text-primary-600" /> : 
                      <Microscope className="w-6 h-6 text-primary-600" />
                    }
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{facility.name}</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
                      <div>
                        <span className="font-medium">Capacity:</span> {facility.capacity}
                      </div>
                      <div>
                        <span className="font-medium">Area:</span> {facility.count}
                      </div>
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-700 mb-4">{facility.description}</p>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Key Features</h4>
                  <ul className="space-y-2">
                    {facility.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-700">
                        <div className="w-2 h-2 bg-primary-500 rounded-full mr-3"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Hatcheries and Demo Units (Biofloc, RAS) */}
      <section id="hatcheries-demo" className="section-padding bg-white">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Hatcheries and Demo Units (Biofloc, RAS)</h2>
            <div className="w-20 h-1 bg-primary-500 rounded mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Advanced aquaculture facilities including modern hatcheries, biofloc technology units, 
              and recirculating aquaculture systems for practical training and research.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hatcheriesDemoUnits.map((unit, index) => (
              <Card key={index} className="p-6">
                <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center mb-4">
                  <Fish className="w-6 h-6 text-secondary-600" />
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{unit.name}</h3>
                
                <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-3">
                  <div>
                    <span className="font-medium">Area:</span> {unit.area}
                  </div>
                  <div>
                    <span className="font-medium">Capacity:</span> {unit.capacity}
                  </div>
                </div>
                
                <p className="text-gray-700 mb-4">{unit.description}</p>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Facilities</h4>
                  <ul className="space-y-2">
                    {unit.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-700">
                        <ChevronRight className="w-4 h-4 text-secondary-600 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Library and e-Resources */}
      <section id="library-resources" className="section-padding bg-gray-50">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Library and e-Resources</h2>
            <div className="w-20 h-1 bg-primary-500 rounded mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Comprehensive knowledge hub with extensive physical and digital collections, 
              modern facilities, and advanced technology for academic and research support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {libraryResources.map((resource, index) => (
              <Card key={index} className="p-6">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                  {resource.category.includes('Digital') ? 
                    <Wifi className="w-6 h-6 text-yellow-600" /> : 
                    <Book className="w-6 h-6 text-yellow-600" />
                  }
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{resource.category}</h3>
                <p className="text-gray-700 mb-4">{resource.description}</p>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Available Resources</h4>
                  <ul className="space-y-2">
                    {resource.resources.map((item, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-700">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Hostels and Campus Facilities */}
      <section id="hostels-campus" className="section-padding bg-white">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Hostels and Campus Facilities</h2>
            <div className="w-20 h-1 bg-primary-500 rounded mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Comfortable accommodation and comprehensive campus facilities ensuring a safe, 
              conducive, and enriching environment for student life and development.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hostelsCampus.map((facility, index) => (
              <Card key={index} className="p-6">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  {facility.facility.includes('Hostel') ? 
                    <Home className="w-6 h-6 text-green-600" /> :
                    facility.facility.includes('Dining') ?
                    <Utensils className="w-6 h-6 text-green-600" /> :
                    <Users className="w-6 h-6 text-green-600" />
                  }
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{facility.facility}</h3>
                <p className="text-sm text-gray-600 mb-3">Capacity: {facility.capacity}</p>
                <p className="text-gray-700 mb-4">{facility.description}</p>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Amenities</h4>
                  <ul className="space-y-2">
                    {facility.amenities.map((amenity, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-700">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                        {amenity}
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Fish Processing & Feed Units */}
      <section id="processing-feed" className="section-padding bg-gray-50">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Fish Processing & Feed Units</h2>
            <div className="w-20 h-1 bg-primary-500 rounded mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Modern processing and manufacturing facilities for fish products and feed production, 
              providing hands-on training and supporting research in processing technology.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {processingFeedUnits.map((unit, index) => (
              <Card key={index} className="p-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Factory className="w-6 h-6 text-blue-600" />
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{unit.unit}</h3>
                
                <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-3">
                  <div>
                    <span className="font-medium">Area:</span> {unit.area}
                  </div>
                  <div>
                    <span className="font-medium">Capacity:</span> {unit.capacity}
                  </div>
                </div>
                
                <p className="text-gray-700 mb-4">{unit.description}</p>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Equipment & Features</h4>
                  <ul className="space-y-2">
                    {unit.equipment.map((item, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-700">
                        <FlaskConical className="w-4 h-4 text-blue-600 mr-2" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section-padding bg-primary-600 text-white">
        <div className="container-max text-center">
          <h2 className="text-3xl font-bold mb-4">Experience Our World-Class Infrastructure</h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Visit our campus to explore state-of-the-art facilities and experience the learning environment 
            that shapes future fisheries professionals.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="btn-accent"
            >
              Schedule Campus Visit
            </Link>
            
            <Link
              to="/academics"
              className="btn-outline border-white text-white hover:bg-white hover:text-primary-600"
            >
              Explore Programs
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Infrastructure