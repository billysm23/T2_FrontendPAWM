import api from '../api/axios';

export const progressService = {
    async getUserProgress() {
        try {
            const response = await api.get('/progress');
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    async updateProgress(lessonId, progressData) {
        try {
            const response = await api.put(`/progress/lessons/${lessonId}`, progressData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    async getTheme() {
        try {
            const response = await api.get('/progress/theme');
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    async updateTheme(theme) {
        try {
            const response = await api.put('/progress/theme', { theme });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    async submitQuiz(lessonId, answers) {
        try {
            const response = await api.post(`/progress/quiz/${lessonId}`, { answers });
            return response.data;
        } catch (error) {
            throw error;
        }
    }
};