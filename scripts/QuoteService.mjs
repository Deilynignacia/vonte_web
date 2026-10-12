// 2nd API: DummyJSON (For inspirational and motivational quotes)
export async function getDailyQuote() {
  try {
    const resp = await fetch("https://dummyjson.com/quotes/random");
    if (!resp.ok) throw new Error("Error... :(");
    
    const data = await resp.json();
    
    return {
      text: data.quote,
      author: data.author
    };
  } catch (error) {
    console.error("Error al obtener la cita:", error);
    
    // In case of error...
    return {
      text: "Dance is the hidden language of the soul.",
      author: "Martha Graham"
    };
  }
}
