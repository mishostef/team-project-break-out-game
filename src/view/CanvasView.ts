import { Vector } from "../utils/vector";
import {
  BRICK_ROWS,
  BRICK_WIDTH,
  BRICK_HEIGHT,
  BOARD_WIDTH,
  BOARD_HEIGHT,
  BALL_DIAMETER,
} from "../utils/constants";
import { Ball } from "../figures/Ball";
import { Brick } from "../figures/Brick";
import { Paddle } from "../figures/Paddle";

export class CanvasView {
  private ctx: CanvasRenderingContext2D;
  public canvas: HTMLCanvasElement;

  constructor(public canvasSelector: string) {
    this.canvas = document.getElementById(canvasSelector) as HTMLCanvasElement;
    this.ctx = this.canvas.getContext("2d");
  }

  drawImage(
    position: Vector,
    image: HTMLImageElement,
    width: number,
    height: number
  ) {
    this.ctx.drawImage(image, position.x, position.y, width, height);
  }

  drawBricks(bricks: Brick[]) {
    for (let r = 0; r < BRICK_ROWS; r++) {
      for (let c = 0; c < bricks.length; c++) {
        const brick = bricks[c];
        const pos: Vector = {
          x: brick.position.x,
          y: brick.position.y,
        };
        this.drawImage(pos, brick.getImage(), BRICK_WIDTH, BRICK_HEIGHT);
      }
    }
  }

  drawBall(ball: Ball) {
    this.drawImage(
      { x: ball.position.x - BALL_DIAMETER / 2, y: ball.position.y - BALL_DIAMETER / 2 },
      ball.getImage(),
      BALL_DIAMETER,
      BALL_DIAMETER
    );
  }

  drawBoard(board: Paddle) {
    this.ctx.beginPath();
    this.ctx.drawImage(
      board.getImage(),
      board.position.x,
      board.position.y,
      BOARD_WIDTH,
      BOARD_HEIGHT
    );
    this.ctx.closePath();
  }

  getContext(): CanvasRenderingContext2D {
    return this.ctx;
  }
}

export const canvasView = new CanvasView("gameCanvas");