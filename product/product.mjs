import { updateCartIcon } from "../scripts/utils/Cart.mjs";
import { getProducts } from "../scripts/utils/fetchdata.mjs";
import { createClass, createElement } from "../scripts/utils/domUtils.mjs";
import { addToCart } from "../scripts/utils/Cart.mjs";
import { displayErrorMessage } from "../scripts/utils/errorUserMessage.mjs";
import { hideLoadingSpinner, showLoadingSpinner } from "../scripts/utils/loadingSpinner.mjs";


// Gets the ID from the url
export function getIdFromUrl() {
  try {
    const filterUrl = new URLSearchParams(window.location.search);
    const productId = filterUrl.get("productId");
    return productId;
  } catch (error) {
    console.error("Error getting Id from url check the function", error);
  }
}


// Function to generate product HTML
function generateProductDisplay(product) {
  try {
    // Creating the main container
    const productContainer = createClass(createElement("div"), "product-page-container");

    // Creating the product Image container
    const productImageContainer = createClass(createElement("div"), "product-page-image");
    productImageContainer.appendChild(createElement("img")).src = product.image;
    productImageContainer.querySelector("img").alt = product.title;

    // Creating the product page details container
    const productDetails = createClass(createElement("div"), "product-page-details");
    productDetails.appendChild(createClass(createElement("h1"), "product-page-title")).textContent = product.title;
    productDetails.appendChild(createClass(createElement("p"), "age-rating")).textContent = `Age rating: ${product.ageRating}`;
    productDetails.appendChild(createClass(createElement("p"), "genre-text")).textContent = `Genre: ${product.genre}`;
    productDetails.appendChild(createClass(createElement("p"), "released")).textContent = `Released: ${product.released}`;
    productDetails.appendChild(createClass(createElement("p"), "product-page-description")).textContent = product.description;
    // Checks to see if the product is onSale
    if (product.onSale === true) {
      // If its true create and append discounted price and
      productDetails.appendChild(createClass(createElement("p"), "regular-price-discount-price")).textContent = `${product.price}$`;
      productDetails.appendChild(createClass(createElement("p"), "product-discounted-price")).textContent = `${product.discountedPrice}$`;
    } else {
      productDetails.appendChild(createClass(createElement("p"), "product-page-price")).textContent = `${product.price}$`;
    }
    const addToCartButton = createClass(createElement("button"), "add-to-cart-btn");
    addToCartButton.textContent = "Add to Cart";
    addToCartButton.addEventListener("click", () => addToCart(product));

    productDetails.appendChild(addToCartButton);
    productContainer.appendChild(productImageContainer);
    productContainer.appendChild(productDetails);
    return productContainer;
  } catch (error) {
    console.error("Error at generateAndDisplayProduct in product.mjs, trouble generating html ", error);
  }
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
    displayErrorMessage("There was a problem displaying the product, try refreshing the page");
  }
}


async function main() {
  try {
    showLoadingSpinner();
    await updateCartIcon();
  } catch (error) {
    console.error("Problem updating the cart icon: ", error);
    displayErrorMessage("There was a problem updating the cart, please refresh the page and try again");
  }
  try {
    showLoadingSpinner();
    const urlProductId = await getIdFromUrl();
    await displayProduct(urlProductId);
    // Pass in the productid fetched from url and display that item
  } catch (error) {
    showLoadingSpinner();
    console.error("Trouble getting the url from the id or displaying the product: ", error);
    displayErrorMessage("Were having trouble displaying the products, please refresh the page and try again");
  } finally {
    hideLoadingSpinner();
  }
}


main();
