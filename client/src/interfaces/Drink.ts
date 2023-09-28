import { Ingredient } from './Ingredient';
import { Glass } from './Glass';
import { Category } from './Category';
import { Filter } from './Filter';
import { Cocktail } from './Cocktail';

export interface Drinks {
  drinks: Ingredient[] | Glass[] | Category[] | Filter[] | Cocktail[];
}
