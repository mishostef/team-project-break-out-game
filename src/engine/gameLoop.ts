import { CanvasView } from "../view/CanvasView";
import { Paddle } from "../figures/Paddle";
import { Ball } from "../figures/Ball";
import { move } from "./move";
import {
  BOARD_WIDTH,
} from "../utils/constants";
import {
    isBallHittingTheFloor, isBallHittingTheCeiling, isBallHittingRightWall,
    isBallHittingTheLeftWall,  isBallCollidingWithBoard
} from "../utils/validators";
import { showGameOverMessage } from "../app";
import { handleBoardHit } from "../physics/movement";

const canvasView = new CanvasView("gameCanvas");

const input: { [code: string]: boolean } = {};

window.addEventListener("keydown", (event) => {
  input[event.code] = true;
});
window.addEventListener("keyup", (event) => {
  input[event.code] = false;
});
//todo-ball, board, bricks->gameObjects{}
export function gameLoop(ball, board, bricks, canvasView, gameOver) {
    if (input['ArrowLeft'] && (board.position.x > 0)) {
        board.velocity.x = -7;
        move(board, board.velocity);
    } else if (input['ArrowRight'] && (board.position.x + BOARD_WIDTH < canvasView.canvas.width)) {
        board.velocity.x = 7;
        move(board, board.velocity);
    }
    canvasView.getContext().clearRect(0, 0, canvasView.canvas.width, canvasView.canvas.height);
    canvasView.drawBricks(bricks);
    canvasView.drawBoard(board);
    canvasView.drawBall(ball);
    collisionDetector(ball, board, gameOver);
    move(ball, ball.velocity);
}


export function collisionDetector(ball: Ball, board: Paddle, gameOver: boolean) {
    if (isBallCollidingWithBoard(ball, board)) {
        handleBoardHit(ball, board);
    }
    if (isBallHittingTheFloor(ball, canvasView)) {
        gameOver = true;
        showGameOverMessage();
    } else if (isBallHittingTheCeiling(ball)) {
        ball.velocity.y = Math.abs(ball.velocity.y);
    } else if (isBallHittingRightWall(ball, canvasView)) {
        ball.velocity.x = - ball.velocity.x;
    } else if (isBallHittingTheLeftWall(ball)) {
        ball.velocity.x = Math.abs(ball.velocity.x);
    }
}
