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
/* harmony import */ var _figures_brick__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../figures/brick */ "./src/figures/brick.ts");
/* harmony import */ var _geometry_vector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../geometry/vector */ "./src/geometry/vector.ts");
/* harmony import */ var _utils_constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/constants */ "./src/utils/constants.ts");
/* harmony import */ var _utils_helpers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/helpers */ "./src/utils/helpers.ts");
/* harmony import */ var _view_canvasView__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../view/canvasView */ "./src/view/canvasView.ts");





/* Get the canvas  */
var canvas = _view_canvasView__WEBPACK_IMPORTED_MODULE_4__.canvasView;
/* Get the 2D context of the canvas  */
var ctx = canvas.getContext(); /* Fills or sets the color,gradient,pattern */
ctx.fillStyle = "white";
//ctx.fillRect(0, 0, canvas.width, canvas.height);
//ctx.font = "50px Arial";
ctx.fillStyle = "green";
/* Writes the required text  */
//ctx.fillText("GFG", 500, 350)
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
        ctx.fillStyle = 'green';
        /* Begins or reset the path for
           the arc created */
        ctx.beginPath();
        /* Some curve is created*/
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fill();
        /* Restore the recent canvas context*/
        ctx.restore();
    }
    update() {
        this.draw();
        this.alpha -= 0.01;
        this.x += this.dx;
        this.y += this.dy;
    }
}
/* Timer is set for particle push
    execution in intervals*/
