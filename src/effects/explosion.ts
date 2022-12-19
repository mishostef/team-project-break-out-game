import { Brick } from "../figures/brick";
import { Vector } from "../geometry/vector";
import { BRICK_HEIGHT, BRICK_WIDTH } from "../utils/constants";
import { canvasView } from "../view/canvasView";

/* Get the canvas  */
var canvas = canvasView
var ctx = canvas.getContext();
let particles = [];

/* Initialize particle object  */
export class Particle {
    private alpha;
    constructor(public x, public y, public radius, public dx, public dy) {
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
        ctx.arc(this.x, this.y, this.radius,
            0, Math.PI * 2, false);
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

export function createParticles(brick: Brick) {

    for (let i = 0; i <= 150; i++) {
        let dx = (Math.random() - 0.5) * (Math.random() * 6);
        let dy = (Math.random() - 0.5) * (Math.random() * 6);
        let radius = Math.random() * 3;
        let particle = new Particle(brick.position.x + BRICK_WIDTH / 2, brick.position.y + BRICK_HEIGHT / 2, radius, dx, dy);
        particles.push(particle);
    }
    console.log(particles);
    return particles;
}
