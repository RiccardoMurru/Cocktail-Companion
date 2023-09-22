const rootUrl = 'http://localhost:3001'

export async function addUser (username, password){
  try {
    const credentialsObj = {
    username: username,
    password: password
  }
  const user = await fetch(`${rootUrl}/add-user`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'inclue',
    mode:'cors',
    body: JSON.stringify(credentialsObj)
  })
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
    const user = await fetch(`${rootUrl}/user-profile`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'inclue',
      mode: 'cors',
      body: JSON.stringify(credentialsObj)
    })
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
    const updatedUser = await fetch(`${rootUrl}/newfave`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      mode: 'cors',
      body: JSON.stringify(dataObj)
    })
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
    const updatedUser = await fetch(`${rootUrl}/remove-fave`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      mode: 'cors',
      body: JSON.stringify(dataObj)
    })
    return updatedUser
  } catch (err) {
    console.log('Error saving favourite')
  }
}