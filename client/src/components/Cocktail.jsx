import React from 'react'
import { useState, useEffect } from 'react'
import { addFavourite,removeFavourite } from '../apiComs/myApi'
export default function Cocktail({cocktail, selectedIngs, handleRemoveFromFavourites, user, setUser, page}) {
  

  const [isFave, setIsFave] = useState(false)
  
  useEffect(()=>{
    initialCheckIsFave(cocktail.idDrink)
  },[user])
 
  const ingredientsWithMeasures = []
 
  const comparisonArr = [] //used in rendering to make ingredients green and also display with measures
  for(let i=0; i<16; i++){
    const ingKey = "strIngredient" + i.toString()
    const measureKey =  "strMeasure" + i.toString()
    if(cocktail[ingKey]) {
      if(cocktail[measureKey]) {

        let wordsArrMeasure = cocktail[measureKey].split(' ')
        let wordsArrIng = cocktail[ingKey].split(' ')
        let firstLetterCapMeasure = wordsArrMeasure.map(word => word.charAt(0).toUpperCase()+word.slice(1))
        let firstLetterCapIng = wordsArrIng.map(word => word.charAt(0).toUpperCase()+word.slice(1))
        cocktail[measureKey] = firstLetterCapMeasure.join(' ')
        cocktail[ingKey] = firstLetterCapIng.join(' ')
        ingredientsWithMeasures.push(cocktail[measureKey]+ ' ' +cocktail[ingKey])

        if(page!=='favourites'  && selectedIngs.includes(cocktail[ingKey]) ) {
          comparisonArr.push(cocktail[measureKey]+ ' ' +cocktail[ingKey])
        }
      } else {
        ingredientsWithMeasures.push(cocktail[ingKey])
        if(page!=='favourites' && selectedIngs.includes(cocktail[ingKey])) {
          comparisonArr.push(cocktail[ingKey])
        }
      }
    }
  }

  function initialCheckIsFave(faveId) {
    console.log('USER IN COCKTAIL',user)
    console.log('USER.FAVOURITES', user.favourites)
    console.log('faveId', faveId)
    if(user.favourites) {
      for (let i=0; i<user.favourites.length; i++){
        if(faveId === user.favourites[i]) setIsFave(true)
      }
    }
    console.log(isFave)
  }

  async function toggleFave(user, faveId) {
    if(isFave === true) {
      const updatedUser = await removeFavourite(user.username, faveId)
      setUser(updatedUser)
    }
    if(isFave === false) {
      const updatedUser = await addFavourite(user.username, faveId)
      setUser(updatedUser)
    }
    setIsFave(!isFave)
  }
  console.log('COCKTAIL', cocktail)
  
  if(handleRemoveFromFavourites) return (
    <div className="Cocktail">
      <img src={cocktail.strDrinkThumb}/>
      <div className="cocktail-details">
         <h2>{cocktail.strDrink}</h2>
         <div>
           {ingredientsWithMeasures.map(ing=> <p key={ing}>{ing}</p>)}
         </div>
       </div>
      <button onClick={()=>handleRemoveFromFavourites(user,cocktail.idDrink)}>Remove From Favourites2</button>
     </div>
  )
  if(!user.username) return (
    <div className="Cocktail">
      <img src={cocktail.strDrinkThumb}/>
      <div className="cocktail-details">
         <h2>{cocktail.strDrink}</h2>
         <div>
         {ingredientsWithMeasures.map(ing=> <p key={ing} className={comparisonArr.includes(ing) ? "matched-ing" : ''}>{ing}</p>)}
         </div>
       </div>
     </div>
  )
  return (
    <>
    { isFave ?
    <div className="Cocktail">
      <img src={cocktail.strDrinkThumb}/>
      <div className="cocktail-details">
        <h2>{cocktail.strDrink}</h2>
        <div>
        {ingredientsWithMeasures.map(ing=> <p key={ing} className={comparisonArr.includes(ing) ? "matched-ing" : ''}>{ing}</p>)}
        </div>
      </div>
      <button onClick={()=> toggleFave(user,cocktail.idDrink)}>Remove From Favourites</button>
    </div>
     :
    <div className="Cocktail">
      <img src={cocktail.strDrinkThumb}/>
      <div className="cocktail-details">
         <h2>{cocktail.strDrink}</h2>
         <div>
           {ingredientsWithMeasures.map(ing=> <p key={ing} className={comparisonArr.includes(ing) ? "matched-ing" : ''}>{ing}</p>)}
         </div>
       </div>
      <button onClick={()=> toggleFave(user,cocktail.idDrink)}>Add To Favourites</button>
     </div>
    }
    </>
  )
}
