import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import styles from '../styles/Home.module.css';

const Home = () => {
    const { isAuthenticated } = useAuth();

    return (
        <>
        <section className={styles.main}>
            <div className={styles.main_container}>
            <div className={styles.main_content}>
                <h1>Unlock Your Full Potential in Computational Thinking</h1>
                <p>
                Dive into our interactive virtual lab designed to enhance your
                Computational Thinking skills. Experience hands-on learning that
                prepares you for real-world challenges.
                </p>
                <Link 
                to={isAuthenticated ? "/lessons" : "/login"} 
                className={styles.main_btn}
                >
                Learn More
                </Link>
            </div>
            
            <div className={styles.main_img_container}>
                <img 
                src="/images/pic1.svg" 
                alt="Computational Thinking"
                className={styles.main_img}
                />
            </div>
            </div>
        </section>

        <section id="features" className={styles.features}>
            <h1>Virtual Lab Features</h1>
            <div className={styles.features_container}>
            <div className={styles.features_card}>
                <h2>Interactive Exercises</h2>
                <p>
                These hands-on activities allow you to practice computational thinking
                concepts such as decomposition, pattern recognition, and algorithms
                through real-time interaction.
                </p>
                <Link to="/lessons" className={styles.features_btn}>
                Get Started
                </Link>
            </div>

            <div className={styles.features_card}>
                <h2>Critical Thinking Problems</h2>
                <p>
                These challenges require you to apply computational thinking to solve
                complex, real-world scenarios.
                </p>
                <Link to="/lessons" className={styles.features_btn}>
                Get Started
                </Link>
            </div>
            </div>
        </section>
        </>
    );
};

export default Home;