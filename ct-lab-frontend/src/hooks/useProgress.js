import { useContext } from 'react';
import ProgressContext from '../context/ProgressContext';

export const useProgress = () => {
    const context = useContext(ProgressContext);

    if (context === undefined) {
        throw new Error('useProgress must be used within a ProgressProvider');
    }

    const isLessonCompleted = (lessonId) => {
        const lessonProgress = context.progress?.lessonProgresses?.find(
            p => p.lessonId === lessonId
        );
        return lessonProgress?.status === 'completed';
    };

    const getLessonProgress = (lessonId) => {
        return context.progress?.lessonProgresses?.find(
            p => p.lessonId === lessonId
        );
    };

    const getNextLesson = (currentLessonId) => {
        if (!context.progress?.lessonProgresses || !currentLessonId) return null;

        const currentProgress = getLessonProgress(currentLessonId);
        if (!currentProgress) return null;

        const sortedProgresses = [...context.progress.lessonProgresses]
            .sort((a, b) => a.lessonId.order - b.lessonId.order);

        const currentIndex = sortedProgresses.findIndex(
            p => p.lessonId === currentLessonId
        );

        return sortedProgresses[currentIndex + 1]?.lessonId || null;
    };

    return {
        ...context,
        isLessonCompleted,
        getLessonProgress,
        getNextLesson
    };
};