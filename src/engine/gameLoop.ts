import { createBricks } from "../utils/brickFactory";
import { CanvasView } from "../view/CanvasView";
import { Board } from "../figures/Board";
import { Ball } from "../figures/Ball";
import { Vector } from "../Geometry/Vector";
import { move } from "./move";
import {
    BALL_DIAMETER,
    BOARD_HEIGHT, BOARD_WIDTH, BRICK_BONUS_POINTS, BRICK_HEIGHT, BRICK_WIDTH,
    INITIAL_BALL_X, INITIAL_BALL_Y
} from "../utils/constants";
import {
    isBallHittingTheFloor, isBallHittingTheCeiling, isBallHittingRightWall,
    isBallHittingTheLeftWall, isBallNearBricks
} from "../utils/validators";


const canvasView = new CanvasView('gameCanvas');
let lastTime = 0;
let elapsed = 0;
const STEP_SIZE = 20;
const bricks = createBricks();
const boardImg = document.getElementById('board') as HTMLImageElement;
const boardPosition = new Vector(canvasView.canvas.width / 2, canvasView.canvas.height - 100);
const board = new Board(boardPosition, boardImg);
const ball = new Ball({ x: INITIAL_BALL_X, y: INITIAL_BALL_Y }, "/assets/ball.png");
const input: { [code: string]: boolean } = {};
let deleteBrickIndex = -1;
let ballVelocity = new Vector(3, 3);
let gameOver = false;
let scorePoints = 0;
let boardVelocity = new Vector(0, 0);

window.addEventListener('keydown', event => {
    input[event.code] = true;
});
window.addEventListener('keyup', event => {
    input[event.code] = false;
});

export function update(time: number) {
    const delta = time - lastTime;
    lastTime = time;
    elapsed += delta;
    if (deleteBrickIndex != -1) {
        ballVelocity.y = -ballVelocity.y;
        bricks.splice(deleteBrickIndex, 1);
        scorePoints += BRICK_BONUS_POINTS;
        deleteBrickIndex = -1;
        // ballVelocity.y = -ballVelocity.y;
    }
    if (elapsed > STEP_SIZE * 5) {
        elapsed = STEP_SIZE * 5;
    }
    while (elapsed > STEP_SIZE) {
        elapsed -= STEP_SIZE;
        gameLoop();
        document["newgame"] = true;
    }
    if (bricks.length && !gameOver) {
        requestAnimationFrame(update);
    }
}


export function gameLoop() {

    console.log('cavas.width=', canvasView.canvas.width);
    console.log("board.position.x", board.position.x);
    if (input['ArrowLeft'] && (board.position.x > 0)) {
        boardVelocity.x = -7;
        move(board, boardVelocity);
    } else if (input['ArrowRight'] && (board.position.x + BOARD_WIDTH < canvasView.canvas.width)) {
        boardVelocity.x = 7;
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
    if (isBallCollidingWithBoard()) {
        handleBoardEdgeHit();
    }
    if (isBallNearBricks(ball)) {
        setHitBrickIndex();
    }
    if (isBallHittingTheFloor(ball, canvasView)) {
        gameOver = true;
        showGameOverMessage();
    } else if (isBallHittingTheCeiling(ball)) {
        ballVelocity.y = Math.abs(ballVelocity.y);
    } else if (isBallHittingRightWall(ball, canvasView)) {
        ballVelocity.x = - ballVelocity.x;
    } else if (isBallHittingTheLeftWall(ball)) {
        ballVelocity.x = Math.abs(ballVelocity.x);
    }
}

function showGameOverMessage() {
    const gameoverDiv = document.getElementById("gameOver");
    gameoverDiv.style.display = "block";
    (gameoverDiv as HTMLDivElement).innerText = `Game over, score:${scorePoints}`;
    document.getElementById('container').style.display = "block";
}

function handleBoardEdgeHit() {
    if (isBallHittingBoardEdges(ball, board)) {
        ballVelocity.x += boardVelocity.x;
    }
    ballVelocity.y = -ballVelocity.y;
}

export function isBallHittingBoardEdges(ball: Ball, board: Board) {
    return (ball.position.x <= board.position.x + BOARD_WIDTH
        || ball.position.x >= board.position.x - BALL_DIAMETER);
}

function setHitBrickIndex() {
    deleteBrickIndex = bricks.findIndex(b => ((b.position.y - BRICK_HEIGHT / 2 <= ball.position.y - BALL_DIAMETER / 2)
        && (b.position.y + BRICK_HEIGHT / 2 >= ball.position.y - BALL_DIAMETER / 2)
        && (b.position.x + BRICK_WIDTH / 2 >= ball.position.x - BALL_DIAMETER / 2)
        && (b.position.x - BRICK_WIDTH / 2 <= ball.position.x - BALL_DIAMETER / 2)));
}

function isBallCollidingWithBoard() {
    console.log(ball.position.y + BALL_DIAMETER / 2 <= board.position.y + BOARD_HEIGHT);
    console.log(ball.position.y + BALL_DIAMETER / 2 >= board.position.y);
    console.log(ball.position.x <= board.position.x + BOARD_WIDTH);
    console.log(ball.position.x >= board.position.x - BALL_DIAMETER);
    return ((ball.position.y + BALL_DIAMETER / 2 <= board.position.y + BOARD_HEIGHT)
        && (ball.position.y + BALL_DIAMETER / 2 >= board.position.y)
        && (ball.position.x <= board.position.x + BOARD_WIDTH)
        && (ball.position.x >= board.position.x - BALL_DIAMETER))
}