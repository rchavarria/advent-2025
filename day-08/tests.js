import fs from 'fs';
import path from 'path';
import {Junction, JunctionNetwork, Circuit} from "./solution.js";

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
const sorted = networks
  .sort((a, b) => a.distance - b.distance)
  .slice(0, 10); // Keep only the closest N networks

// console.log("Closest Networks:");
// sorted.forEach(network => {
//   console.log(`Junction A (${network.a.x},${network.a.y},${network.a.z}) <-> Junction B (${network.b.x},${network.b.y},${network.b.z}) : Distance = ${network.distance.toFixed(2)}`);
// });

// Build circuits from sorted networks
const circuits = [];

sorted.forEach(network => {
  const foundCircuit = circuits.find(circuit => circuit.contains(network));

  if (!foundCircuit) {
    // Neither junction is in a circuit, create a new one
    const newCircuit = new Circuit();
    newCircuit.add(network.a);
    newCircuit.add(network.b);
    circuits.push(newCircuit);
  } else {
    // At least one junction is in a circuit, add both
    foundCircuit.add(network.a);
    foundCircuit.add(network.b);
  }
});

// Print circuits
circuits.forEach((circuit, idx) => {
  console.log(`Circuit ${idx + 1}: ${circuit.junctions.length} junctions`);
  circuit.junctions.forEach(j => {
    console.log(`  Junction (${j.x},${j.y},${j.z})`);
  });
});
