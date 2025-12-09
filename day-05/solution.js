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

const ranges = readRanges()
const ingredients = readIngredients()

const freshCount = ingredients.filter(ingredient => isFresh(ranges, ingredient)).length;
console.log('Fresh ingredients count:', freshCount);
