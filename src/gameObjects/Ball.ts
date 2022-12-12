import { Vector } from "../Geometry/Vector";

export class Ball {
    private radius = 5;
    private color = "red";

    constructor(public position: Vector, public velocity: Vector, public ctx) { }
    move() {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }
    draw() {
        this.ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
        this.ctx.fillStyle = "red";
        this.ctx.fill();
    }
}