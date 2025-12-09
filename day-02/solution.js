import fs from 'fs';
import path from 'path';

const INVALID_ID_REGEXP = /^(\d+)\1+$/;

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

function isInvalidId(id) {
  return INVALID_ID_REGEXP.test(id.toString());
}

function scanRange(range) {
  return Array
    .from({ length: range.upper - range.lower + 1 }, (_, idx) => range.lower + idx)
    .filter(isInvalidId);
}

const sumInvalidIds = readRanges()
  .map(scanRange)
  .flat()
  .reduce((acc, id) => acc + id, 0)

console.log('Sum:', sumInvalidIds);
console.assert(sumInvalidIds === 25663320831, 'Sum should be 25663320831');
