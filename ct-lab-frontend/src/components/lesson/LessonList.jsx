import React from 'react';
import { useProgress } from '../../hooks/useProgress';
import styles from '../../styles/LessonList.module.css';
import LessonCard from './LessonCard';

const LessonList = ({ lessons }) => {
    const { progress } = useProgress();
    const shouldLockLesson = (lessonOrder) => {
        if (lessonOrder === 1) return false; // Lesson 1 pasti terbuka
        
        // Cari progress lesson sebelumnya
        const previousLesson = lessons.find(l => l.order === lessonOrder - 1);
        if (!previousLesson) return false;

        const previousLessonProgress = progress?.lessonProgresses?.find(
            p => p.lessonId === previousLesson._id
        );

        return !previousLessonProgress || previousLessonProgress.status !== 'completed';
    };

    const sortedLessons = [...lessons].sort((a, b) => a.order - b.order);

    const processedLessons = sortedLessons
        .map(lesson => ({
            ...lesson,
            isLocked: shouldLockLesson(lesson.order)
        }));

    return (
        <div className={styles.lesson_grid}>
            {processedLessons.map((lesson) => (
                <div key={lesson._id} className={styles.grid_item}>
                    <LessonCard 
                        lesson={lesson} 
                        isLocked={lesson.isLocked}
                    />
                </div>
            ))}
        </div>
    );
};

export default LessonList;