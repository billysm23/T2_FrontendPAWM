import { ArrowRight, Award, RefreshCcw, Target } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

const QuizCompletion = ({ score, totalQuestions, correctAnswers, onRetry }) => {
    const isPassed = score >= 60;
    
    return (
        <div className="flex flex-col items-center justify-center min-h-[400px] p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            {/* Score Display */}
            <div className="relative mb-8">
                <div className="w-32 h-32 rounded-full border-8 border-blue-100 dark:border-gray-700 flex items-center justify-center">
                    <span className="text-4xl font-bold text-blue-600 dark:text-blue-400">
                        {score}%
                    </span>
                </div>
                {isPassed && (
                    <Award 
                        className="absolute -right-2 -top-2 w-10 h-10 text-yellow-400"
                    />
                )}
            </div>

            {/* Result Message */}
            <h2 className="text-2xl font-bold mb-4 text-center">
                {isPassed ? (
                    <span className="text-green-600 dark:text-green-400">
                        Congratulations! 🎉
                    </span>
                ) : (
                    <span className="text-yellow-600 dark:text-yellow-400">
                        Keep Going! 💪
                    </span>
                )}
            </h2>

            {/* Score Details */}
            <div className="flex items-center gap-2 mb-6 text-gray-600 dark:text-gray-300">
                <Target className="w-5 h-5" />
                <span>
                    {correctAnswers} correct out of {totalQuestions} questions
                </span>
            </div>

            {/* Result Message */}
            <p className="text-center text-gray-600 dark:text-gray-300 mb-8 max-w-md">
                {isPassed ? (
                    "You've successfully completed this lesson! You can now move on to the next lesson."
                ) : (
                    "Don't give up! Review the material and try again. You need 60% to pass."
                )}
            </p>

            {/* Action Buttons */}
            <div className="flex gap-4">
                {isPassed ? (
                    <Link 
                        to="/lesson" 
                        className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Next Lesson
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                ) : (
                    <button
                        onClick={onRetry}
                        className="flex items-center gap-2 px-6 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
                    >
                        Try Again
                        <RefreshCcw className="w-5 h-5" />
                    </button>
                )}
            </div>
        </div>
    );
};

export default QuizCompletion;