import { User } from './User';
import { Ingredient } from './Ingredient';
import { Cocktail } from './Cocktail';

export interface PageProps {
  className?: string;
  user?: User;
  setUser?: React.Dispatch<React.SetStateAction<User>>;
  page?: string;
  setPage?: React.Dispatch<React.SetStateAction<string>>;
}

export interface NavbarProps {
  handleAddToSelected: (ingredient: Ingredient) => void;
  ingredients: Ingredient[];
}

export interface CocktailProps extends PageProps {
  cocktail: Cocktail;
  selectedIngs: Ingredient[];
  handleRemoveFromFavourites: (user: User, idDrink: string) => void;
}

export interface CocktailListProps extends PageProps {
  cocktails: Cocktail[];
  selectedIngs: Ingredient[];
}

