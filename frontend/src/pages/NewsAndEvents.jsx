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
    <div className="min-h-screen text-left">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 text-white relative overflow-hidden section-padding">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-16 left-16 w-40 h-40 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-16 right-16 w-32 h-32 bg-yellow-300 rounded-full blur-2xl"></div>
          <div className="absolute top-1/2 left-1/3 w-28 h-28 bg-orange-300 rounded-full blur-2xl"></div>
          <div className="absolute bottom-10 left-1/4 w-44 h-44 bg-red-300 rounded-full blur-4xl"></div>
        </div>
        
        {/* News/events themed floating elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* News and media symbols */}
          <div className="absolute top-20 right-20 w-10 h-8 bg-orange-300/15 rounded animate-float transform rotate-12" style={{animationDelay: '0s'}}></div>
          <div className="absolute bottom-24 left-24 w-8 h-8 bg-red-300/20 rounded-full animate-float transform -rotate-12" style={{animationDelay: '2s'}}></div>
          
          {/* Event symbols */}
          <div className="absolute top-1/3 left-1/4 w-6 h-6 bg-white/15 rounded-full animate-bounce" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-1/3 right-1/4 w-12 h-6 bg-pink-300/25 rounded-lg animate-bounce transform rotate-45" style={{animationDelay: '3s'}}></div>
          <div className="absolute top-1/4 right-1/3 w-4 h-8 bg-orange-300/20 rounded-full animate-pulse" style={{animationDelay: '1.5s'}}></div>
          <div className="absolute bottom-1/4 left-1/3 w-8 h-4 bg-red-300/15 rounded-full animate-float" style={{animationDelay: '2.5s'}}></div>
        </div>
        
        <div className="container-max relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              News & Events
            </h1>
            <p className="text-xl text-orange-100 mb-8">
              Stay updated with the latest news, seminars, workshops, field visits, and events at College of Fishery, Jabalpur
            </p>
          </div>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="bg-gradient-to-r from-white via-orange-50 to-red-50 shadow-lg sticky top-16 z-40 border-b border-orange-100">
        <div className="container-max">
          <div className="flex overflow-x-auto scrollbar-hide py-6 gap-3">
            {tabs.map((tab) => {
              const IconComponent = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 px-6 py-3 rounded-xl font-semibold whitespace-nowrap transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-orange-50 border border-orange-200'
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
      <section className="bg-gradient-to-r from-gray-50 via-orange-50 to-red-50 border-b border-orange-100">
        <div className="container-max py-6">
          <div className="flex items-center gap-4 overflow-x-auto scrollbar-hide">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-100 to-red-200 rounded-xl flex items-center justify-center flex-shrink-0">
              <Filter className="w-5 h-5 text-orange-600" />
            </div>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-105 ${
                  activeCategory === category.id
                    ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white border-2 border-orange-400'
                    : 'bg-white text-gray-600 hover:bg-orange-50 border border-orange-200'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="section-padding bg-gradient-to-br from-gray-50 via-orange-50 to-red-100 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-15">
          <div className="absolute top-20 right-20 w-40 h-40 bg-orange-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-48 h-48 bg-red-400 rounded-full blur-4xl"></div>
          <div className="absolute top-1/3 left-1/2 w-32 h-32 bg-pink-400 rounded-full blur-2xl"></div>
        </div>

        {/* News-themed floating elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-24 left-24 w-8 h-8 bg-orange-500/20 rounded-full animate-pulse" style={{animationDelay: '0s'}}></div>
          <div className="absolute bottom-40 right-40 w-12 h-6 bg-red-500/25 rounded-lg animate-float transform rotate-45" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-1/2 right-1/4 w-6 h-6 bg-pink-500/20 rounded-full animate-bounce" style={{animationDelay: '1s'}}></div>
        </div>

        <div className="container-max relative z-10">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-orange-100/50 animate-pulse">
                  <div className="h-48 bg-gray-300 rounded-xl mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-6 bg-gray-300 rounded mb-4"></div>
                  <div className="h-3 bg-gray-300 rounded mb-2"></div>
                  <div className="h-3 bg-gray-300 rounded"></div>
                </div>
              ))}
            </div>
          ) : items.length > 0 ? (
            <>
              <div className="mb-8 bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-orange-100/50 shadow-md">
                <p className="text-gray-600 font-medium">
                  Showing {items.length} {items.length === 1 ? 'item' : 'items'}
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {items.map((item) => {
                  const TypeIcon = getTypeIcon(item.type)
                  const imageUrl = item.images && item.images.length > 0 
                    ? uploadAPI.getImageUrl(item.images[0].url, 'news') 
                    : null

                  return (
                    <div key={item._id} className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-orange-100/50 group hover:scale-105 relative overflow-hidden">
                      {/* Card corner decorations */}
                      <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-orange-400/20 to-red-500/20 rounded-full transform -translate-x-10 -translate-y-10 group-hover:scale-110 transition-transform duration-300"></div>
                      <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-pink-400/15 to-orange-500/15 rounded-full transform translate-x-12 translate-y-12 group-hover:scale-110 transition-transform duration-300"></div>
                      
                      {/* Subtle pattern overlay */}
                      <div className="absolute inset-0 opacity-5 bg-gradient-to-br from-orange-600 via-transparent to-red-600"></div>

                      {imageUrl && (
                        <div className="relative h-48 overflow-hidden rounded-t-2xl">
                          <img
                            src={imageUrl}
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            loading="lazy"
                          />
                          {isUpcoming(item.eventDate) && (
                            <div className="absolute top-4 right-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-3 py-2 rounded-full text-xs font-bold shadow-lg">
                              Upcoming
                            </div>
                          )}
                          {/* Image overlay gradient */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                        </div>
                      )}
                      
                      <div className="p-6 relative z-10">
                        {/* Type Badge */}
                        <div className="flex items-center gap-3 mb-4">
                          <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold shadow-sm ${getTypeBadgeColor(item.type)}`}>
                            <TypeIcon className="w-4 h-4" />
                            {getTypeLabel(item.type)}
                          </span>
                          {item.category && (
                            <span className="text-xs text-gray-500 capitalize bg-gray-100 px-2 py-1 rounded-full">
                              {item.category}
                            </span>
                          )}
                        </div>

                        {/* Title */}
                        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-orange-600 transition-colors duration-300">
                          {item.title}
                        </h3>

                        {/* Date & Venue */}
                        <div className="space-y-3 mb-4">
                          {item.eventDate && (
                            <div className="flex items-center text-sm text-gray-600 bg-gradient-to-r from-orange-50 to-red-50 p-2 rounded-lg border border-orange-200/50">
                              <Calendar className="w-4 h-4 mr-2 text-orange-500" />
                              <span className="font-medium">{formatDate(item.eventDate)}</span>
                            </div>
                          )}
                          {item.venue && (
                            <div className="flex items-center text-sm text-gray-600 bg-gradient-to-r from-red-50 to-pink-50 p-2 rounded-lg border border-red-200/50">
                              <MapPin className="w-4 h-4 mr-2 text-red-500" />
                              <span className="line-clamp-1 font-medium">{item.venue}</span>
                            </div>
                          )}
                          {!item.eventDate && (
                            <div className="flex items-center text-sm text-gray-500 bg-gray-50 p-2 rounded-lg border border-gray-200/50">
                              <Clock className="w-4 h-4 mr-2" />
                              <span className="font-medium">{formatDate(item.createdAt)}</span>
                            </div>
                          )}
                        </div>

                        {/* Excerpt */}
                        {item.excerpt && (
                          <div className="bg-gradient-to-r from-orange-50 to-red-50 p-4 rounded-xl border border-orange-200/50 mb-4">
                            <p className="text-gray-700 text-sm line-clamp-3 leading-relaxed">
                              {item.excerpt}
                            </p>
                          </div>
                        )}

                        {/* Tags */}
                        {item.tags && item.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {item.tags.slice(0, 3).map((tag, index) => (
                              <span
                                key={index}
                                className="text-xs bg-gradient-to-r from-gray-100 to-orange-100 text-gray-600 px-3 py-1 rounded-full border border-gray-200"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Read More Link */}
                        <Link
                          to={`/news-and-events/${item.slug || item._id}`}
                          className="inline-flex items-center bg-gradient-to-r from-orange-500 to-red-600 text-white px-4 py-2 rounded-xl font-semibold text-sm group/link hover:from-orange-600 hover:to-red-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
                        >
                          Read More
                          <ChevronRight className="w-4 h-4 ml-2 group-hover/link:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  )
                })}
              </div>
            </>
          ) : (
            <div className="text-center py-20">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-12 border border-orange-200/50 shadow-lg max-w-md mx-auto">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-100 to-red-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <FileText className="w-10 h-10 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">No items found</h3>
                <p className="text-gray-600 leading-relaxed">
                  {activeTab === 'all' 
                    ? 'No news or events available at the moment.' 
                    : `No ${tabs.find(t => t.id === activeTab)?.label.toLowerCase()} available at the moment.`}
                </p>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default NewsAndEvents
