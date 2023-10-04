import React, { useEffect, useState } from "react";

import { fetchMostLikedDrinksWithDetails } from '../apiComs/myApi'
import { Cocktail } from "../interfaces/Cocktail";
import { MostLikedDrinkProps } from "../interfaces/Props";

export default function MostLikedDrinks () {
  const [cocktails, setCocktails] = useState<Cocktail[]>([]);

  useEffect (() => {
    fetchMostLikedDrinks();
  }, [])
  async function fetchMostLikedDrinks() {
    try {
      const mostLikedDrinks = await fetchMostLikedDrinksWithDetails();
      setCocktails(mostLikedDrinks as Cocktail[]);
    } catch (error) {
      console.error('Error fetching most-liked drinks:', error);
    }
  }
  return (
    <div className='MostLikedCocktails'>
    <h2>Top Cocktails:</h2>
    <ul>
      {cocktails.map(cocktail => (
        <li key={cocktail.idDrink}>
          <h3>{cocktail.drink}</h3>
          <img src={cocktail.drinkThumb} alt={cocktail.drink} className='drink-image' />
          <p>Category: {cocktail.category}</p>
          <p>Glass: {cocktail.glass}</p>
          <p>Alcoholic: {cocktail.alcoholic}</p>
          <h4>Instructions:</h4>
          <p>{cocktail.instructions}</p>
        </li>
      ))}
    </ul>
  </div>
   
  )
}