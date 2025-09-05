import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Calendar, MapPin, Users, Camera, FileText, ChevronRight, Clock, ExternalLink, Filter, Search, Eye, Newspaper } from 'lucide-react'
import { newsAPI, uploadAPI } from '../services/api'
import LoadingSpinner, { LoadingCard } from '../components/common/LoadingSpinner'
import Card from '../components/common/Card'

const NewsEvents = () => {
  const [newsEvents, setNewsEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const filters = [
    { value: 'all', label: 'All Items' },
    { value: 'news', label: 'News' },
    { value: 'event', label: 'Events' },
    { value: 'announcement', label: 'Announcements' },
    { value: 'seminar', label: 'Seminars' },
    { value: 'workshop', label: 'Workshops' },
    { value: 'visit', label: 'Visits' }
  ]

  useEffect(() => {
    fetchNewsEvents()
  }, [filter, searchTerm])

  const fetchNewsEvents = async () => {
    try {
      setLoading(true)
      setError('')
      
      const params = {
        limit: 50,
        ...(filter !== 'all' && { type: filter }),
        ...(searchTerm && { search: searchTerm })
      }
      
      const response = await newsAPI.getAll(params)
      
      if (response.data.success) {
        setNewsEvents(response.data.data.newsEvents || [])
      } else {
        setError('Failed to load news and events')
      }
    } catch (error) {
      console.error('Error fetching news and events:', error)
      setError('Failed to load news and events')
    } finally {
      setLoading(false)
    }
  }

  const getImageUrl = (images) => {
    if (images && images.length > 0 && images[0].url) {
      return uploadAPI.getImageUrl(images[0].url, 'news')
    }
    return null
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getTypeColor = (type) => {
    const colors = {
      news: 'bg-blue-100 text-blue-800',
      event: 'bg-green-100 text-green-800',
      announcement: 'bg-yellow-100 text-yellow-800',
      seminar: 'bg-purple-100 text-purple-800',
      workshop: 'bg-indigo-100 text-indigo-800',
      visit: 'bg-pink-100 text-pink-800'
    }
    return colors[type] || 'bg-gray-100 text-gray-800'
  }

  const getCategoryColor = (category) => {
    const colors = {
      academic: 'bg-blue-50 text-blue-700',
      research: 'bg-green-50 text-green-700',
      extension: 'bg-yellow-50 text-yellow-700',
      general: 'bg-gray-50 text-gray-700',
      placement: 'bg-purple-50 text-purple-700'
    }
    return colors[category] || 'bg-gray-50 text-gray-700'
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-blue-400 via-blue-500 to-green-400 text-white">
          <div className="container mx-auto px-4 py-16">
            <div className="max-w-3xl text-center mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">News & Events</h1>
              <p className="text-xl text-blue-100">
                Stay updated with the latest news, events, and announcements from our college.
              </p>
            </div>
          </div>
        </div>
        
        {/* Loading Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <LoadingCard key={i} />
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading News & Events</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-400 via-blue-500 to-green-400 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl text-center mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">News & Events</h1>
            <p className="text-xl text-blue-100 mb-8">
              Stay updated with the latest news, events, seminars, workshops, and announcements 
              from the College of Fisheries, Jabalpur.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-600 rounded-lg mb-3">
                  <Newspaper className="h-6 w-6" />
                </div>
                <div className="text-2xl font-bold">{newsEvents.filter(item => item.type === 'news').length}</div>
                <div className="text-blue-200">News Articles</div>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-600 rounded-lg mb-3">
                  <Calendar className="h-6 w-6" />
                </div>
                <div className="text-2xl font-bold">{newsEvents.filter(item => item.type === 'event').length}</div>
                <div className="text-blue-200">Events</div>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-600 rounded-lg mb-3">
                  <Users className="h-6 w-6" />
                </div>
                <div className="text-2xl font-bold">{newsEvents.filter(item => ['seminar', 'workshop'].includes(item.type)).length}</div>
                <div className="text-blue-200">Seminars & Workshops</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="flex items-center space-x-2 text-gray-600 flex-shrink-0">
              <Filter className="h-5 w-5" />
              <span className="font-medium">Filter by:</span>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search news and events..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Type Filter */}
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {filters.map((filterOption) => (
                  <option key={filterOption.value} value={filterOption.value}>
                    {filterOption.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* News & Events Grid */}
      <div className="container mx-auto px-4 py-12">
        {newsEvents.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No items found</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm ? 'Try adjusting your search criteria.' : 'No news or events have been published yet.'}
            </p>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Clear Search
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsEvents.map((item) => (
              <Card key={item._id} className="group hover:shadow-xl transition-all duration-300">
                <div className="p-6">
                  {/* Image */}
                  {getImageUrl(item.images) && (
                    <div className="mb-4">
                      <img
                        src={getImageUrl(item.images)}
                        alt={item.title}
                        className="w-full h-48 object-cover rounded-lg"
                        onError={(e) => {
                          e.target.style.display = 'none'
                        }}
                      />
                    </div>
                  )}

                  {/* Type and Category Badges */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className={`inline-block px-2 py-1 text-xs rounded-full font-medium ${getTypeColor(item.type)}`}>
                      {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                    </span>
                    <span className={`inline-block px-2 py-1 text-xs rounded-full font-medium ${getCategoryColor(item.category)}`}>
                      {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                    </span>
                    {item.isFeatured && (
                      <span className="inline-block px-2 py-1 text-xs rounded-full font-medium bg-red-100 text-red-800">
                        Featured
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h3>

                  {/* Date and Venue */}
                  <div className="flex items-center text-sm text-gray-600 mb-3">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>
                      {item.eventDate ? formatDate(item.eventDate) : formatDate(item.createdAt)}
                    </span>
                    {item.venue && (
                      <>
                        <span className="mx-2">•</span>
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{item.venue}</span>
                      </>
                    )}
                  </div>

                  {/* Excerpt */}
                  {item.excerpt && (
                    <p className="text-gray-700 text-sm mb-4 line-clamp-3">
                      {item.excerpt}
                    </p>
                  )}

                  {/* Organizer */}
                  {item.organizer && (
                    <div className="flex items-center text-sm text-gray-600 mb-4">
                      <Users className="h-4 w-4 mr-1" />
                      <span>Organized by: {item.organizer}</span>
                    </div>
                  )}

                  {/* Tags */}
                  {item.tags && item.tags.length > 0 && (
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-1">
                        {item.tags.slice(0, 3).map((tag, index) => (
                          <span
                            key={index}
                            className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                          >
                            #{tag}
                          </span>
                        ))}
                        {item.tags.length > 3 && (
                          <span className="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                            +{item.tags.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Views and Read More */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center text-sm text-gray-500">
                      <Eye className="h-4 w-4 mr-1" />
                      <span>{item.views || 0} views</span>
                    </div>
                    <Link
                      to={`/news/${item._id}`}
                      className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      Read More
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* CTA Section */}
      <div className="bg-blue-50 py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Stay Connected</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Don't miss out on important updates, events, and opportunities. 
            Follow us for the latest news from the College of Fisheries.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-flex items-center"
            >
              Contact Us
              <ChevronRight className="h-5 w-5 ml-2" />
            </Link>
            
            <Link
              to="/about"
              className="border border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewsEvents
