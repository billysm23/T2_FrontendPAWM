import api from './axios';

export const getQuizByLesson = async (lessonId) => {
    try {
        const response = await api.get(`/quiz/lesson/${lessonId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const submitQuiz = async (quizData) => {
    try {
        const response = await api.post('/quiz/submit', quizData);
        return response.data;
    } catch (error) {
        throw error;
    }
};