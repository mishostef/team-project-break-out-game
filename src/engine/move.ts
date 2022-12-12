import { Vector } from "../utils/vector";

export function moveBall(ball, velocity: Vector) {
    ball.position.x += velocity.x;
    ball.position.y += velocity.y;
}

export function moveBoard(board, velocity: Vector) {

}