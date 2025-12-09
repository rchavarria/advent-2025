import fs from 'fs';
import path from 'path';

const JOLTAGE_DIGITS = 12;

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
  const digits = [];
  let index = 0;

  for (let remaining = JOLTAGE_DIGITS; remaining > 0; remaining--) {
    const subbank = bank.substring(index, bank.length - remaining + 1);
    const sorted = subbank.split('').sort((a, b) => b - a).join('');
    // console.log(`Bank: ${bank} => subbank: ${subbank} => sorted: ${sorted}`);
    const battery = findLargestBattery(subbank);
    digits.push(bank[index + battery]);
    index += battery + 1;
  }

  return Number(digits.join(''));
}

function assertTrue(bank, maxJoltage) {
  const result = largestJoltage(bank);
  console.assert(result === maxJoltage, `Expected max joltage for bank ${bank} is ${maxJoltage}, but got ${result}`);
}

assertTrue('987654321111111', 987654321111);
assertTrue('811111111111119', 811111111119);
assertTrue('234234234234278', 434234234278);
assertTrue('818181911112111', 888911112111);

const banks = readBanks();

// test some read banks from input.txt
assertTrue(banks[0], 666655555463);
assertTrue(banks[1], 986666555475);
assertTrue(banks[2], 777777776665);
assertTrue(banks[3], 666666423323);

// const maxJoltages = banks.map(largestJoltage);
// console.log('Max joltages for all banks:', maxJoltages);

// const sum = maxJoltages.reduce((acc, curr) => acc + curr, 0);
// console.log('Sum of all max joltages:', sum);
// console.assert(sum === 17613, `Expected sum of all max joltages is 17613, but got ${sum}`);
