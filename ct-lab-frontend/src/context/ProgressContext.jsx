import React, { createContext, useContext, useEffect, useState } from 'react';
import api from '../api/axios';

const initialProgressState = {
    progress: null,
    stats: null,
    loading: true,
    error: null,
    updateLessonProgress: () => {},
    trackContentProgress: () => {},
    refreshProgress: () => {}
};

export const ProgressContext = createContext(initialProgressState);

export const ProgressProvider = ({ children }) => {
    const [state, setState] = useState({
        progress: null,
        stats: null,
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
            const response = await api.put(`/progress/lessons/${lessonId}`, { status });
            if (response.data.success) {
                // Update context state
                setState(prev => ({
                    ...prev,
                    progress: {
                        ...prev.progress,
                        lessons: prev.progress.lessons.map(lesson =>
                            lesson.lesson_id === lessonId
                                ? { ...lesson, status }
                                : lesson
                        )
                    }
                }));
            }
            return response.data;
        } catch (error) {
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

    const submitQuizAnswers = async (lessonId, answers) => {
        try {
            const response = await api.post(`/progress/quiz/${lessonId}`, { answers });
            if (response.data.success) {
                setState(prev => ({
                    ...prev,
                    progress: {
                        ...prev.progress,
                        lessons: prev.progress.lessons.map(lesson => 
                            lesson.lesson_id === lessonId 
                                ? {
                                    ...lesson,
                                    quiz_answers: answers,
                                    score: response.data.data.score,
                                    status: response.data.data.score >= 70 ? 'completed' : 'started'
                                }
                                : lesson
                        )
                    }
                }));
            }
            return response.data;
        } catch (error) {
            throw error;
        }
    };

    const value = {
        ...state,
        updateTheme,
        updateLessonProgress,
        submitQuizAnswers,
        trackContentProgress,
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