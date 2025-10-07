import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Users, Award, Target, Lightbulb, ChevronRight, MapPin, Calendar, TrendingUp, BookOpen, UserCheck, Download, FileText } from 'lucide-react'
import Card from '../components/common/Card'
import { getDocumentUrl } from '../services/files'
import { extensionAPI } from '../services/api'

const Extension = () => {
  const [loading, setLoading] = useState(true)
  const [extensionData, setExtensionData] = useState({
    'farmer-training': [],
    'ffpo-shg': [],
    'demonstrations': [],
    'success-stories': []
  })

  useEffect(() => {
    fetchExtensionData()
  }, [])

  const fetchExtensionData = async () => {
    try {
      setLoading(true)
      console.log('Fetching extension data...')
      const response = await extensionAPI.getPublic()
      console.log('Extension API response:', response)
      if (response.data.success) {
        console.log('Extension data received:', response.data.data.extensions)
        setExtensionData(response.data.data.extensions || {
          'farmer-training': [],
          'ffpo-shg': [],
          'demonstrations': [],
          'success-stories': []
        })
      } else {
        console.error('API returned success: false', response.data)
      }
    } catch (error) {
      console.error('Error fetching extension data:', error)
      // Keep default empty structure if fetch fails
    } finally {
      setLoading(false)
    }
  }

  // Fallback static data for compatibility (in case API is empty)
  const farmerTrainingPrograms = extensionData['farmer-training'] || []
  const ffpoShgActivities = extensionData['ffpo-shg'] || []
  const demonstrations = extensionData['demonstrations'] || []
  const successStories = extensionData['success-stories'] || []

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading extension data...</p>
        </div>
      </div>
    )
  }
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white">
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
            {farmerTrainingPrograms.length > 0 ? farmerTrainingPrograms.map((program, index) => (
              <Card key={program._id || index} className="p-6">
                <div className="flex items-start space-x-4 mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-blue-500" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{program.title}</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
                      {program.duration && (
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {program.duration}
                        </div>
                      )}
                      {program.participants && (
                        <div className="flex items-center">
                          <Users className="w-4 h-4 mr-1" />
                          {program.participants}
                        </div>
                      )}
                      {program.frequency && (
                        <div className="flex items-center">
                          <Target className="w-4 h-4 mr-1" />
                          {program.frequency}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-700 mb-4">{program.description}</p>
                
                {program.modules && program.modules.length > 0 && (
                  <div className="mb-4">
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
                )}

                {/* PDF Download */}
                {program.filename && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <a
                      href={getDocumentUrl(program.filename)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-3 py-2 bg-blue-100 text-blue-700 text-sm rounded-md hover:bg-blue-200 transition-colors"
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      <Download className="w-4 h-4 mr-2" />
                      Download PDF
                    </a>
                  </div>
                )}
              </Card>
            )) : (
              <div className="col-span-2 text-center py-12">
                <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No farmer training programs available at the moment.</p>
              </div>
            )}
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
            {ffpoShgActivities.length > 0 ? ffpoShgActivities.map((activity, index) => (
              <Card key={activity._id || index} className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <div className="flex items-center space-x-3 mb-4">
                      <span className="px-3 py-1 bg-secondary-100 text-secondary-800 text-sm font-medium rounded-full">
                        {activity.type}
                      </span>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{activity.title}</h3>
                    <p className="text-gray-700 mb-6">{activity.description}</p>
                    
                    {activity.activities && activity.activities.length > 0 && (
                      <div className="mb-6">
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
                    )}

                    {/* PDF Download */}
                    {activity.filename && (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <a
                          href={getDocumentUrl(activity.filename)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-3 py-2 bg-blue-100 text-blue-700 text-sm rounded-md hover:bg-blue-200 transition-colors"
                        >
                          <FileText className="w-4 h-4 mr-2" />
                          <Download className="w-4 h-4 mr-2" />
                          Download PDF
                        </a>
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-4">
                    {activity.beneficiaries && (
                      <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                        <div className="text-center">
                          <Users className="w-8 h-8 text-green-600 mx-auto mb-2" />
                          <p className="text-green-800 font-medium">{activity.beneficiaries}</p>
                          <p className="text-green-600 text-sm">Beneficiaries</p>
                        </div>
                      </div>
                    )}
                    
                    {activity.impact && (
                      <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="text-center">
                          <TrendingUp className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                          <p className="text-blue-800 font-medium text-sm">{activity.impact}</p>
                          <p className="text-blue-600 text-sm">Impact Achieved</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            )) : (
              <div className="text-center py-12">
                <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No FFPO/SHG activities available at the moment.</p>
              </div>
            )}
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
            {demonstrations.length > 0 ? demonstrations.map((demo, index) => (
              <Card key={demo._id || index} className="p-6">
                <div className="flex items-start space-x-4 mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Target className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{demo.title}</h3>
                    {demo.location && (
                      <div className="flex items-center text-sm text-gray-600 mb-1">
                        <MapPin className="w-4 h-4 mr-1" />
                        {demo.location}
                      </div>
                    )}
                    {demo.area && (
                      <p className="text-sm text-gray-600">{demo.area}</p>
                    )}
                  </div>
                </div>
                
                <p className="text-gray-700 mb-4">{demo.description}</p>
                
                {demo.features && demo.features.length > 0 && (
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
                )}
                
                {demo.results && (
                  <div className="mb-4">
                    <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                      <p className="text-green-800 font-medium text-sm">Results Achieved</p>
                      <p className="text-green-700 text-sm">{demo.results}</p>
                    </div>
                  </div>
                )}

                {/* PDF Download */}
                {demo.filename && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <a
                      href={getDocumentUrl(demo.filename)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-3 py-2 bg-blue-100 text-blue-700 text-sm rounded-md hover:bg-blue-200 transition-colors"
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      <Download className="w-4 h-4 mr-2" />
                      Download PDF
                    </a>
                  </div>
                )}
              </Card>
            )) : (
              <div className="col-span-2 text-center py-12">
                <Target className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No demonstration projects available at the moment.</p>
              </div>
            )}
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
            {successStories.length > 0 ? successStories.map((story, index) => (
              <Card key={story._id || index} className="p-6">
                <div className="flex items-start space-x-4 mb-4">
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <Award className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{story.name || 'Success Story'}</h3>
                    {story.location && (
                      <div className="flex items-center text-sm text-gray-600 mb-1">
                        <MapPin className="w-4 h-4 mr-1" />
                        {story.location}
                      </div>
                    )}
                    {story.program && (
                      <span className="px-2 py-1 bg-blue-100 text-primary-800 text-xs rounded">
                        {story.program}
                      </span>
                    )}
                  </div>
                  {story.year && (
                    <span className="text-sm text-gray-500">{story.year}</span>
                  )}
                </div>
                
                {story.achievement && (
                  <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200 mb-4">
                    <p className="text-yellow-800 font-medium text-sm">{story.achievement}</p>
                  </div>
                )}
                
                <p className="text-gray-700 mb-4">{story.story || story.description}</p>
                
                {story.impactPoints && story.impactPoints.length > 0 && (
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-3">Impact Achieved</h4>
                    <ul className="space-y-2">
                      {story.impactPoints.map((impact, idx) => (
                        <li key={idx} className="flex items-center text-sm text-gray-700">
                          <UserCheck className="w-4 h-4 text-blue-500 mr-2" />
                          {impact}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* PDF Download */}
                {story.filename && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <a
                      href={getDocumentUrl(story.filename)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-3 py-2 bg-blue-100 text-blue-700 text-sm rounded-md hover:bg-blue-200 transition-colors"
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      <Download className="w-4 h-4 mr-2" />
                      Download PDF
                    </a>
                  </div>
                )}
              </Card>
            )) : (
              <div className="col-span-2 text-center py-12">
                <Award className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No success stories available at the moment.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Extension






