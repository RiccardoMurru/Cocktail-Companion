import React from 'react';
import { useNavigate } from 'react-router-dom';
import { removeFavourite } from '../apiComs/myApi';
import { getCocktailById } from '../apiComs/cocktailDbApi';
import { useState, useEffect } from 'react';
import CocktailComponent from './Cocktail';
import { PageProps } from '../interfaces/Props';
import { User } from '../interfaces/User';
import { Cocktail } from '../interfaces/Cocktail';
import { useAuth } from '../context/authContext';
import logo from '../assets/LOGO.png';

export default function Favourites({ setPage, page }: PageProps) {
  const [displayedFavourites, setDisplayedFavourites] = useState<Cocktail[]>(
    []
  );
  const { user, setUser, logout } = useAuth();
  const navigate = useNavigate();

  async function loadFavourites(user: User): Promise<void> {
    const userFavourites = user.favourites;
    const cocktailList = [];
    if (userFavourites) {
      for (let i = 0; i < userFavourites.length; i++) {
        let stringifiedUserFav = userFavourites[i].toString();
        const cocktail: Cocktail | Cocktail[] = await getCocktailById(
          stringifiedUserFav
        );
        //check if it exists
        if (!Array.isArray(cocktail)) {
          cocktailList.push(cocktail);
        }
      }
      setDisplayedFavourites(cocktailList);
    }
  }
  // add type for user and faveId
  async function handleRemoveFromFavourites(faveId: string) {
    for (let i = 0; i < displayedFavourites.length; i++) {
      if (displayedFavourites[i].idDrink === faveId) {
        const newFavourites = displayedFavourites.slice();
        newFavourites.splice(i, 1);
        setDisplayedFavourites(newFavourites);
      }
    }
    const updatedUser = await removeFavourite(faveId);
    setUser(updatedUser);
  }
  useEffect(() => {
    loadFavourites(user!);
  }, [user]);

  function handleLogout() {
    setPage('search');
    logout();
    navigate('/');
  }

  return (
    <div className='list-page'>
      <header className='page-header'>
        <div className='header-wrapper'>
          <img className='logo' src={logo} />
          <div className='button-container'>
            <button
              onClick={() => {
                setPage('search');
                navigate('/');
              }}>
              Back
            </button>
            <button onClick={() => handleLogout()}>Logout</button>
          </div>
        </div>
      </header>
      <h2 className='favourites-title'>Your favourites:</h2>
      <div className='CocktailList'>
        {displayedFavourites.map(cocktail => (
          <CocktailComponent
            page={page}
            setPage={setPage}
            handleRemoveFromFavourites={handleRemoveFromFavourites}
            cocktail={cocktail}
            key={cocktail.idDrink}
          />
        ))}
      </div>
    </div>
  );
}
