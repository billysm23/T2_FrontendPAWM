import { BookOpen, Brain, Code, Target } from 'lucide-react';
import React from 'react';
import styles from '../styles/Features.module.css';

const Features = () => {
    const features = [
        {
            icon: <BookOpen className={styles.icon} size={24} />,
            title: "Interactive Learning",
            description: "Engage with hands-on exercises and real-time feedback to enhance your understanding of computational concepts."
        },
        {
            icon: <Brain className={styles.icon} size={24} />,
            title: "Problem Solving",
            description: "Develop critical thinking skills through challenging problems and real-world scenarios."
        },
        {
            icon: <Target className={styles.icon} size={24} />,
            title: "Track Progress",
            description: "Monitor your learning journey with detailed progress tracking and personalized feedback."
        },
        {
            icon: <Code className={styles.icon} size={24} />,
            title: "Practical Skills",
            description: "Learn essential computational thinking skills that are valuable across all disciplines."
        }
    ];

    return (
    <section className={styles.features}>
        <div className={styles.features_container}>
        <h2 className={styles.section_title}>Why Choose CT Lab?</h2>
            <div className={styles.features_grid}>
                {features.map((feature, index) => (
                    <div key={index} className={styles.feature_card}>
                        <div className={styles.feature_icon}>
                            {feature.icon}
                        </div>
                            <h3 className={styles.feature_title}>{feature.title}</h3>
                            <p className={styles.feature_description}>{feature.description}</p>
                    </div>
                ))}
            </div>
        </div>
    </section>
    );
};

export default Features;