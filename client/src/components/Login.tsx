'use strict';

import React from 'react';
import { getUser } from '../apiComs/myApi';
import { PageProps } from '../interfaces/Props';
import logo from '../assets/LOGO.png';
import { Link } from 'react-router-dom';

export default function Login({ setUser, setPage }: PageProps) {

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Cast event.target to HTMLFormElement
    const form = event.target as HTMLFormElement;

    // Access input values using their name attributes
    const username = form.username.value;
    const password = form.password.value;

    const response = await getUser(username, password);

    if (response.error) {
      window.alert('Username or password incorrect');
    } else {
      setUser(response);
      setPage('search');
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
          />
        </div>
        <button type='submit'>Login</button>
      </form>
    </div>
  );
}
