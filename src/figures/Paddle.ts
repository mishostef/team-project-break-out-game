import { Vector } from "../utils/vector";

export class Paddle {
    private image: HTMLImageElement = new Image();

    constructor(
        public position: Vector,
        image: string
    ) {
        this.image.src = image;
    }
}