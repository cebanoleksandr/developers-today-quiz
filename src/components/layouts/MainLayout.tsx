import { useEffect, useMemo, type ReactNode } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store/hooks";
import { getUserById } from "../../api/user";
import { setUserAC } from "../../store/userSlice";
import { setAlertAC } from "../../store/alertSlice";

type Props = {
  children: ReactNode;
}

const MainLayout: React.FC<Props> = ({ children }) => {
  const token = useMemo(() => localStorage.getItem('accessToken'), [localStorage.getItem('accessToken')]);
  const userId = useMemo(() => localStorage.getItem('userId'), [localStorage.getItem('userId')]);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const getMe = async () => {
    if (!userId) return;
    try {
      const response = await getUserById(userId);
      localStorage.setItem('userId', response.data._id);
      dispatch(setUserAC(response.data));
    } catch (error) {
      dispatch(setAlertAC({ text: 'Cannot fetch user', mode: 'error' }));
    }
  }

  useEffect(() => {
    if (!token) {
      navigate('/login');
    } else {
      getMe();
    }
  }, []);

  if (!token) {
    return null;
  }

  return (
    <div className='flex min-h-screen w-full bg-bg-base'>
      <div className='w-52 flex-shrink-0'>
        <Sidebar />
      </div>

      <div className='flex-1 min-w-0'>
        <Header />

        <main>
          <div className='pr-10 pl-14 pt-24'>
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}

export default MainLayout;
