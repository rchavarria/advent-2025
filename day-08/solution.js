import fs from 'fs';
import path from 'path';

function readInput() {
  const filePath = path.join(path.dirname(new URL(import.meta.url).pathname), 'input.txt');
  return fs
    .readFileSync(filePath, 'utf8')
    .split('\r\n')
}

console.log(readInput())

export class Junction {
  static from(coordinates) {
    const [x, y, z] = coordinates.split(',').map(Number);
    return new Junction(x, y, z);
  }

  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  distance(target) {
    const dx = this.x - target.x;
    const dy = this.y - target.y;
    const dz = this.z - target.z;
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
  }
}
