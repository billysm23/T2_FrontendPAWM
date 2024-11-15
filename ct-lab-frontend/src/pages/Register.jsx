import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import styles from '../styles/Auth.module.css';

const Register = () => {
    const navigate = useNavigate();
    // const { register: registerUser } = useAuth();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Validasi password match
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setLoading(true);
        try {
            // Hilangkan confirmPassword dari data yang dikirim
            const { confirmPassword, ...registerData } = formData;
            
            // Kirim request register ke backend
            const response = await api.post('/auth/register', registerData);

            if (response.data.success) {
                navigate('/login');
            }
        } catch (err) {
            if (err.response) {
                // Error dari server
                const errorData = err.response.data;
                
                if (errorData.error) {
                    switch (errorData.error.code) {
                        case 'RESOURCE_EXISTS':
                            setError('Username or email already exists');
                            break;
                        case 'VALIDATION_ERROR':
                            setError(errorData.error.message);
                            break;
                        case 'INVALID_FORMAT':
                            setError(errorData.error.message);
                            break;
                        default:
                            setError(errorData.error.message || 'Registration failed');
                    }
                } else {
                    setError('Registration failed. Please try again.');
                }
            } else if (err.request) {
                setError('Unable to connect to server. Please check your internet connection.');
            } else {
                setError('An unexpected error occurred');
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
                            {error}
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
                            className={styles.input}
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
                            className={styles.input}
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
                            className={styles.input}
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
                            className={styles.input}
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