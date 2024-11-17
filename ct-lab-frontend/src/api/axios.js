import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
    headers: {
<<<<<<< Updated upstream
        'Content-Type': 'application/json'
    }
});

// Add a request interceptor
=======
        'Content-Type': 'application/json',
    },
    withCredentials: true,
    timeout: 10000,
});

// Request interceptor
>>>>>>> Stashed changes
api.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

<<<<<<< Updated upstream
// Add a response interceptor
api.interceptors.response.use(
    response => response.data,
    error => {
        if (error.response?.status === 401) {
        localStorage.removeItem('token');
        window.location.href = '/login';
=======
// Response interceptor
api.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.status === 401 &&
            (error.config.url.includes('/quiz') ||
            error.config.url.includes('/auth/validate-token'))) {
                sessionManager.clearSession();
                if (!window.location.pathname.includes('/login')) {
                    window.location.href = '/login';
            }
        } else if (error.request) {
        // Request made but no response
        console.error('Network error');
        } else {
        console.error('Error:', error.message);
>>>>>>> Stashed changes
        }
        return Promise.reject(error);
    }
);

export default api;