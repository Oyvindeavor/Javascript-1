// Fetch
import { api_url, fetchData } from "../utils/fetchdata.mjs";

// Add class to element, create class.
import { displayProduct } from "../utils/domUtils.mjs";


// Gets the ID from the url
export function getIdFromUrl() {
  const filterUrl = new URLSearchParams(window.location.search);
  const productId = filterUrl.get("productId");
  console.log(productId);
  return productId;
}

async function getAndDisplayProduct() {
  try {
    const productId = getIdFromUrl();
    if (!productId) {
      throw new Error('Product ID not found in URL');
    }
    const product = await fetchData(`${api_url}/${productId}`);
    if (!product) {
      throw new Error('Product data not found');
    }
    displayProduct(product);
  } catch (error) {
    console.error("Error fetching or displaying product:", error);
  }
}


getAndDisplayProduct();



