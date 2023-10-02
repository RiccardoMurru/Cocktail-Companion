//This function takes checks how many times a cocktail has appeared in searches, gives a count and orders
//based on that count, as well as the reverse when removing ingredients from selected ingredients
//for example, if you search vodka, lime juice and orange juice, any cocktail that contains all three
//will be at the top of the list and will be rendered first, followed by cocktails that match two etc

import { Category } from './interfaces/Category';
import { Cocktail } from './interfaces/Cocktail';
import { Filter } from './interfaces/Filter';
import { Glass } from './interfaces/Glass';
import { Ingredient } from './interfaces/Ingredient';

export function updateFilteredCocktails(
  existingCocktails: Cocktail[],
  fetchedCocktails: Cocktail[] | undefined,
  requestType: string
): Cocktail[] {
  if (!fetchedCocktails) return existingCocktails.slice();
  if (requestType === 'add') {
    let newExistingCocktails = existingCocktails.slice();
    let helperFetchedArr = fetchedCocktails.slice();
    if (newExistingCocktails.length) {
      for (let j = 0; j < newExistingCocktails.length; j++) {
        for (let i = 0; i < fetchedCocktails.length; i++) {
          if (newExistingCocktails[j].idDrink === fetchedCocktails[i].idDrink) {
            newExistingCocktails[j].matchedIngredients =
              +(newExistingCocktails[j].matchedIngredients ?? 0) + 1 + '';
            helperFetchedArr.splice(i, 1);
          }
        }
      }
      for (let i = 0; i < helperFetchedArr.length; i++) {
        helperFetchedArr[i].matchedIngredients = '1';
        newExistingCocktails.push(helperFetchedArr[i]);
      }
    } else {
      for (let i = 0; i < fetchedCocktails.length; i++) {
        fetchedCocktails[i].matchedIngredients = '1';
      }
      newExistingCocktails = fetchedCocktails;
    }
    function compareMatchedIngredients(a: Cocktail, b: Cocktail) {
      return +(b.matchedIngredients ?? 0) - +(a.matchedIngredients ?? 0);
    }
    newExistingCocktails.sort(compareMatchedIngredients);
    return newExistingCocktails;
  }
  if (requestType === 'remove') {
    for (let j = 0; j < fetchedCocktails.length; j++) {
      for (let i = 0; i < existingCocktails.length; i++) {
        if (existingCocktails[i].idDrink === fetchedCocktails[j].idDrink) {
          existingCocktails[i].matchedIngredients =
            +(existingCocktails[i].matchedIngredients ?? 0) - 1 + '';
          if (existingCocktails[i].matchedIngredients === '0') {
            existingCocktails.splice(i, 1);
          }
        }
      }
    }
    const newExistingCocktails = existingCocktails.slice();
    console.log(newExistingCocktails);
    return newExistingCocktails;
  }

  return existingCocktails;
}

type drinksType = Ingredient | Category | Glass | Filter | Cocktail;

export function returnValues(array: drinksType[]): string[] {
  return array.map((item) => {
    const values = Object.values(item);
    if (values.length > 0) {
      const value = values[0];
      if (typeof value === 'string') {
        return value;
      }
    }
    throw new Error('No valid string property found in object.');
  });
}

const rootUrl = 'https://thecocktaildb.com/api/json/v2/9973533';

async function formatCocktail(cocktail: any): Promise<Cocktail> {
  const formattedCocktail: Cocktail = {
    idDrink: cocktail.idDrink,
    ingredients: [],
    measures: []
  };

  for (let key in cocktail) {
    if (key.startsWith('strIngredient')) {
      const ingredient = cocktail[key];
      if (ingredient) {
        formattedCocktail.ingredients.push(ingredient);
      }
    } else if (key.startsWith('strMeasure')) {
      const measure = cocktail[key];
      if (measure) formattedCocktail.measures.push(measure);
    } else if (key.startsWith('str')) {
      let camelCaseKey = key.replace(/^str/, '');
      camelCaseKey =
        camelCaseKey.charAt(0).toLowerCase() + camelCaseKey.slice(1);
      const value = cocktail[key];
      if (value !== null) {
        formattedCocktail[camelCaseKey as keyof Cocktail] = value;
      }
    }
  }
  return formattedCocktail;
}

export async function getCocktails(url: string) {
  try {
    const res = await fetch(`${rootUrl}/${url}`);
    const data = await res.json();

    if (data.drinks && data.drinks.length === 1) {
      return await formatCocktail(data.drinks[0]);
    } else if (data.drinks === 'None Found') {
      return [];
    } else if (data.drinks && data.drinks.length > 1) {
      const cocktails: Cocktail[] = await Promise.all(
        data.drinks.map((cocktail: any) => formatCocktail(cocktail))
      );
      return cocktails;
    } else {
      return [];
    }
  } catch (err) {
    console.log('Error fetching random cocktail:', err);
    throw err;
  }
}
