import fs from 'fs';
import path from 'path';

function readRanges() {
  const filePath = path.join(path.dirname(new URL(import.meta.url).pathname), 'input.txt');
  return fs
    .readFileSync(filePath, 'utf8')
    .split(',')
    .map(range => {
      const [lower, upper] = range.split('-').map(Number);
      return { lower, upper };
    })
}

function scanRange(range) {
  const invalidIds = [];

  for (let i = range.lower; i <= range.upper; i++) {
    const id = i.toString();
    if (id.length % 2 !== 0) {
      continue;
    }

    const half = id.length / 2;
    if (id.slice(0, half) !== id.slice(half)) {
      continue;
    }

    invalidIds.push(i);
  }

  return invalidIds;
}

const sumInvalidIds = readRanges()
  .map(scanRange)
  .flat()
  .reduce((acc, id) => acc + id, 0)

console.log('Sum:', sumInvalidIds);
