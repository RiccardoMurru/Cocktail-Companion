import React from 'react';
import { getCocktailById } from '../apiComs/cocktailDbApi';
import { useState, useEffect } from 'react';
import CocktailComponent from './Cocktail';
import { PageProps } from '../interfaces/Props';
import { User } from '../interfaces/User';
import { Cocktail } from '../interfaces/Cocktail';
import { useAuth } from '../context/authContext';

export default function Favourites({ setPage, page }: PageProps) {
  const [displayedFavourites, setDisplayedFavourites] = useState<Cocktail[]>(
    []
  );
  const { user, setUser } = useAuth();

  async function loadFavourites(user: User): Promise<void> {
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

  useEffect(() => {
    loadFavourites(user!);
  }, [user]);

  function handleLogout() {
    setPage('search');
    setUser({
      username: ''
    });
  }

  return (
    <div className='list-page'>
      <div>
        <p onClick={() => setPage('search')}>Search-page</p>
        <p onClick={() => handleLogout()}>Logout</p>
      </div>
      <div>
        <div className='CocktailList'>
          {displayedFavourites.map((cocktail) => (
            <CocktailComponent
              page={page}
              setPage={setPage}
              cocktail={cocktail}
              key={cocktail.idDrink}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
