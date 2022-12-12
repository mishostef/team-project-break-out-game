import { Point } from "./Interfaces";

export class Vector implements Point {
    x: number;
    y: number;

    constructor(p: Point)
    constructor(x: number, y: number)
    constructor(
        xOrPoint: number | Point,
        y?: number
    ) {
        if (typeof xOrPoint == 'number' && typeof y == 'number') {
            this.x = xOrPoint;
            this.y = y;
        } else if (typeof xOrPoint == 'object') {
            this.x = xOrPoint.x;
            this.y = xOrPoint.y;
        }
    }

    add(p: Point) {
        this.x += p.x;
        this.y += p.y;
        return this;
    }

    scale(s: number) {
        this.x *= s;
        this.y *= s;

        return this;
    }

    dist(p: Point) {
        const dx = this.x - p.x;
        const dy = this.y - p.y;
        return Math.sqrt(dx ** 2 + dy ** 2);
    }

    sqLength() {
        return this.x ** 2 + this.y ** 2;
    }

    static add(p1: Point, p2: Point) {
        return new Vector(p1.x + p2.x, p1.y + p2.y);
    }
}