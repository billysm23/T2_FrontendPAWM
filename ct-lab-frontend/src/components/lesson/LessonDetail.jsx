import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { lessons } from '../../data/lessonData';
import styles from '../../styles/Lesson.module.css';

const LessonDetail = () => {
    const { id } = useParams();
    const [lesson, setLesson] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLesson = () => {
            try {
                setLoading(true);
                const foundLesson = lessons.find(l => l._id === id);
                if (foundLesson) {
                    setLesson(foundLesson);
                } else {
                    setError('Lesson not found');
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchLesson();
    }, [id]);

    if (loading) return <div className={styles.loading}>Loading...</div>;
    if (error) return <div className={styles.error}>{error}</div>;
    if (!lesson) return <div className={styles.error}>Lesson not found</div>;

    return (
        <div className={styles.lesson_detail}>
            <div className={styles.lesson_header}>
                <h1>{lesson.title}</h1>
                <p className={styles.description}>{lesson.description}</p>
            </div>
            
            <div className={styles.lesson_body}>
                <div 
                    className={styles.content} 
                    dangerouslySetInnerHTML={{ __html: lesson.content }} 
                />
            </div>

            {lesson.quiz && (
                <div className={styles.lesson_actions}>
                    <Link 
                        to={`/quiz/${lesson._id}`}
                        className={styles.quiz_button}
                    >
                        Take Quiz
                    </Link>
                </div>
            )}
        </div>
    );
};

export default LessonDetail;