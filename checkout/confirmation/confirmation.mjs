import { getProducts } from "../../scripts/utils/fetchdata.mjs";
import { getCartItemsFromStorage, clearAllCartItemsFromStorage, getProductPrice } from "../../scripts/utils/Cart.mjs";
import { createClass, createElement } from "../../scripts/utils/domUtils.mjs";
import { setupHamburgerMenu } from "../../scripts/utils/hamburgerMenu.mjs";

async function appendOrderItemsAndTotal() {
  const orderContainer = document.querySelector(".order-details");

  try {
    // Fetch from api
    const products = await getProducts();
    // Fetch cart items from storage
    const cartItemsData = await getCartItemsFromStorage();
    let totalPrice = 0;

    for (const cartItem of cartItemsData) {
      const product = products.find((product) => product.id === cartItem.id);

      if (product) {
        const orderItemDiv = createClass(createElement("div"), "order-item");

        const img = document.createElement("img");
        img.src = product.image;
        img.alt = product.title;

        const itemDetailsDiv = createClass(createElement("div"), "item-details");

        const productNameHeading = document.createElement("h3");
        productNameHeading.textContent = product.title;

        const quantityParagraph = document.createElement("p");
        quantityParagraph.textContent = `Quantity: ${cartItem.quantity}`;

        const priceParagraph = document.createElement("p");
        const productPrice = getProductPrice(product) * cartItem.quantity;
        priceParagraph.textContent = `Price: $${productPrice.toFixed(2)}`;
        totalPrice += productPrice;

        itemDetailsDiv.appendChild(productNameHeading);
        itemDetailsDiv.appendChild(quantityParagraph);
        itemDetailsDiv.appendChild(priceParagraph);

        orderItemDiv.appendChild(img);
        orderItemDiv.appendChild(itemDetailsDiv);

        orderContainer.appendChild(orderItemDiv);
      }
    }

    //
    const orderTotalDiv = createClass(createElement("div"), "order-total");

    const totalHeading = document.createElement("h2");
    totalHeading.textContent = `Total: $${totalPrice.toFixed(2)}`;
    orderTotalDiv.appendChild(totalHeading);
    orderContainer.appendChild(orderTotalDiv);

    clearAllCartItemsFromStorage();
  } catch (error) {
    console.error("Error:", error);
  }
}

async function main() {
  setupHamburgerMenu();
  await appendOrderItemsAndTotal();
}

main();
