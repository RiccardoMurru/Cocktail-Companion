import React from 'react';
import { useState, useEffect } from 'react';
import { addFavourite, removeFavourite } from '../apiComs/myApi';

export default function Cocktail({
  cocktail,
  selectedIngs,
  handleRemoveFromFavourites,
  user,
  setUser,
  page
}) {
  const [isFave, setIsFave] = useState(false);
  //this useEffect works if logged in to check if a drink is already favourites so it renders with a remove button
  useEffect(() => {
    initialCheckIsFave(cocktail.idDrink);
  }, [user]);

  const ingredientsWithMeasures = [];

  const comparisonArr = []; //used in rendering to make ingredients that you've searched for highlighted green
  for (let i = 0; i < 16; i++) {
    //DB send cocktail ingredients in this format: {strIngredient1: Vodka / strMeasure1: 5 litres etc}
    const ingKey = 'strIngredient' + i.toString();
    const measureKey = 'strMeasure' + i.toString();

    if (cocktail[ingKey]) {
      if (cocktail[measureKey]) {
        //some entries all words start with capital letters, some not, have to standardise it here
        let wordsArrMeasure = cocktail[measureKey].split(' ');
        let wordsArrIng = cocktail[ingKey].split(' ');

        let firstLetterCapMeasure = wordsArrMeasure.map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1)
        );
        let firstLetterCapIng = wordsArrIng.map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1)
        );

        cocktail[measureKey] = firstLetterCapMeasure.join(' ');
        cocktail[ingKey] = firstLetterCapIng.join(' ');

        ingredientsWithMeasures.push(
          cocktail[measureKey] + ' ' + cocktail[ingKey]
        );

        if (page !== 'favourites' && selectedIngs.includes(cocktail[ingKey])) {
          comparisonArr.push(cocktail[measureKey] + ' ' + cocktail[ingKey]);
        }
      } else {
        ingredientsWithMeasures.push(cocktail[ingKey]);
        if (page !== 'favourites' && selectedIngs.includes(cocktail[ingKey])) {
          comparisonArr.push(cocktail[ingKey]);
        }
      }
    }
  }

  function initialCheckIsFave(faveId) {
    if (user.favourites) {
      for (let i = 0; i < user.favourites.length; i++) {
        if (Number(faveId) === user.favourites[i]) setIsFave(true);
      }
    }
  }

  async function toggleFave(user, faveId) {
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
          <p>{cocktail.instructions}</p>
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
