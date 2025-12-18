import fs from 'fs';
import path from 'path';
import {buildNetworkPairs, connectIntoCircuits, Junction, JunctionNetwork, printCircuits} from "./solution.js";

function readInput() {
  const filePath = path.join(path.dirname(new URL(import.meta.url).pathname), 'example.txt');
  return fs
    .readFileSync(filePath, 'utf8')
    .split('\r\n')
}

const junctions = readInput().map(line => Junction.from(line));

// Find all unique pairs of Junctions and create JunctionNetwork instances
const networks = buildNetworkPairs(junctions);
// 190 networks for example.txt
const circuits = connectIntoCircuits(networks, networks.length, junctions.length);
printCircuits(circuits);
