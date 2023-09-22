import React from 'react'

export default function Cocktail({cocktail}) {
  
  const [size, setSize] = 'min'
  const ingredientsWithMeasures = {}//sort this out
  const ingredients = [].concat()//function to change make an array out of what cocktail gives then make into string

  return (
    size === 'min' ?
    <div className="Cocktail">
      <img src={cocktail.img}/>
      <div className="cocktail-details">
        <h2>{cocktail.name}</h2>
        <p>{cocktail.description}</p>
        <p>{ingredients}</p>
      </div>
      <button className="expand-button" onClick={setSize('max')}>X</button>
    </div>
    :
    <div className="Cocktail-expanded">
      <img src={cocktail.img}/>
      <div className="cocktail-details">
        <h2>{cocktail.name}</h2>
        <p>{cocktail.description}</p>
        <p>{cocktail.instructions}</p>
        <p>{ingredientsWithMeasures}</p> //more details!!!!!
      </div>
      <button className="minimise-button" onClick={setSize('min')}>Y</button>
    </div>
  )
}
