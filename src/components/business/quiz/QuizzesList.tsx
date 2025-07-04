import type { FC } from "react";
import type { Quiz } from "../../../utils/interfaces";
import { Link } from "react-router-dom";
import QuizItem from "./QuizItem";

interface IProps {
  items: Quiz[];
}

const QuizzesList: FC<IProps> = ({ items }) => {
  if (!items.length) {
    return (
      <div>
        <p className="font-bold text-3xl text-gray-500 text-center">There is no quizzes yet</p>
        <p className="text-gray-800 text-lg text-center">
          You can <Link to='/create' className="text-blue-600 underline">create</Link> the first one
        </p>
      </div>
    )
  }

  return (
    <div className="w-full">
      {items.map(item => (
        <QuizItem
          key={item._id}
          item={item}
        />
      ))}
    </div>
  )
}

export default QuizzesList;
