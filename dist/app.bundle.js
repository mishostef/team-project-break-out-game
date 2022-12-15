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
class Ball {
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

/***/ "./src/figures/Board.ts":
/*!******************************!*\
  !*** ./src/figures/Board.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Board": () => (/* binding */ Board)
/* harmony export */ });
class Board {
    position;
    image;
    constructor(position, image) {
        this.position = position;
        this.image = image;
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

/***/ "./src/physics/movement.ts":
/*!*********************************!*\
  !*** ./src/physics/movement.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "changeBallDirection": () => (/* binding */ changeBallDirection)
/* harmony export */ });
/* harmony import */ var _utils_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/constants */ "./src/utils/constants.ts");

function changeBallDirection(ball, brick, ballVelocity) {
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
    if ((isBallComingFromButtomLeft && ballVelocity.x > 0) || (isBallComingFromButtomRight && ballVelocity.x < 0)) {
        ballVelocity.x *= -1;
    }
    else {
        ballVelocity.y *= -1;
    }
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
        this.ctx.drawImage(board.image, board.position.x, board.position.y, _utils_constants__WEBPACK_IMPORTED_MODULE_0__.BOARD_WIDTH, _utils_constants__WEBPACK_IMPORTED_MODULE_0__.BOARD_HEIGHT);
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
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "collisionDetector": () => (/* binding */ collisionDetector),
/* harmony export */   "gameLoop": () => (/* binding */ gameLoop),
/* harmony export */   "getHitBrickIndex": () => (/* binding */ getHitBrickIndex),
/* harmony export */   "handleBoardHit": () => (/* binding */ handleBoardHit),
/* harmony export */   "isBallCollidingWithBoard": () => (/* binding */ isBallCollidingWithBoard),
/* harmony export */   "isBallHittingBoardEdges": () => (/* binding */ isBallHittingBoardEdges),
/* harmony export */   "showGameOverMessage": () => (/* binding */ showGameOverMessage),
/* harmony export */   "update": () => (/* binding */ update)
/* harmony export */ });
/* harmony import */ var _engine_move__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./engine/move */ "./src/engine/move.ts");
/* harmony import */ var _figures_Ball__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./figures/Ball */ "./src/figures/Ball.ts");
/* harmony import */ var _figures_Board__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./figures/Board */ "./src/figures/Board.ts");
/* harmony import */ var _Geometry_Vector__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Geometry/Vector */ "./src/Geometry/Vector.ts");
/* harmony import */ var _physics_movement__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./physics/movement */ "./src/physics/movement.ts");
/* harmony import */ var _utils_brickFactory__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils/brickFactory */ "./src/utils/brickFactory.ts");
/* harmony import */ var _utils_constants__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./utils/constants */ "./src/utils/constants.ts");
/* harmony import */ var _utils_validators__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./utils/validators */ "./src/utils/validators.ts");
/* harmony import */ var _view_CanvasView__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./view/CanvasView */ "./src/view/CanvasView.ts");
//import { update } from "./engine/gameLoop";









