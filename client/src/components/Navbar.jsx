import React from 'react'
import { useState,useEffect } from 'react';

export default function Navbar({handleAddToSelected,ingredients}) {
  
 
  
  const [ingList, setIngList] = useState([])
  
  
  function handleChange(event) {
    //search ingredients list and return all ingredients that match text in event
    const value = event.target.value
    const firstUpp = value.charAt(0).toUpperCase() + value.slice(1);
    const filteredArr = ingredients.filter(ing => ing.includes(firstUpp) && ing[0] === firstUpp[0])
    setIngList(filteredArr)
  }
  
  return (
    <div className='NavBar' >
      <h3>Enter ingredient here!</h3>
      <form id="ingredient-search" onReset={()=>setIngList([])}>
      <input className='form-input' name="search-bar"  type="text" onChange={handleChange}/>
      </form>
      <div className="ingredients-selector">
      { ingList.length? 
      ingList.map(ing => <p key={ing} onClick={() => handleAddToSelected(ing)}> {ing} </p>)
      : <p>Such a thing does not exist</p>}
      </div>
    </div>
  )
}
