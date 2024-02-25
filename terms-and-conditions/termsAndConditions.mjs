import { updateCartIcon } from "../scripts/utils/Cart.mjs";
import { setupHamburgerMenu } from "../scripts/utils/hamburgerMenu.mjs";



async function main() {
    setupHamburgerMenu();
    await updateCartIcon();
}

main();