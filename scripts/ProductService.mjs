//ProductService.mjs
export async function getProducts() {
  // Look for products file
  const resp = await fetch("data/products.json");
  return await resp.json();
}
