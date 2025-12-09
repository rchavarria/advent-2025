import fs from 'fs';
import path from 'path';

function readBanks() {
  const filePath = path.join(path.dirname(new URL(import.meta.url).pathname), 'input.txt');
  return fs
    .readFileSync(filePath, 'utf8')
    .split('\r\n')
}

function largestJoltage(bank) {
  // Step 1: Find the largest digit and its position
  let max1 = -1, pos1 = -1;
  for (let i = 0; i < bank.length - 1; i++) {
    const digit = Number(bank[i]);
    if (digit > max1) {
      max1 = digit;
      pos1 = i;
    }
  }
  // Step 2: Find the largest digit after the previous position
  let max2 = -1;
  for (let i = pos1 + 1; i < bank.length; i++) {
    const digit = Number(bank[i]);
    if (digit > max2) {
      max2 = digit;
    }
  }
  // Step 3: Concatenate both digits
  return max2 === -1 ? max1 * 10 + max1 : max1 * 10 + max2;
}

function assertTrue(bank, maxJoltage) {
  const result = largestJoltage(bank);
  console.assert(result === maxJoltage, `Expected max joltage for bank ${bank} is ${maxJoltage}, but got ${result}`);
}

assertTrue('987654321111111', 98);
assertTrue('811111111111119', 89);
assertTrue('234234234234278', 78);
assertTrue('818181911112111', 92);
