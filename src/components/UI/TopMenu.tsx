import { useEffect, useState } from 'react';
import { ClockIcon } from "@heroicons/react/24/solid";

type DateOptionsType = {
  day: "numeric" | "2-digit" | undefined,
  month: "numeric" | "2-digit" | "short" | "long" | "narrow" | undefined,
  year: "numeric" | "2-digit" | undefined
};

export const TopMenu = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    }
  }, []);

  const dateOptions: DateOptionsType = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  };

  return (
    <div className="flex items-center">
      <span>
        { currentDate.toLocaleDateString('en-US', dateOptions) }
      </span>

      <ClockIcon className='size-5 text-green-500 mr-1 ml-2' />

      <span>
        { currentDate.toLocaleTimeString() }
      </span>
    </div>
  );
}
