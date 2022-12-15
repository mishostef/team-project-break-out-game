import { Ball } from "../figures/Ball";
import { Paddle } from "../figures/Paddle";
import { CanvasView } from "../view/CanvasView";
import { BALL_DIAMETER, BRICKS_END, BRICK_WIDTH } from "./constants";


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
    return (ball.position.y < BRICKS_END);
}