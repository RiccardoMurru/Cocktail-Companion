import React from 'react';
import { useState, useEffect } from 'react';
import Cocktail from './Cocktail';
import { getCocktailById } from '../apiComs/cocktailDbApi';

export default function CocktailList({
  cocktails,
  selectedIngs,
  user,
  setUser,
  page
}) {
  const [displayedCocktails, setDisplayedCocktails] = useState([]);

  useEffect(() => {
    fetchFirstTenCocktails();
  }, [cocktails]);

  async function fetchFirstTenCocktails() {
    if (!cocktails.length) setDisplayedCocktails([]);
    const tenCocktails = cocktails.slice(0, 10);
    for (let i = 0; i < tenCocktails.length; i++) {
      const details = await getCocktailById(tenCocktails[i].idDrink);
      tenCocktails[i] = details;
    }
    setDisplayedCocktails(tenCocktails);
  }

  async function fetchTenMoreCocktails() {
    const newCocktailList = displayedCocktails.slice();
    if (newCocktailList.length) {
      for (
        let i = displayedCocktails.length;
        i < displayedCocktails.length + 10;
        i++
      ) {
        const fetchedCocktail = await getCocktailById(cocktails[i].idDrink);
        console.log('more cocktails one', fetchedCocktail);
        newCocktailList.push(fetchedCocktail);
      }
    }
    setDisplayedCocktails(newCocktailList);
  }

  return (
    <div>
      <div className='CocktailList'>
        <div>
          {displayedCocktails.map((cocktail) => (
            <Cocktail
              page={page}
              user={user}
              setUser={setUser}
              selectedIngs={selectedIngs}
              cocktail={cocktail}
              key={cocktail.idDrink}
            />
          ))}
        </div>
      </div>
      <button onClick={() => fetchTenMoreCocktails()}>Show More</button>
    </div>
  );
}
