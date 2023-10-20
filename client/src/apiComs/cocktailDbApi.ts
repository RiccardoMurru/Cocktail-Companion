import { getCocktails, returnValues } from '../helpers';
import { Drinks } from '../interfaces/Drink';

const rootUrl = import.meta.env.VITE_API_URL;

export async function getAllIngredients() {
  try {
    const res = await fetch(`${rootUrl}/list.php?i=list`);
    const handledResponse: Drinks = await res.json();
    return returnValues(handledResponse.drinks);
  } catch (err) {
    console.log('Get all ingredients failed');
    throw err;
  }
}

export async function getRandomCocktail() {
  return getCocktails('random.php');
}

export async function getCocktailByIngredient(ingredient: string) {
  return getCocktails(`filter.php?i=${ingredient}`);
}

export async function getCocktailById(id: string) {
  return getCocktails(`lookup.php?i=${id}`);
}
