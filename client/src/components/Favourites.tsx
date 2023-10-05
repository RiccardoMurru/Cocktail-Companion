import React from 'react';
import { useNavigate } from 'react-router-dom';
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
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  async function loadFavourites(user: User): Promise<void> {
    if (user) {
      const userFavourites = user.favourites;
      const cocktailList = [];
      if (userFavourites) {
        for (let i = 0; i < userFavourites.length; i++) {
          const cocktail: Cocktail | Cocktail[] = await getCocktailById(
            userFavourites[i]
          );
          if (!Array.isArray(cocktail)) {
            cocktailList.push(cocktail);
          }
        }
        setDisplayedFavourites(cocktailList);
      }
    }
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
          <div
            className='logo'
            onClick={() => {
              setPage('search');
              navigate('/');
            }}
          >
            <img src={logo} alt='Logo' />
          </div>
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
      {displayedFavourites.length ? (
        <div className='CocktailList'>
          {displayedFavourites.map(cocktail => (
            <CocktailComponent
              page={page}
              setPage={setPage}
              cocktail={cocktail}
              key={cocktail.idDrink}
            />
          ))}
        </div>
      ) : (
        <p className='favourite-message'>You don't have any favourites yet.</p>
      )}
    </div>
  );
}
