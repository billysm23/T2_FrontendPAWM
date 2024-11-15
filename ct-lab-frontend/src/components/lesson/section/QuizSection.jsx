import { AlertCircle, Check, ChevronRight, Loader2, X } from 'lucide-react';
import React, { useState } from 'react';
import { useProgress } from '../../../context/ProgressContext';
import styles from '../../../styles/QuizSection.module.css';

const QuizSection = ({ lesson }) => {
    const { submitQuizAnswers } = useProgress();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [quizCompleted, setQuizCompleted] = useState(false);
    const [score, setScore] = useState(null);

    if (!lesson) {
        return <div className={styles.error}>Lesson data not available</div>;
    }

    const questions = lesson?.quiz || [];
    const currentQuestion = questions[currentIndex];
    const progress = (currentIndex + 1) / questions.length * 100;

    const handleAnswer = (questionId, answer) => {
        setAnswers(prev => ({
            ...prev,
            [questionId]: answer
        }));
    };

    const handleSubmit = async () => {
        try {
            setSubmitting(true);
            const result = await submitQuizAnswers(lesson._id, 
                Object.entries(answers).map(([questionId, answer]) => ({
                    question_id: questionId,
                    selected_answer: answer,
                }))
            );
            
            setScore(result.data.score);
            setQuizCompleted(true);
        } catch (err) {
            setError('Failed to submit quiz');
        } finally {
            setSubmitting(false);
        }
    };

    if (quizCompleted) {
        const passed = score >= 70;
        return (
            <div className={styles.quiz_section}>
                <div className={styles.section}>
                    <h2>Quiz Results</h2>
                    <div className={styles.completion_card}>
                        <div className={styles.result_icon}>
                            {passed ? (
                                <Check className={styles.success_icon} />
                            ) : (
                                <X className={styles.fail_icon} />
                            )}
                        </div>
                        <h3>Quiz Completed!</h3>
                        <p className={styles.score}>Your Score: {score}%</p>
                        <p className={styles.message}>
                            {passed 
                                ? "Congratulations! You've passed this lesson's quiz." 
                                : "Keep practicing! You need 70% to pass."}
                        </p>
                        <button
                            onClick={() => {
                                setQuizCompleted(false);
                                setAnswers({});
                                setCurrentIndex(0);
                            }}
                            className={styles.retry_button}
                        >
                            Try Again
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles.quiz_section}>
                <div className={styles.section}>
                    <h2>Quiz Error</h2>
                    <div className={styles.error_card}>
                        <AlertCircle className={styles.error_icon} />
                        <p>{error}</p>
                        <button 
                            onClick={() => setError(null)}
                            className={styles.retry_button}
                        >
                            Try Again
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.quiz_section}>
            {/* Quiz Progress */}
            <div className={styles.section}>
                <h2>Quiz Progress</h2>
                <div className={styles.progress_card}>
                    <div className={styles.progress_bar}>
                        <div 
                            className={styles.progress}
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                    <p className={styles.progress_text}>
                        Question {currentIndex + 1} of {questions.length}
                    </p>
                </div>
            </div>

            {/* Current Question */}
            <div className={styles.section}>
                <h2>Question {currentIndex + 1}</h2>
                <div className={styles.question_card}>
                    <p className={styles.question_text}>
                        {currentQuestion?.question_text}
                    </p>

                    <div className={styles.options_grid}>
                        {currentQuestion?.options.map((option) => (
                            <button
                                key={option._id}
                                onClick={() => handleAnswer(currentQuestion._id, option._id)}
                                className={`${styles.option_button} ${
                                    answers[currentQuestion._id] === option._id 
                                        ? styles.selected 
                                        : ''
                                }`}
                            >
                                <span className={styles.option_text}>
                                    {option.text}
                                </span>
                            </button>
                        ))}
                    </div>

                    <div className={styles.navigation}>
                        <button
                            onClick={() => setCurrentIndex(prev => prev - 1)}
                            disabled={currentIndex === 0}
                            className={styles.nav_button}
                        >
                            Previous
                        </button>

                        {currentIndex === questions.length - 1 ? (
                            <button
                                onClick={handleSubmit}
                                disabled={submitting || Object.keys(answers).length !== questions.length}
                                className={styles.submit_button}
                            >
                                {submitting ? (
                                    <>
                                        <Loader2 className={styles.loading_icon} />
                                        Submitting...
                                    </>
                                ) : (
                                    'Submit Quiz'
                                )}
                            </button>
                        ) : (
                            <button
                                onClick={() => setCurrentIndex(prev => prev + 1)}
                                disabled={!answers[currentQuestion?._id]}
                                className={styles.next_button}
                            >
                                Next
                                <ChevronRight className={styles.next_icon} />
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuizSection;