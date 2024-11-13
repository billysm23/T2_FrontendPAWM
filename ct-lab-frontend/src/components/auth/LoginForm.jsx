import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import Button from '../../common/Button';
import styles from './LoginForm.module.css';

const LoginForm = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({
        ...formData,
        [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        
        try {
        await login(formData);
        navigate('/lessons');
        } catch (err) {
        setError(err.response?.data?.error?.message || 'Login failed');
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            />
        </div>

        <div className={styles.formGroup}>
            <label htmlFor="password">Password</label>
            <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            />
        </div>

        {error && <div className={styles.error}>{error}</div>}

        <Button type="submit" variant="primary" size="large">
            Login
        </Button>
        </form>
    );
};

export default LoginForm;