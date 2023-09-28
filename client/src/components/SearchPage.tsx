import React from 'react'
import {useState, useEffect} from 'react'
import CocktailList from './CocktailList'
import Navbar from './Navbar'
import logo from '../assets/LOGO.png'
import MyIngredients from './MyIngredients'
import { updateFilteredCocktails } from '../helpers'
import { getAllCategories, getAllIngredients, getCocktailByIngredient } from '../apiComs/cocktailDbApi'
import { User } from '../interfaces/User'
import { PageProps } from '../interfaces/Props'
import { Ingredient } from '../interfaces/Ingredient'


export default function SearchPage({user, setUser, page, setPage}: PageProps) {

  const [categories, setCategories] = useState([])
  const [ingredients, setIngredients] = useState([])
  const [selectedIngs, setSelectedIngs] = useState([])
  const [cocktails, setCocktails] = useState([])

  useEffect(()=>{
    fillIngredientsAndCategories()
  },[])

  async function handleAddToSelected(ingredient: Ingredient) {
    const element = document.getElementById('ingredient-search').reset()
    const updatedIngredients = ingredients.filter(el => el !== ingredient)
    const newCocktails = await getCocktailByIngredient(ingredient)
    setCocktails(updateFilteredCocktails(cocktails,newCocktails,'add'))
    setIngredients(updatedIngredients)
    setSelectedIngs([...selectedIngs, ing])
  }

  async function handleRemoveFromSelected(ing){
    const updatedIngredients = ingredients.slice()
    updatedIngredients.push(ing)
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
    <div className='list-page'>
      <div className='img-container'>
      <img className='logo' src={logo}/>
      </div>
      <div className='navigation-buttons'>
        <p onClick={()=> setPage('favourites')}>Favourites</p>
        <p onClick={()=> setUser('')}>Logout</p>
      </div>
      <h2>Welcome back {user.username}! What are we drinking today?</h2>
      <Navbar className='NavBar' selectedIngs={selectedIngs} handleAddToSelected={handleAddToSelected}
      ingredients={ingredients} categories={categories}/>

      <MyIngredients selectedIngs={selectedIngs} setSelectedIngs={setSelectedIngs}
      handleRemoveFromSelected={handleRemoveFromSelected} setIngredients={setIngredients}/>

      {cocktails.length && <CocktailList  page={page} selectedIngs={selectedIngs} cocktails={cocktails}
      user={user} setUser={setUser}/>}
    </div>
  )
  return (
    <div className='list-page'>
      <div className='img-container'>
      <img className='logo' src={logo}/>
      </div>
      <div>
        <p onClick={()=> setPage('login')}>Login</p>
      </div>
      <Navbar selectedIngs={selectedIngs} handleAddToSelected={handleAddToSelected}
      ingredients={ingredients} categories={categories}/>

      <MyIngredients className='MyIngredients' selectedIngs={selectedIngs} setSelectedIngs={setSelectedIngs}
      handleRemoveFromSelected={handleRemoveFromSelected} setIngredients={setIngredients}/>

      {cocktails.length && <CocktailList selectedIngs={selectedIngs} cocktails={cocktails}
      user={user} setUser={setUser}/>}
    </div>
    )
}
