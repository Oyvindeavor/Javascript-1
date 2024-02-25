export function setupHamburgerMenu() {
    document.addEventListener('DOMContentLoaded', function() {
        const menuBtn = document.getElementById('menuBtn');
        const navMenu = document.getElementById('navMenu');

        if (menuBtn) {
            menuBtn.addEventListener('click', function() {
                navMenu.classList.toggle('open');
            });
        }
    });
}