import React, { useState, useEffect } from 'react'
import { Save, Search, Eye, BarChart3, Globe, FileText, Image, Link, TrendingUp, AlertCircle, CheckCircle, Share2 } from 'lucide-react'
import { adminAPI } from '../../services/api'
import LoadingSpinner from '../common/LoadingSpinner'
import toast from 'react-hot-toast'

const SeoManagement = () => {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [activeTab, setActiveTab] = useState('pages')

  const [seoSettings, setSeoSettings] = useState({
    global: {
      siteTitle: 'College of Fisheries',
      siteDescription: 'Premier institution for fisheries education and research',
      siteKeywords: 'fisheries, aquaculture, marine biology, education, research',
      siteAuthor: 'College of Fisheries',
      siteUrl: 'https://collegeoffisheries.edu',
      defaultImage: '/images/default-og.jpg',
      twitterHandle: '@collegeoffisheries',
      googleAnalyticsId: '',
      googleSearchConsoleId: '',
      facebookPixelId: '',
      robots: 'index, follow',
      language: 'en',
      region: 'IN'
    },
    pages: [],
    sitemap: {
      lastGenerated: null,
      urls: 0,
      autoGenerate: true,
      updateFrequency: 'weekly'
    },
    social: {
      ogImage: '/images/og-default.jpg',
      twitterCard: 'summary_large_image',
      facebookAppId: '',
      linkedinCompanyId: ''
    }
  })

  const [seoAnalysis, setSeoAnalysis] = useState({
    overall: {
      score: 85,
      issues: 3,
      warnings: 5,
      suggestions: 8
    },
    pages: [],
    performance: {
      avgLoadTime: 2.3,
      mobileScore: 92,
      desktopScore: 98
    }
  })

  const tabs = [
    { id: 'pages', label: 'Page SEO', icon: FileText },
    { id: 'global', label: 'Global Settings', icon: Globe },
    { id: 'social', label: 'Social Media', icon: Share2 },
    { id: 'analytics', label: 'SEO Analytics', icon: BarChart3 },
    { id: 'sitemap', label: 'Sitemap', icon: FileText }
  ]

  useEffect(() => {
    fetchSeoData()
  }, [])

  const fetchSeoData = async () => {
    try {
      setLoading(true)
      const response = await adminAPI.getSeoSettings()
      if (response.data?.success) {
        setSeoSettings(response.data.data.settings)
        setSeoAnalysis(response.data.data.analysis)
      }
    } catch (error) {
      console.error('Error fetching SEO data:', error)
      
      // Mock data for demo
      setSeoSettings({
        ...seoSettings,
        pages: [
          {
            _id: '1',
            path: '/',
            title: 'College of Fisheries - Premier Fisheries Education',
            description: 'Leading institution for fisheries education, aquaculture research, and marine biology studies. Join our world-class programs.',
            keywords: 'fisheries education, aquaculture, marine biology, college',
            canonicalUrl: 'https://collegeoffisheries.edu/',
            ogTitle: 'College of Fisheries',
            ogDescription: 'Premier institution for fisheries education and research',
            ogImage: '/images/home-og.jpg',
            noIndex: false,
            noFollow: false,
            lastModified: new Date().toISOString(),
            seoScore: 92
          },
          {
            _id: '2',
            path: '/programs',
            title: 'Academic Programs - College of Fisheries',
            description: 'Explore our comprehensive fisheries and aquaculture programs. Undergraduate, postgraduate, and doctoral programs available.',
            keywords: 'fisheries programs, aquaculture courses, marine biology education',
            canonicalUrl: 'https://collegeoffisheries.edu/programs',
            ogTitle: 'Academic Programs',
            ogDescription: 'Comprehensive fisheries and aquaculture programs',
            ogImage: '/images/programs-og.jpg',
            noIndex: false,
            noFollow: false,
            lastModified: new Date().toISOString(),
            seoScore: 88
          },
          {
            _id: '3',
            path: '/faculty',
            title: 'Faculty - Expert Educators in Fisheries Science',
            description: 'Meet our distinguished faculty members - experts in fisheries science, aquaculture, and marine biology.',
            keywords: 'fisheries faculty, aquaculture experts, marine biology professors',
            canonicalUrl: 'https://collegeoffisheries.edu/faculty',
            ogTitle: 'Expert Faculty',
            ogDescription: 'Distinguished faculty in fisheries science',
            ogImage: '/images/faculty-og.jpg',
            noIndex: false,
            noFollow: false,
            lastModified: new Date().toISOString(),
            seoScore: 85
          }
        ]
      })

      setSeoAnalysis({
        overall: {
          score: 85,
          issues: 3,
          warnings: 5,
          suggestions: 8
        },
        pages: [
          { path: '/', score: 92, issues: ['Missing alt text for 2 images'] },
          { path: '/programs', score: 88, issues: ['Meta description too short', 'H1 tag missing'] },
          { path: '/faculty', score: 85, issues: ['Page load time > 3s', 'Missing structured data'] }
        ],
        performance: {
          avgLoadTime: 2.3,
          mobileScore: 92,
          desktopScore: 98
        }
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSaveGlobalSettings = async (e) => {
    e.preventDefault()
    setSaving(true)

    try {
      const response = await adminAPI.updateSeoSettings({ global: seoSettings.global })
      if (response.data?.success) {
        toast.success('Global SEO settings updated successfully')
      }
    } catch (error) {
      console.error('Error updating SEO settings:', error)
      toast.error('Failed to update SEO settings')
    } finally {
      setSaving(false)
    }
  }

  const handlePageSeoUpdate = async (pageId, pageData) => {
    try {
      const response = await adminAPI.updatePageSeo(pageId, pageData)
      if (response.data?.success) {
        setSeoSettings({
          ...seoSettings,
          pages: seoSettings.pages.map(page =>
            page._id === pageId ? { ...page, ...pageData } : page
          )
        })
        toast.success('Page SEO updated successfully')
      }
    } catch (error) {
      console.error('Error updating page SEO:', error)
      toast.error('Failed to update page SEO')
    }
  }

  const generateSitemap = async () => {
    try {
      const response = await adminAPI.generateSitemap()
      if (response.data?.success) {
        setSeoSettings({
          ...seoSettings,
          sitemap: {
            ...seoSettings.sitemap,
            lastGenerated: new Date().toISOString(),
            urls: response.data.data.urlCount
          }
        })
        toast.success('Sitemap generated successfully')
      }
    } catch (error) {
      console.error('Error generating sitemap:', error)
      toast.error('Failed to generate sitemap')
    }
  }

  const analyzeSeo = async () => {
    try {
      const response = await adminAPI.analyzeSeo()
      if (response.data?.success) {
        setSeoAnalysis(response.data.data.analysis)
        toast.success('SEO analysis completed')
      }
    } catch (error) {
      console.error('Error analyzing SEO:', error)
      toast.error('Failed to analyze SEO')
    }
  }

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-600 bg-green-100'
    if (score >= 70) return 'text-yellow-600 bg-yellow-100'
    return 'text-red-600 bg-red-100'
  }

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">SEO Management</h1>
          <p className="text-gray-600 mt-1">Optimize your website for search engines</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={analyzeSeo}
            className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            <Search className="h-4 w-4 mr-2" />
            Analyze SEO
          </button>
          <button
            onClick={generateSitemap}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <FileText className="h-4 w-4 mr-2" />
            Generate Sitemap
          </button>
        </div>
      </div>

      {/* SEO Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <TrendingUp className="h-8 w-8 text-green-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Overall Score</p>
              <p className="text-2xl font-bold text-gray-900">{seoAnalysis.overall.score}/100</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <AlertCircle className="h-8 w-8 text-red-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Issues</p>
              <p className="text-2xl font-bold text-gray-900">{seoAnalysis.overall.issues}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <AlertCircle className="h-8 w-8 text-yellow-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Warnings</p>
              <p className="text-2xl font-bold text-gray-900">{seoAnalysis.overall.warnings}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <CheckCircle className="h-8 w-8 text-blue-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Suggestions</p>
              <p className="text-2xl font-bold text-gray-900">{seoAnalysis.overall.suggestions}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm flex items-center`}
              >
                <Icon className="h-4 w-4 mr-2" />
                {tab.label}
              </button>
            )
          })}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'pages' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Page SEO Settings</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Page
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Score
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {seoSettings.pages.map((page) => (
                    <tr key={page._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {page.path}
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 max-w-xs truncate" title={page.title}>
                          {page.title}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-500 max-w-xs truncate" title={page.description}>
                          {page.description}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getScoreColor(page.seoScore)}`}>
                          {page.seoScore}/100
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 mr-3">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="text-blue-600 hover:text-blue-900">
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'global' && (
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Global SEO Settings</h3>
          <form onSubmit={handleSaveGlobalSettings} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Site Title</label>
                <input
                  type="text"
                  value={seoSettings.global.siteTitle}
                  onChange={(e) => setSeoSettings({
                    ...seoSettings,
                    global: { ...seoSettings.global, siteTitle: e.target.value }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Site URL</label>
                <input
                  type="url"
                  value={seoSettings.global.siteUrl}
                  onChange={(e) => setSeoSettings({
                    ...seoSettings,
                    global: { ...seoSettings.global, siteUrl: e.target.value }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Site Description</label>
              <textarea
                value={seoSettings.global.siteDescription}
                onChange={(e) => setSeoSettings({
                  ...seoSettings,
                  global: { ...seoSettings.global, siteDescription: e.target.value }
                })}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Keywords</label>
              <input
                type="text"
                value={seoSettings.global.siteKeywords}
                onChange={(e) => setSeoSettings({
                  ...seoSettings,
                  global: { ...seoSettings.global, siteKeywords: e.target.value }
                })}
                placeholder="Separate keywords with commas"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Google Analytics ID</label>
                <input
                  type="text"
                  value={seoSettings.global.googleAnalyticsId}
                  onChange={(e) => setSeoSettings({
                    ...seoSettings,
                    global: { ...seoSettings.global, googleAnalyticsId: e.target.value }
                  })}
                  placeholder="GA4-XXXXXXXXXX"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Twitter Handle</label>
                <input
                  type="text"
                  value={seoSettings.global.twitterHandle}
                  onChange={(e) => setSeoSettings({
                    ...seoSettings,
                    global: { ...seoSettings.global, twitterHandle: e.target.value }
                  })}
                  placeholder="@yourusername"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={saving}
                className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                <Save className="h-4 w-4 mr-2" />
                {saving ? 'Saving...' : 'Save Settings'}
              </button>
            </div>
          </form>
        </div>
      )}

      {activeTab === 'analytics' && (
        <div className="space-y-6">
          {/* Performance Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg Load Time</p>
                  <p className="text-2xl font-bold text-gray-900">{seoAnalysis.performance.avgLoadTime}s</p>
                </div>
                <TrendingUp className="h-8 w-8 text-blue-600" />
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Mobile Score</p>
                  <p className="text-2xl font-bold text-gray-900">{seoAnalysis.performance.mobileScore}/100</p>
                </div>
                <BarChart3 className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Desktop Score</p>
                  <p className="text-2xl font-bold text-gray-900">{seoAnalysis.performance.desktopScore}/100</p>
                </div>
                <BarChart3 className="h-8 w-8 text-green-600" />
              </div>
            </div>
          </div>

          {/* Page Analysis */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Page Analysis</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {seoAnalysis.pages.map((page, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-900">{page.path}</span>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getScoreColor(page.score)}`}>
                        {page.score}/100
                      </span>
                    </div>
                    {page.issues && page.issues.length > 0 && (
                      <div className="space-y-1">
                        {page.issues.map((issue, issueIndex) => (
                          <div key={issueIndex} className="flex items-center text-sm text-red-600">
                            <AlertCircle className="h-4 w-4 mr-2" />
                            {issue}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'sitemap' && (
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Sitemap Management</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Auto Generate</label>
                <select
                  value={seoSettings.sitemap.autoGenerate ? 'true' : 'false'}
                  onChange={(e) => setSeoSettings({
                    ...seoSettings,
                    sitemap: { ...seoSettings.sitemap, autoGenerate: e.target.value === 'true' }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="true">Enabled</option>
                  <option value="false">Disabled</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Update Frequency</label>
                <select
                  value={seoSettings.sitemap.updateFrequency}
                  onChange={(e) => setSeoSettings({
                    ...seoSettings,
                    sitemap: { ...seoSettings.sitemap, updateFrequency: e.target.value }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Last Generated</label>
                <p className="text-sm text-gray-900">
                  {seoSettings.sitemap.lastGenerated 
                    ? new Date(seoSettings.sitemap.lastGenerated).toLocaleString()
                    : 'Never'
                  }
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Total URLs</label>
                <p className="text-sm text-gray-900">{seoSettings.sitemap.urls}</p>
              </div>
            </div>
          </div>

          <div className="flex space-x-3">
            <button
              onClick={generateSitemap}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <FileText className="h-4 w-4 mr-2" />
              Generate Now
            </button>
            <a
              href="/sitemap.xml"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              <Eye className="h-4 w-4 mr-2" />
              View Sitemap
            </a>
          </div>
        </div>
      )}
    </div>
  )
}

export default SeoManagement
