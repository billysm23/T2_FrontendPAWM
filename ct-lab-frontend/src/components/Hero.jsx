import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/Hero.module.css';

const Hero = () => {
    return (
        <section className={styles.hero_section}>
            {/* Stars */}
            <div className={`${styles.star} ${styles.star1}`}></div>
            <div className={`${styles.star} ${styles.star2}`}></div>
            <div className={`${styles.star} ${styles.star3}`}></div>
            <div className={`${styles.star} ${styles.star4}`}></div>
            <div className={`${styles.star} ${styles.star5}`}></div>
            <div className={`${styles.star} ${styles.star6}`}></div>
            <div className={`${styles.star} ${styles.star7}`}></div>
            <div className={`${styles.star} ${styles.star8}`}></div>
            <div className={`${styles.star} ${styles.star9}`}></div>
            <div className={`${styles.star} ${styles.star10}`}></div>

            <div className={styles.hero_container}>
                <div className={styles.hero_content}>
                    <h1 className={styles.title}>
                        Unlock Your Full Potential<br />
                        in Computational Thinking
                    </h1>
                    <p className={styles.subtitle}>
                        Dive into our interactive virtual lab designed to enhance your
                        Computational Thinking skills. Experience hands-on learning that
                        prepares you for real-world challenges.
                    </p>
                    <Link to="/lesson" className={styles.cta_button}>
                        Get Started
                    </Link>
                </div>

                <div className={styles.hero_image}>
                    <img 
                        src="/../../../images/computer.png" 
                        alt="Computational Thinking Illustration" 
                    />
                </div>
            </div>

            {/* Wave */}
            <div className={styles.wave_container}>
                <svg viewBox="0 0 1440 320" 
                className={styles.wave} 
                preserveAspectRatio="none">
                    <path 
                        fill="#f1f5f9" 
                        d="M0,96L48,112C96,128,192,160,288,165.3C384,171,480,149,576,128C672,107,768,85,864,90.7C960,96,1056,128,1152,133.3C1248,139,1344,117,1392,106.7L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                    ></path>
                </svg>
            </div>
        </section>
    );
};

export default Hero;