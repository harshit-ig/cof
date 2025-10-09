import React, { useState, useEffect } from 'react'
import { Plus, Edit2, Trash2, Save, X, Users2, Award, TrendingUp, Minus } from 'lucide-react'
import { Form, FormGroup, Input, Textarea, SubmitButton } from '../common/Form'
import Modal from '../common/Modal'
import { collaborationsAPI } from '../../services/api'
import { toast } from 'react-hot-toast'

const CollaborationsManagement = () => {
  const [activeTab, setActiveTab] = useState('mou')
  const [collaborations, setCollaborations] = useState([])
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [partnersList, setPartnersList] = useState([{ name: '', description: '' }])

  const tabs = [
    { id: 'mou', name: 'MoUs & Implementations', icon: Users2 },
    { id: 'partnership', name: 'Our Collaborations & Partnerships', icon: Award },
    { id: 'impact', name: 'Collaboration Impact', icon: TrendingUp }
  ]

  useEffect(() => {
    fetchCollaborations()
  }, [activeTab])

  const fetchCollaborations = async () => {
    try {
      setLoading(true)
      const response = await collaborationsAPI.getAll({ section: activeTab })
      setCollaborations(response.data.data.collaborations || [])
    } catch (error) {
      toast.error('Failed to fetch collaborations')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const data = {
      section: activeTab,
      title: formData.get('title'),
      description: formData.get('description'),
      sortOrder: parseInt(formData.get('sortOrder') || 0),
      isPublished: formData.get('isPublished') === 'true'
    }

    // Add section-specific fields
    if (activeTab === 'mou') {
      data.organization = formData.get('organization')
      data.type = formData.get('type')
      data.category = formData.get('category')
      data.signedDate = formData.get('signedDate')
      data.duration = formData.get('duration')
      data.outcomes = formData.get('outcomes')
      data.contactPerson = formData.get('contactPerson')
      data.status = formData.get('status')
      
      // Handle arrays
      const objectives = formData.get('objectives')
      data.objectives = objectives ? objectives.split('\n').filter(Boolean) : []
      const activities = formData.get('activities')
      data.activities = activities ? activities.split('\n').filter(Boolean) : []
    } else if (activeTab === 'partnership') {
      data.partnerType = formData.get('partnerType')
      // Build partners array from dynamic form fields
      data.partners = partnersList.filter(p => p.name.trim() !== '')
    } else if (activeTab === 'impact') {
      data.icon = formData.get('icon')
      data.value = formData.get('value')
      data.label = formData.get('label')
      data.color = formData.get('color')
      // Auto-generate impactType and title from label
      data.impactType = formData.get('label').toLowerCase().replace(/\s+/g, '_')
      data.title = formData.get('label')
    }

    try {
      setSubmitting(true)
      if (editingItem) {
        await collaborationsAPI.update(editingItem._id, data)
        toast.success('Collaboration updated successfully')
      } else {
        await collaborationsAPI.create(data)
        toast.success('Collaboration created successfully')
      }
      setShowModal(false)
      setEditingItem(null)
      fetchCollaborations()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Operation failed')
    } finally {
      setSubmitting(false)
    }
  }

  const handleEdit = (item) => {
    setEditingItem(item)
    if (item.section === 'partnership' && item.partners) {
      setPartnersList(item.partners.length > 0 ? item.partners : [{ name: '', description: '' }])
    }
    setShowModal(true)
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this collaboration?')) return
    
    try {
      await collaborationsAPI.delete(id)
      toast.success('Collaboration deleted successfully')
      fetchCollaborations()
    } catch (error) {
      toast.error('Failed to delete collaboration')
    }
  }

  const renderForm = () => {
    if (activeTab === 'mou') {
      return (
        <>
          <FormGroup label="Organization Name" required>
            <Input name="organization" defaultValue={editingItem?.organization} required />
          </FormGroup>

          <div className="grid grid-cols-2 gap-4">
            <FormGroup label="Type" required>
              <Input name="type" defaultValue={editingItem?.type} placeholder="e.g., Government Agency" required />
            </FormGroup>

            <FormGroup label="Category" required>
              <Input name="category" defaultValue={editingItem?.category} placeholder="e.g., Marketing & Distribution" required />
            </FormGroup>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormGroup label="Signed Date">
              <Input name="signedDate" defaultValue={editingItem?.signedDate} placeholder="e.g., March 2023" />
            </FormGroup>

            <FormGroup label="Duration">
              <Input name="duration" defaultValue={editingItem?.duration} placeholder="e.g., 5 Years" />
            </FormGroup>
          </div>

          <FormGroup label="Title" required>
            <Input name="title" defaultValue={editingItem?.title} required />
          </FormGroup>

          <FormGroup label="Description" required>
            <Textarea name="description" defaultValue={editingItem?.description} rows={3} required />
          </FormGroup>

          <FormGroup>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Objectives (one per line)
            </label>
            <textarea
              name="objectives"
              defaultValue={editingItem?.objectives?.join('\n')}
              rows={4}
              placeholder="Enter objectives, one per line&#10;Press Enter to create new lines&#10;Example:&#10;• Enhance research collaboration&#10;• Share best practices&#10;• Develop joint programs"
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-y min-h-[100px] bg-white font-mono text-sm"
              style={{ lineHeight: '1.5', whiteSpace: 'pre-wrap' }}
            />
          </FormGroup>

          <FormGroup>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Activities (one per line)
            </label>
            <textarea
              name="activities"
              defaultValue={editingItem?.activities?.join('\n')}
              rows={4}
              placeholder="Enter activities, one per line&#10;Press Enter to create new lines&#10;Example:&#10;• Joint research projects&#10;• Student exchange programs&#10;• Faculty collaboration"
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-y min-h-[100px] bg-white font-mono text-sm"
              style={{ lineHeight: '1.5', whiteSpace: 'pre-wrap' }}
            />
          </FormGroup>

          <FormGroup label="Outcomes">
            <Input name="outcomes" defaultValue={editingItem?.outcomes} />
          </FormGroup>

          <FormGroup label="Contact Person">
            <Input name="contactPerson" defaultValue={editingItem?.contactPerson} />
          </FormGroup>

          <div className="grid grid-cols-3 gap-4">
            <FormGroup label="Status">
              <select name="status" defaultValue={editingItem?.status || 'Active'} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="Active">Active</option>
                <option value="Completed">Completed</option>
                <option value="Terminated">Terminated</option>
                <option value="Renewed">Renewed</option>
              </select>
            </FormGroup>

            <FormGroup label="Sort Order">
              <Input type="number" name="sortOrder" defaultValue={editingItem?.sortOrder || 0} placeholder="0" />
            </FormGroup>

            <FormGroup label="Published">
              <select name="isPublished" defaultValue={editingItem?.isPublished !== false ? 'true' : 'false'} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </FormGroup>
          </div>
        </>
      )
    } else if (activeTab === 'partnership') {
      return (
        <>
          <FormGroup label="Partner Type / Category" required>
            <Input name="partnerType" defaultValue={editingItem?.partnerType} placeholder="e.g., Government Departments & Boards" required />
          </FormGroup>

          <FormGroup label="Section Title" required>
            <Input name="title" defaultValue={editingItem?.title} placeholder="e.g., Government Departments & Boards" required />
          </FormGroup>

          <FormGroup label="Section Description" required>
            <Textarea name="description" defaultValue={editingItem?.description} rows={3} placeholder="Brief description of this partnership category" required />
          </FormGroup>

          <div className="border-t pt-4 mt-4">
            <div className="flex items-center justify-between mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Partners <span className="text-red-500">*</span>
              </label>
              <button
                type="button"
                onClick={() => setPartnersList([...partnersList, { name: '', description: '' }])}
                className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
              >
                <Plus className="w-4 h-4" /> Add Partner
              </button>
            </div>
            
            <div className="space-y-3">
              {partnersList.map((partner, index) => (
                <div key={index} className="flex gap-3 items-start bg-gray-50 p-3 rounded-lg">
                  <div className="flex-1 space-y-2">
                    <input
                      type="text"
                      value={partner.name}
                      onChange={(e) => {
                        const updated = [...partnersList]
                        updated[index].name = e.target.value
                        setPartnersList(updated)
                      }}
                      placeholder="Partner Name (e.g., Department of Fisheries)"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      required
                    />
                    <input
                      type="text"
                      value={partner.description}
                      onChange={(e) => {
                        const updated = [...partnersList]
                        updated[index].description = e.target.value
                        setPartnersList(updated)
                      }}
                      placeholder="Partner Description"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      required
                    />
                  </div>
                  {partnersList.length > 1 && (
                    <button
                      type="button"
                      onClick={() => setPartnersList(partnersList.filter((_, i) => i !== index))}
                      className="p-2 text-red-600 hover:bg-red-50 rounded"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormGroup label="Sort Order">
              <Input type="number" name="sortOrder" defaultValue={editingItem?.sortOrder || 0} placeholder="0" />
            </FormGroup>

            <FormGroup label="Published">
              <select name="isPublished" defaultValue={editingItem?.isPublished !== false ? 'true' : 'false'} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </FormGroup>
          </div>
        </>
      )
    } else if (activeTab === 'impact') {
      return (
        <>
          <FormGroup label="Value / Number" required>
            <Input name="value" defaultValue={editingItem?.value} placeholder="e.g., ₹5.2 Cr or 12+ or 5000+" required />
          </FormGroup>

          <FormGroup label="Label / Description" required>
            <Input name="label" defaultValue={editingItem?.label} placeholder="e.g., Total Funding Received" required />
          </FormGroup>

          <FormGroup label="Icon Name" required>
            <select name="icon" defaultValue={editingItem?.icon || 'Users2'} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required>
              <option value="Users2">Users Icon</option>
              <option value="Building2">Building Icon</option>
              <option value="Users">Team Icon</option>
              <option value="Globe">Globe Icon</option>
              <option value="Award">Award Icon</option>
              <option value="TrendingUp">Trending Up Icon</option>
              <option value="DollarSign">Dollar Sign Icon</option>
              <option value="Target">Target Icon</option>
            </select>
          </FormGroup>

          <div className="grid grid-cols-3 gap-4">
            <FormGroup label="Color Theme">
              <select name="color" defaultValue={editingItem?.color || 'blue'} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="blue">Blue</option>
                <option value="green">Green</option>
                <option value="purple">Purple</option>
                <option value="orange">Orange</option>
                <option value="red">Red</option>
                <option value="indigo">Indigo</option>
                <option value="yellow">Yellow</option>
              </select>
            </FormGroup>

            <FormGroup label="Sort Order">
              <Input type="number" name="sortOrder" defaultValue={editingItem?.sortOrder || 0} placeholder="0" />
            </FormGroup>

            <FormGroup label="Published">
              <select name="isPublished" defaultValue={editingItem?.isPublished !== false ? 'true' : 'false'} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </FormGroup>
          </div>

          <FormGroup label="Additional Details (Optional)">
            <Textarea name="description" defaultValue={editingItem?.description} rows={2} placeholder="Optional additional information" />
          </FormGroup>
        </>
      )
    }
  }

  const renderCollaborations = () => {
    if (loading) {
      return <div className="text-center py-8">Loading...</div>
    }

    if (collaborations.length === 0) {
      return (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No collaborations found. Click "Add New" to create one.</p>
        </div>
      )
    }

    return (
      <div className="grid grid-cols-1 gap-4">
        {collaborations.map((item) => (
          <div key={item._id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {activeTab === 'mou' ? item.organization : activeTab === 'impact' ? item.label : item.title}
                </h3>
                {activeTab === 'mou' && (
                  <div className="flex gap-3 text-sm text-gray-600 mb-2">
                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded">{item.type}</span>
                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded">{item.category}</span>
                    <span className={`px-2 py-1 rounded ${item.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                      {item.status}
                    </span>
                  </div>
                )}
                {activeTab === 'partnership' && (
                  <p className="text-sm text-gray-600 mb-2">Type: {item.partnerType}</p>
                )}
                {activeTab === 'impact' && (
                  <p className="text-2xl font-bold text-blue-600 mb-1">{item.value}</p>
                )}
                <p className="text-gray-700">{item.description}</p>
              </div>
              <div className="flex gap-2 ml-4">
                <button
                  onClick={() => handleEdit(item)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  title="Edit"
                >
                  <Edit2 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Delete"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
            {item.sortOrder !== undefined && (
              <div className="text-xs text-gray-500">Sort Order: {item.sortOrder}</div>
            )}
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Collaborations Management</h1>
            <p className="text-gray-600 mt-1">Manage MoUs, Partnerships, and Impact metrics</p>
          </div>
          <button
            onClick={() => {
              setEditingItem(null)
              setPartnersList([{ name: '', description: '' }])
              setShowModal(true)
            }}
            className="btn-primary flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add New
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 border-b border-gray-200">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                <Icon className="w-5 h-5" />
                {tab.name}
              </button>
            )
          })}
        </div>
      </div>

      {/* Content */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        {renderCollaborations()}
      </div>

      {/* Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false)
          setEditingItem(null)
        }}
        title={`${editingItem ? 'Edit' : 'Add'} ${tabs.find(t => t.id === activeTab)?.name}`}
      >
        <Form onSubmit={handleSubmit}>
          {renderForm()}

          <div className="flex justify-end gap-3 mt-6 pt-6 border-t">
            <button
              type="button"
              onClick={() => {
                setShowModal(false)
                setEditingItem(null)
                setPartnersList([{ name: '', description: '' }])
              }}
              className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
            >
              Cancel
            </button>
            <SubmitButton isLoading={submitting}>
              {editingItem ? 'Update' : 'Create'}
            </SubmitButton>
          </div>
        </Form>
      </Modal>
    </div>
  )
}

export default CollaborationsManagement
