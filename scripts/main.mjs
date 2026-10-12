import { getEvents } from "./EventService.mjs";

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
      </article>`;});

  // Cards
  eventsContainer.innerHTML = htmlComp;
}
displayEvents();

//Menu
const menuButton = document.querySelector(".menu-button");
const navLinks = document.querySelector(".nav-links");
menuButton.addEventListener("click", () => {
  navLinks.classList.toggle("show-menu");
});