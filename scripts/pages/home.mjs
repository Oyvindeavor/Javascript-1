"use strict";
import { getProducts } from "../utils/fetchdata.mjs";
import { addToCart } from "../utils/Cart.mjs";
import { displayProduct } from "../utils/domUtils.mjs";


export async function displaySaleItems() {
  try {
    const products = await getProducts();

    for (const product of products) {
      if (product.onSale) {
        // Creating the product container
        const productContainer = document.createElement("div");
        productContainer.classList.add("product-container");
        document.querySelector(".items-container").appendChild(productContainer);

        // Create anchor element
        const anchorElement = document.createElement("a");
        // Append the anchor element to the product container
        productContainer.appendChild(anchorElement);
        anchorElement.addEventListener("click", function () {
          try {
            anchorElement.href = `product/index.html?productId=${product.id}&productTitle=${encodeURIComponent(product.title)}`;

            return product;
          } catch (error) {
            console.error("Error displaying product:", error);
          }
        });

        // Creating Image
        const productImg = document.createElement("img");
        productImg.src = product.image;
        productImg.alt = product.title;
        anchorElement.appendChild(productImg);

        // Creating title
        const productTitle = document.createElement("h2");
        productTitle.textContent = product.title;
        productTitle.classList.add("product-title");
        anchorElement.appendChild(productTitle);

        // Standard price
        const standardPrice = document.createElement("p");
        standardPrice.textContent = product.price;
        standardPrice.classList.add("product-regular-price");
        productContainer.appendChild(standardPrice);

        // Discounted price
        const discountPrice = document.createElement("p");
        discountPrice.textContent = product.discountedPrice;
        discountPrice.classList.add("product-discounted-price");
        productContainer.appendChild(discountPrice);

        // Create "Add to Cart" button
        const addToCartButton = document.createElement("button");
        addToCartButton.textContent = "Add to Cart";
        addToCartButton.classList.add("add-to-cart-btn");

        // Attach event listener to "Add to Cart" button
        addToCartButton.addEventListener("click", function () {
          addToCart(product); 
        });

        // Append the "Add to Cart" button
        productContainer.appendChild(addToCartButton);
      }
    }
  } catch (error) {
    console.error("Error displaying sale items:", error);
  }
}

displaySaleItems();