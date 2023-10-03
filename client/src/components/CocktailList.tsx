import React from 'react';
import { useState, useEffect } from 'react';
import CocktailComponent from './Cocktail';
import { getCocktailById } from '../apiComs/cocktailDbApi';
import { CocktailListProps } from '../interfaces/Props';
import { Cocktail } from '../interfaces/Cocktail';

export default function CocktailList({
  cocktails,
  selectedIngs,
  page,
  setPage
}: CocktailListProps) {
  const [displayedCocktails, setDisplayedCocktails] = useState<Cocktail[]>([]);

  useEffect(() => {
    fetchFirstTenCocktails();
  }, [cocktails]);

  async function fetchFirstTenCocktails() {
    if (!cocktails.length) setDisplayedCocktails([]);
    const tenCocktails = cocktails.slice(0, 10);
    for (let i = 0; i < tenCocktails.length; i++) {
      try {
        const details = await getCocktailById(tenCocktails[i].idDrink);
        if (!Array.isArray(details)) tenCocktails[i] = details;
      } catch (e) {
        console.log(e);
      }
    }
    setDisplayedCocktails(tenCocktails);
  }

  async function fetchTenMoreCocktails() {
    const newCocktailList: Cocktail[] = displayedCocktails.slice();
    if (newCocktailList.length) {
      for (
        let i = displayedCocktails.length;
        i < displayedCocktails.length + 10;
        i++
      ) {
        try {
          const fetchedCocktail: Cocktail | Cocktail[] = await getCocktailById(
            cocktails[i].idDrink
          );
          if (!Array.isArray(fetchedCocktail))
            newCocktailList.push(fetchedCocktail);
        } catch (e) {
          console.log(e);
        }
      }
    }
    setDisplayedCocktails(newCocktailList);
  }

  return (
    <>
      <div className='CocktailList'>
        {displayedCocktails.map((cocktail) => (
          <CocktailComponent
            page={page}
            selectedIngs={selectedIngs}
            cocktail={cocktail}
            key={cocktail.idDrink}
            setPage={setPage}
          />
        ))}
      </div>
      <div className='btn-container'>
        <div className='wrapper'>
          <button className='show-more' onClick={() => fetchTenMoreCocktails()}>
            Show More
          </button>
        </div>
      </div>
    </>
  );
}
