<<<<<<< HEAD
import React from 'react';
import { useState, useEffect } from 'react';
import CocktailList from './CocktailList';
import Navbar from './Navbar';
import logo from '../assets/LOGO.png';
import MyIngredients from './MyIngredients';
import { updateFilteredCocktails } from '../helpers';
import {
  getAllCategories,
  getAllIngredients,
  getCocktailByIngredient
} from '../apiComs/cocktailDbApi';
import { PageProps } from '../interfaces/Props';
import { Cocktail } from '../interfaces/Cocktail';
export default function SearchPage({
  user,
  setUser,
  page,
  setPage
}: PageProps) {
  const [categories, setCategories] = useState<string[]>([]);
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [selectedIngs, setSelectedIngs] = useState<string[]>([]);
  const [ingList, setIngList] = useState<string[]>([]);
  const [cocktails, setCocktails] = useState<Cocktail[]>([]);

  useEffect(() => {
    fillIngredientsAndCategories();
  }, []);

  async function handleAddToSelected(ingredient: string): Promise<void> {
    try {
      const updatedIngredients = ingredients.filter((el) => el !== ingredient);
      const newCocktails: Cocktail | Cocktail[] = await getCocktailByIngredient(
        ingredient
      );
      if (Array.isArray(newCocktails)) {
        setCocktails(updateFilteredCocktails(cocktails, newCocktails, 'add'));
        setIngredients(updatedIngredients);
        setSelectedIngs([...selectedIngs, ingredient]);
      }
    } catch (err) {
      throw err;
    }
  }

  async function handleRemoveFromSelected(ingredient: string): Promise<void> {
    try {
      const updatedIngredients = ingredients.slice();
      updatedIngredients.push(ingredient);
      const cocktailsToReduce: Cocktail | Cocktail[] =
        await getCocktailByIngredient(ingredient);
      setIngredients(updatedIngredients);
      if (Array.isArray(cocktailsToReduce)) {
        setCocktails(
          updateFilteredCocktails(cocktails, cocktailsToReduce, 'remove')
        );
        const resultingIngredients = selectedIngs.filter(
          (el) => el !== ingredient
        );
        setSelectedIngs([...resultingIngredients]);
      }
    } catch (err) {
      throw err;
    }
  }
  async function fillIngredientsAndCategories(): Promise<void> {
    try {
      const fetchedIngs = await getAllIngredients();
      const fetchedCats = await getAllCategories();
      if (fetchedIngs) {
        setIngredients(fetchedIngs);
      }
      if (fetchedCats) {
        setCategories(fetchedCats);
      }
    } catch (err) {
      throw err;
    }
  }
  if (user.username)
    return (
      <div className='list-page'>
        <div className='img-container'>
          <img className='logo' src={logo} />
        </div>
        <div className='navigation-buttons'>
          <p onClick={() => setPage('favourites')}>Favourites</p>
          <p
            onClick={() =>
              setUser({
                username: '',
                password: ''
              })
            }
          >
            Logout
          </p>
        </div>
        <h2>Welcome back {user.username}! What are we drinking today?</h2>
        <Navbar
          className='NavBar'
          selectedIngs={selectedIngs}
          handleAddToSelected={handleAddToSelected}
          ingredients={ingredients}
          categories={categories}
          setIngList={setIngList}
          ingList={ingList}
        />
        <MyIngredients
          selectedIngs={selectedIngs}
          handleRemoveFromSelected={handleRemoveFromSelected}
        />
        {cocktails.length && (
          <CocktailList
            page={page}
            selectedIngs={selectedIngs}
            cocktails={cocktails}
            user={user}
            setUser={setUser}
            setPage={setPage}
          />
        )}
      </div>
    );
  return (
    <div className='list-page'>
      <div className='img-container'>
        <img className='logo' src={logo} />
      </div>
      <div>
        <p onClick={() => setPage('login')}>Login</p>
      </div>
      <Navbar
        className=''
        selectedIngs={selectedIngs}
        handleAddToSelected={handleAddToSelected}
        ingredients={ingredients}
        categories={categories}
        setIngList={setIngList}
        ingList={ingList}
      />
      <MyIngredients
        selectedIngs={selectedIngs}
        handleRemoveFromSelected={handleRemoveFromSelected}
      />
      {cocktails.length && (
        <CocktailList
          page=''
          setPage={setPage}
          selectedIngs={selectedIngs}
          cocktails={cocktails}
          user={user}
          setUser={setUser}
        />
      )}
    </div>
  );
}
=======
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
>>>>>>> origin/riccardo2
