import { Ball } from "./figures/Ball";

import { Ball as b } from "./gameObjects/Ball";
import { Vector } from "./utils/vector";
import { Vector as v } from "./Geometry/Vector";
import { CanvasView } from "./view/CanvasView"
const playBtn = document.getElementById('play-btn');
import { createBricks } from "./utils/brickFactory";
const canvasView = new CanvasView('gameCanvas');
let lastTime = 0;
let elapsed = 0;
const STEP_SIZE = 20;
const canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
//canvas.style.display = 'block';
const ctx = canvas.getContext('2d');
const bb = new b(new v(5, 5), new v(5, 5));
const bricks = createBricks();

const ball = new Ball({ x: 200, y: 200 }, "/assets/ball.png");
playBtn.addEventListener('click', () => {
    document.getElementById('container').style.display = 'none';
    startGame();
});

function startGame() {
    canvas.style.display = 'block';

    update(performance.now());

}
export function update(time: number) {
    const delta = time - lastTime;
    lastTime = time;
    elapsed += delta;
    if (elapsed > STEP_SIZE * 5) {
        elapsed = STEP_SIZE * 5;
    }

    while (elapsed > STEP_SIZE) {
        elapsed -= STEP_SIZE;
        loop();
    }
    // if (isRunning)
    requestAnimationFrame(update);
}

export function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    canvasView.drawBricks(bricks);
    canvasView.drawBall(ball);

    ball.position.y += 2;
    ball.position.x += 1;
    //bb.move();
    //canvasView.drawBall(bb);
}



