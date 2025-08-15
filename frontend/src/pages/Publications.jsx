import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FileText, Download, ExternalLink, BookOpen, Newspaper, Award, Users, Calendar, FlaskConical, Leaf } from 'lucide-react'
import Card from '../components/common/Card'

const Publications = () => {
  const location = useLocation()
  const hash = location.hash.substring(1)

  const publications = [
    {
      id: 'extension-leaflet',
      title: 'Extension Leaflets',
      icon: FileText,
      description: 'Educational materials and guides for fish farmers and aquaculture practitioners.',
      items: [
        {
          title: 'Fish Farming Techniques',
          author: 'Dr. Rajesh Kumar',
          date: '2024',
          type: 'Extension Leaflet',
          downloadUrl: '#'
        },
        {
          title: 'Disease Management in Aquaculture',
          author: 'Dr. Priya Sharma',
          date: '2023',
          type: 'Extension Leaflet',
          downloadUrl: '#'
        },
        {
          title: 'Feed Management for Fish',
          author: 'Dr. Amit Patel',
          date: '2023',
          type: 'Extension Leaflet',
          downloadUrl: '#'
        }
      ]
    },
    {
      id: 'research-papers',
      title: 'Research Papers',
      icon: BookOpen,
      description: 'Scientific publications and research findings from our faculty and students.',
      items: [
        {
          title: 'Impact of Climate Change on Fish Production',
          author: 'Dr. Shashikant Mahajan et al.',
          date: '2024',
          type: 'Research Paper',
          journal: 'Journal of Fisheries Science',
          downloadUrl: '#'
        },
        {
          title: 'Sustainable Aquaculture Practices',
          author: 'Dr. Meera Singh et al.',
          date: '2023',
          type: 'Research Paper',
          journal: 'Aquaculture Research',
          downloadUrl: '#'
        }
      ]
    },
    {
      id: 'annual-reports',
      title: 'Annual Reports',
      icon: Newspaper,
      description: 'Yearly reports highlighting achievements, activities, and future plans.',
      items: [
        {
          title: 'Annual Report 2023-24',
          author: 'College of Fisheries',
          date: '2024',
          type: 'Annual Report',
          downloadUrl: '#'
        },
        {
          title: 'Annual Report 2022-23',
          author: 'College of Fisheries',
          date: '2023',
          type: 'Annual Report',
          downloadUrl: '#'
        }
      ]
    }
  ]

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const headerOffset = 100
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  // Scroll to section when hash changes
  React.useEffect(() => {
    if (hash) {
      setTimeout(() => scrollToSection(hash), 100)
    }
  }, [hash])

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600 text-white">
        <div className="container-max section-padding">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Publications</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Explore our research publications, extension materials, and academic resources 
              contributing to fisheries science and aquaculture knowledge
            </p>
          </div>
        </div>
      </section>

      {/* Publications Overview */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Publications</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Discover a wide range of publications including research papers, extension leaflets, 
              and annual reports that showcase our commitment to knowledge dissemination
            </p>
          </div>

          {/* Publication Categories */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {publications.map((category) => (
              <Card key={category.id} className="text-center hover:shadow-xl transition-all duration-300">
                <div className="p-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <category.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{category.title}</h3>
                  <p className="text-gray-600 mb-4">{category.description}</p>
                  
                  <Link
                    to={`/publications#${category.id}`}
                    className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
                  >
                    View Publications
                    <ExternalLink className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Publications */}
      <section className="section-padding bg-gray-50">
        <div className="container-max">
          {publications.map((category) => (
            <div key={category.id} id={category.id} className="mb-16">
              <Card>
                <div className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center mr-6">
                      <category.icon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-gray-900">{category.title}</h3>
                      <p className="text-lg text-gray-600 mt-2">{category.description}</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {category.items.map((item, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                          <div className="flex-1">
                            <h4 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h4>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600">
                              <div className="flex items-center">
                                <Users className="w-4 h-4 mr-2 text-primary-500" />
                                <span>{item.author}</span>
                              </div>
                              
                              <div className="flex items-center">
                                <Calendar className="w-4 h-4 mr-2 text-primary-500" />
                                <span>{item.date}</span>
                              </div>
                              
                              <div className="flex items-center">
                                <FileText className="w-4 h-4 mr-2 text-primary-500" />
                                <span>{item.type}</span>
                              </div>
                              
                              {item.journal && (
                                <div className="flex items-center">
                                  <BookOpen className="w-4 h-4 mr-2 text-primary-500" />
                                  <span>{item.journal}</span>
                                </div>
                              )}
                            </div>
                          </div>
                          
                          <div className="mt-4 lg:mt-0 lg:ml-6">
                            <a
                              href={item.downloadUrl}
                              className="inline-flex items-center px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-md hover:bg-primary-700 transition-colors"
                            >
                              <Download className="w-4 h-4 mr-2" />
                              Download
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </section>

      {/* Research Highlights */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Research Highlights</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Key research areas and recent breakthroughs in fisheries science and aquaculture
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="text-center p-6">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Sustainable Aquaculture</h3>
              <p className="text-gray-600">
                Research on eco-friendly aquaculture practices and environmental conservation
              </p>
            </Card>

            <Card className="text-center p-6">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <FlaskConical className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Fish Health Management</h3>
              <p className="text-gray-600">
                Studies on disease prevention and health management in aquatic organisms
              </p>
            </Card>

            <Card className="text-center p-6">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Leaf className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Feed Technology</h3>
              <p className="text-gray-600">
                Development of nutritious and sustainable feed formulations for fish
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section-padding bg-primary-600 text-white">
        <div className="container-max text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated with Our Research</h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Access our latest publications and stay informed about advancements in fisheries science 
            and aquaculture research
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/research"
              className="btn-accent"
            >
              View Research
            </Link>
            
            <Link
              to="/contact"
              className="btn-outline border-white text-white hover:bg-white hover:text-primary-600"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Publications 