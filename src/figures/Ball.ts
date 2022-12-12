import { Vector } from "../utils/vector";

export class Ball {
    private image: HTMLImageElement = new Image();

    constructor(
        public position: Vector,
        image: string
    ) {
        this.image.src = image;
    }

    getImage(): string {
        return this.image.src;
    }
}