import { BookOpen, CheckCircle, ChevronRight, Lock } from 'lucide-react';
import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useProgress } from '../../hooks/useProgress';
import styles from '../../styles/LessonCard.module.css';

const LessonCard = React.memo(({ lesson, isLocked }) => {
    const { progress } = useProgress();
    
    const lessonProgress = useMemo(() => 
        progress?.lessons?.find(l => l.lessonId === lesson._id),
        [progress?.lessons, lesson._id]
    );

    const status = isLocked ? 'locked' : lessonProgress?.status || 'unlocked';
    const isCompleted = status === 'completed';
    const isInProgress = status === 'started';

    const handleLessonClick = (e) => {
        if (isLocked) {
            e.preventDefault();
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
                    {!isLocked && <ChevronRight className={styles.next_icon} />}
                </Link>
            </div>
        </div>
    );
});

export default LessonCard;