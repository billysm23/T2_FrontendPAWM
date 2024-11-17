import { useEffect, useState } from 'react';
import api from '../api/axios';

export const useQuizProgress = (lessonId) => {
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [savedProgress, setSavedProgress] = useState(null);

  // Load saved progress when component mounts
  useEffect(() => {
    const loadProgress = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/quiz/${lessonId}/progress`);
        if (response.data.success && response.data.data) {
          const savedAnswers = {};
          response.data.data.answers.forEach(answer => {
            savedAnswers[answer.questionId] = answer.selectedAnswer;
          });
          setAnswers(savedAnswers);
          setSavedProgress(response.data.data);
        }
      } catch (err) {
        setError('Failed to load quiz progress');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (lessonId) {
      loadProgress();
    }
  }, [lessonId]);

  // Save progress automatically when answers change
  const saveProgress = async (newAnswers) => {
    try {
      const formattedAnswers = Object.entries(newAnswers).map(([questionId, selectedAnswer]) => ({
        questionId,
        selectedAnswer
      }));

      await api.post(`/quiz/${lessonId}/progress`, {
        answers: formattedAnswers
      });
    } catch (err) {
      console.error('Failed to save progress:', err);
      // Don't throw error to prevent UI disruption
    }
  };

  // Update answers and save progress
  const updateAnswer = async (questionId, answer) => {
    const newAnswers = {
      ...answers,
      [questionId]: answer
    };
    setAnswers(newAnswers);
    await saveProgress(newAnswers);
  };

  return {
    answers,
    updateAnswer,
    loading,
    error,
    savedProgress
  };
};

export default useQuizProgress;