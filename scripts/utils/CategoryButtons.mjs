import { getProducts } from "../utils/fetchdata.mjs";
import { createClass } from "../utils/domUtils.mjs";
import { createElement } from "../utils/domUtils.mjs";
import { displayProducts } from "../pages/products.mjs";

// Get the product genres and return it
export async function getProductGenres() {
  try {
    const destructuredProducts = await getProducts();
    const uniqueGenres = new Set();
    for (const product of destructuredProducts) {
      uniqueGenres.add(product.genre);
    }
    
    return uniqueGenres;
  } catch (error) {
    console.error("Error fetching product genres:", error);
  }
}

// Function to filter genres alphabetically
export async function filterAlphabetically() {
  try {
    const uniqueGenres = await getProductGenres();
    const sortedGenres = Array.from(uniqueGenres).sort();
    return sortedGenres;
  } catch (error) {
    console.error("Error filtering genres alphabetically:", error);
  }
}

// Handle category button click event
async function addCategoryButtonClick(genre) {
  clearProducts(".items-container");
  const products = await getProducts();
  const filteredProducts = filterProductsByGenre(products, genre);
  displayProducts(filteredProducts);
}

async function createShowAllCategoryButton() {
  try {
    const categoryButtonsContainer = document.querySelector(".category-buttons");
    const categoryButton = createClass(createElement("button"), "category-button");
    categoryButton.textContent = "Show all";
    categoryButtonsContainer.appendChild(categoryButton);
    
    categoryButton.addEventListener("click", async function () {
        clearProducts(".items-container"); // Clear products container
        const products = await getProducts();
        displayProducts(products); // Display all products
    });
  } catch (error) {
    console.error("Error creating show all category button: ", error);
  }
}

// Filter products by genre
export function filterProductsByGenre(products, genre) {
  return products.filter((product) => product.genre === genre);
}

// Clear the container used for displaying products
export function clearProducts(container) {
  const containerElement = document.querySelector(container);
  if (containerElement) {
    containerElement.innerHTML = "";
  } else {
    console.error("Container not found:", container);
  }
}

// Create category buttons based on product genres and attach event listener
export async function createCategoryButtons() {
  try {
    const sortedGenres = await filterAlphabetically(); // Get sorted genres that is filtered alpha directly
    const categoryButtonsContainer = document.querySelector(".category-buttons");
    await createShowAllCategoryButton();
    for (const genre of sortedGenres) {
      const categoryButton = createClass(createElement("button"), "category-button");
      categoryButton.textContent = genre;
      categoryButton.dataset.genre = genre;
      categoryButtonsContainer.appendChild(categoryButton);
      categoryButton.addEventListener("click", async function () {
        try {
          await addCategoryButtonClick(genre);
        } catch (error) {
          console.error("Could not handle category button click:", error);
        }
      });
    }
  } catch (error) {
    console.error("Could not create category buttons :", error);
  }
}
