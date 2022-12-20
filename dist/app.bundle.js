/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/effects/explosion.ts":
/*!**********************************!*\
  !*** ./src/effects/explosion.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Particle": () => (/* binding */ Particle),
/* harmony export */   "createParticles": () => (/* binding */ createParticles),
/* harmony export */   "explode": () => (/* binding */ explode)
/* harmony export */ });
/* harmony import */ var _utils_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/constants */ "./src/utils/constants.ts");
/* harmony import */ var _view_canvasView__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../view/canvasView */ "./src/view/canvasView.ts");


/* Get the canvas  */
var canvas = _view_canvasView__WEBPACK_IMPORTED_MODULE_1__.canvasView;
var ctx = canvas.getContext();
let particles = [];
/* Initialize particle object  */
class Particle {
    x;
    y;
    radius;
    dx;
    dy;
    alpha;
    constructor(x, y, radius, dx, dy) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.dx = dx;
        this.dy = dy;
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.dx = dx;
        this.dy = dy;
        this.alpha = 1;
    }
    draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = "green";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fill();
        ctx.restore();
    }
    update() {
        this.draw();
        this.alpha -= 0.01;
        this.x += this.dx;
        this.y += this.dy;
    }
}
function createParticles(brick) {
    for (let i = 0; i <= 150; i++) {
        let dx = (Math.random() - 0.5) * (Math.random() * 6);
        let dy = (Math.random() - 0.5) * (Math.random() * 6);
        let radius = Math.random() * 3;
        let particle = new Particle(brick.position.x + _utils_constants__WEBPACK_IMPORTED_MODULE_0__.BRICK_WIDTH / 2, brick.position.y + _utils_constants__WEBPACK_IMPORTED_MODULE_0__.BRICK_HEIGHT / 2, radius, dx, dy);
        particles.push(particle);
    }
    console.log(particles);
    return particles;
}
function explode(particles) {
    if (particles.length) {
        particles.forEach((particle, i) => {
            if (particle.alpha <= 0) {
                particles.splice(i, 1);
            }
            else {
                particle.update();
            }
        });
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
/* harmony import */ var _effects_explosion__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../effects/explosion */ "./src/effects/explosion.ts");
/* harmony import */ var _view_DOMView__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../view/DOMView */ "./src/view/DOMView.ts");













