import React, { useState, useEffect } from 'react'
import { Search, Filter, Download, Clock, User, Activity, AlertTriangle, CheckCircle, Info, X, Eye, MoreHorizontal } from 'lucide-react'
import { adminAPI } from '../../services/api'
import LoadingSpinner from '../common/LoadingSpinner'
import Modal from '../common/Modal'
import toast from 'react-hot-toast'

const ActivityLogs = () => {
  const [logs, setLogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterAction, setFilterAction] = useState('all')
  const [filterUser, setFilterUser] = useState('all')
  const [filterLevel, setFilterLevel] = useState('all')
  const [dateRange, setDateRange] = useState('7d')
  const [selectedLog, setSelectedLog] = useState(null)
  const [showDetails, setShowDetails] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const actionTypes = [
    'all', 'create', 'update', 'delete', 'login', 'logout', 
    'upload', 'download', 'export', 'backup', 'error'
  ]

  const logLevels = [
    { value: 'all', label: 'All Levels' },
    { value: 'info', label: 'Info', color: 'text-blue-600', bg: 'bg-blue-100' },
    { value: 'warning', label: 'Warning', color: 'text-yellow-600', bg: 'bg-yellow-100' },
    { value: 'error', label: 'Error', color: 'text-red-600', bg: 'bg-red-100' },
    { value: 'success', label: 'Success', color: 'text-green-600', bg: 'bg-green-100' }
  ]

  const dateRanges = [
    { value: '1d', label: 'Last 24 Hours' },
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' },
    { value: '90d', label: 'Last 3 Months' }
  ]

  useEffect(() => {
    fetchLogs()
  }, [currentPage, searchTerm, filterAction, filterUser, filterLevel, dateRange])

  const fetchLogs = async () => {
    try {
      setLoading(true)
      const response = await adminAPI.getActivityLogs({
        page: currentPage,
        search: searchTerm,
        action: filterAction,
        user: filterUser,
        level: filterLevel,
        period: dateRange
      })
      
      if (response.data?.success) {
        setLogs(response.data.data.logs || [])
        setTotalPages(response.data.data.totalPages || 1)
      }
    } catch (error) {
      console.error('Error fetching activity logs:', error)
      toast.error('Failed to fetch activity logs')
      
      // Mock data for demo
      setLogs([
        {
          _id: '1',
          timestamp: new Date().toISOString(),
          action: 'create',
          resource: 'faculty',
          resourceId: 'faculty123',
          user: { username: 'admin', email: 'admin@college.edu' },
          level: 'info',
          message: 'Created new faculty member: Dr. John Smith',
          metadata: {
            ip: '192.168.1.100',
            userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
            changes: { name: 'Dr. John Smith', department: 'Aquaculture' }
          }
        },
        {
          _id: '2',
          timestamp: new Date(Date.now() - 3600000).toISOString(),
          action: 'update',
          resource: 'news',
          resourceId: 'news456',
          user: { username: 'editor', email: 'editor@college.edu' },
          level: 'info',
          message: 'Updated news article: College wins award',
          metadata: {
            ip: '192.168.1.101',
            userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
            changes: { title: 'College wins award', status: 'published' }
          }
        },
        {
          _id: '3',
          timestamp: new Date(Date.now() - 7200000).toISOString(),
          action: 'login',
          resource: 'auth',
          resourceId: null,
          user: { username: 'admin', email: 'admin@college.edu' },
          level: 'success',
          message: 'User logged in successfully',
          metadata: {
            ip: '192.168.1.100',
            userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
          }
        },
        {
          _id: '4',
          timestamp: new Date(Date.now() - 10800000).toISOString(),
          action: 'delete',
          resource: 'program',
          resourceId: 'prog789',
          user: { username: 'admin', email: 'admin@college.edu' },
          level: 'warning',
          message: 'Deleted program: Old Curriculum',
          metadata: {
            ip: '192.168.1.100',
            userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
            deletedData: { name: 'Old Curriculum', status: 'inactive' }
          }
        },
        {
          _id: '5',
          timestamp: new Date(Date.now() - 14400000).toISOString(),
          action: 'error',
          resource: 'upload',
          resourceId: null,
          user: { username: 'editor', email: 'editor@college.edu' },
          level: 'error',
          message: 'Failed to upload file: file_too_large.pdf',
          metadata: {
            ip: '192.168.1.102',
            userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X)',
            error: 'File size exceeds 10MB limit'
          }
        }
      ])
    } finally {
      setLoading(false)
    }
  }

  const exportLogs = async () => {
    try {
      const response = await adminAPI.exportActivityLogs({
        search: searchTerm,
        action: filterAction,
        user: filterUser,
        level: filterLevel,
        period: dateRange
      })
      
      // Create and download CSV file
      const blob = new Blob([response.data], { type: 'text/csv' })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `activity-logs-${new Date().toISOString().split('T')[0]}.csv`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
      
      toast.success('Activity logs exported successfully')
    } catch (error) {
      console.error('Error exporting logs:', error)
      toast.error('Failed to export activity logs')
    }
  }

  const clearOldLogs = async () => {
    try {
      const response = await adminAPI.clearOldLogs({ olderThan: '90d' })
      if (response.data?.success) {
        toast.success(`Cleared ${response.data.data.deletedCount} old log entries`)
        fetchLogs()
      }
    } catch (error) {
      console.error('Error clearing old logs:', error)
      toast.error('Failed to clear old logs')
    }
  }

  const getActionIcon = (action) => {
    switch (action) {
      case 'create': return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'update': return <Info className="h-4 w-4 text-blue-600" />
      case 'delete': return <X className="h-4 w-4 text-red-600" />
      case 'login': return <User className="h-4 w-4 text-green-600" />
      case 'logout': return <User className="h-4 w-4 text-gray-600" />
      case 'error': return <AlertTriangle className="h-4 w-4 text-red-600" />
      default: return <Activity className="h-4 w-4 text-gray-600" />
    }
  }

  const getLevelStyle = (level) => {
    const levelObj = logLevels.find(l => l.value === level)
    return levelObj ? `${levelObj.color} ${levelObj.bg}` : 'text-gray-600 bg-gray-100'
  }

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp)
    return {
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString()
    }
  }

  // Filter logs based on search and filters
  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.message?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.user?.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.resource?.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesAction = filterAction === 'all' || log.action === filterAction
    const matchesUser = filterUser === 'all' || log.user?.username === filterUser
    const matchesLevel = filterLevel === 'all' || log.level === filterLevel
    
    return matchesSearch && matchesAction && matchesUser && matchesLevel
  })

  // Get unique users for filter
  const uniqueUsers = [...new Set(logs.map(log => log.user?.username).filter(Boolean))]

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Activity Logs</h1>
          <p className="text-gray-600 mt-1">Monitor system activities and user actions</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={clearOldLogs}
            className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            <X className="h-4 w-4 mr-2" />
            Clear Old
          </button>
          <button
            onClick={exportLogs}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <Activity className="h-8 w-8 text-blue-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Total Activities</p>
              <p className="text-2xl font-bold text-gray-900">{logs.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <CheckCircle className="h-8 w-8 text-green-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Success Actions</p>
              <p className="text-2xl font-bold text-gray-900">
                {logs.filter(log => log.level === 'success' || log.level === 'info').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <AlertTriangle className="h-8 w-8 text-yellow-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Warnings</p>
              <p className="text-2xl font-bold text-gray-900">
                {logs.filter(log => log.level === 'warning').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <X className="h-8 w-8 text-red-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Errors</p>
              <p className="text-2xl font-bold text-gray-900">
                {logs.filter(log => log.level === 'error').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm border mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
          <div className="lg:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search logs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <select
            value={filterAction}
            onChange={(e) => setFilterAction(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {actionTypes.map(action => (
              <option key={action} value={action}>
                {action === 'all' ? 'All Actions' : action.charAt(0).toUpperCase() + action.slice(1)}
              </option>
            ))}
          </select>
          <select
            value={filterUser}
            onChange={(e) => setFilterUser(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Users</option>
            {uniqueUsers.map(user => (
              <option key={user} value={user}>{user}</option>
            ))}
          </select>
          <select
            value={filterLevel}
            onChange={(e) => setFilterLevel(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {logLevels.map(level => (
              <option key={level.value} value={level.value}>{level.label}</option>
            ))}
          </select>
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {dateRanges.map(range => (
              <option key={range.value} value={range.value}>{range.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Logs Table */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Timestamp
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Message
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Level
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredLogs.map((log) => {
                const timestamp = formatTimestamp(log.timestamp)
                return (
                  <tr key={log._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm">
                        <div className="font-medium text-gray-900">{timestamp.date}</div>
                        <div className="text-gray-500">{timestamp.time}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {getActionIcon(log.action)}
                        <span className="ml-2 text-sm font-medium text-gray-900 capitalize">
                          {log.action}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm">
                        <div className="font-medium text-gray-900">{log.user?.username}</div>
                        <div className="text-gray-500">{log.user?.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 max-w-xs truncate">
                        {log.message}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getLevelStyle(log.level)}`}>
                        {log.level}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => {
                          setSelectedLog(log)
                          setShowDetails(true)
                        }}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {filteredLogs.length === 0 && (
          <div className="text-center py-12">
            <Activity className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No activity logs found</h3>
            <p className="text-gray-500">No logs match your current search criteria.</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-6">
          <div className="text-sm text-gray-700">
            Page {currentPage} of {totalPages}
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-3 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Log Details Modal */}
      {selectedLog && (
        <Modal isOpen={showDetails} onClose={() => setShowDetails(false)} title="Activity Log Details">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Timestamp</label>
                <p className="text-sm text-gray-900">{new Date(selectedLog.timestamp).toLocaleString()}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Action</label>
                <div className="flex items-center">
                  {getActionIcon(selectedLog.action)}
                  <span className="ml-2 text-sm text-gray-900 capitalize">{selectedLog.action}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">User</label>
                <p className="text-sm text-gray-900">{selectedLog.user?.username} ({selectedLog.user?.email})</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Level</label>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getLevelStyle(selectedLog.level)}`}>
                  {selectedLog.level}
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Message</label>
              <p className="text-sm text-gray-900">{selectedLog.message}</p>
            </div>

            {selectedLog.resource && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Resource</label>
                  <p className="text-sm text-gray-900">{selectedLog.resource}</p>
                </div>
                {selectedLog.resourceId && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Resource ID</label>
                    <p className="text-sm text-gray-900">{selectedLog.resourceId}</p>
                  </div>
                )}
              </div>
            )}

            {selectedLog.metadata && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Metadata</label>
                <div className="bg-gray-50 rounded-lg p-3 text-xs font-mono overflow-x-auto">
                  <pre>{JSON.stringify(selectedLog.metadata, null, 2)}</pre>
                </div>
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  )
}

export default ActivityLogs
