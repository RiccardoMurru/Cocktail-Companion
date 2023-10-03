import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import CocktailList from './CocktailList';
import Navbar from './Navbar';
import logo from '../assets/LOGO.png';
import MyIngredients from './MyIngredients';
import { updateFilteredCocktails } from '../helpers';
import {
  getAllCategories,
  getAllIngredients,
  getCocktailByIngredient,
} from '../apiComs/cocktailDbApi';
import { PageProps } from '../interfaces/Props';
import { Cocktail } from '../interfaces/Cocktail';

const buttonStyle = {
  display: 'inline-block',
  padding: '10px 20px',
  backgroundColor: '#F9D077', // Button background color
  color: '#000000', // Button text color
  borderRadius: '5px', // Optional: Adds rounded corners to the button
  textDecoration: 'none', // Removes default underline style for the link
};
export default function SearchPage({
  user,
  setUser,
  page,
  setPage,
}: PageProps) {
  const [categories, setCategories] = useState<string[]>([]);
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [ingList, setIngList] = useState<string[]>([]);
  const [cocktails, setCocktails] = useState<Cocktail[]>([]);
  const [selectedIngs, setSelectedIngs] = useState<string[]>([]);

  useEffect(() => {
    fillIngredientsAndCategories();
  }, []);

  async function handleAddToSelected(ingredient: string): Promise<void> {
    try {
      const updatedIngredients = ingredients.filter(el => el !== ingredient);
      const newCocktails: Cocktail | Cocktail[] = await getCocktailByIngredient(
        ingredient
      );
      if (Array.isArray(newCocktails)) {
        if (!selectedIngs.includes(ingredient)) {
          setCocktails(updateFilteredCocktails(cocktails, newCocktails, 'add'));
          setIngredients(updatedIngredients);
          setSelectedIngs([...selectedIngs, ingredient.toLowerCase()]);
        }
      }
    } catch (err) {
      throw err;
    }
  }

  async function handleRemoveFromSelected(ingredient: string): Promise<void> {
    try {
      setIngredients([...ingredients, ingredient]);

      const cocktailsToReduce: Cocktail | Cocktail[] =
        await getCocktailByIngredient(ingredient);

      if (Array.isArray(cocktailsToReduce)) {
        setCocktails(
          updateFilteredCocktails(cocktails, cocktailsToReduce, 'remove')
        );
        const resultingIngredients = selectedIngs.filter(
          el => el !== ingredient
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
        setIngredients(fetchedIngs.map(el => el.toLowerCase()));
      }
      if (fetchedCats) {
        setCategories(fetchedCats);
      }
    } catch (err) {
      throw err;
    }
  }
  function handleLoginClick() {
    return <Navigate to='/login' />;
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
                username: ''
              })
            }>
            Logout
          </p>
        </div>
        <h2>Welcome back {user.username}! What are we drinking today?</h2>
        <Navbar
          className='NavBar'
          setIngList={setIngList}
          ingList={ingList}
          ingredients={ingredients}
          handleAddToSelected={handleAddToSelected}
          selectedIngs={selectedIngs}
          categories={categories}
        />
        {cocktails.length ? (
          <CocktailList
            page=''
            setPage={setPage}
            selectedIngs={selectedIngs}
            cocktails={cocktails}
            user={user}
            setUser={setUser}
          />
        ) : (
          <p>No ingredients selected.</p>
        )}
      </div>
    );
  return (
    <div className='list-page'>
      <header className='page-header'>
        <div className='header-wrapper'>
          <img className='logo' src={logo} />
          {/* <button onClick={() => setPage('login')}>Login</button>
          <button onClick={() => setPage('register')}>Register</button> */}
          <div className='button-container'>
            <Link to='/login' className='login-button'>
              Login
            </Link>
            <Link
              to='/register'
              className='register-button'>
              Register
            </Link>
          </div>
        </div>
      </header>
      <Navbar
        className='NavBar'
        setIngList={setIngList}
        ingList={ingList}
        ingredients={ingredients}
        handleAddToSelected={handleAddToSelected}
        selectedIngs={selectedIngs}
        categories={categories}
      />
      <MyIngredients
        selectedIngs={selectedIngs}
        handleRemoveFromSelected={handleRemoveFromSelected}
      />
      {cocktails.length ? (
        <CocktailList
          page=''
          setPage={setPage}
          selectedIngs={selectedIngs}
          cocktails={cocktails}
          user={user}
          setUser={setUser}
        />
      ) : (
        <p>No selected ingredient</p>
      )}
    </div>
  );
}
