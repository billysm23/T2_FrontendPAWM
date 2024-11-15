import React, { createContext, useCallback, useEffect, useState } from 'react';
import api from '../api/axios';
import { sessionManager } from '../utils/session';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setLoading(false);
                return;
            }

            try {
                const response = await api.get('/auth/validate-token');
                if (response.data.success) {
                    setUser(response.data.user);
                }
            } catch (error) {
                // Only clear token on auth error
                if (error.response?.status === 401) {
                    localStorage.removeItem('token');
                    setUser(null);
                }
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);
    
    const handleLogout = useCallback(async () => {
        try {
            if (sessionManager.isSessionValid()) {
                await api.post('/auth/logout');
            }
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            sessionManager.clearSession();
            setUser(null);
        }
    }, []);
    
    const setupSessionRefresh = useCallback(() => {
        const interval = setInterval(() => {
            const session = sessionManager.getSession();
            if (!session) {
                clearInterval(interval);
                handleLogout();
                return;
            }

            // Update lastActivity
            sessionManager.updateSessionExpiry();
        }, 5 * 60 * 1000);

        return () => clearInterval(interval);
    }, [handleLogout]);

    useEffect(() => {
        const initializeAuth  = async () => {
            const session = sessionManager.getSession();
            if (session) {
                setUser(session.user);
                setupSessionRefresh();
            }
            setLoading(false);
        }
        initializeAuth();
    }, [setupSessionRefresh]);

    const handleLogin = useCallback(async (credentials) => {
        try {
            // Cek session sudah ada
            if (sessionManager.isSessionValid()) {
                throw new Error('You have an active session. Please logout first.');
            }

            const response = await api.post('/auth/login', credentials);
            const { success, data } = response.data;

            if (success) {
                sessionManager.setSession(data.token, data.user);
                setUser(data.user);
                setupSessionRefresh();
                return data;
            }

            throw new Error('Login failed');
        } catch (error) {
            if (error.response?.data?.error) {
                throw new Error(error.response.data.error.message);
            }
            throw error;
        }
    }, [setupSessionRefresh]);

    const handleRegister = useCallback(async (userData) => {
        try {
            // Cek session yang sudah ada
            if (sessionManager.isSessionValid()) {
                throw new Error('You have an active session. Please logout first.');
            }

            const response = await api.post('/auth/register', userData);
            const { success, data } = response.data;

            if (success) {
                // Opsional: langsung login setelah register
                sessionManager.setSession(data.token, data.user);
                setUser(data.user);
                setupSessionRefresh();
                return data;
            }

            throw new Error('Registration failed');
        } catch (error) {
            if (error.response?.data?.error) {
                throw new Error(error.response.data.error.message);
            }
            throw error;
        }
    }, [setupSessionRefresh]);

    const value = {
        user,
        loading,
        login: handleLogin,
        logout: handleLogout,
        register: handleRegister,
        isAuthenticated: sessionManager.isSessionValid()
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};