import { api_url, fetchData } from "../utils/fetchdata.mjs";

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

function displayProduct(product) {
  const productContainer = addClass(createElement("div"), "product-page-container");

  const productImageContainer = addClass(createElement("div"), "product-page-image");

  const productImg = createElement("img");
  productImg.src = product.image;
  productImg.alt = product.title;
  productImageContainer.appendChild(productImg);

  const productDetails = addClass(createElement("div"), "product-page-details");

  const productTitle = addClass(createElement("h1"), "product-page-title");
  productTitle.textContent = product.title;
  productDetails.appendChild(productTitle);

  const productDescription = addClass(createElement("p"), "product-page-description");
  productDescription.textContent = product.description;

  productDetails.appendChild(productDescription);

  const productPrice = addClass(createElement("p"), "product-page-price");
  productPrice.textContent = product.price;

  productDetails.appendChild(productPrice);

  const addToCartButton = addClass(createElement("button"), "add-to-cart-btn");
  addToCartButton.textContent = "Add to Cart";

  productDetails.appendChild(addToCartButton);

  productContainer.appendChild(productImageContainer);

  productContainer.appendChild(productDetails);

  // Append product container to the <main> element
  const mainElement = document.querySelector("main");
  if (mainElement) {
    mainElement.appendChild(productContainer);
  } else {
    console.error("<main> element not found.");
  }
}

// Adds a class to an element
function addClass(element, className) {
  element.classList.add(className);
  return element;
}

// Creates Element
function createElement(element) {
  return document.createElement(element);
}
