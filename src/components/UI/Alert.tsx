import { useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { removeAlertAC } from "../../store/alertSlice";

const modeStyles = {
  success: "bg-green-500",
  error: "bg-red-500",
  info: "bg-blue-500",
  warning: "bg-yellow-500",
};

const Alert = () => {
  const { text, mode } = useAppSelector(state => state.alert);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (text) {
      const timer = setTimeout(() => {
        dispatch(removeAlertAC());
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [text, dispatch]);

  if (!text) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div
        className={clsx(
          "text-white px-4 py-3 rounded shadow-lg flex items-center gap-2 transition-all duration-300",
          modeStyles[mode]
        )}
      >
        <span className="flex-1">{text}</span>
        <button onClick={() => dispatch(removeAlertAC())}>
          <XMarkIcon className="w-5 h-5 text-white hover:text-gray-200" />
        </button>
      </div>
    </div>
  );
};

export default Alert;
