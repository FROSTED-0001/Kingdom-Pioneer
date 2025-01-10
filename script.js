// Global Canvas Setup
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Set Canvas Size
canvas.width = 800;
canvas.height = 600;

// Center canvas on the screen (using CSS)
document.body.style.display = "flex";
document.body.style.justifyContent = "center";
document.body.style.alignItems = "center";
document.body.style.height = "100vh";
document.body.style.margin = "0";

// Player and Game Variables
let player = { x: 400, y: 300, speed: 4 };
let resources = { wood: 0, stone: 0, gold: 0 };
let gameState = "choosingLocation";

// Resource Nodes, Settlers, Bandits, and Armies
let resourceNodes = [
    { x: 200, y: 200, type: 'wood', color: 'green' },
    { x: 500, y: 300, type: 'stone', color: 'gray' },
    { x: 700, y: 600, type: 'gold', color: 'yellow' }
];
let settlers = [];
let bandits = [];
let kingArmies = [];
let banditSpawnTimer = 0;
let kingArmySpawnTimer = 0;
let settlement = null;

// Key State
let keys = {};

// Player Movement (Restrict movement within canvas bounds)
function movePlayer() {
    if (keys['ArrowUp'] || keys['w']) player.y = Math.max(0, player.y - player.speed);
    if (keys['ArrowDown'] || keys['s']) player.y = Math.min(canvas.height - 10, player.y + player.speed);
    if (keys['ArrowLeft'] || keys['a']) player.x = Math.max(0, player.x - player.speed);
    if (keys['ArrowRight'] || keys['d']) player.x = Math.min(canvas.width - 10, player.x + player.speed);
}

// Draw Player
function drawPlayer() {
    ctx.fillStyle = 'blue';
    ctx.beginPath();
    ctx.arc(player.x, player.y, 10, 0, Math.PI * 2);
    ctx.fill();
}

// Draw Resource Nodes
function drawResourceNodes() {
    resourceNodes.forEach(node => {
        ctx.fillStyle = node.color;
        ctx.beginPath();
        ctx.arc(node.x, node.y, 15, 0, Math.PI * 2);
        ctx.fill();
    });
}

// Collect Resources
function collectResources() {
    resourceNodes.forEach(node => {
        const dist = Math.hypot(player.x - node.x, player.y - node.y);
        if (dist < 25) {
            resources[node.type] += 1;
        }
    });
}

// Finalize Settlement
function finalizeSettlement() {
    if (keys['Enter'] && !settlement) {
        settlement = { x: player.x, y: player.y };
        gameState = "settling";
    }
}

// Draw Settlement
function drawSettlement() {
    if (settlement) {
        ctx.fillStyle = 'brown';
        ctx.fillRect(settlement.x - 20, settlement.y - 20, 40, 40);
        ctx.fillStyle = 'black';
        ctx.fillText("Settlement", settlement.x - 30, settlement.y - 30);
    }
}

// Spawn Bandits
function spawnBandit() {
    if (banditSpawnTimer <= 0) {
        const bandit = {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            targetX: settlement.x,
            targetY: settlement.y
        };
        bandits.push(bandit);
        banditSpawnTimer = 500; // Reset timer
    } else {
        banditSpawnTimer -= 1;
    }
}

