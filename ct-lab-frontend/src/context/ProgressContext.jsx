import React, { createContext, useContext, useEffect, useState } from 'react';
import api from '../api/axios';

const ProgressContext = createContext(null);

export const ProgressProvider = ({ children }) => {
    const [state, setState] = useState({
        progress: null,
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
        }
    };

    useEffect(() => {
        fetchProgress();
    }, []);

    const submitQuiz = async (lessonId, answers) => {
        try {
            const response = await api.post(`/quiz/${lessonId}/submit`, { answers });
            if (response.data.success) {
                await fetchProgress(); // Refresh progress after quiz submission
            }
            return response.data;
        } catch (error) {
            throw error;
        }
    };

    const updateTheme = async (theme) => {
        try {
            const response = await api.put('/progress/theme', { theme });
            if (response.data.success) {
                setState(prev => ({
                    ...prev,
                    progress: {
                        ...prev.progress,
                        theme
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
        submitQuiz,
        updateTheme,
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
    if (!context) {
        throw new Error('useProgress must be used within a ProgressProvider');
    }
    return context;
};

export default ProgressContext;