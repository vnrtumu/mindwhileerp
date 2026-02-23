import axios from 'axios';

// ── Configuration ──
// Forced override: Ignored Vercel's old VITE_API_URL environment variables
const API_BASE_URL = 'https://schoolerp-w7x2.onrender.com/api/v1';

/**
 * Centralized Axios instance for all API calls.
 * Automatically attaches auth token and tenant headers.
 */
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// ── Request Interceptor: Attach auth token + tenant header ──
apiClient.interceptors.request.use(
  (config) => {
    // Auth token
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Tenant header (for multi-school isolation)
    const tenantId = localStorage.getItem('tenant_id');
    if (tenantId) {
      config.headers['X-Tenant-ID'] = tenantId;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ── Response Interceptor: Handle 401 globally ──
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      // Token expired or invalid permissions → clear auth and redirect
      localStorage.removeItem('auth_token');
      localStorage.removeItem('auth_user');
      window.location.href = '/auth/login';
    }
    return Promise.reject(error);
  }
);

export default apiClient;

// ── Convenience typed helpers ──

/**
 * Generic GET request.
 *  const students = await api.get<Student[]>('/students');
 */
export const api = {
  get: (url, config) =>
    apiClient.get(url, config).then((res) => res.data),

  post: (url, data, config) =>
    apiClient.post(url, data, config).then((res) => res.data),

  put: (url, data, config) =>
    apiClient.put(url, data, config).then((res) => res.data),

  patch: (url, data, config) =>
    apiClient.patch(url, data, config).then((res) => res.data),

  delete: (url, config) =>
    apiClient.delete(url, config).then((res) => res.data)
};