// Draw Bandits
function drawBandits() {
    bandits.forEach((bandit, index) => {
        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.arc(bandit.x, bandit.y, 10, 0, Math.PI * 2);
        ctx.fill();
    }


                    // Global Canvas Setup
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Set Canvas Size
canvas.width = 800;
canvas.height = 600;

// Player and Game Variables
let player = { x: 400, y: 300, speed: 4 };
let resources = { wood: 0, stone: 0, gold: 0 };
let gameState = "choosingLocation";

// Resource Nodes, Settlers, Bandits, and Armies
let resourceNodes = [
    { x: 200, y: 200, type: 'wood', color: 'green' },
    { x: 500, y: 300, type: 'stone', color: 'gray' },
    { x: 700, y: 600, type: 'gold', color: 'yellow' }
];
let settlers = [];
let bandits = [];
let kingArmies = [];
let banditSpawnTimer = 0;
let kingArmySpawnTimer = 0;
let settlement = null;

// Key State
let keys = {};

// Player Movement (Restrict movement within canvas bounds)
function movePlayer() {
    if (keys['ArrowUp'] || keys['w']) player.y = Math.max(0, player.y - player.speed);
    if (keys['ArrowDown'] || keys['s']) player.y = Math.min(canvas.height - 10, player.y + player.speed);
    if (keys['ArrowLeft'] || keys['a']) player.x = Math.max(0, player.x - player.speed);
    if (keys['ArrowRight'] || keys['d']) player.x = Math.min(canvas.width - 10, player.x + player.speed);
}

// Draw Player
function drawPlayer() {
    ctx.fillStyle = 'blue';
    ctx.beginPath();
    ctx.arc(player.x, player.y, 10, 0, Math.PI * 2);
    ctx.fill();
}

// Draw Resource Nodes
function drawResourceNodes() {
    resourceNodes.forEach(node => {
        ctx.fillStyle = node.color;
        ctx.beginPath();
        ctx.arc(node.x, node.y, 15, 0, Math.PI * 2);
        ctx.fill();
    });
}

// Collect Resources
function collectResources() {
    resourceNodes.forEach(node => {
        const dist = Math.hypot(player.x - node.x, player.y - node.y);
        if (dist < 25) {
            resources[node.type] += 1;
        }
    });
}

// Finalize Settlement
function finalizeSettlement() {
    if (keys['Enter'] && !settlement) {
        settlement = { x: player.x, y: player.y };
        gameState = "settling";
    }
}

// Draw Settlement
function drawSettlement() {
    if (settlement) {
        ctx.fillStyle = 'brown';
        ctx.fillRect(settlement.x - 20, settlement.y - 20, 40, 40);
        ctx.fillStyle = 'black';
        ctx.fillText("Settlement", settlement.x - 30, settlement.y - 30);
    }
}

// Spawn Bandits
function spawnBandit() {
    if (banditSpawnTimer <= 0) {
        const bandit = {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            targetX: settlement.x,
            targetY: settlement.y
        };
        bandits.push(bandit);
        banditSpawnTimer = 500; // Reset timer
    } else {
        banditSpawnTimer -= 1;
    }
}

// Draw Bandits
function drawBandits() {
    bandits.forEach((bandit, index) => {
        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.arc(bandit.x, bandit.y, 10, 0, Math.PI * 2);
        ctx.fill();

        // Move toward the settlement
        bandit.x += (bandit.targetX - bandit.x) * 0.005;
        bandit.y += (bandit.targetY - bandit.y) * 0.005;

        // Check if bandit reached the settlement
        const dist = Math.hypot(bandit.x - settlement.x, bandit.y - settlement.y);
        if (dist < 20) {
            bandits.splice(index, 1); // Remove bandit
            alert("Bandit attack! Settlement damaged!");
        }
    });
}

// Recruit a Settler
function recruitSettler() {
    if (resources.wood >= 10 && resources.gold >= 5) {
        resources.wood -= 10;
        resources.gold -= 5;
        settlers.push({ x: settlement.x + Math.random() * 50 - 25, y: settlement.y + Math.random() * 50 - 25 });
    }
}

// Draw Settlers
function drawSettlers() {
    settlers.forEach(settler => {
        ctx.fillStyle = 'green';
        ctx.beginPath();
        ctx.arc(settler.x, settler.y, 10, 0, Math.PI * 2);
        ctx.fill();
    });
}

// Update Game Loop
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas at the start

    switch (gameState) {
        case "choosingLocation":
            ctx.fillStyle = "black";
            ctx.font = "30px Arial";
            ctx.fillText("Choose a location for your settlement", canvas.width / 4, canvas.height / 2);
            ctx.fillText("Move with WASD or Arrow keys", canvas.width / 4, canvas.height / 2 + 50);
            ctx.fillText("Press Enter to finalize", canvas.width / 4, canvas.height / 2 + 100);
            drawPlayer();
            movePlayer();
            finalizeSettlement();
            break;

        case "settling":
            drawPlayer();
            movePlayer();
            drawSettlement();
            drawResourceNodes();
            collectResources();
            drawBandits();
            spawnBandit();
            drawSettlers();

            ctx.fillStyle = "black";
            ctx.fillText("Press 'R' to recruit a settler (10 wood, 5 gold)", 10, 60);
            ctx.fillText("Resources - Wood: " + resources.wood + " Stone: " + resources.stone + " Gold: " + resources.gold, 10, 30);

            if (keys['r']) {
                recruitSettler();
            }

            break;
    }

    requestAnimationFrame(gameLoop);
}

// Handle New Keys
window.addEventListener('keydown', (e) => {
    keys[e.key] = true;
});

window.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});

// Initial Game Start
gameLoop();

    

