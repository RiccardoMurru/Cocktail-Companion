import { User } from './User';
import { Ingredient } from './Ingredient';
import { Cocktail } from './Cocktail';
import { Category } from './Category';

export interface PageProps {
  className?: string;
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  page: string;
  setPage: React.Dispatch<React.SetStateAction<string>>;
}

export interface NavbarProps {
  className: string;
  handleAddToSelected: (ingredient: Ingredient) => void;
  ingredients: Ingredient[];
  selectedIngs: Ingredient[];
  categories: Category[];
}

export interface CocktailProps {
  cocktail: Cocktail;
  selectedIngs?: Ingredient[];
  handleRemoveFromFavourites?: (user: User, idDrink: string) => void;
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  page: string;
  setPage: React.Dispatch<React.SetStateAction<string>>;
}

export interface CocktailListProps extends PageProps {
  setPage: React.Dispatch<React.SetStateAction<string>>;
  cocktails: Cocktail[];
  selectedIngs: Ingredient[];
}

export interface MyIngredientsProps {
  className: string;
  setIngredients: React.Dispatch<React.SetStateAction<Ingredient[]>>;
  selectedIngs: Ingredient[];
  setSelectedIngs: React.Dispatch<React.SetStateAction<Ingredient[]>>;
  handleRemoveFromSelected: (ingredient: Ingredient) => Promise<void>;
}
