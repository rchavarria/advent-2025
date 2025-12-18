import fs from 'fs';
import path from 'path';

function readInput() {
  const filePath = path.join(path.dirname(new URL(import.meta.url).pathname), 'input.txt');
  return fs
    .readFileSync(filePath, 'utf8')
    .split('\r\n')
}

export class Corner {

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  static from(line) {
    const [x, y] = line.split(',').map(Number);
    return new Corner(x, y);
  }

  toString() {
    return `(${this.x}, ${this.y})`;
  }
}

export class Rectangle {
  constructor(a, b) {
    this.a = a;
    this.b = b;
  }

  area() {
    const width = Math.abs(this.a.x - this.b.x) + 1;
    const height = Math.abs(this.a.y - this.b.y) + 1;
    return width * height;
  }

  toString() {
    return `R [ a=${this.a.toString()}, b=${this.b.toString()}, S=${this.area()} ]`;
  }
}

export function createRectangleList(corners) {
  const rectangles = [];

  for (let i = 0; i < corners.length - 1; i++) {
    for (let j = i + 1; j < corners.length; j++) {
      rectangles.push(new Rectangle(corners[i], corners[j]));
    }
  }

  return rectangles
    .sort((r1, r2) => r2.area() - r1.area());
}

export function printRectangles(rectangles) {
  console.log('Rectangles sorted by area (descending):');
  rectangles.forEach((rect, idx) => {
    const indexStr = String(idx + 1).padStart(3, ' ');
    console.log(`Rectangle ${indexStr}: ${rect.toString()}`);
  });
}