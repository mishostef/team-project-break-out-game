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
/* harmony export */   "loop": () => (/* binding */ loop),
/* harmony export */   "update": () => (/* binding */ update)
/* harmony export */ });
/* harmony import */ var _utils_brickFactory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/brickFactory */ "./src/utils/brickFactory.ts");
/* harmony import */ var _view_CanvasView__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../view/CanvasView */ "./src/view/CanvasView.ts");
/* harmony import */ var _figures_Board__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../figures/Board */ "./src/figures/Board.ts");
/* harmony import */ var _figures_Ball__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../figures/Ball */ "./src/figures/Ball.ts");
/* harmony import */ var _Geometry_Vector__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Geometry/Vector */ "./src/Geometry/Vector.ts");
/* harmony import */ var _move__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./move */ "./src/engine/move.ts");
/* harmony import */ var _utils_constants__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/constants */ "./src/utils/constants.ts");







const canvasView = new _view_CanvasView__WEBPACK_IMPORTED_MODULE_1__.CanvasView('gameCanvas');
let lastTime = 0;
let elapsed = 0;
const STEP_SIZE = 20;
const bricks = (0,_utils_brickFactory__WEBPACK_IMPORTED_MODULE_0__.createBricks)();
const boardImg = document.getElementById('board');
const boardPosition = new _Geometry_Vector__WEBPACK_IMPORTED_MODULE_4__.Vector(canvasView.canvas.width / 2, canvasView.canvas.height - 100);
const board = new _figures_Board__WEBPACK_IMPORTED_MODULE_2__.Board(boardPosition, boardImg);
const ball = new _figures_Ball__WEBPACK_IMPORTED_MODULE_3__.Ball({ x: _utils_constants__WEBPACK_IMPORTED_MODULE_6__.INITIAL_BALL_X, y: _utils_constants__WEBPACK_IMPORTED_MODULE_6__.INITIAL_BALL_Y }, "/assets/ball.png");
const BALL_DIAMETER = 50;
const input = {};
const BRICKS_END = 170;
let index = -1;
window.addEventListener('keydown', event => {
    input[event.code] = true;
    //alert(event.key)
});
window.addEventListener('keyup', event => {
    input[event.code] = false;
});
function update(time) {
    const delta = time - lastTime;
    lastTime = time;
    elapsed += delta;
    if (index != -1) {
        bricks.splice(index, 1);
        index = -1;
        ballVelocity.y = -ballVelocity.y;
    }
    if (elapsed > STEP_SIZE * 5) {
        elapsed = STEP_SIZE * 5;
    }
    while (elapsed > STEP_SIZE) {
        elapsed -= STEP_SIZE;
        loop();
    }
    // if (isRunning)
    requestAnimationFrame(update);
}
let ballVelocity = new _Geometry_Vector__WEBPACK_IMPORTED_MODULE_4__.Vector(1, 2);
function loop() {
    let boardVelocity;
    if (input['ArrowLeft']) {
        boardVelocity = new _Geometry_Vector__WEBPACK_IMPORTED_MODULE_4__.Vector(-5, 0);
        (0,_move__WEBPACK_IMPORTED_MODULE_5__.move)(board, boardVelocity);
    }
    else if (input['ArrowRight']) {
        boardVelocity = new _Geometry_Vector__WEBPACK_IMPORTED_MODULE_4__.Vector(5, 0);
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
        if (isBallHittingBoardEdges()) {
            ballVelocity.x = 0.4 * ballVelocity.y;
            ballVelocity.y = -1.4 * ballVelocity.y;
        }
        else {
            ballVelocity.y = -ballVelocity.y;
        }
    }
    if (isBallNearBricks()) {
        setHitBrickIndex();
    }
    if (isBallHittingTheFloor()) { ///
        ballVelocity.y = -ballVelocity.y;
    }
    else if (isBallHittingTheCeiling()) {
        ballVelocity.y = Math.abs(ballVelocity.y);
    }
    else if (isBallHittingRightWall()) {
        ballVelocity.x = -ballVelocity.x;
    }
    else if (isBallHittingTheLeftWall()) {
        ballVelocity.x = Math.abs(ballVelocity.x);
    }
}
function isBallHittingBoardEdges() {
    return (ball.position.x <= board.position.x - _utils_constants__WEBPACK_IMPORTED_MODULE_6__.BRICK_WIDTH / 2 + BALL_DIAMETER / 2
        || ball.position.x >= board.position.x + _utils_constants__WEBPACK_IMPORTED_MODULE_6__.BRICK_WIDTH / 2 - BALL_DIAMETER / 2);
}
function isBallHittingTheLeftWall() {
    return ball.position.x <= 0;
}
function isBallHittingRightWall() {
    return ball.position.x > canvasView.canvas.width - BALL_DIAMETER;
}
function isBallHittingTheCeiling() {
    return ball.position.y <= 0;
}
function isBallHittingTheFloor() {
    return ball.position.y >= canvasView.canvas.height - BALL_DIAMETER;
}
function setHitBrickIndex() {
    index = bricks.findIndex(b => ((b.position.y - _utils_constants__WEBPACK_IMPORTED_MODULE_6__.BRICK_HEIGHT / 2 <= ball.position.y - BALL_DIAMETER / 2)
        && (b.position.y + _utils_constants__WEBPACK_IMPORTED_MODULE_6__.BRICK_HEIGHT / 2 >= ball.position.y - BALL_DIAMETER / 2)
        && (b.position.x + _utils_constants__WEBPACK_IMPORTED_MODULE_6__.BRICK_WIDTH / 2 >= ball.position.x - BALL_DIAMETER / 2)
        && (b.position.x - _utils_constants__WEBPACK_IMPORTED_MODULE_6__.BRICK_WIDTH / 2 <= ball.position.x - BALL_DIAMETER / 2)));
}
function isBallCollidingWithBoard() {
    return (ball.position.y <= board.position.y + _utils_constants__WEBPACK_IMPORTED_MODULE_6__.BOARD_HEIGHT / 2 - BALL_DIAMETER / 2
        && ball.position.y >= board.position.y - _utils_constants__WEBPACK_IMPORTED_MODULE_6__.BOARD_HEIGHT / 2 - BALL_DIAMETER / 2
        && ball.position.x <= board.position.x + _utils_constants__WEBPACK_IMPORTED_MODULE_6__.BOARD_WIDTH / 2
        && ball.position.x >= board.position.x - _utils_constants__WEBPACK_IMPORTED_MODULE_6__.BOARD_WIDTH / 2);
}
function isBallNearBricks() {
    return (ball.position.y < BRICKS_END);
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
/* harmony export */   "BALL_HEIGHT": () => (/* binding */ BALL_HEIGHT),
/* harmony export */   "BALL_WIDTH": () => (/* binding */ BALL_WIDTH),
/* harmony export */   "BOARD_HEIGHT": () => (/* binding */ BOARD_HEIGHT),
/* harmony export */   "BOARD_WIDTH": () => (/* binding */ BOARD_WIDTH),
/* harmony export */   "BRICKS_COLS": () => (/* binding */ BRICKS_COLS),
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
// BOARD
const BOARD_WIDTH = 100;
const BOARD_HEIGHT = 20;
//BALL
const BALL_WIDTH = 40;
const BALL_HEIGHT = 40;
const INITIAL_BALL_X = 200;
const INITIAL_BALL_Y = 200;


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

const playBtn = document.getElementById('play-btn');
playBtn.addEventListener('click', () => {
    document.getElementById('container').style.display = 'none';
    document.getElementById('gameCanvas').style.display = 'block';
    showDetails();
    startGame();
});
function startGame() {
    (0,_engine_gameLoop__WEBPACK_IMPORTED_MODULE_0__.update)(performance.now());
}
function showDetails() {
    const detailsBox = document.getElementById('details-box');
    detailsBox.style.display = 'flex';
    detailsBox.style.justifyContent = 'space-around';
}

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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ckQsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2J1ZGdldGVlci10cy8uL3NyYy9HZW9tZXRyeS9WZWN0b3IudHMiLCJ3ZWJwYWNrOi8vYnVkZ2V0ZWVyLXRzLy4vc3JjL2VuZ2luZS9nYW1lTG9vcC50cyIsIndlYnBhY2s6Ly9idWRnZXRlZXItdHMvLi9zcmMvZW5naW5lL21vdmUudHMiLCJ3ZWJwYWNrOi8vYnVkZ2V0ZWVyLXRzLy4vc3JjL2ZpZ3VyZXMvQmFsbC50cyIsIndlYnBhY2s6Ly9idWRnZXRlZXItdHMvLi9zcmMvZmlndXJlcy9Cb2FyZC50cyIsIndlYnBhY2s6Ly9idWRnZXRlZXItdHMvLi9zcmMvZmlndXJlcy9Ccmljay50cyIsIndlYnBhY2s6Ly9idWRnZXRlZXItdHMvLi9zcmMvdXRpbHMvYnJpY2tGYWN0b3J5LnRzIiwid2VicGFjazovL2J1ZGdldGVlci10cy8uL3NyYy91dGlscy9jb25zdGFudHMudHMiLCJ3ZWJwYWNrOi8vYnVkZ2V0ZWVyLXRzLy4vc3JjL3ZpZXcvQ2FudmFzVmlldy50cyIsIndlYnBhY2s6Ly9idWRnZXRlZXItdHMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYnVkZ2V0ZWVyLXRzL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9idWRnZXRlZXItdHMvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9idWRnZXRlZXItdHMvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9idWRnZXRlZXItdHMvLi9zcmMvYXBwLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBvaW50IH0gZnJvbSBcIi4vSW50ZXJmYWNlc1wiO1xuXG5leHBvcnQgY2xhc3MgVmVjdG9yIGltcGxlbWVudHMgUG9pbnQge1xuICAgIHg6IG51bWJlcjtcbiAgICB5OiBudW1iZXI7XG5cbiAgICBjb25zdHJ1Y3RvcihwOiBQb2ludClcbiAgICBjb25zdHJ1Y3Rvcih4OiBudW1iZXIsIHk6IG51bWJlcilcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgeE9yUG9pbnQ6IG51bWJlciB8IFBvaW50LFxuICAgICAgICB5PzogbnVtYmVyXG4gICAgKSB7XG4gICAgICAgIGlmICh0eXBlb2YgeE9yUG9pbnQgPT0gJ251bWJlcicgJiYgdHlwZW9mIHkgPT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIHRoaXMueCA9IHhPclBvaW50O1xuICAgICAgICAgICAgdGhpcy55ID0geTtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgeE9yUG9pbnQgPT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIHRoaXMueCA9IHhPclBvaW50Lng7XG4gICAgICAgICAgICB0aGlzLnkgPSB4T3JQb2ludC55O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYWRkKHA6IFBvaW50KSB7XG4gICAgICAgIHRoaXMueCArPSBwLng7XG4gICAgICAgIHRoaXMueSArPSBwLnk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHNjYWxlKHM6IG51bWJlcikge1xuICAgICAgICB0aGlzLnggKj0gcztcbiAgICAgICAgdGhpcy55ICo9IHM7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgZGlzdChwOiBQb2ludCkge1xuICAgICAgICBjb25zdCBkeCA9IHRoaXMueCAtIHAueDtcbiAgICAgICAgY29uc3QgZHkgPSB0aGlzLnkgLSBwLnk7XG4gICAgICAgIHJldHVybiBNYXRoLnNxcnQoZHggKiogMiArIGR5ICoqIDIpO1xuICAgIH1cblxuICAgIHNxTGVuZ3RoKCkge1xuICAgICAgICByZXR1cm4gdGhpcy54ICoqIDIgKyB0aGlzLnkgKiogMjtcbiAgICB9XG5cbiAgICBzdGF0aWMgYWRkKHAxOiBQb2ludCwgcDI6IFBvaW50KSB7XG4gICAgICAgIHJldHVybiBuZXcgVmVjdG9yKHAxLnggKyBwMi54LCBwMS55ICsgcDIueSk7XG4gICAgfVxufSIsImltcG9ydCB7IGNyZWF0ZUJyaWNrcyB9IGZyb20gXCIuLi91dGlscy9icmlja0ZhY3RvcnlcIjtcbmltcG9ydCB7IENhbnZhc1ZpZXcgfSBmcm9tIFwiLi4vdmlldy9DYW52YXNWaWV3XCI7XG5pbXBvcnQgeyBCb2FyZCB9IGZyb20gXCIuLi9maWd1cmVzL0JvYXJkXCI7XG5pbXBvcnQgeyBCYWxsIH0gZnJvbSBcIi4uL2ZpZ3VyZXMvQmFsbFwiO1xuaW1wb3J0IHsgVmVjdG9yIH0gZnJvbSBcIi4uL0dlb21ldHJ5L1ZlY3RvclwiO1xuaW1wb3J0IHsgbW92ZSB9IGZyb20gXCIuL21vdmVcIjtcbmltcG9ydCB7IEJPQVJEX0hFSUdIVCwgQk9BUkRfV0lEVEgsIEJSSUNLX0hFSUdIVCwgQlJJQ0tfV0lEVEgsIElOSVRJQUxfQkFMTF9YLCBJTklUSUFMX0JBTExfWSB9IGZyb20gXCIuLi91dGlscy9jb25zdGFudHNcIjtcbmltcG9ydCB7IEJyaWNrIH0gZnJvbSBcIi4uL2ZpZ3VyZXMvQnJpY2tcIjtcblxuXG5jb25zdCBjYW52YXNWaWV3ID0gbmV3IENhbnZhc1ZpZXcoJ2dhbWVDYW52YXMnKTtcbmxldCBsYXN0VGltZSA9IDA7XG5sZXQgZWxhcHNlZCA9IDA7XG5jb25zdCBTVEVQX1NJWkUgPSAyMDtcblxuY29uc3QgYnJpY2tzID0gY3JlYXRlQnJpY2tzKCkgYXMgbnVsbCB8IEJyaWNrW107XG5jb25zdCBib2FyZEltZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdib2FyZCcpIGFzIEhUTUxJbWFnZUVsZW1lbnQ7XG5jb25zdCBib2FyZFBvc2l0aW9uID0gbmV3IFZlY3RvcihjYW52YXNWaWV3LmNhbnZhcy53aWR0aCAvIDIsIGNhbnZhc1ZpZXcuY2FudmFzLmhlaWdodCAtIDEwMCk7XG5jb25zdCBib2FyZCA9IG5ldyBCb2FyZChib2FyZFBvc2l0aW9uLCBib2FyZEltZyk7XG5jb25zdCBiYWxsID0gbmV3IEJhbGwoeyB4OiBJTklUSUFMX0JBTExfWCwgeTogSU5JVElBTF9CQUxMX1kgfSwgXCIvYXNzZXRzL2JhbGwucG5nXCIpO1xuY29uc3QgQkFMTF9ESUFNRVRFUiA9IDUwO1xuY29uc3QgaW5wdXQ6IHsgW2NvZGU6IHN0cmluZ106IGJvb2xlYW4gfSA9IHt9O1xuY29uc3QgQlJJQ0tTX0VORCA9IDE3MDtcbmxldCBpbmRleCA9IC0xO1xuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGV2ZW50ID0+IHtcbiAgICBpbnB1dFtldmVudC5jb2RlXSA9IHRydWU7XG4gICAgLy9hbGVydChldmVudC5rZXkpXG59KTtcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIGV2ZW50ID0+IHtcbiAgICBpbnB1dFtldmVudC5jb2RlXSA9IGZhbHNlO1xufSk7XG5cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGUodGltZTogbnVtYmVyKSB7XG4gICAgY29uc3QgZGVsdGEgPSB0aW1lIC0gbGFzdFRpbWU7XG4gICAgbGFzdFRpbWUgPSB0aW1lO1xuICAgIGVsYXBzZWQgKz0gZGVsdGE7XG4gICAgaWYgKGluZGV4ICE9IC0xKSB7XG4gICAgICAgIGJyaWNrcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICBpbmRleCA9IC0xO1xuICAgICAgICBiYWxsVmVsb2NpdHkueSA9IC1iYWxsVmVsb2NpdHkueTtcbiAgICB9XG4gICAgaWYgKGVsYXBzZWQgPiBTVEVQX1NJWkUgKiA1KSB7XG4gICAgICAgIGVsYXBzZWQgPSBTVEVQX1NJWkUgKiA1O1xuICAgIH1cblxuICAgIHdoaWxlIChlbGFwc2VkID4gU1RFUF9TSVpFKSB7XG4gICAgICAgIGVsYXBzZWQgLT0gU1RFUF9TSVpFO1xuICAgICAgICBsb29wKCk7XG4gICAgfVxuICAgIC8vIGlmIChpc1J1bm5pbmcpXG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHVwZGF0ZSk7XG59XG5cbmxldCBiYWxsVmVsb2NpdHkgPSBuZXcgVmVjdG9yKDEsIDIpXG5cbmV4cG9ydCBmdW5jdGlvbiBsb29wKCkge1xuICAgIGxldCBib2FyZFZlbG9jaXR5XG4gICAgaWYgKGlucHV0WydBcnJvd0xlZnQnXSkge1xuICAgICAgICBib2FyZFZlbG9jaXR5ID0gbmV3IFZlY3RvcigtNSwgMCk7XG4gICAgICAgIG1vdmUoYm9hcmQsIGJvYXJkVmVsb2NpdHkpO1xuICAgIH0gZWxzZSBpZiAoaW5wdXRbJ0Fycm93UmlnaHQnXSkge1xuICAgICAgICBib2FyZFZlbG9jaXR5ID0gbmV3IFZlY3Rvcig1LCAwKTtcbiAgICAgICAgbW92ZShib2FyZCwgYm9hcmRWZWxvY2l0eSk7XG4gICAgfVxuICAgIGNhbnZhc1ZpZXcuZ2V0Q29udGV4dCgpLmNsZWFyUmVjdCgwLCAwLCBjYW52YXNWaWV3LmNhbnZhcy53aWR0aCwgY2FudmFzVmlldy5jYW52YXMuaGVpZ2h0KTtcblxuICAgIGNhbnZhc1ZpZXcuZHJhd0JyaWNrcyhicmlja3MpO1xuICAgIGNhbnZhc1ZpZXcuZHJhd0JvYXJkKGJvYXJkKTtcbiAgICBjYW52YXNWaWV3LmRyYXdCYWxsKGJhbGwpO1xuXG4gICAgY29sbGlzaW9uRGV0ZWN0b3IoKTtcblxuICAgIG1vdmUoYmFsbCwgYmFsbFZlbG9jaXR5KTtcbn1cblxuZnVuY3Rpb24gY29sbGlzaW9uRGV0ZWN0b3IoKSB7XG4gICAgaWYgKGlzQmFsbENvbGxpZGluZ1dpdGhCb2FyZCgpKSB7XG4gICAgICAgIGlmIChpc0JhbGxIaXR0aW5nQm9hcmRFZGdlcygpKSB7XG4gICAgICAgICAgICBiYWxsVmVsb2NpdHkueCA9IDAuNCAqIGJhbGxWZWxvY2l0eS55XG4gICAgICAgICAgICBiYWxsVmVsb2NpdHkueSA9IC0xLjQgKiBiYWxsVmVsb2NpdHkueTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGJhbGxWZWxvY2l0eS55ID0gLWJhbGxWZWxvY2l0eS55O1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmIChpc0JhbGxOZWFyQnJpY2tzKCkpIHtcbiAgICAgICAgc2V0SGl0QnJpY2tJbmRleCgpO1xuICAgIH1cbiAgICBpZiAoaXNCYWxsSGl0dGluZ1RoZUZsb29yKCkpIHsvLy9cbiAgICAgICAgYmFsbFZlbG9jaXR5LnkgPSAtYmFsbFZlbG9jaXR5Lnk7XG4gICAgfSBlbHNlIGlmIChpc0JhbGxIaXR0aW5nVGhlQ2VpbGluZygpKSB7XG4gICAgICAgIGJhbGxWZWxvY2l0eS55ID0gTWF0aC5hYnMoYmFsbFZlbG9jaXR5LnkpO1xuICAgIH0gZWxzZSBpZiAoaXNCYWxsSGl0dGluZ1JpZ2h0V2FsbCgpKSB7XG4gICAgICAgIGJhbGxWZWxvY2l0eS54ID0gLSBiYWxsVmVsb2NpdHkueDtcbiAgICB9IGVsc2UgaWYgKGlzQmFsbEhpdHRpbmdUaGVMZWZ0V2FsbCgpKSB7XG4gICAgICAgIGJhbGxWZWxvY2l0eS54ID0gTWF0aC5hYnMoYmFsbFZlbG9jaXR5LngpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gaXNCYWxsSGl0dGluZ0JvYXJkRWRnZXMoKSB7XG4gICAgcmV0dXJuIChiYWxsLnBvc2l0aW9uLnggPD0gYm9hcmQucG9zaXRpb24ueCAtIEJSSUNLX1dJRFRIIC8gMiArIEJBTExfRElBTUVURVIgLyAyXG4gICAgICAgIHx8IGJhbGwucG9zaXRpb24ueCA+PSBib2FyZC5wb3NpdGlvbi54ICsgQlJJQ0tfV0lEVEggLyAyIC0gQkFMTF9ESUFNRVRFUiAvIDIpO1xufVxuZnVuY3Rpb24gaXNCYWxsSGl0dGluZ1RoZUxlZnRXYWxsKCkge1xuICAgIHJldHVybiBiYWxsLnBvc2l0aW9uLnggPD0gMDtcbn1cblxuZnVuY3Rpb24gaXNCYWxsSGl0dGluZ1JpZ2h0V2FsbCgpIHtcbiAgICByZXR1cm4gYmFsbC5wb3NpdGlvbi54ID4gY2FudmFzVmlldy5jYW52YXMud2lkdGggLSBCQUxMX0RJQU1FVEVSO1xufVxuXG5mdW5jdGlvbiBpc0JhbGxIaXR0aW5nVGhlQ2VpbGluZygpIHtcbiAgICByZXR1cm4gYmFsbC5wb3NpdGlvbi55IDw9IDA7XG59XG5cbmZ1bmN0aW9uIGlzQmFsbEhpdHRpbmdUaGVGbG9vcigpIHtcbiAgICByZXR1cm4gYmFsbC5wb3NpdGlvbi55ID49IGNhbnZhc1ZpZXcuY2FudmFzLmhlaWdodCAtIEJBTExfRElBTUVURVI7XG59XG5cbmZ1bmN0aW9uIHNldEhpdEJyaWNrSW5kZXgoKSB7XG4gICAgaW5kZXggPSBicmlja3MuZmluZEluZGV4KGIgPT4gKChiLnBvc2l0aW9uLnkgLSBCUklDS19IRUlHSFQgLyAyIDw9IGJhbGwucG9zaXRpb24ueSAtIEJBTExfRElBTUVURVIgLyAyKVxuICAgICAgICAmJiAoYi5wb3NpdGlvbi55ICsgQlJJQ0tfSEVJR0hUIC8gMiA+PSBiYWxsLnBvc2l0aW9uLnkgLSBCQUxMX0RJQU1FVEVSIC8gMilcbiAgICAgICAgJiYgKGIucG9zaXRpb24ueCArIEJSSUNLX1dJRFRIIC8gMiA+PSBiYWxsLnBvc2l0aW9uLnggLSBCQUxMX0RJQU1FVEVSIC8gMilcbiAgICAgICAgJiYgKGIucG9zaXRpb24ueCAtIEJSSUNLX1dJRFRIIC8gMiA8PSBiYWxsLnBvc2l0aW9uLnggLSBCQUxMX0RJQU1FVEVSIC8gMikpKTtcbn1cblxuZnVuY3Rpb24gaXNCYWxsQ29sbGlkaW5nV2l0aEJvYXJkKCkge1xuICAgIHJldHVybiAoYmFsbC5wb3NpdGlvbi55IDw9IGJvYXJkLnBvc2l0aW9uLnkgKyBCT0FSRF9IRUlHSFQgLyAyIC0gQkFMTF9ESUFNRVRFUiAvIDJcbiAgICAgICAgJiYgYmFsbC5wb3NpdGlvbi55ID49IGJvYXJkLnBvc2l0aW9uLnkgLSBCT0FSRF9IRUlHSFQgLyAyIC0gQkFMTF9ESUFNRVRFUiAvIDJcbiAgICAgICAgJiYgYmFsbC5wb3NpdGlvbi54IDw9IGJvYXJkLnBvc2l0aW9uLnggKyBCT0FSRF9XSURUSCAvIDJcbiAgICAgICAgJiYgYmFsbC5wb3NpdGlvbi54ID49IGJvYXJkLnBvc2l0aW9uLnggLSBCT0FSRF9XSURUSCAvIDIpXG59XG5cbmZ1bmN0aW9uIGlzQmFsbE5lYXJCcmlja3MoKSB7XG4gICAgcmV0dXJuIChiYWxsLnBvc2l0aW9uLnkgPCBCUklDS1NfRU5EKTtcbn1cblxuXG4iLCJpbXBvcnQgeyBWZWN0b3IgfSBmcm9tIFwiLi4vdXRpbHMvdmVjdG9yXCI7XG5cblxuZXhwb3J0IGZ1bmN0aW9uIG1vdmUoZ2FtZU9iamVjdDogR2FtZU9iamVjdCwgdmVsb2NpdHk6IFZlY3Rvcikge1xuICAgIGdhbWVPYmplY3QucG9zaXRpb24ueCArPSB2ZWxvY2l0eS54O1xuICAgIGdhbWVPYmplY3QucG9zaXRpb24ueSArPSB2ZWxvY2l0eS55O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEdhbWVPYmplY3Qge1xuICAgIHBvc2l0aW9uOiB7IHg6IG51bWJlciwgeTogbnVtYmVyIH1cbn0iLCJpbXBvcnQgeyBWZWN0b3IgfSBmcm9tIFwiLi4vdXRpbHMvdmVjdG9yXCI7XG5cbmV4cG9ydCBjbGFzcyBCYWxsIHtcbiAgICBwcml2YXRlIGltYWdlOiBIVE1MSW1hZ2VFbGVtZW50ID0gbmV3IEltYWdlKCk7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIHBvc2l0aW9uOiBWZWN0b3IsXG4gICAgICAgIGltYWdlOiBzdHJpbmdcbiAgICApIHtcbiAgICAgICAgdGhpcy5pbWFnZS5zcmMgPSBpbWFnZTtcbiAgICB9XG5cbiAgICBnZXRJbWFnZSgpOiBIVE1MSW1hZ2VFbGVtZW50IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaW1hZ2U7XG4gICAgfVxufSIsImltcG9ydCB7IFZlY3RvciB9IGZyb20gXCIuLi91dGlscy92ZWN0b3JcIjtcbmV4cG9ydCBjbGFzcyBCb2FyZCB7XG4gICAgY29uc3RydWN0b3IocHVibGljIHBvc2l0aW9uOiBWZWN0b3IsIHB1YmxpYyBpbWFnZTogSFRNTEltYWdlRWxlbWVudCkgeyB9XG59IiwiaW1wb3J0IHsgVmVjdG9yIH0gZnJvbSBcIi4uL3V0aWxzL3ZlY3RvclwiO1xuXG5leHBvcnQgY2xhc3MgQnJpY2sge1xuICAgIHByaXZhdGUgaW1hZ2U6IEhUTUxJbWFnZUVsZW1lbnQgPSBuZXcgSW1hZ2UoKTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwdWJsaWMgcG9zaXRpb246IFZlY3RvcixcbiAgICAgICAgaW1hZ2U6IHN0cmluZ1xuICAgICkge1xuICAgICAgICB0aGlzLmltYWdlLnNyYyA9IGltYWdlO1xuICAgIH1cblxuICAgIGdldEltYWdlKCk6IEhUTUxJbWFnZUVsZW1lbnQge1xuICAgICAgICByZXR1cm4gdGhpcy5pbWFnZTtcbiAgICB9XG59IiwiaW1wb3J0IHsgQnJpY2sgfSBmcm9tIFwiLi4vZmlndXJlcy9Ccmlja1wiO1xuaW1wb3J0IHtcbiAgICBCUklDS1NfQ09MUyxcbiAgICBCUklDS19ST1dTLFxuICAgIElOQ1JFRU1OVF9ET1dOX0JSSUNLLFxuICAgIElOQ1JFTUVOVF9MRUZUX0JSSUNLLFxuICAgIElOSVRJQUxfU1RBUlRfQlJJQ0tfTEVGVCxcbiAgICBJTklUSUFMX1NUQVJUX0JSSUNLX1JJR0hUXG59IGZyb20gXCIuL2NvbnN0YW50c1wiO1xuXG5pbXBvcnQgeyBWZWN0b3IgfSBmcm9tIFwiLi92ZWN0b3JcIjtcblxuY29uc3QgYnJpY2tzSW1hZ2UgPSBbXG4gICAgXCIvYXNzZXRzL2JyaWNrLWJsdWUucG5nXCIsXG4gICAgXCIvYXNzZXRzL2JyaWNrLWdyZWVuLnBuZ1wiLFxuICAgIFwiL2Fzc2V0cy9icmljay1wdXJwbGUucG5nXCIsXG4gICAgXCIvYXNzZXRzL2JyaWNrLXJlZC5wbmdcIixcbiAgICBcIi9hc3NldHMvYnJpY2steWVsbG93LnBuZ1wiXG5dXG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVCcmlja3MoKTogQnJpY2tbXSB7XG4gICAgbGV0IHggPSBJTklUSUFMX1NUQVJUX0JSSUNLX0xFRlQ7XG4gICAgbGV0IHkgPSBJTklUSUFMX1NUQVJUX0JSSUNLX1JJR0hUO1xuXG4gICAgY29uc3QgYnJpY2tzOiBCcmlja1tdID0gW107XG5cbiAgICBmb3IgKGxldCByb3cgPSAwOyByb3cgPCBCUklDS19ST1dTOyByb3crKykge1xuICAgICAgICBmb3IgKGxldCBjb2wgPSAwOyBjb2wgPCBCUklDS1NfQ09MUzsgY29sKyspIHtcbiAgICAgICAgICAgIGNvbnN0IHBvczogVmVjdG9yID0geyB4LCB5IH07XG5cbiAgICAgICAgICAgIGNvbnN0IHJhbmRQb3MgPSBNYXRoLnJhbmRvbSgpICogYnJpY2tzSW1hZ2UubGVuZ3RoIHwgMDtcbiAgICAgICAgICAgIGNvbnN0IGJyaWNrID0gbmV3IEJyaWNrKHBvcywgYnJpY2tzSW1hZ2VbcmFuZFBvc10pXG4gICAgICAgICAgICBicmlja3MucHVzaChicmljayk7XG4gICAgICAgICAgICB4ICs9IElOQ1JFTUVOVF9MRUZUX0JSSUNLO1xuICAgICAgICB9XG4gICAgXG4gICAgICAgIHggPSBJTklUSUFMX1NUQVJUX0JSSUNLX0xFRlQ7XG4gICAgICAgIHkgKz0gSU5DUkVFTU5UX0RPV05fQlJJQ0s7XG4gICAgfVxuICAgIHJldHVybiBicmlja3M7XG59IiwiXG4vLyBCUklDS1NcbmV4cG9ydCBjb25zdCBCUklDS19ST1dTID0gMztcbmV4cG9ydCBjb25zdCBCUklDS1NfQ09MUyA9IDEwO1xuZXhwb3J0IGNvbnN0IEJSSUNLX1dJRFRIID0gMTAwO1xuZXhwb3J0IGNvbnN0IEJSSUNLX0hFSUdIVCA9IDQwO1xuZXhwb3J0IGNvbnN0IElOSVRJQUxfU1RBUlRfQlJJQ0tfTEVGVCA9IDEwO1xuZXhwb3J0IGNvbnN0IElOSVRJQUxfU1RBUlRfQlJJQ0tfUklHSFQgPSAxMDtcbmV4cG9ydCBjb25zdCBJTkNSRU1FTlRfTEVGVF9CUklDSyA9IDEyMDtcbmV4cG9ydCBjb25zdCBJTkNSRUVNTlRfRE9XTl9CUklDSyA9IDYwO1xuXG4vLyBCT0FSRFxuZXhwb3J0IGNvbnN0IEJPQVJEX1dJRFRIID0gMTAwO1xuZXhwb3J0IGNvbnN0IEJPQVJEX0hFSUdIVCA9IDIwO1xuXG4vL0JBTExcbmV4cG9ydCBjb25zdCBCQUxMX1dJRFRIID0gNDA7XG5leHBvcnQgY29uc3QgQkFMTF9IRUlHSFQgPSA0MDtcbmV4cG9ydCBjb25zdCBJTklUSUFMX0JBTExfWCA9IDIwMDtcbmV4cG9ydCBjb25zdCBJTklUSUFMX0JBTExfWSA9IDIwMDtcbiIsImltcG9ydCB7IFZlY3RvciB9IGZyb20gXCIuLi91dGlscy92ZWN0b3JcIjtcbmltcG9ydCB7XG4gICAgQlJJQ0tfUk9XUyxcbiAgICBCUklDS19XSURUSCxcbiAgICBCUklDS19IRUlHSFQsXG4gICAgQk9BUkRfV0lEVEgsXG4gICAgQk9BUkRfSEVJR0hULFxuICAgIEJBTExfV0lEVEgsQkFMTF9IRUlHSFRcbn0gZnJvbSBcIi4uL3V0aWxzL2NvbnN0YW50c1wiO1xuaW1wb3J0IHsgQmFsbCB9IGZyb20gXCIuLi9maWd1cmVzL0JhbGxcIjtcbmltcG9ydCB7IEJyaWNrIH0gZnJvbSBcIi4uL2ZpZ3VyZXMvQnJpY2tcIjtcbmltcG9ydCB7IEJvYXJkIH0gZnJvbSBcIi4uL2ZpZ3VyZXMvQm9hcmRcIjtcblxuZXhwb3J0IGNsYXNzIENhbnZhc1ZpZXcge1xuICAgIHByaXZhdGUgY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ7XG4gICAgcHVibGljIGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQ7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIGNhbnZhc1NlbGVjdG9yOiBzdHJpbmcsXG4gICAgKSB7XG4gICAgICAgIHRoaXMuY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoY2FudmFzU2VsZWN0b3IpIGFzIEhUTUxDYW52YXNFbGVtZW50O1xuICAgICAgICAvL3RoaXMuY2FudmFzLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgICB0aGlzLmN0eCA9IHRoaXMuY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgfVxuXG4gICAgZHJhd0ltYWdlKHBvc2l0aW9uOiBWZWN0b3IsIGltYWdlOiBIVE1MSW1hZ2VFbGVtZW50LCB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcikge1xuICAgICAgICB0aGlzLmN0eC5kcmF3SW1hZ2UoaW1hZ2UsIHBvc2l0aW9uLngsIHBvc2l0aW9uLnksIHdpZHRoLCBoZWlnaHQpO1xuICAgIH1cblxuICAgIGRyYXdCcmlja3MoYnJpY2tzOiBCcmlja1tdKSB7XG4gICAgICAgIGZvciAobGV0IHIgPSAwOyByIDwgQlJJQ0tfUk9XUzsgcisrKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBjID0gMDsgYyA8IGJyaWNrcy5sZW5ndGg7IGMrKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGJyaWNrID0gYnJpY2tzW2NdO1xuICAgICAgICAgICAgICAgIGNvbnN0IHBvczogVmVjdG9yID0ge1xuICAgICAgICAgICAgICAgICAgICB4OiBicmljay5wb3NpdGlvbi54LFxuICAgICAgICAgICAgICAgICAgICB5OiBicmljay5wb3NpdGlvbi55XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuZHJhd0ltYWdlKHBvcywgYnJpY2suZ2V0SW1hZ2UoKSwgQlJJQ0tfV0lEVEgsIEJSSUNLX0hFSUdIVCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkcmF3QmFsbChiYWxsOiBCYWxsKSB7XG4gICAgICAgIHRoaXMuZHJhd0ltYWdlKGJhbGwucG9zaXRpb24sIGJhbGwuZ2V0SW1hZ2UoKSwgQkFMTF9XSURUSCwgQkFMTF9IRUlHSFQpO1xuICAgIH1cblxuICAgIGRyYXdCb2FyZChib2FyZDogQm9hcmQpIHtcbiAgICAgICAgdGhpcy5jdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIHRoaXMuY3R4LmRyYXdJbWFnZShib2FyZC5pbWFnZSwgYm9hcmQucG9zaXRpb24ueCwgYm9hcmQucG9zaXRpb24ueSwgQk9BUkRfV0lEVEgsIEJPQVJEX0hFSUdIVCk7XG4gICAgICAgIHRoaXMuY3R4LmNsb3NlUGF0aCgpO1xuICAgIH1cblxuICAgIGdldENvbnRleHQoKTogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY3R4O1xuICAgIH1cbn0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IHVwZGF0ZSB9IGZyb20gXCIuL2VuZ2luZS9nYW1lTG9vcFwiO1xuXG5jb25zdCBwbGF5QnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BsYXktYnRuJyk7XG5cbnBsYXlCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRhaW5lcicpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dhbWVDYW52YXMnKS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcblxuICAgIHNob3dEZXRhaWxzKCk7XG4gICAgc3RhcnRHYW1lKCk7XG59KTtcblxuZnVuY3Rpb24gc3RhcnRHYW1lKCkge1xuICAgIHVwZGF0ZShwZXJmb3JtYW5jZS5ub3coKSk7XG59XG5cbmZ1bmN0aW9uIHNob3dEZXRhaWxzKCkge1xuICAgIGNvbnN0IGRldGFpbHNCb3ggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGV0YWlscy1ib3gnKTtcbiAgICBkZXRhaWxzQm94LnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XG4gICAgZGV0YWlsc0JveC5zdHlsZS5qdXN0aWZ5Q29udGVudCA9ICdzcGFjZS1hcm91bmQnO1xufSJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==