import axios from 'axios';
import { sessionManager } from '../utils/session';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true
});

// Request interceptor
api.interceptors.request.use(
    config => {
        const session = sessionManager.getSession();
        if (session?.token) {
            config.headers.Authorization = `Bearer ${session.token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// Response interceptor
api.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.status === 401) {
            sessionManager.clearSession();
            // Jika belum di page login/register, mengarahkan ke login
            if (!window.location.pathname.includes('login') && 
                !window.location.pathname.includes('register')) {
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);

export default api;