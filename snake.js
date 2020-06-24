const snake = function () {
    //Declare variables
    const eggSize = 20;
    const speed = 100;

    let eggX;
    let eggY;
    let snakeX;
    let snakeY;
    let width;
    let height;
    let ctx;

    //Define snake details
    const snake = [];
    let snakeSize = 20;

    const setupGame = function () {
        width = window.innerWidth;
        height = window.innerHeight;

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

        for (let i = 1; i <= snake.length; i++) {
            const xy = snake[i - 1];
            ctx.fillRect(xy[0], xy[1], snakeSize, snakeSize);
        }
        ctx.fillRect(eggX, eggY, eggSize, eggSize);
    }

    const movement = {
        timeout: 0,
        prevKeyCode: 0,

        startMove(event) {
            if (event.keyCode == snake.prevKeyCode) {
                return;
            }
            clearTimeout(movement.timeout);
            movement.move(event.keyCode);
        },

        move(keyCode) {
            this.timeout = setTimeout(function () {
                if (keyCode == '37' || keyCode == '65') {
                    // left arrow or a key
                    snakeX -= snakeSize;
                } else if (keyCode == '38' || keyCode == '87') {
                    // up arrow or w key
                    snakeY -= snakeSize;
                } else if (keyCode == '39' || keyCode == '68') {
                    // right arrow or d key
                    snakeX += snakeSize;
                } else if (keyCode == '40' || keyCode == '83') {
                    // down arrow or s key
                    snakeY += snakeSize;
                } else {
                    return;
                }

                ctx.fillRect(snakeX, snakeY, snakeSize, snakeSize);
                snake.push([snakeX, snakeY]);

                const old = snake.shift();
                ctx.clearRect(old[0], old[1], snakeSize, snakeSize);

                if (snakeX > 0 && snakeX < width && snakeY > 0 && snakeY < height) {
                    movement.move(keyCode);
                } else {
                    alert('You Lost!');
                }
            }, speed);
        }
    }

    const random = function (max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    document.addEventListener('DOMContentLoaded', setupGame);
    document.addEventListener("keydown", movement.startMove);
}

snake();