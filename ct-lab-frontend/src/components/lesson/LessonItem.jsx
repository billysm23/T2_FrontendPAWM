import { CheckCircle, Lock } from 'lucide-react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../../styles/LessonItem.module.css';
import Collapse from '../common/Collapse';
import LessonContent from './LessonContent';

const LessonItem = ({ lesson, userProgress }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getLessonStatus = () => {
    if (!userProgress) return 'locked';

    const lessonProgress = userProgress.lessons.find((l) => l.lesson_id === lesson._id);
    if (lessonProgress) {
      return lessonProgress.status;
    }

    // Check if all prerequisites are completed
    const prerequisitesMet = lesson.prerequisites.every((prereq) => {
      const prereqProgress = userProgress.lessons.find((l) => l.lesson_id === prereq._id);
      return prereqProgress?.status === 'completed';
    });

    return prerequisitesMet ? 'unlocked' : 'locked';
  };

  const status = getLessonStatus();

  return (
    <div className={`${styles.lessonItem} ${styles[status]}`}>
      <Collapse
        isExpanded={isExpanded}
        onToggle={() => setIsExpanded(!isExpanded)}
        header={
          <div className={styles.header}>
            <h3>{lesson.title}</h3>
            <div className={styles.statusBadge}>
              {status === 'completed' && <CheckCircle className={styles.icon} size={16} />}
              {status === 'locked' && <Lock className={styles.icon} size={16} />}
            </div>
          </div>
        }
      >
        <LessonContent lesson={lesson} />
        {status !== 'locked' && (
          <Link to={`/lesson/${lesson._id}`} className={styles.startButton}>
            {status === 'completed' ? 'Review Lesson' : 'Start Lesson'}
          </Link>
        )}
      </Collapse>
    </div>
  );
};

export default LessonItem;