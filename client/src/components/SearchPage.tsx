import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
import Cookies from 'js-cookie';
import { useAuth } from '../context/authContext';

export default function SearchPage({ page, setPage }: PageProps) {
  const [categories, setCategories] = useState<string[]>([]);
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [ingList, setIngList] = useState<string[]>([]);
  const [cocktails, setCocktails] = useState<Cocktail[]>([]);
  const [selectedIngs, setSelectedIngs] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fillIngredientsAndCategories();
  }, []);

  const { user, logout } = useAuth();

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

  return (
    <div className='list-page'>
      <header className='page-header'>
        <div className='header-wrapper'>
          <img className='logo' src={logo} />
          <div className='button-container'>
            {Cookies.get('token') ? (
              <>
                <button
                  onClick={() => {
                    setPage('favourites');
                    navigate('/favourites');
                  }}>
                  Favourites
                </button>
                <button onClick={logout}>Logout</button>
              </>
            ) : (
              <>
                <Link to='/login' className='login-button'>
                  Login
                </Link>
                <Link to='/register' className='register-button'>
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </header>
      {user && (
        <h2 className='welcome'>
          <span>Welcome back {user.username}!</span>
          <span>What are we drinking today?</span>{' '}
        </h2>
      )}
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
        />
      ) : (
        <p>No ingredients selected.</p>
      )}
    </div>
  );
}
