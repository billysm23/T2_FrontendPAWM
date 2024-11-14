import { Moon, Sun } from 'lucide-react';
import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import styles from '../../styles/ThemeToggle.module.css';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  const handleClick = () => {
    console.log('Current theme:', theme); // Untuk debugging
    toggleTheme();
  };

  return (
    <button
      onClick={handleClick}
      className={styles.themeToggle}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
    >
      {theme === 'light' ? (
        <Moon size={20} className={styles.icon} />
      ) : (
        <Sun size={20} className={styles.icon} />
      )}
    </button>
  );
};

export default ThemeToggle;