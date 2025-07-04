import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

export interface IPopup {
  state: boolean;
  setState(state: boolean): void;
  children: React.ReactNode;
}

const Popup = (props: IPopup) => {
  const [isMount, setIsMount] = useState(true);

  useEffect(() => setIsMount(false));

  return ReactDOM.createPortal(
    (<div
      onClick={() => props.setState(false)}
      className={
        [
          (isMount || !props.state) && 'hidden',
          'fixed z-10 w-full h-full top-0 bg-zinc-900/40 flex flex-col justify-center items-center',
          props.state ? 'animate-appear' : 'animate-disappear'
        ].join(' ')
      }
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className={
        [
          props.state ? 'animate-popup-open' : 'animate-popup-close'
        ].join(' ')
        }>
        {props.children}
      </div>
    </div>),
    document.body,
  );
}

export default Popup;
