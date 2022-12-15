import { Vector } from "../utils/vector";

export class Paddle {
    private image: HTMLImageElement = new Image();

    constructor(
        public position: Vector,
        image: HTMLImageElement
    ) {
        this.image = image;
    }

    getImage() : HTMLImageElement {
        return this.image;
    }
}