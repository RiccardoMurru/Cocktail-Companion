export interface User {
  username: string,
  password: string,
  favourites?: number[],
  ingredients?: string[]
}