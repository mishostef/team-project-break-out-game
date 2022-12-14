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


const canvasView = new CanvasView("gameCanvas");
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

