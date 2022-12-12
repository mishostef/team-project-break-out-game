import { Ball } from "./figures/Ball";
import { createBricks } from "./utils/brickFactory";
import { BRICK_HEIGHT, BRICK_ROWS, BRICK_WIDTH } from "./utils/constants";
import { Vector } from "./utils/vector";
import { CanvasView } from "./view/CanvasView";
const playBtn = document.getElementById('play-btn');

playBtn.addEventListener('click', () => {
    document.getElementById('container').style.display = 'none';
    document.getElementById('gameCanvas').style.display = 'block';
    startGame();
})

const canvasView = new CanvasView('gameCanvas');

function startGame() {
    const ctx = canvasView.getContext();
    drawBricks(ctx);

    const ballPos: Vector = {
        x: 400,
        y: 450,
    }

    const ball = new Ball(ballPos, "/assets/ball.png");
    canvasView.drawImage(ballPos, ball.getImage(), 30, 30);

}

function drawBricks(ctx: CanvasRenderingContext2D) {
    const bricks = createBricks();

    for (let r = 0; r < BRICK_ROWS; r++) {
        for (let c = 0; c < bricks.length; c++) {
            const brick = bricks[c];
            const pos: Vector = {
                x: brick.position.x,
                y: brick.position.y
            }
            canvasView.drawImage(pos , brick.getImage(), BRICK_WIDTH, BRICK_HEIGHT);
        }
    }
}