const input = {};
let particles = [];
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
    dom = _view_DOMView__WEBPACK_IMPORTED_MODULE_12__.DOMView.getInstance();
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
            if (this.isMouseActive) {
                const positionInfo = _view_canvasView__WEBPACK_IMPORTED_MODULE_0__.canvasView.canvas.getBoundingClientRect();
                const width = positionInfo.width;
                let mouseX = e.offsetX;
                if (mouseX < _view_canvasView__WEBPACK_IMPORTED_MODULE_0__.canvasView.canvas.offsetLeft) {
                    mouseX = 0;
                }
                else if (mouseX > width) {
                    mouseX = _view_canvasView__WEBPACK_IMPORTED_MODULE_0__.canvasView.canvas.width - _utils_constants__WEBPACK_IMPORTED_MODULE_4__.BOARD_WIDTH;
                }
                this.board.position.x = mouseX;
            }
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
        if (this.bricks == undefined || this.bricks && this.bricks.length == 0 && this.lives > 0) {
            this.bricks = (0,_utils_brickFactory__WEBPACK_IMPORTED_MODULE_10__.createBricks)();
        }
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
        (0,_effects_explosion__WEBPACK_IMPORTED_MODULE_11__.explode)(particles);
        this.collisionDetector();
        if (!this.gameOver) {
            (0,_move__WEBPACK_IMPORTED_MODULE_3__.move)(this.ball);
        }
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
                    this.bricks = (0,_utils_brickFactory__WEBPACK_IMPORTED_MODULE_10__.createBricks)();
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
            this.dom.hideCongratulations();
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
            const brick = this.bricks[deleteBrickIndex];
            particles = (0,_effects_explosion__WEBPACK_IMPORTED_MODULE_11__.createParticles)(brick);
            console.log('particles', particles);
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
        else if (this.bricks.length === 0) {
            this.dom.showCongratulations();
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
    showCongratulations() {
        this.getElement("#gameWin").style.display = "block";
    }
    hideNewGameButton() {
        this.getElement("#new-game").style.display = "none";
    }
    hideCongratulations() {
        this.getElement("#gameWin").style.display = "none";
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



//const canvasView = new CanvasView("gameCanvas");
const dom = _view_DOMView__WEBPACK_IMPORTED_MODULE_2__.DOMView.getInstance();
let lives = 3;
let game = new _engine_gameLoop__WEBPACK_IMPORTED_MODULE_1__.Game(_view_canvasView__WEBPACK_IMPORTED_MODULE_0__.canvasView, lives);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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UyxjQUFjLENBQUMsSUFBVSxFQUFFLEtBQWE7SUFDcEQsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbkUsTUFBTSxZQUFZLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLHlEQUFXLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLHlEQUFXLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDbEcsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDL0IsSUFBSSxTQUFTLEdBQUcsWUFBWSxHQUFHLFVBQVUsR0FBRyxZQUFZLENBQUM7SUFDekQsTUFBTSxPQUFPLEdBQUcsQ0FBQyxDQUFDO0lBQ2xCLElBQUksU0FBUyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxFQUFFO1FBQzlCLFNBQVMsR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztLQUNoQztJQUFDLElBQUksU0FBUyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLEVBQUU7UUFDNUIsU0FBUyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDO0tBQzNCO0lBRUQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDMUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDMUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsMkRBQWEsR0FB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Q0FBQztRQUMvQyxLQUFLLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQztRQUNuQixLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7S0FDZDtBQUNILENBQUMsRUFBRSxXQUFXLENBQUMsQ0FBQztBQUVoQixHQUFHLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUU7SUFDM0IsR0FBRyxDQUFDLGdCQUFnQixFQUFFLENBQUM7SUFDdkIsR0FBRyxDQUFDLG9CQUFvQixFQUFFLENBQUM7SUFDM0IsR0FBRyxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsR0FBRyxFQUFFO1FBQzNCLGNBQWMsR0FBRyxJQUFJLENBQUM7UUFDdEIsR0FBRyxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ2pCLENBQUMsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO0FBQ3hCLENBQUMsRUFBRSxjQUFjLENBQUMsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2J1ZGdldGVlci10cy8uL3NyYy9lZmZlY3RzL2V4cGxvc2lvbi50cyIsIndlYnBhY2s6Ly9idWRnZXRlZXItdHMvLi9zcmMvZW5naW5lL2dhbWVMb29wLnRzIiwid2VicGFjazovL2J1ZGdldGVlci10cy8uL3NyYy9lbmdpbmUvbW92ZS50cyIsIndlYnBhY2s6Ly9idWRnZXRlZXItdHMvLi9zcmMvZmlndXJlcy9iYWxsLnRzIiwid2VicGFjazovL2J1ZGdldGVlci10cy8uL3NyYy9maWd1cmVzL2JyaWNrLnRzIiwid2VicGFjazovL2J1ZGdldGVlci10cy8uL3NyYy9maWd1cmVzL3BhZGRsZS50cyIsIndlYnBhY2s6Ly9idWRnZXRlZXItdHMvLi9zcmMvZ2VvbWV0cnkvdmVjdG9yLnRzIiwid2VicGFjazovL2J1ZGdldGVlci10cy8uL3NyYy9waHlzaWNzL21pc2MudHMiLCJ3ZWJwYWNrOi8vYnVkZ2V0ZWVyLXRzLy4vc3JjL3BoeXNpY3MvbW92ZW1lbnQudHMiLCJ3ZWJwYWNrOi8vYnVkZ2V0ZWVyLXRzLy4vc3JjL3V0aWxzL2JyaWNrRmFjdG9yeS50cyIsIndlYnBhY2s6Ly9idWRnZXRlZXItdHMvLi9zcmMvdXRpbHMvY29uc3RhbnRzLnRzIiwid2VicGFjazovL2J1ZGdldGVlci10cy8uL3NyYy91dGlscy9oZWxwZXJzLnRzIiwid2VicGFjazovL2J1ZGdldGVlci10cy8uL3NyYy91dGlscy92YWxpZGF0b3JzLnRzIiwid2VicGFjazovL2J1ZGdldGVlci10cy8uL3NyYy92aWV3L0RPTVZpZXcudHMiLCJ3ZWJwYWNrOi8vYnVkZ2V0ZWVyLXRzLy4vc3JjL3ZpZXcvY2FudmFzVmlldy50cyIsIndlYnBhY2s6Ly9idWRnZXRlZXItdHMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYnVkZ2V0ZWVyLXRzL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9idWRnZXRlZXItdHMvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9idWRnZXRlZXItdHMvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9idWRnZXRlZXItdHMvLi9zcmMvYXBwLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJyaWNrIH0gZnJvbSBcIi4uL2ZpZ3VyZXMvYnJpY2tcIjtcbmltcG9ydCB7IFZlY3RvciB9IGZyb20gXCIuLi9nZW9tZXRyeS92ZWN0b3JcIjtcbmltcG9ydCB7IEJSSUNLX0hFSUdIVCwgQlJJQ0tfV0lEVEggfSBmcm9tIFwiLi4vdXRpbHMvY29uc3RhbnRzXCI7XG5pbXBvcnQgeyBjYW52YXNWaWV3IH0gZnJvbSBcIi4uL3ZpZXcvY2FudmFzVmlld1wiO1xuXG4vKiBHZXQgdGhlIGNhbnZhcyAgKi9cbnZhciBjYW52YXMgPSBjYW52YXNWaWV3XG52YXIgY3R4ID0gY2FudmFzLmdldENvbnRleHQoKTtcbmxldCBwYXJ0aWNsZXMgPSBbXTtcblxuLyogSW5pdGlhbGl6ZSBwYXJ0aWNsZSBvYmplY3QgICovXG5leHBvcnQgY2xhc3MgUGFydGljbGUge1xuICAgIHByaXZhdGUgYWxwaGE7XG4gICAgY29uc3RydWN0b3IocHVibGljIHgsIHB1YmxpYyB5LCBwdWJsaWMgcmFkaXVzLCBwdWJsaWMgZHgsIHB1YmxpYyBkeSkge1xuICAgICAgICB0aGlzLnggPSB4O1xuICAgICAgICB0aGlzLnkgPSB5O1xuICAgICAgICB0aGlzLnJhZGl1cyA9IHJhZGl1cztcbiAgICAgICAgdGhpcy5keCA9IGR4O1xuICAgICAgICB0aGlzLmR5ID0gZHk7XG4gICAgICAgIHRoaXMuYWxwaGEgPSAxO1xuICAgIH1cbiAgICBkcmF3KCkge1xuICAgICAgICBjdHguc2F2ZSgpO1xuICAgICAgICBjdHguZ2xvYmFsQWxwaGEgPSB0aGlzLmFscGhhO1xuICAgICAgICBjdHguZmlsbFN0eWxlID0gXCJncmVlblwiO1xuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIGN0eC5hcmModGhpcy54LCB0aGlzLnksIHRoaXMucmFkaXVzLFxuICAgICAgICAgICAgMCwgTWF0aC5QSSAqIDIsIGZhbHNlKTtcbiAgICAgICAgY3R4LmZpbGwoKTtcbiAgICAgICAgY3R4LnJlc3RvcmUoKTtcbiAgICB9XG4gICAgdXBkYXRlKCkge1xuICAgICAgICB0aGlzLmRyYXcoKTtcbiAgICAgICAgdGhpcy5hbHBoYSAtPSAwLjAxO1xuICAgICAgICB0aGlzLnggKz0gdGhpcy5keDtcbiAgICAgICAgdGhpcy55ICs9IHRoaXMuZHk7XG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlUGFydGljbGVzKGJyaWNrOiBCcmljaykge1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPD0gMTUwOyBpKyspIHtcbiAgICAgICAgbGV0IGR4ID0gKE1hdGgucmFuZG9tKCkgLSAwLjUpICogKE1hdGgucmFuZG9tKCkgKiA2KTtcbiAgICAgICAgbGV0IGR5ID0gKE1hdGgucmFuZG9tKCkgLSAwLjUpICogKE1hdGgucmFuZG9tKCkgKiA2KTtcbiAgICAgICAgbGV0IHJhZGl1cyA9IE1hdGgucmFuZG9tKCkgKiAzO1xuICAgICAgICBsZXQgcGFydGljbGUgPSBuZXcgUGFydGljbGUoYnJpY2sucG9zaXRpb24ueCArIEJSSUNLX1dJRFRIIC8gMiwgYnJpY2sucG9zaXRpb24ueSArIEJSSUNLX0hFSUdIVCAvIDIsIHJhZGl1cywgZHgsIGR5KTtcbiAgICAgICAgcGFydGljbGVzLnB1c2gocGFydGljbGUpO1xuICAgIH1cbiAgICBjb25zb2xlLmxvZyhwYXJ0aWNsZXMpO1xuICAgIHJldHVybiBwYXJ0aWNsZXM7XG59XG5leHBvcnQgZnVuY3Rpb24gZXhwbG9kZShwYXJ0aWNsZXMpIHtcbiAgICBpZiAocGFydGljbGVzLmxlbmd0aCkge1xuICAgICAgICBwYXJ0aWNsZXMuZm9yRWFjaCgocGFydGljbGUsIGkpID0+IHtcbiAgICAgICAgICAgIGlmIChwYXJ0aWNsZS5hbHBoYSA8PSAwKSB7XG4gICAgICAgICAgICAgICAgcGFydGljbGVzLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcGFydGljbGUudXBkYXRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbn0iLCJpbXBvcnQgeyBDYW52YXNWaWV3LCBjYW52YXNWaWV3IH0gZnJvbSBcIi4uL3ZpZXcvY2FudmFzVmlld1wiO1xuaW1wb3J0IHsgUGFkZGxlIH0gZnJvbSBcIi4uL2ZpZ3VyZXMvcGFkZGxlXCI7XG5pbXBvcnQgeyBCYWxsIH0gZnJvbSBcIi4uL2ZpZ3VyZXMvYmFsbFwiO1xuaW1wb3J0IHsgQnJpY2sgfSBmcm9tIFwiLi4vZmlndXJlcy9icmlja1wiO1xuaW1wb3J0IHsgbW92ZSB9IGZyb20gXCIuL21vdmVcIjtcbmltcG9ydCB7XG4gICAgQk9BUkRfV0lEVEgsIEJSSUNLX0JPTlVTX1BPSU5UUywgQlJJQ0tfSEVJR0hULCBCUklDS19XSURUSCwgSU5JVElBTF9CQUxMX1gsIElOSVRJQUxfQkFMTF9ZLFxufSBmcm9tIFwiLi4vdXRpbHMvY29uc3RhbnRzXCI7XG5pbXBvcnQge1xuICAgIGlzQmFsbEhpdHRpbmdUaGVGbG9vciwgaXNCYWxsSGl0dGluZ1RoZUNlaWxpbmcsIGlzQmFsbEhpdHRpbmdSaWdodFdhbGwsXG4gICAgaXNCYWxsSGl0dGluZ1RoZUxlZnRXYWxsLCBpc0JhbGxDb2xsaWRpbmdXaXRoQm9hcmQsIGlzQmFsbE5lYXJCcmlja3Ncbn0gZnJvbSBcIi4uL3V0aWxzL3ZhbGlkYXRvcnNcIjtcbmltcG9ydCB7IHNldEdhbWVMZXZlbCwgc2hvd0dhbWVPdmVyTWVzc2FnZSB9IGZyb20gXCIuLi91dGlscy9oZWxwZXJzXCI7XG5pbXBvcnQgeyBjaGFuZ2VCYWxsRGlyZWN0aW9uLCBoYW5kbGVCb2FyZEhpdCB9IGZyb20gXCIuLi9waHlzaWNzL21vdmVtZW50XCI7XG5pbXBvcnQgeyBWZWN0b3IgfSBmcm9tIFwiLi4vZ2VvbWV0cnkvdmVjdG9yXCI7XG5pbXBvcnQgeyBnZXRIaXRCcmlja0luZGV4IH0gZnJvbSBcIi4uL3BoeXNpY3MvbWlzY1wiO1xuaW1wb3J0IHsgY3JlYXRlQnJpY2tzIH0gZnJvbSBcIi4uL3V0aWxzL2JyaWNrRmFjdG9yeVwiO1xuaW1wb3J0IHsgY3JlYXRlUGFydGljbGVzLCBleHBsb2RlIH0gZnJvbSBcIi4uL2VmZmVjdHMvZXhwbG9zaW9uXCI7XG5pbXBvcnQgeyBET01WaWV3IH0gZnJvbSBcIi4uL3ZpZXcvRE9NVmlld1wiO1xuXG5cbmNvbnN0IGlucHV0OiB7IFtjb2RlOiBzdHJpbmddOiBib29sZWFuIH0gPSB7fTtcbmxldCBwYXJ0aWNsZXMgPSBbXTtcblxuZXhwb3J0IGludGVyZmFjZSBHYW1lT2JqZWN0cyB7XG4gICAgYmFsbDogQmFsbCwgYm9hcmQ6IFBhZGRsZSwgYnJpY2tzOiBCcmlja1tdXG59XG5cbmV4cG9ydCBjbGFzcyBHYW1lIHtcbiAgICBwcml2YXRlIGJhbGw6IEJhbGw7XG4gICAgcHJpdmF0ZSBib2FyZDogUGFkZGxlO1xuICAgIHByaXZhdGUgYnJpY2tzOiBCcmlja1tdO1xuICAgIHB1YmxpYyBzY29yZVBvaW50czogbnVtYmVyO1xuICAgIHB1YmxpYyBHQU1FX0RJRkZJQ1VMVFkgPSAzO1xuICAgIHByaXZhdGUgcmVhZG9ubHkgU1RFUF9TSVpFID0gMjA7XG4gICAgcHJpdmF0ZSBsYXN0VGltZTogbnVtYmVyO1xuICAgIHByaXZhdGUgZWxhcHNlZDogbnVtYmVyO1xuICAgIHB1YmxpYyBnYW1lT3ZlcjogYm9vbGVhbjtcbiAgICBwcml2YXRlIGRvbSA9IERPTVZpZXcuZ2V0SW5zdGFuY2UoKTtcbiAgICBwcml2YXRlIGlzTW91c2VBY3RpdmUgPSB0cnVlO1xuICAgIHByaXZhdGUgbWF4TGl2ZXMgPSAzO1xuXG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgY2FudmFzVmlldzogQ2FudmFzVmlldywgcHVibGljIGxpdmVzOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5zY29yZVBvaW50cyA9IDA7XG4gICAgICAgIHRoaXMubWF4TGl2ZXMgPSBsaXZlcztcbiAgICAgICAgdGhpcy5pbml0aWFsaXplR2FtZU9iamVjdHMoKTtcbiAgICAgICAgdGhpcy5hZGRIYW5kbGVycygpO1xuICAgIH1cblxuICAgIHByaXZhdGUgYWRkSGFuZGxlcnMoKSB7XG4gICAgICAgIHRoaXMuZG9tLmFkZEhhbmRsZXIoXCJrZXlkb3duXCIsIChldmVudDogS2V5Ym9hcmRFdmVudCkgPT4ge1xuICAgICAgICAgICAgaW5wdXRbZXZlbnQuY29kZV0gPSB0cnVlO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5kb20uYWRkSGFuZGxlcihcImtleXVwXCIsIChldmVudDogS2V5Ym9hcmRFdmVudCkgPT4ge1xuICAgICAgICAgICAgaW5wdXRbZXZlbnQuY29kZV0gPSBmYWxzZTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuZG9tLmFkZEhhbmRsZXIoXCJtb3VzZW1vdmVcIiwgKGU6IE1vdXNlRXZlbnQpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLmlzTW91c2VBY3RpdmUpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBwb3NpdGlvbkluZm8gPSBjYW52YXNWaWV3LmNhbnZhcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgICAgICAgICBjb25zdCB3aWR0aCA9IHBvc2l0aW9uSW5mby53aWR0aDtcbiAgICAgICAgICAgICAgICBsZXQgbW91c2VYID0gZS5vZmZzZXRYO1xuICAgICAgICAgICAgICAgIGlmIChtb3VzZVggPCBjYW52YXNWaWV3LmNhbnZhcy5vZmZzZXRMZWZ0KSB7XG4gICAgICAgICAgICAgICAgICAgIG1vdXNlWCA9IDA7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChtb3VzZVggPiB3aWR0aCkge1xuICAgICAgICAgICAgICAgICAgICBtb3VzZVggPSBjYW52YXNWaWV3LmNhbnZhcy53aWR0aCAtIEJPQVJEX1dJRFRIO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLmJvYXJkLnBvc2l0aW9uLnggPSBtb3VzZVg7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmRvbS5hZGRSaWdodENsaWNrSGFuZGxlcigoZSkgPT4ge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgdGhpcy5pc01vdXNlQWN0aXZlID0gZmFsc2U7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmRvbS5hZGRIYW5kbGVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGlucHV0ID0gKGUudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQpO1xuICAgICAgICAgICAgdGhpcy5HQU1FX0RJRkZJQ1VMVFkgPSBzZXRHYW1lTGV2ZWwoaW5wdXQpO1xuICAgICAgICB9LCBcIiNsZXZlbFwiKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGluaXRpYWxpemVHYW1lT2JqZWN0cygpIHtcbiAgICAgICAgaWYgKHRoaXMuYnJpY2tzID09IHVuZGVmaW5lZCB8fCB0aGlzLmJyaWNrcyAmJiB0aGlzLmJyaWNrcy5sZW5ndGggPT0gMCAmJiB0aGlzLmxpdmVzID4gMCkge1xuICAgICAgICAgICAgdGhpcy5icmlja3MgPSBjcmVhdGVCcmlja3MoKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBib2FyZFBvc2l0aW9uID0gbmV3IFZlY3RvcihcbiAgICAgICAgICAgIGNhbnZhc1ZpZXcuY2FudmFzLndpZHRoIC8gMixcbiAgICAgICAgICAgIGNhbnZhc1ZpZXcuY2FudmFzLmhlaWdodCAtIDEwMFxuICAgICAgICApO1xuICAgICAgICB0aGlzLmJvYXJkID0gbmV3IFBhZGRsZShib2FyZFBvc2l0aW9uLCB0aGlzLmRvbS5nZXRCb2FyZEltYWdlKCkpO1xuICAgICAgICBjb25zdCBiYWxsUG9zaXRpb24gPSBuZXcgVmVjdG9yKElOSVRJQUxfQkFMTF9YLCBJTklUSUFMX0JBTExfWSk7XG4gICAgICAgIHRoaXMuYmFsbCA9IG5ldyBCYWxsKGJhbGxQb3NpdGlvbiwgXCIvYXNzZXRzL2JhbGwucG5nXCIpO1xuICAgICAgICB0aGlzLmJhbGwudmVsb2NpdHkgPSBuZXcgVmVjdG9yKHRoaXMuR0FNRV9ESUZGSUNVTFRZLCB0aGlzLkdBTUVfRElGRklDVUxUWSk7XG4gICAgICAgIHRoaXMubGFzdFRpbWUgPSAwO1xuICAgICAgICB0aGlzLmVsYXBzZWQgPSAwO1xuICAgICAgICB0aGlzLmdhbWVPdmVyID0gZmFsc2U7XG4gICAgfVxuXG4gICAgZ2FtZUxvb3AoKSB7XG4gICAgICAgIGlmIChpbnB1dFsnQXJyb3dMZWZ0J10gJiYgKHRoaXMuYm9hcmQucG9zaXRpb24ueCA+IDApKSB7XG4gICAgICAgICAgICB0aGlzLmJvYXJkLnZlbG9jaXR5LnggPSAtNztcbiAgICAgICAgICAgIG1vdmUodGhpcy5ib2FyZCk7XG4gICAgICAgIH0gZWxzZSBpZiAoaW5wdXRbJ0Fycm93UmlnaHQnXSAmJiAodGhpcy5ib2FyZC5wb3NpdGlvbi54ICsgQk9BUkRfV0lEVEggPCBjYW52YXNWaWV3LmNhbnZhcy53aWR0aCkpIHtcbiAgICAgICAgICAgIHRoaXMuYm9hcmQudmVsb2NpdHkueCA9IDc7XG4gICAgICAgICAgICBtb3ZlKHRoaXMuYm9hcmQpO1xuICAgICAgICB9XG4gICAgICAgIGNhbnZhc1ZpZXcuZ2V0Q29udGV4dCgpLmNsZWFyUmVjdCgwLCAwLCBjYW52YXNWaWV3LmNhbnZhcy53aWR0aCwgY2FudmFzVmlldy5jYW52YXMuaGVpZ2h0KTtcbiAgICAgICAgY2FudmFzVmlldy5kcmF3QnJpY2tzKHRoaXMuYnJpY2tzKTtcbiAgICAgICAgY2FudmFzVmlldy5kcmF3Qm9hcmQodGhpcy5ib2FyZCk7XG4gICAgICAgIGNhbnZhc1ZpZXcuZHJhd0JhbGwodGhpcy5iYWxsKTtcbiAgICAgICAgZXhwbG9kZShwYXJ0aWNsZXMpO1xuICAgICAgICB0aGlzLmNvbGxpc2lvbkRldGVjdG9yKCk7XG4gICAgICAgIGlmICghdGhpcy5nYW1lT3Zlcikge1xuICAgICAgICAgICAgbW92ZSh0aGlzLmJhbGwpO1xuICAgICAgICB9XG5cbiAgICB9XG4gICAgY29sbGlzaW9uRGV0ZWN0b3IoKSB7XG4gICAgICAgIGlmIChpc0JhbGxDb2xsaWRpbmdXaXRoQm9hcmQodGhpcy5iYWxsLCB0aGlzLmJvYXJkKSkge1xuICAgICAgICAgICAgaGFuZGxlQm9hcmRIaXQodGhpcy5iYWxsLCB0aGlzLmJvYXJkKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNCYWxsSGl0dGluZ1RoZUZsb29yKHRoaXMuYmFsbCwgdGhpcy5jYW52YXNWaWV3KSkge1xuICAgICAgICAgICAgdGhpcy5saXZlcy0tO1xuICAgICAgICAgICAgdGhpcy5nYW1lT3ZlciA9IHRydWU7XG4gICAgICAgICAgICBpZiAodGhpcy5saXZlcyA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHNob3dHYW1lT3Zlck1lc3NhZ2UodGhpcy5zY29yZVBvaW50cyk7IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRvbS5zaG93SW5pdGlhbFNjcmVlbigpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxpdmVzID0gdGhpcy5tYXhMaXZlcztcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5icmlja3MgPSBjcmVhdGVCcmlja3MoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zY29yZVBvaW50cyA9IDA7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZG9tLmhpZGVOZXdHYW1lQnV0dG9uKCk7XG4gICAgICAgICAgICAgICAgfSwgMTUwMCk7XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuZG9tLnNldExpdmVzKHRoaXMubGl2ZXMpO1xuICAgICAgICB9IGVsc2UgaWYgKGlzQmFsbEhpdHRpbmdUaGVDZWlsaW5nKHRoaXMuYmFsbCkpIHtcbiAgICAgICAgICAgIHRoaXMuYmFsbC52ZWxvY2l0eS55ID0gTWF0aC5hYnModGhpcy5iYWxsLnZlbG9jaXR5LnkpO1xuICAgICAgICB9IGVsc2UgaWYgKGlzQmFsbEhpdHRpbmdSaWdodFdhbGwodGhpcy5iYWxsLCB0aGlzLmNhbnZhc1ZpZXcpKSB7XG4gICAgICAgICAgICB0aGlzLmJhbGwudmVsb2NpdHkueCA9IC0gdGhpcy5iYWxsLnZlbG9jaXR5Lng7XG4gICAgICAgIH0gZWxzZSBpZiAoaXNCYWxsSGl0dGluZ1RoZUxlZnRXYWxsKHRoaXMuYmFsbCkpIHtcbiAgICAgICAgICAgIHRoaXMuYmFsbC52ZWxvY2l0eS54ID0gTWF0aC5hYnModGhpcy5iYWxsLnZlbG9jaXR5LngpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8vXG4gICAgc3RhcnRHYW1lKCkge1xuICAgICAgICBpZiAodGhpcy5saXZlcyA+IDEpIHtcbiAgICAgICAgICAgIHRoaXMuZG9tLnNob3dOZXdHYW1lQnV0dG9uKCk7XG4gICAgICAgICAgICB0aGlzLmRvbS5oaWRlQ29uZ3JhdHVsYXRpb25zKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmRvbS5oaWRlTmV3R2FtZUJ1dHRvbigpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZG9tLnNldFNjb3JlKHRoaXMuc2NvcmVQb2ludHMpO1xuICAgICAgICB0aGlzLmRvbS5zZXRMaXZlcyh0aGlzLmxpdmVzKTtcbiAgICAgICAgdGhpcy5pbml0aWFsaXplR2FtZU9iamVjdHMoKTtcbiAgICAgICAgdGhpcy51cGRhdGUocGVyZm9ybWFuY2Uubm93KCkpO1xuICAgIH1cblxuICAgIHVwZGF0ZSh0aW1lOiBudW1iZXIpIHtcbiAgICAgICAgY29uc3QgZGVsdGEgPSB0aW1lIC0gdGhpcy5sYXN0VGltZTtcbiAgICAgICAgdGhpcy5sYXN0VGltZSA9IHRpbWU7XG4gICAgICAgIHRoaXMuZWxhcHNlZCArPSBkZWx0YTtcbiAgICAgICAgbGV0IGRlbGV0ZUJyaWNrSW5kZXggPSBpc0JhbGxOZWFyQnJpY2tzKHRoaXMuYmFsbClcbiAgICAgICAgICAgID8gZ2V0SGl0QnJpY2tJbmRleCh0aGlzLmJyaWNrcywgdGhpcy5iYWxsKVxuICAgICAgICAgICAgOiAtMTtcbiAgICAgICAgaWYgKGRlbGV0ZUJyaWNrSW5kZXggIT0gLTEpIHtcbiAgICAgICAgICAgIGNvbnN0IGJyaWNrID0gdGhpcy5icmlja3NbZGVsZXRlQnJpY2tJbmRleF07XG4gICAgICAgICAgICBwYXJ0aWNsZXMgPSBjcmVhdGVQYXJ0aWNsZXMoYnJpY2spO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ3BhcnRpY2xlcycsIHBhcnRpY2xlcyk7XG4gICAgICAgICAgICBjaGFuZ2VCYWxsRGlyZWN0aW9uKHRoaXMuYmFsbCwgYnJpY2spO1xuICAgICAgICAgICAgdGhpcy5icmlja3Muc3BsaWNlKGRlbGV0ZUJyaWNrSW5kZXgsIDEpO1xuICAgICAgICAgICAgdGhpcy5zY29yZVBvaW50cyArPSBCUklDS19CT05VU19QT0lOVFM7XG4gICAgICAgICAgICB0aGlzLmRvbS5zZXRTY29yZSh0aGlzLnNjb3JlUG9pbnRzKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5lbGFwc2VkID4gdGhpcy5TVEVQX1NJWkUgKiA1KSB7XG4gICAgICAgICAgICB0aGlzLmVsYXBzZWQgPSB0aGlzLlNURVBfU0laRSAqIDU7XG4gICAgICAgIH1cbiAgICAgICAgd2hpbGUgKHRoaXMuZWxhcHNlZCA+IHRoaXMuU1RFUF9TSVpFKSB7XG4gICAgICAgICAgICB0aGlzLmVsYXBzZWQgLT0gdGhpcy5TVEVQX1NJWkU7XG4gICAgICAgICAgICB0aGlzLmdhbWVMb29wKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuYnJpY2tzLmxlbmd0aCAmJiAhdGhpcy5nYW1lT3Zlcikge1xuICAgICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMudXBkYXRlLmJpbmQodGhpcykpO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuYnJpY2tzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgdGhpcy5kb20uc2hvd0NvbmdyYXR1bGF0aW9ucygpO1xuICAgICAgICB9XG4gICAgfVxufSIsImltcG9ydCB7IFZlY3RvciB9IGZyb20gXCIuLi9nZW9tZXRyeS92ZWN0b3JcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIG1vdmUoZ2FtZU9iamVjdDogR2FtZU9iamVjdCkge1xuICBnYW1lT2JqZWN0LnBvc2l0aW9uLnggKz0gZ2FtZU9iamVjdC52ZWxvY2l0eS54O1xuICBnYW1lT2JqZWN0LnBvc2l0aW9uLnkgKz0gZ2FtZU9iamVjdC52ZWxvY2l0eS55O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEdhbWVPYmplY3Qge1xuICBwb3NpdGlvbjogeyB4OiBudW1iZXI7IHk6IG51bWJlciB9O1xuICB2ZWxvY2l0eTogVmVjdG9yXG59IiwiaW1wb3J0IHsgVmVjdG9yIH0gZnJvbSBcIi4uL2dlb21ldHJ5L3ZlY3RvclwiO1xuXG5leHBvcnQgY2xhc3MgQmFsbCB7XG4gIHByaXZhdGUgaW1hZ2U6IEhUTUxJbWFnZUVsZW1lbnQgPSBuZXcgSW1hZ2UoKTtcbiAgcHVibGljIHZlbG9jaXR5OiBWZWN0b3IgPSBuZXcgVmVjdG9yKDAsIDApO1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgcG9zaXRpb246IFZlY3RvciwgaW1hZ2U6IHN0cmluZywgYmFsbHZlbG9jaXR5PzogVmVjdG9yKSB7XG4gICAgdGhpcy5pbWFnZS5zcmMgPSBpbWFnZTtcbiAgICBpZiAoISFiYWxsdmVsb2NpdHkpIHRoaXMudmVsb2NpdHkgPSBiYWxsdmVsb2NpdHk7XG4gIH1cblxuICBnZXRJbWFnZSgpOiBIVE1MSW1hZ2VFbGVtZW50IHtcbiAgICByZXR1cm4gdGhpcy5pbWFnZTtcbiAgfVxufSIsImltcG9ydCB7IFZlY3RvciB9IGZyb20gXCIuLi9nZW9tZXRyeS92ZWN0b3JcIjtcblxuZXhwb3J0IGNsYXNzIEJyaWNrIHtcbiAgcHJpdmF0ZSBpbWFnZTogSFRNTEltYWdlRWxlbWVudCA9IG5ldyBJbWFnZSgpO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBwb3NpdGlvbjogVmVjdG9yLCBpbWFnZTogc3RyaW5nKSB7XG4gICAgdGhpcy5pbWFnZS5zcmMgPSBpbWFnZTtcbiAgfVxuXG4gIGdldEltYWdlKCk6IEhUTUxJbWFnZUVsZW1lbnQge1xuICAgIHJldHVybiB0aGlzLmltYWdlO1xuICB9XG59IiwiaW1wb3J0IHsgVmVjdG9yIH0gZnJvbSBcIi4uL2dlb21ldHJ5L3ZlY3RvclwiO1xuXG5leHBvcnQgY2xhc3MgUGFkZGxlIHtcbiAgcHJpdmF0ZSBpbWFnZTogSFRNTEltYWdlRWxlbWVudCA9IG5ldyBJbWFnZSgpO1xuICBwdWJsaWMgdmVsb2NpdHk6IFZlY3RvciA9IG5ldyBWZWN0b3IoMCwgMCk7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBwb3NpdGlvbjogVmVjdG9yLFxuICAgIGltYWdlOiBIVE1MSW1hZ2VFbGVtZW50LFxuICAgIGJvYXJkdmVsb2NpdHk/OiBWZWN0b3JcbiAgKSB7XG4gICAgdGhpcy5pbWFnZSA9IGltYWdlO1xuICAgIGlmICghIWJvYXJkdmVsb2NpdHkpIHRoaXMudmVsb2NpdHkgPSBib2FyZHZlbG9jaXR5O1xuICB9XG5cbiAgZ2V0SW1hZ2UoKTogSFRNTEltYWdlRWxlbWVudCB7XG4gICAgcmV0dXJuIHRoaXMuaW1hZ2U7XG4gIH1cbn1cbiIsImltcG9ydCB7IFBvaW50IH0gZnJvbSBcIi4vaW50ZXJmYWNlc1wiO1xuXG5leHBvcnQgY2xhc3MgVmVjdG9yIGltcGxlbWVudHMgUG9pbnQge1xuICB4OiBudW1iZXI7XG4gIHk6IG51bWJlcjtcblxuICBjb25zdHJ1Y3RvcihwOiBQb2ludCk7XG4gIGNvbnN0cnVjdG9yKHg6IG51bWJlciwgeTogbnVtYmVyKTtcbiAgY29uc3RydWN0b3IoeE9yUG9pbnQ6IG51bWJlciB8IFBvaW50LCB5PzogbnVtYmVyKSB7XG4gICAgaWYgKHR5cGVvZiB4T3JQb2ludCA9PSBcIm51bWJlclwiICYmIHR5cGVvZiB5ID09IFwibnVtYmVyXCIpIHtcbiAgICAgIHRoaXMueCA9IHhPclBvaW50O1xuICAgICAgdGhpcy55ID0geTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiB4T3JQb2ludCA9PSBcIm9iamVjdFwiKSB7XG4gICAgICB0aGlzLnggPSB4T3JQb2ludC54O1xuICAgICAgdGhpcy55ID0geE9yUG9pbnQueTtcbiAgICB9XG4gIH1cblxuICBhZGQocDogUG9pbnQpIHtcbiAgICB0aGlzLnggKz0gcC54O1xuICAgIHRoaXMueSArPSBwLnk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBzY2FsZShzOiBudW1iZXIpIHtcbiAgICB0aGlzLnggKj0gcztcbiAgICB0aGlzLnkgKj0gcztcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgZGlzdChwOiBQb2ludCkge1xuICAgIGNvbnN0IGR4ID0gdGhpcy54IC0gcC54O1xuICAgIGNvbnN0IGR5ID0gdGhpcy55IC0gcC55O1xuICAgIHJldHVybiBNYXRoLnNxcnQoZHggKiogMiArIGR5ICoqIDIpO1xuICB9XG5cbiAgc3FMZW5ndGgoKSB7XG4gICAgcmV0dXJuIHRoaXMueCAqKiAyICsgdGhpcy55ICoqIDI7XG4gIH1cblxuICBzdGF0aWMgYWRkKHAxOiBQb2ludCwgcDI6IFBvaW50KSB7XG4gICAgcmV0dXJuIG5ldyBWZWN0b3IocDEueCArIHAyLngsIHAxLnkgKyBwMi55KTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQkFMTF9ESUFNRVRFUiwgQlJJQ0tfV0lEVEgsIEJSSUNLX0hFSUdIVCB9IGZyb20gXCIuLi91dGlscy9jb25zdGFudHNcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIGdldEhpdEJyaWNrSW5kZXgoYnJpY2tzLCBiYWxsKSB7XG4gIHJldHVybiBicmlja3MuZmluZEluZGV4KChicmljaykgPT4ge1xuICAgIGNvbnN0IGxlZnQgPSBicmljay5wb3NpdGlvbi54IC0gQkFMTF9ESUFNRVRFUiAvIDI7XG4gICAgY29uc3QgcmlnaHQgPSBicmljay5wb3NpdGlvbi54ICsgQlJJQ0tfV0lEVEggKyBCQUxMX0RJQU1FVEVSIC8gMjtcbiAgICBjb25zdCB0b3AgPSBicmljay5wb3NpdGlvbi55IC0gQkFMTF9ESUFNRVRFUiAvIDI7XG4gICAgY29uc3QgYm90dG9tID0gYnJpY2sucG9zaXRpb24ueSArIEJSSUNLX0hFSUdIVCArIEJBTExfRElBTUVURVIgLyAyO1xuICAgIHJldHVybiAoXG4gICAgICBiYWxsLnBvc2l0aW9uLnggPj0gbGVmdCAmJlxuICAgICAgYmFsbC5wb3NpdGlvbi54IDw9IHJpZ2h0ICYmXG4gICAgICBiYWxsLnBvc2l0aW9uLnkgPj0gdG9wICYmXG4gICAgICBiYWxsLnBvc2l0aW9uLnkgPD0gYm90dG9tXG4gICAgKTtcbiAgfSk7XG59IiwiaW1wb3J0IHsgQmFsbCB9IGZyb20gXCIuLi9maWd1cmVzL2JhbGxcIjtcbmltcG9ydCB7IEJyaWNrIH0gZnJvbSBcIi4uL2ZpZ3VyZXMvYnJpY2tcIjtcbmltcG9ydCB7IFBhZGRsZSB9IGZyb20gXCIuLi9maWd1cmVzL3BhZGRsZVwiO1xuaW1wb3J0IHsgQlJJQ0tfSEVJR0hULCBCUklDS19XSURUSCwgQkFMTF9ESUFNRVRFUiwgQk9BUkRfV0lEVEggfSBmcm9tIFwiLi4vdXRpbHMvY29uc3RhbnRzXCI7XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGNoYW5nZUJhbGxEaXJlY3Rpb24oYmFsbDogQmFsbCwgYnJpY2s6IEJyaWNrKSB7XG4gICAgY29uc3QgQlJJQ0tfRElBR09OQUwgPSBNYXRoLnNxcnQoQlJJQ0tfSEVJR0hUICoqIDIgKyBCUklDS19XSURUSCAqKiAyKTtcbiAgICBjb25zdCBicmlja0NlbnRlclggPSBicmljay5wb3NpdGlvbi54ICsgQlJJQ0tfV0lEVEggLyAyO1xuICAgIGNvbnN0IGJyaWNrQ2VudGVyWSA9IGJyaWNrLnBvc2l0aW9uLnkgKyBCUklDS19IRUlHSFQgLyAyO1xuICAgIGNvbnN0IGJhbGxDZW50ZXJYID0gYmFsbC5wb3NpdGlvbi54ICsgQkFMTF9ESUFNRVRFUiAvIDI7XG4gICAgY29uc3QgYmFsbENlbnRlclkgPSBiYWxsLnBvc2l0aW9uLnkgKyBCQUxMX0RJQU1FVEVSIC8gMjtcbiAgICBjb25zdCBkZWx0YVkgPSAoQlJJQ0tfSEVJR0hUICogQkFMTF9ESUFNRVRFUiAvIDIpIC8gQlJJQ0tfRElBR09OQUw7XG4gICAgY29uc3QgZGVsdGFYID0gKEJSSUNLX1dJRFRIICogQkFMTF9ESUFNRVRFUiAvIDIpIC8gQlJJQ0tfRElBR09OQUw7XG4gICAgY29uc3QgbWluWVNpZGVIaXQgPSBicmljay5wb3NpdGlvbi55ICsgZGVsdGFZO1xuICAgIGNvbnN0IG1heFlTaWRlSGl0ID0gYnJpY2sucG9zaXRpb24ueSArIEJSSUNLX0hFSUdIVCAtIGRlbHRhWTtcbiAgICBjb25zdCBtaW5MZWZ0WFNpZGVIaXQgPSBicmljay5wb3NpdGlvbi54IC0gZGVsdGFYO1xuICAgIGNvbnN0IG1heExlZnRYU2lkZUhpdCA9IGJyaWNrLnBvc2l0aW9uLnggKyBkZWx0YVg7XG4gICAgY29uc3QgaXNCYWxsQ29taW5nRnJvbUJ1dHRvbUxlZnQgPSAoKGJhbGxDZW50ZXJYID4gbWluTGVmdFhTaWRlSGl0KVxuICAgICAgICAmJiAoYmFsbENlbnRlclggPCBtYXhMZWZ0WFNpZGVIaXQpXG4gICAgICAgICYmIChiYWxsQ2VudGVyWSA+IG1pbllTaWRlSGl0KVxuICAgICAgICAmJiAoYmFsbENlbnRlclkgPCBtYXhZU2lkZUhpdCkpO1xuICAgIGNvbnN0IGlzQmFsbENvbWluZ0Zyb21CdXR0b21SaWdodCA9ICgoYmFsbENlbnRlclggPiBtaW5MZWZ0WFNpZGVIaXQgKyBCUklDS19XSURUSClcbiAgICAgICAgJiYgKGJhbGxDZW50ZXJYIDwgbWF4TGVmdFhTaWRlSGl0ICsgQlJJQ0tfV0lEVEgpXG4gICAgICAgICYmIChiYWxsQ2VudGVyWSA+IG1pbllTaWRlSGl0KVxuICAgICAgICAmJiAoYmFsbENlbnRlclkgPCBtYXhZU2lkZUhpdCkpO1xuICAgIGlmICgoaXNCYWxsQ29taW5nRnJvbUJ1dHRvbUxlZnQgJiYgYmFsbC52ZWxvY2l0eS54ID4gMCkgfHwgKGlzQmFsbENvbWluZ0Zyb21CdXR0b21SaWdodCAmJiBiYWxsLnZlbG9jaXR5LnggPCAwKSkge1xuICAgICAgICBiYWxsLnZlbG9jaXR5LnggKj0gLTE7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgYmFsbC52ZWxvY2l0eS55ICo9IC0xO1xuICAgIH1cblxufVxuXG5leHBvcnQgZnVuY3Rpb24gaGFuZGxlQm9hcmRIaXQoYmFsbDogQmFsbCwgYm9hcmQ6IFBhZGRsZSkge1xuICAgIGNvbnN0IGN1cnJlbnRBbmdsZSA9IE1hdGguYXRhbjIoLWJhbGwudmVsb2NpdHkueSwgYmFsbC52ZWxvY2l0eS54KTtcbiAgICBjb25zdCBkZWx0YUNlbnRlclggPSAoYmFsbC5wb3NpdGlvbi54IC0gKGJvYXJkLnBvc2l0aW9uLnggKyBCT0FSRF9XSURUSCAvIDIpKSAvIChCT0FSRF9XSURUSCAvIDIpO1xuICAgIGNvbnN0IGFuZ2xlVG9BZGQgPSBNYXRoLlBJIC8gNTtcbiAgICBsZXQgbmV4dEFuZ2xlID0gZGVsdGFDZW50ZXJYICogYW5nbGVUb0FkZCArIGN1cnJlbnRBbmdsZTtcbiAgICBjb25zdCB5T2Zmc2V0ID0gNTtcbiAgICBpZiAobmV4dEFuZ2xlIDwgLTUgKiBNYXRoLlBJIC8gNikge1xuICAgICAgICBuZXh0QW5nbGUgPSAtNSAqIE1hdGguUEkgLyA2O1xuICAgIH0gaWYgKG5leHRBbmdsZSA+IC1NYXRoLlBJIC8gNikge1xuICAgICAgICBuZXh0QW5nbGUgPSAtTWF0aC5QSSAvIDZcbiAgICB9XG5cbiAgICBiYWxsLnZlbG9jaXR5LnggPSA1ICogTWF0aC5jb3MobmV4dEFuZ2xlKTtcbiAgICBiYWxsLnZlbG9jaXR5LnkgPSA1ICogTWF0aC5zaW4obmV4dEFuZ2xlKTtcbiAgICBiYWxsLnBvc2l0aW9uLnkgPSBib2FyZC5wb3NpdGlvbi55IC0gQkFMTF9ESUFNRVRFUiAvIDIgLSB5T2Zmc2V0O1xufVxuIiwiaW1wb3J0IHsgQnJpY2sgfSBmcm9tIFwiLi4vZmlndXJlcy9icmlja1wiO1xuaW1wb3J0IHsgVmVjdG9yIH0gZnJvbSBcIi4uL2dlb21ldHJ5L3ZlY3RvclwiO1xuaW1wb3J0IHtcbiAgQlJJQ0tTX0NPTFMsXG4gIEJSSUNLX1JPV1MsXG4gIElOQ1JFRU1OVF9ET1dOX0JSSUNLLFxuICBJTkNSRU1FTlRfTEVGVF9CUklDSyxcbiAgSU5JVElBTF9TVEFSVF9CUklDS19MRUZULFxuICBJTklUSUFMX1NUQVJUX0JSSUNLX1JJR0hULFxufSBmcm9tIFwiLi9jb25zdGFudHNcIjtcblxuY29uc3QgYnJpY2tzSW1hZ2UgPSBbXG4gIFwiL2Fzc2V0cy9icmljay1ibHVlLnBuZ1wiLFxuICBcIi9hc3NldHMvYnJpY2stZ3JlZW4ucG5nXCIsXG4gIFwiL2Fzc2V0cy9icmljay1wdXJwbGUucG5nXCIsXG4gIFwiL2Fzc2V0cy9icmljay1yZWQucG5nXCIsXG4gIFwiL2Fzc2V0cy9icmljay15ZWxsb3cucG5nXCIsXG5dO1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQnJpY2tzKCk6IEJyaWNrW10ge1xuICBsZXQgeCA9IElOSVRJQUxfU1RBUlRfQlJJQ0tfTEVGVDtcbiAgbGV0IHkgPSBJTklUSUFMX1NUQVJUX0JSSUNLX1JJR0hUO1xuXG4gIGNvbnN0IGJyaWNrczogQnJpY2tbXSA9IFtdO1xuXG4gIGZvciAobGV0IHJvdyA9IDA7IHJvdyA8IEJSSUNLX1JPV1M7IHJvdysrKSB7XG4gICAgZm9yIChsZXQgY29sID0gMDsgY29sIDwgQlJJQ0tTX0NPTFM7IGNvbCsrKSB7XG4gICAgICBjb25zdCBwb3M6IFZlY3RvciA9IG5ldyBWZWN0b3IoeCwgeSk7XG5cbiAgICAgIGNvbnN0IHJhbmRQb3MgPSAoTWF0aC5yYW5kb20oKSAqIGJyaWNrc0ltYWdlLmxlbmd0aCkgfCAwO1xuICAgICAgY29uc3QgYnJpY2sgPSBuZXcgQnJpY2socG9zLCBicmlja3NJbWFnZVtyYW5kUG9zXSk7XG4gICAgICBicmlja3MucHVzaChicmljayk7XG4gICAgICB4ICs9IElOQ1JFTUVOVF9MRUZUX0JSSUNLO1xuICAgIH1cblxuICAgIHggPSBJTklUSUFMX1NUQVJUX0JSSUNLX0xFRlQ7XG4gICAgeSArPSBJTkNSRUVNTlRfRE9XTl9CUklDSztcbiAgfVxuICByZXR1cm4gYnJpY2tzO1xufVxuIiwiLy8gQlJJQ0tTXG5leHBvcnQgY29uc3QgQlJJQ0tfUk9XUyA9IDM7XG5leHBvcnQgY29uc3QgQlJJQ0tTX0NPTFMgPSAxMDtcbmV4cG9ydCBjb25zdCBCUklDS19XSURUSCA9IDEwMDtcbmV4cG9ydCBjb25zdCBCUklDS19IRUlHSFQgPSA0MDtcbmV4cG9ydCBjb25zdCBJTklUSUFMX1NUQVJUX0JSSUNLX0xFRlQgPSAxMDtcbmV4cG9ydCBjb25zdCBJTklUSUFMX1NUQVJUX0JSSUNLX1JJR0hUID0gMTA7XG5leHBvcnQgY29uc3QgSU5DUkVNRU5UX0xFRlRfQlJJQ0sgPSAxMjA7XG5leHBvcnQgY29uc3QgSU5DUkVFTU5UX0RPV05fQlJJQ0sgPSA2MDtcbmV4cG9ydCBjb25zdCBCUklDS1NfRU5EID0gMTcwO1xuXG4vLyBCT0FSRFxuZXhwb3J0IGNvbnN0IEJPQVJEX1dJRFRIID0gMTIwO1xuZXhwb3J0IGNvbnN0IEJPQVJEX0hFSUdIVCA9IDIwO1xuXG4vL0JBTExcbmV4cG9ydCBjb25zdCBCQUxMX1dJRFRIID0gNDA7XG5leHBvcnQgY29uc3QgQkFMTF9IRUlHSFQgPSA0MDtcbmV4cG9ydCBjb25zdCBJTklUSUFMX0JBTExfWCA9IDIwMDtcbmV4cG9ydCBjb25zdCBJTklUSUFMX0JBTExfWSA9IDIwMDtcbmV4cG9ydCBjb25zdCBCQUxMX0RJQU1FVEVSID0gNDA7XG5cbi8vTUlTQ0VMTEFORU9VU1xuZXhwb3J0IGNvbnN0IEJSSUNLX0JPTlVTX1BPSU5UUyA9IDEwO1xuXG4vLyBHQU1FXG5leHBvcnQgY29uc3QgRUFTWV9MRVZFbCA9IDM7XG5leHBvcnQgY29uc3QgTUVESVVNX0xFVkVMID0gNTtcbmV4cG9ydCBjb25zdCBIQVJEX0xFVkVMID0gODtcblxuZXhwb3J0IGNvbnN0IFNURVBfU0laRSA9IDIwOyIsImltcG9ydCB7IEVBU1lfTEVWRWwsIEhBUkRfTEVWRUwsIE1FRElVTV9MRVZFTCB9IGZyb20gXCIuL2NvbnN0YW50c1wiO1xuaW1wb3J0IHsgRE9NVmlldyB9IGZyb20gXCIuLi92aWV3L0RPTVZpZXdcIjtcblxuY29uc3QgZG9tID0gRE9NVmlldy5nZXRJbnN0YW5jZSgpO1xuXG5leHBvcnQgZnVuY3Rpb24gc2V0R2FtZUxldmVsKGlucHV0OiBIVE1MSW5wdXRFbGVtZW50KSB7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnaW5wdXQnKS5mb3JFYWNoKChpbnB1dCkgPT4ge1xuICAgICAgICBpbnB1dC5jaGVja2VkID0gZmFsc2U7XG4gICAgfSk7XG4gICAgaW5wdXQuY2hlY2tlZCA9IHRydWU7XG5cbiAgICBzd2l0Y2ggKGlucHV0LmlkKSB7XG4gICAgICAgIGNhc2UgXCJlYXN5XCI6XG4gICAgICAgICAgICByZXR1cm4gRUFTWV9MRVZFbDtcbiAgICAgICAgY2FzZSBcIm1lZGl1bVwiOlxuICAgICAgICAgICAgcmV0dXJuIE1FRElVTV9MRVZFTDtcbiAgICAgICAgY2FzZSBcImhhcmRcIjpcbiAgICAgICAgICAgIHJldHVybiBIQVJEX0xFVkVMO1xuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNob3dHYW1lT3Zlck1lc3NhZ2Uoc2NvcmVQb2ludHM6IG51bWJlcikge1xuICAgIGNvbnN0IGdhbWVvdmVyRGl2ID0gZG9tLmdldEVsZW1lbnQoXCIjZ2FtZU92ZXJcIik7XG5cbiAgICBnYW1lb3ZlckRpdi5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgIChnYW1lb3ZlckRpdiBhcyBIVE1MRGl2RWxlbWVudCkuaW5uZXJUZXh0ID0gYEdhbWUgb3Zlciwgc2NvcmU6JHtzY29yZVBvaW50c31gO1xuICB9IiwiaW1wb3J0IHsgQmFsbCB9IGZyb20gXCIuLi9maWd1cmVzL2JhbGxcIjtcbmltcG9ydCB7IENhbnZhc1ZpZXcgfSBmcm9tIFwiLi4vdmlldy9jYW52YXNWaWV3XCI7XG5pbXBvcnQge1xuICBCQUxMX0RJQU1FVEVSLFxuICBCT0FSRF9IRUlHSFQsXG4gIEJPQVJEX1dJRFRILFxuICBCUklDS1NfRU5EXG59IGZyb20gXCIuL2NvbnN0YW50c1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gaXNCYWxsSGl0dGluZ1RoZUxlZnRXYWxsKGJhbGw6IEJhbGwpIHtcbiAgcmV0dXJuIGJhbGwucG9zaXRpb24ueCA8PSAwO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNCYWxsSGl0dGluZ1JpZ2h0V2FsbChiYWxsLCBjYW52YXNWaWV3OiBDYW52YXNWaWV3KSB7XG4gIHJldHVybiBiYWxsLnBvc2l0aW9uLnggPiBjYW52YXNWaWV3LmNhbnZhcy53aWR0aCAtIEJBTExfRElBTUVURVI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0JhbGxIaXR0aW5nVGhlQ2VpbGluZyhiYWxsOiBCYWxsKSB7XG4gIHJldHVybiBiYWxsLnBvc2l0aW9uLnkgPD0gMDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzQmFsbEhpdHRpbmdUaGVGbG9vcihiYWxsOiBCYWxsLCBjYW52YXNWaWV3OiBDYW52YXNWaWV3KSB7XG4gIHJldHVybiBiYWxsLnBvc2l0aW9uLnkgPj0gY2FudmFzVmlldy5jYW52YXMuaGVpZ2h0IC0gQkFMTF9ESUFNRVRFUjtcbn1cbmV4cG9ydCBmdW5jdGlvbiBpc0JhbGxOZWFyQnJpY2tzKGJhbGw6IEJhbGwpIHtcbiAgcmV0dXJuIGJhbGwucG9zaXRpb24ueSA8IEJSSUNLU19FTkQ7XG59XG5leHBvcnQgZnVuY3Rpb24gaXNCYWxsQ29sbGlkaW5nV2l0aEJvYXJkKGJhbGwsIGJvYXJkKSB7XG4gIHJldHVybiAoXG4gICAgYmFsbC5wb3NpdGlvbi55ICsgQkFMTF9ESUFNRVRFUiAvIDIgPj0gYm9hcmQucG9zaXRpb24ueSAmJlxuICAgIGJhbGwucG9zaXRpb24ueSArIEJBTExfRElBTUVURVIgLyAyIDw9IGJvYXJkLnBvc2l0aW9uLnkgKyAxMCAmJlxuICAgIGJhbGwucG9zaXRpb24ueCAtIEJBTExfRElBTUVURVIgLyAyIDw9IGJvYXJkLnBvc2l0aW9uLnggKyBCT0FSRF9XSURUSCAmJlxuICAgIGJhbGwucG9zaXRpb24ueCArIEJBTExfRElBTUVURVIgLyAyID49IGJvYXJkLnBvc2l0aW9uLnhcbiAgKTtcbn0iLCJcbmV4cG9ydCB0eXBlIERPTUVsZW1lbnQgPSBzdHJpbmcgfCBOb2RlO1xuXG5leHBvcnQgaW50ZXJmYWNlIERPTSB7XG4gICAgY3JlYXRlRWxlbWVudCh0eXBlOiBzdHJpbmcsIGF0dHJpYnV0ZXM6IG9iamVjdCwgLi4uY29udGVudDogRE9NRWxlbWVudFtdKTogSFRNTEVsZW1lbnQ7XG5cbiAgICBhZGRFbGVtZW50KGFwcGVuZFRvOiBzdHJpbmcsIGVsZW1lbnQ6IEhUTUxFbGVtZW50KTogdm9pZDtcblxuICAgIGdldEVsZW1lbnQoc2VsZWN0b3I6IHN0cmluZyk6IGFueTtcblxuICAgIGRlbGV0ZUVsZW1lbnQoc2VsZWN0b3I6IHN0cmluZyk6IHZvaWQ7XG59XG5cbmV4cG9ydCBjbGFzcyBET01WaWV3IGltcGxlbWVudHMgRE9NIHtcbiAgICBwcml2YXRlIHN0YXRpYyBpbnN0YW5jZTogRE9NVmlldztcblxuICAgIHByaXZhdGUgY29uc3RydWN0b3IoKSB7XG4gICAgfVxuXG4gICAgc3RhdGljIGdldEluc3RhbmNlKCk6IERPTVZpZXcge1xuICAgICAgICBpZiAoIXRoaXMuaW5zdGFuY2UpIHtcbiAgICAgICAgICAgIHRoaXMuaW5zdGFuY2UgPSBuZXcgRE9NVmlldygpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlO1xuICAgIH1cblxuICAgIC8qKlxuICAqIFRoaXMgZnVuY3Rpb24gY2Fubm90IGNyZWF0ZSBhIHRhYmxlXG4gICogQHBhcmFtIHsgc3RyaW5nIH0gdHlwZVxuICAqIEBwYXJhbSB7IE9iamVjdCB9IGF0dHJpYnV0ZXNcbiAgKiBAcGFyYW0gIHsgLi4uKHN0cmluZyB8IE5vZGUpIH0gY29udGVudCBcbiAgKiBAcmV0dXJucyB7IEhUTUxFbGVtZW50IH0gUmV0dXJucyB0aGUgY3JlYXRlZCBlbGVtZW50XG4gICovXG4gICAgY3JlYXRlRWxlbWVudCh0eXBlOiBzdHJpbmcsIGF0dHJpYnV0ZXM6IG9iamVjdCwgLi4uY29udGVudDogRE9NRWxlbWVudFtdKTogSFRNTEVsZW1lbnQge1xuICAgICAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0eXBlKTtcblxuICAgICAgICBpZiAoYXR0cmlidXRlcykge1xuICAgICAgICAgICAgZm9yIChsZXQgYXR0cmlidXRlIGluIGF0dHJpYnV0ZXMpIHtcbiAgICAgICAgICAgICAgICBpZiAoYXR0cmlidXRlLnN0YXJ0c1dpdGgoJ29uJykpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZXZlbnROYW1lID0gYXR0cmlidXRlLnNsaWNlKDIpLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGF0dHJpYnV0ZXNbYXR0cmlidXRlXSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudFthdHRyaWJ1dGVdID0gYXR0cmlidXRlc1thdHRyaWJ1dGVdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAobGV0IGl0ZW0gb2YgY29udGVudCkge1xuICAgICAgICAgICAgZWxlbWVudC5hcHBlbmQoaXRlbSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZWxlbWVudDtcbiAgICB9XG5cbiAgICBhZGRFbGVtZW50KGFwcGVuZFRvOiBzdHJpbmcsIGVsZW1lbnQ6IEhUTUxFbGVtZW50KSB7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYXBwZW5kVG8pLmFwcGVuZChlbGVtZW50KTtcbiAgICB9XG5cbiAgICBnZXRFbGVtZW50KHNlbGVjdG9yOiBzdHJpbmcpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGxldCB2YWx1ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpIGFzIEhUTUxFbGVtZW50O1xuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuICAgIGRlbGV0ZUVsZW1lbnQoc2VsZWN0b3I6IHN0cmluZykge1xuICAgICAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XG4gICAgICAgIGVsZW1lbnQucmVtb3ZlKCk7XG4gICAgfVxuXG4gICAgYWRkSGFuZGxlcihldmVudDogc3RyaW5nLCBjYWxsYmFjazogRXZlbnRMaXN0ZW5lciwgc2VsZWN0b3I/OiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKHNlbGVjdG9yKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKS5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCBjYWxsYmFjaylcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIGNhbGxiYWNrKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFkZEJhY2tCdXR0b25IYW5kbGVyKCkge1xuICAgICAgICB0aGlzLmFkZEhhbmRsZXIoXCJjbGlja1wiLCAoKSA9PiB7IHRoaXMuaGlkZVNldHRpbmdzTWVudSgpOyB9LCBcIiNiYWNrLWJ0blwiKTtcbiAgICB9XG4gICAgYWRkUmlnaHRDbGlja0hhbmRsZXIoY2FsbGJhY2s6IEV2ZW50TGlzdGVuZXIpIHtcbiAgICAgICAgd2luZG93Lm9uY29udGV4dG1lbnUgPSBjYWxsYmFjaztcbiAgICB9XG4gICAgc2hvd0luaXRpYWxTY3JlZW4oKSB7XG4gICAgICAgIHRoaXMuZ2V0RWxlbWVudChcIiNjb250YWluZXJcIikuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICAgICAgdGhpcy5nZXRFbGVtZW50KFwiI2dhbWVDYW52YXNcIikuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICB0aGlzLmdldEVsZW1lbnQoXCIjZGV0YWlscy1ib3hcIikuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICB0aGlzLmdldEVsZW1lbnQoXCIjZ2FtZU92ZXJcIikuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgIH1cbiAgICBpbml0R2FtZSgpIHtcbiAgICAgICAgdGhpcy5nZXRFbGVtZW50KFwiI2NvbnRhaW5lclwiKS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgIHRoaXMuZ2V0RWxlbWVudChcIiNnYW1lQ2FudmFzXCIpLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgICAgIGNvbnN0IGRldGFpbHNCb3ggPSB0aGlzLmdldEVsZW1lbnQoXCIjZGV0YWlscy1ib3hcIik7XG4gICAgICAgIGRldGFpbHNCb3guc3R5bGUuZGlzcGxheSA9IFwiZmxleFwiO1xuICAgICAgICBkZXRhaWxzQm94LnN0eWxlLmp1c3RpZnlDb250ZW50ID0gXCJzcGFjZS1hcm91bmRcIjtcbiAgICB9XG4gICAgc2V0U2NvcmUoc2NvcmVQb2ludHM6IG51bWJlcikge1xuICAgICAgICB0aGlzLmdldEVsZW1lbnQoXCIjc2NvcmVcIikudGV4dENvbnRlbnQgPSBgU2NvcmU6ICR7c2NvcmVQb2ludHMudG9TdHJpbmcoKX1gO1xuICAgIH1cbiAgICBzZXRMaXZlcyhsaXZlczogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuZ2V0RWxlbWVudChcIiNsaWZlXCIpLmlubmVyVGV4dCA9IGxpdmVzLnRvU3RyaW5nKCk7XG4gICAgfVxuICAgIHNob3dOZXdHYW1lQnV0dG9uKCkge1xuICAgICAgICAodGhpcy5nZXRFbGVtZW50KFwiI25ldy1nYW1lXCIpIGFzIEhUTUxCdXR0b25FbGVtZW50KS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgIH1cbiAgICBzaG93Q29uZ3JhdHVsYXRpb25zKCkge1xuICAgICAgICB0aGlzLmdldEVsZW1lbnQoXCIjZ2FtZVdpblwiKS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgIH1cbiAgICBoaWRlTmV3R2FtZUJ1dHRvbigpIHtcbiAgICAgICAgKHRoaXMuZ2V0RWxlbWVudChcIiNuZXctZ2FtZVwiKSBhcyBIVE1MQnV0dG9uRWxlbWVudCkuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgIH1cbiAgICBoaWRlQ29uZ3JhdHVsYXRpb25zKCkge1xuICAgICAgICB0aGlzLmdldEVsZW1lbnQoXCIjZ2FtZVdpblwiKS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgfVxuICAgIGdldEJvYXJkSW1hZ2UoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEVsZW1lbnQoXCIjYm9hcmRcIikgYXMgSFRNTEltYWdlRWxlbWVudDtcbiAgICB9XG4gICAgc2hvd1NldHRpbmdzTWVudSgpIHtcbiAgICAgICAgY29uc3Qgc2V0dGluZ3NDb250YWluZXIgPSB0aGlzLmdldEVsZW1lbnQoXCIjc2V0dGluZ3MtY29udGFpbmVyXCIpO1xuICAgICAgICBjb25zdCBjb250YWluZXIgPSB0aGlzLmdldEVsZW1lbnQoXCIjY29udGFpbmVyXCIpO1xuICAgICAgICBzZXR0aW5nc0NvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgICBjb250YWluZXIuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgIH1cbiAgICBoaWRlU2V0dGluZ3NNZW51KCkge1xuICAgICAgICBjb25zdCBzZXR0aW5nc0NvbnRhaW5lciA9IHRoaXMuZ2V0RWxlbWVudChcIiNzZXR0aW5ncy1jb250YWluZXJcIik7XG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IHRoaXMuZ2V0RWxlbWVudChcIiNjb250YWluZXJcIik7XG4gICAgICAgIHNldHRpbmdzQ29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgY29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgfVxuICAgIHNob3dJY29uKCkge1xuICAgICAgICAodGhpcy5nZXRFbGVtZW50KFwiLmdnLWNoZWNrXCIpIGFzIEhUTUxFbGVtZW50KS5zdHlsZS5kaXNwbGF5ID1cbiAgICAgICAgICAgIFwiYmxvY2tcIjtcbiAgICB9XG4gICAgZ2V0UGxheUJ1dHRvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RWxlbWVudChcIiNwbGF5LWJ0blwiKTtcbiAgICB9XG4gICAgaGlkZUdhbWVPdmVyTWVzc2FnZSgpIHtcbiAgICAgICAgdGhpcy5nZXRFbGVtZW50KFwiI2dhbWVPdmVyXCIpLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICB9XG59IiwiaW1wb3J0IHsgVmVjdG9yIH0gZnJvbSBcIi4uL2dlb21ldHJ5L3ZlY3RvclwiO1xuaW1wb3J0IHtcbiAgQlJJQ0tfUk9XUyxcbiAgQlJJQ0tfV0lEVEgsXG4gIEJSSUNLX0hFSUdIVCxcbiAgQk9BUkRfV0lEVEgsXG4gIEJPQVJEX0hFSUdIVCxcbiAgQkFMTF9ESUFNRVRFUixcbn0gZnJvbSBcIi4uL3V0aWxzL2NvbnN0YW50c1wiO1xuaW1wb3J0IHsgQmFsbCB9IGZyb20gXCIuLi9maWd1cmVzL2JhbGxcIjtcbmltcG9ydCB7IEJyaWNrIH0gZnJvbSBcIi4uL2ZpZ3VyZXMvYnJpY2tcIjtcbmltcG9ydCB7IFBhZGRsZSB9IGZyb20gXCIuLi9maWd1cmVzL3BhZGRsZVwiO1xuXG5leHBvcnQgY2xhc3MgQ2FudmFzVmlldyB7XG4gIHByaXZhdGUgY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ7XG4gIHB1YmxpYyBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50O1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBjYW52YXNTZWxlY3Rvcjogc3RyaW5nKSB7XG4gICAgdGhpcy5jYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChjYW52YXNTZWxlY3RvcikgYXMgSFRNTENhbnZhc0VsZW1lbnQ7XG4gICAgdGhpcy5jdHggPSB0aGlzLmNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG4gIH1cblxuICBkcmF3SW1hZ2UoXG4gICAgcG9zaXRpb246IFZlY3RvcixcbiAgICBpbWFnZTogSFRNTEltYWdlRWxlbWVudCxcbiAgICB3aWR0aDogbnVtYmVyLFxuICAgIGhlaWdodDogbnVtYmVyXG4gICkge1xuICAgIHRoaXMuY3R4LmRyYXdJbWFnZShpbWFnZSwgcG9zaXRpb24ueCwgcG9zaXRpb24ueSwgd2lkdGgsIGhlaWdodCk7XG4gIH1cblxuICBkcmF3QnJpY2tzKGJyaWNrczogQnJpY2tbXSkge1xuICAgIGZvciAobGV0IHIgPSAwOyByIDwgQlJJQ0tfUk9XUzsgcisrKSB7XG4gICAgICBmb3IgKGxldCBjID0gMDsgYyA8IGJyaWNrcy5sZW5ndGg7IGMrKykge1xuICAgICAgICBjb25zdCBicmljayA9IGJyaWNrc1tjXTtcbiAgICAgICAgY29uc3QgcG9zOiBWZWN0b3IgPSBuZXcgVmVjdG9yKFxuICAgICAgICAgIGJyaWNrLnBvc2l0aW9uLngsXG4gICAgICAgICAgYnJpY2sucG9zaXRpb24ueSxcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5kcmF3SW1hZ2UocG9zLCBicmljay5nZXRJbWFnZSgpLCBCUklDS19XSURUSCwgQlJJQ0tfSEVJR0hUKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBkcmF3QmFsbChiYWxsOiBCYWxsKSB7XG4gICAgdGhpcy5kcmF3SW1hZ2UoXG4gICAgICBuZXcgVmVjdG9yKGJhbGwucG9zaXRpb24ueCAtIEJBTExfRElBTUVURVIgLyAyLCBiYWxsLnBvc2l0aW9uLnkgLSBCQUxMX0RJQU1FVEVSIC8gMiksXG4gICAgICBiYWxsLmdldEltYWdlKCksXG4gICAgICBCQUxMX0RJQU1FVEVSLFxuICAgICAgQkFMTF9ESUFNRVRFUlxuICAgICk7XG4gIH1cblxuICBkcmF3Qm9hcmQoYm9hcmQ6IFBhZGRsZSkge1xuICAgIHRoaXMuY3R4LmJlZ2luUGF0aCgpO1xuICAgIHRoaXMuY3R4LmRyYXdJbWFnZShcbiAgICAgIGJvYXJkLmdldEltYWdlKCksXG4gICAgICBib2FyZC5wb3NpdGlvbi54LFxuICAgICAgYm9hcmQucG9zaXRpb24ueSxcbiAgICAgIEJPQVJEX1dJRFRILFxuICAgICAgQk9BUkRfSEVJR0hUXG4gICAgKTtcbiAgICB0aGlzLmN0eC5jbG9zZVBhdGgoKTtcbiAgfVxuXG4gIGdldENvbnRleHQoKTogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEIHtcbiAgICByZXR1cm4gdGhpcy5jdHg7XG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IGNhbnZhc1ZpZXcgPSBuZXcgQ2FudmFzVmlldyhcImdhbWVDYW52YXNcIik7IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBjYW52YXNWaWV3IH0gZnJvbSBcIi4vdmlldy9jYW52YXNWaWV3XCI7XG5pbXBvcnQgeyBHYW1lIH0gZnJvbSBcIi4vZW5naW5lL2dhbWVMb29wXCI7XG5pbXBvcnQgeyBET01WaWV3IH0gZnJvbSBcIi4vdmlldy9ET01WaWV3XCI7XG5cbi8vY29uc3QgY2FudmFzVmlldyA9IG5ldyBDYW52YXNWaWV3KFwiZ2FtZUNhbnZhc1wiKTtcbmNvbnN0IGRvbSA9IERPTVZpZXcuZ2V0SW5zdGFuY2UoKTtcbmxldCBsaXZlcyA9IDM7XG5sZXQgZ2FtZSA9IG5ldyBHYW1lKGNhbnZhc1ZpZXcsIGxpdmVzKTtcbmxldCBpc1BsYXlpbmdNdXNpYyA9IGZhbHNlO1xuXG5kb20uYWRkSGFuZGxlcihcImNsaWNrXCIsICgpID0+IHtcbiAgZ2FtZS5zdGFydEdhbWUoKTtcbiAgZG9tLmhpZGVHYW1lT3Zlck1lc3NhZ2UoKTtcbn0sIFwiI25ldy1nYW1lXCIpO1xuXG5kb20uYWRkSGFuZGxlcihcImNsaWNrXCIsICgpID0+IHtcbiAgZG9tLmluaXRHYW1lKCk7XG4gIGdhbWUubGl2ZXMgPSBsaXZlcztcbiAgZ2FtZS5zY29yZVBvaW50cyA9IDA7XG4gIGdhbWUuc3RhcnRHYW1lKCk7XG5cbiAgaWYgKGlzUGxheWluZ011c2ljKSB7XG4gICAgY29uc3QgbXVzaWMgPSBuZXcgQXVkaW8oXCIuLi9hc3NldHMvbXVzaWMubXAzXCIpO1xuICAgIG11c2ljLnZvbHVtZSA9IDAuMTtcbiAgICBtdXNpYy5wbGF5KCk7XG4gIH1cbn0sIFwiI3BsYXktYnRuXCIpO1xuXG5kb20uYWRkSGFuZGxlcihcImNsaWNrXCIsICgpID0+IHtcbiAgZG9tLnNob3dTZXR0aW5nc01lbnUoKTtcbiAgZG9tLmFkZEJhY2tCdXR0b25IYW5kbGVyKCk7XG4gIGRvbS5hZGRIYW5kbGVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIGlzUGxheWluZ011c2ljID0gdHJ1ZTtcbiAgICBkb20uc2hvd0ljb24oKTtcbiAgfSwgXCIjcGxheS1zb3VuZC1idG5cIik7XG59LCBcIiNzZXR0aW5nLWJ0blwiKTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=