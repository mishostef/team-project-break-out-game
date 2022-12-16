import { Ball } from "./figures/Ball";
import { Paddle } from "./figures/Paddle";

import { Vector } from "./Geometry/Vector";

import { createBricks } from "./utils/brickFactory";
import {
  INITIAL_BALL_X,
  INITIAL_BALL_Y,
  EASY_LEVEl, 
} from "./utils/constants";

import { CanvasView } from "./view/CanvasView";
import { Game,  GameObjects } from "./engine/gameLoop";

const canvasView = new CanvasView("gameCanvas");
const gameoverDiv = document.getElementById("gameOver");


//const STEP_SIZE = 20;

import { DOMView } from "./view/DOMView";
import { setGameLevel } from "./utils/helpers";


const dom = DOMView.getInstance();


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
let lives = 3;
const gameObjects: GameObjects = { ball, board, bricks }
let game = new Game(canvasView, lives);

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

document.getElementById("new-game").addEventListener("click", (e) => {
  if (game.lives <= 1) {
    (e.target as HTMLButtonElement).style.display = "none"
  }
  game.startGame();
  gameoverDiv.style.display = "none";
});

playBtn.addEventListener("click", () => {
  dom.getElement("#container").style.display = "none";
  dom.getElement("#gameCanvas").style.display = "block";

  const detailsBox = dom.getElement("#details-box");
  detailsBox.style.display = "flex";
  detailsBox.style.justifyContent = "space-around";

  game.startGame();

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

export function showGameOverMessage(scorePoints: number) {
  gameoverDiv.style.display = "block";
  (gameoverDiv as HTMLDivElement).innerText = `Game over, score:${scorePoints}`;
}
