import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Navbar from './components/Navbar'
import MyIngredients from './components/MyIngredients'
import CocktailList from './components/CocktailList'
import SearchPage from './components/SearchPage'
import Login from './components/Login'
import { updateFilteredCocktails } from './helpers'
import { getUser } from './apiComs/myApi'
import { getAllIngredients, getAllCategories, getCocktailByIngredient } from './apiComs/cocktailDbApi'
import './App.css'
import Favourites from './components/Favourites'

function App() {
  
 
  const [page, setPage] = useState('search')
  const [user, setUser] = useState({})

 
  if(page ==='search') return (
    <SearchPage user={user} setUser={setUser} setPage={setPage}></SearchPage>
  )
  if(page === 'favourites') return (
    <Favourites user={user} setUser={setUser} page={page} setPage={setPage}/>
  )
  if(page === 'login') return (
    <Login setUser={setUser} setPage={setPage}></Login>
  )
}

export default App
