// export function update(time: number) {
//     const delta = time - lastTime;
//     lastTime = time;
//     elapsed += delta;
//     if (elapsed > STEP_SIZE * 5) {
//         elapsed = STEP_SIZE * 5;
//     }

//     while (elapsed > STEP_SIZE) {
//         elapsed -= STEP_SIZE;
//         gameLoop();
//     }
//     // if (isRunning)
//     requestAnimationFrame(update);
// }

// export function gameLoop() {
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     bb.move();
//     drawBall(bb);
// }
// function drawBall(ball: b) {
//     ctx.beginPath()
//     ctx.arc(ball.position.x, ball.position.y, ball.radius, 0, 2 * Math.PI);
//     ctx.fillStyle = "red";
//     ctx.fill();
//     ctx.closePath();
//}