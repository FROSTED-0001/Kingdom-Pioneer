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

let oldKingArmySize = 5;  // Initial small army
let playerArmySize = 10;  // Initial size of player's army
let kingdomSize = 1;      // Initially, the kingdom is small

function oldKingArmyAttack() {
    setInterval(() => {
        if (kingdomSize >= 1) {  // The Old King starts sending armies when the kingdom size is at least 1
            let attackStrength = oldKingArmySize + Math.floor(Math.random() * (oldKingArmySize / 2));
            let defenseStrength = playerArmySize;

            if (attackStrength > defenseStrength) {
                // Old King's army wins
                alert(`The Old King sent an army of ${attackStrength} soldiers! You lost the battle.`);
                // Reduce resources or lose population due to the attack
                population -= Math.floor(Math.random() * 5 + 1);  // Decrease population (can adjust this logic)
                updateResources();
            } else {
                // Player wins the battle
                alert(`You successfully defended against the Old King's army of ${attackStrength} soldiers!`);
            }
        }
    }, 30000); // Old King's army attacks every 30 seconds, you can adjust this as needed
}

// Increase the size of the Old King’s army as the player grows
function increaseOldKingArmy() {
    setInterval(() => {
        if (kingdomSize >= 3) {
            oldKingArmySize = 15;  // Bigger army when the kingdom grows
        }
        if (kingdomSize >= 5) {
            oldKingArmySize = 30;  // Larger army when the kingdom is bigger
        }
    }, 10000);  // Update army size every 10 seconds
}

// Call the function to start the Old King's attacks
oldKingArmyAttack();
increaseOldKingArmy();

// Increase kingdom size based on certain criteria (e.g., population or buildings)
function increaseKingdomSize() {
    if (population >= 20) {
        kingdomSize = 2;
    }
    if (population >= 50) {
        kingdomSize = 3;
    }
    if (population >= 100) {
        kingdomSize = 4;
    }
    if (population >= 200) {
        kingdomSize = 5;
    }
}

let neighboringKingdoms = [
    { name: 'Kingdom A', diplomacyStatus: 'neutral', armySize: 20 },
    { name: 'Kingdom B', diplomacyStatus: 'neutral', armySize: 25 },
    { name: 'Kingdom C', diplomacyStatus: 'neutral', armySize: 15 }
];
