import { useState } from "react";
import MainLayout from "../components/layouts/MainLayout";
import type { Question, QuestionType } from "../utils/types";
import { v4 as uuidv4 } from 'uuid';
import { createQuiz, type CreateQuizDTO } from "../api/quiz";
import QuestionEditor from "../components/business/quiz/QuestionEditor";
import { useAppDispatch } from "../store/hooks";
import { setAlertAC } from "../store/alertSlice";
import { useNavigate } from "react-router-dom";

const CreateQuizPage = () => {
  const [quizTitle, setQuizTitle] = useState<string>('');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [newQuestionType, setNewQuestionType] = useState<QuestionType | ''>('');

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleAddQuestion = () => {
    if (!newQuestionType) return;

    let newQuestion: Question;
    const commonProps = {
      id: uuidv4(),
      text: '',
      order: questions.length + 1,
    };

    switch (newQuestionType) {
      case 'BOOLEAN':
        newQuestion = { ...commonProps, type: 'BOOLEAN', correctAnswer: true };
        break;
      case 'INPUT':
        newQuestion = { ...commonProps, type: 'INPUT', correctAnswer: '' };
        break;
      case 'CHECKBOX':
        newQuestion = { ...commonProps, type: 'CHECKBOX', options: [], correctAnswerIds: [] };
        break;
      default:
        return;
    }
    setQuestions([...questions, newQuestion]);
    setNewQuestionType('');
  };

  const handleUpdateQuestion = (updatedQuestion: Question) => {
    setQuestions(
      questions.map((q) => (q.id === updatedQuestion.id ? updatedQuestion : q))
    );
  };

  const handleRemoveQuestion = (id: string) => {
    setQuestions(questions.filter((q) => q.id !== id));
  };

  const onReset = () => {
    setQuizTitle('');
    setQuestions([]);
  }

  const onCreate = async (createQuizDTO: CreateQuizDTO) => {
    try {
      await createQuiz(createQuizDTO);
      onReset();
      dispatch(setAlertAC({ text: 'The Quiz is created successfully!', mode: 'success' }));
      navigate('/');
    } catch (error) {
      dispatch(setAlertAC({ text: 'Something went wrong while creating a Quiz', mode: 'error' }));
    }
  }

  const handleSaveQuiz = () => {
    if (!quizTitle.trim()) {
      dispatch(setAlertAC({ text: 'Title should\'t be empty', mode: 'error' }));
      return;
    }

    if (!questions.length) {
      dispatch(setAlertAC({ text: 'Must be at least one question', mode: 'error' }));
      return;
    }

    const quizData: CreateQuizDTO = {
      title: quizTitle,
      questions: questions.map((q, index) => ({ ...q, order: index + 1 })),
    };
    console.log('Saving Quiz:', quizData);
    onCreate(quizData);
  };

  return (
    <MainLayout>
      <div className="mb-10">
        <h1 className="font-semibold text-2xl mb-10">Create Quiz</h1>

        <div className="mb-6">
          <label htmlFor="quiz-title" className="block text-lg font-medium text-gray-700 mb-2">
            Quiz title:
          </label>
          <input
            type="text"
            id="quiz-title"
            value={quizTitle}
            onChange={(e) => setQuizTitle(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Quiz title"
          />
        </div>

        <div className="mb-8 p-5 border border-dashed border-gray-300 rounded-lg bg-gray-50">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Add new question</h2>
          <div className="flex items-center space-x-4">
            <select
              value={newQuestionType}
              onChange={(e) => setNewQuestionType(e.target.value as QuestionType)}
              className="block w-48 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white"
            >
              <option value="">Pick the type</option>
              <option value="BOOLEAN">Boolean (True/False)</option>
              <option value="INPUT">Input (Text answer)</option>
              <option value="CHECKBOX">Multiple choice</option>
            </select>
            <button
              onClick={handleAddQuestion}
              disabled={!newQuestionType}
              className={`px-5 py-2 rounded-md transition-colors ${newQuestionType
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
            >
              Add question
            </button>
          </div>
        </div>

        {questions.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Quiz questions</h2>
            <div>
              {questions.map((question) => (
                <QuestionEditor
                  key={question.id}
                  question={question}
                  onUpdate={handleUpdateQuestion}
                  onRemove={handleRemoveQuestion}
                />
              ))}
            </div>
          </div>
        )}

        <div className="text-center">
          <button
            onClick={handleSaveQuiz}
            className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors text-lg"
          >
            Save Quiz
          </button>
        </div>
      </div>
    </MainLayout>
  )
}

export default CreateQuizPage;
