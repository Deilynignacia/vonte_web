export async function getEvents() {
  // Look for events file
  const resp = await fetch("data/events.json"); 
  return await resp.json();
}
