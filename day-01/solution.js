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

function processDialInstructions(instructions, initialPosition = 50, index = 0, position = initialPosition, zeroCount = 0) {
    if (index >= instructions.length) {
        return zeroCount;
    }
    const prevPosition = position;
    position = computeDialPosition(instructions[index], position);
    if (position === 0) zeroCount++;
    const prevStr = `D${prevPosition.toString().padStart(2, '0')}`;
    const instrStr = instructions[index].padEnd(3, ' ');
    const currStr = `D${position.toString().padStart(2, '0')}`;
    console.log(`${prevStr} => ${instrStr} => ${currStr}`);
    return processDialInstructions(instructions, initialPosition, index + 1, position, zeroCount);
}

const instructions = readLines().slice(0, 10);
const zeroCount = processDialInstructions(instructions);
console.log(`Times dial was at position 0: ${zeroCount}`);
