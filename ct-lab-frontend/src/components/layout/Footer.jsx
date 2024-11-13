import { Instagram, Linkedin, Twitter, Youtube } from 'lucide-react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../../styles/Footer.module.css';

const Footer = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle newsletter subscription
        console.log('Subscribing email:', email);
        setEmail('');
    };

    return (
        <footer className={styles.footer}>
            <div className={styles.footer_container}>
                <div className={styles.footer_content}>
                    <div className={styles.footer_section}>
                        <h3>Quick Links</h3>
                        <div className={styles.footer_links}>
                        <Link to="/About">About Us</Link>
                        <Link to="/https://wa.me/6287766900543">Contact Us</Link>
                        <Link to="/terms">Terms of Service</Link>
                        <Link to="/privacy">Privacy Policy</Link>
                        </div>
                    </div>

                <div className={styles.footer_section}>
                    <h3>Social Media</h3>
                    <div className={styles.footer_links}>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
                        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">YouTube</a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                    </div>
                </div>

                <div className={styles.footer_section}>
                    <h3>Resources</h3>
                    <div className={styles.footer_links}>
                        <Link to="/guides">Guides</Link>
                        <Link to="/blog">Blog</Link>
                        <Link to="/features">New Features</Link>
                        <Link to="/faq">FAQ</Link>
                    </div>
                </div>

                <div className={styles.footer_section}>
                    <h3>Subscribe</h3>
                        <form onSubmit={handleSubmit} className={styles.subscribe_form}>
                            <input
                                type="email"
                                placeholder="Your email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={styles.subscribe_input}
                                required
                            />
                            <button type="submit" className={styles.subscribe_button}>
                                Subscribe
                            </button>
                        </form>
                    <p className={styles.privacy_notice}>
                        By subscribing, you agree to our Privacy Policy
                    </p>
                </div>
            </div>

            <div className={styles.footer_bottom}>
                <div className={styles.footer_logo}>
                    <Link to="/">CT Lab</Link>
                </div>
                <p>© {new Date().getFullYear()} CT Lab. All rights reserved.</p>
                    <div className={styles.social_icons}>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                            <Instagram size={24} />
                        </a>
                        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                            <Youtube size={24} />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                            <Twitter size={24} />
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                            <Linkedin size={24} />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;