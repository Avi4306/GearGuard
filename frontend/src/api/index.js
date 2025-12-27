import axios from 'axios';

// Axios Instance Configuration
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
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

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// ============================================
// EQUIPMENT API
// ============================================
export const equipmentApi = {
  getAll: async (params = {}) => {
    const response = await axiosInstance.get('/equipment', { params });
    return response.data;
  },

  getById: async (id) => {
    const response = await axiosInstance.get(`/equipment/${id}`);
    return response.data;
  },

  create: async (data) => {
    const response = await axiosInstance.post('/equipment', data);
    return response.data;
  },

  update: async (id, data) => {
    const response = await axiosInstance.put(`/equipment/${id}`, data);
    return response.data;
  },

  delete: async (id) => {
    const response = await axiosInstance.delete(`/equipment/${id}`);
    return response.data;
  },

  getByDepartment: async (department) => {
    const response = await axiosInstance.get(`/equipment/department/${department}`);
    return response.data;
  },

  getByEmployee: async (employeeId) => {
    const response = await axiosInstance.get(`/equipment/employee/${employeeId}`);
    return response.data;
  },

  getRequests: async (id) => {
    const response = await axiosInstance.get(`/equipment/${id}/requests`);
    return response.data;
  }
};

// ============================================
// REQUEST API
// ============================================
export const requestApi = {
  getAll: async (params = {}) => {
    const response = await axiosInstance.get('/requests', { params });
    return response.data;
  },

  getById: async (id) => {
    const response = await axiosInstance.get(`/requests/${id}`);
    return response.data;
  },

  create: async (data) => {
    const response = await axiosInstance.post('/requests', data);
    return response.data;
  },

  update: async (id, data) => {
    const response = await axiosInstance.put(`/requests/${id}`, data);
    return response.data;
  },

  updateStage: async (id, stage) => {
    const response = await axiosInstance.patch(`/requests/${id}/stage`, { stage });
    return response.data;
  },

  assignTechnician: async (id, technicianId) => {
    const response = await axiosInstance.patch(`/requests/${id}/assign`, { technicianId });
    return response.data;
  },

  delete: async (id) => {
    const response = await axiosInstance.delete(`/requests/${id}`);
    return response.data;
  },

  getByTeam: async (teamId) => {
    const response = await axiosInstance.get(`/requests/team/${teamId}`);
    return response.data;
  },

  getByStage: async (stage) => {
    const response = await axiosInstance.get(`/requests/stage/${stage}`);
    return response.data;
  },

  getCalendarEvents: async (startDate, endDate) => {
    const response = await axiosInstance.get('/requests/calendar', {
      params: { startDate, endDate }
    });
    return response.data;
  }
};

// ============================================
// TEAM API
// ============================================
export const teamApi = {
  getAll: async () => {
    const response = await axiosInstance.get('/teams');
    return response.data;
  },

  getById: async (id) => {
    const response = await axiosInstance.get(`/teams/${id}`);
    return response.data;
  },

  create: async (data) => {
    const response = await axiosInstance.post('/teams', data);
    return response.data;
  },

  update: async (id, data) => {
    const response = await axiosInstance.put(`/teams/${id}`, data);
    return response.data;
  },

  delete: async (id) => {
    const response = await axiosInstance.delete(`/teams/${id}`);
    return response.data;
  },

  getMembers: async (id) => {
    const response = await axiosInstance.get(`/teams/${id}/members`);
    return response.data;
  },

  addMember: async (teamId, userId) => {
    const response = await axiosInstance.post(`/teams/${teamId}/members`, { userId });
    return response.data;
  },

  removeMember: async (teamId, userId) => {
    const response = await axiosInstance.delete(`/teams/${teamId}/members/${userId}`);
    return response.data;
  }
};

export default axiosInstance;