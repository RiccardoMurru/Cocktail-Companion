const rootUrl = 'https://thecocktaildb.com/api/json/v2/9973533'

export async function getAllIngredients () {
  try {
    const res = await fetch(`https://www.thecocktaildb.com/api/json/v2/9973533/list.php?i=list`)
    const handledResponse = await res.json()
    const arrayOfIngredients = handledResponse.drinks.map(ingObject => ingObject.strIngredient1)
    return arrayOfIngredients
  }catch(err){
    console.log('Get all ingredients failed')
  }
}

export async function getAllCategories () {
  try {
    const res = await fetch(`${rootUrl}/list.php?c=list`)
    const handledResponse = await res.json()
    const arrayOfCategories = handledResponse.drinks.map(ingObject => ingObject.strCategory)
    return arrayOfCategories
  }catch(err){
    console.log('Get all categories failed')
  }
}

export async function getAllGlassTypes () {
  try {
    const dbArray = await fetch(`${rootUrl}/list.php?g=list`)
  const arrayOfGlassTypes = dbArray.map(ingObject => ingObject.strGlass)
  return arrayOfGlassTypes
  }catch(err){
    console.log('Get all glass types failed')
  }
}

export async function getRandomCocktails () {
  try {
    const randomCocktails = await fetch(`${rootUrl}/randomselection.php`)
    const relevantDataArr = randomCocktails.map(cocktail => {
    const slimmedCocktail = {}
    for (let key in cocktail) {
      if(cocktail[key] !== null) slimmedCocktail[key] = cocktail[key]
    }
    return slimmedCocktail
  })
  return relevantDataArr
  }catch(err){
    console.log('Get random cocktails failed')
  }
}

export async function getCocktailByIngredient (ingredient) {
  try {
    const res = await fetch(`${rootUrl}/filter.php?i=${ingredient}`)
    const cocktails = await res.json()
    return cocktails.drinks
  } catch(err){
    console.log('Get cocktails by ingredient failed')
  }
}

export async function getCocktailById(id){
  try {
    const res = await fetch(`${rootUrl}/lookup.php?i=${id}`)
    const allCocktailInfo = await res.json()
    const relevantCocktailInfo = {}
    const cocktail = allCocktailInfo.drinks[0]
    for (let key in cocktail) {
      if(cocktail[key] !== null) relevantCocktailInfo[key] = cocktail[key]
    }
    // console.log(relevantCocktailInfo)
    return relevantCocktailInfo
  } catch(err) {
    console.log('Failed to fetch cocktail by id')
  }
}
