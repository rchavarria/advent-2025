import fs from 'fs';
import path from 'path';

function readBanks() {
  const filePath = path.join(path.dirname(new URL(import.meta.url).pathname), 'input.txt');
  return fs
    .readFileSync(filePath, 'utf8')
    .split('\r\n')
}

function findLargestBattery(subbank) {
  let max = -1, pos = -1;

  for (let i = 0; i < subbank.length; i++) {
    const digit = Number(subbank[i]);
    if (digit > max) {
      max = digit;
      pos = i;
    }
  }

  return pos;
}

function largestJoltage(bank) {
  const first = findLargestBattery(bank.substring(0, bank.length - 1));
  const second = findLargestBattery(bank.substring(first + 1));
  const max1 = Number(bank[first]);
  const max2 = Number(bank[first + 1 + second]);

  return Number(`${max1}${max2}`);
}

function assertTrue(bank, maxJoltage) {
  const result = largestJoltage(bank);
  console.assert(result === maxJoltage, `Expected max joltage for bank ${bank} is ${maxJoltage}, but got ${result}`);
}

assertTrue('987654321111111', 98);
assertTrue('811111111111119', 89);
assertTrue('234234234234278', 78);
assertTrue('818181911112111', 92);

// edge case: the first largest battery happens twice
assertTrue('1181118119', 89);
assertTrue('1181118117', 88);

const banks = readBanks();

// test some read banks from input.txt
assertTrue(banks[0], 66);
assertTrue(banks[1], 98);
assertTrue(banks[2], 77);
assertTrue(banks[3], 66);

const maxJoltages = banks.map(largestJoltage);
console.log('Max joltages for all banks:', maxJoltages);
