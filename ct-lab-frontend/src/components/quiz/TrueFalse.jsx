import React from 'react';
import styles from '../../styles/Quiz.module.css';

const TrueFalse = ({ question, onChange, value, feedback }) => {
    return (
        <div className={styles.question}>
            <h3>{question.text}</h3>
            <div className={styles.options}>
                <label className={styles.option}>
                    <input
                        type="radio"
                        name={`q${question._id}`}
                        value="true"
                        checked={value === "true"}
                        onChange={() => onChange("true")}
                    />
                    <span>True</span>
                </label>
                <label className={styles.option}>
                    <input
                        type="radio"
                        name={`q${question._id}`}
                        value="false"
                        checked={value === "false"}
                        onChange={() => onChange("false")}
                    />
                    <span>False</span>
                </label>
            </div>
            {feedback && (
                <div className={`${styles.feedback} ${styles[feedback.type]}`}>
                    {feedback.message}
                </div>
            )}
        </div>
    );
};

export default TrueFalse;