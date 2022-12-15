import { Vector } from "../Geometry/Vector";


export class Ball {
    private image: HTMLImageElement = new Image();
    public ballVelocity: Vector = new Vector(0, 0);
    constructor(
        public position: Vector,
        image: string,
        ballvelocity?: Vector
    ) {
        this.image.src = image;
        if (!!ballvelocity)
            this.ballVelocity = ballvelocity;
    }

    getImage(): HTMLImageElement {
        return this.image;
    }
}