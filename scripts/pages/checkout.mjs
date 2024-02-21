
import { createElement } from "../utils/domUtils.mjs";
import {  getCartItemsFromStorage, updateCartInStorage } from "../utils/Cart.mjs";
import { getProducts } from "../utils/fetchdata.mjs";
import { cartCounter } from "../utils/Cart.mjs";


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
    const cartText = createElement("h1");
    cartText.classList.add("cart-text");
    const cartLength = cartCounter();
    cartText.textContent = `You have ${cartLength} items in your shopping cart`;
    return cartText;
}

function createCartItemsContainer(cartItemsData, products) {
    const cartItemsContainer = createElement("div");
    cartItemsContainer.classList.add("cart-items");
    for (const cartItem of cartItemsData) {
        const product = products.find(product => product.id === cartItem.id);
        if (product) {
            const cartItemContainer = createCartItem(product, cartItem.quantity);
            cartItemsContainer.appendChild(cartItemContainer);
        }
    }
    return cartItemsContainer;
}


function createCartItem(product, quantity) {
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
    if (product.onSale === true) {
        productPrice.textContent = product.discountedPrice;
    } else {
        productPrice.textContent = product.price;
    }

    const productQuantity = createElement("p"); 
    productQuantity.textContent = `Quantity: ${quantity}`; 
    
    const removeItemButton = createElement("button");
    removeItemButton.classList.add("remove-item-btn");
    removeItemButton.textContent = "Remove";

    removeItemButton.addEventListener("click", function() {
        const productId = product.id;
        const updatedQuantity = removeItemFromCart(productId); 
        productQuantity.textContent = `Quantity: ${updatedQuantity}`;
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
    const totalPrice = createElement("p");
    totalPrice.classList.add("total-price");
    const total = calculateTotal(products, cartItemsData);
    totalPrice.textContent = `Total: $${total.toFixed(2)}`;
    return totalPrice;
}

function calculateTotal(products, cartItemsData) {
    let totalPrice = 0;

    for (const cartItem of cartItemsData) {
        // Find the product in the products list based on its ID
        const product = products.find(product => product.id === cartItem.id);

        if (product) {
            // Check if the product is on sale
            if (product.onSale) {
                // If it's on sale, use the discounted price
                totalPrice += product.discountedPrice * cartItem.quantity;
            } else {
                // If it's not on sale, use the regular price
                totalPrice += product.price * cartItem.quantity;
            }
        }
    }

    return totalPrice;
}

function createCartPageContainer() {
    const cartPageContainer = createElement("div");
    cartPageContainer.classList.add("cart-page-container");
    return cartPageContainer;
}

function createCartSummaryContainer() {
    const cartSummaryContainer = createElement("div");
    cartSummaryContainer.classList.add("cart-summary");
    return cartSummaryContainer;
}

function createCheckoutButton() {
    const checkoutButton = createElement("button");
    checkoutButton.classList.add("checkout-btn");
    checkoutButton.textContent = "Checkout";
    if ()
    checkoutButton.addEventListener('click', function() {
        // Navigate to the confirmation page
        window.location.href = './confirmation/index.html';
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
    cartText.textContent = `You have ${totalQuantity} items in your shopping cart`;
}
export function removeItemFromCart(productId) {
    let cartItems = getCartItemsFromStorage();
    
    // Find the index of the item with the given productId in the cartItems array
    const itemIndex = cartItems.findIndex(item => item.id === productId);
    
    if (itemIndex !== -1) {
        cartItems[itemIndex].quantity -= 1;
        
        // If the quantity becomes 0, remove the item from the cart
        if (cartItems[itemIndex].quantity === 0) {
            cartItems.splice(itemIndex, 1);
        }
        
        // Update the cart in storage
        updateCartInStorage(cartItems);
        
        // Return the updated quantity
        return cartItems[itemIndex] ? cartItems[itemIndex].quantity : 0;
    }
    
    // Return 0 if the item does not exist in the cart
    return 0;
}
export async function updateCartUI() {
    const cartItemsContainer = document.querySelector(".cart-items");
    cartItemsContainer.innerHTML = "";
    const products = await getProducts();
    const cartItemsData = await getCartItemsFromStorage();
    console.log(products);
console.log(cartItemsData);
    for (const cartItem of cartItemsData) { 
        const product = products.find(product => product.id === cartItem.id);
        if (product) {
            const cartItemContainer = createCartItem({...product, quantity: cartItem.quantity}); 
            cartItemsContainer.appendChild(cartItemContainer);
        }
    }
    updatePriceTotal();
    updateCartText();

}

async function updatePriceTotal() {
    const totalPriceElement = document.querySelector(".total-price");
    const products = await getProducts();
    const cartItemsData = await getCartItemsFromStorage();
    const total = calculateTotal(products, cartItemsData);
    totalPriceElement.textContent = `Total: $${total.toFixed(2)}`;
}



createCartItems();
