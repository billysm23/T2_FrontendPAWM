import api from './axios';

export const getAllLessons = async () => {
    try {
        const response = await api.get('/lessons');
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getLessonById = async (id) => {
    try {
        const response = await api.get(`/lessons/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};