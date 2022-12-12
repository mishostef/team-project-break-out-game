import { createBricks } from "../utils/brickFactory";
import { CanvasView } from "../view/CanvasView";
import { Board } from "../figures/Board";
import { Ball } from "../figures/Ball";
import { Vector } from "../Geometry/Vector";
import { move } from "./move";

const canvasView = new CanvasView('gameCanvas');
let lastTime = 0;
let elapsed = 0;
const STEP_SIZE = 20;

const bricks = createBricks();
const boardImg = document.getElementById('board') as HTMLImageElement;
const boardPosition = new Vector(canvasView.canvas.width / 2, canvasView.canvas.height - 100);
const board = new Board(boardPosition, boardImg);
const ball = new Ball({ x: 200, y: 200 }, "/assets/ball.png");
const input: { [code: string]: boolean } = {};


window.addEventListener('keydown', event => {
    input[event.code] = true;
    //alert(event.key)
});
window.addEventListener('keyup', event => {
    input[event.code] = false;
});
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
    let boardVelocity
    if (input['ArrowLeft']) {
        boardVelocity = new Vector(-5, 0);
        move(board, boardVelocity);
    } else if (input['ArrowRight']) {
        boardVelocity = new Vector(5, 0);
        move(board, boardVelocity);
    }
    canvasView.getContext().clearRect(0, 0, canvasView.canvas.width, canvasView.canvas.height);
    canvasView.drawBricks(bricks);
    canvasView.drawBoard(board);
    canvasView.drawBall(ball);

    if (ball.position.y <= canvasView.canvas.height - 50) {
        const velocity = new Vector(1, 2);
        move(ball, velocity);
    }
}