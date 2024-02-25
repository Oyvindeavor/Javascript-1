"use strict";
import { getProducts } from "./scripts/utils/fetchdata.mjs";
import { addToCart, updateCartIcon } from "./scripts/utils/Cart.mjs";
import { showLoadingSpinner, hideLoadingSpinner } from "./scripts/utils/loadingSpinner.mjs";
import { displayErrorMessage } from "./scripts/utils/errorUserMessage.mjs";
import { setupHamburgerMenu } from "./scripts/utils/hamburgerMenu.mjs";

export async function displaySaleItems() {
  try {
    const products = await getProducts();
    let count = 0; 

    for (const product of products) {
      if (product.onSale && count < 4) { 
        const productContainer = document.createElement("div");
        productContainer.classList.add("product-container");
        document.querySelector(".items-container").appendChild(productContainer);

        const anchorElement = document.createElement("a");
        anchorElement.href = `product/index.html?productId=${product.id}&productTitle=${encodeURIComponent(product.title)}`;
        productContainer.appendChild(anchorElement);

        const productImg = document.createElement("img");
        productImg.src = product.image;
        productImg.alt = `product title: ${product.title}`;
        anchorElement.appendChild(productImg);

        const productTitle = document.createElement("h2");
        productTitle.textContent = product.title;
        productTitle.classList.add("product-title");
        anchorElement.appendChild(productTitle);

        const standardPrice = document.createElement("h3");
        standardPrice.textContent = `$${product.price}`;
        standardPrice.classList.add("regular-price");
        productContainer.appendChild(standardPrice);

        const discountPrice = document.createElement("h4");
        discountPrice.textContent = `$${product.discountedPrice}`;
        discountPrice.classList.add("product-discounted-price");
        productContainer.appendChild(discountPrice);

        const addToCartButton = document.createElement("button");
        addToCartButton.textContent = "Add to Cart";
        addToCartButton.classList.add("add-to-cart-btn");
        addToCartButton.addEventListener("click", function () {
          addToCart(product);
        });
        productContainer.appendChild(addToCartButton);

        count++; 
      }
    }

    if (products.length > 4) {
      const viewMoreContainer = document.querySelector(".items-container");
      const viewMoreButton = document.createElement("button");
      viewMoreButton.textContent = "View More";
      viewMoreButton.classList.add("view-more-btn");
      viewMoreButton.addEventListener("click", function () {
        window.location.href = '/products/index.html';
      });
      viewMoreContainer.appendChild(viewMoreButton);
    }
  } catch (error) {
    console.error("Error displaying sale items:", error);
  }
}


async function main() {
  showLoadingSpinner();
  setupHamburgerMenu();
  try {
    await updateCartIcon();
    const products = await getProducts();
    await displaySaleItems();
    
  } catch (error) {
    console.error("Error occurred: ", error);
    displayErrorMessage("We're having trouble with your request. Please refresh the page and try again.");
  } finally {
    hideLoadingSpinner();
  }
}

main();
