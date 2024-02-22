import { createElement } from "../utils/domUtils.mjs";
import { createClass } from "../utils/domUtils.mjs";
import { getCartItemsFromStorage, updateCartInStorage } from "../utils/Cart.mjs";
import { getProducts } from "../utils/fetchdata.mjs";
import { cartCounter } from "../utils/Cart.mjs";
import { updateCartIcon } from "../utils/Cart.mjs";

export async function createCartItems() {
  const products = await getProducts();
  const cartItemsData = await getCartItemsFromStorage();
  const mainElement = document.querySelector("main");

  const cartPageContainer = createCartPageContainer();
  mainElement.appendChild(cartPageContainer);

  const cartText = createCartText(cartItemsData);
  cartPageContainer.appendChild(cartText);

  const cartItemsContainer = createCartItemsContainer(cartItemsData, products);
  cartPageContainer.appendChild(cartItemsContainer);

  const cartSummaryContainer = createCartSummaryContainer();
  cartPageContainer.appendChild(cartSummaryContainer);

  const totalPrice = createTotalPriceElement(products, cartItemsData);
  cartSummaryContainer.appendChild(totalPrice);

  const checkoutButton = createCheckoutButton();
  cartSummaryContainer.appendChild(checkoutButton);
}


function createCartText(cartItemsData) {
  const cartText = createClass(createElement("h1"), "cart-text");
  const cartLength = cartCounter();
  cartText.textContent = "You have " + cartLength + " items in your shopping cart";
  return cartText;
}


function createCartItemsContainer(cartItemsData, products) {
  const cartItemsContainer = createClass(createElement("div"), "cart-items");
  for (const cartItem of cartItemsData) {
    const product = products.find(function (product) {
      return product.id === cartItem.id;
    });
    if (product) {
      const cartItemContainer = createCartItem(product, cartItem.quantity);
      cartItemsContainer.appendChild(cartItemContainer);
    }
  }
  return cartItemsContainer;
}


function createCartItem(product, quantity) {
  const cartItemContainer = createClass(createElement("div"), "cart-item");

  const productImg = createElement("img");
  productImg.src = product.image;
  productImg.alt = product.title;

  const itemDetails = createClass(createElement("div"), "item-details");

  const productName = createElement("h2");
  productName.textContent = product.title;

  const productPrice = createElement("p");
  productPrice.textContent = product.onSale ? product.discountedPrice : product.price;

  const removeItemButton = createClass(createElement("button"), "remove-item-btn");
  removeItemButton.textContent = "Remove";

  const productQuantity = createClass(createElement("p"), "cart-quantity-text");
  productQuantity.textContent = "Quantity: " + quantity;

  removeItemButton.addEventListener("click", function () {
    const productId = product.id;
    removeItemFromCart(productId, quantity);
    updateCartUI();
  });

  cartItemContainer.appendChild(productImg);
  cartItemContainer.appendChild(itemDetails);
  itemDetails.appendChild(productName);
  itemDetails.appendChild(productPrice);
  itemDetails.appendChild(productQuantity);
  itemDetails.appendChild(removeItemButton);

  return cartItemContainer;
}


function createTotalPriceElement(products, cartItemsData) {
  const totalPrice = createClass(createElement("p"), "total-price");
  const total = calculateTotal(products, cartItemsData);
  totalPrice.textContent = "Total: $" + total.toFixed(2);
  return totalPrice;
}


function calculateTotal(products, cartItemsData) {
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


function createCartPageContainer() {
  const cartPageContainer = createClass(createElement("div"), "cart-page-container");
  return cartPageContainer;
}


function createCartSummaryContainer() {
  const cartSummaryContainer = createClass(createElement("div"), "cart-summary");
  return cartSummaryContainer;
}


function createCheckoutButton() {
  const checkoutButton = createClass(createElement("button"), "checkout-btn");
  checkoutButton.textContent = "Checkout";
  checkoutButton.addEventListener("click", function () {
    window.location.href = "./confirmation/index.html";
  });
  return checkoutButton;
}


function updateCartText() {
  const cartText = document.querySelector(".cart-text");
  const cartItems = getCartItemsFromStorage();
  let totalQuantity = 0;
  for (const item of cartItems) {
    totalQuantity += item.quantity;
  }
  cartText.textContent = "You have " + totalQuantity + " items in your shopping cart";
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


export async function updateCartUI() {
  const products = await getProducts();
  const cartItemsData = await getCartItemsFromStorage();
  const cartItemsContainer = document.querySelector(".cart-items");
  cartItemsContainer.innerHTML = "";
  for (const cartItem of cartItemsData) {
    const product = products.find(function (product) {
      return product.id === cartItem.id;
    });
    if (product) {
      const cartItemContainer = createCartItem(product, cartItem.quantity);
      cartItemsContainer.appendChild(cartItemContainer);
    }
  }
  updatePriceTotal();
  updateCartText();
  updateCartIcon();
}


async function updatePriceTotal() {
  const totalPriceElement = document.querySelector(".total-price");
  const products = await getProducts();
  const cartItemsData = await getCartItemsFromStorage();
  const total = calculateTotal(products, cartItemsData);
  totalPriceElement.textContent = "Total: $" + total.toFixed(2);
}


async function main() {
  await createCartItems();
  updateCartUI();
}


main();
