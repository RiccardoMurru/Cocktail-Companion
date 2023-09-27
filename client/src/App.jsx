import { useState, useEffect } from 'react'
import SearchPage from './components/SearchPage'
import Login from './components/Login'
import './App.css'
import Favourites from './components/Favourites'

function App() {
  
 
  const [page, setPage] = useState('search')
  const [user, setUser] = useState({})

 
  if(page ==='search') return (
    <SearchPage className='list-page' user={user} setUser={setUser} setPage={setPage}></SearchPage>
  )
  if(page === 'favourites') return (
    <Favourites className='list-page' user={user} setUser={setUser} page={page} setPage={setPage}/>
  )
  if(page === 'login') return (
    <Login className='login-page' setUser={setUser} setPage={setPage}></Login>
  )
}

export default App
