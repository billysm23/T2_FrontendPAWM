import React, { createContext, useEffect, useState } from 'react';
import api from '../api/axios';

const validateUserToken = async (token) => {
    try {
        // Lakukan permintaan ke server untuk memvalidasi token
        const response = await api.get('/auth/validate-token', {
            headers: { Authorization: `Bearer ${token}` }
        });
        if (response.data.success) {
            return response.data.data.user;
        }
        throw new Error('Invalid token');
    } catch (error) {
        throw error;
    }
};

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Cek token yang tersimpan
        const checkAuth = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                validateToken(token);
            } else {
                setLoading(false);
            }
        }
        checkAuth();
    }, []);

    const validateToken = async (token) => {
        try {
            // Implementasi validasi token
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
            const response = await api.post('/auth/login', credentials);
            if (response.data.success) {
                const { token, data } = response.data;
                localStorage.setItem('token', token);
                setUser(data.user);
                return response.data;
            }
            throw new Error('Login failed');
        } catch (error) {
            throw error;
        }
    };

    const handleLogout = async () => {
        try {
            await api.post('/auth/logout');
            localStorage.removeItem('token');
            setUser(null);
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