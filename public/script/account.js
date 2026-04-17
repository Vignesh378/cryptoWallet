const activeLink = document.querySelector('.links a#active');
document.addEventListener("DOMContentLoaded", () => {
const searchInput = document.getElementById("search-input");
const suggestionsContainer = document.getElementById("suggestions");

let coins = [];

// Fetch coin data from CoinGecko API
fetch("https://api.coingecko.com/api/v3/coins/list")
.then((response) => response.json())
.then((data) => {
    coins = data; // Store the coin list
})
.catch((error) => console.error("Error fetching coin data:", error));

// Filter and display suggestions as the user types
searchInput.addEventListener("input", () => {
const query = searchInput.value.toLowerCase().trim();
suggestionsContainer.innerHTML = ""; // Clear previous suggestions

if (query) {
    const filteredCoins = coins.filter((coin) =>
        coin.name.toLowerCase().includes(query) || coin.symbol.toLowerCase().includes(query)
    );

    // Display suggestions
    filteredCoins.slice(0, 10).forEach((coin) => {
        const suggestion = document.createElement("div");
        suggestion.textContent = `${coin.name.toUpperCase()} (${coin.symbol.toUpperCase()})`;
        suggestion.dataset.id = coin.id; // Store the coin ID for later use
        suggestionsContainer.appendChild(suggestion);

        // Handle suggestion click
        suggestion.addEventListener("click", () => {
            searchInput.value = coin.name; // Set the input value to the selected coin
            suggestionsContainer.innerHTML = ""; // Clear suggestions
            suggestionsContainer.style.display = "none"; // Hide suggestions
        });
    });

    suggestionsContainer.style.display = "block"; // Show suggestions
} else {
    suggestionsContainer.style.display = "none"; // Hide suggestions if input is empty
}
});

// Hide suggestions when clicking outside
document.addEventListener("click", (e) => {
if (!suggestionsContainer.contains(e.target) && e.target !== searchInput) {
    suggestionsContainer.style.display = "none";
}
});
});

const buyButton = document.querySelector('.btn.buy');
const buyDrop = document.querySelector('.buy-drop');
buyButton.addEventListener('click', () => {
buyDrop.style.display = buyDrop.style.display === 'flex' ? 'none' : 'flex';
});
document.addEventListener('click', (event) => {
if (!buyButton.contains(event.target) && !buyDrop.contains(event.target)) {
buyDrop.style.display = 'none'; // Hide the dropdown if clicked outside
}
});

const options = document.querySelectorAll('.options .option');
const sections = document.querySelectorAll('.bottom-part > div'); // Select all sections inside .bottom-part

options.forEach((option, index) => {
option.addEventListener('click', function (event) {
event.preventDefault(); // Prevent default link behavior

// Remove 'on' id from all options
options.forEach(opt => opt.removeAttribute('id'));

// Add 'on' id to the clicked option
this.setAttribute('id', 'on');

// Hide all sections
sections.forEach(section => {
    section.style.display = 'none';
});

// Show the corresponding section
sections[index].style.display = 'flex'; // Make the corresponding section visible
});
});