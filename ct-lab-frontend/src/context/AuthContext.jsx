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
    }, [setUser]);
    
    const setupSessionRefresh = useCallback(() => {
        // Update session expiry setiap 5 menit
        const interval = setInterval(() => {
            if (sessionManager.isSessionValid()) {
                sessionManager.updateSessionExpiry();
            } else {
                clearInterval(interval);
                handleLogout();
            }
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
            const response = await api.post('/auth/login', credentials);
            const { success, data } = response.data;

            if (success) {
                const { token, user } = data;
                sessionManager.setSession(token, user);
                setUser(user);
                setupSessionRefresh();
                return data;
            }
            
            throw new Error('Login failed');
        } catch (error) {
            throw error;
        }
    }, [setUser, setupSessionRefresh]);

    const value = {
        user,
        loading,
        login: handleLogin,
        logout: handleLogout,
        isAuthenticated: sessionManager.isSessionValid()
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};