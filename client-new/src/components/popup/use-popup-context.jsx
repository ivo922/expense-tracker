import React, { useContext, useState } from 'react';

const PopupContext = React.createContext();

export const PopupProvider = ({ children }) => {
  const [popup, setPopup] = useState('');

  return (
    <PopupContext.Provider value={{ popup, open: setPopup }}>
      { children }

      { popup }
    </PopupContext.Provider>
  );
};

export const usePopupContext = () => useContext(PopupContext);
