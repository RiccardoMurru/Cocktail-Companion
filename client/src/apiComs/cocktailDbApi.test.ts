
import fetchMock from 'jest-fetch-mock';
import { getAllIngredients } from './cocktailDbApi'; 
fetchMock.enableMocks();

describe('getAllIngredients', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('fetches data from API and returns an array of ingredients', async () => {
    const mockResponse = {
      drinks: [
        { strIngredient1: 'Vodka' },
        { strIngredient1: 'Gin' },
        { strIngredient1: 'Rum' },
      ],
    };

    fetchMock.mockResponseOnce(JSON.stringify(mockResponse));

    const result = await getAllIngredients();

    if (result) {
      expect(Array.isArray(result)).toBe(true);

      result.forEach(ingredient => {
        expect(ingredient).toEqual(expect.objectContaining({ strIngredient1: expect.any(String) }));
      });
    }
   
    expect(fetchMock).toHaveBeenCalledWith(
      'https://www.thecocktaildb.com/api/json/v2/9973533/list.php?i=list'
    );
  });

  
});


import { getAllCategories } from "./cocktailDbApi";

 describe ('getAllCategories', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it ('fetches data from API and returns an array of categories', async () => {
    const mockResponse = {
      drinks: [
        { strCategories: "Ordinary Drink" },
        { strCategories: 'Shake' },
        { strCategories: 'Other / Unknown' },
      ],
    };
    fetchMock.mockResponseOnce(JSON.stringify(mockResponse));

    const result = await getAllCategories();


    if (result) {
      expect(Array.isArray(result)).toBe(true);

      result.forEach(ingredient => {
        expect(ingredient).toEqual(expect.objectContaining({ strCategories: expect.any(String) }));
      });
    }
    expect(fetchMock).toHaveBeenCalledWith(
      'https://thecocktaildb.com/api/json/v2/9973533/list.php?c=list'
    );
  })
 })

 import { getCocktailByIngredient } from './cocktailDbApi';

 fetchMock.enableMocks();
 
 describe('getCocktailByIngredient', () => {
   beforeEach(() => {
     fetchMock.resetMocks();
   });
 
   it('fetches cocktails by ingredient from API', async () => {
     const ingredient = { strIngredient1: 'Vodka' };
     const mockResponse = {
       drinks: [
        {strDrink: '155 Belmont', strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/yqvvqs1475667388.jpg', idDrink: '15346',matchedIngredients: '1'},
        {strDrink: '3-Mile Long Island Iced Tea', strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/rrtssw1472668972.jpg', idDrink: '15300', matchedIngredients: '1'},
        {strDrink: '501 Blue', strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/ywxwqs1461867097.jpg', idDrink: '17105', matchedIngredients: '1'}
       ],
     };
 
     const rootUrl = 'https://thecocktaildb.com/api/json/v2/9973533';
 
     fetchMock.mockResponseOnce(JSON.stringify(mockResponse));
 
     const result = await getCocktailByIngredient(ingredient);
     
     if (result) {
       // Check if the function fetches data from the API with the correct URL
     expect(fetchMock).toHaveBeenCalledWith(`${rootUrl}/filter.php?i=${ingredient.strIngredient1}`);
 
     // Check if the result is an array of cocktails
     expect(Array.isArray(result)).toBe(true);
 
     // Check if each cocktail in the result has the expected format
     result.forEach(cocktail => {
       expect(cocktail).toEqual(expect.objectContaining({ strDrink: expect.any(String) }));
     });
     }
    
   });
 });
 