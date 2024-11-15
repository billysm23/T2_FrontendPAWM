import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import styles from '../styles/Auth.module.css';
import ApiError from '../utils/errorHandler';

const Register = () => {
    const navigate = useNavigate();
    const { register } = useAuth();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
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

    const validatePasswords = () => {
        if (formData.password !== formData.confirmPassword) {
            setError({
                message: 'Passwords do not match',
                field: ['password', 'confirmPassword'],
                action: 'validate'
            });
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        // Validasi password match
        if (!validatePasswords()) {
            return;
        }

        setLoading(true);
        try {
            const { confirmPassword, ...registerData } = formData;
            await register(registerData);

            navigate('/login');
        } catch (err) {
            const errorInfo = ApiError.handle(err);
            setError(errorInfo);

            // Handle specific actions
            switch (errorInfo.action) {
                case 'validate':
                    // Clear password fields jika ada error validasi
                    if (errorInfo.field?.includes('password')) {
                        setFormData(prev => ({
                            ...prev,
                            password: '',
                            confirmPassword: ''
                        }));
                    }
                    break;
                case 'retry':
                    // User bisa mencoba lagi
                    break;
                default:
                    // Default handler untuk action yang tidak dikenal
                    console.warn('Unknown error action:', errorInfo.action);
                    break;
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.auth_container}>
            <div className={styles.auth_box}>
                <h1>Create Account</h1>
                
                {error && (
                    <div className={styles.error_container}>
                        <div className={styles.error_message}>
                            {error.message}
                        </div>
                    </div>
                )}

                <form onSubmit={handleSubmit} className={styles.auth_form}>
                    <div className={styles.form_group}>
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                            className={`${styles.input} ${
                                error?.field?.includes('username') ? styles.input_error : ''
                            }`}
                            minLength={6}
                            maxLength={30}
                            pattern="^[a-zA-Z0-9_-]+$"
                            title="Username can only contain letters, numbers, underscores and dashes"
                        />
                    </div>

                    <div className={styles.form_group}>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
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
                            required
                            className={`${styles.input} ${
                                error?.field?.includes('password') ? styles.input_error : ''
                            }`}
                            minLength={6}
                            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$"
                            title="Password must contain at least 6 characters, including uppercase, lowercase, number and special character"
                        />
                    </div>

                    <div className={styles.form_group}>
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                            className={`${styles.input} ${
                                error?.field?.includes('confirmPassword') ? styles.input_error : ''
                            }`}
                        />
                    </div>

                    <button 
                        type="submit" 
                        className={styles.submit_btn}
                        disabled={loading}
                    >
                        {loading ? 'Creating account...' : 'Register'}
                    </button>
                </form>

                <p className={styles.auth_link}>
                    Already have an account? <Link to="/login">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;