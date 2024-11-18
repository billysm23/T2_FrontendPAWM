import { ArrowRight, Award, Loader2, RefreshCcw, Target } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useProgress } from '../../../hooks/useProgress';

const QuizResult = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { lessonId } = useParams();
    const { refreshProgress } = useProgress();
    const [loading, setLoading] = useState(true);
    
    // Get quiz result from location state
    const quizResult = location.state?.quizResult;
    
    useEffect(() => {
        // If no quiz result in state, redirect back to lesson
        if (!quizResult) {
            navigate(`/lesson/${lessonId}`);
            return;
        }
        
        // Refresh progress to update lesson status
        refreshProgress().then(() => {
            setLoading(false);
        });
    }, [quizResult, lessonId, navigate, refreshProgress]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
            </div>
        );
    }

    const { score, correctAnswers, totalQuestions } = quizResult;
    const isPassed = score >= 60;

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
            <div className="max-w-2xl mx-auto">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
                    {/* Trophy/Badge Icon */}
                    <div className="flex justify-center mb-8">
                        <div className="relative">
                            <div className={`w-40 h-40 rounded-full flex items-center justify-center border-8 ${
                                isPassed ? 'border-green-100 dark:border-green-900' : 'border-yellow-100 dark:border-yellow-900'
                            }`}>
                                <span className={`text-6xl font-bold ${
                                    isPassed ? 'text-green-600 dark:text-green-400' : 'text-yellow-600 dark:text-yellow-400'
                                }`}>
                                    {score}%
                                </span>
                            </div>
                            {isPassed && (
                                <Award 
                                    className="absolute -right-4 -top-4 w-12 h-12 text-yellow-400"
                                />
                            )}
                        </div>
                    </div>

                    {/* Result Message */}
                    <h1 className={`text-3xl font-bold text-center mb-4 ${
                        isPassed ? 'text-green-600 dark:text-green-400' : 'text-yellow-600 dark:text-yellow-400'
                    }`}>
                        {isPassed ? 'Congratulations! 🎉' : 'Keep Going! 💪'}
                    </h1>

                    {/* Score Details */}
                    <div className="flex justify-center items-center gap-2 mb-6">
                        <Target className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                        <span className="text-gray-600 dark:text-gray-300">
                            {correctAnswers} correct out of {totalQuestions} questions
                        </span>
                    </div>

                    {/* Message */}
                    <p className="text-center text-gray-600 dark:text-gray-300 mb-8">
                        {isPassed 
                            ? "Great job! You've successfully completed this lesson. You can now move on to the next lesson."
                            : "Don't give up! Review the material and try again. You need 60% to pass and unlock the next lesson."}
                    </p>

                    {/* Action Buttons */}
                    <div className="flex justify-center gap-4">
                        {isPassed ? (
                            <button
                                onClick={() => navigate('/lesson')}
                                className="flex items-center gap-2 px-8 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                            >
                                Next Lesson
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        ) : (
                            <>
                                <button
                                    onClick={() => navigate(`/lesson/${lessonId}/content`)}
                                    className="flex items-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                                >
                                    Review Lesson
                                    <ArrowRight className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={() => navigate(`/lesson/${lessonId}/quiz`)}
                                    className="flex items-center gap-2 px-8 py-3 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg transition-colors"
                                >
                                    Try Again
                                    <RefreshCcw className="w-5 h-5" />
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuizResult;