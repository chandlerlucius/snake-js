const setupGame = function () {
    const width = window.innerWidth;
    const height = window.innerHeight;

    //Define egg details
    const eggSize = 20;
    let eggX = random(width - eggSize);
    let eggY = random(height - eggSize);
    let eggCount = 0;

    //Define snake details
    let snakeHeight = 20;
    let snakeWidth = 60;

    const halfWidth = Math.floor(width / 2);
    const halfHeight = Math.floor(height / 2);

    const canvas = document.getElementsByClassName("canvas")[0];
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(halfWidth, halfHeight, snakeWidth, snakeHeight);
    ctx.fillRect(eggX, eggY, eggSize, eggSize);

    let movement = 0;
    setInterval(function () {
        movement += eggSize;
        ctx.fillRect(halfWidth + movement, halfHeight, snakeWidth, snakeHeight);
        ctx.clearRect(halfWidth + movement - snakeWidth, halfHeight, snakeWidth, snakeHeight);
    }, 100);
}

const random = function (max) {
    return Math.floor(Math.random() * Math.floor(max));
}

document.addEventListener('DOMContentLoaded', setupGame);