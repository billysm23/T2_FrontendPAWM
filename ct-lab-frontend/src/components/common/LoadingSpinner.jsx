import React from 'react';
import styles from './LoadingSpinner.module.css';

const LoadingSpinner = () => (
  <div className={styles.spinner_container}>
    <div className={styles.spinner}></div>
  </div>
);

export default LoadingSpinner;