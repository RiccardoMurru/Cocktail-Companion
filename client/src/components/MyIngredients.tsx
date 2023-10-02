<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 296b1cf5aea2273478d4dea770101d65b4b08849
import React from 'react';
import { MyIngredientsProps } from '../interfaces/Props';

export default function MyIngredients({
  selectedIngs,
  handleRemoveFromSelected,
}: MyIngredientsProps) {
  async function unselectIngs(ingredient: string) {
    await handleRemoveFromSelected(ingredient);
  }
  if (selectedIngs)
    return (
      <ul className='selected-ings-list'>
        {selectedIngs.length
          ? selectedIngs.map(ing => (
              <li
                className='selected-ing'
                key={ing}
                onClick={() => unselectIngs(ing)}>
                {ing}
              </li>
            ))
          : undefined}
      </ul>
    );
<<<<<<< HEAD
=======
import React from 'react'

export default function MyIngredients({selectedIngs, setSelectedIngs, handleRemoveFromSelected}) {
  
  function unselectIngs(ing){
    const index = selectedIngs.indexOf(ing)
    const newSelectedIngs = selectedIngs.slice()
    const removedIng = newSelectedIngs.splice(index,1)
    handleRemoveFromSelected(ing)
    setSelectedIngs(newSelectedIngs)
  }
  if (selectedIngs) return (
    <div className="selected-ings-list">
      {selectedIngs.length ? selectedIngs.map(ing => <p className='selected-ing' key={ing} onClick={()=>unselectIngs(ing)}>{ing}</p>) : undefined}
    </div> 
  )
>>>>>>> origin/riccardo2
=======
>>>>>>> 296b1cf5aea2273478d4dea770101d65b4b08849
}
