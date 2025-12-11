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
