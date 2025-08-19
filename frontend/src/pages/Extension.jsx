import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Users, Award, Building, FileText, Calendar, MapPin, Phone, Mail, Target, TrendingUp, Lightbulb } from 'lucide-react'
import Section, { SectionHeader } from '../components/common/Section'
import Card from '../components/common/Card'

const Extension = () => {
  const [loading, setLoading] = useState(true)

  // Sample extension data based on reference site
  const extensionData = {
    farmerTraining: [
      {
        id: 1,
        title: 'Composite Fish Culture Training',
        description: 'Comprehensive training program on composite fish culture techniques for enhanced productivity.',
        duration: '5 Days',
        participants: '25-30 farmers per batch',
        frequency: 'Monthly',
        topics: [
          'Pond preparation and management',
          'Fish species selection and stocking',
          'Feed management and nutrition',
          'Water quality monitoring',
          'Disease prevention and control',
          'Harvesting and marketing'
        ],
        venue: 'College Campus & Field Sites',
        instructor: 'Dr. Rajesh Kumar Sharma',
        contact: '+91 761 2345678',
        email: 'training@fisherycollegejabalpur.edu.in'
      },
      {
        id: 2,
        title: 'Integrated Fish Farming',
        description: 'Training on integrated fish farming with agriculture and livestock for sustainable farming systems.',
        duration: '3 Days',
        participants: '20-25 farmers per batch',
        frequency: 'Bi-monthly',
        topics: [
          'Fish-cum-poultry farming',
          'Fish-cum-pig farming',
          'Fish-cum-duck farming',
          'Waste utilization',
          'Economic analysis'
        ],
        venue: 'Demonstration Farms',
        instructor: 'Dr. Anil Kumar Jain',
        contact: '+91 761 2345680',
        email: 'anil.jain@fisherycollegejabalpur.edu.in'
      },
      {
        id: 3,
        title: 'Biofloc Technology Training',
        description: 'Advanced training on biofloc technology for intensive fish production in limited water resources.',
        duration: '4 Days',
        participants: '15-20 farmers per batch',
        frequency: 'Quarterly',
        topics: [
          'Biofloc system setup',
          'Water quality management',
          'Feed formulation and feeding',
          'System maintenance',
          'Troubleshooting'
        ],
        venue: 'Biofloc Demonstration Unit',
        instructor: 'Dr. Priya Verma',
        contact: '+91 761 2345679',
        email: 'priya.verma@fisherycollegejabalpur.edu.in'
      }
    ],
    ffpoShg: [
      {
        id: 1,
        title: 'FFPO Formation and Management',
        description: 'Support for formation and management of Farmer Producer Organizations (FPOs) in fisheries sector.',
        activities: [
          'FPO registration and legal compliance',
          'Business plan development',
          'Financial management training',
          'Market linkage establishment',
          'Quality certification support'
        ],
        beneficiaries: '500+ farmers',
        coordinator: 'Mr. Suresh Kumar',
        contact: '+91 761 2345683',
        email: 'ffpo@fisherycollegejabalpur.edu.in'
      },
      {
        id: 2,
        title: 'SHG Capacity Building',
        description: 'Capacity building programs for Self Help Groups engaged in fisheries and aquaculture activities.',
        activities: [
          'Group formation and management',
          'Skill development training',
          'Micro-enterprise development',
          'Financial literacy',
          'Market access support'
        ],
        beneficiaries: '300+ SHG members',
        coordinator: 'Mrs. Sunita Sharma',
        contact: '+91 761 2345684',
        email: 'shg@fisherycollegejabalpur.edu.in'
      }
    ],
    mvkInitiatives: [
      {
        id: 1,
        title: 'Matsya Vigyan Kendra (MVK)',
        description: 'Frontline extension center for technology transfer and farmer support services.',
        services: [
          'Technology demonstration',
          'Farmer consultation',
          'Input supply support',
          'Market information',
          'Extension literature'
        ],
        location: 'College Campus',
        incharge: 'Dr. Rajesh Kumar Sharma',
        contact: '+91 761 2345678',
        email: 'mvk@fisherycollegejabalpur.edu.in',
        workingHours: '9:00 AM - 5:00 PM (Monday to Saturday)'
      },
      {
        id: 2,
        title: 'Mobile Extension Services',
        description: 'Mobile extension units for reaching remote farming communities.',
        services: [
          'On-farm demonstrations',
          'Field day programs',
          'Farmer field schools',
          'Technology assessment',
          'Problem diagnosis'
        ],
        coverage: '50+ villages',
        coordinator: 'Mr. Ramesh Kumar',
        contact: '+91 761 2345685',
        email: 'mobile@fisherycollegejabalpur.edu.in'
      }
    ],
    demonstrations: [
      {
        id: 1,
        title: 'Aquaculture Demonstration Units',
        description: 'Practical demonstration of various aquaculture technologies and systems.',
        units: [
          {
            name: 'Biofloc System',
            capacity: '10,000 liters',
            species: 'Tilapia, Catfish',
            productivity: '15-20 kg/m³',
            status: 'Operational'
          },
          {
            name: 'RAS (Recirculating Aquaculture System)',
            capacity: '5,000 liters',
            species: 'Trout, Bass',
            productivity: '25-30 kg/m³',
            status: 'Operational'
          },
          {
            name: 'Pond Culture System',
            capacity: '1 hectare',
            species: 'Carp, Catla, Rohu',
            productivity: '4,000-5,000 kg/ha',
            status: 'Operational'
          }
        ],
        location: 'College Demonstration Farm',
        incharge: 'Dr. Anil Kumar Jain',
        contact: '+91 761 2345680'
      },
      {
        id: 2,
        title: 'Feed Production Unit',
        description: 'Demonstration of fish feed production using locally available ingredients.',
        capacity: '500 kg/day',
        types: [
          'Floating pellets',
          'Sinking pellets',
          'Powder feed',
          'Specialized feeds'
        ],
        ingredients: [
          'Rice bran',
          'Mustard cake',
          'Fish meal',
          'Vitamins and minerals'
        ],
        incharge: 'Dr. Priya Verma',
        contact: '+91 761 2345679'
      }
    ],
    successStories: [
      {
        id: 1,
        farmer: 'Ram Kumar Patel',
        village: 'Bargi, Jabalpur',
        story: 'Started with 1 hectare pond, now manages 5 hectares with integrated fish farming. Annual income increased from ₹50,000 to ₹3,00,000.',
        technologies: ['Composite fish culture', 'Integrated farming', 'Biofloc technology'],
        support: 'Training, technical guidance, market linkage',
        year: 2023,
        image: 'cllg.jpg'
      },
      {
        id: 2,
        farmer: 'Lakshmi Devi',
        village: 'Kundam, Jabalpur',
        story: 'Transformed from traditional farming to successful fish farming. Now leads a women SHG with 15 members.',
        technologies: ['Fish-cum-poultry', 'Organic farming', 'Value addition'],
        support: 'SHG formation, skill training, financial assistance',
        year: 2023,
        image: 'cllg.jpg'
      },
      {
        id: 3,
        farmer: 'Mohan Singh',
        village: 'Sihora, Jabalpur',
        story: 'Pioneered biofloc technology in the region. Serves as a model farmer and trains other farmers.',
        technologies: ['Biofloc system', 'Intensive farming', 'Quality management'],
        support: 'Technology demonstration, continuous guidance, recognition',
        year: 2023,
        image: 'cllg.jpg'
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
          title="Extension & Outreach"
          subtitle="Farmer training programs, FFPO and SHG support activities, MVK initiatives, aquaculture demonstrations, and success stories."
          align="left"
        />
        
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading extension information...</p>
          </div>
        ) : (
          <div className="space-y-12">
            {/* Farmer Training Programs */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Users className="h-6 w-6 text-blue-600 mr-2" />
                Farmer Training Programs
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {extensionData.farmerTraining.map((training) => (
                  <Card key={training.id} className="h-full">
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">{training.title}</h3>
                      <p className="text-gray-600 text-sm mb-4">{training.description}</p>
                      
                      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                        <div>
                          <span className="font-semibold text-gray-700">Duration:</span>
                          <span className="text-gray-600 ml-2">{training.duration}</span>
                        </div>
                        <div>
                          <span className="font-semibold text-gray-700">Participants:</span>
                          <span className="text-gray-600 ml-2">{training.participants}</span>
                        </div>
                        <div>
                          <span className="font-semibold text-gray-700">Frequency:</span>
                          <span className="text-gray-600 ml-2">{training.frequency}</span>
                        </div>
                        <div>
                          <span className="font-semibold text-gray-700">Venue:</span>
                          <span className="text-gray-600 ml-2">{training.venue}</span>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-700 mb-2">Training Topics:</h4>
                        <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                          {training.topics.map((topic, index) => (
                            <li key={index}>{topic}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="pt-4 border-t border-gray-200">
                        <div className="flex items-center space-x-2 mb-2">
                          <Users className="h-4 w-4 text-blue-600" />
                          <span className="text-sm font-semibold text-gray-700">{training.instructor}</span>
                        </div>
                        <div className="flex items-center space-x-2 mb-2">
                          <Phone className="h-4 w-4 text-green-600" />
                          <span className="text-sm text-gray-600">{training.contact}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Mail className="h-4 w-4 text-red-600" />
                          <span className="text-sm text-gray-600">{training.email}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* FFPO and SHG Support */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Target className="h-6 w-6 text-green-600 mr-2" />
                FFPO and SHG Support Activities
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {extensionData.ffpoShg.map((program) => (
                  <Card key={program.id} className="h-full">
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">{program.title}</h3>
                      <p className="text-gray-600 text-sm mb-4">{program.description}</p>
                      
                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-700 mb-2">Activities:</h4>
                        <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                          {program.activities.map((activity, index) => (
                            <li key={index}>{activity}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                        <div>
                          <span className="font-semibold text-gray-700">Beneficiaries:</span>
                          <span className="text-gray-600 ml-2">{program.beneficiaries}</span>
                        </div>
                        <div>
                          <span className="font-semibold text-gray-700">Coordinator:</span>
                          <span className="text-gray-600 ml-2">{program.coordinator}</span>
                        </div>
                      </div>
                      
                      <div className="pt-4 border-t border-gray-200">
                        <div className="flex items-center space-x-2 mb-2">
                          <Phone className="h-4 w-4 text-green-600" />
                          <span className="text-sm text-gray-600">{program.contact}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Mail className="h-4 w-4 text-red-600" />
                          <span className="text-sm text-gray-600">{program.email}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* MVK Initiatives */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Building className="h-6 w-6 text-purple-600 mr-2" />
                Matsya Vigyan Kendra (MVK) Initiatives
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {extensionData.mvkInitiatives.map((initiative) => (
                  <Card key={initiative.id} className="h-full">
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">{initiative.title}</h3>
                      <p className="text-gray-600 text-sm mb-4">{initiative.description}</p>
                      
                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-700 mb-2">Services:</h4>
                        <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                          {initiative.services.map((service, index) => (
                            <li key={index}>{service}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="space-y-2 text-sm mb-4">
                        <div>
                          <span className="font-semibold text-gray-700">Location:</span>
                          <span className="text-gray-600 ml-2">{initiative.location}</span>
                        </div>
                        <div>
                          <span className="font-semibold text-gray-700">Incharge:</span>
                          <span className="text-gray-600 ml-2">{initiative.incharge}</span>
                        </div>
                        {initiative.coverage && (
                          <div>
                            <span className="font-semibold text-gray-700">Coverage:</span>
                            <span className="text-gray-600 ml-2">{initiative.coverage}</span>
                          </div>
                        )}
                        {initiative.workingHours && (
                          <div>
                            <span className="font-semibold text-gray-700">Working Hours:</span>
                            <span className="text-gray-600 ml-2">{initiative.workingHours}</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="pt-4 border-t border-gray-200">
                        <div className="flex items-center space-x-2 mb-2">
                          <Phone className="h-4 w-4 text-green-600" />
                          <span className="text-sm text-gray-600">{initiative.contact}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Mail className="h-4 w-4 text-red-600" />
                          <span className="text-sm text-gray-600">{initiative.email}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Aquaculture Demonstrations */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Lightbulb className="h-6 w-6 text-yellow-600 mr-2" />
                Aquaculture Demonstrations
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {extensionData.demonstrations.map((demo) => (
                  <Card key={demo.id} className="h-full">
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">{demo.title}</h3>
                      <p className="text-gray-600 text-sm mb-4">{demo.description}</p>
                      
                      {demo.units && (
                        <div className="mb-4">
                          <h4 className="font-semibold text-gray-700 mb-2">Demonstration Units:</h4>
                          <div className="space-y-3">
                            {demo.units.map((unit, index) => (
                              <div key={index} className="p-3 bg-gray-50 rounded-lg">
                                <div className="grid grid-cols-2 gap-2 text-sm">
                                  <div><span className="font-semibold">Name:</span> {unit.name}</div>
                                  <div><span className="font-semibold">Capacity:</span> {unit.capacity}</div>
                                  <div><span className="font-semibold">Species:</span> {unit.species}</div>
                                  <div><span className="font-semibold">Productivity:</span> {unit.productivity}</div>
                                  <div className="col-span-2">
                                    <span className="font-semibold">Status:</span> 
                                    <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                                      unit.status === 'Operational' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                    }`}>
                                      {unit.status}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {demo.types && (
                        <div className="mb-4">
                          <h4 className="font-semibold text-gray-700 mb-2">Types:</h4>
                          <div className="flex flex-wrap gap-2">
                            {demo.types.map((type, index) => (
                              <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                                {type}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {demo.ingredients && (
                        <div className="mb-4">
                          <h4 className="font-semibold text-gray-700 mb-2">Ingredients:</h4>
                          <div className="flex flex-wrap gap-2">
                            {demo.ingredients.map((ingredient, index) => (
                              <span key={index} className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                                {ingredient}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      <div className="pt-4 border-t border-gray-200">
                        <div className="flex items-center space-x-2 mb-2">
                          <Users className="h-4 w-4 text-blue-600" />
                          <span className="text-sm font-semibold text-gray-700">{demo.incharge}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Phone className="h-4 w-4 text-green-600" />
                          <span className="text-sm text-gray-600">{demo.contact}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Success Stories */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <TrendingUp className="h-6 w-6 text-green-600 mr-2" />
                Success Stories
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {extensionData.successStories.map((story) => (
                  <Card key={story.id} className="h-full">
                    <div className="p-6">
                      <div className="mb-4">
                        <img
                          src={story.image}
                          alt={story.farmer}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                      </div>
                      
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{story.farmer}</h3>
                      <p className="text-sm text-gray-600 mb-2">{story.village}</p>
                      <p className="text-sm text-gray-700 mb-3">{story.story}</p>
                      
                      <div className="mb-3">
                        <h4 className="font-semibold text-gray-700 mb-2">Technologies Adopted:</h4>
                        <div className="flex flex-wrap gap-2">
                          {story.technologies.map((tech, index) => (
                            <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="mb-3">
                        <h4 className="font-semibold text-gray-700 mb-2">Support Received:</h4>
                        <p className="text-sm text-gray-600">{story.support}</p>
                      </div>
                      
                      <div className="text-right">
                        <span className="text-xs text-gray-500">{story.year}</span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}
      </Section>

      {/* Navigation Anchors */}
      <div id="ffpo-shg"></div>
      <div id="mvk"></div>
      <div id="demonstrations"></div>
      <div id="success-stories"></div>

      {/* FFPO and SHG Support Section */}
      <Section id="ffpo-shg" background="bg-white">
        <SectionHeader
          title="FFPO and SHG Support"
          subtitle="Supporting Fish Farmer Producer Organizations and Self Help Groups"
          align="center"
        />
        <p className="text-gray-600">Details about FFPO and SHG support programs will be displayed here.</p>
      </Section>

      {/* Matsya Vigyan Kendra Section */}
      <Section id="mvk" background="bg-gray-50">
        <SectionHeader
          title="Matsya Vigyan Kendra (MVK)"
          subtitle="Technology demonstration and transfer activities"
          align="center"
        />
        <p className="text-gray-600">Information about MVK activities and programs will be displayed here.</p>
      </Section>

      {/* Aquaculture Demonstrations Section */}
      <Section id="demonstrations" background="bg-white">
        <SectionHeader
          title="Aquaculture Demonstrations"
          subtitle="Practical demonstrations for farmers and students"
          align="center"
        />
        <p className="text-gray-600">Details about aquaculture demonstration programs will be displayed here.</p>
      </Section>

      {/* Success Stories Section */}
      <Section id="success-stories" background="bg-gray-50">
        <SectionHeader
          title="Success Stories"
          subtitle="Inspiring stories from our extension programs"
          align="center"
        />
        <p className="text-gray-600">Success stories and case studies will be displayed here.</p>
      </Section>
    </div>
  )
}

export default Extension