import { getCocktails, returnValues } from '../helpers';
import { Category } from '../interfaces/Category';
import { Drinks } from '../interfaces/Drink';
import { Glass } from '../interfaces/Glass';
import { Ingredient } from '../interfaces/Ingredient';

const rootUrl = 'https://thecocktaildb.com/api/json/v2/9973533';
export function isPositive(n: number) {
  return n > 0;
}
export async function getAllIngredients() {
  try {
    const res = await fetch(
      `https://www.thecocktaildb.com/api/json/v2/9973533/list.php?i=list`
    );
    const handledResponse: Drinks = await res.json();
    return returnValues(handledResponse.drinks);
  } catch (err) {
    console.log('Get all ingredients failed');
    throw err;
  }
}

export async function getAllCategories() {
  try {
    const res = await fetch(`${rootUrl}/list.php?c=list`);
    const handledResponse: Drinks = await res.json();
    return returnValues(handledResponse.drinks);
  } catch (err) {
    console.log('Get all categories failed');
  }
}

export async function getAllGlassTypes() {
  try {
    const dbArray = await fetch(`${rootUrl}/list.php?g=list`);
    const handledResponse: Drinks = await dbArray.json();
    return returnValues(handledResponse.drinks);
  } catch (err) {
    console.log('Get all glass types failed');
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
