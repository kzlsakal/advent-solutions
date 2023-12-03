// Part 1
const solvePuzzle1 = (input) => {
  const map = input.split('\n').map((line) => line.split(''));
  const alreadyCounted = [];
  const numbers = [];

  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[0].length; x++) {
      if (
        !alreadyCounted.includes(`${y},${x}`) &&
        getSurroundingCoordinates(y, x).some(([y, x]) => map[y]?.[x] && !/[\d.]/.test(map[y]?.[x]))
      ) {
        scanAndAdd(y, x, map, alreadyCounted, numbers);
      }
    }
  }

  return numbers.reduce((acc, num) => acc + Number(num), 0);
};

// Part 2
const solvePuzzle2 = (input) => {
  const map = input.split('\n').map((line) => line.split(''));
  let sum = 0;

  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[0].length; x++) {
      if (map[y][x] === '*') {
        const alreadyCounted = [];
        const numbers = [];

        getSurroundingCoordinates(y, x).forEach(([y, x]) => {
          scanAndAdd(y, x, map, alreadyCounted, numbers);
        });

        if (numbers.length === 2) {
          sum += numbers[0] * numbers[1];
        }
      }
    }
  }
  return sum;
};

const getSurroundingCoordinates = (y, x) => [
  [y - 1, x],
  [y - 1, x + 1],
  [y, x + 1],
  [y + 1, x + 1],
  [y + 1, x],
  [y + 1, x - 1],
  [y, x - 1],
  [y - 1, x - 1],
];

const scanAndAdd = (y, x, map, alreadyCounted, numbers) => {
  if (!alreadyCounted.includes(`${y},${x}`) && /\d/.test(map[y]?.[x])) {
    alreadyCounted.push(`${y},${x}`);

    let currentNumber = map[y][x];

    let xToLeft = x - 1;
    let isNumberOnLeft = /[\d]/.test(map[y][xToLeft]);

    while (isNumberOnLeft) {
      alreadyCounted.push(`${y},${xToLeft}`);
      currentNumber = map[y][xToLeft].concat(currentNumber);
      xToLeft -= 1;
      isNumberOnLeft = /[\d]/.test(map[y][xToLeft]);
    }

    let xToRight = x + 1;
    let isNumberOnRight = /[\d]/.test(map[y][xToRight]);

    while (isNumberOnRight) {
      alreadyCounted.push(`${y},${xToRight}`);
      currentNumber = currentNumber.concat(map[y][xToRight]);
      xToRight += 1;
      isNumberOnRight = /[\d]/.test(map[y][xToRight]);
    }

    numbers.push(Number(currentNumber));
  }
};

require(__dirname + '/../../utils/test.js').test(__filename, __dirname, solvePuzzle1, '1');
require(__dirname + '/../../utils/test.js').test(__filename, __dirname, solvePuzzle2, '2');
