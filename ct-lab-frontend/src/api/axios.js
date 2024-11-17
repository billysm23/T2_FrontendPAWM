import axios from 'axios';
import { sessionManager } from '../utils/session';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true
});

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
        }
        return Promise.reject(error);
    }
);

// Request interceptor
api.interceptors.request.use(
    config => {
        const session = sessionManager.getSession();
        if (session?.token) {
            config.headers['Authorization'] = `Bearer ${session.token}`;
        }
        console.log('Request config:', {
            url: config.url,
            method: config.method,
            headers: config.headers
        });
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export default api;