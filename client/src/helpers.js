
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
    console.log('Cocktails state variable', newExistingCocktails)
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
            console.log('MATCHED INGREDIENTS', existingCocktails[i].matchedIngredients)
            existingCocktails.splice(i,1)
          }
        }
      }
    }
    const newExistingCocktails = existingCocktails.slice()
    console.log('new existing cocktails in helpers', newExistingCocktails)
    return newExistingCocktails
  }
}





    

