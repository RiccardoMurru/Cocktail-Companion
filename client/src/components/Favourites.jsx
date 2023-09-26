import React from 'react'
import { removeFavourite } from '../apiComs/myApi'
import { getCocktailById } from '../apiComs/cocktailDbApi'
import Cocktail from './Cocktail'
export default function Favourites({user,setUser, displayedFavourites, setDisplayedFavourites}) {
  

  async function loadFavourites(user){
    const userFavourites = user.favourites
    const cocktailList = userFavourites.map(async function (id){
      return await getCocktailById(id)
    })
    setDisplayedFavourites(cocktailList)
  }
  async function handleRemoveFromFavourites(faveId){

    for(let i=0; i<displayedFavourites.length; i++){
      if(displayedFavourites[i].idDrink === faveId) {
        const newFavourites = displayedFavourites.slice()
        newFavourites.splice(i,1)
        setDisplayedFavourites(newFavourites)
      }
    }
    const updateUser = await removeFavourite(user.username, faveId)
  }
  useEffect(()=>{
    loadFavourites(user)
  },[])
  return (
    <div>
      {displayedFavourites.map(cocktail => <Cocktail handleRemoveFromFavourites={handleRemoveFromFavourites} user={user} setUser={setUser} cocktail={cocktail} key={cocktail.idDrink}/>)}
    </div>
  )
}
