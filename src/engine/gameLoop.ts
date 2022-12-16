import { CanvasView } from "../view/CanvasView";
import { Paddle } from "../figures/Paddle";
import { Ball } from "../figures/Ball";
import { move } from "./move";
import {
    BOARD_WIDTH, BRICK_BONUS_POINTS, INITIAL_BALL_X, INITIAL_BALL_Y,
} from "../utils/constants";
import {
    isBallHittingTheFloor, isBallHittingTheCeiling, isBallHittingRightWall,
    isBallHittingTheLeftWall, isBallCollidingWithBoard, isBallNearBricks
} from "../utils/validators";
import { showGameOverMessage } from "../app";
import { changeBallDirection, handleBoardHit } from "../physics/movement";
import { Brick } from "../figures/Brick";
import { Vector } from "../Geometry/Vector";
import { getHitBrickIndex } from "../physics/misc";
import { createBricks } from "../utils/brickFactory";

const canvasView = new CanvasView("gameCanvas");

const input: { [code: string]: boolean } = {};

window.addEventListener("keydown", (event) => {
    input[event.code] = true;
});
window.addEventListener("keyup", (event) => {
    input[event.code] = false;
});

export interface GameObjects {
    ball: Ball, board: Paddle, bricks: Brick[]
}

const boardImg = document.getElementById("board") as HTMLImageElement;
export class Game {
    private ball: Ball;
    private board: Paddle;
    private bricks: Brick[];
    private scorePoints: number;
    private readonly GAME_DIFFICULTY = 3;
    private readonly STEP_SIZE = 20;
    private lastTime: number;
    private elapsed: number;
    public gameOver: boolean;
    constructor(public canvasView: CanvasView, public lives: number) {
        this.scorePoints = 0;
        this.initializeGameObjects();
    }

    private initializeGameObjects() {
        this.bricks = createBricks();
        const boardPosition = new Vector(
            canvasView.canvas.width / 2,
            canvasView.canvas.height - 100
        );
        this.board = new Paddle(boardPosition, boardImg);
        const ballPosition = new Vector(INITIAL_BALL_X, INITIAL_BALL_Y);
        this.ball = new Ball(ballPosition, "/assets/ball.png");
        this.ball.velocity = new Vector(this.GAME_DIFFICULTY, this.GAME_DIFFICULTY);
        this.lastTime = 0;
        this.elapsed = 0;
        this.gameOver = false;
    }

    gameLoop() {
        if (input['ArrowLeft'] && (this.board.position.x > 0)) {
            this.board.velocity.x = -7;
            move(this.board);
        } else if (input['ArrowRight'] && (this.board.position.x + BOARD_WIDTH < canvasView.canvas.width)) {
            this.board.velocity.x = 7;
            move(this.board);
        }
        canvasView.getContext().clearRect(0, 0, canvasView.canvas.width, canvasView.canvas.height);
        canvasView.drawBricks(this.bricks);
        canvasView.drawBoard(this.board);
        canvasView.drawBall(this.ball);
        this.collisionDetector();
        if (!this.gameOver)
            move(this.ball);
    }


    collisionDetector() {
        if (isBallCollidingWithBoard(this.ball, this.board)) {
            handleBoardHit(this.ball, this.board);
        }
        if (isBallHittingTheFloor(this.ball, this.canvasView)) {
            this.lives--;//
            this.gameOver = true;
            if (this.lives === 0) { showGameOverMessage(this.scorePoints); }
            document.getElementById("life").innerText = this.lives.toString();
        } else if (isBallHittingTheCeiling(this.ball)) {
            this.ball.velocity.y = Math.abs(this.ball.velocity.y);
        } else if (isBallHittingRightWall(this.ball, this.canvasView)) {
            this.ball.velocity.x = - this.ball.velocity.x;
        } else if (isBallHittingTheLeftWall(this.ball)) {
            this.ball.velocity.x = Math.abs(this.ball.velocity.x);
        }
    }

    startGame() {
        this.initializeGameObjects();
        this.update(performance.now());
    }

    update(time: number) {
        const delta = time - this.lastTime;
        this.lastTime = time;
        this.elapsed += delta;
        let deleteBrickIndex = isBallNearBricks(this.ball)
            ? getHitBrickIndex(this.bricks, this.ball)
            : -1;
        if (deleteBrickIndex != -1) {
            const brick = this.bricks[deleteBrickIndex];
            changeBallDirection(this.ball, brick);
            this.bricks.splice(deleteBrickIndex, 1);
            this.scorePoints += BRICK_BONUS_POINTS;
        }
        if (this.elapsed > this.STEP_SIZE * 5) {
            this.elapsed = this.STEP_SIZE * 5;
        }
        while (this.elapsed > this.STEP_SIZE) {
            this.elapsed -= this.STEP_SIZE;
            this.gameLoop();
        }
        if (this.bricks.length && !this.gameOver) {
            requestAnimationFrame(this.update.bind(this));
        }
    }
}

export function gameLoop(ball, board, bricks, canvasView, gameOver) {
    if (input['ArrowLeft'] && (board.position.x > 0)) {
        board.velocity.x = -7;
        move(board);
    } else if (input['ArrowRight'] && (board.position.x + BOARD_WIDTH < canvasView.canvas.width)) {
        board.velocity.x = 7;
        move(board);
    }
    canvasView.getContext().clearRect(0, 0, canvasView.canvas.width, canvasView.canvas.height);
    canvasView.drawBricks(bricks);
    canvasView.drawBoard(board);
    canvasView.drawBall(ball);
    collisionDetector(ball, board, gameOver);
    move(ball);
}


export function collisionDetector(ball: Ball, board: Paddle, gameOver: boolean) {
    if (isBallCollidingWithBoard(ball, board)) {
        handleBoardHit(ball, board);
    }
    if (isBallHittingTheFloor(ball, canvasView)) {
        gameOver = true;
       // showGameOverMessage(this.s);
    } else if (isBallHittingTheCeiling(ball)) {
        ball.velocity.y = Math.abs(ball.velocity.y);
    } else if (isBallHittingRightWall(ball, canvasView)) {
        ball.velocity.x = - ball.velocity.x;
    } else if (isBallHittingTheLeftWall(ball)) {
        ball.velocity.x = Math.abs(ball.velocity.x);
    }
}
