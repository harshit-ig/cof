import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Calendar, MapPin, Clock, Tag, ArrowLeft, Download, FileText, Share2 } from 'lucide-react'
import { newsAPI, uploadAPI } from '../services/api'
import { LoadingCard } from '../components/common/LoadingSpinner'
import toast from 'react-hot-toast'

const NewsAndEventsDetail = () => {
  const { id } = useParams() // This now accepts both slug and ID
  const navigate = useNavigate()
  const [item, setItem] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchItemDetail()
  }, [id])

  const fetchItemDetail = async () => {
    try {
      setLoading(true)
      const res = await newsAPI.getById(id) // Backend now supports both slug and ID
      if (res.data?.success) {
        const newsEvent = res.data.data.newsEvent
        setItem(newsEvent)
        
        // Update URL to use slug if currently using ID
        if (newsEvent.slug && id !== newsEvent.slug && id.match(/^[0-9a-fA-F]{24}$/)) {
          navigate(`/news-and-events/${newsEvent.slug}`, { replace: true })
        }
        
        // Update page title for SEO
        document.title = `${newsEvent.title} - College of Forestry`
      } else {
        setError('Item not found')
      }
    } catch (error) {
      console.error('Error fetching item detail:', error)
      setError('Failed to load item')
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
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
    const isEvent = ['event', 'seminar', 'workshop', 'visit'].includes(type)
    return isEvent 
      ? 'bg-purple-600 text-white' 
      : 'bg-blue-600 text-white'
  }

  const isEventType = (type) => {
    return ['event', 'seminar', 'workshop', 'visit'].includes(type)
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: item.title,
        text: item.excerpt,
        url: window.location.href,
      }).catch(console.error)
    } else {
      navigator.clipboard.writeText(window.location.href)
      toast.success('Link copied to clipboard!')
    }
  }

  const getFileIcon = (type) => {
    if (type?.includes('pdf')) return '📄'
    if (type?.includes('word') || type?.includes('doc')) return '📝'
    return '📎'
  }

  const getFileSize = (url) => {
    // This would need backend support to get actual file size
    // For now, return placeholder
    return 'PDF Document'
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container-max">
          <LoadingCard />
        </div>
      </div>
    )
  }

  if (error || !item) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container-max text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Item Not Found</h2>
          <p className="text-gray-600 mb-6">{error || 'The requested item could not be found.'}</p>
          <Link
            to="/news-and-events"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to News & Events
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb Header */}
      <div className="bg-white shadow-sm">
        <div className="container-max py-4">
          <button
            onClick={() => navigate('/news-and-events')}
            className="inline-flex items-center text-gray-600 hover:text-blue-600 font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to All News & Events
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-max py-8">
        <div className="max-w-4xl mx-auto">
          <article className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {/* Hero Image */}
            {item.images && item.images.length > 0 && (
              <div className="relative h-96 bg-gray-200">
                <img
                  src={uploadAPI.getImageUrl(item.images[0].url, 'news')}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className={`px-4 py-2 rounded-full text-sm font-bold shadow-lg ${getTypeBadgeColor(item.type)}`}>
                    {getTypeLabel(item.type)}
                  </span>
                </div>
              </div>
            )}

            {/* Article Header */}
            <div className="p-8 md:p-12">
              {/* Title Section */}
              <div className="mb-6">
                {!item.images?.length && (
                  <div className="mb-4">
                    <span className={`inline-block px-4 py-2 rounded-full text-sm font-bold ${getTypeBadgeColor(item.type)}`}>
                      {getTypeLabel(item.type)}
                    </span>
                  </div>
                )}
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                  {item.title}
                </h1>
              </div>

              {/* Meta Bar */}
              <div className="flex flex-wrap items-center gap-4 pb-6 mb-6 border-b border-gray-200">
                <div className="flex items-center text-gray-600 text-sm">
                  <Clock className="w-4 h-4 mr-2" />
                  {formatDate(item.createdAt)}
                </div>
                {item.category && (
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium capitalize">
                    {item.category}
                  </span>
                )}
                {item.isFeatured && (
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-bold">
                    ⭐ Featured
                  </span>
                )}
                <button
                  onClick={handleShare}
                  className="ml-auto text-gray-500 hover:text-blue-600 transition-colors"
                  title="Share"
                >
                  <Share2 className="w-5 h-5" />
                </button>
              </div>

              {/* Event Details Card */}
              {isEventType(item.type) && (item.eventDate || item.venue || item.organizer) && (
                <div className="mb-8 p-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl border border-purple-200">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Event Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {item.eventDate && (
                      <div className="flex items-start">
                        <Calendar className="w-5 h-5 text-purple-600 mr-3 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Date</p>
                          <p className="text-gray-900 font-medium">{formatDate(item.eventDate)}</p>
                        </div>
                      </div>
                    )}
                    {item.venue && (
                      <div className="flex items-start">
                        <MapPin className="w-5 h-5 text-purple-600 mr-3 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Venue</p>
                          <p className="text-gray-900 font-medium">{item.venue}</p>
                        </div>
                      </div>
                    )}
                    {item.organizer && (
                      <div className="flex items-start">
                        <FileText className="w-5 h-5 text-purple-600 mr-3 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Organized By</p>
                          <p className="text-gray-900 font-medium">{item.organizer}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Excerpt */}
              {item.excerpt && (
                <div className="mb-8">
                  <p className="text-xl text-gray-700 leading-relaxed font-medium">
                    {item.excerpt}
                  </p>
                </div>
              )}

              {/* Main Content */}
              <div className="prose prose-lg max-w-none mb-8">
                <div
                  className="text-gray-700 leading-relaxed whitespace-pre-line"
                  style={{ whiteSpace: 'pre-wrap' }}
                >
                  {item.content}
                </div>
              </div>

              {/* Attachments Section - Enhanced */}
              {item.attachments && item.attachments.length > 0 && (
                <div className="mb-8 p-6 bg-blue-50 rounded-xl border border-blue-200">
                  <div className="flex items-center mb-4">
                    <Download className="w-5 h-5 text-blue-600 mr-2" />
                    <h3 className="text-lg font-bold text-gray-900">
                      Download Resources ({item.attachments.length})
                    </h3>
                  </div>
                  <div className="grid gap-3">
                    {item.attachments.map((attachment, index) => (
                      <a
                        key={index}
                        href={uploadAPI.getImageUrl(attachment.url, 'documents')}
                        target="_blank"
                        rel="noopener noreferrer"
                        download
                        className="flex items-center justify-between p-4 bg-white rounded-lg hover:shadow-md transition-all border border-blue-100 hover:border-blue-300 group"
                      >
                        <div className="flex items-center flex-1 min-w-0">
                          <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-2xl group-hover:bg-blue-200 transition-colors">
                            {getFileIcon(attachment.type)}
                          </div>
                          <div className="ml-4 flex-1 min-w-0">
                            <p className="font-semibold text-gray-900 truncate group-hover:text-blue-600 transition-colors">
                              {attachment.name}
                            </p>
                            <p className="text-sm text-gray-500">
                              {getFileSize(attachment.url)}
                            </p>
                          </div>
                        </div>
                        <div className="ml-4 flex-shrink-0">
                          <div className="flex items-center justify-center w-10 h-10 bg-blue-600 text-white rounded-lg group-hover:bg-blue-700 transition-colors">
                            <Download className="w-5 h-5" />
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Image Gallery */}
              {item.images && item.images.length > 1 && (
                <div className="mb-8">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Gallery</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {item.images.slice(1).map((image, index) => (
                      <div key={index} className="group relative rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all">
                        <img
                          src={uploadAPI.getImageUrl(image.url, 'news')}
                          alt={image.caption || `Gallery image ${index + 1}`}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        {image.caption && (
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                            <p className="text-sm text-white font-medium">
                              {image.caption}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tags */}
              {item.tags && item.tags.length > 0 && (
                <div className="mb-8">
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
                      >
                        <Tag className="w-3.5 h-3.5 mr-1.5" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Footer Navigation */}
              <div className="pt-6 border-t border-gray-200">
                <button
                  onClick={() => navigate('/news-and-events')}
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-md hover:shadow-lg"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  View All News & Events
                </button>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  )
}

export default NewsAndEventsDetail
