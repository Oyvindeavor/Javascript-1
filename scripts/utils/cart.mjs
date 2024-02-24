// Add product(s) to cart
export function addToCart(product) {
  // Get the existing items from storage
  let cartItems = getCartItemsFromStorage();

  const existingItemIndex = cartItems.findIndex(function (item) {
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

// Updates the cart icon to show number of items in the cart > get the total quantity in local storage from cartCounter()
// Select the counter graphic > change the text to the quantity
export async function updateCartIcon() {
  const cartQuantity = cartCounter();
  const cartIconCounter = document.querySelector(".cart-counter");

  // If cartquantity is greater or equal to 1 show it
  if (cartQuantity >= 1) {
    cartIconCounter.style.display = "block";
    cartIconCounter.textContent = cartQuantity;
  } else {
    // else dont show it
    cartIconCounter.style.display = "none";
    cartIconCounter.textContent = "";
  }
}
