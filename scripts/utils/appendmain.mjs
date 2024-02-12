const mainElement = document.querySelector("main");
  if (mainElement) {
    mainElement.appendChild(productContainer);
  } else {
    console.error("<main> element not found.");
  }

export {mainElement};

function appendTo(element){
    element = document.querySelector(element);
    element.appendChild(element);
    console.log(element);    
}

appendTo("main");