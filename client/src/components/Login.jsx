import React from 'react'
import { getUser } from '../apiComs/myApi'

export default function Login({setUser, setPage}) {
  
  async function handleSubmit(event){
    
    event.preventDefault()

    const username = event.target[0].value;
    const password = event.target[1].value;

    const response = await getUser(username, password)
   
    if(response.error) {
      alert('Username or password incorrect')
    } else {
      setUser(response)
      setPage('search')
    }
    console.log('SOMETHING')
  }
  // async function loginAndOut(request, username, password) {
  //   if(request ==='logout') {
  //     setPage('search')
  //     setUser({})
  //   } 
  //   if(request ==='login') {
  //     const userDetails = await getUser(username, password) 
  //     setUser(userDetails)
  //   }
  // }

  return (
    <div>
      <form  onSubmit={(e)=>handleSubmit(e)}>
        <input name='username' placeholder='Enter username here' required={true}></input>
        <input name='password' placeholder='Enter password here' required={true}></input>
        <button type='submit'>Login</button>
      </form>
      
    </div>
  )
}
