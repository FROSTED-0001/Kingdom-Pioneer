// Game state variables
let wood = 0;
let stone = 0;
let gold = 0;

// DOM Elements
const woodDisplay = document.getElementById('wood');
const stoneDisplay = document.getElementById('stone');
const goldDisplay = document.getElementById('gold');

// Event Listeners
document.getElementById('gather-wood').addEventListener('click', () => {
    wood += 10;
    updateResources();
});
document.getElementById('gather-stone').addEventListener('click', () => {
    stone += 5;
    updateResources();
});
document.getElementById('bribe-citizen').addEventListener('click', () => {
    if (gold >= 50) {
        gold -= 50;
        alert('You bribed a citizen!');
    } else {
        alert('Not enough gold!');
    }
    updateResources();
});

// Update Resource Display
function updateResources() {
    woodDisplay.textContent = wood;
    stoneDisplay.textContent = stone;
    goldDisplay.textContent = gold;
}

// Initial Display Update
updateResources();
// Starting location selection
const locationButtons = document.querySelectorAll('.location-btn');
locationButtons.forEach(button => {
    button.addEventListener('click', () => {
        const location = button.getAttribute('data-location');
        startGame(location);
    });
});

function startGame(location) {
    alert(`You chose to start in the ${location}.`);
    document.getElementById('map').style.display = 'none'; // Hide the map after selection
    initializeSettlement(location);
}

function initializeSettlement(location) {
    // Setup initial resources based on the location
    if (location === 'forest') {
        wood += 50;
    } else if (location === 'mountain') {
        stone += 50;
    } else if (location === 'plains') {
        gold += 50;
    }
    updateResources();
}

