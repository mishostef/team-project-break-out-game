/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Geometry/Vector.ts":
/*!********************************!*\
  !*** ./src/Geometry/Vector.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Vector": () => (/* binding */ Vector)
/* harmony export */ });
class Vector {
    x;
    y;
    constructor(xOrPoint, y) {
        if (typeof xOrPoint == "number" && typeof y == "number") {
            this.x = xOrPoint;
            this.y = y;
        }
        else if (typeof xOrPoint == "object") {
            this.x = xOrPoint.x;
            this.y = xOrPoint.y;
        }
    }
    add(p) {
        this.x += p.x;
        this.y += p.y;
        return this;
    }
    scale(s) {
        this.x *= s;
        this.y *= s;
        return this;
    }
    dist(p) {
        const dx = this.x - p.x;
        const dy = this.y - p.y;
        return Math.sqrt(dx ** 2 + dy ** 2);
    }
    sqLength() {
        return this.x ** 2 + this.y ** 2;
    }
    static add(p1, p2) {
        return new Vector(p1.x + p2.x, p1.y + p2.y);
    }
}


/***/ }),

/***/ "./src/app.ts":
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "scorePoints": () => (/* binding */ scorePoints),
/* harmony export */   "showGameOverMessage": () => (/* binding */ showGameOverMessage)
/* harmony export */ });
/* harmony import */ var _figures_Ball__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./figures/Ball */ "./src/figures/Ball.ts");
/* harmony import */ var _figures_Paddle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./figures/Paddle */ "./src/figures/Paddle.ts");
/* harmony import */ var _Geometry_Vector__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Geometry/Vector */ "./src/Geometry/Vector.ts");
/* harmony import */ var _utils_brickFactory__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/brickFactory */ "./src/utils/brickFactory.ts");
/* harmony import */ var _utils_constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/constants */ "./src/utils/constants.ts");
/* harmony import */ var _view_CanvasView__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./view/CanvasView */ "./src/view/CanvasView.ts");
/* harmony import */ var _engine_gameLoop__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./engine/gameLoop */ "./src/engine/gameLoop.ts");
/* harmony import */ var _view_DOMView__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./view/DOMView */ "./src/view/DOMView.ts");
/* harmony import */ var _utils_helpers__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./utils/helpers */ "./src/utils/helpers.ts");







const canvasView = new _view_CanvasView__WEBPACK_IMPORTED_MODULE_5__.CanvasView("gameCanvas");
const gameoverDiv = document.getElementById("gameOver");
//const STEP_SIZE = 20;


const dom = _view_DOMView__WEBPACK_IMPORTED_MODULE_7__.DOMView.getInstance();
const boardImg = dom.getElement("#board");
let lastTime = 0;
let elapsed = 0;
let GAME_DIFFICULTY = _utils_constants__WEBPACK_IMPORTED_MODULE_4__.EASY_LEVEl;
const boardPosition = new _Geometry_Vector__WEBPACK_IMPORTED_MODULE_2__.Vector(canvasView.canvas.width / 2, canvasView.canvas.height - 100);
let bricks = (0,_utils_brickFactory__WEBPACK_IMPORTED_MODULE_3__.createBricks)();
let boardVelocity = new _Geometry_Vector__WEBPACK_IMPORTED_MODULE_2__.Vector(0, 0);
let board = new _figures_Paddle__WEBPACK_IMPORTED_MODULE_1__.Paddle(boardPosition, boardImg, boardVelocity);
const ballPosition = new _Geometry_Vector__WEBPACK_IMPORTED_MODULE_2__.Vector(_utils_constants__WEBPACK_IMPORTED_MODULE_4__.INITIAL_BALL_X, _utils_constants__WEBPACK_IMPORTED_MODULE_4__.INITIAL_BALL_Y);
let ballVelocity = new _Geometry_Vector__WEBPACK_IMPORTED_MODULE_2__.Vector(GAME_DIFFICULTY, GAME_DIFFICULTY);
let ball = new _figures_Ball__WEBPACK_IMPORTED_MODULE_0__.Ball(ballPosition, "/assets/ball.png", ballVelocity);
const input = {};
let gameOver = false;
let scorePoints = 0;
let isMouseActive = true;
let lives = 3;
const gameObjects = { ball, board, bricks };
let game = new _engine_gameLoop__WEBPACK_IMPORTED_MODULE_6__.Game(canvasView, lives);
window.addEventListener("keydown", (event) => {
    input[event.code] = true;
});
window.addEventListener("keyup", (event) => {
    input[event.code] = false;
});
dom.addHandler("mousemove", (e) => {
    if (isMouseActive)
        board.position.x = e.clientX;
});
window.oncontextmenu = (e) => {
    e.preventDefault();
    console.log("right clicked");
    isMouseActive = false;
};
const playBtn = document.getElementById("play-btn");
let isPlayMusic = false;
document.getElementById("new-game").addEventListener("click", (e) => {
    if (game.lives <= 1) {
        e.target.style.display = "none";
    }
    game.startGame();
    gameoverDiv.style.display = "none";
});
playBtn.addEventListener("click", () => {
    dom.getElement("#container").style.display = "none";
    dom.getElement("#gameCanvas").style.display = "block";
    const detailsBox = dom.getElement("#details-box");
    detailsBox.style.display = "flex";
    detailsBox.style.justifyContent = "space-around";
    game.startGame();
    if (isPlayMusic) {
        const music = new Audio("../assets/music.mp3");
        music.volume = 0.1;
        music.play();
    }
});
dom.getElement("#setting-btn").addEventListener("click", () => {
    const settingsContainer = dom.getElement("#settings-container");
    const container = dom.getElement("#container");
    settingsContainer.style.display = "block";
    container.style.display = "none";
    dom.getElement("#back-btn").addEventListener("click", () => {
        settingsContainer.style.display = "none";
        container.style.display = "block";
    });
    dom.getElement("#play-sound-btn").addEventListener("click", () => {
        isPlayMusic = true;
        dom.getElement(".gg-check").style.display =
            "block";
    });
});
dom.getElement("#level").addEventListener("click", (e) => {
    const input = e.target;
    GAME_DIFFICULTY = (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_8__.setGameLevel)(input);
});
function showGameOverMessage(scorePoints) {
    gameoverDiv.style.display = "block";
    gameoverDiv.innerText = `Game over, score:${scorePoints}`;
}


/***/ }),

/***/ "./src/engine/gameLoop.ts":
/*!********************************!*\
  !*** ./src/engine/gameLoop.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Game": () => (/* binding */ Game),
/* harmony export */   "collisionDetector": () => (/* binding */ collisionDetector),
/* harmony export */   "gameLoop": () => (/* binding */ gameLoop)
/* harmony export */ });
/* harmony import */ var _view_CanvasView__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../view/CanvasView */ "./src/view/CanvasView.ts");
/* harmony import */ var _figures_Paddle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../figures/Paddle */ "./src/figures/Paddle.ts");
/* harmony import */ var _figures_Ball__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../figures/Ball */ "./src/figures/Ball.ts");
/* harmony import */ var _move__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./move */ "./src/engine/move.ts");
/* harmony import */ var _utils_constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/constants */ "./src/utils/constants.ts");
/* harmony import */ var _utils_validators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/validators */ "./src/utils/validators.ts");
/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../app */ "./src/app.ts");
/* harmony import */ var _physics_movement__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../physics/movement */ "./src/physics/movement.ts");
/* harmony import */ var _Geometry_Vector__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../Geometry/Vector */ "./src/Geometry/Vector.ts");
/* harmony import */ var _physics_misc__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../physics/misc */ "./src/physics/misc.ts");
/* harmony import */ var _utils_brickFactory__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../utils/brickFactory */ "./src/utils/brickFactory.ts");











const input = {};
window.addEventListener("keydown", (event) => {
    input[event.code] = true;
});
window.addEventListener("keyup", (event) => {
    input[event.code] = false;
});
const boardImg = document.getElementById("board");
class Game {
    canvasView;
    lives;
    ball;
    board;
    bricks;
    scorePoints;
    GAME_DIFFICULTY = 3;
    STEP_SIZE = 20;
    lastTime;
    elapsed;
    gameOver;
    constructor(canvasView, lives) {
        this.canvasView = canvasView;
        this.lives = lives;
        this.scorePoints = 0;
        this.initializeGameObjects();
    }
    initializeGameObjects() {
        this.bricks = (0,_utils_brickFactory__WEBPACK_IMPORTED_MODULE_10__.createBricks)();
        const boardPosition = new _Geometry_Vector__WEBPACK_IMPORTED_MODULE_8__.Vector(_view_CanvasView__WEBPACK_IMPORTED_MODULE_0__.canvasView.canvas.width / 2, _view_CanvasView__WEBPACK_IMPORTED_MODULE_0__.canvasView.canvas.height - 100);
        this.board = new _figures_Paddle__WEBPACK_IMPORTED_MODULE_1__.Paddle(boardPosition, boardImg);
        const ballPosition = new _Geometry_Vector__WEBPACK_IMPORTED_MODULE_8__.Vector(_utils_constants__WEBPACK_IMPORTED_MODULE_4__.INITIAL_BALL_X, _utils_constants__WEBPACK_IMPORTED_MODULE_4__.INITIAL_BALL_Y);
        this.ball = new _figures_Ball__WEBPACK_IMPORTED_MODULE_2__.Ball(ballPosition, "/assets/ball.png");
        this.ball.velocity = new _Geometry_Vector__WEBPACK_IMPORTED_MODULE_8__.Vector(this.GAME_DIFFICULTY, this.GAME_DIFFICULTY);
        this.lastTime = 0;
        this.elapsed = 0;
        this.gameOver = false;
    }
    gameLoop() {
        if (input['ArrowLeft'] && (this.board.position.x > 0)) {
            this.board.velocity.x = -7;
            (0,_move__WEBPACK_IMPORTED_MODULE_3__.move)(this.board);
        }
        else if (input['ArrowRight'] && (this.board.position.x + _utils_constants__WEBPACK_IMPORTED_MODULE_4__.BOARD_WIDTH < _view_CanvasView__WEBPACK_IMPORTED_MODULE_0__.canvasView.canvas.width)) {
            this.board.velocity.x = 7;
            (0,_move__WEBPACK_IMPORTED_MODULE_3__.move)(this.board);
        }
        _view_CanvasView__WEBPACK_IMPORTED_MODULE_0__.canvasView.getContext().clearRect(0, 0, _view_CanvasView__WEBPACK_IMPORTED_MODULE_0__.canvasView.canvas.width, _view_CanvasView__WEBPACK_IMPORTED_MODULE_0__.canvasView.canvas.height);
        _view_CanvasView__WEBPACK_IMPORTED_MODULE_0__.canvasView.drawBricks(this.bricks);
        _view_CanvasView__WEBPACK_IMPORTED_MODULE_0__.canvasView.drawBoard(this.board);
        _view_CanvasView__WEBPACK_IMPORTED_MODULE_0__.canvasView.drawBall(this.ball);
        this.collisionDetector();
        if (!this.gameOver)
            (0,_move__WEBPACK_IMPORTED_MODULE_3__.move)(this.ball);
    }
    collisionDetector() {
        if ((0,_utils_validators__WEBPACK_IMPORTED_MODULE_5__.isBallCollidingWithBoard)(this.ball, this.board)) {
            (0,_physics_movement__WEBPACK_IMPORTED_MODULE_7__.handleBoardHit)(this.ball, this.board);
        }
        if ((0,_utils_validators__WEBPACK_IMPORTED_MODULE_5__.isBallHittingTheFloor)(this.ball, this.canvasView)) {
            this.lives--; //
            this.gameOver = true;
            if (this.lives === 0) {
                (0,_app__WEBPACK_IMPORTED_MODULE_6__.showGameOverMessage)(this.scorePoints);
            }
            document.getElementById("life").innerText = this.lives.toString();
        }
        else if ((0,_utils_validators__WEBPACK_IMPORTED_MODULE_5__.isBallHittingTheCeiling)(this.ball)) {
            this.ball.velocity.y = Math.abs(this.ball.velocity.y);
        }
        else if ((0,_utils_validators__WEBPACK_IMPORTED_MODULE_5__.isBallHittingRightWall)(this.ball, this.canvasView)) {
            this.ball.velocity.x = -this.ball.velocity.x;
        }
        else if ((0,_utils_validators__WEBPACK_IMPORTED_MODULE_5__.isBallHittingTheLeftWall)(this.ball)) {
            this.ball.velocity.x = Math.abs(this.ball.velocity.x);
        }
    }
    startGame() {
        this.initializeGameObjects();
        this.update(performance.now());
    }
    update(time) {
        const delta = time - this.lastTime;
        this.lastTime = time;
        this.elapsed += delta;
        let deleteBrickIndex = (0,_utils_validators__WEBPACK_IMPORTED_MODULE_5__.isBallNearBricks)(this.ball)
            ? (0,_physics_misc__WEBPACK_IMPORTED_MODULE_9__.getHitBrickIndex)(this.bricks, this.ball)
            : -1;
        if (deleteBrickIndex != -1) {
            const brick = this.bricks[deleteBrickIndex];
            (0,_physics_movement__WEBPACK_IMPORTED_MODULE_7__.changeBallDirection)(this.ball, brick);
            this.bricks.splice(deleteBrickIndex, 1);
            this.scorePoints += _utils_constants__WEBPACK_IMPORTED_MODULE_4__.BRICK_BONUS_POINTS;
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
function gameLoop(ball, board, bricks, canvasView, gameOver) {
    if (input['ArrowLeft'] && (board.position.x > 0)) {
        board.velocity.x = -7;
        (0,_move__WEBPACK_IMPORTED_MODULE_3__.move)(board);
    }
    else if (input['ArrowRight'] && (board.position.x + _utils_constants__WEBPACK_IMPORTED_MODULE_4__.BOARD_WIDTH < canvasView.canvas.width)) {
        board.velocity.x = 7;
        (0,_move__WEBPACK_IMPORTED_MODULE_3__.move)(board);
    }
    canvasView.getContext().clearRect(0, 0, canvasView.canvas.width, canvasView.canvas.height);
    canvasView.drawBricks(bricks);
    canvasView.drawBoard(board);
    canvasView.drawBall(ball);
    collisionDetector(ball, board, gameOver);
    (0,_move__WEBPACK_IMPORTED_MODULE_3__.move)(ball);
}
function collisionDetector(ball, board, gameOver) {
    if ((0,_utils_validators__WEBPACK_IMPORTED_MODULE_5__.isBallCollidingWithBoard)(ball, board)) {
        (0,_physics_movement__WEBPACK_IMPORTED_MODULE_7__.handleBoardHit)(ball, board);
    }
    if ((0,_utils_validators__WEBPACK_IMPORTED_MODULE_5__.isBallHittingTheFloor)(ball, _view_CanvasView__WEBPACK_IMPORTED_MODULE_0__.canvasView)) {
        gameOver = true;
        // showGameOverMessage(this.s);
    }
    else if ((0,_utils_validators__WEBPACK_IMPORTED_MODULE_5__.isBallHittingTheCeiling)(ball)) {
        ball.velocity.y = Math.abs(ball.velocity.y);
    }
    else if ((0,_utils_validators__WEBPACK_IMPORTED_MODULE_5__.isBallHittingRightWall)(ball, _view_CanvasView__WEBPACK_IMPORTED_MODULE_0__.canvasView)) {
        ball.velocity.x = -ball.velocity.x;
    }
    else if ((0,_utils_validators__WEBPACK_IMPORTED_MODULE_5__.isBallHittingTheLeftWall)(ball)) {
        ball.velocity.x = Math.abs(ball.velocity.x);
    }
}


/***/ }),

/***/ "./src/engine/move.ts":
/*!****************************!*\
  !*** ./src/engine/move.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "move": () => (/* binding */ move)
