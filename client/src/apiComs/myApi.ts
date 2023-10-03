import axios from 'axios';
import { AxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';

import { useAuth } from '../context/authContext';

const rootUrl = 'http://localhost:3001';

export async function register(username: string, password: string) {
  const token = Cookies.get('token');
  try {
    if (token) {
      throw new Error('User is already authenticated');
    }

    const credentialsObj = {
      username: username,
      password: password,
    };

    const res = await axios.post(`${rootUrl}/register`, credentialsObj, {
      headers: {
        'Content-Type': 'application/json',
      },
    } as AxiosRequestConfig);

    const userData = res.data;
    return userData;
  } catch (err) {
    console.log('Error registering user');
  }
}

export async function getUser() {
  try {
    const token = Cookies.get('token');
    if (!token) {
      throw new Error('User not authenticated');
    }

    const res = await axios.get(`${rootUrl}/user-profile`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    } as AxiosRequestConfig);

    const userData = res.data;
    return userData;
  } catch (err) {
    console.log('Error retrieving user profile:', err);
    throw err;
  }
}

export async function addFavourite(faveId: string) {
  try {
    const token = Cookies.get('token');
    console.log('faveId on add Favourite before the if', faveId);
    console.log('token on add Favourite before the if', token);
    if (!token) {
      throw new Error('User not authenticated');
    }
    console.log('faveId on add Favourite', faveId);
    console.log('token on add Favourite', token);
    const dataObj = {
      faveId
    };
    console.log(dataObj);

    const res = await axios.put(`${rootUrl}/add-fave`, dataObj, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    } as AxiosRequestConfig);
    console.log('res: ', res);

    const updatedUser = res.data;
    console.log(res.data);
    return updatedUser;
  } catch (err) {
    console.log('Error saving favourite');
  }
}

export async function removeFavourite(faveId: string) {
  try {
    const token = Cookies.get('token');
    if (!token) {
      throw new Error('User not authenticated');
    }

    const dataObj = {
      faveId
    };

    const res = await axios.put(`${rootUrl}/remove-fave`, dataObj, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    } as AxiosRequestConfig);

    const updatedUser = res.data;
    return updatedUser;
  } catch (err) {
    console.log('Error saving favourite');
  }
}
