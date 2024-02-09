"use strict";

const api_url = "https://api.noroff.dev/api/v1/gamehub";
const productContainer = document.querySelector(".sale-items-container");

// Function to fetch data from the API
async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
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

function getId(){

}



// Function to display products on sale (appends)
function displaySaleItems(products) {
  for (const product of products) {
      if (product.onSale) {
          const { title, image, price, discountedPrice, id } = product;

          // Creating the product container 
          const productContainer = document.createElement("div");
          productContainer.classList.add("product-container");

          // Creating title
          const productTitle = document.createElement("h2");
          productTitle.textContent = title;
          productTitle.classList.add("product-title")

          // Creating Image 
          const productImg = document.createElement("img");
          productImg.src = image;
          product.alt = title;

          // Standard price
          const standardPrice = document.createElement("p");
          standardPrice.textContent = price;
          standardPrice.classList.add("product-regular-price")

          // Discounted price
          const discountPrice = document.createElement("p");
          discountPrice.textContent = discountedPrice;
          discountPrice.classList.add("product-discounted-price")

          // Product Id
         let productId;
         productId = id;

         // Create anchor element 
         const anchorElement = document.createElement("a");
         anchorElement.href = `product/index.html?productTitle=${productTitle}`;

         // Append the product container 
         document.querySelector(".items-container").appendChild(productContainer);

         //append the rest
         productContainer.appendChild(anchorElement);
         anchorElement.appendChild(productImg)
         anchorElement.appendChild(productTitle)
         productContainer.appendChild(standardPrice)
         productContainer.appendChild(discountPrice)
         



          
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


