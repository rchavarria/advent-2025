import fs from 'fs';
import path from 'path';

function readInput() {
  const filePath = path.join(path.dirname(new URL(import.meta.url).pathname), 'input.txt');
  return fs
    .readFileSync(filePath, 'utf8')
    .split('\r\n')
}

// console.log(readInput())

export class Junction {
  static from(coordinates) {
    const [x, y, z] = coordinates.split(',').map(Number);
    return new Junction(x, y, z);
  }

  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.shortestDistance = undefined;
    this.closestNeighbor = undefined;
  }

  distance(neighbor) {
    const dx = this.x - neighbor.x;
    const dy = this.y - neighbor.y;
    const dz = this.z - neighbor.z;
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
  }

  saveClosest(neighbor) {
    const distance = this.distance(neighbor);
    if (this.shortestDistance === undefined || distance < this.shortestDistance) {
      this.shortestDistance = distance;
      this.closestNeighbor = neighbor;
    }
  }
}

export class JunctionNetwork {
  constructor(a, b) {
    this.a = a;
    this.b = b;
    this.distance = a.distance(b);
  }
}

export class Circuit {
  constructor() {
    this.junctions = [];
  }

  add(junction) {
    if (!this.junctions.includes(junction)) {
      this.junctions.push(junction);
    }
  }

  merge(otherCircuit) {
    for (const junction of otherCircuit.junctions) {
      this.add(junction);
    }
  }

  contains(network) {
    return this.junctions.includes(network.a) || this.junctions.includes(network.b);
  }
}

export function buildNetworkPairs(junctions) {
  const networks = [];
  for (let i = 0; i < junctions.length; i++) {
    for (let j = i + 1; j < junctions.length; j++) {
      networks.push(new JunctionNetwork(junctions[i], junctions[j]));
    }
  }
  return networks;
}

export function connectIntoCircuits(networks, limit) {
  // Sort the networks by distance (ascending)
  const sorted = networks
    .sort((a, b) => a.distance - b.distance)
    .slice(0, limit); // Keep only the closest N networks

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

  return circuits;
}

export function printCircuits(circuits) {
  circuits.forEach((circuit, idx) => {
    console.log(`Circuit ${idx + 1}: ${circuit.junctions.length} junctions`);
    circuit.junctions.forEach(j => {
      console.log(`  Junction (${j.x},${j.y},${j.z})`);
    });
  });
}
