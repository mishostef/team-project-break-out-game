import { Ball } from "./figures/Ball";
import { Paddle } from "./figures/Paddle";

import { Vector } from "./Geometry/Vector";
import { changeBallDirection } from "./physics/movement";
import { getHitBrickIndex } from "./physics/misc";

import { createBricks } from "./utils/brickFactory";
import {
  INITIAL_BALL_X,
  INITIAL_BALL_Y,
  BRICK_BONUS_POINTS,
  EASY_LEVEl,
  MEDIUM_LEVEL,
  HARD_LEVEL,
  STEP_SIZE,
} from "./utils/constants";
import { isBallNearBricks } from "./utils/validators";

import { DOMView } from "./view/DOMView";

import { gameLoop } from "./engine/gameLoop";
import { setGameLevel } from "./utils/helpers";
import { canvasView } from "./view/CanvasView";

const dom = DOMView.getInstance();

const gameoverDiv = dom.getElement("#gameOver");
const boardImg = dom.getElement("#board") as HTMLImageElement;

let lastTime = 0;
let elapsed = 0;

let GAME_DIFFICULTY = EASY_LEVEl;

const boardPosition = new Vector(
  canvasView.canvas.width / 2,
  canvasView.canvas.height - 100
);
let bricks = createBricks();
let boardVelocity = new Vector(0, 0);
let board = new Paddle(boardPosition, boardImg, boardVelocity);
const ballPosition = new Vector(INITIAL_BALL_X, INITIAL_BALL_Y);
let ballVelocity = new Vector(GAME_DIFFICULTY, GAME_DIFFICULTY);
let ball = new Ball(ballPosition, "/assets/ball.png", ballVelocity);
const input: { [code: string]: boolean } = {};

let gameOver = false;
export let scorePoints = 0;
let isMouseActive = true;

window.addEventListener("keydown", (event) => {
  input[event.code] = true;
});
window.addEventListener("keyup", (event) => {
  input[event.code] = false;
});

dom.addHandler("mousemove", (e: MouseEvent) => {
    if (isMouseActive) board.position.x = e.clientX;
})

window.oncontextmenu = (e) => {
  e.preventDefault();
  console.log("right clicked");
  isMouseActive = false;
};
const playBtn = document.getElementById("play-btn");
let isPlayMusic = false;


dom.getElement("#new-game").addEventListener("click", () => {
  gameOver = false;
  startGame();
  gameoverDiv.style.display = "none";
});

playBtn.addEventListener("click", () => {
  dom.getElement("#container").style.display = "none";
  dom.getElement("#gameCanvas").style.display = "block";

  const detailsBox = dom.getElement("#details-box");
  detailsBox.style.display = "flex";
  detailsBox.style.justifyContent = "space-around";

  startGame();

  if (isPlayMusic) {
    const music = new Audio("../assets/music.mp3");
    music.volume = 0.1;
    music.play();
  }
});

dom.getElement("#setting-btn").addEventListener("click", () => {
  const settingsContainer = dom.getElement("#settings-container");
  const container = dom.getElement("#container");
  settingsContainer.style.display = "block";
  container.style.display = "none";

  dom.getElement("#back-btn").addEventListener("click", () => {
    settingsContainer.style.display = "none";
    container.style.display = "block";
  });

  dom.getElement("#play-sound-btn").addEventListener("click", () => {
    isPlayMusic = true;
    (dom.getElement(".gg-check") as HTMLElement).style.display =
      "block";
  });
});

dom.getElement("#level").addEventListener("click", (e) => {
  const input = (e.target as HTMLInputElement);
  GAME_DIFFICULTY = setGameLevel(input);
});


function startGame() {
  bricks = createBricks();

  board = new Paddle(boardPosition, boardImg);
  const ballPosition = new Vector(INITIAL_BALL_X, INITIAL_BALL_Y);

  ball = new Ball(ballPosition, "/assets/ball.png");
  ball.velocity = new Vector(GAME_DIFFICULTY, GAME_DIFFICULTY);

  scorePoints = 0;
  update(performance.now());
}

// Extract somewhere ?
export function update(time: number) {
  const delta = time - lastTime;
  lastTime = time;
  elapsed += delta;
  let deleteBrickIndex = isBallNearBricks(ball)
    ? getHitBrickIndex(bricks, ball)
    : -1;
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
