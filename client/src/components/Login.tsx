import React, { useState } from 'react';
import { useAuth } from '../context/authContext';
import { PageProps } from '../interfaces/Props';

export default function Login({ setPage }: PageProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, setUser } = useAuth();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const userData = await login(username, password);

      if (userData) {
        userData.username = username;
        setUser(userData);
        setPage('search');
        setPassword('');
      } else {
        setError('Username or password incorrect');
      }
    } catch (err) {
      setError('An error occurred during login');
      console.error(err);
    }
  }

  return (
    <div className='login-page'>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          className='form-input'
          name='username'
          placeholder='Enter username here'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required={true}
        />
        <input
          className='form-input'
          name='password'
          placeholder='Enter password here'
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required={true}
        />
        <button type='submit'>Login</button>
      </form>
      {error && <div className='error-message'>{error}</div>}
    </div>
  );
}
