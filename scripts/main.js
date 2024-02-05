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

// Function to display products on sale (appends)
function displaySaleItems(products) {
  for (const product of products) {
    if (product.onSale === true) {
      const productContainerDiv = document.createElement("div");

      // Add a class to the newly created div
      productContainerDiv.classList.add("product-container");

      //create title element and sets its textcontent.
      const title = document.createElement("h2");
      title.textContent = product.title;

      // Create img element and sets its src.
      const productImg = document.createElement("img");
      productImg.src = product.image;
      productImg.alt = product.title;

      // Create price element and sets it to the price attribute.
      const productPrice = document.createElement("p");
      productPrice.textContent = product.price;

      // Create purchase button 
      const purchaseButton = document.createElement("button");
      purchaseButton.classList.add("purchase-button");
      purchaseButton.textContent = "Purchase";
     // Add event listener to button to get the id.
      purchaseButton.addEventListener("click", function(){
        const id = product.id;
        console.log(id);
      })

      // Appends to the DOM
      productContainerDiv.appendChild(title);
      productContainerDiv.appendChild(productImg);
      productContainerDiv.appendChild(productPrice);
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
