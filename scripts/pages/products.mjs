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

    const itemsContainer = document.querySelector(".items-container");
    for (const product of productsToDisplay) {
      const productContainer = createClass(createElement("div"), "product-container");

      const anchorElement = createElement("a");

      anchorElement.addEventListener("click", function () {
        window.location.href = `../product/index.html?productId=${product.id}&productTitle=${encodeURIComponent(product.title)}`;
      });
      anchorElement.setAttribute("data-product-id", product.id);

      const productTitle = createClass(createElement("h2"), "product-title");
      productTitle.textContent = product.title;

      const productImg = createElement("img");
      productImg.src = product.image;
      productImg.alt = product.title;

      const standardPrice = createClass(createElement("p"), "product-regular-price");
      standardPrice.textContent = product.price;

      // If the product has the onSale attribute create a discount price 
      let discountPrice;
      if (product.onSale === true) {
        discountPrice = createClass(createElement("p"), "product-discounted-price");
        discountPrice.textContent = product.discountedPrice;
      }

      const addToCartButton = createClass(createElement("button"), "add-to-cart-btn");
      addToCartButton.textContent = "Add to Cart";
      addToCartButton.addEventListener("click", function(){
        addToCart(product);
      });

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

function main(){
  createCategoryButtons();
  displayProducts();
  updateCartIcon();
}

main();
