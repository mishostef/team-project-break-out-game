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

/***/ "./src/engine/gameLoop.ts":
/*!********************************!*\
  !*** ./src/engine/gameLoop.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Game": () => (/* binding */ Game)
/* harmony export */ });
/* harmony import */ var _view_CanvasView__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../view/CanvasView */ "./src/view/CanvasView.ts");
/* harmony import */ var _figures_Paddle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../figures/Paddle */ "./src/figures/Paddle.ts");
/* harmony import */ var _figures_Ball__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../figures/Ball */ "./src/figures/Ball.ts");
/* harmony import */ var _move__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./move */ "./src/engine/move.ts");
/* harmony import */ var _utils_constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/constants */ "./src/utils/constants.ts");
/* harmony import */ var _utils_validators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/validators */ "./src/utils/validators.ts");
/* harmony import */ var _utils_helpers__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/helpers */ "./src/utils/helpers.ts");
/* harmony import */ var _physics_movement__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../physics/movement */ "./src/physics/movement.ts");
/* harmony import */ var _Geometry_Vector__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../Geometry/Vector */ "./src/Geometry/Vector.ts");
/* harmony import */ var _physics_misc__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../physics/misc */ "./src/physics/misc.ts");
/* harmony import */ var _utils_brickFactory__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../utils/brickFactory */ "./src/utils/brickFactory.ts");
/* harmony import */ var _view_DOMView__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../view/DOMView */ "./src/view/DOMView.ts");












const input = {};
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
    dom = _view_DOMView__WEBPACK_IMPORTED_MODULE_11__.DOMView.getInstance();
    isMouseActive = true;
    maxLives = 3;
    constructor(canvasView, lives) {
        this.canvasView = canvasView;
        this.lives = lives;
        this.scorePoints = 0;
        this.maxLives = lives;
        this.initializeGameObjects();
        this.dom.addHandler("keydown", (event) => {
            input[event.code] = true;
        });
        this.dom.addHandler("keyup", (event) => {
            input[event.code] = false;
        });
        this.dom.addHandler("mousemove", (e) => {
            if (this.isMouseActive)
                this.board.position.x = e.clientX;
        });
        this.dom.addRightClickHandler((e) => {
            e.preventDefault();
            this.isMouseActive = false;
        });
        this.dom.getElement("#level").addEventListener("click", (e) => {
            const input = e.target;
            this.GAME_DIFFICULTY = (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_6__.setGameLevel)(input);
        });
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
                (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_6__.showGameOverMessage)(this.scorePoints);
                setTimeout(() => {
                    this.dom.showInitialScreen();
                    this.lives = this.maxLives;
                    this.scorePoints = 0;
                }, 3000);
            }
            // document.getElementById("life").innerText = this.lives.toString();
            this.dom.setLives(this.lives);
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
        this.dom.setScore(this.scorePoints);
        this.dom.setLives(this.lives);
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
            const brick = this.bricks[deleteBrickIndex]; ///
            //explode()
            (0,_physics_movement__WEBPACK_IMPORTED_MODULE_7__.changeBallDirection)(this.ball, brick);
            this.bricks.splice(deleteBrickIndex, 1);
            this.scorePoints += _utils_constants__WEBPACK_IMPORTED_MODULE_4__.BRICK_BONUS_POINTS;
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
        }
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
/* harmony import */ var _Geometry_Vector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Geometry/Vector */ "./src/Geometry/Vector.ts");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./constants */ "./src/utils/constants.ts");



const bricksImage = [
    "/assets/brick-blue.png",
    "/assets/brick-green.png",
    "/assets/brick-purple.png",
    "/assets/brick-red.png",
    "/assets/brick-yellow.png",
];
function createBricks() {
    let x = _constants__WEBPACK_IMPORTED_MODULE_2__.INITIAL_START_BRICK_LEFT;
    let y = _constants__WEBPACK_IMPORTED_MODULE_2__.INITIAL_START_BRICK_RIGHT;
    const bricks = [];
    for (let row = 0; row < _constants__WEBPACK_IMPORTED_MODULE_2__.BRICK_ROWS; row++) {
        for (let col = 0; col < _constants__WEBPACK_IMPORTED_MODULE_2__.BRICKS_COLS; col++) {
            const pos = new _Geometry_Vector__WEBPACK_IMPORTED_MODULE_1__.Vector(x, y);
            const randPos = (Math.random() * bricksImage.length) | 0;
            const brick = new _figures_Brick__WEBPACK_IMPORTED_MODULE_0__.Brick(pos, bricksImage[randPos]);
            bricks.push(brick);
            x += _constants__WEBPACK_IMPORTED_MODULE_2__.INCREMENT_LEFT_BRICK;
        }
        x = _constants__WEBPACK_IMPORTED_MODULE_2__.INITIAL_START_BRICK_LEFT;
        y += _constants__WEBPACK_IMPORTED_MODULE_2__.INCREEMNT_DOWN_BRICK;
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
/* harmony import */ var _Geometry_Vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Geometry/Vector */ "./src/Geometry/Vector.ts");
/* harmony import */ var _utils_constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/constants */ "./src/utils/constants.ts");


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
        for (let r = 0; r < _utils_constants__WEBPACK_IMPORTED_MODULE_1__.BRICK_ROWS; r++) {
            for (let c = 0; c < bricks.length; c++) {
                const brick = bricks[c];
                const pos = new _Geometry_Vector__WEBPACK_IMPORTED_MODULE_0__.Vector(brick.position.x, brick.position.y);
                this.drawImage(pos, brick.getImage(), _utils_constants__WEBPACK_IMPORTED_MODULE_1__.BRICK_WIDTH, _utils_constants__WEBPACK_IMPORTED_MODULE_1__.BRICK_HEIGHT);
            }
        }
    }
    drawBall(ball) {
        this.drawImage(new _Geometry_Vector__WEBPACK_IMPORTED_MODULE_0__.Vector(ball.position.x - _utils_constants__WEBPACK_IMPORTED_MODULE_1__.BALL_DIAMETER / 2, ball.position.y - _utils_constants__WEBPACK_IMPORTED_MODULE_1__.BALL_DIAMETER / 2), ball.getImage(), _utils_constants__WEBPACK_IMPORTED_MODULE_1__.BALL_DIAMETER, _utils_constants__WEBPACK_IMPORTED_MODULE_1__.BALL_DIAMETER);
    }
    drawBoard(board) {
        this.ctx.beginPath();
        this.ctx.drawImage(board.getImage(), board.position.x, board.position.y, _utils_constants__WEBPACK_IMPORTED_MODULE_1__.BOARD_WIDTH, _utils_constants__WEBPACK_IMPORTED_MODULE_1__.BOARD_HEIGHT);
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
    addHandler(event, callback, selector) {
        if (selector) {
            document.querySelector(selector).addEventListener(event, callback);
        }
        else {
            document.addEventListener(event, callback);
        }
    }
    addRightClickHandler(callback) {
        window.oncontextmenu = callback;
    }
    showInitialScreen() {
        this.getElement("#container").style.display = "block";
        this.getElement("#gameCanvas").style.display = "none";
        this.getElement("#details-box").style.display = "none";
        this.getElement("#gameOver").style.display = "none";
    }
    setScore(scorePoints) {
        this.getElement("#score").textContent = `Score: ${scorePoints.toString()}`;
    }
    setLives(lives) {
        this.getElement("#life").innerText = lives.toString();
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
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/constants */ "./src/utils/constants.ts");
/* harmony import */ var _view_CanvasView__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./view/CanvasView */ "./src/view/CanvasView.ts");
/* harmony import */ var _engine_gameLoop__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./engine/gameLoop */ "./src/engine/gameLoop.ts");
/* harmony import */ var _view_DOMView__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./view/DOMView */ "./src/view/DOMView.ts");



const canvasView = new _view_CanvasView__WEBPACK_IMPORTED_MODULE_1__.CanvasView("gameCanvas");
const gameoverDiv = document.getElementById("gameOver");

