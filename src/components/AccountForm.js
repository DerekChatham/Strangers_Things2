import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { callApi } from '../api';

const AccountForm = ({ action, setToken, setUserData }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const isLogin = action === 'login';
  const title = isLogin ? 'Login' : 'Register';
  const oppositeTitle = isLogin ? 'Register' : 'Login';
  const oppositeAction = isLogin ? 'register' : 'login';
  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = await callApi({
      url: `/users/${action}`,
      body: { user: { username, password } },
      method: 'POST',
    });
    const token = data?.data?.token;

    if (token) {
      localStorage.setItem('token', token);
      setUsername('');
      setPassword('');
      setToken(token);
      history.push('/');
    }
  };
  return (
    <>
      <h2>{title}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="username"
          required
          onChange={(event) => setUsername(event.target.value)}
        ></input>
        <input
          type="password"
          placeholder="password"
          onChange={(event) => setPassword(event.target.value)}
        ></input>
        <button type="submit">{title}</button>
      </form>
      <Link to={`/${oppositeAction}`}>{oppositeTitle}</Link>
    </>
  );
};

export default AccountForm;