import { User } from './User';
import { Cocktail } from './Cocktail';

export interface PageProps {
  className?: string;
  page: string;
  setPage: React.Dispatch<React.SetStateAction<string>>;
}

export interface NavbarProps {
  className: string;
  handleAddToSelected: (ingredient: string) => void;
  ingredients: string[];
  selectedIngs: string[];
  ingList: string[];
  setIngList: React.Dispatch<React.SetStateAction<string[]>>;
  categories: string[];
}

export interface CocktailProps {
  cocktail: Cocktail;
  selectedIngs?: string[];
  handleRemoveFromFavourites?: (idDrink: string) => void;
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
