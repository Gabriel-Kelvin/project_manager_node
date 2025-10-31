import axios from 'axios';

// Determine API URL based on environment
// For local development: use localhost:8000 (backend runs on 8000 locally)
// For production/Docker: use REACT_APP_API_URL or VM IP
const getApiUrl = () => {
  if (process.env.REACT_APP_API_URL) {
    return process.env.REACT_APP_API_URL;
  }
  // Local development - backend typically runs on port 8000
  if (process.env.NODE_ENV === 'development' || window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    return 'http://localhost:8000';
  }
  // Production/Docker - use VM IP
  return 'http://3.85.144.221:8010';
};

// Create axios instance
const api = axios.create({
  baseURL: getApiUrl(),
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - Add token to all requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle 401 errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token is invalid or expired
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Authentication API
export const auth = {
  signup: async (username, password, email) => {
    const response = await api.post('/auth/signup', { username, password, email });
    return response.data;
  },
  
  login: async (username, password) => {
    const response = await api.post('/auth/login', { username, password });
    return response.data;
  },
  
  logout: async () => {
    const response = await api.post('/auth/logout');
    return response.data;
  },
  
  verify: async () => {
    const response = await api.get('/auth/verify');
    return response.data;
  },
  
  getMe: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },
};

// Projects API
export const projects = {
  getAll: async () => {
    const response = await api.get('/projects');
    return response.data;
  },
  
  getById: async (id) => {
    const response = await api.get(`/projects/${id}`);
    return response.data;
  },
  
  create: async (data) => {
    const response = await api.post('/projects', data);
    return response.data;
  },
  
  update: async (id, data) => {
    const response = await api.put(`/projects/${id}`, data);
    return response.data;
  },
  
  delete: async (id) => {
    const response = await api.delete(`/projects/${id}`);
    return response.data;
  },
  
  getStats: async (id) => {
    const response = await api.get(`/projects/${id}/stats`);
    return response.data;
  },
};

// Tasks API
export const tasks = {
  getAll: async (projectId) => {
    const response = await api.get(`/projects/${projectId}/tasks`);
    return response.data;
  },
  
  getById: async (projectId, taskId) => {
    const response = await api.get(`/projects/${projectId}/tasks/${taskId}`);
    return response.data;
  },
  
  create: async (projectId, data) => {
    const response = await api.post(`/projects/${projectId}/tasks`, data);
    return response.data;
  },
  
  update: async (projectId, taskId, data) => {
    const response = await api.put(`/projects/${projectId}/tasks/${taskId}`, data);
    return response.data;
  },
  
  updateStatus: async (projectId, taskId, status) => {
    const response = await api.patch(`/projects/${projectId}/tasks/${taskId}/status`, { status });
    return response.data;
  },
  
  delete: async (projectId, taskId) => {
    const response = await api.delete(`/projects/${projectId}/tasks/${taskId}`);
    return response.data;
  },
};

// Team Members API
export const members = {
  getAll: async (projectId) => {
    const response = await api.get(`/projects/${projectId}/members`);
    return response.data;
  },
  
  getById: async (projectId, username) => {
    const response = await api.get(`/projects/${projectId}/members/${username}`);
    return response.data;
  },
  
  add: async (projectId, username, role) => {
    const response = await api.post(`/projects/${projectId}/members`, { username, role });
    return response.data;
  },
  
  updateRole: async (projectId, username, role) => {
    const response = await api.put(`/projects/${projectId}/members/${username}`, { role });
    return response.data;
  },
  
  remove: async (projectId, username) => {
    const response = await api.delete(`/projects/${projectId}/members/${username}`);
    return response.data;
  },
  
  getPermissions: async (projectId, username) => {
    const response = await api.get(`/projects/${projectId}/members/${username}/permissions`);
    return response.data;
  },
};

// Analytics API
export const analytics = {
  getProjectAnalytics: async (projectId) => {
    const response = await api.get(`/projects/${projectId}/analytics`);
    return response.data;
  },
  
  getTimeline: async (projectId, days = 30) => {
    const response = await api.get(`/projects/${projectId}/analytics/timeline?days=${days}`);
    return response.data;
  },
  
  getMemberAnalytics: async (projectId, username) => {
    const response = await api.get(`/projects/${projectId}/analytics/member/${username}`);
    return response.data;
  },
};

// Dashboard API
export const dashboard = {
  getSummary: async () => {
    const response = await api.get('/dashboard');
    return response.data;
  },
  
  getQuickSummary: async () => {
    const response = await api.get('/dashboard/summary');
    return response.data;
  },
  
  getRecentActivity: async (limit = 10) => {
    const response = await api.get(`/dashboard/recent-activity?limit=${limit}`);
    return response.data;
  },
};

export default api;

