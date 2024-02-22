"use strict";

import { showLoadingSpinner } from "./loadingSpinner.mjs";
import { hideLoadingSpinner } from "./loadingSpinner.mjs";

export const api_url = "https://api.noroff.dev/api/v1/gamehub";

// Fetch product data
export async function getProducts() {
  showLoadingSpinner(); 
  try {
    const response = await fetch(api_url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const products = await response.json();
    return products; 
  } catch (error) {
    console.error("Error fetching products:", error.message);
    return []; // return empty to not get undefined error
  } finally {
    hideLoadingSpinner(); 
  }
}