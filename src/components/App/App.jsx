import React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
} from 'react-router-dom';
import { ProvideAuth } from 'src/utils/Auth';
import { ProvideAlert } from 'src/utils/Alert';
import ProtectedRoute from 'src/components/ProtectedRoute';
import Dashboard from 'src/components/Dashboard';
import { Login, Signup } from 'src/components/AuthForms';
import Alert from 'src/components/Alert';

const App = () => (
  <ProvideAuth>
    <ProvideAlert>
      <Router>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <ProtectedRoute path="/dashboard">
          <Dashboard />
        </ProtectedRoute>
        <Route path="/" exact>
          <Redirect to="/dashboard" />
        </Route>
      </Router>
      <Alert />
    </ProvideAlert>
  </ProvideAuth>
);

export default App;
