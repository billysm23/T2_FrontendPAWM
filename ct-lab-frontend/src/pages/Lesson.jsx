import React, { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getAllLessons } from '../api/lesson';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import LessonList from '../components/lesson/LessonList';
import styles from '../styles/Lesson.module.css';
import ApiError from '../utils/errorHandler';

const Lesson = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [lessons, setLessons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchLessons = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await getAllLessons();
            
            if (response.success) {
                setLessons(response.data);
            } else {
                throw new Error('Failed to fetch lessons');
            }
        } catch (err) {
            const handledError = ApiError.handle(err);
            console.error('Error fetching lessons:', handledError);

            switch (handledError.action) {
                case ApiError.ACTIONS.LOGIN:
                    // Redirect ke login jika session expired
                    navigate('/login', { 
                        state: { from: location.pathname }
                    });
                    break;
                    
                case ApiError.ACTIONS.LOGOUT:
                    // Handle kasus session exists
                    navigate('/logout');
                    break;
                    
                default:
                    // Set error untuk ditampilkan
                    setError(handledError);
                    setLessons([]);
            }
        } finally {
            setLoading(false);
        }
    }, [navigate, location]);

    useEffect(() => {
        fetchLessons();
    }, [fetchLessons]);

    // Loading state
    if (loading) {
        return (
            <div className={styles.loading_container}>
                <div className={styles.loading}>
                    <LoadingSpinner />
                    <p className={styles.loading_text}>Loading lessons...</p>
                </div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className={styles.error_container}>
                <div className={`${styles.error} ${styles[ApiError.getErrorSeverity(error.code)]}`}>
                    <div className={styles.error_content}>
                        <i className={`${styles.error_icon} ${styles[error.code]}`} />
                        <h3 className={styles.error_title}>
                            {error.code.startsWith('4') ? 'Connection Error' : 'Error'}
                        </h3>
                        <p className={styles.error_message}>{error.message}</p>
                        
                        {error.isRetryable && (
                            <button 
                                onClick={fetchLessons}
                                className={styles.retry_button}
                            >
                                Try Again
                            </button>
                        )}

                        {/* Tampilkan action tambahan jika diperlukan */}
                        {error.action === ApiError.ACTIONS.VALIDATE && (
                            <button 
                                onClick={() => navigate('/support')}
                                className={styles.support_button}
                            >
                                Contact Support
                            </button>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    // Success state
    return (
        <div className={styles.lesson}>
            <div className={styles.lesson_container}>
                <div className={styles.lesson_content}>
                    <h1>Computational Thinking Lessons</h1>
                    {lessons.length === 0 ? (
                        <div className={styles.empty_state}>
                            <img 
                                src="/images/empty-lessons.svg" 
                                alt="No lessons" 
                                className={styles.empty_image}
                            />
                            <h2>No Lessons Available</h2>
                            <p>Check back later for new content.</p>
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