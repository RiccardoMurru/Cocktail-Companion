import React, { useState } from 'react';
import { PageProps } from '../interfaces/Props';
import { register } from '../apiComs/myApi';
import { User } from '../interfaces/User';

export default function Register({ setUser, setPage }: PageProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const userData: User = await register(username, password);
      userData.username = username;

      setUser(userData);
      setPage('search');
    } catch (err) {
      setError('Error registering user');
      console.error(err);
    }
  }

  return (
    <div className='register-page'>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          className='form-input'
          type='text'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder='Enter username here'
          required={true}
        />
        <input
          className='form-input'
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Enter password here'
          required={true}
        />
        <button type='submit'>Register</button>
        {error && <div className='error-message'>{error}</div>}
      </form>
    </div>
  );
}
