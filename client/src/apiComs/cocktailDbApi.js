const rootUrl = 'www.thecocktaildb.com/api/json/v2/9973533'

export async function getAllIngredients () {
  try {
    const dbArray = await fetch(`${rootUrl}/list.php?i=list`,{
      method: 'GET',
      credentials: 'include',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
  })
  const arrayOfIngredients = dbArray.map(ingObject => ingObject.strIngredient1)
  return arrayOfIngredients
  }catch(err){
    console.log('Get all ingredients failed')
  }
}

export async function getAllCategories () {
  try {
    const dbArray = await fetch(`${rootUrl}/list.php?c=list`,{
      method: 'GET',
      credentials: 'include',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
  })
  const arrayOfCategories = dbArray.map(ingObject => ingObject.strCategory)
  return arrayOfCategories
  }catch(err){
    console.log('Get all categories failed')
  }
}

export async function getAllGlassTypes () {
  try {
    const dbArray = await fetch(`${rootUrl}/list.php?g=list`,{
      method: 'GET',
      credentials: 'include',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
  })
  const arrayOfGlassTypes = dbArray.map(ingObject => ingObject.strGlass)
  return arrayOfGlassTypes
  }catch(err){
    console.log('Get all glass types failed')
  }
}

export async function getRandomCocktails () {
  try {
    const randomCocktails = await fetch(`${rootUrl}/randomselection.php`, {
      method: 'GET',
      credentials:'include',
      mode: 'cors',
      headers: {'Content-Type':'application/json'}
  })
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
    const cocktails = await fetch(`${rootUrl}/filter.php?i=${ingredient}`, {
      method: 'GET',
      credentials:'include',
      mode: 'cors',
      headers: {'Content-Type':'application/json'}
    })
    return cocktails
  } catch(err){
    console.log('Get cocktails by ingredient failed')
  }
}

export async function getCocktailById(id){
  try {
    const cocktail = await fetch(`${rootUrl}/lookup.php?i=${id}`, {
      method: 'GET',
      credentials:'include',
      mode: 'cors',
      headers: {'Content-Type':'application/json'}
    })
    const relevantCocktailInfo = {}
    for (let key in cocktail) {
      if(cocktail[key] !== null) relevantCocktailInfo[key] = cocktail[key]
    }
    return relevantCocktailInfo
  } catch(err) {
    console.log('Failed to fetch cocktail by id')
  }
}
