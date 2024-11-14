import React from 'react';
import LessonList from '../components/lesson/LessonList';
import { lessons } from '../data/lessonData';
import styles from '../styles/Lesson.module.css';

const Lesson = () => {
    return (
        <div className={styles.lesson}>
            <div className={styles.lesson_container}>
                <div className={styles.lesson_content}>
                    <h1>Computational Thinking Lessons</h1>
                    <LessonList lessons={lessons} />
                </div>
            </div>
        </div>
    );
};

export default Lesson;