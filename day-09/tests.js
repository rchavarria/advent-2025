import fs from 'fs';
import path from 'path';
import {Corner, createRectangleList, printRectangles} from "./solution";

function readInput() {
  const filePath = path.join(path.dirname(new URL(import.meta.url).pathname), 'example.txt');
  return fs
    .readFileSync(filePath, 'utf8')
    .split('\r\n')
}

// Create a list of corners using readInput()
const corners = readInput().map(line => Corner.from(line));

// Create as many rectangles as possible by pairing corners
const rectangles = createRectangleList(corners);

printRectangles(rectangles);
