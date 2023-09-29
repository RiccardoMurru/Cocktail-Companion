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
import { Ingredient } from '../interfaces/Ingredient';
import { Category } from '../interfaces/Category';
import { Cocktail } from '../interfaces/Cocktail';
export default function SearchPage({
  user,
  setUser,
  page,
  setPage
}: PageProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [selectedIngs, setSelectedIngs] = useState<Ingredient[]>([]);
  const [cocktails, setCocktails] = useState<Cocktail[]>([]);
  useEffect(() => {
    fillIngredientsAndCategories();
  }, []);
  async function handleAddToSelected(ingredient: Ingredient): Promise<void> {
    try {
      const updatedIngredients = ingredients.filter((el) => el !== ingredient);
      const newCocktails = await getCocktailByIngredient(ingredient);
      setCocktails(updateFilteredCocktails(cocktails, newCocktails, 'add'));
      setIngredients(updatedIngredients);
      setSelectedIngs([...selectedIngs, ingredient]);
    } catch (err) {
      throw err;
    }
  }
  async function handleRemoveFromSelected(
    ingredient: Ingredient
  ): Promise<void> {
    try {
      const updatedIngredients = ingredients.slice();
      updatedIngredients.push(ingredient);
      const cocktailToReduce = await getCocktailByIngredient(ingredient);
      setIngredients(updatedIngredients);
      setCocktails(
        updateFilteredCocktails(cocktails, cocktailToReduce, 'remove')
      );
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
        />
        <MyIngredients
          className=''
          selectedIngs={selectedIngs}
          setSelectedIngs={setSelectedIngs}
          handleRemoveFromSelected={handleRemoveFromSelected}
          setIngredients={setIngredients}
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
      />
      <MyIngredients
        className='MyIngredients'
        selectedIngs={selectedIngs}
        setSelectedIngs={setSelectedIngs}
        handleRemoveFromSelected={handleRemoveFromSelected}
        setIngredients={setIngredients}
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
