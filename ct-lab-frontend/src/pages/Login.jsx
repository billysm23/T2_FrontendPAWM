import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import styles from '../styles/Auth.module.css';
import ApiError from '../utils/errorHandler';

const Login = () => {
    const navigate = useNavigate();
    const { login, logout } = useAuth();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Reset error saat user mengetik
        if (error?.field?.includes(name)) {
            setError(null);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            await login(formData);
            navigate('/');
        } catch (err) {
            const errorInfo = ApiError.handle(err);
            setError(errorInfo);

            // Handle specific actions
            switch (errorInfo.action) {
                case 'validate':
                    // Biarkan user memperbaiki input
                    break;
                case 'login':
                    // Redirect ke login jika token invalid
                    navigate('/login');
                    break;
                case 'logout':
                    // Handle session exists
                    await logout();
                    break;
                case 'retry':
                    // User bisa mencoba lagi
                    break;
                default:
                    console.warn('Unknown error action:', errorInfo.action);
                    break;
            }

            // Clear password jika error kredensial
            if (errorInfo.field?.includes('password')) {
                setFormData(prev => ({ ...prev, password: '' }));
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.auth_container}>
            <div className={styles.auth_box}>
                <h1>Login to CT Lab</h1>
                
                {error && (
                    <div className={styles.error_container}>
                        <div className={styles.error_message}>
                            {error.message}
                        </div>
                    </div>
                )}

                <form onSubmit={handleSubmit} className={styles.auth_form}>
                    <div className={styles.form_group}>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`${styles.input} ${
                                error?.field?.includes('email') ? styles.input_error : ''
                            }`}
                        />
                    </div>

                    <div className={styles.form_group}>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className={`${styles.input} ${
                                error?.field?.includes('password') ? styles.input_error : ''
                            }`}
                        />
                    </div>

                    <button 
                        type="submit" 
                        className={styles.submit_btn}
                        disabled={loading}
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>

                <p className={styles.auth_link}>
                    Don't have an account? <Link to="/register">Register</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;