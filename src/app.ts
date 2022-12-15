import { Ball } from "./figures/Ball";
import { Paddle } from "./figures/Paddle";
import { Vector } from "./Geometry/Vector";
import { changeBallDirection } from "./physics/movement";
import { createBricks } from "./utils/brickFactory";
import {
    INITIAL_BALL_X, INITIAL_BALL_Y, BRICK_BONUS_POINTS,
} from "./utils/constants";
import {
    isBallNearBricks
} from "./utils/validators";
import { CanvasView } from "./view/CanvasView";
import { getHitBrickIndex } from "./physics/misc";
import { gameLoop } from "./engine/gameLoop";

const canvasView = new CanvasView("gameCanvas");
const gameoverDiv = document.getElementById("gameOver");
let lastTime = 0;
let elapsed = 0;
const STEP_SIZE = 20;
const boardImg = document.getElementById('board') as HTMLImageElement;
const boardPosition = new Vector(canvasView.canvas.width / 2, canvasView.canvas.height - 100);
let bricks = createBricks();
let boardVelocity = new Vector(0, 0);
let board = new Paddle(boardPosition, boardImg, boardVelocity);
const ballPosition = new Vector(INITIAL_BALL_X, INITIAL_BALL_Y);
let ballVelocity = new Vector(3, 3);
let ball = new Ball(ballPosition, "/assets/ball.png", ballVelocity);
const input: { [code: string]: boolean } = {};


let gameOver = false;
let scorePoints = 0;
let isMouseActive = true;


window.addEventListener('keydown', event => {
    input[event.code] = true;
});
window.addEventListener('keyup', event => {
    input[event.code] = false;
});

document.addEventListener('mousemove', (e) => {
    if (isMouseActive)
        board.position.x = e.clientX;
})

window.oncontextmenu = (e) => {
    e.preventDefault();
    console.log("right clicked");
    isMouseActive = false;
}
const playBtn = document.getElementById('play-btn');
let isPlayMusic = false;

document.getElementById("new-game").addEventListener("click", () => {
    gameOver = false;
    startGame();
    gameoverDiv.style.display = "none"
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
    const ballPosition = new Vector(INITIAL_BALL_X, INITIAL_BALL_Y)
    ball = new Ball(ballPosition, "/assets/ball.png");
    ball.velocity = new Vector(3, 3);
    scorePoints = 0;
    update(performance.now());
}

export function update(time: number) {
    const delta = time - lastTime;
    lastTime = time;
    elapsed += delta;
    let deleteBrickIndex = isBallNearBricks(ball) ? getHitBrickIndex(bricks, ball) : -1;
    if (deleteBrickIndex != -1) {
        const brick = bricks[deleteBrickIndex];
        changeBallDirection(ball, brick);
        bricks.splice(deleteBrickIndex, 1);
        scorePoints += BRICK_BONUS_POINTS;
    }
    if (elapsed > STEP_SIZE * 5) {
        elapsed = STEP_SIZE * 5;
    }
    while (elapsed > STEP_SIZE) {
        elapsed -= STEP_SIZE;
        const loop = gameLoop.bind(null, ball, board, bricks, canvasView, gameOver);
        loop();
        document["newgame"] = true;
    }
    if (bricks.length && !gameOver) {
        requestAnimationFrame(update);
    }
}

export function showGameOverMessage() {
    gameoverDiv.style.display = "block";
    (gameoverDiv as HTMLDivElement).innerText = `Game over, score:${scorePoints}`;
}