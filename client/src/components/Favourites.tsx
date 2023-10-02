<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 296b1cf5aea2273478d4dea770101d65b4b08849
import React from 'react';
import { removeFavourite } from '../apiComs/myApi';
import { getCocktailById } from '../apiComs/cocktailDbApi';
import { useState, useEffect } from 'react';
import CocktailComponent from './Cocktail';
import { PageProps } from '../interfaces/Props';
import { User } from '../interfaces/User';
import { Cocktail } from '../interfaces/Cocktail';

export default function Favourites({
  user,
  setUser,
  setPage,
  page
}: PageProps) {
  const [displayedFavourites, setDisplayedFavourites] = useState<Cocktail[]>(
    []
  );
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
  async function handleRemoveFromFavourites(user: User, faveId: string) {
<<<<<<< HEAD
=======
import React from "react";
import { removeFavourite } from "../apiComs/myApi";
import { getCocktailById } from "../apiComs/cocktailDbApi";
import { useState, useEffect } from "react";
import Cocktail from "./Cocktail";
import { PageProps } from "../interfaces/Props";

export default function Favourites({ user, setUser, setPage, page }: PageProps) {
  const [displayedFavourites, setDisplayedFavourites] = useState([]);
  console.log("USER IN FAVOURITES", user);
  async function loadFavourites(user) {
    const userFavourites = user.favourites;
    const cocktailList = [];
    console.log("USER FAVOURITES", userFavourites);
    for (let i = 0; i < userFavourites.length; i++) {
      const cocktail = await getCocktailById(userFavourites[i]);
      cocktailList.push(cocktail);
    }
    setDisplayedFavourites(cocktailList);
  }
  async function handleRemoveFromFavourites(user, faveId) {
>>>>>>> origin/riccardo2
=======
>>>>>>> 296b1cf5aea2273478d4dea770101d65b4b08849
    for (let i = 0; i < displayedFavourites.length; i++) {
      if (displayedFavourites[i].idDrink === faveId) {
        const newFavourites = displayedFavourites.slice();
        newFavourites.splice(i, 1);
        setDisplayedFavourites(newFavourites);
      }
    }
    const updatedUser = await removeFavourite(user.username, faveId);
    setUser(updatedUser);
  }
  useEffect(() => {
    loadFavourites(user);
  }, [user]);

  function handleLogout() {
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 296b1cf5aea2273478d4dea770101d65b4b08849
    setPage('search');
    setUser({
      username: '',
      password: ''
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
<<<<<<< HEAD
=======
    setPage("search");
    setUser("");
  }

  return (
    <div className="list-page">
      <div>
        <p onClick={() => setPage("search")}>Search-page</p>
        <p onClick={() => handleLogout()}>Logout</p>
      </div>
      <div>
        <div className="CocktailList">
          {displayedFavourites.map((cocktail) => (
            <Cocktail
>>>>>>> origin/riccardo2
=======
>>>>>>> 296b1cf5aea2273478d4dea770101d65b4b08849
              page={page}
              setPage={setPage}
              handleRemoveFromFavourites={handleRemoveFromFavourites}
              user={user}
              setUser={setUser}
              cocktail={cocktail}
              key={cocktail.idDrink}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
