import fs from 'fs';
import path from 'path';
import {Junction} from "./solution.js";

function readInput() {
  const filePath = path.join(path.dirname(new URL(import.meta.url).pathname), 'example.txt');
  return fs
    .readFileSync(filePath, 'utf8')
    .split('\r\n')
}

const junctions = readInput().map(line => Junction.from(line));

const firstJunction = junctions[0];
const distances = junctions
  .slice(1)
  .map(firstJunction.saveClosest.bind(firstJunction))
  .sort((a, b) => a - b);

console.log(firstJunction);
console.log(firstJunction.closestNeighbor);
