import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from 'src/utils/Auth';
import './AuthForms.scss';

export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [appErr, setAppErr] = useState(undefined);
  const auth = useAuth();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await auth.signin(username, password);
      history.push('/dashboard');
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setAppErr({ message: 'Invalid username or password!' });
      } else {
        throw new Error(err);
      }
    } finally {
      setUsername('');
      setPassword('');
    }
  };

  useEffect(() => () => {});

  return (
    <div className="Login-wrapper">
      { appErr && <p className="Login-error">{appErr.message}</p> }
      <h3 className="Login__title">Login to your account</h3>
      <form className="Login-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Your login here"
          value={username}
          onChange={({ target }) => { setUsername(target.value); }}
          required
        />
        <input
          type="password"
          placeholder="Your password here"
          value={password}
          onChange={({ target }) => { setPassword(target.value); }}
          required
        />
        <button type="submit">Login</button>
      </form>
      <p className="Login-hint">
        Not registered?
        { ' ' }
        <a href="/signup">Create an account.</a>
      </p>
    </div>

  );
};

export const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [appErr, setAppErr] = useState(undefined);
  const auth = useAuth();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setAppErr({ message: 'Passwords aren\'t equal!' });
      return;
    }

    try {
      await auth.signup(username, password);
      history.push('/login');
    } catch (err) {
      const [message] = err.response.data.message;
      setAppErr({ message });
    } finally {
      setUsername('');
      setPassword('');
      setConfirmPassword('');
    }
  };

  const handlePasswordChange = ({ target }) => {
    setPassword(target.value);

    if (target.value === confirmPassword) {
      setAppErr(undefined);
    } else {
      setAppErr({ message: 'Passwords aren\'t equal!' });
    }
  };

  const handleConfirmPasswordChange = ({ target }) => {
    setConfirmPassword(target.value);

    if (target.value === password) {
      setAppErr(undefined);
    } else {
      setAppErr({ message: 'Passwords aren\'t equal!' });
    }
  };

  useEffect(() => () => {});

  return (
    <div className="Login-wrapper">
      { appErr && <p className="Login-error">{appErr.message}</p> }
      <h3 className="Login__title">Create new account</h3>
      <form className="Login-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Your login here"
          value={username}
          onChange={({ target }) => { setUsername(target.value); }}
          required
        />
        <input
          type="password"
          placeholder="Your password here"
          value={password}
          onChange={handlePasswordChange}
          required
        />
        <input
          type="password"
          placeholder="Confirm Your password here"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          required
        />
        <button type="submit">Create account</button>
      </form>
      <p className="Login-hint">
        Already have an account?
        { ' ' }
        <a href="/login">Login.</a>
      </p>
    </div>

  );
};
