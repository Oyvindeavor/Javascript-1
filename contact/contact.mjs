import { updateCartIcon } from "../scripts/utils/Cart.mjs";
import { setupHamburgerMenu } from "../scripts/utils/hamburgerMenu.mjs";

function submitContactForm(event) {
    event.preventDefault();

    var thankYouMessage = document.getElementById("thankYouMessage");
    thankYouMessage.style.display = "block";


    document.getElementById("contact-form").style.display = "none";
}

function initializeSubmitButton() {
    document.getElementById("contact-form").onsubmit = submitContactForm;
}

async function main() {
    setupHamburgerMenu();
    await updateCartIcon();
    initializeSubmitButton();
}

main();