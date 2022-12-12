import { Vector } from "../utils/vector";
import { BRICK_ROWS, BRICK_WIDTH, BRICK_HEIGHT } from "../utils/constants";
import { Ball } from "../figures/Ball";
import { Brick } from "../figures/Brick";
import { Board } from "../gameObjects/Board";

export class CanvasView {
    private ctx: CanvasRenderingContext2D;
    public canvas: HTMLCanvasElement;

    constructor(
        public canvasSelector: string,
    ) {
        this.canvas = document.getElementById(canvasSelector) as HTMLCanvasElement;
        this.canvas.style.display = 'block';
        this.ctx = this.canvas.getContext('2d');
    }

    drawImage(position: Vector, image: HTMLImageElement, width: number, height: number) {
        this.ctx.drawImage(image, position.x, position.y, width, height);
    }

    drawBricks(bricks: Brick[]) {
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
        this.drawImage(ball.position, ball.getImage(), 40, 40);
    }

    drawBoard(board: Board) {
        this.ctx.beginPath();
        this.ctx.drawImage(board.image, board.position.x, board.position.y, 100, 20);
        this.ctx.closePath();
    }

    getContext(): CanvasRenderingContext2D {
        return this.ctx;
    }
}