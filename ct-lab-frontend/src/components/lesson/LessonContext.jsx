import React from 'react';
import styles from '../../styles/Lesson.module.css';

const LessonContent = ({ lesson }) => {
    const [isExpanded, setIsExpanded] = React.useState(false);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className={styles.lesson_item}>
        <div 
            className={`${styles.collapsible} ${isExpanded ? styles.active : ''}`}
            onClick={toggleExpand}
        >
            <span>{lesson.title}</span>
            <div className={styles.lesson_toggle}>
            <span></span>
            <span></span>
            </div>
        </div>

        {isExpanded && (
            <div className={styles.content}>
            <div className={styles.content_inner}>
                <div className={styles.content_section}>
                <h2>Key Concepts</h2>
                <div className={styles.concept_grid}>
                    {lesson.concepts.map((concept, index) => (
                    <div key={index} className={styles.concept_item}>
                        <h3>{concept.title}</h3>
                        <p>{concept.description}</p>
                    </div>
                    ))}
                </div>
                </div>

                {lesson.example && (
                <div className={styles.content_section}>
                    <h2>Example</h2>
                    <div className={styles.example_steps}>
                    {lesson.example.steps.map((step, index) => (
                        <p key={index}>{`${index + 1}. ${step}`}</p>
                    ))}
                    </div>
                </div>
                )}

                {lesson.quiz && (
                <button 
                    className={styles.lesson_btn}
                    onClick={() => window.location.href = `/quiz/${lesson._id}`}
                >
                    Start Quiz
                </button>
                )}
            </div>
            </div>
        )}
        </div>
    );
};

export default LessonContent;