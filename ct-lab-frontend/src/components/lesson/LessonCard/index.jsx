import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../../../styles/LessonCard.module.css';

const LessonCard = ({ lesson }) => {
    const { _id, title, description, status = 'unlocked' } = lesson;

    return (
        <div className={`${styles.lessonCard} ${styles[status]}`}>
            <h3>{title}</h3>
            <p>{description}</p>
            
            <div className={styles.cardFooter}>
                {status === 'locked' ? (
                <span className={styles.lockedMessage}>
                    Complete previous lessons to unlock
                </span>
                ) : (
                <Link 
                    to={`/lessons/${_id}`}
                    className={styles.startButton}
                >
                    {status === 'completed' ? 'Review Lesson' : 'Start Lesson'}
                </Link>
                )}
            </div>
        </div>
    );
};

export default LessonCard;