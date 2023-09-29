import React from 'react';
import { useState, useEffect } from 'react';
import { addFavourite, removeFavourite } from '../apiComs/myApi';
import { User } from '../interfaces/User';
import { Cocktail } from '../interfaces/Cocktail';
import { CocktailProps } from '../interfaces/Props';
export default function CocktailComponent({
  cocktail,
  selectedIngs,
  handleRemoveFromFavourites,
  user,
  setUser,
  page
}: CocktailProps) {
  const [isFave, setIsFave] = useState(false);
  //this useEffect works if logged in to check if a drink is already favourites so it renders with a remove button
  useEffect(() => {
    initialCheckIsFave(cocktail.idDrink);
  }, [user]);
  const ingredientsWithMeasures: string[] = [];
  const comparisonArr: string[] = []; //used in rendering to make ingredients that you've searched for highlighted green
  for (let i = 1; i <= 16; i++) {
    const ingKey = 'strIngredient' + i.toString();
    const measureKey = 'strMeasure' + i.toString();
    const ingredientValue  = cocktail[ingKey as keyof Cocktail];
    const measureValue = cocktail[measureKey as keyof Cocktail];
    if (ingredientValue) {
      const standardizedIngredient =
        ingredientValue.charAt(0).toUpperCase() + ingredientValue.slice(1);
      const standardizedMeasure = measureValue
        ? measureValue.charAt(0).toUpperCase() + measureValue.slice(1)
        : '';
      ingredientsWithMeasures.push(
        standardizedMeasure + ' ' + standardizedIngredient
      );
      if (
        page !== 'favourites' &&
        selectedIngs!.includes({strIngredient1 : standardizedIngredient})
      ) {
        comparisonArr.push(standardizedMeasure + ' ' + standardizedIngredient);
      }
    }
  }
  function initialCheckIsFave(faveId: string) {
    if ( user) {
      if (user.favourites) {
        for (let i = 0; i < user.favourites.length; i++) {
          if (Number(faveId) === user.favourites[i]) setIsFave(true);
        }
      }
    }
  }
  async function toggleFave(user: User, faveId: string) {
    
      if (isFave === true) {
        const updatedUser = await removeFavourite(user.username, faveId);
        setUser(updatedUser);
     
      }
      if (isFave === false) {
        const updatedUser = await addFavourite(user.username, faveId);
        setUser(updatedUser);
      }
      setIsFave(!isFave);
    
    }
    
  //checks if cocktail being rendered on favourites page as this function would not be handed down otherwise
  if (handleRemoveFromFavourites)
    return (
      <div className='Cocktail'>
        <img className='cocktail-img' src={cocktail.strDrinkThumb} />
        <div className='cocktail-details'>
          <h2>{cocktail.strDrink}</h2>
          <div>
            {ingredientsWithMeasures.map((ing) => (
              <p key={ing}>{ing}</p>
            ))}
          </div>
          <p>{cocktail.strInstructions}</p>
        </div>
        <button
          className='fave-button'
          onClick={() => handleRemoveFromFavourites(user, cocktail.idDrink)}
        >
          Remove From Favourites
        </button>
      </div>
    );
  //renders this if not logged in
  if (!user.username)
    return (
      <div className='Cocktail'>
        <img className='cocktail-img' src={cocktail.strDrinkThumb} />
        <div className='cocktail-details'>
          <h2>{cocktail.strDrink}</h2>
          <div>
            {ingredientsWithMeasures.map((ing) => (
              <p
                key={ing}
                className={comparisonArr.includes(ing) ? 'matched-ing' : 'ing'}
              >
                {ing}
              </p>
            ))}
          </div>
          <p>{cocktail.strInstructions}</p>
        </div>
      </div>
    );
  //else it means we are logged in and on search page so check if cocktail is favourite then render
  return (
    <>
      {isFave ? (
        <div className='Cocktail'>
          <img className='cocktail-img' src={cocktail.strDrinkThumb} />
          <div className='cocktail-details'>
            <h2>{cocktail.strDrink}</h2>
            <div>
              {ingredientsWithMeasures.map((ing) => (
                <p
                  key={ing}
                  className={
                    comparisonArr.includes(ing) ? 'matched-ing' : 'ing'
                  }
                >
                  {ing}
                </p>
              ))}
            </div>
            <p>{cocktail.strInstructions}</p>
          </div>
          <button
            className='fave-button'
            onClick={() => toggleFave(user, cocktail.idDrink)}
          >
            Remove From Favourites
          </button>
        </div>
      ) : (
        <div className='Cocktail'>
          <img className='cocktail-img' src={cocktail.strDrinkThumb} />
          <div className='cocktail-details'>
            <h2>{cocktail.strDrink}</h2>
            <div>
              {ingredientsWithMeasures.map((ing) => (
                <p
                  key={ing}
                  className={
                    comparisonArr.includes(ing) ? 'matched-ing' : 'ing'
                  }
                >
                  {ing}
                </p>
              ))}
            </div>
            <p>{cocktail.strInstructions}</p>
          </div>
          <button
            className='fave-button'
            onClick={() => toggleFave(user, cocktail.idDrink)}
          >
            Add To Favourites
          </button>
        </div>
      )}
    </>
  );
}