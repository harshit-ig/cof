import React, { useState, useEffect } from 'react'
import { Download, FileText, Calendar, Eye, Search, Filter } from 'lucide-react'
import { farmersAPI } from '../services/api'
import Card from '../components/common/Card'
import toast from 'react-hot-toast'

const FarmersCorner = () => {
  const [resources, setResources] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    category: '',
    search: '',
    page: 1,
    limit: 12
  })
  const [pagination, setPagination] = useState({})

  const categories = [
    { value: '', label: 'All Categories' },
    { value: 'advisory', label: 'Advisory Services' },
    { value: 'training', label: 'Training Materials' },
    { value: 'techniques', label: 'Aquaculture Techniques' },
    { value: 'research', label: 'Research Papers' },
    { value: 'government-schemes', label: 'Government Schemes' },
    { value: 'other', label: 'Other Resources' }
  ]

  useEffect(() => {
    fetchResources()
  }, [filters])

  const fetchResources = async () => {
    try {
      setLoading(true)
      const response = await farmersAPI.getResources(filters)
      if (response.data.success) {
        setResources(response.data.data.resources)
        setPagination(response.data.data.pagination)
      }
    } catch (error) {
      console.error('Error fetching resources:', error)
      toast.error('Failed to fetch resources')
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = (resource) => {
    // Open download link in new tab
    window.open(farmersAPI.downloadResource(resource._id), '_blank')
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    setFilters({ ...filters, page: 1 })
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-green-400 via-blue-500 to-green-600 text-white">
        <div className="container-max">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Farmers Corner
            </h1>
            <p className="text-xl text-green-100 mb-8">
              Access comprehensive resources, guides, and materials to enhance your aquaculture knowledge and farming practices
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                <FileText className="w-8 h-8 mx-auto mb-2 text-green-200" />
                <h3 className="font-semibold">Technical Guides</h3>
                <p className="text-sm text-green-100">Download PDF guides and manuals</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                <Download className="w-8 h-8 mx-auto mb-2 text-blue-200" />
                <h3 className="font-semibold">Free Resources</h3>
                <p className="text-sm text-blue-100">All materials are free to download</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                <Eye className="w-8 h-8 mx-auto mb-2 text-green-200" />
                <h3 className="font-semibold">Easy Access</h3>
                <p className="text-sm text-green-100">View online or download for offline use</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="section-padding bg-gray-50">
        <div className="container-max">
          <Card className="p-6 mb-8">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              <div className="flex flex-col sm:flex-row gap-4 items-center">
                <div className="flex items-center gap-2">
                  <Filter className="w-5 h-5 text-gray-600" />
                  <span className="font-medium text-gray-700">Filter by Category:</span>
                </div>
                <select
                  value={filters.category}
                  onChange={(e) => setFilters({ ...filters, category: e.target.value, page: 1 })}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                >
                  {categories.map(cat => (
                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                  ))}
                </select>
              </div>

              <form onSubmit={handleSearchSubmit} className="flex gap-2 w-full lg:w-auto">
                <div className="relative flex-1 lg:w-80">
                  <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search resources..."
                    value={filters.search}
                    onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Search
                </button>
              </form>
            </div>
          </Card>

          {/* Resources Grid */}
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="spinner"></div>
            </div>
          ) : resources.length === 0 ? (
            <Card className="p-12 text-center">
              <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Resources Found</h3>
              <p className="text-gray-600">
                {filters.category || filters.search 
                  ? 'Try adjusting your filters or search terms.' 
                  : 'Resources will be available here soon.'}
              </p>
            </Card>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {resources.map((resource) => (
                  <Card key={resource._id} className="p-6 hover:shadow-lg transition-all duration-300 group">
                    <div className="space-y-4">
                      {/* Resource Header */}
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 text-lg mb-2 group-hover:text-blue-600 transition-colors">
                            {resource.title}
                          </h3>
                          <p className="text-gray-600 text-sm line-clamp-3 mb-3">
                            {resource.description}
                          </p>
                        </div>
                        <div className="flex-shrink-0 ml-3">
                          <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                            <FileText className="w-6 h-6 text-red-600" />
                          </div>
                        </div>
                      </div>

                      {/* Resource Details */}
                      <div className="space-y-2 text-sm text-gray-500">
                        <div className="flex items-center justify-between">
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                            {categories.find(cat => cat.value === resource.category)?.label || resource.category}
                          </span>
                          <span className="flex items-center gap-1">
                            <Download className="w-3 h-3" />
                            {resource.downloadCount} downloads
                          </span>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span>{formatFileSize(resource.fileSize)}</span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {formatDate(resource.createdAt)}
                          </span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2 pt-2">
                        <button
                          onClick={() => handleDownload(resource)}
                          className="flex-1 flex items-center justify-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors group"
                        >
                          <Download className="w-4 h-4 group-hover:scale-110 transition-transform" />
                          Download
                        </button>
                        <a
                          href={farmersAPI.downloadResource(resource._id)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                          title="View in new tab"
                        >
                          <Eye className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Pagination */}
              {pagination.pages > 1 && (
                <div className="flex justify-center items-center gap-2">
                  <button
                    onClick={() => setFilters({ ...filters, page: Math.max(1, filters.page - 1) })}
                    disabled={filters.page === 1}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  
                  <span className="px-4 py-2 text-gray-600">
                    Page {pagination.page} of {pagination.pages}
                  </span>
                  
                  <button
                    onClick={() => setFilters({ ...filters, page: Math.min(pagination.pages, filters.page + 1) })}
                    disabled={filters.page === pagination.pages}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="section-padding bg-blue-600 text-white">
        <div className="container-max text-center">
          <h2 className="text-3xl font-bold mb-4">Need More Help?</h2>
          <p className="text-xl text-blue-100 mb-6">
            Our experts are here to assist you with personalized advice and guidance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Contact Our Experts
            </a>
            <a
              href="/extension"
              className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
            >
              View Extension Programs
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default FarmersCorner
