import { Check, ChevronRight, Loader2, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useProgress } from '../../../hooks/useProgress';
import styles from '../../../styles/QuizSection.module.css';

const QuizSection = ({ lesson }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [quizResult, setQuizResult] = useState(null);
    const [loading, setLoading] = useState(true);
    const { submitQuiz } = useProgress();

    useEffect(() => {
        if (!lesson?.quiz) {
            setError('Quiz not found');
        }
        setLoading(false);
    }, [lesson]);

    const handleAnswer = (questionId, answer) => {
        setAnswers(prev => ({
            ...prev,
            [questionId]: answer
        }));
    };

    const handleSubmit = async () => {
        try {
            setSubmitting(true);
            setError(null);

            const formattedAnswers = Object.entries(answers).map(([questionId, selectedAnswer]) => ({
                questionId,
                selectedAnswer,
            }));

            const result = await submitQuiz(lesson._id, formattedAnswers);
            setQuizResult(result.data);
        } catch (err) {
            setError(err.message || 'Failed to submit quiz');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className={styles.loading_container}>
                <Loader2 className={styles.loading_icon} />
                <p>Loading quiz...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles.error_container}>
                <X className={styles.error_icon} />
                <p>{error}</p>
            </div>
        );
    }

    if (quizResult) {
        return (
            <div className={styles.result_container}>
                <div className={styles.result_card}>
                    <div className={styles.result_icon}>
                        {quizResult.passed ? (
                            <Check className={styles.success_icon} />
                        ) : (
                            <X className={styles.fail_icon} />
                        )}
                    </div>
                    <h2>Quiz Completed!</h2>
                    <p className={styles.score}>Your Score: {quizResult.score}%</p>
                    <p className={styles.message}>
                        {quizResult.passed 
                            ? "Congratulations! You've passed this lesson." 
                            : "Keep trying! You need 60% to pass."}
                    </p>
                    {!quizResult.passed && (
                        <button 
                            onClick={() => {
                                setQuizResult(null);
                                setAnswers({});
                                setCurrentIndex(0);
                            }}
                            className={styles.retry_button}
                        >
                            Try Again
                        </button>
                    )}
                </div>
            </div>
        );
    }

    const questions = lesson.quiz || [];
    const currentQuestion = questions[currentIndex];
    const progress = ((currentIndex + 1) / questions.length) * 100;

    return (
        <div className={styles.quiz_section}>
            <div className={styles.progress_container}>
                <div className={styles.progress_bar}>
                    <div 
                        className={styles.progress}
                        style={{ width: `${progress}%` }}
                    />
                </div>
                <p>Question {currentIndex + 1} of {questions.length}</p>
            </div>

            <div className={styles.question_card}>
                <h3>{currentQuestion?.question_text}</h3>
                <div className={styles.options_grid}>
                    {currentQuestion?.options.map((option) => (
                        <button
                            key={option._id}
                            onClick={() => handleAnswer(currentQuestion._id, option._id)}
                            className={`${styles.option_button} ${
                                answers[currentQuestion._id] === option._id ? styles.selected : ''
                            }`}
                        >
                            {option.text}
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
                            <ChevronRight size={20} />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default QuizSection;