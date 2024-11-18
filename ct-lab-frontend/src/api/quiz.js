import api from './axios';

exports.getQuizByLesson = async (req, res) => {
    try {
        const { lessonId } = req.params;
        console.log('Fetching quiz for lesson:', lessonId);

        const questions = await Question.find({ lesson: Number(lessonId) })
            .select('question_text type options._id options.text question_no')
            .sort('question_no');

        console.log('Found questions:', questions.length);

        if (!questions.length) {
            return res.status(404).json({
                success: false,
                error: 'No questions found for this lesson'
            });
        }

        // Questions untuk user
        const formattedQuestions = questions.map(q => ({
            _id: q._id,
            question_text: q.question_text,
            type: q.type,
            options: q.options.map(opt => ({
                _id: opt._id,
                text: opt.text
            })),
            question_no: q.question_no
        }));

        res.json({
            success: true,
            data: {
                questions: formattedQuestions,
                totalQuestions: questions.length,
            }
        });
    } catch (error) {
        console.error('Error in getQuizByLesson:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

export const submitQuiz = async (quizData) => {
    try {
        const response = await api.post('/quiz/submit', quizData);
        return response.data;
    } catch (error) {
        throw error;
    }
};