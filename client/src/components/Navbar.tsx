import React, { useState, useEffect } from 'react';
import { NavbarProps } from '../interfaces/Props';
import { getCocktailByIngredient } from '../apiComs/cocktailDbApi';
import { Cocktail } from '../interfaces/Cocktail';
import { updateFilteredCocktails } from '../helpers';
import MyIngredients from './MyIngredients';

export default function Navbar({
  setCocktails,
  ingList,
  setIngList,
  cocktails,
  ingredients,
  setIngredients
}: NavbarProps) {
  const [inputText, setInputText] = useState('');
  const [selectedIngs, setSelectedIngs] = useState<string[]>([]);

   useEffect(() => {
     setInputText('');
   }, [selectedIngs]);

  async function handleAddToSelected(ingredient: string): Promise<void> {
    try {
      const updatedIngredients = ingredients.filter(el => el !== ingredient);
      const newCocktails: Cocktail | Cocktail[] = await getCocktailByIngredient(
        ingredient
      );
      if (Array.isArray(newCocktails)) {
        if (!selectedIngs.includes(ingredient)) {
          setCocktails(updateFilteredCocktails(cocktails, newCocktails, 'add'));
          setIngredients(updatedIngredients);
          setSelectedIngs(prevSelectedIngs => [
            ...prevSelectedIngs,
            ingredient,
          ]);
        }
      }
    } catch (err) {
      throw err;
    }
  }

  async function handleRemoveFromSelected(ingredient: string): Promise<void> {
    try {
      const updatedIngredients = ingredients.slice();
      updatedIngredients.push(ingredient);
      const cocktailsToReduce: Cocktail | Cocktail[] =
        await getCocktailByIngredient(ingredient);
      setIngredients(updatedIngredients);
      if (Array.isArray(cocktailsToReduce)) {
        setCocktails(
          updateFilteredCocktails(cocktails, cocktailsToReduce, 'remove')
        );
        const resultingIngredients = selectedIngs.filter(
          el => el !== ingredient
        );
        setSelectedIngs([...resultingIngredients]);
      }
    } catch (err) {
      throw err;
    }
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    //search ingredients list and return all ingredients that match text in event
    if (event.target) {
      const value = (event.target as HTMLInputElement).value;
      const firstUppercase: string =
        value.charAt(0).toUpperCase() + value.slice(1);
      const filteredArr: string[] = ingredients.filter((ingredient: string) =>
        ingredient.includes(firstUppercase)
      );
      setInputText(value);
      setIngList(filteredArr);
    }
  }

  return (
    <div className='NavBar'>
      <h3>Enter ingredient here!</h3>
      <form
        id='ingredient-search'
        onSubmit={e => {
          e.preventDefault();
          setInputText('');
        }}>
        <input
          className='form-input'
          name='search-bar'
          type='text'
          value={inputText}
          onChange={event => handleChange(event)}
          placeholder='Search an ingredient...'
        />
      </form>
      <ul className='ingredients-selector'>
        {inputText.length > 1 ? (
          ingList.length ? (
            ingList.map(ingredient => (
              <li
                className='ingredient'
                key={ingredient}
                onClick={() => handleAddToSelected(ingredient)}>
                {ingredient}
              </li>
            ))
          ) : (
            <p>Such a thing does not exist</p>
          )
        ) : null}
      </ul>
      <MyIngredients
        selectedIngs={selectedIngs}
        handleRemoveFromSelected={handleRemoveFromSelected}
      />
    </div>
  );
}
