import React, { createContext, useCallback, useEffect, useState } from 'react';
import api from '../api/axios';
import { sessionManager } from '../utils/session';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    
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
            console.log('Login response:', response);

            if (response.data.success) {
                sessionManager.setSession({
                    token: response.data.data.token,
                    user: response.data.data.user
                });
                
                setUser(response.data.data.user);
                setupSessionRefresh();
                return response.data.data;
            }

            throw new Error('Login failed');
        } catch (error) {
            console.error('Login error:', error);
            sessionManager.clearSession();
            if (error.response?.data?.error) {
                throw new Error(error.response.data.error.message);
            }
            throw error;
        }
    }, [setupSessionRefresh]);

    const handleRegister = useCallback(async (userData) => {
        try {
            if (sessionManager.isSessionValid()) {
                throw new Error('You have an active session. Please logout first.');
            }

            const response = await api.post('/auth/register', userData);

            if (response.data.success) {
                sessionManager.setSession({
                    token: response.data.data.token,
                    user: response.data.data.user
                });
                
                setUser(response.data.data.user);
                setupSessionRefresh();
                return response.data.data;
            }

            throw new Error('Registration failed');
        } catch (error) {
            console.error('Registration error:', error);
            sessionManager.clearSession();
            if (error.response?.data?.error) {
                throw new Error(error.response.data.error.message);
            }
            throw error;
        }
    }, [setupSessionRefresh]);

    useEffect(() => {
        const initializeAuth = async () => {
            try {
                const session = sessionManager.getSession();
                if (!session) {
                    setLoading(false);
                    return;
                }

                // Validate token with backend
                const response = await api.get('/auth/validate-token');
                if (response.data.success) {
                    setUser(session.user);
                    setupSessionRefresh();
                } else {
                    sessionManager.clearSession();
                    setUser(null);
                }
            } catch (error) {
                console.error('Auth initialization error:', error);
                sessionManager.clearSession();
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        initializeAuth();
    }, [setupSessionRefresh]);

    const value = {
        user,
        loading,
        login: handleLogin,
        logout: handleLogout,
        register: handleRegister,
        isAuthenticated: !!user && sessionManager.isSessionValid()
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};