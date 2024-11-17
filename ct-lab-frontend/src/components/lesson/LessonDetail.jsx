import React, { useCallback, useEffect, useState } from 'react';
import { Link, Navigate, useLocation, useParams } from 'react-router-dom';
import api from '../../api/axios';
import { useProgress } from '../../context/ProgressContext';
import styles from '../../styles/LessonDetail.module.css';
import { LoadingSpinner } from '../common/LoadingSpinner';
import ContentSection from './section/ContentSection';
import OverviewSection from './section/OverviewSection';
import QuizSection from './section/QuizSection';
import ResourcesSection from './section/ResourcesSection';

const LessonDetail = () => {
    const { id } = useParams();
    const location = useLocation();
    const [lesson, setLesson] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('overview');
    const { updateLessonProgress } = useProgress();

    // Fetch data pelajaran
    useEffect(() => {
        const fetchLesson = async () => {
            try {
                setLoading(true);
                setError(null);
                
                console.log('Fetching lesson with ID:', id);
                const response = await api.get(`/lessons/${id}`);
                console.log('Lesson response:', response);
                
                // Validasi response
                if (!response || !response.data) {
                    throw new Error('Invalid response format');
                }
        
                setLesson(response.data.data);
                
                // Update progress lesson
                try {
                    await updateLessonProgress(id, 'started');
                } catch (progressError) {
                    console.warn('Progress update failed:', progressError);
                }
            } catch (err) {
                console.error('Error fetching lesson:', err);
                setError(err.response?.data?.error || err.message || 'Failed to load lesson');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchLesson();
        }
    }, [id, location.pathname, updateLessonProgress]);

    // Render konten berdasarkan tab aktif
    const renderContent = useCallback(() => {
        if (loading) {
            return (
                <div className={styles.loading_container}>
                    <div className={styles.loading}>
                        <LoadingSpinner />
                        <p>Loading lesson content...</p>
                    </div>
                </div>
            );
        }

        if (error) {
            return (
                <div className={styles.error_container}>
                    <div className={styles.error}>
                        <p>{error}</p>
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

        if (!lesson) {
            return (
                <div className={styles.error_container}>
                    <div className={styles.error}>
                        <p>Lesson not found</p>
                        <Link to="/lessons" className={styles.back_button}>
                            Back to Lessons
                        </Link>
                    </div>
                </div>
            );
        }

        switch (activeTab) {
            case 'overview':
                return <OverviewSection lesson={lesson} />;
            case 'content':
                return <ContentSection lesson={lesson} />;
            case 'resources':
                return <ResourcesSection lesson={lesson} />;
            case 'quiz':
                return <QuizSection lesson={lesson} />;
            default:
                return <OverviewSection lesson={lesson} />;
        }
    }, [activeTab, lesson, loading, error]);

    // Redirect ke tab overview jika tidak ada tab yang dipilih
    if (location.pathname === `/lesson/${id}`) {
        return <Navigate to={`/lesson/${id}/overview`} replace />;
    }

    return (
        <div className={styles.container}>
            {lesson && (
                <>
                    {/* Hero Section */}
                    <div className={styles.hero}>
                        <div className={styles.hero_content}>
                            <h1>{lesson.title}</h1>
                            <p className={styles.description}>{lesson.description}</p>
                            <div className={styles.meta_info}>
                                <span>
                                    <i className="far fa-clock"></i>
                                    Duration: {lesson.duration}
                                </span>
                                <span>
                                    <i className="fas fa-layer-group"></i>
                                    Level: {lesson.level}
                                </span>
                                {lesson.prerequisite && (
                                    <span>
                                        <i className="fas fa-tasks"></i>
                                        Prerequisites: Lesson {lesson.prerequisite.join(', ')}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className={styles.content_wrapper}>
                        {/* Navigation Tabs */}
                        <nav className={styles.lesson_nav}>
                            {['overview', 'content', 'resources', 'quiz'].map((tab) => (
                                <Link
                                    key={tab}
                                    to={`/lesson/${id}/${tab}`}
                                    className={`${styles.nav_item} ${
                                        activeTab === tab ? styles.active : ''
                                    }`}
                                    onClick={() => setActiveTab(tab)}
                                >
                                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                                </Link>
                            ))}
                        </nav>

                        {/* Main Content Area */}
                        <div className={styles.content_area}>
                            {renderContent()}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default React.memo(LessonDetail);