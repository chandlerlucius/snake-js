const snake = function () {
    //Declare variables
    const eggSize = 20;
    const speed = 100;
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
        prevCode: 0,

        startMove(event) {
            if (event.code === snake.prevCode ||
                (leftRight.indexOf(event.code) > -1 && leftRight.indexOf(snake.prevCode) > -1) ||
                (upDown.indexOf(event.code) > -1 && upDown.indexOf(snake.prevCode) > -1)) {
                return;
            }
            clearTimeout(movement.timeout);
            movement.move(event.code);
        },

        move(code) {
            this.timeout = setTimeout(function () {
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

                ctx.fillRect(snakeX, snakeY, snakeSize, snakeSize);
                snake.push([snakeX, snakeY]);

                const old = snake.shift();
                ctx.clearRect(old[0], old[1], snakeSize, snakeSize);

                if (snakeX > 0 && snakeX < width && snakeY > 0 && snakeY < height) {
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