import React from 'react';
import { useState, useEffect } from 'react';
import { addFavourite, removeFavourite } from '../apiComs/myApi';
import { User } from '../interfaces/User';
import { CocktailProps } from '../interfaces/Props';
import { useAuth } from '../context/authContext';
import Cookies from 'js-cookie';
export default function CocktailComponent({
  cocktail,
  selectedIngs,
  handleRemoveFromFavourites,
  page,
}: CocktailProps) {
  const { user, setUser } = useAuth();
  const ingredientsWithMeasures: string[] = [];
  const comparisonArr: string[] = []; //used in rendering to make ingredients that you've searched for highlighted green
  for (let i = 0; i < 15; i++) {
    const ingredientValue = cocktail.ingredients![i];
    const measureValue = cocktail.measures![i];
    if (ingredientValue) {
      if (measureValue) {
        const standardizedIngredient = ingredientValue.toLowerCase();
        const standardizedMeasure = measureValue
          ? measureValue.toLowerCase()
          : '';
        ingredientsWithMeasures.push(
          standardizedMeasure + ' ' + standardizedIngredient
        );
        if (
          page !== 'favourites' &&
          selectedIngs!.includes(standardizedIngredient)
        ) {
          comparisonArr.push(
            standardizedMeasure + ' ' + standardizedIngredient
          );
        }
      } else {
        ingredientsWithMeasures.push(ingredientValue.toLowerCase());
        if (
          page !== 'favourites' &&
          selectedIngs!.includes(ingredientValue.toLowerCase())
        ) {
          comparisonArr.push(ingredientValue.toLowerCase());
        }
      }
    }
  }

  async function toggleFave(faveId: string) {
    const updatedUser = user!.favourites!.includes(faveId)
      ? await removeFavourite(faveId)
      : await addFavourite(faveId);
    setUser(updatedUser);
  }
  //checks if cocktail being rendered on favourites page as this function would not be handed down otherwise
  if (handleRemoveFromFavourites)
    return (
      <div className='Cocktail'>
        <img className='cocktail-img' src={cocktail.drinkThumb} />
        <div className='cocktail-details'>
          <h2>{cocktail.drink}</h2>
          <ul>
            {ingredientsWithMeasures.map(ing => (
              <li
                key={ing}
                className={comparisonArr.includes(ing) ? 'matched-ing' : 'ing'}>
                <span>{ing}</span>
              </li>
            ))}
          </ul>
          <h3>How to make it:</h3>
          <p>{cocktail.instructions}</p>
          <button
            className='fave-button'
            onClick={() => handleRemoveFromFavourites(cocktail.idDrink)}>
            Remove From Favourites
          </button>
        </div>
      </div>
    );
  //renders this if not logged in
  if (!Cookies.get('token'))
    return (
      <div className='Cocktail'>
        <img className='cocktail-img' src={cocktail.drinkThumb} />
        <div className='cocktail-details'>
          <h2>{cocktail.drink}</h2>
          <ul>
            {ingredientsWithMeasures.map(ing => (
              <li
                key={ing}
                className={comparisonArr.includes(ing) ? 'matched-ing' : 'ing'}>
                <span>{ing}</span>
              </li>
            ))}
          </ul>
          <h3>How to make it:</h3>
          <p>{cocktail.instructions}</p>
        </div>
      </div>
    );
  //else it means we are logged in and on search page so check if cocktail is favourite then render
  return (
    <div className='Cocktail'>
      <img className='cocktail-img' src={cocktail.drinkThumb} />
      <div className='cocktail-details'>
        <h2>{cocktail.drink}</h2>
        <ul>
          {ingredientsWithMeasures.map(ing => (
            <li
              key={ing}
              className={comparisonArr.includes(ing) ? 'matched-ing' : 'ing'}>
              {ing}
            </li>
          ))}
        </ul>
        <h3>How to make it:</h3>
        <p>{cocktail.instructions}</p>
        <button
          className='fave-button'
          onClick={() => toggleFave(cocktail.idDrink)}>
          {user!.favourites?.includes(cocktail.idDrink)
            ? 'Remove From Favourites'
            : 'Add To Favourites'}
        </button>
      </div>
    </div>
  );
}
