import axios, { AxiosRequestConfig } from 'axios';
import { User } from '../interfaces/User';

const rootUrl = 'http://localhost:3001';

export async function addUser(user: User) {
  const { username, password } = user;
  try {
    const credentialsObj: User = {
      username,
      password
    };
    const res = await axios.post(`${rootUrl}/add-user`, credentialsObj, {
      headers: {
        'Content-Type': 'application/json'
      },
      mode: 'no-cors'
    } as AxiosRequestConfig);
    const user = res.data;
    return user;
  } catch (err) {
    console.log('Error creating user');
  }
}
export async function getUser(user: User) {
  const { username, password } = user;
  try {
    const credentialsObj = {
      username: username,
      password: password
    };
    const res = await axios.post(`${rootUrl}/user-profile`, credentialsObj, {
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

export async function addFavourite(username: string, faveId: number) {
  try {
    const dataObj = {
      username: username,
      faveId: faveId
    };
    const res = await axios.put(`${rootUrl}/addfave`, dataObj, {
      headers: {
        'Content-Type': 'application/json'
      },
      mode: 'no-cors'
    } as AxiosRequestConfig);
    const updatedUser = await res.data;
    return updatedUser;
  } catch (err) {
    console.log('Error saving favourite');
  }
}

export async function removeFavourite(username: string, faveId: number) {
  try {
    const dataObj = {
      username: username,
      faveId: faveId
    };
    const res = await axios.put(`${rootUrl}/remove-fave`, dataObj, {
      headers: {
        'Content-Type': 'application/json'
      },
      mode: 'no-cors'
    } as AxiosRequestConfig);
    const updatedUser = res.data;
    return updatedUser;
  } catch (err) {
    console.log('Error saving favourite');
  }
}
