
//This function takes checks how many times a cocktail has appeared in searches, gives a count and orders
//based on that count, as well as the reverse when removing ingredients from selected ingredients
//for example, if you search vodka, lime juice and orange juice, any cocktail that contains all three
//will be at the top of the list and will be rendered first, followed by cocktails that match two etc

export function updateFilteredCocktails (existingCocktails, fetchedCocktails, requestType) {
  if(!fetchedCocktails) return existingCocktails.slice()
  if(requestType === 'add'){
    let newExistingCocktails = existingCocktails.slice()
    let helperFetchedArr = fetchedCocktails.slice()
    if(newExistingCocktails.length){
      for (let j=0; j<newExistingCocktails.length; j++){
        for(let i=0; i<fetchedCocktails.length; i++) {
          if(newExistingCocktails[j].idDrink === fetchedCocktails[i].idDrink){
            newExistingCocktails[j].matchedIngredients++
            helperFetchedArr.splice(i,1)
        }
      }
    }
    for (let i=0; i<helperFetchedArr.length; i++){
      helperFetchedArr[i].matchedIngredients = 1
      newExistingCocktails.push(helperFetchedArr[i])
    }
    } else {
      for (let i=0; i<fetchedCocktails.length; i++) {
        fetchedCocktails[i].matchedIngredients = 1
      }
      newExistingCocktails = fetchedCocktails
    }

    function compareMatchedIngredients(a,b) {
      return b.matchedIngredients - a.matchedIngredients
    }
    newExistingCocktails.sort(compareMatchedIngredients)
    return newExistingCocktails
  }
  if(requestType === 'remove'){
    console.log('existing cocktails in helpers', existingCocktails)
    console.log('fetched list', fetchedCocktails)
    for(let j=0; j<fetchedCocktails.length; j++) {
      for(let i=0; i<existingCocktails.length; i++) {
        if(existingCocktails[i].idDrink === fetchedCocktails[j].idDrink) {
          existingCocktails[i].matchedIngredients--;
          if(existingCocktails[i].matchedIngredients === 0){
            existingCocktails.splice(i,1)
          }
        }
      }
    }
    const newExistingCocktails = existingCocktails.slice()
    return newExistingCocktails
  }
}





    

