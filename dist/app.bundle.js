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
/* harmony export */   "moveBall": () => (/* binding */ moveBall),
/* harmony export */   "moveBoard": () => (/* binding */ moveBoard)
/* harmony export */ });
function moveBall(ball, velocity) {
    ball.position.x += velocity.x;
    ball.position.y += velocity.y;
}
function moveBoard(board, velocity) {
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
/* harmony export */   "BRICKS_COLS": () => (/* binding */ BRICKS_COLS),
/* harmony export */   "BRICK_HEIGHT": () => (/* binding */ BRICK_HEIGHT),
/* harmony export */   "BRICK_ROWS": () => (/* binding */ BRICK_ROWS),
/* harmony export */   "BRICK_WIDTH": () => (/* binding */ BRICK_WIDTH),
/* harmony export */   "INCREEMNT_DOWN_BRICK": () => (/* binding */ INCREEMNT_DOWN_BRICK),
/* harmony export */   "INCREMENT_LEFT_BRICK": () => (/* binding */ INCREMENT_LEFT_BRICK),
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
        this.canvas.style.display = 'block';
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
        this.drawImage(ball.position, ball.getImage(), 40, 40);
    }
    drawBoard(board) {
        this.ctx.beginPath();
        this.ctx.drawImage(board.image, board.position.x, board.position.y, 100, 20);
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
/* harmony export */   "loop": () => (/* binding */ loop),
/* harmony export */   "update": () => (/* binding */ update)
/* harmony export */ });
/* harmony import */ var _figures_Ball__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./figures/Ball */ "./src/figures/Ball.ts");
/* harmony import */ var _Geometry_Vector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Geometry/Vector */ "./src/Geometry/Vector.ts");
/* harmony import */ var _view_CanvasView__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./view/CanvasView */ "./src/view/CanvasView.ts");
/* harmony import */ var _utils_brickFactory__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/brickFactory */ "./src/utils/brickFactory.ts");
/* harmony import */ var _figures_Board__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./figures/Board */ "./src/figures/Board.ts");
/* harmony import */ var _engine_move__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./engine/move */ "./src/engine/move.ts");



const playBtn = document.getElementById('play-btn');



