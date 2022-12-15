import { Vector } from "../utils/vector";

export function move(gameObject: GameObject, velocity: Vector) {
  gameObject.position.x += velocity.x;
  gameObject.position.y += velocity.y;
}

export interface GameObject {
  position: { x: number; y: number };
}
