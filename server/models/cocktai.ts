import mongoose from '../db';

const cocktailSchema = new mongoose.Schema({
  idDrink: String,
  drink: String,
  drinkAlternate: String,
  tags: String,
  video: String,
  category: String,
  iba: String,
  alcoholic: String,
  glass: String,
  instructions: String,
  instructionsES: String,
  instructionsDE: String,
  instructionsFR: String,
  instructionsIT: String,
  instructionsZH_HANS: String,
  instructionsZH_HANT: String,
  drinkThumb: String,
  ingredients: [String],
  measures: [String],
  imageSource: String,
  imageAttribution: String,
  creativeCommonsConfirmed: String,
  dateModified: String,
  matchedIngredients: String
});

const CocktailModel = mongoose.model('Cocktail', cocktailSchema);

export default CocktailModel;
