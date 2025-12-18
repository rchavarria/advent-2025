import fs from 'fs';
import path from 'path';

function readInput() {
  const filePath = path.join(path.dirname(new URL(import.meta.url).pathname), 'example.txt');
  return fs
    .readFileSync(filePath, 'utf8')
    .split('\r\n')
}

class Corner {

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  static from(line) {
    const [x, y] = line.split(',').map(Number);
    return new Corner(x, y);
  }
}

class Rectangle {
  constructor(a, b) {
    this.a = a;
    this.b = b;
  }

  area() {
    const width = Math.abs(this.a.x - this.b.x);
    const height = Math.abs(this.a.y - this.b.y);
    return width * height;
  }
}

// Crear lista de corners usando readInput()
const lines = readInput();
const corners = lines.map(Corner.from);

console.log(corners);
