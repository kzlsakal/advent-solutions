const isTwoSum = (list, target, start, end) => {
  const remainders = {};

  for (let i = start; i <= end; i++) {
    if (remainders[list[i]]) {
      return true;
    }
    remainders[target - list[i]] = true;
  }
  return false;
};

// Part 1 solution
const findInvalidNum = (list) => {
  for (let i = 25; i < list.length; i++) {
    if (!isTwoSum(list, list[i], i - 25, i - 1)) {
      return list[i];
    }
  }
};

const getMinMaxSum = (list, start, end) => {
  let [min, max] = [+Infinity, -Infinity];

  for (let i = start; i <= end; i++) {
    min = Math.min(min, list[i]);
    max = Math.max(max, list[i]);
  }
  return min + max;
};

// Part 2 solution
const solvePuzzle = (input) => {
  input = input.split('\n');
  input = input.map((n) => Number(n));

  const invalidNum = findInvalidNum(input);

  let [i, j] = [0, 1];
  let total = input[i] + input[j];

  while (j < input.length) {
    if (total === invalidNum) {
      return getMinMaxSum(input, i, j);
    }
    if (total > invalidNum) {
      total -= input[i];
      i += 1;
    } else {
      j += 1;
      total += input[j];
    }
  }
};

test('Puzzle Result', (done) => {
  const fs = require('fs');
  const path = require('path');
  const currentDay = path.basename(__filename).split('.')[0];

  fs.readFile(`${__dirname}/inputs/${currentDay}.txt`, (err, input) => {
    if (err) {
      throw err;
    }
    const result = solvePuzzle(input.toString());
    console.log('\x1b[1m\x1b[31m%s\x1b[0m', 'Result:', result);
    done();
  });
  //expect(result).toEqual('test');
});
