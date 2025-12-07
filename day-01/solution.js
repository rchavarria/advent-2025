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

function processDialInstructions(instructions, initialPosition = 50) {
    let position = initialPosition;
    let zeroCount = 0;
    for (const instr of instructions) {
        const prevPosition = position;
        position = computeDialPosition(instr, position);
        if (position === 0) zeroCount++;
        const prevStr = `D${prevPosition.toString().padStart(2, '0')}`;
        const instrStr = instr.padEnd(3, ' ');
        const currStr = `D${position.toString().padStart(2, '0')}`;
        console.log(`${prevStr} => ${instrStr} => ${currStr}`);
    }
    console.log(`Computed position is 0: ${zeroCount} times`);
}

const instructions = readLines().slice(0, 10);
processDialInstructions(instructions);
