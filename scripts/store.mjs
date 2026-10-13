import { getProducts } from "./ProductService.mjs";
import { getLocalStorage, setLocalStorage } from "./Storage.mjs";
import { convMoneda } from "./CurrencyService.mjs"; // for API (check later for other currencies)
import { setupNavigation } from "./Navigation.mjs";

async function initStore() {
  const container = document.querySelector("#products-container");
  if (!container) return;
  const allProd = await getProducts();

  let CurrProd = allProd; 
  let CurrMon = getLocalStorage("vonte-currency") || "CLP"; 
  let CurrCat = getLocalStorage("vonte-category") || "all";

  // this is for the cards...
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
            <a href="product.html?id=${p.id}" style="text-decoration:none; color:inherit;">
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
      CurrCat = cat;
      setLocalStorage("vonte-category", CurrCat);
      
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

  // curr
  const selectorMoneda = document.querySelector(".currency-control select");
  if (selectorMoneda) {
    selectorMoneda.value = CurrMon;
    selectorMoneda.addEventListener("change", (e) => {
      CurrMon = e.target.value;
      setLocalStorage("vonte-currency", CurrMon);
      render(CurrProd);
    });
  }

  // local
  if (CurrCat === "all") {
    CurrProd = allProd;
  } else {
    CurrProd = allProd.filter(p => p.category === CurrCat);
  }

  const savedFilter = document.querySelector(`.filter-button[data-category="${CurrCat}"]`);
  if (savedFilter) {
    const activeBtn = document.querySelector(".filter-button.active");
    if (activeBtn) {
      activeBtn.classList.remove("active");
    }
    savedFilter.classList.add("active");
  }

  render(CurrProd);
}

initStore();
setupNavigation();