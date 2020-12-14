import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from 'src/utils/Auth';
import './Login.scss';

const Login = () => {
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
        console.error(err);
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
      <form className="Login-form" onSubmit={handleSubmit}>
        <h3 className="Login-form__title">Login to your account</h3>
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
    </div>

  );
};

export default Login;
