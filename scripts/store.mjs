import { getProducts } from "./ProductService.mjs";
import { getLocalStorage, setLocalStorage } from "./Storage.mjs";


async function initStore() {
  const container = document.querySelector("#products-container");
  if (!container) return;
  const allProd = await getProducts();
  function render(list) {
    container.innerHTML = list.map(p => `
      <article class="product-card">
        <a href="product.html?id=${p.id}"><img src="${p.image}" alt="${p.name}"></a>
        <div class="product-card-cont">
          <a href="product.html?id=${p.id}" style="text-decoration:none; color:inherit;">
            <h3>${p.name}</h3>
          </a>
          <p class="product-des">${p.descript}</p>
          <p class="product-price">$${p.price.toLocaleString("es-CL")}</p>
          <button class="button add-to-cart" data-id="${p.id}">Add to Cart</button>
        </div>
      </article>
    `).join("");
  }
  container.addEventListener("click", (e) => {
    if (e.target.classList.contains("add-to-cart")) {
      const productId = e.target.dataset.id;
      const item = allProd.find(p => p.id == productId);      
      if (item) {
        const cartItems = getLocalStorage("vonte-cart") || [];
        cartItems.push(item);
        setLocalStorage("vonte-cart", cartItems);
        alert(`${item.name} added to cart!`);
      }
    }
  });
  // Filter by categories
  const filterB = document.querySelectorAll(".filter-button");
  filterB.forEach(btn => {
    btn.addEventListener("click", (e) => {
      const cat = e.target.dataset.category;
            let productosFiltrados;
      if (cat === "all") {
        productosFiltrados = allProd;
      } else {
        productosFiltrados = allProd.filter(p => p.category === cat);
      }      
      render(productosFiltrados);
      const activeBtn = document.querySelector(".filter-button.active");
      if (activeBtn) {
        activeBtn.classList.remove("active");}
      e.target.classList.add("active");
    });});
  render(allProd);
}
initStore();
//Menu (Three lines, just for mobile)
const menuButton = document.querySelector(".menu-button");
const navLinks = document.querySelector(".nav-links");
if (menuButton && navLinks) {
  menuButton.addEventListener("click", () => {
    navLinks.classList.toggle("show-menu");
  });
}
