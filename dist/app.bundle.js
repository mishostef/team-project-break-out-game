/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/engine/gameLoop.ts":
/*!********************************!*\
  !*** ./src/engine/gameLoop.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Game": () => (/* binding */ Game)
/* harmony export */ });
/* harmony import */ var _view_canvasView__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../view/canvasView */ "./src/view/canvasView.ts");
/* harmony import */ var _figures_paddle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../figures/paddle */ "./src/figures/paddle.ts");
/* harmony import */ var _figures_ball__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../figures/ball */ "./src/figures/ball.ts");
/* harmony import */ var _move__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./move */ "./src/engine/move.ts");
/* harmony import */ var _utils_constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/constants */ "./src/utils/constants.ts");
/* harmony import */ var _utils_validators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/validators */ "./src/utils/validators.ts");
/* harmony import */ var _utils_helpers__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/helpers */ "./src/utils/helpers.ts");
/* harmony import */ var _physics_movement__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../physics/movement */ "./src/physics/movement.ts");
/* harmony import */ var _geometry_vector__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../geometry/vector */ "./src/geometry/vector.ts");
/* harmony import */ var _physics_misc__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../physics/misc */ "./src/physics/misc.ts");
/* harmony import */ var _utils_brickFactory__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../utils/brickFactory */ "./src/utils/brickFactory.ts");
/* harmony import */ var _view_DOMView__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../view/DOMView */ "./src/view/DOMView.ts");












const input = {};
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
        this.addHandlers();
    }
    addHandlers() {
        this.dom.addHandler("keydown", (event) => {
            input[event.code] = true;
        });
        this.dom.addHandler("keyup", (event) => {
            input[event.code] = false;
        });
        this.dom.addHandler("mousemove", (e) => {
            if (this.isMouseActive) {
                const positionInfo = _view_canvasView__WEBPACK_IMPORTED_MODULE_0__.canvasView.canvas.getBoundingClientRect();
                const width = positionInfo.width;
                let mouseX = e.offsetX;
                if (mouseX < _view_canvasView__WEBPACK_IMPORTED_MODULE_0__.canvasView.canvas.offsetLeft) {
                    mouseX = 0;
                }
                else if (mouseX > width) {
                    mouseX = _view_canvasView__WEBPACK_IMPORTED_MODULE_0__.canvasView.canvas.width - _utils_constants__WEBPACK_IMPORTED_MODULE_4__.BOARD_WIDTH;
                }
                this.board.position.x = mouseX;
            }
        });
        this.dom.addRightClickHandler((e) => {
            e.preventDefault();
            this.isMouseActive = false;
        });
        this.dom.addHandler("click", (e) => {
            const input = e.target;
            this.GAME_DIFFICULTY = (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_6__.setGameLevel)(input);
        }, "#level");
    }
    initializeGameObjects() {
        if (this.bricks == undefined || this.bricks && this.bricks.length == 0 && this.lives > 0) {
            this.bricks = (0,_utils_brickFactory__WEBPACK_IMPORTED_MODULE_10__.createBricks)();
        }
        const boardPosition = new _geometry_vector__WEBPACK_IMPORTED_MODULE_8__.Vector(_view_canvasView__WEBPACK_IMPORTED_MODULE_0__.canvasView.canvas.width / 2, _view_canvasView__WEBPACK_IMPORTED_MODULE_0__.canvasView.canvas.height - 100);
        this.board = new _figures_paddle__WEBPACK_IMPORTED_MODULE_1__.Paddle(boardPosition, this.dom.getBoardImage());
        const ballPosition = new _geometry_vector__WEBPACK_IMPORTED_MODULE_8__.Vector(_utils_constants__WEBPACK_IMPORTED_MODULE_4__.INITIAL_BALL_X, _utils_constants__WEBPACK_IMPORTED_MODULE_4__.INITIAL_BALL_Y);
        this.ball = new _figures_ball__WEBPACK_IMPORTED_MODULE_2__.Ball(ballPosition, "/assets/ball.png");
        this.ball.velocity = new _geometry_vector__WEBPACK_IMPORTED_MODULE_8__.Vector(this.GAME_DIFFICULTY, this.GAME_DIFFICULTY);
        this.lastTime = 0;
        this.elapsed = 0;
        this.gameOver = false;
    }
    gameLoop() {
        if (input['ArrowLeft'] && (this.board.position.x > 0)) {
            this.board.velocity.x = -7;
            (0,_move__WEBPACK_IMPORTED_MODULE_3__.move)(this.board);
        }
        else if (input['ArrowRight'] && (this.board.position.x + _utils_constants__WEBPACK_IMPORTED_MODULE_4__.BOARD_WIDTH < _view_canvasView__WEBPACK_IMPORTED_MODULE_0__.canvasView.canvas.width)) {
            this.board.velocity.x = 7;
            (0,_move__WEBPACK_IMPORTED_MODULE_3__.move)(this.board);
        }
        if (this.bricks.length == 0) {
        }
        _view_canvasView__WEBPACK_IMPORTED_MODULE_0__.canvasView.getContext().clearRect(0, 0, _view_canvasView__WEBPACK_IMPORTED_MODULE_0__.canvasView.canvas.width, _view_canvasView__WEBPACK_IMPORTED_MODULE_0__.canvasView.canvas.height);
        _view_canvasView__WEBPACK_IMPORTED_MODULE_0__.canvasView.drawBricks(this.bricks);
        _view_canvasView__WEBPACK_IMPORTED_MODULE_0__.canvasView.drawBoard(this.board);
        _view_canvasView__WEBPACK_IMPORTED_MODULE_0__.canvasView.drawBall(this.ball);
        this.collisionDetector();
        if (!this.gameOver) {
            (0,_move__WEBPACK_IMPORTED_MODULE_3__.move)(this.ball);
        }
    }
    collisionDetector() {
        if ((0,_utils_validators__WEBPACK_IMPORTED_MODULE_5__.isBallCollidingWithBoard)(this.ball, this.board)) {
            (0,_physics_movement__WEBPACK_IMPORTED_MODULE_7__.handleBoardHit)(this.ball, this.board);
        }
        if ((0,_utils_validators__WEBPACK_IMPORTED_MODULE_5__.isBallHittingTheFloor)(this.ball, this.canvasView)) {
            this.lives--;
            this.gameOver = true;
            if (this.lives === 0) {
                (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_6__.showGameOverMessage)(this.scorePoints);
                setTimeout(() => {
                    this.dom.showInitialScreen();
                    this.lives = this.maxLives;
                    this.bricks = (0,_utils_brickFactory__WEBPACK_IMPORTED_MODULE_10__.createBricks)();
                    this.scorePoints = 0;
                    this.dom.hideNewGameButton();
                }, 1500);
            }
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
    //
    startGame() {
        if (this.lives > 1) {
            this.dom.showNewGameButton();
            this.dom.hideCongratulations();
        }
        else {
            this.dom.hideNewGameButton();
        }
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
            ///explode(brick);
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
        else if (this.bricks.length === 0) {
            this.dom.showCongratulations();
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

/***/ "./src/figures/ball.ts":
/*!*****************************!*\
  !*** ./src/figures/ball.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Ball": () => (/* binding */ Ball)
/* harmony export */ });
/* harmony import */ var _geometry_vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../geometry/vector */ "./src/geometry/vector.ts");

class Ball {
    position;
    image = new Image();
    velocity = new _geometry_vector__WEBPACK_IMPORTED_MODULE_0__.Vector(0, 0);
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

/***/ "./src/figures/brick.ts":
/*!******************************!*\
  !*** ./src/figures/brick.ts ***!
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

/***/ "./src/figures/paddle.ts":
/*!*******************************!*\
  !*** ./src/figures/paddle.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Paddle": () => (/* binding */ Paddle)
/* harmony export */ });
/* harmony import */ var _geometry_vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../geometry/vector */ "./src/geometry/vector.ts");

class Paddle {
    position;
    image = new Image();
    velocity = new _geometry_vector__WEBPACK_IMPORTED_MODULE_0__.Vector(0, 0);
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

/***/ "./src/geometry/vector.ts":
/*!********************************!*\
  !*** ./src/geometry/vector.ts ***!
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
/* harmony import */ var _figures_brick__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../figures/brick */ "./src/figures/brick.ts");
/* harmony import */ var _geometry_vector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../geometry/vector */ "./src/geometry/vector.ts");
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
            const pos = new _geometry_vector__WEBPACK_IMPORTED_MODULE_1__.Vector(x, y);
            const randPos = (Math.random() * bricksImage.length) | 0;
            const brick = new _figures_brick__WEBPACK_IMPORTED_MODULE_0__.Brick(pos, bricksImage[randPos]);
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
    addBackButtonHandler() {
        this.addHandler("click", () => { this.hideSettingsMenu(); }, "#back-btn");
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
    initGame() {
        this.getElement("#container").style.display = "none";
        this.getElement("#gameCanvas").style.display = "block";
        const detailsBox = this.getElement("#details-box");
        detailsBox.style.display = "flex";
        detailsBox.style.justifyContent = "space-around";
    }
    setScore(scorePoints) {
        this.getElement("#score").textContent = `Score: ${scorePoints.toString()}`;
    }
    setLives(lives) {
        this.getElement("#life").innerText = lives.toString();
    }
    showNewGameButton() {
        this.getElement("#new-game").style.display = "block";
    }
    showCongratulations() {
        this.getElement("#gameWin").style.display = "block";
    }
    hideNewGameButton() {
        this.getElement("#new-game").style.display = "none";
    }
    hideCongratulations() {
        this.getElement("#gameWin").style.display = "none";
    }
    getBoardImage() {
        return this.getElement("#board");
    }
    showSettingsMenu() {
        const settingsContainer = this.getElement("#settings-container");
        const container = this.getElement("#container");
        settingsContainer.style.display = "block";
        container.style.display = "none";
    }
    hideSettingsMenu() {
        const settingsContainer = this.getElement("#settings-container");
        const container = this.getElement("#container");
        settingsContainer.style.display = "none";
        container.style.display = "block";
    }
    showIcon() {
        this.getElement(".gg-check").style.display =
            "block";
    }
    getPlayButton() {
        return this.getElement("#play-btn");
    }
    hideGameOverMessage() {
        this.getElement("#gameOver").style.display = "none";
    }
}


