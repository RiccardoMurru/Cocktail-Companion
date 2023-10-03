import React from 'react';
import { addFavourite, removeFavourite } from '../apiComs/myApi';
import { CocktailProps } from '../interfaces/Props';
import { useAuth } from '../context/authContext';
import Cookies from 'js-cookie';
import { selectedIngredientsHighlight } from '../helpers';

export default function CocktailComponent({
  cocktail,
  selectedIngs,
  handleRemoveFromFavourites,
  page
}: CocktailProps) {
  const { user, setUser } = useAuth();

  const { ingredientsWithMeasures, comparisonArr } =
    selectedIngredientsHighlight(selectedIngs!, page, cocktail);

  async function toggleFave(faveId: string) {
    const updatedUser = user!.favourites!.includes(faveId)
      ? await removeFavourite(faveId)
      : await addFavourite(faveId);
    setUser(updatedUser);
  }
  return (
    <div className='Cocktail'>
      <img className='cocktail-img' src={cocktail.drinkThumb} />
      <div className='cocktail-details'>
        <h2>{cocktail.drink}</h2>
        <ul>
          {ingredientsWithMeasures.map((ing) => (
            <li
              key={ing}
              className={comparisonArr.includes(ing) ? 'matched-ing' : 'ing'}
            >
              <span>{ing}</span>
            </li>
          ))}
        </ul>
        <h3>How to make it:</h3>
        <p>{cocktail.instructions}</p>
      </div>

      {handleRemoveFromFavourites && (
        <button
          className='fave-button'
          onClick={() => handleRemoveFromFavourites(cocktail.idDrink)}
        >
          Remove From Favourites
        </button>
      )}

      {Cookies.get('token') && user?.favourites && (
        <button
          className='fave-button'
          onClick={() => toggleFave(cocktail.idDrink)}
        >
          {user.favourites.includes(cocktail.idDrink)
            ? 'Remove From Favourites'
            : 'Add To Favourites'}
        </button>
      )}
    </div>
  );
}
