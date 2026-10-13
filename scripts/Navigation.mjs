// Menu (Three lines, for mobile only)
export function setupNavigation() {
  
  const menuButton = document.querySelector(".menu-button");
  const navLinks = document.querySelector(".nav-links");

  if (!menuButton || !navLinks) {
    return;
  }
  menuButton.addEventListener("click", () => {
    navLinks.classList.toggle("show-menu");
  });
}