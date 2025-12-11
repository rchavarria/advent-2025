import fs from 'fs';
import path from 'path';

function readLevels() {
  const filePath = path.join(path.dirname(new URL(import.meta.url).pathname), 'input.txt');
  return fs
    .readFileSync(filePath, 'utf8')
    .split('\r\n')
}

function next(previous, current) {
  // Crea una copia de la línea actual como array
  const result = current.split('');
  let splitCount = 0;

  // Itera sobre todas las posiciones de la línea anterior
  for (let i = 0; i < previous.length; i++) {
    if (previous[i] === 'S' || previous[i] === '1') {
      // Si hay un splitter '^' en la posición debajo del haz, divide el haz
      if (result[i] === '^') {
        let splitted = false;
        if (i > 0 && result[i - 1] === '.') {
          result[i - 1] = '1';
          splitted = true;
        }
        if (i < result.length - 1 && result[i + 1] === '.') {
          result[i + 1] = '1';
          splitted = true;
        }
        if (splitted) splitCount++;
        // El splitter se mantiene igual
        continue;
      }
      // Si hay espacio vacío debajo del haz, coloca '1'
      if (result[i] === '.') {
        result[i] = '1';
      }
    }
  }
  return {
    status: result.join(''),
    splitCount
  };
}

function testStart() {
  const expected = '..1..';

  const actual = next(
    '..S..',
    '.....',
    );

  console.assert(actual.status === expected, `\n\tExpctd: '${expected}'\n\tActual: '${actual}'`);
  console.assert(actual.splitCount === 0)
}

function testEmptySpace() {
  const expected = '.....';

  const actual = next(
    '.....',
    '.....',
    );

  console.assert(actual.status === expected, `\n\tExpctd: '${expected}'\n\tActual: '${actual}'`);
  console.assert(actual.splitCount === 0)
}

function testBeamGoesDownwards() {
  const expected = '..1..';

  const actual = next(
    '..1..',
    '.....',
    );

  console.assert(actual.status === expected, `\n\tExpctd: '${expected}'\n\tActual: '${actual}'`);
  console.assert(actual.splitCount === 0)
}

function testBeamSplits() {
  const expected = { status: '.1^1.', splitCount: 1 };

  const actual = next(
    '..1..',
    '..^..',
    );

  console.assert(actual.status === expected.status && actual.splitCount === expected.splitCount,
    `\n\tExpctd: '${JSON.stringify(expected)}'\n\tActual: '${JSON.stringify(actual)}'`);
  console.assert(actual.splitCount === 1)
}

function testSeveralBeams() {
  const expected = '.1.1.';

  const actual = next(
    '.1.1.',
    '.....',
    );

  console.assert(actual.status === expected, `\n\tExpctd: '${expected}'\n\tActual: '${actual}'`);
  console.assert(actual.splitCount === 0)
}

testStart()
testEmptySpace()
testBeamGoesDownwards()
testBeamSplits()
testSeveralBeams()

const levels = `
.....S.....
...........
.....^.....
.^.........
....^.^....
...........
...^.......
...........
`.trim().split('\n')

const example = `
.......S.......
...............
.......^.......
...............
......^.^......
...............
.....^.^.^.....
...............
....^.^...^....
...............
...^.^...^.^...
...............
..^...^.....^..
...............
.^.^.^.^.^...^.
...............
`.trim().split('\n')

function startTachyonManifold(levels) {
  let splitCount = 0

  console.log(levels[0])
  for (let i = 1; i < levels.length; i++) {
    const down = next(levels[i - 1], levels[i])
    console.log(down.status)
    levels[i] = down.status
    splitCount += down.splitCount
  }

  console.log(`\nTotal splitters activated: ${splitCount}`)
}

console.log('')
console.log('--------------')
console.log('')
startTachyonManifold(levels)

console.log('')
console.log('--------------')
console.log('')
startTachyonManifold(example)

console.log('')
console.log('--------------')
console.log('')
startTachyonManifold(readLevels())
