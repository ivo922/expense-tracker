import React, { useContext, useState } from 'react';

const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});

  return (
    <UserContext.Provider value={{ user, updateUser: setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
