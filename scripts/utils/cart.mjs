
export function addToCart(product) {
  let cartItems = getCartItemsFromStorage();

  const existingItemIndex = cartItems.findIndex(function(item) {
      return item.id === product.id;
  });

  if (existingItemIndex !== -1) {
      cartItems[existingItemIndex].quantity++;
  } else {
      cartItems.push({ id: product.id, quantity: 1 });
  }

  updateCartInStorage(cartItems);
  
  updateCartIcon();
  return cartItems;
}

export function updateCartInStorage(cartItems) {
  localStorage.setItem("cart", JSON.stringify(cartItems));
}

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

export function clearAllCartItemsFromStorage(){
  localStorage.setItem("cart", JSON.stringify([]));
}

export function getIdFromUrlCart() {
  const filterUrl = new URLSearchParams(window.location.search);
  return filterUrl.get("productId");
}

export function cartCounter() {
  let cartItems = getCartItemsFromStorage();
  let totalQuantity = 0;
  for (const item of cartItems) {
      totalQuantity += item.quantity;
  }
  return totalQuantity;
}

export function updateCartIcon(){
  const cartQuantity = cartCounter();
  const cartIconCounter = document.querySelector(".cart-counter");
  cartIconCounter.textContent = cartQuantity;
}
