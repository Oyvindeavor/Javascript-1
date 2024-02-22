
// Creates a class to an element use this with createElement()
export function createClass(element, className) {
    element.classList.add(className);
    return element;
}

// Creates Element
export function createElement(element) {
    return document.createElement(element);
}

