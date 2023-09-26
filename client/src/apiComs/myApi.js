const rootUrl = 'http://localhost:3001'

export async function addUser (username, password){
  try {
    const credentialsObj = {
    username: username,
    password: password
  }
  const res = await fetch(`${rootUrl}/add-user`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentialsObj)
  })
  const user = res.json()
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
    const res = await fetch(`${rootUrl}/user-profile`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentialsObj)
    })
    const user = await res.json()
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
    const res = await fetch(`${rootUrl}/newfave`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataObj)
    })
    const updatedUser = await res.json()
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
    const res = await fetch(`${rootUrl}/remove-fave`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataObj)
    })
    const updatedUser = res.json()
    return updatedUser
  } catch (err) {
    console.log('Error saving favourite')
  }
}