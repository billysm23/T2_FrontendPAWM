import { useContext } from 'react';
import ProgressContext from '../context/ProgressContext';
import { progressService } from '../services/progressService';

export const useProgress = () => {
    const context = useContext(ProgressContext);

    if (context === undefined) {
        throw new Error('useProgress must be used within a ProgressProvider');
    }

    const getUserProgress = async () => {
        try {
            context.setState(prev => ({ ...prev, loading: true, error: null }));
            const data = await progressService.getUserProgress();
            context.setState(prev => ({
                ...prev,
                progress: data,
                loading: false
            }));
            return data;
        } catch (err) {
            context.setState(prev => ({
                ...prev,
                error: err.response?.data?.message || 'An error occurred',
                loading: false
            }));
            throw err;
        }
    };

    const updateLessonProgress = async (lessonId, progressData) => {
        try {
            context.setState(prev => ({ ...prev, loading: true, error: null }));
            const data = await progressService.updateProgress(lessonId, progressData);
            context.setState(prev => ({
                ...prev,
                progress: {
                    ...prev.progress,
                    lessons: prev.progress.lessons.map(lesson => 
                        lesson.lesson_id === lessonId ? { ...lesson, ...progressData } : lesson
                    )
                },
                loading: false
            }));
            return data;
        } catch (err) {
            context.setState(prev => ({
                ...prev,
                error: err.response?.data?.message || 'An error occurred',
                loading: false
            }));
            throw err;
        }
    };

    return {
        progress: context.progress,
        loading: context.loading,
        error: context.error,
        getUserProgress,
        updateLessonProgress,
        ...context
    };
};