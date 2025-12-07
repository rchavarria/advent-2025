import fs from 'fs';
import path from 'path';

export function readLines() {
    const filePath = path.join(path.dirname(new URL(import.meta.url).pathname), 'input.txt');
    return fs.readFileSync(filePath, 'utf8').split(/\r?\n/);
}

function computeDialPosition(instruction, currentPosition) {
    const direction = instruction[0];
    const value = parseInt(instruction.slice(1), 10);
    if (direction === 'L') {
        return (currentPosition - value + 100) % 100;
    } else if (direction === 'R') {
        return (currentPosition + value) % 100;
    }
    return currentPosition;
}

function processDialInstructions(instructions, position = 50, zeroCount = 0) {
    if (instructions.length === 0) {
        return zeroCount;
    }
    const instr = instructions[0];
    const prevPosition = position;
    const computedPosition = computeDialPosition(instr, position);
    if (computedPosition === 0) zeroCount++;
    const prevStr = `D${prevPosition.toString().padStart(2, '0')}`;
    const instrStr = instr.padEnd(3, ' ');
    const currStr = `D${computedPosition.toString().padStart(2, '0')}`;
    console.log(`${prevStr} => ${instrStr} => ${currStr}`);
    return processDialInstructions(instructions.slice(1), computedPosition, zeroCount);
}

const instructions = readLines().slice(0, 10);
const zeroCount = processDialInstructions(instructions);
console.log(`Times dial was at position 0: ${zeroCount}`);
