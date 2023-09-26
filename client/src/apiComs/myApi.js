const rootUrl = 'http://localhost:3001'
import axios from 'axios';

export async function addUser (username, password){
  try {
    const credentialsObj = {
    username: username,
    password: password
  }
  // const res = await fetch(`${rootUrl}/add-user`, {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify(credentialsObj)
  // })
  const res = await axios.post(`${rootUrl}/add-user`, credentialsObj, {
    headers: {
      'Content-Type': 'application/json'
    },
    mode: 'no-cors'
  });
  const user = res.data
  return user
  } catch(err) {
    console.log('Error creating user')
  } 
}
export async function getUser(username, password) {
  try {
    const credentialsObj = {
      username: username,
      password: password
    }
    const res = await axios.post(`${rootUrl}/user-profile`, credentialsObj, {
      headers: {
        'Content-Type': 'application/json'
      },
      mode: 'no-cors'
    });
    // const res = await fetch(`${rootUrl}/user-profile`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   mode: "no-cors",
    //   body:JSON.stringify(credentialsObj)
    // })
    const user = await res.data
    return user
  } catch(err) {
    console.log('Error retrieving profile')
  }
}

export async function addFavourite (username, faveId) {
  try {
    const dataObj = {
      username: username,
      faveId: faveId
    }
    // const res = await fetch(`${rootUrl}/newfave`, {
    //   method: 'PUT',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(dataObj)
    // })
    const res = await axios.put(`${rootUrl}/addfave`, dataObj, {
      headers: {
        'Content-Type': 'application/json'
      },
      mode: 'no-cors'
    });
    const updatedUser = await res.data
    return updatedUser
  } catch (err) {
    console.log('Error saving favourite')
  }
}

export async function removeFavourite (username, faveId) {
  try {
    const dataObj = {
      username: username,
      faveId: faveId
    }
    const res = await axios.put(`${rootUrl}/remove-fave`, dataObj, {
      headers: {
        'Content-Type': 'application/json'
      },
      mode: 'no-cors'
    });
    const updatedUser = res.data
    return updatedUser
  } catch (err) {
    console.log('Error saving favourite')
  }
}