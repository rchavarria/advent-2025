import fs from 'fs';
import path from 'path';
import {Corner, Rectangle} from "./solution";

function readInput() {
  const filePath = path.join(path.dirname(new URL(import.meta.url).pathname), 'example.txt');
  return fs
    .readFileSync(filePath, 'utf8')
    .split('\r\n')
}

// Create a list of corners using readInput()
const lines = readInput();
const corners = lines.map(line => Corner.from(line));

// Create as many rectangles as possible by pairing corners
const rectangles = [];
for (let i = 0; i < corners.length - 1; i++) {
  for (let j = i + 1; j < corners.length; j++) {
    const a = corners[i];
    const b = corners[j];
    rectangles.push(new Rectangle(a, b));
  }
}

// Sort rectangles by area in descending order
rectangles.sort((r1, r2) => r2.area() - r1.area());

console.log('Rectangles sorted by area (descending):');
rectangles.forEach((rect, idx) => {
  const indexStr = String(idx + 1).padStart(3, ' ');
  console.log(`Rectangle ${indexStr}: ${rect.toString()}`);
});
