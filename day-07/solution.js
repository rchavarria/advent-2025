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

function countTimelines(value) {
  if (value === '.' || value === '^') {
    return 0
  }

  if (value === 'S') {
    return 1
  }

  return Number(value)
}

function nextTime(previous, current) {
  // Crea una copia de la línea actual como array
  const result = [...current];

  // Itera sobre todas las posiciones de la línea anterior
  for (let i = 0; i < previous.length; i++) {
    let timelines = countTimelines(previous[i]);
    if (timelines > 0) {
      // Si hay un splitter '^' en la posición debajo del haz, divide el haz
      if (result[i] === '^') {
        if (i > 0) {
          result[i - 1] = countTimelines(result[i - 1]) + timelines;
        }

        if (i < result.length - 1) {
          result[i + 1] = countTimelines(result[i + 1]) + timelines;
        }

        // El splitter se mantiene igual
        continue;
      }

      // Si hay espacio vacío debajo del haz, coloca '1'
      result[i] = countTimelines(result[i]) + timelines;
    }
  }

  return result
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

function startManyWorlds(levels) {
  console.log(levels[0].join(''))
  for (let i = 1; i < levels.length; i++) {
    const down = nextTime(levels[i - 1], levels[i])
    console.log(down.join(''))
    levels[i] = down
  }

  const last = levels[levels.length - 1]
  const totalTimelines = last
    .reduce((acc, val) => acc + countTimelines(val), 0)
  console.log(`\nTotal timelines at the end: ${totalTimelines}`)
}

// console.log('')
// console.log('--------------')
// console.log('')
// startTachyonManifold(levels)
// startManyWorlds(levels.map(l => l.split('')))

// console.log('')
// console.log('--------------')
// console.log('')
// startTachyonManifold(example)
// startManyWorlds(example.map(l => l.split('')))

console.log('')
console.log('--------------')
console.log('')
// startManyWorlds(readLevels().slice(0, 10))
startManyWorlds(
  readLevels()
    .map(l => l.split(''))
)
