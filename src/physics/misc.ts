import { BALL_DIAMETER, BRICK_WIDTH, BRICK_HEIGHT } from "../utils/constants";

export function getHitBrickIndex(bricks, ball) {
  return bricks.findIndex((brick) => {
    const left = brick.position.x - BALL_DIAMETER / 2;
    const right = brick.position.x + BRICK_WIDTH + BALL_DIAMETER / 2;
    const top = brick.position.y - BALL_DIAMETER / 2;
    const bottom = brick.position.y + BRICK_HEIGHT + BALL_DIAMETER / 2;
    return (
      ball.position.x >= left &&
      ball.position.x <= right &&
      ball.position.y >= top &&
      ball.position.y <= bottom
    );
  });
}