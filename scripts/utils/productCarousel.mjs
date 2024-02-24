import { createClass, createElement } from "./domUtils.mjs"
import { getProducts } from "./fetchdata.mjs";

export async function generateProductCarousel(){
    const mainElement = document.querySelector("main");
    const itemsContainer = createClass(createElement("div"), ".items-container");

    
}