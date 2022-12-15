import { Vector } from "../Geometry/Vector";


export class Paddle {
    private image: HTMLImageElement = new Image();
    public velocity: Vector = new Vector(0, 0);
    constructor(
        public position: Vector,
        image: HTMLImageElement,
        boardvelocity?:Vector
    ) {
        this.image = image;
        if(!!boardvelocity)
        this.velocity = boardvelocity;
    }

    getImage(): HTMLImageElement {
        return this.image;
    }
}