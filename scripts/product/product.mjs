// Fetch
import { api_url, fetchData } from "../utils/fetchdata.mjs";

// Add class to element, create class.
import { displayProduct } from "../utils/domUtils.mjs";

// Gets the ID from the url
function getIdFromUrl() {
  const filterUrl = new URLSearchParams(window.location.search);
  const productId = filterUrl.get("productId");
  return productId;
}

async function getAndDisplayProduct() {
  try {
    const productId = getIdFromUrl();
    const product = await fetchData(`${api_url}/${productId}`);
    displayProduct(product);
  } catch (error) {
    console.error("Error fetching the data, error code: ", error);
  }
}

getAndDisplayProduct();
