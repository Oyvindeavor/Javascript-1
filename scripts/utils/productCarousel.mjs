import { createClass, createElement } from "./domUtils.mjs"

// Create image carousel
function generateImageCarouselHmtl(){
    const productCarouselContainer = createClass(createElement("div"), "carousel");

    const carouselItems = createClass(createElement("div"), "carousel-items");

    const carouselItem = createClass(createElement("div"), "carousel-item");
    const carouselItem2 = createClass(createElement("div"), "carousel-item");
    const carouselItem3 = createClass(createElement("div"), "carousel-item");
    const carouselItem4 = createClass(createElement("div"), "carousel-item");

    const previousButton = createClass(createElement("button"), "prev-button");
    const nextButton = createClass(createElement("button"), "next-button");

    

}