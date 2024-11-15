import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const SessionGuard = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading && !isAuthenticated) {
            navigate('/login', { 
                replace: true,
                state: { from: window.location.pathname }
            });
        }
    }, [isAuthenticated, loading, navigate]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return isAuthenticated ? children : null;
};

export default SessionGuard;