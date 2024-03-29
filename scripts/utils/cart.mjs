import { displayErrorMessage } from "./errorUserMessage.mjs";

// Add product(s) to cart
export function addToCart(product) {
  let cartItems = getCartItemsFromStorage();
  const existingItemIndex = cartItems.findIndex(function (item) {
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

export function calculateTotal(products, cartItemsData) {
  let totalPrice = 0;
  for (const cartItem of cartItemsData) {
    const product = products.find(function (product) {
      return product.id === cartItem.id;
    });
    if (product) {
      totalPrice += product.onSale ? product.discountedPrice * cartItem.quantity : product.price * cartItem.quantity;
    }
  }
  return totalPrice;
}

// Clears all carts from local storage
export function clearAllCartItemsFromStorage() {
  localStorage.setItem("cart", JSON.stringify([]));
}

export function removeItemFromCart(productId) {
  let cartItems = getCartItemsFromStorage();
  const itemIndex = cartItems.findIndex(function (item) {
    return item.id === productId;
  });
  if (itemIndex !== -1) {
    cartItems[itemIndex].quantity -= 1;
    if (cartItems[itemIndex].quantity === 0) {
      cartItems.splice(itemIndex, 1);
    }
    updateCartInStorage(cartItems);
    return cartItems[itemIndex] ? cartItems[itemIndex].quantity : 0;
  }
  return 0;
}

export function getProductPrice(product) {
  let price;
  if (product.onSale) {
    price = product.discountedPrice;
  } else {
    price = product.price;
  }
  return price;
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

// Changes the button text and color when you click it for 1 second.
export function addToCartButtonConfirmation(button) {
  const originalText = button.textContent;

  button.disabled = true;
  button.textContent = "+1";
  button.style.backgroundColor = "green";
  setTimeout(() => {
    button.textContent = originalText;
    button.style.backgroundColor = "";
    button.disabled = false;
  }, 500);
}

// Updates the cart icon to show number of items in the cart > get the total quantity in local storage from cartCounter()
// Select the counter graphic > change the text to the quantity
export async function updateCartIcon() {
  try {
    const cartQuantity = cartCounter();
    const cartIconCounter = document.querySelector(".cart-counter");
    if (cartQuantity >= 1) {
      cartIconCounter.style.display = "block";
      cartIconCounter.textContent = cartQuantity;
    } else {
      cartIconCounter.style.display = "none";
      cartIconCounter.textContent = "";
    }
  } catch (error) {
    console.error("error updating the cart icon", error);
    displayErrorMessage("Were having trouble updating the cart, please refresh or try again later");
  }
}
