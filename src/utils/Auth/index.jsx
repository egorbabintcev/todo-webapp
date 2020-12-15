import React, { useContext, useState } from 'react';
import axios from 'axios';

const AuthContext = React.createContext();

export const useAuth = () => useContext(AuthContext);

const useProvideAuth = () => {
  const [user, setUser] = useState(undefined);
  const apiUri = process.env.REACT_APP_API_URI;

  const signin = async (username, password) => {
    setUser(undefined);
    const response = await axios.post(`${apiUri}/api/auth/login`, {
      username,
      password,
    });
    setUser(response.data);
    return response.data;
  };

  const signup = async (username, password) => {
    await axios.post(`${apiUri}/api/auth/signup`, {
      username,
      password,
    });
  };

  const signout = async () => {
    setUser(undefined);
    return null;
  };

  return {
    user,
    signin,
    signout,
    signup,
  };
};

export const ProvideAuth = ({ children }) => {
  const auth = useProvideAuth();
  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
};
