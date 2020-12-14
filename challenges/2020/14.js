const getMask = (cmd) => {
  return cmd.split(' = ')[1];
};

const getKeyVal = (cmd) => {
  const [key, val] = cmd.split(' = ');
  return [key.slice(4, -1), val];
};

const unmaskBits = (cmd, mask, maskIdx, skippedChar) => {
  const keyVal = getKeyVal(cmd);
  keyVal[maskIdx] = Number(keyVal[maskIdx])
    .toString(2)
    .padStart(36, '0')
    .split('');

  for (let i = mask.length - 1; i >= 0; i--) {
    if (mask[i] !== skippedChar) {
      keyVal[maskIdx][i] = mask[i];
    }
  }
  return keyVal;
};

const getFloating = (key) => {
  let nums = [key];
  let xCount = key.match(/X/g).length;

  while (xCount) {
    const currentNums = [];
    const xIdx = nums[0].indexOf('X');

    for (let num of nums) {
      const lower = num.slice(0, xIdx).concat('0', num.slice(xIdx + 1));
      const upper = num.slice(0, xIdx).concat('1', num.slice(xIdx + 1));
      currentNums.push(lower, upper);
    }
    xCount -= 1;
    nums = currentNums;
  }
  return nums;
};

const solvePuzzlePart1 = (input) => {
  input = input.split('\n');
  const mem = {};
  let currentMask;

  for (const cmd of input) {
    if (cmd[1] === 'a') {
      currentMask = getMask(cmd);
    } else {
      const [key, val] = unmaskBits(cmd, currentMask, 1, 'X');
      mem[key] = Number.parseInt(val.join(''), 2);
    }
  }
  return Object.values(mem).reduce((acc, val) => acc + val, 0);
};

const solvePuzzle = (input) => {
  input = input.split('\n');
  const mem = {};
  let currentMask;

  for (const cmd of input) {
    if (cmd[1] === 'a') {
      currentMask = getMask(cmd);
    } else {
      const [key, val] = unmaskBits(cmd, currentMask, 0, '0');
      const keys = getFloating(key.join(''));

      keys.forEach((key) => (mem[key] = Number(val)));
    }
  }
  return Object.values(mem).reduce((acc, val) => acc + val, 0);
};

// eslint-disable-next-line no-undef
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
});
