import axios from 'axios'

// Create axios instance with base configuration
const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add auth token
api.interceptors.request.use((config) => {
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
  create: (data) => api.post('/news', data),
  update: (id, data) => api.put(`/news/${id}`, data),
  delete: (id) => api.delete(`/news/${id}`),
}

export const eventsAPI = {
  getAll: (params) => api.get('/events', { params }),
  getUpcoming: (params) => api.get('/events/upcoming', { params }),
  getById: (id) => api.get(`/events/${id}`),
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
    const formData = new FormData()
    formData.append('file', file)
    formData.append('category', category)
    return api.post('/upload/single', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },
  multiple: (files, category = 'images') => {
    const formData = new FormData()
    files.forEach((file) => {
      formData.append('files', file)
    })
    formData.append('category', category)
    return api.post('/upload/multiple', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },
  delete: (filename) => api.delete(`/upload/${filename}`),
  getImageUrl: (filename, type = 'images') => {
    if (!filename) return null

    // Handle external URLs (proxy through backend)
    if (filename.startsWith('http')) {
      return `/api/proxy/image?url=${encodeURIComponent(filename)}`
    }

    // Handle local files - use relative URL which will be proxied by Vite
    return `/api/upload/serve/${type}/${filename}`
  },
}

export default api