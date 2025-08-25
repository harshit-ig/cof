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
  User
} from 'lucide-react'
import toast from 'react-hot-toast'
import { programsAPI, facultyAPI, newsAPI } from '../../services/api'
import LoadingSpinner from '../common/LoadingSpinner'

import ProgramsManagement from './ProgramsManagement'
import NewsManagement from './NewsManagement'
import FacultyManagement from './FacultyManagement'
import ContentManagement from './ContentManagement'
import WelcomeMessageManagement from './WelcomeMessageManagement'
import InfrastructureGalleryManagement from './InfrastructureGalleryManagement'
import AcademicProgramsManagement from './AcademicProgramsManagement'
import ResearchManagement from './ResearchManagement'

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
      setLoading(true)
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
        <div className="spinner"></div>
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
            <div className="p-2 bg-blue-100 rounded-lg">
              <BookOpen className="h-6 w-6 text-blue-500" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Programs</p>
              <p className="text-2xl font-bold text-gray-900">{stats.programs}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Users className="h-6 w-6 text-green-600" />
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
            <div className="p-2 bg-purple-100 rounded-lg">
              <Calendar className="h-6 w-6 text-purple-600" />
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

// Placeholder components for remaining sections
const InfrastructureManagement = () => (
  <div>
    <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-yellow-800">Under Development</h3>
          <p className="text-sm text-yellow-700 mt-1">Infrastructure management functionality is being developed.</p>
        </div>
      </div>
    </div>
    <h1 className="text-2xl font-bold text-gray-900 mb-6">Infrastructure Management</h1>
    <p className="text-gray-600">This section will allow you to manage infrastructure and facilities information.</p>
  </div>
)

const AdminSettings = () => (
  <div>
    <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-yellow-800">Under Development</h3>
          <p className="text-sm text-yellow-700 mt-1">Admin settings functionality is being developed.</p>
        </div>
      </div>
    </div>
    <h1 className="text-2xl font-bold text-gray-900 mb-6">Admin Settings</h1>
    <p className="text-gray-600">This section will allow you to manage admin settings and configuration.</p>
  </div>
)

const AdminDashboard = () => {
  const { admin, logout } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard, exact: true },
    { name: 'Welcome Message', href: '/admin/welcome', icon: User },
    { name: 'Academic Programs', href: '/admin/academic-programs', icon: BookOpen },
    { name: 'Programs', href: '/admin/programs', icon: BookOpen },
    { name: 'Faculty', href: '/admin/faculty', icon: Users },
    { name: 'Research Topics', href: '/admin/research', icon: FileText },
    { name: 'Infrastructure Gallery', href: '/admin/infrastructure-gallery', icon: Building },
    { name: 'Infrastructure', href: '/admin/infrastructure', icon: Building },
    { name: 'News & Events', href: '/admin/news', icon: Newspaper },
    { name: 'Content Management', href: '/admin/content', icon: FileText },
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
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
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
                        ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    } group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200`}
                  >
                    <Icon className={`mr-3 flex-shrink-0 h-5 w-5 ${active ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-500'}`} />
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
                  <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
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
                          ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      } group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200`}
                    >
                      <Icon className={`mr-3 flex-shrink-0 h-5 w-5 ${active ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-500'}`} />
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
              className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 md:hidden"
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
                <Route path="/welcome" element={<WelcomeMessageManagement />} />
                <Route path="/academic-programs" element={<AcademicProgramsManagement />} />
                <Route path="/programs" element={<ProgramsManagement />} />
                <Route path="/faculty" element={<FacultyManagement />} />
                <Route path="/research" element={<ResearchManagement />} />
                <Route path="/infrastructure-gallery" element={<InfrastructureGalleryManagement />} />
                <Route path="/infrastructure" element={<InfrastructureManagement />} />
                <Route path="/news" element={<NewsManagement />} />
                <Route path="/content" element={<ContentManagement />} />
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

