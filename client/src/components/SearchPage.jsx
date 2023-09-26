import React from 'react'
import {useState, useEffect} from 'react'
import CocktailList from './CocktailList'
import Navbar from './Navbar'
import MyIngredients from './MyIngredients'
import { updateFilteredCocktails } from '../helpers'
import { getAllCategories, getAllIngredients, getCocktailByIngredient } from '../apiComs/cocktailDbApi'

export default function SearchPage({user, setUser, page, setPage}) {
  
  const [categories, setCategories] = useState([])
  const [ingredients, setIngredients] = useState([])
  const [selectedIngs, setSelectedIngs] = useState([])
  const [cocktails, setCocktails] = useState([])

  useEffect(()=>{
    fillIngredientsAndCategories()
  },[])


  async function handleAddToSelected(ing) {

    const element = document.getElementById('ingredient-search').reset()
    const updatedIngredients = ingredients.filter(el => el !== ing)
    const newCocktails = await getCocktailByIngredient(ing)
    setCocktails(updateFilteredCocktails(cocktails,newCocktails,'add'))
    setIngredients(updatedIngredients)
    setSelectedIngs([...selectedIngs, ing])
  }

  async function handleRemoveFromSelected(ing){
    console.log('starting ings', ingredients)
    const updatedIngredients = ingredients.slice()
    updatedIngredients.push(ing)
    console.log('updated ings', updatedIngredients)
    const cocktailToReduce = await getCocktailByIngredient(ing)
    setIngredients(updatedIngredients)
    setCocktails(updateFilteredCocktails(cocktails,cocktailToReduce,'remove'))
  }
  
  async function fillIngredientsAndCategories(){
    const fetchedIngs = await getAllIngredients()
    const fetchedCats = await getAllCategories()
    setIngredients(fetchedIngs)
    setCategories(fetchedCats)
  }

  if(user.username) return (
    <div>
      <div>
        <p onClick={()=> setPage('favourites')}>Favourites</p>
        <p onClick={()=> setUser('')}>Logout</p>
      </div>
      <h2>Welcome back {user.username}! What are we drinking today?</h2>
      <Navbar selectedIngs={selectedIngs} handleAddToSelected={handleAddToSelected}
      ingredients={ingredients} categories={categories}/>
    
      <MyIngredients selectedIngs={selectedIngs} setSelectedIngs={setSelectedIngs}
      handleRemoveFromSelected={handleRemoveFromSelected} setIngredients={setIngredients}/>
    
      {cocktails.length && <CocktailList page={page} selectedIngs={selectedIngs} cocktails={cocktails}
      user={user} setUser={setUser}/>}
    </div>
  )
  return (
    <div>
      <div>
        <p onClick={()=> setPage('login')}>Login</p>
      </div>
      <Navbar selectedIngs={selectedIngs} handleAddToSelected={handleAddToSelected}
      ingredients={ingredients} categories={categories}/>
    
      <MyIngredients selectedIngs={selectedIngs} setSelectedIngs={setSelectedIngs}
      handleRemoveFromSelected={handleRemoveFromSelected} setIngredients={setIngredients}/>
    
      {cocktails.length && <CocktailList selectedIngs={selectedIngs} cocktails={cocktails}
      user={user} setUser={setUser}/>}
    </div>
    )
}
