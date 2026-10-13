import { getLocalStorage, setLocalStorage } from "./Storage.mjs";
import { getProducts } from "./ProductService.mjs";

export async function displayProductDetails(productId) {
  const allProd = await getProducts();
  const product = allProd.find(p => Number(p.id) === Number(productId)); 

  // For the HTML...
  document.querySelector("h1").textContent = product.name;
  const img = document.getElementById("productImage");
  if (img) {
    img.src = product.image;
    img.alt = product.name;
  }
  
  document.getElementById("productPrice").textContent = `$${product.price.toLocaleString("es-CL")}`;
  
  document.getElementById("productDesc").textContent = product.descript;

  // Cart
  const btn = document.getElementById("addToCart");
  if (btn) {
    btn.addEventListener("click", () => {
      const cart = getLocalStorage("vonte-cart") || [];
      cart.push(product);
      setLocalStorage("vonte-cart", cart);
    });
  }
}
