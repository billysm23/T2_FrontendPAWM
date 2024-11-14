import React, { createContext, useEffect, useState } from 'react';
import { login, logout } from '../api/auth';
import api from '../api/axios';

const validateUserToken = async (token) => {
    try {
        // Lakukan permintaan ke server untuk memvalidasi token
        const response = await api.get('/auth/validate-token', {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data.user;
        } catch (error) {
        throw error;
        }
    };

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check for stored token and validate
        const token = localStorage.getItem('token');
        if (token) {
        validateToken(token);
        } else {
        setLoading(false);
        }
    }, []);

    const validateToken = async (token) => {
        try {
        // Implement token validation logic
        const userData = await validateUserToken(token);
        setUser(userData);
        } catch (error) {
        localStorage.removeItem('token');
        } finally {
        setLoading(false);
        }
    };

    const handleLogin = async (credentials) => {
        try {
        const data = await login(credentials);
        setUser(data.user);
        localStorage.setItem('token', data.token);
        return data;
        } catch (error) {
        throw error;
        }
    };

    const handleLogout = async () => {
        try {
        await logout();
        setUser(null);
        localStorage.removeItem('token');
        } catch (error) {
        console.error('Logout error:', error);
        }
    };

    const value = {
        user,
        loading,
        login: handleLogin,
        logout: handleLogout,
        isAuthenticated: !!user
    };

    return (
        <AuthContext.Provider value={value}>
        {!loading && children}
        </AuthContext.Provider>
    );
};