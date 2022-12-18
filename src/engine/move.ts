import { Vector } from "../Geometry/Vector";

export function move(gameObject: GameObject) {
  gameObject.position.x += gameObject.velocity.x;
  gameObject.position.y += gameObject.velocity.y;
}

export interface GameObject {
  position: { x: number; y: number };
  velocity: Vector
}
