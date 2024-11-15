import React, { useCallback, useEffect, useState } from 'react';
import { Link, Navigate, useLocation, useParams } from 'react-router-dom';
import { useProgress } from '../../context/ProgressContext';
import { lessons } from '../../data/lessonData';
import styles from '../../styles/LessonDetail.module.css';
import ContentSection from './section/ContentSection';
import OverviewSection from './section/OverviewSection';
import QuizSection from './section/QuizSection';
import ResourcesSection from './section/ResourcesSection';

const LessonDetail = () => {
    const { id } = useParams();
    const location = useLocation();
    const [lesson, setLesson] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('overview');
    const { updateLessonProgress } = useProgress();
    
    const initLesson = useCallback(async () => {
        try {
            await updateLessonProgress(id, { status: 'started' });
        } catch (error) {
            console.error('Error updating lesson progress:', error);
        }
    }, [id, updateLessonProgress]);

    const fetchLesson = useCallback(() => {
        try {
            setLoading(true);
            const foundLesson = lessons.find(l => l._id === id);
            if (foundLesson) {
                setLesson(foundLesson);
                const path = location.pathname.split('/').pop();
                setActiveTab(path === id ? 'overview' : path);
            }
        } catch (err) {
            console.error('Error fetching lesson:', err);
        } finally {
            setLoading(false);
        }
    }, [id, location.pathname]);

    useEffect(() => {
        fetchLesson();
        initLesson();
    }, [fetchLesson, initLesson]);
        
    // const completeLesson = async () => {
    //     if (activeTab === 'quiz') {
    //         try {
    //             await updateLessonProgress(id, 'completed');
    //         } catch (error) {
    //             console.error('Error completing lesson:', error);
    //         }
    //     }
    // };

    if (loading) {
        return <div className={styles.loading}>Loading...</div>;
    }

    if (!lesson) {
        return <div className={styles.error}>Lesson not found</div>;
    }

    if (location.pathname === `/lesson/${id}`) {
        return <Navigate to={`/lesson/${id}/overview`} replace />;
    }

    const isActive = (tab) => activeTab === tab ? styles.active : '';

    const renderSection = () => {
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
    };

    return (
        <div className={styles.container}>
            <div className={styles.hero}>
                <div className={styles.hero_content}>
                    <h1>{lesson.title}</h1>
                    <p className={styles.description}>{lesson.description}</p>
                    <div className={styles.meta_info}>
                        <span>Duration: {lesson.duration}</span>
                        <span>Level: {lesson.level}</span>
                    </div>
                </div>
            </div>

            <div className={styles.content_wrapper}>
                <div className={styles.lesson_nav}>
                    <Link 
                        to={`/lesson/${id}/overview`} 
                        className={`${styles.nav_item} ${isActive('overview')}`}
                        onClick={() => setActiveTab('overview')}
                    >
                        Overview
                    </Link>
                    <Link 
                        to={`/lesson/${id}/content`} 
                        className={`${styles.nav_item} ${isActive('content')}`}
                        onClick={() => setActiveTab('content')}
                    >
                        Content
                    </Link>
                    <Link 
                        to={`/lesson/${id}/resources`} 
                        className={`${styles.nav_item} ${isActive('resources')}`}
                        onClick={() => setActiveTab('resources')}
                    >
                        Resources
                    </Link>
                    <Link 
                        to={`/lesson/${id}/quiz`} 
                        className={`${styles.nav_item} ${isActive('quiz')}`}
                        onClick={() => setActiveTab('quiz')}
                    >
                        Quiz
                    </Link>
                </div>

                <div className={styles.content_area}>
                    {loading ? (
                        <div className={styles.loading}>Loading...</div>
                    ) : !lesson ? (
                        <div className={styles.error}>Lesson not found</div>
                    ) : (
                        renderSection()
                    )}
                </div>
            </div>
        </div>
    );
};

export default LessonDetail;