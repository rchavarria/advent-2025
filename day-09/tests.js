import fs from 'fs';
import path from 'path';
import {Corner, createRectangleList, printRectangles} from "./solution";

function readInput() {
  const filePath = path.join(path.dirname(new URL(import.meta.url).pathname), 'example.txt');
  return fs
    .readFileSync(filePath, 'utf8')
    .split('\r\n')
}

const corners = readInput().map(line => Corner.from(line));
const rectangles = createRectangleList(corners);
printRectangles(rectangles);
