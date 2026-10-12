import { getProducts } from "./ProductService.mjs";
import { getLocalStorage, setLocalStorage } from "./Storage.mjs";
import { convMoneda } from "./CurrencyService.mjs"; // for API
import { setupNavigation } from "./Navigation.mjs";

async function initStore() {
  const container = document.querySelector("#products-container");
  if (!container) return;

  const allProd = await getProducts();

  let CurrProd = allProd; 
  let CurrMon = "CLP"; 
  async function render(list) {
    const htmlArray = await Promise.all(list.map(async (p) => {
      const precioConvertido = await convMoneda(p.price, CurrMon);
      
      let simb = "\$";
      if (CurrMon === "EUR") simb = "€";
      if (CurrMon === "USD") simb = "US\$";
      const precioFormateado = CurrMon === "CLP" 
        ? precioConvertido.toLocaleString("es-CL") 
        : precioConvertido.toFixed(2);

      return `
        <article class="product-card">
          <a href="product.html?id=${p.id}"><img src="${p.image}" alt="${p.name}"></a>

          <div class="product-card-cont">
            <a href="product.html?id=${p.id}" 
            style="text-decoration:none; 
            color:inherit;">
            
            <h3>${p.name}</h3>
            </a>
            <p class="product-des">${p.descript}</p>
            <p class="product-price">${simb}${precioFormateado}</p>
            <button class="button add-to-cart" data-id="${p.id}">Add to Cart</button>
          </div>
        </article>
      `;
    }));
    container.innerHTML = htmlArray.join("");
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
      if (cat === "all") {
        CurrProd = allProd;
      } else {
        CurrProd = allProd.filter(p => p.category === cat);
      }   
      render(CurrProd);
      const activeBtn = document.querySelector(".filter-button.active");
      if (activeBtn) {
        activeBtn.classList.remove("active");
      }
      e.target.classList.add("active");
    });
  });

  const selectorMoneda = document.querySelector(".currency-control select");
  if (selectorMoneda) {
    selectorMoneda.addEventListener("change", (e) => {
      CurrMon = e.target.value;
      render(CurrProd);
    });
  }
  render(allProd);
}
initStore();
setupNavigation();