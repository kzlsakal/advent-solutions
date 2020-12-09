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

const getMinMaxSum = (list) => {
  let [min, max] = [+Infinity, -Infinity];

  for (let num of list) {
    min = Math.min(min, num);
    max = Math.max(max, num);
  }
  return min + max;
};

// Part 2 solution
const solvePuzzle = (input) => {
  input = input.split('\n');
  input = input.map((n) => Number(n));

  const invalidNum = findInvalidNum(input);

  for (let i = 0; i < input.length - 1; i++) {
    const nums = [input[i]];
    let total = nums[0];

    for (let j = i + 1; j < input.length, total < invalidNum; j++) {
      nums.push(input[j]);
      total += input[j];

      if (total === invalidNum) {
        return getMinMaxSum(nums);
      }
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