/* harmony export */ });
function move(gameObject) {
    gameObject.position.x += gameObject.velocity.x;
    gameObject.position.y += gameObject.velocity.y;
}


/***/ }),

/***/ "./src/figures/Ball.ts":
/*!*****************************!*\
  !*** ./src/figures/Ball.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Ball": () => (/* binding */ Ball)
/* harmony export */ });
/* harmony import */ var _Geometry_Vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Geometry/Vector */ "./src/Geometry/Vector.ts");

class Ball {
    position;
    image = new Image();
    velocity = new _Geometry_Vector__WEBPACK_IMPORTED_MODULE_0__.Vector(0, 0);
    constructor(position, image, ballvelocity) {
        this.position = position;
        this.image.src = image;
        if (!!ballvelocity)
            this.velocity = ballvelocity;
    }
    getImage() {
        return this.image;
    }
}


/***/ }),

/***/ "./src/figures/Brick.ts":
/*!******************************!*\
  !*** ./src/figures/Brick.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Brick": () => (/* binding */ Brick)
/* harmony export */ });
class Brick {
    position;
    image = new Image();
    constructor(position, image) {
        this.position = position;
        this.image.src = image;
    }
    getImage() {
        return this.image;
    }
}


/***/ }),

/***/ "./src/figures/Paddle.ts":
/*!*******************************!*\
  !*** ./src/figures/Paddle.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Paddle": () => (/* binding */ Paddle)
/* harmony export */ });
/* harmony import */ var _Geometry_Vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Geometry/Vector */ "./src/Geometry/Vector.ts");

class Paddle {
    position;
    image = new Image();
    velocity = new _Geometry_Vector__WEBPACK_IMPORTED_MODULE_0__.Vector(0, 0);
    constructor(position, image, boardvelocity) {
        this.position = position;
        this.image = image;
        if (!!boardvelocity)
            this.velocity = boardvelocity;
    }
    getImage() {
        return this.image;
    }
}


/***/ }),

/***/ "./src/physics/misc.ts":
/*!*****************************!*\
  !*** ./src/physics/misc.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getHitBrickIndex": () => (/* binding */ getHitBrickIndex)
/* harmony export */ });
/* harmony import */ var _utils_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/constants */ "./src/utils/constants.ts");

function getHitBrickIndex(bricks, ball) {
    return bricks.findIndex((brick) => {
        const left = brick.position.x - _utils_constants__WEBPACK_IMPORTED_MODULE_0__.BALL_DIAMETER / 2;
        const right = brick.position.x + _utils_constants__WEBPACK_IMPORTED_MODULE_0__.BRICK_WIDTH + _utils_constants__WEBPACK_IMPORTED_MODULE_0__.BALL_DIAMETER / 2;
        const top = brick.position.y - _utils_constants__WEBPACK_IMPORTED_MODULE_0__.BALL_DIAMETER / 2;
        const bottom = brick.position.y + _utils_constants__WEBPACK_IMPORTED_MODULE_0__.BRICK_HEIGHT + _utils_constants__WEBPACK_IMPORTED_MODULE_0__.BALL_DIAMETER / 2;
        return (ball.position.x >= left &&
            ball.position.x <= right &&
            ball.position.y >= top &&
            ball.position.y <= bottom);
    });
}


/***/ }),

/***/ "./src/physics/movement.ts":
/*!*********************************!*\
  !*** ./src/physics/movement.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "changeBallDirection": () => (/* binding */ changeBallDirection),
/* harmony export */   "handleBoardHit": () => (/* binding */ handleBoardHit)
/* harmony export */ });
/* harmony import */ var _utils_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/constants */ "./src/utils/constants.ts");

function changeBallDirection(ball, brick) {
    const BRICK_DIAGONAL = Math.sqrt(_utils_constants__WEBPACK_IMPORTED_MODULE_0__.BRICK_HEIGHT ** 2 + _utils_constants__WEBPACK_IMPORTED_MODULE_0__.BRICK_WIDTH ** 2);
    const brickCenterX = brick.position.x + _utils_constants__WEBPACK_IMPORTED_MODULE_0__.BRICK_WIDTH / 2;
    const brickCenterY = brick.position.y + _utils_constants__WEBPACK_IMPORTED_MODULE_0__.BRICK_HEIGHT / 2;
    const ballCenterX = ball.position.x + _utils_constants__WEBPACK_IMPORTED_MODULE_0__.BALL_DIAMETER / 2;
    const ballCenterY = ball.position.y + _utils_constants__WEBPACK_IMPORTED_MODULE_0__.BALL_DIAMETER / 2;
    const deltaY = (_utils_constants__WEBPACK_IMPORTED_MODULE_0__.BRICK_HEIGHT * _utils_constants__WEBPACK_IMPORTED_MODULE_0__.BALL_DIAMETER / 2) / BRICK_DIAGONAL;
    const deltaX = (_utils_constants__WEBPACK_IMPORTED_MODULE_0__.BRICK_WIDTH * _utils_constants__WEBPACK_IMPORTED_MODULE_0__.BALL_DIAMETER / 2) / BRICK_DIAGONAL;
    const minYSideHit = brick.position.y + deltaY;
    const maxYSideHit = brick.position.y + _utils_constants__WEBPACK_IMPORTED_MODULE_0__.BRICK_HEIGHT - deltaY;
    const minLeftXSideHit = brick.position.x - deltaX;
    const maxLeftXSideHit = brick.position.x + deltaX;
    const isBallComingFromButtomLeft = ((ballCenterX > minLeftXSideHit)
        && (ballCenterX < maxLeftXSideHit)
        && (ballCenterY > minYSideHit)
        && (ballCenterY < maxYSideHit));
    const isBallComingFromButtomRight = ((ballCenterX > minLeftXSideHit + _utils_constants__WEBPACK_IMPORTED_MODULE_0__.BRICK_WIDTH)
        && (ballCenterX < maxLeftXSideHit + _utils_constants__WEBPACK_IMPORTED_MODULE_0__.BRICK_WIDTH)
        && (ballCenterY > minYSideHit)
        && (ballCenterY < maxYSideHit));
    if ((isBallComingFromButtomLeft && ball.velocity.x > 0) || (isBallComingFromButtomRight && ball.velocity.x < 0)) {
        ball.velocity.x *= -1;
    }
    else {
        ball.velocity.y *= -1;
    }
}
function handleBoardHit(ball, board) {
    const currentAngle = Math.atan2(-ball.velocity.y, ball.velocity.x);
    const deltaCenterX = (ball.position.x - (board.position.x + _utils_constants__WEBPACK_IMPORTED_MODULE_0__.BOARD_WIDTH / 2)) / (_utils_constants__WEBPACK_IMPORTED_MODULE_0__.BOARD_WIDTH / 2);
    const angleToAdd = Math.PI / 5;
    let nextAngle = deltaCenterX * angleToAdd + currentAngle;
    const yOffset = 5;
    if (nextAngle < -5 * Math.PI / 6) {
        nextAngle = -5 * Math.PI / 6;
    }
    if (nextAngle > -Math.PI / 6) {
        nextAngle = -Math.PI / 6;
    }
    ball.velocity.x = 5 * Math.cos(nextAngle);
    ball.velocity.y = 5 * Math.sin(nextAngle);
    ball.position.y = board.position.y - _utils_constants__WEBPACK_IMPORTED_MODULE_0__.BALL_DIAMETER / 2 - yOffset;
}


/***/ }),

/***/ "./src/utils/brickFactory.ts":
/*!***********************************!*\
  !*** ./src/utils/brickFactory.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createBricks": () => (/* binding */ createBricks)
/* harmony export */ });
/* harmony import */ var _figures_Brick__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../figures/Brick */ "./src/figures/Brick.ts");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants */ "./src/utils/constants.ts");


const bricksImage = [
    "/assets/brick-blue.png",
    "/assets/brick-green.png",
    "/assets/brick-purple.png",
    "/assets/brick-red.png",
    "/assets/brick-yellow.png",
];
function createBricks() {
    let x = _constants__WEBPACK_IMPORTED_MODULE_1__.INITIAL_START_BRICK_LEFT;
    let y = _constants__WEBPACK_IMPORTED_MODULE_1__.INITIAL_START_BRICK_RIGHT;
    const bricks = [];
    for (let row = 0; row < _constants__WEBPACK_IMPORTED_MODULE_1__.BRICK_ROWS; row++) {
        for (let col = 0; col < _constants__WEBPACK_IMPORTED_MODULE_1__.BRICKS_COLS; col++) {
            const pos = { x, y };
            const randPos = (Math.random() * bricksImage.length) | 0;
            const brick = new _figures_Brick__WEBPACK_IMPORTED_MODULE_0__.Brick(pos, bricksImage[randPos]);
            bricks.push(brick);
            x += _constants__WEBPACK_IMPORTED_MODULE_1__.INCREMENT_LEFT_BRICK;
        }
        x = _constants__WEBPACK_IMPORTED_MODULE_1__.INITIAL_START_BRICK_LEFT;
        y += _constants__WEBPACK_IMPORTED_MODULE_1__.INCREEMNT_DOWN_BRICK;
    }
    return bricks;
}


/***/ }),

/***/ "./src/utils/constants.ts":
/*!********************************!*\
  !*** ./src/utils/constants.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BALL_DIAMETER": () => (/* binding */ BALL_DIAMETER),
