import React, { useState, useEffect } from 'react'
import { Link, useLocation, useSearchParams } from 'react-router-dom'
import { Calendar, Users, MapPin, Clock, Award, BookOpen, Newspaper, FileText, ExternalLink, ChevronRight, Filter } from 'lucide-react'
import { newsAPI, uploadAPI } from '../services/api'
import Card from '../components/common/Card'
import { LoadingCard } from '../components/common/LoadingSpinner'

const NewsAndEvents = () => {
  const location = useLocation()
  const [searchParams] = useSearchParams()
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('all')
  const [activeCategory, setActiveCategory] = useState('all')

  // Set active tab based on URL query parameter or hash
  useEffect(() => {
    // Check for type query parameter first
    const typeParam = searchParams.get('type')
    if (typeParam) {
      // Map 'announcement' to 'news' tab since they're grouped together
      if (typeParam === 'announcement') {
        setActiveTab('news')
      } else {
        setActiveTab(typeParam)
      }
      return
    }
    
    // Fall back to hash-based navigation
    const hash = location.hash.substring(1)
    const tabMap = {
      'seminars': 'seminar',
      'workshops': 'workshop',
      'visits': 'visit',
      'press-releases': 'news'
    }
    
    if (hash && tabMap[hash]) {
      setActiveTab(tabMap[hash])
    } else {
      setActiveTab('all')
    }
  }, [location.hash, searchParams])

  const tabs = [
    { id: 'all', label: 'All', icon: FileText },
    { id: 'news', label: 'News & Announcements', icon: Newspaper, types: ['news', 'announcement'] },
    { id: 'seminar', label: 'Seminars & Conferences', icon: Award },
    { id: 'workshop', label: 'Workshops & Training', icon: BookOpen },
    { id: 'visit', label: 'Field Visits & Exposure', icon: MapPin },
    { id: 'event', label: 'Events', icon: Calendar },
  ]

  const categories = [
    { id: 'all', label: 'All Categories' },
    { id: 'academic', label: 'Academic' },
    { id: 'research', label: 'Research' },
    { id: 'extension', label: 'Extension' },
    { id: 'placement', label: 'Placement' },
    { id: 'general', label: 'General' },
  ]

  useEffect(() => {
    fetchItems()
  }, [activeTab, activeCategory])

  const fetchItems = async () => {
    try {
      setLoading(true)
      const params = { 
        limit: 50,
        isPublished: true 
      }
      
      // Don't send type filter for 'news' tab since it includes both news and announcement
      // We'll filter on frontend instead
      if (activeTab !== 'all' && activeTab !== 'news') {
        params.type = activeTab
      }
      
      if (activeCategory !== 'all') {
        params.category = activeCategory
      }

      const res = await newsAPI.getAll(params)
      if (res.data?.success) {
        let fetchedItems = res.data.data.newsEvents || []
        
        // Filter for 'news' tab (includes both news and announcement)
        if (activeTab === 'news') {
          fetchedItems = fetchedItems.filter(item => 
            item.type === 'news' || item.type === 'announcement'
          )
        }
        
        setItems(fetchedItems)
      } else {
        setItems([])
      }
    } catch (error) {
      console.error('Error fetching news and events:', error)
      setItems([])
    } finally {
      setLoading(false)
    }
  }

  const getTypeIcon = (type) => {
    switch (type) {
      case 'news':
      case 'announcement':
        return Newspaper
      case 'seminar':
        return Award
      case 'workshop':
        return BookOpen
      case 'visit':
        return MapPin
      case 'event':
        return Calendar
      default:
        return FileText
    }
  }

  const getTypeLabel = (type) => {
    switch (type) {
      case 'news':
        return 'News'
      case 'announcement':
        return 'Announcement'
      case 'seminar':
        return 'Seminar'
      case 'workshop':
        return 'Workshop'
      case 'visit':
        return 'Field Visit'
      case 'event':
        return 'Event'
      default:
        return type
    }
  }

  const getTypeBadgeColor = (type) => {
    switch (type) {
      case 'news':
      case 'announcement':
        return 'bg-blue-100 text-blue-800'
      case 'seminar':
        return 'bg-purple-100 text-purple-800'
      case 'workshop':
        return 'bg-green-100 text-green-800'
      case 'visit':
        return 'bg-orange-100 text-orange-800'
      case 'event':
        return 'bg-pink-100 text-pink-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    })
  }

  const isUpcoming = (eventDate) => {
    if (!eventDate) return false
    return new Date(eventDate) > new Date()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
        <div className="container-max">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              News & Events
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Stay updated with the latest news, seminars, workshops, field visits, and events at College of Fishery, Jabalpur
            </p>
          </div>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="bg-white shadow-sm sticky top-16 z-40">
        <div className="container-max">
          <div className="flex overflow-x-auto scrollbar-hide py-4 gap-2">
            {tabs.map((tab) => {
              const IconComponent = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium whitespace-nowrap transition-all ${
                    activeTab === tab.id
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <IconComponent className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="bg-white border-b">
        <div className="container-max py-4">
          <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide">
            <Filter className="w-5 h-5 text-gray-500 flex-shrink-0" />
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  activeCategory === category.id
                    ? 'bg-indigo-100 text-indigo-700 border-2 border-indigo-500'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="section-padding">
        <div className="container-max">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <LoadingCard key={i} />
              ))}
            </div>
          ) : items.length > 0 ? (
            <>
              <div className="mb-6 text-gray-600">
                Showing {items.length} {items.length === 1 ? 'item' : 'items'}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map((item) => {
                  const TypeIcon = getTypeIcon(item.type)
                  const imageUrl = item.images && item.images.length > 0 
                    ? uploadAPI.getImageUrl(item.images[0].url, 'news') 
                    : null

                  return (
                    <Card key={item._id} className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
                      {imageUrl && (
                        <div className="relative h-48 overflow-hidden">
                          <img
                            src={imageUrl}
                            alt={item.title}
                            className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                            loading="lazy"
                          />
                          {isUpcoming(item.eventDate) && (
                            <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                              Upcoming
                            </div>
                          )}
                        </div>
                      )}
                      
                      <div className="p-6">
                        {/* Type Badge */}
                        <div className="flex items-center gap-2 mb-3">
                          <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${getTypeBadgeColor(item.type)}`}>
                            <TypeIcon className="w-3 h-3" />
                            {getTypeLabel(item.type)}
                          </span>
                          {item.category && (
                            <span className="text-xs text-gray-500 capitalize">
                              {item.category}
                            </span>
                          )}
                        </div>

                        {/* Title */}
                        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
                          {item.title}
                        </h3>

                        {/* Date & Venue */}
                        <div className="space-y-2 mb-4">
                          {item.eventDate && (
                            <div className="flex items-center text-sm text-gray-600">
                              <Calendar className="w-4 h-4 mr-2 text-blue-500" />
                              <span>{formatDate(item.eventDate)}</span>
                            </div>
                          )}
                          {item.venue && (
                            <div className="flex items-center text-sm text-gray-600">
                              <MapPin className="w-4 h-4 mr-2 text-blue-500" />
                              <span className="line-clamp-1">{item.venue}</span>
                            </div>
                          )}
                          {!item.eventDate && (
                            <div className="flex items-center text-sm text-gray-500">
                              <Clock className="w-4 h-4 mr-2" />
                              <span>{formatDate(item.createdAt)}</span>
                            </div>
                          )}
                        </div>

                        {/* Excerpt */}
                        {item.excerpt && (
                          <p className="text-gray-700 text-sm line-clamp-3 mb-4">
                            {item.excerpt}
                          </p>
                        )}

                        {/* Tags */}
                        {item.tags && item.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {item.tags.slice(0, 3).map((tag, index) => (
                              <span
                                key={index}
                                className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Read More Link */}
                        <Link
                          to={`/news-and-events/${item.slug || item._id}`}
                          className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium text-sm group"
                        >
                          Read More
                          <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </Card>
                  )
                })}
              </div>
            </>
          ) : (
            <div className="text-center py-20">
              <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No items found</h3>
              <p className="text-gray-500">
                {activeTab === 'all' 
                  ? 'No news or events available at the moment.' 
                  : `No ${tabs.find(t => t.id === activeTab)?.label.toLowerCase()} available at the moment.`}
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default NewsAndEvents