/***/ }),

/***/ "./src/view/canvasView.ts":
/*!********************************!*\
  !*** ./src/view/canvasView.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CanvasView": () => (/* binding */ CanvasView),
/* harmony export */   "canvasView": () => (/* binding */ canvasView)
/* harmony export */ });
/* harmony import */ var _geometry_vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../geometry/vector */ "./src/geometry/vector.ts");
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
                const pos = new _geometry_vector__WEBPACK_IMPORTED_MODULE_0__.Vector(brick.position.x, brick.position.y);
                this.drawImage(pos, brick.getImage(), _utils_constants__WEBPACK_IMPORTED_MODULE_1__.BRICK_WIDTH, _utils_constants__WEBPACK_IMPORTED_MODULE_1__.BRICK_HEIGHT);
            }
        }
    }
    drawBall(ball) {
        this.drawImage(new _geometry_vector__WEBPACK_IMPORTED_MODULE_0__.Vector(ball.position.x - _utils_constants__WEBPACK_IMPORTED_MODULE_1__.BALL_DIAMETER / 2, ball.position.y - _utils_constants__WEBPACK_IMPORTED_MODULE_1__.BALL_DIAMETER / 2), ball.getImage(), _utils_constants__WEBPACK_IMPORTED_MODULE_1__.BALL_DIAMETER, _utils_constants__WEBPACK_IMPORTED_MODULE_1__.BALL_DIAMETER);
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
/* harmony import */ var _view_canvasView__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./view/canvasView */ "./src/view/canvasView.ts");
/* harmony import */ var _engine_gameLoop__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./engine/gameLoop */ "./src/engine/gameLoop.ts");
/* harmony import */ var _view_DOMView__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./view/DOMView */ "./src/view/DOMView.ts");



