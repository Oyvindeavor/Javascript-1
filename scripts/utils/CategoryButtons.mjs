import { getProducts } from "../utils/fetchdata.mjs";
import { createElement, createClass } from "../utils/domUtils.mjs";
import { displayProducts } from "../../products/products.mjs"

export async function getProductGenres() {
    try {
        const products = await getProducts();
        const uniqueGenres = new Set(products.map(product => product.genre));
        return [...uniqueGenres].sort();
    } catch (error) {
        console.error("Error fetching product genres:", error);
    }
}

// 
export async function createCategoryButtons() {
    try {
        const sortedGenres = await getProductGenres();
        const categoryButtonsContainer = document.querySelector(".category-buttons");
        await createShowAllCategoryButton(categoryButtonsContainer);
        sortedGenres.forEach(genre => createCategoryButton(genre, categoryButtonsContainer));
    } catch (error) {
        console.error("Could not create category buttons:", error);
    }
}

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
    }
}

function createCategoryButton(genre, container) {
    const categoryButton = createClass(createElement("button"), "category-button");
    categoryButton.textContent = genre;
    categoryButton.dataset.genre = genre;
    container.appendChild(categoryButton);
    categoryButton.addEventListener("click", async function () {
        try {
            const products = await getProducts();
            const filteredProducts = filterProductsByGenre(products, genre);
            clearProducts(".items-container");
            displayProducts(filteredProducts);
        } catch (error) {
            console.error("Could not handle category button click:", error);
        }
    });
}

export function filterProductsByGenre(products, genre) {
    return products.filter(product => product.genre === genre);
}

export function clearProducts(container) {
    const containerElement = document.querySelector(container);
    if (containerElement) {
        containerElement.innerHTML = "";
    } else {
        console.error("Container not found:", container);
    }
}
