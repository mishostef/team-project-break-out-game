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

/***/ "./src/app.ts":
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "showGameOverMessage": () => (/* binding */ showGameOverMessage),
/* harmony export */   "update": () => (/* binding */ update)
/* harmony export */ });
/* harmony import */ var _figures_Ball__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./figures/Ball */ "./src/figures/Ball.ts");
/* harmony import */ var _figures_Paddle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./figures/Paddle */ "./src/figures/Paddle.ts");
/* harmony import */ var _Geometry_Vector__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Geometry/Vector */ "./src/Geometry/Vector.ts");
/* harmony import */ var _physics_movement__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./physics/movement */ "./src/physics/movement.ts");
/* harmony import */ var _utils_brickFactory__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/brickFactory */ "./src/utils/brickFactory.ts");
/* harmony import */ var _utils_constants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils/constants */ "./src/utils/constants.ts");
/* harmony import */ var _utils_validators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./utils/validators */ "./src/utils/validators.ts");
/* harmony import */ var _view_CanvasView__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./view/CanvasView */ "./src/view/CanvasView.ts");
/* harmony import */ var _physics_misc__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./physics/misc */ "./src/physics/misc.ts");
/* harmony import */ var _engine_gameLoop__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./engine/gameLoop */ "./src/engine/gameLoop.ts");










const canvasView = new _view_CanvasView__WEBPACK_IMPORTED_MODULE_7__.CanvasView("gameCanvas");
const gameoverDiv = document.getElementById("gameOver");
let lastTime = 0;
let elapsed = 0;
const STEP_SIZE = 20;
let GAME_DIFFICULTY = _utils_constants__WEBPACK_IMPORTED_MODULE_5__.EASY_LEVEl;
const boardImg = document.getElementById("board");
const boardPosition = new _Geometry_Vector__WEBPACK_IMPORTED_MODULE_2__.Vector(canvasView.canvas.width / 2, canvasView.canvas.height - 100);
let bricks = (0,_utils_brickFactory__WEBPACK_IMPORTED_MODULE_4__.createBricks)();
let boardVelocity = new _Geometry_Vector__WEBPACK_IMPORTED_MODULE_2__.Vector(0, 0);
let board = new _figures_Paddle__WEBPACK_IMPORTED_MODULE_1__.Paddle(boardPosition, boardImg, boardVelocity);
const ballPosition = new _Geometry_Vector__WEBPACK_IMPORTED_MODULE_2__.Vector(_utils_constants__WEBPACK_IMPORTED_MODULE_5__.INITIAL_BALL_X, _utils_constants__WEBPACK_IMPORTED_MODULE_5__.INITIAL_BALL_Y);
let ballVelocity = new _Geometry_Vector__WEBPACK_IMPORTED_MODULE_2__.Vector(GAME_DIFFICULTY, GAME_DIFFICULTY);
let ball = new _figures_Ball__WEBPACK_IMPORTED_MODULE_0__.Ball(ballPosition, "/assets/ball.png", ballVelocity);
const input = {};
let gameOver = false;
let scorePoints = 0;
let isMouseActive = true;
let lives = 3;
window.addEventListener("keydown", (event) => {
    input[event.code] = true;
});
window.addEventListener("keyup", (event) => {
    input[event.code] = false;
});
document.addEventListener("mousemove", (e) => {
    if (isMouseActive)
        board.position.x = e.clientX;
});
window.oncontextmenu = (e) => {
    e.preventDefault();
    console.log("right clicked");
    isMouseActive = false;
};
const playBtn = document.getElementById("play-btn");
let isPlayMusic = false;
document.getElementById("new-game").addEventListener("click", () => {
    gameOver = false;
    startGame();
    gameoverDiv.style.display = "none";
});
playBtn.addEventListener("click", () => {
    document.getElementById("container").style.display = "none";
    document.getElementById("gameCanvas").style.display = "block";
    const detailsBox = document.getElementById("details-box");
    detailsBox.style.display = "flex";
    detailsBox.style.justifyContent = "space-around";
    startGame();
    if (isPlayMusic) {
        const music = new Audio("../assets/music.mp3");
        music.volume = 0.1;
        music.play();
    }
});
document.getElementById("setting-btn").addEventListener("click", () => {
    const settingsContainer = document.getElementById("settings-container");
    const container = document.getElementById("container");
    settingsContainer.style.display = "block";
    container.style.display = "none";
    document.getElementById("back-btn").addEventListener("click", () => {
        settingsContainer.style.display = "none";
        container.style.display = "block";
    });
    document.getElementById("play-sound-btn").addEventListener("click", () => {
        isPlayMusic = true;
        document.querySelector(".gg-check").style.display =
            "block";
    });
});
document.getElementById("level").addEventListener("click", (e) => {
    const input = e.target;
    const level = input.id;
    document.querySelectorAll('input').forEach((input) => {
        input.checked = false;
    });
    input.checked = true;
    switch (level) {
        case "easy":
            GAME_DIFFICULTY = _utils_constants__WEBPACK_IMPORTED_MODULE_5__.EASY_LEVEl;
            break;
        case "medium":
            GAME_DIFFICULTY = _utils_constants__WEBPACK_IMPORTED_MODULE_5__.MEDIUM_LEVEL;
            break;
        case "hard":
            GAME_DIFFICULTY = _utils_constants__WEBPACK_IMPORTED_MODULE_5__.HARD_LEVEL;
            break;
    }
});
function startGame() {
    bricks = (0,_utils_brickFactory__WEBPACK_IMPORTED_MODULE_4__.createBricks)();
    board = new _figures_Paddle__WEBPACK_IMPORTED_MODULE_1__.Paddle(boardPosition, boardImg);
    const ballPosition = new _Geometry_Vector__WEBPACK_IMPORTED_MODULE_2__.Vector(_utils_constants__WEBPACK_IMPORTED_MODULE_5__.INITIAL_BALL_X, _utils_constants__WEBPACK_IMPORTED_MODULE_5__.INITIAL_BALL_Y);
    ball = new _figures_Ball__WEBPACK_IMPORTED_MODULE_0__.Ball(ballPosition, "/assets/ball.png");
    ball.velocity = new _Geometry_Vector__WEBPACK_IMPORTED_MODULE_2__.Vector(GAME_DIFFICULTY, GAME_DIFFICULTY);
    scorePoints = 0;
    update(performance.now());
}
function update(time) {
    const delta = time - lastTime;
    lastTime = time;
    elapsed += delta;
    let deleteBrickIndex = (0,_utils_validators__WEBPACK_IMPORTED_MODULE_6__.isBallNearBricks)(ball)
        ? (0,_physics_misc__WEBPACK_IMPORTED_MODULE_8__.getHitBrickIndex)(bricks, ball)
        : -1;
    if (deleteBrickIndex != -1) {
        const brick = bricks[deleteBrickIndex];
        (0,_physics_movement__WEBPACK_IMPORTED_MODULE_3__.changeBallDirection)(ball, brick);
        bricks.splice(deleteBrickIndex, 1);
        scorePoints += _utils_constants__WEBPACK_IMPORTED_MODULE_5__.BRICK_BONUS_POINTS;
    }
    if (elapsed > STEP_SIZE * 5) {
        elapsed = STEP_SIZE * 5;
    }
    while (elapsed > STEP_SIZE) {
        elapsed -= STEP_SIZE;
        const loop = _engine_gameLoop__WEBPACK_IMPORTED_MODULE_9__.gameLoop.bind(null, ball, board, bricks, canvasView, gameOver);
        loop();
        document["newgame"] = true;
    }
    if (bricks.length && !gameOver) {
        requestAnimationFrame(update);
    }
}
function showGameOverMessage() {
    gameoverDiv.style.display = "block";
    gameoverDiv.innerText = `Game over, score:${scorePoints}`;
}


/***/ }),

/***/ "./src/engine/gameLoop.ts":
/*!********************************!*\
  !*** ./src/engine/gameLoop.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Game": () => (/* binding */ Game),
/* harmony export */   "collisionDetector": () => (/* binding */ collisionDetector),
/* harmony export */   "gameLoop": () => (/* binding */ gameLoop)
/* harmony export */ });
/* harmony import */ var _view_CanvasView__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../view/CanvasView */ "./src/view/CanvasView.ts");
/* harmony import */ var _move__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./move */ "./src/engine/move.ts");
/* harmony import */ var _utils_constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/constants */ "./src/utils/constants.ts");
/* harmony import */ var _utils_validators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/validators */ "./src/utils/validators.ts");
/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../app */ "./src/app.ts");
/* harmony import */ var _physics_movement__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../physics/movement */ "./src/physics/movement.ts");






