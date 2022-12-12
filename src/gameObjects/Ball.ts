import { Vector } from "../Geometry/Vector";

export class Ball {
    public radius = 5;
    private color = "red";

    constructor(public position: Vector, public velocity: Vector) { }
    

}