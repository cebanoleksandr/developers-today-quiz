import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TopMenu } from '../UI/TopMenu';
import LogoutPopup from '../popups/LogoutPopup';

const Header = () => {
  const [isLogoutPopupOpen, setIsLogoutPopupOpen] = useState(false);

  const navigate = useNavigate();

  const onLogout = () => {
    localStorage.setItem('accessToken', '');
    localStorage.setItem('userId', '');
    navigate('/login');
  }

  return (
    <header className='fixed left-52 right-0 top-0 z-[1] py-4 pr-12 pl-8 flex items-center justify-end bg-white'>
      <div className='flex items-center gap-8'>
        <TopMenu />

        <button
          className='bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-400 active:bg-red-600 transition duration-300'
          onClick={() => setIsLogoutPopupOpen(true)}
        >
          Logout
        </button>
      </div>

      <LogoutPopup
        state={isLogoutPopupOpen}
        setState={setIsLogoutPopupOpen}
        onLogout={onLogout}
      />
    </header>
  )
}

export default Header;
