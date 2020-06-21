const snake = function() {
    //Declare variables
    const eggSize = 20;
    const speed = 100;

    let eggX;
    let eggY;
    let snakeX;
    let snakeY;
    let ctx;
    
    //Define snake details
    const snake = [];
    let snakeSize = 20;

    const setupGame = function () {
        const width = window.innerWidth;
        const height = window.innerHeight;
        
        eggX = random(width - eggSize);
        eggY = random(height - eggSize);
    
        snakeX = Math.floor(width / 2);
        snakeY = Math.floor(height / 2);
    
        const canvas = document.getElementsByClassName("canvas")[0];
        canvas.width = width;
        canvas.height = height;
    
        ctx = canvas.getContext("2d");
        ctx.fillStyle = "#FFFFFF";

        snake.push([snakeX, snakeY]);
        snakeX += snakeSize;
        snake.push([snakeX, snakeY]);
        snakeX += snakeSize;
        snake.push([snakeX, snakeY]);

        for(let i = 1; i <= snake.length; i++) {
            const xy = snake[i - 1];
            ctx.fillRect(xy[0], xy[1], snakeSize, snakeSize);
        }
        ctx.fillRect(eggX, eggY, eggSize, eggSize);
        
        moveRight();
    }

    const moveRight = function() {
        setInterval(function () {
            snakeX += snakeSize;
            ctx.fillRect(snakeX, snakeY, snakeSize, snakeSize);
            snake.push([snakeX, snakeY]);
            const old = snake.shift();
            ctx.clearRect(old[0] - 1, old[1], snakeSize, snakeSize);
        }, speed);
    }
    
    const handleMove = function (event) {
        if (event.keyCode == '38') {
            // up arrow
        } else if (event.keyCode == '40') {
            // down arrow
        } else if (event.keyCode == '37') {
            // left arrow
        } else if (event.keyCode == '39') {
            // right arrow
        }
    }
    
    const random = function (max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    document.addEventListener('DOMContentLoaded', setupGame);
    document.addEventListener("keydown", handleMove);
}

snake();