const canvasView = new _view_CanvasView__WEBPACK_IMPORTED_MODULE_0__.CanvasView("gameCanvas");
const input = {};
window.addEventListener("keydown", (event) => {
    input[event.code] = true;
});
window.addEventListener("keyup", (event) => {
    input[event.code] = false;
});
class Game {
    gameObjects;
    canvasView;
    lives;
    constructor(gameObjects, canvasView, lives) {
        this.gameObjects = gameObjects;
        this.canvasView = canvasView;
        this.lives = lives;
    }
    gameLoop() {
        if (input['ArrowLeft'] && (this.gameObjects.board.position.x > 0)) {
            this.gameObjects.board.velocity.x = -7;
            (0,_move__WEBPACK_IMPORTED_MODULE_1__.move)(this.gameObjects.board);
        }
        else if (input['ArrowRight'] && (this.gameObjects.board.position.x + _utils_constants__WEBPACK_IMPORTED_MODULE_2__.BOARD_WIDTH < canvasView.canvas.width)) {
            this.gameObjects.board.velocity.x = 7;
            (0,_move__WEBPACK_IMPORTED_MODULE_1__.move)(this.gameObjects.board);
        }
        canvasView.getContext().clearRect(0, 0, canvasView.canvas.width, canvasView.canvas.height);
        canvasView.drawBricks(this.gameObjects.bricks);
        canvasView.drawBoard(this.gameObjects.board);
        canvasView.drawBall(this.gameObjects.ball);
        this.collisionDetector();
        (0,_move__WEBPACK_IMPORTED_MODULE_1__.move)(this.gameObjects.ball);
    }
    collisionDetector() {
        if ((0,_utils_validators__WEBPACK_IMPORTED_MODULE_3__.isBallCollidingWithBoard)(this.gameObjects.ball, this.gameObjects.board)) {
            (0,_physics_movement__WEBPACK_IMPORTED_MODULE_5__.handleBoardHit)(this.gameObjects.ball, this.gameObjects.board);
        }
        if ((0,_utils_validators__WEBPACK_IMPORTED_MODULE_3__.isBallHittingTheFloor)(this.gameObjects.ball, this.canvasView)) {
            this.lives--; //
            (0,_app__WEBPACK_IMPORTED_MODULE_4__.showGameOverMessage)();
        }
        else if ((0,_utils_validators__WEBPACK_IMPORTED_MODULE_3__.isBallHittingTheCeiling)(this.gameObjects.ball)) {
            this.gameObjects.ball.velocity.y = Math.abs(this.gameObjects.ball.velocity.y);
        }
        else if ((0,_utils_validators__WEBPACK_IMPORTED_MODULE_3__.isBallHittingRightWall)(this.gameObjects.ball, this.canvasView)) {
            this.gameObjects.ball.velocity.x = -this.gameObjects.ball.velocity.x;
        }
        else if ((0,_utils_validators__WEBPACK_IMPORTED_MODULE_3__.isBallHittingTheLeftWall)(this.gameObjects.ball)) {
            this.gameObjects.ball.velocity.x = Math.abs(this.gameObjects.ball.velocity.x);
        }
    }
}
//todo-ball, board, bricks->gameObjects{}
function gameLoop(ball, board, bricks, canvasView, gameOver) {
    if (input['ArrowLeft'] && (board.position.x > 0)) {
        board.velocity.x = -7;
        (0,_move__WEBPACK_IMPORTED_MODULE_1__.move)(board);
    }
    else if (input['ArrowRight'] && (board.position.x + _utils_constants__WEBPACK_IMPORTED_MODULE_2__.BOARD_WIDTH < canvasView.canvas.width)) {
        board.velocity.x = 7;
        (0,_move__WEBPACK_IMPORTED_MODULE_1__.move)(board);
    }
    canvasView.getContext().clearRect(0, 0, canvasView.canvas.width, canvasView.canvas.height);
    canvasView.drawBricks(bricks);
    canvasView.drawBoard(board);
    canvasView.drawBall(ball);
    collisionDetector(ball, board, gameOver);
    (0,_move__WEBPACK_IMPORTED_MODULE_1__.move)(ball);
}
function collisionDetector(ball, board, gameOver) {
    if ((0,_utils_validators__WEBPACK_IMPORTED_MODULE_3__.isBallCollidingWithBoard)(ball, board)) {
        (0,_physics_movement__WEBPACK_IMPORTED_MODULE_5__.handleBoardHit)(ball, board);
    }
    if ((0,_utils_validators__WEBPACK_IMPORTED_MODULE_3__.isBallHittingTheFloor)(ball, canvasView)) {
        gameOver = true;
        (0,_app__WEBPACK_IMPORTED_MODULE_4__.showGameOverMessage)();
    }
    else if ((0,_utils_validators__WEBPACK_IMPORTED_MODULE_3__.isBallHittingTheCeiling)(ball)) {
        ball.velocity.y = Math.abs(ball.velocity.y);
    }
    else if ((0,_utils_validators__WEBPACK_IMPORTED_MODULE_3__.isBallHittingRightWall)(ball, canvasView)) {
        ball.velocity.x = -ball.velocity.x;
    }
    else if ((0,_utils_validators__WEBPACK_IMPORTED_MODULE_3__.isBallHittingTheLeftWall)(ball)) {
        ball.velocity.x = Math.abs(ball.velocity.x);
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

/***/ "./src/figures/Ball.ts":
/*!*****************************!*\
  !*** ./src/figures/Ball.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Ball": () => (/* binding */ Ball)
/* harmony export */ });
/* harmony import */ var _Geometry_Vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Geometry/Vector */ "./src/Geometry/Vector.ts");

class Ball {
    position;
    image = new Image();
    velocity = new _Geometry_Vector__WEBPACK_IMPORTED_MODULE_0__.Vector(0, 0);
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

/***/ "./src/figures/Paddle.ts":
/*!*******************************!*\
  !*** ./src/figures/Paddle.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Paddle": () => (/* binding */ Paddle)
/* harmony export */ });
/* harmony import */ var _Geometry_Vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Geometry/Vector */ "./src/Geometry/Vector.ts");

class Paddle {
    position;
    image = new Image();
    velocity = new _Geometry_Vector__WEBPACK_IMPORTED_MODULE_0__.Vector(0, 0);
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
/* harmony import */ var _figures_Brick__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../figures/Brick */ "./src/figures/Brick.ts");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants */ "./src/utils/constants.ts");


