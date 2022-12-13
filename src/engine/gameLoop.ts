import { createBricks } from "../utils/brickFactory";
import { CanvasView } from "../view/CanvasView";
import { Board } from "../figures/Board";
import { Ball } from "../figures/Ball";
import { Vector } from "../Geometry/Vector";
import { move } from "./move";
import { BOARD_HEIGHT, BOARD_WIDTH, INITIAL_BALL_X, INITIAL_BALL_Y } from "../utils/constants";


const canvasView = new CanvasView('gameCanvas');
let lastTime = 0;
let elapsed = 0;
const STEP_SIZE = 20;

const bricks = createBricks();
const boardImg = document.getElementById('board') as HTMLImageElement;
const boardPosition = new Vector(canvasView.canvas.width / 2, canvasView.canvas.height - 100);
const board = new Board(boardPosition, boardImg);
const ball = new Ball({ x: INITIAL_BALL_X, y: INITIAL_BALL_Y }, "/assets/ball.png");
const BALL_DIAMETER = 50;
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

let ballVelocity = new Vector(1, 2)

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

    collisionDetector();

    move(ball, ballVelocity);
}

function collisionDetector() {
    if (ball.position.y <= board.position.y - BOARD_HEIGHT / 2 - BALL_DIAMETER / 2
        && ball.position.y > board.position.y - BOARD_HEIGHT / 2 - BALL_DIAMETER
        && ball.position.x <= board.position.x + BOARD_WIDTH / 2
        && ball.position.x >= board.position.x - BOARD_WIDTH / 2) {
        ballVelocity.y = -ballVelocity.y;
        //alert('hello');
    }
    if (ball.position.y >= canvasView.canvas.height - BALL_DIAMETER) {///
        ballVelocity.y = -ballVelocity.y;
    } else if (ball.position.y <= 0) {
        ballVelocity.y = Math.abs(ballVelocity.y);
    } else if (ball.position.x > canvasView.canvas.width - BALL_DIAMETER) {
        ballVelocity.x = - ballVelocity.x;
    } else if (ball.position.x <= 0) {
        ballVelocity.x = Math.abs(ballVelocity.x);
    }
}
