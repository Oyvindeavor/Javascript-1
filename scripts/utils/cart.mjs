//



export function addToCart(product) {
  let cartItems = getCartItemsFromStorage();
  
  // Check if the product is already in the cart
  const existingItemIndex = cartItems.findIndex(item => item.id === product.id);
  
  if (existingItemIndex !== -1) {
      // If the product is already in the cart, increment its quantity
      cartItems[existingItemIndex].quantity++;
  } else {
      // If the product is not in the cart, add it with a quantity of 1
      cartItems.push({ id: product.id, quantity: 1 });
  }
  
  updateCartInStorage(cartItems);
  console.log(cartItems);
  return cartItems;
}
  
 export function updateCartInStorage(cartItems) {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }
  

// Function to retrieve cart items from local storage
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

// CLears all cart items from storage
export function clearAllCartItemsFromStorage(){
    localStorage.setItem("cart", JSON.stringify([]));
}

// Function to get product ID from URL
export function getIdFromUrlCart() {
  const filterUrl = new URLSearchParams(window.location.search);
  return filterUrl.get("productId");
}

// Returns the length of the cart items to be used to show how many items are in the cart on the cart icon.
export function cartCounter() {
  let cartItems = getCartItemsFromStorage();
  

  return cartItems.length
}



