import fs from 'fs';
import path from 'path';

function readBanks() {
  const filePath = path.join(path.dirname(new URL(import.meta.url).pathname), 'input.txt');
  return fs
    .readFileSync(filePath, 'utf8')
    .split('\r\n')
}

function largestJoltage(bank) {
  // Convert the string into an array of digits
  const digits = bank.split('').map(Number);
  // Sort in descending order
  digits.sort((a, b) => b - a);
  // Take the two largest digits and combine them
  return digits[0] * 10 + digits[1];
}

function assertTrue(bank, maxJoltage) {
  const result = largestJoltage(bank);
  console.assert(result === maxJoltage, `Expected max joltage for bank ${bank} is ${maxJoltage}, but got ${result}`);
}

assertTrue('987654321111111', 98);
assertTrue('811111111111119', 89);
assertTrue('234234234234278', 78);
assertTrue('818181911112111', 92);
