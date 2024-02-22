
// Add product(s) to cart
export function addToCart(product) {
  // Get the existing items from storage
  let cartItems = getCartItemsFromStorage();

  const existingItemIndex = cartItems.findIndex(function(item) {
      return item.id === product.id;
  });
  // Check if the product exists in the cart
  if (existingItemIndex !== -1) {
    // If the product exist increment by 1
      cartItems[existingItemIndex].quantity++;
  } else {

    // If the product does not exist add it to the cart with a quantity of 1
      cartItems.push({ id: product.id, quantity: 1 });
  }
  // Update the new array in storage
  updateCartInStorage(cartItems);

  // Update the cart icon to reflect items in storage
  updateCartIcon();
  return cartItems;
}

// This updates the items in storage using parameter.
export function updateCartInStorage(cartItems) {
  localStorage.setItem("cart", JSON.stringify(cartItems));
}


// This gets the products from cart > parses it so i can use the objects > If blocks to return an empty array. 
export function getCartItemsFromStorage() {
  try {
      const cartItemsString = localStorage.getItem("cart");
      if (!cartItemsString) return []; 
      return JSON.parse(cartItemsString);
  } catch (error) {
      console.error("Error retrieving cart items from storage:", error);
      return []; 
  }
}


// Clears all carts from local storage
export function clearAllCartItemsFromStorage(){
  localStorage.setItem("cart", JSON.stringify([]));
}


// Gets all the products added to local storage > loops through them > adds it to variable then returns it
export function cartCounter() {
  let cartItems = getCartItemsFromStorage();
  let totalQuantity = 0;
  for (const item of cartItems) {
      totalQuantity += item.quantity;
  }
  return totalQuantity;
}


// Updates the cart icon to show number of items in the cart > get the total quantity in local storage from cartCounter() 
// Select the counter graphic > change the text to the quantity
export function updateCartIcon(){
  const cartQuantity = cartCounter();
  const cartIconCounter = document.querySelector(".cart-counter");
  cartIconCounter.textContent = cartQuantity;
}

