import React, { useState } from 'react';
import styles from '../../../styles/ContentSection.module.css';

const ContentSection = ({ lesson }) => {
    const [activeHints, setActiveHints] = useState({});

    const toggleHint = (problemIndex) => {
        setActiveHints(prev => ({
            ...prev,
            [problemIndex]: !prev[problemIndex]
        }));
    };

    if (!lesson) {
        return <div className={styles.error}>Lesson data not available</div>;
    }

    return (
        <div className={styles.content_section}>
            {/* Main Content */}
            <div 
                className={styles.main_content}
                dangerouslySetInnerHTML={{ __html: lesson.content }}
            />

            {/* Key Concepts */}
            <div className={styles.key_concepts}>
                <h2>Key Concepts</h2>
                <div className={styles.concepts_grid}>
                    {lesson.keyConcepts?.map((concept, index) => (
                        <div key={index} className={styles.concept_card}>
                            <h3>{concept.title}</h3>
                            <p>{concept.description}</p>
                            {concept.example && (
                                <div className={styles.example}>
                                    <h4>Example:</h4>
                                    <code>{concept.example}</code>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Interactive Examples */}
            {/* {lesson.interactiveExamples && (
                <div className={styles.interactive_examples}>
                    <h2>Interactive Examples</h2>
                    {lesson.interactiveExamples.map((example, index) => (
                        <div key={index} className={styles.example_container}> */}
                            {/* Interactive component would go here */}
                            {/* <div className={styles.example_content}>
                                {example.content}
                            </div>
                        </div>
                    ))}
                </div>
            )} */}

            {/* Practice Problems */}
            {lesson.practiceProblems && (
                <div className={styles.practice_section}>
                    <h2>Practice Problems</h2>
                    {lesson.practiceProblems.map((problem, index) => (
                        <div key={index} className={styles.problem_card}>
                            <h3>Problem {index + 1}</h3>
                            <p>{problem.description}</p>
                            <div className={styles.problem_hints}>
                                <button 
                                    className={styles.hint_button}
                                    onClick={() => toggleHint(index)}
                                >
                                    {activeHints[index] ? 'Hide Hint' : 'Show Hint'}
                                </button>
                                <div className={`${styles.hint} ${activeHints[index] ? styles.show : ''}`}>
                                    <p>{problem.hint}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ContentSection;