/* Particle explosion function */
function explode(brick) {
    // setTimeout(() => {
    createParticles(brick);
    explode(brick);
    // }, 3000);
    /* Clears the given pixels in the rectangle */
    ctx.clearRect(brick.position.x, brick.position.y, _utils_constants__WEBPACK_IMPORTED_MODULE_2__.BRICK_WIDTH + 10, _utils_constants__WEBPACK_IMPORTED_MODULE_2__.BRICK_HEIGHT + 10);
    ctx.fillStyle = "transparent";
    ctx.fillRect(brick.position.x, brick.position.y, _utils_constants__WEBPACK_IMPORTED_MODULE_2__.BRICK_WIDTH, _utils_constants__WEBPACK_IMPORTED_MODULE_2__.BRICK_HEIGHT);
    particles.forEach((particle, i) => {
        if (particle.alpha <= 0) {
            particles.splice(i, 1);
        }
        else
            particle.update();
    });
    /* Performs a animation after request*/
    const ex = explode.bind(null, brick);
    requestAnimationFrame(ex());
}
function createParticles(brick) {
    for (let i = 0; i <= 150; i++) {
        let dx = (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_3__.randomIntFromInterval)(brick.position.x, brick.position.x + _utils_constants__WEBPACK_IMPORTED_MODULE_2__.BRICK_WIDTH);
        let dy = (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_3__.randomIntFromInterval)(brick.position.y, brick.position.y + _utils_constants__WEBPACK_IMPORTED_MODULE_2__.BRICK_HEIGHT);
        let radius = Math.random() * 3;
        let particle = new Particle(brick.position.x + _utils_constants__WEBPACK_IMPORTED_MODULE_2__.BRICK_WIDTH / 2, brick.position.y + _utils_constants__WEBPACK_IMPORTED_MODULE_2__.BRICK_HEIGHT / 2, radius, dx, dy);
        /* Adds new items like particle*/
        particles.push(particle);
    }
    console.log(particles);
}
async function tst() {
    const particles = await createParticles(new _figures_brick__WEBPACK_IMPORTED_MODULE_0__.Brick(new _geometry_vector__WEBPACK_IMPORTED_MODULE_1__.Vector(300, 300), "abc"));
    console.log(particles);
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
        //  if (this.bricks.length == 0) {
        // }
        _view_canvasView__WEBPACK_IMPORTED_MODULE_0__.canvasView.getContext().clearRect(0, 0, _view_canvasView__WEBPACK_IMPORTED_MODULE_0__.canvasView.canvas.width, _view_canvasView__WEBPACK_IMPORTED_MODULE_0__.canvasView.canvas.height);
        _view_canvasView__WEBPACK_IMPORTED_MODULE_0__.canvasView.drawBricks(this.bricks);
        _view_canvasView__WEBPACK_IMPORTED_MODULE_0__.canvasView.drawBoard(this.board);
        _view_canvasView__WEBPACK_IMPORTED_MODULE_0__.canvasView.drawBall(this.ball);
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
            const brick = this.bricks[deleteBrickIndex]; ///
            (0,_effects_explosion__WEBPACK_IMPORTED_MODULE_11__.explode)(brick);
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
/* harmony export */   "randomIntFromInterval": () => (/* binding */ randomIntFromInterval),
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
function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QyxDQUFDO1FBQy9DLEtBQUssQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDO1FBQ25CLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztLQUNkO0FBQ0gsQ0FBQyxFQUFFLFdBQVcsQ0FBQyxDQUFDO0FBRWhCLEdBQUcsQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRTtJQUMzQixHQUFHLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztJQUN2QixHQUFHLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztJQUMzQixHQUFHLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUU7UUFDM0IsY0FBYyxHQUFHLElBQUksQ0FBQztRQUN0QixHQUFHLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDakIsQ0FBQyxFQUFFLGlCQUFpQixDQUFDLENBQUM7QUFDeEIsQ0FBQyxFQUFFLGNBQWMsQ0FBQyxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYnVkZ2V0ZWVyLXRzLy4vc3JjL2VmZmVjdHMvZXhwbG9zaW9uLnRzIiwid2VicGFjazovL2J1ZGdldGVlci10cy8uL3NyYy9lbmdpbmUvZ2FtZUxvb3AudHMiLCJ3ZWJwYWNrOi8vYnVkZ2V0ZWVyLXRzLy4vc3JjL2VuZ2luZS9tb3ZlLnRzIiwid2VicGFjazovL2J1ZGdldGVlci10cy8uL3NyYy9maWd1cmVzL2JhbGwudHMiLCJ3ZWJwYWNrOi8vYnVkZ2V0ZWVyLXRzLy4vc3JjL2ZpZ3VyZXMvYnJpY2sudHMiLCJ3ZWJwYWNrOi8vYnVkZ2V0ZWVyLXRzLy4vc3JjL2ZpZ3VyZXMvcGFkZGxlLnRzIiwid2VicGFjazovL2J1ZGdldGVlci10cy8uL3NyYy9nZW9tZXRyeS92ZWN0b3IudHMiLCJ3ZWJwYWNrOi8vYnVkZ2V0ZWVyLXRzLy4vc3JjL3BoeXNpY3MvbWlzYy50cyIsIndlYnBhY2s6Ly9idWRnZXRlZXItdHMvLi9zcmMvcGh5c2ljcy9tb3ZlbWVudC50cyIsIndlYnBhY2s6Ly9idWRnZXRlZXItdHMvLi9zcmMvdXRpbHMvYnJpY2tGYWN0b3J5LnRzIiwid2VicGFjazovL2J1ZGdldGVlci10cy8uL3NyYy91dGlscy9jb25zdGFudHMudHMiLCJ3ZWJwYWNrOi8vYnVkZ2V0ZWVyLXRzLy4vc3JjL3V0aWxzL2hlbHBlcnMudHMiLCJ3ZWJwYWNrOi8vYnVkZ2V0ZWVyLXRzLy4vc3JjL3V0aWxzL3ZhbGlkYXRvcnMudHMiLCJ3ZWJwYWNrOi8vYnVkZ2V0ZWVyLXRzLy4vc3JjL3ZpZXcvRE9NVmlldy50cyIsIndlYnBhY2s6Ly9idWRnZXRlZXItdHMvLi9zcmMvdmlldy9jYW52YXNWaWV3LnRzIiwid2VicGFjazovL2J1ZGdldGVlci10cy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9idWRnZXRlZXItdHMvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2J1ZGdldGVlci10cy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2J1ZGdldGVlci10cy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2J1ZGdldGVlci10cy8uL3NyYy9hcHAudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQnJpY2sgfSBmcm9tIFwiLi4vZmlndXJlcy9icmlja1wiO1xuaW1wb3J0IHsgVmVjdG9yIH0gZnJvbSBcIi4uL2dlb21ldHJ5L3ZlY3RvclwiO1xuaW1wb3J0IHsgQlJJQ0tfSEVJR0hULCBCUklDS19XSURUSCB9IGZyb20gXCIuLi91dGlscy9jb25zdGFudHNcIjtcbmltcG9ydCB7IHJhbmRvbUludEZyb21JbnRlcnZhbCB9IGZyb20gXCIuLi91dGlscy9oZWxwZXJzXCI7XG5pbXBvcnQgeyBjYW52YXNWaWV3IH0gZnJvbSBcIi4uL3ZpZXcvY2FudmFzVmlld1wiO1xuXG4vKiBHZXQgdGhlIGNhbnZhcyAgKi9cbnZhciBjYW52YXMgPSBjYW52YXNWaWV3XG5cblxuLyogR2V0IHRoZSAyRCBjb250ZXh0IG9mIHRoZSBjYW52YXMgICovXG52YXIgY3R4ID0gY2FudmFzLmdldENvbnRleHQoKTsvKiBGaWxscyBvciBzZXRzIHRoZSBjb2xvcixncmFkaWVudCxwYXR0ZXJuICovXG5jdHguZmlsbFN0eWxlID0gXCJ3aGl0ZVwiO1xuLy9jdHguZmlsbFJlY3QoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcbi8vY3R4LmZvbnQgPSBcIjUwcHggQXJpYWxcIjtcbmN0eC5maWxsU3R5bGUgPSBcImdyZWVuXCI7XG5cbi8qIFdyaXRlcyB0aGUgcmVxdWlyZWQgdGV4dCAgKi9cbi8vY3R4LmZpbGxUZXh0KFwiR0ZHXCIsIDUwMCwgMzUwKVxubGV0IHBhcnRpY2xlcyA9IFtdO1xuXG4vKiBJbml0aWFsaXplIHBhcnRpY2xlIG9iamVjdCAgKi9cbmV4cG9ydCBjbGFzcyBQYXJ0aWNsZSB7XG4gICAgcHJpdmF0ZSBhbHBoYTtcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgeCwgcHVibGljIHksIHB1YmxpYyByYWRpdXMsIHB1YmxpYyBkeCwgcHVibGljIGR5KSB7XG4gICAgICAgIHRoaXMueCA9IHg7XG4gICAgICAgIHRoaXMueSA9IHk7XG4gICAgICAgIHRoaXMucmFkaXVzID0gcmFkaXVzO1xuICAgICAgICB0aGlzLmR4ID0gZHg7XG4gICAgICAgIHRoaXMuZHkgPSBkeTtcbiAgICAgICAgdGhpcy5hbHBoYSA9IDE7XG4gICAgfVxuICAgIGRyYXcoKSB7XG4gICAgICAgIGN0eC5zYXZlKCk7XG4gICAgICAgIGN0eC5nbG9iYWxBbHBoYSA9IHRoaXMuYWxwaGE7XG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSAnZ3JlZW4nO1xuXG4gICAgICAgIC8qIEJlZ2lucyBvciByZXNldCB0aGUgcGF0aCBmb3IgXG4gICAgICAgICAgIHRoZSBhcmMgY3JlYXRlZCAqL1xuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG5cbiAgICAgICAgLyogU29tZSBjdXJ2ZSBpcyBjcmVhdGVkKi9cbiAgICAgICAgY3R4LmFyYyh0aGlzLngsIHRoaXMueSwgdGhpcy5yYWRpdXMsXG4gICAgICAgICAgICAwLCBNYXRoLlBJICogMiwgZmFsc2UpO1xuXG4gICAgICAgIGN0eC5maWxsKCk7XG5cbiAgICAgICAgLyogUmVzdG9yZSB0aGUgcmVjZW50IGNhbnZhcyBjb250ZXh0Ki9cbiAgICAgICAgY3R4LnJlc3RvcmUoKTtcbiAgICB9XG4gICAgdXBkYXRlKCkge1xuICAgICAgICB0aGlzLmRyYXcoKTtcbiAgICAgICAgdGhpcy5hbHBoYSAtPSAwLjAxO1xuICAgICAgICB0aGlzLnggKz0gdGhpcy5keDtcbiAgICAgICAgdGhpcy55ICs9IHRoaXMuZHk7XG4gICAgfVxufVxuXG4vKiBUaW1lciBpcyBzZXQgZm9yIHBhcnRpY2xlIHB1c2ggXG4gICAgZXhlY3V0aW9uIGluIGludGVydmFscyovXG5cbi8qIFBhcnRpY2xlIGV4cGxvc2lvbiBmdW5jdGlvbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGV4cGxvZGUoYnJpY2s6IEJyaWNrKSB7XG5cbiAgIC8vIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBjcmVhdGVQYXJ0aWNsZXMoYnJpY2spO1xuICAgICAgICBleHBsb2RlKGJyaWNrKTtcbiAgIC8vIH0sIDMwMDApO1xuXG5cbiAgICAvKiBDbGVhcnMgdGhlIGdpdmVuIHBpeGVscyBpbiB0aGUgcmVjdGFuZ2xlICovXG4gICAgY3R4LmNsZWFyUmVjdChicmljay5wb3NpdGlvbi54LCBicmljay5wb3NpdGlvbi55LCBCUklDS19XSURUSCArIDEwLCBCUklDS19IRUlHSFQgKyAxMCk7XG4gICAgY3R4LmZpbGxTdHlsZSA9IFwidHJhbnNwYXJlbnRcIjtcbiAgICBjdHguZmlsbFJlY3QoYnJpY2sucG9zaXRpb24ueCwgYnJpY2sucG9zaXRpb24ueSwgQlJJQ0tfV0lEVEgsIEJSSUNLX0hFSUdIVCk7XG4gICAgcGFydGljbGVzLmZvckVhY2goKHBhcnRpY2xlLCBpKSA9PiB7XG4gICAgICAgIGlmIChwYXJ0aWNsZS5hbHBoYSA8PSAwKSB7XG4gICAgICAgICAgICBwYXJ0aWNsZXMuc3BsaWNlKGksIDEpO1xuICAgICAgICB9IGVsc2UgcGFydGljbGUudXBkYXRlKClcbiAgICB9KTtcblxuICAgIC8qIFBlcmZvcm1zIGEgYW5pbWF0aW9uIGFmdGVyIHJlcXVlc3QqL1xuICAgIGNvbnN0IGV4ID0gZXhwbG9kZS5iaW5kKG51bGwsIGJyaWNrKTtcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZXgoKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVQYXJ0aWNsZXMoYnJpY2s6IEJyaWNrKSB7XG4gIFxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8PSAxNTA7IGkrKykge1xuICAgICAgICAgICAgbGV0IGR4ID0gcmFuZG9tSW50RnJvbUludGVydmFsKGJyaWNrLnBvc2l0aW9uLngsIGJyaWNrLnBvc2l0aW9uLnggKyBCUklDS19XSURUSCk7XG4gICAgICAgICAgICBsZXQgZHkgPSByYW5kb21JbnRGcm9tSW50ZXJ2YWwoYnJpY2sucG9zaXRpb24ueSwgYnJpY2sucG9zaXRpb24ueSArIEJSSUNLX0hFSUdIVCk7XG4gICAgICAgICAgICBsZXQgcmFkaXVzID0gTWF0aC5yYW5kb20oKSAqIDM7XG4gICAgICAgICAgICBsZXQgcGFydGljbGUgPSBuZXcgUGFydGljbGUoYnJpY2sucG9zaXRpb24ueCArIEJSSUNLX1dJRFRIIC8gMiwgYnJpY2sucG9zaXRpb24ueSArIEJSSUNLX0hFSUdIVCAvIDIsIHJhZGl1cywgZHgsIGR5KTtcblxuICAgICAgICAgICAgLyogQWRkcyBuZXcgaXRlbXMgbGlrZSBwYXJ0aWNsZSovXG4gICAgICAgICAgICBwYXJ0aWNsZXMucHVzaChwYXJ0aWNsZSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2cocGFydGljbGVzKTtcbiAgIFxufVxuYXN5bmMgZnVuY3Rpb24gdHN0KCkge1xuICAgIGNvbnN0IHBhcnRpY2xlcyA9IGF3YWl0IGNyZWF0ZVBhcnRpY2xlcyhuZXcgQnJpY2sobmV3IFZlY3RvcigzMDAsIDMwMCksIFwiYWJjXCIpKTtcbiAgICBjb25zb2xlLmxvZyhwYXJ0aWNsZXMpO1xufSIsImltcG9ydCB7IENhbnZhc1ZpZXcsIGNhbnZhc1ZpZXcgfSBmcm9tIFwiLi4vdmlldy9jYW52YXNWaWV3XCI7XG5pbXBvcnQgeyBQYWRkbGUgfSBmcm9tIFwiLi4vZmlndXJlcy9wYWRkbGVcIjtcbmltcG9ydCB7IEJhbGwgfSBmcm9tIFwiLi4vZmlndXJlcy9iYWxsXCI7XG5pbXBvcnQgeyBCcmljayB9IGZyb20gXCIuLi9maWd1cmVzL2JyaWNrXCI7XG5pbXBvcnQgeyBtb3ZlIH0gZnJvbSBcIi4vbW92ZVwiO1xuaW1wb3J0IHtcbiAgICBCT0FSRF9XSURUSCwgQlJJQ0tfQk9OVVNfUE9JTlRTLCBJTklUSUFMX0JBTExfWCwgSU5JVElBTF9CQUxMX1ksXG59IGZyb20gXCIuLi91dGlscy9jb25zdGFudHNcIjtcbmltcG9ydCB7XG4gICAgaXNCYWxsSGl0dGluZ1RoZUZsb29yLCBpc0JhbGxIaXR0aW5nVGhlQ2VpbGluZywgaXNCYWxsSGl0dGluZ1JpZ2h0V2FsbCxcbiAgICBpc0JhbGxIaXR0aW5nVGhlTGVmdFdhbGwsIGlzQmFsbENvbGxpZGluZ1dpdGhCb2FyZCwgaXNCYWxsTmVhckJyaWNrc1xufSBmcm9tIFwiLi4vdXRpbHMvdmFsaWRhdG9yc1wiO1xuaW1wb3J0IHsgc2V0R2FtZUxldmVsLCBzaG93R2FtZU92ZXJNZXNzYWdlIH0gZnJvbSBcIi4uL3V0aWxzL2hlbHBlcnNcIjtcbmltcG9ydCB7IGNoYW5nZUJhbGxEaXJlY3Rpb24sIGhhbmRsZUJvYXJkSGl0IH0gZnJvbSBcIi4uL3BoeXNpY3MvbW92ZW1lbnRcIjtcbmltcG9ydCB7IFZlY3RvciB9IGZyb20gXCIuLi9nZW9tZXRyeS92ZWN0b3JcIjtcbmltcG9ydCB7IGdldEhpdEJyaWNrSW5kZXggfSBmcm9tIFwiLi4vcGh5c2ljcy9taXNjXCI7XG5pbXBvcnQgeyBjcmVhdGVCcmlja3MgfSBmcm9tIFwiLi4vdXRpbHMvYnJpY2tGYWN0b3J5XCI7XG5pbXBvcnQgeyBleHBsb2RlIH0gZnJvbSBcIi4uL2VmZmVjdHMvZXhwbG9zaW9uXCI7XG5pbXBvcnQgeyBET01WaWV3IH0gZnJvbSBcIi4uL3ZpZXcvRE9NVmlld1wiO1xuXG5cbmNvbnN0IGlucHV0OiB7IFtjb2RlOiBzdHJpbmddOiBib29sZWFuIH0gPSB7fTtcblxuXG5leHBvcnQgaW50ZXJmYWNlIEdhbWVPYmplY3RzIHtcbiAgICBiYWxsOiBCYWxsLCBib2FyZDogUGFkZGxlLCBicmlja3M6IEJyaWNrW11cbn1cblxuZXhwb3J0IGNsYXNzIEdhbWUge1xuICAgIHByaXZhdGUgYmFsbDogQmFsbDtcbiAgICBwcml2YXRlIGJvYXJkOiBQYWRkbGU7XG4gICAgcHJpdmF0ZSBicmlja3M6IEJyaWNrW107XG4gICAgcHVibGljIHNjb3JlUG9pbnRzOiBudW1iZXI7XG4gICAgcHVibGljIEdBTUVfRElGRklDVUxUWSA9IDM7XG4gICAgcHJpdmF0ZSByZWFkb25seSBTVEVQX1NJWkUgPSAyMDtcbiAgICBwcml2YXRlIGxhc3RUaW1lOiBudW1iZXI7XG4gICAgcHJpdmF0ZSBlbGFwc2VkOiBudW1iZXI7XG4gICAgcHVibGljIGdhbWVPdmVyOiBib29sZWFuO1xuICAgIHByaXZhdGUgZG9tID0gRE9NVmlldy5nZXRJbnN0YW5jZSgpO1xuICAgIHByaXZhdGUgaXNNb3VzZUFjdGl2ZSA9IHRydWU7XG4gICAgcHJpdmF0ZSBtYXhMaXZlcyA9IDM7XG5cblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBjYW52YXNWaWV3OiBDYW52YXNWaWV3LCBwdWJsaWMgbGl2ZXM6IG51bWJlcikge1xuICAgICAgICB0aGlzLnNjb3JlUG9pbnRzID0gMDtcbiAgICAgICAgdGhpcy5tYXhMaXZlcyA9IGxpdmVzO1xuICAgICAgICB0aGlzLmluaXRpYWxpemVHYW1lT2JqZWN0cygpO1xuICAgICAgICB0aGlzLmFkZEhhbmRsZXJzKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhZGRIYW5kbGVycygpIHtcbiAgICAgICAgdGhpcy5kb20uYWRkSGFuZGxlcihcImtleWRvd25cIiwgKGV2ZW50OiBLZXlib2FyZEV2ZW50KSA9PiB7XG4gICAgICAgICAgICBpbnB1dFtldmVudC5jb2RlXSA9IHRydWU7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmRvbS5hZGRIYW5kbGVyKFwia2V5dXBcIiwgKGV2ZW50OiBLZXlib2FyZEV2ZW50KSA9PiB7XG4gICAgICAgICAgICBpbnB1dFtldmVudC5jb2RlXSA9IGZhbHNlO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5kb20uYWRkSGFuZGxlcihcIm1vdXNlbW92ZVwiLCAoZTogTW91c2VFdmVudCkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuaXNNb3VzZUFjdGl2ZSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHBvc2l0aW9uSW5mbyA9IGNhbnZhc1ZpZXcuY2FudmFzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHdpZHRoID0gcG9zaXRpb25JbmZvLndpZHRoO1xuICAgICAgICAgICAgICAgIGxldCBtb3VzZVggPSBlLm9mZnNldFg7XG4gICAgICAgICAgICAgICAgaWYgKG1vdXNlWCA8IGNhbnZhc1ZpZXcuY2FudmFzLm9mZnNldExlZnQpIHtcbiAgICAgICAgICAgICAgICAgICAgbW91c2VYID0gMDtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKG1vdXNlWCA+IHdpZHRoKSB7XG4gICAgICAgICAgICAgICAgICAgIG1vdXNlWCA9IGNhbnZhc1ZpZXcuY2FudmFzLndpZHRoIC0gQk9BUkRfV0lEVEg7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuYm9hcmQucG9zaXRpb24ueCA9IG1vdXNlWDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuZG9tLmFkZFJpZ2h0Q2xpY2tIYW5kbGVyKChlKSA9PiB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB0aGlzLmlzTW91c2VBY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuZG9tLmFkZEhhbmRsZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgaW5wdXQgPSAoZS50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudCk7XG4gICAgICAgICAgICB0aGlzLkdBTUVfRElGRklDVUxUWSA9IHNldEdhbWVMZXZlbChpbnB1dCk7XG4gICAgICAgIH0sIFwiI2xldmVsXCIpO1xuICAgIH1cblxuICAgIHByaXZhdGUgaW5pdGlhbGl6ZUdhbWVPYmplY3RzKCkge1xuICAgICAgICBpZiAodGhpcy5icmlja3MgPT0gdW5kZWZpbmVkIHx8IHRoaXMuYnJpY2tzICYmIHRoaXMuYnJpY2tzLmxlbmd0aCA9PSAwICYmIHRoaXMubGl2ZXMgPiAwKSB7XG4gICAgICAgICAgICB0aGlzLmJyaWNrcyA9IGNyZWF0ZUJyaWNrcygpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGJvYXJkUG9zaXRpb24gPSBuZXcgVmVjdG9yKFxuICAgICAgICAgICAgY2FudmFzVmlldy5jYW52YXMud2lkdGggLyAyLFxuICAgICAgICAgICAgY2FudmFzVmlldy5jYW52YXMuaGVpZ2h0IC0gMTAwXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuYm9hcmQgPSBuZXcgUGFkZGxlKGJvYXJkUG9zaXRpb24sIHRoaXMuZG9tLmdldEJvYXJkSW1hZ2UoKSk7XG4gICAgICAgIGNvbnN0IGJhbGxQb3NpdGlvbiA9IG5ldyBWZWN0b3IoSU5JVElBTF9CQUxMX1gsIElOSVRJQUxfQkFMTF9ZKTtcbiAgICAgICAgdGhpcy5iYWxsID0gbmV3IEJhbGwoYmFsbFBvc2l0aW9uLCBcIi9hc3NldHMvYmFsbC5wbmdcIik7XG4gICAgICAgIHRoaXMuYmFsbC52ZWxvY2l0eSA9IG5ldyBWZWN0b3IodGhpcy5HQU1FX0RJRkZJQ1VMVFksIHRoaXMuR0FNRV9ESUZGSUNVTFRZKTtcbiAgICAgICAgdGhpcy5sYXN0VGltZSA9IDA7XG4gICAgICAgIHRoaXMuZWxhcHNlZCA9IDA7XG4gICAgICAgIHRoaXMuZ2FtZU92ZXIgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBnYW1lTG9vcCgpIHtcbiAgICAgICAgaWYgKGlucHV0WydBcnJvd0xlZnQnXSAmJiAodGhpcy5ib2FyZC5wb3NpdGlvbi54ID4gMCkpIHtcbiAgICAgICAgICAgIHRoaXMuYm9hcmQudmVsb2NpdHkueCA9IC03O1xuICAgICAgICAgICAgbW92ZSh0aGlzLmJvYXJkKTtcbiAgICAgICAgfSBlbHNlIGlmIChpbnB1dFsnQXJyb3dSaWdodCddICYmICh0aGlzLmJvYXJkLnBvc2l0aW9uLnggKyBCT0FSRF9XSURUSCA8IGNhbnZhc1ZpZXcuY2FudmFzLndpZHRoKSkge1xuICAgICAgICAgICAgdGhpcy5ib2FyZC52ZWxvY2l0eS54ID0gNztcbiAgICAgICAgICAgIG1vdmUodGhpcy5ib2FyZCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gIGlmICh0aGlzLmJyaWNrcy5sZW5ndGggPT0gMCkge1xuXG4gICAgICAgIC8vIH1cbiAgICAgICAgY2FudmFzVmlldy5nZXRDb250ZXh0KCkuY2xlYXJSZWN0KDAsIDAsIGNhbnZhc1ZpZXcuY2FudmFzLndpZHRoLCBjYW52YXNWaWV3LmNhbnZhcy5oZWlnaHQpO1xuICAgICAgICBjYW52YXNWaWV3LmRyYXdCcmlja3ModGhpcy5icmlja3MpO1xuICAgICAgICBjYW52YXNWaWV3LmRyYXdCb2FyZCh0aGlzLmJvYXJkKTtcbiAgICAgICAgY2FudmFzVmlldy5kcmF3QmFsbCh0aGlzLmJhbGwpO1xuICAgICAgICB0aGlzLmNvbGxpc2lvbkRldGVjdG9yKCk7XG4gICAgICAgIGlmICghdGhpcy5nYW1lT3Zlcikge1xuICAgICAgICAgICAgbW92ZSh0aGlzLmJhbGwpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29sbGlzaW9uRGV0ZWN0b3IoKSB7XG4gICAgICAgIGlmIChpc0JhbGxDb2xsaWRpbmdXaXRoQm9hcmQodGhpcy5iYWxsLCB0aGlzLmJvYXJkKSkge1xuICAgICAgICAgICAgaGFuZGxlQm9hcmRIaXQodGhpcy5iYWxsLCB0aGlzLmJvYXJkKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNCYWxsSGl0dGluZ1RoZUZsb29yKHRoaXMuYmFsbCwgdGhpcy5jYW52YXNWaWV3KSkge1xuICAgICAgICAgICAgdGhpcy5saXZlcy0tO1xuICAgICAgICAgICAgdGhpcy5nYW1lT3ZlciA9IHRydWU7XG4gICAgICAgICAgICBpZiAodGhpcy5saXZlcyA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHNob3dHYW1lT3Zlck1lc3NhZ2UodGhpcy5zY29yZVBvaW50cyk7IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRvbS5zaG93SW5pdGlhbFNjcmVlbigpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxpdmVzID0gdGhpcy5tYXhMaXZlcztcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5icmlja3MgPSBjcmVhdGVCcmlja3MoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zY29yZVBvaW50cyA9IDA7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZG9tLmhpZGVOZXdHYW1lQnV0dG9uKCk7XG4gICAgICAgICAgICAgICAgfSwgMTUwMCk7XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuZG9tLnNldExpdmVzKHRoaXMubGl2ZXMpO1xuICAgICAgICB9IGVsc2UgaWYgKGlzQmFsbEhpdHRpbmdUaGVDZWlsaW5nKHRoaXMuYmFsbCkpIHtcbiAgICAgICAgICAgIHRoaXMuYmFsbC52ZWxvY2l0eS55ID0gTWF0aC5hYnModGhpcy5iYWxsLnZlbG9jaXR5LnkpO1xuICAgICAgICB9IGVsc2UgaWYgKGlzQmFsbEhpdHRpbmdSaWdodFdhbGwodGhpcy5iYWxsLCB0aGlzLmNhbnZhc1ZpZXcpKSB7XG4gICAgICAgICAgICB0aGlzLmJhbGwudmVsb2NpdHkueCA9IC0gdGhpcy5iYWxsLnZlbG9jaXR5Lng7XG4gICAgICAgIH0gZWxzZSBpZiAoaXNCYWxsSGl0dGluZ1RoZUxlZnRXYWxsKHRoaXMuYmFsbCkpIHtcbiAgICAgICAgICAgIHRoaXMuYmFsbC52ZWxvY2l0eS54ID0gTWF0aC5hYnModGhpcy5iYWxsLnZlbG9jaXR5LngpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8vXG4gICAgc3RhcnRHYW1lKCkge1xuICAgICAgICBpZiAodGhpcy5saXZlcyA+IDEpIHtcbiAgICAgICAgICAgIHRoaXMuZG9tLnNob3dOZXdHYW1lQnV0dG9uKCk7XG4gICAgICAgICAgICB0aGlzLmRvbS5oaWRlQ29uZ3JhdHVsYXRpb25zKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmRvbS5oaWRlTmV3R2FtZUJ1dHRvbigpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZG9tLnNldFNjb3JlKHRoaXMuc2NvcmVQb2ludHMpO1xuICAgICAgICB0aGlzLmRvbS5zZXRMaXZlcyh0aGlzLmxpdmVzKTtcbiAgICAgICAgdGhpcy5pbml0aWFsaXplR2FtZU9iamVjdHMoKTtcbiAgICAgICAgdGhpcy51cGRhdGUocGVyZm9ybWFuY2Uubm93KCkpO1xuICAgIH1cblxuICAgIHVwZGF0ZSh0aW1lOiBudW1iZXIpIHtcbiAgICAgICAgY29uc3QgZGVsdGEgPSB0aW1lIC0gdGhpcy5sYXN0VGltZTtcbiAgICAgICAgdGhpcy5sYXN0VGltZSA9IHRpbWU7XG4gICAgICAgIHRoaXMuZWxhcHNlZCArPSBkZWx0YTtcbiAgICAgICAgbGV0IGRlbGV0ZUJyaWNrSW5kZXggPSBpc0JhbGxOZWFyQnJpY2tzKHRoaXMuYmFsbClcbiAgICAgICAgICAgID8gZ2V0SGl0QnJpY2tJbmRleCh0aGlzLmJyaWNrcywgdGhpcy5iYWxsKVxuICAgICAgICAgICAgOiAtMTtcbiAgICAgICAgaWYgKGRlbGV0ZUJyaWNrSW5kZXggIT0gLTEpIHtcbiAgICAgICAgICAgIGNvbnN0IGJyaWNrID0gdGhpcy5icmlja3NbZGVsZXRlQnJpY2tJbmRleF07Ly8vXG4gICAgICAgICAgICBleHBsb2RlKGJyaWNrKTtcbiAgICAgICAgICAgIGNoYW5nZUJhbGxEaXJlY3Rpb24odGhpcy5iYWxsLCBicmljayk7XG4gICAgICAgICAgICB0aGlzLmJyaWNrcy5zcGxpY2UoZGVsZXRlQnJpY2tJbmRleCwgMSk7XG4gICAgICAgICAgICB0aGlzLnNjb3JlUG9pbnRzICs9IEJSSUNLX0JPTlVTX1BPSU5UUztcbiAgICAgICAgICAgIHRoaXMuZG9tLnNldFNjb3JlKHRoaXMuc2NvcmVQb2ludHMpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmVsYXBzZWQgPiB0aGlzLlNURVBfU0laRSAqIDUpIHtcbiAgICAgICAgICAgIHRoaXMuZWxhcHNlZCA9IHRoaXMuU1RFUF9TSVpFICogNTtcbiAgICAgICAgfVxuICAgICAgICB3aGlsZSAodGhpcy5lbGFwc2VkID4gdGhpcy5TVEVQX1NJWkUpIHtcbiAgICAgICAgICAgIHRoaXMuZWxhcHNlZCAtPSB0aGlzLlNURVBfU0laRTtcbiAgICAgICAgICAgIHRoaXMuZ2FtZUxvb3AoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5icmlja3MubGVuZ3RoICYmICF0aGlzLmdhbWVPdmVyKSB7XG4gICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy51cGRhdGUuYmluZCh0aGlzKSk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5icmlja3MubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICB0aGlzLmRvbS5zaG93Q29uZ3JhdHVsYXRpb25zKCk7XG4gICAgICAgIH1cbiAgICB9XG59IiwiaW1wb3J0IHsgVmVjdG9yIH0gZnJvbSBcIi4uL2dlb21ldHJ5L3ZlY3RvclwiO1xuXG5leHBvcnQgZnVuY3Rpb24gbW92ZShnYW1lT2JqZWN0OiBHYW1lT2JqZWN0KSB7XG4gIGdhbWVPYmplY3QucG9zaXRpb24ueCArPSBnYW1lT2JqZWN0LnZlbG9jaXR5Lng7XG4gIGdhbWVPYmplY3QucG9zaXRpb24ueSArPSBnYW1lT2JqZWN0LnZlbG9jaXR5Lnk7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgR2FtZU9iamVjdCB7XG4gIHBvc2l0aW9uOiB7IHg6IG51bWJlcjsgeTogbnVtYmVyIH07XG4gIHZlbG9jaXR5OiBWZWN0b3Jcbn0iLCJpbXBvcnQgeyBWZWN0b3IgfSBmcm9tIFwiLi4vZ2VvbWV0cnkvdmVjdG9yXCI7XG5cbmV4cG9ydCBjbGFzcyBCYWxsIHtcbiAgcHJpdmF0ZSBpbWFnZTogSFRNTEltYWdlRWxlbWVudCA9IG5ldyBJbWFnZSgpO1xuICBwdWJsaWMgdmVsb2NpdHk6IFZlY3RvciA9IG5ldyBWZWN0b3IoMCwgMCk7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBwb3NpdGlvbjogVmVjdG9yLCBpbWFnZTogc3RyaW5nLCBiYWxsdmVsb2NpdHk/OiBWZWN0b3IpIHtcbiAgICB0aGlzLmltYWdlLnNyYyA9IGltYWdlO1xuICAgIGlmICghIWJhbGx2ZWxvY2l0eSkgdGhpcy52ZWxvY2l0eSA9IGJhbGx2ZWxvY2l0eTtcbiAgfVxuXG4gIGdldEltYWdlKCk6IEhUTUxJbWFnZUVsZW1lbnQge1xuICAgIHJldHVybiB0aGlzLmltYWdlO1xuICB9XG59IiwiaW1wb3J0IHsgVmVjdG9yIH0gZnJvbSBcIi4uL2dlb21ldHJ5L3ZlY3RvclwiO1xuXG5leHBvcnQgY2xhc3MgQnJpY2sge1xuICBwcml2YXRlIGltYWdlOiBIVE1MSW1hZ2VFbGVtZW50ID0gbmV3IEltYWdlKCk7XG5cbiAgY29uc3RydWN0b3IocHVibGljIHBvc2l0aW9uOiBWZWN0b3IsIGltYWdlOiBzdHJpbmcpIHtcbiAgICB0aGlzLmltYWdlLnNyYyA9IGltYWdlO1xuICB9XG5cbiAgZ2V0SW1hZ2UoKTogSFRNTEltYWdlRWxlbWVudCB7XG4gICAgcmV0dXJuIHRoaXMuaW1hZ2U7XG4gIH1cbn0iLCJpbXBvcnQgeyBWZWN0b3IgfSBmcm9tIFwiLi4vZ2VvbWV0cnkvdmVjdG9yXCI7XG5cbmV4cG9ydCBjbGFzcyBQYWRkbGUge1xuICBwcml2YXRlIGltYWdlOiBIVE1MSW1hZ2VFbGVtZW50ID0gbmV3IEltYWdlKCk7XG4gIHB1YmxpYyB2ZWxvY2l0eTogVmVjdG9yID0gbmV3IFZlY3RvcigwLCAwKTtcbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIHBvc2l0aW9uOiBWZWN0b3IsXG4gICAgaW1hZ2U6IEhUTUxJbWFnZUVsZW1lbnQsXG4gICAgYm9hcmR2ZWxvY2l0eT86IFZlY3RvclxuICApIHtcbiAgICB0aGlzLmltYWdlID0gaW1hZ2U7XG4gICAgaWYgKCEhYm9hcmR2ZWxvY2l0eSkgdGhpcy52ZWxvY2l0eSA9IGJvYXJkdmVsb2NpdHk7XG4gIH1cblxuICBnZXRJbWFnZSgpOiBIVE1MSW1hZ2VFbGVtZW50IHtcbiAgICByZXR1cm4gdGhpcy5pbWFnZTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgUG9pbnQgfSBmcm9tIFwiLi9pbnRlcmZhY2VzXCI7XG5cbmV4cG9ydCBjbGFzcyBWZWN0b3IgaW1wbGVtZW50cyBQb2ludCB7XG4gIHg6IG51bWJlcjtcbiAgeTogbnVtYmVyO1xuXG4gIGNvbnN0cnVjdG9yKHA6IFBvaW50KTtcbiAgY29uc3RydWN0b3IoeDogbnVtYmVyLCB5OiBudW1iZXIpO1xuICBjb25zdHJ1Y3Rvcih4T3JQb2ludDogbnVtYmVyIHwgUG9pbnQsIHk/OiBudW1iZXIpIHtcbiAgICBpZiAodHlwZW9mIHhPclBvaW50ID09IFwibnVtYmVyXCIgJiYgdHlwZW9mIHkgPT0gXCJudW1iZXJcIikge1xuICAgICAgdGhpcy54ID0geE9yUG9pbnQ7XG4gICAgICB0aGlzLnkgPSB5O1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIHhPclBvaW50ID09IFwib2JqZWN0XCIpIHtcbiAgICAgIHRoaXMueCA9IHhPclBvaW50Lng7XG4gICAgICB0aGlzLnkgPSB4T3JQb2ludC55O1xuICAgIH1cbiAgfVxuXG4gIGFkZChwOiBQb2ludCkge1xuICAgIHRoaXMueCArPSBwLng7XG4gICAgdGhpcy55ICs9IHAueTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHNjYWxlKHM6IG51bWJlcikge1xuICAgIHRoaXMueCAqPSBzO1xuICAgIHRoaXMueSAqPSBzO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBkaXN0KHA6IFBvaW50KSB7XG4gICAgY29uc3QgZHggPSB0aGlzLnggLSBwLng7XG4gICAgY29uc3QgZHkgPSB0aGlzLnkgLSBwLnk7XG4gICAgcmV0dXJuIE1hdGguc3FydChkeCAqKiAyICsgZHkgKiogMik7XG4gIH1cblxuICBzcUxlbmd0aCgpIHtcbiAgICByZXR1cm4gdGhpcy54ICoqIDIgKyB0aGlzLnkgKiogMjtcbiAgfVxuXG4gIHN0YXRpYyBhZGQocDE6IFBvaW50LCBwMjogUG9pbnQpIHtcbiAgICByZXR1cm4gbmV3IFZlY3RvcihwMS54ICsgcDIueCwgcDEueSArIHAyLnkpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBCQUxMX0RJQU1FVEVSLCBCUklDS19XSURUSCwgQlJJQ0tfSEVJR0hUIH0gZnJvbSBcIi4uL3V0aWxzL2NvbnN0YW50c1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0SGl0QnJpY2tJbmRleChicmlja3MsIGJhbGwpIHtcbiAgcmV0dXJuIGJyaWNrcy5maW5kSW5kZXgoKGJyaWNrKSA9PiB7XG4gICAgY29uc3QgbGVmdCA9IGJyaWNrLnBvc2l0aW9uLnggLSBCQUxMX0RJQU1FVEVSIC8gMjtcbiAgICBjb25zdCByaWdodCA9IGJyaWNrLnBvc2l0aW9uLnggKyBCUklDS19XSURUSCArIEJBTExfRElBTUVURVIgLyAyO1xuICAgIGNvbnN0IHRvcCA9IGJyaWNrLnBvc2l0aW9uLnkgLSBCQUxMX0RJQU1FVEVSIC8gMjtcbiAgICBjb25zdCBib3R0b20gPSBicmljay5wb3NpdGlvbi55ICsgQlJJQ0tfSEVJR0hUICsgQkFMTF9ESUFNRVRFUiAvIDI7XG4gICAgcmV0dXJuIChcbiAgICAgIGJhbGwucG9zaXRpb24ueCA+PSBsZWZ0ICYmXG4gICAgICBiYWxsLnBvc2l0aW9uLnggPD0gcmlnaHQgJiZcbiAgICAgIGJhbGwucG9zaXRpb24ueSA+PSB0b3AgJiZcbiAgICAgIGJhbGwucG9zaXRpb24ueSA8PSBib3R0b21cbiAgICApO1xuICB9KTtcbn0iLCJpbXBvcnQgeyBCYWxsIH0gZnJvbSBcIi4uL2ZpZ3VyZXMvYmFsbFwiO1xuaW1wb3J0IHsgQnJpY2sgfSBmcm9tIFwiLi4vZmlndXJlcy9icmlja1wiO1xuaW1wb3J0IHsgUGFkZGxlIH0gZnJvbSBcIi4uL2ZpZ3VyZXMvcGFkZGxlXCI7XG5pbXBvcnQgeyBCUklDS19IRUlHSFQsIEJSSUNLX1dJRFRILCBCQUxMX0RJQU1FVEVSLCBCT0FSRF9XSURUSCB9IGZyb20gXCIuLi91dGlscy9jb25zdGFudHNcIjtcblxuXG5leHBvcnQgZnVuY3Rpb24gY2hhbmdlQmFsbERpcmVjdGlvbihiYWxsOiBCYWxsLCBicmljazogQnJpY2spIHtcbiAgICBjb25zdCBCUklDS19ESUFHT05BTCA9IE1hdGguc3FydChCUklDS19IRUlHSFQgKiogMiArIEJSSUNLX1dJRFRIICoqIDIpO1xuICAgIGNvbnN0IGJyaWNrQ2VudGVyWCA9IGJyaWNrLnBvc2l0aW9uLnggKyBCUklDS19XSURUSCAvIDI7XG4gICAgY29uc3QgYnJpY2tDZW50ZXJZID0gYnJpY2sucG9zaXRpb24ueSArIEJSSUNLX0hFSUdIVCAvIDI7XG4gICAgY29uc3QgYmFsbENlbnRlclggPSBiYWxsLnBvc2l0aW9uLnggKyBCQUxMX0RJQU1FVEVSIC8gMjtcbiAgICBjb25zdCBiYWxsQ2VudGVyWSA9IGJhbGwucG9zaXRpb24ueSArIEJBTExfRElBTUVURVIgLyAyO1xuICAgIGNvbnN0IGRlbHRhWSA9IChCUklDS19IRUlHSFQgKiBCQUxMX0RJQU1FVEVSIC8gMikgLyBCUklDS19ESUFHT05BTDtcbiAgICBjb25zdCBkZWx0YVggPSAoQlJJQ0tfV0lEVEggKiBCQUxMX0RJQU1FVEVSIC8gMikgLyBCUklDS19ESUFHT05BTDtcbiAgICBjb25zdCBtaW5ZU2lkZUhpdCA9IGJyaWNrLnBvc2l0aW9uLnkgKyBkZWx0YVk7XG4gICAgY29uc3QgbWF4WVNpZGVIaXQgPSBicmljay5wb3NpdGlvbi55ICsgQlJJQ0tfSEVJR0hUIC0gZGVsdGFZO1xuICAgIGNvbnN0IG1pbkxlZnRYU2lkZUhpdCA9IGJyaWNrLnBvc2l0aW9uLnggLSBkZWx0YVg7XG4gICAgY29uc3QgbWF4TGVmdFhTaWRlSGl0ID0gYnJpY2sucG9zaXRpb24ueCArIGRlbHRhWDtcbiAgICBjb25zdCBpc0JhbGxDb21pbmdGcm9tQnV0dG9tTGVmdCA9ICgoYmFsbENlbnRlclggPiBtaW5MZWZ0WFNpZGVIaXQpXG4gICAgICAgICYmIChiYWxsQ2VudGVyWCA8IG1heExlZnRYU2lkZUhpdClcbiAgICAgICAgJiYgKGJhbGxDZW50ZXJZID4gbWluWVNpZGVIaXQpXG4gICAgICAgICYmIChiYWxsQ2VudGVyWSA8IG1heFlTaWRlSGl0KSk7XG4gICAgY29uc3QgaXNCYWxsQ29taW5nRnJvbUJ1dHRvbVJpZ2h0ID0gKChiYWxsQ2VudGVyWCA+IG1pbkxlZnRYU2lkZUhpdCArIEJSSUNLX1dJRFRIKVxuICAgICAgICAmJiAoYmFsbENlbnRlclggPCBtYXhMZWZ0WFNpZGVIaXQgKyBCUklDS19XSURUSClcbiAgICAgICAgJiYgKGJhbGxDZW50ZXJZID4gbWluWVNpZGVIaXQpXG4gICAgICAgICYmIChiYWxsQ2VudGVyWSA8IG1heFlTaWRlSGl0KSk7XG4gICAgaWYgKChpc0JhbGxDb21pbmdGcm9tQnV0dG9tTGVmdCAmJiBiYWxsLnZlbG9jaXR5LnggPiAwKSB8fCAoaXNCYWxsQ29taW5nRnJvbUJ1dHRvbVJpZ2h0ICYmIGJhbGwudmVsb2NpdHkueCA8IDApKSB7XG4gICAgICAgIGJhbGwudmVsb2NpdHkueCAqPSAtMTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBiYWxsLnZlbG9jaXR5LnkgKj0gLTE7XG4gICAgfVxuXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBoYW5kbGVCb2FyZEhpdChiYWxsOiBCYWxsLCBib2FyZDogUGFkZGxlKSB7XG4gICAgY29uc3QgY3VycmVudEFuZ2xlID0gTWF0aC5hdGFuMigtYmFsbC52ZWxvY2l0eS55LCBiYWxsLnZlbG9jaXR5LngpO1xuICAgIGNvbnN0IGRlbHRhQ2VudGVyWCA9IChiYWxsLnBvc2l0aW9uLnggLSAoYm9hcmQucG9zaXRpb24ueCArIEJPQVJEX1dJRFRIIC8gMikpIC8gKEJPQVJEX1dJRFRIIC8gMik7XG4gICAgY29uc3QgYW5nbGVUb0FkZCA9IE1hdGguUEkgLyA1O1xuICAgIGxldCBuZXh0QW5nbGUgPSBkZWx0YUNlbnRlclggKiBhbmdsZVRvQWRkICsgY3VycmVudEFuZ2xlO1xuICAgIGNvbnN0IHlPZmZzZXQgPSA1O1xuICAgIGlmIChuZXh0QW5nbGUgPCAtNSAqIE1hdGguUEkgLyA2KSB7XG4gICAgICAgIG5leHRBbmdsZSA9IC01ICogTWF0aC5QSSAvIDY7XG4gICAgfSBpZiAobmV4dEFuZ2xlID4gLU1hdGguUEkgLyA2KSB7XG4gICAgICAgIG5leHRBbmdsZSA9IC1NYXRoLlBJIC8gNlxuICAgIH1cblxuICAgIGJhbGwudmVsb2NpdHkueCA9IDUgKiBNYXRoLmNvcyhuZXh0QW5nbGUpO1xuICAgIGJhbGwudmVsb2NpdHkueSA9IDUgKiBNYXRoLnNpbihuZXh0QW5nbGUpO1xuICAgIGJhbGwucG9zaXRpb24ueSA9IGJvYXJkLnBvc2l0aW9uLnkgLSBCQUxMX0RJQU1FVEVSIC8gMiAtIHlPZmZzZXQ7XG59XG4iLCJpbXBvcnQgeyBCcmljayB9IGZyb20gXCIuLi9maWd1cmVzL2JyaWNrXCI7XG5pbXBvcnQgeyBWZWN0b3IgfSBmcm9tIFwiLi4vZ2VvbWV0cnkvdmVjdG9yXCI7XG5pbXBvcnQge1xuICBCUklDS1NfQ09MUyxcbiAgQlJJQ0tfUk9XUyxcbiAgSU5DUkVFTU5UX0RPV05fQlJJQ0ssXG4gIElOQ1JFTUVOVF9MRUZUX0JSSUNLLFxuICBJTklUSUFMX1NUQVJUX0JSSUNLX0xFRlQsXG4gIElOSVRJQUxfU1RBUlRfQlJJQ0tfUklHSFQsXG59IGZyb20gXCIuL2NvbnN0YW50c1wiO1xuXG5jb25zdCBicmlja3NJbWFnZSA9IFtcbiAgXCIvYXNzZXRzL2JyaWNrLWJsdWUucG5nXCIsXG4gIFwiL2Fzc2V0cy9icmljay1ncmVlbi5wbmdcIixcbiAgXCIvYXNzZXRzL2JyaWNrLXB1cnBsZS5wbmdcIixcbiAgXCIvYXNzZXRzL2JyaWNrLXJlZC5wbmdcIixcbiAgXCIvYXNzZXRzL2JyaWNrLXllbGxvdy5wbmdcIixcbl07XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVCcmlja3MoKTogQnJpY2tbXSB7XG4gIGxldCB4ID0gSU5JVElBTF9TVEFSVF9CUklDS19MRUZUO1xuICBsZXQgeSA9IElOSVRJQUxfU1RBUlRfQlJJQ0tfUklHSFQ7XG5cbiAgY29uc3QgYnJpY2tzOiBCcmlja1tdID0gW107XG5cbiAgZm9yIChsZXQgcm93ID0gMDsgcm93IDwgQlJJQ0tfUk9XUzsgcm93KyspIHtcbiAgICBmb3IgKGxldCBjb2wgPSAwOyBjb2wgPCBCUklDS1NfQ09MUzsgY29sKyspIHtcbiAgICAgIGNvbnN0IHBvczogVmVjdG9yID0gbmV3IFZlY3Rvcih4LCB5KTtcblxuICAgICAgY29uc3QgcmFuZFBvcyA9IChNYXRoLnJhbmRvbSgpICogYnJpY2tzSW1hZ2UubGVuZ3RoKSB8IDA7XG4gICAgICBjb25zdCBicmljayA9IG5ldyBCcmljayhwb3MsIGJyaWNrc0ltYWdlW3JhbmRQb3NdKTtcbiAgICAgIGJyaWNrcy5wdXNoKGJyaWNrKTtcbiAgICAgIHggKz0gSU5DUkVNRU5UX0xFRlRfQlJJQ0s7XG4gICAgfVxuXG4gICAgeCA9IElOSVRJQUxfU1RBUlRfQlJJQ0tfTEVGVDtcbiAgICB5ICs9IElOQ1JFRU1OVF9ET1dOX0JSSUNLO1xuICB9XG4gIHJldHVybiBicmlja3M7XG59XG4iLCIvLyBCUklDS1NcbmV4cG9ydCBjb25zdCBCUklDS19ST1dTID0gMztcbmV4cG9ydCBjb25zdCBCUklDS1NfQ09MUyA9IDEwO1xuZXhwb3J0IGNvbnN0IEJSSUNLX1dJRFRIID0gMTAwO1xuZXhwb3J0IGNvbnN0IEJSSUNLX0hFSUdIVCA9IDQwO1xuZXhwb3J0IGNvbnN0IElOSVRJQUxfU1RBUlRfQlJJQ0tfTEVGVCA9IDEwO1xuZXhwb3J0IGNvbnN0IElOSVRJQUxfU1RBUlRfQlJJQ0tfUklHSFQgPSAxMDtcbmV4cG9ydCBjb25zdCBJTkNSRU1FTlRfTEVGVF9CUklDSyA9IDEyMDtcbmV4cG9ydCBjb25zdCBJTkNSRUVNTlRfRE9XTl9CUklDSyA9IDYwO1xuZXhwb3J0IGNvbnN0IEJSSUNLU19FTkQgPSAxNzA7XG5cbi8vIEJPQVJEXG5leHBvcnQgY29uc3QgQk9BUkRfV0lEVEggPSAxMjA7XG5leHBvcnQgY29uc3QgQk9BUkRfSEVJR0hUID0gMjA7XG5cbi8vQkFMTFxuZXhwb3J0IGNvbnN0IEJBTExfV0lEVEggPSA0MDtcbmV4cG9ydCBjb25zdCBCQUxMX0hFSUdIVCA9IDQwO1xuZXhwb3J0IGNvbnN0IElOSVRJQUxfQkFMTF9YID0gMjAwO1xuZXhwb3J0IGNvbnN0IElOSVRJQUxfQkFMTF9ZID0gMjAwO1xuZXhwb3J0IGNvbnN0IEJBTExfRElBTUVURVIgPSA0MDtcblxuLy9NSVNDRUxMQU5FT1VTXG5leHBvcnQgY29uc3QgQlJJQ0tfQk9OVVNfUE9JTlRTID0gMTA7XG5cbi8vIEdBTUVcbmV4cG9ydCBjb25zdCBFQVNZX0xFVkVsID0gMztcbmV4cG9ydCBjb25zdCBNRURJVU1fTEVWRUwgPSA1O1xuZXhwb3J0IGNvbnN0IEhBUkRfTEVWRUwgPSA4O1xuXG5leHBvcnQgY29uc3QgU1RFUF9TSVpFID0gMjA7IiwiaW1wb3J0IHsgRUFTWV9MRVZFbCwgSEFSRF9MRVZFTCwgTUVESVVNX0xFVkVMIH0gZnJvbSBcIi4vY29uc3RhbnRzXCI7XG5pbXBvcnQgeyBET01WaWV3IH0gZnJvbSBcIi4uL3ZpZXcvRE9NVmlld1wiO1xuXG5jb25zdCBkb20gPSBET01WaWV3LmdldEluc3RhbmNlKCk7XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRHYW1lTGV2ZWwoaW5wdXQ6IEhUTUxJbnB1dEVsZW1lbnQpIHtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdpbnB1dCcpLmZvckVhY2goKGlucHV0KSA9PiB7XG4gICAgICAgIGlucHV0LmNoZWNrZWQgPSBmYWxzZTtcbiAgICB9KTtcbiAgICBpbnB1dC5jaGVja2VkID0gdHJ1ZTtcblxuICAgIHN3aXRjaCAoaW5wdXQuaWQpIHtcbiAgICAgICAgY2FzZSBcImVhc3lcIjpcbiAgICAgICAgICAgIHJldHVybiBFQVNZX0xFVkVsO1xuICAgICAgICBjYXNlIFwibWVkaXVtXCI6XG4gICAgICAgICAgICByZXR1cm4gTUVESVVNX0xFVkVMO1xuICAgICAgICBjYXNlIFwiaGFyZFwiOlxuICAgICAgICAgICAgcmV0dXJuIEhBUkRfTEVWRUw7XG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gc2hvd0dhbWVPdmVyTWVzc2FnZShzY29yZVBvaW50czogbnVtYmVyKSB7XG4gICAgY29uc3QgZ2FtZW92ZXJEaXYgPSBkb20uZ2V0RWxlbWVudChcIiNnYW1lT3ZlclwiKTtcblxuICAgIGdhbWVvdmVyRGl2LnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgKGdhbWVvdmVyRGl2IGFzIEhUTUxEaXZFbGVtZW50KS5pbm5lclRleHQgPSBgR2FtZSBvdmVyLCBzY29yZToke3Njb3JlUG9pbnRzfWA7XG4gIH1cblxuIGV4cG9ydCBmdW5jdGlvbiByYW5kb21JbnRGcm9tSW50ZXJ2YWwobWluLCBtYXgpIHsgLy8gbWluIGFuZCBtYXggaW5jbHVkZWQgXG4gICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4gKyAxKSArIG1pbilcbiAgfVxuICAiLCJpbXBvcnQgeyBCYWxsIH0gZnJvbSBcIi4uL2ZpZ3VyZXMvYmFsbFwiO1xuaW1wb3J0IHsgQ2FudmFzVmlldyB9IGZyb20gXCIuLi92aWV3L2NhbnZhc1ZpZXdcIjtcbmltcG9ydCB7XG4gIEJBTExfRElBTUVURVIsXG4gIEJPQVJEX0hFSUdIVCxcbiAgQk9BUkRfV0lEVEgsXG4gIEJSSUNLU19FTkRcbn0gZnJvbSBcIi4vY29uc3RhbnRzXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0JhbGxIaXR0aW5nVGhlTGVmdFdhbGwoYmFsbDogQmFsbCkge1xuICByZXR1cm4gYmFsbC5wb3NpdGlvbi54IDw9IDA7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0JhbGxIaXR0aW5nUmlnaHRXYWxsKGJhbGwsIGNhbnZhc1ZpZXc6IENhbnZhc1ZpZXcpIHtcbiAgcmV0dXJuIGJhbGwucG9zaXRpb24ueCA+IGNhbnZhc1ZpZXcuY2FudmFzLndpZHRoIC0gQkFMTF9ESUFNRVRFUjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzQmFsbEhpdHRpbmdUaGVDZWlsaW5nKGJhbGw6IEJhbGwpIHtcbiAgcmV0dXJuIGJhbGwucG9zaXRpb24ueSA8PSAwO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNCYWxsSGl0dGluZ1RoZUZsb29yKGJhbGw6IEJhbGwsIGNhbnZhc1ZpZXc6IENhbnZhc1ZpZXcpIHtcbiAgcmV0dXJuIGJhbGwucG9zaXRpb24ueSA+PSBjYW52YXNWaWV3LmNhbnZhcy5oZWlnaHQgLSBCQUxMX0RJQU1FVEVSO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGlzQmFsbE5lYXJCcmlja3MoYmFsbDogQmFsbCkge1xuICByZXR1cm4gYmFsbC5wb3NpdGlvbi55IDwgQlJJQ0tTX0VORDtcbn1cbmV4cG9ydCBmdW5jdGlvbiBpc0JhbGxDb2xsaWRpbmdXaXRoQm9hcmQoYmFsbCwgYm9hcmQpIHtcbiAgcmV0dXJuIChcbiAgICBiYWxsLnBvc2l0aW9uLnkgKyBCQUxMX0RJQU1FVEVSIC8gMiA+PSBib2FyZC5wb3NpdGlvbi55ICYmXG4gICAgYmFsbC5wb3NpdGlvbi55ICsgQkFMTF9ESUFNRVRFUiAvIDIgPD0gYm9hcmQucG9zaXRpb24ueSArIDEwICYmXG4gICAgYmFsbC5wb3NpdGlvbi54IC0gQkFMTF9ESUFNRVRFUiAvIDIgPD0gYm9hcmQucG9zaXRpb24ueCArIEJPQVJEX1dJRFRIICYmXG4gICAgYmFsbC5wb3NpdGlvbi54ICsgQkFMTF9ESUFNRVRFUiAvIDIgPj0gYm9hcmQucG9zaXRpb24ueFxuICApO1xufSIsIlxuZXhwb3J0IHR5cGUgRE9NRWxlbWVudCA9IHN0cmluZyB8IE5vZGU7XG5cbmV4cG9ydCBpbnRlcmZhY2UgRE9NIHtcbiAgICBjcmVhdGVFbGVtZW50KHR5cGU6IHN0cmluZywgYXR0cmlidXRlczogb2JqZWN0LCAuLi5jb250ZW50OiBET01FbGVtZW50W10pOiBIVE1MRWxlbWVudDtcblxuICAgIGFkZEVsZW1lbnQoYXBwZW5kVG86IHN0cmluZywgZWxlbWVudDogSFRNTEVsZW1lbnQpOiB2b2lkO1xuXG4gICAgZ2V0RWxlbWVudChzZWxlY3Rvcjogc3RyaW5nKTogYW55O1xuXG4gICAgZGVsZXRlRWxlbWVudChzZWxlY3Rvcjogc3RyaW5nKTogdm9pZDtcbn1cblxuZXhwb3J0IGNsYXNzIERPTVZpZXcgaW1wbGVtZW50cyBET00ge1xuICAgIHByaXZhdGUgc3RhdGljIGluc3RhbmNlOiBET01WaWV3O1xuXG4gICAgcHJpdmF0ZSBjb25zdHJ1Y3RvcigpIHtcbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0SW5zdGFuY2UoKTogRE9NVmlldyB7XG4gICAgICAgIGlmICghdGhpcy5pbnN0YW5jZSkge1xuICAgICAgICAgICAgdGhpcy5pbnN0YW5jZSA9IG5ldyBET01WaWV3KCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICogVGhpcyBmdW5jdGlvbiBjYW5ub3QgY3JlYXRlIGEgdGFibGVcbiAgKiBAcGFyYW0geyBzdHJpbmcgfSB0eXBlXG4gICogQHBhcmFtIHsgT2JqZWN0IH0gYXR0cmlidXRlc1xuICAqIEBwYXJhbSAgeyAuLi4oc3RyaW5nIHwgTm9kZSkgfSBjb250ZW50IFxuICAqIEByZXR1cm5zIHsgSFRNTEVsZW1lbnQgfSBSZXR1cm5zIHRoZSBjcmVhdGVkIGVsZW1lbnRcbiAgKi9cbiAgICBjcmVhdGVFbGVtZW50KHR5cGU6IHN0cmluZywgYXR0cmlidXRlczogb2JqZWN0LCAuLi5jb250ZW50OiBET01FbGVtZW50W10pOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHR5cGUpO1xuXG4gICAgICAgIGlmIChhdHRyaWJ1dGVzKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBhdHRyaWJ1dGUgaW4gYXR0cmlidXRlcykge1xuICAgICAgICAgICAgICAgIGlmIChhdHRyaWJ1dGUuc3RhcnRzV2l0aCgnb24nKSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBldmVudE5hbWUgPSBhdHRyaWJ1dGUuc2xpY2UoMikudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgYXR0cmlidXRlc1thdHRyaWJ1dGVdKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBlbGVtZW50W2F0dHJpYnV0ZV0gPSBhdHRyaWJ1dGVzW2F0dHJpYnV0ZV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChsZXQgaXRlbSBvZiBjb250ZW50KSB7XG4gICAgICAgICAgICBlbGVtZW50LmFwcGVuZChpdGVtKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBlbGVtZW50O1xuICAgIH1cblxuICAgIGFkZEVsZW1lbnQoYXBwZW5kVG86IHN0cmluZywgZWxlbWVudDogSFRNTEVsZW1lbnQpIHtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihhcHBlbmRUbykuYXBwZW5kKGVsZW1lbnQpO1xuICAgIH1cblxuICAgIGdldEVsZW1lbnQoc2VsZWN0b3I6IHN0cmluZyk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgbGV0IHZhbHVlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3RvcikgYXMgSFRNTEVsZW1lbnQ7XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG4gICAgZGVsZXRlRWxlbWVudChzZWxlY3Rvcjogc3RyaW5nKSB7XG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcbiAgICAgICAgZWxlbWVudC5yZW1vdmUoKTtcbiAgICB9XG5cbiAgICBhZGRIYW5kbGVyKGV2ZW50OiBzdHJpbmcsIGNhbGxiYWNrOiBFdmVudExpc3RlbmVyLCBzZWxlY3Rvcj86IHN0cmluZykge1xuICAgICAgICBpZiAoc2VsZWN0b3IpIHtcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIGNhbGxiYWNrKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgY2FsbGJhY2spO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYWRkQmFja0J1dHRvbkhhbmRsZXIoKSB7XG4gICAgICAgIHRoaXMuYWRkSGFuZGxlcihcImNsaWNrXCIsICgpID0+IHsgdGhpcy5oaWRlU2V0dGluZ3NNZW51KCk7IH0sIFwiI2JhY2stYnRuXCIpO1xuICAgIH1cbiAgICBhZGRSaWdodENsaWNrSGFuZGxlcihjYWxsYmFjazogRXZlbnRMaXN0ZW5lcikge1xuICAgICAgICB3aW5kb3cub25jb250ZXh0bWVudSA9IGNhbGxiYWNrO1xuICAgIH1cbiAgICBzaG93SW5pdGlhbFNjcmVlbigpIHtcbiAgICAgICAgdGhpcy5nZXRFbGVtZW50KFwiI2NvbnRhaW5lclwiKS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgICB0aGlzLmdldEVsZW1lbnQoXCIjZ2FtZUNhbnZhc1wiKS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgIHRoaXMuZ2V0RWxlbWVudChcIiNkZXRhaWxzLWJveFwiKS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgIHRoaXMuZ2V0RWxlbWVudChcIiNnYW1lT3ZlclwiKS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgfVxuICAgIGluaXRHYW1lKCkge1xuICAgICAgICB0aGlzLmdldEVsZW1lbnQoXCIjY29udGFpbmVyXCIpLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgdGhpcy5nZXRFbGVtZW50KFwiI2dhbWVDYW52YXNcIikuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICAgICAgY29uc3QgZGV0YWlsc0JveCA9IHRoaXMuZ2V0RWxlbWVudChcIiNkZXRhaWxzLWJveFwiKTtcbiAgICAgICAgZGV0YWlsc0JveC5zdHlsZS5kaXNwbGF5ID0gXCJmbGV4XCI7XG4gICAgICAgIGRldGFpbHNCb3guc3R5bGUuanVzdGlmeUNvbnRlbnQgPSBcInNwYWNlLWFyb3VuZFwiO1xuICAgIH1cbiAgICBzZXRTY29yZShzY29yZVBvaW50czogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuZ2V0RWxlbWVudChcIiNzY29yZVwiKS50ZXh0Q29udGVudCA9IGBTY29yZTogJHtzY29yZVBvaW50cy50b1N0cmluZygpfWA7XG4gICAgfVxuICAgIHNldExpdmVzKGxpdmVzOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5nZXRFbGVtZW50KFwiI2xpZmVcIikuaW5uZXJUZXh0ID0gbGl2ZXMudG9TdHJpbmcoKTtcbiAgICB9XG4gICAgc2hvd05ld0dhbWVCdXR0b24oKSB7XG4gICAgICAgICh0aGlzLmdldEVsZW1lbnQoXCIjbmV3LWdhbWVcIikgYXMgSFRNTEJ1dHRvbkVsZW1lbnQpLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgfVxuICAgIHNob3dDb25ncmF0dWxhdGlvbnMoKSB7XG4gICAgICAgIHRoaXMuZ2V0RWxlbWVudChcIiNnYW1lV2luXCIpLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgfVxuICAgIGhpZGVOZXdHYW1lQnV0dG9uKCkge1xuICAgICAgICAodGhpcy5nZXRFbGVtZW50KFwiI25ldy1nYW1lXCIpIGFzIEhUTUxCdXR0b25FbGVtZW50KS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgfVxuICAgIGhpZGVDb25ncmF0dWxhdGlvbnMoKSB7XG4gICAgICAgIHRoaXMuZ2V0RWxlbWVudChcIiNnYW1lV2luXCIpLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICB9XG4gICAgZ2V0Qm9hcmRJbWFnZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RWxlbWVudChcIiNib2FyZFwiKSBhcyBIVE1MSW1hZ2VFbGVtZW50O1xuICAgIH1cbiAgICBzaG93U2V0dGluZ3NNZW51KCkge1xuICAgICAgICBjb25zdCBzZXR0aW5nc0NvbnRhaW5lciA9IHRoaXMuZ2V0RWxlbWVudChcIiNzZXR0aW5ncy1jb250YWluZXJcIik7XG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IHRoaXMuZ2V0RWxlbWVudChcIiNjb250YWluZXJcIik7XG4gICAgICAgIHNldHRpbmdzQ29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgICAgIGNvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgfVxuICAgIGhpZGVTZXR0aW5nc01lbnUoKSB7XG4gICAgICAgIGNvbnN0IHNldHRpbmdzQ29udGFpbmVyID0gdGhpcy5nZXRFbGVtZW50KFwiI3NldHRpbmdzLWNvbnRhaW5lclwiKTtcbiAgICAgICAgY29uc3QgY29udGFpbmVyID0gdGhpcy5nZXRFbGVtZW50KFwiI2NvbnRhaW5lclwiKTtcbiAgICAgICAgc2V0dGluZ3NDb250YWluZXIuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICBjb250YWluZXIuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICB9XG4gICAgc2hvd0ljb24oKSB7XG4gICAgICAgICh0aGlzLmdldEVsZW1lbnQoXCIuZ2ctY2hlY2tcIikgYXMgSFRNTEVsZW1lbnQpLnN0eWxlLmRpc3BsYXkgPVxuICAgICAgICAgICAgXCJibG9ja1wiO1xuICAgIH1cbiAgICBnZXRQbGF5QnV0dG9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRFbGVtZW50KFwiI3BsYXktYnRuXCIpO1xuICAgIH1cbiAgICBoaWRlR2FtZU92ZXJNZXNzYWdlKCkge1xuICAgICAgICB0aGlzLmdldEVsZW1lbnQoXCIjZ2FtZU92ZXJcIikuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgIH1cbn0iLCJpbXBvcnQgeyBWZWN0b3IgfSBmcm9tIFwiLi4vZ2VvbWV0cnkvdmVjdG9yXCI7XG5pbXBvcnQge1xuICBCUklDS19ST1dTLFxuICBCUklDS19XSURUSCxcbiAgQlJJQ0tfSEVJR0hULFxuICBCT0FSRF9XSURUSCxcbiAgQk9BUkRfSEVJR0hULFxuICBCQUxMX0RJQU1FVEVSLFxufSBmcm9tIFwiLi4vdXRpbHMvY29uc3RhbnRzXCI7XG5pbXBvcnQgeyBCYWxsIH0gZnJvbSBcIi4uL2ZpZ3VyZXMvYmFsbFwiO1xuaW1wb3J0IHsgQnJpY2sgfSBmcm9tIFwiLi4vZmlndXJlcy9icmlja1wiO1xuaW1wb3J0IHsgUGFkZGxlIH0gZnJvbSBcIi4uL2ZpZ3VyZXMvcGFkZGxlXCI7XG5cbmV4cG9ydCBjbGFzcyBDYW52YXNWaWV3IHtcbiAgcHJpdmF0ZSBjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRDtcbiAgcHVibGljIGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQ7XG5cbiAgY29uc3RydWN0b3IocHVibGljIGNhbnZhc1NlbGVjdG9yOiBzdHJpbmcpIHtcbiAgICB0aGlzLmNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGNhbnZhc1NlbGVjdG9yKSBhcyBIVE1MQ2FudmFzRWxlbWVudDtcbiAgICB0aGlzLmN0eCA9IHRoaXMuY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcbiAgfVxuXG4gIGRyYXdJbWFnZShcbiAgICBwb3NpdGlvbjogVmVjdG9yLFxuICAgIGltYWdlOiBIVE1MSW1hZ2VFbGVtZW50LFxuICAgIHdpZHRoOiBudW1iZXIsXG4gICAgaGVpZ2h0OiBudW1iZXJcbiAgKSB7XG4gICAgdGhpcy5jdHguZHJhd0ltYWdlKGltYWdlLCBwb3NpdGlvbi54LCBwb3NpdGlvbi55LCB3aWR0aCwgaGVpZ2h0KTtcbiAgfVxuXG4gIGRyYXdCcmlja3MoYnJpY2tzOiBCcmlja1tdKSB7XG4gICAgZm9yIChsZXQgciA9IDA7IHIgPCBCUklDS19ST1dTOyByKyspIHtcbiAgICAgIGZvciAobGV0IGMgPSAwOyBjIDwgYnJpY2tzLmxlbmd0aDsgYysrKSB7XG4gICAgICAgIGNvbnN0IGJyaWNrID0gYnJpY2tzW2NdO1xuICAgICAgICBjb25zdCBwb3M6IFZlY3RvciA9IG5ldyBWZWN0b3IoXG4gICAgICAgICAgYnJpY2sucG9zaXRpb24ueCxcbiAgICAgICAgICBicmljay5wb3NpdGlvbi55LFxuICAgICAgICApO1xuICAgICAgICB0aGlzLmRyYXdJbWFnZShwb3MsIGJyaWNrLmdldEltYWdlKCksIEJSSUNLX1dJRFRILCBCUklDS19IRUlHSFQpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGRyYXdCYWxsKGJhbGw6IEJhbGwpIHtcbiAgICB0aGlzLmRyYXdJbWFnZShcbiAgICAgIG5ldyBWZWN0b3IoYmFsbC5wb3NpdGlvbi54IC0gQkFMTF9ESUFNRVRFUiAvIDIsIGJhbGwucG9zaXRpb24ueSAtIEJBTExfRElBTUVURVIgLyAyKSxcbiAgICAgIGJhbGwuZ2V0SW1hZ2UoKSxcbiAgICAgIEJBTExfRElBTUVURVIsXG4gICAgICBCQUxMX0RJQU1FVEVSXG4gICAgKTtcbiAgfVxuXG4gIGRyYXdCb2FyZChib2FyZDogUGFkZGxlKSB7XG4gICAgdGhpcy5jdHguYmVnaW5QYXRoKCk7XG4gICAgdGhpcy5jdHguZHJhd0ltYWdlKFxuICAgICAgYm9hcmQuZ2V0SW1hZ2UoKSxcbiAgICAgIGJvYXJkLnBvc2l0aW9uLngsXG4gICAgICBib2FyZC5wb3NpdGlvbi55LFxuICAgICAgQk9BUkRfV0lEVEgsXG4gICAgICBCT0FSRF9IRUlHSFRcbiAgICApO1xuICAgIHRoaXMuY3R4LmNsb3NlUGF0aCgpO1xuICB9XG5cbiAgZ2V0Q29udGV4dCgpOiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQge1xuICAgIHJldHVybiB0aGlzLmN0eDtcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgY2FudmFzVmlldyA9IG5ldyBDYW52YXNWaWV3KFwiZ2FtZUNhbnZhc1wiKTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IGNhbnZhc1ZpZXcgfSBmcm9tIFwiLi92aWV3L2NhbnZhc1ZpZXdcIjtcbmltcG9ydCB7IEdhbWUgfSBmcm9tIFwiLi9lbmdpbmUvZ2FtZUxvb3BcIjtcbmltcG9ydCB7IERPTVZpZXcgfSBmcm9tIFwiLi92aWV3L0RPTVZpZXdcIjtcblxuLy9jb25zdCBjYW52YXNWaWV3ID0gbmV3IENhbnZhc1ZpZXcoXCJnYW1lQ2FudmFzXCIpO1xuY29uc3QgZG9tID0gRE9NVmlldy5nZXRJbnN0YW5jZSgpO1xubGV0IGxpdmVzID0gMztcbmxldCBnYW1lID0gbmV3IEdhbWUoY2FudmFzVmlldywgbGl2ZXMpO1xubGV0IGlzUGxheWluZ011c2ljID0gZmFsc2U7XG5cbmRvbS5hZGRIYW5kbGVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICBnYW1lLnN0YXJ0R2FtZSgpO1xuICBkb20uaGlkZUdhbWVPdmVyTWVzc2FnZSgpO1xufSwgXCIjbmV3LWdhbWVcIik7XG5cbmRvbS5hZGRIYW5kbGVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICBkb20uaW5pdEdhbWUoKTtcbiAgZ2FtZS5saXZlcyA9IGxpdmVzO1xuICBnYW1lLnNjb3JlUG9pbnRzID0gMDtcbiAgZ2FtZS5zdGFydEdhbWUoKTtcblxuICBpZiAoaXNQbGF5aW5nTXVzaWMpIHtcbiAgICBjb25zdCBtdXNpYyA9IG5ldyBBdWRpbyhcIi4uL2Fzc2V0cy9tdXNpYy5tcDNcIik7XG4gICAgbXVzaWMudm9sdW1lID0gMC4xO1xuICAgIG11c2ljLnBsYXkoKTtcbiAgfVxufSwgXCIjcGxheS1idG5cIik7XG5cbmRvbS5hZGRIYW5kbGVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICBkb20uc2hvd1NldHRpbmdzTWVudSgpO1xuICBkb20uYWRkQmFja0J1dHRvbkhhbmRsZXIoKTtcbiAgZG9tLmFkZEhhbmRsZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgaXNQbGF5aW5nTXVzaWMgPSB0cnVlO1xuICAgIGRvbS5zaG93SWNvbigpO1xuICB9LCBcIiNwbGF5LXNvdW5kLWJ0blwiKTtcbn0sIFwiI3NldHRpbmctYnRuXCIpOyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==