/* harmony export */   "BALL_HEIGHT": () => (/* binding */ BALL_HEIGHT),
/* harmony export */   "BALL_WIDTH": () => (/* binding */ BALL_WIDTH),
/* harmony export */   "BOARD_HEIGHT": () => (/* binding */ BOARD_HEIGHT),
/* harmony export */   "BOARD_WIDTH": () => (/* binding */ BOARD_WIDTH),
/* harmony export */   "BRICKS_COLS": () => (/* binding */ BRICKS_COLS),
/* harmony export */   "BRICKS_END": () => (/* binding */ BRICKS_END),
/* harmony export */   "BRICK_BONUS_POINTS": () => (/* binding */ BRICK_BONUS_POINTS),
/* harmony export */   "BRICK_HEIGHT": () => (/* binding */ BRICK_HEIGHT),
/* harmony export */   "BRICK_ROWS": () => (/* binding */ BRICK_ROWS),
/* harmony export */   "BRICK_WIDTH": () => (/* binding */ BRICK_WIDTH),
/* harmony export */   "EASY_LEVEl": () => (/* binding */ EASY_LEVEl),
/* harmony export */   "HARD_LEVEL": () => (/* binding */ HARD_LEVEL),
/* harmony export */   "INCREEMNT_DOWN_BRICK": () => (/* binding */ INCREEMNT_DOWN_BRICK),
/* harmony export */   "INCREMENT_LEFT_BRICK": () => (/* binding */ INCREMENT_LEFT_BRICK),
/* harmony export */   "INITIAL_BALL_X": () => (/* binding */ INITIAL_BALL_X),
/* harmony export */   "INITIAL_BALL_Y": () => (/* binding */ INITIAL_BALL_Y),
/* harmony export */   "INITIAL_START_BRICK_LEFT": () => (/* binding */ INITIAL_START_BRICK_LEFT),
/* harmony export */   "INITIAL_START_BRICK_RIGHT": () => (/* binding */ INITIAL_START_BRICK_RIGHT),
/* harmony export */   "MEDIUM_LEVEL": () => (/* binding */ MEDIUM_LEVEL),
/* harmony export */   "STEP_SIZE": () => (/* binding */ STEP_SIZE)
/* harmony export */ });
// BRICKS
const BRICK_ROWS = 3;
const BRICKS_COLS = 10;
const BRICK_WIDTH = 100;
const BRICK_HEIGHT = 40;
const INITIAL_START_BRICK_LEFT = 10;
const INITIAL_START_BRICK_RIGHT = 10;
const INCREMENT_LEFT_BRICK = 120;
const INCREEMNT_DOWN_BRICK = 60;
const BRICKS_END = 170;
// BOARD
const BOARD_WIDTH = 120;
const BOARD_HEIGHT = 20;
//BALL
const BALL_WIDTH = 40;
const BALL_HEIGHT = 40;
const INITIAL_BALL_X = 200;
const INITIAL_BALL_Y = 200;
const BALL_DIAMETER = 40;
//MISCELLANEOUS
const BRICK_BONUS_POINTS = 10;
// GAME
const EASY_LEVEl = 3;
const MEDIUM_LEVEL = 5;
const HARD_LEVEL = 8;
const STEP_SIZE = 20;


/***/ }),

/***/ "./src/utils/helpers.ts":
/*!******************************!*\
  !*** ./src/utils/helpers.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "setGameLevel": () => (/* binding */ setGameLevel),
/* harmony export */   "showGameOverMessage": () => (/* binding */ showGameOverMessage)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./src/utils/constants.ts");
/* harmony import */ var _view_DOMView__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../view/DOMView */ "./src/view/DOMView.ts");


const dom = _view_DOMView__WEBPACK_IMPORTED_MODULE_1__.DOMView.getInstance();
function setGameLevel(input) {
    document.querySelectorAll('input').forEach((input) => {
        input.checked = false;
    });
    input.checked = true;
    switch (input.id) {
        case "easy":
            return _constants__WEBPACK_IMPORTED_MODULE_0__.EASY_LEVEl;
        case "medium":
            return _constants__WEBPACK_IMPORTED_MODULE_0__.MEDIUM_LEVEL;
        case "hard":
            return _constants__WEBPACK_IMPORTED_MODULE_0__.HARD_LEVEL;
    }
}
function showGameOverMessage(scorePoints) {
    const gameoverDiv = dom.getElement("#gameOver");
    gameoverDiv.style.display = "block";
    gameoverDiv.innerText = `Game over, score:${scorePoints}`;
}


/***/ }),

/***/ "./src/utils/validators.ts":
/*!*********************************!*\
  !*** ./src/utils/validators.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isBallCollidingWithBoard": () => (/* binding */ isBallCollidingWithBoard),
/* harmony export */   "isBallHittingRightWall": () => (/* binding */ isBallHittingRightWall),
/* harmony export */   "isBallHittingTheCeiling": () => (/* binding */ isBallHittingTheCeiling),
/* harmony export */   "isBallHittingTheFloor": () => (/* binding */ isBallHittingTheFloor),
/* harmony export */   "isBallHittingTheLeftWall": () => (/* binding */ isBallHittingTheLeftWall),
/* harmony export */   "isBallNearBricks": () => (/* binding */ isBallNearBricks)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./src/utils/constants.ts");

function isBallHittingTheLeftWall(ball) {
    return ball.position.x <= 0;
}
function isBallHittingRightWall(ball, canvasView) {
    return ball.position.x > canvasView.canvas.width - _constants__WEBPACK_IMPORTED_MODULE_0__.BALL_DIAMETER;
}
function isBallHittingTheCeiling(ball) {
    return ball.position.y <= 0;
}
function isBallHittingTheFloor(ball, canvasView) {
    return ball.position.y >= canvasView.canvas.height - _constants__WEBPACK_IMPORTED_MODULE_0__.BALL_DIAMETER;
}
function isBallNearBricks(ball) {
    return ball.position.y < _constants__WEBPACK_IMPORTED_MODULE_0__.BRICKS_END;
}
function isBallCollidingWithBoard(ball, board) {
    return (ball.position.y + _constants__WEBPACK_IMPORTED_MODULE_0__.BALL_DIAMETER / 2 >= board.position.y &&
        ball.position.y + _constants__WEBPACK_IMPORTED_MODULE_0__.BALL_DIAMETER / 2 <= board.position.y + 10 &&
        ball.position.x - _constants__WEBPACK_IMPORTED_MODULE_0__.BALL_DIAMETER / 2 <= board.position.x + _constants__WEBPACK_IMPORTED_MODULE_0__.BOARD_WIDTH &&
        ball.position.x + _constants__WEBPACK_IMPORTED_MODULE_0__.BALL_DIAMETER / 2 >= board.position.x);
}


/***/ }),

/***/ "./src/view/CanvasView.ts":
/*!********************************!*\
  !*** ./src/view/CanvasView.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CanvasView": () => (/* binding */ CanvasView),
/* harmony export */   "canvasView": () => (/* binding */ canvasView)
/* harmony export */ });
/* harmony import */ var _utils_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/constants */ "./src/utils/constants.ts");

class CanvasView {
    canvasSelector;
    ctx;
    canvas;
    constructor(canvasSelector) {
        this.canvasSelector = canvasSelector;
        this.canvas = document.getElementById(canvasSelector);
        this.ctx = this.canvas.getContext("2d");
    }
    drawImage(position, image, width, height) {
        this.ctx.drawImage(image, position.x, position.y, width, height);
    }
    drawBricks(bricks) {
        for (let r = 0; r < _utils_constants__WEBPACK_IMPORTED_MODULE_0__.BRICK_ROWS; r++) {
            for (let c = 0; c < bricks.length; c++) {
                const brick = bricks[c];
                const pos = {
                    x: brick.position.x,
                    y: brick.position.y,
                };
                this.drawImage(pos, brick.getImage(), _utils_constants__WEBPACK_IMPORTED_MODULE_0__.BRICK_WIDTH, _utils_constants__WEBPACK_IMPORTED_MODULE_0__.BRICK_HEIGHT);
            }
        }
    }
    drawBall(ball) {
        this.drawImage({ x: ball.position.x - _utils_constants__WEBPACK_IMPORTED_MODULE_0__.BALL_DIAMETER / 2, y: ball.position.y - _utils_constants__WEBPACK_IMPORTED_MODULE_0__.BALL_DIAMETER / 2 }, ball.getImage(), _utils_constants__WEBPACK_IMPORTED_MODULE_0__.BALL_DIAMETER, _utils_constants__WEBPACK_IMPORTED_MODULE_0__.BALL_DIAMETER);
    }
    drawBoard(board) {
        this.ctx.beginPath();
        this.ctx.drawImage(board.getImage(), board.position.x, board.position.y, _utils_constants__WEBPACK_IMPORTED_MODULE_0__.BOARD_WIDTH, _utils_constants__WEBPACK_IMPORTED_MODULE_0__.BOARD_HEIGHT);
        this.ctx.closePath();
    }
    getContext() {
        return this.ctx;
    }
}
const canvasView = new CanvasView("gameCanvas");


/***/ }),

/***/ "./src/view/DOMView.ts":
/*!*****************************!*\
  !*** ./src/view/DOMView.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DOMView": () => (/* binding */ DOMView)
