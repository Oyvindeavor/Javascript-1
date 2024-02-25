import { getProducts } from "../scripts/utils/fetchdata.mjs"; // Fetches products from api and returns JSON
import { createClass, createElement } from "../scripts/utils/domUtils.mjs"; // Creates element and creates class
import { createCategoryButtons } from "../scripts/utils/CategoryButtons.mjs"; // Creates the category buttons
import { updateCartIcon, addToCart } from "/../scripts/utils/cart.mjs";
import { displayErrorMessage } from "../scripts/utils/errorUserMessage.mjs";
import { showLoadingSpinner, hideLoadingSpinner } from "../scripts/utils/loadingSpinner.mjs";
import { setupHamburgerMenu } from "../scripts/utils/hamburgerMenu.mjs";

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
      productImg.alt = `Product title: ${product.title}`;

      const standardPrice = createClass(createElement("h3"), "product-regular-price");
      standardPrice.textContent = `$${product.price}`;

      let discountPrice;
      if (product.onSale === true) {
        discountPrice = createClass(createElement("h4"), "product-discounted-price");
        discountPrice.textContent = `$${product.discountedPrice}`;
        standardPrice.classList.remove("product-regular-price");
        standardPrice.classList.add("regular-price-discount-price");
      }

      const addToCartButton = createClass(createElement("button"), "add-to-cart-btn");
      addToCartButton.textContent = "Add to Cart";
      addToCartButton.addEventListener("click", function () {
        addToCart(product);
      });

      anchorElement.appendChild(productImg);
      anchorElement.appendChild(productTitle);
      anchorElement.appendChild(standardPrice);
      if (discountPrice) {
        anchorElement.appendChild(discountPrice);
      }

      productContainer.appendChild(anchorElement);
      productContainer.appendChild(addToCartButton);
      itemsContainer.appendChild(productContainer);
    }
  } catch (error) {
    console.error("Error displaying products:", error);
  }
}

async function main() {
  try {
    setupHamburgerMenu();
    showLoadingSpinner();
    await updateCartIcon();
  } catch (error) {
    console.error("Error at updating the cart icon: ", error);
    displayErrorMessage("There was a problem updating the cart, try refreshing the page or clearing cache");
  }
  try {
    showLoadingSpinner();
    await createCategoryButtons();
  } catch (error) {
    console.error("Error at creating category buttons: ", error);
    displayErrorMessage("Were having trouble displaying the category buttons, try refreshing the page or clearing the cache");
  }
  try {
    showLoadingSpinner();
    await displayProducts();
  } catch (error) {
    console.error("Error displaying the products: ", error);
    displayErrorMessage("Were having problems displaying the products");
  } finally {
    hideLoadingSpinner();
  }
}

main();
