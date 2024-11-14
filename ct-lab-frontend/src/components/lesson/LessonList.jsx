import React from 'react';
import styles from '../../styles/LessonList.module.css';
import LessonCard from './LessonCard';

const LessonList = ({ lessons }) => {
    return (
        <div className={styles.lesson_grid}>
            {lessons.map((lesson) => (
                <div
                    key={lesson._id}
                    className={styles.grid_item}
                >
                    <LessonCard lesson={lesson} />
                </div>
            ))}
        </div>
    );
};

export default LessonList;