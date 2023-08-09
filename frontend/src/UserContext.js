import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

// customHook for use context
export const useUser = () => {
  return useContext(UserContext);
}

// context component
export const UserProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState();

  const loginUser = () => setIsAuthenticated(true);
  const logoutUser = () => setIsAuthenticated(false);

  return (
    <UserContext.Provider value={{ isAuthenticated, loginUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
}
