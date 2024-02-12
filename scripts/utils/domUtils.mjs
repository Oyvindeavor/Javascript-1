// Adds a class to an element
export function addClass(element, className) {
    element.classList.add(className);
    return element;
  }

// Creates Element
export function createElement(element) {
    return document.createElement(element);
  }
  

// Creates elements and containers to the product page description. 
export function displayProduct(product) {
    const productContainer = addClass(createElement("div"), "product-page-container");
  
    const productImageContainer = addClass(createElement("div"), "product-page-image");
  
    const productImg = createElement("img");
    productImg.src = product.image;
    productImg.alt = product.title;
    productImageContainer.appendChild(productImg);
  
    const productDetails = addClass(createElement("div"), "product-page-details");
  
    const productTitle = addClass(createElement("h1"), "product-page-title");
    productTitle.textContent = product.title;
    productDetails.appendChild(productTitle);
  
    const productDescription = addClass(createElement("p"), "product-page-description");
    productDescription.textContent = product.description;
  
    productDetails.appendChild(productDescription);
  
    const productPrice = addClass(createElement("p"), "product-page-price");
    productPrice.textContent = product.price;
  
    productDetails.appendChild(productPrice);
  
    const addToCartButton = addClass(createElement("button"), "add-to-cart-btn");
    addToCartButton.textContent = "Add to Cart";
  
    productDetails.appendChild(addToCartButton);
  
    productContainer.appendChild(productImageContainer);
  
    productContainer.appendChild(productDetails);
  
    // Append product container to the <main> element
    const mainElement = document.querySelector("main");
    mainElement.appendChild(productContainer);
  }

  export function displayAllProducts(products) {
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
      const anchorElement = createElement("a");
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
  

  // Function to display products on sale 
export function displaySaleItems(products) {
    for (const product of products) {
      if (product.onSale) {
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
        anchorElement.href = `product/index.html?productId=${productId}&productTitle=${productTitle.textContent}`;
  
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
  }