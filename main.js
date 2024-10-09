function search() {
  // Get the value from the search box input
  const searchBox = document.getElementById("search-box").value;
  // Base Google search URL
  const googleSearchUrl = "https://google.com/search?q=";

  // Open the search in a new window if search box is not empty
  if (!searchBox == "") {
    window.open(`${googleSearchUrl}${searchBox}`);
  }
}

// Function to get the current time in HH:MM:SS format
function getCurrentTime() {
  const now = new Date(); // Get the current date and time
  // Convert hours, minutes, and seconds to strings and add leading zeros if necessary
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const seconds = now.getSeconds().toString().padStart(2, "0");

  // Return the formatted time as a string
  return `${hours}:${minutes}:${seconds}`;
}

// Function to update the displayed time on the page
function updateClock() {
  // Get the element where the time will be displayed
  const timeElement = document.getElementById("time");
  // Check if the time element exists and update its content with the current time
  if (timeElement) {
    timeElement.innerHTML = getCurrentTime();
  }
}

const cursorElement = document.getElementById("custom-cursor"); // Get the custom cursor element
let posX = 0,
  posY = 0; // Initial cursor position
let mouseX = 0,
  mouseY = 0; // Position of the mouse pointer
let cursorTimeout;

// Update custom cursor position based on mouse movement
document.addEventListener("mousemove", (event) => {
  mouseX = event.clientX;
  mouseY = event.clientY;

  // If the cursor element exists, handle its visibility and position
  if (cursorElement) {
    // Clear any existing timeout to prevent flickering
    clearTimeout(cursorTimeout);

    // Set the cursor opacity to 1, default 0
    cursorElement.style.backgroundColor = "rgba(137, 43, 226, 0.3)"
    cursorElement.style.backdropFilter = "blur(1px)"
    cursorElement.style.border = "1px solid rgba(255, 255, 255, 0.2)"

    // Hide the cursor after 3 second of inactivity
    cursorTimeout = setTimeout(() => {
      cursorElement.style.backgroundColor = "rgba(137, 43, 226, 0)"
      cursorElement.style.backdropFilter = "blur(0)"
    cursorElement.style.border = "1px solid rgba(255, 255, 255, 0)"
    }, 3000);
  }
});

// Smooth cursor animation to follow the mouse movement with a delay for smooth animation
function updateCursorPosition() {
  // Smoothly update cursor position by interpolating between current and target positions
  posX += (mouseX - posX) * 0.2;
  posY += (mouseY - posY) * 0.2;

  // Apply the updated cursor position to the custom cursor element
  if (cursorElement) {
    cursorElement.style.transform = `translate(${posX}px, ${posY}px)`;
  }
  // Request the next frame of animation
  requestAnimationFrame(updateCursorPosition);
}

// Function to fetch suggestions from Google
function getSuggestions(query) {
  const xhr = new XMLHttpRequest();
  const url = `https://suggestqueries.google.com/complete/search?client=firefox&q=${query}`;

  xhr.open("GET", url, true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const suggestions = JSON.parse(xhr.responseText)[1]; // Get suggestions from response
      displaySuggestions(suggestions); // Call function to display suggestions
    }
  };
  xhr.send();
}

// Function to display fetched suggestions in the suggestion box
function displaySuggestions(suggestions) {
  const suggestionBox = document.getElementById("suggestions");
  suggestionBox.innerHTML = ""; // Clear previous suggestions

  suggestions.forEach((suggestion) => {
    const div = document.createElement("div");
    div.innerHTML = suggestion;
    div.onclick = () => {
      document.getElementById("search-box").value = suggestion;
      suggestionBox.innerHTML = ""; // Clear suggestions on selection
    };
    suggestionBox.appendChild(div);
  });
}

// Event listener for input change on search box
document.getElementById("search-box").addEventListener("input", (event) => {
  const query = event.target.value;
  if (query) {
    getSuggestions(query); // Fetch suggestions when there's input
  } else {
    document.getElementById("suggestions").innerHTML = ""; // Clear suggestions if input is empty
  }
});

// Initialize functions when the window loads
window.onload = () => {
  // Initialize the clock by setting the time immediately
  updateClock();

  // Update the clock every second (1000 milliseconds)
  setInterval(updateClock, 1000);

  // Start custom cursor animation
  updateCursorPosition();
};
