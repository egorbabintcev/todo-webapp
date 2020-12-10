import React, { useContext, useState } from 'react';
import axios from 'axios';

const AuthContext = React.createContext();

export const useAuth = () => useContext(AuthContext);

const useProvideAuth = () => {
  const [user, setUser] = useState(undefined);

  const signin = async (username, password) => {
    setUser(undefined);
    /* eslint-disable */
    const response = await axios.post('http://website.local/api/auth/login', {
      username,
      password,
    });
    setUser(response.data);
    return response.data;
  };

  const signout = async () => {
    setUser(undefined);
    return null;
  };

  return { user, signin, signout };
};

export const ProvideAuth = ({ children }) => {
  const auth = useProvideAuth();
  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
};
