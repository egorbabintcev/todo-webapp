import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from 'src/utils/Auth';

const ProtectedRoute = ({ children, ...props }) => {
  const auth = useAuth();

  return (
    <Route
      {...props} // eslint-disable-line react/jsx-props-no-spreading
      render={({ location }) => (
        auth.user?.access_token
          ? children : (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: location },
              }}
            />
          )
      )}
    />
  );
};

export default ProtectedRoute;
