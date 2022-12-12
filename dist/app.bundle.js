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
    radius = 5;
    color = "red";
    constructor(position, velocity) {
        this.position = position;
        this.velocity = velocity;
    }
    move() {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
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
        this.ctx = this.canvas.getContext('2d');
    }
    drawImage(position, source, width, height) {
        const image = new Image();
        image.src = source;
        // image.onload = () => {
        this.ctx.beginPath();
        //this.ctx.drawImage(image, position.x, position.y, width, height);
        this.ctx.rect(position.x, position.y, 50, 50);
        this.ctx.fill();
        this.ctx.closePath();
        // };
    }
    drawBricks(bricks) {
        //  const bricks = createBricks();
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
        this.ctx.beginPath();
        this.ctx.arc(ball.position.x, ball.position.y, ball.radius, 0, 2 * Math.PI);
        this.ctx.fillStyle = "red";
        this.ctx.fill();
        this.ctx.closePath();
    }
    drawBoard(board) {
        this.ctx.beginPath();
        this.ctx.drawImage(board.image, board.position.x, board.position.y);
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
/* harmony import */ var _gameObjects_Ball__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameObjects/Ball */ "./src/gameObjects/Ball.ts");
/* harmony import */ var _Geometry_Vector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Geometry/Vector */ "./src/Geometry/Vector.ts");
/* harmony import */ var _view_CanvasView__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./view/CanvasView */ "./src/view/CanvasView.ts");
/* harmony import */ var _utils_brickFactory__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/brickFactory */ "./src/utils/brickFactory.ts");



const playBtn = document.getElementById('play-btn');

