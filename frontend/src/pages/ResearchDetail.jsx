import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, User, Calendar, DollarSign, BookOpen, ExternalLink, MapPin } from 'lucide-react'
import Card from '../components/common/Card'
import Section, { SectionHeader } from '../components/common/Section'
import { researchAPI } from '../services/api'

const ResearchDetail = () => {
  const { id } = useParams()
  const [research, setResearch] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchResearch = async () => {
      try {
        setLoading(true)
        const response = await researchAPI.getById(id)
        setResearch(response.data.data.research)
        setError(null)
      } catch (error) {
        console.error('Error fetching research:', error)
        setError('Failed to load research details')
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchResearch()
    }
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen">
        <Section background="bg-gray-50">
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
            <p className="text-gray-500 mt-2">Loading research details...</p>
          </div>
        </Section>
      </div>
    )
  }

  if (error || !research) {
    return (
      <div className="min-h-screen">
        <Section background="bg-gray-50">
          <div className="text-center py-8">
            <p className="text-red-500">{error || 'Research not found'}</p>
            <Link 
              to="/research" 
              className="inline-flex items-center text-blue-600 hover:text-blue-800 mt-4"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to Research
            </Link>
          </div>
        </Section>
      </div>
    )
  }
  
  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <Section background="bg-gradient-to-br from-blue-400 via-blue-500 to-green-400 text-white">
        <div className="mb-4">
          <Link 
            to="/research" 
            className="inline-flex items-center text-blue-100 hover:text-white mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Research
          </Link>
        </div>
        <SectionHeader 
          title={research.title} 
          align="left" 
          className="text-white"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          <div className="flex items-center">
            <User className="w-5 h-5 mr-2" />
            <div>
              <div className="text-sm text-blue-100">Principal Investigator</div>
              <div className="font-medium">{research.principalInvestigator}</div>
            </div>
          </div>
          {research.duration && (research.duration.startDate || research.duration.endDate) && (
            <div className="flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              <div>
                <div className="text-sm text-blue-100">Duration</div>
                <div className="font-medium">
                  {research.duration.startDate && new Date(research.duration.startDate).toLocaleDateString()} - 
                  {research.duration.endDate && new Date(research.duration.endDate).toLocaleDateString()}
                </div>
              </div>
            </div>
          )}
          {research.fundingAgency && (
            <div className="flex items-center">
              <DollarSign className="w-5 h-5 mr-2" />
              <div>
                <div className="text-sm text-blue-100">Funding Agency</div>
                <div className="font-medium">{research.fundingAgency}</div>
              </div>
            </div>
          )}
          {research.status && (
            <div className="flex items-center">
              <div className={`w-3 h-3 rounded-full mr-2 ${
                research.status === 'Ongoing' 
                  ? 'bg-green-400' 
                  : research.status === 'Completed'
                  ? 'bg-blue-400'
                  : 'bg-gray-400'
              }`}></div>
              <div>
                <div className="text-sm text-blue-100">Status</div>
                <div className="font-medium">{research.status}</div>
              </div>
            </div>
          )}
        </div>
      </Section>

      {/* Content Sections */}
      <Section background="bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Card className="p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Research Description</h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {research.description}
              </p>
            </Card>

            {research.objectives && research.objectives.length > 0 && (
              <Card className="p-6 mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Research Objectives</h2>
                <ul className="space-y-2">
                  {research.objectives.map((objective, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-700">{objective}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            )}

            {research.methodology && (
              <Card className="p-6 mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Methodology</h2>
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {research.methodology}
                </p>
              </Card>
            )}

            {research.expectedOutcomes && research.expectedOutcomes.length > 0 && (
              <Card className="p-6 mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Expected Outcomes</h2>
                <ul className="space-y-2">
                  {research.expectedOutcomes.map((outcome, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-700">{outcome}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Research Info */}
            <Card className="p-6 mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Research Information</h3>
              <div className="space-y-4">
                {research.researchArea && (
                  <div>
                    <label className="text-sm font-medium text-gray-500">Research Area</label>
                    <p className="text-gray-900">{research.researchArea}</p>
                  </div>
                )}
                {research.keywords && research.keywords.length > 0 && (
                  <div>
                    <label className="text-sm font-medium text-gray-500">Keywords</label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {research.keywords.map((keyword, index) => (
                        <span 
                          key={index}
                          className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {research.location && (
                  <div>
                    <label className="text-sm font-medium text-gray-500">Location</label>
                    <div className="flex items-center mt-1">
                      <MapPin className="w-4 h-4 text-gray-400 mr-1" />
                      <span className="text-gray-900">{research.location}</span>
                    </div>
                  </div>
                )}
                {research.budget && (
                  <div>
                    <label className="text-sm font-medium text-gray-500">Budget</label>
                    <p className="text-gray-900">₹{research.budget.toLocaleString()}</p>
                  </div>
                )}
              </div>
            </Card>

            {/* Team Members */}
            {research.teamMembers && research.teamMembers.length > 0 && (
              <Card className="p-6 mb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Team Members</h3>
                <div className="space-y-2">
                  {research.teamMembers.map((member, index) => (
                    <div key={index} className="flex items-center">
                      <User className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-gray-700">{member}</span>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Publications */}
            {research.publications && research.publications.length > 0 && (
              <Card className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  <BookOpen className="w-5 h-5 inline mr-2" />
                  Publications ({research.publications.length})
                </h3>
                <div className="space-y-4">
                  {research.publications.map((pub, index) => (
                    <div key={index} className="border-l-4 border-blue-200 pl-4">
                      <h4 className="font-medium text-gray-900">{pub.title || 'Untitled'}</h4>
                      {pub.journal && (
                        <p className="text-sm text-gray-600 mt-1">
                          <span className="italic">{pub.journal}</span>
                          {pub.year && ` (${pub.year})`}
                        </p>
                      )}
                      {pub.authors && pub.authors.length > 0 && (
                        <p className="text-sm text-gray-500 mt-1">
                          Authors: {pub.authors.join(', ')}
                        </p>
                      )}
                      {pub.doi && (
                        <a 
                          href={`https://doi.org/${pub.doi}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-600 hover:text-blue-800 inline-flex items-center mt-1"
                        >
                          DOI: {pub.doi}
                          <ExternalLink className="w-3 h-3 ml-1" />
                        </a>
                      )}
                      {pub.url && !pub.doi && (
                        <a 
                          href={pub.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-600 hover:text-blue-800 inline-flex items-center mt-1"
                        >
                          View Publication
                          <ExternalLink className="w-3 h-3 ml-1" />
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>
        </div>
      </Section>
    </div>
  )
}

export default ResearchDetail






