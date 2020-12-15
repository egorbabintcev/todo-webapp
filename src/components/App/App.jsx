import React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
} from 'react-router-dom';
import { ProvideAuth } from 'src/utils/Auth';
import ProtectedRoute from 'src/components/ProtectedRoute';
import Dashboard from 'src/components/Dashboard';
import { Login, Signup } from 'src/components/AuthForms';

const App = () => (
  <ProvideAuth>
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
  </ProvideAuth>
);

export default App;
