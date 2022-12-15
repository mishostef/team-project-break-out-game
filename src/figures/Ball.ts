import { Vector } from "../Geometry/Vector";


export class Ball {
    private image: HTMLImageElement = new Image();
    public velocity: Vector = new Vector(0, 0);
    constructor(
        public position: Vector,
        image: string,
        ballvelocity?: Vector
    ) {
        this.image.src = image;
        if (!!ballvelocity)
            this.velocity = ballvelocity;
    }

    getImage(): HTMLImageElement {
        return this.image;
    }
}