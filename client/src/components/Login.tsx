import React, { useState } from 'react';
import { useAuth } from '../context/authContext';
import { PageProps } from '../interfaces/Props';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/LOGO.png';

export default function Login({ setPage }: PageProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, setUser } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const userData = await login(username, password);

      if (userData) {
        userData.username = username;
        setUser(userData);
        setPage('search');
        navigate('/');
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
        <button type='submit'>Login</button>
      </form>
      {error && <div className='error-message'>{error}</div>}
    </div>
  );
}

