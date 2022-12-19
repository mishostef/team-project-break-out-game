import { Brick } from "../figures/brick";
import { BRICK_HEIGHT, BRICK_WIDTH } from "../utils/constants";
import { canvasView } from "../view/canvasView";

/* Get the canvas  */
var canvas = canvasView


/* Get the 2D context of the canvas  */
var ctx = canvas.getContext();/* Fills or sets the color,gradient,pattern */
ctx.fillStyle = "white";
//ctx.fillRect(0, 0, canvas.width, canvas.height);
//ctx.font = "50px Arial";
ctx.fillStyle = "green";

/* Writes the required text  */
//ctx.fillText("GFG", 500, 350)
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
        ctx.fillStyle = 'green';

        /* Begins or reset the path for 
           the arc created */
        ctx.beginPath();

        /* Some curve is created*/
        ctx.arc(this.x, this.y, this.radius,
            0, Math.PI * 2, false);

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
export function explode(brick: Brick) {

    setTimeout(() => {
        for (let i = 0; i <= 150; i++) {
            let dx = (Math.random() - 0.5) * (Math.random() * 6);
            let dy = (Math.random() - 0.5) * (Math.random() * 6);
            let radius = Math.random() * 3;
            let particle = new Particle(575, 375, radius, dx, dy);

            /* Adds new items like particle*/
            particles.push(particle);
        }
        explode(brick);
    }, 3000);


    /* Clears the given pixels in the rectangle */
    ctx.clearRect(0, 0, BRICK_WIDTH, BRICK_HEIGHT);
    ctx.fillStyle = "transparent";
    ctx.fillRect(brick.position.x, brick.position.y, BRICK_WIDTH, BRICK_HEIGHT);
    particles.forEach((particle, i) => {
        if (particle.alpha <= 0) {
            particles.splice(i, 1);
        } else particle.update()
    })

    /* Performs a animation after request*/
    const ex = explode.bind(null, brick);
    requestAnimationFrame(ex());
}