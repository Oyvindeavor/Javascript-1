"use strict";

const api_url = "https://api.noroff.dev/api/v1/gamehub";
const productContainer = document.querySelector(".sale-items-container");

// Function to fetch data from the API
async function fetchData(url) {
  try {
    const response = await fetch(url);
    // if response is not OK throw a new error
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    // Return the data in json.
    return response.json();
  } catch (error) {
    console.error("Error fetching data from API:", error.message);
  }
}

// Function that creates an element and sets an id to the element, can also call only the element type with the if condition.
function createElementTypeId(elementType, elementId) {
  const element = document.createElement(elementType);
  if (elementId) {
    element.id = elementId;
  }
}





// Function to display products on sale (appends)
function displaySaleItems(products) {
    for (const product of products) {
      if (product.onSale) {
        const { title, image, price, discountedPrice, id } = product;
  
        const productContainerDiv = document.createElement("div");
        productContainerDiv.classList.add("product-container");
  
        const titleElement = document.createElement("h2");
        titleElement.textContent = title;
  
        const productImg = document.createElement("img");
        productImg.src = image;
        productImg.alt = title;
  
        const productPrice = document.createElement("p");
        productPrice.textContent = `Previous price: ${price}`;
  
        const discountedPriceElement = document.createElement("p"); 
        discountedPriceElement.textContent = (price - discountedPrice).toFixed(2);
  
        const purchaseButton = document.createElement("button");
        purchaseButton.classList.add("purchase-button");
        purchaseButton.textContent = "Purchase";
        purchaseButton.addEventListener("click", function () {
          console.log(id);
        });
  
        productContainerDiv.appendChild(titleElement);
        productContainerDiv.appendChild(productImg);
        productContainerDiv.appendChild(productPrice);
        productContainerDiv.appendChild(discountedPriceElement);
        productContainerDiv.appendChild(purchaseButton);
  
        productContainer.appendChild(productContainerDiv);
      }
    }
  }
  

// Function to fetch sale items > then appends the data to the dom
async function getAndDisplaySaleItems() {
  try {
    const productsOnSale = await fetchData(api_url);

    if (productsOnSale) {
      displaySaleItems(productsOnSale);
    } else {
      console.log("No sale items found.");
    }
  } catch (error) {
    console.error("Unable to get sale items:", error.message);
  }
}

// Execute the function to get and display sale items
getAndDisplaySaleItems();

// Hamburger menu

function hamburgerMenu() {
  const getIconsContainer = document.querySelector(".icons-container");
  const hamburgerMenuContainer = document.createElement("hamburgerMenuContainer");
  const hamburgerMenuIcon = document.createElement("i");
  hamburgerMenuIcon.classList.add("fa-solid", "fa-bars");
  hamburgerMenuIcon.id = "hamburgerMenuIcon";
  const hamburgerButton = document.createElement("a");

  getIconsContainer.appendChild(hamburgerMenuContainer);
  hamburgerMenuContainer.appendChild(hamburgerButton);
  hamburgerButton.appendChild(hamburgerMenuIcon);
}

hamburgerMenu();
