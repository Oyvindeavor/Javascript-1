"use strict";
import { displaySaleItems } from "./utils/domUtils.mjs";
import { fetchData, api_url } from "./utils/fetchdata.mjs";

// Function to fetch sale items > then appends the data to the dom
async function getAndDisplaySaleItems() {
  try {
    const productsOnSale = await fetchData(api_url);

    if (productsOnSale) {
      displaySaleItems(productsOnSale);
    } else {
      console.log("No sale items found.");
    }
  } catch (error) {
    console.error("Unable to get sale items:", error.message);
  }
}

// Execute the function to get and display sale items
getAndDisplaySaleItems();
