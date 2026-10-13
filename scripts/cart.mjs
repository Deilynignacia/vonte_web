import { getLocalStorage, setLocalStorage } from "./Storage.mjs";
import { setupNavigation } from "./Navigation.mjs";

function displayCart() {
  const cartCont = document.querySelector("#cart-container");
  const cartTotal = document.querySelector("#cartTotal");
  const cartItems = getLocalStorage("vonte-cart") || [];
  
  if (!cartItems.length) {
    cartCont.innerHTML = "<p>Your cart is empty :(</p>";
    cartTotal.textContent = "\$0";
    return;
  }
  
  let htmlComp = "";
  let sumaTotal = 0; 
  
  cartItems.forEach((item) => {
    sumaTotal += item.price; 
    htmlComp += `
      <div class="cart-item" style="display:flex; gap:15px; margin-bottom:15px; align-items:center;">
        <img src="${item.image}" alt="${item.name}" width="80">
        <div style="flex-grow:1;">
          <h4>${item.name}</h4>
          <p>$${item.price.toLocaleString("es-CL")}</p>
        </div>
        <button class="button rem-item" data-id="${item.id}" style="background-color:#333; padding:0.4rem 0.6rem;">
          <i class="fa-solid fa-trash" style="pointer-events:none;"></i>
        </button>
      </div>`;
  });
  
  cartCont.innerHTML = htmlComp;
  cartTotal.textContent = `$${sumaTotal.toLocaleString("es-CL")}`;
  
  document.querySelectorAll(".rem-item").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const list = getLocalStorage("vonte-cart") || [];
      const pos = list.findIndex(p => Number(p.id) === Number(e.target.dataset.id));
      
      if (pos > -1) {
        list.splice(pos, 1);
        setLocalStorage("vonte-cart", list);
        displayCart(); // refresh...
      }
    });
  });
}

// checkout
const checkoutB = document.querySelector("#checkoutB");

if (checkoutB) {
  checkoutB.addEventListener("click", () => {
    const cartItems = getLocalStorage("vonte-cart") || [];
    if (cartItems.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    // fake payment (correct when page is functional and open)
    alert("Thank you for your purchase!");
    setLocalStorage("vonte-cart", []);
    location.reload();
  });
}

displayCart();
setupNavigation();
