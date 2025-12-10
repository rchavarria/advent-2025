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
    // } else if (range.max >= last.min) {
      // Merge: update last.min if needed
      // last.min = Math.min(last.min, range.min);
    } else {
      result.push({ ...range });
    }
  }

  return result;
}

function testDoesNotOverlapBeyondMax() {
  const input = [
    { min: 10, max: 20 },
    { min: 30, max: 40 },
  ];
  const expected = [
    { min: 10, max: 20 },
    { min: 30, max: 40 },
  ];

  const result = mergeRanges(input);

  let pass = result.length === expected.length;
  console.assert(pass, 'Should have same length', result);

  pass = result[0].min === expected[0].min && result[0].max === expected[0].max
  console.assert(pass, 'First range should match');

  pass = result[1].min === expected[1].min && result[1].max === expected[1].max
  console.assert(pass, 'Second range should match');
}

function testOverlapsOnMax() {
  const input = [
    { min: 15, max: 25 },
    { min: 20, max: 30 },
  ];
  const expected = [
    { min: 15, max: 30 }
  ];

  const result = mergeRanges(input);

  const pass = result.length === expected.length &&
    result[0].min === expected[0].min &&
    result[0].max === expected[0].max;

  console.assert(pass, 'Merge should be from 15 to 30');
}

function testOverlapsWithin() {
  const input = [
    { min: 10, max: 40 },
    { min: 20, max: 30 },
  ];
  const expected = [
    { min: 10, max: 40 }
  ];

  const result = mergeRanges(input);

  let pass = result.length === expected.length;
  console.assert(pass, 'Should have same length', result);

  pass = result[0].min === expected[0].min && result[0].max === expected[0].max
  console.assert(pass, 'First range should match');
}

function testOverlapsWhenMinAreEqual() {
  const input = [
    { min: 10, max: 30 },
    { min: 10, max: 20 },
  ];
  const expected = [
    { min: 10, max: 30 }
  ];

  const result = mergeRanges(input);

  let pass = result.length === expected.length;
  console.assert(pass, 'Should have same length', result);

  pass = result[0].min === expected[0].min && result[0].max === expected[0].max
  console.assert(pass, 'First range should match');
}

function testOverlapsWhenMaxAreEqualBelow() {
  const input = [
    { min: 10, max: 30 },
    { min: 20, max: 30 },
  ];
  const expected = [
    { min: 10, max: 30 }
  ];

  const result = mergeRanges(input);

  let pass = result.length === expected.length;
  console.assert(pass, 'Should have same length', result);

  pass = result[0].min === expected[0].min && result[0].max === expected[0].max
  console.assert(pass, 'First range should match');
}

function testOverlapsWhenMaxAreEqualBeyond() {
  const input = [
    { min: 10, max: 20 },
    { min: 20, max: 30 },
  ];
  const expected = [
    { min: 10, max: 30 }
  ];

  const result = mergeRanges(input);

  let pass = result.length === expected.length;
  console.assert(pass, 'Should have same length', result);

  pass = result[0].min === expected[0].min && result[0].max === expected[0].max
  console.assert(pass, 'First range should match');
}

function testOverlapsOnSeveralRanges() {
  const input = [
    { min: 10, max: 20 },
    { min: 20, max: 30 },
    { min: 50, max: 60 },
    { min: 60, max: 70 },
  ];
  const expected = [
    { min: 10, max: 30 },
    { min: 50, max: 70 },
  ];

  const result = mergeRanges(input);

  let pass = result.length === expected.length;
  console.assert(pass, 'Should have same length', result);

  pass = result[0].min === expected[0].min && result[0].max === expected[0].max
  console.assert(pass, 'First range should match', expected[0], result[0]);

  pass = result[1].min === expected[1].min && result[1].max === expected[1].max
  console.assert(pass, 'Second range should match', expected[1], result[1]);
}

testOverlapsOnMax()
testDoesNotOverlapBeyondMax()
testOverlapsWithin()
testOverlapsWhenMinAreEqual()
testOverlapsWhenMaxAreEqualBelow()
testOverlapsWhenMaxAreEqualBeyond()
testOverlapsOnSeveralRanges()

const ranges = readRanges()
  .sort((a, b) => a.min - b.min)
const ingredients = readIngredients()

const freshCount = ingredients.filter(ingredient => isFresh(ranges, ingredient)).length;
console.log('Fresh ingredients count:', freshCount);

const mergedRanges = mergeRanges(ranges);
const totalMergedFreshIds = mergedRanges.map(r => r.max - r.min).reduce((a, b) => a + b + 1, 0);
console.log('Total possible fresh ingredient IDs (merged):', totalMergedFreshIds);
// 357485433193192 => too low
// 357485433193284 => cuenta también un +1, porque ambos extremos son inclusivos
