import React, { useState } from 'react';
import { PageProps } from '../interfaces/Props';
import { register } from '../apiComs/myApi';
import { User } from '../interfaces/User';
import { Link } from 'react-router-dom';
import logo from '../assets/LOGO.png';

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
      <header className='page-header'>
        <div className='header-wrapper'>
          <img className='logo' src={logo} />
          <div className='button-container'>
            <Link to='/' className='login-button'>
              back
            </Link>
          </div>
        </div>
      </header>
      <form onSubmit={e => handleSubmit(e)}>
        <div className='item-form'>
          <label htmlFor='username'>Username</label>
          <input
            id='username'
            className='form-input'
            name='username'
            required={true}
            type='text'
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </div>
        <div className='item-form'>
          <label htmlFor='password'>Password</label>
          <input
            id='password'
            className='form-input'
            name='password'
            required={true}
            type='password'
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <button type='submit'>Register</button>
        {error && <div className='error-message'>{error}</div>}
      </form>
    </div>
  );
}
