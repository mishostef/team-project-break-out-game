import { Vector } from "../Geometry/Vector";

export class Brick {
  private image: HTMLImageElement = new Image();

  constructor(public position: Vector, image: string) {
    this.image.src = image;
  }

  getImage(): HTMLImageElement {
    return this.image;
  }
}