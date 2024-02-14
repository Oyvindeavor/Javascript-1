"use strict";

const api_url = "https://api.noroff.dev/api/v1/gamehub";

// Function to fetch data from the API
async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching data from API:", error.message);
  }
}

export { fetchData, api_url };

