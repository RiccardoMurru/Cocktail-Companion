const rootUrl = 'http://localhost:3001';
import axios, { AxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';
import { User } from '../interfaces/User';

export async function addUser(user: User) {
  const { username, password } = user;
  try {
    const credentialsObj: User = {
      username: username,
      password: password
    };
    const res = await axios.post(`${rootUrl}/register`, credentialsObj, {
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'no-cors'
    } as AxiosRequestConfig);
    const user = res.data;
    return user;
  } catch (err) {
    console.log('Error creating user');
  }
}
// export async function getUser(user: User) {
//   const { username, password } = user;
//   try {
//     const credentialsObj = {
//       username: username,
//       password: password
//     }
//     const res = await axios.post(`${rootUrl}/user-profile`, credentialsObj, {
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       mode: 'no-cors'
//     } as AxiosRequestConfig);
//     const user = await res.data
//     return user
//   } catch(err) {
//     console.log('Error retrieving profile')
//   }
// }

export async function getUser(username: string, password: string) {
  try {
    const credentialsObj = {
      username: username,
      password: password
    };
    const res = await axios.post(`${rootUrl}/login`, credentialsObj, {
      headers: {
        'Content-Type': 'application/json'
      },
      mode: 'no-cors'
    } as AxiosRequestConfig);
    const user = await res.data;
    return user;
  } catch (err) {
    console.log('Error retrieving profile');
  }
}

// export async function addFavourite(username: string, faveId: string) {
//   try {
//     const dataObj = {
//       username,
//       faveId
//     };
//     const res = await axios.put(`${rootUrl}/addfave`, dataObj, {
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       mode: 'no-cors'
//     } as AxiosRequestConfig);
//     const updatedUser = await res.data;
//     return updatedUser;
//   } catch (err) {
//     console.log('Error saving favourite');
//   }
// }

export async function addFavourite(username: string, faveId: string) {
  try {
    const token = Cookies.get('token'); // Retrieve the token from localStorage or wherever it's stored
    const dataObj = {
      username,
      faveId
    };
    const res = await axios.put(`${rootUrl}/addfave`, dataObj, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // Include the token in the Authorization header
      }
    });
    const updatedUser = await res.data;
    return updatedUser;
  } catch (err) {
    console.log('Error saving favourite');
  }
}






// export async function removeFavourite(username: string, faveId: string) {
//   try {
//     const dataObj = {
//       username,
//       faveId
//     };
//     const res = await axios.put(`${rootUrl}/remove-fave`, dataObj, {
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       mode: 'no-cors'
//     } as AxiosRequestConfig);
//     const updatedUser = res.data;
//     return updatedUser;
//   } catch (err) {
//     console.log('Error saving favourite');
//   }
// }



export async function removeFavourite(username: string, faveId: string) {
  try {
    const token = Cookies.get('token'); // Retrieve the token from localStorage or wherever it's stored
    const dataObj = {
      username,
      faveId
    };
    const res = await axios.put(`${rootUrl}/remove-fave`, dataObj, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // Include the token in the Authorization header
      }
    });
    const updatedUser = res.data;
    return updatedUser;
  } catch (err) {
    console.log('Error removing favourite');
    throw err; // Re-throw the error so it can be caught and handled elsewhere in your code
  }
}
