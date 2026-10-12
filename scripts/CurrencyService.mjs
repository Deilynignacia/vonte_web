// 1st API: Frankfurter (for currency) - CLP, USD & EUR
const TASA_FIJA_USD = 950; 
export async function convMoneda(precioCLP, monedaDestino) {
  if (monedaDestino === "CLP") return precioCLP;
 
  const precioEnUSD = precioCLP / TASA_FIJA_USD;
 
  if (monedaDestino === "USD") return precioEnUSD;
  if (monedaDestino === "EUR") {
    try {const response = await fetch("https://api.frankfurter.dev/v2/rate/usd/eur");
      const data = await response.json();
      return precioEnUSD * data.rate; 
    } 
    catch (error) {
      console.error("Error con la API:", error);
      return precioEnUSD * 0.89;
    }}
}