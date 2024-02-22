"use strict";

import { getProducts } from "../utils/fetchdata.mjs";
import { createClass, createElement } from "../utils/domUtils.mjs";
import { createCategoryButtons } from "../utils/CategoryButtons.mjs";
import { updateCartIcon, addToCart } from "../utils/Cart.mjs";

export async function displayProducts(products) {
  try {
    let productsToDisplay;
    if (!products) {
      productsToDisplay = await getProducts();
    } else {
      productsToDisplay = products;
    }

    // Create products container
    const itemsContainer = document.querySelector(".items-container");
    // Loop through the api products
    for (const product of productsToDisplay) {
      // Inside loop create div and assign it class: product-container
      const productContainer = createClass(createElement("div"), "product-container");
      // Inside loop create anchor element
      const anchorElement = createElement("a");
      // Inside loop create event listener that directs to the individual product, assigns the product.id and product.title
      // To the url (so i can retrieve it by url id later)
      anchorElement.addEventListener("click", function () {
        window.location.href = `../product/index.html?productId=${product.id}&productTitle=${encodeURIComponent(product.title)}`;
      });
      // Set attribute to anchor element and assign it product.id
      anchorElement.setAttribute("data-product-id", product.id);

      // Create h2 element and assign class
      const productTitle = createClass(createElement("h2"), "product-title");
      // Assign the .title to the created h2 textcontent
      productTitle.textContent = product.title;

      // Create Image element assign image and the alt text to the title
      const productImg = createElement("img");
      productImg.src = product.image;
      productImg.alt = product.title;

      // Create price element and assign it the price
      const standardPrice = createClass(createElement("p"), "product-regular-price");
      standardPrice.textContent = product.price;

      // If the product has the onSale attribute create a discount price
      let discountPrice;
      if (product.onSale === true) {
        discountPrice = createClass(createElement("p"), "product-discounted-price");
        discountPrice.textContent = product.discountedPrice;
      }

      // Create button element and assign it to class
      const addToCartButton = createClass(createElement("button"), "add-to-cart-btn");
      // Assign button textcontent
      addToCartButton.textContent = "Add to Cart";
      // Add click event listener to the button pass in addToCart with the product.
      addToCartButton.addEventListener("click", function () {
        addToCart(product);
      });

      // Append the elements to dom
      anchorElement.appendChild(productImg);
      anchorElement.appendChild(productTitle);
      anchorElement.appendChild(standardPrice);
      if (discountPrice) {
        anchorElement.appendChild(discountPrice);
      }
      productContainer.appendChild(addToCartButton);

      productContainer.appendChild(anchorElement);

      itemsContainer.appendChild(productContainer);
    }
  } catch (error) {
    console.error("Error displaying products:", error);
  }
}

function main() {
  createCategoryButtons();
  displayProducts();
  updateCartIcon();
}

main();
