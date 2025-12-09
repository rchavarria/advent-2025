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

function isInvalidId(id) {
  const regex = /^(\d+)\1+$/;
  return regex.test(id);
}

function newScanRange(range) {
  const invalidIds = [];
  for (let i = range.lower; i <= range.upper; i++) {
    const id = i.toString();
    if (isInvalidId(id)) {
      invalidIds.push(i);
    }
  }
  return invalidIds;
}

function print(id) {
  console.log('Invalid:', id);
  return id;
}

const sumInvalidIds = readRanges()
// const sumInvalidIds = [
//   { lower: 90, upper: 120 },
// ]
  .map(newScanRange)
  // .map(scanRange)
  .flat()
  // .map(print)
  .reduce((acc, id) => acc + id, 0)

console.log('Sum:', sumInvalidIds);

console.assert(sumInvalidIds === 25663320831, 'Sum should be 25663320831');
