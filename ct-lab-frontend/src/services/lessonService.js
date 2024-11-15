import api from '../api/axios';

export const lessonService = {
    async getLessons() {
        try {
            const response = await api.get('/lessons');
            return response.data.map(lesson => ({
                ...lesson,
                order: parseInt(lesson._id)
            }));
        } catch (error) {
            console.error('Error fetching lessons:', error);
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
    }
};