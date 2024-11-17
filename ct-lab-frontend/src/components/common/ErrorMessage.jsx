import React from 'react';
import styles from './ErrorMessage.module.css';

const ErrorMessage = ({ message, onRetry }) => (
    <div className={styles.error_container}>
        <p>{message}</p>
        {onRetry && (
            <button onClick={onRetry} className={styles.retry_button}>
                Try Again
            </button>
        )}
    </div>
);

export default ErrorMessage;