import React, { useState } from 'react';
import { NavbarProps } from '../interfaces/Props';

export default function Navbar({
  handleAddToSelected,
  ingredients,
  handleCocktailSelected,
  allCocktails
}: NavbarProps) {
  const [searchedItemsList, setSearchedItemsList] = useState<string[]>([]);
  const [inputText, setInputText] = useState('');
  const [selectedOption, setSelectedOption] = useState('ingredient');

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target) {
      const value = (event.target as HTMLInputElement).value;

      let selectedItems: string[] = [];

      if (selectedOption === 'ingredient') {
        selectedItems = ingredients;
      } else if (selectedOption === 'cocktail') {
        selectedItems = allCocktails.map((el) => el!.drink!);
      }

      let filteredArr: string[] = selectedItems.filter((item: string) =>
        item.includes(value.toLowerCase())
      );

      filteredArr.sort((a, b) => {
        if (a.toLowerCase() === value.toLowerCase()) return -1;
        if (b.toLowerCase() === value.toLowerCase()) return 1;
        return 0;
      });

      setInputText(value);
      setSearchedItemsList(filteredArr);
    }
  }

  return (
    <div className='NavBar'>
      <h3>
        Enter {selectedOption === 'ingredient' ? 'ingredient' : 'cocktail'}{' '}
        here!
      </h3>
      <form id='ingredient-search' onReset={() => setInputText('')}>
        <select
          value={selectedOption}
          onChange={(event) => setSelectedOption(event.target.value)}
        >
          <option value='ingredient'>Ingredients</option>
          <option value='cocktail'>Cocktails</option>
        </select>
        <input
          className='form-input'
          name='search-bar'
          type='text'
          value={inputText}
          onChange={(event) => handleChange(event)}
          placeholder={`Search ${selectedOption}...`}
        />
      </form>
      <ul className='ingredients-selector'>
        {inputText.length > 1 ? (
          searchedItemsList.length ? (
            searchedItemsList.map((item) => (
              <li
                className='ingredient'
                key={item}
                onClick={() =>
                  selectedOption === 'cocktail'
                    ? handleCocktailSelected(item)
                    : handleAddToSelected(item)
                }
              >
                {item}
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
