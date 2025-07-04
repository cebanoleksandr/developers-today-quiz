import { useState, type FC } from "react";
import type { Quiz } from "../../../utils/interfaces";
import { Link } from "react-router-dom";
import { formatDate } from "../../../utils/data-configs";
import { deleteQuiz, fetchQuizzes } from "../../../api/quiz";
import { useAppDispatch } from "../../../store/hooks";
import { setQuizzesAC } from "../../../store/quizzesSlice";
import { setAlertAC } from "../../../store/alertSlice";
import DeleteQuizPopup from "../../popups/DeleteQuizPopup";

interface IProps {
  item: Quiz;
}

const QuizItem: FC<IProps> = ({ item }) => {
  const [isDeleteQuizPopupOpen, setIsDeleteQuizPopupOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const questionsCount = item.questions ? item.questions.length : 0;

  const dispatch = useAppDispatch();

  const getQuizzes = async () => {
    try {
      const response = await fetchQuizzes();
      dispatch(setQuizzesAC(response.data));
      setIsDeleteQuizPopupOpen(false);
    } catch (error) {
      dispatch(setAlertAC({ text: 'Cannot fetch Quizzes', mode: 'error' }));
    }
  };

  const onDelete = async (id: string) => {
    setIsDeleting(true);
    try {
      await deleteQuiz(id);
      getQuizzes();
    } catch (error) {
      dispatch(setAlertAC({ text: 'Cannot delete the Quiz', mode: 'error' }));
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4 border border-gray-200 hover:shadow-lg transition-shadow duration-200 flex justify-between items-start">
      <div>
        <Link to={`/quizzes/${item._id}`} className="block">
          <h2 className="text-xl font-bold text-gray-800 mb-2 hover:text-blue-700 transition-colors duration-200">
            {item.title}
          </h2>
        </Link>
        <p className="text-gray-600 text-sm mb-3">
          Created on: <span className="font-medium">{formatDate(item.createdAt)}</span>
        </p>
        <p className="text-gray-700 text-base">
          Questions: <span className="font-semibold">{questionsCount}</span>
        </p>
      </div>

      <div className="flex items-center gap-2">
        <Link
          to={`/quizzes/${item._id}`}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Start Quiz
        </Link>

        <button
          className='bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-400 active:bg-red-600 transition duration-300'
          onClick={() => setIsDeleteQuizPopupOpen(true)}
        >
          Delete
        </button>
      </div>

      <DeleteQuizPopup
        state={isDeleteQuizPopupOpen}
        setState={setIsDeleteQuizPopupOpen}
        onDelete={onDelete}
        quiz={item}
        isDeleting={isDeleting}
      />
    </div>
  )
}

export default QuizItem;
