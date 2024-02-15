"use strict";

import { showLoadingSpinner } from "./loadingSpinner.mjs";
import { hideLoadingSpinner } from "./loadingSpinner.mjs";

export const api_url = "https://api.noroff.dev/api/v1/gamehub";

// Function to fetch data from the API
export async function fetchData(url) {
  try {
    showLoadingSpinner();
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    hideLoadingSpinner();
    return response.json();
  } catch (error) {
    console.error("Error fetching data from API:", error.message);
  }
}



