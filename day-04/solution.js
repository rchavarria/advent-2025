import fs from 'fs';
import path from 'path';

function readGrid() {
  const filePath = path.join(path.dirname(new URL(import.meta.url).pathname), 'input.txt');
  return fs
    .readFileSync(filePath, 'utf8')
    .split('\r\n')
    .map((line => line.split('')))
}

function assertTrue(expected, actual) {
  console.assert(expected === actual, `Expected ${expected}, but got ${actual}`);
}

function countAdjacentRolls(grid, x, y) {
  let count = 0;
  const directions = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1],           [0, 1],
    [1, -1],  [1, 0],  [1, 1]
  ];

  for (const [dx, dy] of directions) {
    const nx = x + dx;
    const ny = y + dy;
    if (
      nx >= 0 && nx < grid.length &&
      ny >= 0 && ny < grid[0].length &&
      grid[nx][ny] === "@"
    ) {
      count++;
    }
  }

  return count;
}

function testA() {
  const grid = [
    [".", "@", "."],
    ["@", "@", "."],
    [".", ".", "."]
  ];

  assertTrue(3, countAdjacentRolls(grid, 0, 0));
  assertTrue(2, countAdjacentRolls(grid, 1, 0));
  assertTrue(2, countAdjacentRolls(grid, 2, 0));
  assertTrue(2, countAdjacentRolls(grid, 0, 1));
  assertTrue(2, countAdjacentRolls(grid, 1, 1));
  assertTrue(2, countAdjacentRolls(grid, 2, 1));
  assertTrue(2, countAdjacentRolls(grid, 0, 2));
  assertTrue(2, countAdjacentRolls(grid, 1, 2));
  assertTrue(1, countAdjacentRolls(grid, 2, 2));
}

function testB() {
  const grid = [
    ["@", "@", "@"],
    ["@", ".", "."],
    ["@", ".", "."]
  ];

  assertTrue(2, countAdjacentRolls(grid, 0, 0));
  assertTrue(3, countAdjacentRolls(grid, 1, 0));
  assertTrue(1, countAdjacentRolls(grid, 2, 0));
  assertTrue(3, countAdjacentRolls(grid, 0, 1));
  assertTrue(5, countAdjacentRolls(grid, 1, 1));
  assertTrue(2, countAdjacentRolls(grid, 2, 1));
  assertTrue(1, countAdjacentRolls(grid, 0, 2));
  assertTrue(2, countAdjacentRolls(grid, 1, 2));
  assertTrue(0, countAdjacentRolls(grid, 2, 2));
}

testA()
testB()

function forEachCell(grid) {
  for (let x = 0; x < grid.length; x++) {
    for (let y = 0; y < grid[x].length; y++) {
      const count = countAdjacentRolls(grid, x, y);
      console.log(`Cell (${x}, ${y}) has ${count} adjacent rolls.`);
    }
  }
}

const grid = readGrid();
forEachCell(grid)
