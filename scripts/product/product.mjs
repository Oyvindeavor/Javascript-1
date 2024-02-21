import { displayProduct } from "../utils/domUtils.mjs";

// Gets the ID from the url
export function getIdFromUrl() {
  const filterUrl = new URLSearchParams(window.location.search);
  const productId = filterUrl.get("productId");
  return productId;
}



function main(){
  const urlProductId = getIdFromUrl();
  displayProduct(urlProductId);


}

main();