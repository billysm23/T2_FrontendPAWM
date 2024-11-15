import { useState } from 'react';
import { progressService } from '../services/progressService';

export const useProgress = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [progress, setProgress] = useState(null);

    const getUserProgress = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await progressService.getUserProgress();
            setProgress(data);
            return data;
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const updateLessonProgress = async (lessonId, progressData) => {
        try {
            setLoading(true);
            setError(null);
            const data = await progressService.updateProgress(lessonId, progressData);
            setProgress(prev => ({
                ...prev,
                lessons: prev.lessons.map(lesson => 
                    lesson.lesson_id === lessonId ? { ...lesson, ...progressData } : lesson
                )
            }));
            return data;
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return {
        progress,
        loading,
        error,
        getUserProgress,
        updateLessonProgress
    };
};