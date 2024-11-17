import { AlertCircle, Check, ChevronRight, Loader2, X } from 'lucide-react';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useProgress } from '../../../context/ProgressContext';
import styles from '../../../styles/QuizSection.module.css';

const QuizSection = React.memo(({ lesson }) => {
    const { submitQuizAnswers } = useProgress();
    const [state, setState] = useState({
        currentIndex: 0,
        answers: {},
        submitting: false,
        error: null,
        quizCompleted: false,
        score: null
    });

    const { currentIndex, answers, submitting, error, quizCompleted, score } = state;

    useEffect(() => {
        setState(prev => ({
            ...prev,
            currentIndex: 0,
            answers: {},
            quizCompleted: false,
            score: null,
            error: null
        }));
    }, [lesson?._id]);

    const questions = useMemo(() => lesson?.quiz || [], [lesson?.quiz]);
    const currentQuestion = useMemo(() => questions[currentIndex], [questions, currentIndex]);
    const progress = useMemo(() => 
        questions.length ? (currentIndex + 1) / questions.length * 100 : 0,
        [currentIndex, questions.length]
    );

    const handleAnswer = useCallback((questionId, answer) => {
        setState(prev => ({
            ...prev,
            answers: {
                ...prev.answers,
                [questionId]: answer
            }
        }));
    }, []);

    const handleSubmit = async () => {
        try {
            setState(prev => ({ ...prev, submitting: true }));
            const result = await submitQuizAnswers(lesson._id,
                Object.entries(answers).map(([questionId, answer]) => ({
                    question_id: questionId,
                    selected_answer: answer,
                }))
            );
            
            setState(prev => ({
                ...prev,
                score: result.data.score,
                quizCompleted: true,
                submitting: false
            }));
        } catch (err) {
            setState(prev => ({
                ...prev,
                error: 'Failed to submit quiz',
                submitting: false
            }));
        }
    };

    const resetQuiz = useCallback(() => {
        setState(prev => ({
            ...prev,
            quizCompleted: false,
            answers: {},
            currentIndex: 0
        }));
    }, []);

    const handleNextQuestion = useCallback(() => {
        setState(prev => ({
            ...prev,
            currentIndex: prev.currentIndex + 1
        }));
    }, []);

    const handlePrevQuestion = useCallback(() => {
        setState(prev => ({
            ...prev,
            currentIndex: prev.currentIndex - 1
        }));
    }, []);

    const clearError = useCallback(() => {
        setState(prev => ({ ...prev, error: null }));
    }, []);

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
                            onClick={resetQuiz}
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
                            onClick={clearError}
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
                            onClick={handlePrevQuestion}
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
                                onClick={handleNextQuestion}
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
});

export default QuizSection;