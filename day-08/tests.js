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

junctions.forEach((junction, idx) => {
  junctions.forEach((other, jdx) => {
    if (idx !== jdx) {
      junction.saveClosest(other);
    }
  });
});

junctions.forEach(junction => {
  console.log(junction);
});
