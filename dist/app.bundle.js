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
            ballVelocity.x = 2.4 * ballVelocity.y;
            ballVelocity.y = -0.4 * ballVelocity.y;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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ckQsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2J1ZGdldGVlci10cy8uL3NyYy9HZW9tZXRyeS9WZWN0b3IudHMiLCJ3ZWJwYWNrOi8vYnVkZ2V0ZWVyLXRzLy4vc3JjL2VuZ2luZS9nYW1lTG9vcC50cyIsIndlYnBhY2s6Ly9idWRnZXRlZXItdHMvLi9zcmMvZW5naW5lL21vdmUudHMiLCJ3ZWJwYWNrOi8vYnVkZ2V0ZWVyLXRzLy4vc3JjL2ZpZ3VyZXMvQmFsbC50cyIsIndlYnBhY2s6Ly9idWRnZXRlZXItdHMvLi9zcmMvZmlndXJlcy9Cb2FyZC50cyIsIndlYnBhY2s6Ly9idWRnZXRlZXItdHMvLi9zcmMvZmlndXJlcy9Ccmljay50cyIsIndlYnBhY2s6Ly9idWRnZXRlZXItdHMvLi9zcmMvdXRpbHMvYnJpY2tGYWN0b3J5LnRzIiwid2VicGFjazovL2J1ZGdldGVlci10cy8uL3NyYy91dGlscy9jb25zdGFudHMudHMiLCJ3ZWJwYWNrOi8vYnVkZ2V0ZWVyLXRzLy4vc3JjL3ZpZXcvQ2FudmFzVmlldy50cyIsIndlYnBhY2s6Ly9idWRnZXRlZXItdHMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYnVkZ2V0ZWVyLXRzL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9idWRnZXRlZXItdHMvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9idWRnZXRlZXItdHMvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9idWRnZXRlZXItdHMvLi9zcmMvYXBwLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBvaW50IH0gZnJvbSBcIi4vSW50ZXJmYWNlc1wiO1xuXG5leHBvcnQgY2xhc3MgVmVjdG9yIGltcGxlbWVudHMgUG9pbnQge1xuICAgIHg6IG51bWJlcjtcbiAgICB5OiBudW1iZXI7XG5cbiAgICBjb25zdHJ1Y3RvcihwOiBQb2ludClcbiAgICBjb25zdHJ1Y3Rvcih4OiBudW1iZXIsIHk6IG51bWJlcilcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgeE9yUG9pbnQ6IG51bWJlciB8IFBvaW50LFxuICAgICAgICB5PzogbnVtYmVyXG4gICAgKSB7XG4gICAgICAgIGlmICh0eXBlb2YgeE9yUG9pbnQgPT0gJ251bWJlcicgJiYgdHlwZW9mIHkgPT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIHRoaXMueCA9IHhPclBvaW50O1xuICAgICAgICAgICAgdGhpcy55ID0geTtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgeE9yUG9pbnQgPT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIHRoaXMueCA9IHhPclBvaW50Lng7XG4gICAgICAgICAgICB0aGlzLnkgPSB4T3JQb2ludC55O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYWRkKHA6IFBvaW50KSB7XG4gICAgICAgIHRoaXMueCArPSBwLng7XG4gICAgICAgIHRoaXMueSArPSBwLnk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHNjYWxlKHM6IG51bWJlcikge1xuICAgICAgICB0aGlzLnggKj0gcztcbiAgICAgICAgdGhpcy55ICo9IHM7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgZGlzdChwOiBQb2ludCkge1xuICAgICAgICBjb25zdCBkeCA9IHRoaXMueCAtIHAueDtcbiAgICAgICAgY29uc3QgZHkgPSB0aGlzLnkgLSBwLnk7XG4gICAgICAgIHJldHVybiBNYXRoLnNxcnQoZHggKiogMiArIGR5ICoqIDIpO1xuICAgIH1cblxuICAgIHNxTGVuZ3RoKCkge1xuICAgICAgICByZXR1cm4gdGhpcy54ICoqIDIgKyB0aGlzLnkgKiogMjtcbiAgICB9XG5cbiAgICBzdGF0aWMgYWRkKHAxOiBQb2ludCwgcDI6IFBvaW50KSB7XG4gICAgICAgIHJldHVybiBuZXcgVmVjdG9yKHAxLnggKyBwMi54LCBwMS55ICsgcDIueSk7XG4gICAgfVxufSIsImltcG9ydCB7IGNyZWF0ZUJyaWNrcyB9IGZyb20gXCIuLi91dGlscy9icmlja0ZhY3RvcnlcIjtcbmltcG9ydCB7IENhbnZhc1ZpZXcgfSBmcm9tIFwiLi4vdmlldy9DYW52YXNWaWV3XCI7XG5pbXBvcnQgeyBCb2FyZCB9IGZyb20gXCIuLi9maWd1cmVzL0JvYXJkXCI7XG5pbXBvcnQgeyBCYWxsIH0gZnJvbSBcIi4uL2ZpZ3VyZXMvQmFsbFwiO1xuaW1wb3J0IHsgVmVjdG9yIH0gZnJvbSBcIi4uL0dlb21ldHJ5L1ZlY3RvclwiO1xuaW1wb3J0IHsgbW92ZSB9IGZyb20gXCIuL21vdmVcIjtcbmltcG9ydCB7IEJPQVJEX0hFSUdIVCwgQk9BUkRfV0lEVEgsIEJSSUNLX0hFSUdIVCwgQlJJQ0tfV0lEVEgsIElOSVRJQUxfQkFMTF9YLCBJTklUSUFMX0JBTExfWSB9IGZyb20gXCIuLi91dGlscy9jb25zdGFudHNcIjtcbmltcG9ydCB7IEJyaWNrIH0gZnJvbSBcIi4uL2ZpZ3VyZXMvQnJpY2tcIjtcblxuXG5jb25zdCBjYW52YXNWaWV3ID0gbmV3IENhbnZhc1ZpZXcoJ2dhbWVDYW52YXMnKTtcbmxldCBsYXN0VGltZSA9IDA7XG5sZXQgZWxhcHNlZCA9IDA7XG5jb25zdCBTVEVQX1NJWkUgPSAyMDtcblxuY29uc3QgYnJpY2tzID0gY3JlYXRlQnJpY2tzKCkgYXMgbnVsbCB8IEJyaWNrW107XG5jb25zdCBib2FyZEltZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdib2FyZCcpIGFzIEhUTUxJbWFnZUVsZW1lbnQ7XG5jb25zdCBib2FyZFBvc2l0aW9uID0gbmV3IFZlY3RvcihjYW52YXNWaWV3LmNhbnZhcy53aWR0aCAvIDIsIGNhbnZhc1ZpZXcuY2FudmFzLmhlaWdodCAtIDEwMCk7XG5jb25zdCBib2FyZCA9IG5ldyBCb2FyZChib2FyZFBvc2l0aW9uLCBib2FyZEltZyk7XG5jb25zdCBiYWxsID0gbmV3IEJhbGwoeyB4OiBJTklUSUFMX0JBTExfWCwgeTogSU5JVElBTF9CQUxMX1kgfSwgXCIvYXNzZXRzL2JhbGwucG5nXCIpO1xuY29uc3QgQkFMTF9ESUFNRVRFUiA9IDUwO1xuY29uc3QgaW5wdXQ6IHsgW2NvZGU6IHN0cmluZ106IGJvb2xlYW4gfSA9IHt9O1xuY29uc3QgQlJJQ0tTX0VORCA9IDE3MDtcbmxldCBpbmRleCA9IC0xO1xuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGV2ZW50ID0+IHtcbiAgICBpbnB1dFtldmVudC5jb2RlXSA9IHRydWU7XG4gICAgLy9hbGVydChldmVudC5rZXkpXG59KTtcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIGV2ZW50ID0+IHtcbiAgICBpbnB1dFtldmVudC5jb2RlXSA9IGZhbHNlO1xufSk7XG5cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGUodGltZTogbnVtYmVyKSB7XG4gICAgY29uc3QgZGVsdGEgPSB0aW1lIC0gbGFzdFRpbWU7XG4gICAgbGFzdFRpbWUgPSB0aW1lO1xuICAgIGVsYXBzZWQgKz0gZGVsdGE7XG4gICAgaWYgKGluZGV4ICE9IC0xKSB7XG4gICAgICAgIGJyaWNrcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICBpbmRleCA9IC0xO1xuICAgICAgICBiYWxsVmVsb2NpdHkueSA9IC1iYWxsVmVsb2NpdHkueTtcbiAgICB9XG4gICAgaWYgKGVsYXBzZWQgPiBTVEVQX1NJWkUgKiA1KSB7XG4gICAgICAgIGVsYXBzZWQgPSBTVEVQX1NJWkUgKiA1O1xuICAgIH1cblxuICAgIHdoaWxlIChlbGFwc2VkID4gU1RFUF9TSVpFKSB7XG4gICAgICAgIGVsYXBzZWQgLT0gU1RFUF9TSVpFO1xuICAgICAgICBsb29wKCk7XG4gICAgfVxuICAgIC8vIGlmIChpc1J1bm5pbmcpXG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHVwZGF0ZSk7XG59XG5cbmxldCBiYWxsVmVsb2NpdHkgPSBuZXcgVmVjdG9yKDEsIDIpXG5cbmV4cG9ydCBmdW5jdGlvbiBsb29wKCkge1xuICAgIGxldCBib2FyZFZlbG9jaXR5XG4gICAgaWYgKGlucHV0WydBcnJvd0xlZnQnXSkge1xuICAgICAgICBib2FyZFZlbG9jaXR5ID0gbmV3IFZlY3RvcigtNSwgMCk7XG4gICAgICAgIG1vdmUoYm9hcmQsIGJvYXJkVmVsb2NpdHkpO1xuICAgIH0gZWxzZSBpZiAoaW5wdXRbJ0Fycm93UmlnaHQnXSkge1xuICAgICAgICBib2FyZFZlbG9jaXR5ID0gbmV3IFZlY3Rvcig1LCAwKTtcbiAgICAgICAgbW92ZShib2FyZCwgYm9hcmRWZWxvY2l0eSk7XG4gICAgfVxuICAgIGNhbnZhc1ZpZXcuZ2V0Q29udGV4dCgpLmNsZWFyUmVjdCgwLCAwLCBjYW52YXNWaWV3LmNhbnZhcy53aWR0aCwgY2FudmFzVmlldy5jYW52YXMuaGVpZ2h0KTtcblxuICAgIGNhbnZhc1ZpZXcuZHJhd0JyaWNrcyhicmlja3MpO1xuICAgIGNhbnZhc1ZpZXcuZHJhd0JvYXJkKGJvYXJkKTtcbiAgICBjYW52YXNWaWV3LmRyYXdCYWxsKGJhbGwpO1xuXG4gICAgY29sbGlzaW9uRGV0ZWN0b3IoKTtcblxuICAgIG1vdmUoYmFsbCwgYmFsbFZlbG9jaXR5KTtcbn1cblxuZnVuY3Rpb24gY29sbGlzaW9uRGV0ZWN0b3IoKSB7XG4gICAgaWYgKGlzQmFsbENvbGxpZGluZ1dpdGhCb2FyZCgpKSB7XG4gICAgICAgIGlmIChpc0JhbGxIaXR0aW5nQm9hcmRFZGdlcygpKSB7XG4gICAgICAgICAgICBiYWxsVmVsb2NpdHkueCA9IDIuNCAqIGJhbGxWZWxvY2l0eS55XG4gICAgICAgICAgICBiYWxsVmVsb2NpdHkueSA9IC0gMC40ICogYmFsbFZlbG9jaXR5Lnk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBiYWxsVmVsb2NpdHkueSA9IC1iYWxsVmVsb2NpdHkueTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAoaXNCYWxsTmVhckJyaWNrcygpKSB7XG4gICAgICAgIHNldEhpdEJyaWNrSW5kZXgoKTtcbiAgICB9XG4gICAgaWYgKGlzQmFsbEhpdHRpbmdUaGVGbG9vcigpKSB7Ly8vXG4gICAgICAgIGJhbGxWZWxvY2l0eS55ID0gLWJhbGxWZWxvY2l0eS55O1xuICAgIH0gZWxzZSBpZiAoaXNCYWxsSGl0dGluZ1RoZUNlaWxpbmcoKSkge1xuICAgICAgICBiYWxsVmVsb2NpdHkueSA9IE1hdGguYWJzKGJhbGxWZWxvY2l0eS55KTtcbiAgICB9IGVsc2UgaWYgKGlzQmFsbEhpdHRpbmdSaWdodFdhbGwoKSkge1xuICAgICAgICBiYWxsVmVsb2NpdHkueCA9IC0gYmFsbFZlbG9jaXR5Lng7XG4gICAgfSBlbHNlIGlmIChpc0JhbGxIaXR0aW5nVGhlTGVmdFdhbGwoKSkge1xuICAgICAgICBiYWxsVmVsb2NpdHkueCA9IE1hdGguYWJzKGJhbGxWZWxvY2l0eS54KTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGlzQmFsbEhpdHRpbmdCb2FyZEVkZ2VzKCkge1xuICAgIHJldHVybiAoYmFsbC5wb3NpdGlvbi54IDw9IGJvYXJkLnBvc2l0aW9uLnggLSBCUklDS19XSURUSCAvIDIgKyBCQUxMX0RJQU1FVEVSIC8gMlxuICAgICAgICB8fCBiYWxsLnBvc2l0aW9uLnggPj0gYm9hcmQucG9zaXRpb24ueCArIEJSSUNLX1dJRFRIIC8gMiAtIEJBTExfRElBTUVURVIgLyAyKTtcbn1cbmZ1bmN0aW9uIGlzQmFsbEhpdHRpbmdUaGVMZWZ0V2FsbCgpIHtcbiAgICByZXR1cm4gYmFsbC5wb3NpdGlvbi54IDw9IDA7XG59XG5cbmZ1bmN0aW9uIGlzQmFsbEhpdHRpbmdSaWdodFdhbGwoKSB7XG4gICAgcmV0dXJuIGJhbGwucG9zaXRpb24ueCA+IGNhbnZhc1ZpZXcuY2FudmFzLndpZHRoIC0gQkFMTF9ESUFNRVRFUjtcbn1cblxuZnVuY3Rpb24gaXNCYWxsSGl0dGluZ1RoZUNlaWxpbmcoKSB7XG4gICAgcmV0dXJuIGJhbGwucG9zaXRpb24ueSA8PSAwO1xufVxuXG5mdW5jdGlvbiBpc0JhbGxIaXR0aW5nVGhlRmxvb3IoKSB7XG4gICAgcmV0dXJuIGJhbGwucG9zaXRpb24ueSA+PSBjYW52YXNWaWV3LmNhbnZhcy5oZWlnaHQgLSBCQUxMX0RJQU1FVEVSO1xufVxuXG5mdW5jdGlvbiBzZXRIaXRCcmlja0luZGV4KCkge1xuICAgIGluZGV4ID0gYnJpY2tzLmZpbmRJbmRleChiID0+ICgoYi5wb3NpdGlvbi55IC0gQlJJQ0tfSEVJR0hUIC8gMiA8PSBiYWxsLnBvc2l0aW9uLnkgLSBCQUxMX0RJQU1FVEVSIC8gMilcbiAgICAgICAgJiYgKGIucG9zaXRpb24ueSArIEJSSUNLX0hFSUdIVCAvIDIgPj0gYmFsbC5wb3NpdGlvbi55IC0gQkFMTF9ESUFNRVRFUiAvIDIpXG4gICAgICAgICYmIChiLnBvc2l0aW9uLnggKyBCUklDS19XSURUSCAvIDIgPj0gYmFsbC5wb3NpdGlvbi54IC0gQkFMTF9ESUFNRVRFUiAvIDIpXG4gICAgICAgICYmIChiLnBvc2l0aW9uLnggLSBCUklDS19XSURUSCAvIDIgPD0gYmFsbC5wb3NpdGlvbi54IC0gQkFMTF9ESUFNRVRFUiAvIDIpKSk7XG59XG5cbmZ1bmN0aW9uIGlzQmFsbENvbGxpZGluZ1dpdGhCb2FyZCgpIHtcbiAgICByZXR1cm4gKGJhbGwucG9zaXRpb24ueSA8PSBib2FyZC5wb3NpdGlvbi55ICsgQk9BUkRfSEVJR0hUIC8gMiAtIEJBTExfRElBTUVURVIgLyAyXG4gICAgICAgICYmIGJhbGwucG9zaXRpb24ueSA+PSBib2FyZC5wb3NpdGlvbi55IC0gQk9BUkRfSEVJR0hUIC8gMiAtIEJBTExfRElBTUVURVIgLyAyXG4gICAgICAgICYmIGJhbGwucG9zaXRpb24ueCA8PSBib2FyZC5wb3NpdGlvbi54ICsgQk9BUkRfV0lEVEggLyAyXG4gICAgICAgICYmIGJhbGwucG9zaXRpb24ueCA+PSBib2FyZC5wb3NpdGlvbi54IC0gQk9BUkRfV0lEVEggLyAyKVxufVxuXG5mdW5jdGlvbiBpc0JhbGxOZWFyQnJpY2tzKCkge1xuICAgIHJldHVybiAoYmFsbC5wb3NpdGlvbi55IDwgQlJJQ0tTX0VORCk7XG59XG5cblxuIiwiaW1wb3J0IHsgVmVjdG9yIH0gZnJvbSBcIi4uL3V0aWxzL3ZlY3RvclwiO1xuXG5cbmV4cG9ydCBmdW5jdGlvbiBtb3ZlKGdhbWVPYmplY3Q6IEdhbWVPYmplY3QsIHZlbG9jaXR5OiBWZWN0b3IpIHtcbiAgICBnYW1lT2JqZWN0LnBvc2l0aW9uLnggKz0gdmVsb2NpdHkueDtcbiAgICBnYW1lT2JqZWN0LnBvc2l0aW9uLnkgKz0gdmVsb2NpdHkueTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBHYW1lT2JqZWN0IHtcbiAgICBwb3NpdGlvbjogeyB4OiBudW1iZXIsIHk6IG51bWJlciB9XG59IiwiaW1wb3J0IHsgVmVjdG9yIH0gZnJvbSBcIi4uL3V0aWxzL3ZlY3RvclwiO1xuXG5leHBvcnQgY2xhc3MgQmFsbCB7XG4gICAgcHJpdmF0ZSBpbWFnZTogSFRNTEltYWdlRWxlbWVudCA9IG5ldyBJbWFnZSgpO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHB1YmxpYyBwb3NpdGlvbjogVmVjdG9yLFxuICAgICAgICBpbWFnZTogc3RyaW5nXG4gICAgKSB7XG4gICAgICAgIHRoaXMuaW1hZ2Uuc3JjID0gaW1hZ2U7XG4gICAgfVxuXG4gICAgZ2V0SW1hZ2UoKTogSFRNTEltYWdlRWxlbWVudCB7XG4gICAgICAgIHJldHVybiB0aGlzLmltYWdlO1xuICAgIH1cbn0iLCJpbXBvcnQgeyBWZWN0b3IgfSBmcm9tIFwiLi4vdXRpbHMvdmVjdG9yXCI7XG5leHBvcnQgY2xhc3MgQm9hcmQge1xuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBwb3NpdGlvbjogVmVjdG9yLCBwdWJsaWMgaW1hZ2U6IEhUTUxJbWFnZUVsZW1lbnQpIHsgfVxufSIsImltcG9ydCB7IFZlY3RvciB9IGZyb20gXCIuLi91dGlscy92ZWN0b3JcIjtcblxuZXhwb3J0IGNsYXNzIEJyaWNrIHtcbiAgICBwcml2YXRlIGltYWdlOiBIVE1MSW1hZ2VFbGVtZW50ID0gbmV3IEltYWdlKCk7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIHBvc2l0aW9uOiBWZWN0b3IsXG4gICAgICAgIGltYWdlOiBzdHJpbmdcbiAgICApIHtcbiAgICAgICAgdGhpcy5pbWFnZS5zcmMgPSBpbWFnZTtcbiAgICB9XG5cbiAgICBnZXRJbWFnZSgpOiBIVE1MSW1hZ2VFbGVtZW50IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaW1hZ2U7XG4gICAgfVxufSIsImltcG9ydCB7IEJyaWNrIH0gZnJvbSBcIi4uL2ZpZ3VyZXMvQnJpY2tcIjtcbmltcG9ydCB7XG4gICAgQlJJQ0tTX0NPTFMsXG4gICAgQlJJQ0tfUk9XUyxcbiAgICBJTkNSRUVNTlRfRE9XTl9CUklDSyxcbiAgICBJTkNSRU1FTlRfTEVGVF9CUklDSyxcbiAgICBJTklUSUFMX1NUQVJUX0JSSUNLX0xFRlQsXG4gICAgSU5JVElBTF9TVEFSVF9CUklDS19SSUdIVFxufSBmcm9tIFwiLi9jb25zdGFudHNcIjtcblxuaW1wb3J0IHsgVmVjdG9yIH0gZnJvbSBcIi4vdmVjdG9yXCI7XG5cbmNvbnN0IGJyaWNrc0ltYWdlID0gW1xuICAgIFwiL2Fzc2V0cy9icmljay1ibHVlLnBuZ1wiLFxuICAgIFwiL2Fzc2V0cy9icmljay1ncmVlbi5wbmdcIixcbiAgICBcIi9hc3NldHMvYnJpY2stcHVycGxlLnBuZ1wiLFxuICAgIFwiL2Fzc2V0cy9icmljay1yZWQucG5nXCIsXG4gICAgXCIvYXNzZXRzL2JyaWNrLXllbGxvdy5wbmdcIlxuXVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQnJpY2tzKCk6IEJyaWNrW10ge1xuICAgIGxldCB4ID0gSU5JVElBTF9TVEFSVF9CUklDS19MRUZUO1xuICAgIGxldCB5ID0gSU5JVElBTF9TVEFSVF9CUklDS19SSUdIVDtcblxuICAgIGNvbnN0IGJyaWNrczogQnJpY2tbXSA9IFtdO1xuXG4gICAgZm9yIChsZXQgcm93ID0gMDsgcm93IDwgQlJJQ0tfUk9XUzsgcm93KyspIHtcbiAgICAgICAgZm9yIChsZXQgY29sID0gMDsgY29sIDwgQlJJQ0tTX0NPTFM7IGNvbCsrKSB7XG4gICAgICAgICAgICBjb25zdCBwb3M6IFZlY3RvciA9IHsgeCwgeSB9O1xuXG4gICAgICAgICAgICBjb25zdCByYW5kUG9zID0gTWF0aC5yYW5kb20oKSAqIGJyaWNrc0ltYWdlLmxlbmd0aCB8IDA7XG4gICAgICAgICAgICBjb25zdCBicmljayA9IG5ldyBCcmljayhwb3MsIGJyaWNrc0ltYWdlW3JhbmRQb3NdKVxuICAgICAgICAgICAgYnJpY2tzLnB1c2goYnJpY2spO1xuICAgICAgICAgICAgeCArPSBJTkNSRU1FTlRfTEVGVF9CUklDSztcbiAgICAgICAgfVxuICAgIFxuICAgICAgICB4ID0gSU5JVElBTF9TVEFSVF9CUklDS19MRUZUO1xuICAgICAgICB5ICs9IElOQ1JFRU1OVF9ET1dOX0JSSUNLO1xuICAgIH1cbiAgICByZXR1cm4gYnJpY2tzO1xufSIsIlxuLy8gQlJJQ0tTXG5leHBvcnQgY29uc3QgQlJJQ0tfUk9XUyA9IDM7XG5leHBvcnQgY29uc3QgQlJJQ0tTX0NPTFMgPSAxMDtcbmV4cG9ydCBjb25zdCBCUklDS19XSURUSCA9IDEwMDtcbmV4cG9ydCBjb25zdCBCUklDS19IRUlHSFQgPSA0MDtcbmV4cG9ydCBjb25zdCBJTklUSUFMX1NUQVJUX0JSSUNLX0xFRlQgPSAxMDtcbmV4cG9ydCBjb25zdCBJTklUSUFMX1NUQVJUX0JSSUNLX1JJR0hUID0gMTA7XG5leHBvcnQgY29uc3QgSU5DUkVNRU5UX0xFRlRfQlJJQ0sgPSAxMjA7XG5leHBvcnQgY29uc3QgSU5DUkVFTU5UX0RPV05fQlJJQ0sgPSA2MDtcblxuLy8gQk9BUkRcbmV4cG9ydCBjb25zdCBCT0FSRF9XSURUSCA9IDEwMDtcbmV4cG9ydCBjb25zdCBCT0FSRF9IRUlHSFQgPSAyMDtcblxuLy9CQUxMXG5leHBvcnQgY29uc3QgQkFMTF9XSURUSCA9IDQwO1xuZXhwb3J0IGNvbnN0IEJBTExfSEVJR0hUID0gNDA7XG5leHBvcnQgY29uc3QgSU5JVElBTF9CQUxMX1ggPSAyMDA7XG5leHBvcnQgY29uc3QgSU5JVElBTF9CQUxMX1kgPSAyMDA7XG4iLCJpbXBvcnQgeyBWZWN0b3IgfSBmcm9tIFwiLi4vdXRpbHMvdmVjdG9yXCI7XG5pbXBvcnQge1xuICAgIEJSSUNLX1JPV1MsXG4gICAgQlJJQ0tfV0lEVEgsXG4gICAgQlJJQ0tfSEVJR0hULFxuICAgIEJPQVJEX1dJRFRILFxuICAgIEJPQVJEX0hFSUdIVCxcbiAgICBCQUxMX1dJRFRILEJBTExfSEVJR0hUXG59IGZyb20gXCIuLi91dGlscy9jb25zdGFudHNcIjtcbmltcG9ydCB7IEJhbGwgfSBmcm9tIFwiLi4vZmlndXJlcy9CYWxsXCI7XG5pbXBvcnQgeyBCcmljayB9IGZyb20gXCIuLi9maWd1cmVzL0JyaWNrXCI7XG5pbXBvcnQgeyBCb2FyZCB9IGZyb20gXCIuLi9maWd1cmVzL0JvYXJkXCI7XG5cbmV4cG9ydCBjbGFzcyBDYW52YXNWaWV3IHtcbiAgICBwcml2YXRlIGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEO1xuICAgIHB1YmxpYyBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50O1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHB1YmxpYyBjYW52YXNTZWxlY3Rvcjogc3RyaW5nLFxuICAgICkge1xuICAgICAgICB0aGlzLmNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGNhbnZhc1NlbGVjdG9yKSBhcyBIVE1MQ2FudmFzRWxlbWVudDtcbiAgICAgICAgLy90aGlzLmNhbnZhcy5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgICAgdGhpcy5jdHggPSB0aGlzLmNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuICAgIH1cblxuICAgIGRyYXdJbWFnZShwb3NpdGlvbjogVmVjdG9yLCBpbWFnZTogSFRNTEltYWdlRWxlbWVudCwgd2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5jdHguZHJhd0ltYWdlKGltYWdlLCBwb3NpdGlvbi54LCBwb3NpdGlvbi55LCB3aWR0aCwgaGVpZ2h0KTtcbiAgICB9XG5cbiAgICBkcmF3QnJpY2tzKGJyaWNrczogQnJpY2tbXSkge1xuICAgICAgICBmb3IgKGxldCByID0gMDsgciA8IEJSSUNLX1JPV1M7IHIrKykge1xuICAgICAgICAgICAgZm9yIChsZXQgYyA9IDA7IGMgPCBicmlja3MubGVuZ3RoOyBjKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBicmljayA9IGJyaWNrc1tjXTtcbiAgICAgICAgICAgICAgICBjb25zdCBwb3M6IFZlY3RvciA9IHtcbiAgICAgICAgICAgICAgICAgICAgeDogYnJpY2sucG9zaXRpb24ueCxcbiAgICAgICAgICAgICAgICAgICAgeTogYnJpY2sucG9zaXRpb24ueVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLmRyYXdJbWFnZShwb3MsIGJyaWNrLmdldEltYWdlKCksIEJSSUNLX1dJRFRILCBCUklDS19IRUlHSFQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZHJhd0JhbGwoYmFsbDogQmFsbCkge1xuICAgICAgICB0aGlzLmRyYXdJbWFnZShiYWxsLnBvc2l0aW9uLCBiYWxsLmdldEltYWdlKCksIEJBTExfV0lEVEgsIEJBTExfSEVJR0hUKTtcbiAgICB9XG5cbiAgICBkcmF3Qm9hcmQoYm9hcmQ6IEJvYXJkKSB7XG4gICAgICAgIHRoaXMuY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICB0aGlzLmN0eC5kcmF3SW1hZ2UoYm9hcmQuaW1hZ2UsIGJvYXJkLnBvc2l0aW9uLngsIGJvYXJkLnBvc2l0aW9uLnksIEJPQVJEX1dJRFRILCBCT0FSRF9IRUlHSFQpO1xuICAgICAgICB0aGlzLmN0eC5jbG9zZVBhdGgoKTtcbiAgICB9XG5cbiAgICBnZXRDb250ZXh0KCk6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCB7XG4gICAgICAgIHJldHVybiB0aGlzLmN0eDtcbiAgICB9XG59IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyB1cGRhdGUgfSBmcm9tIFwiLi9lbmdpbmUvZ2FtZUxvb3BcIjtcblxuY29uc3QgcGxheUJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbGF5LWJ0bicpO1xuXG5wbGF5QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250YWluZXInKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnYW1lQ2FudmFzJykuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG5cbiAgICBzaG93RGV0YWlscygpO1xuICAgIHN0YXJ0R2FtZSgpO1xufSk7XG5cbmZ1bmN0aW9uIHN0YXJ0R2FtZSgpIHtcbiAgICB1cGRhdGUocGVyZm9ybWFuY2Uubm93KCkpO1xufVxuXG5mdW5jdGlvbiBzaG93RGV0YWlscygpIHtcbiAgICBjb25zdCBkZXRhaWxzQm94ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RldGFpbHMtYm94Jyk7XG4gICAgZGV0YWlsc0JveC5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xuICAgIGRldGFpbHNCb3guc3R5bGUuanVzdGlmeUNvbnRlbnQgPSAnc3BhY2UtYXJvdW5kJztcbn0iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=