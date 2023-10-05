import React, { useEffect, useState } from 'react';

import { fetchMostLikedDrinksWithDetails } from '../apiComs/myApi';
import { Cocktail } from '../interfaces/Cocktail';

export default function MostLikedDrinks() {
  const [cocktails, setCocktails] = useState<Cocktail[]>([]);

  useEffect(() => {
    fetchMostLikedDrinks();
  }, []);
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
      <h2 className='title'>Top Cocktails:</h2>
      {cocktails.map((cocktail) => (
        <div className='Cocktail' key={cocktail.idDrink}>
          <img className='cocktail-img' src={cocktail.drinkThumb} />
          <div className='cocktail-details'>
            <h2>{cocktail.drink}</h2>
            <p>
              <span>Category: </span>
              {cocktail.category}
            </p>
            <p>
              <span>Glass: </span>
              {cocktail.glass}
            </p>
            <p>
              <span>Alcoholic: </span>
              {cocktail.alcoholic}
            </p>
            {/* <h4>Ingredients:</h4>
              <ul>
                {cocktail.ingredients.map((ingredient, index) => (
                  <li key={index}>
                    {ingredient} - {cocktail.measures[index]}
                  </li>
                ))}
              </ul> */}
            <h4>Instructions:</h4>
            <p>{cocktail.instructions}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
