import React from 'react'
import { useState } from 'react'
export default function Cocktail({cocktail, selectedIngs, handleRemoveFromFavourites}) {
  

  // console.log('cocktail in comp before manipulation', cocktail)
  const ingredientsWithMeasures = []
 
  const comparisonArr = [] //used in rendering to make ingredients green ASK GERRY PLS HLEP
  for(let i=0; i<16; i++){
    const ingKey = "strIngredient" + i.toString()
    const measureKey =  "strMeasure" + i.toString()
    if(cocktail[ingKey]) {
      if(cocktail[measureKey]) {
        ingredientsWithMeasures.push(cocktail[measureKey]+ ' ' +cocktail[ingKey])
        if(selectedIngs.includes(cocktail[ingKey])) {
          comparisonArr.push(cocktail[measureKey]+ ' ' +cocktail[ingKey])
        }
      } else {
        ingredientsWithMeasures.push(cocktail[ingKey])
        if(selectedIngs.includes(cocktail[ingKey])) {
          comparisonArr.push(cocktail[ingKey])
        }
      }
    }
  }
  // console.log('SELECTED INGS',selectedIngs)
  // console.log('RENDERING',ingredientsWithMeasures)
  // console.log('COMPARISON', comparisonArr)
 
  

  return (

    <div className="Cocktail">
      <img src={cocktail.strDrinkThumb}/>
      <div className="cocktail-details">
        <h2>{cocktail.strDrink}</h2>
        <div>
          {ingredientsWithMeasures.map(ing=> comparisonArr.includes(ing) ? <p key={ing} className="matched-ing">{ing}</p> : <p key={ing}>{ing}</p>)}
        </div>
      </div>
    </div>
    // :
    // <div className="Cocktail">
    //   <img src={cocktail.strDrinkThumb}/>
    //   <div className="cocktail-details">
    //     <h2>{cocktail.strDrink}</h2>
    //     <div>
    //       {ingredientsWithMeasures.map(ing=> comparisonArr.includes(ing) ? <p key={ing} className="matched-ing">{ing}</p> : <p key={ing}>{ing}</p>)}
    //     </div>
    //   </div>
    // </div>
  )
}
