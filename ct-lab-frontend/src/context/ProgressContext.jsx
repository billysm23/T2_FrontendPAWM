import React, { createContext, useContext, useEffect, useState } from 'react';
import api from '../api/axios';

// const initialProgressState = {
//     progress: null,
//     stats: null,
//     loading: true,
//     error: null,
//     updateLessonProgress: () => {},
//     trackContentProgress: () => {},
//     refreshProgress: () => {}
// };

const ProgressContext = createContext(null);

export const ProgressProvider = ({ children }) => {
    const [state, setState] = useState({
        progress: null,
        quizProgress: null,
        loading: true,
        error: null
    });
    
    const fetchProgress = async () => {
        try {
            setState(prev => ({ ...prev, loading: true }));
            const response = await api.get('/progress');
            if (response.data.success) {
                setState(prev => ({
                    ...prev,
                    progress: response.data.data.progress,
                    stats: response.data.data.stats,
                    loading: false,
                    error: null
                }));
            }
        } catch (err) {
            setState(prev => ({
                ...prev,
                error: err.message,
                loading: false
            }));
            console.error('Error fetching progress:', err);
        }
    };

    useEffect(() => {
        fetchProgress();
    }, []);
    
    const updateTheme = async (theme) => {
        try {
            const response = await api.put('/progress/theme', { theme });
            if (response.data.success) {
                setState(prev => ({
                    ...prev,
                    theme: theme
                }));
            }
            return response.data;
        } catch (error) {
            throw error;
        }
    };

    const updateLessonProgress = async (lessonId, status) => {
        try {
            console.log('Updating lesson progress:', { lessonId, status });
            const response = await api.put(`/progress/lessons/${lessonId}`, { status });
            
            if (response.data.success) {
                setState(prev => ({
                    ...prev,
                    progress: response.data.data,
                    error: null
                }));
                return response.data;
            }
        } catch (error) {
            console.error('Progress update error:', error);
            setState(prev => ({
                ...prev,
                error: error.message
            }));
            throw error;
        }
    };

    const trackContentProgress = async (lessonId, contentId, timeSpent = 0) => {
        try {
            return await updateLessonProgress(lessonId, {
                completedContent: [contentId],
                timeSpent,
                status: 'started'
            });
        } catch (err) {
            console.error('Error tracking content progress:', err);
            throw err;
        }
    };

    const saveQuizProgress = async (lessonId, answers) => {
        try {
            console.log('Saving quiz progress:', { lessonId, answers });
            const response = await api.post(`/lessons/${lessonId}/quiz/progress`, {
                answers
            });
            
            if (response.data.success) {
                setState(prev => ({
                    ...prev,
                    quizProgress: response.data.data,
                    error: null
                }));
                return response.data;
            }
            throw new Error('Failed to save quiz progress');
        } catch (error) {
            console.error('Quiz progress save error:', error);
            setState(prev => ({
                ...prev,
                error: error.message
            }));
            throw error;
        }
    };

    const getQuizProgress = async (lessonId) => {
        try {
            const response = await api.get(`/quiz/${lessonId}/progress`);
            return response.data;
        } catch (error) {
            console.error('Failed to get quiz progress:', error);
            throw error;
        }
    };

    const submitQuizAnswers = async (lessonId, answers) => {
        try {
            console.log('Submitting quiz:', { lessonId, answers });
            const response = await api.post(`/lessons/${lessonId}/quiz/submit`, {
                answers
            });
            
            if (response.data.success) {
                setState(prev => ({
                    ...prev,
                    progress: {
                        ...prev.progress,
                        lessons: prev.progress.lessons.map(lesson =>
                            lesson.lessonId === lessonId
                                ? {
                                    ...lesson,
                                    status: response.data.data.passed ? 'completed' : 'started',
                                    score: response.data.data.score
                                }
                                : lesson
                        )
                    },
                    error: null
                }));
                return response.data;
            }
            throw new Error('Failed to submit quiz');
        } catch (error) {
            console.error('Quiz submission error:', error);
            setState(prev => ({
                ...prev,
                error: error.message
            }));
            throw error;
        }
    };

    const value = {
        ...state,
        updateTheme,
        updateLessonProgress,
        submitQuizAnswers,
        trackContentProgress,
        saveQuizProgress,
        getQuizProgress,
        refreshProgress: fetchProgress
    };

    return (
        <ProgressContext.Provider value={value}>
            {children}
        </ProgressContext.Provider>
    );
};

export const useProgress = () => {
    const context = useContext(ProgressContext);
    if (context === undefined) {
        throw new Error('useProgress must be used within a ProgressProvider');
    }
    return context;
};

export default ProgressContext;