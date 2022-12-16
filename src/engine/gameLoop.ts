import { CanvasView, canvasView } from "../view/CanvasView";

import { Paddle } from "../figures/Paddle";
import { Ball } from "../figures/Ball";
import { Brick } from "../figures/Brick";

import { move } from "./move";
import { BOARD_WIDTH } from "../utils/constants";
import {
    isBallHittingTheFloor, isBallHittingTheCeiling, isBallHittingRightWall,
    isBallHittingTheLeftWall,  isBallCollidingWithBoard
} from "../utils/validators";
import { showGameOverMessage } from "../utils/helpers";
import { handleBoardHit } from "../physics/movement";
import { scorePoints } from "../app";


const input: { [code: string]: boolean } = {};

window.addEventListener("keydown", (event) => {
  input[event.code] = true;
});
window.addEventListener("keyup", (event) => {
  input[event.code] = false;
});
//todo-ball, board, bricks->gameObjects{}
export function gameLoop(ball: Ball, board: Paddle, bricks: Brick[], canvasView: CanvasView, gameOver: boolean) {
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
        showGameOverMessage(scorePoints);
    } else if (isBallHittingTheCeiling(ball)) {
        ball.velocity.y = Math.abs(ball.velocity.y);
    } else if (isBallHittingRightWall(ball, canvasView)) {
        ball.velocity.x = - ball.velocity.x;
    } else if (isBallHittingTheLeftWall(ball)) {
        ball.velocity.x = Math.abs(ball.velocity.x);
    }
}
