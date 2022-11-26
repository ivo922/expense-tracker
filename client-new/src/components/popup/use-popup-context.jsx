import React, { useContext, useState } from 'react';
import Popup from './popup';

const PopupContext = React.createContext();

export const PopupProvider = ({ children }) => {
  const [popup, setPopup] = useState('');

  return (
    <PopupContext.Provider
      value={{
        popup,
        open: (content) => {
          setPopup(<Popup>{content}</Popup>);
        },
        close: () => {
          setPopup('');
        },
      }}
    >
      {children}
      {popup}
    </PopupContext.Provider>
  );
};

export const usePopupContext = () => useContext(PopupContext);