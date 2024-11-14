import React from 'react';
import styles from '../../styles/LessonProgress.module.css';

const LessonProgress = ({ progress }) => {
    const calculateProgressPercentage = () => {
        if (!progress?.lessons?.length) return 0;

        const completedLessons = progress.lessons.filter((lesson) => lesson.status === 'completed')
            .length;

        return Math.round((completedLessons / progress.lessons.length) * 100);
    };

    const percentage = calculateProgressPercentage();

    return (
        <div className={styles.progressContainer}>
            <h2>Your Progress</h2>
            <div className={styles.progressBar}>
                <div className={styles.progressFill} style={{ width: `${percentage}%` }} />
            </div>
            <span className={styles.progressText}>{percentage}% Complete</span>
        </div>
    );
};

export default LessonProgress;