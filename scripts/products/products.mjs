import { createElement } from "../utils/domUtils.mjs";
import { getCartItemsFromStorage, updateCartInStorage } from "../utils/Cart.mjs";
import { getProducts } from "../utils/fetchdata.mjs";
import { cartCounter } from "../utils/Cart.mjs";
async function createCartItems() {
    // Fetch products and cart items data
    const products = await getProducts();
    const cartItemsData = await getCartItemsFromStorage();

    const mainElement = document.querySelector("main");
    // Create cart page container
    const cartPageContainer = createElement("div");
    cartPageContainer.classList.add("cart-page-container");

    // Create cart text
    const cartText = createElement("h1");
    cartText.classList.add("cart-text");
    const cartLength = cartCounter();
    cartText.textContent = `You have ${cartLength} items in your shopping cart`;

    // Create cart items container
    const cartItems = createElement("div");
    cartItems.classList.add("cart-items");

    // Append elements to cart page container
    cartPageContainer.appendChild(cartText);
    cartPageContainer.appendChild(cartItems);

    // Append cart page container to main element
    mainElement.appendChild(cartPageContainer);

    // Loop through cart items data and create cart item elements
    for (const itemId of cartItemsData) {
        const product = products.find(product => product.id === itemId);
        if (product) {
            const cartItemContainer = createCartItem(product);
            cartItems.appendChild(cartItemContainer);
        }
    }

    // Create cart summary container
    const cartSummaryContainer = createElement("div");
    cartSummaryContainer.classList.add("cart-summary");

    // Create total price element
    const totalPrice = createElement("p");
    totalPrice.classList.add("total-price");
    totalPrice.textContent = "Total: $19.99"; 
    cartSummaryContainer.appendChild(totalPrice);

    // Create checkout button
    const checkoutButton = createElement("button");
    checkoutButton.classList.add("checkout-btn");
    checkoutButton.textContent = "Checkout";
    cartSummaryContainer.appendChild(checkoutButton);

    // Append cart summary container to cart page container
    cartPageContainer.appendChild(cartSummaryContainer);
}

// Function to create a cart item element
function createCartItem(product) {
    const cartItemContainer = createElement("div");
    cartItemContainer.classList.add("cart-item");

    const productImg = createElement("img");
    productImg.src = product.image;
    productImg.alt = product.title;

    const itemDetails = createElement("div");
    itemDetails.classList.add("item-details");

    const productName = createElement("h2");
    productName.textContent = product.title;

    const productPrice = createElement("p");
    productPrice.textContent = product.price;

    const removeItemButton = createElement("button");
    removeItemButton.classList.add("remove-item-btn");
    removeItemButton.textContent = "Remove";

    removeItemButton.addEventListener("click", function() {
        const productId = product.id;
        removeItemFromCart(productId);
        updateCartText();
    });

    cartItemContainer.appendChild(productImg);
    cartItemContainer.appendChild(itemDetails);
    itemDetails.appendChild(productName);
    itemDetails.appendChild(productPrice);
    itemDetails.appendChild(removeItemButton);

    return cartItemContainer;
}

function updateCartText() {
    const cartText = document.querySelector(".cart-text");
    const cartLength = cartCounter();
    cartText.textContent = `You have ${cartLength} items in your shopping cart`;
}


export function removeItemFromCart(productId) {
    let cartItems = getCartItemsFromStorage();
    cartItems = cartItems.filter(itemId => itemId !== productId); 
    updateCartInStorage(cartItems);
    updateCartUI(); 
}


async function updateCartUI() {
    const cartItemsContainer = document.querySelector(".cart-items");
    cartItemsContainer.innerHTML = ""; 

    // Fetch products and cart items data
    const products = await getProducts();
    const cartItemsData = await getCartItemsFromStorage();

    // Loop through cart items data and create cart item elements
    for (const itemId of cartItemsData) {
        const product = products.find(product => product.id === itemId);
        if (product) {
            const cartItemContainer = createCartItem(product);
            cartItemsContainer.appendChild(cartItemContainer);
        }
    }
}


async function updatePriceTotal() {
    // Fetch products and cart items data
    const products = await getProducts();
    const cartItemsData = await getCartItemsFromStorage();

    // Calculate total price based on the items in the cart
    let totalPrice = 0;
    for (const itemId of cartItemsData) {
        const product = products.find(product => product.id === itemId);
        if (product) {
            totalPrice += product.price;
        }
    }

    
    const totalPriceElement = document.querySelector(".total-price");
    
    totalPriceElement.textContent = `Total: $${totalPrice.toFixed(2)}`; 
}


