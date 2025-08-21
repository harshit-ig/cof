<<<<<<< HEAD
import React from 'react'
import { Link } from 'react-router-dom'
import { Users, Award, Target, Lightbulb, ChevronRight, MapPin, Calendar, TrendingUp, BookOpen, UserCheck } from 'lucide-react'
import Card from '../components/common/Card'

const Extension = () => {
  const farmerTrainingPrograms = [
    {
      title: 'Integrated Fish Farming Training',
      duration: '5 Days',
      frequency: 'Monthly',
      participants: '25-30 farmers',
      description: 'Comprehensive training on integrated fish farming systems, pond management, and sustainable aquaculture practices.',
      modules: [
        'Pond construction and design',
        'Fish seed selection and stocking',
        'Feed management and nutrition',
        'Water quality management',
        'Disease prevention and treatment'
      ]
    },
    {
      title: 'Fish Health Management Workshop',
      duration: '3 Days',
      frequency: 'Quarterly',
      participants: '20-25 farmers',
      description: 'Specialized training on fish disease identification, prevention strategies, and treatment protocols.',
      modules: [
        'Common fish diseases identification',
        'Preventive health measures',
        'Treatment and medication',
        'Biosecurity protocols',
        'Record keeping and monitoring'
      ]
    },
    {
      title: 'Entrepreneurship Development Program',
      duration: '7 Days',
      frequency: 'Bi-annually',
      participants: '15-20 youth',
      description: 'Training program for youth and women entrepreneurs in fisheries sector business development.',
      modules: [
        'Business plan development',
        'Financial planning and management',
        'Marketing strategies',
        'Government schemes and subsidies',
        'Value addition techniques'
      ]
    },
    {
      title: 'Ornamental Fish Culture Training',
      duration: '4 Days',
      frequency: 'Quarterly',
      participants: '20-25 farmers',
      description: 'Specialized training on ornamental fish breeding, culture, and marketing for additional income generation.',
      modules: [
        'Ornamental fish species selection',
        'Breeding techniques',
        'Tank management systems',
        'Feed and nutrition',
        'Marketing and export opportunities'
      ]
    }
  ]

  const ffpoShgActivities = [
    {
      type: 'FFPO Support',
      title: 'Fish Farmer Producer Organization Development',
      description: 'Supporting formation and strengthening of FFPOs for collective marketing and resource sharing.',
      activities: [
        'FFPO registration and legal compliance',
        'Capacity building of FFPO members',
        'Market linkage development',
        'Collective procurement of inputs',
        'Financial literacy programs'
      ],
      beneficiaries: '150+ farmers',
      impact: '25% increase in farmers income'
    },
    {
      type: 'SHG Support',
      title: 'Self Help Group Fisheries Activities',
      description: 'Empowering women SHGs through fisheries-based livelihood programs and skill development.',
      activities: [
        'Fish processing and value addition',
        'Micro-credit facility development',
        'Group formation and training',
        'Marketing support and branding',
        'Quality certification assistance'
      ],
      beneficiaries: '200+ women',
      impact: '40% increase in household income'
    },
    {
      type: 'Cooperative Support',
      title: 'Fisheries Cooperative Strengthening',
      description: 'Strengthening existing fisheries cooperatives and forming new ones for better resource utilization.',
      activities: [
        'Cooperative management training',
        'Financial management systems',
        'Equipment and infrastructure support',
        'Technical assistance programs',
        'Market development initiatives'
      ],
      beneficiaries: '300+ members',
      impact: '30% reduction in input costs'
    }
  ]

  const mvkInitiatives = [
    {
      title: 'Technology Demonstration Programs',
      description: 'Demonstrating latest aquaculture technologies and best practices at farmer fields.',
      components: [
        'Demonstration ponds setup',
        'New technology trials',
        'Farmer field schools',
        'Technology validation',
        'Impact assessment studies'
      ],
      reach: '50+ villages',
      farmers: '500+ direct beneficiaries'
    },
    {
      title: 'Skill Development Training',
      description: 'Comprehensive skill development programs for youth and farmers in modern aquaculture techniques.',
      components: [
        'Hands-on training sessions',
        'Certificate courses',
        'Equipment operation training',
        'Digital literacy programs',
        'Entrepreneurship development'
      ],
      reach: '25+ training centers',
      farmers: '300+ trainees annually'
    },
    {
      title: 'Extension Advisory Services',
      description: 'Regular advisory services through field visits, helpline, and digital platforms.',
      components: [
        'Weekly field visits',
        'Helpline services (24/7)',
        'Mobile app advisory',
        'SMS-based alerts',
        'Video calling consultations'
      ],
      reach: '100+ villages',
      farmers: '1000+ farmers covered'
    },
    {
      title: 'Input Supply Chain Management',
      description: 'Ensuring timely availability of quality inputs through improved supply chain systems.',
      components: [
        'Quality seed supply',
        'Feed distribution network',
        'Medicine availability',
        'Equipment rental services',
        'Emergency support system'
      ],
      reach: '75+ locations',
      farmers: '800+ farmers served'
    }
  ]

  const demonstrations = [
    {
      title: 'Biofloc Technology Demonstration',
      location: 'College Demo Farm',
      area: '0.5 hectares',
      description: 'Demonstration of biofloc technology for sustainable and intensive fish production with minimal water exchange.',
      features: [
        'Zero water exchange system',
        'Microbial protein utilization',
        'High stocking density trials',
        'Cost-benefit analysis',
        'Environmental impact assessment'
      ],
      results: '30% higher productivity, 50% water savings'
    },
    {
      title: 'Integrated Aquaculture Systems',
      location: 'Field Demonstration Units',
      area: '2 hectares',
      description: 'Demonstration of integrated farming systems combining fish culture with agriculture and livestock.',
      features: [
        'Fish-rice integration',
        'Fish-poultry integration',
        'Fish-vegetable farming',
        'Nutrient cycling systems',
        'Resource optimization'
      ],
      results: '40% increase in overall farm income'
    },
    {
      title: 'Cage Culture Technology',
      location: 'Narmada River',
      area: '1 hectare water area',
      description: 'Demonstration of cage culture technology in open water bodies for community-based aquaculture.',
      features: [
        'HDPE cage installation',
        'Species selection trials',
        'Feed management protocols',
        'Environmental monitoring',
        'Community participation'
      ],
      results: '25% higher fish survival rates'
    },
    {
      title: 'Recirculating Aquaculture System (RAS)',
      location: 'College Campus',
      area: '500 sq.m',
      description: 'Advanced RAS demonstration for intensive fish production with minimal environmental impact.',
      features: [
        'Water recirculation system',
        'Biological filtration',
        'Automated monitoring',
        'Energy efficiency trials',
        'Production optimization'
      ],
      results: '90% water savings, 3x higher productivity'
    }
  ]

  const successStories = [
    {
      name: 'Ramesh Kumar Patel',
      location: 'Sagar District',
      program: 'Integrated Fish Farming',
      achievement: 'Increased income from ₹50,000 to ₹2,50,000 annually',
      story: 'After attending our integrated fish farming training, Ramesh implemented fish-rice integration on his 2-hectare farm. With technical support from MVK, he achieved remarkable success in fish production while maintaining rice cultivation.',
      impact: [
        'Income increased by 400%',
        'Created employment for 5 workers',
        'Became a model farmer in region',
        'Now training other farmers'
      ],
      year: '2023'
    },
    {
      name: 'Sunita Devi SHG',
      location: 'Jabalpur District',
      program: 'Women SHG Fish Processing',
      achievement: 'Established successful fish processing unit with ₹15 lakh annual turnover',
      story: 'A group of 12 women from Sunita Devi SHG received training in fish processing and value addition. They established a processing unit and are now supplying processed fish products to urban markets.',
      impact: [
        'Generated livelihood for 12 women',
        'Annual turnover of ₹15 lakhs',
        'Reduced post-harvest losses by 80%',
        'Inspired 5 other SHGs to start similar units'
      ],
      year: '2023'
    },
    {
      name: 'Rajesh Fish Farmers FFPO',
      location: 'Mandla District',
      program: 'FFPO Development',
      achievement: 'Collective marketing increased farmers profit by 35%',
      story: 'With support from our extension team, 45 fish farmers formed an FFPO for collective input procurement and marketing. The organization now handles procurement and marketing for all member farmers.',
      impact: [
        '45 farmers benefited',
        'Input costs reduced by 20%',
        'Market price increased by 35%',
        'Established direct market linkages'
      ],
      year: '2024'
    },
    {
      name: 'Pradeep Youth Entrepreneur',
      location: 'Seoni District',
      program: 'Entrepreneurship Development',
      achievement: 'Started ornamental fish business with ₹8 lakh annual income',
      story: 'Pradeep, a graduate, attended our entrepreneurship development program and started ornamental fish breeding. He now supplies ornamental fish to pet shops across MP and neighboring states.',
      impact: [
        'Self-employment generation',
        'Annual income of ₹8 lakhs',
        'Created jobs for 3 youth',
        'Established export linkages'
      ],
      year: '2024'
    }
  ]
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600 text-white">
        <div className="container-max section-padding">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Extension & Outreach</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Empowering fishing communities through comprehensive training programs, technology demonstrations, 
              and sustainable livelihood development initiatives.
            </p>
          </div>
        </div>
      </section>
=======
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
>>>>>>> 356a3acf66188d788cf322698f07ebf8ec85f7f3

      {/* Quick Navigation */}
      <section className="section-padding bg-white border-b">
        <div className="container-max">
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#farmer-training" className="px-6 py-3 bg-gray-100 hover:bg-primary-600 hover:text-white rounded-lg font-medium transition-colors">
              Farmer Training Programs
            </a>
            <a href="#ffpo-shg" className="px-6 py-3 bg-gray-100 hover:bg-primary-600 hover:text-white rounded-lg font-medium transition-colors">
              FFPO and SHG Support
            </a>
            <a href="#mvk-initiatives" className="px-6 py-3 bg-gray-100 hover:bg-primary-600 hover:text-white rounded-lg font-medium transition-colors">
              MVK Initiatives
            </a>
            <a href="#demonstrations" className="px-6 py-3 bg-gray-100 hover:bg-primary-600 hover:text-white rounded-lg font-medium transition-colors">
              Aquaculture Demonstrations
            </a>
            <a href="#success-stories" className="px-6 py-3 bg-gray-100 hover:bg-primary-600 hover:text-white rounded-lg font-medium transition-colors">
              Success Stories
            </a>
          </div>
        </div>
      </section>

      {/* Farmer Training Programs */}
      <section id="farmer-training" className="section-padding bg-gray-50">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Farmer Training Programs</h2>
            <div className="w-20 h-1 bg-primary-500 rounded mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Comprehensive skill development programs designed to enhance knowledge and technical capabilities 
              of fish farmers, youth, and women entrepreneurs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {farmerTrainingPrograms.map((program, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-start space-x-4 mb-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-primary-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{program.title}</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {program.duration}
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {program.participants}
                      </div>
                      <div className="flex items-center">
                        <Target className="w-4 h-4 mr-1" />
                        {program.frequency}
                      </div>
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-700 mb-4">{program.description}</p>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Training Modules</h4>
                  <ul className="space-y-2">
                    {program.modules.map((module, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-700">
                        <div className="w-2 h-2 bg-primary-500 rounded-full mr-3"></div>
                        {module}
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FFPO and SHG Support Activities */}
      <section id="ffpo-shg" className="section-padding bg-white">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">FFPO and SHG Support Activities</h2>
            <div className="w-20 h-1 bg-primary-500 rounded mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Supporting Fish Farmer Producer Organizations and Self Help Groups to strengthen 
              collective farming, marketing, and livelihood development initiatives.
            </p>
          </div>

          <div className="space-y-8">
            {ffpoShgActivities.map((activity, index) => (
              <Card key={index} className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <div className="flex items-center space-x-3 mb-4">
                      <span className="px-3 py-1 bg-secondary-100 text-secondary-800 text-sm font-medium rounded-full">
                        {activity.type}
                      </span>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{activity.title}</h3>
                    <p className="text-gray-700 mb-6">{activity.description}</p>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Key Activities</h4>
                      <ul className="space-y-2">
                        {activity.activities.map((item, idx) => (
                          <li key={idx} className="flex items-center text-sm text-gray-700">
                            <ChevronRight className="w-4 h-4 text-primary-600 mr-2" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                      <div className="text-center">
                        <Users className="w-8 h-8 text-green-600 mx-auto mb-2" />
                        <p className="text-green-800 font-medium">{activity.beneficiaries}</p>
                        <p className="text-green-600 text-sm">Beneficiaries</p>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="text-center">
                        <TrendingUp className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                        <p className="text-blue-800 font-medium text-sm">{activity.impact}</p>
                        <p className="text-blue-600 text-sm">Impact Achieved</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Matsya Vigyan Kendra (MVK) Initiatives */}
      <section id="mvk-initiatives" className="section-padding bg-gray-50">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Matsya Vigyan Kendra (MVK) Initiatives</h2>
            <div className="w-20 h-1 bg-primary-500 rounded mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Technology demonstration, transfer, and extension services to bridge the gap between 
              research and field application for sustainable aquaculture development.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {mvkInitiatives.map((initiative, index) => (
              <Card key={index} className="p-6">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                  <Lightbulb className="w-6 h-6 text-yellow-600" />
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{initiative.title}</h3>
                <p className="text-gray-700 mb-4">{initiative.description}</p>
                
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-3">Program Components</h4>
                  <ul className="space-y-2">
                    {initiative.components.map((component, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-700">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
                        {component}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Coverage</p>
                    <p className="font-semibold text-gray-900">{initiative.reach}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Beneficiaries</p>
                    <p className="font-semibold text-gray-900">{initiative.farmers}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Aquaculture Demonstrations */}
      <section id="demonstrations" className="section-padding bg-white">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Aquaculture Demonstrations</h2>
            <div className="w-20 h-1 bg-primary-500 rounded mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Live demonstrations of advanced aquaculture technologies and practices to showcase 
              practical applications and benefits for farmers and students.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {demonstrations.map((demo, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-start space-x-4 mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Target className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{demo.title}</h3>
                    <div className="flex items-center text-sm text-gray-600 mb-1">
                      <MapPin className="w-4 h-4 mr-1" />
                      {demo.location}
                    </div>
                    <p className="text-sm text-gray-600">{demo.area}</p>
                  </div>
                </div>
                
                <p className="text-gray-700 mb-4">{demo.description}</p>
                
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-3">Key Features</h4>
                  <ul className="space-y-2">
                    {demo.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-700">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                  <p className="text-green-800 font-medium text-sm">Results Achieved</p>
                  <p className="text-green-700 text-sm">{demo.results}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section id="success-stories" className="section-padding bg-gray-50">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Success Stories</h2>
            <div className="w-20 h-1 bg-primary-500 rounded mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Inspiring success stories from our extension programs showcasing the transformative 
              impact on farmers' lives and community development.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {successStories.map((story, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-start space-x-4 mb-4">
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <Award className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{story.name}</h3>
                    <div className="flex items-center text-sm text-gray-600 mb-1">
                      <MapPin className="w-4 h-4 mr-1" />
                      {story.location}
                    </div>
                    <span className="px-2 py-1 bg-primary-100 text-primary-800 text-xs rounded">
                      {story.program}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">{story.year}</span>
                </div>
                
                <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200 mb-4">
                  <p className="text-yellow-800 font-medium text-sm">{story.achievement}</p>
                </div>
                
                <p className="text-gray-700 mb-4">{story.story}</p>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Impact Achieved</h4>
                  <ul className="space-y-2">
                    {story.impact.map((impact, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-700">
                        <UserCheck className="w-4 h-4 text-primary-600 mr-2" />
                        {impact}
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
          <h2 className="text-3xl font-bold mb-4">Join Our Extension Programs</h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Be part of our comprehensive extension and outreach initiatives. Get trained, 
            grow your income, and contribute to sustainable aquaculture development.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="btn-accent"
            >
              Register for Programs
            </Link>
            
            <Link
              to="/faculty"
              className="btn-outline border-white text-white hover:bg-white hover:text-primary-600"
            >
              Meet Extension Team
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Extension