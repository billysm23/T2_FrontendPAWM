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
                setLoading(true);
                const response = await getAllLessons();
                // Response sudah dalam format yang benar, langsung ambil data array-nya
                if (response.success) {
                    setLessons(response.data);
                } else {
                    throw new Error('Failed to fetch lessons');
                }
            } catch (err) {
                console.error('Error fetching lessons:', err);
                setError(err.message);
                setLessons([]);
            } finally {
                setLoading(false);
            }
        };

        fetchLessons();
    }, []);

    if (loading) {
        return (
            <div className={styles.loading_container}>
                <div className={styles.loading}>
                    <div className={styles.loading_spinner}></div>
                    <p>Loading lessons...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles.error_container}>
                <div className={styles.error}>
                    <p>Error: {error}</p>
                    <button 
                        onClick={() => window.location.reload()}
                        className={styles.retry_button}
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.lesson}>
            <div className={styles.lesson_container}>
                <div className={styles.lesson_content}>
                    <h1>Computational Thinking Lessons</h1>
                    {lessons.length === 0 ? (
                        <div className={styles.empty_state}>
                            <p>No lessons available.</p>
                        </div>
                    ) : (
                        <LessonList lessons={lessons} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Lesson;