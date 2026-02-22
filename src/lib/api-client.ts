import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosError } from 'axios';

// ── Configuration ──
const API_BASE_URL = (import.meta as any).env?.VITE_API_URL || 'http://localhost:8000/api/v1';

/**
 * Centralized Axios instance for all API calls.
 * Automatically attaches auth token and tenant headers.
 */
const apiClient: AxiosInstance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json',
    },
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
    (error: AxiosError) => {
        if (error.response?.status === 401) {
            // Token expired or invalid → clear auth and redirect
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
    get: <T>(url: string, config?: AxiosRequestConfig) =>
        apiClient.get<T>(url, config).then((res) => res.data),

    post: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
        apiClient.post<T>(url, data, config).then((res) => res.data),

    put: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
        apiClient.put<T>(url, data, config).then((res) => res.data),

    patch: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
        apiClient.patch<T>(url, data, config).then((res) => res.data),

    delete: <T>(url: string, config?: AxiosRequestConfig) =>
        apiClient.delete<T>(url, config).then((res) => res.data),
};
