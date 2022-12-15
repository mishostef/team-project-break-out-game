import { createBricks } from "../utils/brickFactory";
import { CanvasView } from "../view/CanvasView";
import { Paddle } from "../figures/Paddle";
import { Ball } from "../figures/Ball";
import { Vector } from "../Geometry/Vector";
import { move } from "./move";
import {
  BALL_DIAMETER,
  BOARD_HEIGHT,
  BOARD_WIDTH,
  BRICK_BONUS_POINTS,
  BRICK_HEIGHT,
  BRICK_WIDTH,
  INITIAL_BALL_X,
  INITIAL_BALL_Y,
} from "../utils/constants";
import {
  isBallHittingTheFloor,
  isBallHittingTheCeiling,
  isBallHittingRightWall,
  isBallHittingTheLeftWall,
  isBallNearBricks,
} from "../utils/validators";

const canvasView = new CanvasView("gameCanvas");

const input: { [code: string]: boolean } = {};

window.addEventListener("keydown", (event) => {
  input[event.code] = true;
});
window.addEventListener("keyup", (event) => {
  input[event.code] = false;
});
