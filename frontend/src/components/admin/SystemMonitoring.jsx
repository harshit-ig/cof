import React, { useState, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts'
import { Server, Database, HardDrive, Cpu, Activity, AlertTriangle, CheckCircle, Clock, RefreshCw, Download } from 'lucide-react'
import { adminAPI } from '../../services/api'
import LoadingSpinner from '../common/LoadingSpinner'
import toast from 'react-hot-toast'

const SystemMonitoring = () => {
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [systemHealth, setSystemHealth] = useState({
    status: 'healthy',
    uptime: 0,
    lastCheck: new Date().toISOString()
  })

  const [metrics, setMetrics] = useState({
    server: {
      cpu: 45.2,
      memory: 62.8,
      disk: 38.5,
      network: 23.1
    },
    database: {
      status: 'connected',
      connections: 12,
      queryTime: 23.5,
      size: '2.3 GB'
    },
    performance: [],
    logs: [],
    services: [
      { name: 'Web Server', status: 'running', port: 3000, uptime: '7d 12h' },
      { name: 'Database', status: 'running', port: 27017, uptime: '7d 12h' },
      { name: 'File System', status: 'running', port: null, uptime: '7d 12h' },
      { name: 'Email Service', status: 'warning', port: 587, uptime: '2h 15m' }
    ],
    alerts: [
      {
        id: 1,
        level: 'warning',
        message: 'High memory usage detected (>60%)',
        timestamp: new Date(Date.now() - 1800000).toISOString(),
        resolved: false
      },
      {
        id: 2,
        level: 'info',
        message: 'Database backup completed successfully',
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        resolved: true
      },
      {
        id: 3,
        level: 'error',
        message: 'Email service connection timeout',
        timestamp: new Date(Date.now() - 7200000).toISOString(),
        resolved: false
      }
    ]
  })

  useEffect(() => {
    fetchSystemHealth()
    
    // Set up real-time monitoring
    const interval = setInterval(fetchSystemHealth, 30000) // Update every 30 seconds
    
    return () => clearInterval(interval)
  }, [])

  const fetchSystemHealth = async () => {
    try {
      if (!loading) setRefreshing(true)
      
      const response = await adminAPI.getSystemHealth()
      if (response.data?.success) {
        setSystemHealth(response.data.data.health)
        setMetrics(response.data.data.metrics)
      }
    } catch (error) {
      console.error('Error fetching system health:', error)
      
      // Mock data for demo
      const now = Date.now()
      const performanceData = Array.from({ length: 24 }, (_, i) => ({
        time: new Date(now - (23 - i) * 3600000).toISOString().split('T')[1].slice(0, 5),
        cpu: Math.random() * 30 + 20,
        memory: Math.random() * 40 + 30,
        disk: Math.random() * 20 + 15,
        responseTime: Math.random() * 100 + 50
      }))

      setMetrics(prev => ({
        ...prev,
        performance: performanceData,
        server: {
          cpu: Math.random() * 30 + 30,
          memory: Math.random() * 40 + 40,
          disk: Math.random() * 30 + 20,
          network: Math.random() * 50 + 10
        }
      }))

      setSystemHealth({
        status: 'healthy',
        uptime: 604800, // 7 days in seconds
        lastCheck: new Date().toISOString()
      })
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  const handleRestartService = async (serviceName) => {
    try {
      const response = await adminAPI.restartService(serviceName)
      if (response.data?.success) {
        toast.success(`${serviceName} restarted successfully`)
        fetchSystemHealth()
      }
    } catch (error) {
      console.error('Error restarting service:', error)
      toast.error(`Failed to restart ${serviceName}`)
    }
  }

  const handleClearLogs = async () => {
    try {
      const response = await adminAPI.clearSystemLogs()
      if (response.data?.success) {
        toast.success('System logs cleared successfully')
        fetchSystemHealth()
      }
    } catch (error) {
      console.error('Error clearing logs:', error)
      toast.error('Failed to clear system logs')
    }
  }

  const exportSystemReport = async () => {
    try {
      const response = await adminAPI.exportSystemReport()
      
      // Create and download report
      const blob = new Blob([response.data], { type: 'application/json' })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `system-report-${new Date().toISOString().split('T')[0]}.json`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
      
      toast.success('System report exported successfully')
    } catch (error) {
      console.error('Error exporting system report:', error)
      toast.error('Failed to export system report')
    }
  }

  const formatUptime = (seconds) => {
    const days = Math.floor(seconds / 86400)
    const hours = Math.floor((seconds % 86400) / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    return `${days}d ${hours}h ${minutes}m`
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'running':
      case 'healthy':
      case 'connected':
        return 'text-green-600 bg-green-100'
      case 'warning':
        return 'text-yellow-600 bg-yellow-100'
      case 'error':
      case 'disconnected':
        return 'text-red-600 bg-red-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  const getAlertIcon = (level) => {
    switch (level) {
      case 'error':
        return <AlertTriangle className="h-4 w-4 text-red-600" />
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />
      case 'info':
        return <CheckCircle className="h-4 w-4 text-blue-600" />
      default:
        return <CheckCircle className="h-4 w-4 text-gray-600" />
    }
  }

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">System Monitoring</h1>
          <p className="text-gray-600 mt-1">Monitor system health and performance</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={fetchSystemHealth}
            disabled={refreshing}
            className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh
          </button>
          <button
            onClick={exportSystemReport}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </button>
        </div>
      </div>

      {/* System Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <Server className="h-8 w-8 text-blue-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Server Status</p>
              <p className="text-lg font-bold text-gray-900 capitalize">{systemHealth.status}</p>
              <p className="text-xs text-gray-500">Uptime: {formatUptime(systemHealth.uptime)}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <Cpu className="h-8 w-8 text-green-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">CPU Usage</p>
              <p className="text-lg font-bold text-gray-900">{metrics.server.cpu.toFixed(1)}%</p>
              <div className="w-16 bg-gray-200 rounded-full h-2 mt-1">
                <div
                  className="bg-green-600 h-2 rounded-full"
                  style={{ width: `${metrics.server.cpu}%` }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <Activity className="h-8 w-8 text-purple-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Memory Usage</p>
              <p className="text-lg font-bold text-gray-900">{metrics.server.memory.toFixed(1)}%</p>
              <div className="w-16 bg-gray-200 rounded-full h-2 mt-1">
                <div
                  className="bg-purple-600 h-2 rounded-full"
                  style={{ width: `${metrics.server.memory}%` }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <HardDrive className="h-8 w-8 text-yellow-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Disk Usage</p>
              <p className="text-lg font-bold text-gray-900">{metrics.server.disk.toFixed(1)}%</p>
              <div className="w-16 bg-gray-200 rounded-full h-2 mt-1">
                <div
                  className="bg-yellow-600 h-2 rounded-full"
                  style={{ width: `${metrics.server.disk}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Resource Usage (24h)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={metrics.performance}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="cpu" stackId="1" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.6} />
              <Area type="monotone" dataKey="memory" stackId="1" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.6} />
              <Area type="monotone" dataKey="disk" stackId="1" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.6} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Response Time (24h)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={metrics.performance}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="responseTime" stroke="#10B981" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Services Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Services Status</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {metrics.services.map((service, index) => (
                <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(service.status)}`}>
                        {service.status}
                      </span>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900">{service.name}</p>
                      <p className="text-xs text-gray-500">
                        {service.port && `Port: ${service.port} • `}Uptime: {service.uptime}
                      </p>
                    </div>
                  </div>
                  {service.status !== 'running' && (
                    <button
                      onClick={() => handleRestartService(service.name)}
                      className="text-blue-600 hover:text-blue-900 text-sm font-medium"
                    >
                      Restart
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Database Status */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Database Status</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">Connection Status</span>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(metrics.database.status)}`}>
                  {metrics.database.status}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">Active Connections</span>
                <span className="text-sm text-gray-900">{metrics.database.connections}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">Avg Query Time</span>
                <span className="text-sm text-gray-900">{metrics.database.queryTime}ms</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">Database Size</span>
                <span className="text-sm text-gray-900">{metrics.database.size}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* System Alerts */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">System Alerts</h3>
          <button
            onClick={handleClearLogs}
            className="text-sm text-blue-600 hover:text-blue-900"
          >
            Clear Resolved
          </button>
        </div>
        <div className="p-6">
          {metrics.alerts.length === 0 ? (
            <div className="text-center py-8">
              <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h4 className="text-lg font-medium text-gray-900 mb-2">No Active Alerts</h4>
              <p className="text-gray-500">All systems are running normally.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {metrics.alerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`flex items-start p-4 border rounded-lg ${
                    alert.resolved ? 'border-gray-200 bg-gray-50' : 'border-red-200 bg-red-50'
                  }`}
                >
                  <div className="flex-shrink-0 mt-0.5">
                    {getAlertIcon(alert.level)}
                  </div>
                  <div className="ml-3 flex-1">
                    <p className={`text-sm font-medium ${alert.resolved ? 'text-gray-700' : 'text-gray-900'}`}>
                      {alert.message}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(alert.timestamp).toLocaleString()}
                    </p>
                  </div>
                  {alert.resolved && (
                    <span className="text-xs text-green-600 font-medium">Resolved</span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SystemMonitoring
