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
    const response = await api.get(`/lessons/${lessonId}/quiz`);
    return response.data;
};

export const saveQuizProgress = async (lessonId, answers) => {
    const response = await api.post(`/lessons/${lessonId}/quiz/progress`, { answers });
    return response.data;
};

export const getQuizProgress = async (lessonId) => {
    const response = await api.get(`/lessons/${lessonId}/quiz/progress`);
    return response.data;
};