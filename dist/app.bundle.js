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
        if (typeof xOrPoint == 'number' && typeof y == 'number') {
            this.x = xOrPoint;
            this.y = y;
        }
        else if (typeof xOrPoint == 'object') {
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
const boardImg = document.getElementById('board');
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
let mouseActive = true;
window.addEventListener('keydown', event => {
    input[event.code] = true;
});
window.addEventListener('keyup', event => {
    input[event.code] = false;
});
document.addEventListener('mousemove', (e) => {
    board.position.x = e.clientX;
});
window.oncontextmenu = (e) => {
    e.preventDefault();
    console.log("right clicked");
    mouseActive = false;
};
const playBtn = document.getElementById('play-btn');
let isPlayMusic = false;
document.getElementById("new-game").addEventListener("click", () => {
    gameOver = false;
    startGame();
    gameoverDiv.style.display = "none";
});
playBtn.addEventListener('click', () => {
    document.getElementById('container').style.display = 'none';
    document.getElementById('gameCanvas').style.display = 'block';
    startGame();
    if (isPlayMusic) {
        const music = new Audio("../assets/music.mp3");
        music.volume = 0.1;
        music.play();
    }
});
document.getElementById('setting-btn').addEventListener('click', () => {
    const settingsContainer = document.getElementById('settings-container');
    const container = document.getElementById('container');
    settingsContainer.style.display = 'block';
    container.style.display = 'none';
    document.getElementById('back-btn').addEventListener('click', () => {
        settingsContainer.style.display = 'none';
        container.style.display = 'block';
    });
    document.getElementById('play-sound-btn').addEventListener('click', () => {
        isPlayMusic = true;
        document.querySelector('.gg-check').style.display = 'block';
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
window.addEventListener('keydown', event => {
    input[event.code] = true;
});
window.addEventListener('keyup', event => {
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
    return bricks.findIndex(brick => {
        const left = brick.position.x - _utils_constants__WEBPACK_IMPORTED_MODULE_0__.BALL_DIAMETER / 2;
        const right = brick.position.x + _utils_constants__WEBPACK_IMPORTED_MODULE_0__.BRICK_WIDTH + _utils_constants__WEBPACK_IMPORTED_MODULE_0__.BALL_DIAMETER / 2;
        const top = brick.position.y - _utils_constants__WEBPACK_IMPORTED_MODULE_0__.BALL_DIAMETER / 2;
        const bottom = brick.position.y + _utils_constants__WEBPACK_IMPORTED_MODULE_0__.BRICK_HEIGHT + _utils_constants__WEBPACK_IMPORTED_MODULE_0__.BALL_DIAMETER / 2;
        return ((ball.position.x >= left)
            && (ball.position.x <= right)
            && (ball.position.y >= top)
            && (ball.position.y <= bottom));
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
    "/assets/brick-yellow.png"
];
function createBricks() {
    let x = _constants__WEBPACK_IMPORTED_MODULE_1__.INITIAL_START_BRICK_LEFT;
    let y = _constants__WEBPACK_IMPORTED_MODULE_1__.INITIAL_START_BRICK_RIGHT;
    const bricks = [];
    for (let row = 0; row < _constants__WEBPACK_IMPORTED_MODULE_1__.BRICK_ROWS; row++) {
        for (let col = 0; col < _constants__WEBPACK_IMPORTED_MODULE_1__.BRICKS_COLS; col++) {
            const pos = { x, y };
            const randPos = Math.random() * bricksImage.length | 0;
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
    return (ball.position.y < _constants__WEBPACK_IMPORTED_MODULE_0__.BRICKS_END);
}
function isBallCollidingWithBoard(ball, board) {
    console.log(ball.position.y + _constants__WEBPACK_IMPORTED_MODULE_0__.BALL_DIAMETER / 2 <= board.position.y + _constants__WEBPACK_IMPORTED_MODULE_0__.BOARD_HEIGHT);
    console.log(ball.position.y + _constants__WEBPACK_IMPORTED_MODULE_0__.BALL_DIAMETER / 2 >= board.position.y);
    console.log(ball.position.x <= board.position.x + _constants__WEBPACK_IMPORTED_MODULE_0__.BOARD_WIDTH);
    console.log(ball.position.x >= board.position.x - _constants__WEBPACK_IMPORTED_MODULE_0__.BALL_DIAMETER);
    return ((ball.position.y + _constants__WEBPACK_IMPORTED_MODULE_0__.BALL_DIAMETER / 2 <= board.position.y)
        && (ball.position.y + _constants__WEBPACK_IMPORTED_MODULE_0__.BALL_DIAMETER / 2 >= board.position.y - 20)
        && (ball.position.x - _constants__WEBPACK_IMPORTED_MODULE_0__.BALL_DIAMETER / 2 <= board.position.x + _constants__WEBPACK_IMPORTED_MODULE_0__.BOARD_WIDTH)
        && (ball.position.x + _constants__WEBPACK_IMPORTED_MODULE_0__.BALL_DIAMETER / 4 >= board.position.x));
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
        this.ctx = this.canvas.getContext('2d');
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
                    y: brick.position.y
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmJ1bmRsZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUVPLE1BQU0sTUFBTTtJQUNmLENBQUMsQ0FBUztJQUNWLENBQUMsQ0FBUztJQUlWLFlBQ0ksUUFBd0IsRUFDeEIsQ0FBVTtRQUVWLElBQUksT0FBTyxRQUFRLElBQUksUUFBUSxJQUFJLE9BQU8sQ0FBQyxJQUFJLFFBQVEsRUFBRTtZQUNyRCxJQUFJLENBQUMsQ0FBQyxHQUFHLFFBQVEsQ0FBQztZQUNsQixJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUNkO2FBQU0sSUFBSSxPQUFPLFFBQVEsSUFBSSxRQUFRLEVBQUU7WUFDcEMsSUFBSSxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ3BCLElBQUksQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQztTQUN2QjtJQUNMLENBQUM7SUFFRCxHQUFHLENBQUMsQ0FBUTtRQUNSLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNkLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNkLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxLQUFLLENBQUMsQ0FBUztRQUNYLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ1osSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFWixPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQsSUFBSSxDQUFDLENBQVE7UUFDVCxNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDeEIsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3hCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBRUQsUUFBUTtRQUNKLE9BQU8sSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDckMsQ0FBQztJQUVELE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBUyxFQUFFLEVBQVM7UUFDM0IsT0FBTyxJQUFJLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDaEQsQ0FBQztDQUNKOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQy9DcUM7QUFDSTtBQUNDO0FBQ2M7QUFDTDtBQUd6QjtBQUdDO0FBQ21CO0FBQ0c7QUFDTDtBQUU3QyxNQUFNLFVBQVUsR0FBRyxJQUFJLHdEQUFVLENBQUMsWUFBWSxDQUFDLENBQUM7QUFDaEQsTUFBTSxXQUFXLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUN4RCxJQUFJLFFBQVEsR0FBRyxDQUFDLENBQUM7QUFDakIsSUFBSSxPQUFPLEdBQUcsQ0FBQyxDQUFDO0FBQ2hCLE1BQU0sU0FBUyxHQUFHLEVBQUUsQ0FBQztBQUNyQixNQUFNLFFBQVEsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBcUIsQ0FBQztBQUN0RSxNQUFNLGFBQWEsR0FBRyxJQUFJLG9EQUFNLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDO0FBQzlGLElBQUksTUFBTSxHQUFHLGlFQUFZLEVBQUUsQ0FBQztBQUM1QixJQUFJLGFBQWEsR0FBRyxJQUFJLG9EQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ3JDLElBQUksS0FBSyxHQUFHLElBQUksbURBQU0sQ0FBQyxhQUFhLEVBQUUsUUFBUSxFQUFFLGFBQWEsQ0FBQyxDQUFDO0FBQy9ELE1BQU0sWUFBWSxHQUFHLElBQUksb0RBQU0sQ0FBQyw0REFBYyxFQUFFLDREQUFjLENBQUMsQ0FBQztBQUNoRSxJQUFJLFlBQVksR0FBRyxJQUFJLG9EQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ3BDLElBQUksSUFBSSxHQUFHLElBQUksK0NBQUksQ0FBQyxZQUFZLEVBQUUsa0JBQWtCLEVBQUUsWUFBWSxDQUFDLENBQUM7QUFDcEUsTUFBTSxLQUFLLEdBQWdDLEVBQUUsQ0FBQztBQUc5QyxJQUFJLFFBQVEsR0FBRyxLQUFLLENBQUM7QUFDckIsSUFBSSxXQUFXLEdBQUcsQ0FBQyxDQUFDO0FBQ3BCLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQztBQUd2QixNQUFNLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxFQUFFO0lBQ3ZDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDO0FBQzdCLENBQUMsQ0FBQyxDQUFDO0FBQ0gsTUFBTSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsRUFBRTtJQUNyQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQztBQUM5QixDQUFDLENBQUMsQ0FBQztBQUVILFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTtJQUN6QyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDO0FBQ2pDLENBQUMsQ0FBQztBQUVGLE1BQU0sQ0FBQyxhQUFhLEdBQUcsQ0FBQyxDQUFDLEVBQUUsRUFBRTtJQUN6QixDQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDbkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUM3QixXQUFXLEdBQUcsS0FBSyxDQUFDO0FBQ3hCLENBQUM7QUFDRCxNQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQ3BELElBQUksV0FBVyxHQUFHLEtBQUssQ0FBQztBQUV4QixRQUFRLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUU7SUFDL0QsUUFBUSxHQUFHLEtBQUssQ0FBQztJQUNqQixTQUFTLEVBQUUsQ0FBQztJQUNaLFdBQVcsQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLE1BQU07QUFDdEMsQ0FBQyxDQUFDLENBQUM7QUFDSCxPQUFPLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRTtJQUNuQyxRQUFRLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO0lBQzVELFFBQVEsQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7SUFDOUQsU0FBUyxFQUFFLENBQUM7SUFFWixJQUFJLFdBQVcsRUFBRTtRQUNiLE1BQU0sS0FBSyxHQUFHLElBQUksS0FBSyxDQUFDLHFCQUFxQixDQUFDLENBQUM7UUFDL0MsS0FBSyxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUM7UUFDbkIsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO0tBQ2hCO0FBQ0wsQ0FBQyxDQUFDLENBQUM7QUFFSCxRQUFRLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUU7SUFDbEUsTUFBTSxpQkFBaUIsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLG9CQUFvQixDQUFDLENBQUM7SUFDeEUsTUFBTSxTQUFTLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUN2RCxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztJQUMxQyxTQUFTLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7SUFDakMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsR0FBRyxFQUFFO1FBQy9ELGlCQUFpQixDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO1FBQ3pDLFNBQVMsQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztJQUN0QyxDQUFDLENBQUM7SUFFRixRQUFRLENBQUMsY0FBYyxDQUFDLGdCQUFnQixDQUFDLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRTtRQUNyRSxXQUFXLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLFFBQVEsQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFpQixDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO0lBQ2pGLENBQUMsQ0FBQztBQUNOLENBQUMsQ0FBQztBQUVGLFNBQVMsU0FBUztJQUNkLE1BQU0sR0FBRyxpRUFBWSxFQUFFLENBQUM7SUFDeEIsS0FBSyxHQUFHLElBQUksbURBQU0sQ0FBQyxhQUFhLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDNUMsTUFBTSxZQUFZLEdBQUcsSUFBSSxvREFBTSxDQUFDLDREQUFjLEVBQUUsNERBQWMsQ0FBQztJQUMvRCxJQUFJLEdBQUcsSUFBSSwrQ0FBSSxDQUFDLFlBQVksRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO0lBQ2xELElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxvREFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNqQyxXQUFXLEdBQUcsQ0FBQyxDQUFDO0lBQ2hCLE1BQU0sQ0FBQyxXQUFXLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztBQUM5QixDQUFDO0FBRU0sU0FBUyxNQUFNLENBQUMsSUFBWTtJQUMvQixNQUFNLEtBQUssR0FBRyxJQUFJLEdBQUcsUUFBUSxDQUFDO0lBQzlCLFFBQVEsR0FBRyxJQUFJLENBQUM7SUFDaEIsT0FBTyxJQUFJLEtBQUssQ0FBQztJQUNqQixJQUFJLGdCQUFnQixHQUFHLG1FQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQywrREFBZ0IsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3BGLElBQUksZ0JBQWdCLElBQUksQ0FBQyxDQUFDLEVBQUU7UUFDeEIsTUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDdkMsc0VBQW1CLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ2pDLE1BQU0sQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDbkMsV0FBVyxJQUFJLGdFQUFrQixDQUFDO0tBQ3JDO0lBQ0QsSUFBSSxPQUFPLEdBQUcsU0FBUyxHQUFHLENBQUMsRUFBRTtRQUN6QixPQUFPLEdBQUcsU0FBUyxHQUFHLENBQUMsQ0FBQztLQUMzQjtJQUNELE9BQU8sT0FBTyxHQUFHLFNBQVMsRUFBRTtRQUN4QixPQUFPLElBQUksU0FBUyxDQUFDO1FBQ3JCLE1BQU0sSUFBSSxHQUFHLDJEQUFhLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUM1RSxJQUFJLEVBQUUsQ0FBQztRQUNQLFFBQVEsQ0FBQyxTQUFTLENBQUMsR0FBRyxJQUFJLENBQUM7S0FDOUI7SUFDRCxJQUFJLE1BQU0sQ0FBQyxNQUFNLElBQUksQ0FBQyxRQUFRLEVBQUU7UUFDNUIscUJBQXFCLENBQUMsTUFBTSxDQUFDLENBQUM7S0FDakM7QUFDTCxDQUFDO0FBRU0sU0FBUyxtQkFBbUI7SUFDL0IsV0FBVyxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO0lBQ25DLFdBQThCLENBQUMsU0FBUyxHQUFHLG9CQUFvQixXQUFXLEVBQUUsQ0FBQztBQUNsRixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDN0grQztBQUlsQjtBQUtGO0FBSUM7QUFDZ0I7QUFDUTtBQUdyRCxNQUFNLFVBQVUsR0FBRyxJQUFJLHdEQUFVLENBQUMsWUFBWSxDQUFDLENBQUM7QUFFaEQsTUFBTSxLQUFLLEdBQWdDLEVBQUUsQ0FBQztBQUc5QyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxFQUFFO0lBQ3ZDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDO0FBQzdCLENBQUMsQ0FBQyxDQUFDO0FBQ0gsTUFBTSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsRUFBRTtJQUNyQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQztBQUM5QixDQUFDLENBQUMsQ0FBQztBQUNILHlDQUF5QztBQUNsQyxTQUFTLFFBQVEsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsUUFBUTtJQUM5RCxJQUFJLEtBQUssQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFO1FBQzlDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ3RCLDJDQUFJLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztLQUMvQjtTQUFNLElBQUksS0FBSyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcseURBQVcsR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFO1FBQzFGLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNyQiwyQ0FBSSxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7S0FDL0I7SUFDRCxVQUFVLENBQUMsVUFBVSxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsVUFBVSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsVUFBVSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUMzRixVQUFVLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzlCLFVBQVUsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDNUIsVUFBVSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMxQixpQkFBaUIsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ3pDLDJDQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUM5QixDQUFDO0FBR00sU0FBUyxpQkFBaUIsQ0FBQyxJQUFVLEVBQUUsS0FBYSxFQUFFLFFBQWlCO0lBQzFFLElBQUksMkVBQXdCLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFO1FBQ3ZDLGlFQUFjLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO0tBQy9CO0lBQ0QsSUFBSSx3RUFBcUIsQ0FBQyxJQUFJLEVBQUUsVUFBVSxDQUFDLEVBQUU7UUFDekMsUUFBUSxHQUFHLElBQUksQ0FBQztRQUNoQix5REFBbUIsRUFBRSxDQUFDO0tBQ3pCO1NBQU0sSUFBSSwwRUFBdUIsQ0FBQyxJQUFJLENBQUMsRUFBRTtRQUN0QyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDL0M7U0FBTSxJQUFJLHlFQUFzQixDQUFDLElBQUksRUFBRSxVQUFVLENBQUMsRUFBRTtRQUNqRCxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO0tBQ3ZDO1NBQU0sSUFBSSwyRUFBd0IsQ0FBQyxJQUFJLENBQUMsRUFBRTtRQUN2QyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDL0M7QUFDTCxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7QUMzRE0sU0FBUyxJQUFJLENBQUMsVUFBc0IsRUFBRSxRQUFnQjtJQUN6RCxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxRQUFRLENBQUMsQ0FBQyxDQUFDO0lBQ3BDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLFFBQVEsQ0FBQyxDQUFDLENBQUM7QUFDeEMsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7OztBQ04yQztBQUdyQyxNQUFNLElBQUk7SUFJRjtJQUhILEtBQUssR0FBcUIsSUFBSSxLQUFLLEVBQUUsQ0FBQztJQUN2QyxRQUFRLEdBQVcsSUFBSSxvREFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUMzQyxZQUNXLFFBQWdCLEVBQ3ZCLEtBQWEsRUFDYixZQUFxQjtRQUZkLGFBQVEsR0FBUixRQUFRLENBQVE7UUFJdkIsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsS0FBSyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxDQUFDLFlBQVk7WUFDZCxJQUFJLENBQUMsUUFBUSxHQUFHLFlBQVksQ0FBQztJQUNyQyxDQUFDO0lBRUQsUUFBUTtRQUNKLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztJQUN0QixDQUFDO0NBQ0o7Ozs7Ozs7Ozs7Ozs7OztBQ2pCTSxNQUFNLEtBQUs7SUFJSDtJQUhILEtBQUssR0FBcUIsSUFBSSxLQUFLLEVBQUUsQ0FBQztJQUU5QyxZQUNXLFFBQWdCLEVBQ3ZCLEtBQWE7UUFETixhQUFRLEdBQVIsUUFBUSxDQUFRO1FBR3ZCLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLEtBQUssQ0FBQztJQUMzQixDQUFDO0lBRUQsUUFBUTtRQUNKLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztJQUN0QixDQUFDO0NBQ0o7Ozs7Ozs7Ozs7Ozs7Ozs7QUNmMkM7QUFHckMsTUFBTSxNQUFNO0lBSUo7SUFISCxLQUFLLEdBQXFCLElBQUksS0FBSyxFQUFFLENBQUM7SUFDdkMsUUFBUSxHQUFXLElBQUksb0RBQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDM0MsWUFDVyxRQUFnQixFQUN2QixLQUF1QixFQUN2QixhQUFxQjtRQUZkLGFBQVEsR0FBUixRQUFRLENBQVE7UUFJdkIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsSUFBRyxDQUFDLENBQUMsYUFBYTtZQUNsQixJQUFJLENBQUMsUUFBUSxHQUFHLGFBQWEsQ0FBQztJQUNsQyxDQUFDO0lBRUQsUUFBUTtRQUNKLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztJQUN0QixDQUFDO0NBQ0o7Ozs7Ozs7Ozs7Ozs7Ozs7QUNuQjZFO0FBRXZFLFNBQVMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLElBQUk7SUFDekMsT0FBTyxNQUFNLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUFFO1FBQzVCLE1BQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLDJEQUFhLEdBQUcsQ0FBQyxDQUFDO1FBQ2xELE1BQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLHlEQUFXLEdBQUcsMkRBQWEsR0FBRyxDQUFDLENBQUM7UUFDakUsTUFBTSxHQUFHLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsMkRBQWEsR0FBRyxDQUFDLENBQUM7UUFDakQsTUFBTSxNQUFNLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsMERBQVksR0FBRywyREFBYSxHQUFHLENBQUMsQ0FBQztRQUNuRSxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUM7ZUFDMUIsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxLQUFLLENBQUM7ZUFDMUIsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxHQUFHLENBQUM7ZUFDeEIsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQ3hDLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNWMEY7QUFHcEYsU0FBUyxtQkFBbUIsQ0FBQyxJQUFVLEVBQUUsS0FBWTtJQUN4RCxNQUFNLGNBQWMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLDBEQUFZLElBQUksQ0FBQyxHQUFHLHlEQUFXLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDdkUsTUFBTSxZQUFZLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcseURBQVcsR0FBRyxDQUFDLENBQUM7SUFDeEQsTUFBTSxZQUFZLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsMERBQVksR0FBRyxDQUFDLENBQUM7SUFDekQsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsMkRBQWEsR0FBRyxDQUFDLENBQUM7SUFDeEQsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsMkRBQWEsR0FBRyxDQUFDLENBQUM7SUFDeEQsTUFBTSxNQUFNLEdBQUcsQ0FBQywwREFBWSxHQUFHLDJEQUFhLEdBQUcsQ0FBQyxDQUFDLEdBQUcsY0FBYyxDQUFDO0lBQ25FLE1BQU0sTUFBTSxHQUFHLENBQUMseURBQVcsR0FBRywyREFBYSxHQUFHLENBQUMsQ0FBQyxHQUFHLGNBQWMsQ0FBQztJQUNsRSxNQUFNLFdBQVcsR0FBRyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUM7SUFDOUMsTUFBTSxXQUFXLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsMERBQVksR0FBRyxNQUFNLENBQUM7SUFDN0QsTUFBTSxlQUFlLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDO0lBQ2xELE1BQU0sZUFBZSxHQUFHLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQztJQUNsRCxNQUFNLDBCQUEwQixHQUFHLENBQUMsQ0FBQyxXQUFXLEdBQUcsZUFBZSxDQUFDO1dBQzVELENBQUMsV0FBVyxHQUFHLGVBQWUsQ0FBQztXQUMvQixDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7V0FDM0IsQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDLENBQUMsQ0FBQztJQUNwQyxNQUFNLDJCQUEyQixHQUFHLENBQUMsQ0FBQyxXQUFXLEdBQUcsZUFBZSxHQUFHLHlEQUFXLENBQUM7V0FDM0UsQ0FBQyxXQUFXLEdBQUcsZUFBZSxHQUFHLHlEQUFXLENBQUM7V0FDN0MsQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO1dBQzNCLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQyxDQUFDLENBQUM7SUFDcEMsSUFBSSxDQUFDLDBCQUEwQixJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsMkJBQTJCLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUU7UUFDN0csSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7S0FDekI7U0FBTTtRQUNILElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0tBQ3pCO0FBRUwsQ0FBQztBQUVNLFNBQVMsY0FBYyxDQUFDLElBQVUsRUFBRSxLQUFZO0lBQ25ELE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNsRSxNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLHlEQUFXLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDNUUsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcseURBQVcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDM0UsTUFBTSxLQUFLLEdBQUcsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLHlEQUFXLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDM0QsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUM7SUFDaEMsTUFBTSxTQUFTLEdBQUcsS0FBSyxHQUFHLFVBQVUsR0FBRyxZQUFZLENBQUM7SUFDcEQsTUFBTSxPQUFPLEdBQUcsQ0FBQyxDQUFDO0lBQ2xCLElBQUksU0FBUyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxHQUFHLENBQUMsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLEVBQUU7UUFDekQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDMUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7S0FDN0M7U0FBTTtRQUNILElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7S0FDdEM7SUFDRCxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxPQUFPLENBQUM7QUFDL0IsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNqRHdDO0FBUXBCO0FBSXJCLE1BQU0sV0FBVyxHQUFHO0lBQ2hCLHdCQUF3QjtJQUN4Qix5QkFBeUI7SUFDekIsMEJBQTBCO0lBQzFCLHVCQUF1QjtJQUN2QiwwQkFBMEI7Q0FDN0I7QUFFTSxTQUFTLFlBQVk7SUFDeEIsSUFBSSxDQUFDLEdBQUcsZ0VBQXdCLENBQUM7SUFDakMsSUFBSSxDQUFDLEdBQUcsaUVBQXlCLENBQUM7SUFFbEMsTUFBTSxNQUFNLEdBQVksRUFBRSxDQUFDO0lBRTNCLEtBQUssSUFBSSxHQUFHLEdBQUcsQ0FBQyxFQUFFLEdBQUcsR0FBRyxrREFBVSxFQUFFLEdBQUcsRUFBRSxFQUFFO1FBQ3ZDLEtBQUssSUFBSSxHQUFHLEdBQUcsQ0FBQyxFQUFFLEdBQUcsR0FBRyxtREFBVyxFQUFFLEdBQUcsRUFBRSxFQUFFO1lBQ3hDLE1BQU0sR0FBRyxHQUFXLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDO1lBRTdCLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxXQUFXLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztZQUN2RCxNQUFNLEtBQUssR0FBRyxJQUFJLGlEQUFLLENBQUMsR0FBRyxFQUFFLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNsRCxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ25CLENBQUMsSUFBSSw0REFBb0IsQ0FBQztTQUM3QjtRQUVELENBQUMsR0FBRyxnRUFBd0IsQ0FBQztRQUM3QixDQUFDLElBQUksNERBQW9CLENBQUM7S0FDN0I7SUFDRCxPQUFPLE1BQU0sQ0FBQztBQUNsQixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdkNELFNBQVM7QUFDRixNQUFNLFVBQVUsR0FBRyxDQUFDLENBQUM7QUFDckIsTUFBTSxXQUFXLEdBQUcsRUFBRSxDQUFDO0FBQ3ZCLE1BQU0sV0FBVyxHQUFHLEdBQUcsQ0FBQztBQUN4QixNQUFNLFlBQVksR0FBRyxFQUFFLENBQUM7QUFDeEIsTUFBTSx3QkFBd0IsR0FBRyxFQUFFLENBQUM7QUFDcEMsTUFBTSx5QkFBeUIsR0FBRyxFQUFFLENBQUM7QUFDckMsTUFBTSxvQkFBb0IsR0FBRyxHQUFHLENBQUM7QUFDakMsTUFBTSxvQkFBb0IsR0FBRyxFQUFFLENBQUM7QUFDaEMsTUFBTSxVQUFVLEdBQUcsR0FBRyxDQUFDO0FBRTlCLFFBQVE7QUFDRCxNQUFNLFdBQVcsR0FBRyxHQUFHLENBQUM7QUFDeEIsTUFBTSxZQUFZLEdBQUcsRUFBRSxDQUFDO0FBRS9CLE1BQU07QUFDQyxNQUFNLFVBQVUsR0FBRyxFQUFFLENBQUM7QUFDdEIsTUFBTSxXQUFXLEdBQUcsRUFBRSxDQUFDO0FBQ3ZCLE1BQU0sY0FBYyxHQUFHLEdBQUcsQ0FBQztBQUMzQixNQUFNLGNBQWMsR0FBRyxHQUFHLENBQUM7QUFDM0IsTUFBTSxhQUFhLEdBQUcsRUFBRSxDQUFDO0FBRWhDLGVBQWU7QUFDUixNQUFNLGtCQUFrQixHQUFHLEVBQUUsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDckIyRDtBQUd6RixTQUFTLHdCQUF3QixDQUFDLElBQVU7SUFDL0MsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDaEMsQ0FBQztBQUVNLFNBQVMsc0JBQXNCLENBQUMsSUFBSSxFQUFFLFVBQXNCO0lBQy9ELE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcscURBQWEsQ0FBQztBQUNyRSxDQUFDO0FBRU0sU0FBUyx1QkFBdUIsQ0FBQyxJQUFVO0lBQzlDLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ2hDLENBQUM7QUFFTSxTQUFTLHFCQUFxQixDQUFDLElBQVUsRUFBRSxVQUFzQjtJQUNwRSxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLFVBQVUsQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLHFEQUFhLENBQUM7QUFDdkUsQ0FBQztBQUNNLFNBQVMsZ0JBQWdCLENBQUMsSUFBVTtJQUN2QyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsa0RBQVUsQ0FBQyxDQUFDO0FBQzFDLENBQUM7QUFDTSxTQUFTLHdCQUF3QixDQUFDLElBQUksRUFBRSxLQUFLO0lBQ2hELE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcscURBQWEsR0FBRyxDQUFDLElBQUksS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsb0RBQVksQ0FBQyxDQUFDO0lBQ3BGLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcscURBQWEsR0FBRyxDQUFDLElBQUksS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNyRSxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLG1EQUFXLENBQUMsQ0FBQztJQUMvRCxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLHFEQUFhLENBQUMsQ0FBQztJQUNqRSxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxxREFBYSxHQUFHLENBQUMsSUFBSSxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztXQUMxRCxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLHFEQUFhLEdBQUcsQ0FBQyxJQUFJLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztXQUM5RCxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLHFEQUFhLEdBQUcsQ0FBQyxJQUFJLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLG1EQUFXLENBQUM7V0FDdkUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxxREFBYSxHQUFHLENBQUMsSUFBSSxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDdEUsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7OztBQ3pCMkI7QUFLckIsTUFBTSxVQUFVO0lBS1I7SUFKSCxHQUFHLENBQTJCO0lBQy9CLE1BQU0sQ0FBb0I7SUFFakMsWUFDVyxjQUFzQjtRQUF0QixtQkFBYyxHQUFkLGNBQWMsQ0FBUTtRQUU3QixJQUFJLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUFzQixDQUFDO1FBQzNFLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDNUMsQ0FBQztJQUVELFNBQVMsQ0FBQyxRQUFnQixFQUFFLEtBQXVCLEVBQUUsS0FBYSxFQUFFLE1BQWM7UUFDOUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUMsRUFBRSxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDckUsQ0FBQztJQUVELFVBQVUsQ0FBQyxNQUFlO1FBQ3RCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyx3REFBVSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ2pDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUNwQyxNQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3hCLE1BQU0sR0FBRyxHQUFXO29CQUNoQixDQUFDLEVBQUUsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO29CQUNuQixDQUFDLEVBQUUsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2lCQUN0QjtnQkFDRCxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsUUFBUSxFQUFFLEVBQUUseURBQVcsRUFBRSwwREFBWSxDQUFDLENBQUM7YUFDcEU7U0FDSjtJQUNMLENBQUM7SUFFRCxRQUFRLENBQUMsSUFBVTtRQUNmLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUUsMkRBQWEsRUFBRSwyREFBYSxDQUFDLENBQUM7SUFDakYsQ0FBQztJQUVELFNBQVMsQ0FBQyxLQUFhO1FBQ25CLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDckIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxFQUFFLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLHlEQUFXLEVBQUUsMERBQVksQ0FBQyxDQUFDO1FBQ3BHLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDekIsQ0FBQztJQUVELFVBQVU7UUFDTixPQUFPLElBQUksQ0FBQyxHQUFHLENBQUM7SUFDcEIsQ0FBQztDQUNKOzs7Ozs7O1VDdEREO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztVRU5BO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYnVkZ2V0ZWVyLXRzLy4vc3JjL0dlb21ldHJ5L1ZlY3Rvci50cyIsIndlYnBhY2s6Ly9idWRnZXRlZXItdHMvLi9zcmMvYXBwLnRzIiwid2VicGFjazovL2J1ZGdldGVlci10cy8uL3NyYy9lbmdpbmUvZ2FtZUxvb3AudHMiLCJ3ZWJwYWNrOi8vYnVkZ2V0ZWVyLXRzLy4vc3JjL2VuZ2luZS9tb3ZlLnRzIiwid2VicGFjazovL2J1ZGdldGVlci10cy8uL3NyYy9maWd1cmVzL0JhbGwudHMiLCJ3ZWJwYWNrOi8vYnVkZ2V0ZWVyLXRzLy4vc3JjL2ZpZ3VyZXMvQnJpY2sudHMiLCJ3ZWJwYWNrOi8vYnVkZ2V0ZWVyLXRzLy4vc3JjL2ZpZ3VyZXMvUGFkZGxlLnRzIiwid2VicGFjazovL2J1ZGdldGVlci10cy8uL3NyYy9waHlzaWNzL21pc2MudHMiLCJ3ZWJwYWNrOi8vYnVkZ2V0ZWVyLXRzLy4vc3JjL3BoeXNpY3MvbW92ZW1lbnQudHMiLCJ3ZWJwYWNrOi8vYnVkZ2V0ZWVyLXRzLy4vc3JjL3V0aWxzL2JyaWNrRmFjdG9yeS50cyIsIndlYnBhY2s6Ly9idWRnZXRlZXItdHMvLi9zcmMvdXRpbHMvY29uc3RhbnRzLnRzIiwid2VicGFjazovL2J1ZGdldGVlci10cy8uL3NyYy91dGlscy92YWxpZGF0b3JzLnRzIiwid2VicGFjazovL2J1ZGdldGVlci10cy8uL3NyYy92aWV3L0NhbnZhc1ZpZXcudHMiLCJ3ZWJwYWNrOi8vYnVkZ2V0ZWVyLXRzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2J1ZGdldGVlci10cy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYnVkZ2V0ZWVyLXRzL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYnVkZ2V0ZWVyLXRzL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYnVkZ2V0ZWVyLXRzL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vYnVkZ2V0ZWVyLXRzL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9idWRnZXRlZXItdHMvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBvaW50IH0gZnJvbSBcIi4vSW50ZXJmYWNlc1wiO1xuXG5leHBvcnQgY2xhc3MgVmVjdG9yIGltcGxlbWVudHMgUG9pbnQge1xuICAgIHg6IG51bWJlcjtcbiAgICB5OiBudW1iZXI7XG5cbiAgICBjb25zdHJ1Y3RvcihwOiBQb2ludClcbiAgICBjb25zdHJ1Y3Rvcih4OiBudW1iZXIsIHk6IG51bWJlcilcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgeE9yUG9pbnQ6IG51bWJlciB8IFBvaW50LFxuICAgICAgICB5PzogbnVtYmVyXG4gICAgKSB7XG4gICAgICAgIGlmICh0eXBlb2YgeE9yUG9pbnQgPT0gJ251bWJlcicgJiYgdHlwZW9mIHkgPT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIHRoaXMueCA9IHhPclBvaW50O1xuICAgICAgICAgICAgdGhpcy55ID0geTtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgeE9yUG9pbnQgPT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIHRoaXMueCA9IHhPclBvaW50Lng7XG4gICAgICAgICAgICB0aGlzLnkgPSB4T3JQb2ludC55O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYWRkKHA6IFBvaW50KSB7XG4gICAgICAgIHRoaXMueCArPSBwLng7XG4gICAgICAgIHRoaXMueSArPSBwLnk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHNjYWxlKHM6IG51bWJlcikge1xuICAgICAgICB0aGlzLnggKj0gcztcbiAgICAgICAgdGhpcy55ICo9IHM7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgZGlzdChwOiBQb2ludCkge1xuICAgICAgICBjb25zdCBkeCA9IHRoaXMueCAtIHAueDtcbiAgICAgICAgY29uc3QgZHkgPSB0aGlzLnkgLSBwLnk7XG4gICAgICAgIHJldHVybiBNYXRoLnNxcnQoZHggKiogMiArIGR5ICoqIDIpO1xuICAgIH1cblxuICAgIHNxTGVuZ3RoKCkge1xuICAgICAgICByZXR1cm4gdGhpcy54ICoqIDIgKyB0aGlzLnkgKiogMjtcbiAgICB9XG5cbiAgICBzdGF0aWMgYWRkKHAxOiBQb2ludCwgcDI6IFBvaW50KSB7XG4gICAgICAgIHJldHVybiBuZXcgVmVjdG9yKHAxLnggKyBwMi54LCBwMS55ICsgcDIueSk7XG4gICAgfVxufSIsImltcG9ydCB7IEJhbGwgfSBmcm9tIFwiLi9maWd1cmVzL0JhbGxcIjtcbmltcG9ydCB7IFBhZGRsZSB9IGZyb20gXCIuL2ZpZ3VyZXMvUGFkZGxlXCI7XG5pbXBvcnQgeyBWZWN0b3IgfSBmcm9tIFwiLi9HZW9tZXRyeS9WZWN0b3JcIjtcbmltcG9ydCB7IGNoYW5nZUJhbGxEaXJlY3Rpb24gfSBmcm9tIFwiLi9waHlzaWNzL21vdmVtZW50XCI7XG5pbXBvcnQgeyBjcmVhdGVCcmlja3MgfSBmcm9tIFwiLi91dGlscy9icmlja0ZhY3RvcnlcIjtcbmltcG9ydCB7XG4gICAgSU5JVElBTF9CQUxMX1gsIElOSVRJQUxfQkFMTF9ZLCBCUklDS19CT05VU19QT0lOVFMsXG59IGZyb20gXCIuL3V0aWxzL2NvbnN0YW50c1wiO1xuaW1wb3J0IHtcbiAgICBpc0JhbGxOZWFyQnJpY2tzXG59IGZyb20gXCIuL3V0aWxzL3ZhbGlkYXRvcnNcIjtcbmltcG9ydCB7IENhbnZhc1ZpZXcgfSBmcm9tIFwiLi92aWV3L0NhbnZhc1ZpZXdcIjtcbmltcG9ydCB7IGdldEhpdEJyaWNrSW5kZXggfSBmcm9tIFwiLi9waHlzaWNzL21pc2NcIjtcbmltcG9ydCB7IGdhbWVMb29wIH0gZnJvbSBcIi4vZW5naW5lL2dhbWVMb29wXCI7XG5cbmNvbnN0IGNhbnZhc1ZpZXcgPSBuZXcgQ2FudmFzVmlldyhcImdhbWVDYW52YXNcIik7XG5jb25zdCBnYW1lb3ZlckRpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZ2FtZU92ZXJcIik7XG5sZXQgbGFzdFRpbWUgPSAwO1xubGV0IGVsYXBzZWQgPSAwO1xuY29uc3QgU1RFUF9TSVpFID0gMjA7XG5jb25zdCBib2FyZEltZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdib2FyZCcpIGFzIEhUTUxJbWFnZUVsZW1lbnQ7XG5jb25zdCBib2FyZFBvc2l0aW9uID0gbmV3IFZlY3RvcihjYW52YXNWaWV3LmNhbnZhcy53aWR0aCAvIDIsIGNhbnZhc1ZpZXcuY2FudmFzLmhlaWdodCAtIDEwMCk7XG5sZXQgYnJpY2tzID0gY3JlYXRlQnJpY2tzKCk7XG5sZXQgYm9hcmRWZWxvY2l0eSA9IG5ldyBWZWN0b3IoMCwgMCk7XG5sZXQgYm9hcmQgPSBuZXcgUGFkZGxlKGJvYXJkUG9zaXRpb24sIGJvYXJkSW1nLCBib2FyZFZlbG9jaXR5KTtcbmNvbnN0IGJhbGxQb3NpdGlvbiA9IG5ldyBWZWN0b3IoSU5JVElBTF9CQUxMX1gsIElOSVRJQUxfQkFMTF9ZKTtcbmxldCBiYWxsVmVsb2NpdHkgPSBuZXcgVmVjdG9yKDMsIDMpO1xubGV0IGJhbGwgPSBuZXcgQmFsbChiYWxsUG9zaXRpb24sIFwiL2Fzc2V0cy9iYWxsLnBuZ1wiLCBiYWxsVmVsb2NpdHkpO1xuY29uc3QgaW5wdXQ6IHsgW2NvZGU6IHN0cmluZ106IGJvb2xlYW4gfSA9IHt9O1xuXG5cbmxldCBnYW1lT3ZlciA9IGZhbHNlO1xubGV0IHNjb3JlUG9pbnRzID0gMDtcbmxldCBtb3VzZUFjdGl2ZSA9IHRydWU7XG5cblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBldmVudCA9PiB7XG4gICAgaW5wdXRbZXZlbnQuY29kZV0gPSB0cnVlO1xufSk7XG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBldmVudCA9PiB7XG4gICAgaW5wdXRbZXZlbnQuY29kZV0gPSBmYWxzZTtcbn0pO1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCAoZSkgPT4ge1xuICAgIGJvYXJkLnBvc2l0aW9uLnggPSBlLmNsaWVudFg7XG59KVxuXG53aW5kb3cub25jb250ZXh0bWVudSA9IChlKSA9PiB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGNvbnNvbGUubG9nKFwicmlnaHQgY2xpY2tlZFwiKTtcbiAgICBtb3VzZUFjdGl2ZSA9IGZhbHNlO1xufVxuY29uc3QgcGxheUJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbGF5LWJ0bicpO1xubGV0IGlzUGxheU11c2ljID0gZmFsc2U7XG5cbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibmV3LWdhbWVcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBnYW1lT3ZlciA9IGZhbHNlO1xuICAgIHN0YXJ0R2FtZSgpO1xuICAgIGdhbWVvdmVyRGl2LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIlxufSk7XG5wbGF5QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250YWluZXInKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnYW1lQ2FudmFzJykuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgc3RhcnRHYW1lKCk7XG5cbiAgICBpZiAoaXNQbGF5TXVzaWMpIHtcbiAgICAgICAgY29uc3QgbXVzaWMgPSBuZXcgQXVkaW8oXCIuLi9hc3NldHMvbXVzaWMubXAzXCIpO1xuICAgICAgICBtdXNpYy52b2x1bWUgPSAwLjE7XG4gICAgICAgIG11c2ljLnBsYXkoKTtcbiAgICB9XG59KTtcblxuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NldHRpbmctYnRuJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgY29uc3Qgc2V0dGluZ3NDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2V0dGluZ3MtY29udGFpbmVyJyk7XG4gICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRhaW5lcicpO1xuICAgIHNldHRpbmdzQ29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgIGNvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdiYWNrLWJ0bicpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICBzZXR0aW5nc0NvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICBjb250YWluZXIuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgfSlcblxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbGF5LXNvdW5kLWJ0bicpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICBpc1BsYXlNdXNpYyA9IHRydWU7XG4gICAgICAgIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ2ctY2hlY2snKSBhcyBIVE1MRWxlbWVudCkuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgfSlcbn0pXG5cbmZ1bmN0aW9uIHN0YXJ0R2FtZSgpIHtcbiAgICBicmlja3MgPSBjcmVhdGVCcmlja3MoKTtcbiAgICBib2FyZCA9IG5ldyBQYWRkbGUoYm9hcmRQb3NpdGlvbiwgYm9hcmRJbWcpO1xuICAgIGNvbnN0IGJhbGxQb3NpdGlvbiA9IG5ldyBWZWN0b3IoSU5JVElBTF9CQUxMX1gsIElOSVRJQUxfQkFMTF9ZKVxuICAgIGJhbGwgPSBuZXcgQmFsbChiYWxsUG9zaXRpb24sIFwiL2Fzc2V0cy9iYWxsLnBuZ1wiKTtcbiAgICBiYWxsLnZlbG9jaXR5ID0gbmV3IFZlY3RvcigzLCAzKTtcbiAgICBzY29yZVBvaW50cyA9IDA7XG4gICAgdXBkYXRlKHBlcmZvcm1hbmNlLm5vdygpKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZSh0aW1lOiBudW1iZXIpIHtcbiAgICBjb25zdCBkZWx0YSA9IHRpbWUgLSBsYXN0VGltZTtcbiAgICBsYXN0VGltZSA9IHRpbWU7XG4gICAgZWxhcHNlZCArPSBkZWx0YTtcbiAgICBsZXQgZGVsZXRlQnJpY2tJbmRleCA9IGlzQmFsbE5lYXJCcmlja3MoYmFsbCkgPyBnZXRIaXRCcmlja0luZGV4KGJyaWNrcywgYmFsbCkgOiAtMTtcbiAgICBpZiAoZGVsZXRlQnJpY2tJbmRleCAhPSAtMSkge1xuICAgICAgICBjb25zdCBicmljayA9IGJyaWNrc1tkZWxldGVCcmlja0luZGV4XTtcbiAgICAgICAgY2hhbmdlQmFsbERpcmVjdGlvbihiYWxsLCBicmljayk7XG4gICAgICAgIGJyaWNrcy5zcGxpY2UoZGVsZXRlQnJpY2tJbmRleCwgMSk7XG4gICAgICAgIHNjb3JlUG9pbnRzICs9IEJSSUNLX0JPTlVTX1BPSU5UUztcbiAgICB9XG4gICAgaWYgKGVsYXBzZWQgPiBTVEVQX1NJWkUgKiA1KSB7XG4gICAgICAgIGVsYXBzZWQgPSBTVEVQX1NJWkUgKiA1O1xuICAgIH1cbiAgICB3aGlsZSAoZWxhcHNlZCA+IFNURVBfU0laRSkge1xuICAgICAgICBlbGFwc2VkIC09IFNURVBfU0laRTtcbiAgICAgICAgY29uc3QgbG9vcCA9IGdhbWVMb29wLmJpbmQobnVsbCwgYmFsbCwgYm9hcmQsIGJyaWNrcywgY2FudmFzVmlldywgZ2FtZU92ZXIpO1xuICAgICAgICBsb29wKCk7XG4gICAgICAgIGRvY3VtZW50W1wibmV3Z2FtZVwiXSA9IHRydWU7XG4gICAgfVxuICAgIGlmIChicmlja3MubGVuZ3RoICYmICFnYW1lT3Zlcikge1xuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodXBkYXRlKTtcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzaG93R2FtZU92ZXJNZXNzYWdlKCkge1xuICAgIGdhbWVvdmVyRGl2LnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgKGdhbWVvdmVyRGl2IGFzIEhUTUxEaXZFbGVtZW50KS5pbm5lclRleHQgPSBgR2FtZSBvdmVyLCBzY29yZToke3Njb3JlUG9pbnRzfWA7XG59IiwiaW1wb3J0IHsgY3JlYXRlQnJpY2tzIH0gZnJvbSBcIi4uL3V0aWxzL2JyaWNrRmFjdG9yeVwiO1xuaW1wb3J0IHsgQ2FudmFzVmlldyB9IGZyb20gXCIuLi92aWV3L0NhbnZhc1ZpZXdcIjtcbmltcG9ydCB7IFBhZGRsZSB9IGZyb20gXCIuLi9maWd1cmVzL1BhZGRsZVwiO1xuaW1wb3J0IHsgQmFsbCB9IGZyb20gXCIuLi9maWd1cmVzL0JhbGxcIjtcbmltcG9ydCB7IFZlY3RvciB9IGZyb20gXCIuLi9HZW9tZXRyeS9WZWN0b3JcIjtcbmltcG9ydCB7IG1vdmUgfSBmcm9tIFwiLi9tb3ZlXCI7XG5pbXBvcnQge1xuICAgIEJBTExfRElBTUVURVIsXG4gICAgQk9BUkRfSEVJR0hULCBCT0FSRF9XSURUSCwgQlJJQ0tfQk9OVVNfUE9JTlRTLCBCUklDS19IRUlHSFQsIEJSSUNLX1dJRFRILFxuICAgIElOSVRJQUxfQkFMTF9YLCBJTklUSUFMX0JBTExfWVxufSBmcm9tIFwiLi4vdXRpbHMvY29uc3RhbnRzXCI7XG5pbXBvcnQge1xuICAgIGlzQmFsbEhpdHRpbmdUaGVGbG9vciwgaXNCYWxsSGl0dGluZ1RoZUNlaWxpbmcsIGlzQmFsbEhpdHRpbmdSaWdodFdhbGwsXG4gICAgaXNCYWxsSGl0dGluZ1RoZUxlZnRXYWxsLCBpc0JhbGxOZWFyQnJpY2tzLCBpc0JhbGxDb2xsaWRpbmdXaXRoQm9hcmRcbn0gZnJvbSBcIi4uL3V0aWxzL3ZhbGlkYXRvcnNcIjtcbmltcG9ydCB7IHNob3dHYW1lT3Zlck1lc3NhZ2UgfSBmcm9tIFwiLi4vYXBwXCI7XG5pbXBvcnQgeyBoYW5kbGVCb2FyZEhpdCB9IGZyb20gXCIuLi9waHlzaWNzL21vdmVtZW50XCI7XG5cblxuY29uc3QgY2FudmFzVmlldyA9IG5ldyBDYW52YXNWaWV3KFwiZ2FtZUNhbnZhc1wiKTtcblxuY29uc3QgaW5wdXQ6IHsgW2NvZGU6IHN0cmluZ106IGJvb2xlYW4gfSA9IHt9O1xuXG5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgZXZlbnQgPT4ge1xuICAgIGlucHV0W2V2ZW50LmNvZGVdID0gdHJ1ZTtcbn0pO1xud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgZXZlbnQgPT4ge1xuICAgIGlucHV0W2V2ZW50LmNvZGVdID0gZmFsc2U7XG59KTtcbi8vdG9kby1iYWxsLCBib2FyZCwgYnJpY2tzLT5nYW1lT2JqZWN0c3t9XG5leHBvcnQgZnVuY3Rpb24gZ2FtZUxvb3AoYmFsbCwgYm9hcmQsIGJyaWNrcywgY2FudmFzVmlldywgZ2FtZU92ZXIpIHtcbiAgICBpZiAoaW5wdXRbJ0Fycm93TGVmdCddICYmIChib2FyZC5wb3NpdGlvbi54ID4gMCkpIHtcbiAgICAgICAgYm9hcmQudmVsb2NpdHkueCA9IC03O1xuICAgICAgICBtb3ZlKGJvYXJkLCBib2FyZC52ZWxvY2l0eSk7XG4gICAgfSBlbHNlIGlmIChpbnB1dFsnQXJyb3dSaWdodCddICYmIChib2FyZC5wb3NpdGlvbi54ICsgQk9BUkRfV0lEVEggPCBjYW52YXNWaWV3LmNhbnZhcy53aWR0aCkpIHtcbiAgICAgICAgYm9hcmQudmVsb2NpdHkueCA9IDc7XG4gICAgICAgIG1vdmUoYm9hcmQsIGJvYXJkLnZlbG9jaXR5KTtcbiAgICB9XG4gICAgY2FudmFzVmlldy5nZXRDb250ZXh0KCkuY2xlYXJSZWN0KDAsIDAsIGNhbnZhc1ZpZXcuY2FudmFzLndpZHRoLCBjYW52YXNWaWV3LmNhbnZhcy5oZWlnaHQpO1xuICAgIGNhbnZhc1ZpZXcuZHJhd0JyaWNrcyhicmlja3MpO1xuICAgIGNhbnZhc1ZpZXcuZHJhd0JvYXJkKGJvYXJkKTtcbiAgICBjYW52YXNWaWV3LmRyYXdCYWxsKGJhbGwpO1xuICAgIGNvbGxpc2lvbkRldGVjdG9yKGJhbGwsIGJvYXJkLCBnYW1lT3Zlcik7XG4gICAgbW92ZShiYWxsLCBiYWxsLnZlbG9jaXR5KTtcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gY29sbGlzaW9uRGV0ZWN0b3IoYmFsbDogQmFsbCwgYm9hcmQ6IFBhZGRsZSwgZ2FtZU92ZXI6IGJvb2xlYW4pIHtcbiAgICBpZiAoaXNCYWxsQ29sbGlkaW5nV2l0aEJvYXJkKGJhbGwsIGJvYXJkKSkge1xuICAgICAgICBoYW5kbGVCb2FyZEhpdChiYWxsLCBib2FyZCk7XG4gICAgfVxuICAgIGlmIChpc0JhbGxIaXR0aW5nVGhlRmxvb3IoYmFsbCwgY2FudmFzVmlldykpIHtcbiAgICAgICAgZ2FtZU92ZXIgPSB0cnVlO1xuICAgICAgICBzaG93R2FtZU92ZXJNZXNzYWdlKCk7XG4gICAgfSBlbHNlIGlmIChpc0JhbGxIaXR0aW5nVGhlQ2VpbGluZyhiYWxsKSkge1xuICAgICAgICBiYWxsLnZlbG9jaXR5LnkgPSBNYXRoLmFicyhiYWxsLnZlbG9jaXR5LnkpO1xuICAgIH0gZWxzZSBpZiAoaXNCYWxsSGl0dGluZ1JpZ2h0V2FsbChiYWxsLCBjYW52YXNWaWV3KSkge1xuICAgICAgICBiYWxsLnZlbG9jaXR5LnggPSAtIGJhbGwudmVsb2NpdHkueDtcbiAgICB9IGVsc2UgaWYgKGlzQmFsbEhpdHRpbmdUaGVMZWZ0V2FsbChiYWxsKSkge1xuICAgICAgICBiYWxsLnZlbG9jaXR5LnggPSBNYXRoLmFicyhiYWxsLnZlbG9jaXR5LngpO1xuICAgIH1cbn0iLCJpbXBvcnQgeyBWZWN0b3IgfSBmcm9tIFwiLi4vdXRpbHMvdmVjdG9yXCI7XG5cblxuZXhwb3J0IGZ1bmN0aW9uIG1vdmUoZ2FtZU9iamVjdDogR2FtZU9iamVjdCwgdmVsb2NpdHk6IFZlY3Rvcikge1xuICAgIGdhbWVPYmplY3QucG9zaXRpb24ueCArPSB2ZWxvY2l0eS54O1xuICAgIGdhbWVPYmplY3QucG9zaXRpb24ueSArPSB2ZWxvY2l0eS55O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEdhbWVPYmplY3Qge1xuICAgIHBvc2l0aW9uOiB7IHg6IG51bWJlciwgeTogbnVtYmVyIH1cbn0iLCJpbXBvcnQgeyBWZWN0b3IgfSBmcm9tIFwiLi4vR2VvbWV0cnkvVmVjdG9yXCI7XG5cblxuZXhwb3J0IGNsYXNzIEJhbGwge1xuICAgIHByaXZhdGUgaW1hZ2U6IEhUTUxJbWFnZUVsZW1lbnQgPSBuZXcgSW1hZ2UoKTtcbiAgICBwdWJsaWMgdmVsb2NpdHk6IFZlY3RvciA9IG5ldyBWZWN0b3IoMCwgMCk7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHB1YmxpYyBwb3NpdGlvbjogVmVjdG9yLFxuICAgICAgICBpbWFnZTogc3RyaW5nLFxuICAgICAgICBiYWxsdmVsb2NpdHk/OiBWZWN0b3JcbiAgICApIHtcbiAgICAgICAgdGhpcy5pbWFnZS5zcmMgPSBpbWFnZTtcbiAgICAgICAgaWYgKCEhYmFsbHZlbG9jaXR5KVxuICAgICAgICAgICAgdGhpcy52ZWxvY2l0eSA9IGJhbGx2ZWxvY2l0eTtcbiAgICB9XG5cbiAgICBnZXRJbWFnZSgpOiBIVE1MSW1hZ2VFbGVtZW50IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaW1hZ2U7XG4gICAgfVxufSIsImltcG9ydCB7IFZlY3RvciB9IGZyb20gXCIuLi91dGlscy92ZWN0b3JcIjtcblxuZXhwb3J0IGNsYXNzIEJyaWNrIHtcbiAgICBwcml2YXRlIGltYWdlOiBIVE1MSW1hZ2VFbGVtZW50ID0gbmV3IEltYWdlKCk7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIHBvc2l0aW9uOiBWZWN0b3IsXG4gICAgICAgIGltYWdlOiBzdHJpbmdcbiAgICApIHtcbiAgICAgICAgdGhpcy5pbWFnZS5zcmMgPSBpbWFnZTtcbiAgICB9XG5cbiAgICBnZXRJbWFnZSgpOiBIVE1MSW1hZ2VFbGVtZW50IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaW1hZ2U7XG4gICAgfVxufSIsImltcG9ydCB7IFZlY3RvciB9IGZyb20gXCIuLi9HZW9tZXRyeS9WZWN0b3JcIjtcblxuXG5leHBvcnQgY2xhc3MgUGFkZGxlIHtcbiAgICBwcml2YXRlIGltYWdlOiBIVE1MSW1hZ2VFbGVtZW50ID0gbmV3IEltYWdlKCk7XG4gICAgcHVibGljIHZlbG9jaXR5OiBWZWN0b3IgPSBuZXcgVmVjdG9yKDAsIDApO1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwdWJsaWMgcG9zaXRpb246IFZlY3RvcixcbiAgICAgICAgaW1hZ2U6IEhUTUxJbWFnZUVsZW1lbnQsXG4gICAgICAgIGJvYXJkdmVsb2NpdHk/OlZlY3RvclxuICAgICkge1xuICAgICAgICB0aGlzLmltYWdlID0gaW1hZ2U7XG4gICAgICAgIGlmKCEhYm9hcmR2ZWxvY2l0eSlcbiAgICAgICAgdGhpcy52ZWxvY2l0eSA9IGJvYXJkdmVsb2NpdHk7XG4gICAgfVxuXG4gICAgZ2V0SW1hZ2UoKTogSFRNTEltYWdlRWxlbWVudCB7XG4gICAgICAgIHJldHVybiB0aGlzLmltYWdlO1xuICAgIH1cbn0iLCJpbXBvcnQgeyBCQUxMX0RJQU1FVEVSLCBCUklDS19XSURUSCwgQlJJQ0tfSEVJR0hUIH0gZnJvbSBcIi4uL3V0aWxzL2NvbnN0YW50c1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0SGl0QnJpY2tJbmRleChicmlja3MsIGJhbGwpIHtcbiAgICByZXR1cm4gYnJpY2tzLmZpbmRJbmRleChicmljayA9PiB7XG4gICAgICAgIGNvbnN0IGxlZnQgPSBicmljay5wb3NpdGlvbi54IC0gQkFMTF9ESUFNRVRFUiAvIDI7XG4gICAgICAgIGNvbnN0IHJpZ2h0ID0gYnJpY2sucG9zaXRpb24ueCArIEJSSUNLX1dJRFRIICsgQkFMTF9ESUFNRVRFUiAvIDI7XG4gICAgICAgIGNvbnN0IHRvcCA9IGJyaWNrLnBvc2l0aW9uLnkgLSBCQUxMX0RJQU1FVEVSIC8gMjtcbiAgICAgICAgY29uc3QgYm90dG9tID0gYnJpY2sucG9zaXRpb24ueSArIEJSSUNLX0hFSUdIVCArIEJBTExfRElBTUVURVIgLyAyO1xuICAgICAgICByZXR1cm4gKChiYWxsLnBvc2l0aW9uLnggPj0gbGVmdClcbiAgICAgICAgICAgICYmIChiYWxsLnBvc2l0aW9uLnggPD0gcmlnaHQpXG4gICAgICAgICAgICAmJiAoYmFsbC5wb3NpdGlvbi55ID49IHRvcClcbiAgICAgICAgICAgICYmIChiYWxsLnBvc2l0aW9uLnkgPD0gYm90dG9tKSk7XG4gICAgfSk7XG59IiwiaW1wb3J0IHsgQmFsbCB9IGZyb20gXCIuLi9maWd1cmVzL0JhbGxcIjtcbmltcG9ydCB7IEJyaWNrIH0gZnJvbSBcIi4uL2ZpZ3VyZXMvQnJpY2tcIjtcbmltcG9ydCB7IFBhZGRsZSB9IGZyb20gXCIuLi9maWd1cmVzL1BhZGRsZVwiO1xuaW1wb3J0IHsgQlJJQ0tfSEVJR0hULCBCUklDS19XSURUSCwgQkFMTF9ESUFNRVRFUiwgQk9BUkRfV0lEVEggfSBmcm9tIFwiLi4vdXRpbHMvY29uc3RhbnRzXCI7XG5pbXBvcnQgeyBWZWN0b3IgfSBmcm9tIFwiLi4vdXRpbHMvdmVjdG9yXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBjaGFuZ2VCYWxsRGlyZWN0aW9uKGJhbGw6IEJhbGwsIGJyaWNrOiBCcmljaykge1xuICAgIGNvbnN0IEJSSUNLX0RJQUdPTkFMID0gTWF0aC5zcXJ0KEJSSUNLX0hFSUdIVCAqKiAyICsgQlJJQ0tfV0lEVEggKiogMik7XG4gICAgY29uc3QgYnJpY2tDZW50ZXJYID0gYnJpY2sucG9zaXRpb24ueCArIEJSSUNLX1dJRFRIIC8gMjtcbiAgICBjb25zdCBicmlja0NlbnRlclkgPSBicmljay5wb3NpdGlvbi55ICsgQlJJQ0tfSEVJR0hUIC8gMjtcbiAgICBjb25zdCBiYWxsQ2VudGVyWCA9IGJhbGwucG9zaXRpb24ueCArIEJBTExfRElBTUVURVIgLyAyO1xuICAgIGNvbnN0IGJhbGxDZW50ZXJZID0gYmFsbC5wb3NpdGlvbi55ICsgQkFMTF9ESUFNRVRFUiAvIDI7XG4gICAgY29uc3QgZGVsdGFZID0gKEJSSUNLX0hFSUdIVCAqIEJBTExfRElBTUVURVIgLyAyKSAvIEJSSUNLX0RJQUdPTkFMO1xuICAgIGNvbnN0IGRlbHRhWCA9IChCUklDS19XSURUSCAqIEJBTExfRElBTUVURVIgLyAyKSAvIEJSSUNLX0RJQUdPTkFMO1xuICAgIGNvbnN0IG1pbllTaWRlSGl0ID0gYnJpY2sucG9zaXRpb24ueSArIGRlbHRhWTtcbiAgICBjb25zdCBtYXhZU2lkZUhpdCA9IGJyaWNrLnBvc2l0aW9uLnkgKyBCUklDS19IRUlHSFQgLSBkZWx0YVk7XG4gICAgY29uc3QgbWluTGVmdFhTaWRlSGl0ID0gYnJpY2sucG9zaXRpb24ueCAtIGRlbHRhWDtcbiAgICBjb25zdCBtYXhMZWZ0WFNpZGVIaXQgPSBicmljay5wb3NpdGlvbi54ICsgZGVsdGFYO1xuICAgIGNvbnN0IGlzQmFsbENvbWluZ0Zyb21CdXR0b21MZWZ0ID0gKChiYWxsQ2VudGVyWCA+IG1pbkxlZnRYU2lkZUhpdClcbiAgICAgICAgJiYgKGJhbGxDZW50ZXJYIDwgbWF4TGVmdFhTaWRlSGl0KVxuICAgICAgICAmJiAoYmFsbENlbnRlclkgPiBtaW5ZU2lkZUhpdClcbiAgICAgICAgJiYgKGJhbGxDZW50ZXJZIDwgbWF4WVNpZGVIaXQpKTtcbiAgICBjb25zdCBpc0JhbGxDb21pbmdGcm9tQnV0dG9tUmlnaHQgPSAoKGJhbGxDZW50ZXJYID4gbWluTGVmdFhTaWRlSGl0ICsgQlJJQ0tfV0lEVEgpXG4gICAgICAgICYmIChiYWxsQ2VudGVyWCA8IG1heExlZnRYU2lkZUhpdCArIEJSSUNLX1dJRFRIKVxuICAgICAgICAmJiAoYmFsbENlbnRlclkgPiBtaW5ZU2lkZUhpdClcbiAgICAgICAgJiYgKGJhbGxDZW50ZXJZIDwgbWF4WVNpZGVIaXQpKTtcbiAgICBpZiAoKGlzQmFsbENvbWluZ0Zyb21CdXR0b21MZWZ0ICYmIGJhbGwudmVsb2NpdHkueCA+IDApIHx8IChpc0JhbGxDb21pbmdGcm9tQnV0dG9tUmlnaHQgJiYgYmFsbC52ZWxvY2l0eS54IDwgMCkpIHtcbiAgICAgICAgYmFsbC52ZWxvY2l0eS54ICo9IC0xO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGJhbGwudmVsb2NpdHkueSAqPSAtMTtcbiAgICB9XG5cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGhhbmRsZUJvYXJkSGl0KGJhbGw6IEJhbGwsIGJvYXJkOlBhZGRsZSkge1xuICAgIGNvbnN0IGN1cnJlbnRBbmdsZSA9IE1hdGguYXRhbjIoYmFsbC5wb3NpdGlvbi55LCBiYWxsLnBvc2l0aW9uLngpO1xuICAgIGNvbnN0IGRlbHRhQ2VudGVyWCA9IGJhbGwucG9zaXRpb24ueCAtIChib2FyZC5wb3NpdGlvbi54IC0gQk9BUkRfV0lEVEggLyAyKTtcbiAgICBjb25zdCBzaWduID0gYmFsbC5wb3NpdGlvbi54ID4gYm9hcmQucG9zaXRpb24ueCArIEJPQVJEX1dJRFRIIC8gMiA/IDEgOiAtMTtcbiAgICBjb25zdCBjb2VmZiA9IHNpZ24gKiAoYmFsbC5wb3NpdGlvbi54KSAvIChCT0FSRF9XSURUSCAvIDIpO1xuICAgIGNvbnN0IGFuZ2xlVG9BZGQgPSBNYXRoLlBJIC8gMjA7XG4gICAgY29uc3QgbmV4dEFuZ2xlID0gY29lZmYgKiBhbmdsZVRvQWRkICsgY3VycmVudEFuZ2xlO1xuICAgIGNvbnN0IHlPZmZzZXQgPSA1O1xuICAgIGlmIChuZXh0QW5nbGUgPCAyICogTWF0aC5QSSAvIDMgJiYgbmV4dEFuZ2xlID4gTWF0aC5QSSAvIDIwKSB7XG4gICAgICAgIGJhbGwudmVsb2NpdHkueCA9IDcgKiBNYXRoLnNpbihuZXh0QW5nbGUpO1xuICAgICAgICBiYWxsLnZlbG9jaXR5LnkgPSA3ICogTWF0aC5jb3MobmV4dEFuZ2xlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBiYWxsLnZlbG9jaXR5LnkgPSAtYmFsbC52ZWxvY2l0eS55O1xuICAgIH1cbiAgICBiYWxsLnBvc2l0aW9uLnkgLT0geU9mZnNldDtcbn0iLCJpbXBvcnQgeyBCcmljayB9IGZyb20gXCIuLi9maWd1cmVzL0JyaWNrXCI7XG5pbXBvcnQge1xuICAgIEJSSUNLU19DT0xTLFxuICAgIEJSSUNLX1JPV1MsXG4gICAgSU5DUkVFTU5UX0RPV05fQlJJQ0ssXG4gICAgSU5DUkVNRU5UX0xFRlRfQlJJQ0ssXG4gICAgSU5JVElBTF9TVEFSVF9CUklDS19MRUZULFxuICAgIElOSVRJQUxfU1RBUlRfQlJJQ0tfUklHSFRcbn0gZnJvbSBcIi4vY29uc3RhbnRzXCI7XG5cbmltcG9ydCB7IFZlY3RvciB9IGZyb20gXCIuL3ZlY3RvclwiO1xuXG5jb25zdCBicmlja3NJbWFnZSA9IFtcbiAgICBcIi9hc3NldHMvYnJpY2stYmx1ZS5wbmdcIixcbiAgICBcIi9hc3NldHMvYnJpY2stZ3JlZW4ucG5nXCIsXG4gICAgXCIvYXNzZXRzL2JyaWNrLXB1cnBsZS5wbmdcIixcbiAgICBcIi9hc3NldHMvYnJpY2stcmVkLnBuZ1wiLFxuICAgIFwiL2Fzc2V0cy9icmljay15ZWxsb3cucG5nXCJcbl1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUJyaWNrcygpOiBCcmlja1tdIHtcbiAgICBsZXQgeCA9IElOSVRJQUxfU1RBUlRfQlJJQ0tfTEVGVDtcbiAgICBsZXQgeSA9IElOSVRJQUxfU1RBUlRfQlJJQ0tfUklHSFQ7XG5cbiAgICBjb25zdCBicmlja3M6IEJyaWNrW10gPSBbXTtcblxuICAgIGZvciAobGV0IHJvdyA9IDA7IHJvdyA8IEJSSUNLX1JPV1M7IHJvdysrKSB7XG4gICAgICAgIGZvciAobGV0IGNvbCA9IDA7IGNvbCA8IEJSSUNLU19DT0xTOyBjb2wrKykge1xuICAgICAgICAgICAgY29uc3QgcG9zOiBWZWN0b3IgPSB7IHgsIHkgfTtcblxuICAgICAgICAgICAgY29uc3QgcmFuZFBvcyA9IE1hdGgucmFuZG9tKCkgKiBicmlja3NJbWFnZS5sZW5ndGggfCAwO1xuICAgICAgICAgICAgY29uc3QgYnJpY2sgPSBuZXcgQnJpY2socG9zLCBicmlja3NJbWFnZVtyYW5kUG9zXSlcbiAgICAgICAgICAgIGJyaWNrcy5wdXNoKGJyaWNrKTtcbiAgICAgICAgICAgIHggKz0gSU5DUkVNRU5UX0xFRlRfQlJJQ0s7XG4gICAgICAgIH1cbiAgICBcbiAgICAgICAgeCA9IElOSVRJQUxfU1RBUlRfQlJJQ0tfTEVGVDtcbiAgICAgICAgeSArPSBJTkNSRUVNTlRfRE9XTl9CUklDSztcbiAgICB9XG4gICAgcmV0dXJuIGJyaWNrcztcbn0iLCJcbi8vIEJSSUNLU1xuZXhwb3J0IGNvbnN0IEJSSUNLX1JPV1MgPSAzO1xuZXhwb3J0IGNvbnN0IEJSSUNLU19DT0xTID0gMTA7XG5leHBvcnQgY29uc3QgQlJJQ0tfV0lEVEggPSAxMDA7XG5leHBvcnQgY29uc3QgQlJJQ0tfSEVJR0hUID0gNDA7XG5leHBvcnQgY29uc3QgSU5JVElBTF9TVEFSVF9CUklDS19MRUZUID0gMTA7XG5leHBvcnQgY29uc3QgSU5JVElBTF9TVEFSVF9CUklDS19SSUdIVCA9IDEwO1xuZXhwb3J0IGNvbnN0IElOQ1JFTUVOVF9MRUZUX0JSSUNLID0gMTIwO1xuZXhwb3J0IGNvbnN0IElOQ1JFRU1OVF9ET1dOX0JSSUNLID0gNjA7XG5leHBvcnQgY29uc3QgQlJJQ0tTX0VORCA9IDE3MDtcblxuLy8gQk9BUkRcbmV4cG9ydCBjb25zdCBCT0FSRF9XSURUSCA9IDEyMDtcbmV4cG9ydCBjb25zdCBCT0FSRF9IRUlHSFQgPSAyMDtcblxuLy9CQUxMXG5leHBvcnQgY29uc3QgQkFMTF9XSURUSCA9IDQwO1xuZXhwb3J0IGNvbnN0IEJBTExfSEVJR0hUID0gNDA7XG5leHBvcnQgY29uc3QgSU5JVElBTF9CQUxMX1ggPSAyMDA7XG5leHBvcnQgY29uc3QgSU5JVElBTF9CQUxMX1kgPSAyMDA7XG5leHBvcnQgY29uc3QgQkFMTF9ESUFNRVRFUiA9IDQwO1xuXG4vL01JU0NFTExBTkVPVVNcbmV4cG9ydCBjb25zdCBCUklDS19CT05VU19QT0lOVFMgPSAxMDsiLCJpbXBvcnQgeyBCYWxsIH0gZnJvbSBcIi4uL2ZpZ3VyZXMvQmFsbFwiO1xuaW1wb3J0IHsgUGFkZGxlIH0gZnJvbSBcIi4uL2ZpZ3VyZXMvUGFkZGxlXCI7XG5pbXBvcnQgeyBDYW52YXNWaWV3IH0gZnJvbSBcIi4uL3ZpZXcvQ2FudmFzVmlld1wiO1xuaW1wb3J0IHsgQkFMTF9ESUFNRVRFUiwgQk9BUkRfSEVJR0hULCBCT0FSRF9XSURUSCwgQlJJQ0tTX0VORCwgQlJJQ0tfV0lEVEggfSBmcm9tIFwiLi9jb25zdGFudHNcIjtcblxuXG5leHBvcnQgZnVuY3Rpb24gaXNCYWxsSGl0dGluZ1RoZUxlZnRXYWxsKGJhbGw6IEJhbGwpIHtcbiAgICByZXR1cm4gYmFsbC5wb3NpdGlvbi54IDw9IDA7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0JhbGxIaXR0aW5nUmlnaHRXYWxsKGJhbGwsIGNhbnZhc1ZpZXc6IENhbnZhc1ZpZXcpIHtcbiAgICByZXR1cm4gYmFsbC5wb3NpdGlvbi54ID4gY2FudmFzVmlldy5jYW52YXMud2lkdGggLSBCQUxMX0RJQU1FVEVSO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNCYWxsSGl0dGluZ1RoZUNlaWxpbmcoYmFsbDogQmFsbCkge1xuICAgIHJldHVybiBiYWxsLnBvc2l0aW9uLnkgPD0gMDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzQmFsbEhpdHRpbmdUaGVGbG9vcihiYWxsOiBCYWxsLCBjYW52YXNWaWV3OiBDYW52YXNWaWV3KSB7XG4gICAgcmV0dXJuIGJhbGwucG9zaXRpb24ueSA+PSBjYW52YXNWaWV3LmNhbnZhcy5oZWlnaHQgLSBCQUxMX0RJQU1FVEVSO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGlzQmFsbE5lYXJCcmlja3MoYmFsbDogQmFsbCkge1xuICAgIHJldHVybiAoYmFsbC5wb3NpdGlvbi55IDwgQlJJQ0tTX0VORCk7XG59XG5leHBvcnQgZnVuY3Rpb24gaXNCYWxsQ29sbGlkaW5nV2l0aEJvYXJkKGJhbGwsIGJvYXJkKSB7XG4gICAgY29uc29sZS5sb2coYmFsbC5wb3NpdGlvbi55ICsgQkFMTF9ESUFNRVRFUiAvIDIgPD0gYm9hcmQucG9zaXRpb24ueSArIEJPQVJEX0hFSUdIVCk7XG4gICAgY29uc29sZS5sb2coYmFsbC5wb3NpdGlvbi55ICsgQkFMTF9ESUFNRVRFUiAvIDIgPj0gYm9hcmQucG9zaXRpb24ueSk7XG4gICAgY29uc29sZS5sb2coYmFsbC5wb3NpdGlvbi54IDw9IGJvYXJkLnBvc2l0aW9uLnggKyBCT0FSRF9XSURUSCk7XG4gICAgY29uc29sZS5sb2coYmFsbC5wb3NpdGlvbi54ID49IGJvYXJkLnBvc2l0aW9uLnggLSBCQUxMX0RJQU1FVEVSKTtcbiAgICByZXR1cm4gKChiYWxsLnBvc2l0aW9uLnkgKyBCQUxMX0RJQU1FVEVSIC8gMiA8PSBib2FyZC5wb3NpdGlvbi55KVxuICAgICAgICAmJiAoYmFsbC5wb3NpdGlvbi55ICsgQkFMTF9ESUFNRVRFUiAvIDIgPj0gYm9hcmQucG9zaXRpb24ueSAtIDIwKVxuICAgICAgICAmJiAoYmFsbC5wb3NpdGlvbi54IC0gQkFMTF9ESUFNRVRFUiAvIDIgPD0gYm9hcmQucG9zaXRpb24ueCArIEJPQVJEX1dJRFRIKVxuICAgICAgICAmJiAoYmFsbC5wb3NpdGlvbi54ICsgQkFMTF9ESUFNRVRFUiAvIDQgPj0gYm9hcmQucG9zaXRpb24ueCkpO1xufVxuIiwiaW1wb3J0IHsgVmVjdG9yIH0gZnJvbSBcIi4uL3V0aWxzL3ZlY3RvclwiO1xuaW1wb3J0IHtcbiAgICBCUklDS19ST1dTLFxuICAgIEJSSUNLX1dJRFRILFxuICAgIEJSSUNLX0hFSUdIVCxcbiAgICBCT0FSRF9XSURUSCxcbiAgICBCT0FSRF9IRUlHSFQsXG4gICAgQkFMTF9ESUFNRVRFUixcbn0gZnJvbSBcIi4uL3V0aWxzL2NvbnN0YW50c1wiO1xuaW1wb3J0IHsgQmFsbCB9IGZyb20gXCIuLi9maWd1cmVzL0JhbGxcIjtcbmltcG9ydCB7IEJyaWNrIH0gZnJvbSBcIi4uL2ZpZ3VyZXMvQnJpY2tcIjtcbmltcG9ydCB7IFBhZGRsZSB9IGZyb20gXCIuLi9maWd1cmVzL1BhZGRsZVwiO1xuXG5leHBvcnQgY2xhc3MgQ2FudmFzVmlldyB7XG4gICAgcHJpdmF0ZSBjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRDtcbiAgICBwdWJsaWMgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudDtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwdWJsaWMgY2FudmFzU2VsZWN0b3I6IHN0cmluZyxcbiAgICApIHtcbiAgICAgICAgdGhpcy5jYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChjYW52YXNTZWxlY3RvcikgYXMgSFRNTENhbnZhc0VsZW1lbnQ7XG4gICAgICAgIHRoaXMuY3R4ID0gdGhpcy5jYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICB9XG5cbiAgICBkcmF3SW1hZ2UocG9zaXRpb246IFZlY3RvciwgaW1hZ2U6IEhUTUxJbWFnZUVsZW1lbnQsIHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuY3R4LmRyYXdJbWFnZShpbWFnZSwgcG9zaXRpb24ueCwgcG9zaXRpb24ueSwgd2lkdGgsIGhlaWdodCk7XG4gICAgfVxuXG4gICAgZHJhd0JyaWNrcyhicmlja3M6IEJyaWNrW10pIHtcbiAgICAgICAgZm9yIChsZXQgciA9IDA7IHIgPCBCUklDS19ST1dTOyByKyspIHtcbiAgICAgICAgICAgIGZvciAobGV0IGMgPSAwOyBjIDwgYnJpY2tzLmxlbmd0aDsgYysrKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgYnJpY2sgPSBicmlja3NbY107XG4gICAgICAgICAgICAgICAgY29uc3QgcG9zOiBWZWN0b3IgPSB7XG4gICAgICAgICAgICAgICAgICAgIHg6IGJyaWNrLnBvc2l0aW9uLngsXG4gICAgICAgICAgICAgICAgICAgIHk6IGJyaWNrLnBvc2l0aW9uLnlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5kcmF3SW1hZ2UocG9zLCBicmljay5nZXRJbWFnZSgpLCBCUklDS19XSURUSCwgQlJJQ0tfSEVJR0hUKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRyYXdCYWxsKGJhbGw6IEJhbGwpIHtcbiAgICAgICAgdGhpcy5kcmF3SW1hZ2UoYmFsbC5wb3NpdGlvbiwgYmFsbC5nZXRJbWFnZSgpLCBCQUxMX0RJQU1FVEVSLCBCQUxMX0RJQU1FVEVSKTtcbiAgICB9XG5cbiAgICBkcmF3Qm9hcmQoYm9hcmQ6IFBhZGRsZSkge1xuICAgICAgICB0aGlzLmN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgdGhpcy5jdHguZHJhd0ltYWdlKGJvYXJkLmdldEltYWdlKCksIGJvYXJkLnBvc2l0aW9uLngsIGJvYXJkLnBvc2l0aW9uLnksIEJPQVJEX1dJRFRILCBCT0FSRF9IRUlHSFQpO1xuICAgICAgICB0aGlzLmN0eC5jbG9zZVBhdGgoKTtcbiAgICB9XG5cbiAgICBnZXRDb250ZXh0KCk6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCB7XG4gICAgICAgIHJldHVybiB0aGlzLmN0eDtcbiAgICB9XG59IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9hcHAudHNcIik7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=