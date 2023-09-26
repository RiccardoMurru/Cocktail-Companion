import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Navbar from './components/Navbar'
import MyIngredients from './components/MyIngredients'
import CocktailList from './components/CocktailList'
import SearchPage from './components/SearchPage'
import { updateFilteredCocktails } from './helpers'
import { getUser } from './apiComs/myApi'
import { getAllIngredients, getAllCategories, getCocktailByIngredient } from './apiComs/cocktailDbApi'
import './App.css'
import Favourites from './components/Favourites'

function App() {
  
  const [displayedFavourites, setDisplayedFavourites] = useState([])
  const [page, setPage] = useState('search')
  const [categories, setCategories] = useState([])
  const [ingredients, setIngredients] = useState([])
  const [selectedIngs, setSelectedIngs] = useState([])
  const [cocktails, setCocktails] = useState([])
  const [user, setUser] = useState({})

  async function handleRemoveFromSelected(ing){
    console.log('starting ings', ingredients)
    const updatedIngredients = ingredients.slice()
    updatedIngredients.push(ing)
    console.log('updated ings', updatedIngredients)
    const cocktailToReduce = await getCocktailByIngredient(ing)
    setIngredients(updatedIngredients)
    setCocktails(updateFilteredCocktails(cocktails,cocktailToReduce,'remove'))
  }

  async function handleAddToSelected(ing) {

    const element = document.getElementById('ingredient-search').reset()
    const updatedIngredients = ingredients.filter(el => el !== ing)
    const newCocktails = await getCocktailByIngredient(ing)
    setCocktails(updateFilteredCocktails(cocktails,newCocktails,'add'))
    setIngredients(updatedIngredients)
    setSelectedIngs([...selectedIngs, ing])
  }
  async function loginAndOut(request, username, password) {
    if(request==='logout') {
      setPage('search')
      setUser({})
    } else {
    const userDetails = await getUser(username, password) 
    const favourites = userDetails.favourites
    setUser(userDetails)
    }
  }

  useEffect(()=>{
    fillIngredientsAndCategories()
  },[])

  useEffect(()=> {
    loginAndOut()
  },[loggedIn])
  

  async function fillIngredientsAndCategories(){
    const fetchedIngs = await getAllIngredients()
    const fetchedCats = await getAllCategories()
    setIngredients(fetchedIngs)
    setCategories(fetchedCats)
  }
  return (<>
  <div>
  <Navbar selectedIngs={selectedIngs} handleAddToSelected={handleAddToSelected}
  ingredients={ingredients} categories={categories}/>

  <MyIngredients selectedIngs={selectedIngs} setSelectedIngs={setSelectedIngs}
  handleRemoveFromSelected={handleRemoveFromSelected} setIngredients={setIngredients}/>

  {cocktails.length? <CocktailList selectedIngs={selectedIngs} cocktails={cocktails}
  setDisplayedFavourites={setDisplayedFavourites}/> : undefined}
  </div>
  
  {selectedIngs.length? <MyIngredients/> : undefined}
  </>
  )
  
  
  // if(!loggedIn) return (
  //   <Login></Login>
  // )
  // if(page === 'search') return (
  //   <SearchPage></SearchPage>
  // )
  if(page === 'favourites') return (
    <Favourites user={user} setUser={setUser} displayedFavourites={displayedFavourites} 
    setDisplayedFavourites={setDisplayedFavourites}/>
  )
}

export default App
