"use strict";

import { getProducts } from "./scripts/utils/fetchdata.mjs";
import { addToCart, updateCartIcon } from "./scripts/utils/Cart.mjs";

export async function displaySaleItems() {
  try {
    const products = await getProducts();

    for (const product of products) {
      if (product.onSale) {
        const productContainer = document.createElement("div");
        productContainer.classList.add("product-container");
        document.querySelector(".items-container").appendChild(productContainer);

        const anchorElement = document.createElement("a");
        productContainer.appendChild(anchorElement);
        anchorElement.addEventListener("click", function () {
          try {
            anchorElement.href = `product/index.html?productId=${product.id}&productTitle=${encodeURIComponent(product.title)}`;
            return product;
          } catch (error) {
            console.error("Error displaying product:", error);
          }
        });

        const productImg = document.createElement("img");
        productImg.src = product.image;
        productImg.alt = product.title;
        anchorElement.appendChild(productImg);

        const productTitle = document.createElement("h2");
        productTitle.textContent = product.title;
        productTitle.classList.add("product-title");
        anchorElement.appendChild(productTitle);

        const standardPrice = document.createElement("p");
        standardPrice.textContent = product.price;
        standardPrice.classList.add("regular-price-discount-price");
        productContainer.appendChild(standardPrice);

        const discountPrice = document.createElement("p");
        discountPrice.textContent = product.discountedPrice;
        discountPrice.classList.add("product-discounted-price");
        productContainer.appendChild(discountPrice);

        const addToCartButton = document.createElement("button");
        addToCartButton.textContent = "Add to Cart";
        addToCartButton.classList.add("add-to-cart-btn");

        addToCartButton.addEventListener("click", function () {
          addToCart(product);
        });

        productContainer.appendChild(addToCartButton);
      }
    }
  } catch (error) {
    console.error("Error displaying sale items:", error);
  }
}

async function main() {
  await updateCartIcon();
  await displaySaleItems();
}

main();
