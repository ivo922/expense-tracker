import React, { useContext, useState } from 'react';

const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [account, setAccount] = useState(0);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        account,
        setAccount,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
