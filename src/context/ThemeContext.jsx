import React, { createContext, useContext, useEffect, useState } from 'react';
import api from '../api/axios';

const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTheme = async () => {
      try {
        const response = await api.get('/progress/theme');
        if (response.success) {
          const savedTheme = response.data.theme;
          setTheme(savedTheme);
          document.documentElement.setAttribute('data-theme', savedTheme);
        }
      } catch (error) {
        console.error('Error fetching theme:', error);
      } finally {
        setLoading(false);
      }
    };

    // Coba ambil tema dari localStorage dulu sebagai fallback
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    if (localStorage.getItem('token')) {
      fetchTheme();
    } else {
      setLoading(false);
    }
  }, []);

  const toggleTheme = async () => {
    try {
      const newTheme = theme === 'light' ? 'dark' : 'light';
      
      // Update UI immediately
      setTheme(newTheme);
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);

      // If user is logged in, sync with backend
      if (localStorage.getItem('token')) {
        const response = await api.put('/progress/theme', { theme: newTheme });
        if (!response.success) {
          // Rollback if server update fails
          setTheme(theme);
          document.documentElement.setAttribute('data-theme', theme);
          localStorage.setItem('theme', theme);
          console.error('Failed to update theme on server');
        }
      }
    } catch (error) {
      console.error('Error updating theme:', error);
      // Rollback on error
      setTheme(theme);
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
    }
  };

  const value = {
    theme,
    toggleTheme,
    loading
  };

  return (
    <ThemeContext.Provider value={value}>
      {!loading && children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default ThemeProvider;