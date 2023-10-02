import { User } from './User';
import { Cocktail } from './Cocktail';
import { Ingredient } from './Ingredient';

export interface PageProps {
  className?: string;
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  page: string;
  setPage: React.Dispatch<React.SetStateAction<string>>;
}

export interface NavbarProps {
  className: string;
  ingList: string[];
  setIngList: React.Dispatch<React.SetStateAction<string[]>>;
  setCocktails: React.Dispatch<React.SetStateAction<Cocktail[]>>;
  cocktails: Cocktail[];
  ingredients: string[];
  setIngredients: React.Dispatch<React.SetStateAction<string[]>>;
}

export interface CocktailProps {
  cocktail: Cocktail;
  selectedIngs?: string[];
  handleRemoveFromFavourites?: (user: User, idDrink: string) => void;
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  page: string;
  setPage: React.Dispatch<React.SetStateAction<string>>;
}

export interface CocktailListProps extends PageProps {
  setPage: React.Dispatch<React.SetStateAction<string>>;
  cocktails: Cocktail[];
  selectedIngs: string[];
}

export interface MyIngredientsProps {
  selectedIngs: string[];
  handleRemoveFromSelected: (ingredient: string) => Promise<void>;
}
