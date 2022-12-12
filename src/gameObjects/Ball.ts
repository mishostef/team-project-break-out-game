import { Vector } from "../Geometry/Vector";

export class Ball {
    public radius = 5;
    private color = "red";

    constructor(public position: Vector, public velocity: Vector) { }
    move() {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }

}