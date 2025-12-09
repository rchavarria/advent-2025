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

const ranges = readRanges()
const ingredients = readIngredients()

console.log('ranges:', ranges)
console.log('ingredients:', ingredients)
