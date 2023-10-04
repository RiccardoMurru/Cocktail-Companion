import { Cocktail } from "./Cocktail";

export interface MostLikedDrinks extends Cocktail{
  _id: string;
  likeCount: number
}

