import { BookOpen } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../../styles/LessonCard.module.css';

const LessonCard = ({ lesson }) => {
    return (
        <div className={styles.card}>
            <div className={styles.card_header}>
                <div className={styles.icon_wrapper}>
                    <BookOpen size={24} className={styles.icon} />
                </div>
                <h2 className={styles.title}>{lesson.title}</h2>
            </div>
            
            <div className={styles.card_content}>
                <p className={styles.description}>{lesson.description}</p>
                
                <Link 
                    to={`/lesson/${lesson._id}`}
                    className={styles.start_button}
                >
                    <span>Start Lesson</span>
                    <svg 
                        className={styles.arrow_icon} 
                        width="20" 
                        height="20" 
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M4 12h14m-6-6 6 6-6 6" />
                    </svg>
                </Link>
            </div>
        </div>
    );
};

export default LessonCard;