const canvasView = new _view_CanvasView__WEBPACK_IMPORTED_MODULE_2__.CanvasView('gameCanvas');
let lastTime = 0;
let elapsed = 0;
const STEP_SIZE = 20;
const canvas = document.getElementById('gameCanvas');
///game objects
const bb = new _gameObjects_Ball__WEBPACK_IMPORTED_MODULE_0__.Ball(new _Geometry_Vector__WEBPACK_IMPORTED_MODULE_1__.Vector(5, 5), new _Geometry_Vector__WEBPACK_IMPORTED_MODULE_1__.Vector(5, 5));
const bricks = (0,_utils_brickFactory__WEBPACK_IMPORTED_MODULE_3__.createBricks)();
const board = document.getElementById('board');
//const bboard = new Board(c)
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
function loop() {
    canvasView.getContext().clearRect(0, 0, canvas.width, canvas.height);
    canvasView.drawBricks(bricks);
    bb.move();
    canvasView.drawBall(bb);
}

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztJQUM1RCxTQUFTLEVBQUUsQ0FBQztBQUNoQixDQUFDLENBQUMsQ0FBQztBQUVILFNBQVMsU0FBUztJQUVkLE1BQU0sQ0FBQyxXQUFXLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztBQUU5QixDQUFDO0FBQ00sU0FBUyxNQUFNLENBQUMsSUFBWTtJQUMvQixNQUFNLEtBQUssR0FBRyxJQUFJLEdBQUcsUUFBUSxDQUFDO0lBQzlCLFFBQVEsR0FBRyxJQUFJLENBQUM7SUFDaEIsT0FBTyxJQUFJLEtBQUssQ0FBQztJQUNqQixJQUFJLE9BQU8sR0FBRyxTQUFTLEdBQUcsQ0FBQyxFQUFFO1FBQ3pCLE9BQU8sR0FBRyxTQUFTLEdBQUcsQ0FBQyxDQUFDO0tBQzNCO0lBRUQsT0FBTyxPQUFPLEdBQUcsU0FBUyxFQUFFO1FBQ3hCLE9BQU8sSUFBSSxTQUFTLENBQUM7UUFDckIsSUFBSSxFQUFFLENBQUM7S0FDVjtJQUNELGlCQUFpQjtJQUNqQixxQkFBcUIsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUNsQyxDQUFDO0FBRU0sU0FBUyxJQUFJO0lBQ2hCLFVBQVUsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxNQUFNLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNyRSxVQUFVLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzlCLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNWLFVBQVUsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDNUIsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2J1ZGdldGVlci10cy8uL3NyYy9HZW9tZXRyeS9WZWN0b3IudHMiLCJ3ZWJwYWNrOi8vYnVkZ2V0ZWVyLXRzLy4vc3JjL2ZpZ3VyZXMvQnJpY2sudHMiLCJ3ZWJwYWNrOi8vYnVkZ2V0ZWVyLXRzLy4vc3JjL2dhbWVPYmplY3RzL0JhbGwudHMiLCJ3ZWJwYWNrOi8vYnVkZ2V0ZWVyLXRzLy4vc3JjL3V0aWxzL2JyaWNrRmFjdG9yeS50cyIsIndlYnBhY2s6Ly9idWRnZXRlZXItdHMvLi9zcmMvdXRpbHMvY29uc3RhbnRzLnRzIiwid2VicGFjazovL2J1ZGdldGVlci10cy8uL3NyYy92aWV3L0NhbnZhc1ZpZXcudHMiLCJ3ZWJwYWNrOi8vYnVkZ2V0ZWVyLXRzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2J1ZGdldGVlci10cy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYnVkZ2V0ZWVyLXRzL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYnVkZ2V0ZWVyLXRzL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYnVkZ2V0ZWVyLXRzLy4vc3JjL2FwcC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQb2ludCB9IGZyb20gXCIuL0ludGVyZmFjZXNcIjtcblxuZXhwb3J0IGNsYXNzIFZlY3RvciBpbXBsZW1lbnRzIFBvaW50IHtcbiAgICB4OiBudW1iZXI7XG4gICAgeTogbnVtYmVyO1xuXG4gICAgY29uc3RydWN0b3IocDogUG9pbnQpXG4gICAgY29uc3RydWN0b3IoeDogbnVtYmVyLCB5OiBudW1iZXIpXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHhPclBvaW50OiBudW1iZXIgfCBQb2ludCxcbiAgICAgICAgeT86IG51bWJlclxuICAgICkge1xuICAgICAgICBpZiAodHlwZW9mIHhPclBvaW50ID09ICdudW1iZXInICYmIHR5cGVvZiB5ID09ICdudW1iZXInKSB7XG4gICAgICAgICAgICB0aGlzLnggPSB4T3JQb2ludDtcbiAgICAgICAgICAgIHRoaXMueSA9IHk7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHhPclBvaW50ID09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICB0aGlzLnggPSB4T3JQb2ludC54O1xuICAgICAgICAgICAgdGhpcy55ID0geE9yUG9pbnQueTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFkZChwOiBQb2ludCkge1xuICAgICAgICB0aGlzLnggKz0gcC54O1xuICAgICAgICB0aGlzLnkgKz0gcC55O1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBzY2FsZShzOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy54ICo9IHM7XG4gICAgICAgIHRoaXMueSAqPSBzO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGRpc3QocDogUG9pbnQpIHtcbiAgICAgICAgY29uc3QgZHggPSB0aGlzLnggLSBwLng7XG4gICAgICAgIGNvbnN0IGR5ID0gdGhpcy55IC0gcC55O1xuICAgICAgICByZXR1cm4gTWF0aC5zcXJ0KGR4ICoqIDIgKyBkeSAqKiAyKTtcbiAgICB9XG5cbiAgICBzcUxlbmd0aCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMueCAqKiAyICsgdGhpcy55ICoqIDI7XG4gICAgfVxuXG4gICAgc3RhdGljIGFkZChwMTogUG9pbnQsIHAyOiBQb2ludCkge1xuICAgICAgICByZXR1cm4gbmV3IFZlY3RvcihwMS54ICsgcDIueCwgcDEueSArIHAyLnkpO1xuICAgIH1cbn0iLCJpbXBvcnQgeyBWZWN0b3IgfSBmcm9tIFwiLi4vdXRpbHMvdmVjdG9yXCI7XG5cbmV4cG9ydCBjbGFzcyBCcmljayB7XG4gICAgcHJpdmF0ZSBpbWFnZTogSFRNTEltYWdlRWxlbWVudCA9IG5ldyBJbWFnZSgpO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHB1YmxpYyBwb3NpdGlvbjogVmVjdG9yLFxuICAgICAgICBpbWFnZTogc3RyaW5nXG4gICAgKSB7XG4gICAgICAgIHRoaXMuaW1hZ2Uuc3JjID0gaW1hZ2U7XG4gICAgfVxuXG4gICAgZ2V0SW1hZ2UoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaW1hZ2Uuc3JjO1xuICAgIH1cbn0iLCJpbXBvcnQgeyBWZWN0b3IgfSBmcm9tIFwiLi4vR2VvbWV0cnkvVmVjdG9yXCI7XG5cbmV4cG9ydCBjbGFzcyBCYWxsIHtcbiAgICBwdWJsaWMgcmFkaXVzID0gNTtcbiAgICBwcml2YXRlIGNvbG9yID0gXCJyZWRcIjtcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBwb3NpdGlvbjogVmVjdG9yLCBwdWJsaWMgdmVsb2NpdHk6IFZlY3RvcikgeyB9XG4gICAgbW92ZSgpIHtcbiAgICAgICAgdGhpcy5wb3NpdGlvbi54ICs9IHRoaXMudmVsb2NpdHkueDtcbiAgICAgICAgdGhpcy5wb3NpdGlvbi55ICs9IHRoaXMudmVsb2NpdHkueTtcbiAgICB9XG5cbn0iLCJpbXBvcnQgeyBCcmljayB9IGZyb20gXCIuLi9maWd1cmVzL0JyaWNrXCI7XG5pbXBvcnQge1xuICAgIEJSSUNLU19DT0xTLFxuICAgIEJSSUNLX1JPV1MsXG4gICAgSU5DUkVFTU5UX0RPV05fQlJJQ0ssXG4gICAgSU5DUkVNRU5UX0xFRlRfQlJJQ0ssXG4gICAgSU5JVElBTF9TVEFSVF9CUklDS19MRUZULFxuICAgIElOSVRJQUxfU1RBUlRfQlJJQ0tfUklHSFRcbn0gZnJvbSBcIi4vY29uc3RhbnRzXCI7XG5cbmltcG9ydCB7IFZlY3RvciB9IGZyb20gXCIuL3ZlY3RvclwiO1xuXG5jb25zdCBicmlja3NJbWFnZSA9IFtcbiAgICBcIi9hc3NldHMvYnJpY2stYmx1ZS5wbmdcIixcbiAgICBcIi9hc3NldHMvYnJpY2stZ3JlZW4ucG5nXCIsXG4gICAgXCIvYXNzZXRzL2JyaWNrLXB1cnBsZS5wbmdcIixcbiAgICBcIi9hc3NldHMvYnJpY2stcmVkLnBuZ1wiLFxuICAgIFwiL2Fzc2V0cy9icmljay15ZWxsb3cucG5nXCJcbl1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUJyaWNrcygpOiBCcmlja1tdIHtcbiAgICBsZXQgeCA9IElOSVRJQUxfU1RBUlRfQlJJQ0tfTEVGVDtcbiAgICBsZXQgeSA9IElOSVRJQUxfU1RBUlRfQlJJQ0tfUklHSFQ7XG5cbiAgICBjb25zdCBicmlja3M6IEJyaWNrW10gPSBbXTtcblxuICAgIGZvciAobGV0IHJvdyA9IDA7IHJvdyA8IEJSSUNLX1JPV1M7IHJvdysrKSB7XG4gICAgICAgIGZvciAobGV0IGNvbCA9IDA7IGNvbCA8IEJSSUNLU19DT0xTOyBjb2wrKykge1xuICAgICAgICAgICAgY29uc3QgcG9zOiBWZWN0b3IgPSB7IHgsIHkgfTtcblxuICAgICAgICAgICAgY29uc3QgcmFuZFBvcyA9IE1hdGgucmFuZG9tKCkgKiBicmlja3NJbWFnZS5sZW5ndGggfCAwO1xuICAgICAgICAgICAgY29uc3QgYnJpY2sgPSBuZXcgQnJpY2socG9zLCBicmlja3NJbWFnZVtyYW5kUG9zXSlcbiAgICAgICAgICAgIGJyaWNrcy5wdXNoKGJyaWNrKTtcbiAgICAgICAgICAgIHggKz0gSU5DUkVNRU5UX0xFRlRfQlJJQ0s7XG4gICAgICAgIH1cbiAgICBcbiAgICAgICAgeCA9IElOSVRJQUxfU1RBUlRfQlJJQ0tfTEVGVDtcbiAgICAgICAgeSArPSBJTkNSRUVNTlRfRE9XTl9CUklDSztcbiAgICB9XG4gICAgcmV0dXJuIGJyaWNrcztcbn0iLCJcbi8vIEJSSUNLU1xuZXhwb3J0IGNvbnN0IEJSSUNLX1JPV1MgPSAzO1xuZXhwb3J0IGNvbnN0IEJSSUNLU19DT0xTID0gMTA7XG5leHBvcnQgY29uc3QgQlJJQ0tfV0lEVEggPSAxMDA7XG5leHBvcnQgY29uc3QgQlJJQ0tfSEVJR0hUID0gNDA7XG5leHBvcnQgY29uc3QgSU5JVElBTF9TVEFSVF9CUklDS19MRUZUID0gMTA7XG5leHBvcnQgY29uc3QgSU5JVElBTF9TVEFSVF9CUklDS19SSUdIVCA9IDEwO1xuZXhwb3J0IGNvbnN0IElOQ1JFTUVOVF9MRUZUX0JSSUNLID0gMTIwO1xuZXhwb3J0IGNvbnN0IElOQ1JFRU1OVF9ET1dOX0JSSUNLID0gNjA7XG4iLCJpbXBvcnQgeyBWZWN0b3IgfSBmcm9tIFwiLi4vdXRpbHMvdmVjdG9yXCI7XG5pbXBvcnQgeyBCUklDS19ST1dTLCBCUklDS19XSURUSCwgQlJJQ0tfSEVJR0hUIH0gZnJvbSBcIi4uL3V0aWxzL2NvbnN0YW50c1wiO1xuaW1wb3J0IHsgY3JlYXRlQnJpY2tzIH0gZnJvbSBcIi4uL3V0aWxzL2JyaWNrRmFjdG9yeVwiO1xuaW1wb3J0IHsgQmFsbCBhcyBiIH0gZnJvbSBcIi4uL2dhbWVPYmplY3RzL0JhbGxcIjtcbmltcG9ydCB7IEJvYXJkIH0gZnJvbSBcIi4uL2dhbWVPYmplY3RzL0JvYXJkXCI7XG5cbmV4cG9ydCBjbGFzcyBDYW52YXNWaWV3IHtcbiAgICBwcml2YXRlIGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEO1xuICAgIHB1YmxpYyBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50O1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHB1YmxpYyBjYW52YXNTZWxlY3Rvcjogc3RyaW5nLFxuICAgICkge1xuICAgICAgICB0aGlzLmNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGNhbnZhc1NlbGVjdG9yKSBhcyBIVE1MQ2FudmFzRWxlbWVudDtcbiAgICAgICAgdGhpcy5jdHggPSB0aGlzLmNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuICAgIH1cblxuICAgIGRyYXdJbWFnZShwb3NpdGlvbjogVmVjdG9yLCBzb3VyY2U6IHN0cmluZywgd2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIpIHtcbiAgICAgICAgY29uc3QgaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgaW1hZ2Uuc3JjID0gc291cmNlO1xuXG4gICAgICAgIC8vIGltYWdlLm9ubG9hZCA9ICgpID0+IHtcbiAgICAgICAgdGhpcy5jdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIC8vdGhpcy5jdHguZHJhd0ltYWdlKGltYWdlLCBwb3NpdGlvbi54LCBwb3NpdGlvbi55LCB3aWR0aCwgaGVpZ2h0KTtcbiAgICAgICAgdGhpcy5jdHgucmVjdChwb3NpdGlvbi54LCBwb3NpdGlvbi55LCA1MCwgNTApO1xuICAgICAgICB0aGlzLmN0eC5maWxsKCk7XG4gICAgICAgIHRoaXMuY3R4LmNsb3NlUGF0aCgpO1xuICAgICAgICAvLyB9O1xuICAgIH1cblxuICAgIGRyYXdCcmlja3MoYnJpY2tzKSB7XG4gICAgICAgIC8vICBjb25zdCBicmlja3MgPSBjcmVhdGVCcmlja3MoKTtcblxuICAgICAgICBmb3IgKGxldCByID0gMDsgciA8IEJSSUNLX1JPV1M7IHIrKykge1xuICAgICAgICAgICAgZm9yIChsZXQgYyA9IDA7IGMgPCBicmlja3MubGVuZ3RoOyBjKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBicmljayA9IGJyaWNrc1tjXTtcbiAgICAgICAgICAgICAgICBjb25zdCBwb3M6IFZlY3RvciA9IHtcbiAgICAgICAgICAgICAgICAgICAgeDogYnJpY2sucG9zaXRpb24ueCxcbiAgICAgICAgICAgICAgICAgICAgeTogYnJpY2sucG9zaXRpb24ueVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLmRyYXdJbWFnZShwb3MsIGJyaWNrLmdldEltYWdlKCksIEJSSUNLX1dJRFRILCBCUklDS19IRUlHSFQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZHJhd0JhbGwoYmFsbDogYikge1xuICAgICAgICB0aGlzLmN0eC5iZWdpblBhdGgoKVxuICAgICAgICB0aGlzLmN0eC5hcmMoYmFsbC5wb3NpdGlvbi54LCBiYWxsLnBvc2l0aW9uLnksIGJhbGwucmFkaXVzLCAwLCAyICogTWF0aC5QSSk7XG4gICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IFwicmVkXCI7XG4gICAgICAgIHRoaXMuY3R4LmZpbGwoKTtcbiAgICAgICAgdGhpcy5jdHguY2xvc2VQYXRoKCk7XG4gICAgfVxuICAgIGRyYXdCb2FyZChib2FyZDogQm9hcmQpIHtcbiAgICAgICAgdGhpcy5jdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIHRoaXMuY3R4LmRyYXdJbWFnZShib2FyZC5pbWFnZSwgYm9hcmQucG9zaXRpb24ueCwgYm9hcmQucG9zaXRpb24ueSk7XG4gICAgICAgIHRoaXMuY3R4LmNsb3NlUGF0aCgpO1xuICAgIH1cblxuICAgIGdldENvbnRleHQoKTogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY3R4O1xuICAgIH1cbn0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IEJhbGwgfSBmcm9tIFwiLi9maWd1cmVzL0JhbGxcIjtcblxuaW1wb3J0IHsgQmFsbCBhcyBiIH0gZnJvbSBcIi4vZ2FtZU9iamVjdHMvQmFsbFwiO1xuaW1wb3J0IHsgVmVjdG9yIH0gZnJvbSBcIi4vdXRpbHMvdmVjdG9yXCI7XG5pbXBvcnQgeyBWZWN0b3IgYXMgdiB9IGZyb20gXCIuL0dlb21ldHJ5L1ZlY3RvclwiO1xuaW1wb3J0IHsgQ2FudmFzVmlldyB9IGZyb20gXCIuL3ZpZXcvQ2FudmFzVmlld1wiXG5jb25zdCBwbGF5QnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BsYXktYnRuJyk7XG5pbXBvcnQgeyBjcmVhdGVCcmlja3MgfSBmcm9tIFwiLi91dGlscy9icmlja0ZhY3RvcnlcIjtcbmltcG9ydCB7IEJvYXJkIH0gZnJvbSBcIi4vZ2FtZU9iamVjdHMvQm9hcmRcIjtcbmNvbnN0IGNhbnZhc1ZpZXcgPSBuZXcgQ2FudmFzVmlldygnZ2FtZUNhbnZhcycpO1xubGV0IGxhc3RUaW1lID0gMDtcbmxldCBlbGFwc2VkID0gMDtcbmNvbnN0IFNURVBfU0laRSA9IDIwO1xuY29uc3QgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dhbWVDYW52YXMnKSBhcyBIVE1MQ2FudmFzRWxlbWVudDtcblxuXG4vLy9nYW1lIG9iamVjdHNcbmNvbnN0IGJiID0gbmV3IGIobmV3IHYoNSwgNSksIG5ldyB2KDUsIDUpKTtcbmNvbnN0IGJyaWNrcyA9IGNyZWF0ZUJyaWNrcygpO1xuY29uc3QgYm9hcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYm9hcmQnKSBhcyBIVE1MSW1hZ2VFbGVtZW50O1xuLy9jb25zdCBiYm9hcmQgPSBuZXcgQm9hcmQoYylcblxuXG5wbGF5QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250YWluZXInKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIHN0YXJ0R2FtZSgpO1xufSk7XG5cbmZ1bmN0aW9uIHN0YXJ0R2FtZSgpIHtcblxuICAgIHVwZGF0ZShwZXJmb3JtYW5jZS5ub3coKSk7XG5cbn1cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGUodGltZTogbnVtYmVyKSB7XG4gICAgY29uc3QgZGVsdGEgPSB0aW1lIC0gbGFzdFRpbWU7XG4gICAgbGFzdFRpbWUgPSB0aW1lO1xuICAgIGVsYXBzZWQgKz0gZGVsdGE7XG4gICAgaWYgKGVsYXBzZWQgPiBTVEVQX1NJWkUgKiA1KSB7XG4gICAgICAgIGVsYXBzZWQgPSBTVEVQX1NJWkUgKiA1O1xuICAgIH1cblxuICAgIHdoaWxlIChlbGFwc2VkID4gU1RFUF9TSVpFKSB7XG4gICAgICAgIGVsYXBzZWQgLT0gU1RFUF9TSVpFO1xuICAgICAgICBsb29wKCk7XG4gICAgfVxuICAgIC8vIGlmIChpc1J1bm5pbmcpXG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHVwZGF0ZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBsb29wKCkge1xuICAgIGNhbnZhc1ZpZXcuZ2V0Q29udGV4dCgpLmNsZWFyUmVjdCgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xuICAgIGNhbnZhc1ZpZXcuZHJhd0JyaWNrcyhicmlja3MpO1xuICAgIGJiLm1vdmUoKTtcbiAgICBjYW52YXNWaWV3LmRyYXdCYWxsKGJiKTtcbn1cblxuXG5cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==