
let mocksFetched = [
  {
    idDrink: 2
  },
  {
    idDrink: 1
  },
  {
    idDrink: 3
  },
  {
    idDrink: 4
  },
  { 
    idDrink: 5
  }
]

let mocksExist = [
  {
    idDrink:2,
    matchedIngredients:1
  }
]


export function updateFilteredCocktails (existingCocktails, fetchedCocktails) {
  if(existingCocktails.length){
    for (let i=0; i<fetchedCocktails.length; i++){
      for(let j=0; j<existingCocktails.length; j++) {
        if(existingCocktails[j].idDrink === fetchedCocktails[i].idDrink){
        
          existingCocktails[j].matchedIngredients++

        }  else {
          fetchedCocktails[i].matchedIngredients = 1
          existingCocktails.push(fetchedCocktails[i])
        }
      }
    }
  } else {
    for (let i=0; i<fetchedCocktails.length; i++) {
      fetchedCocktails[i].matchedIngredients = 1
    }
    existingCocktails = fetchedCocktails
  }
  function compareMatchedIngredients(a,b) {
    return b.matchedIngredients - a.matchedIngredients
  }
  existingCocktails.sort(compareMatchedIngredients)
  return existingCocktails.slice()
}

console.log(updateFilteredCocktails(mocksExist, mocksFetched))




    

