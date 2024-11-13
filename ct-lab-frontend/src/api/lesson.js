import api from './axios';

export const getAllLessons = async () => {
    try {
        return await api.get('/lessons');
    } catch (error) {
        throw error;
    }
};

export const getLessonById = async (id) => {
    try {
        return await api.get(`/lessons/${id}`);
    } catch (error) {
        throw error;
    }
};

export const getLessonPrerequisites = async (id) => {
    try {
        return await api.get(`/lessons/${id}/prerequisites`);
    } catch (error) {
        throw error;
    }
};