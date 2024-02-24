import { getProducts } from "../utils/fetchdata.mjs";
import { createElement, createClass } from "../utils/domUtils.mjs";
import { displayProducts } from "../../products/products.mjs";
import { hideLoadingSpinner, showLoadingSpinner } from "./loadingSpinner.mjs";
import { displayErrorMessage } from "./errorUserMessage.mjs";

// This fetches product genres
export async function getProductGenres() {
  try {
    const products = await getProducts();
    const uniqueGenres = new Set(products.map((product) => product.genre));
    return [...uniqueGenres].sort();
  } catch (error) {
    console.error("Error fetching product genres:", error);
    return [];
  }
}

// Combines logic into one
export async function createCategoryButtons() {
  showLoadingSpinner();
  try {
    const sortedGenres = await getProductGenres();
    const categoryButtonsContainer = document.querySelector(".category-buttons");
    await createShowAllCategoryButton(categoryButtonsContainer);
    sortedGenres.forEach((genre) => createCategoryButton(genre, categoryButtonsContainer));
  } catch (error) {
    console.error("Could not create category buttons:", error);
  } finally {
    hideLoadingSpinner();
  }
}

// Creates the "show all products" category button
async function createShowAllCategoryButton(container) {
  try {
    const categoryButton = createClass(createElement("button"), "category-button");
    categoryButton.textContent = "Show all";
    container.appendChild(categoryButton);
    categoryButton.addEventListener("click", async function () {
      clearProducts(".items-container");
      const products = await getProducts();
      displayProducts(products);
    });
  } catch (error) {
    console.error("Error creating show all category button:", error);
    displayErrorMessage("There was a problem generating or displaying the categorybuttons, please refresh the page or try later");
  }
}

// Creates category button
function createCategoryButton(genre, container) {
  const categoryButton = createClass(createElement("button"), "category-button");
  categoryButton.textContent = genre;
  categoryButton.dataset.genre = genre;
  container.appendChild(categoryButton);
  categoryButton.addEventListener("click", async function () {
    showLoadingSpinner();
    try {
      const products = await getProducts();
      const filteredProducts = filterProductsByGenre(products, genre);
      clearProducts(".items-container");
      displayProducts(filteredProducts);
    } catch (error) {
      console.error("Could not handle category button click:", error);
      displayErrorMessage("There was a problem displaying category buttons");
    } finally {
      hideLoadingSpinner();
    }
  });
}

// Filter the products by genre
export function filterProductsByGenre(products, genre) {
  try {
    return products.filter((product) => product.genre === genre);
  } catch (error) {
    console.error("Problem filtering products by genre: ", error);
  }
}

// Clears the product container
export function clearProducts(container) {
  try {
    const containerElement = document.querySelector(container);
    if (containerElement) {
      containerElement.innerHTML = "";
    } else {
      console.error("Container not found:", container);
    }
  } catch (error) {
    console.error("Problem clearing products", error);
  }
}
