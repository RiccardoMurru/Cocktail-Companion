import React from 'react'
import { removeFavourite } from '../apiComs/myApi'
import { getCocktailById } from '../apiComs/cocktailDbApi'
import { useState, useEffect} from 'react'
import Cocktail from './Cocktail'

export default function Favourites({user, setUser, setPage, page}) {
  
  const [displayedFavourites, setDisplayedFavourites] = useState([])
  console.log('USER IN FAVOURITES', user)
  async function loadFavourites(user){
    const userFavourites = user.favourites
    const cocktailList = []
    console.log('USER FAVOURITES',userFavourites)
    for (let i =0; i<userFavourites.length; i++) {
      const cocktail = await getCocktailById(userFavourites[i])
      cocktailList.push(cocktail)
    }
    setDisplayedFavourites(cocktailList)
  }
  async function handleRemoveFromFavourites(user, faveId){

    for(let i=0; i<displayedFavourites.length; i++){
      if(displayedFavourites[i].idDrink === faveId) {
        const newFavourites = displayedFavourites.slice()
        newFavourites.splice(i,1)
        setDisplayedFavourites(newFavourites)
      }
    }
    const updatedUser = await removeFavourite(user.username, faveId)
    setUser(updatedUser)
  }
  useEffect(()=>{
    loadFavourites(user)
  },[user])

  function handleLogout(){
    setPage('search')
    setUser('')
  }

  return (
    <div className='list-page'>
      <div>
        <p onClick={()=>setPage('search')}>Search-page</p>
        <p onClick={()=>handleLogout()}>Logout</p>
      </div>
      <div>
      <div className='CocktailList'>
        {displayedFavourites.map(cocktail => <Cocktail page={page} setPage={setPage} handleRemoveFromFavourites={handleRemoveFromFavourites} user={user} setUser={setUser} cocktail={cocktail} key={cocktail.idDrink}/>)}
      </div>
      </div>
    </div>
  )
}
