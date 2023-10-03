// 'use strict';

// import React, { useState } from 'react';
// import { addUser } from '../apiComs/myApi';
// import { PageProps } from '../interfaces/Props';
// import axios from 'axios'

// export default function Register ({
//   setUser,
//   setPage
// }: PageProps) {

//   console.log('hello register is here')
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');

  
//   async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
//     event.preventDefault();

//     // Check if username already exists
    

//     if (!isUsernameAvailable) {
//       setError('Username is already taken');
//       return;
//     }

//     // Register the user if the username is available
//     const response = await addUser({ username, password });

//     if (response.error) {
//       setError('Error registering user');
//     } else {
//       setUser(response);
//       setPage('search');
//     }
//   }

  
  
//   return (
//     <div className='register-page'>
//       <form onSubmit={(e) => handleSubmit(e)}>
//         <input
//           className='form-input'
//           type='text'
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           placeholder='Enter username here'
//           required={true}
//         />
//         <input
//           className='form-input'
//           type='password'
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           placeholder='Enter password here'
//           required={true}
//         />
//         <button type='submit'>Register</button>
//         {error && <div className='error-message'>{error}</div>}
//       </form>
//     </div>
//   )
// }


import React, { useState } from 'react';
import { addUser } from '../apiComs/myApi';
import { PageProps } from '../interfaces/Props';

export default function Register({
  setUser,
  setPage
}: PageProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Check if username already exists (You need to implement isUsernameAvailable function)

    // For now, let's assume isUsernameAvailable function always returns true
    const isUsernameAvailable = true;

    if (!isUsernameAvailable) {
      setError('Username is already taken');
      return;
    }

    try {
      // Register the user if the username is available
      const response = await addUser({ username, password });

      setUser(response);
      setPage('search');
    } catch (err) {
      setError('Error registering user');
      console.error(err); // Log the actual error for debugging
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
