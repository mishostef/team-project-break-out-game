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
        return this.image.src;
    }
}


/***/ }),

/***/ "./src/gameObjects/Ball.ts":
/*!*********************************!*\
  !*** ./src/gameObjects/Ball.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Ball": () => (/* binding */ Ball)
/* harmony export */ });
class Ball {
    position;
    velocity;
    ctx;
    radius = 5;
    color = "red";
    constructor(position, velocity, ctx) {
        this.position = position;
        this.velocity = velocity;
        this.ctx = ctx;
    }
    move() {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }
    draw() {
        this.ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
        this.ctx.fillStyle = "red";
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
class CanvasView {
    canvasSelector;
    ctx;
    constructor(canvasSelector) {
        this.canvasSelector = canvasSelector;
        const canvas = document.getElementById(canvasSelector);
        this.ctx = canvas.getContext('2d');
    }
    drawImage(position, source, width, height) {
        const image = new Image();
        image.src = source;
        image.onload = () => {
            this.ctx.drawImage(image, position.x, position.y, width, height);
        };
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
/* harmony import */ var _utils_brickFactory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/brickFactory */ "./src/utils/brickFactory.ts");
/* harmony import */ var _utils_constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/constants */ "./src/utils/constants.ts");
/* harmony import */ var _gameObjects_Ball__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./gameObjects/Ball */ "./src/gameObjects/Ball.ts");
/* harmony import */ var _Geometry_Vector__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Geometry/Vector */ "./src/Geometry/Vector.ts");
/* harmony import */ var _view_CanvasView__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./view/CanvasView */ "./src/view/CanvasView.ts");





