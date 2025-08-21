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