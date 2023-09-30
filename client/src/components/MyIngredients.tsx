import React from 'react'
import { MyIngredientsProps } from '../interfaces/Props'
import { Ingredient } from '../interfaces/Ingredient'

export default function MyIngredients({selectedIngs, setSelectedIngs, handleRemoveFromSelected}: MyIngredientsProps) {
  
  // function unselectIngs(ingredient: Ingredient): void{
  //   const index = selectedIngs.indexOf(ingredient)
  //   const newSelectedIngs = selectedIngs.slice()
  //   const restIng = newSelectedIngs.splice(index,1)
  //   handleRemoveFromSelected(ingredient)
  //   setSelectedIngs(restIng)
  // }
  // if (selectedIngs) return (
  //   <div className="selected-ings-list">
  //     {selectedIngs.length ? selectedIngs.map(ing => <p className='selected-ing' key={ing.strIngredient1} onClick={()=>unselectIngs(ing)}>{ing.strIngredient1}</p>) : undefined}
  //   </div> 
  // )

  function unselectIngs(ingredient: Ingredient): void {
    const index = selectedIngs.indexOf(ingredient);
    if (index !== -1) {
      const newSelectedIngs = [...selectedIngs]; // Create a shallow copy of the array
      newSelectedIngs.splice(index, 1); // Remove the ingredient from the copied array
      handleRemoveFromSelected(ingredient);
      setSelectedIngs(newSelectedIngs); // Update the state with the new array
    }
  }

  if (selectedIngs) {
    return (
      <div className="selected-ings-list">
        {selectedIngs.length ? (
          selectedIngs.map((ing) => (
            <p
              className="selected-ing"
              key={ing.strIngredient1}
              onClick={() => unselectIngs(ing)}
            >
              {ing.strIngredient1}
            </p>
          ))
        ) : (
          <p>No selected ingredients.</p>
          )}
        </div>
      );
    } else {
      return null; // Return null if selectedIngs is falsy
    }
}
