const snake = function () {
    //Keyboard constants
    const a = "KeyA";
    const left = "ArrowLeft";
    const d = "KeyD";
    const right = "ArrowRight";
    const w = "KeyW";
    const up = "ArrowUp";
    const s = "KeyS";
    const down = "ArrowDown";
    const leftRight = [a, left, d, right];
    const upDown = [w, up, s, down];

    //Snake constants
    const speed = 100;
    const snake = [];
    const snakeSize = 20;

    //Mutable vars
    let eggX;
    let eggY;
    let snakeX;
    let snakeY;
    let width;
    let height;
    let ctx;

    const setupGame = function () {
        width = window.innerWidth;
        height = window.innerHeight;

        //Start snake in middle of screen
        snakeX = Math.floor(width / 2);
        snakeY = Math.floor(height / 2);

        //Normalize snake location to be on grid
        snakeX -= snakeX % snakeSize;
        snakeY -= snakeY % snakeSize;

        //Resize canvas to be full screen
        const canvas = document.getElementsByClassName("canvas")[0];
        canvas.width = width;
        canvas.height = height;

        //Setup canvas context to draw in white
        ctx = canvas.getContext("2d");
        ctx.fillStyle = "#FFFFFF";

        //Setup snake to start with length of 3
        snake.push([snakeX, snakeY]);
        snakeX += snakeSize;
        snake.push([snakeX, snakeY]);
        snakeX += snakeSize;
        snake.push([snakeX, snakeY]);

        //Draw snake on canvas
        for (let i = 1; i <= snake.length; i++) {
            const xy = snake[i - 1];
            ctx.fillRect(xy[0], xy[1], snakeSize, snakeSize);
        }

        drawEgg();
    }

    const drawEgg = function () {
        //Pick a random place for egg to start
        eggX = random(width - snakeSize);
        eggY = random(height - snakeSize);

        //Normalize egg location to place it on grid where snake will be
        eggX -= eggX % snakeSize;
        eggY -= eggY % snakeSize;

        //Draw egg on canvas
        ctx.fillRect(eggX, eggY, snakeSize, snakeSize);
    }

    const movement = {
        timeout: 0,
        prevCode: 0,

        startMove(event) {
            //If same button pressed or opposite button pressed (left & right) return
            if (event.code === snake.prevCode ||
                (leftRight.indexOf(event.code) > -1 && leftRight.indexOf(snake.prevCode) > -1) ||
                (upDown.indexOf(event.code) > -1 && upDown.indexOf(snake.prevCode) > -1)) {
                return;
            }

            //If new button pressed, clear the timeout and begin move
            clearTimeout(movement.timeout);
            movement.move(event.code);
        },

        move(code) {
            this.timeout = setTimeout(function () {
                //Change new snake addition based on key pressed
                switch (code) {
                    case a:
                    case left:
                        snakeX -= snakeSize;
                        break;
                    case w:
                    case up:
                        snakeY -= snakeSize;
                        break;
                    case d:
                    case right:
                        snakeX += snakeSize;
                        break;
                    case s:
                    case down:
                        snakeY += snakeSize;
                        break;
                    default:
                        return;
                }
                snake.prevCode = code;

                //Add new snake addition to array and draw it on canvas
                snake.push([snakeX, snakeY]);
                ctx.fillRect(snakeX, snakeY, snakeSize, snakeSize);

                //Remove oldest snake addition from array and clear it from canvas
                const old = snake.shift();
                ctx.clearRect(old[0], old[1], snakeSize, snakeSize);

                //Check if snake will hit the edge
                if (snakeX > 0 && snakeX < width && snakeY > 0 && snakeY < height) {
                    //Check if snake is eating the egg
                    if (snakeY === eggY && snakeX === eggX) {
                        snake.push([eggX, eggY]);
                        drawEgg();
                    }
                    movement.move(code);
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
    window.addEventListener('keydown', movement.startMove);
    // window.addEventListener('resize', resizeCanvas);
}

snake();