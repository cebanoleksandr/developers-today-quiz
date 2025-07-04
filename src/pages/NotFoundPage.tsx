import { Link } from "react-router-dom";
import MainLayout from "../components/layouts/MainLayout";

const NotFoundPage = () => {
  return (
    <MainLayout>
      <div className="bg-white rounded-lg p-8 flex flex-col items-center justify-center h-[80vh]">
        <h1 className="text-5xl font-bold text-gray-800 mb-2">404 - Not Found</h1>
        <p className="text-gray-600 mb-4">
          Sorry, we couldn't find the page you were looking for.
        </p>
        <Link to="/" className="text-blue-500 hover:underline">
          Back to Orders
        </Link>
      </div>
    </MainLayout>
  )
}

export default NotFoundPage;