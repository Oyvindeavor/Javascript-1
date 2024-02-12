import { api_url, fetchData } from "../utils/fetchdata.mjs";

function displayAllProducts(products) {
  for (const product of products) {
    const { title, image, price, discountedPrice, id } = product;
    // Creating the product container
    const productContainer = document.createElement("div");
    productContainer.classList.add("product-container");

    // Creating title
    const productTitle = document.createElement("h2");
    productTitle.textContent = title;
    productTitle.classList.add("product-title");

    // Creating Image
    const productImg = document.createElement("img");
    productImg.src = image;
    product.alt = title;

    // Standard price
    const standardPrice = document.createElement("p");
    standardPrice.textContent = price;
    standardPrice.classList.add("product-regular-price");

    // Discounted price
    const discountPrice = document.createElement("p");
    discountPrice.textContent = discountedPrice;
    discountPrice.classList.add("product-discounted-price");

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
