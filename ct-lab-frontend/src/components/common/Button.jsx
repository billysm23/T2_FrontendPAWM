import React from 'react';
import styles from './Button.module.css';

const Button = ({ 
    children, 
    variant = 'primary', 
    size = 'medium', 
    onClick,
    disabled = false,
    type = 'button',
    className = ''
    }) => {
    return (
        <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`${styles.button} ${styles[variant]} ${styles[size]} ${className}`}
        >
        {children}
        </button>
    );
};

export default Button;