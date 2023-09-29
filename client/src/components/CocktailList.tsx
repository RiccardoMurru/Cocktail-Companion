import React from 'react';
import { useState, useEffect } from 'react';
import CocktailComponent from './Cocktail';
import { getCocktailById } from '../apiComs/cocktailDbApi';
import { CocktailListProps, CocktailProps } from '../interfaces/Props';
import { Cocktail as CocktailType } from '../interfaces/Cocktail';

export default function CocktailList({
  cocktails,
  selectedIngs,
  user,
  setUser,
  page,
  setPage
}: CocktailListProps) {
  const [displayedCocktails, setDisplayedCocktails] = useState<CocktailType[]>(
    []
  );

  useEffect(() => {
    fetchFirstTenCocktails();
  }, [cocktails]);

  async function fetchFirstTenCocktails() {

    if (!cocktails.length) setDisplayedCocktails([]);
    const tenCocktails = cocktails.slice(0, 10);
    for (let i = 0; i < tenCocktails.length; i++) {
      try {
        const details = await getCocktailById(tenCocktails[i].idDrink);
        if (details) tenCocktails[i] = details;
      } catch (e) {
        console.log(e);
      }
    }
    setDisplayedCocktails(tenCocktails);

  }

  async function fetchTenMoreCocktails() {
    const newCocktailList: CocktailType[] = displayedCocktails.slice();
    if (newCocktailList.length) {
      for (
        let i = displayedCocktails.length;
        i < displayedCocktails.length + 10;
        i++
      ) {
        try {
          const fetchedCocktail: CocktailType | undefined =
            await getCocktailById(cocktails[i].idDrink);
          if (fetchedCocktail) newCocktailList.push(fetchedCocktail);
        } catch (e) {
          console.log(e);
        }
      }
    }
    setDisplayedCocktails(newCocktailList);
  }

  return (
    <div>
      <div className='CocktailList'>
        <div>
          {displayedCocktails.map((cocktail) => (
            <CocktailComponent
              page={page}
              user={user}
              setUser={setUser}
              selectedIngs={selectedIngs}
              cocktail={cocktail}
              key={cocktail.idDrink}
              setPage={setPage}
            />
          ))}
        </div>
      </div>
      <button onClick={() => fetchTenMoreCocktails()}>Show More</button>
    </div>
  );
}
