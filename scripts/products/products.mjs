import { api_url, fetchData } from "../utils/fetchdata.mjs";
import { displayAllProducts } from "../utils/domUtils.mjs";


async function getAndDisplayAllProducts() {
  try {
    const allProducts = await fetchData(api_url);
    displayAllProducts(allProducts);
    console.log(allProducts.genre);
  } catch (error) {
    console.error("Unable to get items", error.message);
  }
}

getAndDisplayAllProducts();
