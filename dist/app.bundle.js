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
/* harmony export */   "showGameOverMessage": () => (/* binding */ showGameOverMessage),
/* harmony export */   "update": () => (/* binding */ update)
/* harmony export */ });
/* harmony import */ var _figures_Ball__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./figures/Ball */ "./src/figures/Ball.ts");
/* harmony import */ var _figures_Paddle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./figures/Paddle */ "./src/figures/Paddle.ts");
/* harmony import */ var _Geometry_Vector__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Geometry/Vector */ "./src/Geometry/Vector.ts");
/* harmony import */ var _physics_movement__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./physics/movement */ "./src/physics/movement.ts");
/* harmony import */ var _utils_brickFactory__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/brickFactory */ "./src/utils/brickFactory.ts");
/* harmony import */ var _utils_constants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils/constants */ "./src/utils/constants.ts");
/* harmony import */ var _utils_validators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./utils/validators */ "./src/utils/validators.ts");
/* harmony import */ var _view_CanvasView__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./view/CanvasView */ "./src/view/CanvasView.ts");
/* harmony import */ var _physics_misc__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./physics/misc */ "./src/physics/misc.ts");
/* harmony import */ var _engine_gameLoop__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./engine/gameLoop */ "./src/engine/gameLoop.ts");










const canvasView = new _view_CanvasView__WEBPACK_IMPORTED_MODULE_7__.CanvasView("gameCanvas");
const gameoverDiv = document.getElementById("gameOver");
let lastTime = 0;
let elapsed = 0;
const STEP_SIZE = 20;
const boardImg = document.getElementById("board");
const boardPosition = new _Geometry_Vector__WEBPACK_IMPORTED_MODULE_2__.Vector(canvasView.canvas.width / 2, canvasView.canvas.height - 100);
let bricks = (0,_utils_brickFactory__WEBPACK_IMPORTED_MODULE_4__.createBricks)();
let boardVelocity = new _Geometry_Vector__WEBPACK_IMPORTED_MODULE_2__.Vector(0, 0);
let board = new _figures_Paddle__WEBPACK_IMPORTED_MODULE_1__.Paddle(boardPosition, boardImg, boardVelocity);
const ballPosition = new _Geometry_Vector__WEBPACK_IMPORTED_MODULE_2__.Vector(_utils_constants__WEBPACK_IMPORTED_MODULE_5__.INITIAL_BALL_X, _utils_constants__WEBPACK_IMPORTED_MODULE_5__.INITIAL_BALL_Y);
let ballVelocity = new _Geometry_Vector__WEBPACK_IMPORTED_MODULE_2__.Vector(3, 3);
let ball = new _figures_Ball__WEBPACK_IMPORTED_MODULE_0__.Ball(ballPosition, "/assets/ball.png", ballVelocity);
const input = {};
let gameOver = false;
let scorePoints = 0;
let isMouseActive = true;
window.addEventListener("keydown", (event) => {
    input[event.code] = true;
});
window.addEventListener("keyup", (event) => {
    input[event.code] = false;
});
document.addEventListener('mousemove', (e) => {
    if (isMouseActive)
        board.position.x = e.clientX;
});
window.oncontextmenu = (e) => {
    e.preventDefault();
    console.log("right clicked");
    isMouseActive = false;
};
const playBtn = document.getElementById('play-btn');
let isPlayMusic = false;
document.getElementById("new-game").addEventListener("click", () => {
    gameOver = false;
    startGame();
    gameoverDiv.style.display = "none";
});
playBtn.addEventListener("click", () => {
    document.getElementById("container").style.display = "none";
    document.getElementById("gameCanvas").style.display = "block";
    const detailsBox = document.getElementById("details-box");
    detailsBox.style.display = "flex";
    detailsBox.style.justifyContent = "space-around";
    startGame();
    if (isPlayMusic) {
        const music = new Audio("../assets/music.mp3");
        music.volume = 0.1;
        music.play();
    }
});
document.getElementById("setting-btn").addEventListener("click", () => {
    const settingsContainer = document.getElementById("settings-container");
    const container = document.getElementById("container");
    settingsContainer.style.display = "block";
    container.style.display = "none";
    document.getElementById("back-btn").addEventListener("click", () => {
        settingsContainer.style.display = "none";
        container.style.display = "block";
    });
    document.getElementById("play-sound-btn").addEventListener("click", () => {
        isPlayMusic = true;
        document.querySelector(".gg-check").style.display =
            "block";
    });
});
function startGame() {
    bricks = (0,_utils_brickFactory__WEBPACK_IMPORTED_MODULE_4__.createBricks)();
    board = new _figures_Paddle__WEBPACK_IMPORTED_MODULE_1__.Paddle(boardPosition, boardImg);
    const ballPosition = new _Geometry_Vector__WEBPACK_IMPORTED_MODULE_2__.Vector(_utils_constants__WEBPACK_IMPORTED_MODULE_5__.INITIAL_BALL_X, _utils_constants__WEBPACK_IMPORTED_MODULE_5__.INITIAL_BALL_Y);
    ball = new _figures_Ball__WEBPACK_IMPORTED_MODULE_0__.Ball(ballPosition, "/assets/ball.png");
    ball.velocity = new _Geometry_Vector__WEBPACK_IMPORTED_MODULE_2__.Vector(3, 3);
    scorePoints = 0;
    update(performance.now());
}
function update(time) {
    const delta = time - lastTime;
    lastTime = time;
    elapsed += delta;
    let deleteBrickIndex = (0,_utils_validators__WEBPACK_IMPORTED_MODULE_6__.isBallNearBricks)(ball) ? (0,_physics_misc__WEBPACK_IMPORTED_MODULE_8__.getHitBrickIndex)(bricks, ball) : -1;
    if (deleteBrickIndex != -1) {
        const brick = bricks[deleteBrickIndex];
        (0,_physics_movement__WEBPACK_IMPORTED_MODULE_3__.changeBallDirection)(ball, brick);
        bricks.splice(deleteBrickIndex, 1);
        scorePoints += _utils_constants__WEBPACK_IMPORTED_MODULE_5__.BRICK_BONUS_POINTS;
    }
    if (elapsed > STEP_SIZE * 5) {
        elapsed = STEP_SIZE * 5;
    }
    while (elapsed > STEP_SIZE) {
        elapsed -= STEP_SIZE;
        const loop = _engine_gameLoop__WEBPACK_IMPORTED_MODULE_9__.gameLoop.bind(null, ball, board, bricks, canvasView, gameOver);
        loop();
        document["newgame"] = true;
    }
    if (bricks.length && !gameOver) {
        requestAnimationFrame(update);
    }
}
function showGameOverMessage() {
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
/* harmony export */   "collisionDetector": () => (/* binding */ collisionDetector),
/* harmony export */   "gameLoop": () => (/* binding */ gameLoop)
/* harmony export */ });
/* harmony import */ var _view_CanvasView__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../view/CanvasView */ "./src/view/CanvasView.ts");
/* harmony import */ var _move__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./move */ "./src/engine/move.ts");
/* harmony import */ var _utils_constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/constants */ "./src/utils/constants.ts");
/* harmony import */ var _utils_validators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/validators */ "./src/utils/validators.ts");
/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../app */ "./src/app.ts");
/* harmony import */ var _physics_movement__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../physics/movement */ "./src/physics/movement.ts");






