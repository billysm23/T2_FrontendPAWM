import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import styles from '../styles/Auth.module.css';

const Register = () => {
    const navigate = useNavigate();
    const { register: registerUser } = useAuth();
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

        if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        return;
        }

        setLoading(true);
        try {
        const { confirmPassword, ...registerData } = formData;
        await registerUser(registerData);
        navigate('/lessons');
        } catch (err) {
        setError(err.response?.data?.message || 'Registration failed');
        } finally {
        setLoading(false);
        }
    };

    return (
        <div className={styles.auth_container}>
        <div className={styles.auth_box}>
            <h1>Create Account</h1>
            {error && <div className={styles.error}>{error}</div>}
            
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