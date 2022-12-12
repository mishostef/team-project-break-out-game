import { Vector } from "../utils/vector";
import { BRICK_ROWS, BRICK_WIDTH, BRICK_HEIGHT } from "../utils/constants";
import { createBricks } from "../utils/brickFactory";
import { Ball as b } from "../gameObjects/Ball";

export class CanvasView {
    private ctx: CanvasRenderingContext2D;
    public canvas: HTMLCanvasElement;

    constructor(
        public canvasSelector: string,
    ) {
        this.canvas = document.getElementById(canvasSelector) as HTMLCanvasElement;
        this.ctx = this.canvas.getContext('2d');
    }

    drawImage(position: Vector, source: string, width: number, height: number) {
        const image = new Image();
        image.src = source;

        image.onload = () => {
            this.ctx.drawImage(image, position.x, position.y, width, height);
        };
    }

    drawBricks() {
        const bricks = createBricks();

        for (let r = 0; r < BRICK_ROWS; r++) {
            for (let c = 0; c < bricks.length; c++) {
                const brick = bricks[c];
                const pos: Vector = {
                    x: brick.position.x,
                    y: brick.position.y
                }
                const binded =this.drawImage.bind(this);
                this.drawImage(pos, brick.getImage(), BRICK_WIDTH, BRICK_HEIGHT);
            }
        }
    }  

    drawBall(ball: b) {
        this.ctx.beginPath()
        this.ctx.arc(ball.position.x, ball.position.y, ball.radius, 0, 2 * Math.PI);
        this.ctx.fillStyle = "red";
        this.ctx.fill();
        this.ctx.closePath();
    }
    getContext(): CanvasRenderingContext2D {
        return this.ctx;
    }
}