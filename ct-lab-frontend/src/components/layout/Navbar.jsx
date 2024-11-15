import { BookOpen, Home, LogIn, LogOut, Menu, User, X } from 'lucide-react';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import styles from '../../styles/Navbar.module.css';
import ThemeToggle from '../common/ThemeToggle';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { isAuthenticated, logout, user } = useAuth();
    const navigate = useNavigate();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    }

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    return (
        <nav className={styles.navbar}>
            <div className={styles.navbar_container}>
                <Link to="/" className={styles.navbar_logo}>
                    <img 
                        src="/../../../../favicon.ico"
                        alt="CT Lab Logo"
                        className={styles.logo_image}
                    />
                    <span>CT Lab</span>
                </Link>

                <ul className={`${styles.navbar_menu} ${isOpen ? styles.active : ''}`}>
                    <li className={styles.navbar_item}>
                        <ThemeToggle/>
                    </li>
                    <li className={styles.navbar_item}>
                        <Link to="/" className={styles.navbar_links}>
                            <Home size={20} className={styles.icon} />
                            <span>Home</span>
                        </Link>
                    </li>
                    <li className={styles.navbar_item}>
                        <Link to="/lesson" className={styles.navbar_links}>
                            <BookOpen size={20} className={styles.icon} />
                            <span>Lessons</span>
                        </Link>
                    </li>
                    
                    {/* Menampilkan username jika sudah login */}
                    {isAuthenticated && user && (
                        <li className={styles.navbar_item}>
                            <span className={styles.username}>
                                <User size={20} className={styles.icon} />
                                {user.username}
                            </span>
                        </li>
                    )}
                    
                    <li className={styles.navbar_item}>
                        {!isAuthenticated ? (
                            <Link to="/login" className={styles.button}>
                                <LogIn size={20} className={styles.icon} />
                                <span>Login</span>
                            </Link>
                        ) : (
                            <button onClick={handleLogout} className={styles.button}>
                                <LogOut size={20} className={styles.icon} />
                                <span>Logout</span>
                            </button>
                        )}
                    </li>
                </ul>

                <div className={styles.navbar_toggle} onClick={toggleMenu}>
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;