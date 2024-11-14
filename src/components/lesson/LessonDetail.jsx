import React, { useEffect, useState } from 'react';
import { Link, Navigate, useLocation, useParams } from 'react-router-dom';
import { lessons } from '../../data/lessonData';
import styles from '../../styles/LessonDetail.module.css';
import ContentSection from './section/ContentSection';
import OverviewSection from './section/OverviewSection';
import ResourcesSection from './section/ResourcesSection';

const LessonDetail = () => {
    const { id } = useParams();
    const location = useLocation();
    const [lesson, setLesson] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('overview');

    useEffect(() => {
        const fetchLesson = () => {
            try {
                setLoading(true);
                const foundLesson = lessons.find(l => l._id === id);
                if (foundLesson) {
                    setLesson(foundLesson);
                    // Set active tab based on current path
                    const path = location.pathname.split('/').pop();
                    setActiveTab(path === id ? 'overview' : path);
                }
            } catch (err) {
                console.error('Error fetching lesson:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchLesson();
    }, [id, location]);

    if (loading) {
        return <div className={styles.loading}>Loading...</div>;
    }

    if (!lesson) {
        return <div className={styles.error}>Lesson not found</div>;
    }

    // If no section is selected, redirect to overview
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
                        to={`/quiz/${id}`} 
                        className={`${styles.nav_item} ${isActive('quiz')}`}
                        onClick={() => setActiveTab('quiz')}
                    >
                        Quiz
                    </Link>
                </div>

                <div className={styles.content_area}>
                    {renderSection()}
                </div>
            </div>
        </div>
    );
};

export default LessonDetail;