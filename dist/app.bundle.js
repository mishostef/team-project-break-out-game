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

/***/ "./src/engine/gameLoop.ts":
/*!********************************!*\
  !*** ./src/engine/gameLoop.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "gameLoop": () => (/* binding */ gameLoop),
/* harmony export */   "isBallHittingBoardEdges": () => (/* binding */ isBallHittingBoardEdges),
/* harmony export */   "update": () => (/* binding */ update)
/* harmony export */ });
/* harmony import */ var _utils_brickFactory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/brickFactory */ "./src/utils/brickFactory.ts");
/* harmony import */ var _view_CanvasView__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../view/CanvasView */ "./src/view/CanvasView.ts");
/* harmony import */ var _figures_Board__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../figures/Board */ "./src/figures/Board.ts");
/* harmony import */ var _figures_Ball__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../figures/Ball */ "./src/figures/Ball.ts");
/* harmony import */ var _Geometry_Vector__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Geometry/Vector */ "./src/Geometry/Vector.ts");
/* harmony import */ var _move__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./move */ "./src/engine/move.ts");
/* harmony import */ var _utils_constants__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/constants */ "./src/utils/constants.ts");
/* harmony import */ var _utils_validators__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utils/validators */ "./src/utils/validators.ts");








const canvasView = new _view_CanvasView__WEBPACK_IMPORTED_MODULE_1__.CanvasView('gameCanvas');
let lastTime = 0;
let elapsed = 0;
const STEP_SIZE = 20;
const bricks = (0,_utils_brickFactory__WEBPACK_IMPORTED_MODULE_0__.createBricks)();
const boardImg = document.getElementById('board');
const boardPosition = new _Geometry_Vector__WEBPACK_IMPORTED_MODULE_4__.Vector(canvasView.canvas.width / 2, canvasView.canvas.height - 100);
const board = new _figures_Board__WEBPACK_IMPORTED_MODULE_2__.Board(boardPosition, boardImg);
const ball = new _figures_Ball__WEBPACK_IMPORTED_MODULE_3__.Ball({ x: _utils_constants__WEBPACK_IMPORTED_MODULE_6__.INITIAL_BALL_X, y: _utils_constants__WEBPACK_IMPORTED_MODULE_6__.INITIAL_BALL_Y }, "/assets/ball.png");
const input = {};
let deleteBrickIndex = -1;
let ballVelocity = new _Geometry_Vector__WEBPACK_IMPORTED_MODULE_4__.Vector(4, 4);
let gameOver = false;
let scorePoints = 0;
let boardVelocity = new _Geometry_Vector__WEBPACK_IMPORTED_MODULE_4__.Vector(0, 0);
window.addEventListener('keydown', event => {
    input[event.code] = true;
});
window.addEventListener('keyup', event => {
    input[event.code] = false;
});
function update(time) {
    const delta = time - lastTime;
    lastTime = time;
    elapsed += delta;
    if (deleteBrickIndex != -1) {
        bricks.splice(deleteBrickIndex, 1);
        scorePoints += _utils_constants__WEBPACK_IMPORTED_MODULE_6__.BRICK_BONUS_POINTS;
        deleteBrickIndex = -1;
        ballVelocity.y = -ballVelocity.y;
    }
    if (elapsed > STEP_SIZE * 5) {
        elapsed = STEP_SIZE * 5;
    }
    while (elapsed > STEP_SIZE) {
        elapsed -= STEP_SIZE;
        gameLoop();
    }
    if (bricks.length && !gameOver) {
        requestAnimationFrame(update);
    }
}
function gameLoop() {
    console.log('cavas.width=', canvasView.canvas.width);
    console.log("board.position.x", board.position.x);
    if (input['ArrowLeft'] && (board.position.x > 0)) {
        boardVelocity.x = -10;
        (0,_move__WEBPACK_IMPORTED_MODULE_5__.move)(board, boardVelocity);
    }
    else if (input['ArrowRight'] && (board.position.x + _utils_constants__WEBPACK_IMPORTED_MODULE_6__.BOARD_WIDTH < canvasView.canvas.width)) {
        boardVelocity.x = 10;
        (0,_move__WEBPACK_IMPORTED_MODULE_5__.move)(board, boardVelocity);
    }
    canvasView.getContext().clearRect(0, 0, canvasView.canvas.width, canvasView.canvas.height);
    canvasView.drawBricks(bricks);
    canvasView.drawBoard(board);
    canvasView.drawBall(ball);
    collisionDetector();
    (0,_move__WEBPACK_IMPORTED_MODULE_5__.move)(ball, ballVelocity);
}
function collisionDetector() {
    if (isBallCollidingWithBoard()) {
        handleBoardEdgeHit();
    }
    if ((0,_utils_validators__WEBPACK_IMPORTED_MODULE_7__.isBallNearBricks)(ball)) {
        setHitBrickIndex();
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
    document.getElementById('container').style.display = "block";
}
function handleBoardEdgeHit() {
    if (isBallHittingBoardEdges(ball, board)) {
        if (Math.abs(ballVelocity.x) <= 0.2 && Math.abs(ballVelocity.y) <= 0.2) {
            ballVelocity.x = 4;
            ballVelocity.y = 4;
        }
        ballVelocity.x = -5 * ballVelocity.y;
        ballVelocity.y = -1 * ballVelocity.y;
    }
    else {
        ballVelocity.y = -ballVelocity.y;
    }
}
function isBallHittingBoardEdges(ball, board) {
    return (ball.position.x <= board.position.x - _utils_constants__WEBPACK_IMPORTED_MODULE_6__.BRICK_WIDTH / 2 + _utils_constants__WEBPACK_IMPORTED_MODULE_6__.BALL_DIAMETER / 2
        || ball.position.x >= board.position.x + _utils_constants__WEBPACK_IMPORTED_MODULE_6__.BRICK_WIDTH / 2 - _utils_constants__WEBPACK_IMPORTED_MODULE_6__.BALL_DIAMETER / 2);
}
function setHitBrickIndex() {
    deleteBrickIndex = bricks.findIndex(b => ((b.position.y - _utils_constants__WEBPACK_IMPORTED_MODULE_6__.BRICK_HEIGHT / 2 <= ball.position.y - _utils_constants__WEBPACK_IMPORTED_MODULE_6__.BALL_DIAMETER / 2)
        && (b.position.y + _utils_constants__WEBPACK_IMPORTED_MODULE_6__.BRICK_HEIGHT / 2 >= ball.position.y - _utils_constants__WEBPACK_IMPORTED_MODULE_6__.BALL_DIAMETER / 2)
        && (b.position.x + _utils_constants__WEBPACK_IMPORTED_MODULE_6__.BRICK_WIDTH / 2 >= ball.position.x - _utils_constants__WEBPACK_IMPORTED_MODULE_6__.BALL_DIAMETER / 2)
        && (b.position.x - _utils_constants__WEBPACK_IMPORTED_MODULE_6__.BRICK_WIDTH / 2 <= ball.position.x - _utils_constants__WEBPACK_IMPORTED_MODULE_6__.BALL_DIAMETER / 2)));
}
function isBallCollidingWithBoard() {
    return (ball.position.y <= board.position.y + _utils_constants__WEBPACK_IMPORTED_MODULE_6__.BOARD_HEIGHT / 2 - _utils_constants__WEBPACK_IMPORTED_MODULE_6__.BALL_DIAMETER / 2
        && ball.position.y >= board.position.y - _utils_constants__WEBPACK_IMPORTED_MODULE_6__.BOARD_HEIGHT / 2 - _utils_constants__WEBPACK_IMPORTED_MODULE_6__.BALL_DIAMETER / 2
        && ball.position.x <= board.position.x + _utils_constants__WEBPACK_IMPORTED_MODULE_6__.BOARD_WIDTH / 2
        && ball.position.x >= board.position.x - _utils_constants__WEBPACK_IMPORTED_MODULE_6__.BOARD_WIDTH / 2);
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
const BOARD_WIDTH = 100;
const BOARD_HEIGHT = 20;
//BALL
const BALL_WIDTH = 40;
const BALL_HEIGHT = 40;
const INITIAL_BALL_X = 200;
const INITIAL_BALL_Y = 200;
const BALL_DIAMETER = 50;
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
        //this.canvas.style.display = 'block';
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
        this.drawImage(ball.position, ball.getImage(), _utils_constants__WEBPACK_IMPORTED_MODULE_0__.BALL_WIDTH, _utils_constants__WEBPACK_IMPORTED_MODULE_0__.BALL_HEIGHT);
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
/* harmony import */ var _engine_gameLoop__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./engine/gameLoop */ "./src/engine/gameLoop.ts");

console.log('app.ts');
const playBtn = document.getElementById('play-btn');
playBtn.addEventListener('click', () => {
    document.getElementById('container').style.display = 'none';
    document.getElementById('gameCanvas').style.display = 'block';
    startGame();
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
});
function startGame() {
    (0,_engine_gameLoop__WEBPACK_IMPORTED_MODULE_0__.update)(performance.now());
}

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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TyxHQUFHLE9BQU8sQ0FBQztJQUM5RCxTQUFTLEVBQUUsQ0FBQztBQUNoQixDQUFDLENBQUMsQ0FBQztBQUVILFFBQVEsQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRTtJQUNsRSxNQUFNLGlCQUFpQixHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsb0JBQW9CLENBQUMsQ0FBQztJQUN4RSxNQUFNLFNBQVMsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBRXZELGlCQUFpQixDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO0lBQzFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztJQUVqQyxRQUFRLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUU7UUFDL0QsaUJBQWlCLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7UUFDekMsU0FBUyxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO0lBQ3RDLENBQUMsQ0FBQztBQUNOLENBQUMsQ0FBQztBQUVGLFNBQVMsU0FBUztJQUNkLHdEQUFNLENBQUMsV0FBVyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7QUFDOUIsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2J1ZGdldGVlci10cy8uL3NyYy9HZW9tZXRyeS9WZWN0b3IudHMiLCJ3ZWJwYWNrOi8vYnVkZ2V0ZWVyLXRzLy4vc3JjL2VuZ2luZS9nYW1lTG9vcC50cyIsIndlYnBhY2s6Ly9idWRnZXRlZXItdHMvLi9zcmMvZW5naW5lL21vdmUudHMiLCJ3ZWJwYWNrOi8vYnVkZ2V0ZWVyLXRzLy4vc3JjL2ZpZ3VyZXMvQmFsbC50cyIsIndlYnBhY2s6Ly9idWRnZXRlZXItdHMvLi9zcmMvZmlndXJlcy9Cb2FyZC50cyIsIndlYnBhY2s6Ly9idWRnZXRlZXItdHMvLi9zcmMvZmlndXJlcy9Ccmljay50cyIsIndlYnBhY2s6Ly9idWRnZXRlZXItdHMvLi9zcmMvdXRpbHMvYnJpY2tGYWN0b3J5LnRzIiwid2VicGFjazovL2J1ZGdldGVlci10cy8uL3NyYy91dGlscy9jb25zdGFudHMudHMiLCJ3ZWJwYWNrOi8vYnVkZ2V0ZWVyLXRzLy4vc3JjL3V0aWxzL3ZhbGlkYXRvcnMudHMiLCJ3ZWJwYWNrOi8vYnVkZ2V0ZWVyLXRzLy4vc3JjL3ZpZXcvQ2FudmFzVmlldy50cyIsIndlYnBhY2s6Ly9idWRnZXRlZXItdHMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYnVkZ2V0ZWVyLXRzL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9idWRnZXRlZXItdHMvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9idWRnZXRlZXItdHMvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9idWRnZXRlZXItdHMvLi9zcmMvYXBwLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBvaW50IH0gZnJvbSBcIi4vSW50ZXJmYWNlc1wiO1xuXG5leHBvcnQgY2xhc3MgVmVjdG9yIGltcGxlbWVudHMgUG9pbnQge1xuICAgIHg6IG51bWJlcjtcbiAgICB5OiBudW1iZXI7XG5cbiAgICBjb25zdHJ1Y3RvcihwOiBQb2ludClcbiAgICBjb25zdHJ1Y3Rvcih4OiBudW1iZXIsIHk6IG51bWJlcilcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgeE9yUG9pbnQ6IG51bWJlciB8IFBvaW50LFxuICAgICAgICB5PzogbnVtYmVyXG4gICAgKSB7XG4gICAgICAgIGlmICh0eXBlb2YgeE9yUG9pbnQgPT0gJ251bWJlcicgJiYgdHlwZW9mIHkgPT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIHRoaXMueCA9IHhPclBvaW50O1xuICAgICAgICAgICAgdGhpcy55ID0geTtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgeE9yUG9pbnQgPT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIHRoaXMueCA9IHhPclBvaW50Lng7XG4gICAgICAgICAgICB0aGlzLnkgPSB4T3JQb2ludC55O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYWRkKHA6IFBvaW50KSB7XG4gICAgICAgIHRoaXMueCArPSBwLng7XG4gICAgICAgIHRoaXMueSArPSBwLnk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHNjYWxlKHM6IG51bWJlcikge1xuICAgICAgICB0aGlzLnggKj0gcztcbiAgICAgICAgdGhpcy55ICo9IHM7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgZGlzdChwOiBQb2ludCkge1xuICAgICAgICBjb25zdCBkeCA9IHRoaXMueCAtIHAueDtcbiAgICAgICAgY29uc3QgZHkgPSB0aGlzLnkgLSBwLnk7XG4gICAgICAgIHJldHVybiBNYXRoLnNxcnQoZHggKiogMiArIGR5ICoqIDIpO1xuICAgIH1cblxuICAgIHNxTGVuZ3RoKCkge1xuICAgICAgICByZXR1cm4gdGhpcy54ICoqIDIgKyB0aGlzLnkgKiogMjtcbiAgICB9XG5cbiAgICBzdGF0aWMgYWRkKHAxOiBQb2ludCwgcDI6IFBvaW50KSB7XG4gICAgICAgIHJldHVybiBuZXcgVmVjdG9yKHAxLnggKyBwMi54LCBwMS55ICsgcDIueSk7XG4gICAgfVxufSIsImltcG9ydCB7IGNyZWF0ZUJyaWNrcyB9IGZyb20gXCIuLi91dGlscy9icmlja0ZhY3RvcnlcIjtcbmltcG9ydCB7IENhbnZhc1ZpZXcgfSBmcm9tIFwiLi4vdmlldy9DYW52YXNWaWV3XCI7XG5pbXBvcnQgeyBCb2FyZCB9IGZyb20gXCIuLi9maWd1cmVzL0JvYXJkXCI7XG5pbXBvcnQgeyBCYWxsIH0gZnJvbSBcIi4uL2ZpZ3VyZXMvQmFsbFwiO1xuaW1wb3J0IHsgVmVjdG9yIH0gZnJvbSBcIi4uL0dlb21ldHJ5L1ZlY3RvclwiO1xuaW1wb3J0IHsgbW92ZSB9IGZyb20gXCIuL21vdmVcIjtcbmltcG9ydCB7XG4gICAgQkFMTF9ESUFNRVRFUixcbiAgICBCT0FSRF9IRUlHSFQsIEJPQVJEX1dJRFRILCBCUklDS19CT05VU19QT0lOVFMsIEJSSUNLX0hFSUdIVCwgQlJJQ0tfV0lEVEgsXG4gICAgSU5JVElBTF9CQUxMX1gsIElOSVRJQUxfQkFMTF9ZXG59IGZyb20gXCIuLi91dGlscy9jb25zdGFudHNcIjtcbmltcG9ydCB7XG4gICAgaXNCYWxsSGl0dGluZ1RoZUZsb29yLCBpc0JhbGxIaXR0aW5nVGhlQ2VpbGluZywgaXNCYWxsSGl0dGluZ1JpZ2h0V2FsbCxcbiAgICBpc0JhbGxIaXR0aW5nVGhlTGVmdFdhbGwsIGlzQmFsbE5lYXJCcmlja3Ncbn0gZnJvbSBcIi4uL3V0aWxzL3ZhbGlkYXRvcnNcIjtcblxuXG5jb25zdCBjYW52YXNWaWV3ID0gbmV3IENhbnZhc1ZpZXcoJ2dhbWVDYW52YXMnKTtcbmxldCBsYXN0VGltZSA9IDA7XG5sZXQgZWxhcHNlZCA9IDA7XG5jb25zdCBTVEVQX1NJWkUgPSAyMDtcbmNvbnN0IGJyaWNrcyA9IGNyZWF0ZUJyaWNrcygpO1xuY29uc3QgYm9hcmRJbWcgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYm9hcmQnKSBhcyBIVE1MSW1hZ2VFbGVtZW50O1xuY29uc3QgYm9hcmRQb3NpdGlvbiA9IG5ldyBWZWN0b3IoY2FudmFzVmlldy5jYW52YXMud2lkdGggLyAyLCBjYW52YXNWaWV3LmNhbnZhcy5oZWlnaHQgLSAxMDApO1xuY29uc3QgYm9hcmQgPSBuZXcgQm9hcmQoYm9hcmRQb3NpdGlvbiwgYm9hcmRJbWcpO1xuY29uc3QgYmFsbCA9IG5ldyBCYWxsKHsgeDogSU5JVElBTF9CQUxMX1gsIHk6IElOSVRJQUxfQkFMTF9ZIH0sIFwiL2Fzc2V0cy9iYWxsLnBuZ1wiKTtcbmNvbnN0IGlucHV0OiB7IFtjb2RlOiBzdHJpbmddOiBib29sZWFuIH0gPSB7fTtcbmxldCBkZWxldGVCcmlja0luZGV4ID0gLTE7XG5sZXQgYmFsbFZlbG9jaXR5ID0gbmV3IFZlY3Rvcig0LCA0KTtcbmxldCBnYW1lT3ZlciA9IGZhbHNlO1xubGV0IHNjb3JlUG9pbnRzID0gMDtcbmxldCBib2FyZFZlbG9jaXR5ID0gbmV3IFZlY3RvcigwLCAwKTtcblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBldmVudCA9PiB7XG4gICAgaW5wdXRbZXZlbnQuY29kZV0gPSB0cnVlO1xufSk7XG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBldmVudCA9PiB7XG4gICAgaW5wdXRbZXZlbnQuY29kZV0gPSBmYWxzZTtcbn0pO1xuXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlKHRpbWU6IG51bWJlcikge1xuICAgIGNvbnN0IGRlbHRhID0gdGltZSAtIGxhc3RUaW1lO1xuICAgIGxhc3RUaW1lID0gdGltZTtcbiAgICBlbGFwc2VkICs9IGRlbHRhO1xuICAgIGlmIChkZWxldGVCcmlja0luZGV4ICE9IC0xKSB7XG4gICAgICAgIGJyaWNrcy5zcGxpY2UoZGVsZXRlQnJpY2tJbmRleCwgMSk7XG4gICAgICAgIHNjb3JlUG9pbnRzICs9IEJSSUNLX0JPTlVTX1BPSU5UUztcbiAgICAgICAgZGVsZXRlQnJpY2tJbmRleCA9IC0xO1xuICAgICAgICBiYWxsVmVsb2NpdHkueSA9IC1iYWxsVmVsb2NpdHkueTtcbiAgICB9XG4gICAgaWYgKGVsYXBzZWQgPiBTVEVQX1NJWkUgKiA1KSB7XG4gICAgICAgIGVsYXBzZWQgPSBTVEVQX1NJWkUgKiA1O1xuICAgIH1cbiAgICB3aGlsZSAoZWxhcHNlZCA+IFNURVBfU0laRSkge1xuICAgICAgICBlbGFwc2VkIC09IFNURVBfU0laRTtcbiAgICAgICAgZ2FtZUxvb3AoKTtcbiAgICB9XG4gICAgaWYgKGJyaWNrcy5sZW5ndGggJiYgIWdhbWVPdmVyKSB7XG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSh1cGRhdGUpO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gZ2FtZUxvb3AoKSB7XG5cbiAgICBjb25zb2xlLmxvZygnY2F2YXMud2lkdGg9JywgY2FudmFzVmlldy5jYW52YXMud2lkdGgpO1xuICAgIGNvbnNvbGUubG9nKFwiYm9hcmQucG9zaXRpb24ueFwiLCBib2FyZC5wb3NpdGlvbi54KTtcbiAgICBpZiAoaW5wdXRbJ0Fycm93TGVmdCddICYmIChib2FyZC5wb3NpdGlvbi54ID4gMCkpIHtcbiAgICAgICAgYm9hcmRWZWxvY2l0eS54ID0gLTEwO1xuICAgICAgICBtb3ZlKGJvYXJkLCBib2FyZFZlbG9jaXR5KTtcbiAgICB9IGVsc2UgaWYgKGlucHV0WydBcnJvd1JpZ2h0J10gJiYgKGJvYXJkLnBvc2l0aW9uLnggKyBCT0FSRF9XSURUSCA8IGNhbnZhc1ZpZXcuY2FudmFzLndpZHRoKSkge1xuICAgICAgICBib2FyZFZlbG9jaXR5LnggPSAxMDtcbiAgICAgICAgbW92ZShib2FyZCwgYm9hcmRWZWxvY2l0eSk7XG4gICAgfVxuICAgIGNhbnZhc1ZpZXcuZ2V0Q29udGV4dCgpLmNsZWFyUmVjdCgwLCAwLCBjYW52YXNWaWV3LmNhbnZhcy53aWR0aCwgY2FudmFzVmlldy5jYW52YXMuaGVpZ2h0KTtcbiAgICBjYW52YXNWaWV3LmRyYXdCcmlja3MoYnJpY2tzKTtcbiAgICBjYW52YXNWaWV3LmRyYXdCb2FyZChib2FyZCk7XG4gICAgY2FudmFzVmlldy5kcmF3QmFsbChiYWxsKTtcbiAgICBjb2xsaXNpb25EZXRlY3RvcigpO1xuICAgIG1vdmUoYmFsbCwgYmFsbFZlbG9jaXR5KTtcbn1cblxuZnVuY3Rpb24gY29sbGlzaW9uRGV0ZWN0b3IoKSB7XG4gICAgaWYgKGlzQmFsbENvbGxpZGluZ1dpdGhCb2FyZCgpKSB7XG4gICAgICAgIGhhbmRsZUJvYXJkRWRnZUhpdCgpO1xuICAgIH1cbiAgICBpZiAoaXNCYWxsTmVhckJyaWNrcyhiYWxsKSkge1xuICAgICAgICBzZXRIaXRCcmlja0luZGV4KCk7XG4gICAgfVxuICAgIGlmIChpc0JhbGxIaXR0aW5nVGhlRmxvb3IoYmFsbCwgY2FudmFzVmlldykpIHtcbiAgICAgICAgZ2FtZU92ZXIgPSB0cnVlO1xuICAgICAgICBzaG93R2FtZU92ZXJNZXNzYWdlKCk7XG4gICAgfSBlbHNlIGlmIChpc0JhbGxIaXR0aW5nVGhlQ2VpbGluZyhiYWxsKSkge1xuICAgICAgICBiYWxsVmVsb2NpdHkueSA9IE1hdGguYWJzKGJhbGxWZWxvY2l0eS55KTtcbiAgICB9IGVsc2UgaWYgKGlzQmFsbEhpdHRpbmdSaWdodFdhbGwoYmFsbCwgY2FudmFzVmlldykpIHtcbiAgICAgICAgYmFsbFZlbG9jaXR5LnggPSAtIGJhbGxWZWxvY2l0eS54O1xuICAgIH0gZWxzZSBpZiAoaXNCYWxsSGl0dGluZ1RoZUxlZnRXYWxsKGJhbGwpKSB7XG4gICAgICAgIGJhbGxWZWxvY2l0eS54ID0gTWF0aC5hYnMoYmFsbFZlbG9jaXR5LngpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gc2hvd0dhbWVPdmVyTWVzc2FnZSgpIHtcbiAgICBjb25zdCBnYW1lb3ZlckRpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZ2FtZU92ZXJcIik7XG4gICAgZ2FtZW92ZXJEaXYuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICAoZ2FtZW92ZXJEaXYgYXMgSFRNTERpdkVsZW1lbnQpLmlubmVyVGV4dCA9IGBHYW1lIG92ZXIsIHNjb3JlOiR7c2NvcmVQb2ludHN9YDtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udGFpbmVyJykuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbn1cblxuZnVuY3Rpb24gaGFuZGxlQm9hcmRFZGdlSGl0KCkge1xuICAgIGlmIChpc0JhbGxIaXR0aW5nQm9hcmRFZGdlcyhiYWxsLCBib2FyZCkpIHtcbiAgICAgICAgaWYgKE1hdGguYWJzKGJhbGxWZWxvY2l0eS54KSA8PSAwLjIgJiYgTWF0aC5hYnMoYmFsbFZlbG9jaXR5LnkpIDw9IDAuMikge1xuICAgICAgICAgICAgYmFsbFZlbG9jaXR5LnggPSA0O1xuICAgICAgICAgICAgYmFsbFZlbG9jaXR5LnkgPSA0O1xuICAgICAgICB9XG4gICAgICAgIGJhbGxWZWxvY2l0eS54ID0gLTUgKiBiYWxsVmVsb2NpdHkueTtcbiAgICAgICAgYmFsbFZlbG9jaXR5LnkgPSAtMSAqIGJhbGxWZWxvY2l0eS55O1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGJhbGxWZWxvY2l0eS55ID0gLWJhbGxWZWxvY2l0eS55O1xuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzQmFsbEhpdHRpbmdCb2FyZEVkZ2VzKGJhbGw6IEJhbGwsIGJvYXJkOiBCb2FyZCkge1xuICAgIHJldHVybiAoYmFsbC5wb3NpdGlvbi54IDw9IGJvYXJkLnBvc2l0aW9uLnggLSBCUklDS19XSURUSCAvIDIgKyBCQUxMX0RJQU1FVEVSIC8gMlxuICAgICAgICB8fCBiYWxsLnBvc2l0aW9uLnggPj0gYm9hcmQucG9zaXRpb24ueCArIEJSSUNLX1dJRFRIIC8gMiAtIEJBTExfRElBTUVURVIgLyAyKTtcbn1cblxuZnVuY3Rpb24gc2V0SGl0QnJpY2tJbmRleCgpIHtcbiAgICBkZWxldGVCcmlja0luZGV4ID0gYnJpY2tzLmZpbmRJbmRleChiID0+ICgoYi5wb3NpdGlvbi55IC0gQlJJQ0tfSEVJR0hUIC8gMiA8PSBiYWxsLnBvc2l0aW9uLnkgLSBCQUxMX0RJQU1FVEVSIC8gMilcbiAgICAgICAgJiYgKGIucG9zaXRpb24ueSArIEJSSUNLX0hFSUdIVCAvIDIgPj0gYmFsbC5wb3NpdGlvbi55IC0gQkFMTF9ESUFNRVRFUiAvIDIpXG4gICAgICAgICYmIChiLnBvc2l0aW9uLnggKyBCUklDS19XSURUSCAvIDIgPj0gYmFsbC5wb3NpdGlvbi54IC0gQkFMTF9ESUFNRVRFUiAvIDIpXG4gICAgICAgICYmIChiLnBvc2l0aW9uLnggLSBCUklDS19XSURUSCAvIDIgPD0gYmFsbC5wb3NpdGlvbi54IC0gQkFMTF9ESUFNRVRFUiAvIDIpKSk7XG59XG5cbmZ1bmN0aW9uIGlzQmFsbENvbGxpZGluZ1dpdGhCb2FyZCgpIHtcbiAgICByZXR1cm4gKGJhbGwucG9zaXRpb24ueSA8PSBib2FyZC5wb3NpdGlvbi55ICsgQk9BUkRfSEVJR0hUIC8gMiAtIEJBTExfRElBTUVURVIgLyAyXG4gICAgICAgICYmIGJhbGwucG9zaXRpb24ueSA+PSBib2FyZC5wb3NpdGlvbi55IC0gQk9BUkRfSEVJR0hUIC8gMiAtIEJBTExfRElBTUVURVIgLyAyXG4gICAgICAgICYmIGJhbGwucG9zaXRpb24ueCA8PSBib2FyZC5wb3NpdGlvbi54ICsgQk9BUkRfV0lEVEggLyAyXG4gICAgICAgICYmIGJhbGwucG9zaXRpb24ueCA+PSBib2FyZC5wb3NpdGlvbi54IC0gQk9BUkRfV0lEVEggLyAyKVxufSIsImltcG9ydCB7IFZlY3RvciB9IGZyb20gXCIuLi91dGlscy92ZWN0b3JcIjtcblxuXG5leHBvcnQgZnVuY3Rpb24gbW92ZShnYW1lT2JqZWN0OiBHYW1lT2JqZWN0LCB2ZWxvY2l0eTogVmVjdG9yKSB7XG4gICAgZ2FtZU9iamVjdC5wb3NpdGlvbi54ICs9IHZlbG9jaXR5Lng7XG4gICAgZ2FtZU9iamVjdC5wb3NpdGlvbi55ICs9IHZlbG9jaXR5Lnk7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgR2FtZU9iamVjdCB7XG4gICAgcG9zaXRpb246IHsgeDogbnVtYmVyLCB5OiBudW1iZXIgfVxufSIsImltcG9ydCB7IFZlY3RvciB9IGZyb20gXCIuLi91dGlscy92ZWN0b3JcIjtcblxuZXhwb3J0IGNsYXNzIEJhbGwge1xuICAgIHByaXZhdGUgaW1hZ2U6IEhUTUxJbWFnZUVsZW1lbnQgPSBuZXcgSW1hZ2UoKTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwdWJsaWMgcG9zaXRpb246IFZlY3RvcixcbiAgICAgICAgaW1hZ2U6IHN0cmluZ1xuICAgICkge1xuICAgICAgICB0aGlzLmltYWdlLnNyYyA9IGltYWdlO1xuICAgIH1cblxuICAgIGdldEltYWdlKCk6IEhUTUxJbWFnZUVsZW1lbnQge1xuICAgICAgICByZXR1cm4gdGhpcy5pbWFnZTtcbiAgICB9XG59IiwiaW1wb3J0IHsgVmVjdG9yIH0gZnJvbSBcIi4uL3V0aWxzL3ZlY3RvclwiO1xuZXhwb3J0IGNsYXNzIEJvYXJkIHtcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgcG9zaXRpb246IFZlY3RvciwgcHVibGljIGltYWdlOiBIVE1MSW1hZ2VFbGVtZW50KSB7IH1cbn0iLCJpbXBvcnQgeyBWZWN0b3IgfSBmcm9tIFwiLi4vdXRpbHMvdmVjdG9yXCI7XG5cbmV4cG9ydCBjbGFzcyBCcmljayB7XG4gICAgcHJpdmF0ZSBpbWFnZTogSFRNTEltYWdlRWxlbWVudCA9IG5ldyBJbWFnZSgpO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHB1YmxpYyBwb3NpdGlvbjogVmVjdG9yLFxuICAgICAgICBpbWFnZTogc3RyaW5nXG4gICAgKSB7XG4gICAgICAgIHRoaXMuaW1hZ2Uuc3JjID0gaW1hZ2U7XG4gICAgfVxuXG4gICAgZ2V0SW1hZ2UoKTogSFRNTEltYWdlRWxlbWVudCB7XG4gICAgICAgIHJldHVybiB0aGlzLmltYWdlO1xuICAgIH1cbn0iLCJpbXBvcnQgeyBCcmljayB9IGZyb20gXCIuLi9maWd1cmVzL0JyaWNrXCI7XG5pbXBvcnQge1xuICAgIEJSSUNLU19DT0xTLFxuICAgIEJSSUNLX1JPV1MsXG4gICAgSU5DUkVFTU5UX0RPV05fQlJJQ0ssXG4gICAgSU5DUkVNRU5UX0xFRlRfQlJJQ0ssXG4gICAgSU5JVElBTF9TVEFSVF9CUklDS19MRUZULFxuICAgIElOSVRJQUxfU1RBUlRfQlJJQ0tfUklHSFRcbn0gZnJvbSBcIi4vY29uc3RhbnRzXCI7XG5cbmltcG9ydCB7IFZlY3RvciB9IGZyb20gXCIuL3ZlY3RvclwiO1xuXG5jb25zdCBicmlja3NJbWFnZSA9IFtcbiAgICBcIi9hc3NldHMvYnJpY2stYmx1ZS5wbmdcIixcbiAgICBcIi9hc3NldHMvYnJpY2stZ3JlZW4ucG5nXCIsXG4gICAgXCIvYXNzZXRzL2JyaWNrLXB1cnBsZS5wbmdcIixcbiAgICBcIi9hc3NldHMvYnJpY2stcmVkLnBuZ1wiLFxuICAgIFwiL2Fzc2V0cy9icmljay15ZWxsb3cucG5nXCJcbl1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUJyaWNrcygpOiBCcmlja1tdIHtcbiAgICBsZXQgeCA9IElOSVRJQUxfU1RBUlRfQlJJQ0tfTEVGVDtcbiAgICBsZXQgeSA9IElOSVRJQUxfU1RBUlRfQlJJQ0tfUklHSFQ7XG5cbiAgICBjb25zdCBicmlja3M6IEJyaWNrW10gPSBbXTtcblxuICAgIGZvciAobGV0IHJvdyA9IDA7IHJvdyA8IEJSSUNLX1JPV1M7IHJvdysrKSB7XG4gICAgICAgIGZvciAobGV0IGNvbCA9IDA7IGNvbCA8IEJSSUNLU19DT0xTOyBjb2wrKykge1xuICAgICAgICAgICAgY29uc3QgcG9zOiBWZWN0b3IgPSB7IHgsIHkgfTtcblxuICAgICAgICAgICAgY29uc3QgcmFuZFBvcyA9IE1hdGgucmFuZG9tKCkgKiBicmlja3NJbWFnZS5sZW5ndGggfCAwO1xuICAgICAgICAgICAgY29uc3QgYnJpY2sgPSBuZXcgQnJpY2socG9zLCBicmlja3NJbWFnZVtyYW5kUG9zXSlcbiAgICAgICAgICAgIGJyaWNrcy5wdXNoKGJyaWNrKTtcbiAgICAgICAgICAgIHggKz0gSU5DUkVNRU5UX0xFRlRfQlJJQ0s7XG4gICAgICAgIH1cbiAgICBcbiAgICAgICAgeCA9IElOSVRJQUxfU1RBUlRfQlJJQ0tfTEVGVDtcbiAgICAgICAgeSArPSBJTkNSRUVNTlRfRE9XTl9CUklDSztcbiAgICB9XG4gICAgcmV0dXJuIGJyaWNrcztcbn0iLCJcbi8vIEJSSUNLU1xuZXhwb3J0IGNvbnN0IEJSSUNLX1JPV1MgPSAzO1xuZXhwb3J0IGNvbnN0IEJSSUNLU19DT0xTID0gMTA7XG5leHBvcnQgY29uc3QgQlJJQ0tfV0lEVEggPSAxMDA7XG5leHBvcnQgY29uc3QgQlJJQ0tfSEVJR0hUID0gNDA7XG5leHBvcnQgY29uc3QgSU5JVElBTF9TVEFSVF9CUklDS19MRUZUID0gMTA7XG5leHBvcnQgY29uc3QgSU5JVElBTF9TVEFSVF9CUklDS19SSUdIVCA9IDEwO1xuZXhwb3J0IGNvbnN0IElOQ1JFTUVOVF9MRUZUX0JSSUNLID0gMTIwO1xuZXhwb3J0IGNvbnN0IElOQ1JFRU1OVF9ET1dOX0JSSUNLID0gNjA7XG5leHBvcnQgY29uc3QgQlJJQ0tTX0VORCA9IDE3MDtcblxuLy8gQk9BUkRcbmV4cG9ydCBjb25zdCBCT0FSRF9XSURUSCA9IDEwMDtcbmV4cG9ydCBjb25zdCBCT0FSRF9IRUlHSFQgPSAyMDtcblxuLy9CQUxMXG5leHBvcnQgY29uc3QgQkFMTF9XSURUSCA9IDQwO1xuZXhwb3J0IGNvbnN0IEJBTExfSEVJR0hUID0gNDA7XG5leHBvcnQgY29uc3QgSU5JVElBTF9CQUxMX1ggPSAyMDA7XG5leHBvcnQgY29uc3QgSU5JVElBTF9CQUxMX1kgPSAyMDA7XG5leHBvcnQgY29uc3QgQkFMTF9ESUFNRVRFUiA9IDUwO1xuXG4vL01JU0NFTExBTkVPVVNcbmV4cG9ydCBjb25zdCBCUklDS19CT05VU19QT0lOVFMgPSAxMDsiLCJpbXBvcnQgeyBCYWxsIH0gZnJvbSBcIi4uL2ZpZ3VyZXMvQmFsbFwiO1xuaW1wb3J0IHsgQm9hcmQgfSBmcm9tIFwiLi4vZmlndXJlcy9Cb2FyZFwiO1xuaW1wb3J0IHsgQ2FudmFzVmlldyB9IGZyb20gXCIuLi92aWV3L0NhbnZhc1ZpZXdcIjtcbmltcG9ydCB7IEJBTExfRElBTUVURVIsIEJSSUNLU19FTkQsIEJSSUNLX1dJRFRIIH0gZnJvbSBcIi4vY29uc3RhbnRzXCI7XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGlzQmFsbEhpdHRpbmdUaGVMZWZ0V2FsbChiYWxsOiBCYWxsKSB7XG4gICAgcmV0dXJuIGJhbGwucG9zaXRpb24ueCA8PSAwO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNCYWxsSGl0dGluZ1JpZ2h0V2FsbChiYWxsLCBjYW52YXNWaWV3OiBDYW52YXNWaWV3KSB7XG4gICAgcmV0dXJuIGJhbGwucG9zaXRpb24ueCA+IGNhbnZhc1ZpZXcuY2FudmFzLndpZHRoIC0gQkFMTF9ESUFNRVRFUjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzQmFsbEhpdHRpbmdUaGVDZWlsaW5nKGJhbGw6IEJhbGwpIHtcbiAgICByZXR1cm4gYmFsbC5wb3NpdGlvbi55IDw9IDA7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0JhbGxIaXR0aW5nVGhlRmxvb3IoYmFsbDogQmFsbCwgY2FudmFzVmlldzogQ2FudmFzVmlldykge1xuICAgIHJldHVybiBiYWxsLnBvc2l0aW9uLnkgPj0gY2FudmFzVmlldy5jYW52YXMuaGVpZ2h0IC0gQkFMTF9ESUFNRVRFUjtcbn1cbmV4cG9ydCBmdW5jdGlvbiBpc0JhbGxOZWFyQnJpY2tzKGJhbGw6IEJhbGwpIHtcbiAgICByZXR1cm4gKGJhbGwucG9zaXRpb24ueSA8IEJSSUNLU19FTkQpO1xufSIsImltcG9ydCB7IFZlY3RvciB9IGZyb20gXCIuLi91dGlscy92ZWN0b3JcIjtcbmltcG9ydCB7XG4gICAgQlJJQ0tfUk9XUyxcbiAgICBCUklDS19XSURUSCxcbiAgICBCUklDS19IRUlHSFQsXG4gICAgQk9BUkRfV0lEVEgsXG4gICAgQk9BUkRfSEVJR0hULFxuICAgIEJBTExfV0lEVEgsQkFMTF9IRUlHSFRcbn0gZnJvbSBcIi4uL3V0aWxzL2NvbnN0YW50c1wiO1xuaW1wb3J0IHsgQmFsbCB9IGZyb20gXCIuLi9maWd1cmVzL0JhbGxcIjtcbmltcG9ydCB7IEJyaWNrIH0gZnJvbSBcIi4uL2ZpZ3VyZXMvQnJpY2tcIjtcbmltcG9ydCB7IEJvYXJkIH0gZnJvbSBcIi4uL2ZpZ3VyZXMvQm9hcmRcIjtcblxuZXhwb3J0IGNsYXNzIENhbnZhc1ZpZXcge1xuICAgIHByaXZhdGUgY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ7XG4gICAgcHVibGljIGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQ7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIGNhbnZhc1NlbGVjdG9yOiBzdHJpbmcsXG4gICAgKSB7XG4gICAgICAgIHRoaXMuY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoY2FudmFzU2VsZWN0b3IpIGFzIEhUTUxDYW52YXNFbGVtZW50O1xuICAgICAgICAvL3RoaXMuY2FudmFzLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgICB0aGlzLmN0eCA9IHRoaXMuY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgfVxuXG4gICAgZHJhd0ltYWdlKHBvc2l0aW9uOiBWZWN0b3IsIGltYWdlOiBIVE1MSW1hZ2VFbGVtZW50LCB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcikge1xuICAgICAgICB0aGlzLmN0eC5kcmF3SW1hZ2UoaW1hZ2UsIHBvc2l0aW9uLngsIHBvc2l0aW9uLnksIHdpZHRoLCBoZWlnaHQpO1xuICAgIH1cblxuICAgIGRyYXdCcmlja3MoYnJpY2tzOiBCcmlja1tdKSB7XG4gICAgICAgIGZvciAobGV0IHIgPSAwOyByIDwgQlJJQ0tfUk9XUzsgcisrKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBjID0gMDsgYyA8IGJyaWNrcy5sZW5ndGg7IGMrKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGJyaWNrID0gYnJpY2tzW2NdO1xuICAgICAgICAgICAgICAgIGNvbnN0IHBvczogVmVjdG9yID0ge1xuICAgICAgICAgICAgICAgICAgICB4OiBicmljay5wb3NpdGlvbi54LFxuICAgICAgICAgICAgICAgICAgICB5OiBicmljay5wb3NpdGlvbi55XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuZHJhd0ltYWdlKHBvcywgYnJpY2suZ2V0SW1hZ2UoKSwgQlJJQ0tfV0lEVEgsIEJSSUNLX0hFSUdIVCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkcmF3QmFsbChiYWxsOiBCYWxsKSB7XG4gICAgICAgIHRoaXMuZHJhd0ltYWdlKGJhbGwucG9zaXRpb24sIGJhbGwuZ2V0SW1hZ2UoKSwgQkFMTF9XSURUSCwgQkFMTF9IRUlHSFQpO1xuICAgIH1cblxuICAgIGRyYXdCb2FyZChib2FyZDogQm9hcmQpIHtcbiAgICAgICAgdGhpcy5jdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIHRoaXMuY3R4LmRyYXdJbWFnZShib2FyZC5pbWFnZSwgYm9hcmQucG9zaXRpb24ueCwgYm9hcmQucG9zaXRpb24ueSwgQk9BUkRfV0lEVEgsIEJPQVJEX0hFSUdIVCk7XG4gICAgICAgIHRoaXMuY3R4LmNsb3NlUGF0aCgpO1xuICAgIH1cblxuICAgIGdldENvbnRleHQoKTogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY3R4O1xuICAgIH1cbn0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IHVwZGF0ZSB9IGZyb20gXCIuL2VuZ2luZS9nYW1lTG9vcFwiO1xuY29uc29sZS5sb2coJ2FwcC50cycpXG5jb25zdCBwbGF5QnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BsYXktYnRuJyk7XG5cbnBsYXlCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRhaW5lcicpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dhbWVDYW52YXMnKS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICBzdGFydEdhbWUoKTtcbn0pO1xuXG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2V0dGluZy1idG4nKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICBjb25zdCBzZXR0aW5nc0NvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzZXR0aW5ncy1jb250YWluZXInKTtcbiAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udGFpbmVyJyk7XG5cbiAgICBzZXR0aW5nc0NvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICBjb250YWluZXIuc3R5bGUuZGlzcGxheSA9ICdub25lJztcblxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdiYWNrLWJ0bicpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICBzZXR0aW5nc0NvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICBjb250YWluZXIuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgfSlcbn0pXG5cbmZ1bmN0aW9uIHN0YXJ0R2FtZSgpIHtcbiAgICB1cGRhdGUocGVyZm9ybWFuY2Uubm93KCkpO1xufSJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==