import { type FC } from "react";
import Popup, { type IPopup } from "./BasePopup";
import { XMarkIcon } from '@heroicons/react/24/solid';

export interface IProps extends Omit<IPopup, 'children'> {
  onLogout: () => void;
}

const LogoutPopup: FC<IProps> = (props) => {
  return (
    <Popup
      state={props.state}
      setState={props.setState}
    >
      <div className='w-[500px] bg-white p-7 rounded-xl'>
        <div className='flex justify-end'>
          <XMarkIcon
            className='w-6 h-6 text-gray-800 hover:text-gray-600 transition duration-300 cursor-pointer'
            onClick={() => props.setState(false)}
          />
        </div>

        <h2 className='text-center text-dark text-2xl font-semibold mb-4'>
          Logout
        </h2>

        <div className='mb-10'>
          <p className="text-gray-500 font-semibold text-center">Are you sure you want to logout?</p>
        </div>

        <div className='flex justify-end items-center gap-2'>
          <button
            className='text-gray-900 bg-white px-3 py-2 rounded-xl border border-gray-200 w-36
                hover:bg-gray-100 active:bg-gray-200 transition duration-300'
            onClick={() => props.setState(false)}
          >
            Cancel
          </button>

          <button
            className='text-white bg-red-500 px-3 py-2 rounded-xl font-medium w-36
                hover:bg-red-400 active:bg-red-600 transition duration-300 
                disabled:bg-gray-400 disabled:text-gray-900 disabled:cursor-default'
            onClick={props.onLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </Popup>
  )
}

export default LogoutPopup;
