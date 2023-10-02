import React, { useState } from 'react';
import { NavbarProps } from '../interfaces/Props';

export default function Navbar({
  handleAddToSelected,
  ingredients,
  ingList,
  setIngList
}: NavbarProps) {
  const [inputText, setInputText] = useState('');

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    //search ingredients list and return all ingredients that match text in event
    if (event.target) {
      const value = (event.target as HTMLInputElement).value;

      let filteredArr: string[] = ingredients.filter((ingredient: string) =>
        ingredient.includes(value)
      );

      filteredArr.sort((a, b) => {
        if (a.toLowerCase() === value) return -1;
        if (b.toLowerCase() === value) return 1;
        return 0;
      });
      setInputText(value);
      setIngList(filteredArr);
    }
  }

  return (
    <div className='NavBar'>
      <h3>Enter ingredient here!</h3>
      <form id='ingredient-search' onReset={() => setInputText('')}>
        <input
          className='form-input'
          name='search-bar'
          type='text'
          value={inputText}
          onChange={(event) => handleChange(event)}
          placeholder='Search an ingredient...'
        />
      </form>
      <ul className='ingredients-selector'>
        {inputText.length > 1 ? (
          ingList.length ? (
            ingList.map((ingredient) => (
              <li
                className='ingredient'
                key={ingredient}
                onClick={() => handleAddToSelected(ingredient)}
              >
                {ingredient}
              </li>
            ))
          ) : (
            <p>Such a thing does not exist</p>
          )
        ) : null}
      </ul>
    </div>
  );
}
