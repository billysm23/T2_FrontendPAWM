import React from 'react';
import styles from '../../../styles/LessonCard.module.css';
import LessonCard from '../LessonCard';

const LessonList = ({ lessons }) => {
    return (
        <div className={styles.lessonList}>
        {lessons.map((lesson) => (
            <LessonCard 
            key={lesson._id} 
            lesson={lesson} 
            />
        ))}
        </div>
    );
};

export default LessonList;