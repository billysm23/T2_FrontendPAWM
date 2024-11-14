import React from 'react';
import styles from '../../styles/Quiz.module.css';

const MultipleChoice = ({ question, onChange, value, feedback }) => {
    return (
        <div className={styles.question}>
            <h3>{question.text}</h3>
            <div className={styles.options}>
                {question.options.map((option, index) => (
                    <label key={index} className={styles.option}>
                        <input
                            type="radio"
                            name={`q${question._id}`}
                            value={option._id}
                            checked={value === option._id}
                            onChange={() => onChange(option._id)}
                        />
                        <span>{option.text}</span>
                    </label>
                ))}
            </div>
            {feedback && (
                <div className={`${styles.feedback} ${styles[feedback.type]}`}>
                    {feedback.message}
                </div>
            )}
        </div>
    );
};

export default MultipleChoice;