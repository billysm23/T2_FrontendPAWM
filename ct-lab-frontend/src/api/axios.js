import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true
});

// Request interceptor
// api.interceptors.request.use(
//     config => {
//         console.log('Request Config:', {
//             url: config.url,
//             method: config.method,
//             headers: config.headers,
//             data: config.data
//         });
//         return config;
//     },
//     error => {
//         return Promise.reject(error);
//     }
// );

// Response interceptor
api.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default api;