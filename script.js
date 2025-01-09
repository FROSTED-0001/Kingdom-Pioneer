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

let population = 0;

// Building construction logic
document.getElementById('build-house').addEventListener('click', () => {
    if (wood >= 50) {
        wood -= 50;
        population += 1;
        alert('You built a house! Population increased.');
        updateResources();
    } else {
        alert('Not enough resources!');
    }
});

document.getElementById('build-mill').addEventListener('click', () => {
    if (wood >= 100 && stone >= 50) {
        wood -= 100;
        stone -= 50;
        setInterval(() => {
            wood += 10; // Mills generate wood over time
            updateResources();
        }, 5000);
        alert('You built a mill! Wood production increased.');
        updateResources();
    } else {
        alert('Not enough resources!');
    }
});

let citizens = 0;

document.getElementById('bribe-citizen').addEventListener('click', () => {
    if (gold >= 50) {
        gold -= 50;
        citizens += 1;
        alert('You bribed a citizen!');
        increaseResourceProduction();
        updateResources();
    } else {
        alert('Not enough gold!');
    }
});

function increaseResourceProduction() {
    setInterval(() => {
        wood += 5 * citizens;
        stone += 2 * citizens;
        gold += 1 * citizens;
        updateResources();
    }, 5000);
}

function spawnBanditAttack() {
    setInterval(() => {
        if (population > 0) {
            const damage = Math.floor(Math.random() * 20 + 1);
            wood -= damage;
            stone -= damage;
            gold -= damage;
            alert(`Bandits attacked! You lost ${damage} of each resource.`);
            updateResources();
        }
    }, 20000); // Every 20 seconds
}

// Start bandit attacks after settlement grows
spawnBanditAttack();

let oldKingdomThreat = 0;

function escalateOldKingdomThreat() {
    setInterval(() => {
        oldKingdomThreat += 1;
        if (oldKingdomThreat >= 5) {
            launchAttackFromOldKingdom();
        }
    }, 30000); // Every 30 seconds
}

function launchAttackFromOldKingdom() {
    const attackStrength = oldKingdomThreat * 10;
    wood -= attackStrength;
    stone -= attackStrength;
    gold -= attackStrength;
    alert(`The old kingdom attacked with ${attackStrength} strength!`);
    updateResources();
}

// Start threat escalation
escalateOldKingdomThreat();

let alliances = 0;
let wars = 0;

document.getElementById('form-alliance').addEventListener('click', () => {
    if (gold >= 100) {
        gold -= 100;
        alliances += 1;
        alert('You formed an alliance!');
        updateResources();
    } else {
        alert('Not enough gold!');
    }
});

document.getElementById('declare-war').addEventListener('click', () => {
    wars += 1;
    alert('You declared war!');
    escalateOldKingdomThreat();
});
