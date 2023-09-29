import CocktailList from '../components/CocktailList';
import { Category } from '../interfaces/Category';
import { Cocktail } from '../interfaces/Cocktail';
import { Drinks } from '../interfaces/Drink';
import { Glass } from '../interfaces/Glass';
import { Ingredient } from '../interfaces/Ingredient';

const rootUrl = 'https://thecocktaildb.com/api/json/v2/9973533';

export async function getAllIngredients() {
  try {
    const res = await fetch(
      `https://www.thecocktaildb.com/api/json/v2/9973533/list.php?i=list`
    );
    const handledResponse: Drinks = await res.json();
    const arrayOfIngredients: Ingredient[] = handledResponse.drinks.filter(
      (ingredient): ingredient is Ingredient => 'strIngredient1' in ingredient
    );
    return arrayOfIngredients;
  } catch (err) {
    console.log('Get all ingredients failed');
  }
}

export async function getAllCategories() {
  try {
    const res = await fetch(`${rootUrl}/list.php?c=list`);
    const handledResponse: Drinks = await res.json();
    const arrayOfCategories: Category[] = handledResponse.drinks.filter(
      (category): category is Category => 'strCategory' in category
    );
    return arrayOfCategories;
  } catch (err) {
    console.log('Get all categories failed');
  }
}

export async function getAllGlassTypes() {
  try {
    const dbArray = await fetch(`${rootUrl}/list.php?g=list`);
    const handledResponse: Drinks = await dbArray.json();
    const arrayOfGlassTypes: Glass[] = handledResponse.drinks.filter(
      (glass): glass is Glass => 'strGlass' in glass
    );
    return arrayOfGlassTypes;
  } catch (err) {
    console.log('Get all glass types failed');
  }
}

export async function getRandomCocktails() {
  try {
    const randomCocktails = await fetch(`${rootUrl}/randomselection.php`);
    const res: Drinks = await randomCocktails.json();
    const relevantDataArr = res.drinks
      .filter((cocktail): cocktail is Cocktail => 'strDrink' in cocktail)
      .map((cocktail) => {
        const slimmedCocktail: Cocktail = {
          idDrink: '',
          strDrink: '',
          strCategory: '',
          strAlcoholic: '',
          strGlass: ''
        };
        for (let key in cocktail) {
          const typedKey = key as keyof Cocktail;
          const value = cocktail[typedKey];
          if (value) slimmedCocktail[typedKey] = value;
        }
        return slimmedCocktail;
      });
    return relevantDataArr;
  } catch (err) {
    console.log('Get random cocktails failed');
  }
}

export async function getCocktailByIngredient(ingredient: Ingredient) {
  try {
    const res = await fetch(
      `${rootUrl}/filter.php?i=${ingredient.strIngredient1}`
    );
    const cocktails: Drinks = await res.json();
    const relevantDataArr = cocktails.drinks
      .filter((cocktail): cocktail is Cocktail => 'strDrink' in cocktail)
      .map((cocktail) => {
        const slimmedCocktail: Cocktail = {
          idDrink: '',
          strDrink: '',
          strCategory: '',
          strAlcoholic: '',
          strGlass: ''
        };
        for (let key in cocktail) {
          const typedKey = key as keyof Cocktail;
          const value = cocktail[typedKey];
          if (value) slimmedCocktail[typedKey] = value;
        }
        return slimmedCocktail;
      });
    return relevantDataArr;
  } catch (err) {
    console.log('Get cocktails by ingredient failed');
  }
}

export async function getCocktailById(id: string | undefined) {
  try {
    const res = await fetch(`${rootUrl}/lookup.php?i=${id}`);
    const allCocktailInfo: Drinks = await res.json();
    const relevantCocktailInfo: Cocktail = {
      idDrink: '',
      strDrink: '',
      strCategory: '',
      strAlcoholic: '',
      strGlass: ''
    };
    const cocktail: Cocktail = allCocktailInfo.drinks[0] as Cocktail;
    for (let key in cocktail) {
      const typedKey = key as keyof Cocktail;
      const value = cocktail[typedKey];
      if (value) relevantCocktailInfo[typedKey] = value;
    }
    return relevantCocktailInfo;
  } catch (err) {
    console.log('Failed to fetch cocktail by id');
  }
}
