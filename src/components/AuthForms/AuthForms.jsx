import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from 'src/utils/Auth';
import { useAlert } from 'src/utils/Alert';
import icons from './icons.svg';
import './AuthForms.scss';

export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [appErr, setAppErr] = useState(undefined);
  const [pwdVisibility, setPwdVisibility] = useState(false);
  const auth = useAuth();
  const history = useHistory();
  const alert = useAlert();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await auth.signin(username, password);
      history.go('/dashboard');
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setAppErr({ message: 'Invalid username or password!' });
      } else if (err.message === 'Network Error') {
        alert.handleAlert('Network error. Please, check your internet connection.');
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
        <label className="Login-form__label" htmlFor="login">
          <input
            type="text"
            placeholder="Your login here"
            value={username}
            onChange={({ target }) => { setUsername(target.value); }}
            required
          />
        </label>
        <label className="Login-form__label" htmlFor="password">
          <input
            type={pwdVisibility ? 'text' : 'password'}
            name="password"
            placeholder="Your password here"
            value={password}
            onChange={({ target }) => { setPassword(target.value); }}
            required
          />
          <button
            type="button"
            className={pwdVisibility ? 'is-active' : ''}
            onClick={() => setPwdVisibility(!pwdVisibility)}
          >
            <svg>
              <use xlinkHref={`${icons}#${pwdVisibility ? 'eye-slashed' : 'eye'}`} />
            </svg>
          </button>
        </label>
        <button type="submit" className="Login-form__submit">Login</button>
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
  // input values
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  // password visibility
  const [pwdVisibility, setPwdVisibility] = useState(false);
  const [confirmPwdVisibility, setConfirmPwdVisibility] = useState(false);
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
      await auth.signup(name, username, password);
      history.go('/login');
    } catch (err) {
      const [message] = err.response.data.message;
      setAppErr({ message });
    } finally {
      setUsername('');
      setPassword('');
      setConfirmPassword('');
    }
  };

  useEffect(() => () => {});

  return (
    <div className="Login-wrapper">
      { appErr && <p className="Login-error">{appErr.message}</p> }
      <h3 className="Login__title">Create new account</h3>
      <form className="Login-form" onSubmit={handleSubmit}>
        <label htmlFor="name" className="Login-form__label">
          <input
            type="text"
            name="name"
            placeholder="Your name here"
            value={name}
            onChange={({ target }) => { setName(target.value); }}
            required
          />
        </label>
        <label htmlFor="username" className="Login-form__label">
          <input
            type="text"
            name="username"
            placeholder="Your login here"
            value={username}
            onChange={({ target }) => { setUsername(target.value); }}
            required
          />
        </label>
        <label htmlFor="password" className="Login-form__label">
          <input
            type={pwdVisibility ? 'text' : 'password'}
            name="password"
            placeholder="Your password here"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            required
          />
          <button
            type="button"
            className={pwdVisibility ? 'is-active' : ''}
            onClick={() => setPwdVisibility(!pwdVisibility)}
          >
            <svg>
              <use xlinkHref={`${icons}#${pwdVisibility ? 'eye-slashed' : 'eye'}`} />
            </svg>
          </button>
        </label>
        <label htmlFor="passwordConfirm" className="Login-form__label">
          <input
            type={confirmPwdVisibility ? 'text' : 'password'}
            name="passwordConfirm"
            placeholder="Confirm Your password here"
            value={confirmPassword}
            onChange={({ target }) => setConfirmPassword(target.value)}
            required
          />
          <button
            type="button"
            className={confirmPwdVisibility ? 'is-active' : ''}
            onClick={() => setConfirmPwdVisibility(!confirmPwdVisibility)}
          >
            <svg>
              <use xlinkHref={`${icons}#${confirmPwdVisibility ? 'eye-slashed' : 'eye'}`} />
            </svg>
          </button>
        </label>
        <button type="submit" className="Login-form__submit">Create account</button>
      </form>
      <p className="Login-hint">
        Already have an account?
        { ' ' }
        <a href="/login">Login.</a>
      </p>
    </div>

  );
};
