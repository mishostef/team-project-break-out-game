import { Ball } from "../figures/Ball";
import { Brick } from "../figures/Brick";
import { BRICK_HEIGHT, BRICK_WIDTH, BALL_DIAMETER } from "../utils/constants";
import { Vector } from "../utils/vector";

export function changeBallDirection(ball: Ball, brick: Brick) {
  const BRICK_DIAGONAL = Math.sqrt(BRICK_HEIGHT ** 2 + BRICK_WIDTH ** 2);
  const brickCenterX = brick.position.x + BRICK_WIDTH / 2;
  const brickCenterY = brick.position.y + BRICK_HEIGHT / 2;
  const ballCenterX = ball.position.x + BALL_DIAMETER / 2;
  const ballCenterY = ball.position.y + BALL_DIAMETER / 2;
  const deltaY = (BRICK_HEIGHT * BALL_DIAMETER) / 2 / BRICK_DIAGONAL;
  const deltaX = (BRICK_WIDTH * BALL_DIAMETER) / 2 / BRICK_DIAGONAL;
  const minYSideHit = brick.position.y + deltaY;
  const maxYSideHit = brick.position.y + BRICK_HEIGHT - deltaY;
  const minLeftXSideHit = brick.position.x - deltaX;
  const maxLeftXSideHit = brick.position.x + deltaX;
  const isBallComingFromButtomLeft =
    ballCenterX > minLeftXSideHit &&
    ballCenterX < maxLeftXSideHit &&
    ballCenterY > minYSideHit &&
    ballCenterY < maxYSideHit;
  const isBallComingFromButtomRight =
    ballCenterX > minLeftXSideHit + BRICK_WIDTH &&
    ballCenterX < maxLeftXSideHit + BRICK_WIDTH &&
    ballCenterY > minYSideHit &&
    ballCenterY < maxYSideHit;
  if (
    (isBallComingFromButtomLeft && ball.velocity.x > 0) ||
    (isBallComingFromButtomRight && ball.velocity.x < 0)
  ) {
    ball.velocity.x *= -1;
  } else {
    ball.velocity.y *= -1;
  }
}
