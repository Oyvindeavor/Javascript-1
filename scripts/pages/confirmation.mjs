
import { getProducts } from "../utils/fetchdata.mjs";
import { getCartItemsFromStorage, clearAllCartItemsFromStorage } from "../utils/Cart.mjs";
import { getProductPrice } from "../utils/Cart.mjs";

async function appendOrderItemsAndTotal() {
  const orderContainer = document.querySelector(".order-details");

  try {
    const products = await getProducts();
    const cartItemsData = await getCartItemsFromStorage();
    let totalPrice = 0;

    for (const cartItem of cartItemsData) {
      const product = products.find((product) => product.id === cartItem.id);

      if (product) {
        const orderItemDiv = document.createElement("div");
        orderItemDiv.classList.add("order-item");

        const img = document.createElement("img");
        img.src = product.image;
        img.alt = product.title;

        const itemDetailsDiv = document.createElement("div");
        itemDetailsDiv.classList.add("item-details");

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

    // Display total price
    const orderTotalDiv = document.createElement("div");
    orderTotalDiv.classList.add("order-total");
    const totalHeading = document.createElement("h2");
    totalHeading.textContent = `Total: $${totalPrice.toFixed(2)}`;
    orderTotalDiv.appendChild(totalHeading);
    orderContainer.appendChild(orderTotalDiv);

    clearAllCartItemsFromStorage();
  } catch (error) {
    console.error("Error:", error);
  }
}

async function main(){
    await appendOrderItemsAndTotal();
}

main();
