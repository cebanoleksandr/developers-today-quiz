import { type RouteObject, createHashRouter } from 'react-router-dom';
import App from '../App';
import QuizzesPage from '../pages/QuizzesPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import QuizDetailPage from '../pages/QuizDetailPage';
import NotFoundPage from '../pages/NotFoundPage';
import CreateQuizPage from '../pages/CreateQuizPage';
import QuizResultsPage from '../pages/QuizResultsPage';

export const routes: RouteObject[] = [
  {
    path: '/',
    Component: App,
    children: [
      {
        path: '/',
        Component: QuizzesPage,
      },
      {
        path: '/create',
        Component: CreateQuizPage,
      },
      {
        path: '/login',
        Component: LoginPage,
      },
      {
        path: '/quizzes/:id',
        Component: QuizDetailPage,
      },
      {
        path: '/quizzes/:id/result',
        Component: QuizResultsPage,
      },
      {
        path: '/register',
        Component: RegisterPage,
      },
      {
        path: '*',
        Component: NotFoundPage,
      },
    ]
  },
];

const router = createHashRouter(routes);

export default router;
