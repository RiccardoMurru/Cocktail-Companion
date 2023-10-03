export interface Cocktail {
  idDrink: string;
  drink?: string;
  drinkAlternate?: string;
  tags?: string;
  video?: string;
  category?: string;
  iba?: string;
  alcoholic?: string;
  glass?: string;
  instructions?: string;
  instructionsES?: string;
  instructionsDE?: string;
  instructionsFR?: string;
  instructionsIT?: string;
  'instructionsZH-HANS'?: string;
  'instructionsZH-HANT'?: string;
  drinkThumb?: string;
  ingredients: string[];
  measures: string[];
  imageSource?: string;
  imageAttribution?: string;
  creativeCommonsConfirmed?: string;
  dateModified?: string;
  matchedIngredients?: string;
}
