import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getQuizByLesson, submitQuiz } from '../api/quiz';
import MultipleChoice from '../components/quiz/MultipleChoice';
import TrueFalse from '../components/quiz/TrueFalse';
import styles from '../styles/Quiz.module.css';

const Quiz = () => {
    const { lessonId } = useParams();
    const [questions, setQuestions] = useState([]);
    const [progress, setProgress] = useState(0);
    const [answers, setAnswers] = useState({});

    useEffect(() => {
        const fetchQuiz = async () => {
        try {
            const data = await getQuizByLesson(lessonId);
            setQuestions(data);
        } catch (error) {
            console.error('Error fetching quiz:', error);
        }
        };
        fetchQuiz();
    }, [lessonId]);

    const handleAnswerChange = (questionId, answer) => {
        setAnswers(prev => ({
        ...prev,
        [questionId]: answer
        }));
        updateProgress();
    };

    const updateProgress = () => {
        const answeredCount = Object.keys(answers).length;
        const progressPercentage = (answeredCount / questions.length) * 100;
        setProgress(progressPercentage);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        const response = await submitQuiz({
            lessonId,
            answers: Object.entries(answers).map(([questionId, answer]) => ({
            question_id: questionId,
            user_answer: answer
            }))
        });
        
        if (response.success) {
            // Handle success
        }
        } catch (error) {
        // Handle error
        }
    };

    return (
        <div className={styles.testContainer}>
        <div className={styles.testHeader}>
            <h1>Computational Thinking Assessment</h1>
            <div className={styles.progressBar}>
            <div 
                className={styles.progress} 
                style={{ width: `${progress}%` }}
            />
            </div>
        </div>

        <form onSubmit={handleSubmit}>
            {questions.map((question) => {
            switch (question.type) {
                case 'multiple_choice':
                return (
                    <MultipleChoice
                    key={question._id}
                    question={question}
                    onChange={(answer) => handleAnswerChange(question._id, answer)}
                    />
                );
                case 'true_false':
                return (
                    <TrueFalse
                    key={question._id}
                    question={question}
                    onChange={(answer) => handleAnswerChange(question._id, answer)}
                    />
                );
                // Jenis pertanyaan lain BELUM
                default:
                return null;
            }
            })}
            <button 
            type="submit" 
            className={styles.submitBtn}
            >
            Submit Test
            </button>
        </form>
        </div>
    );
};

export default Quiz;