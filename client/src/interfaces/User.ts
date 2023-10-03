export interface User {
  username: string;
  password?: string;
  token?: string;
  favourites?: number[];
  ingredients?: string[];
}
