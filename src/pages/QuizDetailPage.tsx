import { useNavigate, useParams } from "react-router-dom";
import MainLayout from "../components/layouts/MainLayout";
import type { CheckboxQuestion, Quiz, UserAnswers } from "../utils/interfaces";
import { useEffect, useState } from "react";
import { getQuizById } from "../api/quiz";
import { useAppDispatch } from "../store/hooks";
import { setAlertAC } from "../store/alertSlice";
import type { QuestionType } from "../utils/types";
import Loader from "../components/UI/Loader";
import { createResult, fetchResult, type CreateResultDTO } from "../api/result";

const QuizDetailPage = () => {
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [userAnswers, setUserAnswers] = useState<UserAnswers>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [isCreating, setIsCreating] = useState(false);

  const { id: quizId } = useParams();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const fetchQuiz = async () => {
    setLoading(true);
    try {
      const response = await getQuizById(quizId!);
      setQuiz(response.data);
    } catch (error) {
      dispatch(setAlertAC({ text: 'Something went wrong while fetching a Quiz', mode: 'error' }));
    } finally {
      setLoading(false);
    }
  }

  const getResult = async () => {
    const response = await fetchResult({ userId: localStorage.getItem('userId')!, quizId: quizId!});

    if (!!response.data) {
      navigate(`/quizzes/${quizId}/result`);
    }
  }

  const loadData = async () => {
    try {
      await getResult();
      await fetchQuiz();
    } catch (error) {
      dispatch(setAlertAC({ text: 'Something went wrong while fetching a Quiz', mode: 'error' }));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, [quizId]);

  const handleAnswerChange = (questionId: string, value: any, type: QuestionType) => {
    setUserAnswers(prevAnswers => {
      if (type === 'CHECKBOX') {
        const currentSelected = (prevAnswers[questionId] || []) as string[];
        const updatedSelected = currentSelected.includes(value)
          ? currentSelected.filter(id => id !== value)
          : [...currentSelected, value];
        return { ...prevAnswers, [questionId]: updatedSelected };
      } else {
        return { ...prevAnswers, [questionId]: value };
      }
    });
  };

  const onCreateResult = async (createResultDTO: CreateResultDTO) => {
    setIsCreating(true);
    try {
      await createResult(createResultDTO);
      navigate(`/quizzes/${quizId}/result`);
    } catch (error) {
      dispatch(setAlertAC({ text: 'Something went wrong with creating result', mode: 'error' }));
    } finally {
      setIsCreating(false);
    }
  }

  const handleSubmitQuiz = async () => {
    if (!quiz) return;

    const createResultDTO: CreateResultDTO = {
      userId: localStorage.getItem('userId')!,
      quizId: quizId!,
      result: userAnswers,
    }

    await onCreateResult(createResultDTO);
  };

  if (loading) {
    return (
      <MainLayout>
        <Loader />
      </MainLayout>
    );
  }

  if (!quiz) {
    return null;
  }

  return (
    <MainLayout>
        <div className="mb-10">
          <h1 className="font-semibold text-2xl mb-10">{quiz.title}</h1>

          <div className="space-y-8">
            {quiz.questions
              .sort((a, b) => a.order - b.order)
              .map((question, index) => (
                <div key={question.id} className="p-6 border border-gray-200 rounded-lg bg-gray-50 shadow-sm">
                  <p className="text-xl font-semibold text-gray-800 mb-4">
                    {index + 1}. {question.text}
                  </p>

                  {question.type === 'BOOLEAN' && (
                    <div className="flex items-center space-x-6">
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name={`q-${question.id}`}
                          value="true"
                          checked={userAnswers[question.id] === true}
                          onChange={() => handleAnswerChange(question.id, true, 'BOOLEAN')}
                          className="h-5 w-5 text-blue-600 border-gray-300 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-lg text-gray-700">True</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name={`q-${question.id}`}
                          value="false"
                          checked={userAnswers[question.id] === false}
                          onChange={() => handleAnswerChange(question.id, false, 'BOOLEAN')}
                          className="h-5 w-5 text-blue-600 border-gray-300 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-lg text-gray-700">False</span>
                      </label>
                    </div>
                  )}

                  {question.type === 'INPUT' && (
                    <div>
                      <input
                        type="text"
                        value={(userAnswers[question.id] as string) || ''}
                        onChange={(e) => handleAnswerChange(question.id, e.target.value, 'INPUT')}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Your answer..."
                      />
                    </div>
                  )}

                  {question.type === 'CHECKBOX' && (
                    <div className="space-y-3">
                      {(question as CheckboxQuestion).options.map(option => (
                        <label key={option.id} className="flex items-center">
                          <input
                            type="checkbox"
                            value={option.id}
                            checked={(userAnswers[question.id] as string[] || []).includes(option.id)}
                            onChange={() => handleAnswerChange(question.id, option.id, 'CHECKBOX')}
                            className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <span className="ml-3 text-lg text-gray-700">{option.text}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              ))}
          </div>

          <div className="mt-10 text-center">
            <button
              onClick={handleSubmitQuiz}
              className="px-8 py-4 bg-indigo-600 text-white font-semibold text-xl rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
            >
              {isCreating ? 'Creating result' : 'Finish Quiz'}
            </button>
          </div>
        </div>
    </MainLayout>
  );
};

export default QuizDetailPage;