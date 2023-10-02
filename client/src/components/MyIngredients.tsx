import React from 'react';
import { MyIngredientsProps } from '../interfaces/Props';

export default function MyIngredients({
  selectedIngs,
  handleRemoveFromSelected
}: MyIngredientsProps) {
  async function unselectIngs(ingredient: string) {
    await handleRemoveFromSelected(ingredient);
  }
  if (selectedIngs)
    return (
      <ul className='selected-ings-list'>
        {selectedIngs.length
          ? selectedIngs.map((ing) => (
              <li
                className='selected-ing'
                key={ing}
                onClick={() => unselectIngs(ing)}
              >
                {ing}
              </li>
            ))
          : undefined}
      </ul>
    );
}
