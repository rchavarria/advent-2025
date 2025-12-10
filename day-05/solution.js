import fs from 'fs';
import path from 'path';

function parseRange(rangeStr) {
  const [min, max] = rangeStr.split('-').map(Number);
  return { min, max };
}

function readRanges() {
  const filePath = path.join(path.dirname(new URL(import.meta.url).pathname), 'input.txt');
  return fs
    .readFileSync(filePath, 'utf8')
    .split('\r\n')
    .filter(line => line.includes('-'))
    .map(parseRange)
}

function readIngredients() {
  const filePath = path.join(path.dirname(new URL(import.meta.url).pathname), 'input.txt');
  return fs
    .readFileSync(filePath, 'utf8')
    .split('\r\n')
    .filter(line => !line.includes('-'))
    .filter(line => line.length > 0)
    .map(Number)
}

function isFresh(ranges, ingredient) {
  return ranges.some(({ min, max }) => ingredient >= min && ingredient <= max);
}

function mergeRanges(ranges) {
  const result = [];

  for (const range of ranges) {
    if (!result.length) {
      result.push({ ...range });
      continue;
    }

    const last = result[result.length - 1];
    // Check overlap: if current min <= last max
    if (range.min <= last.max) {
      // Merge: update last.max if needed
      last.max = Math.max(last.max, range.max);
    } else {
      result.push({ ...range });
    }
  }

  return result;
}

const ranges = readRanges()
  .sort((a, b) => a.min - b.min)
const ingredients = readIngredients()

const freshCount = ingredients.filter(ingredient => isFresh(ranges, ingredient)).length;
console.log('Fresh ingredients count:', freshCount);

const totalFreshIds = ranges.map(r => r.max - r.min).reduce((a, b) => a + b, 0);
console.log('Total possible fresh ingredient IDs:', totalFreshIds);

const mergedRanges = mergeRanges(ranges);