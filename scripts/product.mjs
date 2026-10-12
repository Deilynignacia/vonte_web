import { displayProductDetails } from "./ProductDetails.mjs";
const productId = new URLSearchParams(window.location.search).get("id"); 
displayProductDetails(Number(productId));

//Menu
const menuButton = document.querySelector(".menu-button");
const navLinks = document.querySelector(".nav-links");
menuButton.addEventListener("click", () => {
  navLinks.classList.toggle("show-menu");
});