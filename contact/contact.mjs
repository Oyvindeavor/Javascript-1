import { updateCartIcon } from "../scripts/utils/Cart.mjs";

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
    await updateCartIcon();
    initializeSubmitButton();
}

main();