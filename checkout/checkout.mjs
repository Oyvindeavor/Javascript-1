import { createElement, createClass } from "../scripts/utils/domUtils.mjs";
import { getCartItemsFromStorage, cartCounter, updateCartIcon, removeItemFromCart, calculateTotal } from "../scripts/utils/Cart.mjs";
import { getProducts } from "../scripts/utils/fetchdata.mjs";
import { hideLoadingSpinner, showLoadingSpinner } from "../scripts/utils/loadingSpinner.mjs";
import { displayErrorMessage } from "../scripts/utils/errorUserMessage.mjs";
import { setupHamburgerMenu } from "../scripts/utils/hamburgerMenu.mjs";

export async function createCartItems() {
  const products = await getProducts();
  const cartItemsData = await getCartItemsFromStorage();
  const mainElement = document.querySelector("main");

  // Check to see if the cart container is already there
  let cartPageContainer = document.querySelector(".cart-page-container");
  if (!cartPageContainer) {
    cartPageContainer = createCartPageContainer();
    mainElement.appendChild(cartPageContainer);
  } else {
    // If it is dont create and just clear the cart items
    const cartItemsContainer = cartPageContainer.querySelector(".cart-items");
    if (cartItemsContainer) {
      cartItemsContainer.innerHTML = "";
    }
  }

  const cartText = createCartText(cartItemsData);
  cartPageContainer.appendChild(cartText);

  const cartItemsContainer = createCartItemsContainer(cartItemsData, products);
  cartPageContainer.appendChild(cartItemsContainer);

  // Check to see if it exists
  let cartSummaryContainer = cartPageContainer.querySelector(".cart-summary");
  if (!cartSummaryContainer) {
    cartSummaryContainer = createCartSummaryContainer();
    cartPageContainer.appendChild(cartSummaryContainer);
  }

  const totalPrice = createTotalPriceElement(products, cartItemsData);

  cartSummaryContainer.innerHTML = "";
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
  productImg.alt = `product title: ${product.title}`;

  const itemDetails = createClass(createElement("div"), "item-details");

  const productName = createElement("h2");
  productName.textContent = product.title;

  const productPrice = createElement("h3");
  productPrice.textContent = product.onSale ? product.discountedPrice : product.price;

  const removeItemButton = createClass(createElement("button"), "remove-item-btn");
  removeItemButton.textContent = "Remove";

  const productQuantity = createClass(createElement("p"), "cart-quantity-text");
  productQuantity.textContent = "Quantity: " + quantity;

  removeItemButton.addEventListener("click", function () {
    const productId = product.id;
    removeItemFromCart(productId, quantity);
    updateCartIcon();
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

function createCartPageContainer() {
  const cartPageContainer = createClass(createElement("div"), "cart-page-container");
  return cartPageContainer;
}

function createCartSummaryContainer() {
  const cartSummaryContainer = createClass(createElement("div"), "cart-summary");
  return cartSummaryContainer;
}

function createCheckoutButton() {
  // Fetch the cart counter so I can check number of items in cart
  const numberOfItemsInCart = cartCounter();
  const checkoutButton = createClass(createElement("button"), "checkout-btn");
  checkoutButton.textContent = "Checkout";

  // Check to see if there are items in the cart and disable the button if there are none
  if (numberOfItemsInCart < 1) {
    checkoutButton.disabled = true;
    checkoutButton.classList.add("checkout-btn-disabled");
  }
  checkoutButton.addEventListener("click", function () {
    if (!checkoutButton.disabled) {
      window.location.href = "./confirmation/index.html";
    }
  });
  return checkoutButton;
}

function updateCheckoutButtonState() {
  const checkoutButton = document.querySelector(".checkout-btn");
  const cartItems = getCartItemsFromStorage();

  if (cartItems.length > 0) {
    checkoutButton.disabled = false;
    checkoutButton.classList.remove("checkout-btn-disabled");
  } else {
    checkoutButton.disabled = true;
    checkoutButton.classList.add("checkout-btn-disabled");
  }
}

// Updates the cart text
function updateCartText() {
  const cartText = document.querySelector(".cart-text");
  const cartItems = getCartItemsFromStorage();
  let totalQuantity = 0;
  for (const item of cartItems) {
    totalQuantity += item.quantity;
  }
  cartText.textContent = "You have " + totalQuantity + " items in your shopping cart";
}

// Updates the cart UI
export async function updateCartUI() {
  try {
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
    updateCheckoutButtonState();
  } catch (error) {
    console.error("Error updating cart UI:", error);
    displayErrorMessage("We're having trouble updating the cart. Please try again later.");
  }
}

async function updatePriceTotal() {
  const totalPriceElement = document.querySelector(".total-price");
  const products = await getProducts();
  const cartItemsData = await getCartItemsFromStorage();
  const total = calculateTotal(products, cartItemsData);
  totalPriceElement.textContent = "Total: $" + total.toFixed(2);
}

async function main() {
  setupHamburgerMenu();
  showLoadingSpinner();
  try {
    await updateCartIcon();
    await createCartItems();
  } catch (error) {
    console.error("Error initializing the cart page:", error);
    displayErrorMessage("We're having trouble setting up the cart. Please refresh or try again later.");
  } finally {
    hideLoadingSpinner();
  }
}

main();
