import axios from 'axios';
import mongoose, { ConnectOptions } from 'mongoose';
import CocktailModel from '../models/cocktai';

async function formatCocktail(cocktail: any) {
  const formattedCocktail: any = {
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
        formattedCocktail[camelCaseKey] = value;
      }
    }
  }

  return formattedCocktail;
}

async function importAndSaveCocktails() {
  await mongoose
    .connect('mongodb://127.0.0.1:27017/cocktail-companion', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    } as ConnectOptions)
    .then(() => {
      console.log('Connected to MongoDB');

      const alphabet = 'abcdefghijklmnopqrstuvwxyz123456789';

      for (const char of alphabet) {
        axios
          .get(
            `https://www.thecocktaildb.com/api/json/v2/9973533/search.php?f=${char}`
          )
          .then(async (response) => {
            const drinks = response.data.drinks;

            if (drinks && drinks.length > 0) {
              const formattedCocktails = await Promise.all(
                drinks.map(async (drink: any) => await formatCocktail(drink))
              );

              try {
                await CocktailModel.insertMany(formattedCocktails);
                console.log(
                  `Cocktails data for character '${char}' saved successfully`
                );
              } catch (error) {
                console.error(
                  `Error saving cocktails data for character '${char}':`,
                  error
                );
              }
            } else {
              console.log(
                `No cocktails data for character '${char}' to import`
              );
            }
          })
          .catch((error) => {
            console.error(
              `Error fetching data for character '${char}' from the API:`,
              error
            );
          });
      }
    })
    .catch((error) => {
      console.error('Error connecting to MongoDB:', error);
    });
}

importAndSaveCocktails();
