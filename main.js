'use strict'

/* **************************************************
********************* CLASSES ***********************
************************************************** */

class PAD {
    constructor(width, height, color, posX, posY, velX) {
        this.width = width;
        this.height = height;
        this.color = color;
        this.posX = posX;
        this.posY = posY;
        this.velX = velX;
    }
    draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.rect(this.posX, this.posY, this.width, this.height);
        ctx.fill();
    }
    controls() {
            window.addEventListener("keydown", event => {
                if (event.code == "ArrowLeft" && this.posX > 0) this.posX -= this.velX;
                if (event.code == "ArrowRight" && (this.posX+this.width) < width) this.posX += this.velX;
            })
    }
};

class BRICKS {
    constructor(width, height, color, posX, posY) {
        this.width = width;
        this.height = height;
        this.color = color;
        this.posX = posX;
        this.posY = posY;
    }
    draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.rect(this.posX, this.posY, this.width, this.height);
        ctx.fill();
    }
};


class BALL {
    constructor(dirX, dirY, posX, posY, size, color) {
        this.dirX = dirX;
        this.dirY = dirY;
        this.posX = posX;
        this.posY = posY;
        this.size = size;
        this.color = color
    }
    draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.posX, this.posY, this.size, 0, 2*Math.PI);
        ctx.fill();
    }
    animate() {
        if ((this.posX + this.size) >= width) this.dirX = -(this.dirX);
        if ((this.posX - this.size) <= 0) this.dirX = -(this.dirX);
        if ((this.posY + this.size) >= height) this.dirY = -(this.dirY);
        if ((this.posY - this.size) <= 0) this.dirY = -(this.dirY);
        this.posX += this.dirX;
        this.posY += this.dirY;
    }
};


/* **************************************************
******************** VARIABLES **********************
************************************************** */

const canvas = document.createElement("canvas");
document.body.appendChild(canvas);
canvas.style.border = "solid black 2px";
const ctx = canvas.getContext("2d");
const width = canvas.width = 1200;
const height = canvas.height = 600;
let requestID;
let bricks = [];

/* **************************************************
******************** FUNCTIONS **********************
************************************************** */


function R(max, min) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function loop() {
    ctx.clearRect(0, 0, width, height);
    for (let i = 0; i < bricks.length; i++) {
        bricks[i].draw();
    }
    pad.draw();
    ball.draw();
    ball.animate();
    requestID = requestAnimationFrame(loop);
}



/* **************************************************
******************** CORE-PROG **********************
************************************************** */


let ball = new BALL(R(-10, 10), R(-10, 10), R(100, 300), R(100, 1100), R(5, 20), `rgb(${R(0,255)},${R(0,255)},${R(0,255)})`);

let pad = new PAD(100, 20, "red", 550, 550, 50);

for (let i = 0; i < 10; i++) {
    let height = 50 + i * 30;
    for (let i = 0; i < 10; i++) {
        let width = 30 + (115 * i)
        let brick = new BRICKS(
            100,
            20,
            `rgb(${R(0,255)},${R(0,255)},${R(0,255)})`,
            width,
            height
        );
        bricks.push(brick);
    }
}


loop();
pad.controls();