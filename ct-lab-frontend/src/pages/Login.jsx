import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import styles from '../styles/Auth.module.css';

const Login = () => {
    const navigate = useNavigate();
    // const location = useLocation();
    const { login } = useAuth();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
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
        setLoading(true);

        try {
            // const response = await api.post('/auth/login', formData);
            await login(formData);
            navigate('/');
        } catch (err) {
            if (err.response) {
                setError(err.response.data?.error?.message || 'Server error');
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
                <h1>Login to CT Lab</h1>
                {error && (
                        <div className={styles.error_container}>
                            <div className={styles.error_message}>
                                {error}
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