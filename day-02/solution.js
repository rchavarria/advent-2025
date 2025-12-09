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

// console.log('ranges:', readRanges())

function scanRange(range) {
  for (let i = range.lower; i <= range.upper; i++) {
    const str = i.toString();
    if (str.length % 2 === 0) {
      const half = str.length / 2;
      if (str.slice(0, half) === str.slice(half)) {
        console.log(i);
      }
    }
  }
}

scanRange({ lower: 1, upper: 14 });
console.log('---');
scanRange({ lower: 16, upper: 35 });
