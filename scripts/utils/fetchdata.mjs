// Import loading spinners, error message
import { displayErrorMessage } from "./errorUserMessage.mjs";
import { showLoadingSpinner, hideLoadingSpinner } from "./loadingSpinner.mjs";

export const api_url = "https://api.noroff.dev/api/v1/gamehub";

// Fetch product data
export async function getProducts() {
  showLoadingSpinner();
  try {
    const response = await fetch(api_url);
    if (!response.ok) {
      displayErrorMessage(`Http error: ${response.status}. Try refreshing the page or check your network.`);
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const products = await response.json();
    return products;
  } catch (error) {
    displayErrorMessage("We're having trouble fetching the products. Please try again later.");
    console.error("Error fetching products:", error);
    return [];
  } finally {
    hideLoadingSpinner();
  }
}
