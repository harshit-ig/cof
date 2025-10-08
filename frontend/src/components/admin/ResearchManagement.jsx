import React, { useState, useEffect } from 'react'
import { Save, Eye, RefreshCw, FlaskConical, BookOpen, Users, Building, GraduationCap, Plus, Edit, Trash2, Upload, FileText, Download, X, Target } from 'lucide-react'
import Card from '../common/Card'
import toast from 'react-hot-toast'
import { researchAPI, uploadAPI } from '../../services/api'
import { getDocumentUrl } from '../../services/files'

const ResearchManagement = () => {
  const [activeTab, setActiveTab] = useState('ongoing-projects')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [researchData, setResearchData] = useState({
    'ongoing-projects': [],
    'publications': [],
    'student-research': [],
    'collaborations': [],
    'facilities': []
  })
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [formData, setFormData] = useState({})

  const tabs = [
    { id: 'ongoing-projects', name: 'Ongoing Projects', icon: FlaskConical, color: 'blue' },
    { id: 'publications', name: 'Publications & Journals', icon: BookOpen, color: 'green' },
    { id: 'student-research', name: 'Student Research', icon: GraduationCap, color: 'orange' },
    { id: 'collaborations', name: 'Research Collaborations', icon: Users, color: 'purple' },
    { id: 'facilities', name: 'Research Facilities', icon: Building, color: 'indigo' }
  ]

  const projectTypes = ['ICAR', 'NFDB', 'PMMSY', 'DBT', 'UGC', 'DST', 'CSIR', 'Other']
  const statusOptions = ['ongoing', 'completed', 'proposed']
  const degreeOptions = ['B.F.Sc', 'M.F.Sc', 'Ph.D']
  const collaborationTypes = ['Research', 'Academic Exchange', 'Technology Transfer', 'Joint Degree']
  const facilityTypes = ['Laboratory', 'Equipment', 'Infrastructure', 'Software', 'Database']

  useEffect(() => {
    fetchResearchData()
  }, [])

  const fetchResearchData = async () => {
    try {
      setLoading(true)
      const response = await researchAPI.getAll()
      if (response.data.success) {
        const allResearch = response.data.data.research || []
        
        // Group research by section
        const grouped = {
          'ongoing-projects': [],
          'publications': [],
          'student-research': [],
          'collaborations': [],
          'facilities': []
        }
        
        allResearch.forEach(item => {
          if (grouped[item.section]) {
            grouped[item.section].push(item)
          }
        })
        
        setResearchData(grouped)
      }
    } catch (error) {
      console.error('Error fetching research data:', error)
      toast.error('Failed to load research data')
    } finally {
      setLoading(false)
    }
  }

  const getDefaultFormData = (section) => {
    const base = {
      title: '',
      description: '',
      section: section,
      principalInvestigator: '',
      coInvestigators: [],
      department: 'College of Fishery',
      objectives: [],
      methodology: '',
      keyFindings: [],
      tags: [],
      documents: [],
      pdf: null,
      isPublished: true
    }

    switch (section) {
      case 'ongoing-projects':
        return {
          ...base,
          projectType: 'ICAR',
          fundingAgency: '',
          budget: '',
          duration: { startDate: '', endDate: '' },
          status: 'ongoing'
        }
      case 'publications':
        return {
          ...base,
          publicationDetails: {
            journal: '',
            volume: '',
            issue: '',
            pages: '',
            year: new Date().getFullYear(),
            doi: '',
            impactFactor: '',
            authors: []
          }
        }
      case 'student-research':
        return {
          ...base,
          studentDetails: {
            studentName: '',
            degree: 'M.F.Sc',
            supervisor: '',
            completionYear: new Date().getFullYear()
          }
        }
      case 'collaborations':
        return {
          ...base,
          collaborationDetails: {
            partnerInstitution: '',
            partnerCountry: '',
            collaborationType: 'Research',
            mou: false
          }
        }
      case 'facilities':
        return {
          ...base,
          facilityDetails: {
            type: 'Laboratory',
            capacity: '',
            specifications: '',
            utilizationAreas: []
          }
        }
      default:
        return base
    }
  }

  const handleAdd = () => {
    setFormData(getDefaultFormData(activeTab))
    setEditingItem(null)
    setShowAddModal(true)
  }

  const handleEdit = (item) => {
    // Convert item data to form format
    const formattedData = {
      ...item,
      coInvestigators: item.coInvestigators || [],
      objectives: item.objectives || [],
      keyFindings: item.keyFindings || [],
      tags: item.tags || [],
      documents: item.documents || [],
      pdf: null,
      duration: item.duration || { startDate: '', endDate: '' },
      publicationDetails: item.publicationDetails || {
        journal: '', volume: '', issue: '', pages: '', year: new Date().getFullYear(),
        doi: '', impactFactor: '', authors: []
      },
      studentDetails: item.studentDetails || {
        studentName: '', degree: 'M.F.Sc', supervisor: '', completionYear: new Date().getFullYear()
      },
      collaborationDetails: item.collaborationDetails || {
        partnerInstitution: '', partnerCountry: '', collaborationType: 'Research', mou: false
      },
      facilityDetails: item.facilityDetails || {
        type: 'Laboratory', capacity: '', specifications: '', utilizationAreas: []
      }
    }
    
    setFormData(formattedData)
    setEditingItem(item)
    setShowAddModal(true)
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this research item?')) return

    try {
      await researchAPI.delete(id)
      toast.success('Research item deleted successfully')
      fetchResearchData()
    } catch (error) {
      console.error('Error deleting research item:', error)
      toast.error('Failed to delete research item')
    }
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleNestedInputChange = (parent, field, value) => {
    setFormData(prev => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [field]: value
      }
    }))
  }

  const handleArrayInput = (field, value) => {
    const items = value.split('\n').filter(item => item.trim() !== '')
    setFormData(prev => ({
      ...prev,
      [field]: items
    }))
  }

  const handleFileUpload = async (file) => {
    if (!file) return null

    try {
      setUploading(true)
      const response = await uploadAPI.single(file, 'documents')
      
      if (response.data.success) {
        return {
          name: file.name,
          url: response.data.data.url,
          type: file.type
        }
      }
    } catch (error) {
      console.error('Error uploading file:', error)
      toast.error('Failed to upload file')
      return null
    } finally {
      setUploading(false)
    }
  }

  const handleSave = async () => {
    if (!formData.title?.trim() || !formData.description?.trim()) {
      toast.error('Title and description are required')
      return
    }

    try {
      setSaving(true)
      
      if (editingItem) {
        // For updates, use FormData to support file uploads like FarmerResource
        const formDataToSend = new FormData()
        
        // Add basic fields
        formDataToSend.append('title', formData.title)
        formDataToSend.append('description', formData.description)
        formDataToSend.append('section', formData.section)
        formDataToSend.append('principalInvestigator', formData.principalInvestigator)
        formDataToSend.append('department', formData.department || 'College of Fishery')
        formDataToSend.append('isPublished', formData.isPublished !== undefined ? formData.isPublished : true)
        
        // Add PDF file if selected
        if (formData.pdf) {
          formDataToSend.append('pdf', formData.pdf)
        }
        
        // Add optional fields
        if (formData.coInvestigators && formData.coInvestigators.length > 0) {
          formDataToSend.append('coInvestigators', JSON.stringify(formData.coInvestigators));
        }
        if (formData.objectives && formData.objectives.length > 0) {
          formDataToSend.append('objectives', JSON.stringify(formData.objectives));
        }
        if (formData.methodology) {
          formDataToSend.append('methodology', formData.methodology);
        }
        if (formData.keyFindings && formData.keyFindings.length > 0) {
          formDataToSend.append('keyFindings', JSON.stringify(formData.keyFindings));
        }
        if (formData.tags && formData.tags.length > 0) {
          formDataToSend.append('tags', JSON.stringify(formData.tags));
        }

        // Add section-specific fields
        if (formData.section === 'ongoing-projects') {
          formDataToSend.append('projectType', formData.projectType || 'ICAR');
          formDataToSend.append('status', formData.status || 'ongoing');
          if (formData.fundingAgency) formDataToSend.append('fundingAgency', formData.fundingAgency);
          if (formData.budget) formDataToSend.append('budget', formData.budget);
          if (formData.duration) formDataToSend.append('duration', JSON.stringify(formData.duration));
        } else if (formData.section === 'publications' && formData.publicationDetails) {
          formDataToSend.append('publicationDetails', JSON.stringify(formData.publicationDetails));
        } else if (formData.section === 'student-research' && formData.studentDetails) {
          formDataToSend.append('studentDetails', JSON.stringify(formData.studentDetails));
        } else if (formData.section === 'collaborations' && formData.collaborationDetails) {
          formDataToSend.append('collaborationDetails', JSON.stringify(formData.collaborationDetails));
        } else if (formData.section === 'facilities' && formData.facilityDetails) {
          formDataToSend.append('facilityDetails', JSON.stringify(formData.facilityDetails));
        }

        await researchAPI.update(editingItem._id, formDataToSend)
        toast.success('Research item updated successfully')
      } else {
        // For new items, use FormData like FarmerResource
        const formDataToSend = new FormData()
        
        // Add basic fields
        formDataToSend.append('title', formData.title)
        formDataToSend.append('description', formData.description)
        formDataToSend.append('section', formData.section)
        formDataToSend.append('principalInvestigator', formData.principalInvestigator)
        formDataToSend.append('department', formData.department || 'College of Fishery')
        
        // Add PDF file if selected
        if (formData.pdf) {
          formDataToSend.append('pdf', formData.pdf)
        }
        
        // Add optional fields
        if (formData.coInvestigators && formData.coInvestigators.length > 0) {
          formDataToSend.append('coInvestigators', JSON.stringify(formData.coInvestigators));
        }
        if (formData.objectives && formData.objectives.length > 0) {
          formDataToSend.append('objectives', JSON.stringify(formData.objectives));
        }
        if (formData.methodology) {
          formDataToSend.append('methodology', formData.methodology);
        }
        if (formData.keyFindings && formData.keyFindings.length > 0) {
          formDataToSend.append('keyFindings', JSON.stringify(formData.keyFindings));
        }
        if (formData.tags && formData.tags.length > 0) {
          formDataToSend.append('tags', JSON.stringify(formData.tags));
        }

        // Add section-specific fields
        if (formData.section === 'ongoing-projects') {
          formDataToSend.append('projectType', formData.projectType || 'ICAR');
          formDataToSend.append('status', formData.status || 'ongoing');
          if (formData.fundingAgency) formDataToSend.append('fundingAgency', formData.fundingAgency);
          if (formData.budget) formDataToSend.append('budget', formData.budget);
          if (formData.duration) formDataToSend.append('duration', JSON.stringify(formData.duration));
        } else if (formData.section === 'publications' && formData.publicationDetails) {
          formDataToSend.append('publicationDetails', JSON.stringify(formData.publicationDetails));
        } else if (formData.section === 'student-research' && formData.studentDetails) {
          formDataToSend.append('studentDetails', JSON.stringify(formData.studentDetails));
        } else if (formData.section === 'collaborations' && formData.collaborationDetails) {
          formDataToSend.append('collaborationDetails', JSON.stringify(formData.collaborationDetails));
        } else if (formData.section === 'facilities' && formData.facilityDetails) {
          formDataToSend.append('facilityDetails', JSON.stringify(formData.facilityDetails));
        }

        console.log('=== FRONTEND SAVE DEBUG ===');
        console.log('FormData being sent:');
        for (let pair of formDataToSend.entries()) {
          console.log(pair[0], pair[1]);
        }
        console.log('=== END FRONTEND DEBUG ===');

        await researchAPI.create(formDataToSend)
        toast.success('Research item created successfully')
      }

      setShowAddModal(false)
      fetchResearchData()
    } catch (error) {
      console.error('Error saving research item:', error)
      toast.error(error.response?.data?.message || 'Failed to save research item')
    } finally {
      setSaving(false)
    }
  }

  const renderFormFields = () => {
    const section = activeTab

    return (
      <div className="space-y-6">
        {/* Basic Information */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
            <input
              type="text"
              value={formData.title || ''}
              onChange={(e) => handleInputChange('title', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter title"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Principal Investigator/Author *</label>
            <input
              type="text"
              value={formData.principalInvestigator || ''}
              onChange={(e) => handleInputChange('principalInvestigator', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter name"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
          <textarea
            value={formData.description || ''}
            onChange={(e) => handleInputChange('description', e.target.value)}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter description"
            required
          />
        </div>

        {/* Section-specific fields */}
        {section === 'ongoing-projects' && (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Project Type</label>
                <select
                  value={formData.projectType || 'ICAR'}
                  onChange={(e) => handleInputChange('projectType', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {projectTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                  value={formData.status || 'ongoing'}
                  onChange={(e) => handleInputChange('status', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {statusOptions.map(status => (
                    <option key={status} value={status}>{status.charAt(0).toUpperCase() + status.slice(1)}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Budget (₹)</label>
                <input
                  type="number"
                  value={formData.budget || ''}
                  onChange={(e) => handleInputChange('budget', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter budget"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Funding Agency</label>
                <input
                  type="text"
                  value={formData.fundingAgency || ''}
                  onChange={(e) => handleInputChange('fundingAgency', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter funding agency"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                  <input
                    type="date"
                    value={formData.duration?.startDate || ''}
                    onChange={(e) => handleNestedInputChange('duration', 'startDate', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                  <input
                    type="date"
                    value={formData.duration?.endDate || ''}
                    onChange={(e) => handleNestedInputChange('duration', 'endDate', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </>
        )}

        {section === 'publications' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Journal</label>
              <input
                type="text"
                value={formData.publicationDetails?.journal || ''}
                onChange={(e) => handleNestedInputChange('publicationDetails', 'journal', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Journal name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
              <input
                type="number"
                value={formData.publicationDetails?.year || new Date().getFullYear()}
                onChange={(e) => handleNestedInputChange('publicationDetails', 'year', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">DOI</label>
              <input
                type="text"
                value={formData.publicationDetails?.doi || ''}
                onChange={(e) => handleNestedInputChange('publicationDetails', 'doi', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="DOI"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Impact Factor</label>
              <input
                type="number"
                step="0.001"
                value={formData.publicationDetails?.impactFactor || ''}
                onChange={(e) => handleNestedInputChange('publicationDetails', 'impactFactor', parseFloat(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Impact factor"
              />
            </div>
          </div>
        )}

        {section === 'student-research' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Student Name</label>
              <input
                type="text"
                value={formData.studentDetails?.studentName || ''}
                onChange={(e) => handleNestedInputChange('studentDetails', 'studentName', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Student name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Degree</label>
              <select
                value={formData.studentDetails?.degree || 'M.F.Sc'}
                onChange={(e) => handleNestedInputChange('studentDetails', 'degree', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {degreeOptions.map(degree => (
                  <option key={degree} value={degree}>{degree}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Supervisor</label>
              <input
                type="text"
                value={formData.studentDetails?.supervisor || ''}
                onChange={(e) => handleNestedInputChange('studentDetails', 'supervisor', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Supervisor name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Completion Year</label>
              <input
                type="number"
                value={formData.studentDetails?.completionYear || new Date().getFullYear()}
                onChange={(e) => handleNestedInputChange('studentDetails', 'completionYear', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        )}

        {section === 'collaborations' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Partner Institution</label>
              <input
                type="text"
                value={formData.collaborationDetails?.partnerInstitution || ''}
                onChange={(e) => handleNestedInputChange('collaborationDetails', 'partnerInstitution', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Partner institution"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Partner Country</label>
              <input
                type="text"
                value={formData.collaborationDetails?.partnerCountry || ''}
                onChange={(e) => handleNestedInputChange('collaborationDetails', 'partnerCountry', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Partner country"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Collaboration Type</label>
              <select
                value={formData.collaborationDetails?.collaborationType || 'Research'}
                onChange={(e) => handleNestedInputChange('collaborationDetails', 'collaborationType', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {collaborationTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="mou"
                checked={formData.collaborationDetails?.mou || false}
                onChange={(e) => handleNestedInputChange('collaborationDetails', 'mou', e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded"
              />
              <label htmlFor="mou" className="ml-2 text-sm text-gray-700">MOU Signed</label>
            </div>
          </div>
        )}

        {section === 'facilities' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Facility Type</label>
              <select
                value={formData.facilityDetails?.type || 'Laboratory'}
                onChange={(e) => handleNestedInputChange('facilityDetails', 'type', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {facilityTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Capacity</label>
              <input
                type="text"
                value={formData.facilityDetails?.capacity || ''}
                onChange={(e) => handleNestedInputChange('facilityDetails', 'capacity', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Facility capacity"
              />
            </div>

            <div className="lg:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Specifications</label>
              <textarea
                value={formData.facilityDetails?.specifications || ''}
                onChange={(e) => handleNestedInputChange('facilityDetails', 'specifications', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Technical specifications"
              />
            </div>
          </div>
        )}

        {/* Common fields */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Objectives (One per line)</label>
          <textarea
            value={(formData.objectives || []).join('\n')}
            onChange={(e) => handleArrayInput('objectives', e.target.value)}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter objectives, one per line"
          />
        </div>

        {/* PDF Upload - Simple like FarmerResource */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Attach PDF Document</label>
          <input
            type="file"
            accept=".pdf"
            onChange={(e) => {
              const file = e.target.files[0]
              if (file) {
                if (file.type !== 'application/pdf') {
                  toast.error('Please select a PDF file')
                  return
                }
                if (file.size > 10 * 1024 * 1024) {
                  toast.error('File size should be less than 10MB')
                  return
                }
                handleInputChange('pdf', file)
              }
            }}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          {formData.pdf && (
            <p className="mt-1 text-sm text-gray-600">Selected: {formData.pdf.name}</p>
          )}
          {editingItem && editingItem.filename && (
            <div className="mt-2 p-2 bg-gray-50 rounded">
              <p className="text-sm text-gray-600">Current file: {editingItem.originalName || editingItem.filename}</p>
              <a href={getDocumentUrl(editingItem.filename)} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 text-sm">
                View Current PDF
              </a>
            </div>
          )}
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="publish"
            checked={formData.isPublished || true}
            onChange={(e) => handleInputChange('isPublished', e.target.checked)}
            className="w-4 h-4 text-blue-600 rounded"
          />
          <label htmlFor="publish" className="ml-2 text-sm text-gray-700">Publish on website</label>
        </div>
      </div>
    )
  }

  const renderTabContent = () => {
    const currentData = researchData[activeTab] || []
    const tabInfo = tabs.find(tab => tab.id === activeTab)

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900">{tabInfo?.name}</h3>
          <button
            onClick={handleAdd}
            className={`px-4 py-2 bg-${tabInfo?.color}-600 text-white rounded-md hover:bg-${tabInfo?.color}-700 flex items-center space-x-2`}
            style={{ backgroundColor: `var(--color-${tabInfo?.color}-600)` }}
          >
            <Plus className="w-4 h-4" />
            <span>Add {tabInfo?.name.slice(0, -1)}</span>
          </button>
        </div>

        {currentData.length === 0 ? (
          <Card className="p-8 text-center">
            <tabInfo.icon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No {tabInfo?.name.toLowerCase()} added yet</p>
            <button
              onClick={handleAdd}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Add First Item
            </button>
          </Card>
        ) : (
          <div className="space-y-4">
            {currentData.map((item) => (
              <Card key={item._id} className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <h4 className="text-lg font-medium text-gray-900">{item.title}</h4>
                      {item.projectType && (
                        <span className={`px-2 py-1 bg-${tabInfo?.color}-100 text-${tabInfo?.color}-800 text-xs rounded-full`}>
                          {item.projectType}
                        </span>
                      )}
                      {item.status && (
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          item.status === 'ongoing' ? 'bg-green-100 text-green-800' :
                          item.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {item.status}
                        </span>
                      )}
                    </div>
                    
                    <p className="text-gray-700 text-sm mb-4 line-clamp-2">{item.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-xs text-gray-500">Principal Investigator</p>
                        <p className="text-sm font-medium">{item.principalInvestigator}</p>
                      </div>
                      
                      {item.budget && (
                        <div>
                          <p className="text-xs text-gray-500">Budget</p>
                          <p className="text-sm font-medium text-green-600">₹{(item.budget / 100000).toFixed(1)}L</p>
                        </div>
                      )}
                      
                      {item.fundingAgency && (
                        <div>
                          <p className="text-xs text-gray-500">Funding Agency</p>
                          <p className="text-sm font-medium">{item.fundingAgency}</p>
                        </div>
                      )}
                      
                      {item.publicationDetails?.journal && (
                        <div>
                          <p className="text-xs text-gray-500">Journal</p>
                          <p className="text-sm font-medium">{item.publicationDetails.journal}</p>
                        </div>
                      )}
                      
                      {item.studentDetails?.studentName && (
                        <div>
                          <p className="text-xs text-gray-500">Student</p>
                          <p className="text-sm font-medium">{item.studentDetails.studentName}</p>
                        </div>
                      )}
                      
                      {item.collaborationDetails?.partnerInstitution && (
                        <div>
                          <p className="text-xs text-gray-500">Partner</p>
                          <p className="text-sm font-medium">{item.collaborationDetails.partnerInstitution}</p>
                        </div>
                      )}
                      
                      {item.facilityDetails?.type && (
                        <div>
                          <p className="text-xs text-gray-500">Type</p>
                          <p className="text-sm font-medium">{item.facilityDetails.type}</p>
                        </div>
                      )}
                    </div>
                    
                    {/* Objectives Display */}
                    {item.objectives && item.objectives.length > 0 && (
                      <div className="mb-3">
                        <p className="text-xs text-gray-500 mb-2">Key Objectives:</p>
                        <div className="bg-gray-50 p-2 rounded">
                          {item.objectives.map((obj, index) => (
                            <div key={index} className="text-xs text-gray-600 mb-1">• {obj}</div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* PDF File Display */}
                    {item.filename && (
                      <div className="mb-3">
                        <p className="text-xs text-gray-500 mb-2">PDF Document:</p>
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-blue-500" />
                          <span className="text-sm text-gray-700">{item.originalName || item.filename}</span>
                          <a
                            href={getDocumentUrl(item.filename)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded hover:bg-blue-200"
                          >
                            <Download className="w-3 h-3 mr-1" />
                            View PDF
                          </a>
                        </div>
                      </div>
                    )}
                    
                    {item.documents && item.documents.length > 0 && (
                      <div className="mb-3">
                        <p className="text-xs text-gray-500 mb-2">Additional Documents:</p>
                        <div className="flex flex-wrap gap-2">
                          {item.documents.map((doc, idx) => (
                            <a
                              key={idx}
                              href={doc.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded hover:bg-gray-200"
                            >
                              <FileText className="w-3 h-3 mr-1" />
                              {doc.name}
                              <Download className="w-3 h-3 ml-1" />
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-4">
                    <button
                      onClick={() => handleEdit(item)}
                      className="p-2 text-gray-400 hover:text-blue-600"
                      title="Edit"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="p-2 text-gray-400 hover:text-red-600"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    )
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading research data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Research Management</h1>
            <p className="text-gray-600">Manage research projects, publications, and collaborations</p>
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={() => window.open('/research', '_blank')}
              className="flex items-center px-4 py-2 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50"
            >
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </button>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-6">
          {tabs.map(tab => {
            const count = researchData[tab.id]?.length || 0
            return (
              <div key={tab.id} className={`bg-${tab.color}-50 rounded-lg p-4`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-sm text-${tab.color}-600`}>{tab.name}</p>
                    <p className={`text-2xl font-bold text-${tab.color}-900`}>{count}</p>
                  </div>
                  <tab.icon className={`w-8 h-8 text-${tab.color}-600`} />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {tab.name}
                </button>
              )
            })}
          </nav>
        </div>
        
        <div className="p-6">
          {renderTabContent()}
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-screen overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-medium text-gray-900">
                  {editingItem ? 'Edit' : 'Add'} {tabs.find(tab => tab.id === activeTab)?.name.slice(0, -1)}
                </h3>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {renderFormFields()}

              {/* Action Buttons */}
              <div className="flex justify-end space-x-3 mt-8 pt-6 border-t border-gray-200">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="px-6 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving || uploading}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  {(saving || uploading) ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>{uploading ? 'Uploading...' : 'Saving...'}</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      <span>{editingItem ? 'Update' : 'Save'}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ResearchManagement