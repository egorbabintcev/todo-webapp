import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from 'src/utils/Auth';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [appErr, setAppErr] = useState(undefined);
  const auth = useAuth();
  const history = useHistory();

  const handleSubmit = async (e) => {
    setAppErr(undefined);
    e.preventDefault();

    try {
      auth.signin(username, password)
        .then(() => { history.push('/dashboard'); });
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

  return (
    <>
      <form onSubmit={handleSubmit}>
        <p>
          <input
            type="text"
            placeholder="Your login here"
            value={username}
            onChange={({ target }) => { setUsername(target.value); }}
          />
        </p>
        <p>
          <input
            type="password"
            placeholder="Your password here"
            value={password}
            onChange={({ target }) => { setPassword(target.value); }}
          />
        </p>
        <p>
          <button type="submit">Login</button>
        </p>
      </form>
      { appErr && <span>{appErr.message}</span> }
    </>

  );
};

export default Login;
