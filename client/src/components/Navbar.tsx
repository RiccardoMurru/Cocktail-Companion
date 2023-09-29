import React from 'react';
import { useState } from 'react';
import { Ingredient } from '../interfaces/Ingredient';
import { NavbarProps } from '../interfaces/Props';

export default function Navbar({ handleAddToSelected, ingredients } : NavbarProps) {
  const [ingList, setIngList] = useState<Ingredient[]>([]);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    //search ingredients list and return all ingredients that match text in event
    if (event.target) {
      const value = (event.target as HTMLInputElement).value;
      const firstUppercase: string =
        value.charAt(0).toUpperCase() + value.slice(1);
      const filteredArr: Ingredient[] = ingredients.filter(
        (ingredient: Ingredient) => {
          return ingredient.strIngredient1.includes(firstUppercase);
        }
      ) || [];
      setIngList(filteredArr);
    }
  }

  return (
    <div className='NavBar'>
      <h3>Enter ingredient here!</h3>
      <form id='ingredient-search' onReset={() => setIngList([])}>
        <input
          className='form-input'
          name='search-bar'
          type='text'
          onChange={(event) => handleChange(event)}
        />
      </form>
      <div className='ingredients-selector'>
        {ingList.length ? (
          ingList.map(ingredient => (
            <p
              key={ingredient.strIngredient1}
              onClick={() => handleAddToSelected(ingredient)}>
              {' '}
              {ingredient.strIngredient1}{' '}
            </p>
          ))
        ) : (
          <p>Such a thing does not exist</p>
        )}
      </div>
    </div>
  );
}
