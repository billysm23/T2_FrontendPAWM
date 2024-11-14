import { BookOpen, Home, LogIn, Menu, X } from 'lucide-react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import styles from '../../styles/Navbar.module.css';
import ThemeToggle from '../common/ThemeToggle';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { isAuthenticated, logout } = useAuth();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
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

                <div className={styles.navbar_toggle} onClick={toggleMenu}>
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </div>

                <ul className={`${styles.navbar_menu} ${isOpen ? styles.active : ''}`}>
                    <li className={styles.navbar_item}>
                        <ThemeToggle/>
                    </li>
                    <li className={styles.navbar_item}>
                        <Link to="/" className={styles.navbar_links} onClick={() => setIsOpen(false)}>
                            <Home size={20} className={styles.icon} />
                            <span> Home</span>
                        </Link>
                    </li>
                    <li className={styles.navbar_item}>
                        <Link to="/lesson" className={styles.navbar_links} onClick={() => setIsOpen(false)}>
                            <BookOpen size={20} className={styles.icon} />
                            <span> Lessons</span>
                        </Link>
                    </li>
                    <li className={styles.navbar_item}>
                        {!isAuthenticated ? (
                            <Link to="/login" className={styles.button} onClick={() => setIsOpen(false)}>
                                <LogIn size={20} className={styles.icon} />
                                <span> Login</span>
                            </Link>
                        ) : (
                            <button onClick={logout} className={styles.button}>
                                <LogIn size={20} className={styles.icon} />
                                <span>Logout</span>
                            </button>
                        )}
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;