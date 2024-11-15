import api from '../api/axios';

export const lessonService = {
    async getLessons() {
        try {
            const response = await api.get('/lessons');
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    async getLessonById(id) {
        try {
            const response = await api.get(`/lessons/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    async getLessonPrerequisites(id) {
        try {
            const response = await api.get(`/lessons/${id}/prerequisites`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
};