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

console.log('ranges:', readRanges())
