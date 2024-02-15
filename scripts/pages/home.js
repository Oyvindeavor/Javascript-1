"use strict";
import { displaySaleItems } from "../utils/domUtils.mjs";
import { fetchData, api_url } from "../utils/fetchdata.mjs";

/**
 * Retrieves sale items from the API and displays them
 * @returns {Promise<void>} A Promise that resolves when the sale items are displayed.
 * @throws {Error} Throws an error if there is a problem retrieving or displaying the sale items.
 */
async function getAndDisplaySaleItems() {
  try {
    const productsOnSale = await fetchData(api_url);

    if (productsOnSale) {
      displaySaleItems(productsOnSale);
    } else {
      console.log("No sale items found.");
    }
  } catch (error) {
    console.error("Unable to get sale items:", error);
  }
}

// Execute the function to get and display sale items
getAndDisplaySaleItems();
