import React, { useEffect, useState } from 'react';
import { getAllLessons } from '../api/lesson';
import LessonList from '../components/lesson/LessonList';
import styles from '../styles/Lesson.module.css';

const Lesson = () => {
    const [lessons, setLessons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLessons = async () => {
        try {
            const data = await getAllLessons();
            setLessons(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }};

    fetchLessons();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

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