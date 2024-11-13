import { BookOpen, Brain, Code, Target } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/Home.module.css';

const Home = () => {
    return (
        <>
        <section className={styles.hero_section}>
            {/* Stars decoration */}
            <div className={`${styles.star} ${styles.star1}`}></div>
            <div className={`${styles.star} ${styles.star2}`}></div>
            <div className={`${styles.star} ${styles.star3}`}></div>

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
                    <Link to="/lessons" className={styles.cta_button}>
                        Get Started
                    </Link>
                </div>

                {/* <div className={styles.hero_image}>
                    <img 
                        src="/../../../images/computer.png" 
                        alt="Computational Thinking Illustration" 
                    />
                </div> */}
            </div>

        {/* Wave SVG */}
            <div className={styles.wave_container}>
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className={styles.shape_fill}></path>
                </svg>
            </div>
        </section>

        <section className={styles.features}>
            <div className={styles.features_container}>
                <h2 className={styles.section_title}>Why Choose CT Lab?</h2>

            <div className={styles.features_grid}>
                <div className={styles.feature_card}>
                    <div className={styles.feature_icon}>
                        <BookOpen size={24} />
                    </div>
                    <h3 className={styles.feature_title}>Interactive Learning</h3>
                    <p className={styles.feature_description}>
                        Engage with hands-on exercises and real-time feedback to enhance your understanding of computational concepts.
                    </p>
                </div>

            <div className={styles.feature_card}>
                <div className={styles.feature_icon}>
                    <Brain size={24} />
                </div>
                <h3 className={styles.feature_title}>Problem Solving</h3>
                <p className={styles.feature_description}>
                    Develop critical thinking skills through challenging problems and real-world scenarios.
                </p>
            </div>

            <div className={styles.feature_card}>
                <div className={styles.feature_icon}>
                    <Target size={24} />
                </div>
                <h3 className={styles.feature_title}>Track Progress</h3>
                <p className={styles.feature_description}>
                    Monitor your learning journey with detailed progress tracking and personalized feedback.
                </p>
            </div>

            <div className={styles.feature_card}>
                <div className={styles.feature_icon}>
                    <Code size={24} />
                </div>
                <h3 className={styles.feature_title}>Practical Skills</h3>
                <p className={styles.feature_description}>
                    Learn essential computational thinking skills that are valuable across all disciplines.
                </p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Home;