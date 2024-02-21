// Import necessary functions from other modules
import { getProducts } from "../utils/fetchdata.mjs";
import { getCartItemsFromStorage, clearAllCartItemsFromStorage } from "../utils/Cart.mjs";

export async function appendOrderItemsAndTotal() {
    // Get the container where order items will be appended
    const orderContainer = document.querySelector('.order-details');
    console.log("Grabbing order-details", orderContainer);

    try {
       
        const products = await getProducts();
        console.log("getting all products from api", products)
        // Retrieve cart items from storage
        const cartItemsData = await getCartItemsFromStorage();
        console.log("getting all products from localstorage", cartItemsData)

        // Variable to hold the total price
        let totalPrice = 0;
        console.log(cartItemsData);

        // Iterate over the cart items and create HTML for each item
        for (const cartItem of cartItemsData) {
            const itemId = cartItem.id; 
            
            
            const product = products.find(product => product.id === itemId);
            console.log("Product found:", product);
            
            if (product) {
                
                const orderItemDiv = document.createElement('div');
                orderItemDiv.classList.add('order-item');
                
                const img = document.createElement('img');
                img.src = product.image;
                img.alt = product.title;
                
                const itemDetailsDiv = document.createElement('div');
                itemDetailsDiv.classList.add('item-details');
        
                const productNameHeading = document.createElement('h3');
                productNameHeading.textContent = product.title;
        
                const priceParagraph = document.createElement('p');
                if (product.onSale === true) {
                    priceParagraph.textContent = `Price: $${product.discountedPrice.toFixed(2)}`;
                    totalPrice += product.discountedPrice;
                } else {
                    priceParagraph.textContent = `Price: $${product.price.toFixed(2)}`;
                    totalPrice += product.price;
                }
        
                // Append elements to the order item div
                itemDetailsDiv.appendChild(productNameHeading);
                itemDetailsDiv.appendChild(priceParagraph);
        
                orderItemDiv.appendChild(img);
                orderItemDiv.appendChild(itemDetailsDiv);
        
                // Append the order item div to the order container
                orderContainer.appendChild(orderItemDiv);
            }
        }
        
        // Create element for order total
        const orderTotalDiv = document.createElement('div');
        orderTotalDiv.classList.add('order-total');
        

        const totalHeading = document.createElement('h2');
        totalHeading.textContent = `Total: $${totalPrice.toFixed(2)}`;

        // Append order total to order container
        orderTotalDiv.appendChild(totalHeading);
        orderContainer.appendChild(orderTotalDiv);

        clearAllCartItemsFromStorage();
    } catch (error) {
        console.error("Error:", error);
    }
}

appendOrderItemsAndTotal()