const bricksImage = [
    "/assets/brick-blue.png",
    "/assets/brick-green.png",
    "/assets/brick-purple.png",
    "/assets/brick-red.png",
    "/assets/brick-yellow.png",
];
function createBricks() {
    let x = _constants__WEBPACK_IMPORTED_MODULE_1__.INITIAL_START_BRICK_LEFT;
    let y = _constants__WEBPACK_IMPORTED_MODULE_1__.INITIAL_START_BRICK_RIGHT;
    const bricks = [];
    for (let row = 0; row < _constants__WEBPACK_IMPORTED_MODULE_1__.BRICK_ROWS; row++) {
        for (let col = 0; col < _constants__WEBPACK_IMPORTED_MODULE_1__.BRICKS_COLS; col++) {
            const pos = { x, y };
            const randPos = (Math.random() * bricksImage.length) | 0;
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
/* harmony export */   "EASY_LEVEl": () => (/* binding */ EASY_LEVEl),
/* harmony export */   "HARD_LEVEL": () => (/* binding */ HARD_LEVEL),
/* harmony export */   "INCREEMNT_DOWN_BRICK": () => (/* binding */ INCREEMNT_DOWN_BRICK),
/* harmony export */   "INCREMENT_LEFT_BRICK": () => (/* binding */ INCREMENT_LEFT_BRICK),
/* harmony export */   "INITIAL_BALL_X": () => (/* binding */ INITIAL_BALL_X),
/* harmony export */   "INITIAL_BALL_Y": () => (/* binding */ INITIAL_BALL_Y),
/* harmony export */   "INITIAL_START_BRICK_LEFT": () => (/* binding */ INITIAL_START_BRICK_LEFT),
/* harmony export */   "INITIAL_START_BRICK_RIGHT": () => (/* binding */ INITIAL_START_BRICK_RIGHT),
/* harmony export */   "MEDIUM_LEVEL": () => (/* binding */ MEDIUM_LEVEL)
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
        this.ctx = this.canvas.getContext("2d");
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
                    y: brick.position.y,
                };
                this.drawImage(pos, brick.getImage(), _utils_constants__WEBPACK_IMPORTED_MODULE_0__.BRICK_WIDTH, _utils_constants__WEBPACK_IMPORTED_MODULE_0__.BRICK_HEIGHT);
            }
        }
    }
    drawBall(ball) {
        this.drawImage({ x: ball.position.x - _utils_constants__WEBPACK_IMPORTED_MODULE_0__.BALL_DIAMETER / 2, y: ball.position.y - _utils_constants__WEBPACK_IMPORTED_MODULE_0__.BALL_DIAMETER / 2 }, ball.getImage(), _utils_constants__WEBPACK_IMPORTED_MODULE_0__.BALL_DIAMETER, _utils_constants__WEBPACK_IMPORTED_MODULE_0__.BALL_DIAMETER);
    }
    drawBoard(board) {
        this.ctx.beginPath();
        this.ctx.drawImage(board.getImage(), board.position.x, board.position.y, _utils_constants__WEBPACK_IMPORTED_MODULE_0__.BOARD_WIDTH, _utils_constants__WEBPACK_IMPORTED_MODULE_0__.BOARD_HEIGHT);
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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/app.ts");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0FDRjs7Ozs7OztVQ3BFRDtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7VUVOQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2J1ZGdldGVlci10cy8uL3NyYy9HZW9tZXRyeS9WZWN0b3IudHMiLCJ3ZWJwYWNrOi8vYnVkZ2V0ZWVyLXRzLy4vc3JjL2FwcC50cyIsIndlYnBhY2s6Ly9idWRnZXRlZXItdHMvLi9zcmMvZW5naW5lL2dhbWVMb29wLnRzIiwid2VicGFjazovL2J1ZGdldGVlci10cy8uL3NyYy9lbmdpbmUvbW92ZS50cyIsIndlYnBhY2s6Ly9idWRnZXRlZXItdHMvLi9zcmMvZmlndXJlcy9CYWxsLnRzIiwid2VicGFjazovL2J1ZGdldGVlci10cy8uL3NyYy9maWd1cmVzL0JyaWNrLnRzIiwid2VicGFjazovL2J1ZGdldGVlci10cy8uL3NyYy9maWd1cmVzL1BhZGRsZS50cyIsIndlYnBhY2s6Ly9idWRnZXRlZXItdHMvLi9zcmMvcGh5c2ljcy9taXNjLnRzIiwid2VicGFjazovL2J1ZGdldGVlci10cy8uL3NyYy9waHlzaWNzL21vdmVtZW50LnRzIiwid2VicGFjazovL2J1ZGdldGVlci10cy8uL3NyYy91dGlscy9icmlja0ZhY3RvcnkudHMiLCJ3ZWJwYWNrOi8vYnVkZ2V0ZWVyLXRzLy4vc3JjL3V0aWxzL2NvbnN0YW50cy50cyIsIndlYnBhY2s6Ly9idWRnZXRlZXItdHMvLi9zcmMvdXRpbHMvdmFsaWRhdG9ycy50cyIsIndlYnBhY2s6Ly9idWRnZXRlZXItdHMvLi9zcmMvdmlldy9DYW52YXNWaWV3LnRzIiwid2VicGFjazovL2J1ZGdldGVlci10cy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9idWRnZXRlZXItdHMvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2J1ZGdldGVlci10cy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2J1ZGdldGVlci10cy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2J1ZGdldGVlci10cy93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL2J1ZGdldGVlci10cy93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vYnVkZ2V0ZWVyLXRzL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQb2ludCB9IGZyb20gXCIuL0ludGVyZmFjZXNcIjtcblxuZXhwb3J0IGNsYXNzIFZlY3RvciBpbXBsZW1lbnRzIFBvaW50IHtcbiAgeDogbnVtYmVyO1xuICB5OiBudW1iZXI7XG5cbiAgY29uc3RydWN0b3IocDogUG9pbnQpO1xuICBjb25zdHJ1Y3Rvcih4OiBudW1iZXIsIHk6IG51bWJlcik7XG4gIGNvbnN0cnVjdG9yKHhPclBvaW50OiBudW1iZXIgfCBQb2ludCwgeT86IG51bWJlcikge1xuICAgIGlmICh0eXBlb2YgeE9yUG9pbnQgPT0gXCJudW1iZXJcIiAmJiB0eXBlb2YgeSA9PSBcIm51bWJlclwiKSB7XG4gICAgICB0aGlzLnggPSB4T3JQb2ludDtcbiAgICAgIHRoaXMueSA9IHk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgeE9yUG9pbnQgPT0gXCJvYmplY3RcIikge1xuICAgICAgdGhpcy54ID0geE9yUG9pbnQueDtcbiAgICAgIHRoaXMueSA9IHhPclBvaW50Lnk7XG4gICAgfVxuICB9XG5cbiAgYWRkKHA6IFBvaW50KSB7XG4gICAgdGhpcy54ICs9IHAueDtcbiAgICB0aGlzLnkgKz0gcC55O1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgc2NhbGUoczogbnVtYmVyKSB7XG4gICAgdGhpcy54ICo9IHM7XG4gICAgdGhpcy55ICo9IHM7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGRpc3QocDogUG9pbnQpIHtcbiAgICBjb25zdCBkeCA9IHRoaXMueCAtIHAueDtcbiAgICBjb25zdCBkeSA9IHRoaXMueSAtIHAueTtcbiAgICByZXR1cm4gTWF0aC5zcXJ0KGR4ICoqIDIgKyBkeSAqKiAyKTtcbiAgfVxuXG4gIHNxTGVuZ3RoKCkge1xuICAgIHJldHVybiB0aGlzLnggKiogMiArIHRoaXMueSAqKiAyO1xuICB9XG5cbiAgc3RhdGljIGFkZChwMTogUG9pbnQsIHAyOiBQb2ludCkge1xuICAgIHJldHVybiBuZXcgVmVjdG9yKHAxLnggKyBwMi54LCBwMS55ICsgcDIueSk7XG4gIH1cbn1cbiIsImltcG9ydCB7IEJhbGwgfSBmcm9tIFwiLi9maWd1cmVzL0JhbGxcIjtcbmltcG9ydCB7IFBhZGRsZSB9IGZyb20gXCIuL2ZpZ3VyZXMvUGFkZGxlXCI7XG5pbXBvcnQgeyBWZWN0b3IgfSBmcm9tIFwiLi9HZW9tZXRyeS9WZWN0b3JcIjtcbmltcG9ydCB7IGNoYW5nZUJhbGxEaXJlY3Rpb24gfSBmcm9tIFwiLi9waHlzaWNzL21vdmVtZW50XCI7XG5pbXBvcnQgeyBjcmVhdGVCcmlja3MgfSBmcm9tIFwiLi91dGlscy9icmlja0ZhY3RvcnlcIjtcbmltcG9ydCB7XG4gIElOSVRJQUxfQkFMTF9YLFxuICBJTklUSUFMX0JBTExfWSxcbiAgQlJJQ0tfQk9OVVNfUE9JTlRTLFxuICBCT0FSRF9XSURUSCxcbiAgQkFMTF9ESUFNRVRFUixcbiAgQlJJQ0tfSEVJR0hULFxuICBCUklDS19XSURUSCxcbiAgQk9BUkRfSEVJR0hULFxuICBFQVNZX0xFVkVsLFxuICBNRURJVU1fTEVWRUwsXG4gIEhBUkRfTEVWRUwsXG59IGZyb20gXCIuL3V0aWxzL2NvbnN0YW50c1wiO1xuXG5pbXBvcnQgeyBpc0JhbGxOZWFyQnJpY2tzIH0gZnJvbSBcIi4vdXRpbHMvdmFsaWRhdG9yc1wiO1xuaW1wb3J0IHsgQ2FudmFzVmlldyB9IGZyb20gXCIuL3ZpZXcvQ2FudmFzVmlld1wiO1xuaW1wb3J0IHsgZ2V0SGl0QnJpY2tJbmRleCB9IGZyb20gXCIuL3BoeXNpY3MvbWlzY1wiO1xuaW1wb3J0IHsgZ2FtZUxvb3AgfSBmcm9tIFwiLi9lbmdpbmUvZ2FtZUxvb3BcIjtcblxuY29uc3QgY2FudmFzVmlldyA9IG5ldyBDYW52YXNWaWV3KFwiZ2FtZUNhbnZhc1wiKTtcbmNvbnN0IGdhbWVvdmVyRGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJnYW1lT3ZlclwiKTtcbmxldCBsYXN0VGltZSA9IDA7XG5sZXQgZWxhcHNlZCA9IDA7XG5cbmNvbnN0IFNURVBfU0laRSA9IDIwO1xubGV0IEdBTUVfRElGRklDVUxUWSA9IEVBU1lfTEVWRWw7XG5jb25zdCBib2FyZEltZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYm9hcmRcIikgYXMgSFRNTEltYWdlRWxlbWVudDtcbmNvbnN0IGJvYXJkUG9zaXRpb24gPSBuZXcgVmVjdG9yKFxuICBjYW52YXNWaWV3LmNhbnZhcy53aWR0aCAvIDIsXG4gIGNhbnZhc1ZpZXcuY2FudmFzLmhlaWdodCAtIDEwMFxuKTtcbmxldCBicmlja3MgPSBjcmVhdGVCcmlja3MoKTtcbmxldCBib2FyZFZlbG9jaXR5ID0gbmV3IFZlY3RvcigwLCAwKTtcbmxldCBib2FyZCA9IG5ldyBQYWRkbGUoYm9hcmRQb3NpdGlvbiwgYm9hcmRJbWcsIGJvYXJkVmVsb2NpdHkpO1xuY29uc3QgYmFsbFBvc2l0aW9uID0gbmV3IFZlY3RvcihJTklUSUFMX0JBTExfWCwgSU5JVElBTF9CQUxMX1kpO1xubGV0IGJhbGxWZWxvY2l0eSA9IG5ldyBWZWN0b3IoR0FNRV9ESUZGSUNVTFRZLCBHQU1FX0RJRkZJQ1VMVFkpO1xubGV0IGJhbGwgPSBuZXcgQmFsbChiYWxsUG9zaXRpb24sIFwiL2Fzc2V0cy9iYWxsLnBuZ1wiLCBiYWxsVmVsb2NpdHkpO1xuY29uc3QgaW5wdXQ6IHsgW2NvZGU6IHN0cmluZ106IGJvb2xlYW4gfSA9IHt9O1xuXG5sZXQgZ2FtZU92ZXIgPSBmYWxzZTtcbmxldCBzY29yZVBvaW50cyA9IDA7XG5sZXQgaXNNb3VzZUFjdGl2ZSA9IHRydWU7XG5sZXQgbGl2ZXMgPSAzO1xuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgKGV2ZW50KSA9PiB7XG4gIGlucHV0W2V2ZW50LmNvZGVdID0gdHJ1ZTtcbn0pO1xud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCAoZXZlbnQpID0+IHtcbiAgaW5wdXRbZXZlbnQuY29kZV0gPSBmYWxzZTtcbn0pO1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIChlKSA9PiB7XG4gIGlmIChpc01vdXNlQWN0aXZlKSBib2FyZC5wb3NpdGlvbi54ID0gZS5jbGllbnRYO1xufSk7XG5cbndpbmRvdy5vbmNvbnRleHRtZW51ID0gKGUpID0+IHtcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICBjb25zb2xlLmxvZyhcInJpZ2h0IGNsaWNrZWRcIik7XG4gIGlzTW91c2VBY3RpdmUgPSBmYWxzZTtcbn07XG5jb25zdCBwbGF5QnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwbGF5LWJ0blwiKTtcbmxldCBpc1BsYXlNdXNpYyA9IGZhbHNlO1xuXG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm5ldy1nYW1lXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gIGdhbWVPdmVyID0gZmFsc2U7XG4gIHN0YXJ0R2FtZSgpO1xuICBnYW1lb3ZlckRpdi5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG59KTtcbnBsYXlCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb250YWluZXJcIikuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImdhbWVDYW52YXNcIikuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgY29uc3QgZGV0YWlsc0JveCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGV0YWlscy1ib3hcIik7XG4gIGRldGFpbHNCb3guc3R5bGUuZGlzcGxheSA9IFwiZmxleFwiO1xuICBkZXRhaWxzQm94LnN0eWxlLmp1c3RpZnlDb250ZW50ID0gXCJzcGFjZS1hcm91bmRcIjtcblxuICBzdGFydEdhbWUoKTtcblxuICBpZiAoaXNQbGF5TXVzaWMpIHtcbiAgICBjb25zdCBtdXNpYyA9IG5ldyBBdWRpbyhcIi4uL2Fzc2V0cy9tdXNpYy5tcDNcIik7XG4gICAgbXVzaWMudm9sdW1lID0gMC4xO1xuICAgIG11c2ljLnBsYXkoKTtcbiAgfVxufSk7XG5cbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2V0dGluZy1idG5cIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgY29uc3Qgc2V0dGluZ3NDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNldHRpbmdzLWNvbnRhaW5lclwiKTtcbiAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb250YWluZXJcIik7XG4gIHNldHRpbmdzQ29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gIGNvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYmFjay1idG5cIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBzZXR0aW5nc0NvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgY29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gIH0pO1xuXG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGxheS1zb3VuZC1idG5cIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBpc1BsYXlNdXNpYyA9IHRydWU7XG4gICAgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZ2ctY2hlY2tcIikgYXMgSFRNTEVsZW1lbnQpLnN0eWxlLmRpc3BsYXkgPVxuICAgICAgXCJibG9ja1wiO1xuICB9KTtcbn0pO1xuXG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxldmVsXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICBjb25zdCBpbnB1dCA9IChlLnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50KTtcbiAgY29uc3QgbGV2ZWwgPSBpbnB1dC5pZDtcblxuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdpbnB1dCcpLmZvckVhY2goKGlucHV0KSA9PiB7XG4gICAgaW5wdXQuY2hlY2tlZCA9IGZhbHNlO1xuICB9KVxuXG4gIGlucHV0LmNoZWNrZWQgPSB0cnVlO1xuXG4gIHN3aXRjaCAobGV2ZWwpIHtcbiAgICBjYXNlIFwiZWFzeVwiOlxuICAgICAgR0FNRV9ESUZGSUNVTFRZID0gRUFTWV9MRVZFbDtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgXCJtZWRpdW1cIjpcbiAgICAgIEdBTUVfRElGRklDVUxUWSA9IE1FRElVTV9MRVZFTDtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgXCJoYXJkXCI6XG4gICAgICBHQU1FX0RJRkZJQ1VMVFkgPSBIQVJEX0xFVkVMO1xuICAgICAgYnJlYWs7XG4gIH1cbn0pO1xuXG5mdW5jdGlvbiBzdGFydEdhbWUoKSB7XG4gIGJyaWNrcyA9IGNyZWF0ZUJyaWNrcygpO1xuICBib2FyZCA9IG5ldyBQYWRkbGUoYm9hcmRQb3NpdGlvbiwgYm9hcmRJbWcpO1xuICBjb25zdCBiYWxsUG9zaXRpb24gPSBuZXcgVmVjdG9yKElOSVRJQUxfQkFMTF9YLCBJTklUSUFMX0JBTExfWSk7XG4gIGJhbGwgPSBuZXcgQmFsbChiYWxsUG9zaXRpb24sIFwiL2Fzc2V0cy9iYWxsLnBuZ1wiKTtcbiAgYmFsbC52ZWxvY2l0eSA9IG5ldyBWZWN0b3IoR0FNRV9ESUZGSUNVTFRZLCBHQU1FX0RJRkZJQ1VMVFkpO1xuICBzY29yZVBvaW50cyA9IDA7XG4gIHVwZGF0ZShwZXJmb3JtYW5jZS5ub3coKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGUodGltZTogbnVtYmVyKSB7XG4gIGNvbnN0IGRlbHRhID0gdGltZSAtIGxhc3RUaW1lO1xuICBsYXN0VGltZSA9IHRpbWU7XG4gIGVsYXBzZWQgKz0gZGVsdGE7XG4gIGxldCBkZWxldGVCcmlja0luZGV4ID0gaXNCYWxsTmVhckJyaWNrcyhiYWxsKVxuICAgID8gZ2V0SGl0QnJpY2tJbmRleChicmlja3MsIGJhbGwpXG4gICAgOiAtMTtcbiAgaWYgKGRlbGV0ZUJyaWNrSW5kZXggIT0gLTEpIHtcbiAgICBjb25zdCBicmljayA9IGJyaWNrc1tkZWxldGVCcmlja0luZGV4XTtcbiAgICBjaGFuZ2VCYWxsRGlyZWN0aW9uKGJhbGwsIGJyaWNrKTtcbiAgICBicmlja3Muc3BsaWNlKGRlbGV0ZUJyaWNrSW5kZXgsIDEpO1xuICAgIHNjb3JlUG9pbnRzICs9IEJSSUNLX0JPTlVTX1BPSU5UUztcbiAgfVxuICBpZiAoZWxhcHNlZCA+IFNURVBfU0laRSAqIDUpIHtcbiAgICBlbGFwc2VkID0gU1RFUF9TSVpFICogNTtcbiAgfVxuICB3aGlsZSAoZWxhcHNlZCA+IFNURVBfU0laRSkge1xuICAgIGVsYXBzZWQgLT0gU1RFUF9TSVpFO1xuICAgIGNvbnN0IGxvb3AgPSBnYW1lTG9vcC5iaW5kKG51bGwsIGJhbGwsIGJvYXJkLCBicmlja3MsIGNhbnZhc1ZpZXcsIGdhbWVPdmVyKTtcbiAgICBsb29wKCk7XG4gICAgZG9jdW1lbnRbXCJuZXdnYW1lXCJdID0gdHJ1ZTtcbiAgfVxuICBpZiAoYnJpY2tzLmxlbmd0aCAmJiAhZ2FtZU92ZXIpIHtcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodXBkYXRlKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gc2hvd0dhbWVPdmVyTWVzc2FnZSgpIHtcbiAgZ2FtZW92ZXJEaXYuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgKGdhbWVvdmVyRGl2IGFzIEhUTUxEaXZFbGVtZW50KS5pbm5lclRleHQgPSBgR2FtZSBvdmVyLCBzY29yZToke3Njb3JlUG9pbnRzfWA7XG59XG4iLCJpbXBvcnQgeyBDYW52YXNWaWV3IH0gZnJvbSBcIi4uL3ZpZXcvQ2FudmFzVmlld1wiO1xuaW1wb3J0IHsgUGFkZGxlIH0gZnJvbSBcIi4uL2ZpZ3VyZXMvUGFkZGxlXCI7XG5pbXBvcnQgeyBCYWxsIH0gZnJvbSBcIi4uL2ZpZ3VyZXMvQmFsbFwiO1xuaW1wb3J0IHsgbW92ZSB9IGZyb20gXCIuL21vdmVcIjtcbmltcG9ydCB7XG4gICAgQk9BUkRfV0lEVEgsXG59IGZyb20gXCIuLi91dGlscy9jb25zdGFudHNcIjtcbmltcG9ydCB7XG4gICAgaXNCYWxsSGl0dGluZ1RoZUZsb29yLCBpc0JhbGxIaXR0aW5nVGhlQ2VpbGluZywgaXNCYWxsSGl0dGluZ1JpZ2h0V2FsbCxcbiAgICBpc0JhbGxIaXR0aW5nVGhlTGVmdFdhbGwsIGlzQmFsbENvbGxpZGluZ1dpdGhCb2FyZFxufSBmcm9tIFwiLi4vdXRpbHMvdmFsaWRhdG9yc1wiO1xuaW1wb3J0IHsgc2hvd0dhbWVPdmVyTWVzc2FnZSB9IGZyb20gXCIuLi9hcHBcIjtcbmltcG9ydCB7IGhhbmRsZUJvYXJkSGl0IH0gZnJvbSBcIi4uL3BoeXNpY3MvbW92ZW1lbnRcIjtcbmltcG9ydCB7IEJyaWNrIH0gZnJvbSBcIi4uL2ZpZ3VyZXMvQnJpY2tcIjtcblxuY29uc3QgY2FudmFzVmlldyA9IG5ldyBDYW52YXNWaWV3KFwiZ2FtZUNhbnZhc1wiKTtcblxuY29uc3QgaW5wdXQ6IHsgW2NvZGU6IHN0cmluZ106IGJvb2xlYW4gfSA9IHt9O1xuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgKGV2ZW50KSA9PiB7XG4gICAgaW5wdXRbZXZlbnQuY29kZV0gPSB0cnVlO1xufSk7XG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIChldmVudCkgPT4ge1xuICAgIGlucHV0W2V2ZW50LmNvZGVdID0gZmFsc2U7XG59KTtcblxuaW50ZXJmYWNlIEdhbWVPYmplY3RzIHtcbiAgICBiYWxsOiBCYWxsLCBib2FyZDogUGFkZGxlLCBicmlja3M6IEJyaWNrW11cbn1cblxuZXhwb3J0IGNsYXNzIEdhbWUge1xuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBnYW1lT2JqZWN0czogR2FtZU9iamVjdHMsIHB1YmxpYyBjYW52YXNWaWV3OiBDYW52YXNWaWV3LCBwdWJsaWMgbGl2ZXM6IG51bWJlcikgeyB9XG5cblxuICAgIGdhbWVMb29wKCkge1xuICAgICAgICBpZiAoaW5wdXRbJ0Fycm93TGVmdCddICYmICh0aGlzLmdhbWVPYmplY3RzLmJvYXJkLnBvc2l0aW9uLnggPiAwKSkge1xuICAgICAgICAgICAgdGhpcy5nYW1lT2JqZWN0cy5ib2FyZC52ZWxvY2l0eS54ID0gLTc7XG4gICAgICAgICAgICBtb3ZlKHRoaXMuZ2FtZU9iamVjdHMuYm9hcmQpO1xuICAgICAgICB9IGVsc2UgaWYgKGlucHV0WydBcnJvd1JpZ2h0J10gJiYgKHRoaXMuZ2FtZU9iamVjdHMuYm9hcmQucG9zaXRpb24ueCArIEJPQVJEX1dJRFRIIDwgY2FudmFzVmlldy5jYW52YXMud2lkdGgpKSB7XG4gICAgICAgICAgICB0aGlzLmdhbWVPYmplY3RzLmJvYXJkLnZlbG9jaXR5LnggPSA3O1xuICAgICAgICAgICAgbW92ZSh0aGlzLmdhbWVPYmplY3RzLmJvYXJkKTtcbiAgICAgICAgfVxuICAgICAgICBjYW52YXNWaWV3LmdldENvbnRleHQoKS5jbGVhclJlY3QoMCwgMCwgY2FudmFzVmlldy5jYW52YXMud2lkdGgsIGNhbnZhc1ZpZXcuY2FudmFzLmhlaWdodCk7XG4gICAgICAgIGNhbnZhc1ZpZXcuZHJhd0JyaWNrcyh0aGlzLmdhbWVPYmplY3RzLmJyaWNrcyk7XG4gICAgICAgIGNhbnZhc1ZpZXcuZHJhd0JvYXJkKHRoaXMuZ2FtZU9iamVjdHMuYm9hcmQpO1xuICAgICAgICBjYW52YXNWaWV3LmRyYXdCYWxsKHRoaXMuZ2FtZU9iamVjdHMuYmFsbCk7XG4gICAgICAgIHRoaXMuY29sbGlzaW9uRGV0ZWN0b3IoKTtcbiAgICAgICAgbW92ZSh0aGlzLmdhbWVPYmplY3RzLmJhbGwpO1xuICAgIH1cblxuXG4gICAgY29sbGlzaW9uRGV0ZWN0b3IoKSB7XG4gICAgICAgIGlmIChpc0JhbGxDb2xsaWRpbmdXaXRoQm9hcmQodGhpcy5nYW1lT2JqZWN0cy5iYWxsLCB0aGlzLmdhbWVPYmplY3RzLmJvYXJkKSkge1xuICAgICAgICAgICAgaGFuZGxlQm9hcmRIaXQodGhpcy5nYW1lT2JqZWN0cy5iYWxsLCB0aGlzLmdhbWVPYmplY3RzLmJvYXJkKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNCYWxsSGl0dGluZ1RoZUZsb29yKHRoaXMuZ2FtZU9iamVjdHMuYmFsbCwgdGhpcy5jYW52YXNWaWV3KSkge1xuICAgICAgICAgICAgdGhpcy5saXZlcy0tOy8vXG4gICAgICAgICAgICBzaG93R2FtZU92ZXJNZXNzYWdlKCk7XG4gICAgICAgIH0gZWxzZSBpZiAoaXNCYWxsSGl0dGluZ1RoZUNlaWxpbmcodGhpcy5nYW1lT2JqZWN0cy5iYWxsKSkge1xuICAgICAgICAgICAgdGhpcy5nYW1lT2JqZWN0cy5iYWxsLnZlbG9jaXR5LnkgPSBNYXRoLmFicyh0aGlzLmdhbWVPYmplY3RzLmJhbGwudmVsb2NpdHkueSk7XG4gICAgICAgIH0gZWxzZSBpZiAoaXNCYWxsSGl0dGluZ1JpZ2h0V2FsbCh0aGlzLmdhbWVPYmplY3RzLmJhbGwsIHRoaXMuY2FudmFzVmlldykpIHtcbiAgICAgICAgICAgIHRoaXMuZ2FtZU9iamVjdHMuYmFsbC52ZWxvY2l0eS54ID0gLSB0aGlzLmdhbWVPYmplY3RzLmJhbGwudmVsb2NpdHkueDtcbiAgICAgICAgfSBlbHNlIGlmIChpc0JhbGxIaXR0aW5nVGhlTGVmdFdhbGwodGhpcy5nYW1lT2JqZWN0cy5iYWxsKSkge1xuICAgICAgICAgICAgdGhpcy5nYW1lT2JqZWN0cy5iYWxsLnZlbG9jaXR5LnggPSBNYXRoLmFicyh0aGlzLmdhbWVPYmplY3RzLmJhbGwudmVsb2NpdHkueCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbi8vdG9kby1iYWxsLCBib2FyZCwgYnJpY2tzLT5nYW1lT2JqZWN0c3t9XG5leHBvcnQgZnVuY3Rpb24gZ2FtZUxvb3AoYmFsbCwgYm9hcmQsIGJyaWNrcywgY2FudmFzVmlldywgZ2FtZU92ZXIpIHtcbiAgICBpZiAoaW5wdXRbJ0Fycm93TGVmdCddICYmIChib2FyZC5wb3NpdGlvbi54ID4gMCkpIHtcbiAgICAgICAgYm9hcmQudmVsb2NpdHkueCA9IC03O1xuICAgICAgICBtb3ZlKGJvYXJkKTtcbiAgICB9IGVsc2UgaWYgKGlucHV0WydBcnJvd1JpZ2h0J10gJiYgKGJvYXJkLnBvc2l0aW9uLnggKyBCT0FSRF9XSURUSCA8IGNhbnZhc1ZpZXcuY2FudmFzLndpZHRoKSkge1xuICAgICAgICBib2FyZC52ZWxvY2l0eS54ID0gNztcbiAgICAgICAgbW92ZShib2FyZCk7XG4gICAgfVxuICAgIGNhbnZhc1ZpZXcuZ2V0Q29udGV4dCgpLmNsZWFyUmVjdCgwLCAwLCBjYW52YXNWaWV3LmNhbnZhcy53aWR0aCwgY2FudmFzVmlldy5jYW52YXMuaGVpZ2h0KTtcbiAgICBjYW52YXNWaWV3LmRyYXdCcmlja3MoYnJpY2tzKTtcbiAgICBjYW52YXNWaWV3LmRyYXdCb2FyZChib2FyZCk7XG4gICAgY2FudmFzVmlldy5kcmF3QmFsbChiYWxsKTtcbiAgICBjb2xsaXNpb25EZXRlY3RvcihiYWxsLCBib2FyZCwgZ2FtZU92ZXIpO1xuICAgIG1vdmUoYmFsbCk7XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGNvbGxpc2lvbkRldGVjdG9yKGJhbGw6IEJhbGwsIGJvYXJkOiBQYWRkbGUsIGdhbWVPdmVyOiBib29sZWFuKSB7XG4gICAgaWYgKGlzQmFsbENvbGxpZGluZ1dpdGhCb2FyZChiYWxsLCBib2FyZCkpIHtcbiAgICAgICAgaGFuZGxlQm9hcmRIaXQoYmFsbCwgYm9hcmQpO1xuICAgIH1cbiAgICBpZiAoaXNCYWxsSGl0dGluZ1RoZUZsb29yKGJhbGwsIGNhbnZhc1ZpZXcpKSB7XG4gICAgICAgIGdhbWVPdmVyID0gdHJ1ZTtcbiAgICAgICAgc2hvd0dhbWVPdmVyTWVzc2FnZSgpO1xuICAgIH0gZWxzZSBpZiAoaXNCYWxsSGl0dGluZ1RoZUNlaWxpbmcoYmFsbCkpIHtcbiAgICAgICAgYmFsbC52ZWxvY2l0eS55ID0gTWF0aC5hYnMoYmFsbC52ZWxvY2l0eS55KTtcbiAgICB9IGVsc2UgaWYgKGlzQmFsbEhpdHRpbmdSaWdodFdhbGwoYmFsbCwgY2FudmFzVmlldykpIHtcbiAgICAgICAgYmFsbC52ZWxvY2l0eS54ID0gLSBiYWxsLnZlbG9jaXR5Lng7XG4gICAgfSBlbHNlIGlmIChpc0JhbGxIaXR0aW5nVGhlTGVmdFdhbGwoYmFsbCkpIHtcbiAgICAgICAgYmFsbC52ZWxvY2l0eS54ID0gTWF0aC5hYnMoYmFsbC52ZWxvY2l0eS54KTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBWZWN0b3IgfSBmcm9tIFwiLi4vdXRpbHMvdmVjdG9yXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBtb3ZlKGdhbWVPYmplY3Q6IEdhbWVPYmplY3QpIHtcbiAgZ2FtZU9iamVjdC5wb3NpdGlvbi54ICs9IGdhbWVPYmplY3QudmVsb2NpdHkueDtcbiAgZ2FtZU9iamVjdC5wb3NpdGlvbi55ICs9IGdhbWVPYmplY3QudmVsb2NpdHkueTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBHYW1lT2JqZWN0IHtcbiAgcG9zaXRpb246IHsgeDogbnVtYmVyOyB5OiBudW1iZXIgfTtcbiAgdmVsb2NpdHk6IFZlY3RvclxufVxuIiwiaW1wb3J0IHsgVmVjdG9yIH0gZnJvbSBcIi4uL0dlb21ldHJ5L1ZlY3RvclwiO1xuXG5leHBvcnQgY2xhc3MgQmFsbCB7XG4gIHByaXZhdGUgaW1hZ2U6IEhUTUxJbWFnZUVsZW1lbnQgPSBuZXcgSW1hZ2UoKTtcbiAgcHVibGljIHZlbG9jaXR5OiBWZWN0b3IgPSBuZXcgVmVjdG9yKDAsIDApO1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgcG9zaXRpb246IFZlY3RvciwgaW1hZ2U6IHN0cmluZywgYmFsbHZlbG9jaXR5PzogVmVjdG9yKSB7XG4gICAgdGhpcy5pbWFnZS5zcmMgPSBpbWFnZTtcbiAgICBpZiAoISFiYWxsdmVsb2NpdHkpIHRoaXMudmVsb2NpdHkgPSBiYWxsdmVsb2NpdHk7XG4gIH1cblxuICBnZXRJbWFnZSgpOiBIVE1MSW1hZ2VFbGVtZW50IHtcbiAgICByZXR1cm4gdGhpcy5pbWFnZTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgVmVjdG9yIH0gZnJvbSBcIi4uL3V0aWxzL3ZlY3RvclwiO1xuXG5leHBvcnQgY2xhc3MgQnJpY2sge1xuICBwcml2YXRlIGltYWdlOiBIVE1MSW1hZ2VFbGVtZW50ID0gbmV3IEltYWdlKCk7XG5cbiAgY29uc3RydWN0b3IocHVibGljIHBvc2l0aW9uOiBWZWN0b3IsIGltYWdlOiBzdHJpbmcpIHtcbiAgICB0aGlzLmltYWdlLnNyYyA9IGltYWdlO1xuICB9XG5cbiAgZ2V0SW1hZ2UoKTogSFRNTEltYWdlRWxlbWVudCB7XG4gICAgcmV0dXJuIHRoaXMuaW1hZ2U7XG4gIH1cbn1cbiIsImltcG9ydCB7IFZlY3RvciB9IGZyb20gXCIuLi9HZW9tZXRyeS9WZWN0b3JcIjtcblxuZXhwb3J0IGNsYXNzIFBhZGRsZSB7XG4gIHByaXZhdGUgaW1hZ2U6IEhUTUxJbWFnZUVsZW1lbnQgPSBuZXcgSW1hZ2UoKTtcbiAgcHVibGljIHZlbG9jaXR5OiBWZWN0b3IgPSBuZXcgVmVjdG9yKDAsIDApO1xuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgcG9zaXRpb246IFZlY3RvcixcbiAgICBpbWFnZTogSFRNTEltYWdlRWxlbWVudCxcbiAgICBib2FyZHZlbG9jaXR5PzogVmVjdG9yXG4gICkge1xuICAgIHRoaXMuaW1hZ2UgPSBpbWFnZTtcbiAgICBpZiAoISFib2FyZHZlbG9jaXR5KSB0aGlzLnZlbG9jaXR5ID0gYm9hcmR2ZWxvY2l0eTtcbiAgfVxuXG4gIGdldEltYWdlKCk6IEhUTUxJbWFnZUVsZW1lbnQge1xuICAgIHJldHVybiB0aGlzLmltYWdlO1xuICB9XG59XG4iLCJpbXBvcnQgeyBCQUxMX0RJQU1FVEVSLCBCUklDS19XSURUSCwgQlJJQ0tfSEVJR0hUIH0gZnJvbSBcIi4uL3V0aWxzL2NvbnN0YW50c1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0SGl0QnJpY2tJbmRleChicmlja3MsIGJhbGwpIHtcbiAgcmV0dXJuIGJyaWNrcy5maW5kSW5kZXgoKGJyaWNrKSA9PiB7XG4gICAgY29uc3QgbGVmdCA9IGJyaWNrLnBvc2l0aW9uLnggLSBCQUxMX0RJQU1FVEVSIC8gMjtcbiAgICBjb25zdCByaWdodCA9IGJyaWNrLnBvc2l0aW9uLnggKyBCUklDS19XSURUSCArIEJBTExfRElBTUVURVIgLyAyO1xuICAgIGNvbnN0IHRvcCA9IGJyaWNrLnBvc2l0aW9uLnkgLSBCQUxMX0RJQU1FVEVSIC8gMjtcbiAgICBjb25zdCBib3R0b20gPSBicmljay5wb3NpdGlvbi55ICsgQlJJQ0tfSEVJR0hUICsgQkFMTF9ESUFNRVRFUiAvIDI7XG4gICAgcmV0dXJuIChcbiAgICAgIGJhbGwucG9zaXRpb24ueCA+PSBsZWZ0ICYmXG4gICAgICBiYWxsLnBvc2l0aW9uLnggPD0gcmlnaHQgJiZcbiAgICAgIGJhbGwucG9zaXRpb24ueSA+PSB0b3AgJiZcbiAgICAgIGJhbGwucG9zaXRpb24ueSA8PSBib3R0b21cbiAgICApO1xuICB9KTtcbn1cbiIsImltcG9ydCB7IEJhbGwgfSBmcm9tIFwiLi4vZmlndXJlcy9CYWxsXCI7XG5pbXBvcnQgeyBCcmljayB9IGZyb20gXCIuLi9maWd1cmVzL0JyaWNrXCI7XG5pbXBvcnQgeyBQYWRkbGUgfSBmcm9tIFwiLi4vZmlndXJlcy9QYWRkbGVcIjtcbmltcG9ydCB7IEJSSUNLX0hFSUdIVCwgQlJJQ0tfV0lEVEgsIEJBTExfRElBTUVURVIsIEJPQVJEX1dJRFRIIH0gZnJvbSBcIi4uL3V0aWxzL2NvbnN0YW50c1wiO1xuaW1wb3J0IHsgVmVjdG9yIH0gZnJvbSBcIi4uL3V0aWxzL3ZlY3RvclwiO1xuXG5leHBvcnQgZnVuY3Rpb24gY2hhbmdlQmFsbERpcmVjdGlvbihiYWxsOiBCYWxsLCBicmljazogQnJpY2spIHtcbiAgICBjb25zdCBCUklDS19ESUFHT05BTCA9IE1hdGguc3FydChCUklDS19IRUlHSFQgKiogMiArIEJSSUNLX1dJRFRIICoqIDIpO1xuICAgIGNvbnN0IGJyaWNrQ2VudGVyWCA9IGJyaWNrLnBvc2l0aW9uLnggKyBCUklDS19XSURUSCAvIDI7XG4gICAgY29uc3QgYnJpY2tDZW50ZXJZID0gYnJpY2sucG9zaXRpb24ueSArIEJSSUNLX0hFSUdIVCAvIDI7XG4gICAgY29uc3QgYmFsbENlbnRlclggPSBiYWxsLnBvc2l0aW9uLnggKyBCQUxMX0RJQU1FVEVSIC8gMjtcbiAgICBjb25zdCBiYWxsQ2VudGVyWSA9IGJhbGwucG9zaXRpb24ueSArIEJBTExfRElBTUVURVIgLyAyO1xuICAgIGNvbnN0IGRlbHRhWSA9IChCUklDS19IRUlHSFQgKiBCQUxMX0RJQU1FVEVSIC8gMikgLyBCUklDS19ESUFHT05BTDtcbiAgICBjb25zdCBkZWx0YVggPSAoQlJJQ0tfV0lEVEggKiBCQUxMX0RJQU1FVEVSIC8gMikgLyBCUklDS19ESUFHT05BTDtcbiAgICBjb25zdCBtaW5ZU2lkZUhpdCA9IGJyaWNrLnBvc2l0aW9uLnkgKyBkZWx0YVk7XG4gICAgY29uc3QgbWF4WVNpZGVIaXQgPSBicmljay5wb3NpdGlvbi55ICsgQlJJQ0tfSEVJR0hUIC0gZGVsdGFZO1xuICAgIGNvbnN0IG1pbkxlZnRYU2lkZUhpdCA9IGJyaWNrLnBvc2l0aW9uLnggLSBkZWx0YVg7XG4gICAgY29uc3QgbWF4TGVmdFhTaWRlSGl0ID0gYnJpY2sucG9zaXRpb24ueCArIGRlbHRhWDtcbiAgICBjb25zdCBpc0JhbGxDb21pbmdGcm9tQnV0dG9tTGVmdCA9ICgoYmFsbENlbnRlclggPiBtaW5MZWZ0WFNpZGVIaXQpXG4gICAgICAgICYmIChiYWxsQ2VudGVyWCA8IG1heExlZnRYU2lkZUhpdClcbiAgICAgICAgJiYgKGJhbGxDZW50ZXJZID4gbWluWVNpZGVIaXQpXG4gICAgICAgICYmIChiYWxsQ2VudGVyWSA8IG1heFlTaWRlSGl0KSk7XG4gICAgY29uc3QgaXNCYWxsQ29taW5nRnJvbUJ1dHRvbVJpZ2h0ID0gKChiYWxsQ2VudGVyWCA+IG1pbkxlZnRYU2lkZUhpdCArIEJSSUNLX1dJRFRIKVxuICAgICAgICAmJiAoYmFsbENlbnRlclggPCBtYXhMZWZ0WFNpZGVIaXQgKyBCUklDS19XSURUSClcbiAgICAgICAgJiYgKGJhbGxDZW50ZXJZID4gbWluWVNpZGVIaXQpXG4gICAgICAgICYmIChiYWxsQ2VudGVyWSA8IG1heFlTaWRlSGl0KSk7XG4gICAgaWYgKChpc0JhbGxDb21pbmdGcm9tQnV0dG9tTGVmdCAmJiBiYWxsLnZlbG9jaXR5LnggPiAwKSB8fCAoaXNCYWxsQ29taW5nRnJvbUJ1dHRvbVJpZ2h0ICYmIGJhbGwudmVsb2NpdHkueCA8IDApKSB7XG4gICAgICAgIGJhbGwudmVsb2NpdHkueCAqPSAtMTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBiYWxsLnZlbG9jaXR5LnkgKj0gLTE7XG4gICAgfVxuXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBoYW5kbGVCb2FyZEhpdChiYWxsOiBCYWxsLCBib2FyZDogUGFkZGxlKSB7XG4gICAgY29uc3QgY3VycmVudEFuZ2xlID0gTWF0aC5hdGFuMigtYmFsbC52ZWxvY2l0eS55LCBiYWxsLnZlbG9jaXR5LngpO1xuICAgIGNvbnN0IGRlbHRhQ2VudGVyWCA9IChiYWxsLnBvc2l0aW9uLnggLSAoYm9hcmQucG9zaXRpb24ueCArIEJPQVJEX1dJRFRIIC8gMikpIC8gKEJPQVJEX1dJRFRIIC8gMik7XG4gICAgY29uc3QgYW5nbGVUb0FkZCA9IE1hdGguUEkgLyA1O1xuICAgIGxldCBuZXh0QW5nbGUgPSBkZWx0YUNlbnRlclggKiBhbmdsZVRvQWRkICsgY3VycmVudEFuZ2xlO1xuICAgIGNvbnN0IHlPZmZzZXQgPSA1O1xuICAgIGlmIChuZXh0QW5nbGUgPCAtNSAqIE1hdGguUEkgLyA2KSB7XG4gICAgICAgIG5leHRBbmdsZSA9IC01ICogTWF0aC5QSSAvIDY7XG4gICAgfSBpZiAobmV4dEFuZ2xlID4gLU1hdGguUEkgLyA2KSB7XG4gICAgICAgIG5leHRBbmdsZSA9IC1NYXRoLlBJIC8gNlxuICAgIH1cblxuICAgIGJhbGwudmVsb2NpdHkueCA9IDUgKiBNYXRoLmNvcyhuZXh0QW5nbGUpO1xuICAgIGJhbGwudmVsb2NpdHkueSA9IDUgKiBNYXRoLnNpbihuZXh0QW5nbGUpO1xuICAgIGJhbGwucG9zaXRpb24ueSA9IGJvYXJkLnBvc2l0aW9uLnkgLSBCQUxMX0RJQU1FVEVSIC8gMiAtIHlPZmZzZXQ7XG59XG4iLCJpbXBvcnQgeyBCcmljayB9IGZyb20gXCIuLi9maWd1cmVzL0JyaWNrXCI7XG5pbXBvcnQge1xuICBCUklDS1NfQ09MUyxcbiAgQlJJQ0tfUk9XUyxcbiAgSU5DUkVFTU5UX0RPV05fQlJJQ0ssXG4gIElOQ1JFTUVOVF9MRUZUX0JSSUNLLFxuICBJTklUSUFMX1NUQVJUX0JSSUNLX0xFRlQsXG4gIElOSVRJQUxfU1RBUlRfQlJJQ0tfUklHSFQsXG59IGZyb20gXCIuL2NvbnN0YW50c1wiO1xuXG5pbXBvcnQgeyBWZWN0b3IgfSBmcm9tIFwiLi92ZWN0b3JcIjtcblxuY29uc3QgYnJpY2tzSW1hZ2UgPSBbXG4gIFwiL2Fzc2V0cy9icmljay1ibHVlLnBuZ1wiLFxuICBcIi9hc3NldHMvYnJpY2stZ3JlZW4ucG5nXCIsXG4gIFwiL2Fzc2V0cy9icmljay1wdXJwbGUucG5nXCIsXG4gIFwiL2Fzc2V0cy9icmljay1yZWQucG5nXCIsXG4gIFwiL2Fzc2V0cy9icmljay15ZWxsb3cucG5nXCIsXG5dO1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQnJpY2tzKCk6IEJyaWNrW10ge1xuICBsZXQgeCA9IElOSVRJQUxfU1RBUlRfQlJJQ0tfTEVGVDtcbiAgbGV0IHkgPSBJTklUSUFMX1NUQVJUX0JSSUNLX1JJR0hUO1xuXG4gIGNvbnN0IGJyaWNrczogQnJpY2tbXSA9IFtdO1xuXG4gIGZvciAobGV0IHJvdyA9IDA7IHJvdyA8IEJSSUNLX1JPV1M7IHJvdysrKSB7XG4gICAgZm9yIChsZXQgY29sID0gMDsgY29sIDwgQlJJQ0tTX0NPTFM7IGNvbCsrKSB7XG4gICAgICBjb25zdCBwb3M6IFZlY3RvciA9IHsgeCwgeSB9O1xuXG4gICAgICBjb25zdCByYW5kUG9zID0gKE1hdGgucmFuZG9tKCkgKiBicmlja3NJbWFnZS5sZW5ndGgpIHwgMDtcbiAgICAgIGNvbnN0IGJyaWNrID0gbmV3IEJyaWNrKHBvcywgYnJpY2tzSW1hZ2VbcmFuZFBvc10pO1xuICAgICAgYnJpY2tzLnB1c2goYnJpY2spO1xuICAgICAgeCArPSBJTkNSRU1FTlRfTEVGVF9CUklDSztcbiAgICB9XG5cbiAgICB4ID0gSU5JVElBTF9TVEFSVF9CUklDS19MRUZUO1xuICAgIHkgKz0gSU5DUkVFTU5UX0RPV05fQlJJQ0s7XG4gIH1cbiAgcmV0dXJuIGJyaWNrcztcbn1cbiIsIi8vIEJSSUNLU1xuZXhwb3J0IGNvbnN0IEJSSUNLX1JPV1MgPSAzO1xuZXhwb3J0IGNvbnN0IEJSSUNLU19DT0xTID0gMTA7XG5leHBvcnQgY29uc3QgQlJJQ0tfV0lEVEggPSAxMDA7XG5leHBvcnQgY29uc3QgQlJJQ0tfSEVJR0hUID0gNDA7XG5leHBvcnQgY29uc3QgSU5JVElBTF9TVEFSVF9CUklDS19MRUZUID0gMTA7XG5leHBvcnQgY29uc3QgSU5JVElBTF9TVEFSVF9CUklDS19SSUdIVCA9IDEwO1xuZXhwb3J0IGNvbnN0IElOQ1JFTUVOVF9MRUZUX0JSSUNLID0gMTIwO1xuZXhwb3J0IGNvbnN0IElOQ1JFRU1OVF9ET1dOX0JSSUNLID0gNjA7XG5leHBvcnQgY29uc3QgQlJJQ0tTX0VORCA9IDE3MDtcblxuLy8gQk9BUkRcbmV4cG9ydCBjb25zdCBCT0FSRF9XSURUSCA9IDEyMDtcbmV4cG9ydCBjb25zdCBCT0FSRF9IRUlHSFQgPSAyMDtcblxuLy9CQUxMXG5leHBvcnQgY29uc3QgQkFMTF9XSURUSCA9IDQwO1xuZXhwb3J0IGNvbnN0IEJBTExfSEVJR0hUID0gNDA7XG5leHBvcnQgY29uc3QgSU5JVElBTF9CQUxMX1ggPSAyMDA7XG5leHBvcnQgY29uc3QgSU5JVElBTF9CQUxMX1kgPSAyMDA7XG5leHBvcnQgY29uc3QgQkFMTF9ESUFNRVRFUiA9IDQwO1xuXG4vL01JU0NFTExBTkVPVVNcbmV4cG9ydCBjb25zdCBCUklDS19CT05VU19QT0lOVFMgPSAxMDtcblxuLy8gR0FNRVxuZXhwb3J0IGNvbnN0IEVBU1lfTEVWRWwgPSAzO1xuZXhwb3J0IGNvbnN0IE1FRElVTV9MRVZFTCA9IDU7XG5leHBvcnQgY29uc3QgSEFSRF9MRVZFTCA9IDg7XG4iLCJpbXBvcnQgeyBCYWxsIH0gZnJvbSBcIi4uL2ZpZ3VyZXMvQmFsbFwiO1xuaW1wb3J0IHsgUGFkZGxlIH0gZnJvbSBcIi4uL2ZpZ3VyZXMvUGFkZGxlXCI7XG5pbXBvcnQgeyBDYW52YXNWaWV3IH0gZnJvbSBcIi4uL3ZpZXcvQ2FudmFzVmlld1wiO1xuaW1wb3J0IHtcbiAgQkFMTF9ESUFNRVRFUixcbiAgQk9BUkRfSEVJR0hULFxuICBCT0FSRF9XSURUSCxcbiAgQlJJQ0tTX0VORCxcbiAgQlJJQ0tfV0lEVEgsXG59IGZyb20gXCIuL2NvbnN0YW50c1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gaXNCYWxsSGl0dGluZ1RoZUxlZnRXYWxsKGJhbGw6IEJhbGwpIHtcbiAgcmV0dXJuIGJhbGwucG9zaXRpb24ueCA8PSAwO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNCYWxsSGl0dGluZ1JpZ2h0V2FsbChiYWxsLCBjYW52YXNWaWV3OiBDYW52YXNWaWV3KSB7XG4gIHJldHVybiBiYWxsLnBvc2l0aW9uLnggPiBjYW52YXNWaWV3LmNhbnZhcy53aWR0aCAtIEJBTExfRElBTUVURVI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0JhbGxIaXR0aW5nVGhlQ2VpbGluZyhiYWxsOiBCYWxsKSB7XG4gIHJldHVybiBiYWxsLnBvc2l0aW9uLnkgPD0gMDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzQmFsbEhpdHRpbmdUaGVGbG9vcihiYWxsOiBCYWxsLCBjYW52YXNWaWV3OiBDYW52YXNWaWV3KSB7XG4gIHJldHVybiBiYWxsLnBvc2l0aW9uLnkgPj0gY2FudmFzVmlldy5jYW52YXMuaGVpZ2h0IC0gQkFMTF9ESUFNRVRFUjtcbn1cbmV4cG9ydCBmdW5jdGlvbiBpc0JhbGxOZWFyQnJpY2tzKGJhbGw6IEJhbGwpIHtcbiAgcmV0dXJuIGJhbGwucG9zaXRpb24ueSA8IEJSSUNLU19FTkQ7XG59XG5leHBvcnQgZnVuY3Rpb24gaXNCYWxsQ29sbGlkaW5nV2l0aEJvYXJkKGJhbGwsIGJvYXJkKSB7XG4gIHJldHVybiAoXG4gICAgYmFsbC5wb3NpdGlvbi55ICsgQkFMTF9ESUFNRVRFUiAvIDIgPj0gYm9hcmQucG9zaXRpb24ueSAmJlxuICAgIGJhbGwucG9zaXRpb24ueSArIEJBTExfRElBTUVURVIgLyAyIDw9IGJvYXJkLnBvc2l0aW9uLnkgKyAxMCAmJlxuICAgIGJhbGwucG9zaXRpb24ueCAtIEJBTExfRElBTUVURVIgLyAyIDw9IGJvYXJkLnBvc2l0aW9uLnggKyBCT0FSRF9XSURUSCAmJlxuICAgIGJhbGwucG9zaXRpb24ueCArIEJBTExfRElBTUVURVIgLyAyID49IGJvYXJkLnBvc2l0aW9uLnhcbiAgKTtcbn1cbiIsImltcG9ydCB7IFZlY3RvciB9IGZyb20gXCIuLi91dGlscy92ZWN0b3JcIjtcbmltcG9ydCB7XG4gIEJSSUNLX1JPV1MsXG4gIEJSSUNLX1dJRFRILFxuICBCUklDS19IRUlHSFQsXG4gIEJPQVJEX1dJRFRILFxuICBCT0FSRF9IRUlHSFQsXG4gIEJBTExfRElBTUVURVIsXG59IGZyb20gXCIuLi91dGlscy9jb25zdGFudHNcIjtcbmltcG9ydCB7IEJhbGwgfSBmcm9tIFwiLi4vZmlndXJlcy9CYWxsXCI7XG5pbXBvcnQgeyBCcmljayB9IGZyb20gXCIuLi9maWd1cmVzL0JyaWNrXCI7XG5pbXBvcnQgeyBQYWRkbGUgfSBmcm9tIFwiLi4vZmlndXJlcy9QYWRkbGVcIjtcblxuZXhwb3J0IGNsYXNzIENhbnZhc1ZpZXcge1xuICBwcml2YXRlIGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEO1xuICBwdWJsaWMgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudDtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgY2FudmFzU2VsZWN0b3I6IHN0cmluZykge1xuICAgIHRoaXMuY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoY2FudmFzU2VsZWN0b3IpIGFzIEhUTUxDYW52YXNFbGVtZW50O1xuICAgIHRoaXMuY3R4ID0gdGhpcy5jYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuICB9XG5cbiAgZHJhd0ltYWdlKFxuICAgIHBvc2l0aW9uOiBWZWN0b3IsXG4gICAgaW1hZ2U6IEhUTUxJbWFnZUVsZW1lbnQsXG4gICAgd2lkdGg6IG51bWJlcixcbiAgICBoZWlnaHQ6IG51bWJlclxuICApIHtcbiAgICB0aGlzLmN0eC5kcmF3SW1hZ2UoaW1hZ2UsIHBvc2l0aW9uLngsIHBvc2l0aW9uLnksIHdpZHRoLCBoZWlnaHQpO1xuICB9XG5cbiAgZHJhd0JyaWNrcyhicmlja3M6IEJyaWNrW10pIHtcbiAgICBmb3IgKGxldCByID0gMDsgciA8IEJSSUNLX1JPV1M7IHIrKykge1xuICAgICAgZm9yIChsZXQgYyA9IDA7IGMgPCBicmlja3MubGVuZ3RoOyBjKyspIHtcbiAgICAgICAgY29uc3QgYnJpY2sgPSBicmlja3NbY107XG4gICAgICAgIGNvbnN0IHBvczogVmVjdG9yID0ge1xuICAgICAgICAgIHg6IGJyaWNrLnBvc2l0aW9uLngsXG4gICAgICAgICAgeTogYnJpY2sucG9zaXRpb24ueSxcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5kcmF3SW1hZ2UocG9zLCBicmljay5nZXRJbWFnZSgpLCBCUklDS19XSURUSCwgQlJJQ0tfSEVJR0hUKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBkcmF3QmFsbChiYWxsOiBCYWxsKSB7XG4gICAgdGhpcy5kcmF3SW1hZ2UoXG4gICAgICB7IHg6IGJhbGwucG9zaXRpb24ueCAtIEJBTExfRElBTUVURVIgLyAyLCB5OiBiYWxsLnBvc2l0aW9uLnkgLSBCQUxMX0RJQU1FVEVSIC8gMiB9LFxuICAgICAgYmFsbC5nZXRJbWFnZSgpLFxuICAgICAgQkFMTF9ESUFNRVRFUixcbiAgICAgIEJBTExfRElBTUVURVJcbiAgICApO1xuICB9XG5cbiAgZHJhd0JvYXJkKGJvYXJkOiBQYWRkbGUpIHtcbiAgICB0aGlzLmN0eC5iZWdpblBhdGgoKTtcbiAgICB0aGlzLmN0eC5kcmF3SW1hZ2UoXG4gICAgICBib2FyZC5nZXRJbWFnZSgpLFxuICAgICAgYm9hcmQucG9zaXRpb24ueCxcbiAgICAgIGJvYXJkLnBvc2l0aW9uLnksXG4gICAgICBCT0FSRF9XSURUSCxcbiAgICAgIEJPQVJEX0hFSUdIVFxuICAgICk7XG4gICAgdGhpcy5jdHguY2xvc2VQYXRoKCk7XG4gIH1cblxuICBnZXRDb250ZXh0KCk6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCB7XG4gICAgcmV0dXJuIHRoaXMuY3R4O1xuICB9XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2FwcC50c1wiKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==