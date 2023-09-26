import React from 'react'
import { useState, useEffect } from 'react'
import Cocktail from './Cocktail'
import { updateFilteredCocktails } from '../helpers'
import { getCocktailById, getCocktailByIngredient } from '../apiComs/cocktailDbApi'

export default function CocktailList({cocktails,selectedIngs}) {
  
  const [displayedCocktails, setDisplayedCocktails] = useState([])

  useEffect(()=>{
    console.log('cocktail list useeffect')
      fetchFirstTenCocktails()
  }, [cocktails])

  async function fetchFirstTenCocktails() {
    console.log('COCKTAILS', cocktails)
    if(!cocktails.length) setDisplayedCocktails([])
    const tenCocktails = cocktails.slice(0,10)
    for (let i=0; i<tenCocktails.length; i++) {
      const details = await getCocktailById(tenCocktails[i].idDrink)
      tenCocktails[i] = details
    }
    console.log('ten cocktails' ,tenCocktails)
    setDisplayedCocktails(tenCocktails)
  }

  async function fetchTenMoreCocktails() {
    const newCocktailList = displayedCocktails.slice()
    console.log('more cocktails initial list',newCocktailList)
    if(newCocktailList.length) {
      for(let i=displayedCocktails.length; i<displayedCocktails.length +10; i++) {
        const fetchedCocktail = await getCocktailById(cocktails[i].idDrink)
        console.log('more cocktails one',fetchedCocktail)
        newCocktailList.push(fetchedCocktail)
      }
    }
    setDisplayedCocktails(newCocktailList)
  }
  
  return (
    <>
    <div>
      {displayedCocktails.map(cocktail => <Cocktail selectedIngs={selectedIngs} cocktail={cocktail} key={cocktail.idDrink}/>)}
    </div>
    <button onClick={()=>fetchTenMoreCocktails()}>Show More</button>
    </>
  )
}
