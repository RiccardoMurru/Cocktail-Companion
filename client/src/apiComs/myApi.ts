import axios from 'axios';
import { AxiosRequestConfig } from 'axios';
import { useAuth } from '../context/authContext';

const rootUrl = 'http://localhost:3001';

export async function register(username: string, password: string) {
  const { user } = useAuth();

  try {
    if (user) {
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

export async function getUser(username: string, password: string) {
  const { user } = useAuth();

  try {
    if (!user) {
      throw new Error('User not authenticated');
    }

    const credentialsObj = {
      username: username,
      password: password,
    };

    const res = await axios.post(`${rootUrl}/user-profile`, credentialsObj, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    } as AxiosRequestConfig);

    const userData = res.data;
    return userData;
  } catch (err) {
    console.log('Error retrieving profile');
  }
}

export async function addFavourite(faveId: string) {
  const { user } = useAuth();

  try {
    if (!user) {
      throw new Error('User not authenticated');
    }

    const dataObj = {
      username: user.username,
      faveId,
    };

    const res = await axios.put(`${rootUrl}/addfave`, dataObj, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    } as AxiosRequestConfig);

    const updatedUser = res.data;
    return updatedUser;
  } catch (err) {
    console.log('Error saving favourite');
  }
}

export async function removeFavourite(faveId: string) {
  const { user } = useAuth();

  try {
    if (!user) {
      throw new Error('User not authenticated');
    }

    const dataObj = {
      token: user.token,
      faveId,
    };

    const res = await axios.put(`${rootUrl}/remove-fave`, dataObj, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    } as AxiosRequestConfig);

    const updatedUser = res.data;
    return updatedUser;
  } catch (err) {
    console.log('Error saving favourite');
  }
}
