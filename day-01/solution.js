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

const instructions = readLines().slice(0, 10);
let position = 50;
for (const instr of instructions) {
    position = computeDialPosition(instr, position);
    console.log(position);
}
