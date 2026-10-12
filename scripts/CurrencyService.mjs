// 1st API: Frankfurter (for currency) - CLP, USD & EUR
const TASA_FIJA_USD = 950; 

export async function convMoneda(precioCLP, monedaDestino) {
  if (monedaDestino === "CLP") return precioCLP;
 
  const precioEnUSD = precioCLP / TASA_FIJA_USD;
  if (monedaDestino === "USD") return precioEnUSD;
  if (monedaDestino === "EUR") {
    try {
      const response = await fetch("https://frankfurter.dev");
      const data = await response.json();
      const cambioEur = data.find(item => item.quote === "EUR");
      return cambioEur ? precioEnUSD * cambioEur.rate : precioEnUSD * 0.89;
    } 
    catch (error) {
      console.error("Error con la API:", error);
      return precioEnUSD * 0.89; //(at the time it is 0.89 (check later!!))
    }
  }
}
