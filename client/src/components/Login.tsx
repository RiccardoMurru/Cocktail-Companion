// 'use strict';

// import React from 'react';
// import { getUser } from '../apiComs/myApi';
// import { PageProps } from '../interfaces/Props';
// import logo from '../assets/LOGO.png';

// export default function Login({ setUser, setPage }: PageProps) {

//   async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
//     event.preventDefault();

//     // Cast event.target to HTMLFormElement
//     const form = event.target as HTMLFormElement;

//     // Access input values using their name attributes
//     const username = form.username.value;
//     const password = form.password.value;

//     const response = await getUser(username, password);

//     if (response.error) {
//       window.alert('Username or password incorrect');
//     } else {
//       setUser(response);
//       setPage('search');
//     }
//   }

//   return (
//     <div className='login-page'>
//       <header className='page-header'>
//         <div className='header-wrapper'>
//           <img className='logo' src={logo} />
//           <button onClick={() => setPage('search')}>Back</button>
//         </div>
//       </header>
//       <form onSubmit={e => handleSubmit(e)}>
//         <div className='item-form'>
//           <label htmlFor='username'>Username</label>
//           <input
//             id='username'
//             className='form-input'
//             name='username'
//             required={true}
//             type='text'
//           />
//         </div>
//         <div className='item-form'>
//           <label htmlFor='password'>Password</label>
//           <input
//             id='password'
//             className='form-input'
//             name='password'
//             required={true}
//             type='password'
//           />
//         </div>
//         <button type='submit'>Login</button>
//       </form>
//     </div>
//   );
// }


'use strict';

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { getUser } from '../apiComs/myApi';
import { PageProps } from '../interfaces/Props';
import logo from '../assets/LOGO.png';

export default function Login({ setUser, setPage }: PageProps) {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const navigate = useNavigate(); 

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const username = form.username.value;
    const password = form.password.value;

    try {
      const response = await getUser(username, password);
      response.username = username;
      if (response.error) {
        window.alert('Username or password incorrect');
      } else {
        // Store the token in localStorage
        Cookies.set('token', response.token);
        Cookies.set('username', response.username)
        Cookies.set('password', response.password)
        // console.log('the token',response.token)
        // console.log('username ',response.username)
        // console.log('password ',response.password)
        // Set user data in state
        setUser(response);
        // Redirect or set the appropriate page after successful login
        // setPage('search');
        navigate('/user-search');
        console.log('logged in')
      }
    } catch (error) {
      console.error('Login failed:', error);
      window.alert('An error occurred during login. Please try again later.');
    }
  }

  return (
    <div className='login-page'>
      <header className='page-header'>
        <div className='header-wrapper'>
          <img className='logo' src={logo} alt='Logo' />
          <button onClick={() => setPage('search')}>Back</button>
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

