
import { updateCartIcon } from "../scripts/utils/Cart.mjs";
import { getProducts } from "../scripts/utils/fetchdata.mjs";
import { createClass,createElement } from "../scripts/utils/domUtils.mjs";
import { addToCart } from "../scripts/utils/Cart.mjs";
// Gets the ID from the url
export function getIdFromUrl() {
  const filterUrl = new URLSearchParams(window.location.search);
  const productId = filterUrl.get("productId");
  return productId;
}

// Function to generate product HTML
function generateProductDisplay(product) {
  const productContainer = createClass(createElement("div"), "product-page-container");

  const productImageContainer = createClass(createElement("div"), "product-page-image");
  productImageContainer.appendChild(createElement("img")).src = product.image;
  productImageContainer.querySelector("img").alt = product.title;

  const productDetails = createClass(createElement("div"), "product-page-details");
  productDetails.appendChild(createClass(createElement("h1"), "product-page-title")).textContent = product.title;
  productDetails.appendChild(createClass(createElement("p"), "product-page-description")).textContent = product.description;
  productDetails.appendChild(createClass(createElement("p"), "product-page-price")).textContent = product.price;

  const addToCartButton = createClass(createElement("button"), "add-to-cart-btn");
  addToCartButton.textContent = "Add to Cart";
  addToCartButton.addEventListener("click", () => addToCart(product));
  productDetails.appendChild(addToCartButton);

  productContainer.appendChild(productImageContainer);
  productContainer.appendChild(productDetails);

  return productContainer;
}

// Function to append product Product HTML elements to the DOM
function appendProductToDOM(productElement) {
  document.querySelector("main").appendChild(productElement);
}

// Async function to display product
export async function displayProduct(productId) {
  try {
      const products = await getProducts(); // Fetch all products
      
      for (const product of products) {
          if (!productId || product.id === productId) {
              const productElement = generateProductDisplay(product);
              appendProductToDOM(productElement);
          }
      }
  } catch (error) {
      console.error("Error fetching or displaying product:", error);
  }
}


function main(){
  // Get the product ID from the URL
  const urlProductId = getIdFromUrl();
  // Pass in the productid fetched from url and display that item
  displayProduct(urlProductId);
  // Update the cart icon
  updateCartIcon();

}

main();