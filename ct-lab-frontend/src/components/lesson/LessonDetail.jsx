import { BookOpen, Clock, Target } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { lessons } from '../../data/lessonData';
import styles from '../../styles/LessonDetail.module.css';

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
        <div className={styles.container}>
            {/* Hero Section */}
            <div className={styles.hero}>
                <div className={styles.hero_content}>
                    <h1>{lesson.title}</h1>
                    <p className={styles.description}>{lesson.description}</p>
                    <div className={styles.meta_info}>
                        <div className={styles.meta_item}>
                            <Clock size={20} />
                            <span>30 mins</span>
                        </div>
                        <div className={styles.meta_item}>
                            <Target size={20} />
                            <span>Beginner</span>
                        </div>
                        <div className={styles.meta_item}>
                            <BookOpen size={20} />
                            <span>4 Sections</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className={styles.content_wrapper}>
                <div className={styles.lesson_nav}>
                    <div className={styles.nav_item}>Overview</div>
                    <div className={styles.nav_item}>Content</div>
                    <div className={styles.nav_item}>Resources</div>
                    <div className={styles.nav_item}>Quiz</div>
                </div>

                <div className={styles.lesson_content}>
                    <div 
                        className={styles.content} 
                        dangerouslySetInnerHTML={{ __html: lesson.content }} 
                    />
                        
                    {lesson.quiz && (
                        <div className={styles.action_container}>
                            <Link 
                                to={`/quiz/${lesson._id}`}
                                className={styles.quiz_button}
                            >
                                Take Quiz
                                <svg 
                                    className={styles.arrow_icon} 
                                    viewBox="0 0 24 24" 
                                    width="20" 
                                    height="20"
                                >
                                    <path 
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M5 12h14m-6-6 6 6-6 6"
                                    />
                                </svg>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LessonDetail;