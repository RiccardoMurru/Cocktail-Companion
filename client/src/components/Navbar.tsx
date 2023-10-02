import React from 'react';
import { NavbarProps } from '../interfaces/Props';

export default function Navbar({
  handleAddToSelected,
  ingredients,
  ingList,
  setIngList
}: NavbarProps) {
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    //search ingredients list and return all ingredients that match text in event
    if (event.target) {
      const value = (event.target as HTMLInputElement).value;
      const firstUppercase: string =
        value.charAt(0).toUpperCase() + value.slice(1);
      const filteredArr: string[] =
        ingredients.filter((ingredient: string) =>
          ingredient.includes(firstUppercase)
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
<<<<<<< HEAD
=======
          placeholder='Search an ingredient...'
>>>>>>> 296b1cf5aea2273478d4dea770101d65b4b08849
        />
      </form>
      <ul className='ingredients-selector'>
        {ingList.length ? (
          ingList.map((ingredient) => (
<<<<<<< HEAD
            <p key={ingredient} onClick={() => handleAddToSelected(ingredient)}>
              {' '}
              {ingredient}{' '}
            </p>
=======
            <li className='ingredient' key={ingredient} onClick={() => handleAddToSelected(ingredient)}>
              {ingredient}
            </li>
>>>>>>> 296b1cf5aea2273478d4dea770101d65b4b08849
          ))
        ) : (
          <p>Such a thing does not exist</p>
        )}
      </ul>
    </div>
  );
}
