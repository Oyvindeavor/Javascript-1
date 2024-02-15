import { createClass, createElement } from "./domUtils.mjs";
import { getIdFromUrl } from "../product/product.mjs";
// Cart

export function updateCart() {
    const cartContainer = document.querySelector(".cart-page-container");
    const cartGreeting = document.querySelector(".cart-text");
    cartGreeting.textContent = "Your Shopping Cart!";
    const cartItemsContainer = document.querySelector(".cart-items");
    cartContainer.appendChild(cartItemsContainer);
  
    // Retrieve cart items from local storage
    const cartItems = getCartItemsFromStorage();
  
    // Loop through cart items and create cart item elements
    cartItems.forEach(productId => {
      const cartItem = createClass(createElement("div"), "cart-item");
      const cartDetailsContainer = createClass(createElement("div"), "item-details");
      
      // Fetch product details based on product ID and create cart item layout
      const product = fetchProductDetails(productId); // Assuming you have a function to fetch product details
      if (product) {
        // Create cart item layout with product details
        // Modify this section according to your product details structure
        const cartImage = createElement("img");
        cartImage.src = product.image;
        cartItem.appendChild(cartImage);
  
        const cartProductName = createElement("h2");
        cartProductName.textContent = product.title;
        cartDetailsContainer.appendChild(cartProductName);
  
        const cartProductPrice = createElement("p");
        cartProductPrice.textContent = "Price: " + product.price;
        cartDetailsContainer.appendChild(cartProductPrice);
  
        const cartRemoveButton = createClass(createElement("button"), "remove-item-btn");
        cartRemoveButton.textContent = "Remove";
        cartDetailsContainer.appendChild(cartRemoveButton);
  
        cartItem.appendChild(cartDetailsContainer);
        cartItemsContainer.appendChild(cartItem);
      }
    });
  }



// Update the addToCart function to add product IDs to the cart array in local storage
export function addToCart() {
    const productId = getIdFromUrlCart(); // Get product ID from URL
    const cartItems = getCartItemsFromStorage(); // Retrieve existing cart items
  
    // Add the new product ID to the cart array
    cartItems.push(productId);
  
    // Store the updated cart items back into local storage
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }
  
  // Function to retrieve cart items from local storage
  function getCartItemsFromStorage() {
    return JSON.parse(localStorage.getItem("cart")) || [];
  }
  
  // Function to get product ID from URL
  export function getIdFromUrlCart() {
    const filterUrl = new URLSearchParams(window.location.search);
    return filterUrl.get("productId");
  }
  