const canvasView = new _view_canvasView__WEBPACK_IMPORTED_MODULE_0__.CanvasView("gameCanvas");
const dom = _view_DOMView__WEBPACK_IMPORTED_MODULE_2__.DOMView.getInstance();
let lives = 3;
let game = new _engine_gameLoop__WEBPACK_IMPORTED_MODULE_1__.Game(canvasView, lives);
let isPlayingMusic = false;
dom.addHandler("click", () => {
    game.startGame();
    dom.hideGameOverMessage();
}, "#new-game");
dom.addHandler("click", () => {
    dom.initGame();
    game.lives = lives;
    game.scorePoints = 0;
    game.startGame();
    if (isPlayingMusic) {
        const music = new Audio("../assets/music.mp3");
        music.volume = 0.1;
        music.play();
    }
}, "#play-btn");
dom.addHandler("click", () => {
    dom.showSettingsMenu();
    dom.addBackButtonHandler();
    dom.addHandler("click", () => {
        isPlayingMusic = true;
        dom.showIcon();
    }, "#play-sound-btn");
}, "#setting-btn");

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDO0FBQ3hCLENBQUMsRUFBRSxjQUFjLENBQUMsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2J1ZGdldGVlci10cy8uL3NyYy9lbmdpbmUvZ2FtZUxvb3AudHMiLCJ3ZWJwYWNrOi8vYnVkZ2V0ZWVyLXRzLy4vc3JjL2VuZ2luZS9tb3ZlLnRzIiwid2VicGFjazovL2J1ZGdldGVlci10cy8uL3NyYy9maWd1cmVzL2JhbGwudHMiLCJ3ZWJwYWNrOi8vYnVkZ2V0ZWVyLXRzLy4vc3JjL2ZpZ3VyZXMvYnJpY2sudHMiLCJ3ZWJwYWNrOi8vYnVkZ2V0ZWVyLXRzLy4vc3JjL2ZpZ3VyZXMvcGFkZGxlLnRzIiwid2VicGFjazovL2J1ZGdldGVlci10cy8uL3NyYy9nZW9tZXRyeS92ZWN0b3IudHMiLCJ3ZWJwYWNrOi8vYnVkZ2V0ZWVyLXRzLy4vc3JjL3BoeXNpY3MvbWlzYy50cyIsIndlYnBhY2s6Ly9idWRnZXRlZXItdHMvLi9zcmMvcGh5c2ljcy9tb3ZlbWVudC50cyIsIndlYnBhY2s6Ly9idWRnZXRlZXItdHMvLi9zcmMvdXRpbHMvYnJpY2tGYWN0b3J5LnRzIiwid2VicGFjazovL2J1ZGdldGVlci10cy8uL3NyYy91dGlscy9jb25zdGFudHMudHMiLCJ3ZWJwYWNrOi8vYnVkZ2V0ZWVyLXRzLy4vc3JjL3V0aWxzL2hlbHBlcnMudHMiLCJ3ZWJwYWNrOi8vYnVkZ2V0ZWVyLXRzLy4vc3JjL3V0aWxzL3ZhbGlkYXRvcnMudHMiLCJ3ZWJwYWNrOi8vYnVkZ2V0ZWVyLXRzLy4vc3JjL3ZpZXcvRE9NVmlldy50cyIsIndlYnBhY2s6Ly9idWRnZXRlZXItdHMvLi9zcmMvdmlldy9jYW52YXNWaWV3LnRzIiwid2VicGFjazovL2J1ZGdldGVlci10cy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9idWRnZXRlZXItdHMvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2J1ZGdldGVlci10cy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2J1ZGdldGVlci10cy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2J1ZGdldGVlci10cy8uL3NyYy9hcHAudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2FudmFzVmlldywgY2FudmFzVmlldyB9IGZyb20gXCIuLi92aWV3L2NhbnZhc1ZpZXdcIjtcbmltcG9ydCB7IFBhZGRsZSB9IGZyb20gXCIuLi9maWd1cmVzL3BhZGRsZVwiO1xuaW1wb3J0IHsgQmFsbCB9IGZyb20gXCIuLi9maWd1cmVzL2JhbGxcIjtcbmltcG9ydCB7IEJyaWNrIH0gZnJvbSBcIi4uL2ZpZ3VyZXMvYnJpY2tcIjtcbmltcG9ydCB7IG1vdmUgfSBmcm9tIFwiLi9tb3ZlXCI7XG5pbXBvcnQge1xuICAgIEJPQVJEX1dJRFRILCBCUklDS19CT05VU19QT0lOVFMsIElOSVRJQUxfQkFMTF9YLCBJTklUSUFMX0JBTExfWSxcbn0gZnJvbSBcIi4uL3V0aWxzL2NvbnN0YW50c1wiO1xuaW1wb3J0IHtcbiAgICBpc0JhbGxIaXR0aW5nVGhlRmxvb3IsIGlzQmFsbEhpdHRpbmdUaGVDZWlsaW5nLCBpc0JhbGxIaXR0aW5nUmlnaHRXYWxsLFxuICAgIGlzQmFsbEhpdHRpbmdUaGVMZWZ0V2FsbCwgaXNCYWxsQ29sbGlkaW5nV2l0aEJvYXJkLCBpc0JhbGxOZWFyQnJpY2tzXG59IGZyb20gXCIuLi91dGlscy92YWxpZGF0b3JzXCI7XG5pbXBvcnQgeyBzZXRHYW1lTGV2ZWwsIHNob3dHYW1lT3Zlck1lc3NhZ2UgfSBmcm9tIFwiLi4vdXRpbHMvaGVscGVyc1wiO1xuaW1wb3J0IHsgY2hhbmdlQmFsbERpcmVjdGlvbiwgaGFuZGxlQm9hcmRIaXQgfSBmcm9tIFwiLi4vcGh5c2ljcy9tb3ZlbWVudFwiO1xuaW1wb3J0IHsgVmVjdG9yIH0gZnJvbSBcIi4uL2dlb21ldHJ5L3ZlY3RvclwiO1xuaW1wb3J0IHsgZ2V0SGl0QnJpY2tJbmRleCB9IGZyb20gXCIuLi9waHlzaWNzL21pc2NcIjtcbmltcG9ydCB7IGNyZWF0ZUJyaWNrcyB9IGZyb20gXCIuLi91dGlscy9icmlja0ZhY3RvcnlcIjtcbmltcG9ydCB7IGV4cGxvZGUgfSBmcm9tIFwiLi4vZWZmZWN0cy9leHBsb3Npb25cIjtcbmltcG9ydCB7IERPTVZpZXcgfSBmcm9tIFwiLi4vdmlldy9ET01WaWV3XCI7XG5cblxuY29uc3QgaW5wdXQ6IHsgW2NvZGU6IHN0cmluZ106IGJvb2xlYW4gfSA9IHt9O1xuXG5cbmV4cG9ydCBpbnRlcmZhY2UgR2FtZU9iamVjdHMge1xuICAgIGJhbGw6IEJhbGwsIGJvYXJkOiBQYWRkbGUsIGJyaWNrczogQnJpY2tbXVxufVxuXG5leHBvcnQgY2xhc3MgR2FtZSB7XG4gICAgcHJpdmF0ZSBiYWxsOiBCYWxsO1xuICAgIHByaXZhdGUgYm9hcmQ6IFBhZGRsZTtcbiAgICBwcml2YXRlIGJyaWNrczogQnJpY2tbXTtcbiAgICBwdWJsaWMgc2NvcmVQb2ludHM6IG51bWJlcjtcbiAgICBwdWJsaWMgR0FNRV9ESUZGSUNVTFRZID0gMztcbiAgICBwcml2YXRlIHJlYWRvbmx5IFNURVBfU0laRSA9IDIwO1xuICAgIHByaXZhdGUgbGFzdFRpbWU6IG51bWJlcjtcbiAgICBwcml2YXRlIGVsYXBzZWQ6IG51bWJlcjtcbiAgICBwdWJsaWMgZ2FtZU92ZXI6IGJvb2xlYW47XG4gICAgcHJpdmF0ZSBkb20gPSBET01WaWV3LmdldEluc3RhbmNlKCk7XG4gICAgcHJpdmF0ZSBpc01vdXNlQWN0aXZlID0gdHJ1ZTtcbiAgICBwcml2YXRlIG1heExpdmVzID0gMztcblxuXG4gICAgY29uc3RydWN0b3IocHVibGljIGNhbnZhc1ZpZXc6IENhbnZhc1ZpZXcsIHB1YmxpYyBsaXZlczogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuc2NvcmVQb2ludHMgPSAwO1xuICAgICAgICB0aGlzLm1heExpdmVzID0gbGl2ZXM7XG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZUdhbWVPYmplY3RzKCk7XG4gICAgICAgIHRoaXMuYWRkSGFuZGxlcnMoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGFkZEhhbmRsZXJzKCkge1xuICAgICAgICB0aGlzLmRvbS5hZGRIYW5kbGVyKFwia2V5ZG93blwiLCAoZXZlbnQ6IEtleWJvYXJkRXZlbnQpID0+IHtcbiAgICAgICAgICAgIGlucHV0W2V2ZW50LmNvZGVdID0gdHJ1ZTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuZG9tLmFkZEhhbmRsZXIoXCJrZXl1cFwiLCAoZXZlbnQ6IEtleWJvYXJkRXZlbnQpID0+IHtcbiAgICAgICAgICAgIGlucHV0W2V2ZW50LmNvZGVdID0gZmFsc2U7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmRvbS5hZGRIYW5kbGVyKFwibW91c2Vtb3ZlXCIsIChlOiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5pc01vdXNlQWN0aXZlKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcG9zaXRpb25JbmZvID0gY2FudmFzVmlldy5jYW52YXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgICAgICAgICAgY29uc3Qgd2lkdGggPSBwb3NpdGlvbkluZm8ud2lkdGg7XG4gICAgICAgICAgICAgICAgbGV0IG1vdXNlWCA9IGUub2Zmc2V0WDtcbiAgICAgICAgICAgICAgICBpZiAobW91c2VYIDwgY2FudmFzVmlldy5jYW52YXMub2Zmc2V0TGVmdCkge1xuICAgICAgICAgICAgICAgICAgICBtb3VzZVggPSAwO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAobW91c2VYID4gd2lkdGgpIHtcbiAgICAgICAgICAgICAgICAgICAgbW91c2VYID0gY2FudmFzVmlldy5jYW52YXMud2lkdGggLSBCT0FSRF9XSURUSDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5ib2FyZC5wb3NpdGlvbi54ID0gbW91c2VYO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5kb20uYWRkUmlnaHRDbGlja0hhbmRsZXIoKGUpID0+IHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHRoaXMuaXNNb3VzZUFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5kb20uYWRkSGFuZGxlcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBpbnB1dCA9IChlLnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50KTtcbiAgICAgICAgICAgIHRoaXMuR0FNRV9ESUZGSUNVTFRZID0gc2V0R2FtZUxldmVsKGlucHV0KTtcbiAgICAgICAgfSwgXCIjbGV2ZWxcIik7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpbml0aWFsaXplR2FtZU9iamVjdHMoKSB7XG4gICAgICAgIGlmICh0aGlzLmJyaWNrcyA9PSB1bmRlZmluZWQgfHwgdGhpcy5icmlja3MgJiYgdGhpcy5icmlja3MubGVuZ3RoID09IDAgJiYgdGhpcy5saXZlcyA+IDApIHtcbiAgICAgICAgICAgIHRoaXMuYnJpY2tzID0gY3JlYXRlQnJpY2tzKCk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgYm9hcmRQb3NpdGlvbiA9IG5ldyBWZWN0b3IoXG4gICAgICAgICAgICBjYW52YXNWaWV3LmNhbnZhcy53aWR0aCAvIDIsXG4gICAgICAgICAgICBjYW52YXNWaWV3LmNhbnZhcy5oZWlnaHQgLSAxMDBcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5ib2FyZCA9IG5ldyBQYWRkbGUoYm9hcmRQb3NpdGlvbiwgdGhpcy5kb20uZ2V0Qm9hcmRJbWFnZSgpKTtcbiAgICAgICAgY29uc3QgYmFsbFBvc2l0aW9uID0gbmV3IFZlY3RvcihJTklUSUFMX0JBTExfWCwgSU5JVElBTF9CQUxMX1kpO1xuICAgICAgICB0aGlzLmJhbGwgPSBuZXcgQmFsbChiYWxsUG9zaXRpb24sIFwiL2Fzc2V0cy9iYWxsLnBuZ1wiKTtcbiAgICAgICAgdGhpcy5iYWxsLnZlbG9jaXR5ID0gbmV3IFZlY3Rvcih0aGlzLkdBTUVfRElGRklDVUxUWSwgdGhpcy5HQU1FX0RJRkZJQ1VMVFkpO1xuICAgICAgICB0aGlzLmxhc3RUaW1lID0gMDtcbiAgICAgICAgdGhpcy5lbGFwc2VkID0gMDtcbiAgICAgICAgdGhpcy5nYW1lT3ZlciA9IGZhbHNlO1xuICAgIH1cblxuICAgIGdhbWVMb29wKCkge1xuICAgICAgICBpZiAoaW5wdXRbJ0Fycm93TGVmdCddICYmICh0aGlzLmJvYXJkLnBvc2l0aW9uLnggPiAwKSkge1xuICAgICAgICAgICAgdGhpcy5ib2FyZC52ZWxvY2l0eS54ID0gLTc7XG4gICAgICAgICAgICBtb3ZlKHRoaXMuYm9hcmQpO1xuICAgICAgICB9IGVsc2UgaWYgKGlucHV0WydBcnJvd1JpZ2h0J10gJiYgKHRoaXMuYm9hcmQucG9zaXRpb24ueCArIEJPQVJEX1dJRFRIIDwgY2FudmFzVmlldy5jYW52YXMud2lkdGgpKSB7XG4gICAgICAgICAgICB0aGlzLmJvYXJkLnZlbG9jaXR5LnggPSA3O1xuICAgICAgICAgICAgbW92ZSh0aGlzLmJvYXJkKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5icmlja3MubGVuZ3RoID09IDApIHtcblxuICAgICAgICB9XG4gICAgICAgIGNhbnZhc1ZpZXcuZ2V0Q29udGV4dCgpLmNsZWFyUmVjdCgwLCAwLCBjYW52YXNWaWV3LmNhbnZhcy53aWR0aCwgY2FudmFzVmlldy5jYW52YXMuaGVpZ2h0KTtcbiAgICAgICAgY2FudmFzVmlldy5kcmF3QnJpY2tzKHRoaXMuYnJpY2tzKTtcbiAgICAgICAgY2FudmFzVmlldy5kcmF3Qm9hcmQodGhpcy5ib2FyZCk7XG4gICAgICAgIGNhbnZhc1ZpZXcuZHJhd0JhbGwodGhpcy5iYWxsKTtcbiAgICAgICAgdGhpcy5jb2xsaXNpb25EZXRlY3RvcigpO1xuICAgICAgICBpZiAoIXRoaXMuZ2FtZU92ZXIpIHtcbiAgICAgICAgICAgIG1vdmUodGhpcy5iYWxsKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbGxpc2lvbkRldGVjdG9yKCkge1xuICAgICAgICBpZiAoaXNCYWxsQ29sbGlkaW5nV2l0aEJvYXJkKHRoaXMuYmFsbCwgdGhpcy5ib2FyZCkpIHtcbiAgICAgICAgICAgIGhhbmRsZUJvYXJkSGl0KHRoaXMuYmFsbCwgdGhpcy5ib2FyZCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzQmFsbEhpdHRpbmdUaGVGbG9vcih0aGlzLmJhbGwsIHRoaXMuY2FudmFzVmlldykpIHtcbiAgICAgICAgICAgIHRoaXMubGl2ZXMtLTtcbiAgICAgICAgICAgIHRoaXMuZ2FtZU92ZXIgPSB0cnVlO1xuICAgICAgICAgICAgaWYgKHRoaXMubGl2ZXMgPT09IDApIHtcbiAgICAgICAgICAgICAgICBzaG93R2FtZU92ZXJNZXNzYWdlKHRoaXMuc2NvcmVQb2ludHMpOyBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kb20uc2hvd0luaXRpYWxTY3JlZW4oKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5saXZlcyA9IHRoaXMubWF4TGl2ZXM7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYnJpY2tzID0gY3JlYXRlQnJpY2tzKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2NvcmVQb2ludHMgPSAwO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRvbS5oaWRlTmV3R2FtZUJ1dHRvbigpO1xuICAgICAgICAgICAgICAgIH0sIDE1MDApO1xuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmRvbS5zZXRMaXZlcyh0aGlzLmxpdmVzKTtcbiAgICAgICAgfSBlbHNlIGlmIChpc0JhbGxIaXR0aW5nVGhlQ2VpbGluZyh0aGlzLmJhbGwpKSB7XG4gICAgICAgICAgICB0aGlzLmJhbGwudmVsb2NpdHkueSA9IE1hdGguYWJzKHRoaXMuYmFsbC52ZWxvY2l0eS55KTtcbiAgICAgICAgfSBlbHNlIGlmIChpc0JhbGxIaXR0aW5nUmlnaHRXYWxsKHRoaXMuYmFsbCwgdGhpcy5jYW52YXNWaWV3KSkge1xuICAgICAgICAgICAgdGhpcy5iYWxsLnZlbG9jaXR5LnggPSAtIHRoaXMuYmFsbC52ZWxvY2l0eS54O1xuICAgICAgICB9IGVsc2UgaWYgKGlzQmFsbEhpdHRpbmdUaGVMZWZ0V2FsbCh0aGlzLmJhbGwpKSB7XG4gICAgICAgICAgICB0aGlzLmJhbGwudmVsb2NpdHkueCA9IE1hdGguYWJzKHRoaXMuYmFsbC52ZWxvY2l0eS54KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvL1xuICAgIHN0YXJ0R2FtZSgpIHtcbiAgICAgICAgaWYgKHRoaXMubGl2ZXMgPiAxKSB7XG4gICAgICAgICAgICB0aGlzLmRvbS5zaG93TmV3R2FtZUJ1dHRvbigpO1xuICAgICAgICAgICAgdGhpcy5kb20uaGlkZUNvbmdyYXR1bGF0aW9ucygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5kb20uaGlkZU5ld0dhbWVCdXR0b24oKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmRvbS5zZXRTY29yZSh0aGlzLnNjb3JlUG9pbnRzKTtcbiAgICAgICAgdGhpcy5kb20uc2V0TGl2ZXModGhpcy5saXZlcyk7XG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZUdhbWVPYmplY3RzKCk7XG4gICAgICAgIHRoaXMudXBkYXRlKHBlcmZvcm1hbmNlLm5vdygpKTtcbiAgICB9XG5cbiAgICB1cGRhdGUodGltZTogbnVtYmVyKSB7XG4gICAgICAgIGNvbnN0IGRlbHRhID0gdGltZSAtIHRoaXMubGFzdFRpbWU7XG4gICAgICAgIHRoaXMubGFzdFRpbWUgPSB0aW1lO1xuICAgICAgICB0aGlzLmVsYXBzZWQgKz0gZGVsdGE7XG4gICAgICAgIGxldCBkZWxldGVCcmlja0luZGV4ID0gaXNCYWxsTmVhckJyaWNrcyh0aGlzLmJhbGwpXG4gICAgICAgICAgICA/IGdldEhpdEJyaWNrSW5kZXgodGhpcy5icmlja3MsIHRoaXMuYmFsbClcbiAgICAgICAgICAgIDogLTE7XG4gICAgICAgIGlmIChkZWxldGVCcmlja0luZGV4ICE9IC0xKSB7XG4gICAgICAgICAgICBjb25zdCBicmljayA9IHRoaXMuYnJpY2tzW2RlbGV0ZUJyaWNrSW5kZXhdOy8vL1xuICAgICAgICAgICAgLy8vZXhwbG9kZShicmljayk7XG4gICAgICAgICAgICBjaGFuZ2VCYWxsRGlyZWN0aW9uKHRoaXMuYmFsbCwgYnJpY2spO1xuICAgICAgICAgICAgdGhpcy5icmlja3Muc3BsaWNlKGRlbGV0ZUJyaWNrSW5kZXgsIDEpO1xuICAgICAgICAgICAgdGhpcy5zY29yZVBvaW50cyArPSBCUklDS19CT05VU19QT0lOVFM7XG4gICAgICAgICAgICB0aGlzLmRvbS5zZXRTY29yZSh0aGlzLnNjb3JlUG9pbnRzKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5lbGFwc2VkID4gdGhpcy5TVEVQX1NJWkUgKiA1KSB7XG4gICAgICAgICAgICB0aGlzLmVsYXBzZWQgPSB0aGlzLlNURVBfU0laRSAqIDU7XG4gICAgICAgIH1cbiAgICAgICAgd2hpbGUgKHRoaXMuZWxhcHNlZCA+IHRoaXMuU1RFUF9TSVpFKSB7XG4gICAgICAgICAgICB0aGlzLmVsYXBzZWQgLT0gdGhpcy5TVEVQX1NJWkU7XG4gICAgICAgICAgICB0aGlzLmdhbWVMb29wKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuYnJpY2tzLmxlbmd0aCAmJiAhdGhpcy5nYW1lT3Zlcikge1xuICAgICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMudXBkYXRlLmJpbmQodGhpcykpO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuYnJpY2tzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgdGhpcy5kb20uc2hvd0NvbmdyYXR1bGF0aW9ucygpO1xuICAgICAgICB9XG4gICAgfVxufSIsImltcG9ydCB7IFZlY3RvciB9IGZyb20gXCIuLi9nZW9tZXRyeS92ZWN0b3JcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIG1vdmUoZ2FtZU9iamVjdDogR2FtZU9iamVjdCkge1xuICBnYW1lT2JqZWN0LnBvc2l0aW9uLnggKz0gZ2FtZU9iamVjdC52ZWxvY2l0eS54O1xuICBnYW1lT2JqZWN0LnBvc2l0aW9uLnkgKz0gZ2FtZU9iamVjdC52ZWxvY2l0eS55O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEdhbWVPYmplY3Qge1xuICBwb3NpdGlvbjogeyB4OiBudW1iZXI7IHk6IG51bWJlciB9O1xuICB2ZWxvY2l0eTogVmVjdG9yXG59IiwiaW1wb3J0IHsgVmVjdG9yIH0gZnJvbSBcIi4uL2dlb21ldHJ5L3ZlY3RvclwiO1xuXG5leHBvcnQgY2xhc3MgQmFsbCB7XG4gIHByaXZhdGUgaW1hZ2U6IEhUTUxJbWFnZUVsZW1lbnQgPSBuZXcgSW1hZ2UoKTtcbiAgcHVibGljIHZlbG9jaXR5OiBWZWN0b3IgPSBuZXcgVmVjdG9yKDAsIDApO1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgcG9zaXRpb246IFZlY3RvciwgaW1hZ2U6IHN0cmluZywgYmFsbHZlbG9jaXR5PzogVmVjdG9yKSB7XG4gICAgdGhpcy5pbWFnZS5zcmMgPSBpbWFnZTtcbiAgICBpZiAoISFiYWxsdmVsb2NpdHkpIHRoaXMudmVsb2NpdHkgPSBiYWxsdmVsb2NpdHk7XG4gIH1cblxuICBnZXRJbWFnZSgpOiBIVE1MSW1hZ2VFbGVtZW50IHtcbiAgICByZXR1cm4gdGhpcy5pbWFnZTtcbiAgfVxufSIsImltcG9ydCB7IFZlY3RvciB9IGZyb20gXCIuLi9nZW9tZXRyeS92ZWN0b3JcIjtcblxuZXhwb3J0IGNsYXNzIEJyaWNrIHtcbiAgcHJpdmF0ZSBpbWFnZTogSFRNTEltYWdlRWxlbWVudCA9IG5ldyBJbWFnZSgpO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBwb3NpdGlvbjogVmVjdG9yLCBpbWFnZTogc3RyaW5nKSB7XG4gICAgdGhpcy5pbWFnZS5zcmMgPSBpbWFnZTtcbiAgfVxuXG4gIGdldEltYWdlKCk6IEhUTUxJbWFnZUVsZW1lbnQge1xuICAgIHJldHVybiB0aGlzLmltYWdlO1xuICB9XG59IiwiaW1wb3J0IHsgVmVjdG9yIH0gZnJvbSBcIi4uL2dlb21ldHJ5L3ZlY3RvclwiO1xuXG5leHBvcnQgY2xhc3MgUGFkZGxlIHtcbiAgcHJpdmF0ZSBpbWFnZTogSFRNTEltYWdlRWxlbWVudCA9IG5ldyBJbWFnZSgpO1xuICBwdWJsaWMgdmVsb2NpdHk6IFZlY3RvciA9IG5ldyBWZWN0b3IoMCwgMCk7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBwb3NpdGlvbjogVmVjdG9yLFxuICAgIGltYWdlOiBIVE1MSW1hZ2VFbGVtZW50LFxuICAgIGJvYXJkdmVsb2NpdHk/OiBWZWN0b3JcbiAgKSB7XG4gICAgdGhpcy5pbWFnZSA9IGltYWdlO1xuICAgIGlmICghIWJvYXJkdmVsb2NpdHkpIHRoaXMudmVsb2NpdHkgPSBib2FyZHZlbG9jaXR5O1xuICB9XG5cbiAgZ2V0SW1hZ2UoKTogSFRNTEltYWdlRWxlbWVudCB7XG4gICAgcmV0dXJuIHRoaXMuaW1hZ2U7XG4gIH1cbn1cbiIsImltcG9ydCB7IFBvaW50IH0gZnJvbSBcIi4vaW50ZXJmYWNlc1wiO1xuXG5leHBvcnQgY2xhc3MgVmVjdG9yIGltcGxlbWVudHMgUG9pbnQge1xuICB4OiBudW1iZXI7XG4gIHk6IG51bWJlcjtcblxuICBjb25zdHJ1Y3RvcihwOiBQb2ludCk7XG4gIGNvbnN0cnVjdG9yKHg6IG51bWJlciwgeTogbnVtYmVyKTtcbiAgY29uc3RydWN0b3IoeE9yUG9pbnQ6IG51bWJlciB8IFBvaW50LCB5PzogbnVtYmVyKSB7XG4gICAgaWYgKHR5cGVvZiB4T3JQb2ludCA9PSBcIm51bWJlclwiICYmIHR5cGVvZiB5ID09IFwibnVtYmVyXCIpIHtcbiAgICAgIHRoaXMueCA9IHhPclBvaW50O1xuICAgICAgdGhpcy55ID0geTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiB4T3JQb2ludCA9PSBcIm9iamVjdFwiKSB7XG4gICAgICB0aGlzLnggPSB4T3JQb2ludC54O1xuICAgICAgdGhpcy55ID0geE9yUG9pbnQueTtcbiAgICB9XG4gIH1cblxuICBhZGQocDogUG9pbnQpIHtcbiAgICB0aGlzLnggKz0gcC54O1xuICAgIHRoaXMueSArPSBwLnk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBzY2FsZShzOiBudW1iZXIpIHtcbiAgICB0aGlzLnggKj0gcztcbiAgICB0aGlzLnkgKj0gcztcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgZGlzdChwOiBQb2ludCkge1xuICAgIGNvbnN0IGR4ID0gdGhpcy54IC0gcC54O1xuICAgIGNvbnN0IGR5ID0gdGhpcy55IC0gcC55O1xuICAgIHJldHVybiBNYXRoLnNxcnQoZHggKiogMiArIGR5ICoqIDIpO1xuICB9XG5cbiAgc3FMZW5ndGgoKSB7XG4gICAgcmV0dXJuIHRoaXMueCAqKiAyICsgdGhpcy55ICoqIDI7XG4gIH1cblxuICBzdGF0aWMgYWRkKHAxOiBQb2ludCwgcDI6IFBvaW50KSB7XG4gICAgcmV0dXJuIG5ldyBWZWN0b3IocDEueCArIHAyLngsIHAxLnkgKyBwMi55KTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQkFMTF9ESUFNRVRFUiwgQlJJQ0tfV0lEVEgsIEJSSUNLX0hFSUdIVCB9IGZyb20gXCIuLi91dGlscy9jb25zdGFudHNcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIGdldEhpdEJyaWNrSW5kZXgoYnJpY2tzLCBiYWxsKSB7XG4gIHJldHVybiBicmlja3MuZmluZEluZGV4KChicmljaykgPT4ge1xuICAgIGNvbnN0IGxlZnQgPSBicmljay5wb3NpdGlvbi54IC0gQkFMTF9ESUFNRVRFUiAvIDI7XG4gICAgY29uc3QgcmlnaHQgPSBicmljay5wb3NpdGlvbi54ICsgQlJJQ0tfV0lEVEggKyBCQUxMX0RJQU1FVEVSIC8gMjtcbiAgICBjb25zdCB0b3AgPSBicmljay5wb3NpdGlvbi55IC0gQkFMTF9ESUFNRVRFUiAvIDI7XG4gICAgY29uc3QgYm90dG9tID0gYnJpY2sucG9zaXRpb24ueSArIEJSSUNLX0hFSUdIVCArIEJBTExfRElBTUVURVIgLyAyO1xuICAgIHJldHVybiAoXG4gICAgICBiYWxsLnBvc2l0aW9uLnggPj0gbGVmdCAmJlxuICAgICAgYmFsbC5wb3NpdGlvbi54IDw9IHJpZ2h0ICYmXG4gICAgICBiYWxsLnBvc2l0aW9uLnkgPj0gdG9wICYmXG4gICAgICBiYWxsLnBvc2l0aW9uLnkgPD0gYm90dG9tXG4gICAgKTtcbiAgfSk7XG59IiwiaW1wb3J0IHsgQmFsbCB9IGZyb20gXCIuLi9maWd1cmVzL2JhbGxcIjtcbmltcG9ydCB7IEJyaWNrIH0gZnJvbSBcIi4uL2ZpZ3VyZXMvYnJpY2tcIjtcbmltcG9ydCB7IFBhZGRsZSB9IGZyb20gXCIuLi9maWd1cmVzL3BhZGRsZVwiO1xuaW1wb3J0IHsgQlJJQ0tfSEVJR0hULCBCUklDS19XSURUSCwgQkFMTF9ESUFNRVRFUiwgQk9BUkRfV0lEVEggfSBmcm9tIFwiLi4vdXRpbHMvY29uc3RhbnRzXCI7XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGNoYW5nZUJhbGxEaXJlY3Rpb24oYmFsbDogQmFsbCwgYnJpY2s6IEJyaWNrKSB7XG4gICAgY29uc3QgQlJJQ0tfRElBR09OQUwgPSBNYXRoLnNxcnQoQlJJQ0tfSEVJR0hUICoqIDIgKyBCUklDS19XSURUSCAqKiAyKTtcbiAgICBjb25zdCBicmlja0NlbnRlclggPSBicmljay5wb3NpdGlvbi54ICsgQlJJQ0tfV0lEVEggLyAyO1xuICAgIGNvbnN0IGJyaWNrQ2VudGVyWSA9IGJyaWNrLnBvc2l0aW9uLnkgKyBCUklDS19IRUlHSFQgLyAyO1xuICAgIGNvbnN0IGJhbGxDZW50ZXJYID0gYmFsbC5wb3NpdGlvbi54ICsgQkFMTF9ESUFNRVRFUiAvIDI7XG4gICAgY29uc3QgYmFsbENlbnRlclkgPSBiYWxsLnBvc2l0aW9uLnkgKyBCQUxMX0RJQU1FVEVSIC8gMjtcbiAgICBjb25zdCBkZWx0YVkgPSAoQlJJQ0tfSEVJR0hUICogQkFMTF9ESUFNRVRFUiAvIDIpIC8gQlJJQ0tfRElBR09OQUw7XG4gICAgY29uc3QgZGVsdGFYID0gKEJSSUNLX1dJRFRIICogQkFMTF9ESUFNRVRFUiAvIDIpIC8gQlJJQ0tfRElBR09OQUw7XG4gICAgY29uc3QgbWluWVNpZGVIaXQgPSBicmljay5wb3NpdGlvbi55ICsgZGVsdGFZO1xuICAgIGNvbnN0IG1heFlTaWRlSGl0ID0gYnJpY2sucG9zaXRpb24ueSArIEJSSUNLX0hFSUdIVCAtIGRlbHRhWTtcbiAgICBjb25zdCBtaW5MZWZ0WFNpZGVIaXQgPSBicmljay5wb3NpdGlvbi54IC0gZGVsdGFYO1xuICAgIGNvbnN0IG1heExlZnRYU2lkZUhpdCA9IGJyaWNrLnBvc2l0aW9uLnggKyBkZWx0YVg7XG4gICAgY29uc3QgaXNCYWxsQ29taW5nRnJvbUJ1dHRvbUxlZnQgPSAoKGJhbGxDZW50ZXJYID4gbWluTGVmdFhTaWRlSGl0KVxuICAgICAgICAmJiAoYmFsbENlbnRlclggPCBtYXhMZWZ0WFNpZGVIaXQpXG4gICAgICAgICYmIChiYWxsQ2VudGVyWSA+IG1pbllTaWRlSGl0KVxuICAgICAgICAmJiAoYmFsbENlbnRlclkgPCBtYXhZU2lkZUhpdCkpO1xuICAgIGNvbnN0IGlzQmFsbENvbWluZ0Zyb21CdXR0b21SaWdodCA9ICgoYmFsbENlbnRlclggPiBtaW5MZWZ0WFNpZGVIaXQgKyBCUklDS19XSURUSClcbiAgICAgICAgJiYgKGJhbGxDZW50ZXJYIDwgbWF4TGVmdFhTaWRlSGl0ICsgQlJJQ0tfV0lEVEgpXG4gICAgICAgICYmIChiYWxsQ2VudGVyWSA+IG1pbllTaWRlSGl0KVxuICAgICAgICAmJiAoYmFsbENlbnRlclkgPCBtYXhZU2lkZUhpdCkpO1xuICAgIGlmICgoaXNCYWxsQ29taW5nRnJvbUJ1dHRvbUxlZnQgJiYgYmFsbC52ZWxvY2l0eS54ID4gMCkgfHwgKGlzQmFsbENvbWluZ0Zyb21CdXR0b21SaWdodCAmJiBiYWxsLnZlbG9jaXR5LnggPCAwKSkge1xuICAgICAgICBiYWxsLnZlbG9jaXR5LnggKj0gLTE7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgYmFsbC52ZWxvY2l0eS55ICo9IC0xO1xuICAgIH1cblxufVxuXG5leHBvcnQgZnVuY3Rpb24gaGFuZGxlQm9hcmRIaXQoYmFsbDogQmFsbCwgYm9hcmQ6IFBhZGRsZSkge1xuICAgIGNvbnN0IGN1cnJlbnRBbmdsZSA9IE1hdGguYXRhbjIoLWJhbGwudmVsb2NpdHkueSwgYmFsbC52ZWxvY2l0eS54KTtcbiAgICBjb25zdCBkZWx0YUNlbnRlclggPSAoYmFsbC5wb3NpdGlvbi54IC0gKGJvYXJkLnBvc2l0aW9uLnggKyBCT0FSRF9XSURUSCAvIDIpKSAvIChCT0FSRF9XSURUSCAvIDIpO1xuICAgIGNvbnN0IGFuZ2xlVG9BZGQgPSBNYXRoLlBJIC8gNTtcbiAgICBsZXQgbmV4dEFuZ2xlID0gZGVsdGFDZW50ZXJYICogYW5nbGVUb0FkZCArIGN1cnJlbnRBbmdsZTtcbiAgICBjb25zdCB5T2Zmc2V0ID0gNTtcbiAgICBpZiAobmV4dEFuZ2xlIDwgLTUgKiBNYXRoLlBJIC8gNikge1xuICAgICAgICBuZXh0QW5nbGUgPSAtNSAqIE1hdGguUEkgLyA2O1xuICAgIH0gaWYgKG5leHRBbmdsZSA+IC1NYXRoLlBJIC8gNikge1xuICAgICAgICBuZXh0QW5nbGUgPSAtTWF0aC5QSSAvIDZcbiAgICB9XG5cbiAgICBiYWxsLnZlbG9jaXR5LnggPSA1ICogTWF0aC5jb3MobmV4dEFuZ2xlKTtcbiAgICBiYWxsLnZlbG9jaXR5LnkgPSA1ICogTWF0aC5zaW4obmV4dEFuZ2xlKTtcbiAgICBiYWxsLnBvc2l0aW9uLnkgPSBib2FyZC5wb3NpdGlvbi55IC0gQkFMTF9ESUFNRVRFUiAvIDIgLSB5T2Zmc2V0O1xufVxuIiwiaW1wb3J0IHsgQnJpY2sgfSBmcm9tIFwiLi4vZmlndXJlcy9icmlja1wiO1xuaW1wb3J0IHsgVmVjdG9yIH0gZnJvbSBcIi4uL2dlb21ldHJ5L3ZlY3RvclwiO1xuaW1wb3J0IHtcbiAgQlJJQ0tTX0NPTFMsXG4gIEJSSUNLX1JPV1MsXG4gIElOQ1JFRU1OVF9ET1dOX0JSSUNLLFxuICBJTkNSRU1FTlRfTEVGVF9CUklDSyxcbiAgSU5JVElBTF9TVEFSVF9CUklDS19MRUZULFxuICBJTklUSUFMX1NUQVJUX0JSSUNLX1JJR0hULFxufSBmcm9tIFwiLi9jb25zdGFudHNcIjtcblxuY29uc3QgYnJpY2tzSW1hZ2UgPSBbXG4gIFwiL2Fzc2V0cy9icmljay1ibHVlLnBuZ1wiLFxuICBcIi9hc3NldHMvYnJpY2stZ3JlZW4ucG5nXCIsXG4gIFwiL2Fzc2V0cy9icmljay1wdXJwbGUucG5nXCIsXG4gIFwiL2Fzc2V0cy9icmljay1yZWQucG5nXCIsXG4gIFwiL2Fzc2V0cy9icmljay15ZWxsb3cucG5nXCIsXG5dO1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQnJpY2tzKCk6IEJyaWNrW10ge1xuICBsZXQgeCA9IElOSVRJQUxfU1RBUlRfQlJJQ0tfTEVGVDtcbiAgbGV0IHkgPSBJTklUSUFMX1NUQVJUX0JSSUNLX1JJR0hUO1xuXG4gIGNvbnN0IGJyaWNrczogQnJpY2tbXSA9IFtdO1xuXG4gIGZvciAobGV0IHJvdyA9IDA7IHJvdyA8IEJSSUNLX1JPV1M7IHJvdysrKSB7XG4gICAgZm9yIChsZXQgY29sID0gMDsgY29sIDwgQlJJQ0tTX0NPTFM7IGNvbCsrKSB7XG4gICAgICBjb25zdCBwb3M6IFZlY3RvciA9IG5ldyBWZWN0b3IoeCwgeSk7XG5cbiAgICAgIGNvbnN0IHJhbmRQb3MgPSAoTWF0aC5yYW5kb20oKSAqIGJyaWNrc0ltYWdlLmxlbmd0aCkgfCAwO1xuICAgICAgY29uc3QgYnJpY2sgPSBuZXcgQnJpY2socG9zLCBicmlja3NJbWFnZVtyYW5kUG9zXSk7XG4gICAgICBicmlja3MucHVzaChicmljayk7XG4gICAgICB4ICs9IElOQ1JFTUVOVF9MRUZUX0JSSUNLO1xuICAgIH1cblxuICAgIHggPSBJTklUSUFMX1NUQVJUX0JSSUNLX0xFRlQ7XG4gICAgeSArPSBJTkNSRUVNTlRfRE9XTl9CUklDSztcbiAgfVxuICByZXR1cm4gYnJpY2tzO1xufVxuIiwiLy8gQlJJQ0tTXG5leHBvcnQgY29uc3QgQlJJQ0tfUk9XUyA9IDM7XG5leHBvcnQgY29uc3QgQlJJQ0tTX0NPTFMgPSAxMDtcbmV4cG9ydCBjb25zdCBCUklDS19XSURUSCA9IDEwMDtcbmV4cG9ydCBjb25zdCBCUklDS19IRUlHSFQgPSA0MDtcbmV4cG9ydCBjb25zdCBJTklUSUFMX1NUQVJUX0JSSUNLX0xFRlQgPSAxMDtcbmV4cG9ydCBjb25zdCBJTklUSUFMX1NUQVJUX0JSSUNLX1JJR0hUID0gMTA7XG5leHBvcnQgY29uc3QgSU5DUkVNRU5UX0xFRlRfQlJJQ0sgPSAxMjA7XG5leHBvcnQgY29uc3QgSU5DUkVFTU5UX0RPV05fQlJJQ0sgPSA2MDtcbmV4cG9ydCBjb25zdCBCUklDS1NfRU5EID0gMTcwO1xuXG4vLyBCT0FSRFxuZXhwb3J0IGNvbnN0IEJPQVJEX1dJRFRIID0gMTIwO1xuZXhwb3J0IGNvbnN0IEJPQVJEX0hFSUdIVCA9IDIwO1xuXG4vL0JBTExcbmV4cG9ydCBjb25zdCBCQUxMX1dJRFRIID0gNDA7XG5leHBvcnQgY29uc3QgQkFMTF9IRUlHSFQgPSA0MDtcbmV4cG9ydCBjb25zdCBJTklUSUFMX0JBTExfWCA9IDIwMDtcbmV4cG9ydCBjb25zdCBJTklUSUFMX0JBTExfWSA9IDIwMDtcbmV4cG9ydCBjb25zdCBCQUxMX0RJQU1FVEVSID0gNDA7XG5cbi8vTUlTQ0VMTEFORU9VU1xuZXhwb3J0IGNvbnN0IEJSSUNLX0JPTlVTX1BPSU5UUyA9IDEwO1xuXG4vLyBHQU1FXG5leHBvcnQgY29uc3QgRUFTWV9MRVZFbCA9IDM7XG5leHBvcnQgY29uc3QgTUVESVVNX0xFVkVMID0gNTtcbmV4cG9ydCBjb25zdCBIQVJEX0xFVkVMID0gODtcblxuZXhwb3J0IGNvbnN0IFNURVBfU0laRSA9IDIwOyIsImltcG9ydCB7IEVBU1lfTEVWRWwsIEhBUkRfTEVWRUwsIE1FRElVTV9MRVZFTCB9IGZyb20gXCIuL2NvbnN0YW50c1wiO1xuaW1wb3J0IHsgRE9NVmlldyB9IGZyb20gXCIuLi92aWV3L0RPTVZpZXdcIjtcblxuY29uc3QgZG9tID0gRE9NVmlldy5nZXRJbnN0YW5jZSgpO1xuXG5leHBvcnQgZnVuY3Rpb24gc2V0R2FtZUxldmVsKGlucHV0OiBIVE1MSW5wdXRFbGVtZW50KSB7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnaW5wdXQnKS5mb3JFYWNoKChpbnB1dCkgPT4ge1xuICAgICAgICBpbnB1dC5jaGVja2VkID0gZmFsc2U7XG4gICAgfSk7XG4gICAgaW5wdXQuY2hlY2tlZCA9IHRydWU7XG5cbiAgICBzd2l0Y2ggKGlucHV0LmlkKSB7XG4gICAgICAgIGNhc2UgXCJlYXN5XCI6XG4gICAgICAgICAgICByZXR1cm4gRUFTWV9MRVZFbDtcbiAgICAgICAgY2FzZSBcIm1lZGl1bVwiOlxuICAgICAgICAgICAgcmV0dXJuIE1FRElVTV9MRVZFTDtcbiAgICAgICAgY2FzZSBcImhhcmRcIjpcbiAgICAgICAgICAgIHJldHVybiBIQVJEX0xFVkVMO1xuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNob3dHYW1lT3Zlck1lc3NhZ2Uoc2NvcmVQb2ludHM6IG51bWJlcikge1xuICAgIGNvbnN0IGdhbWVvdmVyRGl2ID0gZG9tLmdldEVsZW1lbnQoXCIjZ2FtZU92ZXJcIik7XG5cbiAgICBnYW1lb3ZlckRpdi5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgIChnYW1lb3ZlckRpdiBhcyBIVE1MRGl2RWxlbWVudCkuaW5uZXJUZXh0ID0gYEdhbWUgb3Zlciwgc2NvcmU6JHtzY29yZVBvaW50c31gO1xuICB9IiwiaW1wb3J0IHsgQmFsbCB9IGZyb20gXCIuLi9maWd1cmVzL2JhbGxcIjtcbmltcG9ydCB7IENhbnZhc1ZpZXcgfSBmcm9tIFwiLi4vdmlldy9jYW52YXNWaWV3XCI7XG5pbXBvcnQge1xuICBCQUxMX0RJQU1FVEVSLFxuICBCT0FSRF9IRUlHSFQsXG4gIEJPQVJEX1dJRFRILFxuICBCUklDS1NfRU5EXG59IGZyb20gXCIuL2NvbnN0YW50c1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gaXNCYWxsSGl0dGluZ1RoZUxlZnRXYWxsKGJhbGw6IEJhbGwpIHtcbiAgcmV0dXJuIGJhbGwucG9zaXRpb24ueCA8PSAwO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNCYWxsSGl0dGluZ1JpZ2h0V2FsbChiYWxsLCBjYW52YXNWaWV3OiBDYW52YXNWaWV3KSB7XG4gIHJldHVybiBiYWxsLnBvc2l0aW9uLnggPiBjYW52YXNWaWV3LmNhbnZhcy53aWR0aCAtIEJBTExfRElBTUVURVI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0JhbGxIaXR0aW5nVGhlQ2VpbGluZyhiYWxsOiBCYWxsKSB7XG4gIHJldHVybiBiYWxsLnBvc2l0aW9uLnkgPD0gMDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzQmFsbEhpdHRpbmdUaGVGbG9vcihiYWxsOiBCYWxsLCBjYW52YXNWaWV3OiBDYW52YXNWaWV3KSB7XG4gIHJldHVybiBiYWxsLnBvc2l0aW9uLnkgPj0gY2FudmFzVmlldy5jYW52YXMuaGVpZ2h0IC0gQkFMTF9ESUFNRVRFUjtcbn1cbmV4cG9ydCBmdW5jdGlvbiBpc0JhbGxOZWFyQnJpY2tzKGJhbGw6IEJhbGwpIHtcbiAgcmV0dXJuIGJhbGwucG9zaXRpb24ueSA8IEJSSUNLU19FTkQ7XG59XG5leHBvcnQgZnVuY3Rpb24gaXNCYWxsQ29sbGlkaW5nV2l0aEJvYXJkKGJhbGwsIGJvYXJkKSB7XG4gIHJldHVybiAoXG4gICAgYmFsbC5wb3NpdGlvbi55ICsgQkFMTF9ESUFNRVRFUiAvIDIgPj0gYm9hcmQucG9zaXRpb24ueSAmJlxuICAgIGJhbGwucG9zaXRpb24ueSArIEJBTExfRElBTUVURVIgLyAyIDw9IGJvYXJkLnBvc2l0aW9uLnkgKyAxMCAmJlxuICAgIGJhbGwucG9zaXRpb24ueCAtIEJBTExfRElBTUVURVIgLyAyIDw9IGJvYXJkLnBvc2l0aW9uLnggKyBCT0FSRF9XSURUSCAmJlxuICAgIGJhbGwucG9zaXRpb24ueCArIEJBTExfRElBTUVURVIgLyAyID49IGJvYXJkLnBvc2l0aW9uLnhcbiAgKTtcbn0iLCJcbmV4cG9ydCB0eXBlIERPTUVsZW1lbnQgPSBzdHJpbmcgfCBOb2RlO1xuXG5leHBvcnQgaW50ZXJmYWNlIERPTSB7XG4gICAgY3JlYXRlRWxlbWVudCh0eXBlOiBzdHJpbmcsIGF0dHJpYnV0ZXM6IG9iamVjdCwgLi4uY29udGVudDogRE9NRWxlbWVudFtdKTogSFRNTEVsZW1lbnQ7XG5cbiAgICBhZGRFbGVtZW50KGFwcGVuZFRvOiBzdHJpbmcsIGVsZW1lbnQ6IEhUTUxFbGVtZW50KTogdm9pZDtcblxuICAgIGdldEVsZW1lbnQoc2VsZWN0b3I6IHN0cmluZyk6IGFueTtcblxuICAgIGRlbGV0ZUVsZW1lbnQoc2VsZWN0b3I6IHN0cmluZyk6IHZvaWQ7XG59XG5cbmV4cG9ydCBjbGFzcyBET01WaWV3IGltcGxlbWVudHMgRE9NIHtcbiAgICBwcml2YXRlIHN0YXRpYyBpbnN0YW5jZTogRE9NVmlldztcblxuICAgIHByaXZhdGUgY29uc3RydWN0b3IoKSB7XG4gICAgfVxuXG4gICAgc3RhdGljIGdldEluc3RhbmNlKCk6IERPTVZpZXcge1xuICAgICAgICBpZiAoIXRoaXMuaW5zdGFuY2UpIHtcbiAgICAgICAgICAgIHRoaXMuaW5zdGFuY2UgPSBuZXcgRE9NVmlldygpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlO1xuICAgIH1cblxuICAgIC8qKlxuICAqIFRoaXMgZnVuY3Rpb24gY2Fubm90IGNyZWF0ZSBhIHRhYmxlXG4gICogQHBhcmFtIHsgc3RyaW5nIH0gdHlwZVxuICAqIEBwYXJhbSB7IE9iamVjdCB9IGF0dHJpYnV0ZXNcbiAgKiBAcGFyYW0gIHsgLi4uKHN0cmluZyB8IE5vZGUpIH0gY29udGVudCBcbiAgKiBAcmV0dXJucyB7IEhUTUxFbGVtZW50IH0gUmV0dXJucyB0aGUgY3JlYXRlZCBlbGVtZW50XG4gICovXG4gICAgY3JlYXRlRWxlbWVudCh0eXBlOiBzdHJpbmcsIGF0dHJpYnV0ZXM6IG9iamVjdCwgLi4uY29udGVudDogRE9NRWxlbWVudFtdKTogSFRNTEVsZW1lbnQge1xuICAgICAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0eXBlKTtcblxuICAgICAgICBpZiAoYXR0cmlidXRlcykge1xuICAgICAgICAgICAgZm9yIChsZXQgYXR0cmlidXRlIGluIGF0dHJpYnV0ZXMpIHtcbiAgICAgICAgICAgICAgICBpZiAoYXR0cmlidXRlLnN0YXJ0c1dpdGgoJ29uJykpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZXZlbnROYW1lID0gYXR0cmlidXRlLnNsaWNlKDIpLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGF0dHJpYnV0ZXNbYXR0cmlidXRlXSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudFthdHRyaWJ1dGVdID0gYXR0cmlidXRlc1thdHRyaWJ1dGVdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAobGV0IGl0ZW0gb2YgY29udGVudCkge1xuICAgICAgICAgICAgZWxlbWVudC5hcHBlbmQoaXRlbSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZWxlbWVudDtcbiAgICB9XG5cbiAgICBhZGRFbGVtZW50KGFwcGVuZFRvOiBzdHJpbmcsIGVsZW1lbnQ6IEhUTUxFbGVtZW50KSB7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYXBwZW5kVG8pLmFwcGVuZChlbGVtZW50KTtcbiAgICB9XG5cbiAgICBnZXRFbGVtZW50KHNlbGVjdG9yOiBzdHJpbmcpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGxldCB2YWx1ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpIGFzIEhUTUxFbGVtZW50O1xuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuICAgIGRlbGV0ZUVsZW1lbnQoc2VsZWN0b3I6IHN0cmluZykge1xuICAgICAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XG4gICAgICAgIGVsZW1lbnQucmVtb3ZlKCk7XG4gICAgfVxuXG4gICAgYWRkSGFuZGxlcihldmVudDogc3RyaW5nLCBjYWxsYmFjazogRXZlbnRMaXN0ZW5lciwgc2VsZWN0b3I/OiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKHNlbGVjdG9yKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKS5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCBjYWxsYmFjaylcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIGNhbGxiYWNrKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFkZEJhY2tCdXR0b25IYW5kbGVyKCkge1xuICAgICAgICB0aGlzLmFkZEhhbmRsZXIoXCJjbGlja1wiLCAoKSA9PiB7IHRoaXMuaGlkZVNldHRpbmdzTWVudSgpOyB9LCBcIiNiYWNrLWJ0blwiKTtcbiAgICB9XG4gICAgYWRkUmlnaHRDbGlja0hhbmRsZXIoY2FsbGJhY2s6IEV2ZW50TGlzdGVuZXIpIHtcbiAgICAgICAgd2luZG93Lm9uY29udGV4dG1lbnUgPSBjYWxsYmFjaztcbiAgICB9XG4gICAgc2hvd0luaXRpYWxTY3JlZW4oKSB7XG4gICAgICAgIHRoaXMuZ2V0RWxlbWVudChcIiNjb250YWluZXJcIikuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICAgICAgdGhpcy5nZXRFbGVtZW50KFwiI2dhbWVDYW52YXNcIikuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICB0aGlzLmdldEVsZW1lbnQoXCIjZGV0YWlscy1ib3hcIikuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICB0aGlzLmdldEVsZW1lbnQoXCIjZ2FtZU92ZXJcIikuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgIH1cbiAgICBpbml0R2FtZSgpIHtcbiAgICAgICAgdGhpcy5nZXRFbGVtZW50KFwiI2NvbnRhaW5lclwiKS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgIHRoaXMuZ2V0RWxlbWVudChcIiNnYW1lQ2FudmFzXCIpLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgICAgIGNvbnN0IGRldGFpbHNCb3ggPSB0aGlzLmdldEVsZW1lbnQoXCIjZGV0YWlscy1ib3hcIik7XG4gICAgICAgIGRldGFpbHNCb3guc3R5bGUuZGlzcGxheSA9IFwiZmxleFwiO1xuICAgICAgICBkZXRhaWxzQm94LnN0eWxlLmp1c3RpZnlDb250ZW50ID0gXCJzcGFjZS1hcm91bmRcIjtcbiAgICB9XG4gICAgc2V0U2NvcmUoc2NvcmVQb2ludHM6IG51bWJlcikge1xuICAgICAgICB0aGlzLmdldEVsZW1lbnQoXCIjc2NvcmVcIikudGV4dENvbnRlbnQgPSBgU2NvcmU6ICR7c2NvcmVQb2ludHMudG9TdHJpbmcoKX1gO1xuICAgIH1cbiAgICBzZXRMaXZlcyhsaXZlczogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuZ2V0RWxlbWVudChcIiNsaWZlXCIpLmlubmVyVGV4dCA9IGxpdmVzLnRvU3RyaW5nKCk7XG4gICAgfVxuICAgIHNob3dOZXdHYW1lQnV0dG9uKCkge1xuICAgICAgICAodGhpcy5nZXRFbGVtZW50KFwiI25ldy1nYW1lXCIpIGFzIEhUTUxCdXR0b25FbGVtZW50KS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgIH1cbiAgICBzaG93Q29uZ3JhdHVsYXRpb25zKCkge1xuICAgICAgICB0aGlzLmdldEVsZW1lbnQoXCIjZ2FtZVdpblwiKS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgIH1cbiAgICBoaWRlTmV3R2FtZUJ1dHRvbigpIHtcbiAgICAgICAgKHRoaXMuZ2V0RWxlbWVudChcIiNuZXctZ2FtZVwiKSBhcyBIVE1MQnV0dG9uRWxlbWVudCkuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgIH1cbiAgICBoaWRlQ29uZ3JhdHVsYXRpb25zKCkge1xuICAgICAgICB0aGlzLmdldEVsZW1lbnQoXCIjZ2FtZVdpblwiKS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgfVxuICAgIGdldEJvYXJkSW1hZ2UoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEVsZW1lbnQoXCIjYm9hcmRcIikgYXMgSFRNTEltYWdlRWxlbWVudDtcbiAgICB9XG4gICAgc2hvd1NldHRpbmdzTWVudSgpIHtcbiAgICAgICAgY29uc3Qgc2V0dGluZ3NDb250YWluZXIgPSB0aGlzLmdldEVsZW1lbnQoXCIjc2V0dGluZ3MtY29udGFpbmVyXCIpO1xuICAgICAgICBjb25zdCBjb250YWluZXIgPSB0aGlzLmdldEVsZW1lbnQoXCIjY29udGFpbmVyXCIpO1xuICAgICAgICBzZXR0aW5nc0NvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgICBjb250YWluZXIuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgIH1cbiAgICBoaWRlU2V0dGluZ3NNZW51KCkge1xuICAgICAgICBjb25zdCBzZXR0aW5nc0NvbnRhaW5lciA9IHRoaXMuZ2V0RWxlbWVudChcIiNzZXR0aW5ncy1jb250YWluZXJcIik7XG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IHRoaXMuZ2V0RWxlbWVudChcIiNjb250YWluZXJcIik7XG4gICAgICAgIHNldHRpbmdzQ29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgY29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgfVxuICAgIHNob3dJY29uKCkge1xuICAgICAgICAodGhpcy5nZXRFbGVtZW50KFwiLmdnLWNoZWNrXCIpIGFzIEhUTUxFbGVtZW50KS5zdHlsZS5kaXNwbGF5ID1cbiAgICAgICAgICAgIFwiYmxvY2tcIjtcbiAgICB9XG4gICAgZ2V0UGxheUJ1dHRvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RWxlbWVudChcIiNwbGF5LWJ0blwiKTtcbiAgICB9XG4gICAgaGlkZUdhbWVPdmVyTWVzc2FnZSgpIHtcbiAgICAgICAgdGhpcy5nZXRFbGVtZW50KFwiI2dhbWVPdmVyXCIpLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICB9XG59IiwiaW1wb3J0IHsgVmVjdG9yIH0gZnJvbSBcIi4uL2dlb21ldHJ5L3ZlY3RvclwiO1xuaW1wb3J0IHtcbiAgQlJJQ0tfUk9XUyxcbiAgQlJJQ0tfV0lEVEgsXG4gIEJSSUNLX0hFSUdIVCxcbiAgQk9BUkRfV0lEVEgsXG4gIEJPQVJEX0hFSUdIVCxcbiAgQkFMTF9ESUFNRVRFUixcbn0gZnJvbSBcIi4uL3V0aWxzL2NvbnN0YW50c1wiO1xuaW1wb3J0IHsgQmFsbCB9IGZyb20gXCIuLi9maWd1cmVzL2JhbGxcIjtcbmltcG9ydCB7IEJyaWNrIH0gZnJvbSBcIi4uL2ZpZ3VyZXMvYnJpY2tcIjtcbmltcG9ydCB7IFBhZGRsZSB9IGZyb20gXCIuLi9maWd1cmVzL3BhZGRsZVwiO1xuXG5leHBvcnQgY2xhc3MgQ2FudmFzVmlldyB7XG4gIHByaXZhdGUgY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ7XG4gIHB1YmxpYyBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50O1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBjYW52YXNTZWxlY3Rvcjogc3RyaW5nKSB7XG4gICAgdGhpcy5jYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChjYW52YXNTZWxlY3RvcikgYXMgSFRNTENhbnZhc0VsZW1lbnQ7XG4gICAgdGhpcy5jdHggPSB0aGlzLmNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG4gIH1cblxuICBkcmF3SW1hZ2UoXG4gICAgcG9zaXRpb246IFZlY3RvcixcbiAgICBpbWFnZTogSFRNTEltYWdlRWxlbWVudCxcbiAgICB3aWR0aDogbnVtYmVyLFxuICAgIGhlaWdodDogbnVtYmVyXG4gICkge1xuICAgIHRoaXMuY3R4LmRyYXdJbWFnZShpbWFnZSwgcG9zaXRpb24ueCwgcG9zaXRpb24ueSwgd2lkdGgsIGhlaWdodCk7XG4gIH1cblxuICBkcmF3QnJpY2tzKGJyaWNrczogQnJpY2tbXSkge1xuICAgIGZvciAobGV0IHIgPSAwOyByIDwgQlJJQ0tfUk9XUzsgcisrKSB7XG4gICAgICBmb3IgKGxldCBjID0gMDsgYyA8IGJyaWNrcy5sZW5ndGg7IGMrKykge1xuICAgICAgICBjb25zdCBicmljayA9IGJyaWNrc1tjXTtcbiAgICAgICAgY29uc3QgcG9zOiBWZWN0b3IgPSBuZXcgVmVjdG9yKFxuICAgICAgICAgIGJyaWNrLnBvc2l0aW9uLngsXG4gICAgICAgICAgYnJpY2sucG9zaXRpb24ueSxcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5kcmF3SW1hZ2UocG9zLCBicmljay5nZXRJbWFnZSgpLCBCUklDS19XSURUSCwgQlJJQ0tfSEVJR0hUKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBkcmF3QmFsbChiYWxsOiBCYWxsKSB7XG4gICAgdGhpcy5kcmF3SW1hZ2UoXG4gICAgICBuZXcgVmVjdG9yKGJhbGwucG9zaXRpb24ueCAtIEJBTExfRElBTUVURVIgLyAyLCBiYWxsLnBvc2l0aW9uLnkgLSBCQUxMX0RJQU1FVEVSIC8gMiksXG4gICAgICBiYWxsLmdldEltYWdlKCksXG4gICAgICBCQUxMX0RJQU1FVEVSLFxuICAgICAgQkFMTF9ESUFNRVRFUlxuICAgICk7XG4gIH1cblxuICBkcmF3Qm9hcmQoYm9hcmQ6IFBhZGRsZSkge1xuICAgIHRoaXMuY3R4LmJlZ2luUGF0aCgpO1xuICAgIHRoaXMuY3R4LmRyYXdJbWFnZShcbiAgICAgIGJvYXJkLmdldEltYWdlKCksXG4gICAgICBib2FyZC5wb3NpdGlvbi54LFxuICAgICAgYm9hcmQucG9zaXRpb24ueSxcbiAgICAgIEJPQVJEX1dJRFRILFxuICAgICAgQk9BUkRfSEVJR0hUXG4gICAgKTtcbiAgICB0aGlzLmN0eC5jbG9zZVBhdGgoKTtcbiAgfVxuXG4gIGdldENvbnRleHQoKTogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEIHtcbiAgICByZXR1cm4gdGhpcy5jdHg7XG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IGNhbnZhc1ZpZXcgPSBuZXcgQ2FudmFzVmlldyhcImdhbWVDYW52YXNcIik7IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBDYW52YXNWaWV3IH0gZnJvbSBcIi4vdmlldy9jYW52YXNWaWV3XCI7XG5pbXBvcnQgeyBHYW1lIH0gZnJvbSBcIi4vZW5naW5lL2dhbWVMb29wXCI7XG5pbXBvcnQgeyBET01WaWV3IH0gZnJvbSBcIi4vdmlldy9ET01WaWV3XCI7XG5cbmNvbnN0IGNhbnZhc1ZpZXcgPSBuZXcgQ2FudmFzVmlldyhcImdhbWVDYW52YXNcIik7XG5jb25zdCBkb20gPSBET01WaWV3LmdldEluc3RhbmNlKCk7XG5sZXQgbGl2ZXMgPSAzO1xubGV0IGdhbWUgPSBuZXcgR2FtZShjYW52YXNWaWV3LCBsaXZlcyk7XG5sZXQgaXNQbGF5aW5nTXVzaWMgPSBmYWxzZTtcblxuZG9tLmFkZEhhbmRsZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gIGdhbWUuc3RhcnRHYW1lKCk7XG4gIGRvbS5oaWRlR2FtZU92ZXJNZXNzYWdlKCk7XG59LCBcIiNuZXctZ2FtZVwiKTtcblxuZG9tLmFkZEhhbmRsZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gIGRvbS5pbml0R2FtZSgpO1xuICBnYW1lLmxpdmVzID0gbGl2ZXM7XG4gIGdhbWUuc2NvcmVQb2ludHMgPSAwO1xuICBnYW1lLnN0YXJ0R2FtZSgpO1xuXG4gIGlmIChpc1BsYXlpbmdNdXNpYykge1xuICAgIGNvbnN0IG11c2ljID0gbmV3IEF1ZGlvKFwiLi4vYXNzZXRzL211c2ljLm1wM1wiKTtcbiAgICBtdXNpYy52b2x1bWUgPSAwLjE7XG4gICAgbXVzaWMucGxheSgpO1xuICB9XG59LCBcIiNwbGF5LWJ0blwiKTtcblxuZG9tLmFkZEhhbmRsZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gIGRvbS5zaG93U2V0dGluZ3NNZW51KCk7XG4gIGRvbS5hZGRCYWNrQnV0dG9uSGFuZGxlcigpO1xuICBkb20uYWRkSGFuZGxlcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBpc1BsYXlpbmdNdXNpYyA9IHRydWU7XG4gICAgZG9tLnNob3dJY29uKCk7XG4gIH0sIFwiI3BsYXktc291bmQtYnRuXCIpO1xufSwgXCIjc2V0dGluZy1idG5cIik7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9