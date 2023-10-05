import { Request, Response } from 'express';
import CocktailModel from '../models/cocktail';

export async function getCocktails(req: Request, res: Response) {
  try {
    const cocktailsData = await CocktailModel.find();
    if (cocktailsData) {
      res.status(200).send(cocktailsData);
    }
  } catch (err) {
    res.status(500);
    console.log(err);
  }
}
