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
    </div>
  )
}

export default Infrastructure