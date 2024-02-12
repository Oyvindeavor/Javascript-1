import { api_url, fetchData } from "../utils/fetchdata.mjs";
import { addClass } from "../utils/addclass.mjs";
import { createElement } from "../utils/createelement.mjs";

function displayAllProducts(products) {
  for (const product of products) {
    const { title, image, price, discountedPrice, id } = product;
    // Creating the product container
    const productContainer = addClass(createElement("div"), "product-container");

    // Creating title
    const productTitle = addClass(createElement("h2"), "product-title"); 
    productTitle.textContent = title;

    // Creating Image
    const productImg = createElement("img");
    productImg.src = image;
    product.alt = title;

    // Standard price
    const standardPrice = addClass(createElement("p"), "product-regular-price");
    standardPrice.textContent = price;

    // Discounted price
    const discountPrice = addClass(createElement("p"), "product-discounted-price");
    discountPrice.textContent = discountedPrice;

    // Product Id
    let productId;
    productId = id;

    // Create anchor element
    const anchorElement = document.createElement("a");
    anchorElement.href = `/product/index.html?productId=${productId}&productTitle=${productTitle.textContent}`;

    // Add event listener for the anchor

    // Append the product container
    document.querySelector(".items-container").appendChild(productContainer);

    //append the rest
    productContainer.appendChild(anchorElement);
    anchorElement.appendChild(productImg);
    anchorElement.appendChild(productTitle);
    productContainer.appendChild(standardPrice);
    productContainer.appendChild(discountPrice);
  }
}

async function getAndDisplayAllProducts() {
  try {
    const allProducts = await fetchData(api_url);
    displayAllProducts(allProducts);
    console.log(allProducts.genre);
  } catch (error) {
    console.error("Unable to get items", error.message);
  }
}

getAndDisplayAllProducts();
