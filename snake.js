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
    const snakeSize = 20;
    const backgroundColor = "#000000";
    const borderColor = "#FFFFFF";
    const snakeColor = "#FFFFFF";
    const eggColor = "#0000FF";

    //Edges of canvas
    let lEdge;
    let tEdge;
    let rEdge;
    let bEdge;

    //Mutable vars
    const snake = [];
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

        resizeCanvas();

        //Setup snake to start with length of 3
        snake.push({ x: snakeX, y: snakeY });
        snakeX += snakeSize;
        snake.push({ x: snakeX, y: snakeY });
        snakeX += snakeSize;
        snake.push({ x: snakeX, y: snakeY });

        //Draw snake on canvas
        for (let i = 1; i <= snake.length; i++) {
            const xy = snake[i - 1];
            fillRect(snakeColor, xy.x, xy.y);
        }

        drawEgg();
    }

    const resizeCanvas = function () {
        //Resize canvas to be full screen
        const canvas = document.getElementsByClassName("canvas")[0];
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;

        //Setup canvas context
        ctx = canvas.getContext("2d");

        //Paint it black
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        //Calculate edges based on window size relative to snake size
        lEdge = (width % snakeSize) / 2;
        tEdge = (height % snakeSize) / 2;
        rEdge = width - lEdge;
        bEdge = height - tEdge;

        //Draw border around page
        ctx.fillStyle = borderColor;
        ctx.fillRect(0, 0, lEdge, height);
        ctx.fillRect(0, 0, width, tEdge);
        ctx.fillRect(rEdge, tEdge, width, bEdge);
        ctx.fillRect(lEdge, bEdge, rEdge, height);
    }

    const drawEgg = function () {
        //Pick a random place for egg to start
        eggX = random(width - snakeSize);
        eggY = random(height - snakeSize);

        //Normalize egg location to place it on grid where snake will be
        eggX -= eggX % snakeSize;
        eggY -= eggY % snakeSize;

        //Draw egg on canvas
        fillRect(eggColor, eggX, eggY);
    }

    const fillRect = function (color, x, y) {
        ctx.fillStyle = color;
        ctx.fillRect(x, y, snakeSize, snakeSize);
    }

    const movement = {
        timeout: 0,
        prevCode: 0,

        startMove(event) {
            //If same button pressed or opposite button pressed (left & right) return
            if (event.code === movement.prevCode ||
                (leftRight.indexOf(event.code) > -1 && leftRight.indexOf(movement.prevCode) > -1) ||
                (upDown.indexOf(event.code) > -1 && upDown.indexOf(movement.prevCode) > -1)) {
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
                movement.prevCode = code;

                //Check if snake will hit an edge or itself
                if (snakeX >= 0 && snakeX <= width && snakeY >= 0 && snakeY <= height && !snake.some(e => (e.x === snakeX && e.y === snakeY))) {

                    //Add new snake additions to array and draw it on the canvas
                    snake.push({ x: snakeX, y: snakeY });
                    fillRect(snakeColor, snakeX, snakeY);

                    //Remove oldest snake addition from array and clear it from the canvas
                    const old = snake.shift();
                    ctx.clearRect(old.x, old.y, snakeSize, snakeSize);

                    //Check if snake is eating the egg
                    if (snakeY === eggY && snakeX === eggX) {
                        snake.push([eggX, eggY]);
                        fillRect(eggColor, eggX, eggY);
                        drawEgg();
                    }

                    //Move snake same direction again
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
    window.addEventListener('resize', resizeCanvas);
}

snake();