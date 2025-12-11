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
  // Find all circuits that contain either junction of the network
  const foundCircuits = circuits.filter(circuit => circuit.contains(network));

  if (foundCircuits.length === 0) {
    // No circuit contains either junction: create a new circuit
    const newCircuit = new Circuit();
    newCircuit.add(network.a);
    newCircuit.add(network.b);
    circuits.push(newCircuit);
  } else if (foundCircuits.length === 1) {
    // Only one circuit contains either junction: add both to that circuit
    foundCircuits[0].add(network.a);
    foundCircuits[0].add(network.b);
  } else {
    // More than one circuit: merge them all and add both junctions
    const mergedCircuit = new Circuit();
    for (const circuit of foundCircuits) {
      circuit.junctions.forEach(j => mergedCircuit.add(j));
    }
    mergedCircuit.add(network.a);
    mergedCircuit.add(network.b);
    // Remove all merged circuits from the list
    for (const circuit of foundCircuits) {
      const idx = circuits.indexOf(circuit);
      if (idx !== -1) circuits.splice(idx, 1);
    }
    circuits.push(mergedCircuit);
  }
});

// Print circuits
circuits.forEach((circuit, idx) => {
  console.log(`Circuit ${idx + 1}: ${circuit.junctions.length} junctions`);
  circuit.junctions.forEach(j => {
    console.log(`  Junction (${j.x},${j.y},${j.z})`);
  });
});
