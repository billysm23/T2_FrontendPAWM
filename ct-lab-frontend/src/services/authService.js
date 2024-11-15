import api from '../api/axios';

export const authService = {
    async login(credentials) {
        try {
            const response = await api.post('/auth/login', credentials);
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
            }
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    async register(userData) {
        try {
            const response = await api.post('/auth/register', userData);
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
            }
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    async logout() {
        try {
            await api.post('/auth/logout');
            localStorage.removeItem('token');
        } catch (error) {
            throw error;
        }
    },

    async validateToken() {
        try {
            const response = await api.get('/auth/validate-token');
            return response.data;
        } catch (error) {
            throw error;
        }
    }
};