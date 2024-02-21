import { displayProduct } from "../utils/domUtils.mjs";
import { getProducts } from "../utils/fetchdata.mjs";

import { createClass } from "../utils/domUtils.mjs";
import { createElement } from "../utils/domUtils.mjs";

import { createCategoryButtons } from "../utils/CategoryButtons.mjs";

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
      // Creating the product container
      const productContainer = createClass(createElement("div"), "product-container");

      // Creating anchor element for the product
      const anchorElement = createElement("a");

      anchorElement.addEventListener("click", function () {
        window.location.href = `../product/index.html?productId=${product.id}&productTitle=${encodeURIComponent(product.title)}`;
      });
      anchorElement.setAttribute("data-product-id", product.id);

      // Creating title
      const productTitle = createClass(createElement("h2"), "product-title");
      productTitle.textContent = product.title;

      // Creating Image
      const productImg = createElement("img");
      productImg.src = product.image;
      productImg.alt = product.title;

      // Standard price
      const standardPrice = createClass(createElement("p"), "product-regular-price");
      standardPrice.textContent = product.price;

      // Check to see if product is on sale; if it is, create and append discounted price.
      let discountPrice;
      if (product.onSale === true) {
        discountPrice = createClass(createElement("p"), "product-discounted-price");
        discountPrice.textContent = product.discountedPrice;
      }

      // Create "Add to Cart" button
      const addToCartButton = createClass(createElement("button"), "add-to-cart-btn");
      addToCartButton.textContent = "Add to Cart";

      // Append the elements to the anchor element
      anchorElement.appendChild(productImg);
      anchorElement.appendChild(productTitle);
      anchorElement.appendChild(standardPrice);
      if (discountPrice) {
        anchorElement.appendChild(discountPrice);
      }
      anchorElement.appendChild(addToCartButton);

      // Append the anchor element to the product container
      productContainer.appendChild(anchorElement);

      // Append the product container to the items container
      itemsContainer.appendChild(productContainer);
    }
  } catch (error) {
    console.error("Error displaying products:", error);
  }
}


createCategoryButtons();
displayProducts();
