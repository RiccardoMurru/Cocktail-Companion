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
}
