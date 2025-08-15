import React, { useState, useEffect } from 'react'
import { Calendar, Download, Eye, Search, Filter } from 'lucide-react'
import Section from '../components/common/Section'
import LoadingSpinner from '../components/common/LoadingSpinner'

const NoticeBoard = () => {
  const [notices, setNotices] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  useEffect(() => {
    // Mock data - replace with API call
    setTimeout(() => {
      setNotices([
        {
          id: 1,
          title: 'Admission Notice for B.F.Sc. 2025-26',
          category: 'Admission',
          date: '2025-08-10',
          description: 'Applications are invited for admission to Bachelor of Fisheries Science programme for the academic year 2025-26.',
          file: '/notices/admission-notice-2025.pdf',
          isImportant: true
        },
        {
          id: 2,
          title: 'Final Examination Time Table',
          category: 'Examination',
          date: '2025-08-05',
          description: 'Time table for final examinations of all semesters has been released.',
          file: '/notices/final-exam-timetable.pdf',
          isImportant: true
        },
        {
          id: 3,
          title: 'Fish Fair 2025 - Final Notice',
          category: 'Events',
          date: '2025-08-01',
          description: 'Annual Fish Fair 2025 will be held on campus. All students are requested to participate.',
          file: '/notices/fish-fair-2025.pdf',
          isImportant: false
        },
        {
          id: 4,
          title: 'Academic Leave Form',
          category: 'Academic',
          date: '2025-07-28',
          description: 'New academic leave application form is now available.',
          file: '/notices/academic-leave-form.pdf',
          isImportant: false
        },
        {
          id: 5,
          title: 'Research Grant Applications',
          category: 'Research',
          date: '2025-07-25',
          description: 'Applications invited for research grants from faculty members.',
          file: '/notices/research-grant-applications.pdf',
          isImportant: false
        }
      ])
      setLoading(false)
    }, 1000)
  }, [])

  const categories = ['all', 'Admission', 'Examination', 'Events', 'Academic', 'Research']

  const filteredNotices = notices.filter(notice => {
    const matchesSearch = notice.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notice.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || notice.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateString).toLocaleDateString('en-US', options)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Section className="bg-gradient-to-r from-blue-800 to-green-700 text-white py-20">
        <div className="text-center">
          <div className="mb-4">
            <span className="inline-block bg-yellow-400 text-blue-900 text-sm font-semibold px-3 py-1 rounded-full">
              Government of Bihar
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Notice Board</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Stay updated with the latest announcements, notifications, and important information
          </p>
        </div>
      </Section>

      {/* Main Content */}
      <Section className="py-16">
        <div className="max-w-6xl mx-auto">
          {/* Search and Filter */}
          <div className="mb-8 bg-white rounded-lg shadow-lg p-6">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search notices..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              {/* Category Filter */}
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none bg-white min-w-[150px]"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Notices List */}
          <div className="space-y-6">
            {filteredNotices.length > 0 ? (
              filteredNotices.map(notice => (
                <div key={notice.id} className={`bg-white rounded-lg shadow-lg overflow-hidden border-l-4 ${
                  notice.isImportant ? 'border-red-500' : 'border-green-600'
                }`}>
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <div className="flex items-center space-x-3 mb-2 md:mb-0">
                        {notice.isImportant && (
                          <span className="bg-red-100 text-red-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                            IMPORTANT
                          </span>
                        )}
                        <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                          {notice.category}
                        </span>
                      </div>
                      <div className="flex items-center text-gray-500 text-sm">
                        <Calendar className="h-4 w-4 mr-1" />
                        {formatDate(notice.date)}
                      </div>
                    </div>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {notice.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-4">
                      {notice.description}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <button className="inline-flex items-center px-4 py-2 bg-blue-700 text-white text-sm font-medium rounded-lg hover:bg-blue-800 transition-colors">
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </button>
                      <button className="inline-flex items-center px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors">
                        <Download className="h-4 w-4 mr-2" />
                        Download PDF
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">📋</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No notices found</h3>
                <p className="text-gray-600">Try adjusting your search criteria or check back later.</p>
              </div>
            )}
          </div>
        </div>
      </Section>
    </div>
  )
}

export default NoticeBoard
