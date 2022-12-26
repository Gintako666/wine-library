import React, { useState, ReactNode, useEffect } from 'react';

type UserContextValue = {
  visibleModalLogin: boolean,
  setVisibleModalLogin: React.Dispatch<React.SetStateAction<boolean>>,
  loginOpen: boolean,
  setLoginOpen: React.Dispatch<React.SetStateAction<boolean>>,
};

export const UserContext = React.createContext<UserContextValue>({
  visibleModalLogin: false,
  setVisibleModalLogin: () => {},
  loginOpen: false,
  setLoginOpen: () => {},
});

type Props = {
  children: ReactNode
};

export const UserContextProvider: React.FC<Props> = ({ children }) => {
  const [visibleModalLogin, setVisibleModalLogin] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  useEffect(() => {

  }, []);

  const contextValue:UserContextValue = {
    visibleModalLogin,
    setVisibleModalLogin,

    loginOpen,
    setLoginOpen,
  };

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};
