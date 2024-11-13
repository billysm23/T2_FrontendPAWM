import React from 'react';
import styles from '../styles/About.module.css';

const About = () => {
    return (
        <div className={styles.about}>
        <div className={styles.about_container}>
            <div className={styles.about_content}>
            <h1>About CT Lab</h1>
            <p>
                CT Lab is an innovative virtual laboratory designed to enhance your
                understanding of Computational Thinking through interactive learning
                experiences.
            </p>

            <section className={styles.mission}>
                <h2>Our Mission</h2>
                <p>
                To provide accessible, engaging, and effective tools for learning
                computational thinking concepts, preparing students for the challenges
                of tomorrow's digital world.
                </p>
            </section>

            <section className={styles.features}>
                <h2>Why Choose CT Lab?</h2>
                <div className={styles.features_grid}>
                <div className={styles.feature_card}>
                    <h3>Interactive Learning</h3>
                    <p>
                    Hands-on exercises and real-time feedback to enhance your
                    understanding.
                    </p>
                </div>
                <div className={styles.feature_card}>
                    <h3>Structured Curriculum</h3>
                    <p>
                    Carefully designed lessons that build upon each other for optimal
                    learning.
                    </p>
                </div>
                <div className={styles.feature_card}>
                    <h3>Progress Tracking</h3>
                    <p>
                    Monitor your advancement with detailed progress reports and
                    achievements.
                    </p>
                </div>
                </div>
            </section>
            </div>
        </div>
        </div>
    );
};

export default About;