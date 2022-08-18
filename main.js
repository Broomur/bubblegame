'use strict'

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
        ctx.arc(this.posX, this.posY, this.size, 0, 2 * Math.PI);
        ctx.fill();
    }
    animate() {
        if ((this.posX + this.size) >= width) {
            this.dirX = -(this.dirX);
        }
        if ((this.posX - this.size) <= 0) {
            this.dirX = -(this.dirX);
        }
        if ((this.posY + this.size) >= height) {
            this.dirY = -(this.dirY);
        }
        if ((this.posY - this.size) <= 0) {
            this.dirY = -(this.dirY);
        }
        this.posX += this.dirX;
        this.posY += this.dirY;
    }
}

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

let balls = [];

while (balls.length < 10) {
    let ball = new BALL(
        R(-5, 5), 
        R(-5, 5), 
        R(100, 600), 
        R(100, 600), 
        R(5, 20), 
        `rgb(${R(0,255)},${R(0,255)},${R(0,255)})`);
    balls.push(ball);
};

function R(max, min) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function loop() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
    ctx.fillRect(0, 0, width, height);
    for (let i = 0; i < balls.length; i++) {
        balls[i].draw();
        balls[i].animate();
    }
    return requestAnimationFrame(loop);
}

requestID = loop();

canvas.addEventListener("click", ()=>{clearAnimationFrame(requestID)})