const canvasView = new _view_CanvasView__WEBPACK_IMPORTED_MODULE_0__.CanvasView("gameCanvas");
const input = {};
window.addEventListener("keydown", (event) => {
    input[event.code] = true;
});
window.addEventListener("keyup", (event) => {
    input[event.code] = false;
});
//todo-ball, board, bricks->gameObjects{}
function gameLoop(ball, board, bricks, canvasView, gameOver) {
    if (input['ArrowLeft'] && (board.position.x > 0)) {
        board.velocity.x = -7;
        (0,_move__WEBPACK_IMPORTED_MODULE_1__.move)(board, board.velocity);
    }
    else if (input['ArrowRight'] && (board.position.x + _utils_constants__WEBPACK_IMPORTED_MODULE_2__.BOARD_WIDTH < canvasView.canvas.width)) {
        board.velocity.x = 7;
        (0,_move__WEBPACK_IMPORTED_MODULE_1__.move)(board, board.velocity);
    }
    canvasView.getContext().clearRect(0, 0, canvasView.canvas.width, canvasView.canvas.height);
    canvasView.drawBricks(bricks);
    canvasView.drawBoard(board);
    canvasView.drawBall(ball);
    collisionDetector(ball, board, gameOver);
    (0,_move__WEBPACK_IMPORTED_MODULE_1__.move)(ball, ball.velocity);
}
function collisionDetector(ball, board, gameOver) {
    if ((0,_utils_validators__WEBPACK_IMPORTED_MODULE_3__.isBallCollidingWithBoard)(ball, board)) {
        (0,_physics_movement__WEBPACK_IMPORTED_MODULE_5__.handleBoardHit)(ball, board);
    }
    if ((0,_utils_validators__WEBPACK_IMPORTED_MODULE_3__.isBallHittingTheFloor)(ball, canvasView)) {
        gameOver = true;
        (0,_app__WEBPACK_IMPORTED_MODULE_4__.showGameOverMessage)();
    }
    else if ((0,_utils_validators__WEBPACK_IMPORTED_MODULE_3__.isBallHittingTheCeiling)(ball)) {
        ball.velocity.y = Math.abs(ball.velocity.y);
    }
    else if ((0,_utils_validators__WEBPACK_IMPORTED_MODULE_3__.isBallHittingRightWall)(ball, canvasView)) {
        ball.velocity.x = -ball.velocity.x;
    }
    else if ((0,_utils_validators__WEBPACK_IMPORTED_MODULE_3__.isBallHittingTheLeftWall)(ball)) {
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
function move(gameObject, velocity) {
    gameObject.position.x += velocity.x;
    gameObject.position.y += velocity.y;
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
    const currentAngle = Math.atan2(ball.position.y, ball.position.x);
    const deltaCenterX = ball.position.x - (board.position.x - _utils_constants__WEBPACK_IMPORTED_MODULE_0__.BOARD_WIDTH / 2);
    const sign = ball.position.x > board.position.x + _utils_constants__WEBPACK_IMPORTED_MODULE_0__.BOARD_WIDTH / 2 ? 1 : -1;
    const coeff = sign * (ball.position.x) / (_utils_constants__WEBPACK_IMPORTED_MODULE_0__.BOARD_WIDTH / 2);
    const angleToAdd = Math.PI / 20;
    const nextAngle = coeff * angleToAdd + currentAngle;
    const yOffset = 5;
    if (nextAngle < 2 * Math.PI / 3 && nextAngle > Math.PI / 20) {
        ball.velocity.x = 7 * Math.sin(nextAngle);
        ball.velocity.y = 7 * Math.cos(nextAngle);
    }
    else {
        ball.velocity.y = -ball.velocity.y;
    }
    ball.position.y -= yOffset;
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
/* harmony export */   "INCREEMNT_DOWN_BRICK": () => (/* binding */ INCREEMNT_DOWN_BRICK),
/* harmony export */   "INCREMENT_LEFT_BRICK": () => (/* binding */ INCREMENT_LEFT_BRICK),
/* harmony export */   "INITIAL_BALL_X": () => (/* binding */ INITIAL_BALL_X),
/* harmony export */   "INITIAL_BALL_Y": () => (/* binding */ INITIAL_BALL_Y),
/* harmony export */   "INITIAL_START_BRICK_LEFT": () => (/* binding */ INITIAL_START_BRICK_LEFT),
/* harmony export */   "INITIAL_START_BRICK_RIGHT": () => (/* binding */ INITIAL_START_BRICK_RIGHT)
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
    console.log(ball.position.y + _constants__WEBPACK_IMPORTED_MODULE_0__.BALL_DIAMETER / 2 <= board.position.y + _constants__WEBPACK_IMPORTED_MODULE_0__.BOARD_HEIGHT);
    console.log(ball.position.y + _constants__WEBPACK_IMPORTED_MODULE_0__.BALL_DIAMETER / 2 >= board.position.y);
    console.log(ball.position.x <= board.position.x + _constants__WEBPACK_IMPORTED_MODULE_0__.BOARD_WIDTH);
    console.log(ball.position.x >= board.position.x - _constants__WEBPACK_IMPORTED_MODULE_0__.BALL_DIAMETER);
    return (ball.position.y + _constants__WEBPACK_IMPORTED_MODULE_0__.BALL_DIAMETER / 2 <= board.position.y &&
        ball.position.y + _constants__WEBPACK_IMPORTED_MODULE_0__.BALL_DIAMETER / 2 >= board.position.y - 20 &&
        ball.position.x - _constants__WEBPACK_IMPORTED_MODULE_0__.BALL_DIAMETER / 2 <= board.position.x + _constants__WEBPACK_IMPORTED_MODULE_0__.BOARD_WIDTH &&
        ball.position.x + _constants__WEBPACK_IMPORTED_MODULE_0__.BALL_DIAMETER / 4 >= board.position.x);
}


/***/ }),

