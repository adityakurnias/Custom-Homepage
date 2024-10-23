import * as iDB from "./db.js";

let searchBox = document.getElementById("search-box");
let searchEngineList = document.getElementById("search-engine");

searchEngineList.addEventListener("change", () => {
  localStorage.setItem("searchEngine", searchEngineList.value);
});

function validateDomain(string) {
  const urlRegex = /^(((http|https):\/\/|)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,6}(:[0-9]{1,5})?(\/.*)?)$/;

  const found = string.match(urlRegex)
  return found ? found[0] : false
}

function loadEngine() {
  const loadSearchEngine = localStorage.getItem("searchEngine");
  if (loadSearchEngine && searchEngineList) {
    searchEngineList.value = loadSearchEngine;
  }
}

function search() {
  let query = searchBox.value
  let engine = searchEngineList.value
  if (validateDomain(query)) {
    window.open('https://' + validateDomain(query))
  } else if (query) {
    window.open(`${engine}${query}`)
  }
  else {
    alert("Missing query")
  }
}

document.getElementById("search-container").addEventListener("submit",() => {
  search();
});

function updateClock() {
  const now = new Date();

  const timeElement = document.getElementById("time");
  const dateElement = document.getElementById("date");

  if (timeElement && dateElement) {
    timeElement.textContent = now.toLocaleTimeString();
    dateElement.textContent = now.toDateString();
  }
}

const cursorElement = document.getElementById("custom-cursor");
let posX = 0,
  posY = 0;
let mouseX = 0,
  mouseY = 0;
let cursorTimeout;

document.addEventListener("mousemove", (event) => {
  mouseX = event.clientX;
  mouseY = event.clientY;

  if (cursorElement) {
    clearTimeout(cursorTimeout);
    showCustomCursor();

    cursorTimeout = setTimeout(hideCustomCursor, 3000);
  }
});

function showCustomCursor() {
  cursorElement.style.backgroundColor = "rgba(137, 43, 226, 0.3)";
  cursorElement.style.backdropFilter = "blur(1px)";
  cursorElement.style.border = "1px solid rgba(255, 255, 255, 0.2)";
}

function hideCustomCursor() {
  cursorElement.style.backgroundColor = "rgba(137, 43, 226, 0)";
  cursorElement.style.backdropFilter = "blur(0)";
  cursorElement.style.border = "1px solid rgba(255, 255, 255, 0)";
}

function updateCursorPosition() {
  posX += (mouseX - posX) * 0.2;
  posY += (mouseY - posY) * 0.2;

  if (cursorElement) {
    cursorElement.style.transform = `translate(${posX}px, ${posY}px)`;
  }

  requestAnimationFrame(updateCursorPosition);
}

const form = document.getElementById("shortcutSect");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let name = document.getElementById("name");
  let domain = document.getElementById("domain");

  if (name.value && domain.value) {
    iDB.createData(name.value, domain.value);
    name.value = "";
    domain.value = "";
  } else {
    console.error("Name or Domain cannot be empty.");
  }
});

const close = document.getElementById("close");
const open = document.getElementById("open");
const sidebar = document.querySelector("aside");

open.addEventListener("click", () => {
  sidebar.style.width = "280px";
  open.style.opacity = "0";
});

close.addEventListener("click", () => {
  sidebar.style.width = "0";
  open.style.opacity = "1";
});

window.onload = () => {
  loadEngine();

  updateClock();
  setInterval(updateClock, 1000); // Update clock every second

  updateCursorPosition(); // Start cursor animation

  setTimeout(() => {
    iDB.getData(); // Load shortcuts after slight delay
  }, 300);
};
