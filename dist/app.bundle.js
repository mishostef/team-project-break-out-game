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
/* harmony import */ var _utils_brickFactory__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/brickFactory */ "./src/utils/brickFactory.ts");
/* harmony import */ var _utils_constants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils/constants */ "./src/utils/constants.ts");
/* harmony import */ var _utils_validators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./utils/validators */ "./src/utils/validators.ts");
/* harmony import */ var _view_CanvasView__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./view/CanvasView */ "./src/view/CanvasView.ts");
//import { update } from "./engine/gameLoop";








const canvasView = new _view_CanvasView__WEBPACK_IMPORTED_MODULE_7__.CanvasView("gameCanvas");
let lastTime = 0;
let elapsed = 0;
const STEP_SIZE = 20;
const boardImg = document.getElementById('board');
const boardPosition = new _Geometry_Vector__WEBPACK_IMPORTED_MODULE_3__.Vector(canvasView.canvas.width / 2, canvasView.canvas.height - 100);
let bricks = (0,_utils_brickFactory__WEBPACK_IMPORTED_MODULE_4__.createBricks)();
let board = new _figures_Board__WEBPACK_IMPORTED_MODULE_2__.Board(boardPosition, boardImg);
let ball = new _figures_Ball__WEBPACK_IMPORTED_MODULE_1__.Ball({ x: _utils_constants__WEBPACK_IMPORTED_MODULE_5__.INITIAL_BALL_X, y: _utils_constants__WEBPACK_IMPORTED_MODULE_5__.INITIAL_BALL_Y }, "/assets/ball.png");
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
    bricks = (0,_utils_brickFactory__WEBPACK_IMPORTED_MODULE_4__.createBricks)();
    board = new _figures_Board__WEBPACK_IMPORTED_MODULE_2__.Board(boardPosition, boardImg);
    ball = new _figures_Ball__WEBPACK_IMPORTED_MODULE_1__.Ball({ x: _utils_constants__WEBPACK_IMPORTED_MODULE_5__.INITIAL_BALL_X, y: _utils_constants__WEBPACK_IMPORTED_MODULE_5__.INITIAL_BALL_Y }, "/assets/ball.png");
    update(performance.now());
}
function update(time) {
    const delta = time - lastTime;
    lastTime = time;
    elapsed += delta;
    let deleteBrickIndex = (0,_utils_validators__WEBPACK_IMPORTED_MODULE_6__.isBallNearBricks)(ball) ? getHitBrickIndex() : -1;
    if (deleteBrickIndex != -1) {
        const brick = bricks[deleteBrickIndex];
        changeBallDirection(ball, brick);
        // ballVelocity.y = -ballVelocity.y;
        bricks.splice(deleteBrickIndex, 1);
        scorePoints += _utils_constants__WEBPACK_IMPORTED_MODULE_5__.BRICK_BONUS_POINTS;
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
    else if (input['ArrowRight'] && (board.position.x + _utils_constants__WEBPACK_IMPORTED_MODULE_5__.BOARD_WIDTH < canvasView.canvas.width)) {
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
        handleBoardHit();
    }
    if ((0,_utils_validators__WEBPACK_IMPORTED_MODULE_6__.isBallHittingTheFloor)(ball, canvasView)) {
        gameOver = true;
        showGameOverMessage();
    }
    else if ((0,_utils_validators__WEBPACK_IMPORTED_MODULE_6__.isBallHittingTheCeiling)(ball)) {
        ballVelocity.y = Math.abs(ballVelocity.y);
    }
    else if ((0,_utils_validators__WEBPACK_IMPORTED_MODULE_6__.isBallHittingRightWall)(ball, canvasView)) {
        ballVelocity.x = -ballVelocity.x;
    }
    else if ((0,_utils_validators__WEBPACK_IMPORTED_MODULE_6__.isBallHittingTheLeftWall)(ball)) {
        ballVelocity.x = Math.abs(ballVelocity.x);
    }
}
function showGameOverMessage() {
    const gameoverDiv = document.getElementById("gameOver");
    gameoverDiv.style.display = "block";
    gameoverDiv.innerText = `Game over, score:${scorePoints}`;
}
function handleBoardHit() {
    if (isBallHittingBoardEdges(ball, board)) {
        ballVelocity.x += boardVelocity.x;
    }
    ballVelocity.y = -ballVelocity.y;
}
function isBallHittingBoardEdges(ball, board) {
    return (ball.position.x <= board.position.x + _utils_constants__WEBPACK_IMPORTED_MODULE_5__.BOARD_WIDTH
        || ball.position.x >= board.position.x - _utils_constants__WEBPACK_IMPORTED_MODULE_5__.BALL_DIAMETER);
}
function getHitBrickIndex() {
    return bricks.findIndex(brick => {
        const left = brick.position.x - _utils_constants__WEBPACK_IMPORTED_MODULE_5__.BALL_DIAMETER / 2;
        const right = brick.position.x + _utils_constants__WEBPACK_IMPORTED_MODULE_5__.BRICK_WIDTH + _utils_constants__WEBPACK_IMPORTED_MODULE_5__.BALL_DIAMETER / 2;
        const top = brick.position.y - _utils_constants__WEBPACK_IMPORTED_MODULE_5__.BALL_DIAMETER / 2;
        const bottom = brick.position.y + _utils_constants__WEBPACK_IMPORTED_MODULE_5__.BRICK_HEIGHT + _utils_constants__WEBPACK_IMPORTED_MODULE_5__.BALL_DIAMETER / 2;
        return ((ball.position.x >= left)
            && (ball.position.x <= right)
            && (ball.position.y >= top)
            && (ball.position.y <= bottom));
    });
}
function isBallCollidingWithBoard() {
    console.log(ball.position.y + _utils_constants__WEBPACK_IMPORTED_MODULE_5__.BALL_DIAMETER / 2 <= board.position.y + _utils_constants__WEBPACK_IMPORTED_MODULE_5__.BOARD_HEIGHT);
    console.log(ball.position.y + _utils_constants__WEBPACK_IMPORTED_MODULE_5__.BALL_DIAMETER / 2 >= board.position.y);
    console.log(ball.position.x <= board.position.x + _utils_constants__WEBPACK_IMPORTED_MODULE_5__.BOARD_WIDTH);
    console.log(ball.position.x >= board.position.x - _utils_constants__WEBPACK_IMPORTED_MODULE_5__.BALL_DIAMETER);
    return ((ball.position.y + _utils_constants__WEBPACK_IMPORTED_MODULE_5__.BALL_DIAMETER / 2 <= board.position.y + _utils_constants__WEBPACK_IMPORTED_MODULE_5__.BOARD_HEIGHT)
        && (ball.position.y + _utils_constants__WEBPACK_IMPORTED_MODULE_5__.BALL_DIAMETER / 2 >= board.position.y)
        && (ball.position.x <= board.position.x + _utils_constants__WEBPACK_IMPORTED_MODULE_5__.BOARD_WIDTH + _utils_constants__WEBPACK_IMPORTED_MODULE_5__.BALL_DIAMETER / 2)
        && (ball.position.x >= board.position.x - _utils_constants__WEBPACK_IMPORTED_MODULE_5__.BALL_DIAMETER / 2));
}
function changeBallDirection(ball, brick) {
    const BRICK_DIAGONAL = Math.sqrt(_utils_constants__WEBPACK_IMPORTED_MODULE_5__.BRICK_HEIGHT ** 2 + _utils_constants__WEBPACK_IMPORTED_MODULE_5__.BRICK_WIDTH ** 2);
    const brickCenterX = brick.position.x + _utils_constants__WEBPACK_IMPORTED_MODULE_5__.BRICK_WIDTH / 2;
    const brickCenterY = brick.position.y + _utils_constants__WEBPACK_IMPORTED_MODULE_5__.BRICK_HEIGHT / 2;
    const ballCenterX = ball.position.x + _utils_constants__WEBPACK_IMPORTED_MODULE_5__.BALL_DIAMETER / 2;
    const ballCenterY = ball.position.y + _utils_constants__WEBPACK_IMPORTED_MODULE_5__.BALL_DIAMETER / 2;
    const deltaY = (_utils_constants__WEBPACK_IMPORTED_MODULE_5__.BRICK_HEIGHT * _utils_constants__WEBPACK_IMPORTED_MODULE_5__.BALL_DIAMETER / 2) / BRICK_DIAGONAL;
    const deltaX = (_utils_constants__WEBPACK_IMPORTED_MODULE_5__.BRICK_WIDTH * _utils_constants__WEBPACK_IMPORTED_MODULE_5__.BALL_DIAMETER / 2) / BRICK_DIAGONAL;
    const minYSideHit = brick.position.y + deltaY;
    const maxYSideHit = brick.position.y + _utils_constants__WEBPACK_IMPORTED_MODULE_5__.BRICK_HEIGHT - deltaY;
    const minXSideHit = brick.position.x - deltaX;
    const maxXSideHit = brick.position.x + deltaX;
    const isBallComingFromButtomLeft = ((ballCenterX > minXSideHit)
        && (ballCenterX < maxXSideHit)
        && (ballCenterY > minYSideHit)
        && (ballCenterY < maxYSideHit));
    const isBallComingFromButtomRight = ((ballCenterX > minXSideHit + _utils_constants__WEBPACK_IMPORTED_MODULE_5__.BRICK_WIDTH)
        && (ballCenterX < maxXSideHit + _utils_constants__WEBPACK_IMPORTED_MODULE_5__.BRICK_WIDTH)
        && (ballCenterY > minYSideHit)
        && (ballCenterY < maxYSideHit));
    if ((isBallComingFromButtomLeft && ballVelocity.x > 0) || (isBallComingFromButtomRight && ballVelocity.x < 0)) {
        ballVelocity.x *= -1;
    }
    else {
        ballVelocity.y *= -1;
    }
}

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmJ1bmRsZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUVPLE1BQU0sTUFBTTtJQUNmLENBQUMsQ0FBUztJQUNWLENBQUMsQ0FBUztJQUlWLFlBQ0ksUUFBd0IsRUFDeEIsQ0FBVTtRQUVWLElBQUksT0FBTyxRQUFRLElBQUksUUFBUSxJQUFJLE9BQU8sQ0FBQyxJQUFJLFFBQVEsRUFBRTtZQUNyRCxJQUFJLENBQUMsQ0FBQyxHQUFHLFFBQVEsQ0FBQztZQUNsQixJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUNkO2FBQU0sSUFBSSxPQUFPLFFBQVEsSUFBSSxRQUFRLEVBQUU7WUFDcEMsSUFBSSxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ3BCLElBQUksQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQztTQUN2QjtJQUNMLENBQUM7SUFFRCxHQUFHLENBQUMsQ0FBUTtRQUNSLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNkLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNkLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxLQUFLLENBQUMsQ0FBUztRQUNYLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ1osSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFWixPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQsSUFBSSxDQUFDLENBQVE7UUFDVCxNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDeEIsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3hCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBRUQsUUFBUTtRQUNKLE9BQU8sSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDckMsQ0FBQztJQUVELE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBUyxFQUFFLEVBQVM7UUFDM0IsT0FBTyxJQUFJLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDaEQsQ0FBQztDQUNKOzs7Ozs7Ozs7Ozs7Ozs7QUM1Q00sU0FBUyxJQUFJLENBQUMsVUFBc0IsRUFBRSxRQUFnQjtJQUN6RCxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxRQUFRLENBQUMsQ0FBQyxDQUFDO0lBQ3BDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLFFBQVEsQ0FBQyxDQUFDLENBQUM7QUFDeEMsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7O0FDSk0sTUFBTSxJQUFJO0lBSUY7SUFISCxLQUFLLEdBQXFCLElBQUksS0FBSyxFQUFFLENBQUM7SUFFOUMsWUFDVyxRQUFnQixFQUN2QixLQUFhO1FBRE4sYUFBUSxHQUFSLFFBQVEsQ0FBUTtRQUd2QixJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUM7SUFDM0IsQ0FBQztJQUVELFFBQVE7UUFDSixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDdEIsQ0FBQztDQUNKOzs7Ozs7Ozs7Ozs7Ozs7QUNkTSxNQUFNLEtBQUs7SUFDSztJQUF5QjtJQUE1QyxZQUFtQixRQUFnQixFQUFTLEtBQXVCO1FBQWhELGFBQVEsR0FBUixRQUFRLENBQVE7UUFBUyxVQUFLLEdBQUwsS0FBSyxDQUFrQjtJQUFJLENBQUM7Q0FDM0U7Ozs7Ozs7Ozs7Ozs7OztBQ0RNLE1BQU0sS0FBSztJQUlIO0lBSEgsS0FBSyxHQUFxQixJQUFJLEtBQUssRUFBRSxDQUFDO0lBRTlDLFlBQ1csUUFBZ0IsRUFDdkIsS0FBYTtRQUROLGFBQVEsR0FBUixRQUFRLENBQVE7UUFHdkIsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsS0FBSyxDQUFDO0lBQzNCLENBQUM7SUFFRCxRQUFRO1FBQ0osT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ3RCLENBQUM7Q0FDSjs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNmd0M7QUFRcEI7QUFJckIsTUFBTSxXQUFXLEdBQUc7SUFDaEIsd0JBQXdCO0lBQ3hCLHlCQUF5QjtJQUN6QiwwQkFBMEI7SUFDMUIsdUJBQXVCO0lBQ3ZCLDBCQUEwQjtDQUM3QjtBQUVNLFNBQVMsWUFBWTtJQUN4QixJQUFJLENBQUMsR0FBRyxnRUFBd0IsQ0FBQztJQUNqQyxJQUFJLENBQUMsR0FBRyxpRUFBeUIsQ0FBQztJQUVsQyxNQUFNLE1BQU0sR0FBWSxFQUFFLENBQUM7SUFFM0IsS0FBSyxJQUFJLEdBQUcsR0FBRyxDQUFDLEVBQUUsR0FBRyxHQUFHLGtEQUFVLEVBQUUsR0FBRyxFQUFFLEVBQUU7UUFDdkMsS0FBSyxJQUFJLEdBQUcsR0FBRyxDQUFDLEVBQUUsR0FBRyxHQUFHLG1EQUFXLEVBQUUsR0FBRyxFQUFFLEVBQUU7WUFDeEMsTUFBTSxHQUFHLEdBQVcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7WUFFN0IsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLFdBQVcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1lBQ3ZELE1BQU0sS0FBSyxHQUFHLElBQUksaURBQUssQ0FBQyxHQUFHLEVBQUUsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ2xELE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDbkIsQ0FBQyxJQUFJLDREQUFvQixDQUFDO1NBQzdCO1FBRUQsQ0FBQyxHQUFHLGdFQUF3QixDQUFDO1FBQzdCLENBQUMsSUFBSSw0REFBb0IsQ0FBQztLQUM3QjtJQUNELE9BQU8sTUFBTSxDQUFDO0FBQ2xCLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN2Q0QsU0FBUztBQUNGLE1BQU0sVUFBVSxHQUFHLENBQUMsQ0FBQztBQUNyQixNQUFNLFdBQVcsR0FBRyxFQUFFLENBQUM7QUFDdkIsTUFBTSxXQUFXLEdBQUcsR0FBRyxDQUFDO0FBQ3hCLE1BQU0sWUFBWSxHQUFHLEVBQUUsQ0FBQztBQUN4QixNQUFNLHdCQUF3QixHQUFHLEVBQUUsQ0FBQztBQUNwQyxNQUFNLHlCQUF5QixHQUFHLEVBQUUsQ0FBQztBQUNyQyxNQUFNLG9CQUFvQixHQUFHLEdBQUcsQ0FBQztBQUNqQyxNQUFNLG9CQUFvQixHQUFHLEVBQUUsQ0FBQztBQUNoQyxNQUFNLFVBQVUsR0FBRyxHQUFHLENBQUM7QUFFOUIsUUFBUTtBQUNELE1BQU0sV0FBVyxHQUFHLEdBQUcsQ0FBQztBQUN4QixNQUFNLFlBQVksR0FBRyxFQUFFLENBQUM7QUFFL0IsTUFBTTtBQUNDLE1BQU0sVUFBVSxHQUFHLEVBQUUsQ0FBQztBQUN0QixNQUFNLFdBQVcsR0FBRyxFQUFFLENBQUM7QUFDdkIsTUFBTSxjQUFjLEdBQUcsR0FBRyxDQUFDO0FBQzNCLE1BQU0sY0FBYyxHQUFHLEdBQUcsQ0FBQztBQUMzQixNQUFNLGFBQWEsR0FBRyxFQUFFLENBQUM7QUFFaEMsZUFBZTtBQUNSLE1BQU0sa0JBQWtCLEdBQUcsRUFBRSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3JCZ0M7QUFHOUQsU0FBUyx3QkFBd0IsQ0FBQyxJQUFVO0lBQy9DLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ2hDLENBQUM7QUFFTSxTQUFTLHNCQUFzQixDQUFDLElBQUksRUFBRSxVQUFzQjtJQUMvRCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLHFEQUFhLENBQUM7QUFDckUsQ0FBQztBQUVNLFNBQVMsdUJBQXVCLENBQUMsSUFBVTtJQUM5QyxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNoQyxDQUFDO0FBRU0sU0FBUyxxQkFBcUIsQ0FBQyxJQUFVLEVBQUUsVUFBc0I7SUFDcEUsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxVQUFVLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxxREFBYSxDQUFDO0FBQ3ZFLENBQUM7QUFDTSxTQUFTLGdCQUFnQixDQUFDLElBQVU7SUFDdkMsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLGtEQUFVLENBQUMsQ0FBQztBQUMxQyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7O0FDZjJCO0FBS3JCLE1BQU0sVUFBVTtJQUtSO0lBSkgsR0FBRyxDQUEyQjtJQUMvQixNQUFNLENBQW9CO0lBRWpDLFlBQ1csY0FBc0I7UUFBdEIsbUJBQWMsR0FBZCxjQUFjLENBQVE7UUFFN0IsSUFBSSxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLGNBQWMsQ0FBc0IsQ0FBQztRQUMzRSxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFFRCxTQUFTLENBQUMsUUFBZ0IsRUFBRSxLQUF1QixFQUFFLEtBQWEsRUFBRSxNQUFjO1FBQzlFLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDLEVBQUUsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ3JFLENBQUM7SUFFRCxVQUFVLENBQUMsTUFBZTtRQUN0QixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsd0RBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNqQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDcEMsTUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN4QixNQUFNLEdBQUcsR0FBVztvQkFDaEIsQ0FBQyxFQUFFLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztvQkFDbkIsQ0FBQyxFQUFFLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztpQkFDdEI7Z0JBQ0QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLFFBQVEsRUFBRSxFQUFFLHlEQUFXLEVBQUUsMERBQVksQ0FBQyxDQUFDO2FBQ3BFO1NBQ0o7SUFDTCxDQUFDO0lBRUQsUUFBUSxDQUFDLElBQVU7UUFDZixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFLDJEQUFhLEVBQUUsMkRBQWEsQ0FBQyxDQUFDO0lBQ2pGLENBQUM7SUFFRCxTQUFTLENBQUMsS0FBWTtRQUNsQixJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUseURBQVcsRUFBRSwwREFBWSxDQUFDLENBQUM7UUFDL0YsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUN6QixDQUFDO0lBRUQsVUFBVTtRQUNOLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQztJQUNwQixDQUFDO0NBQ0o7Ozs7Ozs7VUN0REQ7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTEEsNkNBQTZDO0FBRVI7QUFDQztBQUNFO0FBRUc7QUFDUztBQUl6QjtBQUlDO0FBQ21CO0FBRS9DLE1BQU0sVUFBVSxHQUFHLElBQUksd0RBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUNoRCxJQUFJLFFBQVEsR0FBRyxDQUFDLENBQUM7QUFDakIsSUFBSSxPQUFPLEdBQUcsQ0FBQyxDQUFDO0FBQ2hCLE1BQU0sU0FBUyxHQUFHLEVBQUUsQ0FBQztBQUNyQixNQUFNLFFBQVEsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBcUIsQ0FBQztBQUN0RSxNQUFNLGFBQWEsR0FBRyxJQUFJLG9EQUFNLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDO0FBQzlGLElBQUksTUFBTSxHQUFHLGlFQUFZLEVBQUUsQ0FBQztBQUM1QixJQUFJLEtBQUssR0FBRyxJQUFJLGlEQUFLLENBQUMsYUFBYSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBQy9DLElBQUksSUFBSSxHQUFHLElBQUksK0NBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSw0REFBYyxFQUFFLENBQUMsRUFBRSw0REFBYyxFQUFFLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztBQUNsRixNQUFNLEtBQUssR0FBZ0MsRUFBRSxDQUFDO0FBRTlDLElBQUksWUFBWSxHQUFHLElBQUksb0RBQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDcEMsSUFBSSxRQUFRLEdBQUcsS0FBSyxDQUFDO0FBQ3JCLElBQUksV0FBVyxHQUFHLENBQUMsQ0FBQztBQUNwQixJQUFJLGFBQWEsR0FBRyxJQUFJLG9EQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBRXJDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLEVBQUU7SUFDdkMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUM7QUFDN0IsQ0FBQyxDQUFDLENBQUM7QUFDSCxNQUFNLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxFQUFFO0lBQ3JDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDO0FBQzlCLENBQUMsQ0FBQyxDQUFDO0FBR0gsTUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUNwRCxJQUFJLFdBQVcsR0FBRyxLQUFLLENBQUM7QUFFeEIsUUFBUSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsR0FBRyxFQUFFO0lBQy9ELFFBQVEsR0FBRyxLQUFLLENBQUM7SUFDakIsU0FBUyxFQUFFLENBQUM7QUFDaEIsQ0FBQyxDQUFDLENBQUM7QUFDSCxPQUFPLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRTtJQUNuQyxRQUFRLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO0lBQzVELFFBQVEsQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7SUFDOUQsU0FBUyxFQUFFLENBQUM7SUFFWixJQUFJLFdBQVcsRUFBRTtRQUNiLE1BQU0sS0FBSyxHQUFHLElBQUksS0FBSyxDQUFDLHFCQUFxQixDQUFDLENBQUM7UUFDL0MsS0FBSyxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUM7UUFFbkIsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO0tBQ2hCO0FBQ0wsQ0FBQyxDQUFDLENBQUM7QUFFSCxRQUFRLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUU7SUFDbEUsTUFBTSxpQkFBaUIsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLG9CQUFvQixDQUFDLENBQUM7SUFDeEUsTUFBTSxTQUFTLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUN2RCxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztJQUMxQyxTQUFTLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7SUFDakMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsR0FBRyxFQUFFO1FBQy9ELGlCQUFpQixDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO1FBQ3pDLFNBQVMsQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztJQUN0QyxDQUFDLENBQUM7SUFFRixRQUFRLENBQUMsY0FBYyxDQUFDLGdCQUFnQixDQUFDLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRTtRQUNyRSxXQUFXLEdBQUcsSUFBSSxDQUFDO0lBQ3ZCLENBQUMsQ0FBQztBQUNOLENBQUMsQ0FBQztBQUVGLFNBQVMsU0FBUztJQUNkLE1BQU0sR0FBRyxpRUFBWSxFQUFFLENBQUM7SUFDeEIsS0FBSyxHQUFHLElBQUksaURBQUssQ0FBQyxhQUFhLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDM0MsSUFBSSxHQUFHLElBQUksK0NBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSw0REFBYyxFQUFFLENBQUMsRUFBRSw0REFBYyxFQUFFLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztJQUM5RSxNQUFNLENBQUMsV0FBVyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7QUFDOUIsQ0FBQztBQUVNLFNBQVMsTUFBTSxDQUFDLElBQVk7SUFDL0IsTUFBTSxLQUFLLEdBQUcsSUFBSSxHQUFHLFFBQVEsQ0FBQztJQUM5QixRQUFRLEdBQUcsSUFBSSxDQUFDO0lBQ2hCLE9BQU8sSUFBSSxLQUFLLENBQUM7SUFDakIsSUFBSSxnQkFBZ0IsR0FBRyxtRUFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDeEUsSUFBSSxnQkFBZ0IsSUFBSSxDQUFDLENBQUMsRUFBRTtRQUN4QixNQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUN2QyxtQkFBbUIsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDakMsb0NBQW9DO1FBQ3BDLE1BQU0sQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDbkMsV0FBVyxJQUFJLGdFQUFrQixDQUFDO0tBQ3JDO0lBQ0QsSUFBSSxPQUFPLEdBQUcsU0FBUyxHQUFHLENBQUMsRUFBRTtRQUN6QixPQUFPLEdBQUcsU0FBUyxHQUFHLENBQUMsQ0FBQztLQUMzQjtJQUNELE9BQU8sT0FBTyxHQUFHLFNBQVMsRUFBRTtRQUN4QixPQUFPLElBQUksU0FBUyxDQUFDO1FBQ3JCLFFBQVEsRUFBRSxDQUFDO1FBQ1gsUUFBUSxDQUFDLFNBQVMsQ0FBQyxHQUFHLElBQUksQ0FBQztLQUM5QjtJQUNELElBQUksTUFBTSxDQUFDLE1BQU0sSUFBSSxDQUFDLFFBQVEsRUFBRTtRQUM1QixxQkFBcUIsQ0FBQyxNQUFNLENBQUMsQ0FBQztLQUNqQztBQUNMLENBQUM7QUFHTSxTQUFTLFFBQVE7SUFDcEIsSUFBSSxLQUFLLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRTtRQUM5QyxhQUFhLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ3JCLGtEQUFJLENBQUMsS0FBSyxFQUFFLGFBQWEsQ0FBQyxDQUFDO0tBQzlCO1NBQU0sSUFBSSxLQUFLLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyx5REFBVyxHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUU7UUFDMUYsYUFBYSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDcEIsa0RBQUksQ0FBQyxLQUFLLEVBQUUsYUFBYSxDQUFDLENBQUM7S0FDOUI7SUFDRCxVQUFVLENBQUMsVUFBVSxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsVUFBVSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsVUFBVSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUMzRixVQUFVLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzlCLFVBQVUsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDNUIsVUFBVSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMxQixpQkFBaUIsRUFBRSxDQUFDO0lBQ3BCLGtEQUFJLENBQUMsSUFBSSxFQUFFLFlBQVksQ0FBQyxDQUFDO0FBQzdCLENBQUM7QUFFTSxTQUFTLGlCQUFpQjtJQUM3QixJQUFJLHdCQUF3QixFQUFFLEVBQUU7UUFDNUIsY0FBYyxFQUFFLENBQUM7S0FDcEI7SUFDRCxJQUFJLHdFQUFxQixDQUFDLElBQUksRUFBRSxVQUFVLENBQUMsRUFBRTtRQUN6QyxRQUFRLEdBQUcsSUFBSSxDQUFDO1FBQ2hCLG1CQUFtQixFQUFFLENBQUM7S0FDekI7U0FBTSxJQUFJLDBFQUF1QixDQUFDLElBQUksQ0FBQyxFQUFFO1FBQ3RDLFlBQVksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDN0M7U0FBTSxJQUFJLHlFQUFzQixDQUFDLElBQUksRUFBRSxVQUFVLENBQUMsRUFBRTtRQUNqRCxZQUFZLENBQUMsQ0FBQyxHQUFHLENBQUUsWUFBWSxDQUFDLENBQUMsQ0FBQztLQUNyQztTQUFNLElBQUksMkVBQXdCLENBQUMsSUFBSSxDQUFDLEVBQUU7UUFDdkMsWUFBWSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUM3QztBQUNMLENBQUM7QUFFTSxTQUFTLG1CQUFtQjtJQUMvQixNQUFNLFdBQVcsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ3hELFdBQVcsQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztJQUNuQyxXQUE4QixDQUFDLFNBQVMsR0FBRyxvQkFBb0IsV0FBVyxFQUFFLENBQUM7QUFFbEYsQ0FBQztBQUVNLFNBQVMsY0FBYztJQUMxQixJQUFJLHVCQUF1QixDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRTtRQUN0QyxZQUFZLENBQUMsQ0FBQyxJQUFJLGFBQWEsQ0FBQyxDQUFDLENBQUM7S0FDckM7SUFDRCxZQUFZLENBQUMsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztBQUNyQyxDQUFDO0FBRU0sU0FBUyx1QkFBdUIsQ0FBQyxJQUFVLEVBQUUsS0FBWTtJQUM1RCxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcseURBQVc7V0FDbEQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsMkRBQWEsQ0FBQyxDQUFDO0FBQ2hFLENBQUM7QUFFTSxTQUFTLGdCQUFnQjtJQUM1QixPQUFPLE1BQU0sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQUU7UUFDNUIsTUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsMkRBQWEsR0FBRyxDQUFDLENBQUM7UUFDbEQsTUFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcseURBQVcsR0FBRywyREFBYSxHQUFHLENBQUMsQ0FBQztRQUNqRSxNQUFNLEdBQUcsR0FBRyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRywyREFBYSxHQUFHLENBQUMsQ0FBQztRQUNqRCxNQUFNLE1BQU0sR0FBRyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRywwREFBWSxHQUFHLDJEQUFhLEdBQUcsQ0FBQyxDQUFDO1FBQ25FLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQztlQUMxQixDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLEtBQUssQ0FBQztlQUMxQixDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLEdBQUcsQ0FBQztlQUN4QixDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDeEMsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDO0FBRU0sU0FBUyx3QkFBd0I7SUFDcEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRywyREFBYSxHQUFHLENBQUMsSUFBSSxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRywwREFBWSxDQUFDLENBQUM7SUFDcEYsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRywyREFBYSxHQUFHLENBQUMsSUFBSSxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3JFLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcseURBQVcsQ0FBQyxDQUFDO0lBQy9ELE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsMkRBQWEsQ0FBQyxDQUFDO0lBQ2pFLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLDJEQUFhLEdBQUcsQ0FBQyxJQUFJLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLDBEQUFZLENBQUM7V0FDekUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRywyREFBYSxHQUFHLENBQUMsSUFBSSxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztXQUN6RCxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLHlEQUFXLEdBQUcsMkRBQWEsR0FBRyxDQUFDLENBQUM7V0FDdkUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRywyREFBYSxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQ3JFLENBQUM7QUFFRCxTQUFTLG1CQUFtQixDQUFDLElBQVUsRUFBRSxLQUFZO0lBQ2pELE1BQU0sY0FBYyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsMERBQVksSUFBSSxDQUFDLEdBQUcseURBQVcsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUN2RSxNQUFNLFlBQVksR0FBRyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyx5REFBVyxHQUFHLENBQUMsQ0FBQztJQUN4RCxNQUFNLFlBQVksR0FBRyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRywwREFBWSxHQUFHLENBQUMsQ0FBQztJQUN6RCxNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRywyREFBYSxHQUFHLENBQUMsQ0FBQztJQUN4RCxNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRywyREFBYSxHQUFHLENBQUMsQ0FBQztJQUN4RCxNQUFNLE1BQU0sR0FBRyxDQUFDLDBEQUFZLEdBQUcsMkRBQWEsR0FBRyxDQUFDLENBQUMsR0FBRyxjQUFjLENBQUM7SUFDbkUsTUFBTSxNQUFNLEdBQUcsQ0FBQyx5REFBVyxHQUFHLDJEQUFhLEdBQUcsQ0FBQyxDQUFDLEdBQUcsY0FBYyxDQUFDO0lBQ2xFLE1BQU0sV0FBVyxHQUFHLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQztJQUM5QyxNQUFNLFdBQVcsR0FBRyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRywwREFBWSxHQUFHLE1BQU0sQ0FBQztJQUM3RCxNQUFNLFdBQVcsR0FBRyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUM7SUFDOUMsTUFBTSxXQUFXLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDO0lBQzlDLE1BQU0sMEJBQTBCLEdBQUcsQ0FBQyxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7V0FDeEQsQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO1dBQzNCLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztXQUMzQixDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFDO0lBQ3BDLE1BQU0sMkJBQTJCLEdBQUcsQ0FBQyxDQUFDLFdBQVcsR0FBRyxXQUFXLEdBQUcseURBQVcsQ0FBQztXQUN2RSxDQUFDLFdBQVcsR0FBRyxXQUFXLEdBQUcseURBQVcsQ0FBQztXQUN6QyxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7V0FDM0IsQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDLENBQUMsQ0FBQztJQUNwQyxJQUFJLENBQUMsMEJBQTBCLElBQUksWUFBWSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLDJCQUEyQixJQUFJLFlBQVksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUU7UUFDM0csWUFBWSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztLQUN4QjtTQUFNO1FBQ0gsWUFBWSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztLQUN4QjtBQUVMLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9idWRnZXRlZXItdHMvLi9zcmMvR2VvbWV0cnkvVmVjdG9yLnRzIiwid2VicGFjazovL2J1ZGdldGVlci10cy8uL3NyYy9lbmdpbmUvbW92ZS50cyIsIndlYnBhY2s6Ly9idWRnZXRlZXItdHMvLi9zcmMvZmlndXJlcy9CYWxsLnRzIiwid2VicGFjazovL2J1ZGdldGVlci10cy8uL3NyYy9maWd1cmVzL0JvYXJkLnRzIiwid2VicGFjazovL2J1ZGdldGVlci10cy8uL3NyYy9maWd1cmVzL0JyaWNrLnRzIiwid2VicGFjazovL2J1ZGdldGVlci10cy8uL3NyYy91dGlscy9icmlja0ZhY3RvcnkudHMiLCJ3ZWJwYWNrOi8vYnVkZ2V0ZWVyLXRzLy4vc3JjL3V0aWxzL2NvbnN0YW50cy50cyIsIndlYnBhY2s6Ly9idWRnZXRlZXItdHMvLi9zcmMvdXRpbHMvdmFsaWRhdG9ycy50cyIsIndlYnBhY2s6Ly9idWRnZXRlZXItdHMvLi9zcmMvdmlldy9DYW52YXNWaWV3LnRzIiwid2VicGFjazovL2J1ZGdldGVlci10cy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9idWRnZXRlZXItdHMvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2J1ZGdldGVlci10cy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2J1ZGdldGVlci10cy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2J1ZGdldGVlci10cy8uL3NyYy9hcHAudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUG9pbnQgfSBmcm9tIFwiLi9JbnRlcmZhY2VzXCI7XG5cbmV4cG9ydCBjbGFzcyBWZWN0b3IgaW1wbGVtZW50cyBQb2ludCB7XG4gICAgeDogbnVtYmVyO1xuICAgIHk6IG51bWJlcjtcblxuICAgIGNvbnN0cnVjdG9yKHA6IFBvaW50KVxuICAgIGNvbnN0cnVjdG9yKHg6IG51bWJlciwgeTogbnVtYmVyKVxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICB4T3JQb2ludDogbnVtYmVyIHwgUG9pbnQsXG4gICAgICAgIHk/OiBudW1iZXJcbiAgICApIHtcbiAgICAgICAgaWYgKHR5cGVvZiB4T3JQb2ludCA9PSAnbnVtYmVyJyAmJiB0eXBlb2YgeSA9PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgdGhpcy54ID0geE9yUG9pbnQ7XG4gICAgICAgICAgICB0aGlzLnkgPSB5O1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiB4T3JQb2ludCA9PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgdGhpcy54ID0geE9yUG9pbnQueDtcbiAgICAgICAgICAgIHRoaXMueSA9IHhPclBvaW50Lnk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhZGQocDogUG9pbnQpIHtcbiAgICAgICAgdGhpcy54ICs9IHAueDtcbiAgICAgICAgdGhpcy55ICs9IHAueTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgc2NhbGUoczogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMueCAqPSBzO1xuICAgICAgICB0aGlzLnkgKj0gcztcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBkaXN0KHA6IFBvaW50KSB7XG4gICAgICAgIGNvbnN0IGR4ID0gdGhpcy54IC0gcC54O1xuICAgICAgICBjb25zdCBkeSA9IHRoaXMueSAtIHAueTtcbiAgICAgICAgcmV0dXJuIE1hdGguc3FydChkeCAqKiAyICsgZHkgKiogMik7XG4gICAgfVxuXG4gICAgc3FMZW5ndGgoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnggKiogMiArIHRoaXMueSAqKiAyO1xuICAgIH1cblxuICAgIHN0YXRpYyBhZGQocDE6IFBvaW50LCBwMjogUG9pbnQpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3IocDEueCArIHAyLngsIHAxLnkgKyBwMi55KTtcbiAgICB9XG59IiwiaW1wb3J0IHsgVmVjdG9yIH0gZnJvbSBcIi4uL3V0aWxzL3ZlY3RvclwiO1xuXG5cbmV4cG9ydCBmdW5jdGlvbiBtb3ZlKGdhbWVPYmplY3Q6IEdhbWVPYmplY3QsIHZlbG9jaXR5OiBWZWN0b3IpIHtcbiAgICBnYW1lT2JqZWN0LnBvc2l0aW9uLnggKz0gdmVsb2NpdHkueDtcbiAgICBnYW1lT2JqZWN0LnBvc2l0aW9uLnkgKz0gdmVsb2NpdHkueTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBHYW1lT2JqZWN0IHtcbiAgICBwb3NpdGlvbjogeyB4OiBudW1iZXIsIHk6IG51bWJlciB9XG59IiwiaW1wb3J0IHsgVmVjdG9yIH0gZnJvbSBcIi4uL3V0aWxzL3ZlY3RvclwiO1xuXG5leHBvcnQgY2xhc3MgQmFsbCB7XG4gICAgcHJpdmF0ZSBpbWFnZTogSFRNTEltYWdlRWxlbWVudCA9IG5ldyBJbWFnZSgpO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHB1YmxpYyBwb3NpdGlvbjogVmVjdG9yLFxuICAgICAgICBpbWFnZTogc3RyaW5nXG4gICAgKSB7XG4gICAgICAgIHRoaXMuaW1hZ2Uuc3JjID0gaW1hZ2U7XG4gICAgfVxuXG4gICAgZ2V0SW1hZ2UoKTogSFRNTEltYWdlRWxlbWVudCB7XG4gICAgICAgIHJldHVybiB0aGlzLmltYWdlO1xuICAgIH1cbn0iLCJpbXBvcnQgeyBWZWN0b3IgfSBmcm9tIFwiLi4vdXRpbHMvdmVjdG9yXCI7XG5leHBvcnQgY2xhc3MgQm9hcmQge1xuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBwb3NpdGlvbjogVmVjdG9yLCBwdWJsaWMgaW1hZ2U6IEhUTUxJbWFnZUVsZW1lbnQpIHsgfVxufSIsImltcG9ydCB7IFZlY3RvciB9IGZyb20gXCIuLi91dGlscy92ZWN0b3JcIjtcblxuZXhwb3J0IGNsYXNzIEJyaWNrIHtcbiAgICBwcml2YXRlIGltYWdlOiBIVE1MSW1hZ2VFbGVtZW50ID0gbmV3IEltYWdlKCk7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIHBvc2l0aW9uOiBWZWN0b3IsXG4gICAgICAgIGltYWdlOiBzdHJpbmdcbiAgICApIHtcbiAgICAgICAgdGhpcy5pbWFnZS5zcmMgPSBpbWFnZTtcbiAgICB9XG5cbiAgICBnZXRJbWFnZSgpOiBIVE1MSW1hZ2VFbGVtZW50IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaW1hZ2U7XG4gICAgfVxufSIsImltcG9ydCB7IEJyaWNrIH0gZnJvbSBcIi4uL2ZpZ3VyZXMvQnJpY2tcIjtcbmltcG9ydCB7XG4gICAgQlJJQ0tTX0NPTFMsXG4gICAgQlJJQ0tfUk9XUyxcbiAgICBJTkNSRUVNTlRfRE9XTl9CUklDSyxcbiAgICBJTkNSRU1FTlRfTEVGVF9CUklDSyxcbiAgICBJTklUSUFMX1NUQVJUX0JSSUNLX0xFRlQsXG4gICAgSU5JVElBTF9TVEFSVF9CUklDS19SSUdIVFxufSBmcm9tIFwiLi9jb25zdGFudHNcIjtcblxuaW1wb3J0IHsgVmVjdG9yIH0gZnJvbSBcIi4vdmVjdG9yXCI7XG5cbmNvbnN0IGJyaWNrc0ltYWdlID0gW1xuICAgIFwiL2Fzc2V0cy9icmljay1ibHVlLnBuZ1wiLFxuICAgIFwiL2Fzc2V0cy9icmljay1ncmVlbi5wbmdcIixcbiAgICBcIi9hc3NldHMvYnJpY2stcHVycGxlLnBuZ1wiLFxuICAgIFwiL2Fzc2V0cy9icmljay1yZWQucG5nXCIsXG4gICAgXCIvYXNzZXRzL2JyaWNrLXllbGxvdy5wbmdcIlxuXVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQnJpY2tzKCk6IEJyaWNrW10ge1xuICAgIGxldCB4ID0gSU5JVElBTF9TVEFSVF9CUklDS19MRUZUO1xuICAgIGxldCB5ID0gSU5JVElBTF9TVEFSVF9CUklDS19SSUdIVDtcblxuICAgIGNvbnN0IGJyaWNrczogQnJpY2tbXSA9IFtdO1xuXG4gICAgZm9yIChsZXQgcm93ID0gMDsgcm93IDwgQlJJQ0tfUk9XUzsgcm93KyspIHtcbiAgICAgICAgZm9yIChsZXQgY29sID0gMDsgY29sIDwgQlJJQ0tTX0NPTFM7IGNvbCsrKSB7XG4gICAgICAgICAgICBjb25zdCBwb3M6IFZlY3RvciA9IHsgeCwgeSB9O1xuXG4gICAgICAgICAgICBjb25zdCByYW5kUG9zID0gTWF0aC5yYW5kb20oKSAqIGJyaWNrc0ltYWdlLmxlbmd0aCB8IDA7XG4gICAgICAgICAgICBjb25zdCBicmljayA9IG5ldyBCcmljayhwb3MsIGJyaWNrc0ltYWdlW3JhbmRQb3NdKVxuICAgICAgICAgICAgYnJpY2tzLnB1c2goYnJpY2spO1xuICAgICAgICAgICAgeCArPSBJTkNSRU1FTlRfTEVGVF9CUklDSztcbiAgICAgICAgfVxuICAgIFxuICAgICAgICB4ID0gSU5JVElBTF9TVEFSVF9CUklDS19MRUZUO1xuICAgICAgICB5ICs9IElOQ1JFRU1OVF9ET1dOX0JSSUNLO1xuICAgIH1cbiAgICByZXR1cm4gYnJpY2tzO1xufSIsIlxuLy8gQlJJQ0tTXG5leHBvcnQgY29uc3QgQlJJQ0tfUk9XUyA9IDM7XG5leHBvcnQgY29uc3QgQlJJQ0tTX0NPTFMgPSAxMDtcbmV4cG9ydCBjb25zdCBCUklDS19XSURUSCA9IDEwMDtcbmV4cG9ydCBjb25zdCBCUklDS19IRUlHSFQgPSA0MDtcbmV4cG9ydCBjb25zdCBJTklUSUFMX1NUQVJUX0JSSUNLX0xFRlQgPSAxMDtcbmV4cG9ydCBjb25zdCBJTklUSUFMX1NUQVJUX0JSSUNLX1JJR0hUID0gMTA7XG5leHBvcnQgY29uc3QgSU5DUkVNRU5UX0xFRlRfQlJJQ0sgPSAxMjA7XG5leHBvcnQgY29uc3QgSU5DUkVFTU5UX0RPV05fQlJJQ0sgPSA2MDtcbmV4cG9ydCBjb25zdCBCUklDS1NfRU5EID0gMTcwO1xuXG4vLyBCT0FSRFxuZXhwb3J0IGNvbnN0IEJPQVJEX1dJRFRIID0gMTIwO1xuZXhwb3J0IGNvbnN0IEJPQVJEX0hFSUdIVCA9IDIwO1xuXG4vL0JBTExcbmV4cG9ydCBjb25zdCBCQUxMX1dJRFRIID0gNDA7XG5leHBvcnQgY29uc3QgQkFMTF9IRUlHSFQgPSA0MDtcbmV4cG9ydCBjb25zdCBJTklUSUFMX0JBTExfWCA9IDIwMDtcbmV4cG9ydCBjb25zdCBJTklUSUFMX0JBTExfWSA9IDIwMDtcbmV4cG9ydCBjb25zdCBCQUxMX0RJQU1FVEVSID0gNDA7XG5cbi8vTUlTQ0VMTEFORU9VU1xuZXhwb3J0IGNvbnN0IEJSSUNLX0JPTlVTX1BPSU5UUyA9IDEwOyIsImltcG9ydCB7IEJhbGwgfSBmcm9tIFwiLi4vZmlndXJlcy9CYWxsXCI7XG5pbXBvcnQgeyBCb2FyZCB9IGZyb20gXCIuLi9maWd1cmVzL0JvYXJkXCI7XG5pbXBvcnQgeyBDYW52YXNWaWV3IH0gZnJvbSBcIi4uL3ZpZXcvQ2FudmFzVmlld1wiO1xuaW1wb3J0IHsgQkFMTF9ESUFNRVRFUiwgQlJJQ0tTX0VORCwgQlJJQ0tfV0lEVEggfSBmcm9tIFwiLi9jb25zdGFudHNcIjtcblxuXG5leHBvcnQgZnVuY3Rpb24gaXNCYWxsSGl0dGluZ1RoZUxlZnRXYWxsKGJhbGw6IEJhbGwpIHtcbiAgICByZXR1cm4gYmFsbC5wb3NpdGlvbi54IDw9IDA7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0JhbGxIaXR0aW5nUmlnaHRXYWxsKGJhbGwsIGNhbnZhc1ZpZXc6IENhbnZhc1ZpZXcpIHtcbiAgICByZXR1cm4gYmFsbC5wb3NpdGlvbi54ID4gY2FudmFzVmlldy5jYW52YXMud2lkdGggLSBCQUxMX0RJQU1FVEVSO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNCYWxsSGl0dGluZ1RoZUNlaWxpbmcoYmFsbDogQmFsbCkge1xuICAgIHJldHVybiBiYWxsLnBvc2l0aW9uLnkgPD0gMDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzQmFsbEhpdHRpbmdUaGVGbG9vcihiYWxsOiBCYWxsLCBjYW52YXNWaWV3OiBDYW52YXNWaWV3KSB7XG4gICAgcmV0dXJuIGJhbGwucG9zaXRpb24ueSA+PSBjYW52YXNWaWV3LmNhbnZhcy5oZWlnaHQgLSBCQUxMX0RJQU1FVEVSO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGlzQmFsbE5lYXJCcmlja3MoYmFsbDogQmFsbCkge1xuICAgIHJldHVybiAoYmFsbC5wb3NpdGlvbi55IDwgQlJJQ0tTX0VORCk7XG59IiwiaW1wb3J0IHsgVmVjdG9yIH0gZnJvbSBcIi4uL3V0aWxzL3ZlY3RvclwiO1xuaW1wb3J0IHtcbiAgICBCUklDS19ST1dTLFxuICAgIEJSSUNLX1dJRFRILFxuICAgIEJSSUNLX0hFSUdIVCxcbiAgICBCT0FSRF9XSURUSCxcbiAgICBCT0FSRF9IRUlHSFQsXG4gICAgQkFMTF9ESUFNRVRFUixcbn0gZnJvbSBcIi4uL3V0aWxzL2NvbnN0YW50c1wiO1xuaW1wb3J0IHsgQmFsbCB9IGZyb20gXCIuLi9maWd1cmVzL0JhbGxcIjtcbmltcG9ydCB7IEJyaWNrIH0gZnJvbSBcIi4uL2ZpZ3VyZXMvQnJpY2tcIjtcbmltcG9ydCB7IEJvYXJkIH0gZnJvbSBcIi4uL2ZpZ3VyZXMvQm9hcmRcIjtcblxuZXhwb3J0IGNsYXNzIENhbnZhc1ZpZXcge1xuICAgIHByaXZhdGUgY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ7XG4gICAgcHVibGljIGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQ7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIGNhbnZhc1NlbGVjdG9yOiBzdHJpbmcsXG4gICAgKSB7XG4gICAgICAgIHRoaXMuY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoY2FudmFzU2VsZWN0b3IpIGFzIEhUTUxDYW52YXNFbGVtZW50O1xuICAgICAgICB0aGlzLmN0eCA9IHRoaXMuY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgfVxuXG4gICAgZHJhd0ltYWdlKHBvc2l0aW9uOiBWZWN0b3IsIGltYWdlOiBIVE1MSW1hZ2VFbGVtZW50LCB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcikge1xuICAgICAgICB0aGlzLmN0eC5kcmF3SW1hZ2UoaW1hZ2UsIHBvc2l0aW9uLngsIHBvc2l0aW9uLnksIHdpZHRoLCBoZWlnaHQpO1xuICAgIH1cblxuICAgIGRyYXdCcmlja3MoYnJpY2tzOiBCcmlja1tdKSB7XG4gICAgICAgIGZvciAobGV0IHIgPSAwOyByIDwgQlJJQ0tfUk9XUzsgcisrKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBjID0gMDsgYyA8IGJyaWNrcy5sZW5ndGg7IGMrKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGJyaWNrID0gYnJpY2tzW2NdO1xuICAgICAgICAgICAgICAgIGNvbnN0IHBvczogVmVjdG9yID0ge1xuICAgICAgICAgICAgICAgICAgICB4OiBicmljay5wb3NpdGlvbi54LFxuICAgICAgICAgICAgICAgICAgICB5OiBicmljay5wb3NpdGlvbi55XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuZHJhd0ltYWdlKHBvcywgYnJpY2suZ2V0SW1hZ2UoKSwgQlJJQ0tfV0lEVEgsIEJSSUNLX0hFSUdIVCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkcmF3QmFsbChiYWxsOiBCYWxsKSB7XG4gICAgICAgIHRoaXMuZHJhd0ltYWdlKGJhbGwucG9zaXRpb24sIGJhbGwuZ2V0SW1hZ2UoKSwgQkFMTF9ESUFNRVRFUiwgQkFMTF9ESUFNRVRFUik7XG4gICAgfVxuXG4gICAgZHJhd0JvYXJkKGJvYXJkOiBCb2FyZCkge1xuICAgICAgICB0aGlzLmN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgdGhpcy5jdHguZHJhd0ltYWdlKGJvYXJkLmltYWdlLCBib2FyZC5wb3NpdGlvbi54LCBib2FyZC5wb3NpdGlvbi55LCBCT0FSRF9XSURUSCwgQk9BUkRfSEVJR0hUKTtcbiAgICAgICAgdGhpcy5jdHguY2xvc2VQYXRoKCk7XG4gICAgfVxuXG4gICAgZ2V0Q29udGV4dCgpOiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQge1xuICAgICAgICByZXR1cm4gdGhpcy5jdHg7XG4gICAgfVxufSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiXG4vL2ltcG9ydCB7IHVwZGF0ZSB9IGZyb20gXCIuL2VuZ2luZS9nYW1lTG9vcFwiO1xuXG5pbXBvcnQgeyBtb3ZlIH0gZnJvbSBcIi4vZW5naW5lL21vdmVcIjtcbmltcG9ydCB7IEJhbGwgfSBmcm9tIFwiLi9maWd1cmVzL0JhbGxcIjtcbmltcG9ydCB7IEJvYXJkIH0gZnJvbSBcIi4vZmlndXJlcy9Cb2FyZFwiO1xuaW1wb3J0IHsgQnJpY2sgfSBmcm9tIFwiLi9maWd1cmVzL0JyaWNrXCI7XG5pbXBvcnQgeyBWZWN0b3IgfSBmcm9tIFwiLi9HZW9tZXRyeS9WZWN0b3JcIjtcbmltcG9ydCB7IGNyZWF0ZUJyaWNrcyB9IGZyb20gXCIuL3V0aWxzL2JyaWNrRmFjdG9yeVwiO1xuaW1wb3J0IHtcbiAgICBJTklUSUFMX0JBTExfWCwgSU5JVElBTF9CQUxMX1ksIEJSSUNLX0JPTlVTX1BPSU5UUyxcbiAgICBCT0FSRF9XSURUSCwgQkFMTF9ESUFNRVRFUiwgQlJJQ0tfSEVJR0hULCBCUklDS19XSURUSCwgQk9BUkRfSEVJR0hUXG59IGZyb20gXCIuL3V0aWxzL2NvbnN0YW50c1wiO1xuaW1wb3J0IHtcbiAgICBpc0JhbGxOZWFyQnJpY2tzLCBpc0JhbGxIaXR0aW5nVGhlRmxvb3IsIGlzQmFsbEhpdHRpbmdUaGVDZWlsaW5nLFxuICAgIGlzQmFsbEhpdHRpbmdSaWdodFdhbGwsIGlzQmFsbEhpdHRpbmdUaGVMZWZ0V2FsbFxufSBmcm9tIFwiLi91dGlscy92YWxpZGF0b3JzXCI7XG5pbXBvcnQgeyBDYW52YXNWaWV3IH0gZnJvbSBcIi4vdmlldy9DYW52YXNWaWV3XCI7XG5cbmNvbnN0IGNhbnZhc1ZpZXcgPSBuZXcgQ2FudmFzVmlldyhcImdhbWVDYW52YXNcIik7XG5sZXQgbGFzdFRpbWUgPSAwO1xubGV0IGVsYXBzZWQgPSAwO1xuY29uc3QgU1RFUF9TSVpFID0gMjA7XG5jb25zdCBib2FyZEltZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdib2FyZCcpIGFzIEhUTUxJbWFnZUVsZW1lbnQ7XG5jb25zdCBib2FyZFBvc2l0aW9uID0gbmV3IFZlY3RvcihjYW52YXNWaWV3LmNhbnZhcy53aWR0aCAvIDIsIGNhbnZhc1ZpZXcuY2FudmFzLmhlaWdodCAtIDEwMCk7XG5sZXQgYnJpY2tzID0gY3JlYXRlQnJpY2tzKCk7XG5sZXQgYm9hcmQgPSBuZXcgQm9hcmQoYm9hcmRQb3NpdGlvbiwgYm9hcmRJbWcpO1xubGV0IGJhbGwgPSBuZXcgQmFsbCh7IHg6IElOSVRJQUxfQkFMTF9YLCB5OiBJTklUSUFMX0JBTExfWSB9LCBcIi9hc3NldHMvYmFsbC5wbmdcIik7XG5jb25zdCBpbnB1dDogeyBbY29kZTogc3RyaW5nXTogYm9vbGVhbiB9ID0ge307XG5cbmxldCBiYWxsVmVsb2NpdHkgPSBuZXcgVmVjdG9yKDMsIDMpO1xubGV0IGdhbWVPdmVyID0gZmFsc2U7XG5sZXQgc2NvcmVQb2ludHMgPSAwO1xubGV0IGJvYXJkVmVsb2NpdHkgPSBuZXcgVmVjdG9yKDAsIDApO1xuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGV2ZW50ID0+IHtcbiAgICBpbnB1dFtldmVudC5jb2RlXSA9IHRydWU7XG59KTtcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIGV2ZW50ID0+IHtcbiAgICBpbnB1dFtldmVudC5jb2RlXSA9IGZhbHNlO1xufSk7XG5cblxuY29uc3QgcGxheUJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbGF5LWJ0bicpO1xubGV0IGlzUGxheU11c2ljID0gZmFsc2U7XG5cbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibmV3LWdhbWVcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBnYW1lT3ZlciA9IGZhbHNlO1xuICAgIHN0YXJ0R2FtZSgpO1xufSk7XG5wbGF5QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250YWluZXInKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnYW1lQ2FudmFzJykuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgc3RhcnRHYW1lKCk7XG5cbiAgICBpZiAoaXNQbGF5TXVzaWMpIHtcbiAgICAgICAgY29uc3QgbXVzaWMgPSBuZXcgQXVkaW8oXCIuLi9hc3NldHMvbXVzaWMubXAzXCIpO1xuICAgICAgICBtdXNpYy52b2x1bWUgPSAwLjE7XG5cbiAgICAgICAgbXVzaWMucGxheSgpO1xuICAgIH1cbn0pO1xuXG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2V0dGluZy1idG4nKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICBjb25zdCBzZXR0aW5nc0NvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzZXR0aW5ncy1jb250YWluZXInKTtcbiAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udGFpbmVyJyk7XG4gICAgc2V0dGluZ3NDb250YWluZXIuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgY29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2JhY2stYnRuJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIHNldHRpbmdzQ29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgIGNvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICB9KVxuXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BsYXktc291bmQtYnRuJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIGlzUGxheU11c2ljID0gdHJ1ZTtcbiAgICB9KVxufSlcblxuZnVuY3Rpb24gc3RhcnRHYW1lKCkge1xuICAgIGJyaWNrcyA9IGNyZWF0ZUJyaWNrcygpO1xuICAgIGJvYXJkID0gbmV3IEJvYXJkKGJvYXJkUG9zaXRpb24sIGJvYXJkSW1nKTtcbiAgICBiYWxsID0gbmV3IEJhbGwoeyB4OiBJTklUSUFMX0JBTExfWCwgeTogSU5JVElBTF9CQUxMX1kgfSwgXCIvYXNzZXRzL2JhbGwucG5nXCIpO1xuICAgIHVwZGF0ZShwZXJmb3JtYW5jZS5ub3coKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGUodGltZTogbnVtYmVyKSB7XG4gICAgY29uc3QgZGVsdGEgPSB0aW1lIC0gbGFzdFRpbWU7XG4gICAgbGFzdFRpbWUgPSB0aW1lO1xuICAgIGVsYXBzZWQgKz0gZGVsdGE7XG4gICAgbGV0IGRlbGV0ZUJyaWNrSW5kZXggPSBpc0JhbGxOZWFyQnJpY2tzKGJhbGwpID8gZ2V0SGl0QnJpY2tJbmRleCgpIDogLTE7XG4gICAgaWYgKGRlbGV0ZUJyaWNrSW5kZXggIT0gLTEpIHtcbiAgICAgICAgY29uc3QgYnJpY2sgPSBicmlja3NbZGVsZXRlQnJpY2tJbmRleF07XG4gICAgICAgIGNoYW5nZUJhbGxEaXJlY3Rpb24oYmFsbCwgYnJpY2spO1xuICAgICAgICAvLyBiYWxsVmVsb2NpdHkueSA9IC1iYWxsVmVsb2NpdHkueTtcbiAgICAgICAgYnJpY2tzLnNwbGljZShkZWxldGVCcmlja0luZGV4LCAxKTtcbiAgICAgICAgc2NvcmVQb2ludHMgKz0gQlJJQ0tfQk9OVVNfUE9JTlRTO1xuICAgIH1cbiAgICBpZiAoZWxhcHNlZCA+IFNURVBfU0laRSAqIDUpIHtcbiAgICAgICAgZWxhcHNlZCA9IFNURVBfU0laRSAqIDU7XG4gICAgfVxuICAgIHdoaWxlIChlbGFwc2VkID4gU1RFUF9TSVpFKSB7XG4gICAgICAgIGVsYXBzZWQgLT0gU1RFUF9TSVpFO1xuICAgICAgICBnYW1lTG9vcCgpO1xuICAgICAgICBkb2N1bWVudFtcIm5ld2dhbWVcIl0gPSB0cnVlO1xuICAgIH1cbiAgICBpZiAoYnJpY2tzLmxlbmd0aCAmJiAhZ2FtZU92ZXIpIHtcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHVwZGF0ZSk7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBnYW1lTG9vcCgpIHtcbiAgICBpZiAoaW5wdXRbJ0Fycm93TGVmdCddICYmIChib2FyZC5wb3NpdGlvbi54ID4gMCkpIHtcbiAgICAgICAgYm9hcmRWZWxvY2l0eS54ID0gLTc7XG4gICAgICAgIG1vdmUoYm9hcmQsIGJvYXJkVmVsb2NpdHkpO1xuICAgIH0gZWxzZSBpZiAoaW5wdXRbJ0Fycm93UmlnaHQnXSAmJiAoYm9hcmQucG9zaXRpb24ueCArIEJPQVJEX1dJRFRIIDwgY2FudmFzVmlldy5jYW52YXMud2lkdGgpKSB7XG4gICAgICAgIGJvYXJkVmVsb2NpdHkueCA9IDc7XG4gICAgICAgIG1vdmUoYm9hcmQsIGJvYXJkVmVsb2NpdHkpO1xuICAgIH1cbiAgICBjYW52YXNWaWV3LmdldENvbnRleHQoKS5jbGVhclJlY3QoMCwgMCwgY2FudmFzVmlldy5jYW52YXMud2lkdGgsIGNhbnZhc1ZpZXcuY2FudmFzLmhlaWdodCk7XG4gICAgY2FudmFzVmlldy5kcmF3QnJpY2tzKGJyaWNrcyk7XG4gICAgY2FudmFzVmlldy5kcmF3Qm9hcmQoYm9hcmQpO1xuICAgIGNhbnZhc1ZpZXcuZHJhd0JhbGwoYmFsbCk7XG4gICAgY29sbGlzaW9uRGV0ZWN0b3IoKTtcbiAgICBtb3ZlKGJhbGwsIGJhbGxWZWxvY2l0eSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb2xsaXNpb25EZXRlY3RvcigpIHtcbiAgICBpZiAoaXNCYWxsQ29sbGlkaW5nV2l0aEJvYXJkKCkpIHtcbiAgICAgICAgaGFuZGxlQm9hcmRIaXQoKTtcbiAgICB9XG4gICAgaWYgKGlzQmFsbEhpdHRpbmdUaGVGbG9vcihiYWxsLCBjYW52YXNWaWV3KSkge1xuICAgICAgICBnYW1lT3ZlciA9IHRydWU7XG4gICAgICAgIHNob3dHYW1lT3Zlck1lc3NhZ2UoKTtcbiAgICB9IGVsc2UgaWYgKGlzQmFsbEhpdHRpbmdUaGVDZWlsaW5nKGJhbGwpKSB7XG4gICAgICAgIGJhbGxWZWxvY2l0eS55ID0gTWF0aC5hYnMoYmFsbFZlbG9jaXR5LnkpO1xuICAgIH0gZWxzZSBpZiAoaXNCYWxsSGl0dGluZ1JpZ2h0V2FsbChiYWxsLCBjYW52YXNWaWV3KSkge1xuICAgICAgICBiYWxsVmVsb2NpdHkueCA9IC0gYmFsbFZlbG9jaXR5Lng7XG4gICAgfSBlbHNlIGlmIChpc0JhbGxIaXR0aW5nVGhlTGVmdFdhbGwoYmFsbCkpIHtcbiAgICAgICAgYmFsbFZlbG9jaXR5LnggPSBNYXRoLmFicyhiYWxsVmVsb2NpdHkueCk7XG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gc2hvd0dhbWVPdmVyTWVzc2FnZSgpIHtcbiAgICBjb25zdCBnYW1lb3ZlckRpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZ2FtZU92ZXJcIik7XG4gICAgZ2FtZW92ZXJEaXYuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICAoZ2FtZW92ZXJEaXYgYXMgSFRNTERpdkVsZW1lbnQpLmlubmVyVGV4dCA9IGBHYW1lIG92ZXIsIHNjb3JlOiR7c2NvcmVQb2ludHN9YDtcblxufVxuXG5leHBvcnQgZnVuY3Rpb24gaGFuZGxlQm9hcmRIaXQoKSB7XG4gICAgaWYgKGlzQmFsbEhpdHRpbmdCb2FyZEVkZ2VzKGJhbGwsIGJvYXJkKSkge1xuICAgICAgICBiYWxsVmVsb2NpdHkueCArPSBib2FyZFZlbG9jaXR5Lng7XG4gICAgfVxuICAgIGJhbGxWZWxvY2l0eS55ID0gLWJhbGxWZWxvY2l0eS55O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNCYWxsSGl0dGluZ0JvYXJkRWRnZXMoYmFsbDogQmFsbCwgYm9hcmQ6IEJvYXJkKSB7XG4gICAgcmV0dXJuIChiYWxsLnBvc2l0aW9uLnggPD0gYm9hcmQucG9zaXRpb24ueCArIEJPQVJEX1dJRFRIXG4gICAgICAgIHx8IGJhbGwucG9zaXRpb24ueCA+PSBib2FyZC5wb3NpdGlvbi54IC0gQkFMTF9ESUFNRVRFUik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRIaXRCcmlja0luZGV4KCkge1xuICAgIHJldHVybiBicmlja3MuZmluZEluZGV4KGJyaWNrID0+IHtcbiAgICAgICAgY29uc3QgbGVmdCA9IGJyaWNrLnBvc2l0aW9uLnggLSBCQUxMX0RJQU1FVEVSIC8gMjtcbiAgICAgICAgY29uc3QgcmlnaHQgPSBicmljay5wb3NpdGlvbi54ICsgQlJJQ0tfV0lEVEggKyBCQUxMX0RJQU1FVEVSIC8gMjtcbiAgICAgICAgY29uc3QgdG9wID0gYnJpY2sucG9zaXRpb24ueSAtIEJBTExfRElBTUVURVIgLyAyO1xuICAgICAgICBjb25zdCBib3R0b20gPSBicmljay5wb3NpdGlvbi55ICsgQlJJQ0tfSEVJR0hUICsgQkFMTF9ESUFNRVRFUiAvIDI7XG4gICAgICAgIHJldHVybiAoKGJhbGwucG9zaXRpb24ueCA+PSBsZWZ0KVxuICAgICAgICAgICAgJiYgKGJhbGwucG9zaXRpb24ueCA8PSByaWdodClcbiAgICAgICAgICAgICYmIChiYWxsLnBvc2l0aW9uLnkgPj0gdG9wKVxuICAgICAgICAgICAgJiYgKGJhbGwucG9zaXRpb24ueSA8PSBib3R0b20pKTtcbiAgICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzQmFsbENvbGxpZGluZ1dpdGhCb2FyZCgpIHtcbiAgICBjb25zb2xlLmxvZyhiYWxsLnBvc2l0aW9uLnkgKyBCQUxMX0RJQU1FVEVSIC8gMiA8PSBib2FyZC5wb3NpdGlvbi55ICsgQk9BUkRfSEVJR0hUKTtcbiAgICBjb25zb2xlLmxvZyhiYWxsLnBvc2l0aW9uLnkgKyBCQUxMX0RJQU1FVEVSIC8gMiA+PSBib2FyZC5wb3NpdGlvbi55KTtcbiAgICBjb25zb2xlLmxvZyhiYWxsLnBvc2l0aW9uLnggPD0gYm9hcmQucG9zaXRpb24ueCArIEJPQVJEX1dJRFRIKTtcbiAgICBjb25zb2xlLmxvZyhiYWxsLnBvc2l0aW9uLnggPj0gYm9hcmQucG9zaXRpb24ueCAtIEJBTExfRElBTUVURVIpO1xuICAgIHJldHVybiAoKGJhbGwucG9zaXRpb24ueSArIEJBTExfRElBTUVURVIgLyAyIDw9IGJvYXJkLnBvc2l0aW9uLnkgKyBCT0FSRF9IRUlHSFQpXG4gICAgICAgICYmIChiYWxsLnBvc2l0aW9uLnkgKyBCQUxMX0RJQU1FVEVSIC8gMiA+PSBib2FyZC5wb3NpdGlvbi55KVxuICAgICAgICAmJiAoYmFsbC5wb3NpdGlvbi54IDw9IGJvYXJkLnBvc2l0aW9uLnggKyBCT0FSRF9XSURUSCArIEJBTExfRElBTUVURVIgLyAyKVxuICAgICAgICAmJiAoYmFsbC5wb3NpdGlvbi54ID49IGJvYXJkLnBvc2l0aW9uLnggLSBCQUxMX0RJQU1FVEVSIC8gMikpXG59XG5cbmZ1bmN0aW9uIGNoYW5nZUJhbGxEaXJlY3Rpb24oYmFsbDogQmFsbCwgYnJpY2s6IEJyaWNrKSB7XG4gICAgY29uc3QgQlJJQ0tfRElBR09OQUwgPSBNYXRoLnNxcnQoQlJJQ0tfSEVJR0hUICoqIDIgKyBCUklDS19XSURUSCAqKiAyKTtcbiAgICBjb25zdCBicmlja0NlbnRlclggPSBicmljay5wb3NpdGlvbi54ICsgQlJJQ0tfV0lEVEggLyAyO1xuICAgIGNvbnN0IGJyaWNrQ2VudGVyWSA9IGJyaWNrLnBvc2l0aW9uLnkgKyBCUklDS19IRUlHSFQgLyAyO1xuICAgIGNvbnN0IGJhbGxDZW50ZXJYID0gYmFsbC5wb3NpdGlvbi54ICsgQkFMTF9ESUFNRVRFUiAvIDI7XG4gICAgY29uc3QgYmFsbENlbnRlclkgPSBiYWxsLnBvc2l0aW9uLnkgKyBCQUxMX0RJQU1FVEVSIC8gMjtcbiAgICBjb25zdCBkZWx0YVkgPSAoQlJJQ0tfSEVJR0hUICogQkFMTF9ESUFNRVRFUiAvIDIpIC8gQlJJQ0tfRElBR09OQUw7XG4gICAgY29uc3QgZGVsdGFYID0gKEJSSUNLX1dJRFRIICogQkFMTF9ESUFNRVRFUiAvIDIpIC8gQlJJQ0tfRElBR09OQUw7XG4gICAgY29uc3QgbWluWVNpZGVIaXQgPSBicmljay5wb3NpdGlvbi55ICsgZGVsdGFZO1xuICAgIGNvbnN0IG1heFlTaWRlSGl0ID0gYnJpY2sucG9zaXRpb24ueSArIEJSSUNLX0hFSUdIVCAtIGRlbHRhWTtcbiAgICBjb25zdCBtaW5YU2lkZUhpdCA9IGJyaWNrLnBvc2l0aW9uLnggLSBkZWx0YVg7XG4gICAgY29uc3QgbWF4WFNpZGVIaXQgPSBicmljay5wb3NpdGlvbi54ICsgZGVsdGFYO1xuICAgIGNvbnN0IGlzQmFsbENvbWluZ0Zyb21CdXR0b21MZWZ0ID0gKChiYWxsQ2VudGVyWCA+IG1pblhTaWRlSGl0KVxuICAgICAgICAmJiAoYmFsbENlbnRlclggPCBtYXhYU2lkZUhpdClcbiAgICAgICAgJiYgKGJhbGxDZW50ZXJZID4gbWluWVNpZGVIaXQpXG4gICAgICAgICYmIChiYWxsQ2VudGVyWSA8IG1heFlTaWRlSGl0KSk7XG4gICAgY29uc3QgaXNCYWxsQ29taW5nRnJvbUJ1dHRvbVJpZ2h0ID0gKChiYWxsQ2VudGVyWCA+IG1pblhTaWRlSGl0ICsgQlJJQ0tfV0lEVEgpXG4gICAgICAgICYmIChiYWxsQ2VudGVyWCA8IG1heFhTaWRlSGl0ICsgQlJJQ0tfV0lEVEgpXG4gICAgICAgICYmIChiYWxsQ2VudGVyWSA+IG1pbllTaWRlSGl0KVxuICAgICAgICAmJiAoYmFsbENlbnRlclkgPCBtYXhZU2lkZUhpdCkpO1xuICAgIGlmICgoaXNCYWxsQ29taW5nRnJvbUJ1dHRvbUxlZnQgJiYgYmFsbFZlbG9jaXR5LnggPiAwKSB8fCAoaXNCYWxsQ29taW5nRnJvbUJ1dHRvbVJpZ2h0ICYmIGJhbGxWZWxvY2l0eS54IDwgMCkpIHtcbiAgICAgICAgYmFsbFZlbG9jaXR5LnggKj0gLTE7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgYmFsbFZlbG9jaXR5LnkgKj0gLTE7XG4gICAgfVxuXG59XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=