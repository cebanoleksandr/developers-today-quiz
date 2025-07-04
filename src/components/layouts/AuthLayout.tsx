import { useEffect, useMemo, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store/hooks";
import { getUserById } from "../../api/user";
import { setAlertAC } from "../../store/alertSlice";
import { setUserAC } from "../../store/userSlice";

type Props = {
  children: ReactNode;
}

const AuthLayout: React.FC<Props> = ({ children }) => {
  const token = useMemo(() => localStorage.getItem('accessToken'), [localStorage.getItem('accessToken')]);
  const userId = useMemo(() => localStorage.getItem('userId'), [localStorage.getItem('userId')]);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const getMe = async () => {
    if (!userId) return;
    try {
      const response = await getUserById(userId);
      localStorage.setItem('userId', response.data._id);
      dispatch(setUserAC(response.data.user));
    } catch (error) {
      dispatch(setAlertAC({ text: 'Cannot fetch user', mode: 'error' }));
    }
  }

  useEffect(() => {
    if (!!token) {
      console.log('I AM HERE');
      console.log('userId: ', userId);
      getMe();
      navigate('/');
    }
  }, []);

  if (!!token) {
    return null;
  }

  return (
    <div className='h-screen bg-white'>{children}</div>
  )
}

export default AuthLayout;
