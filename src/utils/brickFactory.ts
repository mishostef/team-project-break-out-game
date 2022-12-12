import { Brick } from "../figures/Brick";
import {
    BRICKS_COLS,
    BRICK_ROWS,
    INCREEMNT_DOWN_BRICK,
    INCREMENT_LEFT_BRICK,
    INITIAL_START_BRICK_LEFT,
    INITIAL_START_BRICK_RIGHT
} from "./constants";

import { Vector } from "./vector";

const bricksImage = [
    "/assets/brick-blue.png",
    "/assets/brick-green.png",
    "/assets/brick-purple.png",
    "/assets/brick-red.png",
    "/assets/brick-yellow.png"
]

export function createBricks(): Brick[] {
    let x = INITIAL_START_BRICK_LEFT;
    let y = INITIAL_START_BRICK_RIGHT;

    const bricks: Brick[] = [];

    for (let row = 0; row < BRICK_ROWS; row++) {
        for (let col = 0; col < BRICKS_COLS; col++) {
            const pos: Vector = { x, y };

            const randPos = Math.random() * bricksImage.length | 0;
            const brick = new Brick(pos, bricksImage[randPos])
            bricks.push(brick);
            x += INCREMENT_LEFT_BRICK;
        }
    
        x = INITIAL_START_BRICK_LEFT;
        y += INCREEMNT_DOWN_BRICK;
    }
    return bricks;
}