import { CanvasView, canvasView } from "../view/canvasView";
import { Paddle } from "../figures/paddle";
import { Ball } from "../figures/ball";
import { Brick } from "../figures/brick";
import { move } from "./move";
import {
    BOARD_WIDTH, BRICK_BONUS_POINTS, BRICK_HEIGHT, BRICK_WIDTH, INITIAL_BALL_X, INITIAL_BALL_Y,
} from "../utils/constants";
import {
    isBallHittingTheFloor, isBallHittingTheCeiling, isBallHittingRightWall,
    isBallHittingTheLeftWall, isBallCollidingWithBoard, isBallNearBricks
} from "../utils/validators";
import { setGameLevel, showGameOverMessage } from "../utils/helpers";
import { changeBallDirection, handleBoardHit } from "../physics/movement";
import { Vector } from "../geometry/vector";
import { getHitBrickIndex } from "../physics/misc";
import { createBricks } from "../utils/brickFactory";
import { createParticles, explode } from "../effects/explosion";
import { DOMView } from "../view/DOMView";


const input: { [code: string]: boolean } = {};
let particles = [];

export interface GameObjects {
    ball: Ball, board: Paddle, bricks: Brick[]
}

export class Game {
    private ball: Ball;
    private board: Paddle;
    private bricks: Brick[];
    public scorePoints: number;
    public GAME_DIFFICULTY = 3;
    private readonly STEP_SIZE = 20;
    private lastTime: number;
    private elapsed: number;
    public gameOver: boolean;
    private dom = DOMView.getInstance();
    private isMouseActive = true;
    private maxLives = 3;


    constructor(public canvasView: CanvasView, public lives: number) {
        this.scorePoints = 0;
        this.maxLives = lives;
        this.initializeGameObjects();
        this.addHandlers();
    }

    private addHandlers() {
        this.dom.addHandler("keydown", (event: KeyboardEvent) => {
            input[event.code] = true;
        });
        this.dom.addHandler("keyup", (event: KeyboardEvent) => {
            input[event.code] = false;
        });
        this.dom.addHandler("mousemove", (e: MouseEvent) => {
            if (this.isMouseActive) {
                const positionInfo = canvasView.canvas.getBoundingClientRect();
                const width = positionInfo.width;
                let mouseX = e.offsetX;
                if (mouseX < canvasView.canvas.offsetLeft) {
                    mouseX = 0;
                } else if (mouseX > width) {
                    mouseX = canvasView.canvas.width - BOARD_WIDTH;
                }
                this.board.position.x = mouseX;
            }
        });
        this.dom.addRightClickHandler((e) => {
            e.preventDefault();
            this.isMouseActive = false;
        });
        this.dom.addHandler("click", (e) => {
            const input = (e.target as HTMLInputElement);
            this.GAME_DIFFICULTY = setGameLevel(input);
        }, "#level");
    }

    private initializeGameObjects() {
        if (this.bricks == undefined || this.bricks && this.bricks.length == 0 && this.lives > 0) {
            this.bricks = createBricks();
        }
        const boardPosition = new Vector(
            canvasView.canvas.width / 2,
            canvasView.canvas.height - 100
        );
        this.board = new Paddle(boardPosition, this.dom.getBoardImage());
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
        explode(particles);
        this.collisionDetector();
        if (!this.gameOver) {
            move(this.ball);
        }

    }
    collisionDetector() {
        if (isBallCollidingWithBoard(this.ball, this.board)) {
            handleBoardHit(this.ball, this.board);
        }
        if (isBallHittingTheFloor(this.ball, this.canvasView)) {
            this.lives--;
            this.gameOver = true;
            if (this.lives === 0) {
                showGameOverMessage(this.scorePoints);
                this.initScreenAndSettings();

            }
            this.dom.setLives(this.lives);
        } else if (isBallHittingTheCeiling(this.ball)) {
            this.ball.velocity.y = Math.abs(this.ball.velocity.y);
        } else if (isBallHittingRightWall(this.ball, this.canvasView)) {
            this.ball.velocity.x = - this.ball.velocity.x;
        } else if (isBallHittingTheLeftWall(this.ball)) {
            this.ball.velocity.x = Math.abs(this.ball.velocity.x);
        }

    }

    initScreenAndSettings() {
        setTimeout(() => {
            this.dom.showInitialScreen();
            this.lives = this.maxLives;
            this.bricks = createBricks();
            this.scorePoints = 0;
            this.dom.hideNewGameButton();
        }, 1500);
    }
    //
    startGame() {
        if (this.lives > 1) {
            this.dom.showNewGameButton();
            this.dom.hideCongratulations();
        } else {
            this.dom.hideNewGameButton();
        }
        this.dom.setScore(this.scorePoints);
        this.dom.setLives(this.lives);
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
            particles = createParticles(brick);
            changeBallDirection(this.ball, brick);
            this.bricks.splice(deleteBrickIndex, 1);
            this.scorePoints += BRICK_BONUS_POINTS;
            this.dom.setScore(this.scorePoints);
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
        } else if (this.bricks.length === 0) {
            this.dom.showCongratulations();
            this.initScreenAndSettings();
            setTimeout(() => {
                this.dom.hideCongratulations();
            }, 1500);
        }
    }
}