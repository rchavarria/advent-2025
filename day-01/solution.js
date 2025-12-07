import fs from 'fs';
import path from 'path';

export function readLines() {
  const filePath = path.join(path.dirname(new URL(import.meta.url).pathname), 'input.txt');
  return fs.readFileSync(filePath, 'utf8').split(/\r?\n/);
}

function computeDialPosition(instruction, currentPosition) {
  const instructionDirection = instruction[0];
  const instructionValue = parseInt(instruction.slice(1), 10) % 100;

  if (instructionDirection === 'L') {
    return (currentPosition - instructionValue + 100) % 100;
  } else if (instructionDirection === 'R') {
    return (currentPosition + instructionValue) % 100;
  }

  throw new Error(`Invalid instruction: ${instruction}`);
}

function processDialInstructions(instructions, position = 50, zeroCount = 0) {
  if (instructions.length === 0) {
    return zeroCount;
  }

  const instruction = instructions[0];
  const instructionDirection = instruction[0];
  let instructionValue = parseInt(instruction.slice(1), 10);

  // Count full rotations, increment zeroCount accordingly
  //if (instructionValue >= 100) {
  //  zeroCount += Math.floor(instructionValue / 100);
  //  instructionValue = instructionValue % 100;
  //}

  let computedPosition = position;
  if (instructionDirection === 'L') {
    computedPosition = (position - instructionValue + 100) % 100;
  } else if (instructionDirection === 'R') {
    computedPosition = position + instructionValue;
  }

  if (computedPosition >= 100) {
    zeroCount += Math.floor(computedPosition / 100);
    computedPosition = computedPosition % 100;
  }

  if (computedPosition === 0) {
    zeroCount++;
  }

  const prevStr = `D${position.toString().padStart(2, '0')}`;
  const instrStr = instruction.padEnd(3, ' ');
  const currStr = `D${computedPosition.toString().padStart(2, '0')}`;

  console.log(`${prevStr} => ${instrStr} => ${currStr}`);

  return processDialInstructions(instructions.slice(1), computedPosition, zeroCount);
}

//const instructions = readLines();
const instructions = [ 'R151' ];
const zeroCount = processDialInstructions(instructions);
console.log(`Times dial was at position 0: ${zeroCount}`);
