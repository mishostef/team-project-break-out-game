import { Vector } from "../utils/vector";
import { BRICK_ROWS, BRICK_WIDTH, BRICK_HEIGHT } from "../utils/constants";
import { createBricks } from "../utils/brickFactory";
import { Ball as b } from "../gameObjects/Ball";
import { Brick } from "../figures/Brick";
import { Ball } from "../figures/Ball";

export class CanvasView {
    private ctx: CanvasRenderingContext2D;
    public canvas: HTMLCanvasElement;

    constructor(
        public canvasSelector: string,
    ) {
        this.canvas = document.getElementById(canvasSelector) as HTMLCanvasElement;
        this.ctx = this.canvas.getContext('2d');
    }

    drawImage(position: Vector, image: HTMLImageElement, width: number, height: number) {
        this.ctx.drawImage(image, position.x, position.y, width, height);
    }

    drawBricks(bricks: Brick[]) {
        console.log(bricks);
        //  const bricks = createBricks();

        for (let r = 0; r < BRICK_ROWS; r++) {
            for (let c = 0; c < bricks.length; c++) {
                const brick = bricks[c];
                const pos: Vector = {
                    x: brick.position.x,
                    y: brick.position.y
                }
                this.drawImage(pos, brick.getImage(), BRICK_WIDTH, BRICK_HEIGHT);
            }
        }
    }

    drawBall(ball: Ball) {
        // this.ctx.beginPath()
        // this.ctx.arc(ball.position.x, ball.position.y, ball.radius, 0, 2 * Math.PI);
        // this.ctx.fillStyle = "red";
        // this.ctx.fill();
        // this.ctx.closePath();
        this.drawImage(ball.position, ball.getImage(), 40, 40);
    }
    getContext(): CanvasRenderingContext2D {
        return this.ctx;
    }
}