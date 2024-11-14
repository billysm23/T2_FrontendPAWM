import React from 'react';
import styles from '../../../styles/LessonDetail.module.css';

const OverviewSection = ({ lesson }) => {
    if (!lesson) {
        return <div className={styles.error}>Lesson data not available</div>;
    }
    
    return (
        <div className={styles.overview_section}>
            {/* Target pembelajaran */}
            <div className={styles.section}>
                <h2>Learning Objectives</h2>
                <ul className={styles.objectives_list}>
                    <li>Understand the basic principles of {lesson.title}</li>
                    <li>Learn how to apply these concepts in real-world scenarios</li>
                    <li>Master the fundamental techniques and methodologies</li>
                    <li>Develop problem-solving skills in this domain</li>
                </ul>
            </div>

            {/* Prerequisite */}
            <div className={styles.section}>
                <h2>Prerequisites</h2>
                <ul className={styles.prerequisites_list}>
                    {lesson.prerequisites?.map((prereq, index) => (
                        <li key={index}>{prereq}</li>
                    )) || (
                        <li>No prerequisites required</li>
                    )}
                </ul>
            </div>

            {/* Apa yang dipelajari */}
            <div className={styles.section}>
                <h2>What You'll Learn</h2>
                <div className={styles.topics_grid}>
                    {lesson.topics?.map((topic, index) => (
                        <div key={index} className={styles.topic_card}>
                            <div className={styles.topic_icon}>{topic.icon}</div>
                            <h3>{topic.title}</h3>
                            <p>{topic.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Waktu */}
            <div className={styles.section}>
                <h2>Time Commitment</h2>
                <div className={styles.time_info}>
                    <div>
                        <h4>Lesson Duration</h4>
                        <p>{lesson.duration || '30 minutes'}</p>
                    </div>
                    <div>
                        <h4>Practice Time</h4>
                        <p>{lesson.practiceTime || '1-2 hours'}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OverviewSection;