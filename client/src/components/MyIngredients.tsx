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
      <div className='selected-ings-list'>
        {selectedIngs.length
          ? selectedIngs.map((ing) => (
              <p
                className='selected-ing'
                key={ing}
                onClick={() => unselectIngs(ing)}
              >
                {ing}
              </p>
            ))
          : undefined}
      </div>
    );
}
