import React from 'react'

export default function MyIngredients({selectedIngs, setSelectedIngs, handleRemoveFromSelected}) {
  console.log('Passed selected Ings', selectedIngs)
  
  function unselectIngs(ing){
    const index = selectedIngs.indexOf(ing)
    const newSelectedIngs = selectedIngs.slice()
    console.log('new selected ings', newSelectedIngs)
    const removedIng = newSelectedIngs.splice(index,1)
    handleRemoveFromSelected(ing)
    setSelectedIngs(newSelectedIngs)
  }
  if (selectedIngs) return (
    <div className="selected-ings-list">
      {selectedIngs.length ? selectedIngs.map(ing => <p key={ing} onClick={()=>unselectIngs(ing)}>{ing}</p>) : undefined}
    </div> 
  )
}
