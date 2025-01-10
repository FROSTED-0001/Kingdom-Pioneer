const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Game Variables
let player = { x: canvas.width / 2, y: canvas.height / 2, size: 20, color: 'blue', speed: 5 };
let resources = { wood: 0, stone: 0, gold: 0 };
let settlers = [];
let bandits = [];
let kingAttacks = [];
let gameState = "choosingLocation";

// Key Controls
const keys = {};

// Initialize Event Listeners
window.addEventListener('keydown', (e) => keys[e.key] = true);
window.addEventListener('keyup', (e) => keys[e.key] = false);

// Draw Player
function drawPlayer() {
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.size, player.size);
}

// Move Player
function movePlayer() {
    if (keys['w'] || keys['ArrowUp']) player.y -= player.speed;
    if (keys['s'] || keys['ArrowDown']) player.y += player.speed;
    if (keys['a'] || keys['ArrowLeft']) player.x -= player.speed;
    if (keys['d'] || keys['ArrowRight']) player.x += player.speed;

    // Prevent Player from moving off the canvas
    player.x = Math.max(0, Math.min(canvas.width - player.size, player.x));
    player.y = Math.max(0, Math.min(canvas.height - player.size, player.y));
}

// Game Loop
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    switch (gameState) {
        case "choosingLocation":
            ctx.fillStyle = "black";
            ctx.font = "30px Arial";
            ctx.fillText("Choose a location for your settlement", canvas.width / 4, canvas.height / 2);
            ctx.fillText("Move with WASD or Arrow keys", canvas.width / 4, canvas.height / 2 + 50);
            if (keys[' ']) gameState = "settling";
            break;
        case "settling":
            drawPlayer();
            movePlayer();
            ctx.fillStyle = "black";
            ctx.fillText(`Resources - Wood: ${resources.wood}, Stone: ${resources.stone}, Gold: ${resources.gold}`, 10, 30);
            break;
    }

    requestAnimationFrame(gameLoop);
}

// Start the Game Loop
gameLoop();

