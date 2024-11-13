import { useEffect, useState } from 'react';
import { getQuizByLesson, submitQuiz } from '../api/quiz';

export const useQuiz = (lessonId) => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [feedback, setFeedback] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    fetchQuiz();
  }, [lessonId]);

  const fetchQuiz = async () => {
    try {
      setLoading(true);
      const data = await getQuizByLesson(lessonId);
      setQuestions(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = (questionId, answer) => {
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

  const submitAnswers = async () => {
    try {
      setLoading(true);
      const result = await submitQuiz({
        lesson_id: lessonId,
        answers: Object.entries(answers).map(([questionId, answer]) => ({
          question_id: questionId,
          user_answer: answer
        }))
      });
      
      setFeedback(result.feedback);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    questions,
    answers,
    feedback,
    loading,
    error,
    progress,
    handleAnswer,
    submitAnswers
  };
};