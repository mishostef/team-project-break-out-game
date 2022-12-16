import { Ball } from "../figures/Ball";
import { CanvasView } from "../view/CanvasView";
import {
  BALL_DIAMETER,
  BOARD_HEIGHT,
  BOARD_WIDTH,
  BRICKS_END
} from "./constants";

export function isBallHittingTheLeftWall(ball: Ball) {
  return ball.position.x <= 0;
}

export function isBallHittingRightWall(ball, canvasView: CanvasView) {
  return ball.position.x > canvasView.canvas.width - BALL_DIAMETER;
}

export function isBallHittingTheCeiling(ball: Ball) {
  return ball.position.y <= 0;
}

export function isBallHittingTheFloor(ball: Ball, canvasView: CanvasView) {
  return ball.position.y >= canvasView.canvas.height - BALL_DIAMETER;
}
export function isBallNearBricks(ball: Ball) {
  return ball.position.y < BRICKS_END;
}
export function isBallCollidingWithBoard(ball, board) {
  return (
    ball.position.y + BALL_DIAMETER / 2 >= board.position.y &&
    ball.position.y + BALL_DIAMETER / 2 <= board.position.y + 10 &&
    ball.position.x - BALL_DIAMETER / 2 <= board.position.x + BOARD_WIDTH &&
    ball.position.x + BALL_DIAMETER / 2 >= board.position.x
  );
}