/* harmony export */ });
class DOMView {
    static instance;
    constructor() {
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new DOMView();
        }
        return this.instance;
    }
    /**
  * This function cannot create a table
  * @param { string } type
  * @param { Object } attributes
  * @param  { ...(string | Node) } content
  * @returns { HTMLElement } Returns the created element
  */
    createElement(type, attributes, ...content) {
        const element = document.createElement(type);
        if (attributes) {
            for (let attribute in attributes) {
                if (attribute.startsWith('on')) {
                    const eventName = attribute.slice(2).toLowerCase();
                    element.addEventListener(eventName, attributes[attribute]);
                }
                else {
                    element[attribute] = attributes[attribute];
                }
            }
        }
        for (let item of content) {
            element.append(item);
        }
        return element;
    }
    addElement(appendTo, element) {
        document.querySelector(appendTo).append(element);
    }
    getElement(selector) {
        let value = document.querySelector(selector);
        return value;
    }
    deleteElement(selector) {
        const element = document.querySelector(selector);
        element.remove();
    }
    addHandler(event, callback) {
        document.addEventListener(event, callback);
    }
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/app.ts");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7S0FDekI7QUFFTCxDQUFDO0FBRU0sU0FBUyxjQUFjLENBQUMsSUFBVSxFQUFFLEtBQWE7SUFDcEQsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbkUsTUFBTSxZQUFZLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLHlEQUFXLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLHlEQUFXLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDbEcsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDL0IsSUFBSSxTQUFTLEdBQUcsWUFBWSxHQUFHLFVBQVUsR0FBRyxZQUFZLENBQUM7SUFDekQsTUFBTSxPQUFPLEdBQUcsQ0FBQyxDQUFDO0lBQ2xCLElBQUksU0FBUyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxFQUFFO1FBQzlCLFNBQVMsR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztLQUNoQztJQUFDLElBQUksU0FBUyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLEVBQUU7UUFDNUIsU0FBUyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDO0tBQzNCO0lBRUQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDMUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDMUMsSUFBSSxD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QUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3hCO1FBRUQsT0FBTyxPQUFPLENBQUM7SUFDbkIsQ0FBQztJQUVELFVBQVUsQ0FBQyxRQUFnQixFQUFFLE9BQW9CO1FBQzdDLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3JELENBQUM7SUFFRCxVQUFVLENBQUMsUUFBZ0I7UUFDdkIsSUFBSSxLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQWdCLENBQUM7UUFDNUQsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQztJQUNELGFBQWEsQ0FBQyxRQUFnQjtRQUMxQixNQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2pELE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBRUQsVUFBVSxDQUFDLEtBQWEsRUFBRSxRQUF1QjtRQUM3QyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQy9DLENBQUM7Q0FDSjs7Ozs7OztVQ3RFRDtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7VUVOQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2J1ZGdldGVlci10cy8uL3NyYy9HZW9tZXRyeS9WZWN0b3IudHMiLCJ3ZWJwYWNrOi8vYnVkZ2V0ZWVyLXRzLy4vc3JjL2FwcC50cyIsIndlYnBhY2s6Ly9idWRnZXRlZXItdHMvLi9zcmMvZW5naW5lL2dhbWVMb29wLnRzIiwid2VicGFjazovL2J1ZGdldGVlci10cy8uL3NyYy9lbmdpbmUvbW92ZS50cyIsIndlYnBhY2s6Ly9idWRnZXRlZXItdHMvLi9zcmMvZmlndXJlcy9CYWxsLnRzIiwid2VicGFjazovL2J1ZGdldGVlci10cy8uL3NyYy9maWd1cmVzL0JyaWNrLnRzIiwid2VicGFjazovL2J1ZGdldGVlci10cy8uL3NyYy9maWd1cmVzL1BhZGRsZS50cyIsIndlYnBhY2s6Ly9idWRnZXRlZXItdHMvLi9zcmMvcGh5c2ljcy9taXNjLnRzIiwid2VicGFjazovL2J1ZGdldGVlci10cy8uL3NyYy9waHlzaWNzL21vdmVtZW50LnRzIiwid2VicGFjazovL2J1ZGdldGVlci10cy8uL3NyYy91dGlscy9icmlja0ZhY3RvcnkudHMiLCJ3ZWJwYWNrOi8vYnVkZ2V0ZWVyLXRzLy4vc3JjL3V0aWxzL2NvbnN0YW50cy50cyIsIndlYnBhY2s6Ly9idWRnZXRlZXItdHMvLi9zcmMvdXRpbHMvaGVscGVycy50cyIsIndlYnBhY2s6Ly9idWRnZXRlZXItdHMvLi9zcmMvdXRpbHMvdmFsaWRhdG9ycy50cyIsIndlYnBhY2s6Ly9idWRnZXRlZXItdHMvLi9zcmMvdmlldy9DYW52YXNWaWV3LnRzIiwid2VicGFjazovL2J1ZGdldGVlci10cy8uL3NyYy92aWV3L0RPTVZpZXcudHMiLCJ3ZWJwYWNrOi8vYnVkZ2V0ZWVyLXRzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2J1ZGdldGVlci10cy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYnVkZ2V0ZWVyLXRzL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYnVkZ2V0ZWVyLXRzL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYnVkZ2V0ZWVyLXRzL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vYnVkZ2V0ZWVyLXRzL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9idWRnZXRlZXItdHMvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBvaW50IH0gZnJvbSBcIi4vSW50ZXJmYWNlc1wiO1xuXG5leHBvcnQgY2xhc3MgVmVjdG9yIGltcGxlbWVudHMgUG9pbnQge1xuICB4OiBudW1iZXI7XG4gIHk6IG51bWJlcjtcblxuICBjb25zdHJ1Y3RvcihwOiBQb2ludCk7XG4gIGNvbnN0cnVjdG9yKHg6IG51bWJlciwgeTogbnVtYmVyKTtcbiAgY29uc3RydWN0b3IoeE9yUG9pbnQ6IG51bWJlciB8IFBvaW50LCB5PzogbnVtYmVyKSB7XG4gICAgaWYgKHR5cGVvZiB4T3JQb2ludCA9PSBcIm51bWJlclwiICYmIHR5cGVvZiB5ID09IFwibnVtYmVyXCIpIHtcbiAgICAgIHRoaXMueCA9IHhPclBvaW50O1xuICAgICAgdGhpcy55ID0geTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiB4T3JQb2ludCA9PSBcIm9iamVjdFwiKSB7XG4gICAgICB0aGlzLnggPSB4T3JQb2ludC54O1xuICAgICAgdGhpcy55ID0geE9yUG9pbnQueTtcbiAgICB9XG4gIH1cblxuICBhZGQocDogUG9pbnQpIHtcbiAgICB0aGlzLnggKz0gcC54O1xuICAgIHRoaXMueSArPSBwLnk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBzY2FsZShzOiBudW1iZXIpIHtcbiAgICB0aGlzLnggKj0gcztcbiAgICB0aGlzLnkgKj0gcztcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgZGlzdChwOiBQb2ludCkge1xuICAgIGNvbnN0IGR4ID0gdGhpcy54IC0gcC54O1xuICAgIGNvbnN0IGR5ID0gdGhpcy55IC0gcC55O1xuICAgIHJldHVybiBNYXRoLnNxcnQoZHggKiogMiArIGR5ICoqIDIpO1xuICB9XG5cbiAgc3FMZW5ndGgoKSB7XG4gICAgcmV0dXJuIHRoaXMueCAqKiAyICsgdGhpcy55ICoqIDI7XG4gIH1cblxuICBzdGF0aWMgYWRkKHAxOiBQb2ludCwgcDI6IFBvaW50KSB7XG4gICAgcmV0dXJuIG5ldyBWZWN0b3IocDEueCArIHAyLngsIHAxLnkgKyBwMi55KTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQmFsbCB9IGZyb20gXCIuL2ZpZ3VyZXMvQmFsbFwiO1xuaW1wb3J0IHsgUGFkZGxlIH0gZnJvbSBcIi4vZmlndXJlcy9QYWRkbGVcIjtcblxuaW1wb3J0IHsgVmVjdG9yIH0gZnJvbSBcIi4vR2VvbWV0cnkvVmVjdG9yXCI7XG5cbmltcG9ydCB7IGNyZWF0ZUJyaWNrcyB9IGZyb20gXCIuL3V0aWxzL2JyaWNrRmFjdG9yeVwiO1xuaW1wb3J0IHtcbiAgSU5JVElBTF9CQUxMX1gsXG4gIElOSVRJQUxfQkFMTF9ZLFxuICBFQVNZX0xFVkVsLCBcbn0gZnJvbSBcIi4vdXRpbHMvY29uc3RhbnRzXCI7XG5cbmltcG9ydCB7IENhbnZhc1ZpZXcgfSBmcm9tIFwiLi92aWV3L0NhbnZhc1ZpZXdcIjtcbmltcG9ydCB7IEdhbWUsICBHYW1lT2JqZWN0cyB9IGZyb20gXCIuL2VuZ2luZS9nYW1lTG9vcFwiO1xuXG5jb25zdCBjYW52YXNWaWV3ID0gbmV3IENhbnZhc1ZpZXcoXCJnYW1lQ2FudmFzXCIpO1xuY29uc3QgZ2FtZW92ZXJEaXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImdhbWVPdmVyXCIpO1xuXG5cbi8vY29uc3QgU1RFUF9TSVpFID0gMjA7XG5cbmltcG9ydCB7IERPTVZpZXcgfSBmcm9tIFwiLi92aWV3L0RPTVZpZXdcIjtcbmltcG9ydCB7IHNldEdhbWVMZXZlbCB9IGZyb20gXCIuL3V0aWxzL2hlbHBlcnNcIjtcblxuXG5jb25zdCBkb20gPSBET01WaWV3LmdldEluc3RhbmNlKCk7XG5cblxuY29uc3QgYm9hcmRJbWcgPSBkb20uZ2V0RWxlbWVudChcIiNib2FyZFwiKSBhcyBIVE1MSW1hZ2VFbGVtZW50O1xuXG5sZXQgbGFzdFRpbWUgPSAwO1xubGV0IGVsYXBzZWQgPSAwO1xuXG5sZXQgR0FNRV9ESUZGSUNVTFRZID0gRUFTWV9MRVZFbDtcblxuY29uc3QgYm9hcmRQb3NpdGlvbiA9IG5ldyBWZWN0b3IoXG4gIGNhbnZhc1ZpZXcuY2FudmFzLndpZHRoIC8gMixcbiAgY2FudmFzVmlldy5jYW52YXMuaGVpZ2h0IC0gMTAwXG4pO1xubGV0IGJyaWNrcyA9IGNyZWF0ZUJyaWNrcygpO1xubGV0IGJvYXJkVmVsb2NpdHkgPSBuZXcgVmVjdG9yKDAsIDApO1xubGV0IGJvYXJkID0gbmV3IFBhZGRsZShib2FyZFBvc2l0aW9uLCBib2FyZEltZywgYm9hcmRWZWxvY2l0eSk7XG5jb25zdCBiYWxsUG9zaXRpb24gPSBuZXcgVmVjdG9yKElOSVRJQUxfQkFMTF9YLCBJTklUSUFMX0JBTExfWSk7XG5sZXQgYmFsbFZlbG9jaXR5ID0gbmV3IFZlY3RvcihHQU1FX0RJRkZJQ1VMVFksIEdBTUVfRElGRklDVUxUWSk7XG5sZXQgYmFsbCA9IG5ldyBCYWxsKGJhbGxQb3NpdGlvbiwgXCIvYXNzZXRzL2JhbGwucG5nXCIsIGJhbGxWZWxvY2l0eSk7XG5jb25zdCBpbnB1dDogeyBbY29kZTogc3RyaW5nXTogYm9vbGVhbiB9ID0ge307XG5cbmxldCBnYW1lT3ZlciA9IGZhbHNlO1xuZXhwb3J0IGxldCBzY29yZVBvaW50cyA9IDA7XG5sZXQgaXNNb3VzZUFjdGl2ZSA9IHRydWU7XG5sZXQgbGl2ZXMgPSAzO1xuY29uc3QgZ2FtZU9iamVjdHM6IEdhbWVPYmplY3RzID0geyBiYWxsLCBib2FyZCwgYnJpY2tzIH1cbmxldCBnYW1lID0gbmV3IEdhbWUoY2FudmFzVmlldywgbGl2ZXMpO1xuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgKGV2ZW50KSA9PiB7XG4gIGlucHV0W2V2ZW50LmNvZGVdID0gdHJ1ZTtcbn0pO1xud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCAoZXZlbnQpID0+IHtcbiAgaW5wdXRbZXZlbnQuY29kZV0gPSBmYWxzZTtcbn0pO1xuXG5kb20uYWRkSGFuZGxlcihcIm1vdXNlbW92ZVwiLCAoZTogTW91c2VFdmVudCkgPT4ge1xuICAgIGlmIChpc01vdXNlQWN0aXZlKSBib2FyZC5wb3NpdGlvbi54ID0gZS5jbGllbnRYO1xufSlcblxud2luZG93Lm9uY29udGV4dG1lbnUgPSAoZSkgPT4ge1xuICBlLnByZXZlbnREZWZhdWx0KCk7XG4gIGNvbnNvbGUubG9nKFwicmlnaHQgY2xpY2tlZFwiKTtcbiAgaXNNb3VzZUFjdGl2ZSA9IGZhbHNlO1xufTtcbmNvbnN0IHBsYXlCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBsYXktYnRuXCIpO1xubGV0IGlzUGxheU11c2ljID0gZmFsc2U7XG5cbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibmV3LWdhbWVcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gIGlmIChnYW1lLmxpdmVzIDw9IDEpIHtcbiAgICAoZS50YXJnZXQgYXMgSFRNTEJ1dHRvbkVsZW1lbnQpLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIlxuICB9XG4gIGdhbWUuc3RhcnRHYW1lKCk7XG4gIGdhbWVvdmVyRGl2LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbn0pO1xuXG5wbGF5QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gIGRvbS5nZXRFbGVtZW50KFwiI2NvbnRhaW5lclwiKS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gIGRvbS5nZXRFbGVtZW50KFwiI2dhbWVDYW52YXNcIikuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcblxuICBjb25zdCBkZXRhaWxzQm94ID0gZG9tLmdldEVsZW1lbnQoXCIjZGV0YWlscy1ib3hcIik7XG4gIGRldGFpbHNCb3guc3R5bGUuZGlzcGxheSA9IFwiZmxleFwiO1xuICBkZXRhaWxzQm94LnN0eWxlLmp1c3RpZnlDb250ZW50ID0gXCJzcGFjZS1hcm91bmRcIjtcblxuICBnYW1lLnN0YXJ0R2FtZSgpO1xuXG4gIGlmIChpc1BsYXlNdXNpYykge1xuICAgIGNvbnN0IG11c2ljID0gbmV3IEF1ZGlvKFwiLi4vYXNzZXRzL211c2ljLm1wM1wiKTtcbiAgICBtdXNpYy52b2x1bWUgPSAwLjE7XG4gICAgbXVzaWMucGxheSgpO1xuICB9XG59KTtcblxuZG9tLmdldEVsZW1lbnQoXCIjc2V0dGluZy1idG5cIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgY29uc3Qgc2V0dGluZ3NDb250YWluZXIgPSBkb20uZ2V0RWxlbWVudChcIiNzZXR0aW5ncy1jb250YWluZXJcIik7XG4gIGNvbnN0IGNvbnRhaW5lciA9IGRvbS5nZXRFbGVtZW50KFwiI2NvbnRhaW5lclwiKTtcbiAgc2V0dGluZ3NDb250YWluZXIuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgY29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcblxuICBkb20uZ2V0RWxlbWVudChcIiNiYWNrLWJ0blwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIHNldHRpbmdzQ29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICBjb250YWluZXIuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgfSk7XG5cbiAgZG9tLmdldEVsZW1lbnQoXCIjcGxheS1zb3VuZC1idG5cIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBpc1BsYXlNdXNpYyA9IHRydWU7XG4gICAgKGRvbS5nZXRFbGVtZW50KFwiLmdnLWNoZWNrXCIpIGFzIEhUTUxFbGVtZW50KS5zdHlsZS5kaXNwbGF5ID1cbiAgICAgIFwiYmxvY2tcIjtcbiAgfSk7XG59KTtcblxuZG9tLmdldEVsZW1lbnQoXCIjbGV2ZWxcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gIGNvbnN0IGlucHV0ID0gKGUudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQpO1xuICBHQU1FX0RJRkZJQ1VMVFkgPSBzZXRHYW1lTGV2ZWwoaW5wdXQpO1xufSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBzaG93R2FtZU92ZXJNZXNzYWdlKHNjb3JlUG9pbnRzOiBudW1iZXIpIHtcbiAgZ2FtZW92ZXJEaXYuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgKGdhbWVvdmVyRGl2IGFzIEhUTUxEaXZFbGVtZW50KS5pbm5lclRleHQgPSBgR2FtZSBvdmVyLCBzY29yZToke3Njb3JlUG9pbnRzfWA7XG59XG4iLCJpbXBvcnQgeyBDYW52YXNWaWV3LCBjYW52YXNWaWV3IH0gZnJvbSBcIi4uL3ZpZXcvQ2FudmFzVmlld1wiO1xuXG5pbXBvcnQgeyBQYWRkbGUgfSBmcm9tIFwiLi4vZmlndXJlcy9QYWRkbGVcIjtcbmltcG9ydCB7IEJhbGwgfSBmcm9tIFwiLi4vZmlndXJlcy9CYWxsXCI7XG5pbXBvcnQgeyBCcmljayB9IGZyb20gXCIuLi9maWd1cmVzL0JyaWNrXCI7XG5cbmltcG9ydCB7IG1vdmUgfSBmcm9tIFwiLi9tb3ZlXCI7XG5pbXBvcnQge1xuICAgIEJPQVJEX1dJRFRILCBCUklDS19CT05VU19QT0lOVFMsIElOSVRJQUxfQkFMTF9YLCBJTklUSUFMX0JBTExfWSxcbn0gZnJvbSBcIi4uL3V0aWxzL2NvbnN0YW50c1wiO1xuaW1wb3J0IHtcbiAgICBpc0JhbGxIaXR0aW5nVGhlRmxvb3IsIGlzQmFsbEhpdHRpbmdUaGVDZWlsaW5nLCBpc0JhbGxIaXR0aW5nUmlnaHRXYWxsLFxuICAgIGlzQmFsbEhpdHRpbmdUaGVMZWZ0V2FsbCwgaXNCYWxsQ29sbGlkaW5nV2l0aEJvYXJkLCBpc0JhbGxOZWFyQnJpY2tzXG59IGZyb20gXCIuLi91dGlscy92YWxpZGF0b3JzXCI7XG5pbXBvcnQgeyBzaG93R2FtZU92ZXJNZXNzYWdlIH0gZnJvbSBcIi4uL2FwcFwiO1xuaW1wb3J0IHsgY2hhbmdlQmFsbERpcmVjdGlvbiwgaGFuZGxlQm9hcmRIaXQgfSBmcm9tIFwiLi4vcGh5c2ljcy9tb3ZlbWVudFwiO1xuaW1wb3J0IHsgVmVjdG9yIH0gZnJvbSBcIi4uL0dlb21ldHJ5L1ZlY3RvclwiO1xuaW1wb3J0IHsgZ2V0SGl0QnJpY2tJbmRleCB9IGZyb20gXCIuLi9waHlzaWNzL21pc2NcIjtcbmltcG9ydCB7IGNyZWF0ZUJyaWNrcyB9IGZyb20gXCIuLi91dGlscy9icmlja0ZhY3RvcnlcIjtcblxuXG5jb25zdCBpbnB1dDogeyBbY29kZTogc3RyaW5nXTogYm9vbGVhbiB9ID0ge307XG5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCAoZXZlbnQpID0+IHtcbiAgICBpbnB1dFtldmVudC5jb2RlXSA9IHRydWU7XG59KTtcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwia2V5dXBcIiwgKGV2ZW50KSA9PiB7XG4gICAgaW5wdXRbZXZlbnQuY29kZV0gPSBmYWxzZTtcbn0pO1xuXG5leHBvcnQgaW50ZXJmYWNlIEdhbWVPYmplY3RzIHtcbiAgICBiYWxsOiBCYWxsLCBib2FyZDogUGFkZGxlLCBicmlja3M6IEJyaWNrW11cbn1cblxuY29uc3QgYm9hcmRJbWcgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJvYXJkXCIpIGFzIEhUTUxJbWFnZUVsZW1lbnQ7XG5leHBvcnQgY2xhc3MgR2FtZSB7XG4gICAgcHJpdmF0ZSBiYWxsOiBCYWxsO1xuICAgIHByaXZhdGUgYm9hcmQ6IFBhZGRsZTtcbiAgICBwcml2YXRlIGJyaWNrczogQnJpY2tbXTtcbiAgICBwcml2YXRlIHNjb3JlUG9pbnRzOiBudW1iZXI7XG4gICAgcHJpdmF0ZSByZWFkb25seSBHQU1FX0RJRkZJQ1VMVFkgPSAzO1xuICAgIHByaXZhdGUgcmVhZG9ubHkgU1RFUF9TSVpFID0gMjA7XG4gICAgcHJpdmF0ZSBsYXN0VGltZTogbnVtYmVyO1xuICAgIHByaXZhdGUgZWxhcHNlZDogbnVtYmVyO1xuICAgIHB1YmxpYyBnYW1lT3ZlcjogYm9vbGVhbjtcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgY2FudmFzVmlldzogQ2FudmFzVmlldywgcHVibGljIGxpdmVzOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5zY29yZVBvaW50cyA9IDA7XG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZUdhbWVPYmplY3RzKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpbml0aWFsaXplR2FtZU9iamVjdHMoKSB7XG4gICAgICAgIHRoaXMuYnJpY2tzID0gY3JlYXRlQnJpY2tzKCk7XG4gICAgICAgIGNvbnN0IGJvYXJkUG9zaXRpb24gPSBuZXcgVmVjdG9yKFxuICAgICAgICAgICAgY2FudmFzVmlldy5jYW52YXMud2lkdGggLyAyLFxuICAgICAgICAgICAgY2FudmFzVmlldy5jYW52YXMuaGVpZ2h0IC0gMTAwXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuYm9hcmQgPSBuZXcgUGFkZGxlKGJvYXJkUG9zaXRpb24sIGJvYXJkSW1nKTtcbiAgICAgICAgY29uc3QgYmFsbFBvc2l0aW9uID0gbmV3IFZlY3RvcihJTklUSUFMX0JBTExfWCwgSU5JVElBTF9CQUxMX1kpO1xuICAgICAgICB0aGlzLmJhbGwgPSBuZXcgQmFsbChiYWxsUG9zaXRpb24sIFwiL2Fzc2V0cy9iYWxsLnBuZ1wiKTtcbiAgICAgICAgdGhpcy5iYWxsLnZlbG9jaXR5ID0gbmV3IFZlY3Rvcih0aGlzLkdBTUVfRElGRklDVUxUWSwgdGhpcy5HQU1FX0RJRkZJQ1VMVFkpO1xuICAgICAgICB0aGlzLmxhc3RUaW1lID0gMDtcbiAgICAgICAgdGhpcy5lbGFwc2VkID0gMDtcbiAgICAgICAgdGhpcy5nYW1lT3ZlciA9IGZhbHNlO1xuICAgIH1cblxuICAgIGdhbWVMb29wKCkge1xuICAgICAgICBpZiAoaW5wdXRbJ0Fycm93TGVmdCddICYmICh0aGlzLmJvYXJkLnBvc2l0aW9uLnggPiAwKSkge1xuICAgICAgICAgICAgdGhpcy5ib2FyZC52ZWxvY2l0eS54ID0gLTc7XG4gICAgICAgICAgICBtb3ZlKHRoaXMuYm9hcmQpO1xuICAgICAgICB9IGVsc2UgaWYgKGlucHV0WydBcnJvd1JpZ2h0J10gJiYgKHRoaXMuYm9hcmQucG9zaXRpb24ueCArIEJPQVJEX1dJRFRIIDwgY2FudmFzVmlldy5jYW52YXMud2lkdGgpKSB7XG4gICAgICAgICAgICB0aGlzLmJvYXJkLnZlbG9jaXR5LnggPSA3O1xuICAgICAgICAgICAgbW92ZSh0aGlzLmJvYXJkKTtcbiAgICAgICAgfVxuICAgICAgICBjYW52YXNWaWV3LmdldENvbnRleHQoKS5jbGVhclJlY3QoMCwgMCwgY2FudmFzVmlldy5jYW52YXMud2lkdGgsIGNhbnZhc1ZpZXcuY2FudmFzLmhlaWdodCk7XG4gICAgICAgIGNhbnZhc1ZpZXcuZHJhd0JyaWNrcyh0aGlzLmJyaWNrcyk7XG4gICAgICAgIGNhbnZhc1ZpZXcuZHJhd0JvYXJkKHRoaXMuYm9hcmQpO1xuICAgICAgICBjYW52YXNWaWV3LmRyYXdCYWxsKHRoaXMuYmFsbCk7XG4gICAgICAgIHRoaXMuY29sbGlzaW9uRGV0ZWN0b3IoKTtcbiAgICAgICAgaWYgKCF0aGlzLmdhbWVPdmVyKVxuICAgICAgICAgICAgbW92ZSh0aGlzLmJhbGwpO1xuICAgIH1cblxuXG4gICAgY29sbGlzaW9uRGV0ZWN0b3IoKSB7XG4gICAgICAgIGlmIChpc0JhbGxDb2xsaWRpbmdXaXRoQm9hcmQodGhpcy5iYWxsLCB0aGlzLmJvYXJkKSkge1xuICAgICAgICAgICAgaGFuZGxlQm9hcmRIaXQodGhpcy5iYWxsLCB0aGlzLmJvYXJkKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNCYWxsSGl0dGluZ1RoZUZsb29yKHRoaXMuYmFsbCwgdGhpcy5jYW52YXNWaWV3KSkge1xuICAgICAgICAgICAgdGhpcy5saXZlcy0tOy8vXG4gICAgICAgICAgICB0aGlzLmdhbWVPdmVyID0gdHJ1ZTtcbiAgICAgICAgICAgIGlmICh0aGlzLmxpdmVzID09PSAwKSB7IHNob3dHYW1lT3Zlck1lc3NhZ2UodGhpcy5zY29yZVBvaW50cyk7IH1cbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibGlmZVwiKS5pbm5lclRleHQgPSB0aGlzLmxpdmVzLnRvU3RyaW5nKCk7XG4gICAgICAgIH0gZWxzZSBpZiAoaXNCYWxsSGl0dGluZ1RoZUNlaWxpbmcodGhpcy5iYWxsKSkge1xuICAgICAgICAgICAgdGhpcy5iYWxsLnZlbG9jaXR5LnkgPSBNYXRoLmFicyh0aGlzLmJhbGwudmVsb2NpdHkueSk7XG4gICAgICAgIH0gZWxzZSBpZiAoaXNCYWxsSGl0dGluZ1JpZ2h0V2FsbCh0aGlzLmJhbGwsIHRoaXMuY2FudmFzVmlldykpIHtcbiAgICAgICAgICAgIHRoaXMuYmFsbC52ZWxvY2l0eS54ID0gLSB0aGlzLmJhbGwudmVsb2NpdHkueDtcbiAgICAgICAgfSBlbHNlIGlmIChpc0JhbGxIaXR0aW5nVGhlTGVmdFdhbGwodGhpcy5iYWxsKSkge1xuICAgICAgICAgICAgdGhpcy5iYWxsLnZlbG9jaXR5LnggPSBNYXRoLmFicyh0aGlzLmJhbGwudmVsb2NpdHkueCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGFydEdhbWUoKSB7XG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZUdhbWVPYmplY3RzKCk7XG4gICAgICAgIHRoaXMudXBkYXRlKHBlcmZvcm1hbmNlLm5vdygpKTtcbiAgICB9XG5cbiAgICB1cGRhdGUodGltZTogbnVtYmVyKSB7XG4gICAgICAgIGNvbnN0IGRlbHRhID0gdGltZSAtIHRoaXMubGFzdFRpbWU7XG4gICAgICAgIHRoaXMubGFzdFRpbWUgPSB0aW1lO1xuICAgICAgICB0aGlzLmVsYXBzZWQgKz0gZGVsdGE7XG4gICAgICAgIGxldCBkZWxldGVCcmlja0luZGV4ID0gaXNCYWxsTmVhckJyaWNrcyh0aGlzLmJhbGwpXG4gICAgICAgICAgICA/IGdldEhpdEJyaWNrSW5kZXgodGhpcy5icmlja3MsIHRoaXMuYmFsbClcbiAgICAgICAgICAgIDogLTE7XG4gICAgICAgIGlmIChkZWxldGVCcmlja0luZGV4ICE9IC0xKSB7XG4gICAgICAgICAgICBjb25zdCBicmljayA9IHRoaXMuYnJpY2tzW2RlbGV0ZUJyaWNrSW5kZXhdO1xuICAgICAgICAgICAgY2hhbmdlQmFsbERpcmVjdGlvbih0aGlzLmJhbGwsIGJyaWNrKTtcbiAgICAgICAgICAgIHRoaXMuYnJpY2tzLnNwbGljZShkZWxldGVCcmlja0luZGV4LCAxKTtcbiAgICAgICAgICAgIHRoaXMuc2NvcmVQb2ludHMgKz0gQlJJQ0tfQk9OVVNfUE9JTlRTO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmVsYXBzZWQgPiB0aGlzLlNURVBfU0laRSAqIDUpIHtcbiAgICAgICAgICAgIHRoaXMuZWxhcHNlZCA9IHRoaXMuU1RFUF9TSVpFICogNTtcbiAgICAgICAgfVxuICAgICAgICB3aGlsZSAodGhpcy5lbGFwc2VkID4gdGhpcy5TVEVQX1NJWkUpIHtcbiAgICAgICAgICAgIHRoaXMuZWxhcHNlZCAtPSB0aGlzLlNURVBfU0laRTtcbiAgICAgICAgICAgIHRoaXMuZ2FtZUxvb3AoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5icmlja3MubGVuZ3RoICYmICF0aGlzLmdhbWVPdmVyKSB7XG4gICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy51cGRhdGUuYmluZCh0aGlzKSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnYW1lTG9vcChiYWxsLCBib2FyZCwgYnJpY2tzLCBjYW52YXNWaWV3LCBnYW1lT3Zlcikge1xuICAgIGlmIChpbnB1dFsnQXJyb3dMZWZ0J10gJiYgKGJvYXJkLnBvc2l0aW9uLnggPiAwKSkge1xuICAgICAgICBib2FyZC52ZWxvY2l0eS54ID0gLTc7XG4gICAgICAgIG1vdmUoYm9hcmQpO1xuICAgIH0gZWxzZSBpZiAoaW5wdXRbJ0Fycm93UmlnaHQnXSAmJiAoYm9hcmQucG9zaXRpb24ueCArIEJPQVJEX1dJRFRIIDwgY2FudmFzVmlldy5jYW52YXMud2lkdGgpKSB7XG4gICAgICAgIGJvYXJkLnZlbG9jaXR5LnggPSA3O1xuICAgICAgICBtb3ZlKGJvYXJkKTtcbiAgICB9XG4gICAgY2FudmFzVmlldy5nZXRDb250ZXh0KCkuY2xlYXJSZWN0KDAsIDAsIGNhbnZhc1ZpZXcuY2FudmFzLndpZHRoLCBjYW52YXNWaWV3LmNhbnZhcy5oZWlnaHQpO1xuICAgIGNhbnZhc1ZpZXcuZHJhd0JyaWNrcyhicmlja3MpO1xuICAgIGNhbnZhc1ZpZXcuZHJhd0JvYXJkKGJvYXJkKTtcbiAgICBjYW52YXNWaWV3LmRyYXdCYWxsKGJhbGwpO1xuICAgIGNvbGxpc2lvbkRldGVjdG9yKGJhbGwsIGJvYXJkLCBnYW1lT3Zlcik7XG4gICAgbW92ZShiYWxsKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvbGxpc2lvbkRldGVjdG9yKGJhbGw6IEJhbGwsIGJvYXJkOiBQYWRkbGUsIGdhbWVPdmVyOiBib29sZWFuKSB7XG4gICAgaWYgKGlzQmFsbENvbGxpZGluZ1dpdGhCb2FyZChiYWxsLCBib2FyZCkpIHtcbiAgICAgICAgaGFuZGxlQm9hcmRIaXQoYmFsbCwgYm9hcmQpO1xuICAgIH1cbiAgICBpZiAoaXNCYWxsSGl0dGluZ1RoZUZsb29yKGJhbGwsIGNhbnZhc1ZpZXcpKSB7XG4gICAgICAgIGdhbWVPdmVyID0gdHJ1ZTtcbiAgICAgICAvLyBzaG93R2FtZU92ZXJNZXNzYWdlKHRoaXMucyk7XG4gICAgfSBlbHNlIGlmIChpc0JhbGxIaXR0aW5nVGhlQ2VpbGluZyhiYWxsKSkge1xuICAgICAgICBiYWxsLnZlbG9jaXR5LnkgPSBNYXRoLmFicyhiYWxsLnZlbG9jaXR5LnkpO1xuICAgIH0gZWxzZSBpZiAoaXNCYWxsSGl0dGluZ1JpZ2h0V2FsbChiYWxsLCBjYW52YXNWaWV3KSkge1xuICAgICAgICBiYWxsLnZlbG9jaXR5LnggPSAtIGJhbGwudmVsb2NpdHkueDtcbiAgICB9IGVsc2UgaWYgKGlzQmFsbEhpdHRpbmdUaGVMZWZ0V2FsbChiYWxsKSkge1xuICAgICAgICBiYWxsLnZlbG9jaXR5LnggPSBNYXRoLmFicyhiYWxsLnZlbG9jaXR5LngpO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IFZlY3RvciB9IGZyb20gXCIuLi91dGlscy92ZWN0b3JcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIG1vdmUoZ2FtZU9iamVjdDogR2FtZU9iamVjdCkge1xuICBnYW1lT2JqZWN0LnBvc2l0aW9uLnggKz0gZ2FtZU9iamVjdC52ZWxvY2l0eS54O1xuICBnYW1lT2JqZWN0LnBvc2l0aW9uLnkgKz0gZ2FtZU9iamVjdC52ZWxvY2l0eS55O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEdhbWVPYmplY3Qge1xuICBwb3NpdGlvbjogeyB4OiBudW1iZXI7IHk6IG51bWJlciB9O1xuICB2ZWxvY2l0eTogVmVjdG9yXG59XG4iLCJpbXBvcnQgeyBWZWN0b3IgfSBmcm9tIFwiLi4vR2VvbWV0cnkvVmVjdG9yXCI7XG5cbmV4cG9ydCBjbGFzcyBCYWxsIHtcbiAgcHJpdmF0ZSBpbWFnZTogSFRNTEltYWdlRWxlbWVudCA9IG5ldyBJbWFnZSgpO1xuICBwdWJsaWMgdmVsb2NpdHk6IFZlY3RvciA9IG5ldyBWZWN0b3IoMCwgMCk7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBwb3NpdGlvbjogVmVjdG9yLCBpbWFnZTogc3RyaW5nLCBiYWxsdmVsb2NpdHk/OiBWZWN0b3IpIHtcbiAgICB0aGlzLmltYWdlLnNyYyA9IGltYWdlO1xuICAgIGlmICghIWJhbGx2ZWxvY2l0eSkgdGhpcy52ZWxvY2l0eSA9IGJhbGx2ZWxvY2l0eTtcbiAgfVxuXG4gIGdldEltYWdlKCk6IEhUTUxJbWFnZUVsZW1lbnQge1xuICAgIHJldHVybiB0aGlzLmltYWdlO1xuICB9XG59XG4iLCJpbXBvcnQgeyBWZWN0b3IgfSBmcm9tIFwiLi4vdXRpbHMvdmVjdG9yXCI7XG5cbmV4cG9ydCBjbGFzcyBCcmljayB7XG4gIHByaXZhdGUgaW1hZ2U6IEhUTUxJbWFnZUVsZW1lbnQgPSBuZXcgSW1hZ2UoKTtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgcG9zaXRpb246IFZlY3RvciwgaW1hZ2U6IHN0cmluZykge1xuICAgIHRoaXMuaW1hZ2Uuc3JjID0gaW1hZ2U7XG4gIH1cblxuICBnZXRJbWFnZSgpOiBIVE1MSW1hZ2VFbGVtZW50IHtcbiAgICByZXR1cm4gdGhpcy5pbWFnZTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgVmVjdG9yIH0gZnJvbSBcIi4uL0dlb21ldHJ5L1ZlY3RvclwiO1xuXG5leHBvcnQgY2xhc3MgUGFkZGxlIHtcbiAgcHJpdmF0ZSBpbWFnZTogSFRNTEltYWdlRWxlbWVudCA9IG5ldyBJbWFnZSgpO1xuICBwdWJsaWMgdmVsb2NpdHk6IFZlY3RvciA9IG5ldyBWZWN0b3IoMCwgMCk7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBwb3NpdGlvbjogVmVjdG9yLFxuICAgIGltYWdlOiBIVE1MSW1hZ2VFbGVtZW50LFxuICAgIGJvYXJkdmVsb2NpdHk/OiBWZWN0b3JcbiAgKSB7XG4gICAgdGhpcy5pbWFnZSA9IGltYWdlO1xuICAgIGlmICghIWJvYXJkdmVsb2NpdHkpIHRoaXMudmVsb2NpdHkgPSBib2FyZHZlbG9jaXR5O1xuICB9XG5cbiAgZ2V0SW1hZ2UoKTogSFRNTEltYWdlRWxlbWVudCB7XG4gICAgcmV0dXJuIHRoaXMuaW1hZ2U7XG4gIH1cbn1cbiIsImltcG9ydCB7IEJBTExfRElBTUVURVIsIEJSSUNLX1dJRFRILCBCUklDS19IRUlHSFQgfSBmcm9tIFwiLi4vdXRpbHMvY29uc3RhbnRzXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRIaXRCcmlja0luZGV4KGJyaWNrcywgYmFsbCkge1xuICByZXR1cm4gYnJpY2tzLmZpbmRJbmRleCgoYnJpY2spID0+IHtcbiAgICBjb25zdCBsZWZ0ID0gYnJpY2sucG9zaXRpb24ueCAtIEJBTExfRElBTUVURVIgLyAyO1xuICAgIGNvbnN0IHJpZ2h0ID0gYnJpY2sucG9zaXRpb24ueCArIEJSSUNLX1dJRFRIICsgQkFMTF9ESUFNRVRFUiAvIDI7XG4gICAgY29uc3QgdG9wID0gYnJpY2sucG9zaXRpb24ueSAtIEJBTExfRElBTUVURVIgLyAyO1xuICAgIGNvbnN0IGJvdHRvbSA9IGJyaWNrLnBvc2l0aW9uLnkgKyBCUklDS19IRUlHSFQgKyBCQUxMX0RJQU1FVEVSIC8gMjtcbiAgICByZXR1cm4gKFxuICAgICAgYmFsbC5wb3NpdGlvbi54ID49IGxlZnQgJiZcbiAgICAgIGJhbGwucG9zaXRpb24ueCA8PSByaWdodCAmJlxuICAgICAgYmFsbC5wb3NpdGlvbi55ID49IHRvcCAmJlxuICAgICAgYmFsbC5wb3NpdGlvbi55IDw9IGJvdHRvbVxuICAgICk7XG4gIH0pO1xufVxuIiwiaW1wb3J0IHsgQmFsbCB9IGZyb20gXCIuLi9maWd1cmVzL0JhbGxcIjtcbmltcG9ydCB7IEJyaWNrIH0gZnJvbSBcIi4uL2ZpZ3VyZXMvQnJpY2tcIjtcbmltcG9ydCB7IFBhZGRsZSB9IGZyb20gXCIuLi9maWd1cmVzL1BhZGRsZVwiO1xuaW1wb3J0IHsgQlJJQ0tfSEVJR0hULCBCUklDS19XSURUSCwgQkFMTF9ESUFNRVRFUiwgQk9BUkRfV0lEVEggfSBmcm9tIFwiLi4vdXRpbHMvY29uc3RhbnRzXCI7XG5pbXBvcnQgeyBWZWN0b3IgfSBmcm9tIFwiLi4vdXRpbHMvdmVjdG9yXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBjaGFuZ2VCYWxsRGlyZWN0aW9uKGJhbGw6IEJhbGwsIGJyaWNrOiBCcmljaykge1xuICAgIGNvbnN0IEJSSUNLX0RJQUdPTkFMID0gTWF0aC5zcXJ0KEJSSUNLX0hFSUdIVCAqKiAyICsgQlJJQ0tfV0lEVEggKiogMik7XG4gICAgY29uc3QgYnJpY2tDZW50ZXJYID0gYnJpY2sucG9zaXRpb24ueCArIEJSSUNLX1dJRFRIIC8gMjtcbiAgICBjb25zdCBicmlja0NlbnRlclkgPSBicmljay5wb3NpdGlvbi55ICsgQlJJQ0tfSEVJR0hUIC8gMjtcbiAgICBjb25zdCBiYWxsQ2VudGVyWCA9IGJhbGwucG9zaXRpb24ueCArIEJBTExfRElBTUVURVIgLyAyO1xuICAgIGNvbnN0IGJhbGxDZW50ZXJZID0gYmFsbC5wb3NpdGlvbi55ICsgQkFMTF9ESUFNRVRFUiAvIDI7XG4gICAgY29uc3QgZGVsdGFZID0gKEJSSUNLX0hFSUdIVCAqIEJBTExfRElBTUVURVIgLyAyKSAvIEJSSUNLX0RJQUdPTkFMO1xuICAgIGNvbnN0IGRlbHRhWCA9IChCUklDS19XSURUSCAqIEJBTExfRElBTUVURVIgLyAyKSAvIEJSSUNLX0RJQUdPTkFMO1xuICAgIGNvbnN0IG1pbllTaWRlSGl0ID0gYnJpY2sucG9zaXRpb24ueSArIGRlbHRhWTtcbiAgICBjb25zdCBtYXhZU2lkZUhpdCA9IGJyaWNrLnBvc2l0aW9uLnkgKyBCUklDS19IRUlHSFQgLSBkZWx0YVk7XG4gICAgY29uc3QgbWluTGVmdFhTaWRlSGl0ID0gYnJpY2sucG9zaXRpb24ueCAtIGRlbHRhWDtcbiAgICBjb25zdCBtYXhMZWZ0WFNpZGVIaXQgPSBicmljay5wb3NpdGlvbi54ICsgZGVsdGFYO1xuICAgIGNvbnN0IGlzQmFsbENvbWluZ0Zyb21CdXR0b21MZWZ0ID0gKChiYWxsQ2VudGVyWCA+IG1pbkxlZnRYU2lkZUhpdClcbiAgICAgICAgJiYgKGJhbGxDZW50ZXJYIDwgbWF4TGVmdFhTaWRlSGl0KVxuICAgICAgICAmJiAoYmFsbENlbnRlclkgPiBtaW5ZU2lkZUhpdClcbiAgICAgICAgJiYgKGJhbGxDZW50ZXJZIDwgbWF4WVNpZGVIaXQpKTtcbiAgICBjb25zdCBpc0JhbGxDb21pbmdGcm9tQnV0dG9tUmlnaHQgPSAoKGJhbGxDZW50ZXJYID4gbWluTGVmdFhTaWRlSGl0ICsgQlJJQ0tfV0lEVEgpXG4gICAgICAgICYmIChiYWxsQ2VudGVyWCA8IG1heExlZnRYU2lkZUhpdCArIEJSSUNLX1dJRFRIKVxuICAgICAgICAmJiAoYmFsbENlbnRlclkgPiBtaW5ZU2lkZUhpdClcbiAgICAgICAgJiYgKGJhbGxDZW50ZXJZIDwgbWF4WVNpZGVIaXQpKTtcbiAgICBpZiAoKGlzQmFsbENvbWluZ0Zyb21CdXR0b21MZWZ0ICYmIGJhbGwudmVsb2NpdHkueCA+IDApIHx8IChpc0JhbGxDb21pbmdGcm9tQnV0dG9tUmlnaHQgJiYgYmFsbC52ZWxvY2l0eS54IDwgMCkpIHtcbiAgICAgICAgYmFsbC52ZWxvY2l0eS54ICo9IC0xO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGJhbGwudmVsb2NpdHkueSAqPSAtMTtcbiAgICB9XG5cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGhhbmRsZUJvYXJkSGl0KGJhbGw6IEJhbGwsIGJvYXJkOiBQYWRkbGUpIHtcbiAgICBjb25zdCBjdXJyZW50QW5nbGUgPSBNYXRoLmF0YW4yKC1iYWxsLnZlbG9jaXR5LnksIGJhbGwudmVsb2NpdHkueCk7XG4gICAgY29uc3QgZGVsdGFDZW50ZXJYID0gKGJhbGwucG9zaXRpb24ueCAtIChib2FyZC5wb3NpdGlvbi54ICsgQk9BUkRfV0lEVEggLyAyKSkgLyAoQk9BUkRfV0lEVEggLyAyKTtcbiAgICBjb25zdCBhbmdsZVRvQWRkID0gTWF0aC5QSSAvIDU7XG4gICAgbGV0IG5leHRBbmdsZSA9IGRlbHRhQ2VudGVyWCAqIGFuZ2xlVG9BZGQgKyBjdXJyZW50QW5nbGU7XG4gICAgY29uc3QgeU9mZnNldCA9IDU7XG4gICAgaWYgKG5leHRBbmdsZSA8IC01ICogTWF0aC5QSSAvIDYpIHtcbiAgICAgICAgbmV4dEFuZ2xlID0gLTUgKiBNYXRoLlBJIC8gNjtcbiAgICB9IGlmIChuZXh0QW5nbGUgPiAtTWF0aC5QSSAvIDYpIHtcbiAgICAgICAgbmV4dEFuZ2xlID0gLU1hdGguUEkgLyA2XG4gICAgfVxuXG4gICAgYmFsbC52ZWxvY2l0eS54ID0gNSAqIE1hdGguY29zKG5leHRBbmdsZSk7XG4gICAgYmFsbC52ZWxvY2l0eS55ID0gNSAqIE1hdGguc2luKG5leHRBbmdsZSk7XG4gICAgYmFsbC5wb3NpdGlvbi55ID0gYm9hcmQucG9zaXRpb24ueSAtIEJBTExfRElBTUVURVIgLyAyIC0geU9mZnNldDtcbn1cbiIsImltcG9ydCB7IEJyaWNrIH0gZnJvbSBcIi4uL2ZpZ3VyZXMvQnJpY2tcIjtcbmltcG9ydCB7XG4gIEJSSUNLU19DT0xTLFxuICBCUklDS19ST1dTLFxuICBJTkNSRUVNTlRfRE9XTl9CUklDSyxcbiAgSU5DUkVNRU5UX0xFRlRfQlJJQ0ssXG4gIElOSVRJQUxfU1RBUlRfQlJJQ0tfTEVGVCxcbiAgSU5JVElBTF9TVEFSVF9CUklDS19SSUdIVCxcbn0gZnJvbSBcIi4vY29uc3RhbnRzXCI7XG5cbmltcG9ydCB7IFZlY3RvciB9IGZyb20gXCIuL3ZlY3RvclwiO1xuXG5jb25zdCBicmlja3NJbWFnZSA9IFtcbiAgXCIvYXNzZXRzL2JyaWNrLWJsdWUucG5nXCIsXG4gIFwiL2Fzc2V0cy9icmljay1ncmVlbi5wbmdcIixcbiAgXCIvYXNzZXRzL2JyaWNrLXB1cnBsZS5wbmdcIixcbiAgXCIvYXNzZXRzL2JyaWNrLXJlZC5wbmdcIixcbiAgXCIvYXNzZXRzL2JyaWNrLXllbGxvdy5wbmdcIixcbl07XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVCcmlja3MoKTogQnJpY2tbXSB7XG4gIGxldCB4ID0gSU5JVElBTF9TVEFSVF9CUklDS19MRUZUO1xuICBsZXQgeSA9IElOSVRJQUxfU1RBUlRfQlJJQ0tfUklHSFQ7XG5cbiAgY29uc3QgYnJpY2tzOiBCcmlja1tdID0gW107XG5cbiAgZm9yIChsZXQgcm93ID0gMDsgcm93IDwgQlJJQ0tfUk9XUzsgcm93KyspIHtcbiAgICBmb3IgKGxldCBjb2wgPSAwOyBjb2wgPCBCUklDS1NfQ09MUzsgY29sKyspIHtcbiAgICAgIGNvbnN0IHBvczogVmVjdG9yID0geyB4LCB5IH07XG5cbiAgICAgIGNvbnN0IHJhbmRQb3MgPSAoTWF0aC5yYW5kb20oKSAqIGJyaWNrc0ltYWdlLmxlbmd0aCkgfCAwO1xuICAgICAgY29uc3QgYnJpY2sgPSBuZXcgQnJpY2socG9zLCBicmlja3NJbWFnZVtyYW5kUG9zXSk7XG4gICAgICBicmlja3MucHVzaChicmljayk7XG4gICAgICB4ICs9IElOQ1JFTUVOVF9MRUZUX0JSSUNLO1xuICAgIH1cblxuICAgIHggPSBJTklUSUFMX1NUQVJUX0JSSUNLX0xFRlQ7XG4gICAgeSArPSBJTkNSRUVNTlRfRE9XTl9CUklDSztcbiAgfVxuICByZXR1cm4gYnJpY2tzO1xufVxuIiwiLy8gQlJJQ0tTXG5leHBvcnQgY29uc3QgQlJJQ0tfUk9XUyA9IDM7XG5leHBvcnQgY29uc3QgQlJJQ0tTX0NPTFMgPSAxMDtcbmV4cG9ydCBjb25zdCBCUklDS19XSURUSCA9IDEwMDtcbmV4cG9ydCBjb25zdCBCUklDS19IRUlHSFQgPSA0MDtcbmV4cG9ydCBjb25zdCBJTklUSUFMX1NUQVJUX0JSSUNLX0xFRlQgPSAxMDtcbmV4cG9ydCBjb25zdCBJTklUSUFMX1NUQVJUX0JSSUNLX1JJR0hUID0gMTA7XG5leHBvcnQgY29uc3QgSU5DUkVNRU5UX0xFRlRfQlJJQ0sgPSAxMjA7XG5leHBvcnQgY29uc3QgSU5DUkVFTU5UX0RPV05fQlJJQ0sgPSA2MDtcbmV4cG9ydCBjb25zdCBCUklDS1NfRU5EID0gMTcwO1xuXG4vLyBCT0FSRFxuZXhwb3J0IGNvbnN0IEJPQVJEX1dJRFRIID0gMTIwO1xuZXhwb3J0IGNvbnN0IEJPQVJEX0hFSUdIVCA9IDIwO1xuXG4vL0JBTExcbmV4cG9ydCBjb25zdCBCQUxMX1dJRFRIID0gNDA7XG5leHBvcnQgY29uc3QgQkFMTF9IRUlHSFQgPSA0MDtcbmV4cG9ydCBjb25zdCBJTklUSUFMX0JBTExfWCA9IDIwMDtcbmV4cG9ydCBjb25zdCBJTklUSUFMX0JBTExfWSA9IDIwMDtcbmV4cG9ydCBjb25zdCBCQUxMX0RJQU1FVEVSID0gNDA7XG5cbi8vTUlTQ0VMTEFORU9VU1xuZXhwb3J0IGNvbnN0IEJSSUNLX0JPTlVTX1BPSU5UUyA9IDEwO1xuXG4vLyBHQU1FXG5leHBvcnQgY29uc3QgRUFTWV9MRVZFbCA9IDM7XG5leHBvcnQgY29uc3QgTUVESVVNX0xFVkVMID0gNTtcbmV4cG9ydCBjb25zdCBIQVJEX0xFVkVMID0gODtcblxuZXhwb3J0IGNvbnN0IFNURVBfU0laRSA9IDIwOyIsImltcG9ydCB7IEVBU1lfTEVWRWwsIEhBUkRfTEVWRUwsIE1FRElVTV9MRVZFTCB9IGZyb20gXCIuL2NvbnN0YW50c1wiO1xuaW1wb3J0IHsgRE9NVmlldyB9IGZyb20gXCIuLi92aWV3L0RPTVZpZXdcIjtcblxuY29uc3QgZG9tID0gRE9NVmlldy5nZXRJbnN0YW5jZSgpO1xuXG5leHBvcnQgZnVuY3Rpb24gc2V0R2FtZUxldmVsKGlucHV0OiBIVE1MSW5wdXRFbGVtZW50KSB7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnaW5wdXQnKS5mb3JFYWNoKChpbnB1dCkgPT4ge1xuICAgICAgICBpbnB1dC5jaGVja2VkID0gZmFsc2U7XG4gICAgfSk7XG4gICAgaW5wdXQuY2hlY2tlZCA9IHRydWU7XG5cbiAgICBzd2l0Y2ggKGlucHV0LmlkKSB7XG4gICAgICAgIGNhc2UgXCJlYXN5XCI6XG4gICAgICAgICAgICByZXR1cm4gRUFTWV9MRVZFbDtcbiAgICAgICAgY2FzZSBcIm1lZGl1bVwiOlxuICAgICAgICAgICAgcmV0dXJuIE1FRElVTV9MRVZFTDtcbiAgICAgICAgY2FzZSBcImhhcmRcIjpcbiAgICAgICAgICAgIHJldHVybiBIQVJEX0xFVkVMO1xuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNob3dHYW1lT3Zlck1lc3NhZ2Uoc2NvcmVQb2ludHM6IG51bWJlcikge1xuICAgIGNvbnN0IGdhbWVvdmVyRGl2ID0gZG9tLmdldEVsZW1lbnQoXCIjZ2FtZU92ZXJcIik7XG5cbiAgICBnYW1lb3ZlckRpdi5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgIChnYW1lb3ZlckRpdiBhcyBIVE1MRGl2RWxlbWVudCkuaW5uZXJUZXh0ID0gYEdhbWUgb3Zlciwgc2NvcmU6JHtzY29yZVBvaW50c31gO1xuICB9IiwiaW1wb3J0IHsgQmFsbCB9IGZyb20gXCIuLi9maWd1cmVzL0JhbGxcIjtcbmltcG9ydCB7IENhbnZhc1ZpZXcgfSBmcm9tIFwiLi4vdmlldy9DYW52YXNWaWV3XCI7XG5pbXBvcnQge1xuICBCQUxMX0RJQU1FVEVSLFxuICBCT0FSRF9IRUlHSFQsXG4gIEJPQVJEX1dJRFRILFxuICBCUklDS1NfRU5EXG59IGZyb20gXCIuL2NvbnN0YW50c1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gaXNCYWxsSGl0dGluZ1RoZUxlZnRXYWxsKGJhbGw6IEJhbGwpIHtcbiAgcmV0dXJuIGJhbGwucG9zaXRpb24ueCA8PSAwO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNCYWxsSGl0dGluZ1JpZ2h0V2FsbChiYWxsLCBjYW52YXNWaWV3OiBDYW52YXNWaWV3KSB7XG4gIHJldHVybiBiYWxsLnBvc2l0aW9uLnggPiBjYW52YXNWaWV3LmNhbnZhcy53aWR0aCAtIEJBTExfRElBTUVURVI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0JhbGxIaXR0aW5nVGhlQ2VpbGluZyhiYWxsOiBCYWxsKSB7XG4gIHJldHVybiBiYWxsLnBvc2l0aW9uLnkgPD0gMDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzQmFsbEhpdHRpbmdUaGVGbG9vcihiYWxsOiBCYWxsLCBjYW52YXNWaWV3OiBDYW52YXNWaWV3KSB7XG4gIHJldHVybiBiYWxsLnBvc2l0aW9uLnkgPj0gY2FudmFzVmlldy5jYW52YXMuaGVpZ2h0IC0gQkFMTF9ESUFNRVRFUjtcbn1cbmV4cG9ydCBmdW5jdGlvbiBpc0JhbGxOZWFyQnJpY2tzKGJhbGw6IEJhbGwpIHtcbiAgcmV0dXJuIGJhbGwucG9zaXRpb24ueSA8IEJSSUNLU19FTkQ7XG59XG5leHBvcnQgZnVuY3Rpb24gaXNCYWxsQ29sbGlkaW5nV2l0aEJvYXJkKGJhbGwsIGJvYXJkKSB7XG4gIHJldHVybiAoXG4gICAgYmFsbC5wb3NpdGlvbi55ICsgQkFMTF9ESUFNRVRFUiAvIDIgPj0gYm9hcmQucG9zaXRpb24ueSAmJlxuICAgIGJhbGwucG9zaXRpb24ueSArIEJBTExfRElBTUVURVIgLyAyIDw9IGJvYXJkLnBvc2l0aW9uLnkgKyAxMCAmJlxuICAgIGJhbGwucG9zaXRpb24ueCAtIEJBTExfRElBTUVURVIgLyAyIDw9IGJvYXJkLnBvc2l0aW9uLnggKyBCT0FSRF9XSURUSCAmJlxuICAgIGJhbGwucG9zaXRpb24ueCArIEJBTExfRElBTUVURVIgLyAyID49IGJvYXJkLnBvc2l0aW9uLnhcbiAgKTtcbn1cbiIsImltcG9ydCB7IFZlY3RvciB9IGZyb20gXCIuLi91dGlscy92ZWN0b3JcIjtcbmltcG9ydCB7XG4gIEJSSUNLX1JPV1MsXG4gIEJSSUNLX1dJRFRILFxuICBCUklDS19IRUlHSFQsXG4gIEJPQVJEX1dJRFRILFxuICBCT0FSRF9IRUlHSFQsXG4gIEJBTExfRElBTUVURVIsXG59IGZyb20gXCIuLi91dGlscy9jb25zdGFudHNcIjtcbmltcG9ydCB7IEJhbGwgfSBmcm9tIFwiLi4vZmlndXJlcy9CYWxsXCI7XG5pbXBvcnQgeyBCcmljayB9IGZyb20gXCIuLi9maWd1cmVzL0JyaWNrXCI7XG5pbXBvcnQgeyBQYWRkbGUgfSBmcm9tIFwiLi4vZmlndXJlcy9QYWRkbGVcIjtcblxuZXhwb3J0IGNsYXNzIENhbnZhc1ZpZXcge1xuICBwcml2YXRlIGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEO1xuICBwdWJsaWMgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudDtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgY2FudmFzU2VsZWN0b3I6IHN0cmluZykge1xuICAgIHRoaXMuY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoY2FudmFzU2VsZWN0b3IpIGFzIEhUTUxDYW52YXNFbGVtZW50O1xuICAgIHRoaXMuY3R4ID0gdGhpcy5jYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuICB9XG5cbiAgZHJhd0ltYWdlKFxuICAgIHBvc2l0aW9uOiBWZWN0b3IsXG4gICAgaW1hZ2U6IEhUTUxJbWFnZUVsZW1lbnQsXG4gICAgd2lkdGg6IG51bWJlcixcbiAgICBoZWlnaHQ6IG51bWJlclxuICApIHtcbiAgICB0aGlzLmN0eC5kcmF3SW1hZ2UoaW1hZ2UsIHBvc2l0aW9uLngsIHBvc2l0aW9uLnksIHdpZHRoLCBoZWlnaHQpO1xuICB9XG5cbiAgZHJhd0JyaWNrcyhicmlja3M6IEJyaWNrW10pIHtcbiAgICBmb3IgKGxldCByID0gMDsgciA8IEJSSUNLX1JPV1M7IHIrKykge1xuICAgICAgZm9yIChsZXQgYyA9IDA7IGMgPCBicmlja3MubGVuZ3RoOyBjKyspIHtcbiAgICAgICAgY29uc3QgYnJpY2sgPSBicmlja3NbY107XG4gICAgICAgIGNvbnN0IHBvczogVmVjdG9yID0ge1xuICAgICAgICAgIHg6IGJyaWNrLnBvc2l0aW9uLngsXG4gICAgICAgICAgeTogYnJpY2sucG9zaXRpb24ueSxcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5kcmF3SW1hZ2UocG9zLCBicmljay5nZXRJbWFnZSgpLCBCUklDS19XSURUSCwgQlJJQ0tfSEVJR0hUKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBkcmF3QmFsbChiYWxsOiBCYWxsKSB7XG4gICAgdGhpcy5kcmF3SW1hZ2UoXG4gICAgICB7IHg6IGJhbGwucG9zaXRpb24ueCAtIEJBTExfRElBTUVURVIgLyAyLCB5OiBiYWxsLnBvc2l0aW9uLnkgLSBCQUxMX0RJQU1FVEVSIC8gMiB9LFxuICAgICAgYmFsbC5nZXRJbWFnZSgpLFxuICAgICAgQkFMTF9ESUFNRVRFUixcbiAgICAgIEJBTExfRElBTUVURVJcbiAgICApO1xuICB9XG5cbiAgZHJhd0JvYXJkKGJvYXJkOiBQYWRkbGUpIHtcbiAgICB0aGlzLmN0eC5iZWdpblBhdGgoKTtcbiAgICB0aGlzLmN0eC5kcmF3SW1hZ2UoXG4gICAgICBib2FyZC5nZXRJbWFnZSgpLFxuICAgICAgYm9hcmQucG9zaXRpb24ueCxcbiAgICAgIGJvYXJkLnBvc2l0aW9uLnksXG4gICAgICBCT0FSRF9XSURUSCxcbiAgICAgIEJPQVJEX0hFSUdIVFxuICAgICk7XG4gICAgdGhpcy5jdHguY2xvc2VQYXRoKCk7XG4gIH1cblxuICBnZXRDb250ZXh0KCk6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCB7XG4gICAgcmV0dXJuIHRoaXMuY3R4O1xuICB9XG59XG5cbmV4cG9ydCBjb25zdCBjYW52YXNWaWV3ID0gbmV3IENhbnZhc1ZpZXcoXCJnYW1lQ2FudmFzXCIpOyIsIlxuZXhwb3J0IHR5cGUgRE9NRWxlbWVudCA9IHN0cmluZyB8IE5vZGU7XG5cbmV4cG9ydCBpbnRlcmZhY2UgRE9NIHtcbiAgICBjcmVhdGVFbGVtZW50KHR5cGU6IHN0cmluZywgYXR0cmlidXRlczogb2JqZWN0LCAuLi5jb250ZW50OiBET01FbGVtZW50W10pIDogSFRNTEVsZW1lbnQ7XG5cbiAgICBhZGRFbGVtZW50KGFwcGVuZFRvOiBzdHJpbmcsIGVsZW1lbnQ6IEhUTUxFbGVtZW50KSA6IHZvaWQ7XG5cbiAgICBnZXRFbGVtZW50KHNlbGVjdG9yOiBzdHJpbmcpIDogYW55O1xuXG4gICAgZGVsZXRlRWxlbWVudChzZWxlY3Rvcjogc3RyaW5nKSA6IHZvaWQ7XG59XG5cbmV4cG9ydCBjbGFzcyBET01WaWV3IGltcGxlbWVudHMgRE9NIHtcbiAgICBwcml2YXRlIHN0YXRpYyBpbnN0YW5jZTogRE9NVmlldztcblxuICAgIHByaXZhdGUgY29uc3RydWN0b3IoKSB7XG4gICAgfVxuXG4gICAgc3RhdGljIGdldEluc3RhbmNlKCk6IERPTVZpZXcge1xuICAgICAgICBpZiAoIXRoaXMuaW5zdGFuY2UpIHtcbiAgICAgICAgICAgIHRoaXMuaW5zdGFuY2UgPSBuZXcgRE9NVmlldygpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlO1xuICAgIH1cblxuICAgIC8qKlxuICAqIFRoaXMgZnVuY3Rpb24gY2Fubm90IGNyZWF0ZSBhIHRhYmxlXG4gICogQHBhcmFtIHsgc3RyaW5nIH0gdHlwZVxuICAqIEBwYXJhbSB7IE9iamVjdCB9IGF0dHJpYnV0ZXNcbiAgKiBAcGFyYW0gIHsgLi4uKHN0cmluZyB8IE5vZGUpIH0gY29udGVudCBcbiAgKiBAcmV0dXJucyB7IEhUTUxFbGVtZW50IH0gUmV0dXJucyB0aGUgY3JlYXRlZCBlbGVtZW50XG4gICovXG4gICAgY3JlYXRlRWxlbWVudCh0eXBlOiBzdHJpbmcsIGF0dHJpYnV0ZXM6IG9iamVjdCwgLi4uY29udGVudDogRE9NRWxlbWVudFtdKSA6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodHlwZSk7XG5cbiAgICAgICAgaWYgKGF0dHJpYnV0ZXMpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGF0dHJpYnV0ZSBpbiBhdHRyaWJ1dGVzKSB7XG4gICAgICAgICAgICAgICAgaWYgKGF0dHJpYnV0ZS5zdGFydHNXaXRoKCdvbicpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGV2ZW50TmFtZSA9IGF0dHJpYnV0ZS5zbGljZSgyKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBhdHRyaWJ1dGVzW2F0dHJpYnV0ZV0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnRbYXR0cmlidXRlXSA9IGF0dHJpYnV0ZXNbYXR0cmlidXRlXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGxldCBpdGVtIG9mIGNvbnRlbnQpIHtcbiAgICAgICAgICAgIGVsZW1lbnQuYXBwZW5kKGl0ZW0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGVsZW1lbnQ7XG4gICAgfVxuXG4gICAgYWRkRWxlbWVudChhcHBlbmRUbzogc3RyaW5nLCBlbGVtZW50OiBIVE1MRWxlbWVudCkge1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGFwcGVuZFRvKS5hcHBlbmQoZWxlbWVudCk7XG4gICAgfVxuICAgIFxuICAgIGdldEVsZW1lbnQoc2VsZWN0b3I6IHN0cmluZyk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgbGV0IHZhbHVlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3RvcikgYXMgSFRNTEVsZW1lbnQ7XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG4gICAgZGVsZXRlRWxlbWVudChzZWxlY3Rvcjogc3RyaW5nKSB7XG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcbiAgICAgICAgZWxlbWVudC5yZW1vdmUoKTtcbiAgICB9XG5cbiAgICBhZGRIYW5kbGVyKGV2ZW50OiBzdHJpbmcsIGNhbGxiYWNrOiBFdmVudExpc3RlbmVyKSB7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIGNhbGxiYWNrKTtcbiAgICB9XG59IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9hcHAudHNcIik7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=