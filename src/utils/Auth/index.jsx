import React, { useContext, useState } from 'react';
import axios from 'axios';
import * as cookies from 'js-cookie';

const AuthContext = React.createContext();

export const useAuth = () => useContext(AuthContext);

const useProvideAuth = () => {
  const [user, setUser] = useState(cookies.getJSON('user'));
  const apiUri = process.env.REACT_APP_API_URI;

  const signin = async (username, password) => {
    setUser(undefined);
    const response = await axios.post(`${apiUri}/api/auth/login`, {
      username,
      password,
    });
    cookies.set('user', response.data);
    cookies.set('access_token', response.data.access_token);
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
    cookies.remove('access_token');
    cookies.remove('user');
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
