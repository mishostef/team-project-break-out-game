import {
  EASY_LEVEl,
} from "./utils/constants";

import { CanvasView } from "./view/CanvasView";
import { Game } from "./engine/gameLoop";

const canvasView = new CanvasView("gameCanvas");
const gameoverDiv = document.getElementById("gameOver");

import { DOMView } from "./view/DOMView";
import { setGameLevel } from "./utils/helpers";


const dom = DOMView.getInstance();

let GAME_DIFFICULTY = EASY_LEVEl;

let lives = 3;
let game = new Game(canvasView, lives);

const playBtn = document.getElementById("play-btn");
let isPlayingMusic = false;

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

  if (isPlayingMusic) {
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
    isPlayingMusic = true;
    (dom.getElement(".gg-check") as HTMLElement).style.display =
      "block";
  });
});

dom.getElement("#level").addEventListener("click", (e) => {
  const input = (e.target as HTMLInputElement);
  GAME_DIFFICULTY = setGameLevel(input);
});

