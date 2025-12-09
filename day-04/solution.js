import fs from 'fs';
import path from 'path';

function readLines() {
  const filePath = path.join(path.dirname(new URL(import.meta.url).pathname), 'input.txt');
  return fs
    .readFileSync(filePath, 'utf8')
    .split('\r\n')
}

function assertTrue(expected, actual) {
  console.assert(expected === actual, `Expected ${expected}, but got ${actual}`);
}
