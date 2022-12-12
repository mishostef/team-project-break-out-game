import { Ball } from "./figures/Ball";

import { Vector as v, Vector } from "./Geometry/Vector";
import { CanvasView } from "./view/CanvasView"
const playBtn = document.getElementById('play-btn');
import { createBricks } from "./utils/brickFactory";
import { Board } from "./figures/Board";
import { moveBall } from "./engine/move"
const canvasView = new CanvasView('gameCanvas');
let lastTime = 0;
let elapsed = 0;
const STEP_SIZE = 20;

const bricks = createBricks();
const boardImg = document.getElementById('board') as HTMLImageElement;
const board = new Board(new v(canvasView.canvas.width / 2, canvasView.canvas.height - 100), boardImg);
const ball = new Ball({ x: 200, y: 200 }, "/assets/ball.png");

playBtn.addEventListener('click', () => {
    document.getElementById('container').style.display = 'none';
    startGame();
});

function startGame() {

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
console.log(canvasView.canvas.height);

export function loop() {
    canvasView.getContext().clearRect(0, 0, canvasView.canvas.width, canvasView.canvas.height);
    canvasView.drawBricks(bricks);
    canvasView.drawBoard(board);
    canvasView.drawBall(ball);

    if (ball.position.y <= canvasView.canvas.height - 50) {
        const velocity = new Vector(1, 2);
        moveBall(ball, velocity);
    }
}