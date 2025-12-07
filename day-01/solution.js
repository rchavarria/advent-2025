import fs from 'fs';
import path from 'path';

export function readLines() {
    const filePath = path.join(path.dirname(new URL(import.meta.url).pathname), 'input.txt');
    return fs.readFileSync(filePath, 'utf8').split(/\r?\n/);
}

function computeDialPosition(instructions, start = 50) {
    let position = start;
    for (const instr of instructions) {
        const direction = instr[0];
        const value = parseInt(instr.slice(1), 10);
        if (direction === 'L') {
            position = (position - value + 100) % 100;
        } else if (direction === 'R') {
            position = (position + value) % 100;
        }
    }
    return position;
}

const instructions = readLines().slice(0, 10);
console.log(computeDialPosition(instructions));
