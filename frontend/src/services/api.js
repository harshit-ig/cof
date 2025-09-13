import axios from 'axios'
import placeholderImage from '../assets/placeholder-image.jpg'

// Create axios instance with base configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_SERVER_HOST || '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0'
  },
})

// Create a separate axios instance for file uploads without Content-Type header
const uploadApi = axios.create({
  baseURL: import.meta.env.VITE_SERVER_HOST || '/api',
  timeout: 30000, // Longer timeout for file uploads
})

// Request interceptor to add auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  // Add timestamp to prevent caching
  if (config.method === 'get') {
    config.params = {
      ...config.params,
      _t: Date.now()
    }
  }
  return config
})

// Request interceptor for upload API to add auth token
uploadApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Only redirect to login if we're not already on the login page
    if (error.response?.status === 401 && !window.location.pathname.includes('/admin/login')) {
      localStorage.removeItem('token')
      // Check if we're in admin area before redirecting
      if (window.location.pathname.startsWith('/admin')) {
        window.location.href = '/admin/login'
      }
    }
    return Promise.reject(error)
  }
)

// API Services
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  getProfile: () => api.get('/auth/me'),
  updateProfile: (data) => api.put('/auth/profile', data),
  changePassword: (data) => api.put('/auth/change-password', data),
}

export const programsAPI = {
  getAll: (params) => api.get('/programs', { params }),
  getById: (id) => api.get(`/programs/${id}`),
  create: (data) => api.post('/programs', data),
  update: (id, data) => api.put(`/programs/${id}`, data),
  delete: (id) => api.delete(`/programs/${id}`),
}

export const facultyAPI = {
  getAll: (params) => api.get('/faculty', { params }),
  getById: (id) => api.get(`/faculty/${id}`),
  create: (data) => api.post('/faculty', data),
  update: (id, data) => api.put(`/faculty/${id}`, data),
  delete: (id) => api.delete(`/faculty/${id}`),
}

export const newsAPI = {
  getAll: (params) => api.get('/news', { params }),
  getById: (id) => api.get(`/news/${id}`),
  create: (data) => {
    console.log('newsAPI.create called with:', data)
    return api.post('/news', data)
  },
  update: (id, data) => {
    console.log('newsAPI.update called with:', { id, data })
    return api.put(`/news/${id}`, data)
  },
  delete: (id) => api.delete(`/news/${id}`),
  uploadImage: (file) => {
    console.log('newsAPI.uploadImage called with file:', file.name, file.size, 'bytes')
    const formData = new FormData()
    formData.append('file', file)
    return uploadApi.post('/news/upload', formData, {
      headers: {
        'X-Upload-Category': 'news',
      },
    })
  },
}

export const eventsAPI = {
  getAll: (params) => api.get('/events', { params }),
  getUpcoming: (params) => api.get('/events/upcoming', { params }),
  getById: (id) => api.get(`/events/${id}`),
  create: (data) => {
    console.log('eventsAPI.create called with:', data)
    return api.post('/events', data)
  },
  update: (id, data) => {
    console.log('eventsAPI.update called with:', { id, data })
    return api.put(`/events/${id}`, data)
  },
  delete: (id) => api.delete(`/events/${id}`),
}

export const researchAPI = {
  getAll: (params) => api.get('/research', { params }),
  getById: (id) => api.get(`/research/${id}`),
  create: (data) => api.post('/research', data),
  update: (id, data) => api.put(`/research/${id}`, data),
  delete: (id) => api.delete(`/research/${id}`),
}

export const infrastructureAPI = {
  getAll: (params) => api.get('/infrastructure', { params }),
  getById: (id) => api.get(`/infrastructure/${id}`),
  create: (data) => api.post('/infrastructure', data),
  update: (id, data) => api.put(`/infrastructure/${id}`, data),
  delete: (id) => api.delete(`/infrastructure/${id}`),
}

export const collaborationsAPI = {
  getAll: (params) => api.get('/collaborations', { params }),
  getById: (id) => api.get(`/collaborations/${id}`),
  create: (data) => api.post('/collaborations', data),
  update: (id, data) => api.put(`/collaborations/${id}`, data),
  delete: (id) => api.delete(`/collaborations/${id}`),
}

export const contentAPI = {
  getBySection: (section, params) => api.get(`/content/${section}`, { params }),
  getByKey: (key) => api.get(`/content/key/${key}`),
  getAll: (params) => api.get('/content/admin/all', { params }),
  create: (data) => api.post('/content', data),
  update: (id, data) => api.put(`/content/${id}`, data),
  delete: (id) => api.delete(`/content/${id}`),
}

