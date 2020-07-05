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
    const speed = 75;
    const snakeSize = 20;
    const canvasColor = "#0D47A1";
    const backgroundColor = "#212121";
    const snakeColor = "#FFFFFF";
    const eggColor = "#000000";
    const maxWidth = 960;
    const maxHeight = 720;

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
        //Remove scrollbars and paint page background (border)
        document.body.style.margin = 0;
        document.body.style.backgroundColor = backgroundColor;

        //Calculate width, height, and pixels needed to center canvas
        const xPixels = window.innerWidth % snakeSize;
        const yPixels = window.innerHeight % snakeSize;
        width = Math.min(window.innerWidth - xPixels, maxWidth);
        height = Math.min(window.innerHeight - yPixels, maxHeight);

        //Resize canvas to be full screen
        const canvas = document.getElementsByClassName("canvas")[0];
        canvas.width = width;
        canvas.height = height;
        canvas.style.marginLeft = (window.innerWidth - width) / 2 + 'px';
        canvas.style.marginTop = (window.innerHeight - height) / 2 + 'px';
        canvas.style.boxShadow = '0 0 3px #000';

        //Setup canvas context
        ctx = canvas.getContext("2d");

        //Paint it black
        ctx.fillStyle = canvasColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        //Start snake in middle of screen
        const halfWidth = width / 2;
        const halfHeight = height / 2;
        snakeX = halfWidth + (halfWidth % 20);
        snakeY = halfHeight + (halfHeight % 20);
    }

    const drawEgg = function () {
        //Pick a random place for egg to start
        let randX = randomNumberInGrid(width);
        let randY = randomNumberInGrid(height);

        //Verify the random number is not where the egg currently is or part of the snake
        while((eggX == randX && eggY == randY) || snake.some(e => (e.x === randX && e.y === randY))) {
            randX = randomNumberInGrid(width);
            randY = randomNumberInGrid(height);
        }
        eggX = randX;
        eggY = randY;

        //Draw egg on canvas
        fillRect(eggColor, eggX, eggY);
    }

    const randomNumberInGrid = function (max) {
        let rand = Math.floor(Math.random() * Math.floor(max - snakeSize));
        rand -= rand % snakeSize;
        return rand;
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
                if (snakeX >= 0 && snakeX < width && snakeY >= 0 && snakeY < height && !snake.some(e => (e.x === snakeX && e.y === snakeY))) {

                    //Add new snake additions to array and draw it on the canvas
                    snake.push({ x: snakeX, y: snakeY });
                    fillRect(snakeColor, snakeX, snakeY);

                    //Remove oldest snake addition from array and clear it from the canvas
                    const old = snake.shift();
                    fillRect(canvasColor, old.x, old.y);

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

    document.addEventListener('DOMContentLoaded', setupGame);
    window.addEventListener('keydown', movement.startMove);
    window.addEventListener('resize', resizeCanvas);
}

snake();