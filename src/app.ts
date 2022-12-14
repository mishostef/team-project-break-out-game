
//import { update } from "./engine/gameLoop";

import { move } from "./engine/move";
import { Ball } from "./figures/Ball";
import { Board } from "./figures/Board";
import { Vector } from "./Geometry/Vector";
import { createBricks } from "./utils/brickFactory";
import {
    INITIAL_BALL_X, INITIAL_BALL_Y, BRICK_BONUS_POINTS,
    BOARD_WIDTH, BALL_DIAMETER, BRICK_HEIGHT, BRICK_WIDTH, BOARD_HEIGHT
} from "./utils/constants";
import {
    isBallNearBricks, isBallHittingTheFloor, isBallHittingTheCeiling,
    isBallHittingRightWall, isBallHittingTheLeftWall
} from "./utils/validators";
import { CanvasView } from "./view/CanvasView";

const canvasView = new CanvasView("gameCanvas");
let lastTime = 0;
let elapsed = 0;
const STEP_SIZE = 20;
const boardImg = document.getElementById('board') as HTMLImageElement;
const boardPosition = new Vector(canvasView.canvas.width / 2, canvasView.canvas.height - 100);
let bricks = createBricks();
let board = new Board(boardPosition, boardImg);
let ball = new Ball({ x: INITIAL_BALL_X, y: INITIAL_BALL_Y }, "/assets/ball.png");
const input: { [code: string]: boolean } = {};

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


const playBtn = document.getElementById('play-btn');
let isPlayMusic = false;

document.getElementById("new-game").addEventListener("click", () => {
    gameOver = false;
    startGame();
});
playBtn.addEventListener('click', () => {
    document.getElementById('container').style.display = 'none';
    document.getElementById('gameCanvas').style.display = 'block';
    startGame();

    if (isPlayMusic) {
        const music = new Audio("../assets/music.mp3");
        music.volume = 0.1;

        music.play();
    }
});

document.getElementById('setting-btn').addEventListener('click', () => {
    const settingsContainer = document.getElementById('settings-container');
    const container = document.getElementById('container');
    settingsContainer.style.display = 'block';
    container.style.display = 'none';
    document.getElementById('back-btn').addEventListener('click', () => {
        settingsContainer.style.display = 'none';
        container.style.display = 'block';
    })

    document.getElementById('play-sound-btn').addEventListener('click', () => {
        isPlayMusic = true;
    })
})

function startGame() {
    bricks = createBricks();
    board = new Board(boardPosition, boardImg);
    ball = new Ball({ x: INITIAL_BALL_X, y: INITIAL_BALL_Y }, "/assets/ball.png");
    update(performance.now());
}

export function update(time: number) {
    const delta = time - lastTime;
    lastTime = time;
    elapsed += delta;
    let deleteBrickIndex =isBallNearBricks(ball)?  getHitBrickIndex():-1;
    if (deleteBrickIndex != -1) {
        ballVelocity.y = -ballVelocity.y;
        bricks.splice(deleteBrickIndex, 1);
        scorePoints += BRICK_BONUS_POINTS;
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

export function collisionDetector() {
    if (isBallCollidingWithBoard()) {
        handleBoardEdgeHit();
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

export function showGameOverMessage() {
    const gameoverDiv = document.getElementById("gameOver");
    gameoverDiv.style.display = "block";
    (gameoverDiv as HTMLDivElement).innerText = `Game over, score:${scorePoints}`;

}

export function handleBoardEdgeHit() {
    if (isBallHittingBoardEdges(ball, board)) {
        ballVelocity.x += boardVelocity.x;
    }
    ballVelocity.y = -ballVelocity.y;
}

export function isBallHittingBoardEdges(ball: Ball, board: Board) {
    return (ball.position.x <= board.position.x + BOARD_WIDTH
        || ball.position.x >= board.position.x - BALL_DIAMETER);
}

export function getHitBrickIndex() {
    return bricks.findIndex(brick => ((brick.position.y - BRICK_HEIGHT / 2 <= ball.position.y - BALL_DIAMETER / 2)
        && (brick.position.y + BRICK_HEIGHT / 2 >= ball.position.y - BALL_DIAMETER / 2)
        && (brick.position.x + BRICK_WIDTH / 2 >= ball.position.x - BALL_DIAMETER / 2)
        && (brick.position.x - BRICK_WIDTH / 2 <= ball.position.x - BALL_DIAMETER / 2)));
}

function isBallCollidingWithBoard() {
    console.log(ball.position.y + BALL_DIAMETER / 2 <= board.position.y + BOARD_HEIGHT);
    console.log(ball.position.y + BALL_DIAMETER / 2 >= board.position.y);
    console.log(ball.position.x <= board.position.x + BOARD_WIDTH);
    console.log(ball.position.x >= board.position.x - BALL_DIAMETER);
    return ((ball.position.y + BALL_DIAMETER / 2 <= board.position.y + BOARD_HEIGHT)
        && (ball.position.y + BALL_DIAMETER / 2 >= board.position.y)
        && (ball.position.x <= board.position.x + BOARD_WIDTH + BALL_DIAMETER / 2)
        && (ball.position.x >= board.position.x - BALL_DIAMETER / 2))
}