// Get the canvas element and its context
let canvas = document.getElementById('game');
let context = canvas.getContext('2d');

// Define the size of each square in the grid
let box = 32;

// Initialize the score
let score = 0;

// Initialize the snake as an array of coordinates
let snake = [];
snake[0] = { x: 8 * box, y: 8 * box };

// Set the initial direction of the snake
let direction = "right";

// Define the obstacles
let obstacles = [
    { x: 5 * box, y: 7 * box },
    { x: 5 * box, y: 8 * box },
    { x: 7 * box, y: 5 * box },
    { x: 8 * box, y: 5 * box }
];

// Create the food at a random position
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

// Function to draw the obstacles
function createObstacles() {
    for (let i = 0; i < obstacles.length; i++) {
        context.fillStyle = "gray";
        context.fillRect(obstacles[i].x, obstacles[i].y, box, box);
    }
}

// Function to draw the game background
function createBG() {
    context.fillStyle = "lightgreen";
    context.fillRect(0, 0, 16 * box, 16 * box);
}

// Function to draw the snake
function createSnake() {
    for (i = 0; i < snake.length; i++) {
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

// Function to draw the food
function drawFood() {
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}

// Event listener for the arrow keys to change the direction of the snake
document.addEventListener('keydown', update);

function update(event) {
    if (event.keyCode == 37 && direction != 'right') direction = 'left';
    if (event.keyCode == 38 && direction != 'down') direction = 'up';
    if (event.keyCode == 39 && direction != 'left') direction = 'right';
    if (event.keyCode == 40 && direction != 'up') direction = 'down';
}

// Main game loop
function startGame() {
    // Check if the snake has hit the border and wrap it around to the other side
    if (snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
    if (snake[0].x < 0 && direction == 'left') snake[0].x = 16 * box;
    if (snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
    if (snake[0].y < 0 && direction == 'up') snake[0].y = 16 * box;

    // Check if the snake has collided with itself
    for (i = 1; i < snake.length; i++) {
        if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
            clearInterval(game);
            document.getElementById('playAgain').style.display = 'block'; // Show the "Play Again" button
        }
    }


    // Draw the game elements
    createBG();
    createSnake();
    drawFood();
    createObstacles();

    // Get the next position of the snake
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direction == "right") snakeX += box;
    if (direction == "left") snakeX -= box;
    if (direction == "up") snakeY -= box;
    if (direction == "down") snakeY += box;

    // Check if the snake has eaten the food
    if (snakeX != food.x || snakeY != food.y) {
        // If not, remove the last segment of the snake
        snake.pop();
    } else {
        // If yes, generate a new food at a random position
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;

        // And increase the score
        score++;
        document.getElementById('score').innerHTML = 'Score: ' + score; // Update the score display
    }

    // Add a new head to the snake
    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);
    
    // Check if the snake has collided with an obstacle
    for (let i = 0; i < obstacles.length; i++) {
        if (snakeX == obstacles[i].x && snakeY == obstacles[i].y) {
            clearInterval(game);
            document.getElementById('playAgain').style.display = 'block'; // Show the "Play Again" button
        }
    }
}

// Add an event listener to the "Play Again" button to restart the game when it's clicked
document.getElementById('playAgain').addEventListener('click', function() {
    location.reload(); // Reload the page
});

// Start the game loop
let game = setInterval(startGame, 100);