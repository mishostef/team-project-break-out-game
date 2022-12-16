import { Ball } from "./figures/Ball";
import { Paddle } from "./figures/Paddle";
import { Vector } from "./Geometry/Vector";
import { changeBallDirection } from "./physics/movement";
import { createBricks } from "./utils/brickFactory";
import {
  INITIAL_BALL_X,
  INITIAL_BALL_Y,
  BRICK_BONUS_POINTS,
  BOARD_WIDTH,
  BALL_DIAMETER,
  BRICK_HEIGHT,
  BRICK_WIDTH,
  BOARD_HEIGHT,
  EASY_LEVEl,
  MEDIUM_LEVEL,
  HARD_LEVEL,
} from "./utils/constants";

import { isBallNearBricks } from "./utils/validators";
import { CanvasView } from "./view/CanvasView";
import { getHitBrickIndex } from "./physics/misc";
import { Game, gameLoop, GameObjects } from "./engine/gameLoop";

const canvasView = new CanvasView("gameCanvas");
const gameoverDiv = document.getElementById("gameOver");


//const STEP_SIZE = 20;
let GAME_DIFFICULTY = EASY_LEVEl;
const boardImg = document.getElementById("board") as HTMLImageElement;
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

let scorePoints = 0;
let isMouseActive = true;
let lives = 3;
const gameObjects: GameObjects = { ball, board, bricks }
let game = new Game(canvasView, lives);

window.addEventListener("keydown", (event) => {
  input[event.code] = true;
});
window.addEventListener("keyup", (event) => {
  input[event.code] = false;
});

document.addEventListener("mousemove", (e) => {
  if (isMouseActive) board.position.x = e.clientX;
});

window.oncontextmenu = (e) => {
  e.preventDefault();
  console.log("right clicked");
  isMouseActive = false;
};
const playBtn = document.getElementById("play-btn");
let isPlayMusic = false;

document.getElementById("new-game").addEventListener("click", (e) => {
  if (game.lives <= 1) {
    (e.target as HTMLButtonElement).style.display = "none"
  }
  game.startGame();
  gameoverDiv.style.display = "none";
});
playBtn.addEventListener("click", () => {
  document.getElementById("container").style.display = "none";
  document.getElementById("gameCanvas").style.display = "block";
  const detailsBox = document.getElementById("details-box");
  detailsBox.style.display = "flex";
  detailsBox.style.justifyContent = "space-around";

  game.startGame();

  if (isPlayMusic) {
    const music = new Audio("../assets/music.mp3");
    music.volume = 0.1;
    music.play();
  }
});

document.getElementById("setting-btn").addEventListener("click", () => {
  const settingsContainer = document.getElementById("settings-container");
  const container = document.getElementById("container");
  settingsContainer.style.display = "block";
  container.style.display = "none";
  document.getElementById("back-btn").addEventListener("click", () => {
    settingsContainer.style.display = "none";
    container.style.display = "block";
  });

  document.getElementById("play-sound-btn").addEventListener("click", () => {
    isPlayMusic = true;
    (document.querySelector(".gg-check") as HTMLElement).style.display =
      "block";
  });
});

document.getElementById("level").addEventListener("click", (e) => {
  const input = (e.target as HTMLInputElement);
  const level = input.id;

  document.querySelectorAll('input').forEach((input) => {
    input.checked = false;
  })

  input.checked = true;

  switch (level) {
    case "easy":
      GAME_DIFFICULTY = EASY_LEVEl;
      break;
    case "medium":
      GAME_DIFFICULTY = MEDIUM_LEVEL;
      break;
    case "hard":
      GAME_DIFFICULTY = HARD_LEVEL;
      break;
  }
});

export function showGameOverMessage(scorePoints: number) {
  gameoverDiv.style.display = "block";
  (gameoverDiv as HTMLDivElement).innerText = `Game over, score:${scorePoints}`;
}
