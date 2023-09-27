import React from 'react'
import { getUser } from '../apiComs/myApi'

export default function Login({setUser, setPage}) {
  
  async function handleSubmit(event){
    
    event.preventDefault()

    const username = event.target[0].value;
    const password = event.target[1].value;

    const response = await getUser(username, password)
   
    if(response.error) {
      window.alert('Username or password incorrect')
    } else {
      setUser(response)
      setPage('search')
    }
  }

  return (
    <div className='login-page'>
      <form  onSubmit={(e)=>handleSubmit(e)}>
        <input className='form-input' name='username' placeholder='Enter username here' required={true}></input>
        <input className='form-input' name='password' placeholder='Enter password here' required={true}></input>
        <button  type='submit'>Login</button>
      </form>
      
    </div>
  )
}
