import { useEffect, useState } from "react";
import MainLayout from "../components/layouts/MainLayout";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchQuizzes } from "../api/quiz";
import { setAlertAC } from "../store/alertSlice";
import Loader from "../components/UI/Loader";
import QuizzesList from "../components/business/quiz/QuizzesList";
import { setQuizzesAC } from "../store/quizzesSlice";

const QuizzesPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { items: quizzes } = useAppSelector(state => state.quizzes);
  const dispatch = useAppDispatch();

  const getQuizzes = async () => {
    const response = await fetchQuizzes();
    dispatch(setQuizzesAC(response.data));
  };

  const loadData = async () => {
    setIsLoading(true);
    try {
      await getQuizzes();
    } catch (error) {
      dispatch(setAlertAC({ text: 'Something went wrong', mode: 'error' }));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <MainLayout>
      <p className="font-semibold text-2xl mb-10">Quizzes</p>

      {isLoading ? (
        <Loader />
      ) : (
        <QuizzesList items={quizzes} />
      )}
    </MainLayout>
  )
}

export default QuizzesPage;