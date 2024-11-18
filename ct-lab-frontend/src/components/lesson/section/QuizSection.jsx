import { Check, ChevronRight, Loader2, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../../api/axios';
import { useProgress } from '../../../context/ProgressContext';
import styles from '../../../styles/QuizSection.module.css';
import QuizCompletion from './QuizCompletion';

const QuizSection = ({ lesson }) => {
    const { submitQuizAnswers, saveQuizProgress, getQuizProgress } = useProgress();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [quizCompleted, setQuizCompleted] = useState(false);
    const [score, setScore] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showCompletion, setShowCompletion] = useState(false);
    const navigate = useNavigate();
    const [quizResult, setQuizResult] = useState(null);

    useEffect(() => {
        const loadSavedProgress = async () => {
            try {
                setLoading(true);
                const savedProgress = await getQuizProgress(lesson._id);
                
                if (savedProgress?.data) {
                    const savedAnswers = {};
                    savedProgress.data.answers.forEach(answer => {
                        savedAnswers[answer.question_id] = answer.selected_answer;
                    });
                    setAnswers(savedAnswers);

                    const lastAnsweredIndex = Object.keys(savedAnswers).length - 1;
                    if (lastAnsweredIndex >= 0) {
                        setCurrentIndex(lastAnsweredIndex);
                    }

                    // Cek apakah quiz selesai
                    if (savedProgress.data.status === 'completed') {
                        setQuizCompleted(true);
                        setScore(savedProgress.data.score);
                    }
                }
            } catch (err) {
                console.error('Failed to load quiz progress:', err);
            } finally {
                setLoading(false);
            }
        };

        if (lesson?._id) {
            loadSavedProgress();
        }
    }, [lesson?._id]);

    const handleAnswer = async (questionId, answer) => {
        const newAnswers = {
            ...answers,
            [questionId]: answer
        };
        setAnswers(newAnswers);

        // Auto-save
        try {
            await saveQuizProgress(lesson._id, 
                Object.entries(newAnswers).map(([qId, selectedAnswer]) => ({
                    question_id: qId,
                    selected_answer: selectedAnswer,
                }))
            );
        } catch (err) {
            console.error('Failed to save progress:', err);
        }
    };

    const handleSubmit = async () => {
        try {
            setSubmitting(true);
            
            const formattedAnswers = Object.entries(answers).map(([questionId, answerId]) => ({
                questionId,
                selectedAnswer: answerId
            }));

            const response = await api.post(`/quiz/${lesson._id}/submit`, {
                answers: formattedAnswers
            });

            if (response.data.success) {
                const result = {
                    score: response.data.data.score,
                    passed: response.data.data.passed,
                    correctAnswers: response.data.data.correctAnswers,
                    totalQuestions: questions.length
                };

                // Redirect ke halaman hasil dengan data quiz
                navigate(`/lesson/${lesson._id}/quiz-result`, {
                    state: { quizResult: result }
                });
            }
        } catch (error) {
            setError(error.response?.data?.message || 'Failed to submit quiz');
            setSubmitting(false);
        }
    };

    const handleRetry = () => {
        setShowCompletion(false);
        setQuizResult(null);
        setAnswers({});
        setCurrentIndex(0);
    };

    if (showCompletion && quizResult) {
        return (
            <QuizCompletion
                score={quizResult.score}
                totalQuestions={quizResult.totalQuestions}
                correctAnswers={quizResult.correctAnswers}
                onRetry={handleRetry}
            />
        );
    }

    if (loading) {
        return (
            <div className={styles.quiz_section}>
                <div className={styles.section}>
                    <div className={styles.loading_card}>
                        <Loader2 className={styles.loading_icon} />
                        <p>Loading quiz progress...</p>
                    </div>
                </div>
            </div>
        );
    }

    // Rest of the existing code remains the same...
    if (!lesson) {
        return <div className={styles.error}>Lesson data not available</div>;
    }

    const questions = lesson?.quiz || [];
    const currentQuestion = questions[currentIndex];
    const progress = (currentIndex + 1) / questions.length * 100;

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

    // Rest of the existing code remains exactly the same...
    // (Error handling, quiz progress, current question sections)
    // ...

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