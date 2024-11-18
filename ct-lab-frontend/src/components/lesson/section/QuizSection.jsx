import { Check, ChevronRight, Loader2, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../../api/axios';
import styles from '../../../styles/QuizSection.module.css';

const QuizSection = ({ lesson }) => {  // Ubah dari lessonId ke lesson
    const navigate = useNavigate();
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [quizResult, setQuizResult] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                console.log('Fetching questions for lesson:', lesson._id); // Debug log
                setLoading(true);
                const response = await api.get(`/quiz/lesson/${lesson._id}`);
                console.log('Quiz response:', response.data); // Debug log

                if (response.data.success) {
                    setQuestions(response.data.data.questions);
                } else {
                    throw new Error('Failed to fetch quiz data');
                }
            } catch (err) {
                console.error('Error fetching quiz:', err); // Debug log
                setError(err.message || 'Failed to load quiz questions');
            } finally {
                setLoading(false);
            }
        };

        if (lesson?._id) {
            fetchQuestions();
        }
    }, [lesson]);

    const handleAnswer = (questionId, selectedAnswer) => {
        setAnswers(prev => ({
            ...prev,
            [questionId]: selectedAnswer
        }));
    };

    const handleSubmit = async () => {
        try {
            setSubmitting(true);

            const formattedAnswers = Object.entries(answers).map(([questionId, selectedAnswer]) => ({
                questionId,
                selectedAnswer
            }));

            console.log('Submitting answers:', formattedAnswers); // Debug log

            const response = await api.post(`/quiz/${lesson._id}/submit`, {
                answers: formattedAnswers
            });

            console.log('Submit response:', response.data); // Debug log

            if (response.data.success) {
                setQuizResult(response.data.data);
                
                if (response.data.data.passed) {
                    setTimeout(() => {
                        navigate('/lesson');
                    }, 3000);
                }
            }
        } catch (err) {
            console.error('Submit error:', err); // Debug log
            setError(err.response?.data?.message || 'Failed to submit quiz');
        } finally {
            setSubmitting(false);
        }
    };

    // Debug logs
    useEffect(() => {
        console.log('Current state:', {
            loading,
            error,
            questionsCount: questions.length,
            currentQuestion: questions[currentIndex]
        });
    }, [loading, error, questions, currentIndex]);

    if (!lesson) {
        return (
            <div className={styles.error}>
                <p>No lesson data available</p>
            </div>
        );
    }

    if (loading) {
        return (
            <div className={styles.loading_container}>
                <Loader2 className={styles.loading_icon} />
                <p className={styles.loading_text}>Loading quiz...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles.error_container}>
                <div className={styles.error_content}>
                    <X className={styles.error_icon} />
                    <p>{error}</p>
                    <button 
                        onClick={() => window.location.reload()} 
                        className={styles.retry_button}
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    if (questions.length === 0) {
        return (
            <div className={styles.error_container}>
                <div className={styles.error_content}>
                    <p>No questions available for this lesson.</p>
                </div>
            </div>
        );
    }

    if (quizResult) {
        return (
            <div className={styles.result_container}>
                <div className={styles.result_card}>
                    <div className={`${styles.result_icon} ${quizResult.passed ? styles.success : styles.fail}`}>
                        {quizResult.passed ? <Check size={48} /> : <X size={48} />}
                    </div>
                    <h2>Quiz Results</h2>
                    <div className={styles.score_info}>
                        <p className={styles.score}>Score: {quizResult.score}%</p>
                        <p>Correct Answers: {quizResult.correctAnswers} out of {quizResult.totalQuestions}</p>
                    </div>
                    <p className={styles.message}>
                        {quizResult.passed
                            ? "Congratulations! You've passed this lesson!"
                            : "You need 60% to pass. Try again!"}
                    </p>
                    {quizResult.passed ? (
                        <p className={styles.navigation_message}>
                            Redirecting to lessons page...
                        </p>
                    ) : (
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

    const currentQuestion = questions[currentIndex];
    const progress = ((currentIndex + 1) / questions.length) * 100;

    if (!currentQuestion) {
        return (
            <div className={styles.error_container}>
                <div className={styles.error_content}>
                    <p>Error loading question data.</p>
                    <button 
                        onClick={() => window.location.reload()} 
                        className={styles.retry_button}
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.quiz_section}>
            <div className={styles.progress_bar}>
                <div 
                    className={styles.progress} 
                    style={{ width: `${progress}%` }} 
                />
                <p>Question {currentIndex + 1} of {questions.length}</p>
            </div>

            <div className={styles.question_card}>
                <h3>{currentQuestion.question_text}</h3>
                <div className={styles.options_grid}>
                    {currentQuestion.options.map((option) => (
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
                                    <Loader2 className={styles.spinner} />
                                    Submitting...
                                </>
                            ) : (
                                'Submit Quiz'
                            )}
                        </button>
                    ) : (
                        <button
                            onClick={() => setCurrentIndex(prev => prev + 1)}
                            disabled={!answers[currentQuestion._id]}
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