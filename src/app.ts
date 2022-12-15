
//import { update } from "./engine/gameLoop";

import { move } from "./engine/move";
import { Ball } from "./figures/Ball";
import { Paddle } from "./figures/Paddle";
import { Brick } from "./figures/Brick";
import { Vector } from "./Geometry/Vector";
import { changeBallDirection } from "./physics/movement";
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
let board = new Paddle(boardPosition, boardImg);
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
       (document.querySelector('.gg-check') as HTMLElement).style.display = 'block';
    })
})

function startGame() {
    bricks = createBricks();
    board = new Paddle(boardPosition, boardImg);
    ball = new Ball({ x: INITIAL_BALL_X, y: INITIAL_BALL_Y }, "/assets/ball.png");
    ballVelocity = new Vector(3, 3);
    update(performance.now());
}

export function update(time: number) {
    const delta = time - lastTime;
    lastTime = time;
    elapsed += delta;
    let deleteBrickIndex = isBallNearBricks(ball) ? getHitBrickIndex() : -1;
    if (deleteBrickIndex != -1) {
        const brick = bricks[deleteBrickIndex];
        changeBallDirection(ball, brick, ballVelocity);
        // ballVelocity.y = -ballVelocity.y;
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
        handleBoardHit(ball);
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

export function handleBoardHit(ball: Ball) {
    const currentAngle = Math.atan2(ball.position.y, ball.position.x);
    const deltaCenterX = ball.position.x - (board.position.x - BOARD_WIDTH / 2);
    const sign = ball.position.x > board.position.x + BOARD_WIDTH / 2 ? 1 : -1;
    const coeff = sign * (ball.position.x) / (BOARD_WIDTH / 2);
    const angleToAdd = Math.PI / 20;
    const nextAngle = coeff * angleToAdd + currentAngle;
    const yOffset = 5;
    if (nextAngle < 2 * Math.PI / 3 && nextAngle > Math.PI / 20) {
        ballVelocity.x = 7 * Math.sin(nextAngle);
        ballVelocity.y = 7 * Math.cos(nextAngle);
    } else {
        ballVelocity.y = -ballVelocity.y;
    }
    ball.position.y -= yOffset;
}

export function isBallHittingBoardEdges(ball: Ball, board: Paddle) {
    return (ball.position.x <= board.position.x + BOARD_WIDTH
        || ball.position.x >= board.position.x - BALL_DIAMETER);
}

export function getHitBrickIndex() {
    return bricks.findIndex(brick => {
        const left = brick.position.x - BALL_DIAMETER / 2;
        const right = brick.position.x + BRICK_WIDTH + BALL_DIAMETER / 2;
        const top = brick.position.y - BALL_DIAMETER / 2;
        const bottom = brick.position.y + BRICK_HEIGHT + BALL_DIAMETER / 2;
        return ((ball.position.x >= left)
            && (ball.position.x <= right)
            && (ball.position.y >= top)
            && (ball.position.y <= bottom));
    });
}

export function isBallCollidingWithBoard() {
    console.log(ball.position.y + BALL_DIAMETER / 2 <= board.position.y + BOARD_HEIGHT);
    console.log(ball.position.y + BALL_DIAMETER / 2 >= board.position.y);
    console.log(ball.position.x <= board.position.x + BOARD_WIDTH);
    console.log(ball.position.x >= board.position.x - BALL_DIAMETER);
    return ((ball.position.y + BALL_DIAMETER / 2 <= board.position.y)
        && (ball.position.y + BALL_DIAMETER / 2 >= board.position.y - 20)
        && (ball.position.x - BALL_DIAMETER / 2 <= board.position.x + BOARD_WIDTH)
        && (ball.position.x + BALL_DIAMETER / 4 >= board.position.x));
}


