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
            if (this.isMouseActive)
                this.board.position.x = e.clientX;
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
        this.bricks = (0,_utils_brickFactory__WEBPACK_IMPORTED_MODULE_10__.createBricks)();
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
        _view_canvasView__WEBPACK_IMPORTED_MODULE_0__.canvasView.getContext().clearRect(0, 0, _view_canvasView__WEBPACK_IMPORTED_MODULE_0__.canvasView.canvas.width, _view_canvasView__WEBPACK_IMPORTED_MODULE_0__.canvasView.canvas.height);
        _view_canvasView__WEBPACK_IMPORTED_MODULE_0__.canvasView.drawBricks(this.bricks);
        _view_canvasView__WEBPACK_IMPORTED_MODULE_0__.canvasView.drawBoard(this.board);
        _view_canvasView__WEBPACK_IMPORTED_MODULE_0__.canvasView.drawBall(this.ball);
        this.collisionDetector();
        if (!this.gameOver)
            (0,_move__WEBPACK_IMPORTED_MODULE_3__.move)(this.ball);
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
    hideNewGameButton() {
        this.getElement("#new-game").style.display = "none";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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R0FBRyxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ2pCLENBQUMsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO0FBQ3hCLENBQUMsRUFBRSxjQUFjLENBQUMsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2J1ZGdldGVlci10cy8uL3NyYy9lbmdpbmUvZ2FtZUxvb3AudHMiLCJ3ZWJwYWNrOi8vYnVkZ2V0ZWVyLXRzLy4vc3JjL2VuZ2luZS9tb3ZlLnRzIiwid2VicGFjazovL2J1ZGdldGVlci10cy8uL3NyYy9maWd1cmVzL2JhbGwudHMiLCJ3ZWJwYWNrOi8vYnVkZ2V0ZWVyLXRzLy4vc3JjL2ZpZ3VyZXMvYnJpY2sudHMiLCJ3ZWJwYWNrOi8vYnVkZ2V0ZWVyLXRzLy4vc3JjL2ZpZ3VyZXMvcGFkZGxlLnRzIiwid2VicGFjazovL2J1ZGdldGVlci10cy8uL3NyYy9nZW9tZXRyeS92ZWN0b3IudHMiLCJ3ZWJwYWNrOi8vYnVkZ2V0ZWVyLXRzLy4vc3JjL3BoeXNpY3MvbWlzYy50cyIsIndlYnBhY2s6Ly9idWRnZXRlZXItdHMvLi9zcmMvcGh5c2ljcy9tb3ZlbWVudC50cyIsIndlYnBhY2s6Ly9idWRnZXRlZXItdHMvLi9zcmMvdXRpbHMvYnJpY2tGYWN0b3J5LnRzIiwid2VicGFjazovL2J1ZGdldGVlci10cy8uL3NyYy91dGlscy9jb25zdGFudHMudHMiLCJ3ZWJwYWNrOi8vYnVkZ2V0ZWVyLXRzLy4vc3JjL3V0aWxzL2hlbHBlcnMudHMiLCJ3ZWJwYWNrOi8vYnVkZ2V0ZWVyLXRzLy4vc3JjL3V0aWxzL3ZhbGlkYXRvcnMudHMiLCJ3ZWJwYWNrOi8vYnVkZ2V0ZWVyLXRzLy4vc3JjL3ZpZXcvRE9NVmlldy50cyIsIndlYnBhY2s6Ly9idWRnZXRlZXItdHMvLi9zcmMvdmlldy9jYW52YXNWaWV3LnRzIiwid2VicGFjazovL2J1ZGdldGVlci10cy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9idWRnZXRlZXItdHMvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2J1ZGdldGVlci10cy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2J1ZGdldGVlci10cy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2J1ZGdldGVlci10cy8uL3NyYy9hcHAudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2FudmFzVmlldywgY2FudmFzVmlldyB9IGZyb20gXCIuLi92aWV3L2NhbnZhc1ZpZXdcIjtcbmltcG9ydCB7IFBhZGRsZSB9IGZyb20gXCIuLi9maWd1cmVzL3BhZGRsZVwiO1xuaW1wb3J0IHsgQmFsbCB9IGZyb20gXCIuLi9maWd1cmVzL2JhbGxcIjtcbmltcG9ydCB7IEJyaWNrIH0gZnJvbSBcIi4uL2ZpZ3VyZXMvYnJpY2tcIjtcbmltcG9ydCB7IG1vdmUgfSBmcm9tIFwiLi9tb3ZlXCI7XG5pbXBvcnQge1xuICAgIEJPQVJEX1dJRFRILCBCUklDS19CT05VU19QT0lOVFMsIElOSVRJQUxfQkFMTF9YLCBJTklUSUFMX0JBTExfWSxcbn0gZnJvbSBcIi4uL3V0aWxzL2NvbnN0YW50c1wiO1xuaW1wb3J0IHtcbiAgICBpc0JhbGxIaXR0aW5nVGhlRmxvb3IsIGlzQmFsbEhpdHRpbmdUaGVDZWlsaW5nLCBpc0JhbGxIaXR0aW5nUmlnaHRXYWxsLFxuICAgIGlzQmFsbEhpdHRpbmdUaGVMZWZ0V2FsbCwgaXNCYWxsQ29sbGlkaW5nV2l0aEJvYXJkLCBpc0JhbGxOZWFyQnJpY2tzXG59IGZyb20gXCIuLi91dGlscy92YWxpZGF0b3JzXCI7XG5pbXBvcnQgeyBzZXRHYW1lTGV2ZWwsIHNob3dHYW1lT3Zlck1lc3NhZ2UgfSBmcm9tIFwiLi4vdXRpbHMvaGVscGVyc1wiO1xuaW1wb3J0IHsgY2hhbmdlQmFsbERpcmVjdGlvbiwgaGFuZGxlQm9hcmRIaXQgfSBmcm9tIFwiLi4vcGh5c2ljcy9tb3ZlbWVudFwiO1xuaW1wb3J0IHsgVmVjdG9yIH0gZnJvbSBcIi4uL2dlb21ldHJ5L3ZlY3RvclwiO1xuaW1wb3J0IHsgZ2V0SGl0QnJpY2tJbmRleCB9IGZyb20gXCIuLi9waHlzaWNzL21pc2NcIjtcbmltcG9ydCB7IGNyZWF0ZUJyaWNrcyB9IGZyb20gXCIuLi91dGlscy9icmlja0ZhY3RvcnlcIjtcbmltcG9ydCB7IGV4cGxvZGUgfSBmcm9tIFwiLi4vZWZmZWN0cy9leHBsb3Npb25cIjtcbmltcG9ydCB7IERPTVZpZXcgfSBmcm9tIFwiLi4vdmlldy9ET01WaWV3XCI7XG5cblxuY29uc3QgaW5wdXQ6IHsgW2NvZGU6IHN0cmluZ106IGJvb2xlYW4gfSA9IHt9O1xuXG5cbmV4cG9ydCBpbnRlcmZhY2UgR2FtZU9iamVjdHMge1xuICAgIGJhbGw6IEJhbGwsIGJvYXJkOiBQYWRkbGUsIGJyaWNrczogQnJpY2tbXVxufVxuXG5leHBvcnQgY2xhc3MgR2FtZSB7XG4gICAgcHJpdmF0ZSBiYWxsOiBCYWxsO1xuICAgIHByaXZhdGUgYm9hcmQ6IFBhZGRsZTtcbiAgICBwcml2YXRlIGJyaWNrczogQnJpY2tbXTtcbiAgICBwdWJsaWMgc2NvcmVQb2ludHM6IG51bWJlcjtcbiAgICBwdWJsaWMgR0FNRV9ESUZGSUNVTFRZID0gMztcbiAgICBwcml2YXRlIHJlYWRvbmx5IFNURVBfU0laRSA9IDIwO1xuICAgIHByaXZhdGUgbGFzdFRpbWU6IG51bWJlcjtcbiAgICBwcml2YXRlIGVsYXBzZWQ6IG51bWJlcjtcbiAgICBwdWJsaWMgZ2FtZU92ZXI6IGJvb2xlYW47XG4gICAgcHJpdmF0ZSBkb20gPSBET01WaWV3LmdldEluc3RhbmNlKCk7XG4gICAgcHJpdmF0ZSBpc01vdXNlQWN0aXZlID0gdHJ1ZTtcbiAgICBwcml2YXRlIG1heExpdmVzID0gMztcblxuXG4gICAgY29uc3RydWN0b3IocHVibGljIGNhbnZhc1ZpZXc6IENhbnZhc1ZpZXcsIHB1YmxpYyBsaXZlczogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuc2NvcmVQb2ludHMgPSAwO1xuICAgICAgICB0aGlzLm1heExpdmVzID0gbGl2ZXM7XG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZUdhbWVPYmplY3RzKCk7XG4gICAgICAgIHRoaXMuYWRkSGFuZGxlcnMoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGFkZEhhbmRsZXJzKCkge1xuICAgICAgICB0aGlzLmRvbS5hZGRIYW5kbGVyKFwia2V5ZG93blwiLCAoZXZlbnQ6IEtleWJvYXJkRXZlbnQpID0+IHtcbiAgICAgICAgICAgIGlucHV0W2V2ZW50LmNvZGVdID0gdHJ1ZTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuZG9tLmFkZEhhbmRsZXIoXCJrZXl1cFwiLCAoZXZlbnQ6IEtleWJvYXJkRXZlbnQpID0+IHtcbiAgICAgICAgICAgIGlucHV0W2V2ZW50LmNvZGVdID0gZmFsc2U7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmRvbS5hZGRIYW5kbGVyKFwibW91c2Vtb3ZlXCIsIChlOiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5pc01vdXNlQWN0aXZlKVxuICAgICAgICAgICAgICAgIHRoaXMuYm9hcmQucG9zaXRpb24ueCA9IGUuY2xpZW50WDtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuZG9tLmFkZFJpZ2h0Q2xpY2tIYW5kbGVyKChlKSA9PiB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB0aGlzLmlzTW91c2VBY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuZG9tLmFkZEhhbmRsZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgaW5wdXQgPSAoZS50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudCk7XG4gICAgICAgICAgICB0aGlzLkdBTUVfRElGRklDVUxUWSA9IHNldEdhbWVMZXZlbChpbnB1dCk7XG4gICAgICAgIH0sIFwiI2xldmVsXCIpO1xuICAgIH1cblxuICAgIHByaXZhdGUgaW5pdGlhbGl6ZUdhbWVPYmplY3RzKCkge1xuICAgICAgICB0aGlzLmJyaWNrcyA9IGNyZWF0ZUJyaWNrcygpO1xuICAgICAgICBjb25zdCBib2FyZFBvc2l0aW9uID0gbmV3IFZlY3RvcihcbiAgICAgICAgICAgIGNhbnZhc1ZpZXcuY2FudmFzLndpZHRoIC8gMixcbiAgICAgICAgICAgIGNhbnZhc1ZpZXcuY2FudmFzLmhlaWdodCAtIDEwMFxuICAgICAgICApO1xuICAgICAgICB0aGlzLmJvYXJkID0gbmV3IFBhZGRsZShib2FyZFBvc2l0aW9uLCB0aGlzLmRvbS5nZXRCb2FyZEltYWdlKCkpO1xuICAgICAgICBjb25zdCBiYWxsUG9zaXRpb24gPSBuZXcgVmVjdG9yKElOSVRJQUxfQkFMTF9YLCBJTklUSUFMX0JBTExfWSk7XG4gICAgICAgIHRoaXMuYmFsbCA9IG5ldyBCYWxsKGJhbGxQb3NpdGlvbiwgXCIvYXNzZXRzL2JhbGwucG5nXCIpO1xuICAgICAgICB0aGlzLmJhbGwudmVsb2NpdHkgPSBuZXcgVmVjdG9yKHRoaXMuR0FNRV9ESUZGSUNVTFRZLCB0aGlzLkdBTUVfRElGRklDVUxUWSk7XG4gICAgICAgIHRoaXMubGFzdFRpbWUgPSAwO1xuICAgICAgICB0aGlzLmVsYXBzZWQgPSAwO1xuICAgICAgICB0aGlzLmdhbWVPdmVyID0gZmFsc2U7XG4gICAgfVxuXG4gICAgZ2FtZUxvb3AoKSB7XG4gICAgICAgIGlmIChpbnB1dFsnQXJyb3dMZWZ0J10gJiYgKHRoaXMuYm9hcmQucG9zaXRpb24ueCA+IDApKSB7XG4gICAgICAgICAgICB0aGlzLmJvYXJkLnZlbG9jaXR5LnggPSAtNztcbiAgICAgICAgICAgIG1vdmUodGhpcy5ib2FyZCk7XG4gICAgICAgIH0gZWxzZSBpZiAoaW5wdXRbJ0Fycm93UmlnaHQnXSAmJiAodGhpcy5ib2FyZC5wb3NpdGlvbi54ICsgQk9BUkRfV0lEVEggPCBjYW52YXNWaWV3LmNhbnZhcy53aWR0aCkpIHtcbiAgICAgICAgICAgIHRoaXMuYm9hcmQudmVsb2NpdHkueCA9IDc7XG4gICAgICAgICAgICBtb3ZlKHRoaXMuYm9hcmQpO1xuICAgICAgICB9XG4gICAgICAgIGNhbnZhc1ZpZXcuZ2V0Q29udGV4dCgpLmNsZWFyUmVjdCgwLCAwLCBjYW52YXNWaWV3LmNhbnZhcy53aWR0aCwgY2FudmFzVmlldy5jYW52YXMuaGVpZ2h0KTtcbiAgICAgICAgY2FudmFzVmlldy5kcmF3QnJpY2tzKHRoaXMuYnJpY2tzKTtcbiAgICAgICAgY2FudmFzVmlldy5kcmF3Qm9hcmQodGhpcy5ib2FyZCk7XG4gICAgICAgIGNhbnZhc1ZpZXcuZHJhd0JhbGwodGhpcy5iYWxsKTtcbiAgICAgICAgdGhpcy5jb2xsaXNpb25EZXRlY3RvcigpO1xuICAgICAgICBpZiAoIXRoaXMuZ2FtZU92ZXIpXG4gICAgICAgICAgICBtb3ZlKHRoaXMuYmFsbCk7XG4gICAgfVxuXG4gICAgY29sbGlzaW9uRGV0ZWN0b3IoKSB7XG4gICAgICAgIGlmIChpc0JhbGxDb2xsaWRpbmdXaXRoQm9hcmQodGhpcy5iYWxsLCB0aGlzLmJvYXJkKSkge1xuICAgICAgICAgICAgaGFuZGxlQm9hcmRIaXQodGhpcy5iYWxsLCB0aGlzLmJvYXJkKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNCYWxsSGl0dGluZ1RoZUZsb29yKHRoaXMuYmFsbCwgdGhpcy5jYW52YXNWaWV3KSkge1xuICAgICAgICAgICAgdGhpcy5saXZlcy0tO1xuICAgICAgICAgICAgdGhpcy5nYW1lT3ZlciA9IHRydWU7XG4gICAgICAgICAgICBpZiAodGhpcy5saXZlcyA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHNob3dHYW1lT3Zlck1lc3NhZ2UodGhpcy5zY29yZVBvaW50cyk7IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRvbS5zaG93SW5pdGlhbFNjcmVlbigpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxpdmVzID0gdGhpcy5tYXhMaXZlcztcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zY29yZVBvaW50cyA9IDA7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZG9tLmhpZGVOZXdHYW1lQnV0dG9uKCk7XG4gICAgICAgICAgICAgICAgfSwgMTUwMCk7XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuZG9tLnNldExpdmVzKHRoaXMubGl2ZXMpO1xuICAgICAgICB9IGVsc2UgaWYgKGlzQmFsbEhpdHRpbmdUaGVDZWlsaW5nKHRoaXMuYmFsbCkpIHtcbiAgICAgICAgICAgIHRoaXMuYmFsbC52ZWxvY2l0eS55ID0gTWF0aC5hYnModGhpcy5iYWxsLnZlbG9jaXR5LnkpO1xuICAgICAgICB9IGVsc2UgaWYgKGlzQmFsbEhpdHRpbmdSaWdodFdhbGwodGhpcy5iYWxsLCB0aGlzLmNhbnZhc1ZpZXcpKSB7XG4gICAgICAgICAgICB0aGlzLmJhbGwudmVsb2NpdHkueCA9IC0gdGhpcy5iYWxsLnZlbG9jaXR5Lng7XG4gICAgICAgIH0gZWxzZSBpZiAoaXNCYWxsSGl0dGluZ1RoZUxlZnRXYWxsKHRoaXMuYmFsbCkpIHtcbiAgICAgICAgICAgIHRoaXMuYmFsbC52ZWxvY2l0eS54ID0gTWF0aC5hYnModGhpcy5iYWxsLnZlbG9jaXR5LngpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8vXG4gICAgc3RhcnRHYW1lKCkge1xuICAgICAgICBpZiAodGhpcy5saXZlcyA+IDEpIHtcbiAgICAgICAgICAgIHRoaXMuZG9tLnNob3dOZXdHYW1lQnV0dG9uKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmRvbS5oaWRlTmV3R2FtZUJ1dHRvbigpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZG9tLnNldFNjb3JlKHRoaXMuc2NvcmVQb2ludHMpO1xuICAgICAgICB0aGlzLmRvbS5zZXRMaXZlcyh0aGlzLmxpdmVzKTtcbiAgICAgICAgdGhpcy5pbml0aWFsaXplR2FtZU9iamVjdHMoKTtcbiAgICAgICAgdGhpcy51cGRhdGUocGVyZm9ybWFuY2Uubm93KCkpO1xuICAgIH1cblxuICAgIHVwZGF0ZSh0aW1lOiBudW1iZXIpIHtcbiAgICAgICAgY29uc3QgZGVsdGEgPSB0aW1lIC0gdGhpcy5sYXN0VGltZTtcbiAgICAgICAgdGhpcy5sYXN0VGltZSA9IHRpbWU7XG4gICAgICAgIHRoaXMuZWxhcHNlZCArPSBkZWx0YTtcbiAgICAgICAgbGV0IGRlbGV0ZUJyaWNrSW5kZXggPSBpc0JhbGxOZWFyQnJpY2tzKHRoaXMuYmFsbClcbiAgICAgICAgICAgID8gZ2V0SGl0QnJpY2tJbmRleCh0aGlzLmJyaWNrcywgdGhpcy5iYWxsKVxuICAgICAgICAgICAgOiAtMTtcbiAgICAgICAgaWYgKGRlbGV0ZUJyaWNrSW5kZXggIT0gLTEpIHtcbiAgICAgICAgICAgIGNvbnN0IGJyaWNrID0gdGhpcy5icmlja3NbZGVsZXRlQnJpY2tJbmRleF07Ly8vXG4gICAgICAgICAgICAvLy9leHBsb2RlKGJyaWNrKTtcbiAgICAgICAgICAgIGNoYW5nZUJhbGxEaXJlY3Rpb24odGhpcy5iYWxsLCBicmljayk7XG4gICAgICAgICAgICB0aGlzLmJyaWNrcy5zcGxpY2UoZGVsZXRlQnJpY2tJbmRleCwgMSk7XG4gICAgICAgICAgICB0aGlzLnNjb3JlUG9pbnRzICs9IEJSSUNLX0JPTlVTX1BPSU5UUztcbiAgICAgICAgICAgIHRoaXMuZG9tLnNldFNjb3JlKHRoaXMuc2NvcmVQb2ludHMpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmVsYXBzZWQgPiB0aGlzLlNURVBfU0laRSAqIDUpIHtcbiAgICAgICAgICAgIHRoaXMuZWxhcHNlZCA9IHRoaXMuU1RFUF9TSVpFICogNTtcbiAgICAgICAgfVxuICAgICAgICB3aGlsZSAodGhpcy5lbGFwc2VkID4gdGhpcy5TVEVQX1NJWkUpIHtcbiAgICAgICAgICAgIHRoaXMuZWxhcHNlZCAtPSB0aGlzLlNURVBfU0laRTtcbiAgICAgICAgICAgIHRoaXMuZ2FtZUxvb3AoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5icmlja3MubGVuZ3RoICYmICF0aGlzLmdhbWVPdmVyKSB7XG4gICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy51cGRhdGUuYmluZCh0aGlzKSk7XG4gICAgICAgIH1cbiAgICB9XG59IiwiaW1wb3J0IHsgVmVjdG9yIH0gZnJvbSBcIi4uL2dlb21ldHJ5L3ZlY3RvclwiO1xuXG5leHBvcnQgZnVuY3Rpb24gbW92ZShnYW1lT2JqZWN0OiBHYW1lT2JqZWN0KSB7XG4gIGdhbWVPYmplY3QucG9zaXRpb24ueCArPSBnYW1lT2JqZWN0LnZlbG9jaXR5Lng7XG4gIGdhbWVPYmplY3QucG9zaXRpb24ueSArPSBnYW1lT2JqZWN0LnZlbG9jaXR5Lnk7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgR2FtZU9iamVjdCB7XG4gIHBvc2l0aW9uOiB7IHg6IG51bWJlcjsgeTogbnVtYmVyIH07XG4gIHZlbG9jaXR5OiBWZWN0b3Jcbn0iLCJpbXBvcnQgeyBWZWN0b3IgfSBmcm9tIFwiLi4vZ2VvbWV0cnkvdmVjdG9yXCI7XG5cbmV4cG9ydCBjbGFzcyBCYWxsIHtcbiAgcHJpdmF0ZSBpbWFnZTogSFRNTEltYWdlRWxlbWVudCA9IG5ldyBJbWFnZSgpO1xuICBwdWJsaWMgdmVsb2NpdHk6IFZlY3RvciA9IG5ldyBWZWN0b3IoMCwgMCk7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBwb3NpdGlvbjogVmVjdG9yLCBpbWFnZTogc3RyaW5nLCBiYWxsdmVsb2NpdHk/OiBWZWN0b3IpIHtcbiAgICB0aGlzLmltYWdlLnNyYyA9IGltYWdlO1xuICAgIGlmICghIWJhbGx2ZWxvY2l0eSkgdGhpcy52ZWxvY2l0eSA9IGJhbGx2ZWxvY2l0eTtcbiAgfVxuXG4gIGdldEltYWdlKCk6IEhUTUxJbWFnZUVsZW1lbnQge1xuICAgIHJldHVybiB0aGlzLmltYWdlO1xuICB9XG59IiwiaW1wb3J0IHsgVmVjdG9yIH0gZnJvbSBcIi4uL2dlb21ldHJ5L3ZlY3RvclwiO1xuXG5leHBvcnQgY2xhc3MgQnJpY2sge1xuICBwcml2YXRlIGltYWdlOiBIVE1MSW1hZ2VFbGVtZW50ID0gbmV3IEltYWdlKCk7XG5cbiAgY29uc3RydWN0b3IocHVibGljIHBvc2l0aW9uOiBWZWN0b3IsIGltYWdlOiBzdHJpbmcpIHtcbiAgICB0aGlzLmltYWdlLnNyYyA9IGltYWdlO1xuICB9XG5cbiAgZ2V0SW1hZ2UoKTogSFRNTEltYWdlRWxlbWVudCB7XG4gICAgcmV0dXJuIHRoaXMuaW1hZ2U7XG4gIH1cbn0iLCJpbXBvcnQgeyBWZWN0b3IgfSBmcm9tIFwiLi4vZ2VvbWV0cnkvdmVjdG9yXCI7XG5cbmV4cG9ydCBjbGFzcyBQYWRkbGUge1xuICBwcml2YXRlIGltYWdlOiBIVE1MSW1hZ2VFbGVtZW50ID0gbmV3IEltYWdlKCk7XG4gIHB1YmxpYyB2ZWxvY2l0eTogVmVjdG9yID0gbmV3IFZlY3RvcigwLCAwKTtcbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIHBvc2l0aW9uOiBWZWN0b3IsXG4gICAgaW1hZ2U6IEhUTUxJbWFnZUVsZW1lbnQsXG4gICAgYm9hcmR2ZWxvY2l0eT86IFZlY3RvclxuICApIHtcbiAgICB0aGlzLmltYWdlID0gaW1hZ2U7XG4gICAgaWYgKCEhYm9hcmR2ZWxvY2l0eSkgdGhpcy52ZWxvY2l0eSA9IGJvYXJkdmVsb2NpdHk7XG4gIH1cblxuICBnZXRJbWFnZSgpOiBIVE1MSW1hZ2VFbGVtZW50IHtcbiAgICByZXR1cm4gdGhpcy5pbWFnZTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgUG9pbnQgfSBmcm9tIFwiLi9pbnRlcmZhY2VzXCI7XG5cbmV4cG9ydCBjbGFzcyBWZWN0b3IgaW1wbGVtZW50cyBQb2ludCB7XG4gIHg6IG51bWJlcjtcbiAgeTogbnVtYmVyO1xuXG4gIGNvbnN0cnVjdG9yKHA6IFBvaW50KTtcbiAgY29uc3RydWN0b3IoeDogbnVtYmVyLCB5OiBudW1iZXIpO1xuICBjb25zdHJ1Y3Rvcih4T3JQb2ludDogbnVtYmVyIHwgUG9pbnQsIHk/OiBudW1iZXIpIHtcbiAgICBpZiAodHlwZW9mIHhPclBvaW50ID09IFwibnVtYmVyXCIgJiYgdHlwZW9mIHkgPT0gXCJudW1iZXJcIikge1xuICAgICAgdGhpcy54ID0geE9yUG9pbnQ7XG4gICAgICB0aGlzLnkgPSB5O1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIHhPclBvaW50ID09IFwib2JqZWN0XCIpIHtcbiAgICAgIHRoaXMueCA9IHhPclBvaW50Lng7XG4gICAgICB0aGlzLnkgPSB4T3JQb2ludC55O1xuICAgIH1cbiAgfVxuXG4gIGFkZChwOiBQb2ludCkge1xuICAgIHRoaXMueCArPSBwLng7XG4gICAgdGhpcy55ICs9IHAueTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHNjYWxlKHM6IG51bWJlcikge1xuICAgIHRoaXMueCAqPSBzO1xuICAgIHRoaXMueSAqPSBzO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBkaXN0KHA6IFBvaW50KSB7XG4gICAgY29uc3QgZHggPSB0aGlzLnggLSBwLng7XG4gICAgY29uc3QgZHkgPSB0aGlzLnkgLSBwLnk7XG4gICAgcmV0dXJuIE1hdGguc3FydChkeCAqKiAyICsgZHkgKiogMik7XG4gIH1cblxuICBzcUxlbmd0aCgpIHtcbiAgICByZXR1cm4gdGhpcy54ICoqIDIgKyB0aGlzLnkgKiogMjtcbiAgfVxuXG4gIHN0YXRpYyBhZGQocDE6IFBvaW50LCBwMjogUG9pbnQpIHtcbiAgICByZXR1cm4gbmV3IFZlY3RvcihwMS54ICsgcDIueCwgcDEueSArIHAyLnkpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBCQUxMX0RJQU1FVEVSLCBCUklDS19XSURUSCwgQlJJQ0tfSEVJR0hUIH0gZnJvbSBcIi4uL3V0aWxzL2NvbnN0YW50c1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0SGl0QnJpY2tJbmRleChicmlja3MsIGJhbGwpIHtcbiAgcmV0dXJuIGJyaWNrcy5maW5kSW5kZXgoKGJyaWNrKSA9PiB7XG4gICAgY29uc3QgbGVmdCA9IGJyaWNrLnBvc2l0aW9uLnggLSBCQUxMX0RJQU1FVEVSIC8gMjtcbiAgICBjb25zdCByaWdodCA9IGJyaWNrLnBvc2l0aW9uLnggKyBCUklDS19XSURUSCArIEJBTExfRElBTUVURVIgLyAyO1xuICAgIGNvbnN0IHRvcCA9IGJyaWNrLnBvc2l0aW9uLnkgLSBCQUxMX0RJQU1FVEVSIC8gMjtcbiAgICBjb25zdCBib3R0b20gPSBicmljay5wb3NpdGlvbi55ICsgQlJJQ0tfSEVJR0hUICsgQkFMTF9ESUFNRVRFUiAvIDI7XG4gICAgcmV0dXJuIChcbiAgICAgIGJhbGwucG9zaXRpb24ueCA+PSBsZWZ0ICYmXG4gICAgICBiYWxsLnBvc2l0aW9uLnggPD0gcmlnaHQgJiZcbiAgICAgIGJhbGwucG9zaXRpb24ueSA+PSB0b3AgJiZcbiAgICAgIGJhbGwucG9zaXRpb24ueSA8PSBib3R0b21cbiAgICApO1xuICB9KTtcbn0iLCJpbXBvcnQgeyBCYWxsIH0gZnJvbSBcIi4uL2ZpZ3VyZXMvYmFsbFwiO1xuaW1wb3J0IHsgQnJpY2sgfSBmcm9tIFwiLi4vZmlndXJlcy9icmlja1wiO1xuaW1wb3J0IHsgUGFkZGxlIH0gZnJvbSBcIi4uL2ZpZ3VyZXMvcGFkZGxlXCI7XG5pbXBvcnQgeyBCUklDS19IRUlHSFQsIEJSSUNLX1dJRFRILCBCQUxMX0RJQU1FVEVSLCBCT0FSRF9XSURUSCB9IGZyb20gXCIuLi91dGlscy9jb25zdGFudHNcIjtcblxuXG5leHBvcnQgZnVuY3Rpb24gY2hhbmdlQmFsbERpcmVjdGlvbihiYWxsOiBCYWxsLCBicmljazogQnJpY2spIHtcbiAgICBjb25zdCBCUklDS19ESUFHT05BTCA9IE1hdGguc3FydChCUklDS19IRUlHSFQgKiogMiArIEJSSUNLX1dJRFRIICoqIDIpO1xuICAgIGNvbnN0IGJyaWNrQ2VudGVyWCA9IGJyaWNrLnBvc2l0aW9uLnggKyBCUklDS19XSURUSCAvIDI7XG4gICAgY29uc3QgYnJpY2tDZW50ZXJZID0gYnJpY2sucG9zaXRpb24ueSArIEJSSUNLX0hFSUdIVCAvIDI7XG4gICAgY29uc3QgYmFsbENlbnRlclggPSBiYWxsLnBvc2l0aW9uLnggKyBCQUxMX0RJQU1FVEVSIC8gMjtcbiAgICBjb25zdCBiYWxsQ2VudGVyWSA9IGJhbGwucG9zaXRpb24ueSArIEJBTExfRElBTUVURVIgLyAyO1xuICAgIGNvbnN0IGRlbHRhWSA9IChCUklDS19IRUlHSFQgKiBCQUxMX0RJQU1FVEVSIC8gMikgLyBCUklDS19ESUFHT05BTDtcbiAgICBjb25zdCBkZWx0YVggPSAoQlJJQ0tfV0lEVEggKiBCQUxMX0RJQU1FVEVSIC8gMikgLyBCUklDS19ESUFHT05BTDtcbiAgICBjb25zdCBtaW5ZU2lkZUhpdCA9IGJyaWNrLnBvc2l0aW9uLnkgKyBkZWx0YVk7XG4gICAgY29uc3QgbWF4WVNpZGVIaXQgPSBicmljay5wb3NpdGlvbi55ICsgQlJJQ0tfSEVJR0hUIC0gZGVsdGFZO1xuICAgIGNvbnN0IG1pbkxlZnRYU2lkZUhpdCA9IGJyaWNrLnBvc2l0aW9uLnggLSBkZWx0YVg7XG4gICAgY29uc3QgbWF4TGVmdFhTaWRlSGl0ID0gYnJpY2sucG9zaXRpb24ueCArIGRlbHRhWDtcbiAgICBjb25zdCBpc0JhbGxDb21pbmdGcm9tQnV0dG9tTGVmdCA9ICgoYmFsbENlbnRlclggPiBtaW5MZWZ0WFNpZGVIaXQpXG4gICAgICAgICYmIChiYWxsQ2VudGVyWCA8IG1heExlZnRYU2lkZUhpdClcbiAgICAgICAgJiYgKGJhbGxDZW50ZXJZID4gbWluWVNpZGVIaXQpXG4gICAgICAgICYmIChiYWxsQ2VudGVyWSA8IG1heFlTaWRlSGl0KSk7XG4gICAgY29uc3QgaXNCYWxsQ29taW5nRnJvbUJ1dHRvbVJpZ2h0ID0gKChiYWxsQ2VudGVyWCA+IG1pbkxlZnRYU2lkZUhpdCArIEJSSUNLX1dJRFRIKVxuICAgICAgICAmJiAoYmFsbENlbnRlclggPCBtYXhMZWZ0WFNpZGVIaXQgKyBCUklDS19XSURUSClcbiAgICAgICAgJiYgKGJhbGxDZW50ZXJZID4gbWluWVNpZGVIaXQpXG4gICAgICAgICYmIChiYWxsQ2VudGVyWSA8IG1heFlTaWRlSGl0KSk7XG4gICAgaWYgKChpc0JhbGxDb21pbmdGcm9tQnV0dG9tTGVmdCAmJiBiYWxsLnZlbG9jaXR5LnggPiAwKSB8fCAoaXNCYWxsQ29taW5nRnJvbUJ1dHRvbVJpZ2h0ICYmIGJhbGwudmVsb2NpdHkueCA8IDApKSB7XG4gICAgICAgIGJhbGwudmVsb2NpdHkueCAqPSAtMTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBiYWxsLnZlbG9jaXR5LnkgKj0gLTE7XG4gICAgfVxuXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBoYW5kbGVCb2FyZEhpdChiYWxsOiBCYWxsLCBib2FyZDogUGFkZGxlKSB7XG4gICAgY29uc3QgY3VycmVudEFuZ2xlID0gTWF0aC5hdGFuMigtYmFsbC52ZWxvY2l0eS55LCBiYWxsLnZlbG9jaXR5LngpO1xuICAgIGNvbnN0IGRlbHRhQ2VudGVyWCA9IChiYWxsLnBvc2l0aW9uLnggLSAoYm9hcmQucG9zaXRpb24ueCArIEJPQVJEX1dJRFRIIC8gMikpIC8gKEJPQVJEX1dJRFRIIC8gMik7XG4gICAgY29uc3QgYW5nbGVUb0FkZCA9IE1hdGguUEkgLyA1O1xuICAgIGxldCBuZXh0QW5nbGUgPSBkZWx0YUNlbnRlclggKiBhbmdsZVRvQWRkICsgY3VycmVudEFuZ2xlO1xuICAgIGNvbnN0IHlPZmZzZXQgPSA1O1xuICAgIGlmIChuZXh0QW5nbGUgPCAtNSAqIE1hdGguUEkgLyA2KSB7XG4gICAgICAgIG5leHRBbmdsZSA9IC01ICogTWF0aC5QSSAvIDY7XG4gICAgfSBpZiAobmV4dEFuZ2xlID4gLU1hdGguUEkgLyA2KSB7XG4gICAgICAgIG5leHRBbmdsZSA9IC1NYXRoLlBJIC8gNlxuICAgIH1cblxuICAgIGJhbGwudmVsb2NpdHkueCA9IDUgKiBNYXRoLmNvcyhuZXh0QW5nbGUpO1xuICAgIGJhbGwudmVsb2NpdHkueSA9IDUgKiBNYXRoLnNpbihuZXh0QW5nbGUpO1xuICAgIGJhbGwucG9zaXRpb24ueSA9IGJvYXJkLnBvc2l0aW9uLnkgLSBCQUxMX0RJQU1FVEVSIC8gMiAtIHlPZmZzZXQ7XG59XG4iLCJpbXBvcnQgeyBCcmljayB9IGZyb20gXCIuLi9maWd1cmVzL2JyaWNrXCI7XG5pbXBvcnQgeyBWZWN0b3IgfSBmcm9tIFwiLi4vZ2VvbWV0cnkvdmVjdG9yXCI7XG5pbXBvcnQge1xuICBCUklDS1NfQ09MUyxcbiAgQlJJQ0tfUk9XUyxcbiAgSU5DUkVFTU5UX0RPV05fQlJJQ0ssXG4gIElOQ1JFTUVOVF9MRUZUX0JSSUNLLFxuICBJTklUSUFMX1NUQVJUX0JSSUNLX0xFRlQsXG4gIElOSVRJQUxfU1RBUlRfQlJJQ0tfUklHSFQsXG59IGZyb20gXCIuL2NvbnN0YW50c1wiO1xuXG5jb25zdCBicmlja3NJbWFnZSA9IFtcbiAgXCIvYXNzZXRzL2JyaWNrLWJsdWUucG5nXCIsXG4gIFwiL2Fzc2V0cy9icmljay1ncmVlbi5wbmdcIixcbiAgXCIvYXNzZXRzL2JyaWNrLXB1cnBsZS5wbmdcIixcbiAgXCIvYXNzZXRzL2JyaWNrLXJlZC5wbmdcIixcbiAgXCIvYXNzZXRzL2JyaWNrLXllbGxvdy5wbmdcIixcbl07XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVCcmlja3MoKTogQnJpY2tbXSB7XG4gIGxldCB4ID0gSU5JVElBTF9TVEFSVF9CUklDS19MRUZUO1xuICBsZXQgeSA9IElOSVRJQUxfU1RBUlRfQlJJQ0tfUklHSFQ7XG5cbiAgY29uc3QgYnJpY2tzOiBCcmlja1tdID0gW107XG5cbiAgZm9yIChsZXQgcm93ID0gMDsgcm93IDwgQlJJQ0tfUk9XUzsgcm93KyspIHtcbiAgICBmb3IgKGxldCBjb2wgPSAwOyBjb2wgPCBCUklDS1NfQ09MUzsgY29sKyspIHtcbiAgICAgIGNvbnN0IHBvczogVmVjdG9yID0gbmV3IFZlY3Rvcih4LCB5KTtcblxuICAgICAgY29uc3QgcmFuZFBvcyA9IChNYXRoLnJhbmRvbSgpICogYnJpY2tzSW1hZ2UubGVuZ3RoKSB8IDA7XG4gICAgICBjb25zdCBicmljayA9IG5ldyBCcmljayhwb3MsIGJyaWNrc0ltYWdlW3JhbmRQb3NdKTtcbiAgICAgIGJyaWNrcy5wdXNoKGJyaWNrKTtcbiAgICAgIHggKz0gSU5DUkVNRU5UX0xFRlRfQlJJQ0s7XG4gICAgfVxuXG4gICAgeCA9IElOSVRJQUxfU1RBUlRfQlJJQ0tfTEVGVDtcbiAgICB5ICs9IElOQ1JFRU1OVF9ET1dOX0JSSUNLO1xuICB9XG4gIHJldHVybiBicmlja3M7XG59XG4iLCIvLyBCUklDS1NcbmV4cG9ydCBjb25zdCBCUklDS19ST1dTID0gMztcbmV4cG9ydCBjb25zdCBCUklDS1NfQ09MUyA9IDEwO1xuZXhwb3J0IGNvbnN0IEJSSUNLX1dJRFRIID0gMTAwO1xuZXhwb3J0IGNvbnN0IEJSSUNLX0hFSUdIVCA9IDQwO1xuZXhwb3J0IGNvbnN0IElOSVRJQUxfU1RBUlRfQlJJQ0tfTEVGVCA9IDEwO1xuZXhwb3J0IGNvbnN0IElOSVRJQUxfU1RBUlRfQlJJQ0tfUklHSFQgPSAxMDtcbmV4cG9ydCBjb25zdCBJTkNSRU1FTlRfTEVGVF9CUklDSyA9IDEyMDtcbmV4cG9ydCBjb25zdCBJTkNSRUVNTlRfRE9XTl9CUklDSyA9IDYwO1xuZXhwb3J0IGNvbnN0IEJSSUNLU19FTkQgPSAxNzA7XG5cbi8vIEJPQVJEXG5leHBvcnQgY29uc3QgQk9BUkRfV0lEVEggPSAxMjA7XG5leHBvcnQgY29uc3QgQk9BUkRfSEVJR0hUID0gMjA7XG5cbi8vQkFMTFxuZXhwb3J0IGNvbnN0IEJBTExfV0lEVEggPSA0MDtcbmV4cG9ydCBjb25zdCBCQUxMX0hFSUdIVCA9IDQwO1xuZXhwb3J0IGNvbnN0IElOSVRJQUxfQkFMTF9YID0gMjAwO1xuZXhwb3J0IGNvbnN0IElOSVRJQUxfQkFMTF9ZID0gMjAwO1xuZXhwb3J0IGNvbnN0IEJBTExfRElBTUVURVIgPSA0MDtcblxuLy9NSVNDRUxMQU5FT1VTXG5leHBvcnQgY29uc3QgQlJJQ0tfQk9OVVNfUE9JTlRTID0gMTA7XG5cbi8vIEdBTUVcbmV4cG9ydCBjb25zdCBFQVNZX0xFVkVsID0gMztcbmV4cG9ydCBjb25zdCBNRURJVU1fTEVWRUwgPSA1O1xuZXhwb3J0IGNvbnN0IEhBUkRfTEVWRUwgPSA4O1xuXG5leHBvcnQgY29uc3QgU1RFUF9TSVpFID0gMjA7IiwiaW1wb3J0IHsgRUFTWV9MRVZFbCwgSEFSRF9MRVZFTCwgTUVESVVNX0xFVkVMIH0gZnJvbSBcIi4vY29uc3RhbnRzXCI7XG5pbXBvcnQgeyBET01WaWV3IH0gZnJvbSBcIi4uL3ZpZXcvRE9NVmlld1wiO1xuXG5jb25zdCBkb20gPSBET01WaWV3LmdldEluc3RhbmNlKCk7XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRHYW1lTGV2ZWwoaW5wdXQ6IEhUTUxJbnB1dEVsZW1lbnQpIHtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdpbnB1dCcpLmZvckVhY2goKGlucHV0KSA9PiB7XG4gICAgICAgIGlucHV0LmNoZWNrZWQgPSBmYWxzZTtcbiAgICB9KTtcbiAgICBpbnB1dC5jaGVja2VkID0gdHJ1ZTtcblxuICAgIHN3aXRjaCAoaW5wdXQuaWQpIHtcbiAgICAgICAgY2FzZSBcImVhc3lcIjpcbiAgICAgICAgICAgIHJldHVybiBFQVNZX0xFVkVsO1xuICAgICAgICBjYXNlIFwibWVkaXVtXCI6XG4gICAgICAgICAgICByZXR1cm4gTUVESVVNX0xFVkVMO1xuICAgICAgICBjYXNlIFwiaGFyZFwiOlxuICAgICAgICAgICAgcmV0dXJuIEhBUkRfTEVWRUw7XG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gc2hvd0dhbWVPdmVyTWVzc2FnZShzY29yZVBvaW50czogbnVtYmVyKSB7XG4gICAgY29uc3QgZ2FtZW92ZXJEaXYgPSBkb20uZ2V0RWxlbWVudChcIiNnYW1lT3ZlclwiKTtcblxuICAgIGdhbWVvdmVyRGl2LnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgKGdhbWVvdmVyRGl2IGFzIEhUTUxEaXZFbGVtZW50KS5pbm5lclRleHQgPSBgR2FtZSBvdmVyLCBzY29yZToke3Njb3JlUG9pbnRzfWA7XG4gIH0iLCJpbXBvcnQgeyBCYWxsIH0gZnJvbSBcIi4uL2ZpZ3VyZXMvYmFsbFwiO1xuaW1wb3J0IHsgQ2FudmFzVmlldyB9IGZyb20gXCIuLi92aWV3L2NhbnZhc1ZpZXdcIjtcbmltcG9ydCB7XG4gIEJBTExfRElBTUVURVIsXG4gIEJPQVJEX0hFSUdIVCxcbiAgQk9BUkRfV0lEVEgsXG4gIEJSSUNLU19FTkRcbn0gZnJvbSBcIi4vY29uc3RhbnRzXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0JhbGxIaXR0aW5nVGhlTGVmdFdhbGwoYmFsbDogQmFsbCkge1xuICByZXR1cm4gYmFsbC5wb3NpdGlvbi54IDw9IDA7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0JhbGxIaXR0aW5nUmlnaHRXYWxsKGJhbGwsIGNhbnZhc1ZpZXc6IENhbnZhc1ZpZXcpIHtcbiAgcmV0dXJuIGJhbGwucG9zaXRpb24ueCA+IGNhbnZhc1ZpZXcuY2FudmFzLndpZHRoIC0gQkFMTF9ESUFNRVRFUjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzQmFsbEhpdHRpbmdUaGVDZWlsaW5nKGJhbGw6IEJhbGwpIHtcbiAgcmV0dXJuIGJhbGwucG9zaXRpb24ueSA8PSAwO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNCYWxsSGl0dGluZ1RoZUZsb29yKGJhbGw6IEJhbGwsIGNhbnZhc1ZpZXc6IENhbnZhc1ZpZXcpIHtcbiAgcmV0dXJuIGJhbGwucG9zaXRpb24ueSA+PSBjYW52YXNWaWV3LmNhbnZhcy5oZWlnaHQgLSBCQUxMX0RJQU1FVEVSO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGlzQmFsbE5lYXJCcmlja3MoYmFsbDogQmFsbCkge1xuICByZXR1cm4gYmFsbC5wb3NpdGlvbi55IDwgQlJJQ0tTX0VORDtcbn1cbmV4cG9ydCBmdW5jdGlvbiBpc0JhbGxDb2xsaWRpbmdXaXRoQm9hcmQoYmFsbCwgYm9hcmQpIHtcbiAgcmV0dXJuIChcbiAgICBiYWxsLnBvc2l0aW9uLnkgKyBCQUxMX0RJQU1FVEVSIC8gMiA+PSBib2FyZC5wb3NpdGlvbi55ICYmXG4gICAgYmFsbC5wb3NpdGlvbi55ICsgQkFMTF9ESUFNRVRFUiAvIDIgPD0gYm9hcmQucG9zaXRpb24ueSArIDEwICYmXG4gICAgYmFsbC5wb3NpdGlvbi54IC0gQkFMTF9ESUFNRVRFUiAvIDIgPD0gYm9hcmQucG9zaXRpb24ueCArIEJPQVJEX1dJRFRIICYmXG4gICAgYmFsbC5wb3NpdGlvbi54ICsgQkFMTF9ESUFNRVRFUiAvIDIgPj0gYm9hcmQucG9zaXRpb24ueFxuICApO1xufSIsIlxuZXhwb3J0IHR5cGUgRE9NRWxlbWVudCA9IHN0cmluZyB8IE5vZGU7XG5cbmV4cG9ydCBpbnRlcmZhY2UgRE9NIHtcbiAgICBjcmVhdGVFbGVtZW50KHR5cGU6IHN0cmluZywgYXR0cmlidXRlczogb2JqZWN0LCAuLi5jb250ZW50OiBET01FbGVtZW50W10pOiBIVE1MRWxlbWVudDtcblxuICAgIGFkZEVsZW1lbnQoYXBwZW5kVG86IHN0cmluZywgZWxlbWVudDogSFRNTEVsZW1lbnQpOiB2b2lkO1xuXG4gICAgZ2V0RWxlbWVudChzZWxlY3Rvcjogc3RyaW5nKTogYW55O1xuXG4gICAgZGVsZXRlRWxlbWVudChzZWxlY3Rvcjogc3RyaW5nKTogdm9pZDtcbn1cblxuZXhwb3J0IGNsYXNzIERPTVZpZXcgaW1wbGVtZW50cyBET00ge1xuICAgIHByaXZhdGUgc3RhdGljIGluc3RhbmNlOiBET01WaWV3O1xuXG4gICAgcHJpdmF0ZSBjb25zdHJ1Y3RvcigpIHtcbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0SW5zdGFuY2UoKTogRE9NVmlldyB7XG4gICAgICAgIGlmICghdGhpcy5pbnN0YW5jZSkge1xuICAgICAgICAgICAgdGhpcy5pbnN0YW5jZSA9IG5ldyBET01WaWV3KCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICogVGhpcyBmdW5jdGlvbiBjYW5ub3QgY3JlYXRlIGEgdGFibGVcbiAgKiBAcGFyYW0geyBzdHJpbmcgfSB0eXBlXG4gICogQHBhcmFtIHsgT2JqZWN0IH0gYXR0cmlidXRlc1xuICAqIEBwYXJhbSAgeyAuLi4oc3RyaW5nIHwgTm9kZSkgfSBjb250ZW50IFxuICAqIEByZXR1cm5zIHsgSFRNTEVsZW1lbnQgfSBSZXR1cm5zIHRoZSBjcmVhdGVkIGVsZW1lbnRcbiAgKi9cbiAgICBjcmVhdGVFbGVtZW50KHR5cGU6IHN0cmluZywgYXR0cmlidXRlczogb2JqZWN0LCAuLi5jb250ZW50OiBET01FbGVtZW50W10pOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHR5cGUpO1xuXG4gICAgICAgIGlmIChhdHRyaWJ1dGVzKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBhdHRyaWJ1dGUgaW4gYXR0cmlidXRlcykge1xuICAgICAgICAgICAgICAgIGlmIChhdHRyaWJ1dGUuc3RhcnRzV2l0aCgnb24nKSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBldmVudE5hbWUgPSBhdHRyaWJ1dGUuc2xpY2UoMikudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgYXR0cmlidXRlc1thdHRyaWJ1dGVdKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBlbGVtZW50W2F0dHJpYnV0ZV0gPSBhdHRyaWJ1dGVzW2F0dHJpYnV0ZV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChsZXQgaXRlbSBvZiBjb250ZW50KSB7XG4gICAgICAgICAgICBlbGVtZW50LmFwcGVuZChpdGVtKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBlbGVtZW50O1xuICAgIH1cblxuICAgIGFkZEVsZW1lbnQoYXBwZW5kVG86IHN0cmluZywgZWxlbWVudDogSFRNTEVsZW1lbnQpIHtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihhcHBlbmRUbykuYXBwZW5kKGVsZW1lbnQpO1xuICAgIH1cblxuICAgIGdldEVsZW1lbnQoc2VsZWN0b3I6IHN0cmluZyk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgbGV0IHZhbHVlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3RvcikgYXMgSFRNTEVsZW1lbnQ7XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG4gICAgZGVsZXRlRWxlbWVudChzZWxlY3Rvcjogc3RyaW5nKSB7XG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcbiAgICAgICAgZWxlbWVudC5yZW1vdmUoKTtcbiAgICB9XG5cbiAgICBhZGRIYW5kbGVyKGV2ZW50OiBzdHJpbmcsIGNhbGxiYWNrOiBFdmVudExpc3RlbmVyLCBzZWxlY3Rvcj86IHN0cmluZykge1xuICAgICAgICBpZiAoc2VsZWN0b3IpIHtcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIGNhbGxiYWNrKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgY2FsbGJhY2spO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYWRkQmFja0J1dHRvbkhhbmRsZXIoKSB7XG4gICAgICAgIHRoaXMuYWRkSGFuZGxlcihcImNsaWNrXCIsICgpID0+IHsgdGhpcy5oaWRlU2V0dGluZ3NNZW51KCk7IH0sIFwiI2JhY2stYnRuXCIpO1xuICAgIH1cbiAgICBhZGRSaWdodENsaWNrSGFuZGxlcihjYWxsYmFjazogRXZlbnRMaXN0ZW5lcikge1xuICAgICAgICB3aW5kb3cub25jb250ZXh0bWVudSA9IGNhbGxiYWNrO1xuICAgIH1cbiAgICBzaG93SW5pdGlhbFNjcmVlbigpIHtcbiAgICAgICAgdGhpcy5nZXRFbGVtZW50KFwiI2NvbnRhaW5lclwiKS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgICB0aGlzLmdldEVsZW1lbnQoXCIjZ2FtZUNhbnZhc1wiKS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgIHRoaXMuZ2V0RWxlbWVudChcIiNkZXRhaWxzLWJveFwiKS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgIHRoaXMuZ2V0RWxlbWVudChcIiNnYW1lT3ZlclwiKS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCJcbiAgICB9XG4gICAgaW5pdEdhbWUoKSB7XG4gICAgICAgIHRoaXMuZ2V0RWxlbWVudChcIiNjb250YWluZXJcIikuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICB0aGlzLmdldEVsZW1lbnQoXCIjZ2FtZUNhbnZhc1wiKS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgICBjb25zdCBkZXRhaWxzQm94ID0gdGhpcy5nZXRFbGVtZW50KFwiI2RldGFpbHMtYm94XCIpO1xuICAgICAgICBkZXRhaWxzQm94LnN0eWxlLmRpc3BsYXkgPSBcImZsZXhcIjtcbiAgICAgICAgZGV0YWlsc0JveC5zdHlsZS5qdXN0aWZ5Q29udGVudCA9IFwic3BhY2UtYXJvdW5kXCI7XG4gICAgfVxuICAgIHNldFNjb3JlKHNjb3JlUG9pbnRzOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5nZXRFbGVtZW50KFwiI3Njb3JlXCIpLnRleHRDb250ZW50ID0gYFNjb3JlOiAke3Njb3JlUG9pbnRzLnRvU3RyaW5nKCl9YDtcbiAgICB9XG4gICAgc2V0TGl2ZXMobGl2ZXM6IG51bWJlcikge1xuICAgICAgICB0aGlzLmdldEVsZW1lbnQoXCIjbGlmZVwiKS5pbm5lclRleHQgPSBsaXZlcy50b1N0cmluZygpO1xuICAgIH1cbiAgICBzaG93TmV3R2FtZUJ1dHRvbigpIHtcbiAgICAgICAgKHRoaXMuZ2V0RWxlbWVudChcIiNuZXctZ2FtZVwiKSBhcyBIVE1MQnV0dG9uRWxlbWVudCkuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICB9XG4gICAgaGlkZU5ld0dhbWVCdXR0b24oKSB7XG4gICAgICAgICh0aGlzLmdldEVsZW1lbnQoXCIjbmV3LWdhbWVcIikgYXMgSFRNTEJ1dHRvbkVsZW1lbnQpLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICB9XG4gICAgZ2V0Qm9hcmRJbWFnZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RWxlbWVudChcIiNib2FyZFwiKSBhcyBIVE1MSW1hZ2VFbGVtZW50O1xuICAgIH1cbiAgICBzaG93U2V0dGluZ3NNZW51KCkge1xuICAgICAgICBjb25zdCBzZXR0aW5nc0NvbnRhaW5lciA9IHRoaXMuZ2V0RWxlbWVudChcIiNzZXR0aW5ncy1jb250YWluZXJcIik7XG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IHRoaXMuZ2V0RWxlbWVudChcIiNjb250YWluZXJcIik7XG4gICAgICAgIHNldHRpbmdzQ29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgICAgIGNvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgfVxuICAgIGhpZGVTZXR0aW5nc01lbnUoKSB7XG4gICAgICAgIGNvbnN0IHNldHRpbmdzQ29udGFpbmVyID0gdGhpcy5nZXRFbGVtZW50KFwiI3NldHRpbmdzLWNvbnRhaW5lclwiKTtcbiAgICAgICAgY29uc3QgY29udGFpbmVyID0gdGhpcy5nZXRFbGVtZW50KFwiI2NvbnRhaW5lclwiKTtcbiAgICAgICAgc2V0dGluZ3NDb250YWluZXIuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICBjb250YWluZXIuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICB9XG4gICAgc2hvd0ljb24oKSB7XG4gICAgICAgICh0aGlzLmdldEVsZW1lbnQoXCIuZ2ctY2hlY2tcIikgYXMgSFRNTEVsZW1lbnQpLnN0eWxlLmRpc3BsYXkgPVxuICAgICAgICAgICAgXCJibG9ja1wiO1xuICAgIH1cbiAgICBnZXRQbGF5QnV0dG9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRFbGVtZW50KFwiI3BsYXktYnRuXCIpO1xuICAgIH1cbiAgICBoaWRlR2FtZU92ZXJNZXNzYWdlKCkge1xuICAgICAgICB0aGlzLmdldEVsZW1lbnQoXCIjZ2FtZU92ZXJcIikuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgIH1cbn0iLCJpbXBvcnQgeyBWZWN0b3IgfSBmcm9tIFwiLi4vZ2VvbWV0cnkvdmVjdG9yXCI7XG5pbXBvcnQge1xuICBCUklDS19ST1dTLFxuICBCUklDS19XSURUSCxcbiAgQlJJQ0tfSEVJR0hULFxuICBCT0FSRF9XSURUSCxcbiAgQk9BUkRfSEVJR0hULFxuICBCQUxMX0RJQU1FVEVSLFxufSBmcm9tIFwiLi4vdXRpbHMvY29uc3RhbnRzXCI7XG5pbXBvcnQgeyBCYWxsIH0gZnJvbSBcIi4uL2ZpZ3VyZXMvYmFsbFwiO1xuaW1wb3J0IHsgQnJpY2sgfSBmcm9tIFwiLi4vZmlndXJlcy9icmlja1wiO1xuaW1wb3J0IHsgUGFkZGxlIH0gZnJvbSBcIi4uL2ZpZ3VyZXMvcGFkZGxlXCI7XG5cbmV4cG9ydCBjbGFzcyBDYW52YXNWaWV3IHtcbiAgcHJpdmF0ZSBjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRDtcbiAgcHVibGljIGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQ7XG5cbiAgY29uc3RydWN0b3IocHVibGljIGNhbnZhc1NlbGVjdG9yOiBzdHJpbmcpIHtcbiAgICB0aGlzLmNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGNhbnZhc1NlbGVjdG9yKSBhcyBIVE1MQ2FudmFzRWxlbWVudDtcbiAgICB0aGlzLmN0eCA9IHRoaXMuY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcbiAgfVxuXG4gIGRyYXdJbWFnZShcbiAgICBwb3NpdGlvbjogVmVjdG9yLFxuICAgIGltYWdlOiBIVE1MSW1hZ2VFbGVtZW50LFxuICAgIHdpZHRoOiBudW1iZXIsXG4gICAgaGVpZ2h0OiBudW1iZXJcbiAgKSB7XG4gICAgdGhpcy5jdHguZHJhd0ltYWdlKGltYWdlLCBwb3NpdGlvbi54LCBwb3NpdGlvbi55LCB3aWR0aCwgaGVpZ2h0KTtcbiAgfVxuXG4gIGRyYXdCcmlja3MoYnJpY2tzOiBCcmlja1tdKSB7XG4gICAgZm9yIChsZXQgciA9IDA7IHIgPCBCUklDS19ST1dTOyByKyspIHtcbiAgICAgIGZvciAobGV0IGMgPSAwOyBjIDwgYnJpY2tzLmxlbmd0aDsgYysrKSB7XG4gICAgICAgIGNvbnN0IGJyaWNrID0gYnJpY2tzW2NdO1xuICAgICAgICBjb25zdCBwb3M6IFZlY3RvciA9IG5ldyBWZWN0b3IoXG4gICAgICAgICAgYnJpY2sucG9zaXRpb24ueCxcbiAgICAgICAgICBicmljay5wb3NpdGlvbi55LFxuICAgICAgICApO1xuICAgICAgICB0aGlzLmRyYXdJbWFnZShwb3MsIGJyaWNrLmdldEltYWdlKCksIEJSSUNLX1dJRFRILCBCUklDS19IRUlHSFQpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGRyYXdCYWxsKGJhbGw6IEJhbGwpIHtcbiAgICB0aGlzLmRyYXdJbWFnZShcbiAgICAgIG5ldyBWZWN0b3IoYmFsbC5wb3NpdGlvbi54IC0gQkFMTF9ESUFNRVRFUiAvIDIsIGJhbGwucG9zaXRpb24ueSAtIEJBTExfRElBTUVURVIgLyAyKSxcbiAgICAgIGJhbGwuZ2V0SW1hZ2UoKSxcbiAgICAgIEJBTExfRElBTUVURVIsXG4gICAgICBCQUxMX0RJQU1FVEVSXG4gICAgKTtcbiAgfVxuXG4gIGRyYXdCb2FyZChib2FyZDogUGFkZGxlKSB7XG4gICAgdGhpcy5jdHguYmVnaW5QYXRoKCk7XG4gICAgdGhpcy5jdHguZHJhd0ltYWdlKFxuICAgICAgYm9hcmQuZ2V0SW1hZ2UoKSxcbiAgICAgIGJvYXJkLnBvc2l0aW9uLngsXG4gICAgICBib2FyZC5wb3NpdGlvbi55LFxuICAgICAgQk9BUkRfV0lEVEgsXG4gICAgICBCT0FSRF9IRUlHSFRcbiAgICApO1xuICAgIHRoaXMuY3R4LmNsb3NlUGF0aCgpO1xuICB9XG5cbiAgZ2V0Q29udGV4dCgpOiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQge1xuICAgIHJldHVybiB0aGlzLmN0eDtcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgY2FudmFzVmlldyA9IG5ldyBDYW52YXNWaWV3KFwiZ2FtZUNhbnZhc1wiKTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IENhbnZhc1ZpZXcgfSBmcm9tIFwiLi92aWV3L2NhbnZhc1ZpZXdcIjtcbmltcG9ydCB7IEdhbWUgfSBmcm9tIFwiLi9lbmdpbmUvZ2FtZUxvb3BcIjtcbmltcG9ydCB7IERPTVZpZXcgfSBmcm9tIFwiLi92aWV3L0RPTVZpZXdcIjtcblxuY29uc3QgY2FudmFzVmlldyA9IG5ldyBDYW52YXNWaWV3KFwiZ2FtZUNhbnZhc1wiKTtcbmNvbnN0IGRvbSA9IERPTVZpZXcuZ2V0SW5zdGFuY2UoKTtcbmxldCBsaXZlcyA9IDM7XG5sZXQgZ2FtZSA9IG5ldyBHYW1lKGNhbnZhc1ZpZXcsIGxpdmVzKTtcbmxldCBpc1BsYXlpbmdNdXNpYyA9IGZhbHNlO1xuXG5kb20uYWRkSGFuZGxlcihcImNsaWNrXCIsICgpID0+IHtcbiAgZ2FtZS5zdGFydEdhbWUoKTtcbiAgZG9tLmhpZGVHYW1lT3Zlck1lc3NhZ2UoKTtcbn0sIFwiI25ldy1nYW1lXCIpO1xuXG5kb20uYWRkSGFuZGxlcihcImNsaWNrXCIsICgpID0+IHtcbiAgZG9tLmluaXRHYW1lKCk7XG4gIGdhbWUubGl2ZXMgPSBsaXZlcztcbiAgZ2FtZS5zY29yZVBvaW50cyA9IDA7XG4gIGdhbWUuc3RhcnRHYW1lKCk7XG5cbiAgaWYgKGlzUGxheWluZ011c2ljKSB7XG4gICAgY29uc3QgbXVzaWMgPSBuZXcgQXVkaW8oXCIuLi9hc3NldHMvbXVzaWMubXAzXCIpO1xuICAgIG11c2ljLnZvbHVtZSA9IDAuMTtcbiAgICBtdXNpYy5wbGF5KCk7XG4gIH1cbn0sIFwiI3BsYXktYnRuXCIpO1xuXG5kb20uYWRkSGFuZGxlcihcImNsaWNrXCIsICgpID0+IHtcbiAgZG9tLnNob3dTZXR0aW5nc01lbnUoKTtcbiAgZG9tLmFkZEJhY2tCdXR0b25IYW5kbGVyKCk7XG4gIGRvbS5hZGRIYW5kbGVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIGlzUGxheWluZ011c2ljID0gdHJ1ZTtcbiAgICBkb20uc2hvd0ljb24oKTtcbiAgfSwgXCIjcGxheS1zb3VuZC1idG5cIik7XG59LCBcIiNzZXR0aW5nLWJ0blwiKTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=