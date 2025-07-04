import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { BooleanQuestion, CheckboxQuestion, InputQuestion, Quiz } from '../utils/interfaces';
import { useAppDispatch } from '../store/hooks';
import { getQuizById } from '../api/quiz';
import { setAlertAC } from '../store/alertSlice';
import { deleteResult, fetchResult } from '../api/result';
import MainLayout from '../components/layouts/MainLayout';
import Loader from '../components/UI/Loader';


interface UserAnswers {
  [questionId: string]: boolean | string | string[];
}

const QuizResultsPage = () => {
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [userAnswers, setUserAnswers] = useState<UserAnswers | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [score, setScore] = useState<number>(0);
  const [totalQuestions, setTotalQuestions] = useState<number>(0);
  const [resultId, setResultId] = useState<string>();

  const { id: quizId } = useParams();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const fetchQuiz = async () => {
    setLoading(true);
    try {
      const response = await getQuizById(quizId!);
      setQuiz(response.data);
      setTotalQuestions(response.data.questions.length);
    } catch (error) {
      dispatch(setAlertAC({ text: 'Something went wrong while fetching a Quiz', mode: 'error' }));
    } finally {
      setLoading(false);
    }
  }

  const getResult = async () => {
    const response = await fetchResult({ userId: localStorage.getItem('userId')!, quizId: quizId! });
    setUserAnswers(response.data.result);
    setResultId(response.data._id);
  }

  const loadData = async () => {
    try {
      await fetchQuiz();
      await getResult();
    } catch (error) {
      dispatch(setAlertAC({ text: 'Something went wrong while fetching a Quiz', mode: 'error' }));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, [quizId]);

  useEffect(() => {
    if (quiz && userAnswers) {
      let correctCount = 0;
      quiz.questions.forEach(question => {
        const userAnswer = userAnswers[question.id];
        let isCorrect = false;

        switch (question.type) {
          case 'BOOLEAN':
            isCorrect = (question as BooleanQuestion).correctAnswer === userAnswer;
            break;
          case 'INPUT':
            isCorrect = (question as InputQuestion).correctAnswer.trim().toLowerCase() === (userAnswer as string || '').trim().toLowerCase();
            break;
          case 'CHECKBOX':
            const correctIds = new Set((question as CheckboxQuestion).correctAnswerIds);
            const userSelectedIds = new Set(userAnswer as string[] || []);

            isCorrect = correctIds.size === userSelectedIds.size &&
              [...correctIds].every(id => userSelectedIds.has(id));
            break;
          default:
            break;
        }

        if (isCorrect) {
          correctCount++;
        }
      });

      setScore(correctCount);
    }
  }, [quiz, userAnswers]);

  const onTakeQuizAgain = async () => {
    try {
      await deleteResult(resultId!);
      navigate(`/quizzes/${quizId}`)
    } catch (error) {
      dispatch(setAlertAC({ text: 'Something went wrong', mode: 'error' }));
    }
  }

  if (loading) {
    return (
      <MainLayout>
        <Loader />
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="bg-white p-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center">Quiz results: {quiz?.title}</h1>
          <p className="text-2xl font-semibold text-center mb-8">
            Your result: <span className="text-blue-600">{score}</span> from <span className="text-gray-700">{totalQuestions}</span>
          </p>

          <div className="space-y-8">
            {quiz?.questions
              .sort((a, b) => a.order - b.order)
              .map((question, index) => {
                const userAnswer = userAnswers ? userAnswers[question.id] : null;
                let isCorrect = false;
                let correctAnswerDisplay: string | string[] = '';
                let userAnswerDisplay: string | string[] = '';

                switch (question.type) {
                  case 'BOOLEAN':
                    const booleanQ = question as BooleanQuestion;
                    isCorrect = booleanQ.correctAnswer === userAnswer;
                    correctAnswerDisplay = booleanQ.correctAnswer ? 'True' : 'False';
                    userAnswerDisplay = (userAnswer as boolean) ? 'True' : 'False';
                    break;
                  case 'INPUT':
                    const inputQ = question as InputQuestion;
                    isCorrect = inputQ.correctAnswer.trim().toLowerCase() === (userAnswer as string || '').trim().toLowerCase();
                    correctAnswerDisplay = inputQ.correctAnswer;
                    userAnswerDisplay = userAnswer as string || 'No answer';
                    break;
                  case 'CHECKBOX':
                    const checkboxQ = question as CheckboxQuestion;
                    const correctIds = new Set(checkboxQ.correctAnswerIds);
                    const userSelectedIds = new Set(userAnswer as string[] || []);

                    isCorrect = correctIds.size === userSelectedIds.size &&
                      [...correctIds].every(id => userSelectedIds.has(id));

                    correctAnswerDisplay = checkboxQ.correctAnswerIds
                      .map(id => checkboxQ.options.find(opt => opt.id === id)?.text || 'N/A')
                      .join(', ');
                    userAnswerDisplay = (userAnswer as string[] || [])
                      .map(id => checkboxQ.options.find(opt => opt.id === id)?.text || 'N/A')
                      .join(', ') || 'No chosen';
                    break;
                  default:
                    break;
                }

                return (
                  <div
                    key={question.id}
                    className={`p-6 border rounded-lg shadow-sm ${isCorrect ? 'border-green-400 bg-green-50' : 'border-red-400 bg-red-50'}`}
                  >
                    <p className="text-xl font-semibold text-gray-800 mb-3">
                      {index + 1}. {question.text}
                    </p>
                    <p className="text-md text-gray-700 mb-1">
                      Your answer: <span className={`${isCorrect ? 'text-green-700' : 'text-red-700'} font-medium`}>{userAnswerDisplay}</span>
                    </p>
                    {!isCorrect && (
                      <p className="text-md text-gray-700">
                        Correct answer: <span className="text-green-700 font-medium">{correctAnswerDisplay}</span>
                      </p>
                    )}
                  </div>
                );
              })}
          </div>

          <div className="mt-10 justify-end flex gap-3">
            <button
              onClick={() => navigate('/quizzes')}
              className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
            >
              Come back to Quizzes list
            </button>

            <button
              onClick={onTakeQuizAgain}
              className="px-4 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
            >
              Take the Quiz again
            </button>
          </div>
        </div>
    </MainLayout>
  );
};

export default QuizResultsPage;
