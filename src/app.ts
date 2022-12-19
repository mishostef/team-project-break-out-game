import { canvasView } from "./view/canvasView";
import { Game } from "./engine/gameLoop";
import { DOMView } from "./view/DOMView";

//const canvasView = new CanvasView("gameCanvas");
const dom = DOMView.getInstance();
let lives = 3;
let game = new Game(canvasView, lives);
let isPlayingMusic = false;

dom.addHandler("click", () => {
  game.startGame();
  dom.hideGameOverMessage();
}, "#new-game");

dom.addHandler("click", () => {
  dom.initGame();
  game.lives = lives;
  game.scorePoints = 0;
  game.startGame();

  if (isPlayingMusic) {
    const music = new Audio("../assets/music.mp3");
    music.volume = 0.1;
    music.play();
  }
}, "#play-btn");

dom.addHandler("click", () => {
  dom.showSettingsMenu();
  dom.addBackButtonHandler();
  dom.addHandler("click", () => {
    isPlayingMusic = true;
    dom.showIcon();
  }, "#play-sound-btn");
}, "#setting-btn");