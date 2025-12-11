import fs from 'fs';
import path from 'path';
import {Junction, JunctionNetwork} from "./solution.js";

function readInput() {
  const filePath = path.join(path.dirname(new URL(import.meta.url).pathname), 'example.txt');
  return fs
    .readFileSync(filePath, 'utf8')
    .split('\r\n')
}

const junctions = readInput().map(line => Junction.from(line));

// Find all unique pairs of Junctions and create JunctionNetwork instances
const networks = [];
for (let i = 0; i < junctions.length; i++) {
  for (let j = i + 1; j < junctions.length; j++) {
    networks.push(new JunctionNetwork(junctions[i], junctions[j]));
  }
}

// Sort the networks by distance (ascending)
const sorted = networks.sort((a, b) => a.distance - b.distance);

console.log(sorted.slice(0, 10));