// @ts-nocheck
class Particle {
    constructor(x, y) {
        this.x = x + 24;
        this.y = y + 24;
        this.radius = Math.random() * 20 + 1;
        this.opacity = 1;
        this.directionX = Math.random() * 1 - 0.5;
        this.directionY = Math.random() * 1 - 0.5;
    }
    drawDust() {
        ctx3.fillStyle = `rgba(150, 150, 150, ${this.opacity})`;
        ctx3.beginPath();
        ctx3.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx3.fill();
        ctx3.closePath();
    }
    update() {
        this.x += this.directionX;
        this.y += this.directionY;
        if (this.opacity > 0.1) {
            this.opacity -= 0.9;
        }
        if (this.radius > 0.15) {
            this.radius -= 0.14;
        }
    }
    drawRipple() {
        ctx1.strokeStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx1.beginPath();
        ctx1.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx1.stroke();
        ctx1.closePath();
    }
    ripple() {
        if (this.radius < 50) {
            this.radius += 0.7 ;
            this.x -= 0.05;
            this.y -= 0.05;
        }
        if (this.opacity > 0) {
            this.opacity -= 0.02
        }
    }
}
// dust
function handlerParticles() {
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].drawDust();
    }
    if (particlesArray.length > maxParticles) {
        for (let i = 0; i < 30; i++) {
            particlesArray.pop();
        }
    }
    if (
        (keys["ArrowLeft"] ||
            keys["ArrowRight"] ||
            keys["ArrowUp"] ||
            keys["ArrowDown"]) &&
        frogger.y > 250 &&
        particlesArray.length < maxParticles + 10
    ) {
        for (let i = 0; i < 10; i++) {
            particlesArray.unshift(new Particle(frogger.x, frogger.y));
        }
    }
}
// water ripple
function handlerRipples() {

    // water ripples
    for (let i = 0; i < ripplesArray.length; i++) {
        ripplesArray[i].ripple();
        ripplesArray[i].drawRipple();
    }
    if (ripplesArray.length > maxRipples) {
        for (let i = 0; i < 5; i++) {
            ripplesArray.pop();
        }
    }
    if (
        (keys["ArrowLeft"] ||
            keys["ArrowRight"] ||
            keys["ArrowUp"] ||
            keys["ArrowDown"]) &&
        frogger.y < 250 &&
        frogger.y > 100
    ) {
        for (let i = 0; i < 20; i++) {
            ripplesArray.unshift(new Particle(frogger.x, frogger.y));
        }
    }
}
