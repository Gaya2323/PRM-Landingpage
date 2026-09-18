
const BASE_URL =  'http://localhost:8080/api'

//To Country
export async function fetchToCountries(){
    const response = await fetch(`${BASE_URL}/toCountries`)
    if(!response.ok) throw new Error(`API-fel: ` + response.status)
        return response.json()
}

//From Country
export async function fetchFromCountries(){
    const response = await fetch(`${BASE_URL}/fromCountries`)
    if(!response.ok) throw new Error(`API-fel: ` + response.status)
        return response.json()
}

//Issuers
export async function fetchIssuers() {
    const response = await fetch(`${BASE_URL}/issuers`)
    if(!response.ok) throw new Error ('API-fel: ' + response.status)
    return response.json()
}

//Product Category
export async function fetchProductCategories(){
    const response = await fetch(`${BASE_URL}/categories`)
    if(!response.ok) throw new Error ('APK-fel: ' + response.status)
        return response.json()
}

//hämtar info beroende vad filter-är vald
export async function fetchProductsByCategory(categoryId:number){
    const response = await fetch(`${BASE_URL}/products/category/${categoryId}`)
    if(!response.ok) throw new Error('API-fel: '+ response.status)
        return response.json()
}

export async function fetchAllProducts() {
  const response = await fetch(`${BASE_URL}/products`)
  if (!response.ok) throw new Error('API-fel: ' + response.status)
  return response.json()
}
export async function fetchProductEntries(){
    const response = await fetch(`${BASE_URL}/product-entries`)
    if (!response.ok) throw new Error('API-fel: ' + response.status)
    return response.json()
}