export const uploadAPI = {
  single: (file, category = 'images') => {
    console.log('uploadAPI.single called with:', { file, category })
    console.log('File object details:', {
      name: file?.name,
      size: file?.size,
      type: file?.type,
      constructor: file?.constructor?.name,
      lastModified: file?.lastModified
    })
    
    if (!file) {
      console.error('No file provided to uploadAPI.single')
      return Promise.reject(new Error('No file provided'))
    }
    
    const formData = new FormData()
    formData.append('file', file)
    formData.append('category', category)
    
    console.log('FormData created, entries:', Array.from(formData.entries()))
    console.log('FormData file entry:', formData.get('file'))
    console.log('FormData category entry:', formData.get('category'))
    
    return uploadApi.post('/upload/single', formData, {
      headers: {
        'X-Upload-Category': category,
      },
    })
  },
  multiple: (files, category = 'images') => {
    const formData = new FormData()
    files.forEach((file) => {
      formData.append('files', file)
    })
    formData.append('category', category)
    return uploadApi.post('/upload/multiple', formData, {
      headers: {
        'X-Upload-Category': category,
      },
    })
  },
  delete: (filename) => api.delete(`/upload/${filename}`),
  getImageUrl: (filename, type = 'images') => {
    if (!filename) return placeholderImage
    
    // Return placeholder for missing/null filenames to prevent endless requests
    if (filename === 'null' || filename === 'undefined' || filename === '') {
      return placeholderImage // Use the imported placeholder image
    }

    // Handle external URLs (proxy through backend)
    if (filename.startsWith('http')) {
      const baseURL = import.meta.env.VITE_SERVER_HOST || '/api'
      return `${baseURL}/proxy/image?url=${encodeURIComponent(filename)}`
    }

    // Get the base URL from environment variable
    const serverHost = import.meta.env.VITE_SERVER_HOST || 'http://localhost:5000/api'
    const baseURL = serverHost.replace('/api', '')
    
    // Handle files that already have the full path
    if (filename.startsWith('/uploads/')) {
      return `${baseURL}${filename}`
    }
    
    // Handle relative filenames
    return `${baseURL}/uploads/${type}/${filename}`
  },
}

export const slideshowAPI = {
  getAll: () => api.get('/slideshow'),
  getAllAdmin: () => api.get('/slideshow/admin'),
  getById: (id) => api.get(`/slideshow/${id}`),
  create: (formData) => uploadApi.post('/slideshow', formData, {
    headers: {
      'X-Upload-Category': 'slideshow',
    },
  }),
  update: (id, formData) => uploadApi.put(`/slideshow/${id}`, formData, {
    headers: {
      'X-Upload-Category': 'slideshow',
    },
  }),
  delete: (id) => api.delete(`/slideshow/${id}`),
  reorder: (slides) => api.post('/slideshow/reorder', { slides }),
}

export const settingsAPI = {
  get: () => api.get('/settings'),
  update: (settings) => api.put('/settings', settings),
  getPublic: () => api.get('/settings/public'),
}

export const galleryAPI = {
  getAll: () => api.get('/gallery'),
  getAllAdmin: (params) => api.get('/gallery/admin/all', { params }),
  getById: (id) => api.get(`/gallery/${id}`),
  create: (formData) => uploadApi.post('/gallery', formData, {
    headers: {
      'X-Upload-Category': 'gallery',
    },
  }),
  update: (id, formData) => uploadApi.put(`/gallery/${id}`, formData, {
    headers: {
      'X-Upload-Category': 'gallery',
    },
  }),
  delete: (id) => api.delete(`/gallery/${id}`),
  bulkDelete: (ids) => api.delete('/gallery/bulk/delete', { data: { ids } }),
  toggleStatus: (id) => api.patch(`/gallery/${id}/toggle-status`),
}

export const placementAPI = {
  submit: (formData) => uploadApi.post('/placement/submit', formData, {
    headers: {
      'X-Upload-Category': 'placement',
    },
  }),
}

export const incubationAPI = {
  register: (formData) => uploadApi.post('/incubation/register', formData, {
    headers: {
      'X-Upload-Category': 'incubation',
    },
  }),
}

export const farmersAPI = {
  // Public endpoints
  getResources: (params = {}) => api.get('/farmers/resources', { params }),
  getResource: (id) => api.get(`/farmers/resources/${id}`),
  downloadResource: (id) => {
    // Create a direct download link
    const baseURL = import.meta.env.VITE_SERVER_HOST || '/api'
    const serverHost = baseURL.replace('/api', '')
    return `${serverHost}/api/farmers/resources/${id}/download`
  },
  
  // Admin endpoints
  createResource: (formData) => uploadApi.post('/farmers/resources', formData),
  updateResource: (id, data) => api.put(`/farmers/resources/${id}`, data),
  deleteResource: (id) => api.delete(`/farmers/resources/${id}`),
  getAdminResources: (params = {}) => api.get('/farmers/admin/resources', { params }),
  
  // Email endpoints (existing)
  sendAdvisoryQuery: (data) => api.post('/farmers/advisory', data),
  sendTrainingQuery: (data) => api.post('/farmers/training', data),
}

export default api