const canvasView = new _view_CanvasView__WEBPACK_IMPORTED_MODULE_8__.CanvasView("gameCanvas");
let lastTime = 0;
let elapsed = 0;
const STEP_SIZE = 20;
const boardImg = document.getElementById('board');
const boardPosition = new _Geometry_Vector__WEBPACK_IMPORTED_MODULE_3__.Vector(canvasView.canvas.width / 2, canvasView.canvas.height - 100);
let bricks = (0,_utils_brickFactory__WEBPACK_IMPORTED_MODULE_5__.createBricks)();
let board = new _figures_Board__WEBPACK_IMPORTED_MODULE_2__.Board(boardPosition, boardImg);
let ball = new _figures_Ball__WEBPACK_IMPORTED_MODULE_1__.Ball({ x: _utils_constants__WEBPACK_IMPORTED_MODULE_6__.INITIAL_BALL_X, y: _utils_constants__WEBPACK_IMPORTED_MODULE_6__.INITIAL_BALL_Y }, "/assets/ball.png");
const input = {};
let ballVelocity = new _Geometry_Vector__WEBPACK_IMPORTED_MODULE_3__.Vector(3, 3);
let gameOver = false;
let scorePoints = 0;
let boardVelocity = new _Geometry_Vector__WEBPACK_IMPORTED_MODULE_3__.Vector(0, 0);
window.addEventListener('keydown', event => {
    input[event.code] = true;
});
window.addEventListener('keyup', event => {
    input[event.code] = false;
});
const playBtn = document.getElementById('play-btn');
let isPlayMusic = false;
document.getElementById("new-game").addEventListener("click", () => {
    gameOver = false;
    startGame();
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
    });
});
function startGame() {
    bricks = (0,_utils_brickFactory__WEBPACK_IMPORTED_MODULE_5__.createBricks)();
    board = new _figures_Board__WEBPACK_IMPORTED_MODULE_2__.Board(boardPosition, boardImg);
    ball = new _figures_Ball__WEBPACK_IMPORTED_MODULE_1__.Ball({ x: _utils_constants__WEBPACK_IMPORTED_MODULE_6__.INITIAL_BALL_X, y: _utils_constants__WEBPACK_IMPORTED_MODULE_6__.INITIAL_BALL_Y }, "/assets/ball.png");
    ballVelocity = new _Geometry_Vector__WEBPACK_IMPORTED_MODULE_3__.Vector(3, 3);
    update(performance.now());
}
function update(time) {
    const delta = time - lastTime;
    lastTime = time;
    elapsed += delta;
    let deleteBrickIndex = (0,_utils_validators__WEBPACK_IMPORTED_MODULE_7__.isBallNearBricks)(ball) ? getHitBrickIndex() : -1;
    if (deleteBrickIndex != -1) {
        const brick = bricks[deleteBrickIndex];
        (0,_physics_movement__WEBPACK_IMPORTED_MODULE_4__.changeBallDirection)(ball, brick, ballVelocity);
        // ballVelocity.y = -ballVelocity.y;
        bricks.splice(deleteBrickIndex, 1);
        scorePoints += _utils_constants__WEBPACK_IMPORTED_MODULE_6__.BRICK_BONUS_POINTS;
    }
    if (elapsed > STEP_SIZE * 5) {
        elapsed = STEP_SIZE * 5;
    }
    while (elapsed > STEP_SIZE) {
        elapsed -= STEP_SIZE;
        gameLoop();
        document["newgame"] = true;
    }
    if (bricks.length && !gameOver) {
        requestAnimationFrame(update);
    }
}
function gameLoop() {
    if (input['ArrowLeft'] && (board.position.x > 0)) {
        boardVelocity.x = -7;
        (0,_engine_move__WEBPACK_IMPORTED_MODULE_0__.move)(board, boardVelocity);
    }
    else if (input['ArrowRight'] && (board.position.x + _utils_constants__WEBPACK_IMPORTED_MODULE_6__.BOARD_WIDTH < canvasView.canvas.width)) {
        boardVelocity.x = 7;
        (0,_engine_move__WEBPACK_IMPORTED_MODULE_0__.move)(board, boardVelocity);
    }
    canvasView.getContext().clearRect(0, 0, canvasView.canvas.width, canvasView.canvas.height);
    canvasView.drawBricks(bricks);
    canvasView.drawBoard(board);
    canvasView.drawBall(ball);
    collisionDetector();
    (0,_engine_move__WEBPACK_IMPORTED_MODULE_0__.move)(ball, ballVelocity);
}
function collisionDetector() {
    if (isBallCollidingWithBoard()) {
        handleBoardHit(ball);
    }
    if ((0,_utils_validators__WEBPACK_IMPORTED_MODULE_7__.isBallHittingTheFloor)(ball, canvasView)) {
        gameOver = true;
        showGameOverMessage();
    }
    else if ((0,_utils_validators__WEBPACK_IMPORTED_MODULE_7__.isBallHittingTheCeiling)(ball)) {
        ballVelocity.y = Math.abs(ballVelocity.y);
    }
    else if ((0,_utils_validators__WEBPACK_IMPORTED_MODULE_7__.isBallHittingRightWall)(ball, canvasView)) {
        ballVelocity.x = -ballVelocity.x;
    }
    else if ((0,_utils_validators__WEBPACK_IMPORTED_MODULE_7__.isBallHittingTheLeftWall)(ball)) {
        ballVelocity.x = Math.abs(ballVelocity.x);
    }
}
function showGameOverMessage() {
    const gameoverDiv = document.getElementById("gameOver");
    gameoverDiv.style.display = "block";
    gameoverDiv.innerText = `Game over, score:${scorePoints}`;
}
function handleBoardHit(ball) {
    const currentAngle = Math.atan2(ball.position.y, ball.position.x);
    const coeff = (ball.position.x) / (_utils_constants__WEBPACK_IMPORTED_MODULE_6__.BOARD_WIDTH / 2);
    const angleToAdd = Math.PI / 20;
    const nextAngle = coeff * angleToAdd + currentAngle;
    const yOffset = 5;
    if (nextAngle < Math.PI / 3) {
        ballVelocity.x = Math.sin(nextAngle);
        ballVelocity.y = Math.cos(nextAngle);
    }
    else {
        ballVelocity.y = -ballVelocity.y;
    }
    ball.position.y -= yOffset;
}
function isBallHittingBoardEdges(ball, board) {
    return (ball.position.x <= board.position.x + _utils_constants__WEBPACK_IMPORTED_MODULE_6__.BOARD_WIDTH
        || ball.position.x >= board.position.x - _utils_constants__WEBPACK_IMPORTED_MODULE_6__.BALL_DIAMETER);
}
function getHitBrickIndex() {
    return bricks.findIndex(brick => {
        const left = brick.position.x - _utils_constants__WEBPACK_IMPORTED_MODULE_6__.BALL_DIAMETER / 2;
        const right = brick.position.x + _utils_constants__WEBPACK_IMPORTED_MODULE_6__.BRICK_WIDTH + _utils_constants__WEBPACK_IMPORTED_MODULE_6__.BALL_DIAMETER / 2;
        const top = brick.position.y - _utils_constants__WEBPACK_IMPORTED_MODULE_6__.BALL_DIAMETER / 2;
        const bottom = brick.position.y + _utils_constants__WEBPACK_IMPORTED_MODULE_6__.BRICK_HEIGHT + _utils_constants__WEBPACK_IMPORTED_MODULE_6__.BALL_DIAMETER / 2;
        return ((ball.position.x >= left)
            && (ball.position.x <= right)
            && (ball.position.y >= top)
            && (ball.position.y <= bottom));
    });
}
function isBallCollidingWithBoard() {
    console.log(ball.position.y + _utils_constants__WEBPACK_IMPORTED_MODULE_6__.BALL_DIAMETER / 2 <= board.position.y + _utils_constants__WEBPACK_IMPORTED_MODULE_6__.BOARD_HEIGHT);
    console.log(ball.position.y + _utils_constants__WEBPACK_IMPORTED_MODULE_6__.BALL_DIAMETER / 2 >= board.position.y);
    console.log(ball.position.x <= board.position.x + _utils_constants__WEBPACK_IMPORTED_MODULE_6__.BOARD_WIDTH);
    console.log(ball.position.x >= board.position.x - _utils_constants__WEBPACK_IMPORTED_MODULE_6__.BALL_DIAMETER);
    return ((ball.position.y + _utils_constants__WEBPACK_IMPORTED_MODULE_6__.BALL_DIAMETER / 2 <= board.position.y)
        && (ball.position.y + _utils_constants__WEBPACK_IMPORTED_MODULE_6__.BALL_DIAMETER / 2 >= board.position.y - 20)
        && (ball.position.x - 3 * _utils_constants__WEBPACK_IMPORTED_MODULE_6__.BALL_DIAMETER / 4 <= board.position.x + _utils_constants__WEBPACK_IMPORTED_MODULE_6__.BOARD_WIDTH)
        && (ball.position.x + 3 * _utils_constants__WEBPACK_IMPORTED_MODULE_6__.BALL_DIAMETER / 4 >= board.position.x));
}

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LENBQUMsSUFBSSxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRywyREFBYSxDQUFDLENBQUM7SUFDakUsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsMkRBQWEsR0FBRyxDQUFDLElBQUksS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7V0FDMUQsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRywyREFBYSxHQUFHLENBQUMsSUFBSSxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7V0FDOUQsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsMkRBQWEsR0FBRyxDQUFDLElBQUksS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcseURBQVcsQ0FBQztXQUMzRSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRywyREFBYSxHQUFHLENBQUMsSUFBSSxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDMUUsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2J1ZGdldGVlci10cy8uL3NyYy9HZW9tZXRyeS9WZWN0b3IudHMiLCJ3ZWJwYWNrOi8vYnVkZ2V0ZWVyLXRzLy4vc3JjL2VuZ2luZS9tb3ZlLnRzIiwid2VicGFjazovL2J1ZGdldGVlci10cy8uL3NyYy9maWd1cmVzL0JhbGwudHMiLCJ3ZWJwYWNrOi8vYnVkZ2V0ZWVyLXRzLy4vc3JjL2ZpZ3VyZXMvQm9hcmQudHMiLCJ3ZWJwYWNrOi8vYnVkZ2V0ZWVyLXRzLy4vc3JjL2ZpZ3VyZXMvQnJpY2sudHMiLCJ3ZWJwYWNrOi8vYnVkZ2V0ZWVyLXRzLy4vc3JjL3BoeXNpY3MvbW92ZW1lbnQudHMiLCJ3ZWJwYWNrOi8vYnVkZ2V0ZWVyLXRzLy4vc3JjL3V0aWxzL2JyaWNrRmFjdG9yeS50cyIsIndlYnBhY2s6Ly9idWRnZXRlZXItdHMvLi9zcmMvdXRpbHMvY29uc3RhbnRzLnRzIiwid2VicGFjazovL2J1ZGdldGVlci10cy8uL3NyYy91dGlscy92YWxpZGF0b3JzLnRzIiwid2VicGFjazovL2J1ZGdldGVlci10cy8uL3NyYy92aWV3L0NhbnZhc1ZpZXcudHMiLCJ3ZWJwYWNrOi8vYnVkZ2V0ZWVyLXRzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2J1ZGdldGVlci10cy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYnVkZ2V0ZWVyLXRzL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYnVkZ2V0ZWVyLXRzL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYnVkZ2V0ZWVyLXRzLy4vc3JjL2FwcC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQb2ludCB9IGZyb20gXCIuL0ludGVyZmFjZXNcIjtcblxuZXhwb3J0IGNsYXNzIFZlY3RvciBpbXBsZW1lbnRzIFBvaW50IHtcbiAgICB4OiBudW1iZXI7XG4gICAgeTogbnVtYmVyO1xuXG4gICAgY29uc3RydWN0b3IocDogUG9pbnQpXG4gICAgY29uc3RydWN0b3IoeDogbnVtYmVyLCB5OiBudW1iZXIpXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHhPclBvaW50OiBudW1iZXIgfCBQb2ludCxcbiAgICAgICAgeT86IG51bWJlclxuICAgICkge1xuICAgICAgICBpZiAodHlwZW9mIHhPclBvaW50ID09ICdudW1iZXInICYmIHR5cGVvZiB5ID09ICdudW1iZXInKSB7XG4gICAgICAgICAgICB0aGlzLnggPSB4T3JQb2ludDtcbiAgICAgICAgICAgIHRoaXMueSA9IHk7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHhPclBvaW50ID09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICB0aGlzLnggPSB4T3JQb2ludC54O1xuICAgICAgICAgICAgdGhpcy55ID0geE9yUG9pbnQueTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFkZChwOiBQb2ludCkge1xuICAgICAgICB0aGlzLnggKz0gcC54O1xuICAgICAgICB0aGlzLnkgKz0gcC55O1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBzY2FsZShzOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy54ICo9IHM7XG4gICAgICAgIHRoaXMueSAqPSBzO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGRpc3QocDogUG9pbnQpIHtcbiAgICAgICAgY29uc3QgZHggPSB0aGlzLnggLSBwLng7XG4gICAgICAgIGNvbnN0IGR5ID0gdGhpcy55IC0gcC55O1xuICAgICAgICByZXR1cm4gTWF0aC5zcXJ0KGR4ICoqIDIgKyBkeSAqKiAyKTtcbiAgICB9XG5cbiAgICBzcUxlbmd0aCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMueCAqKiAyICsgdGhpcy55ICoqIDI7XG4gICAgfVxuXG4gICAgc3RhdGljIGFkZChwMTogUG9pbnQsIHAyOiBQb2ludCkge1xuICAgICAgICByZXR1cm4gbmV3IFZlY3RvcihwMS54ICsgcDIueCwgcDEueSArIHAyLnkpO1xuICAgIH1cbn0iLCJpbXBvcnQgeyBWZWN0b3IgfSBmcm9tIFwiLi4vdXRpbHMvdmVjdG9yXCI7XG5cblxuZXhwb3J0IGZ1bmN0aW9uIG1vdmUoZ2FtZU9iamVjdDogR2FtZU9iamVjdCwgdmVsb2NpdHk6IFZlY3Rvcikge1xuICAgIGdhbWVPYmplY3QucG9zaXRpb24ueCArPSB2ZWxvY2l0eS54O1xuICAgIGdhbWVPYmplY3QucG9zaXRpb24ueSArPSB2ZWxvY2l0eS55O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEdhbWVPYmplY3Qge1xuICAgIHBvc2l0aW9uOiB7IHg6IG51bWJlciwgeTogbnVtYmVyIH1cbn0iLCJpbXBvcnQgeyBWZWN0b3IgfSBmcm9tIFwiLi4vdXRpbHMvdmVjdG9yXCI7XG5cbmV4cG9ydCBjbGFzcyBCYWxsIHtcbiAgICBwcml2YXRlIGltYWdlOiBIVE1MSW1hZ2VFbGVtZW50ID0gbmV3IEltYWdlKCk7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIHBvc2l0aW9uOiBWZWN0b3IsXG4gICAgICAgIGltYWdlOiBzdHJpbmdcbiAgICApIHtcbiAgICAgICAgdGhpcy5pbWFnZS5zcmMgPSBpbWFnZTtcbiAgICB9XG5cbiAgICBnZXRJbWFnZSgpOiBIVE1MSW1hZ2VFbGVtZW50IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaW1hZ2U7XG4gICAgfVxufSIsImltcG9ydCB7IFZlY3RvciB9IGZyb20gXCIuLi91dGlscy92ZWN0b3JcIjtcbmV4cG9ydCBjbGFzcyBCb2FyZCB7XG4gICAgY29uc3RydWN0b3IocHVibGljIHBvc2l0aW9uOiBWZWN0b3IsIHB1YmxpYyBpbWFnZTogSFRNTEltYWdlRWxlbWVudCkgeyB9XG59IiwiaW1wb3J0IHsgVmVjdG9yIH0gZnJvbSBcIi4uL3V0aWxzL3ZlY3RvclwiO1xuXG5leHBvcnQgY2xhc3MgQnJpY2sge1xuICAgIHByaXZhdGUgaW1hZ2U6IEhUTUxJbWFnZUVsZW1lbnQgPSBuZXcgSW1hZ2UoKTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwdWJsaWMgcG9zaXRpb246IFZlY3RvcixcbiAgICAgICAgaW1hZ2U6IHN0cmluZ1xuICAgICkge1xuICAgICAgICB0aGlzLmltYWdlLnNyYyA9IGltYWdlO1xuICAgIH1cblxuICAgIGdldEltYWdlKCk6IEhUTUxJbWFnZUVsZW1lbnQge1xuICAgICAgICByZXR1cm4gdGhpcy5pbWFnZTtcbiAgICB9XG59IiwiaW1wb3J0IHsgQmFsbCB9IGZyb20gXCIuLi9maWd1cmVzL0JhbGxcIjtcbmltcG9ydCB7IEJyaWNrIH0gZnJvbSBcIi4uL2ZpZ3VyZXMvQnJpY2tcIjtcbmltcG9ydCB7IEJSSUNLX0hFSUdIVCwgQlJJQ0tfV0lEVEgsIEJBTExfRElBTUVURVIgfSBmcm9tIFwiLi4vdXRpbHMvY29uc3RhbnRzXCI7XG5pbXBvcnQgeyBWZWN0b3IgfSBmcm9tIFwiLi4vdXRpbHMvdmVjdG9yXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBjaGFuZ2VCYWxsRGlyZWN0aW9uKGJhbGw6IEJhbGwsIGJyaWNrOiBCcmljaywgYmFsbFZlbG9jaXR5OiBWZWN0b3IpIHtcbiAgICBjb25zdCBCUklDS19ESUFHT05BTCA9IE1hdGguc3FydChCUklDS19IRUlHSFQgKiogMiArIEJSSUNLX1dJRFRIICoqIDIpO1xuICAgIGNvbnN0IGJyaWNrQ2VudGVyWCA9IGJyaWNrLnBvc2l0aW9uLnggKyBCUklDS19XSURUSCAvIDI7XG4gICAgY29uc3QgYnJpY2tDZW50ZXJZID0gYnJpY2sucG9zaXRpb24ueSArIEJSSUNLX0hFSUdIVCAvIDI7XG4gICAgY29uc3QgYmFsbENlbnRlclggPSBiYWxsLnBvc2l0aW9uLnggKyBCQUxMX0RJQU1FVEVSIC8gMjtcbiAgICBjb25zdCBiYWxsQ2VudGVyWSA9IGJhbGwucG9zaXRpb24ueSArIEJBTExfRElBTUVURVIgLyAyO1xuICAgIGNvbnN0IGRlbHRhWSA9IChCUklDS19IRUlHSFQgKiBCQUxMX0RJQU1FVEVSIC8gMikgLyBCUklDS19ESUFHT05BTDtcbiAgICBjb25zdCBkZWx0YVggPSAoQlJJQ0tfV0lEVEggKiBCQUxMX0RJQU1FVEVSIC8gMikgLyBCUklDS19ESUFHT05BTDtcbiAgICBjb25zdCBtaW5ZU2lkZUhpdCA9IGJyaWNrLnBvc2l0aW9uLnkgKyBkZWx0YVk7XG4gICAgY29uc3QgbWF4WVNpZGVIaXQgPSBicmljay5wb3NpdGlvbi55ICsgQlJJQ0tfSEVJR0hUIC0gZGVsdGFZO1xuICAgIGNvbnN0IG1pbkxlZnRYU2lkZUhpdCA9IGJyaWNrLnBvc2l0aW9uLnggLSBkZWx0YVg7XG4gICAgY29uc3QgbWF4TGVmdFhTaWRlSGl0ID0gYnJpY2sucG9zaXRpb24ueCArIGRlbHRhWDtcbiAgICBjb25zdCBpc0JhbGxDb21pbmdGcm9tQnV0dG9tTGVmdCA9ICgoYmFsbENlbnRlclggPiBtaW5MZWZ0WFNpZGVIaXQpXG4gICAgICAgICYmIChiYWxsQ2VudGVyWCA8IG1heExlZnRYU2lkZUhpdClcbiAgICAgICAgJiYgKGJhbGxDZW50ZXJZID4gbWluWVNpZGVIaXQpXG4gICAgICAgICYmIChiYWxsQ2VudGVyWSA8IG1heFlTaWRlSGl0KSk7XG4gICAgY29uc3QgaXNCYWxsQ29taW5nRnJvbUJ1dHRvbVJpZ2h0ID0gKChiYWxsQ2VudGVyWCA+IG1pbkxlZnRYU2lkZUhpdCArIEJSSUNLX1dJRFRIKVxuICAgICAgICAmJiAoYmFsbENlbnRlclggPCBtYXhMZWZ0WFNpZGVIaXQgKyBCUklDS19XSURUSClcbiAgICAgICAgJiYgKGJhbGxDZW50ZXJZID4gbWluWVNpZGVIaXQpXG4gICAgICAgICYmIChiYWxsQ2VudGVyWSA8IG1heFlTaWRlSGl0KSk7XG4gICAgaWYgKChpc0JhbGxDb21pbmdGcm9tQnV0dG9tTGVmdCAmJiBiYWxsVmVsb2NpdHkueCA+IDApIHx8IChpc0JhbGxDb21pbmdGcm9tQnV0dG9tUmlnaHQgJiYgYmFsbFZlbG9jaXR5LnggPCAwKSkge1xuICAgICAgICBiYWxsVmVsb2NpdHkueCAqPSAtMTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBiYWxsVmVsb2NpdHkueSAqPSAtMTtcbiAgICB9XG5cbn0iLCJpbXBvcnQgeyBCcmljayB9IGZyb20gXCIuLi9maWd1cmVzL0JyaWNrXCI7XG5pbXBvcnQge1xuICAgIEJSSUNLU19DT0xTLFxuICAgIEJSSUNLX1JPV1MsXG4gICAgSU5DUkVFTU5UX0RPV05fQlJJQ0ssXG4gICAgSU5DUkVNRU5UX0xFRlRfQlJJQ0ssXG4gICAgSU5JVElBTF9TVEFSVF9CUklDS19MRUZULFxuICAgIElOSVRJQUxfU1RBUlRfQlJJQ0tfUklHSFRcbn0gZnJvbSBcIi4vY29uc3RhbnRzXCI7XG5cbmltcG9ydCB7IFZlY3RvciB9IGZyb20gXCIuL3ZlY3RvclwiO1xuXG5jb25zdCBicmlja3NJbWFnZSA9IFtcbiAgICBcIi9hc3NldHMvYnJpY2stYmx1ZS5wbmdcIixcbiAgICBcIi9hc3NldHMvYnJpY2stZ3JlZW4ucG5nXCIsXG4gICAgXCIvYXNzZXRzL2JyaWNrLXB1cnBsZS5wbmdcIixcbiAgICBcIi9hc3NldHMvYnJpY2stcmVkLnBuZ1wiLFxuICAgIFwiL2Fzc2V0cy9icmljay15ZWxsb3cucG5nXCJcbl1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUJyaWNrcygpOiBCcmlja1tdIHtcbiAgICBsZXQgeCA9IElOSVRJQUxfU1RBUlRfQlJJQ0tfTEVGVDtcbiAgICBsZXQgeSA9IElOSVRJQUxfU1RBUlRfQlJJQ0tfUklHSFQ7XG5cbiAgICBjb25zdCBicmlja3M6IEJyaWNrW10gPSBbXTtcblxuICAgIGZvciAobGV0IHJvdyA9IDA7IHJvdyA8IEJSSUNLX1JPV1M7IHJvdysrKSB7XG4gICAgICAgIGZvciAobGV0IGNvbCA9IDA7IGNvbCA8IEJSSUNLU19DT0xTOyBjb2wrKykge1xuICAgICAgICAgICAgY29uc3QgcG9zOiBWZWN0b3IgPSB7IHgsIHkgfTtcblxuICAgICAgICAgICAgY29uc3QgcmFuZFBvcyA9IE1hdGgucmFuZG9tKCkgKiBicmlja3NJbWFnZS5sZW5ndGggfCAwO1xuICAgICAgICAgICAgY29uc3QgYnJpY2sgPSBuZXcgQnJpY2socG9zLCBicmlja3NJbWFnZVtyYW5kUG9zXSlcbiAgICAgICAgICAgIGJyaWNrcy5wdXNoKGJyaWNrKTtcbiAgICAgICAgICAgIHggKz0gSU5DUkVNRU5UX0xFRlRfQlJJQ0s7XG4gICAgICAgIH1cbiAgICBcbiAgICAgICAgeCA9IElOSVRJQUxfU1RBUlRfQlJJQ0tfTEVGVDtcbiAgICAgICAgeSArPSBJTkNSRUVNTlRfRE9XTl9CUklDSztcbiAgICB9XG4gICAgcmV0dXJuIGJyaWNrcztcbn0iLCJcbi8vIEJSSUNLU1xuZXhwb3J0IGNvbnN0IEJSSUNLX1JPV1MgPSAzO1xuZXhwb3J0IGNvbnN0IEJSSUNLU19DT0xTID0gMTA7XG5leHBvcnQgY29uc3QgQlJJQ0tfV0lEVEggPSAxMDA7XG5leHBvcnQgY29uc3QgQlJJQ0tfSEVJR0hUID0gNDA7XG5leHBvcnQgY29uc3QgSU5JVElBTF9TVEFSVF9CUklDS19MRUZUID0gMTA7XG5leHBvcnQgY29uc3QgSU5JVElBTF9TVEFSVF9CUklDS19SSUdIVCA9IDEwO1xuZXhwb3J0IGNvbnN0IElOQ1JFTUVOVF9MRUZUX0JSSUNLID0gMTIwO1xuZXhwb3J0IGNvbnN0IElOQ1JFRU1OVF9ET1dOX0JSSUNLID0gNjA7XG5leHBvcnQgY29uc3QgQlJJQ0tTX0VORCA9IDE3MDtcblxuLy8gQk9BUkRcbmV4cG9ydCBjb25zdCBCT0FSRF9XSURUSCA9IDEyMDtcbmV4cG9ydCBjb25zdCBCT0FSRF9IRUlHSFQgPSAyMDtcblxuLy9CQUxMXG5leHBvcnQgY29uc3QgQkFMTF9XSURUSCA9IDQwO1xuZXhwb3J0IGNvbnN0IEJBTExfSEVJR0hUID0gNDA7XG5leHBvcnQgY29uc3QgSU5JVElBTF9CQUxMX1ggPSAyMDA7XG5leHBvcnQgY29uc3QgSU5JVElBTF9CQUxMX1kgPSAyMDA7XG5leHBvcnQgY29uc3QgQkFMTF9ESUFNRVRFUiA9IDQwO1xuXG4vL01JU0NFTExBTkVPVVNcbmV4cG9ydCBjb25zdCBCUklDS19CT05VU19QT0lOVFMgPSAxMDsiLCJpbXBvcnQgeyBCYWxsIH0gZnJvbSBcIi4uL2ZpZ3VyZXMvQmFsbFwiO1xuaW1wb3J0IHsgQm9hcmQgfSBmcm9tIFwiLi4vZmlndXJlcy9Cb2FyZFwiO1xuaW1wb3J0IHsgQ2FudmFzVmlldyB9IGZyb20gXCIuLi92aWV3L0NhbnZhc1ZpZXdcIjtcbmltcG9ydCB7IEJBTExfRElBTUVURVIsIEJSSUNLU19FTkQsIEJSSUNLX1dJRFRIIH0gZnJvbSBcIi4vY29uc3RhbnRzXCI7XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGlzQmFsbEhpdHRpbmdUaGVMZWZ0V2FsbChiYWxsOiBCYWxsKSB7XG4gICAgcmV0dXJuIGJhbGwucG9zaXRpb24ueCA8PSAwO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNCYWxsSGl0dGluZ1JpZ2h0V2FsbChiYWxsLCBjYW52YXNWaWV3OiBDYW52YXNWaWV3KSB7XG4gICAgcmV0dXJuIGJhbGwucG9zaXRpb24ueCA+IGNhbnZhc1ZpZXcuY2FudmFzLndpZHRoIC0gQkFMTF9ESUFNRVRFUjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzQmFsbEhpdHRpbmdUaGVDZWlsaW5nKGJhbGw6IEJhbGwpIHtcbiAgICByZXR1cm4gYmFsbC5wb3NpdGlvbi55IDw9IDA7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0JhbGxIaXR0aW5nVGhlRmxvb3IoYmFsbDogQmFsbCwgY2FudmFzVmlldzogQ2FudmFzVmlldykge1xuICAgIHJldHVybiBiYWxsLnBvc2l0aW9uLnkgPj0gY2FudmFzVmlldy5jYW52YXMuaGVpZ2h0IC0gQkFMTF9ESUFNRVRFUjtcbn1cbmV4cG9ydCBmdW5jdGlvbiBpc0JhbGxOZWFyQnJpY2tzKGJhbGw6IEJhbGwpIHtcbiAgICByZXR1cm4gKGJhbGwucG9zaXRpb24ueSA8IEJSSUNLU19FTkQpO1xufSIsImltcG9ydCB7IFZlY3RvciB9IGZyb20gXCIuLi91dGlscy92ZWN0b3JcIjtcbmltcG9ydCB7XG4gICAgQlJJQ0tfUk9XUyxcbiAgICBCUklDS19XSURUSCxcbiAgICBCUklDS19IRUlHSFQsXG4gICAgQk9BUkRfV0lEVEgsXG4gICAgQk9BUkRfSEVJR0hULFxuICAgIEJBTExfRElBTUVURVIsXG59IGZyb20gXCIuLi91dGlscy9jb25zdGFudHNcIjtcbmltcG9ydCB7IEJhbGwgfSBmcm9tIFwiLi4vZmlndXJlcy9CYWxsXCI7XG5pbXBvcnQgeyBCcmljayB9IGZyb20gXCIuLi9maWd1cmVzL0JyaWNrXCI7XG5pbXBvcnQgeyBCb2FyZCB9IGZyb20gXCIuLi9maWd1cmVzL0JvYXJkXCI7XG5cbmV4cG9ydCBjbGFzcyBDYW52YXNWaWV3IHtcbiAgICBwcml2YXRlIGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEO1xuICAgIHB1YmxpYyBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50O1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHB1YmxpYyBjYW52YXNTZWxlY3Rvcjogc3RyaW5nLFxuICAgICkge1xuICAgICAgICB0aGlzLmNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGNhbnZhc1NlbGVjdG9yKSBhcyBIVE1MQ2FudmFzRWxlbWVudDtcbiAgICAgICAgdGhpcy5jdHggPSB0aGlzLmNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuICAgIH1cblxuICAgIGRyYXdJbWFnZShwb3NpdGlvbjogVmVjdG9yLCBpbWFnZTogSFRNTEltYWdlRWxlbWVudCwgd2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5jdHguZHJhd0ltYWdlKGltYWdlLCBwb3NpdGlvbi54LCBwb3NpdGlvbi55LCB3aWR0aCwgaGVpZ2h0KTtcbiAgICB9XG5cbiAgICBkcmF3QnJpY2tzKGJyaWNrczogQnJpY2tbXSkge1xuICAgICAgICBmb3IgKGxldCByID0gMDsgciA8IEJSSUNLX1JPV1M7IHIrKykge1xuICAgICAgICAgICAgZm9yIChsZXQgYyA9IDA7IGMgPCBicmlja3MubGVuZ3RoOyBjKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBicmljayA9IGJyaWNrc1tjXTtcbiAgICAgICAgICAgICAgICBjb25zdCBwb3M6IFZlY3RvciA9IHtcbiAgICAgICAgICAgICAgICAgICAgeDogYnJpY2sucG9zaXRpb24ueCxcbiAgICAgICAgICAgICAgICAgICAgeTogYnJpY2sucG9zaXRpb24ueVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLmRyYXdJbWFnZShwb3MsIGJyaWNrLmdldEltYWdlKCksIEJSSUNLX1dJRFRILCBCUklDS19IRUlHSFQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZHJhd0JhbGwoYmFsbDogQmFsbCkge1xuICAgICAgICB0aGlzLmRyYXdJbWFnZShiYWxsLnBvc2l0aW9uLCBiYWxsLmdldEltYWdlKCksIEJBTExfRElBTUVURVIsIEJBTExfRElBTUVURVIpO1xuICAgIH1cblxuICAgIGRyYXdCb2FyZChib2FyZDogQm9hcmQpIHtcbiAgICAgICAgdGhpcy5jdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIHRoaXMuY3R4LmRyYXdJbWFnZShib2FyZC5pbWFnZSwgYm9hcmQucG9zaXRpb24ueCwgYm9hcmQucG9zaXRpb24ueSwgQk9BUkRfV0lEVEgsIEJPQVJEX0hFSUdIVCk7XG4gICAgICAgIHRoaXMuY3R4LmNsb3NlUGF0aCgpO1xuICAgIH1cblxuICAgIGdldENvbnRleHQoKTogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY3R4O1xuICAgIH1cbn0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIlxuLy9pbXBvcnQgeyB1cGRhdGUgfSBmcm9tIFwiLi9lbmdpbmUvZ2FtZUxvb3BcIjtcblxuaW1wb3J0IHsgbW92ZSB9IGZyb20gXCIuL2VuZ2luZS9tb3ZlXCI7XG5pbXBvcnQgeyBCYWxsIH0gZnJvbSBcIi4vZmlndXJlcy9CYWxsXCI7XG5pbXBvcnQgeyBCb2FyZCB9IGZyb20gXCIuL2ZpZ3VyZXMvQm9hcmRcIjtcbmltcG9ydCB7IEJyaWNrIH0gZnJvbSBcIi4vZmlndXJlcy9Ccmlja1wiO1xuaW1wb3J0IHsgVmVjdG9yIH0gZnJvbSBcIi4vR2VvbWV0cnkvVmVjdG9yXCI7XG5pbXBvcnQgeyBjaGFuZ2VCYWxsRGlyZWN0aW9uIH0gZnJvbSBcIi4vcGh5c2ljcy9tb3ZlbWVudFwiO1xuaW1wb3J0IHsgY3JlYXRlQnJpY2tzIH0gZnJvbSBcIi4vdXRpbHMvYnJpY2tGYWN0b3J5XCI7XG5pbXBvcnQge1xuICAgIElOSVRJQUxfQkFMTF9YLCBJTklUSUFMX0JBTExfWSwgQlJJQ0tfQk9OVVNfUE9JTlRTLFxuICAgIEJPQVJEX1dJRFRILCBCQUxMX0RJQU1FVEVSLCBCUklDS19IRUlHSFQsIEJSSUNLX1dJRFRILCBCT0FSRF9IRUlHSFRcbn0gZnJvbSBcIi4vdXRpbHMvY29uc3RhbnRzXCI7XG5pbXBvcnQge1xuICAgIGlzQmFsbE5lYXJCcmlja3MsIGlzQmFsbEhpdHRpbmdUaGVGbG9vciwgaXNCYWxsSGl0dGluZ1RoZUNlaWxpbmcsXG4gICAgaXNCYWxsSGl0dGluZ1JpZ2h0V2FsbCwgaXNCYWxsSGl0dGluZ1RoZUxlZnRXYWxsXG59IGZyb20gXCIuL3V0aWxzL3ZhbGlkYXRvcnNcIjtcbmltcG9ydCB7IENhbnZhc1ZpZXcgfSBmcm9tIFwiLi92aWV3L0NhbnZhc1ZpZXdcIjtcblxuY29uc3QgY2FudmFzVmlldyA9IG5ldyBDYW52YXNWaWV3KFwiZ2FtZUNhbnZhc1wiKTtcbmxldCBsYXN0VGltZSA9IDA7XG5sZXQgZWxhcHNlZCA9IDA7XG5jb25zdCBTVEVQX1NJWkUgPSAyMDtcbmNvbnN0IGJvYXJkSW1nID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2JvYXJkJykgYXMgSFRNTEltYWdlRWxlbWVudDtcbmNvbnN0IGJvYXJkUG9zaXRpb24gPSBuZXcgVmVjdG9yKGNhbnZhc1ZpZXcuY2FudmFzLndpZHRoIC8gMiwgY2FudmFzVmlldy5jYW52YXMuaGVpZ2h0IC0gMTAwKTtcbmxldCBicmlja3MgPSBjcmVhdGVCcmlja3MoKTtcbmxldCBib2FyZCA9IG5ldyBCb2FyZChib2FyZFBvc2l0aW9uLCBib2FyZEltZyk7XG5sZXQgYmFsbCA9IG5ldyBCYWxsKHsgeDogSU5JVElBTF9CQUxMX1gsIHk6IElOSVRJQUxfQkFMTF9ZIH0sIFwiL2Fzc2V0cy9iYWxsLnBuZ1wiKTtcbmNvbnN0IGlucHV0OiB7IFtjb2RlOiBzdHJpbmddOiBib29sZWFuIH0gPSB7fTtcblxubGV0IGJhbGxWZWxvY2l0eSA9IG5ldyBWZWN0b3IoMywgMyk7XG5sZXQgZ2FtZU92ZXIgPSBmYWxzZTtcbmxldCBzY29yZVBvaW50cyA9IDA7XG5sZXQgYm9hcmRWZWxvY2l0eSA9IG5ldyBWZWN0b3IoMCwgMCk7XG5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgZXZlbnQgPT4ge1xuICAgIGlucHV0W2V2ZW50LmNvZGVdID0gdHJ1ZTtcbn0pO1xud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgZXZlbnQgPT4ge1xuICAgIGlucHV0W2V2ZW50LmNvZGVdID0gZmFsc2U7XG59KTtcblxuXG5jb25zdCBwbGF5QnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BsYXktYnRuJyk7XG5sZXQgaXNQbGF5TXVzaWMgPSBmYWxzZTtcblxuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJuZXctZ2FtZVwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIGdhbWVPdmVyID0gZmFsc2U7XG4gICAgc3RhcnRHYW1lKCk7XG59KTtcbnBsYXlCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRhaW5lcicpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dhbWVDYW52YXMnKS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICBzdGFydEdhbWUoKTtcblxuICAgIGlmIChpc1BsYXlNdXNpYykge1xuICAgICAgICBjb25zdCBtdXNpYyA9IG5ldyBBdWRpbyhcIi4uL2Fzc2V0cy9tdXNpYy5tcDNcIik7XG4gICAgICAgIG11c2ljLnZvbHVtZSA9IDAuMTtcblxuICAgICAgICBtdXNpYy5wbGF5KCk7XG4gICAgfVxufSk7XG5cbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzZXR0aW5nLWJ0bicpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIGNvbnN0IHNldHRpbmdzQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NldHRpbmdzLWNvbnRhaW5lcicpO1xuICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250YWluZXInKTtcbiAgICBzZXR0aW5nc0NvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICBjb250YWluZXIuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYmFjay1idG4nKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgc2V0dGluZ3NDb250YWluZXIuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgY29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgIH0pXG5cbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGxheS1zb3VuZC1idG4nKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgaXNQbGF5TXVzaWMgPSB0cnVlO1xuICAgIH0pXG59KVxuXG5mdW5jdGlvbiBzdGFydEdhbWUoKSB7XG4gICAgYnJpY2tzID0gY3JlYXRlQnJpY2tzKCk7XG4gICAgYm9hcmQgPSBuZXcgQm9hcmQoYm9hcmRQb3NpdGlvbiwgYm9hcmRJbWcpO1xuICAgIGJhbGwgPSBuZXcgQmFsbCh7IHg6IElOSVRJQUxfQkFMTF9YLCB5OiBJTklUSUFMX0JBTExfWSB9LCBcIi9hc3NldHMvYmFsbC5wbmdcIik7XG4gICAgYmFsbFZlbG9jaXR5ID0gbmV3IFZlY3RvcigzLCAzKTtcbiAgICB1cGRhdGUocGVyZm9ybWFuY2Uubm93KCkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlKHRpbWU6IG51bWJlcikge1xuICAgIGNvbnN0IGRlbHRhID0gdGltZSAtIGxhc3RUaW1lO1xuICAgIGxhc3RUaW1lID0gdGltZTtcbiAgICBlbGFwc2VkICs9IGRlbHRhO1xuICAgIGxldCBkZWxldGVCcmlja0luZGV4ID0gaXNCYWxsTmVhckJyaWNrcyhiYWxsKSA/IGdldEhpdEJyaWNrSW5kZXgoKSA6IC0xO1xuICAgIGlmIChkZWxldGVCcmlja0luZGV4ICE9IC0xKSB7XG4gICAgICAgIGNvbnN0IGJyaWNrID0gYnJpY2tzW2RlbGV0ZUJyaWNrSW5kZXhdO1xuICAgICAgICBjaGFuZ2VCYWxsRGlyZWN0aW9uKGJhbGwsIGJyaWNrLCBiYWxsVmVsb2NpdHkpO1xuICAgICAgICAvLyBiYWxsVmVsb2NpdHkueSA9IC1iYWxsVmVsb2NpdHkueTtcbiAgICAgICAgYnJpY2tzLnNwbGljZShkZWxldGVCcmlja0luZGV4LCAxKTtcbiAgICAgICAgc2NvcmVQb2ludHMgKz0gQlJJQ0tfQk9OVVNfUE9JTlRTO1xuICAgIH1cbiAgICBpZiAoZWxhcHNlZCA+IFNURVBfU0laRSAqIDUpIHtcbiAgICAgICAgZWxhcHNlZCA9IFNURVBfU0laRSAqIDU7XG4gICAgfVxuICAgIHdoaWxlIChlbGFwc2VkID4gU1RFUF9TSVpFKSB7XG4gICAgICAgIGVsYXBzZWQgLT0gU1RFUF9TSVpFO1xuICAgICAgICBnYW1lTG9vcCgpO1xuICAgICAgICBkb2N1bWVudFtcIm5ld2dhbWVcIl0gPSB0cnVlO1xuICAgIH1cbiAgICBpZiAoYnJpY2tzLmxlbmd0aCAmJiAhZ2FtZU92ZXIpIHtcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHVwZGF0ZSk7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBnYW1lTG9vcCgpIHtcbiAgICBpZiAoaW5wdXRbJ0Fycm93TGVmdCddICYmIChib2FyZC5wb3NpdGlvbi54ID4gMCkpIHtcbiAgICAgICAgYm9hcmRWZWxvY2l0eS54ID0gLTc7XG4gICAgICAgIG1vdmUoYm9hcmQsIGJvYXJkVmVsb2NpdHkpO1xuICAgIH0gZWxzZSBpZiAoaW5wdXRbJ0Fycm93UmlnaHQnXSAmJiAoYm9hcmQucG9zaXRpb24ueCArIEJPQVJEX1dJRFRIIDwgY2FudmFzVmlldy5jYW52YXMud2lkdGgpKSB7XG4gICAgICAgIGJvYXJkVmVsb2NpdHkueCA9IDc7XG4gICAgICAgIG1vdmUoYm9hcmQsIGJvYXJkVmVsb2NpdHkpO1xuICAgIH1cbiAgICBjYW52YXNWaWV3LmdldENvbnRleHQoKS5jbGVhclJlY3QoMCwgMCwgY2FudmFzVmlldy5jYW52YXMud2lkdGgsIGNhbnZhc1ZpZXcuY2FudmFzLmhlaWdodCk7XG4gICAgY2FudmFzVmlldy5kcmF3QnJpY2tzKGJyaWNrcyk7XG4gICAgY2FudmFzVmlldy5kcmF3Qm9hcmQoYm9hcmQpO1xuICAgIGNhbnZhc1ZpZXcuZHJhd0JhbGwoYmFsbCk7XG4gICAgY29sbGlzaW9uRGV0ZWN0b3IoKTtcbiAgICBtb3ZlKGJhbGwsIGJhbGxWZWxvY2l0eSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb2xsaXNpb25EZXRlY3RvcigpIHtcbiAgICBpZiAoaXNCYWxsQ29sbGlkaW5nV2l0aEJvYXJkKCkpIHtcbiAgICAgICAgaGFuZGxlQm9hcmRIaXQoYmFsbCk7XG4gICAgfVxuICAgIGlmIChpc0JhbGxIaXR0aW5nVGhlRmxvb3IoYmFsbCwgY2FudmFzVmlldykpIHtcbiAgICAgICAgZ2FtZU92ZXIgPSB0cnVlO1xuICAgICAgICBzaG93R2FtZU92ZXJNZXNzYWdlKCk7XG4gICAgfSBlbHNlIGlmIChpc0JhbGxIaXR0aW5nVGhlQ2VpbGluZyhiYWxsKSkge1xuICAgICAgICBiYWxsVmVsb2NpdHkueSA9IE1hdGguYWJzKGJhbGxWZWxvY2l0eS55KTtcbiAgICB9IGVsc2UgaWYgKGlzQmFsbEhpdHRpbmdSaWdodFdhbGwoYmFsbCwgY2FudmFzVmlldykpIHtcbiAgICAgICAgYmFsbFZlbG9jaXR5LnggPSAtIGJhbGxWZWxvY2l0eS54O1xuICAgIH0gZWxzZSBpZiAoaXNCYWxsSGl0dGluZ1RoZUxlZnRXYWxsKGJhbGwpKSB7XG4gICAgICAgIGJhbGxWZWxvY2l0eS54ID0gTWF0aC5hYnMoYmFsbFZlbG9jaXR5LngpO1xuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNob3dHYW1lT3Zlck1lc3NhZ2UoKSB7XG4gICAgY29uc3QgZ2FtZW92ZXJEaXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImdhbWVPdmVyXCIpO1xuICAgIGdhbWVvdmVyRGl2LnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgKGdhbWVvdmVyRGl2IGFzIEhUTUxEaXZFbGVtZW50KS5pbm5lclRleHQgPSBgR2FtZSBvdmVyLCBzY29yZToke3Njb3JlUG9pbnRzfWA7XG5cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGhhbmRsZUJvYXJkSGl0KGJhbGw6IEJhbGwpIHtcbiAgICBjb25zdCBjdXJyZW50QW5nbGUgPSBNYXRoLmF0YW4yKGJhbGwucG9zaXRpb24ueSwgYmFsbC5wb3NpdGlvbi54KTtcbiAgICBjb25zdCBjb2VmZiA9IChiYWxsLnBvc2l0aW9uLngpIC8gKEJPQVJEX1dJRFRIIC8gMik7XG4gICAgY29uc3QgYW5nbGVUb0FkZCA9IE1hdGguUEkgLyAyMDtcbiAgICBjb25zdCBuZXh0QW5nbGUgPSBjb2VmZiAqIGFuZ2xlVG9BZGQgKyBjdXJyZW50QW5nbGU7XG4gICAgY29uc3QgeU9mZnNldCA9IDU7XG4gICAgaWYgKG5leHRBbmdsZSA8IE1hdGguUEkgLyAzKSB7XG4gICAgICAgIGJhbGxWZWxvY2l0eS54ID0gTWF0aC5zaW4obmV4dEFuZ2xlKTtcbiAgICAgICAgYmFsbFZlbG9jaXR5LnkgPSBNYXRoLmNvcyhuZXh0QW5nbGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGJhbGxWZWxvY2l0eS55ID0gLWJhbGxWZWxvY2l0eS55O1xuICAgIH1cbiAgICBiYWxsLnBvc2l0aW9uLnkgLT0geU9mZnNldDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzQmFsbEhpdHRpbmdCb2FyZEVkZ2VzKGJhbGw6IEJhbGwsIGJvYXJkOiBCb2FyZCkge1xuICAgIHJldHVybiAoYmFsbC5wb3NpdGlvbi54IDw9IGJvYXJkLnBvc2l0aW9uLnggKyBCT0FSRF9XSURUSFxuICAgICAgICB8fCBiYWxsLnBvc2l0aW9uLnggPj0gYm9hcmQucG9zaXRpb24ueCAtIEJBTExfRElBTUVURVIpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0SGl0QnJpY2tJbmRleCgpIHtcbiAgICByZXR1cm4gYnJpY2tzLmZpbmRJbmRleChicmljayA9PiB7XG4gICAgICAgIGNvbnN0IGxlZnQgPSBicmljay5wb3NpdGlvbi54IC0gQkFMTF9ESUFNRVRFUiAvIDI7XG4gICAgICAgIGNvbnN0IHJpZ2h0ID0gYnJpY2sucG9zaXRpb24ueCArIEJSSUNLX1dJRFRIICsgQkFMTF9ESUFNRVRFUiAvIDI7XG4gICAgICAgIGNvbnN0IHRvcCA9IGJyaWNrLnBvc2l0aW9uLnkgLSBCQUxMX0RJQU1FVEVSIC8gMjtcbiAgICAgICAgY29uc3QgYm90dG9tID0gYnJpY2sucG9zaXRpb24ueSArIEJSSUNLX0hFSUdIVCArIEJBTExfRElBTUVURVIgLyAyO1xuICAgICAgICByZXR1cm4gKChiYWxsLnBvc2l0aW9uLnggPj0gbGVmdClcbiAgICAgICAgICAgICYmIChiYWxsLnBvc2l0aW9uLnggPD0gcmlnaHQpXG4gICAgICAgICAgICAmJiAoYmFsbC5wb3NpdGlvbi55ID49IHRvcClcbiAgICAgICAgICAgICYmIChiYWxsLnBvc2l0aW9uLnkgPD0gYm90dG9tKSk7XG4gICAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0JhbGxDb2xsaWRpbmdXaXRoQm9hcmQoKSB7XG4gICAgY29uc29sZS5sb2coYmFsbC5wb3NpdGlvbi55ICsgQkFMTF9ESUFNRVRFUiAvIDIgPD0gYm9hcmQucG9zaXRpb24ueSArIEJPQVJEX0hFSUdIVCk7XG4gICAgY29uc29sZS5sb2coYmFsbC5wb3NpdGlvbi55ICsgQkFMTF9ESUFNRVRFUiAvIDIgPj0gYm9hcmQucG9zaXRpb24ueSk7XG4gICAgY29uc29sZS5sb2coYmFsbC5wb3NpdGlvbi54IDw9IGJvYXJkLnBvc2l0aW9uLnggKyBCT0FSRF9XSURUSCk7XG4gICAgY29uc29sZS5sb2coYmFsbC5wb3NpdGlvbi54ID49IGJvYXJkLnBvc2l0aW9uLnggLSBCQUxMX0RJQU1FVEVSKTtcbiAgICByZXR1cm4gKChiYWxsLnBvc2l0aW9uLnkgKyBCQUxMX0RJQU1FVEVSIC8gMiA8PSBib2FyZC5wb3NpdGlvbi55KVxuICAgICAgICAmJiAoYmFsbC5wb3NpdGlvbi55ICsgQkFMTF9ESUFNRVRFUiAvIDIgPj0gYm9hcmQucG9zaXRpb24ueSAtIDIwKVxuICAgICAgICAmJiAoYmFsbC5wb3NpdGlvbi54IC0gMyAqIEJBTExfRElBTUVURVIgLyA0IDw9IGJvYXJkLnBvc2l0aW9uLnggKyBCT0FSRF9XSURUSClcbiAgICAgICAgJiYgKGJhbGwucG9zaXRpb24ueCArIDMgKiBCQUxMX0RJQU1FVEVSIC8gNCA+PSBib2FyZC5wb3NpdGlvbi54KSk7XG59XG5cblxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9