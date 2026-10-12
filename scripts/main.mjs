import { getEvents } from "./EventService.mjs";
import { getDailyQuote } from "./QuoteService.mjs";
import { setupNavigation } from "./Navigation.mjs";

async function displayEvents() {
  const eventsContainer = document.querySelector("#events-container");

  // Get Events list
  const events = await getEvents(); 
  let htmlComp = ""; 
  events.forEach((event) => {
    htmlComp += `<article class="event-card">
        <img src="${event.image}" alt="${event.title}">
        <div class="event-card-content">
          <h3>${event.title}</h3>
          <p>${event.date}</p>
          <p>${event.location}</p>
          <p>${event.descript}</p>
        </div>
      </article>`;}
    );

  eventsContainer.innerHTML = htmlComp;
}
displayEvents();

async function displayQuote() {
  const quoteContainer = document.querySelector("#quote-container");
  if (!quoteContainer) return; 

  const quoteData = await getDailyQuote();
  
  quoteContainer.innerHTML = `
    <div style="text-align: 
    center; padding: 2rem 1rem; 
    border-top: 1px solid #333; 
    border-bottom: 1px solid #333;">
      <i class="fa-solid fa-quote-left" 
      style="color: #a81c31; 
      font-size: 1.8rem; 
      margin-bottom: 1rem;"></i>
      <h3 style="font-family: 'Montserrat', sans-serif; 
      font-style: italic; 
      font-weight: 300; 
      font-size: 1.4rem; 
      color: #fff; 
      line-height: 1.6; 
      margin: 0 0 1rem 0;">

        ${quoteData.text}

      </h3>
      <p style="color: #999; 
      font-size: 0.85rem; 
      font-weight: 600; 
      text-transform: uppercase; 
      letter-spacing: 2px;">
        — ${quoteData.author}
      </p>
    </div>
  `;
}
displayQuote();
setupNavigation();