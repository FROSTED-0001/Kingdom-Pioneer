// Game state variables
let wood = 0;
let stone = 0;
let gold = 0;

let buildings = {
    barracks: { cost: { wood: 50, stone: 30, gold: 100 }, built: false, populationBoost: 0, armyBoost: 10 },
    marketplace: { cost: { wood: 40, stone: 40, gold: 80 }, built: false, populationBoost: 5, armyBoost: 0 },
    farm: { cost: { wood: 20, stone: 10, gold: 30 }, built: false, populationBoost: 10, armyBoost: 0 }
};

function updateResources() {
    document.getElementById('wood-count').textContent = wood;
    document.getElementById('stone-count').textContent = stone;
    document.getElementById('gold-count').textContent = gold;
    document.getElementById('population-count').textContent = population;
    document.getElementById('army-size').textContent = playerArmySize;
}


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

// Function to handle forming alliances
function formAlliance(kingdomIndex) {
    let kingdom = neighboringKingdoms[kingdomIndex];
    if (kingdom.diplomacyStatus === 'neutral') {
        kingdom.diplomacyStatus = 'allied';
        alert(`${kingdom.name} is now your ally!`);
        // Example: Alliances can help protect against the Old King's army
        playerArmySize += 5; // Strengthen player's army with the alliance
    } else {
        alert(`${kingdom.name} is already allied or at war with you!`);
    }
}

// Function to handle declaring war
function declareWar(kingdomIndex) {
    let kingdom = neighboringKingdoms[kingdomIndex];
    if (kingdom.diplomacyStatus === 'neutral') {
        kingdom.diplomacyStatus = 'at war';
        alert(`You declared war on ${kingdom.name}!`);
        // Example: The neighboring kingdom sends armies to attack
        setInterval(() => {
            kingdom.armySize += 10;  // Enemy army grows over time
            alert(`${kingdom.name} is sending an army to attack!`);
        }, 30000);  // Every 30 seconds, they send a new army
    } else if (kingdom.diplomacyStatus === 'allied') {
        alert(`You cannot declare war on an ally!`);
    }
}

// Attach event listeners to the diplomacy buttons
document.getElementById('form-alliance').addEventListener('click', () => {
    formAlliance(0); // Form alliance with the first neighboring kingdom (Kingdom A)
});

document.getElementById('declare-war').addEventListener('click', () => {
    declareWar(1); // Declare war on the second neighboring kingdom (Kingdom B)
});

function buildStructure(structureName) {
    if (buildings[structureName].built) {
        alert(`${structureName} is already built!`);
        return;
    }

    const building = buildings[structureName];
    if (wood >= building.cost.wood && stone >= building.cost.stone && gold >= building.cost.gold) {
        // Deduct resources
        wood -= building.cost.wood;
        stone -= building.cost.stone;
        gold -= building.cost.gold;

        // Increase the kingdom's population and army
        population += building.populationBoost;
        playerArmySize += building.armyBoost;

        // Mark the building as built
        buildings[structureName].built = true;

        alert(`${structureName} built successfully!`);
        updateResources();  // Update the resource display
    } else {
        alert(`Not enough resources to build ${structureName}.`);
    }
}

// Example of building event listeners
document.getElementById('build-barracks').addEventListener('click', () => buildStructure('barracks'));
document.getElementById('build-marketplace').addEventListener('click', () => buildStructure('marketplace'));
document.getElementById('build-farm').addEventListener('click', () => buildStructure('farm'));

function growNeighboringKingdoms() {
    setInterval(() => {
        neighboringKingdoms.forEach((kingdom) => {
            if (kingdom.diplomacyStatus === 'neutral' || kingdom.diplomacyStatus === 'allied') {
                kingdom.armySize += Math.floor(Math.random() * 5);  // Army grows slowly for neutral or allied kingdoms
            } else if (kingdom.diplomacyStatus === 'at war') {
                kingdom.armySize += Math.floor(Math.random() * 10);  // Enemy armies grow faster
            }
        });
    }, 10000);  // Every 10 seconds, the neighboring kingdoms grow
}

function enemyAttack(kingdomIndex) {
    let kingdom = neighboringKingdoms[kingdomIndex];
    setInterval(() => {
        if (kingdom.diplomacyStatus === 'at war') {
            const enemyStrength = kingdom.armySize;
            const playerStrength = playerArmySize;

            if (enemyStrength > playerStrength) {
                alert(`${kingdom.name} is attacking you with an army of ${enemyStrength}!`);
                population -= Math.floor(enemyStrength / 10);  // Casualties in population
                playerArmySize -= Math.floor(enemyStrength / 20);  // Casualties in army size
                updateResources();
            } else {
                alert(`${kingdom.name} failed to defeat you!`);
            }
        }
    }, 15000);  // Attacks every 15 seconds
}

function updateDiplomacyStatus() {
    let kingdomList = document.getElementById('kingdom-list');
    kingdomList.innerHTML = '';

    neighboringKingdoms.forEach((kingdom, index) => {
        let listItem = document.createElement('li');
        listItem.textContent = `${kingdom.name} - ${kingdom.diplomacyStatus}`;
        kingdomList.appendChild(listItem);

        // Add buttons for diplomacy actions
        let actionButtons = document.createElement('div');
        if (kingdom.diplomacyStatus === 'neutral') {
            actionButtons.innerHTML = `
                <button onclick="formAlliance(${index})">Form Alliance</button>
                <button onclick="declareWar(${index})">Declare War</button>
            `;
        } else if (kingdom.diplomacyStatus === 'allied') {
            actionButtons.innerHTML = `<button onclick="declareWar(${index})">Declare War</button>`;
        } else if (kingdom.diplomacyStatus === 'at war') {
            actionButtons.innerHTML = `<button onclick="formAlliance(${index})">Form Alliance</button>`;
        }
        listItem.appendChild(actionButtons);
    });
}

// Call the function to update diplomacy status
updateDiplomacyStatus();            
