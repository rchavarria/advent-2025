import fs from 'fs';
import path from 'path';

function readMathProblems() {
  const filePath = path.join(path.dirname(new URL(import.meta.url).pathname), 'input.txt');
  return fs
    .readFileSync(filePath, 'utf8')
    .split('\r\n')
}

console.log(readMathProblems())
