import axios from 'axios';

// Create axios instance with default config
export const apiClient = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    withCredentials: true,
});

// Add request interceptor to include auth token if available
apiClient.interceptors.request.use(
    (config) => {
        // Get token from localStorage if exists
        const token = localStorage.getItem('auth_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add response interceptor for error handling
apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Handle 401 unauthorized errors
        if (error.response?.status === 401) {
            localStorage.removeItem('auth_token');
            localStorage.removeItem('user');
            localStorage.removeItem('participant');
        }
        
        // Handle 403 forbidden errors
        if (error.response?.status === 403) {
            console.error('Access forbidden:', error.response.data);
        }
        
        return Promise.reject(error);
    }
);

export default apiClient;