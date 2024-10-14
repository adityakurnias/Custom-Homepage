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

// ============ Get current time ==========

// Update clock display
function updateClock() {
  const now = new Date();

  const timeElement = document.getElementById("time");
  const dateElement = document.getElementById("date");

  if (timeElement && dateElement) {
    timeElement.textContent = now.toLocaleTimeString();
    dateElement.textContent = now.toDateString();
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

// ===========================================================

// =============== Side bar =============================
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
