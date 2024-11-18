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

export const getLessonQuiz = async (lessonId) => {
    try {
        const response = await api.get(`/quiz/lesson/${lessonId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const submitQuiz = async (lessonId, answers) => {
    try {
        const response = await api.post(`/quiz/${lessonId}/submit`, { answers });
        return response.data;
    } catch (error) {
        throw error;
    }
};