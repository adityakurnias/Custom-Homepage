import * as iDB from "./db.js";

// ========== Get search input and selected search engine ===
const searchBox = document.getElementById("search-box");
const searchEngine = document.getElementById("search-engine");

// Save selected search engine in localStorage
if (searchEngine) {
  searchEngine.addEventListener("change", () => {
    localStorage.setItem("searchEngine", searchEngine.value);
  });
}

// Search if input is not empty
function search() {
  const query = searchBox ? searchBox.value.trim() : "";
  const engine = searchEngine ? searchEngine.value : "";

  if (query && engine) {
    window.open(`${engine}${query}`);
  } else {
    console.error("Search query or engine is missing.");
  }
}
//============================================================


// ============ Get current time in HH:MM:SS format ==========
function getCurrentTime() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const seconds = now.getSeconds().toString().padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
}

// Update clock display
function updateClock() {
  const timeElement = document.getElementById("time");
  if (timeElement) {
    timeElement.textContent = getCurrentTime();
  }
}
//===========================================================


// ================= Custom cursor logic ====================
const cursorElement = document.getElementById("custom-cursor");
let posX = 0,
  posY = 0;
let mouseX = 0,
  mouseY = 0;
let cursorTimeout;

//Track mouse movement and hide cursor after inactivity
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
//=============================================================


//================= Smooth cursor follow effect ===============
function updateCursorPosition() {
  posX += (mouseX - posX) * 0.2;
  posY += (mouseY - posY) * 0.2;

  if (cursorElement) {
    cursorElement.style.transform = `translate(${posX}px, ${posY}px)`;
  }

  requestAnimationFrame(updateCursorPosition);
}
//=============================================================


// ====== Load saved search engine from localStorage ==========
function loadEngine() {
  const loadSearchEngine = localStorage.getItem("searchEngine");
  if (loadSearchEngine && searchEngine) {
    searchEngine.value = loadSearchEngine;
  }
}

//============================================================


// =========== Add new shortcut functionality ================
const form = document.getElementById("shortcutSect");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const domain = document.getElementById("domain").value;

  if (name && domain) {
    iDB.createData(name, domain);
  } else {
    console.error("Name or Domain cannot be empty.");
  }
});

// ===========================================================



window.onload = () => {
  loadEngine();

  updateClock();
  setInterval(updateClock, 1000); // Update clock every second

  updateCursorPosition(); // Start cursor animation

  setTimeout(() => {
    iDB.getData(); // Load shortcuts after slight delay
  }, 300);
};
