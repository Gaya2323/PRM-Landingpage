
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

// Lägger till Additional Service
export interface AdditionalServiceSpec {
  additionalServiceEntryId: number
  additionalServiceId: string
  additionalServiceName: string
  productId: string
  issuerCode: string
  destinationFrom: string
  destinationTo: string
  weightUnit: string
  dimensionUnit: string
  weightFrom: number | null
  weightTo: number | null
  maxLength: number | null
  maxHeight: number | null
  maxDept: number | null
  maxCircumference: number | null
  minLength: number | null
  minHeight: number | null
  minDept: number | null 
}

// Lägg fetchAdditional SErvice funktion
export async function fetchAdditionalServices(
  productId: string
): Promise<AdditionalServiceSpec[]> {
  const res = await fetch(`http://localhost:8080/api/additional-services/${productId}`)
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json()
}