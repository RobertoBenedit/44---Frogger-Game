// @ts-nocheck

function animate() {
    ctx1.clearRect(0, 0, canvas.width, canvas.height);
    ctx2.clearRect(0, 0, canvas.width, canvas.height);
    ctx3.clearRect(0, 0, canvas.width, canvas.height);
    ctx4.clearRect(0, 0, canvas.width, canvas.height);
    ctx5.clearRect(0, 0, canvas.width, canvas.height);

    handlerRipples();
    ctx2.drawImage(background_lvl2, 0, 0, canvas.width, canvas.height);
    handlerParticles();
    frogger.draw();
    frogger.update();

    handlerObstacles();
    handleScoreBoard();
    ctx4.drawImage(grass, 0, 0);
    frame++;
    requestAnimationFrame(animate);
}
animate();

// event listeners

window.addEventListener("keydown", function (e) {
    keys = [];
    keys[e.key] = true;
    if (
        keys["ArrowLeft"] ||
        keys["ArrowRight"] ||
        keys["ArrowUp"] ||
        keys["ArrowDown"]
    ) {
        frogger.jump();
    }
});

window.addEventListener("keyup", function (e) {
    delete keys[e.key];
    frogger.moving = false;
});

function scored() {
    score++;
    gameSpeed += 0.5;
    frogger.x = canvas.width / 2 - frogger.width / 2;
    frogger.y = canvas.height - frogger.height - 40;
}

function handleScoreBoard() {
    ctx4.fillStyle = "white";
    ctx4.strokeStyle = "white";
    ctx4.font = "15px Verdana";
    ctx4.strokeText("Score", 265, 15);
    ctx4.font = "60px Verdana";
    ctx4.fillText(score, 270, 65);
    ctx4.font = "15px Verdana";
    ctx4.strokeText("Collisions: " + collisionsCount, 10, 117);
    ctx4.strokeText("Game Speed: " + gameSpeed.toFixed(1), 10, 137);
}

// collision detection
function collision(first, second) {
    return !(
        first.x > second.x + second.width ||
        first.x + first.width < second.x ||
        first.y > second.y + second.height ||
        first.y + first.height < second.y
    );
}

function resetGame() {
    score = 0;
    collisionsCount++;
    gameSpeed = 1;
    frogger.x = canvas.width / 2 - frogger.width / 2;
    frogger.y = canvas.height - frogger.height - 40;
}
