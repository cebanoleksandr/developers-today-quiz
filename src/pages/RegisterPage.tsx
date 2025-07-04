import { useState, type FormEvent } from "react";
import AuthLayout from "../components/layouts/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../api/auth";
import { useAppDispatch } from "../store/hooks";
import { setAlertAC } from "../store/alertSlice";
import { setUserAC } from "../store/userSlice";

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const regEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!regEx.test(email)) {
      dispatch(setAlertAC({ text: 'Invalid email', mode: 'error' }));
    }

    try {
      const response = await register(email, password);
      const data = response.data;

      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('userId', data.user._id);
      dispatch(setUserAC(data.user));
      navigate('/');
    } catch (error: any) {
      if (error.status === 400) {
        dispatch(setAlertAC({ text: 'Such a user already exist', mode: 'error' }));
      } else {
        dispatch(setAlertAC({ text: 'Something went wrong', mode: 'error' }));
      }
    }
  };

  return (
    <AuthLayout>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-400 to-purple-600 p-4">
        <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md">
          <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-8">
            Register
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  autoComplete="email"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                  placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm 
                font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 
                focus:ring-blue-500 transition duration-150 ease-in-out disabled:bg-gray-400 disabled:text-gray-900 disabled:cursor-default"
                disabled={!email.trim() || !password.trim()}
              >
                Create an account
              </button>
            </div>
          </form>

          <p className="mt-8 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
              Login
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  )
}

export default RegisterPage;