const canvasView = new _view_CanvasView__WEBPACK_IMPORTED_MODULE_2__.CanvasView('gameCanvas');
let lastTime = 0;
let elapsed = 0;
const STEP_SIZE = 20;
const bricks = (0,_utils_brickFactory__WEBPACK_IMPORTED_MODULE_3__.createBricks)();
const boardImg = document.getElementById('board');
const board = new _figures_Board__WEBPACK_IMPORTED_MODULE_4__.Board(new _Geometry_Vector__WEBPACK_IMPORTED_MODULE_1__.Vector(canvasView.canvas.width / 2, canvasView.canvas.height - 100), boardImg);
const ball = new _figures_Ball__WEBPACK_IMPORTED_MODULE_0__.Ball({ x: 200, y: 200 }, "/assets/ball.png");
playBtn.addEventListener('click', () => {
    document.getElementById('container').style.display = 'none';
    startGame();
});
function startGame() {
    update(performance.now());
}
function update(time) {
    const delta = time - lastTime;
    lastTime = time;
    elapsed += delta;
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
console.log(canvasView.canvas.height);
function loop() {
    canvasView.getContext().clearRect(0, 0, canvasView.canvas.width, canvasView.canvas.height);
    canvasView.drawBricks(bricks);
    canvasView.drawBoard(board);
    canvasView.drawBall(ball);
    if (ball.position.y <= canvasView.canvas.height - 50) {
        const velocity = new _Geometry_Vector__WEBPACK_IMPORTED_MODULE_1__.Vector(1, 2);
        (0,_engine_move__WEBPACK_IMPORTED_MODULE_5__.moveBall)(ball, velocity);
    }
}

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7S0FDNUI7QUFDTCxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYnVkZ2V0ZWVyLXRzLy4vc3JjL0dlb21ldHJ5L1ZlY3Rvci50cyIsIndlYnBhY2s6Ly9idWRnZXRlZXItdHMvLi9zcmMvZW5naW5lL21vdmUudHMiLCJ3ZWJwYWNrOi8vYnVkZ2V0ZWVyLXRzLy4vc3JjL2ZpZ3VyZXMvQmFsbC50cyIsIndlYnBhY2s6Ly9idWRnZXRlZXItdHMvLi9zcmMvZmlndXJlcy9Cb2FyZC50cyIsIndlYnBhY2s6Ly9idWRnZXRlZXItdHMvLi9zcmMvZmlndXJlcy9Ccmljay50cyIsIndlYnBhY2s6Ly9idWRnZXRlZXItdHMvLi9zcmMvdXRpbHMvYnJpY2tGYWN0b3J5LnRzIiwid2VicGFjazovL2J1ZGdldGVlci10cy8uL3NyYy91dGlscy9jb25zdGFudHMudHMiLCJ3ZWJwYWNrOi8vYnVkZ2V0ZWVyLXRzLy4vc3JjL3ZpZXcvQ2FudmFzVmlldy50cyIsIndlYnBhY2s6Ly9idWRnZXRlZXItdHMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYnVkZ2V0ZWVyLXRzL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9idWRnZXRlZXItdHMvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9idWRnZXRlZXItdHMvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9idWRnZXRlZXItdHMvLi9zcmMvYXBwLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBvaW50IH0gZnJvbSBcIi4vSW50ZXJmYWNlc1wiO1xuXG5leHBvcnQgY2xhc3MgVmVjdG9yIGltcGxlbWVudHMgUG9pbnQge1xuICAgIHg6IG51bWJlcjtcbiAgICB5OiBudW1iZXI7XG5cbiAgICBjb25zdHJ1Y3RvcihwOiBQb2ludClcbiAgICBjb25zdHJ1Y3Rvcih4OiBudW1iZXIsIHk6IG51bWJlcilcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgeE9yUG9pbnQ6IG51bWJlciB8IFBvaW50LFxuICAgICAgICB5PzogbnVtYmVyXG4gICAgKSB7XG4gICAgICAgIGlmICh0eXBlb2YgeE9yUG9pbnQgPT0gJ251bWJlcicgJiYgdHlwZW9mIHkgPT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIHRoaXMueCA9IHhPclBvaW50O1xuICAgICAgICAgICAgdGhpcy55ID0geTtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgeE9yUG9pbnQgPT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIHRoaXMueCA9IHhPclBvaW50Lng7XG4gICAgICAgICAgICB0aGlzLnkgPSB4T3JQb2ludC55O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYWRkKHA6IFBvaW50KSB7XG4gICAgICAgIHRoaXMueCArPSBwLng7XG4gICAgICAgIHRoaXMueSArPSBwLnk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHNjYWxlKHM6IG51bWJlcikge1xuICAgICAgICB0aGlzLnggKj0gcztcbiAgICAgICAgdGhpcy55ICo9IHM7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgZGlzdChwOiBQb2ludCkge1xuICAgICAgICBjb25zdCBkeCA9IHRoaXMueCAtIHAueDtcbiAgICAgICAgY29uc3QgZHkgPSB0aGlzLnkgLSBwLnk7XG4gICAgICAgIHJldHVybiBNYXRoLnNxcnQoZHggKiogMiArIGR5ICoqIDIpO1xuICAgIH1cblxuICAgIHNxTGVuZ3RoKCkge1xuICAgICAgICByZXR1cm4gdGhpcy54ICoqIDIgKyB0aGlzLnkgKiogMjtcbiAgICB9XG5cbiAgICBzdGF0aWMgYWRkKHAxOiBQb2ludCwgcDI6IFBvaW50KSB7XG4gICAgICAgIHJldHVybiBuZXcgVmVjdG9yKHAxLnggKyBwMi54LCBwMS55ICsgcDIueSk7XG4gICAgfVxufSIsImltcG9ydCB7IFZlY3RvciB9IGZyb20gXCIuLi91dGlscy92ZWN0b3JcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIG1vdmVCYWxsKGJhbGwsIHZlbG9jaXR5OiBWZWN0b3IpIHtcbiAgICBiYWxsLnBvc2l0aW9uLnggKz0gdmVsb2NpdHkueDtcbiAgICBiYWxsLnBvc2l0aW9uLnkgKz0gdmVsb2NpdHkueTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1vdmVCb2FyZChib2FyZCwgdmVsb2NpdHk6IFZlY3Rvcikge1xuXG59IiwiaW1wb3J0IHsgVmVjdG9yIH0gZnJvbSBcIi4uL3V0aWxzL3ZlY3RvclwiO1xuXG5leHBvcnQgY2xhc3MgQmFsbCB7XG4gICAgcHJpdmF0ZSBpbWFnZTogSFRNTEltYWdlRWxlbWVudCA9IG5ldyBJbWFnZSgpO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHB1YmxpYyBwb3NpdGlvbjogVmVjdG9yLFxuICAgICAgICBpbWFnZTogc3RyaW5nXG4gICAgKSB7XG4gICAgICAgIHRoaXMuaW1hZ2Uuc3JjID0gaW1hZ2U7XG4gICAgfVxuXG4gICAgZ2V0SW1hZ2UoKTogSFRNTEltYWdlRWxlbWVudCB7XG4gICAgICAgIHJldHVybiB0aGlzLmltYWdlO1xuICAgIH1cbn0iLCJpbXBvcnQgeyBWZWN0b3IgfSBmcm9tIFwiLi4vdXRpbHMvdmVjdG9yXCI7XG5leHBvcnQgY2xhc3MgQm9hcmQge1xuXG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgcG9zaXRpb246IFZlY3RvciwgcHVibGljIGltYWdlOiBIVE1MSW1hZ2VFbGVtZW50KSB7XG5cbiAgICB9XG4gICAgLy8gbW92ZSgpIHtcbiAgICAvLyAgICAgdGhpcy5wb3NpdGlvbi54ICs9IHRoaXMudmVsb2NpdHkueDtcbiAgICAvLyAgICAgdGhpcy5wb3NpdGlvbi55ICs9IHRoaXMudmVsb2NpdHkueTtcbiAgICAvLyB9XG5cbn0iLCJpbXBvcnQgeyBWZWN0b3IgfSBmcm9tIFwiLi4vdXRpbHMvdmVjdG9yXCI7XG5cbmV4cG9ydCBjbGFzcyBCcmljayB7XG4gICAgcHJpdmF0ZSBpbWFnZTogSFRNTEltYWdlRWxlbWVudCA9IG5ldyBJbWFnZSgpO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHB1YmxpYyBwb3NpdGlvbjogVmVjdG9yLFxuICAgICAgICBpbWFnZTogc3RyaW5nXG4gICAgKSB7XG4gICAgICAgIHRoaXMuaW1hZ2Uuc3JjID0gaW1hZ2U7XG4gICAgfVxuXG4gICAgZ2V0SW1hZ2UoKTogSFRNTEltYWdlRWxlbWVudCB7XG4gICAgICAgIHJldHVybiB0aGlzLmltYWdlO1xuICAgIH1cbn0iLCJpbXBvcnQgeyBCcmljayB9IGZyb20gXCIuLi9maWd1cmVzL0JyaWNrXCI7XG5pbXBvcnQge1xuICAgIEJSSUNLU19DT0xTLFxuICAgIEJSSUNLX1JPV1MsXG4gICAgSU5DUkVFTU5UX0RPV05fQlJJQ0ssXG4gICAgSU5DUkVNRU5UX0xFRlRfQlJJQ0ssXG4gICAgSU5JVElBTF9TVEFSVF9CUklDS19MRUZULFxuICAgIElOSVRJQUxfU1RBUlRfQlJJQ0tfUklHSFRcbn0gZnJvbSBcIi4vY29uc3RhbnRzXCI7XG5cbmltcG9ydCB7IFZlY3RvciB9IGZyb20gXCIuL3ZlY3RvclwiO1xuXG5jb25zdCBicmlja3NJbWFnZSA9IFtcbiAgICBcIi9hc3NldHMvYnJpY2stYmx1ZS5wbmdcIixcbiAgICBcIi9hc3NldHMvYnJpY2stZ3JlZW4ucG5nXCIsXG4gICAgXCIvYXNzZXRzL2JyaWNrLXB1cnBsZS5wbmdcIixcbiAgICBcIi9hc3NldHMvYnJpY2stcmVkLnBuZ1wiLFxuICAgIFwiL2Fzc2V0cy9icmljay15ZWxsb3cucG5nXCJcbl1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUJyaWNrcygpOiBCcmlja1tdIHtcbiAgICBsZXQgeCA9IElOSVRJQUxfU1RBUlRfQlJJQ0tfTEVGVDtcbiAgICBsZXQgeSA9IElOSVRJQUxfU1RBUlRfQlJJQ0tfUklHSFQ7XG5cbiAgICBjb25zdCBicmlja3M6IEJyaWNrW10gPSBbXTtcblxuICAgIGZvciAobGV0IHJvdyA9IDA7IHJvdyA8IEJSSUNLX1JPV1M7IHJvdysrKSB7XG4gICAgICAgIGZvciAobGV0IGNvbCA9IDA7IGNvbCA8IEJSSUNLU19DT0xTOyBjb2wrKykge1xuICAgICAgICAgICAgY29uc3QgcG9zOiBWZWN0b3IgPSB7IHgsIHkgfTtcblxuICAgICAgICAgICAgY29uc3QgcmFuZFBvcyA9IE1hdGgucmFuZG9tKCkgKiBicmlja3NJbWFnZS5sZW5ndGggfCAwO1xuICAgICAgICAgICAgY29uc3QgYnJpY2sgPSBuZXcgQnJpY2socG9zLCBicmlja3NJbWFnZVtyYW5kUG9zXSlcbiAgICAgICAgICAgIGJyaWNrcy5wdXNoKGJyaWNrKTtcbiAgICAgICAgICAgIHggKz0gSU5DUkVNRU5UX0xFRlRfQlJJQ0s7XG4gICAgICAgIH1cbiAgICBcbiAgICAgICAgeCA9IElOSVRJQUxfU1RBUlRfQlJJQ0tfTEVGVDtcbiAgICAgICAgeSArPSBJTkNSRUVNTlRfRE9XTl9CUklDSztcbiAgICB9XG4gICAgcmV0dXJuIGJyaWNrcztcbn0iLCJcbi8vIEJSSUNLU1xuZXhwb3J0IGNvbnN0IEJSSUNLX1JPV1MgPSAzO1xuZXhwb3J0IGNvbnN0IEJSSUNLU19DT0xTID0gMTA7XG5leHBvcnQgY29uc3QgQlJJQ0tfV0lEVEggPSAxMDA7XG5leHBvcnQgY29uc3QgQlJJQ0tfSEVJR0hUID0gNDA7XG5leHBvcnQgY29uc3QgSU5JVElBTF9TVEFSVF9CUklDS19MRUZUID0gMTA7XG5leHBvcnQgY29uc3QgSU5JVElBTF9TVEFSVF9CUklDS19SSUdIVCA9IDEwO1xuZXhwb3J0IGNvbnN0IElOQ1JFTUVOVF9MRUZUX0JSSUNLID0gMTIwO1xuZXhwb3J0IGNvbnN0IElOQ1JFRU1OVF9ET1dOX0JSSUNLID0gNjA7XG4iLCJpbXBvcnQgeyBWZWN0b3IgfSBmcm9tIFwiLi4vdXRpbHMvdmVjdG9yXCI7XG5pbXBvcnQgeyBCUklDS19ST1dTLCBCUklDS19XSURUSCwgQlJJQ0tfSEVJR0hUIH0gZnJvbSBcIi4uL3V0aWxzL2NvbnN0YW50c1wiO1xuaW1wb3J0IHsgQmFsbCB9IGZyb20gXCIuLi9maWd1cmVzL0JhbGxcIjtcbmltcG9ydCB7IEJyaWNrIH0gZnJvbSBcIi4uL2ZpZ3VyZXMvQnJpY2tcIjtcbmltcG9ydCB7IEJvYXJkIH0gZnJvbSBcIi4uL2ZpZ3VyZXMvQm9hcmRcIjtcblxuZXhwb3J0IGNsYXNzIENhbnZhc1ZpZXcge1xuICAgIHByaXZhdGUgY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ7XG4gICAgcHVibGljIGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQ7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIGNhbnZhc1NlbGVjdG9yOiBzdHJpbmcsXG4gICAgKSB7XG4gICAgICAgIHRoaXMuY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoY2FudmFzU2VsZWN0b3IpIGFzIEhUTUxDYW52YXNFbGVtZW50O1xuICAgICAgICB0aGlzLmNhbnZhcy5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgICAgdGhpcy5jdHggPSB0aGlzLmNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuICAgIH1cblxuICAgIGRyYXdJbWFnZShwb3NpdGlvbjogVmVjdG9yLCBpbWFnZTogSFRNTEltYWdlRWxlbWVudCwgd2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5jdHguZHJhd0ltYWdlKGltYWdlLCBwb3NpdGlvbi54LCBwb3NpdGlvbi55LCB3aWR0aCwgaGVpZ2h0KTtcbiAgICB9XG5cbiAgICBkcmF3QnJpY2tzKGJyaWNrczogQnJpY2tbXSkge1xuICAgICAgICBmb3IgKGxldCByID0gMDsgciA8IEJSSUNLX1JPV1M7IHIrKykge1xuICAgICAgICAgICAgZm9yIChsZXQgYyA9IDA7IGMgPCBicmlja3MubGVuZ3RoOyBjKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBicmljayA9IGJyaWNrc1tjXTtcbiAgICAgICAgICAgICAgICBjb25zdCBwb3M6IFZlY3RvciA9IHtcbiAgICAgICAgICAgICAgICAgICAgeDogYnJpY2sucG9zaXRpb24ueCxcbiAgICAgICAgICAgICAgICAgICAgeTogYnJpY2sucG9zaXRpb24ueVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLmRyYXdJbWFnZShwb3MsIGJyaWNrLmdldEltYWdlKCksIEJSSUNLX1dJRFRILCBCUklDS19IRUlHSFQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZHJhd0JhbGwoYmFsbDogQmFsbCkge1xuICAgICAgICB0aGlzLmRyYXdJbWFnZShiYWxsLnBvc2l0aW9uLCBiYWxsLmdldEltYWdlKCksIDQwLCA0MCk7XG4gICAgfVxuXG4gICAgZHJhd0JvYXJkKGJvYXJkOiBCb2FyZCkge1xuICAgICAgICB0aGlzLmN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgdGhpcy5jdHguZHJhd0ltYWdlKGJvYXJkLmltYWdlLCBib2FyZC5wb3NpdGlvbi54LCBib2FyZC5wb3NpdGlvbi55LCAxMDAsIDIwKTtcbiAgICAgICAgdGhpcy5jdHguY2xvc2VQYXRoKCk7XG4gICAgfVxuXG4gICAgZ2V0Q29udGV4dCgpOiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQge1xuICAgICAgICByZXR1cm4gdGhpcy5jdHg7XG4gICAgfVxufSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgQmFsbCB9IGZyb20gXCIuL2ZpZ3VyZXMvQmFsbFwiO1xuXG5pbXBvcnQgeyBWZWN0b3IgYXMgdiwgVmVjdG9yIH0gZnJvbSBcIi4vR2VvbWV0cnkvVmVjdG9yXCI7XG5pbXBvcnQgeyBDYW52YXNWaWV3IH0gZnJvbSBcIi4vdmlldy9DYW52YXNWaWV3XCJcbmNvbnN0IHBsYXlCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGxheS1idG4nKTtcbmltcG9ydCB7IGNyZWF0ZUJyaWNrcyB9IGZyb20gXCIuL3V0aWxzL2JyaWNrRmFjdG9yeVwiO1xuaW1wb3J0IHsgQm9hcmQgfSBmcm9tIFwiLi9maWd1cmVzL0JvYXJkXCI7XG5pbXBvcnQgeyBtb3ZlQmFsbCB9IGZyb20gXCIuL2VuZ2luZS9tb3ZlXCJcbmNvbnN0IGNhbnZhc1ZpZXcgPSBuZXcgQ2FudmFzVmlldygnZ2FtZUNhbnZhcycpO1xubGV0IGxhc3RUaW1lID0gMDtcbmxldCBlbGFwc2VkID0gMDtcbmNvbnN0IFNURVBfU0laRSA9IDIwO1xuXG5jb25zdCBicmlja3MgPSBjcmVhdGVCcmlja3MoKTtcbmNvbnN0IGJvYXJkSW1nID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2JvYXJkJykgYXMgSFRNTEltYWdlRWxlbWVudDtcbmNvbnN0IGJvYXJkID0gbmV3IEJvYXJkKG5ldyB2KGNhbnZhc1ZpZXcuY2FudmFzLndpZHRoIC8gMiwgY2FudmFzVmlldy5jYW52YXMuaGVpZ2h0IC0gMTAwKSwgYm9hcmRJbWcpO1xuY29uc3QgYmFsbCA9IG5ldyBCYWxsKHsgeDogMjAwLCB5OiAyMDAgfSwgXCIvYXNzZXRzL2JhbGwucG5nXCIpO1xuXG5wbGF5QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250YWluZXInKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIHN0YXJ0R2FtZSgpO1xufSk7XG5cbmZ1bmN0aW9uIHN0YXJ0R2FtZSgpIHtcblxuICAgIHVwZGF0ZShwZXJmb3JtYW5jZS5ub3coKSk7XG5cbn1cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGUodGltZTogbnVtYmVyKSB7XG4gICAgY29uc3QgZGVsdGEgPSB0aW1lIC0gbGFzdFRpbWU7XG4gICAgbGFzdFRpbWUgPSB0aW1lO1xuICAgIGVsYXBzZWQgKz0gZGVsdGE7XG4gICAgaWYgKGVsYXBzZWQgPiBTVEVQX1NJWkUgKiA1KSB7XG4gICAgICAgIGVsYXBzZWQgPSBTVEVQX1NJWkUgKiA1O1xuICAgIH1cblxuICAgIHdoaWxlIChlbGFwc2VkID4gU1RFUF9TSVpFKSB7XG4gICAgICAgIGVsYXBzZWQgLT0gU1RFUF9TSVpFO1xuICAgICAgICBsb29wKCk7XG4gICAgfVxuICAgIC8vIGlmIChpc1J1bm5pbmcpXG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHVwZGF0ZSk7XG59XG5jb25zb2xlLmxvZyhjYW52YXNWaWV3LmNhbnZhcy5oZWlnaHQpO1xuXG5leHBvcnQgZnVuY3Rpb24gbG9vcCgpIHtcbiAgICBjYW52YXNWaWV3LmdldENvbnRleHQoKS5jbGVhclJlY3QoMCwgMCwgY2FudmFzVmlldy5jYW52YXMud2lkdGgsIGNhbnZhc1ZpZXcuY2FudmFzLmhlaWdodCk7XG4gICAgY2FudmFzVmlldy5kcmF3QnJpY2tzKGJyaWNrcyk7XG4gICAgY2FudmFzVmlldy5kcmF3Qm9hcmQoYm9hcmQpO1xuICAgIGNhbnZhc1ZpZXcuZHJhd0JhbGwoYmFsbCk7XG5cbiAgICBpZiAoYmFsbC5wb3NpdGlvbi55IDw9IGNhbnZhc1ZpZXcuY2FudmFzLmhlaWdodCAtIDUwKSB7XG4gICAgICAgIGNvbnN0IHZlbG9jaXR5ID0gbmV3IFZlY3RvcigxLCAyKTtcbiAgICAgICAgbW92ZUJhbGwoYmFsbCwgdmVsb2NpdHkpO1xuICAgIH1cbn0iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=