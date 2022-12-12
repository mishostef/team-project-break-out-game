import { Vector } from "../utils/vector";

export class CanvasView {
    private ctx: CanvasRenderingContext2D;

    constructor(
        public canvasSelector: string,
    ) {
        const canvas = document.getElementById(canvasSelector) as HTMLCanvasElement;
        this.ctx = canvas.getContext('2d');
    }

    drawImage(position: Vector, source: string, width: number, height: number) {
        const image = new Image();
        image.src = source;
    
        image.onload = () => {
            this.ctx.drawImage(image, position.x, position.y, width, height);
        };
    }

    getContext(): CanvasRenderingContext2D {
        return this.ctx;
    }
}