const dom = _view_DOMView__WEBPACK_IMPORTED_MODULE_3__.DOMView.getInstance();
let GAME_DIFFICULTY = _utils_constants__WEBPACK_IMPORTED_MODULE_0__.EASY_LEVEl;
let lives = 3;
let game = new _engine_gameLoop__WEBPACK_IMPORTED_MODULE_2__.Game(canvasView, lives);
const playBtn = document.getElementById("play-btn");
let isPlayingMusic = false;
document.getElementById("new-game").addEventListener("click", (e) => {
    if (game.lives <= 1) {
        e.target.style.display = "none";
    }
    else {
        e.target.style.display = "block";
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
    game.lives = lives;
    game.scorePoints = 0;
    game.startGame();
    if (isPlayingMusic) {
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
        isPlayingMusic = true;
        dom.getElement(".gg-check").style.display =
            "block";
    });
});

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RWpDLEdBQUcsQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRTtRQUN6RCxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztRQUN6QyxTQUFTLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7SUFDcEMsQ0FBQyxDQUFDLENBQUM7SUFFSCxHQUFHLENBQUMsVUFBVSxDQUFDLGlCQUFpQixDQUFDLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRTtRQUMvRCxjQUFjLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLEdBQUcsQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFpQixDQUFDLEtBQUssQ0FBQyxPQUFPO1lBQ3hELE9BQU8sQ0FBQztJQUNaLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9idWRnZXRlZXItdHMvLi9zcmMvR2VvbWV0cnkvVmVjdG9yLnRzIiwid2VicGFjazovL2J1ZGdldGVlci10cy8uL3NyYy9lbmdpbmUvZ2FtZUxvb3AudHMiLCJ3ZWJwYWNrOi8vYnVkZ2V0ZWVyLXRzLy4vc3JjL2VuZ2luZS9tb3ZlLnRzIiwid2VicGFjazovL2J1ZGdldGVlci10cy8uL3NyYy9maWd1cmVzL0JhbGwudHMiLCJ3ZWJwYWNrOi8vYnVkZ2V0ZWVyLXRzLy4vc3JjL2ZpZ3VyZXMvQnJpY2sudHMiLCJ3ZWJwYWNrOi8vYnVkZ2V0ZWVyLXRzLy4vc3JjL2ZpZ3VyZXMvUGFkZGxlLnRzIiwid2VicGFjazovL2J1ZGdldGVlci10cy8uL3NyYy9waHlzaWNzL21pc2MudHMiLCJ3ZWJwYWNrOi8vYnVkZ2V0ZWVyLXRzLy4vc3JjL3BoeXNpY3MvbW92ZW1lbnQudHMiLCJ3ZWJwYWNrOi8vYnVkZ2V0ZWVyLXRzLy4vc3JjL3V0aWxzL2JyaWNrRmFjdG9yeS50cyIsIndlYnBhY2s6Ly9idWRnZXRlZXItdHMvLi9zcmMvdXRpbHMvY29uc3RhbnRzLnRzIiwid2VicGFjazovL2J1ZGdldGVlci10cy8uL3NyYy91dGlscy9oZWxwZXJzLnRzIiwid2VicGFjazovL2J1ZGdldGVlci10cy8uL3NyYy91dGlscy92YWxpZGF0b3JzLnRzIiwid2VicGFjazovL2J1ZGdldGVlci10cy8uL3NyYy92aWV3L0NhbnZhc1ZpZXcudHMiLCJ3ZWJwYWNrOi8vYnVkZ2V0ZWVyLXRzLy4vc3JjL3ZpZXcvRE9NVmlldy50cyIsIndlYnBhY2s6Ly9idWRnZXRlZXItdHMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYnVkZ2V0ZWVyLXRzL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9idWRnZXRlZXItdHMvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9idWRnZXRlZXItdHMvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9idWRnZXRlZXItdHMvLi9zcmMvYXBwLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBvaW50IH0gZnJvbSBcIi4vSW50ZXJmYWNlc1wiO1xuXG5leHBvcnQgY2xhc3MgVmVjdG9yIGltcGxlbWVudHMgUG9pbnQge1xuICB4OiBudW1iZXI7XG4gIHk6IG51bWJlcjtcblxuICBjb25zdHJ1Y3RvcihwOiBQb2ludCk7XG4gIGNvbnN0cnVjdG9yKHg6IG51bWJlciwgeTogbnVtYmVyKTtcbiAgY29uc3RydWN0b3IoeE9yUG9pbnQ6IG51bWJlciB8IFBvaW50LCB5PzogbnVtYmVyKSB7XG4gICAgaWYgKHR5cGVvZiB4T3JQb2ludCA9PSBcIm51bWJlclwiICYmIHR5cGVvZiB5ID09IFwibnVtYmVyXCIpIHtcbiAgICAgIHRoaXMueCA9IHhPclBvaW50O1xuICAgICAgdGhpcy55ID0geTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiB4T3JQb2ludCA9PSBcIm9iamVjdFwiKSB7XG4gICAgICB0aGlzLnggPSB4T3JQb2ludC54O1xuICAgICAgdGhpcy55ID0geE9yUG9pbnQueTtcbiAgICB9XG4gIH1cblxuICBhZGQocDogUG9pbnQpIHtcbiAgICB0aGlzLnggKz0gcC54O1xuICAgIHRoaXMueSArPSBwLnk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBzY2FsZShzOiBudW1iZXIpIHtcbiAgICB0aGlzLnggKj0gcztcbiAgICB0aGlzLnkgKj0gcztcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgZGlzdChwOiBQb2ludCkge1xuICAgIGNvbnN0IGR4ID0gdGhpcy54IC0gcC54O1xuICAgIGNvbnN0IGR5ID0gdGhpcy55IC0gcC55O1xuICAgIHJldHVybiBNYXRoLnNxcnQoZHggKiogMiArIGR5ICoqIDIpO1xuICB9XG5cbiAgc3FMZW5ndGgoKSB7XG4gICAgcmV0dXJuIHRoaXMueCAqKiAyICsgdGhpcy55ICoqIDI7XG4gIH1cblxuICBzdGF0aWMgYWRkKHAxOiBQb2ludCwgcDI6IFBvaW50KSB7XG4gICAgcmV0dXJuIG5ldyBWZWN0b3IocDEueCArIHAyLngsIHAxLnkgKyBwMi55KTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQ2FudmFzVmlldywgY2FudmFzVmlldyB9IGZyb20gXCIuLi92aWV3L0NhbnZhc1ZpZXdcIjtcbmltcG9ydCB7IFBhZGRsZSB9IGZyb20gXCIuLi9maWd1cmVzL1BhZGRsZVwiO1xuaW1wb3J0IHsgQmFsbCB9IGZyb20gXCIuLi9maWd1cmVzL0JhbGxcIjtcbmltcG9ydCB7IEJyaWNrIH0gZnJvbSBcIi4uL2ZpZ3VyZXMvQnJpY2tcIjtcbmltcG9ydCB7IG1vdmUgfSBmcm9tIFwiLi9tb3ZlXCI7XG5pbXBvcnQge1xuICAgIEJPQVJEX1dJRFRILCBCUklDS19CT05VU19QT0lOVFMsIElOSVRJQUxfQkFMTF9YLCBJTklUSUFMX0JBTExfWSxcbn0gZnJvbSBcIi4uL3V0aWxzL2NvbnN0YW50c1wiO1xuaW1wb3J0IHtcbiAgICBpc0JhbGxIaXR0aW5nVGhlRmxvb3IsIGlzQmFsbEhpdHRpbmdUaGVDZWlsaW5nLCBpc0JhbGxIaXR0aW5nUmlnaHRXYWxsLFxuICAgIGlzQmFsbEhpdHRpbmdUaGVMZWZ0V2FsbCwgaXNCYWxsQ29sbGlkaW5nV2l0aEJvYXJkLCBpc0JhbGxOZWFyQnJpY2tzXG59IGZyb20gXCIuLi91dGlscy92YWxpZGF0b3JzXCI7XG5pbXBvcnQgeyBzZXRHYW1lTGV2ZWwsIHNob3dHYW1lT3Zlck1lc3NhZ2UgfSBmcm9tIFwiLi4vdXRpbHMvaGVscGVyc1wiO1xuaW1wb3J0IHsgY2hhbmdlQmFsbERpcmVjdGlvbiwgaGFuZGxlQm9hcmRIaXQgfSBmcm9tIFwiLi4vcGh5c2ljcy9tb3ZlbWVudFwiO1xuaW1wb3J0IHsgVmVjdG9yIH0gZnJvbSBcIi4uL0dlb21ldHJ5L1ZlY3RvclwiO1xuaW1wb3J0IHsgZ2V0SGl0QnJpY2tJbmRleCB9IGZyb20gXCIuLi9waHlzaWNzL21pc2NcIjtcbmltcG9ydCB7IGNyZWF0ZUJyaWNrcyB9IGZyb20gXCIuLi91dGlscy9icmlja0ZhY3RvcnlcIjtcbmltcG9ydCB7IGV4cGxvZGUgfSBmcm9tIFwiLi4vZWZmZWN0cy9leHBsb3Npb25cIjtcbmltcG9ydCB7IERPTVZpZXcgfSBmcm9tIFwiLi4vdmlldy9ET01WaWV3XCI7XG5cblxuY29uc3QgaW5wdXQ6IHsgW2NvZGU6IHN0cmluZ106IGJvb2xlYW4gfSA9IHt9O1xuXG5cbmV4cG9ydCBpbnRlcmZhY2UgR2FtZU9iamVjdHMge1xuICAgIGJhbGw6IEJhbGwsIGJvYXJkOiBQYWRkbGUsIGJyaWNrczogQnJpY2tbXVxufVxuXG5jb25zdCBib2FyZEltZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYm9hcmRcIikgYXMgSFRNTEltYWdlRWxlbWVudDtcbmV4cG9ydCBjbGFzcyBHYW1lIHtcbiAgICBwcml2YXRlIGJhbGw6IEJhbGw7XG4gICAgcHJpdmF0ZSBib2FyZDogUGFkZGxlO1xuICAgIHByaXZhdGUgYnJpY2tzOiBCcmlja1tdO1xuICAgIHB1YmxpYyBzY29yZVBvaW50czogbnVtYmVyO1xuICAgIHB1YmxpYyBHQU1FX0RJRkZJQ1VMVFkgPSAzO1xuICAgIHByaXZhdGUgcmVhZG9ubHkgU1RFUF9TSVpFID0gMjA7XG4gICAgcHJpdmF0ZSBsYXN0VGltZTogbnVtYmVyO1xuICAgIHByaXZhdGUgZWxhcHNlZDogbnVtYmVyO1xuICAgIHB1YmxpYyBnYW1lT3ZlcjogYm9vbGVhbjtcbiAgICBwcml2YXRlIGRvbSA9IERPTVZpZXcuZ2V0SW5zdGFuY2UoKTtcbiAgICBwcml2YXRlIGlzTW91c2VBY3RpdmUgPSB0cnVlO1xuICAgIHByaXZhdGUgbWF4TGl2ZXMgPSAzO1xuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBjYW52YXNWaWV3OiBDYW52YXNWaWV3LCBwdWJsaWMgbGl2ZXM6IG51bWJlcikge1xuICAgICAgICB0aGlzLnNjb3JlUG9pbnRzID0gMDtcbiAgICAgICAgdGhpcy5tYXhMaXZlcyA9IGxpdmVzO1xuICAgICAgICB0aGlzLmluaXRpYWxpemVHYW1lT2JqZWN0cygpO1xuXG4gICAgICAgIHRoaXMuZG9tLmFkZEhhbmRsZXIoXCJrZXlkb3duXCIsIChldmVudDogS2V5Ym9hcmRFdmVudCkgPT4ge1xuICAgICAgICAgICAgaW5wdXRbZXZlbnQuY29kZV0gPSB0cnVlO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5kb20uYWRkSGFuZGxlcihcImtleXVwXCIsIChldmVudDogS2V5Ym9hcmRFdmVudCkgPT4ge1xuICAgICAgICAgICAgaW5wdXRbZXZlbnQuY29kZV0gPSBmYWxzZTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuZG9tLmFkZEhhbmRsZXIoXCJtb3VzZW1vdmVcIiwgKGU6IE1vdXNlRXZlbnQpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLmlzTW91c2VBY3RpdmUpIHRoaXMuYm9hcmQucG9zaXRpb24ueCA9IGUuY2xpZW50WDtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuZG9tLmFkZFJpZ2h0Q2xpY2tIYW5kbGVyKChlKSA9PiB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB0aGlzLmlzTW91c2VBY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuZG9tLmdldEVsZW1lbnQoXCIjbGV2ZWxcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBpbnB1dCA9IChlLnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50KTtcbiAgICAgICAgICAgIHRoaXMuR0FNRV9ESUZGSUNVTFRZID0gc2V0R2FtZUxldmVsKGlucHV0KTtcbiAgICAgICAgfSk7XG5cbiAgICB9XG5cbiAgICBwcml2YXRlIGluaXRpYWxpemVHYW1lT2JqZWN0cygpIHtcbiAgICAgICAgdGhpcy5icmlja3MgPSBjcmVhdGVCcmlja3MoKTtcbiAgICAgICAgY29uc3QgYm9hcmRQb3NpdGlvbiA9IG5ldyBWZWN0b3IoXG4gICAgICAgICAgICBjYW52YXNWaWV3LmNhbnZhcy53aWR0aCAvIDIsXG4gICAgICAgICAgICBjYW52YXNWaWV3LmNhbnZhcy5oZWlnaHQgLSAxMDBcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5ib2FyZCA9IG5ldyBQYWRkbGUoYm9hcmRQb3NpdGlvbiwgYm9hcmRJbWcpO1xuICAgICAgICBjb25zdCBiYWxsUG9zaXRpb24gPSBuZXcgVmVjdG9yKElOSVRJQUxfQkFMTF9YLCBJTklUSUFMX0JBTExfWSk7XG4gICAgICAgIHRoaXMuYmFsbCA9IG5ldyBCYWxsKGJhbGxQb3NpdGlvbiwgXCIvYXNzZXRzL2JhbGwucG5nXCIpO1xuICAgICAgICB0aGlzLmJhbGwudmVsb2NpdHkgPSBuZXcgVmVjdG9yKHRoaXMuR0FNRV9ESUZGSUNVTFRZLCB0aGlzLkdBTUVfRElGRklDVUxUWSk7XG4gICAgICAgIHRoaXMubGFzdFRpbWUgPSAwO1xuICAgICAgICB0aGlzLmVsYXBzZWQgPSAwO1xuICAgICAgICB0aGlzLmdhbWVPdmVyID0gZmFsc2U7XG4gICAgfVxuXG4gICAgZ2FtZUxvb3AoKSB7XG4gICAgICAgIGlmIChpbnB1dFsnQXJyb3dMZWZ0J10gJiYgKHRoaXMuYm9hcmQucG9zaXRpb24ueCA+IDApKSB7XG4gICAgICAgICAgICB0aGlzLmJvYXJkLnZlbG9jaXR5LnggPSAtNztcbiAgICAgICAgICAgIG1vdmUodGhpcy5ib2FyZCk7XG4gICAgICAgIH0gZWxzZSBpZiAoaW5wdXRbJ0Fycm93UmlnaHQnXSAmJiAodGhpcy5ib2FyZC5wb3NpdGlvbi54ICsgQk9BUkRfV0lEVEggPCBjYW52YXNWaWV3LmNhbnZhcy53aWR0aCkpIHtcbiAgICAgICAgICAgIHRoaXMuYm9hcmQudmVsb2NpdHkueCA9IDc7XG4gICAgICAgICAgICBtb3ZlKHRoaXMuYm9hcmQpO1xuICAgICAgICB9XG4gICAgICAgIGNhbnZhc1ZpZXcuZ2V0Q29udGV4dCgpLmNsZWFyUmVjdCgwLCAwLCBjYW52YXNWaWV3LmNhbnZhcy53aWR0aCwgY2FudmFzVmlldy5jYW52YXMuaGVpZ2h0KTtcbiAgICAgICAgY2FudmFzVmlldy5kcmF3QnJpY2tzKHRoaXMuYnJpY2tzKTtcbiAgICAgICAgY2FudmFzVmlldy5kcmF3Qm9hcmQodGhpcy5ib2FyZCk7XG4gICAgICAgIGNhbnZhc1ZpZXcuZHJhd0JhbGwodGhpcy5iYWxsKTtcbiAgICAgICAgdGhpcy5jb2xsaXNpb25EZXRlY3RvcigpO1xuICAgICAgICBpZiAoIXRoaXMuZ2FtZU92ZXIpXG4gICAgICAgICAgICBtb3ZlKHRoaXMuYmFsbCk7XG4gICAgfVxuXG5cbiAgICBjb2xsaXNpb25EZXRlY3RvcigpIHtcbiAgICAgICAgaWYgKGlzQmFsbENvbGxpZGluZ1dpdGhCb2FyZCh0aGlzLmJhbGwsIHRoaXMuYm9hcmQpKSB7XG4gICAgICAgICAgICBoYW5kbGVCb2FyZEhpdCh0aGlzLmJhbGwsIHRoaXMuYm9hcmQpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpc0JhbGxIaXR0aW5nVGhlRmxvb3IodGhpcy5iYWxsLCB0aGlzLmNhbnZhc1ZpZXcpKSB7XG4gICAgICAgICAgICB0aGlzLmxpdmVzLS07Ly9cbiAgICAgICAgICAgIHRoaXMuZ2FtZU92ZXIgPSB0cnVlO1xuICAgICAgICAgICAgaWYgKHRoaXMubGl2ZXMgPT09IDApIHtcbiAgICAgICAgICAgICAgICBzaG93R2FtZU92ZXJNZXNzYWdlKHRoaXMuc2NvcmVQb2ludHMpOyBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kb20uc2hvd0luaXRpYWxTY3JlZW4oKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5saXZlcyA9IHRoaXMubWF4TGl2ZXM7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2NvcmVQb2ludHMgPSAwO1xuICAgICAgICAgICAgICAgIH0sIDMwMDApO1xuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxpZmVcIikuaW5uZXJUZXh0ID0gdGhpcy5saXZlcy50b1N0cmluZygpO1xuICAgICAgICAgICAgdGhpcy5kb20uc2V0TGl2ZXModGhpcy5saXZlcyk7XG4gICAgICAgIH0gZWxzZSBpZiAoaXNCYWxsSGl0dGluZ1RoZUNlaWxpbmcodGhpcy5iYWxsKSkge1xuICAgICAgICAgICAgdGhpcy5iYWxsLnZlbG9jaXR5LnkgPSBNYXRoLmFicyh0aGlzLmJhbGwudmVsb2NpdHkueSk7XG4gICAgICAgIH0gZWxzZSBpZiAoaXNCYWxsSGl0dGluZ1JpZ2h0V2FsbCh0aGlzLmJhbGwsIHRoaXMuY2FudmFzVmlldykpIHtcbiAgICAgICAgICAgIHRoaXMuYmFsbC52ZWxvY2l0eS54ID0gLSB0aGlzLmJhbGwudmVsb2NpdHkueDtcbiAgICAgICAgfSBlbHNlIGlmIChpc0JhbGxIaXR0aW5nVGhlTGVmdFdhbGwodGhpcy5iYWxsKSkge1xuICAgICAgICAgICAgdGhpcy5iYWxsLnZlbG9jaXR5LnggPSBNYXRoLmFicyh0aGlzLmJhbGwudmVsb2NpdHkueCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGFydEdhbWUoKSB7XG4gICAgICAgIHRoaXMuZG9tLnNldFNjb3JlKHRoaXMuc2NvcmVQb2ludHMpO1xuICAgICAgICB0aGlzLmRvbS5zZXRMaXZlcyh0aGlzLmxpdmVzKTtcbiAgICAgICAgdGhpcy5pbml0aWFsaXplR2FtZU9iamVjdHMoKTtcbiAgICAgICAgdGhpcy51cGRhdGUocGVyZm9ybWFuY2Uubm93KCkpO1xuICAgIH1cblxuICAgIHVwZGF0ZSh0aW1lOiBudW1iZXIpIHtcbiAgICAgICAgY29uc3QgZGVsdGEgPSB0aW1lIC0gdGhpcy5sYXN0VGltZTtcbiAgICAgICAgdGhpcy5sYXN0VGltZSA9IHRpbWU7XG4gICAgICAgIHRoaXMuZWxhcHNlZCArPSBkZWx0YTtcbiAgICAgICAgbGV0IGRlbGV0ZUJyaWNrSW5kZXggPSBpc0JhbGxOZWFyQnJpY2tzKHRoaXMuYmFsbClcbiAgICAgICAgICAgID8gZ2V0SGl0QnJpY2tJbmRleCh0aGlzLmJyaWNrcywgdGhpcy5iYWxsKVxuICAgICAgICAgICAgOiAtMTtcbiAgICAgICAgaWYgKGRlbGV0ZUJyaWNrSW5kZXggIT0gLTEpIHtcbiAgICAgICAgICAgIGNvbnN0IGJyaWNrID0gdGhpcy5icmlja3NbZGVsZXRlQnJpY2tJbmRleF07Ly8vXG4gICAgICAgICAgICAvL2V4cGxvZGUoKVxuICAgICAgICAgICAgY2hhbmdlQmFsbERpcmVjdGlvbih0aGlzLmJhbGwsIGJyaWNrKTtcbiAgICAgICAgICAgIHRoaXMuYnJpY2tzLnNwbGljZShkZWxldGVCcmlja0luZGV4LCAxKTtcbiAgICAgICAgICAgIHRoaXMuc2NvcmVQb2ludHMgKz0gQlJJQ0tfQk9OVVNfUE9JTlRTO1xuICAgICAgICAgICAgdGhpcy5kb20uc2V0U2NvcmUodGhpcy5zY29yZVBvaW50cyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuZWxhcHNlZCA+IHRoaXMuU1RFUF9TSVpFICogNSkge1xuICAgICAgICAgICAgdGhpcy5lbGFwc2VkID0gdGhpcy5TVEVQX1NJWkUgKiA1O1xuICAgICAgICB9XG4gICAgICAgIHdoaWxlICh0aGlzLmVsYXBzZWQgPiB0aGlzLlNURVBfU0laRSkge1xuICAgICAgICAgICAgdGhpcy5lbGFwc2VkIC09IHRoaXMuU1RFUF9TSVpFO1xuICAgICAgICAgICAgdGhpcy5nYW1lTG9vcCgpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmJyaWNrcy5sZW5ndGggJiYgIXRoaXMuZ2FtZU92ZXIpIHtcbiAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLnVwZGF0ZS5iaW5kKHRoaXMpKTtcbiAgICAgICAgfVxuICAgIH1cbn0iLCIvL2ltcG9ydCB7IFZlY3RvciB9IGZyb20gXCIuLi91dGlscy92ZWN0b3JcIjtcbmltcG9ydCB7IFZlY3RvciB9IGZyb20gXCIuLi9HZW9tZXRyeS9WZWN0b3JcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIG1vdmUoZ2FtZU9iamVjdDogR2FtZU9iamVjdCkge1xuICBnYW1lT2JqZWN0LnBvc2l0aW9uLnggKz0gZ2FtZU9iamVjdC52ZWxvY2l0eS54O1xuICBnYW1lT2JqZWN0LnBvc2l0aW9uLnkgKz0gZ2FtZU9iamVjdC52ZWxvY2l0eS55O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEdhbWVPYmplY3Qge1xuICBwb3NpdGlvbjogeyB4OiBudW1iZXI7IHk6IG51bWJlciB9O1xuICB2ZWxvY2l0eTogVmVjdG9yXG59XG4iLCJpbXBvcnQgeyBWZWN0b3IgfSBmcm9tIFwiLi4vR2VvbWV0cnkvVmVjdG9yXCI7XG5cbmV4cG9ydCBjbGFzcyBCYWxsIHtcbiAgcHJpdmF0ZSBpbWFnZTogSFRNTEltYWdlRWxlbWVudCA9IG5ldyBJbWFnZSgpO1xuICBwdWJsaWMgdmVsb2NpdHk6IFZlY3RvciA9IG5ldyBWZWN0b3IoMCwgMCk7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBwb3NpdGlvbjogVmVjdG9yLCBpbWFnZTogc3RyaW5nLCBiYWxsdmVsb2NpdHk/OiBWZWN0b3IpIHtcbiAgICB0aGlzLmltYWdlLnNyYyA9IGltYWdlO1xuICAgIGlmICghIWJhbGx2ZWxvY2l0eSkgdGhpcy52ZWxvY2l0eSA9IGJhbGx2ZWxvY2l0eTtcbiAgfVxuXG4gIGdldEltYWdlKCk6IEhUTUxJbWFnZUVsZW1lbnQge1xuICAgIHJldHVybiB0aGlzLmltYWdlO1xuICB9XG59XG4iLCJpbXBvcnQgeyBWZWN0b3IgfSBmcm9tIFwiLi4vR2VvbWV0cnkvVmVjdG9yXCI7XG5cbmV4cG9ydCBjbGFzcyBCcmljayB7XG4gIHByaXZhdGUgaW1hZ2U6IEhUTUxJbWFnZUVsZW1lbnQgPSBuZXcgSW1hZ2UoKTtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgcG9zaXRpb246IFZlY3RvciwgaW1hZ2U6IHN0cmluZykge1xuICAgIHRoaXMuaW1hZ2Uuc3JjID0gaW1hZ2U7XG4gIH1cblxuICBnZXRJbWFnZSgpOiBIVE1MSW1hZ2VFbGVtZW50IHtcbiAgICByZXR1cm4gdGhpcy5pbWFnZTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgVmVjdG9yIH0gZnJvbSBcIi4uL0dlb21ldHJ5L1ZlY3RvclwiO1xuXG5leHBvcnQgY2xhc3MgUGFkZGxlIHtcbiAgcHJpdmF0ZSBpbWFnZTogSFRNTEltYWdlRWxlbWVudCA9IG5ldyBJbWFnZSgpO1xuICBwdWJsaWMgdmVsb2NpdHk6IFZlY3RvciA9IG5ldyBWZWN0b3IoMCwgMCk7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBwb3NpdGlvbjogVmVjdG9yLFxuICAgIGltYWdlOiBIVE1MSW1hZ2VFbGVtZW50LFxuICAgIGJvYXJkdmVsb2NpdHk/OiBWZWN0b3JcbiAgKSB7XG4gICAgdGhpcy5pbWFnZSA9IGltYWdlO1xuICAgIGlmICghIWJvYXJkdmVsb2NpdHkpIHRoaXMudmVsb2NpdHkgPSBib2FyZHZlbG9jaXR5O1xuICB9XG5cbiAgZ2V0SW1hZ2UoKTogSFRNTEltYWdlRWxlbWVudCB7XG4gICAgcmV0dXJuIHRoaXMuaW1hZ2U7XG4gIH1cbn1cbiIsImltcG9ydCB7IEJBTExfRElBTUVURVIsIEJSSUNLX1dJRFRILCBCUklDS19IRUlHSFQgfSBmcm9tIFwiLi4vdXRpbHMvY29uc3RhbnRzXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRIaXRCcmlja0luZGV4KGJyaWNrcywgYmFsbCkge1xuICByZXR1cm4gYnJpY2tzLmZpbmRJbmRleCgoYnJpY2spID0+IHtcbiAgICBjb25zdCBsZWZ0ID0gYnJpY2sucG9zaXRpb24ueCAtIEJBTExfRElBTUVURVIgLyAyO1xuICAgIGNvbnN0IHJpZ2h0ID0gYnJpY2sucG9zaXRpb24ueCArIEJSSUNLX1dJRFRIICsgQkFMTF9ESUFNRVRFUiAvIDI7XG4gICAgY29uc3QgdG9wID0gYnJpY2sucG9zaXRpb24ueSAtIEJBTExfRElBTUVURVIgLyAyO1xuICAgIGNvbnN0IGJvdHRvbSA9IGJyaWNrLnBvc2l0aW9uLnkgKyBCUklDS19IRUlHSFQgKyBCQUxMX0RJQU1FVEVSIC8gMjtcbiAgICByZXR1cm4gKFxuICAgICAgYmFsbC5wb3NpdGlvbi54ID49IGxlZnQgJiZcbiAgICAgIGJhbGwucG9zaXRpb24ueCA8PSByaWdodCAmJlxuICAgICAgYmFsbC5wb3NpdGlvbi55ID49IHRvcCAmJlxuICAgICAgYmFsbC5wb3NpdGlvbi55IDw9IGJvdHRvbVxuICAgICk7XG4gIH0pO1xufSIsImltcG9ydCB7IEJhbGwgfSBmcm9tIFwiLi4vZmlndXJlcy9CYWxsXCI7XG5pbXBvcnQgeyBCcmljayB9IGZyb20gXCIuLi9maWd1cmVzL0JyaWNrXCI7XG5pbXBvcnQgeyBQYWRkbGUgfSBmcm9tIFwiLi4vZmlndXJlcy9QYWRkbGVcIjtcbmltcG9ydCB7IEJSSUNLX0hFSUdIVCwgQlJJQ0tfV0lEVEgsIEJBTExfRElBTUVURVIsIEJPQVJEX1dJRFRIIH0gZnJvbSBcIi4uL3V0aWxzL2NvbnN0YW50c1wiO1xuXG5cbmV4cG9ydCBmdW5jdGlvbiBjaGFuZ2VCYWxsRGlyZWN0aW9uKGJhbGw6IEJhbGwsIGJyaWNrOiBCcmljaykge1xuICAgIGNvbnN0IEJSSUNLX0RJQUdPTkFMID0gTWF0aC5zcXJ0KEJSSUNLX0hFSUdIVCAqKiAyICsgQlJJQ0tfV0lEVEggKiogMik7XG4gICAgY29uc3QgYnJpY2tDZW50ZXJYID0gYnJpY2sucG9zaXRpb24ueCArIEJSSUNLX1dJRFRIIC8gMjtcbiAgICBjb25zdCBicmlja0NlbnRlclkgPSBicmljay5wb3NpdGlvbi55ICsgQlJJQ0tfSEVJR0hUIC8gMjtcbiAgICBjb25zdCBiYWxsQ2VudGVyWCA9IGJhbGwucG9zaXRpb24ueCArIEJBTExfRElBTUVURVIgLyAyO1xuICAgIGNvbnN0IGJhbGxDZW50ZXJZID0gYmFsbC5wb3NpdGlvbi55ICsgQkFMTF9ESUFNRVRFUiAvIDI7XG4gICAgY29uc3QgZGVsdGFZID0gKEJSSUNLX0hFSUdIVCAqIEJBTExfRElBTUVURVIgLyAyKSAvIEJSSUNLX0RJQUdPTkFMO1xuICAgIGNvbnN0IGRlbHRhWCA9IChCUklDS19XSURUSCAqIEJBTExfRElBTUVURVIgLyAyKSAvIEJSSUNLX0RJQUdPTkFMO1xuICAgIGNvbnN0IG1pbllTaWRlSGl0ID0gYnJpY2sucG9zaXRpb24ueSArIGRlbHRhWTtcbiAgICBjb25zdCBtYXhZU2lkZUhpdCA9IGJyaWNrLnBvc2l0aW9uLnkgKyBCUklDS19IRUlHSFQgLSBkZWx0YVk7XG4gICAgY29uc3QgbWluTGVmdFhTaWRlSGl0ID0gYnJpY2sucG9zaXRpb24ueCAtIGRlbHRhWDtcbiAgICBjb25zdCBtYXhMZWZ0WFNpZGVIaXQgPSBicmljay5wb3NpdGlvbi54ICsgZGVsdGFYO1xuICAgIGNvbnN0IGlzQmFsbENvbWluZ0Zyb21CdXR0b21MZWZ0ID0gKChiYWxsQ2VudGVyWCA+IG1pbkxlZnRYU2lkZUhpdClcbiAgICAgICAgJiYgKGJhbGxDZW50ZXJYIDwgbWF4TGVmdFhTaWRlSGl0KVxuICAgICAgICAmJiAoYmFsbENlbnRlclkgPiBtaW5ZU2lkZUhpdClcbiAgICAgICAgJiYgKGJhbGxDZW50ZXJZIDwgbWF4WVNpZGVIaXQpKTtcbiAgICBjb25zdCBpc0JhbGxDb21pbmdGcm9tQnV0dG9tUmlnaHQgPSAoKGJhbGxDZW50ZXJYID4gbWluTGVmdFhTaWRlSGl0ICsgQlJJQ0tfV0lEVEgpXG4gICAgICAgICYmIChiYWxsQ2VudGVyWCA8IG1heExlZnRYU2lkZUhpdCArIEJSSUNLX1dJRFRIKVxuICAgICAgICAmJiAoYmFsbENlbnRlclkgPiBtaW5ZU2lkZUhpdClcbiAgICAgICAgJiYgKGJhbGxDZW50ZXJZIDwgbWF4WVNpZGVIaXQpKTtcbiAgICBpZiAoKGlzQmFsbENvbWluZ0Zyb21CdXR0b21MZWZ0ICYmIGJhbGwudmVsb2NpdHkueCA+IDApIHx8IChpc0JhbGxDb21pbmdGcm9tQnV0dG9tUmlnaHQgJiYgYmFsbC52ZWxvY2l0eS54IDwgMCkpIHtcbiAgICAgICAgYmFsbC52ZWxvY2l0eS54ICo9IC0xO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGJhbGwudmVsb2NpdHkueSAqPSAtMTtcbiAgICB9XG5cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGhhbmRsZUJvYXJkSGl0KGJhbGw6IEJhbGwsIGJvYXJkOiBQYWRkbGUpIHtcbiAgICBjb25zdCBjdXJyZW50QW5nbGUgPSBNYXRoLmF0YW4yKC1iYWxsLnZlbG9jaXR5LnksIGJhbGwudmVsb2NpdHkueCk7XG4gICAgY29uc3QgZGVsdGFDZW50ZXJYID0gKGJhbGwucG9zaXRpb24ueCAtIChib2FyZC5wb3NpdGlvbi54ICsgQk9BUkRfV0lEVEggLyAyKSkgLyAoQk9BUkRfV0lEVEggLyAyKTtcbiAgICBjb25zdCBhbmdsZVRvQWRkID0gTWF0aC5QSSAvIDU7XG4gICAgbGV0IG5leHRBbmdsZSA9IGRlbHRhQ2VudGVyWCAqIGFuZ2xlVG9BZGQgKyBjdXJyZW50QW5nbGU7XG4gICAgY29uc3QgeU9mZnNldCA9IDU7XG4gICAgaWYgKG5leHRBbmdsZSA8IC01ICogTWF0aC5QSSAvIDYpIHtcbiAgICAgICAgbmV4dEFuZ2xlID0gLTUgKiBNYXRoLlBJIC8gNjtcbiAgICB9IGlmIChuZXh0QW5nbGUgPiAtTWF0aC5QSSAvIDYpIHtcbiAgICAgICAgbmV4dEFuZ2xlID0gLU1hdGguUEkgLyA2XG4gICAgfVxuXG4gICAgYmFsbC52ZWxvY2l0eS54ID0gNSAqIE1hdGguY29zKG5leHRBbmdsZSk7XG4gICAgYmFsbC52ZWxvY2l0eS55ID0gNSAqIE1hdGguc2luKG5leHRBbmdsZSk7XG4gICAgYmFsbC5wb3NpdGlvbi55ID0gYm9hcmQucG9zaXRpb24ueSAtIEJBTExfRElBTUVURVIgLyAyIC0geU9mZnNldDtcbn1cbiIsImltcG9ydCB7IEJyaWNrIH0gZnJvbSBcIi4uL2ZpZ3VyZXMvQnJpY2tcIjtcbmltcG9ydCB7IFZlY3RvciB9IGZyb20gXCIuLi9HZW9tZXRyeS9WZWN0b3JcIjtcbmltcG9ydCB7XG4gIEJSSUNLU19DT0xTLFxuICBCUklDS19ST1dTLFxuICBJTkNSRUVNTlRfRE9XTl9CUklDSyxcbiAgSU5DUkVNRU5UX0xFRlRfQlJJQ0ssXG4gIElOSVRJQUxfU1RBUlRfQlJJQ0tfTEVGVCxcbiAgSU5JVElBTF9TVEFSVF9CUklDS19SSUdIVCxcbn0gZnJvbSBcIi4vY29uc3RhbnRzXCI7XG5cbmNvbnN0IGJyaWNrc0ltYWdlID0gW1xuICBcIi9hc3NldHMvYnJpY2stYmx1ZS5wbmdcIixcbiAgXCIvYXNzZXRzL2JyaWNrLWdyZWVuLnBuZ1wiLFxuICBcIi9hc3NldHMvYnJpY2stcHVycGxlLnBuZ1wiLFxuICBcIi9hc3NldHMvYnJpY2stcmVkLnBuZ1wiLFxuICBcIi9hc3NldHMvYnJpY2steWVsbG93LnBuZ1wiLFxuXTtcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUJyaWNrcygpOiBCcmlja1tdIHtcbiAgbGV0IHggPSBJTklUSUFMX1NUQVJUX0JSSUNLX0xFRlQ7XG4gIGxldCB5ID0gSU5JVElBTF9TVEFSVF9CUklDS19SSUdIVDtcblxuICBjb25zdCBicmlja3M6IEJyaWNrW10gPSBbXTtcblxuICBmb3IgKGxldCByb3cgPSAwOyByb3cgPCBCUklDS19ST1dTOyByb3crKykge1xuICAgIGZvciAobGV0IGNvbCA9IDA7IGNvbCA8IEJSSUNLU19DT0xTOyBjb2wrKykge1xuICAgICAgY29uc3QgcG9zOiBWZWN0b3IgPSBuZXcgVmVjdG9yKHgsIHkpO1xuXG4gICAgICBjb25zdCByYW5kUG9zID0gKE1hdGgucmFuZG9tKCkgKiBicmlja3NJbWFnZS5sZW5ndGgpIHwgMDtcbiAgICAgIGNvbnN0IGJyaWNrID0gbmV3IEJyaWNrKHBvcywgYnJpY2tzSW1hZ2VbcmFuZFBvc10pO1xuICAgICAgYnJpY2tzLnB1c2goYnJpY2spO1xuICAgICAgeCArPSBJTkNSRU1FTlRfTEVGVF9CUklDSztcbiAgICB9XG5cbiAgICB4ID0gSU5JVElBTF9TVEFSVF9CUklDS19MRUZUO1xuICAgIHkgKz0gSU5DUkVFTU5UX0RPV05fQlJJQ0s7XG4gIH1cbiAgcmV0dXJuIGJyaWNrcztcbn1cbiIsIi8vIEJSSUNLU1xuZXhwb3J0IGNvbnN0IEJSSUNLX1JPV1MgPSAzO1xuZXhwb3J0IGNvbnN0IEJSSUNLU19DT0xTID0gMTA7XG5leHBvcnQgY29uc3QgQlJJQ0tfV0lEVEggPSAxMDA7XG5leHBvcnQgY29uc3QgQlJJQ0tfSEVJR0hUID0gNDA7XG5leHBvcnQgY29uc3QgSU5JVElBTF9TVEFSVF9CUklDS19MRUZUID0gMTA7XG5leHBvcnQgY29uc3QgSU5JVElBTF9TVEFSVF9CUklDS19SSUdIVCA9IDEwO1xuZXhwb3J0IGNvbnN0IElOQ1JFTUVOVF9MRUZUX0JSSUNLID0gMTIwO1xuZXhwb3J0IGNvbnN0IElOQ1JFRU1OVF9ET1dOX0JSSUNLID0gNjA7XG5leHBvcnQgY29uc3QgQlJJQ0tTX0VORCA9IDE3MDtcblxuLy8gQk9BUkRcbmV4cG9ydCBjb25zdCBCT0FSRF9XSURUSCA9IDEyMDtcbmV4cG9ydCBjb25zdCBCT0FSRF9IRUlHSFQgPSAyMDtcblxuLy9CQUxMXG5leHBvcnQgY29uc3QgQkFMTF9XSURUSCA9IDQwO1xuZXhwb3J0IGNvbnN0IEJBTExfSEVJR0hUID0gNDA7XG5leHBvcnQgY29uc3QgSU5JVElBTF9CQUxMX1ggPSAyMDA7XG5leHBvcnQgY29uc3QgSU5JVElBTF9CQUxMX1kgPSAyMDA7XG5leHBvcnQgY29uc3QgQkFMTF9ESUFNRVRFUiA9IDQwO1xuXG4vL01JU0NFTExBTkVPVVNcbmV4cG9ydCBjb25zdCBCUklDS19CT05VU19QT0lOVFMgPSAxMDtcblxuLy8gR0FNRVxuZXhwb3J0IGNvbnN0IEVBU1lfTEVWRWwgPSAzO1xuZXhwb3J0IGNvbnN0IE1FRElVTV9MRVZFTCA9IDU7XG5leHBvcnQgY29uc3QgSEFSRF9MRVZFTCA9IDg7XG5cbmV4cG9ydCBjb25zdCBTVEVQX1NJWkUgPSAyMDsiLCJpbXBvcnQgeyBFQVNZX0xFVkVsLCBIQVJEX0xFVkVMLCBNRURJVU1fTEVWRUwgfSBmcm9tIFwiLi9jb25zdGFudHNcIjtcbmltcG9ydCB7IERPTVZpZXcgfSBmcm9tIFwiLi4vdmlldy9ET01WaWV3XCI7XG5cbmNvbnN0IGRvbSA9IERPTVZpZXcuZ2V0SW5zdGFuY2UoKTtcblxuZXhwb3J0IGZ1bmN0aW9uIHNldEdhbWVMZXZlbChpbnB1dDogSFRNTElucHV0RWxlbWVudCkge1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0JykuZm9yRWFjaCgoaW5wdXQpID0+IHtcbiAgICAgICAgaW5wdXQuY2hlY2tlZCA9IGZhbHNlO1xuICAgIH0pO1xuICAgIGlucHV0LmNoZWNrZWQgPSB0cnVlO1xuXG4gICAgc3dpdGNoIChpbnB1dC5pZCkge1xuICAgICAgICBjYXNlIFwiZWFzeVwiOlxuICAgICAgICAgICAgcmV0dXJuIEVBU1lfTEVWRWw7XG4gICAgICAgIGNhc2UgXCJtZWRpdW1cIjpcbiAgICAgICAgICAgIHJldHVybiBNRURJVU1fTEVWRUw7XG4gICAgICAgIGNhc2UgXCJoYXJkXCI6XG4gICAgICAgICAgICByZXR1cm4gSEFSRF9MRVZFTDtcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzaG93R2FtZU92ZXJNZXNzYWdlKHNjb3JlUG9pbnRzOiBudW1iZXIpIHtcbiAgICBjb25zdCBnYW1lb3ZlckRpdiA9IGRvbS5nZXRFbGVtZW50KFwiI2dhbWVPdmVyXCIpO1xuXG4gICAgZ2FtZW92ZXJEaXYuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICAoZ2FtZW92ZXJEaXYgYXMgSFRNTERpdkVsZW1lbnQpLmlubmVyVGV4dCA9IGBHYW1lIG92ZXIsIHNjb3JlOiR7c2NvcmVQb2ludHN9YDtcbiAgfVxuXG4iLCJpbXBvcnQgeyBCYWxsIH0gZnJvbSBcIi4uL2ZpZ3VyZXMvQmFsbFwiO1xuaW1wb3J0IHsgQ2FudmFzVmlldyB9IGZyb20gXCIuLi92aWV3L0NhbnZhc1ZpZXdcIjtcbmltcG9ydCB7XG4gIEJBTExfRElBTUVURVIsXG4gIEJPQVJEX0hFSUdIVCxcbiAgQk9BUkRfV0lEVEgsXG4gIEJSSUNLU19FTkRcbn0gZnJvbSBcIi4vY29uc3RhbnRzXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0JhbGxIaXR0aW5nVGhlTGVmdFdhbGwoYmFsbDogQmFsbCkge1xuICByZXR1cm4gYmFsbC5wb3NpdGlvbi54IDw9IDA7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0JhbGxIaXR0aW5nUmlnaHRXYWxsKGJhbGwsIGNhbnZhc1ZpZXc6IENhbnZhc1ZpZXcpIHtcbiAgcmV0dXJuIGJhbGwucG9zaXRpb24ueCA+IGNhbnZhc1ZpZXcuY2FudmFzLndpZHRoIC0gQkFMTF9ESUFNRVRFUjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzQmFsbEhpdHRpbmdUaGVDZWlsaW5nKGJhbGw6IEJhbGwpIHtcbiAgcmV0dXJuIGJhbGwucG9zaXRpb24ueSA8PSAwO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNCYWxsSGl0dGluZ1RoZUZsb29yKGJhbGw6IEJhbGwsIGNhbnZhc1ZpZXc6IENhbnZhc1ZpZXcpIHtcbiAgcmV0dXJuIGJhbGwucG9zaXRpb24ueSA+PSBjYW52YXNWaWV3LmNhbnZhcy5oZWlnaHQgLSBCQUxMX0RJQU1FVEVSO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGlzQmFsbE5lYXJCcmlja3MoYmFsbDogQmFsbCkge1xuICByZXR1cm4gYmFsbC5wb3NpdGlvbi55IDwgQlJJQ0tTX0VORDtcbn1cbmV4cG9ydCBmdW5jdGlvbiBpc0JhbGxDb2xsaWRpbmdXaXRoQm9hcmQoYmFsbCwgYm9hcmQpIHtcbiAgcmV0dXJuIChcbiAgICBiYWxsLnBvc2l0aW9uLnkgKyBCQUxMX0RJQU1FVEVSIC8gMiA+PSBib2FyZC5wb3NpdGlvbi55ICYmXG4gICAgYmFsbC5wb3NpdGlvbi55ICsgQkFMTF9ESUFNRVRFUiAvIDIgPD0gYm9hcmQucG9zaXRpb24ueSArIDEwICYmXG4gICAgYmFsbC5wb3NpdGlvbi54IC0gQkFMTF9ESUFNRVRFUiAvIDIgPD0gYm9hcmQucG9zaXRpb24ueCArIEJPQVJEX1dJRFRIICYmXG4gICAgYmFsbC5wb3NpdGlvbi54ICsgQkFMTF9ESUFNRVRFUiAvIDIgPj0gYm9hcmQucG9zaXRpb24ueFxuICApO1xufVxuIiwiaW1wb3J0IHsgVmVjdG9yIH0gZnJvbSBcIi4uL0dlb21ldHJ5L1ZlY3RvclwiO1xuaW1wb3J0IHtcbiAgQlJJQ0tfUk9XUyxcbiAgQlJJQ0tfV0lEVEgsXG4gIEJSSUNLX0hFSUdIVCxcbiAgQk9BUkRfV0lEVEgsXG4gIEJPQVJEX0hFSUdIVCxcbiAgQkFMTF9ESUFNRVRFUixcbn0gZnJvbSBcIi4uL3V0aWxzL2NvbnN0YW50c1wiO1xuaW1wb3J0IHsgQmFsbCB9IGZyb20gXCIuLi9maWd1cmVzL0JhbGxcIjtcbmltcG9ydCB7IEJyaWNrIH0gZnJvbSBcIi4uL2ZpZ3VyZXMvQnJpY2tcIjtcbmltcG9ydCB7IFBhZGRsZSB9IGZyb20gXCIuLi9maWd1cmVzL1BhZGRsZVwiO1xuXG5leHBvcnQgY2xhc3MgQ2FudmFzVmlldyB7XG4gIHByaXZhdGUgY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ7XG4gIHB1YmxpYyBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50O1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBjYW52YXNTZWxlY3Rvcjogc3RyaW5nKSB7XG4gICAgdGhpcy5jYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChjYW52YXNTZWxlY3RvcikgYXMgSFRNTENhbnZhc0VsZW1lbnQ7XG4gICAgdGhpcy5jdHggPSB0aGlzLmNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG4gIH1cblxuICBkcmF3SW1hZ2UoXG4gICAgcG9zaXRpb246IFZlY3RvcixcbiAgICBpbWFnZTogSFRNTEltYWdlRWxlbWVudCxcbiAgICB3aWR0aDogbnVtYmVyLFxuICAgIGhlaWdodDogbnVtYmVyXG4gICkge1xuICAgIHRoaXMuY3R4LmRyYXdJbWFnZShpbWFnZSwgcG9zaXRpb24ueCwgcG9zaXRpb24ueSwgd2lkdGgsIGhlaWdodCk7XG4gIH1cblxuICBkcmF3QnJpY2tzKGJyaWNrczogQnJpY2tbXSkge1xuICAgIGZvciAobGV0IHIgPSAwOyByIDwgQlJJQ0tfUk9XUzsgcisrKSB7XG4gICAgICBmb3IgKGxldCBjID0gMDsgYyA8IGJyaWNrcy5sZW5ndGg7IGMrKykge1xuICAgICAgICBjb25zdCBicmljayA9IGJyaWNrc1tjXTtcbiAgICAgICAgY29uc3QgcG9zOiBWZWN0b3IgPSBuZXcgVmVjdG9yKFxuICAgICAgICAgIGJyaWNrLnBvc2l0aW9uLngsXG4gICAgICAgICAgYnJpY2sucG9zaXRpb24ueSxcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5kcmF3SW1hZ2UocG9zLCBicmljay5nZXRJbWFnZSgpLCBCUklDS19XSURUSCwgQlJJQ0tfSEVJR0hUKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBkcmF3QmFsbChiYWxsOiBCYWxsKSB7XG4gICAgdGhpcy5kcmF3SW1hZ2UoXG4gICAgICBuZXcgVmVjdG9yKGJhbGwucG9zaXRpb24ueCAtIEJBTExfRElBTUVURVIgLyAyLCBiYWxsLnBvc2l0aW9uLnkgLSBCQUxMX0RJQU1FVEVSIC8gMiksXG4gICAgICBiYWxsLmdldEltYWdlKCksXG4gICAgICBCQUxMX0RJQU1FVEVSLFxuICAgICAgQkFMTF9ESUFNRVRFUlxuICAgICk7XG4gIH1cblxuICBkcmF3Qm9hcmQoYm9hcmQ6IFBhZGRsZSkge1xuICAgIHRoaXMuY3R4LmJlZ2luUGF0aCgpO1xuICAgIHRoaXMuY3R4LmRyYXdJbWFnZShcbiAgICAgIGJvYXJkLmdldEltYWdlKCksXG4gICAgICBib2FyZC5wb3NpdGlvbi54LFxuICAgICAgYm9hcmQucG9zaXRpb24ueSxcbiAgICAgIEJPQVJEX1dJRFRILFxuICAgICAgQk9BUkRfSEVJR0hUXG4gICAgKTtcbiAgICB0aGlzLmN0eC5jbG9zZVBhdGgoKTtcbiAgfVxuXG4gIGdldENvbnRleHQoKTogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEIHtcbiAgICByZXR1cm4gdGhpcy5jdHg7XG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IGNhbnZhc1ZpZXcgPSBuZXcgQ2FudmFzVmlldyhcImdhbWVDYW52YXNcIik7IiwiXG5leHBvcnQgdHlwZSBET01FbGVtZW50ID0gc3RyaW5nIHwgTm9kZTtcblxuZXhwb3J0IGludGVyZmFjZSBET00ge1xuICAgIGNyZWF0ZUVsZW1lbnQodHlwZTogc3RyaW5nLCBhdHRyaWJ1dGVzOiBvYmplY3QsIC4uLmNvbnRlbnQ6IERPTUVsZW1lbnRbXSk6IEhUTUxFbGVtZW50O1xuXG4gICAgYWRkRWxlbWVudChhcHBlbmRUbzogc3RyaW5nLCBlbGVtZW50OiBIVE1MRWxlbWVudCk6IHZvaWQ7XG5cbiAgICBnZXRFbGVtZW50KHNlbGVjdG9yOiBzdHJpbmcpOiBhbnk7XG5cbiAgICBkZWxldGVFbGVtZW50KHNlbGVjdG9yOiBzdHJpbmcpOiB2b2lkO1xufVxuXG5leHBvcnQgY2xhc3MgRE9NVmlldyBpbXBsZW1lbnRzIERPTSB7XG4gICAgcHJpdmF0ZSBzdGF0aWMgaW5zdGFuY2U6IERPTVZpZXc7XG5cbiAgICBwcml2YXRlIGNvbnN0cnVjdG9yKCkge1xuICAgIH1cblxuICAgIHN0YXRpYyBnZXRJbnN0YW5jZSgpOiBET01WaWV3IHtcbiAgICAgICAgaWYgKCF0aGlzLmluc3RhbmNlKSB7XG4gICAgICAgICAgICB0aGlzLmluc3RhbmNlID0gbmV3IERPTVZpZXcoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZTtcbiAgICB9XG5cbiAgICAvKipcbiAgKiBUaGlzIGZ1bmN0aW9uIGNhbm5vdCBjcmVhdGUgYSB0YWJsZVxuICAqIEBwYXJhbSB7IHN0cmluZyB9IHR5cGVcbiAgKiBAcGFyYW0geyBPYmplY3QgfSBhdHRyaWJ1dGVzXG4gICogQHBhcmFtICB7IC4uLihzdHJpbmcgfCBOb2RlKSB9IGNvbnRlbnQgXG4gICogQHJldHVybnMgeyBIVE1MRWxlbWVudCB9IFJldHVybnMgdGhlIGNyZWF0ZWQgZWxlbWVudFxuICAqL1xuICAgIGNyZWF0ZUVsZW1lbnQodHlwZTogc3RyaW5nLCBhdHRyaWJ1dGVzOiBvYmplY3QsIC4uLmNvbnRlbnQ6IERPTUVsZW1lbnRbXSk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodHlwZSk7XG5cbiAgICAgICAgaWYgKGF0dHJpYnV0ZXMpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGF0dHJpYnV0ZSBpbiBhdHRyaWJ1dGVzKSB7XG4gICAgICAgICAgICAgICAgaWYgKGF0dHJpYnV0ZS5zdGFydHNXaXRoKCdvbicpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGV2ZW50TmFtZSA9IGF0dHJpYnV0ZS5zbGljZSgyKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBhdHRyaWJ1dGVzW2F0dHJpYnV0ZV0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnRbYXR0cmlidXRlXSA9IGF0dHJpYnV0ZXNbYXR0cmlidXRlXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGxldCBpdGVtIG9mIGNvbnRlbnQpIHtcbiAgICAgICAgICAgIGVsZW1lbnQuYXBwZW5kKGl0ZW0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGVsZW1lbnQ7XG4gICAgfVxuXG4gICAgYWRkRWxlbWVudChhcHBlbmRUbzogc3RyaW5nLCBlbGVtZW50OiBIVE1MRWxlbWVudCkge1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGFwcGVuZFRvKS5hcHBlbmQoZWxlbWVudCk7XG4gICAgfVxuXG4gICAgZ2V0RWxlbWVudChzZWxlY3Rvcjogc3RyaW5nKTogSFRNTEVsZW1lbnQge1xuICAgICAgICBsZXQgdmFsdWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKSBhcyBIVE1MRWxlbWVudDtcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cbiAgICBkZWxldGVFbGVtZW50KHNlbGVjdG9yOiBzdHJpbmcpIHtcbiAgICAgICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpO1xuICAgICAgICBlbGVtZW50LnJlbW92ZSgpO1xuICAgIH1cblxuICAgIGFkZEhhbmRsZXIoZXZlbnQ6IHN0cmluZywgY2FsbGJhY2s6IEV2ZW50TGlzdGVuZXIsIHNlbGVjdG9yPzogc3RyaW5nKSB7XG4gICAgICAgIGlmIChzZWxlY3Rvcikge1xuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3RvcikuYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgY2FsbGJhY2spXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCBjYWxsYmFjayk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhZGRSaWdodENsaWNrSGFuZGxlcihjYWxsYmFjazogRXZlbnRMaXN0ZW5lcikge1xuICAgICAgICB3aW5kb3cub25jb250ZXh0bWVudSA9IGNhbGxiYWNrO1xuICAgIH1cbiAgICBzaG93SW5pdGlhbFNjcmVlbigpIHtcbiAgICAgICAgdGhpcy5nZXRFbGVtZW50KFwiI2NvbnRhaW5lclwiKS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgICB0aGlzLmdldEVsZW1lbnQoXCIjZ2FtZUNhbnZhc1wiKS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgIHRoaXMuZ2V0RWxlbWVudChcIiNkZXRhaWxzLWJveFwiKS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgIHRoaXMuZ2V0RWxlbWVudChcIiNnYW1lT3ZlclwiKS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCJcbiAgICB9XG4gICAgc2V0U2NvcmUoc2NvcmVQb2ludHM6IG51bWJlcikge1xuICAgICAgICB0aGlzLmdldEVsZW1lbnQoXCIjc2NvcmVcIikudGV4dENvbnRlbnQgPSBgU2NvcmU6ICR7c2NvcmVQb2ludHMudG9TdHJpbmcoKX1gO1xuICAgIH1cbiAgICBzZXRMaXZlcyhsaXZlczogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuZ2V0RWxlbWVudChcIiNsaWZlXCIpLmlubmVyVGV4dCA9IGxpdmVzLnRvU3RyaW5nKCk7XG4gICAgfVxufSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHtcbiAgRUFTWV9MRVZFbCxcbn0gZnJvbSBcIi4vdXRpbHMvY29uc3RhbnRzXCI7XG5cbmltcG9ydCB7IENhbnZhc1ZpZXcgfSBmcm9tIFwiLi92aWV3L0NhbnZhc1ZpZXdcIjtcbmltcG9ydCB7IEdhbWUgfSBmcm9tIFwiLi9lbmdpbmUvZ2FtZUxvb3BcIjtcblxuY29uc3QgY2FudmFzVmlldyA9IG5ldyBDYW52YXNWaWV3KFwiZ2FtZUNhbnZhc1wiKTtcbmNvbnN0IGdhbWVvdmVyRGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJnYW1lT3ZlclwiKTtcblxuaW1wb3J0IHsgRE9NVmlldyB9IGZyb20gXCIuL3ZpZXcvRE9NVmlld1wiO1xuaW1wb3J0IHsgc2V0R2FtZUxldmVsIH0gZnJvbSBcIi4vdXRpbHMvaGVscGVyc1wiO1xuXG5cbmNvbnN0IGRvbSA9IERPTVZpZXcuZ2V0SW5zdGFuY2UoKTtcblxubGV0IEdBTUVfRElGRklDVUxUWSA9IEVBU1lfTEVWRWw7XG5cbmxldCBsaXZlcyA9IDM7XG5sZXQgZ2FtZSA9IG5ldyBHYW1lKGNhbnZhc1ZpZXcsIGxpdmVzKTtcblxuY29uc3QgcGxheUJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGxheS1idG5cIik7XG5sZXQgaXNQbGF5aW5nTXVzaWMgPSBmYWxzZTtcblxuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJuZXctZ2FtZVwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgaWYgKGdhbWUubGl2ZXMgPD0gMSkge1xuICAgIChlLnRhcmdldCBhcyBIVE1MQnV0dG9uRWxlbWVudCkuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiXG4gIH0gZWxzZSB7XG4gICAgKGUudGFyZ2V0IGFzIEhUTUxCdXR0b25FbGVtZW50KS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiXG4gIH1cblxuICBnYW1lLnN0YXJ0R2FtZSgpO1xuICBnYW1lb3ZlckRpdi5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG59KTtcblxuXG5cbnBsYXlCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgZG9tLmdldEVsZW1lbnQoXCIjY29udGFpbmVyXCIpLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgZG9tLmdldEVsZW1lbnQoXCIjZ2FtZUNhbnZhc1wiKS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuXG4gIGNvbnN0IGRldGFpbHNCb3ggPSBkb20uZ2V0RWxlbWVudChcIiNkZXRhaWxzLWJveFwiKTtcbiAgZGV0YWlsc0JveC5zdHlsZS5kaXNwbGF5ID0gXCJmbGV4XCI7XG4gIGRldGFpbHNCb3guc3R5bGUuanVzdGlmeUNvbnRlbnQgPSBcInNwYWNlLWFyb3VuZFwiO1xuICBnYW1lLmxpdmVzID0gbGl2ZXM7XG4gIGdhbWUuc2NvcmVQb2ludHMgPSAwO1xuICBnYW1lLnN0YXJ0R2FtZSgpO1xuXG4gIGlmIChpc1BsYXlpbmdNdXNpYykge1xuICAgIGNvbnN0IG11c2ljID0gbmV3IEF1ZGlvKFwiLi4vYXNzZXRzL211c2ljLm1wM1wiKTtcbiAgICBtdXNpYy52b2x1bWUgPSAwLjE7XG4gICAgbXVzaWMucGxheSgpO1xuICB9XG59KTtcblxuXG5kb20uZ2V0RWxlbWVudChcIiNzZXR0aW5nLWJ0blwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICBjb25zdCBzZXR0aW5nc0NvbnRhaW5lciA9IGRvbS5nZXRFbGVtZW50KFwiI3NldHRpbmdzLWNvbnRhaW5lclwiKTtcbiAgY29uc3QgY29udGFpbmVyID0gZG9tLmdldEVsZW1lbnQoXCIjY29udGFpbmVyXCIpO1xuICBzZXR0aW5nc0NvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICBjb250YWluZXIuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuXG4gIGRvbS5nZXRFbGVtZW50KFwiI2JhY2stYnRuXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgc2V0dGluZ3NDb250YWluZXIuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgIGNvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICB9KTtcblxuICBkb20uZ2V0RWxlbWVudChcIiNwbGF5LXNvdW5kLWJ0blwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIGlzUGxheWluZ011c2ljID0gdHJ1ZTtcbiAgICAoZG9tLmdldEVsZW1lbnQoXCIuZ2ctY2hlY2tcIikgYXMgSFRNTEVsZW1lbnQpLnN0eWxlLmRpc3BsYXkgPVxuICAgICAgXCJibG9ja1wiO1xuICB9KTtcbn0pOyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==