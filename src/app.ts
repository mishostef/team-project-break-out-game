import { createBricks } from "./utils/brickFactory";
import { BRICK_HEIGHT, BRICK_ROWS, BRICK_WIDTH } from "./utils/constants";
const playBtn = document.getElementById('play-btn');

playBtn.addEventListener('click', () => {
    document.getElementById('container').style.display = 'none';
    startGame();
})

function startGame() {
    const canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
    canvas.style.display = 'block';
    const ctx = canvas.getContext('2d');

    drawBricks(ctx);
}

function drawBricks(ctx: CanvasRenderingContext2D) {
    const bricks = createBricks();

    for (let r = 0; r < BRICK_ROWS; r++) {
        for (let c = 0; c < bricks.length; c++) {
            const brick = bricks[c];
            drawImage(brick.position.x, brick.position.y, brick.getImage());
        }
    }

    function drawImage(x: number, y: number, source: string) {
        const brick = new Image();
        brick.src = source;

        brick.onload = () => {
            ctx.drawImage(brick, x, y, BRICK_WIDTH, BRICK_HEIGHT);
        };
    }
}
