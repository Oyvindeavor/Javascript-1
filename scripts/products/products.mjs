import { api_url, fetchData } from "../utils/fetchdata.mjs";
import { displayProducts } from "../utils/domUtils.mjs";
import { createClass } from "../utils/domUtils.mjs";
import { createElement } from "../utils/domUtils.mjs";


/**
 * Gets and display all products from the api and creates co
 */
async function getAndDisplayAllProducts() {
    try {
      const allProducts = await fetchData(api_url);
      displayProducts(allProducts);
    } catch (error) {
      console.error("Unable to get items", error.message);
    }
  }
  
  getAndDisplayAllProducts();
  
  // Filter by genre 
  async function getProductsByGenre(genre) {
    try {
        const productGenre = await fetchData(api_url);
        return productGenre.filter(product => product.genre === genre);
    } catch (error) {
        console.error("Could not get products by genre", error);
        throw error;
    }
}

// Display the products by genre
async function displayProductsByGenre(genre) {
    try {
        const filteredProducts = await getProductsByGenre(genre);
        clearProducts(".items-container");
        displayProducts(filteredProducts);
    } catch (error) {
        console.error("Could not display products by genre", error);
    }
}
  
  
// Creates categoryButtons by passing in 
  async function createCategoryButtons() {
      try {
          const productGenre = await fetchData(api_url);
          const uniqueGenres = [...new Set(productGenre.map(product => product.genre))]; 
          const categoryButtonsContainer = document.querySelector(".category-buttons");
  
          for (let genre of uniqueGenres) {
              const categoryButton = createClass(createElement("button"), "category-button");
              categoryButton.textContent = genre;
              categoryButtonsContainer.appendChild(categoryButton);
              // On click gets genre 
              categoryButton.addEventListener("click", function(){
                  displayProductsByGenre(genre);
              });
          }
      } catch (error) {
          console.error("Could not create category buttons :", error);
      }
  }
  
  function clearProducts(container) {
      container = document.querySelector(container);
      container.innerHTML = "";
  }
  
  createCategoryButtons();