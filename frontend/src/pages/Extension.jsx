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
      <section className="bg-gradient-to-br from-blue-400 via-blue-500 to-green-400 text-white">
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



      {/* Farmer Training Programs */}
      <section id="farmer-training" className="section-padding bg-gray-50">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Farmer Training Programs</h2>
            <div className="w-20 h-1 bg-blue-400 rounded mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Comprehensive skill development programs designed to enhance knowledge and technical capabilities 
              of fish farmers, youth, and women entrepreneurs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {farmerTrainingPrograms.map((program, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-start space-x-4 mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-blue-500" />
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
                        <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
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
            <div className="w-20 h-1 bg-blue-400 rounded mx-auto mb-6"></div>
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
                            <ChevronRight className="w-4 h-4 text-blue-500 mr-2" />
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
            <div className="w-20 h-1 bg-blue-400 rounded mx-auto mb-6"></div>
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
            <div className="w-20 h-1 bg-blue-400 rounded mx-auto mb-6"></div>
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
            <div className="w-20 h-1 bg-blue-400 rounded mx-auto mb-6"></div>
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
                    <span className="px-2 py-1 bg-blue-100 text-primary-800 text-xs rounded">
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
                        <UserCheck className="w-4 h-4 text-blue-500 mr-2" />
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
      <section className="section-padding bg-blue-500 text-white">
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
              className="btn-outline border-white text-white hover:bg-white hover:text-blue-500"
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






