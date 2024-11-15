import { BookOpen, CheckCircle, ChevronRight, Lock } from 'lucide-react';
import React from 'react';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { useProgress } from '../../hooks/useProgress';
import styles from '../../styles/LessonCard.module.css';

const LessonCard = ({ lesson, isLocked }) => {
    const { progress } = useProgress();
    const lessonProgress = progress?.lessons?.find(
        l => l.lessonId === lesson._id
    );

    const status = isLocked ? 'locked' : lessonProgress?.status || 'unlocked';
    const isCompleted = status === 'completed';
    const isInProgress = status === 'started';

    const handleLessonClick = (e) => {
        if (isLocked) {
            e.preventDefault();
            toast.error('Complete the previous lesson to unlock this one!', {
                duration: 3000,
                position: 'top-center',
            });
            return false;
        }
    };

    return (
        <div className={`${styles.card} ${styles[status]}`}>
            <div className={styles.card_header}>
                <div className={styles.icon_wrapper}>
                    {isLocked ? (
                        <Lock size={24} className={styles.icon} />
                    ) : (
                        <BookOpen size={24} className={styles.icon} />
                    )}
                </div>
                <h2 className={styles.title}>
                    {lesson.title}
                    {lesson.order > 1 && (
                        <span className={styles.lesson_order}>
                            Requires Lesson {lesson.order - 1}
                        </span>
                    )}
                </h2>
                {isCompleted && (
                    <div className={styles.completion_badge}>
                        <CheckCircle size={16} />
                        <span>Completed</span>
                    </div>
                )}
            </div>
            
            <div className={styles.card_content}>
                <p className={styles.description}>{lesson.description}</p>
                
                {lessonProgress?.timeSpent > 0 && (
                    <div className={styles.time_spent}>
                        Time spent: {Math.floor(lessonProgress.timeSpent / 60)}h {lessonProgress.timeSpent % 60}m
                    </div>
                )}
                
                {lessonProgress?.score > 0 && (
                    <div className={styles.score_badge}>
                        Score: {lessonProgress.score}%
                    </div>
                )}

                <Link 
                    to={isLocked ? '#' : `/lesson/${lesson._id}`}
                    className={`${styles.start_button} ${isLocked ? styles.locked : ''}`}
                    onClick={handleLessonClick}
                >
                    <span>
                        {isLocked ? 'Locked' :
                            isCompleted ? 'Review Lesson' :
                            isInProgress ? 'Continue' : 'Start Lesson'}
                    </span>
                    {!isLocked && <ChevronRight className={styles.arrow_icon} />}
                </Link>
            </div>
        </div>
    );
};

export default LessonCard;

{/* <svg
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
</svg> */}