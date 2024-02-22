// Import loading spinners 
import { showLoadingSpinner, hideLoadingSpinner } from "./loadingSpinner.mjs";


export const api_url = "https://api.noroff.dev/api/v1/gamehub";

// Fetch product data
export async function getProducts() {
  // Start the loading spinner first 
  showLoadingSpinner(); 
  try {
    // Fetch, throw an error if the response fail
    const response = await fetch(api_url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    // Get back the data in JSON
    const products = await response.json();
    // Return it so i can reuse it 
    return products; 
  } catch (error) {
    console.error("Error fetching products:", error.message);
    return []; // return empty to not get undefined error
  } finally {
    // At the end when all is done hide the loading spinner
    hideLoadingSpinner(); 
  }
}