const playBtn = document.getElementById('play-btn');
const canvasView = new _view_CanvasView__WEBPACK_IMPORTED_MODULE_4__.CanvasView('gameCanvas');
let lastTime = 0;
let elapsed = 0;
const STEP_SIZE = 20;
const canvas = document.getElementById('gameCanvas');
canvas.style.display = 'block';
const ctx = canvas.getContext('2d');
playBtn.addEventListener('click', () => {
    document.getElementById('container').style.display = 'none';
    startGame();
});
function startGame() {
    // const canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
    canvas.style.display = 'block';
    // const ctx = canvas.getContext('2d');
    update(performance.now());
    //const bb = new b(new v(5, 5), new v(5, 5), ctx);
    // bb.draw();
    //drawBricks(ctx);
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
function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks(ctx);
    const bb = new _gameObjects_Ball__WEBPACK_IMPORTED_MODULE_2__.Ball(new _Geometry_Vector__WEBPACK_IMPORTED_MODULE_3__.Vector(5, 5), new _Geometry_Vector__WEBPACK_IMPORTED_MODULE_3__.Vector(5, 5), ctx);
    bb.draw();
}
function drawBricks(ctx) {
    const bricks = (0,_utils_brickFactory__WEBPACK_IMPORTED_MODULE_0__.createBricks)();
    for (let r = 0; r < _utils_constants__WEBPACK_IMPORTED_MODULE_1__.BRICK_ROWS; r++) {
        for (let c = 0; c < bricks.length; c++) {
            const brick = bricks[c];
            const pos = {
                x: brick.position.x,
                y: brick.position.y
            };
            canvasView.drawImage(pos, brick.getImage(), _utils_constants__WEBPACK_IMPORTED_MODULE_1__.BRICK_WIDTH, _utils_constants__WEBPACK_IMPORTED_MODULE_1__.BRICK_HEIGHT);
        }
    }
    function drawImage(x, y, source) {
        const brick = new Image();
        brick.src = source;
        brick.onload = () => {
            ctx.drawImage(brick, x, y, _utils_constants__WEBPACK_IMPORTED_MODULE_1__.BRICK_WIDTH, _utils_constants__WEBPACK_IMPORTED_MODULE_1__.BRICK_HEIGHT);
        };
    }
}

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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UUFDakMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDcEMsTUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3hCLE1BQU0sR0FBRyxHQUFXO2dCQUNoQixDQUFDLEVBQUUsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUNuQixDQUFDLEVBQUUsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQ3RCO1lBQ0QsVUFBVSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLFFBQVEsRUFBRSxFQUFFLHlEQUFXLEVBQUUsMERBQVksQ0FBQyxDQUFDO1NBQzFFO0tBQ0o7SUFFRCxTQUFTLFNBQVMsQ0FBQyxDQUFTLEVBQUUsQ0FBUyxFQUFFLE1BQWM7UUFDbkQsTUFBTSxLQUFLLEdBQUcsSUFBSSxLQUFLLEVBQUUsQ0FBQztRQUMxQixLQUFLLENBQUMsR0FBRyxHQUFHLE1BQU0sQ0FBQztRQUVuQixLQUFLLENBQUMsTUFBTSxHQUFHLEdBQUcsRUFBRTtZQUNoQixHQUFHLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLHlEQUFXLEVBQUUsMERBQVksQ0FBQyxDQUFDO1FBQzFELENBQUMsQ0FBQztJQUNOLENBQUM7QUFDTCxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYnVkZ2V0ZWVyLXRzLy4vc3JjL0dlb21ldHJ5L1ZlY3Rvci50cyIsIndlYnBhY2s6Ly9idWRnZXRlZXItdHMvLi9zcmMvZmlndXJlcy9Ccmljay50cyIsIndlYnBhY2s6Ly9idWRnZXRlZXItdHMvLi9zcmMvZ2FtZU9iamVjdHMvQmFsbC50cyIsIndlYnBhY2s6Ly9idWRnZXRlZXItdHMvLi9zcmMvdXRpbHMvYnJpY2tGYWN0b3J5LnRzIiwid2VicGFjazovL2J1ZGdldGVlci10cy8uL3NyYy91dGlscy9jb25zdGFudHMudHMiLCJ3ZWJwYWNrOi8vYnVkZ2V0ZWVyLXRzLy4vc3JjL3ZpZXcvQ2FudmFzVmlldy50cyIsIndlYnBhY2s6Ly9idWRnZXRlZXItdHMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYnVkZ2V0ZWVyLXRzL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9idWRnZXRlZXItdHMvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9idWRnZXRlZXItdHMvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9idWRnZXRlZXItdHMvLi9zcmMvYXBwLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBvaW50IH0gZnJvbSBcIi4vSW50ZXJmYWNlc1wiO1xuXG5leHBvcnQgY2xhc3MgVmVjdG9yIGltcGxlbWVudHMgUG9pbnQge1xuICAgIHg6IG51bWJlcjtcbiAgICB5OiBudW1iZXI7XG5cbiAgICBjb25zdHJ1Y3RvcihwOiBQb2ludClcbiAgICBjb25zdHJ1Y3Rvcih4OiBudW1iZXIsIHk6IG51bWJlcilcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgeE9yUG9pbnQ6IG51bWJlciB8IFBvaW50LFxuICAgICAgICB5PzogbnVtYmVyXG4gICAgKSB7XG4gICAgICAgIGlmICh0eXBlb2YgeE9yUG9pbnQgPT0gJ251bWJlcicgJiYgdHlwZW9mIHkgPT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIHRoaXMueCA9IHhPclBvaW50O1xuICAgICAgICAgICAgdGhpcy55ID0geTtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgeE9yUG9pbnQgPT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIHRoaXMueCA9IHhPclBvaW50Lng7XG4gICAgICAgICAgICB0aGlzLnkgPSB4T3JQb2ludC55O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYWRkKHA6IFBvaW50KSB7XG4gICAgICAgIHRoaXMueCArPSBwLng7XG4gICAgICAgIHRoaXMueSArPSBwLnk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHNjYWxlKHM6IG51bWJlcikge1xuICAgICAgICB0aGlzLnggKj0gcztcbiAgICAgICAgdGhpcy55ICo9IHM7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgZGlzdChwOiBQb2ludCkge1xuICAgICAgICBjb25zdCBkeCA9IHRoaXMueCAtIHAueDtcbiAgICAgICAgY29uc3QgZHkgPSB0aGlzLnkgLSBwLnk7XG4gICAgICAgIHJldHVybiBNYXRoLnNxcnQoZHggKiogMiArIGR5ICoqIDIpO1xuICAgIH1cblxuICAgIHNxTGVuZ3RoKCkge1xuICAgICAgICByZXR1cm4gdGhpcy54ICoqIDIgKyB0aGlzLnkgKiogMjtcbiAgICB9XG5cbiAgICBzdGF0aWMgYWRkKHAxOiBQb2ludCwgcDI6IFBvaW50KSB7XG4gICAgICAgIHJldHVybiBuZXcgVmVjdG9yKHAxLnggKyBwMi54LCBwMS55ICsgcDIueSk7XG4gICAgfVxufSIsImltcG9ydCB7IFZlY3RvciB9IGZyb20gXCIuLi91dGlscy92ZWN0b3JcIjtcblxuZXhwb3J0IGNsYXNzIEJyaWNrIHtcbiAgICBwcml2YXRlIGltYWdlOiBIVE1MSW1hZ2VFbGVtZW50ID0gbmV3IEltYWdlKCk7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIHBvc2l0aW9uOiBWZWN0b3IsXG4gICAgICAgIGltYWdlOiBzdHJpbmdcbiAgICApIHtcbiAgICAgICAgdGhpcy5pbWFnZS5zcmMgPSBpbWFnZTtcbiAgICB9XG5cbiAgICBnZXRJbWFnZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5pbWFnZS5zcmM7XG4gICAgfVxufSIsImltcG9ydCB7IFZlY3RvciB9IGZyb20gXCIuLi9HZW9tZXRyeS9WZWN0b3JcIjtcblxuZXhwb3J0IGNsYXNzIEJhbGwge1xuICAgIHByaXZhdGUgcmFkaXVzID0gNTtcbiAgICBwcml2YXRlIGNvbG9yID0gXCJyZWRcIjtcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBwb3NpdGlvbjogVmVjdG9yLCBwdWJsaWMgdmVsb2NpdHk6IFZlY3RvciwgcHVibGljIGN0eCkgeyB9XG4gICAgbW92ZSgpIHtcbiAgICAgICAgdGhpcy5wb3NpdGlvbi54ICs9IHRoaXMudmVsb2NpdHkueDtcbiAgICAgICAgdGhpcy5wb3NpdGlvbi55ICs9IHRoaXMudmVsb2NpdHkueTtcbiAgICB9XG4gICAgZHJhdygpIHtcbiAgICAgICAgdGhpcy5jdHguYXJjKHRoaXMucG9zaXRpb24ueCwgdGhpcy5wb3NpdGlvbi55LCB0aGlzLnJhZGl1cywgMCwgMiAqIE1hdGguUEkpO1xuICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSBcInJlZFwiO1xuICAgIH1cbn0iLCJpbXBvcnQgeyBCcmljayB9IGZyb20gXCIuLi9maWd1cmVzL0JyaWNrXCI7XG5pbXBvcnQge1xuICAgIEJSSUNLU19DT0xTLFxuICAgIEJSSUNLX1JPV1MsXG4gICAgSU5DUkVFTU5UX0RPV05fQlJJQ0ssXG4gICAgSU5DUkVNRU5UX0xFRlRfQlJJQ0ssXG4gICAgSU5JVElBTF9TVEFSVF9CUklDS19MRUZULFxuICAgIElOSVRJQUxfU1RBUlRfQlJJQ0tfUklHSFRcbn0gZnJvbSBcIi4vY29uc3RhbnRzXCI7XG5cbmltcG9ydCB7IFZlY3RvciB9IGZyb20gXCIuL3ZlY3RvclwiO1xuXG5jb25zdCBicmlja3NJbWFnZSA9IFtcbiAgICBcIi9hc3NldHMvYnJpY2stYmx1ZS5wbmdcIixcbiAgICBcIi9hc3NldHMvYnJpY2stZ3JlZW4ucG5nXCIsXG4gICAgXCIvYXNzZXRzL2JyaWNrLXB1cnBsZS5wbmdcIixcbiAgICBcIi9hc3NldHMvYnJpY2stcmVkLnBuZ1wiLFxuICAgIFwiL2Fzc2V0cy9icmljay15ZWxsb3cucG5nXCJcbl1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUJyaWNrcygpOiBCcmlja1tdIHtcbiAgICBsZXQgeCA9IElOSVRJQUxfU1RBUlRfQlJJQ0tfTEVGVDtcbiAgICBsZXQgeSA9IElOSVRJQUxfU1RBUlRfQlJJQ0tfUklHSFQ7XG5cbiAgICBjb25zdCBicmlja3M6IEJyaWNrW10gPSBbXTtcblxuICAgIGZvciAobGV0IHJvdyA9IDA7IHJvdyA8IEJSSUNLX1JPV1M7IHJvdysrKSB7XG4gICAgICAgIGZvciAobGV0IGNvbCA9IDA7IGNvbCA8IEJSSUNLU19DT0xTOyBjb2wrKykge1xuICAgICAgICAgICAgY29uc3QgcG9zOiBWZWN0b3IgPSB7IHgsIHkgfTtcblxuICAgICAgICAgICAgY29uc3QgcmFuZFBvcyA9IE1hdGgucmFuZG9tKCkgKiBicmlja3NJbWFnZS5sZW5ndGggfCAwO1xuICAgICAgICAgICAgY29uc3QgYnJpY2sgPSBuZXcgQnJpY2socG9zLCBicmlja3NJbWFnZVtyYW5kUG9zXSlcbiAgICAgICAgICAgIGJyaWNrcy5wdXNoKGJyaWNrKTtcbiAgICAgICAgICAgIHggKz0gSU5DUkVNRU5UX0xFRlRfQlJJQ0s7XG4gICAgICAgIH1cbiAgICBcbiAgICAgICAgeCA9IElOSVRJQUxfU1RBUlRfQlJJQ0tfTEVGVDtcbiAgICAgICAgeSArPSBJTkNSRUVNTlRfRE9XTl9CUklDSztcbiAgICB9XG4gICAgcmV0dXJuIGJyaWNrcztcbn0iLCJcbi8vIEJSSUNLU1xuZXhwb3J0IGNvbnN0IEJSSUNLX1JPV1MgPSAzO1xuZXhwb3J0IGNvbnN0IEJSSUNLU19DT0xTID0gMTA7XG5leHBvcnQgY29uc3QgQlJJQ0tfV0lEVEggPSAxMDA7XG5leHBvcnQgY29uc3QgQlJJQ0tfSEVJR0hUID0gNDA7XG5leHBvcnQgY29uc3QgSU5JVElBTF9TVEFSVF9CUklDS19MRUZUID0gMTA7XG5leHBvcnQgY29uc3QgSU5JVElBTF9TVEFSVF9CUklDS19SSUdIVCA9IDEwO1xuZXhwb3J0IGNvbnN0IElOQ1JFTUVOVF9MRUZUX0JSSUNLID0gMTIwO1xuZXhwb3J0IGNvbnN0IElOQ1JFRU1OVF9ET1dOX0JSSUNLID0gNjA7XG4iLCJpbXBvcnQgeyBWZWN0b3IgfSBmcm9tIFwiLi4vdXRpbHMvdmVjdG9yXCI7XG5cbmV4cG9ydCBjbGFzcyBDYW52YXNWaWV3IHtcbiAgICBwcml2YXRlIGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHB1YmxpYyBjYW52YXNTZWxlY3Rvcjogc3RyaW5nLFxuICAgICkge1xuICAgICAgICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChjYW52YXNTZWxlY3RvcikgYXMgSFRNTENhbnZhc0VsZW1lbnQ7XG4gICAgICAgIHRoaXMuY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgfVxuXG4gICAgZHJhd0ltYWdlKHBvc2l0aW9uOiBWZWN0b3IsIHNvdXJjZTogc3RyaW5nLCB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcikge1xuICAgICAgICBjb25zdCBpbWFnZSA9IG5ldyBJbWFnZSgpO1xuICAgICAgICBpbWFnZS5zcmMgPSBzb3VyY2U7XG4gICAgXG4gICAgICAgIGltYWdlLm9ubG9hZCA9ICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuY3R4LmRyYXdJbWFnZShpbWFnZSwgcG9zaXRpb24ueCwgcG9zaXRpb24ueSwgd2lkdGgsIGhlaWdodCk7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZ2V0Q29udGV4dCgpOiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQge1xuICAgICAgICByZXR1cm4gdGhpcy5jdHg7XG4gICAgfVxufSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgQmFsbCB9IGZyb20gXCIuL2ZpZ3VyZXMvQmFsbFwiO1xuaW1wb3J0IHsgY3JlYXRlQnJpY2tzIH0gZnJvbSBcIi4vdXRpbHMvYnJpY2tGYWN0b3J5XCI7XG5pbXBvcnQgeyBCUklDS19IRUlHSFQsIEJSSUNLX1JPV1MsIEJSSUNLX1dJRFRIIH0gZnJvbSBcIi4vdXRpbHMvY29uc3RhbnRzXCI7XG5pbXBvcnQgeyBCYWxsIGFzIGIgfSBmcm9tIFwiLi9nYW1lT2JqZWN0cy9CYWxsXCI7XG5pbXBvcnQgeyBWZWN0b3IgfSBmcm9tIFwiLi91dGlscy92ZWN0b3JcIjtcbmltcG9ydCB7IFZlY3RvciBhcyB2IH0gZnJvbSBcIi4vR2VvbWV0cnkvVmVjdG9yXCI7XG5pbXBvcnQgeyBDYW52YXNWaWV3IH0gZnJvbSBcIi4vdmlldy9DYW52YXNWaWV3XCJcbmNvbnN0IHBsYXlCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGxheS1idG4nKTtcbmNvbnN0IGNhbnZhc1ZpZXcgPSBuZXcgQ2FudmFzVmlldygnZ2FtZUNhbnZhcycpO1xubGV0IGxhc3RUaW1lID0gMDtcbmxldCBlbGFwc2VkID0gMDtcbmNvbnN0IFNURVBfU0laRSA9IDIwO1xuY29uc3QgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dhbWVDYW52YXMnKSBhcyBIVE1MQ2FudmFzRWxlbWVudDtcbmNhbnZhcy5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbmNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuXG5wbGF5QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250YWluZXInKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIHN0YXJ0R2FtZSgpO1xufSk7XG5cbmZ1bmN0aW9uIHN0YXJ0R2FtZSgpIHtcbiAgICAvLyBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ2FtZUNhbnZhcycpIGFzIEhUTUxDYW52YXNFbGVtZW50O1xuICAgIGNhbnZhcy5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAvLyBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICB1cGRhdGUocGVyZm9ybWFuY2Uubm93KCkpO1xuICAgIC8vY29uc3QgYmIgPSBuZXcgYihuZXcgdig1LCA1KSwgbmV3IHYoNSwgNSksIGN0eCk7XG4gICAgLy8gYmIuZHJhdygpO1xuICAgIC8vZHJhd0JyaWNrcyhjdHgpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZSh0aW1lOiBudW1iZXIpIHtcbiAgICBjb25zdCBkZWx0YSA9IHRpbWUgLSBsYXN0VGltZTtcbiAgICBsYXN0VGltZSA9IHRpbWU7XG4gICAgZWxhcHNlZCArPSBkZWx0YTtcbiAgICBpZiAoZWxhcHNlZCA+IFNURVBfU0laRSAqIDUpIHtcbiAgICAgICAgZWxhcHNlZCA9IFNURVBfU0laRSAqIDU7XG4gICAgfVxuXG4gICAgd2hpbGUgKGVsYXBzZWQgPiBTVEVQX1NJWkUpIHtcbiAgICAgICAgZWxhcHNlZCAtPSBTVEVQX1NJWkU7XG4gICAgICAgIGxvb3AoKTtcbiAgICB9XG4gICAgLy8gaWYgKGlzUnVubmluZylcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodXBkYXRlKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGxvb3AoKSB7XG4gICAgY3R4LmNsZWFyUmVjdCgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xuICAgIGRyYXdCcmlja3MoY3R4KTtcbiAgICBjb25zdCBiYiA9IG5ldyBiKG5ldyB2KDUsIDUpLCBuZXcgdig1LCA1KSwgY3R4KTtcbiAgICBiYi5kcmF3KCk7XG5cbn1cbmZ1bmN0aW9uIGRyYXdCcmlja3MoY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpIHtcbiAgICBjb25zdCBicmlja3MgPSBjcmVhdGVCcmlja3MoKTtcblxuICAgIGZvciAobGV0IHIgPSAwOyByIDwgQlJJQ0tfUk9XUzsgcisrKSB7XG4gICAgICAgIGZvciAobGV0IGMgPSAwOyBjIDwgYnJpY2tzLmxlbmd0aDsgYysrKSB7XG4gICAgICAgICAgICBjb25zdCBicmljayA9IGJyaWNrc1tjXTtcbiAgICAgICAgICAgIGNvbnN0IHBvczogVmVjdG9yID0ge1xuICAgICAgICAgICAgICAgIHg6IGJyaWNrLnBvc2l0aW9uLngsXG4gICAgICAgICAgICAgICAgeTogYnJpY2sucG9zaXRpb24ueVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FudmFzVmlldy5kcmF3SW1hZ2UocG9zLCBicmljay5nZXRJbWFnZSgpLCBCUklDS19XSURUSCwgQlJJQ0tfSEVJR0hUKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGRyYXdJbWFnZSh4OiBudW1iZXIsIHk6IG51bWJlciwgc291cmNlOiBzdHJpbmcpIHtcbiAgICAgICAgY29uc3QgYnJpY2sgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgYnJpY2suc3JjID0gc291cmNlO1xuXG4gICAgICAgIGJyaWNrLm9ubG9hZCA9ICgpID0+IHtcbiAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoYnJpY2ssIHgsIHksIEJSSUNLX1dJRFRILCBCUklDS19IRUlHSFQpO1xuICAgICAgICB9O1xuICAgIH1cbn1cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==