/***/ "./src/view/CanvasView.ts":
/*!********************************!*\
  !*** ./src/view/CanvasView.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CanvasView": () => (/* binding */ CanvasView)
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
        this.drawImage(ball.position, ball.getImage(), _utils_constants__WEBPACK_IMPORTED_MODULE_0__.BALL_DIAMETER, _utils_constants__WEBPACK_IMPORTED_MODULE_0__.BALL_DIAMETER);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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WSxDQUFDLENBQUM7YUFDbEU7U0FDRjtJQUNILENBQUM7SUFFRCxRQUFRLENBQUMsSUFBVTtRQUNqQixJQUFJLENBQUMsU0FBUyxDQUNaLElBQUksQ0FBQyxRQUFRLEVBQ2IsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUNmLDJEQUFhLEVBQ2IsMkRBQWEsQ0FDZCxDQUFDO0lBQ0osQ0FBQztJQUVELFNBQVMsQ0FBQyxLQUFhO1FBQ3JCLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDckIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQ2hCLEtBQUssQ0FBQyxRQUFRLEVBQUUsRUFDaEIsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQ2hCLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUNoQix5REFBVyxFQUNYLDBEQUFZLENBQ2IsQ0FBQztRQUNGLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDdkIsQ0FBQztJQUVELFVBQVU7UUFDUixPQUFPLElBQUksQ0FBQyxHQUFHLENBQUM7SUFDbEIsQ0FBQztDQUNGOzs7Ozs7O1VDcEVEO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztVRU5BO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYnVkZ2V0ZWVyLXRzLy4vc3JjL0dlb21ldHJ5L1ZlY3Rvci50cyIsIndlYnBhY2s6Ly9idWRnZXRlZXItdHMvLi9zcmMvYXBwLnRzIiwid2VicGFjazovL2J1ZGdldGVlci10cy8uL3NyYy9lbmdpbmUvZ2FtZUxvb3AudHMiLCJ3ZWJwYWNrOi8vYnVkZ2V0ZWVyLXRzLy4vc3JjL2VuZ2luZS9tb3ZlLnRzIiwid2VicGFjazovL2J1ZGdldGVlci10cy8uL3NyYy9maWd1cmVzL0JhbGwudHMiLCJ3ZWJwYWNrOi8vYnVkZ2V0ZWVyLXRzLy4vc3JjL2ZpZ3VyZXMvQnJpY2sudHMiLCJ3ZWJwYWNrOi8vYnVkZ2V0ZWVyLXRzLy4vc3JjL2ZpZ3VyZXMvUGFkZGxlLnRzIiwid2VicGFjazovL2J1ZGdldGVlci10cy8uL3NyYy9waHlzaWNzL21pc2MudHMiLCJ3ZWJwYWNrOi8vYnVkZ2V0ZWVyLXRzLy4vc3JjL3BoeXNpY3MvbW92ZW1lbnQudHMiLCJ3ZWJwYWNrOi8vYnVkZ2V0ZWVyLXRzLy4vc3JjL3V0aWxzL2JyaWNrRmFjdG9yeS50cyIsIndlYnBhY2s6Ly9idWRnZXRlZXItdHMvLi9zcmMvdXRpbHMvY29uc3RhbnRzLnRzIiwid2VicGFjazovL2J1ZGdldGVlci10cy8uL3NyYy91dGlscy92YWxpZGF0b3JzLnRzIiwid2VicGFjazovL2J1ZGdldGVlci10cy8uL3NyYy92aWV3L0NhbnZhc1ZpZXcudHMiLCJ3ZWJwYWNrOi8vYnVkZ2V0ZWVyLXRzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2J1ZGdldGVlci10cy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYnVkZ2V0ZWVyLXRzL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYnVkZ2V0ZWVyLXRzL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYnVkZ2V0ZWVyLXRzL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vYnVkZ2V0ZWVyLXRzL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9idWRnZXRlZXItdHMvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBvaW50IH0gZnJvbSBcIi4vSW50ZXJmYWNlc1wiO1xuXG5leHBvcnQgY2xhc3MgVmVjdG9yIGltcGxlbWVudHMgUG9pbnQge1xuICB4OiBudW1iZXI7XG4gIHk6IG51bWJlcjtcblxuICBjb25zdHJ1Y3RvcihwOiBQb2ludCk7XG4gIGNvbnN0cnVjdG9yKHg6IG51bWJlciwgeTogbnVtYmVyKTtcbiAgY29uc3RydWN0b3IoeE9yUG9pbnQ6IG51bWJlciB8IFBvaW50LCB5PzogbnVtYmVyKSB7XG4gICAgaWYgKHR5cGVvZiB4T3JQb2ludCA9PSBcIm51bWJlclwiICYmIHR5cGVvZiB5ID09IFwibnVtYmVyXCIpIHtcbiAgICAgIHRoaXMueCA9IHhPclBvaW50O1xuICAgICAgdGhpcy55ID0geTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiB4T3JQb2ludCA9PSBcIm9iamVjdFwiKSB7XG4gICAgICB0aGlzLnggPSB4T3JQb2ludC54O1xuICAgICAgdGhpcy55ID0geE9yUG9pbnQueTtcbiAgICB9XG4gIH1cblxuICBhZGQocDogUG9pbnQpIHtcbiAgICB0aGlzLnggKz0gcC54O1xuICAgIHRoaXMueSArPSBwLnk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBzY2FsZShzOiBudW1iZXIpIHtcbiAgICB0aGlzLnggKj0gcztcbiAgICB0aGlzLnkgKj0gcztcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgZGlzdChwOiBQb2ludCkge1xuICAgIGNvbnN0IGR4ID0gdGhpcy54IC0gcC54O1xuICAgIGNvbnN0IGR5ID0gdGhpcy55IC0gcC55O1xuICAgIHJldHVybiBNYXRoLnNxcnQoZHggKiogMiArIGR5ICoqIDIpO1xuICB9XG5cbiAgc3FMZW5ndGgoKSB7XG4gICAgcmV0dXJuIHRoaXMueCAqKiAyICsgdGhpcy55ICoqIDI7XG4gIH1cblxuICBzdGF0aWMgYWRkKHAxOiBQb2ludCwgcDI6IFBvaW50KSB7XG4gICAgcmV0dXJuIG5ldyBWZWN0b3IocDEueCArIHAyLngsIHAxLnkgKyBwMi55KTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQmFsbCB9IGZyb20gXCIuL2ZpZ3VyZXMvQmFsbFwiO1xuaW1wb3J0IHsgUGFkZGxlIH0gZnJvbSBcIi4vZmlndXJlcy9QYWRkbGVcIjtcbmltcG9ydCB7IFZlY3RvciB9IGZyb20gXCIuL0dlb21ldHJ5L1ZlY3RvclwiO1xuaW1wb3J0IHsgY2hhbmdlQmFsbERpcmVjdGlvbiB9IGZyb20gXCIuL3BoeXNpY3MvbW92ZW1lbnRcIjtcbmltcG9ydCB7IGNyZWF0ZUJyaWNrcyB9IGZyb20gXCIuL3V0aWxzL2JyaWNrRmFjdG9yeVwiO1xuaW1wb3J0IHtcbiAgICBJTklUSUFMX0JBTExfWCwgSU5JVElBTF9CQUxMX1ksIEJSSUNLX0JPTlVTX1BPSU5UUyxcbn0gZnJvbSBcIi4vdXRpbHMvY29uc3RhbnRzXCI7XG5pbXBvcnQge1xuICAgIGlzQmFsbE5lYXJCcmlja3Ncbn0gZnJvbSBcIi4vdXRpbHMvdmFsaWRhdG9yc1wiO1xuaW1wb3J0IHsgQ2FudmFzVmlldyB9IGZyb20gXCIuL3ZpZXcvQ2FudmFzVmlld1wiO1xuaW1wb3J0IHsgZ2V0SGl0QnJpY2tJbmRleCB9IGZyb20gXCIuL3BoeXNpY3MvbWlzY1wiO1xuaW1wb3J0IHsgZ2FtZUxvb3AgfSBmcm9tIFwiLi9lbmdpbmUvZ2FtZUxvb3BcIjtcblxuY29uc3QgY2FudmFzVmlldyA9IG5ldyBDYW52YXNWaWV3KFwiZ2FtZUNhbnZhc1wiKTtcbmNvbnN0IGdhbWVvdmVyRGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJnYW1lT3ZlclwiKTtcbmxldCBsYXN0VGltZSA9IDA7XG5sZXQgZWxhcHNlZCA9IDA7XG5jb25zdCBTVEVQX1NJWkUgPSAyMDtcbmNvbnN0IGJvYXJkSW1nID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJib2FyZFwiKSBhcyBIVE1MSW1hZ2VFbGVtZW50O1xuY29uc3QgYm9hcmRQb3NpdGlvbiA9IG5ldyBWZWN0b3IoXG4gIGNhbnZhc1ZpZXcuY2FudmFzLndpZHRoIC8gMixcbiAgY2FudmFzVmlldy5jYW52YXMuaGVpZ2h0IC0gMTAwXG4pO1xubGV0IGJyaWNrcyA9IGNyZWF0ZUJyaWNrcygpO1xubGV0IGJvYXJkVmVsb2NpdHkgPSBuZXcgVmVjdG9yKDAsIDApO1xubGV0IGJvYXJkID0gbmV3IFBhZGRsZShib2FyZFBvc2l0aW9uLCBib2FyZEltZywgYm9hcmRWZWxvY2l0eSk7XG5jb25zdCBiYWxsUG9zaXRpb24gPSBuZXcgVmVjdG9yKElOSVRJQUxfQkFMTF9YLCBJTklUSUFMX0JBTExfWSk7XG5sZXQgYmFsbFZlbG9jaXR5ID0gbmV3IFZlY3RvcigzLCAzKTtcbmxldCBiYWxsID0gbmV3IEJhbGwoYmFsbFBvc2l0aW9uLCBcIi9hc3NldHMvYmFsbC5wbmdcIiwgYmFsbFZlbG9jaXR5KTtcbmNvbnN0IGlucHV0OiB7IFtjb2RlOiBzdHJpbmddOiBib29sZWFuIH0gPSB7fTtcblxubGV0IGdhbWVPdmVyID0gZmFsc2U7XG5sZXQgc2NvcmVQb2ludHMgPSAwO1xubGV0IGlzTW91c2VBY3RpdmUgPSB0cnVlO1xuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgKGV2ZW50KSA9PiB7XG4gIGlucHV0W2V2ZW50LmNvZGVdID0gdHJ1ZTtcbn0pO1xud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCAoZXZlbnQpID0+IHtcbiAgaW5wdXRbZXZlbnQuY29kZV0gPSBmYWxzZTtcbn0pO1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCAoZSkgPT4ge1xuICAgIGlmIChpc01vdXNlQWN0aXZlKVxuICAgICAgICBib2FyZC5wb3NpdGlvbi54ID0gZS5jbGllbnRYO1xufSlcblxud2luZG93Lm9uY29udGV4dG1lbnUgPSAoZSkgPT4ge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBjb25zb2xlLmxvZyhcInJpZ2h0IGNsaWNrZWRcIik7XG4gICAgaXNNb3VzZUFjdGl2ZSA9IGZhbHNlO1xufVxuY29uc3QgcGxheUJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbGF5LWJ0bicpO1xubGV0IGlzUGxheU11c2ljID0gZmFsc2U7XG5cbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibmV3LWdhbWVcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBnYW1lT3ZlciA9IGZhbHNlO1xuICAgIHN0YXJ0R2FtZSgpO1xuICAgIGdhbWVvdmVyRGl2LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIlxufSk7XG5wbGF5QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29udGFpbmVyXCIpLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJnYW1lQ2FudmFzXCIpLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gIGNvbnN0IGRldGFpbHNCb3ggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRldGFpbHMtYm94XCIpO1xuICBkZXRhaWxzQm94LnN0eWxlLmRpc3BsYXkgPSBcImZsZXhcIjtcbiAgZGV0YWlsc0JveC5zdHlsZS5qdXN0aWZ5Q29udGVudCA9IFwic3BhY2UtYXJvdW5kXCI7XG5cbiAgc3RhcnRHYW1lKCk7XG5cbiAgaWYgKGlzUGxheU11c2ljKSB7XG4gICAgY29uc3QgbXVzaWMgPSBuZXcgQXVkaW8oXCIuLi9hc3NldHMvbXVzaWMubXAzXCIpO1xuICAgIG11c2ljLnZvbHVtZSA9IDAuMTtcbiAgICBtdXNpYy5wbGF5KCk7XG4gIH1cbn0pO1xuXG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNldHRpbmctYnRuXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gIGNvbnN0IHNldHRpbmdzQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzZXR0aW5ncy1jb250YWluZXJcIik7XG4gIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29udGFpbmVyXCIpO1xuICBzZXR0aW5nc0NvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICBjb250YWluZXIuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJhY2stYnRuXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgc2V0dGluZ3NDb250YWluZXIuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgIGNvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICB9KTtcblxuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBsYXktc291bmQtYnRuXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgaXNQbGF5TXVzaWMgPSB0cnVlO1xuICAgIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmdnLWNoZWNrXCIpIGFzIEhUTUxFbGVtZW50KS5zdHlsZS5kaXNwbGF5ID1cbiAgICAgIFwiYmxvY2tcIjtcbiAgfSk7XG59KTtcblxuZnVuY3Rpb24gc3RhcnRHYW1lKCkge1xuICBicmlja3MgPSBjcmVhdGVCcmlja3MoKTtcbiAgYm9hcmQgPSBuZXcgUGFkZGxlKGJvYXJkUG9zaXRpb24sIGJvYXJkSW1nKTtcbiAgY29uc3QgYmFsbFBvc2l0aW9uID0gbmV3IFZlY3RvcihJTklUSUFMX0JBTExfWCwgSU5JVElBTF9CQUxMX1kpO1xuICBiYWxsID0gbmV3IEJhbGwoYmFsbFBvc2l0aW9uLCBcIi9hc3NldHMvYmFsbC5wbmdcIik7XG4gIGJhbGwudmVsb2NpdHkgPSBuZXcgVmVjdG9yKDMsIDMpO1xuICBzY29yZVBvaW50cyA9IDA7XG4gIHVwZGF0ZShwZXJmb3JtYW5jZS5ub3coKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGUodGltZTogbnVtYmVyKSB7XG4gICAgY29uc3QgZGVsdGEgPSB0aW1lIC0gbGFzdFRpbWU7XG4gICAgbGFzdFRpbWUgPSB0aW1lO1xuICAgIGVsYXBzZWQgKz0gZGVsdGE7XG4gICAgbGV0IGRlbGV0ZUJyaWNrSW5kZXggPSBpc0JhbGxOZWFyQnJpY2tzKGJhbGwpID8gZ2V0SGl0QnJpY2tJbmRleChicmlja3MsIGJhbGwpIDogLTE7XG4gICAgaWYgKGRlbGV0ZUJyaWNrSW5kZXggIT0gLTEpIHtcbiAgICAgICAgY29uc3QgYnJpY2sgPSBicmlja3NbZGVsZXRlQnJpY2tJbmRleF07XG4gICAgICAgIGNoYW5nZUJhbGxEaXJlY3Rpb24oYmFsbCwgYnJpY2spO1xuICAgICAgICBicmlja3Muc3BsaWNlKGRlbGV0ZUJyaWNrSW5kZXgsIDEpO1xuICAgICAgICBzY29yZVBvaW50cyArPSBCUklDS19CT05VU19QT0lOVFM7XG4gICAgfVxuICAgIGlmIChlbGFwc2VkID4gU1RFUF9TSVpFICogNSkge1xuICAgICAgICBlbGFwc2VkID0gU1RFUF9TSVpFICogNTtcbiAgICB9XG4gICAgd2hpbGUgKGVsYXBzZWQgPiBTVEVQX1NJWkUpIHtcbiAgICAgICAgZWxhcHNlZCAtPSBTVEVQX1NJWkU7XG4gICAgICAgIGNvbnN0IGxvb3AgPSBnYW1lTG9vcC5iaW5kKG51bGwsIGJhbGwsIGJvYXJkLCBicmlja3MsIGNhbnZhc1ZpZXcsIGdhbWVPdmVyKTtcbiAgICAgICAgbG9vcCgpO1xuICAgICAgICBkb2N1bWVudFtcIm5ld2dhbWVcIl0gPSB0cnVlO1xuICAgIH1cbiAgICBpZiAoYnJpY2tzLmxlbmd0aCAmJiAhZ2FtZU92ZXIpIHtcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHVwZGF0ZSk7XG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gc2hvd0dhbWVPdmVyTWVzc2FnZSgpIHtcbiAgICBnYW1lb3ZlckRpdi5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgIChnYW1lb3ZlckRpdiBhcyBIVE1MRGl2RWxlbWVudCkuaW5uZXJUZXh0ID0gYEdhbWUgb3Zlciwgc2NvcmU6JHtzY29yZVBvaW50c31gO1xufVxuIiwiaW1wb3J0IHsgQ2FudmFzVmlldyB9IGZyb20gXCIuLi92aWV3L0NhbnZhc1ZpZXdcIjtcbmltcG9ydCB7IFBhZGRsZSB9IGZyb20gXCIuLi9maWd1cmVzL1BhZGRsZVwiO1xuaW1wb3J0IHsgQmFsbCB9IGZyb20gXCIuLi9maWd1cmVzL0JhbGxcIjtcbmltcG9ydCB7IG1vdmUgfSBmcm9tIFwiLi9tb3ZlXCI7XG5pbXBvcnQge1xuICBCT0FSRF9XSURUSCxcbn0gZnJvbSBcIi4uL3V0aWxzL2NvbnN0YW50c1wiO1xuaW1wb3J0IHtcbiAgICBpc0JhbGxIaXR0aW5nVGhlRmxvb3IsIGlzQmFsbEhpdHRpbmdUaGVDZWlsaW5nLCBpc0JhbGxIaXR0aW5nUmlnaHRXYWxsLFxuICAgIGlzQmFsbEhpdHRpbmdUaGVMZWZ0V2FsbCwgIGlzQmFsbENvbGxpZGluZ1dpdGhCb2FyZFxufSBmcm9tIFwiLi4vdXRpbHMvdmFsaWRhdG9yc1wiO1xuaW1wb3J0IHsgc2hvd0dhbWVPdmVyTWVzc2FnZSB9IGZyb20gXCIuLi9hcHBcIjtcbmltcG9ydCB7IGhhbmRsZUJvYXJkSGl0IH0gZnJvbSBcIi4uL3BoeXNpY3MvbW92ZW1lbnRcIjtcblxuY29uc3QgY2FudmFzVmlldyA9IG5ldyBDYW52YXNWaWV3KFwiZ2FtZUNhbnZhc1wiKTtcblxuY29uc3QgaW5wdXQ6IHsgW2NvZGU6IHN0cmluZ106IGJvb2xlYW4gfSA9IHt9O1xuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgKGV2ZW50KSA9PiB7XG4gIGlucHV0W2V2ZW50LmNvZGVdID0gdHJ1ZTtcbn0pO1xud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCAoZXZlbnQpID0+IHtcbiAgaW5wdXRbZXZlbnQuY29kZV0gPSBmYWxzZTtcbn0pO1xuLy90b2RvLWJhbGwsIGJvYXJkLCBicmlja3MtPmdhbWVPYmplY3Rze31cbmV4cG9ydCBmdW5jdGlvbiBnYW1lTG9vcChiYWxsLCBib2FyZCwgYnJpY2tzLCBjYW52YXNWaWV3LCBnYW1lT3Zlcikge1xuICAgIGlmIChpbnB1dFsnQXJyb3dMZWZ0J10gJiYgKGJvYXJkLnBvc2l0aW9uLnggPiAwKSkge1xuICAgICAgICBib2FyZC52ZWxvY2l0eS54ID0gLTc7XG4gICAgICAgIG1vdmUoYm9hcmQsIGJvYXJkLnZlbG9jaXR5KTtcbiAgICB9IGVsc2UgaWYgKGlucHV0WydBcnJvd1JpZ2h0J10gJiYgKGJvYXJkLnBvc2l0aW9uLnggKyBCT0FSRF9XSURUSCA8IGNhbnZhc1ZpZXcuY2FudmFzLndpZHRoKSkge1xuICAgICAgICBib2FyZC52ZWxvY2l0eS54ID0gNztcbiAgICAgICAgbW92ZShib2FyZCwgYm9hcmQudmVsb2NpdHkpO1xuICAgIH1cbiAgICBjYW52YXNWaWV3LmdldENvbnRleHQoKS5jbGVhclJlY3QoMCwgMCwgY2FudmFzVmlldy5jYW52YXMud2lkdGgsIGNhbnZhc1ZpZXcuY2FudmFzLmhlaWdodCk7XG4gICAgY2FudmFzVmlldy5kcmF3QnJpY2tzKGJyaWNrcyk7XG4gICAgY2FudmFzVmlldy5kcmF3Qm9hcmQoYm9hcmQpO1xuICAgIGNhbnZhc1ZpZXcuZHJhd0JhbGwoYmFsbCk7XG4gICAgY29sbGlzaW9uRGV0ZWN0b3IoYmFsbCwgYm9hcmQsIGdhbWVPdmVyKTtcbiAgICBtb3ZlKGJhbGwsIGJhbGwudmVsb2NpdHkpO1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBjb2xsaXNpb25EZXRlY3RvcihiYWxsOiBCYWxsLCBib2FyZDogUGFkZGxlLCBnYW1lT3ZlcjogYm9vbGVhbikge1xuICAgIGlmIChpc0JhbGxDb2xsaWRpbmdXaXRoQm9hcmQoYmFsbCwgYm9hcmQpKSB7XG4gICAgICAgIGhhbmRsZUJvYXJkSGl0KGJhbGwsIGJvYXJkKTtcbiAgICB9XG4gICAgaWYgKGlzQmFsbEhpdHRpbmdUaGVGbG9vcihiYWxsLCBjYW52YXNWaWV3KSkge1xuICAgICAgICBnYW1lT3ZlciA9IHRydWU7XG4gICAgICAgIHNob3dHYW1lT3Zlck1lc3NhZ2UoKTtcbiAgICB9IGVsc2UgaWYgKGlzQmFsbEhpdHRpbmdUaGVDZWlsaW5nKGJhbGwpKSB7XG4gICAgICAgIGJhbGwudmVsb2NpdHkueSA9IE1hdGguYWJzKGJhbGwudmVsb2NpdHkueSk7XG4gICAgfSBlbHNlIGlmIChpc0JhbGxIaXR0aW5nUmlnaHRXYWxsKGJhbGwsIGNhbnZhc1ZpZXcpKSB7XG4gICAgICAgIGJhbGwudmVsb2NpdHkueCA9IC0gYmFsbC52ZWxvY2l0eS54O1xuICAgIH0gZWxzZSBpZiAoaXNCYWxsSGl0dGluZ1RoZUxlZnRXYWxsKGJhbGwpKSB7XG4gICAgICAgIGJhbGwudmVsb2NpdHkueCA9IE1hdGguYWJzKGJhbGwudmVsb2NpdHkueCk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgVmVjdG9yIH0gZnJvbSBcIi4uL3V0aWxzL3ZlY3RvclwiO1xuXG5leHBvcnQgZnVuY3Rpb24gbW92ZShnYW1lT2JqZWN0OiBHYW1lT2JqZWN0LCB2ZWxvY2l0eTogVmVjdG9yKSB7XG4gIGdhbWVPYmplY3QucG9zaXRpb24ueCArPSB2ZWxvY2l0eS54O1xuICBnYW1lT2JqZWN0LnBvc2l0aW9uLnkgKz0gdmVsb2NpdHkueTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBHYW1lT2JqZWN0IHtcbiAgcG9zaXRpb246IHsgeDogbnVtYmVyOyB5OiBudW1iZXIgfTtcbn1cbiIsImltcG9ydCB7IFZlY3RvciB9IGZyb20gXCIuLi9HZW9tZXRyeS9WZWN0b3JcIjtcblxuZXhwb3J0IGNsYXNzIEJhbGwge1xuICBwcml2YXRlIGltYWdlOiBIVE1MSW1hZ2VFbGVtZW50ID0gbmV3IEltYWdlKCk7XG4gIHB1YmxpYyB2ZWxvY2l0eTogVmVjdG9yID0gbmV3IFZlY3RvcigwLCAwKTtcbiAgY29uc3RydWN0b3IocHVibGljIHBvc2l0aW9uOiBWZWN0b3IsIGltYWdlOiBzdHJpbmcsIGJhbGx2ZWxvY2l0eT86IFZlY3Rvcikge1xuICAgIHRoaXMuaW1hZ2Uuc3JjID0gaW1hZ2U7XG4gICAgaWYgKCEhYmFsbHZlbG9jaXR5KSB0aGlzLnZlbG9jaXR5ID0gYmFsbHZlbG9jaXR5O1xuICB9XG5cbiAgZ2V0SW1hZ2UoKTogSFRNTEltYWdlRWxlbWVudCB7XG4gICAgcmV0dXJuIHRoaXMuaW1hZ2U7XG4gIH1cbn1cbiIsImltcG9ydCB7IFZlY3RvciB9IGZyb20gXCIuLi91dGlscy92ZWN0b3JcIjtcblxuZXhwb3J0IGNsYXNzIEJyaWNrIHtcbiAgcHJpdmF0ZSBpbWFnZTogSFRNTEltYWdlRWxlbWVudCA9IG5ldyBJbWFnZSgpO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBwb3NpdGlvbjogVmVjdG9yLCBpbWFnZTogc3RyaW5nKSB7XG4gICAgdGhpcy5pbWFnZS5zcmMgPSBpbWFnZTtcbiAgfVxuXG4gIGdldEltYWdlKCk6IEhUTUxJbWFnZUVsZW1lbnQge1xuICAgIHJldHVybiB0aGlzLmltYWdlO1xuICB9XG59XG4iLCJpbXBvcnQgeyBWZWN0b3IgfSBmcm9tIFwiLi4vR2VvbWV0cnkvVmVjdG9yXCI7XG5cbmV4cG9ydCBjbGFzcyBQYWRkbGUge1xuICBwcml2YXRlIGltYWdlOiBIVE1MSW1hZ2VFbGVtZW50ID0gbmV3IEltYWdlKCk7XG4gIHB1YmxpYyB2ZWxvY2l0eTogVmVjdG9yID0gbmV3IFZlY3RvcigwLCAwKTtcbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIHBvc2l0aW9uOiBWZWN0b3IsXG4gICAgaW1hZ2U6IEhUTUxJbWFnZUVsZW1lbnQsXG4gICAgYm9hcmR2ZWxvY2l0eT86IFZlY3RvclxuICApIHtcbiAgICB0aGlzLmltYWdlID0gaW1hZ2U7XG4gICAgaWYgKCEhYm9hcmR2ZWxvY2l0eSkgdGhpcy52ZWxvY2l0eSA9IGJvYXJkdmVsb2NpdHk7XG4gIH1cblxuICBnZXRJbWFnZSgpOiBIVE1MSW1hZ2VFbGVtZW50IHtcbiAgICByZXR1cm4gdGhpcy5pbWFnZTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQkFMTF9ESUFNRVRFUiwgQlJJQ0tfV0lEVEgsIEJSSUNLX0hFSUdIVCB9IGZyb20gXCIuLi91dGlscy9jb25zdGFudHNcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIGdldEhpdEJyaWNrSW5kZXgoYnJpY2tzLCBiYWxsKSB7XG4gIHJldHVybiBicmlja3MuZmluZEluZGV4KChicmljaykgPT4ge1xuICAgIGNvbnN0IGxlZnQgPSBicmljay5wb3NpdGlvbi54IC0gQkFMTF9ESUFNRVRFUiAvIDI7XG4gICAgY29uc3QgcmlnaHQgPSBicmljay5wb3NpdGlvbi54ICsgQlJJQ0tfV0lEVEggKyBCQUxMX0RJQU1FVEVSIC8gMjtcbiAgICBjb25zdCB0b3AgPSBicmljay5wb3NpdGlvbi55IC0gQkFMTF9ESUFNRVRFUiAvIDI7XG4gICAgY29uc3QgYm90dG9tID0gYnJpY2sucG9zaXRpb24ueSArIEJSSUNLX0hFSUdIVCArIEJBTExfRElBTUVURVIgLyAyO1xuICAgIHJldHVybiAoXG4gICAgICBiYWxsLnBvc2l0aW9uLnggPj0gbGVmdCAmJlxuICAgICAgYmFsbC5wb3NpdGlvbi54IDw9IHJpZ2h0ICYmXG4gICAgICBiYWxsLnBvc2l0aW9uLnkgPj0gdG9wICYmXG4gICAgICBiYWxsLnBvc2l0aW9uLnkgPD0gYm90dG9tXG4gICAgKTtcbiAgfSk7XG59XG4iLCJpbXBvcnQgeyBCYWxsIH0gZnJvbSBcIi4uL2ZpZ3VyZXMvQmFsbFwiO1xuaW1wb3J0IHsgQnJpY2sgfSBmcm9tIFwiLi4vZmlndXJlcy9Ccmlja1wiO1xuaW1wb3J0IHsgUGFkZGxlIH0gZnJvbSBcIi4uL2ZpZ3VyZXMvUGFkZGxlXCI7XG5pbXBvcnQgeyBCUklDS19IRUlHSFQsIEJSSUNLX1dJRFRILCBCQUxMX0RJQU1FVEVSLCBCT0FSRF9XSURUSCB9IGZyb20gXCIuLi91dGlscy9jb25zdGFudHNcIjtcbmltcG9ydCB7IFZlY3RvciB9IGZyb20gXCIuLi91dGlscy92ZWN0b3JcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIGNoYW5nZUJhbGxEaXJlY3Rpb24oYmFsbDogQmFsbCwgYnJpY2s6IEJyaWNrKSB7XG4gICAgY29uc3QgQlJJQ0tfRElBR09OQUwgPSBNYXRoLnNxcnQoQlJJQ0tfSEVJR0hUICoqIDIgKyBCUklDS19XSURUSCAqKiAyKTtcbiAgICBjb25zdCBicmlja0NlbnRlclggPSBicmljay5wb3NpdGlvbi54ICsgQlJJQ0tfV0lEVEggLyAyO1xuICAgIGNvbnN0IGJyaWNrQ2VudGVyWSA9IGJyaWNrLnBvc2l0aW9uLnkgKyBCUklDS19IRUlHSFQgLyAyO1xuICAgIGNvbnN0IGJhbGxDZW50ZXJYID0gYmFsbC5wb3NpdGlvbi54ICsgQkFMTF9ESUFNRVRFUiAvIDI7XG4gICAgY29uc3QgYmFsbENlbnRlclkgPSBiYWxsLnBvc2l0aW9uLnkgKyBCQUxMX0RJQU1FVEVSIC8gMjtcbiAgICBjb25zdCBkZWx0YVkgPSAoQlJJQ0tfSEVJR0hUICogQkFMTF9ESUFNRVRFUiAvIDIpIC8gQlJJQ0tfRElBR09OQUw7XG4gICAgY29uc3QgZGVsdGFYID0gKEJSSUNLX1dJRFRIICogQkFMTF9ESUFNRVRFUiAvIDIpIC8gQlJJQ0tfRElBR09OQUw7XG4gICAgY29uc3QgbWluWVNpZGVIaXQgPSBicmljay5wb3NpdGlvbi55ICsgZGVsdGFZO1xuICAgIGNvbnN0IG1heFlTaWRlSGl0ID0gYnJpY2sucG9zaXRpb24ueSArIEJSSUNLX0hFSUdIVCAtIGRlbHRhWTtcbiAgICBjb25zdCBtaW5MZWZ0WFNpZGVIaXQgPSBicmljay5wb3NpdGlvbi54IC0gZGVsdGFYO1xuICAgIGNvbnN0IG1heExlZnRYU2lkZUhpdCA9IGJyaWNrLnBvc2l0aW9uLnggKyBkZWx0YVg7XG4gICAgY29uc3QgaXNCYWxsQ29taW5nRnJvbUJ1dHRvbUxlZnQgPSAoKGJhbGxDZW50ZXJYID4gbWluTGVmdFhTaWRlSGl0KVxuICAgICAgICAmJiAoYmFsbENlbnRlclggPCBtYXhMZWZ0WFNpZGVIaXQpXG4gICAgICAgICYmIChiYWxsQ2VudGVyWSA+IG1pbllTaWRlSGl0KVxuICAgICAgICAmJiAoYmFsbENlbnRlclkgPCBtYXhZU2lkZUhpdCkpO1xuICAgIGNvbnN0IGlzQmFsbENvbWluZ0Zyb21CdXR0b21SaWdodCA9ICgoYmFsbENlbnRlclggPiBtaW5MZWZ0WFNpZGVIaXQgKyBCUklDS19XSURUSClcbiAgICAgICAgJiYgKGJhbGxDZW50ZXJYIDwgbWF4TGVmdFhTaWRlSGl0ICsgQlJJQ0tfV0lEVEgpXG4gICAgICAgICYmIChiYWxsQ2VudGVyWSA+IG1pbllTaWRlSGl0KVxuICAgICAgICAmJiAoYmFsbENlbnRlclkgPCBtYXhZU2lkZUhpdCkpO1xuICAgIGlmICgoaXNCYWxsQ29taW5nRnJvbUJ1dHRvbUxlZnQgJiYgYmFsbC52ZWxvY2l0eS54ID4gMCkgfHwgKGlzQmFsbENvbWluZ0Zyb21CdXR0b21SaWdodCAmJiBiYWxsLnZlbG9jaXR5LnggPCAwKSkge1xuICAgICAgICBiYWxsLnZlbG9jaXR5LnggKj0gLTE7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgYmFsbC52ZWxvY2l0eS55ICo9IC0xO1xuICAgIH1cblxufVxuXG5leHBvcnQgZnVuY3Rpb24gaGFuZGxlQm9hcmRIaXQoYmFsbDogQmFsbCwgYm9hcmQ6UGFkZGxlKSB7XG4gICAgY29uc3QgY3VycmVudEFuZ2xlID0gTWF0aC5hdGFuMihiYWxsLnBvc2l0aW9uLnksIGJhbGwucG9zaXRpb24ueCk7XG4gICAgY29uc3QgZGVsdGFDZW50ZXJYID0gYmFsbC5wb3NpdGlvbi54IC0gKGJvYXJkLnBvc2l0aW9uLnggLSBCT0FSRF9XSURUSCAvIDIpO1xuICAgIGNvbnN0IHNpZ24gPSBiYWxsLnBvc2l0aW9uLnggPiBib2FyZC5wb3NpdGlvbi54ICsgQk9BUkRfV0lEVEggLyAyID8gMSA6IC0xO1xuICAgIGNvbnN0IGNvZWZmID0gc2lnbiAqIChiYWxsLnBvc2l0aW9uLngpIC8gKEJPQVJEX1dJRFRIIC8gMik7XG4gICAgY29uc3QgYW5nbGVUb0FkZCA9IE1hdGguUEkgLyAyMDtcbiAgICBjb25zdCBuZXh0QW5nbGUgPSBjb2VmZiAqIGFuZ2xlVG9BZGQgKyBjdXJyZW50QW5nbGU7XG4gICAgY29uc3QgeU9mZnNldCA9IDU7XG4gICAgaWYgKG5leHRBbmdsZSA8IDIgKiBNYXRoLlBJIC8gMyAmJiBuZXh0QW5nbGUgPiBNYXRoLlBJIC8gMjApIHtcbiAgICAgICAgYmFsbC52ZWxvY2l0eS54ID0gNyAqIE1hdGguc2luKG5leHRBbmdsZSk7XG4gICAgICAgIGJhbGwudmVsb2NpdHkueSA9IDcgKiBNYXRoLmNvcyhuZXh0QW5nbGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGJhbGwudmVsb2NpdHkueSA9IC1iYWxsLnZlbG9jaXR5Lnk7XG4gICAgfVxuICAgIGJhbGwucG9zaXRpb24ueSAtPSB5T2Zmc2V0O1xufVxuIiwiaW1wb3J0IHsgQnJpY2sgfSBmcm9tIFwiLi4vZmlndXJlcy9Ccmlja1wiO1xuaW1wb3J0IHtcbiAgQlJJQ0tTX0NPTFMsXG4gIEJSSUNLX1JPV1MsXG4gIElOQ1JFRU1OVF9ET1dOX0JSSUNLLFxuICBJTkNSRU1FTlRfTEVGVF9CUklDSyxcbiAgSU5JVElBTF9TVEFSVF9CUklDS19MRUZULFxuICBJTklUSUFMX1NUQVJUX0JSSUNLX1JJR0hULFxufSBmcm9tIFwiLi9jb25zdGFudHNcIjtcblxuaW1wb3J0IHsgVmVjdG9yIH0gZnJvbSBcIi4vdmVjdG9yXCI7XG5cbmNvbnN0IGJyaWNrc0ltYWdlID0gW1xuICBcIi9hc3NldHMvYnJpY2stYmx1ZS5wbmdcIixcbiAgXCIvYXNzZXRzL2JyaWNrLWdyZWVuLnBuZ1wiLFxuICBcIi9hc3NldHMvYnJpY2stcHVycGxlLnBuZ1wiLFxuICBcIi9hc3NldHMvYnJpY2stcmVkLnBuZ1wiLFxuICBcIi9hc3NldHMvYnJpY2steWVsbG93LnBuZ1wiLFxuXTtcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUJyaWNrcygpOiBCcmlja1tdIHtcbiAgbGV0IHggPSBJTklUSUFMX1NUQVJUX0JSSUNLX0xFRlQ7XG4gIGxldCB5ID0gSU5JVElBTF9TVEFSVF9CUklDS19SSUdIVDtcblxuICBjb25zdCBicmlja3M6IEJyaWNrW10gPSBbXTtcblxuICBmb3IgKGxldCByb3cgPSAwOyByb3cgPCBCUklDS19ST1dTOyByb3crKykge1xuICAgIGZvciAobGV0IGNvbCA9IDA7IGNvbCA8IEJSSUNLU19DT0xTOyBjb2wrKykge1xuICAgICAgY29uc3QgcG9zOiBWZWN0b3IgPSB7IHgsIHkgfTtcblxuICAgICAgY29uc3QgcmFuZFBvcyA9IChNYXRoLnJhbmRvbSgpICogYnJpY2tzSW1hZ2UubGVuZ3RoKSB8IDA7XG4gICAgICBjb25zdCBicmljayA9IG5ldyBCcmljayhwb3MsIGJyaWNrc0ltYWdlW3JhbmRQb3NdKTtcbiAgICAgIGJyaWNrcy5wdXNoKGJyaWNrKTtcbiAgICAgIHggKz0gSU5DUkVNRU5UX0xFRlRfQlJJQ0s7XG4gICAgfVxuXG4gICAgeCA9IElOSVRJQUxfU1RBUlRfQlJJQ0tfTEVGVDtcbiAgICB5ICs9IElOQ1JFRU1OVF9ET1dOX0JSSUNLO1xuICB9XG4gIHJldHVybiBicmlja3M7XG59XG4iLCIvLyBCUklDS1NcbmV4cG9ydCBjb25zdCBCUklDS19ST1dTID0gMztcbmV4cG9ydCBjb25zdCBCUklDS1NfQ09MUyA9IDEwO1xuZXhwb3J0IGNvbnN0IEJSSUNLX1dJRFRIID0gMTAwO1xuZXhwb3J0IGNvbnN0IEJSSUNLX0hFSUdIVCA9IDQwO1xuZXhwb3J0IGNvbnN0IElOSVRJQUxfU1RBUlRfQlJJQ0tfTEVGVCA9IDEwO1xuZXhwb3J0IGNvbnN0IElOSVRJQUxfU1RBUlRfQlJJQ0tfUklHSFQgPSAxMDtcbmV4cG9ydCBjb25zdCBJTkNSRU1FTlRfTEVGVF9CUklDSyA9IDEyMDtcbmV4cG9ydCBjb25zdCBJTkNSRUVNTlRfRE9XTl9CUklDSyA9IDYwO1xuZXhwb3J0IGNvbnN0IEJSSUNLU19FTkQgPSAxNzA7XG5cbi8vIEJPQVJEXG5leHBvcnQgY29uc3QgQk9BUkRfV0lEVEggPSAxMjA7XG5leHBvcnQgY29uc3QgQk9BUkRfSEVJR0hUID0gMjA7XG5cbi8vQkFMTFxuZXhwb3J0IGNvbnN0IEJBTExfV0lEVEggPSA0MDtcbmV4cG9ydCBjb25zdCBCQUxMX0hFSUdIVCA9IDQwO1xuZXhwb3J0IGNvbnN0IElOSVRJQUxfQkFMTF9YID0gMjAwO1xuZXhwb3J0IGNvbnN0IElOSVRJQUxfQkFMTF9ZID0gMjAwO1xuZXhwb3J0IGNvbnN0IEJBTExfRElBTUVURVIgPSA0MDtcblxuLy9NSVNDRUxMQU5FT1VTXG5leHBvcnQgY29uc3QgQlJJQ0tfQk9OVVNfUE9JTlRTID0gMTA7XG4iLCJpbXBvcnQgeyBCYWxsIH0gZnJvbSBcIi4uL2ZpZ3VyZXMvQmFsbFwiO1xuaW1wb3J0IHsgUGFkZGxlIH0gZnJvbSBcIi4uL2ZpZ3VyZXMvUGFkZGxlXCI7XG5pbXBvcnQgeyBDYW52YXNWaWV3IH0gZnJvbSBcIi4uL3ZpZXcvQ2FudmFzVmlld1wiO1xuaW1wb3J0IHtcbiAgQkFMTF9ESUFNRVRFUixcbiAgQk9BUkRfSEVJR0hULFxuICBCT0FSRF9XSURUSCxcbiAgQlJJQ0tTX0VORCxcbiAgQlJJQ0tfV0lEVEgsXG59IGZyb20gXCIuL2NvbnN0YW50c1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gaXNCYWxsSGl0dGluZ1RoZUxlZnRXYWxsKGJhbGw6IEJhbGwpIHtcbiAgcmV0dXJuIGJhbGwucG9zaXRpb24ueCA8PSAwO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNCYWxsSGl0dGluZ1JpZ2h0V2FsbChiYWxsLCBjYW52YXNWaWV3OiBDYW52YXNWaWV3KSB7XG4gIHJldHVybiBiYWxsLnBvc2l0aW9uLnggPiBjYW52YXNWaWV3LmNhbnZhcy53aWR0aCAtIEJBTExfRElBTUVURVI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0JhbGxIaXR0aW5nVGhlQ2VpbGluZyhiYWxsOiBCYWxsKSB7XG4gIHJldHVybiBiYWxsLnBvc2l0aW9uLnkgPD0gMDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzQmFsbEhpdHRpbmdUaGVGbG9vcihiYWxsOiBCYWxsLCBjYW52YXNWaWV3OiBDYW52YXNWaWV3KSB7XG4gIHJldHVybiBiYWxsLnBvc2l0aW9uLnkgPj0gY2FudmFzVmlldy5jYW52YXMuaGVpZ2h0IC0gQkFMTF9ESUFNRVRFUjtcbn1cbmV4cG9ydCBmdW5jdGlvbiBpc0JhbGxOZWFyQnJpY2tzKGJhbGw6IEJhbGwpIHtcbiAgcmV0dXJuIGJhbGwucG9zaXRpb24ueSA8IEJSSUNLU19FTkQ7XG59XG5leHBvcnQgZnVuY3Rpb24gaXNCYWxsQ29sbGlkaW5nV2l0aEJvYXJkKGJhbGwsIGJvYXJkKSB7XG4gIGNvbnNvbGUubG9nKFxuICAgIGJhbGwucG9zaXRpb24ueSArIEJBTExfRElBTUVURVIgLyAyIDw9IGJvYXJkLnBvc2l0aW9uLnkgKyBCT0FSRF9IRUlHSFRcbiAgKTtcbiAgY29uc29sZS5sb2coYmFsbC5wb3NpdGlvbi55ICsgQkFMTF9ESUFNRVRFUiAvIDIgPj0gYm9hcmQucG9zaXRpb24ueSk7XG4gIGNvbnNvbGUubG9nKGJhbGwucG9zaXRpb24ueCA8PSBib2FyZC5wb3NpdGlvbi54ICsgQk9BUkRfV0lEVEgpO1xuICBjb25zb2xlLmxvZyhiYWxsLnBvc2l0aW9uLnggPj0gYm9hcmQucG9zaXRpb24ueCAtIEJBTExfRElBTUVURVIpO1xuICByZXR1cm4gKFxuICAgIGJhbGwucG9zaXRpb24ueSArIEJBTExfRElBTUVURVIgLyAyIDw9IGJvYXJkLnBvc2l0aW9uLnkgJiZcbiAgICBiYWxsLnBvc2l0aW9uLnkgKyBCQUxMX0RJQU1FVEVSIC8gMiA+PSBib2FyZC5wb3NpdGlvbi55IC0gMjAgJiZcbiAgICBiYWxsLnBvc2l0aW9uLnggLSBCQUxMX0RJQU1FVEVSIC8gMiA8PSBib2FyZC5wb3NpdGlvbi54ICsgQk9BUkRfV0lEVEggJiZcbiAgICBiYWxsLnBvc2l0aW9uLnggKyBCQUxMX0RJQU1FVEVSIC8gNCA+PSBib2FyZC5wb3NpdGlvbi54XG4gICk7XG59XG4iLCJpbXBvcnQgeyBWZWN0b3IgfSBmcm9tIFwiLi4vdXRpbHMvdmVjdG9yXCI7XG5pbXBvcnQge1xuICBCUklDS19ST1dTLFxuICBCUklDS19XSURUSCxcbiAgQlJJQ0tfSEVJR0hULFxuICBCT0FSRF9XSURUSCxcbiAgQk9BUkRfSEVJR0hULFxuICBCQUxMX0RJQU1FVEVSLFxufSBmcm9tIFwiLi4vdXRpbHMvY29uc3RhbnRzXCI7XG5pbXBvcnQgeyBCYWxsIH0gZnJvbSBcIi4uL2ZpZ3VyZXMvQmFsbFwiO1xuaW1wb3J0IHsgQnJpY2sgfSBmcm9tIFwiLi4vZmlndXJlcy9Ccmlja1wiO1xuaW1wb3J0IHsgUGFkZGxlIH0gZnJvbSBcIi4uL2ZpZ3VyZXMvUGFkZGxlXCI7XG5cbmV4cG9ydCBjbGFzcyBDYW52YXNWaWV3IHtcbiAgcHJpdmF0ZSBjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRDtcbiAgcHVibGljIGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQ7XG5cbiAgY29uc3RydWN0b3IocHVibGljIGNhbnZhc1NlbGVjdG9yOiBzdHJpbmcpIHtcbiAgICB0aGlzLmNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGNhbnZhc1NlbGVjdG9yKSBhcyBIVE1MQ2FudmFzRWxlbWVudDtcbiAgICB0aGlzLmN0eCA9IHRoaXMuY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcbiAgfVxuXG4gIGRyYXdJbWFnZShcbiAgICBwb3NpdGlvbjogVmVjdG9yLFxuICAgIGltYWdlOiBIVE1MSW1hZ2VFbGVtZW50LFxuICAgIHdpZHRoOiBudW1iZXIsXG4gICAgaGVpZ2h0OiBudW1iZXJcbiAgKSB7XG4gICAgdGhpcy5jdHguZHJhd0ltYWdlKGltYWdlLCBwb3NpdGlvbi54LCBwb3NpdGlvbi55LCB3aWR0aCwgaGVpZ2h0KTtcbiAgfVxuXG4gIGRyYXdCcmlja3MoYnJpY2tzOiBCcmlja1tdKSB7XG4gICAgZm9yIChsZXQgciA9IDA7IHIgPCBCUklDS19ST1dTOyByKyspIHtcbiAgICAgIGZvciAobGV0IGMgPSAwOyBjIDwgYnJpY2tzLmxlbmd0aDsgYysrKSB7XG4gICAgICAgIGNvbnN0IGJyaWNrID0gYnJpY2tzW2NdO1xuICAgICAgICBjb25zdCBwb3M6IFZlY3RvciA9IHtcbiAgICAgICAgICB4OiBicmljay5wb3NpdGlvbi54LFxuICAgICAgICAgIHk6IGJyaWNrLnBvc2l0aW9uLnksXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuZHJhd0ltYWdlKHBvcywgYnJpY2suZ2V0SW1hZ2UoKSwgQlJJQ0tfV0lEVEgsIEJSSUNLX0hFSUdIVCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZHJhd0JhbGwoYmFsbDogQmFsbCkge1xuICAgIHRoaXMuZHJhd0ltYWdlKFxuICAgICAgYmFsbC5wb3NpdGlvbixcbiAgICAgIGJhbGwuZ2V0SW1hZ2UoKSxcbiAgICAgIEJBTExfRElBTUVURVIsXG4gICAgICBCQUxMX0RJQU1FVEVSXG4gICAgKTtcbiAgfVxuXG4gIGRyYXdCb2FyZChib2FyZDogUGFkZGxlKSB7XG4gICAgdGhpcy5jdHguYmVnaW5QYXRoKCk7XG4gICAgdGhpcy5jdHguZHJhd0ltYWdlKFxuICAgICAgYm9hcmQuZ2V0SW1hZ2UoKSxcbiAgICAgIGJvYXJkLnBvc2l0aW9uLngsXG4gICAgICBib2FyZC5wb3NpdGlvbi55LFxuICAgICAgQk9BUkRfV0lEVEgsXG4gICAgICBCT0FSRF9IRUlHSFRcbiAgICApO1xuICAgIHRoaXMuY3R4LmNsb3NlUGF0aCgpO1xuICB9XG5cbiAgZ2V0Q29udGV4dCgpOiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQge1xuICAgIHJldHVybiB0aGlzLmN0eDtcbiAgfVxufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9hcHAudHNcIik7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=