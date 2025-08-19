import React, { useState, useEffect } from 'react'
import { Routes, Route, Link, useLocation, Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { 
  LayoutDashboard, 
  BookOpen, 
  Users, 
  Newspaper, 
  Calendar,
  Building,
  Briefcase,
  FileText,
  Settings,
  LogOut,
  Menu,
  X,
  User,
  Upload,
  Shield,
  BarChart3,
  Activity,
  Search,
  Monitor
} from 'lucide-react'
import toast from 'react-hot-toast'
import { programsAPI, facultyAPI, newsAPI } from '../../services/api'
import LoadingSpinner from '../common/LoadingSpinner'

import ProgramsManagement from './ProgramsManagement'
import NewsManagement from './NewsManagementNew'
import FacultyManagement from './FacultyManagementNew'
import ContentManagement from './ContentManagement'
import FileUploadDemo from './FileUploadDemo'
import EventsManagement from './EventsManagement'
import ResearchManagement from './ResearchManagement'
import InfrastructureManagement from './InfrastructureManagement'
import CollaborationsManagement from './CollaborationsManagement'
import AdminSettings from './AdminSettings'
import UserManagement from './UserManagement'
import Analytics from './Analytics'
import ActivityLogs from './ActivityLogs'
import SeoManagement from './SeoManagement'
import SystemMonitoring from './SystemMonitoring'

// Admin Page Components
const DashboardHome = () => {
  const [stats, setStats] = useState({
    programs: 0,
    faculty: 0,
    news: 0,
    events: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardStats()
  }, [])

  const fetchDashboardStats = async () => {
    try {
      const [programsRes, facultyRes, newsRes] = await Promise.allSettled([
        programsAPI.getAll({ limit: 1 }),
        facultyAPI.getAll({ limit: 1 }),
        newsAPI.getAll({ limit: 1 })
      ])

      const newStats = { ...stats }
      
      if (programsRes.status === 'fulfilled' && programsRes.value.data.success) {
        newStats.programs = programsRes.value.data.data.pagination?.total || 0
      }
      
      if (facultyRes.status === 'fulfilled' && facultyRes.value.data.success) {
        newStats.faculty = facultyRes.value.data.data.pagination?.total || 0
      }
      
      if (newsRes.status === 'fulfilled' && newsRes.value.data.success) {
        newStats.news = newsRes.value.data.data.pagination?.total || 0
        newStats.events = newsRes.value.data.data.newsEvents?.filter(item => 
          ['event', 'seminar', 'workshop'].includes(item.type)
        ).length || 0
      }

      setStats(newStats)
    } catch (error) {
      console.error('Error fetching dashboard stats:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-600 mt-2">Welcome back! Here's what's happening with your college.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-primary-100 rounded-lg">
              <BookOpen className="h-6 w-6 text-primary-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Programs</p>
              <p className="text-2xl font-bold text-gray-900">{stats.programs}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-secondary-100 rounded-lg">
              <Users className="h-6 w-6 text-secondary-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Faculty Members</p>
              <p className="text-2xl font-bold text-gray-900">{stats.faculty}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Newspaper className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">News Articles</p>
              <p className="text-2xl font-bold text-gray-900">{stats.news}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Calendar className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Events</p>
              <p className="text-2xl font-bold text-gray-900">{stats.events}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const AdminDashboard = () => {
  const { admin, logout } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard, exact: true },
    { name: 'Programs', href: '/admin/programs', icon: BookOpen },
    { name: 'Faculty', href: '/admin/faculty', icon: Users },
    { name: 'News', href: '/admin/news', icon: Newspaper },
    { name: 'File Upload', href: '/admin/uploads', icon: Upload },
    { name: 'Events', href: '/admin/events', icon: Calendar },
    { name: 'Research', href: '/admin/research', icon: FileText },
    { name: 'Infrastructure', href: '/admin/infrastructure', icon: Building },
    { name: 'Collaborations', href: '/admin/collaborations', icon: Briefcase },
    { name: 'Content', href: '/admin/content', icon: FileText },
    { name: 'User Management', href: '/admin/users', icon: Shield },
    { name: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
    { name: 'Activity Logs', href: '/admin/logs', icon: Activity },
    { name: 'SEO Management', href: '/admin/seo', icon: Search },
    { name: 'System Monitor', href: '/admin/monitoring', icon: Monitor },
    { name: 'Settings', href: '/admin/settings', icon: Settings }
  ]

  const handleLogout = () => {
    logout()
    toast.success('Logged out successfully')
  }

  const isActive = (href, exact = false) => {
    if (exact) {
      return location.pathname === href
    }
    return location.pathname.startsWith(href)
  }

  return (
    <div className="h-screen flex overflow-hidden bg-gray-50">
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 flex z-40 md:hidden ${sidebarOpen ? '' : 'hidden'}`}>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
        
        <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white shadow-xl">
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-6 w-6 text-white" />
            </button>
          </div>
          
          {/* Mobile Sidebar Content */}
          <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
            <div className="flex-shrink-0 flex items-center px-4">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">FC</span>
                </div>
                <div className="ml-3">
                  <h1 className="text-lg font-semibold text-gray-900">Fishery College</h1>
                  <p className="text-sm text-gray-500">Admin Panel</p>
                </div>
              </div>
            </div>
            
            <nav className="mt-8 px-4 space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon
                const active = isActive(item.href, item.exact)
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`${
                      active
                        ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-600'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    } group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200`}
                  >
                    <Icon className={`mr-3 flex-shrink-0 h-5 w-5 ${active ? 'text-primary-600' : 'text-gray-400 group-hover:text-gray-500'}`} />
                    {item.name}
                  </Link>
                )
              })}
            </nav>
          </div>
          
          {/* Mobile User Profile */}
          <div className="flex-shrink-0 border-t border-gray-200 p-4">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                <User className="h-5 w-5 text-gray-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700">{admin?.username || 'Admin'}</p>
                <button
                  onClick={handleLogout}
                  className="text-xs text-gray-500 hover:text-red-600 flex items-center mt-1 transition-colors"
                >
                  <LogOut className="h-3 w-3 mr-1" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64">
          <div className="flex flex-col h-0 flex-1 bg-white shadow-lg border-r border-gray-200">
            {/* Logo/Header */}
            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
              <div className="flex items-center flex-shrink-0 px-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold">FC</span>
                  </div>
                  <div className="ml-3">
                    <h1 className="text-lg font-semibold text-gray-900">Fishery College</h1>
                    <p className="text-sm text-gray-500">Admin Panel</p>
                  </div>
                </div>
              </div>
              
              {/* Navigation */}
              <nav className="mt-8 flex-1 px-4 space-y-1">
                {navigation.map((item) => {
                  const Icon = item.icon
                  const active = isActive(item.href, item.exact)
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`${
                        active
                          ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-600'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      } group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200`}
                    >
                      <Icon className={`mr-3 flex-shrink-0 h-5 w-5 ${active ? 'text-primary-600' : 'text-gray-400 group-hover:text-gray-500'}`} />
                      {item.name}
                    </Link>
                  )
                })}
              </nav>
            </div>
            
            {/* User Profile */}
            <div className="flex-shrink-0 border-t border-gray-200 p-4">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-gray-600" />
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium text-gray-700">{admin?.username || 'Admin'}</p>
                  <button
                    onClick={handleLogout}
                    className="text-xs text-gray-500 hover:text-red-600 flex items-center mt-1 transition-colors"
                  >
                    <LogOut className="h-3 w-3 mr-1" />
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content area */}
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        {/* Mobile header */}
        <div className="md:hidden">
          <div className="relative z-10 flex-shrink-0 flex h-16 bg-white shadow-sm border-b border-gray-200">
            <button
              className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 md:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </button>
            <div className="flex-1 px-4 flex justify-between items-center">
              <h1 className="text-lg font-medium text-gray-900">Admin Dashboard</h1>
              <button
                onClick={handleLogout}
                className="text-gray-400 hover:text-gray-600"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <Routes>
                <Route path="/" element={<DashboardHome />} />
                <Route path="/programs" element={<ProgramsManagement />} />
                <Route path="/faculty" element={<FacultyManagement />} />
                <Route path="/news" element={<NewsManagement />} />
                <Route path="/uploads" element={<FileUploadDemo />} />
                <Route path="/events" element={<EventsManagement />} />
                <Route path="/research" element={<ResearchManagement />} />
                <Route path="/infrastructure" element={<InfrastructureManagement />} />
                <Route path="/collaborations" element={<CollaborationsManagement />} />
                <Route path="/content" element={<ContentManagement />} />
                <Route path="/users" element={<UserManagement />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/logs" element={<ActivityLogs />} />
                <Route path="/seo" element={<SeoManagement />} />
                <Route path="/monitoring" element={<SystemMonitoring />} />
                <Route path="/settings" element={<AdminSettings />} />
                <Route path="*" element={<Navigate to="/admin" replace />} />
              </Routes>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default AdminDashboard