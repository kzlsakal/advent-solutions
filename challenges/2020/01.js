const twoSumProduct = (input, target, start = 0) => {
  const remainders = {};

  for (let i = start; i < input.length; i++) {
    const num = input[i];

    if (remainders[num]) {
      return remainders[num] * num;
    } else {
      remainders[target - num] = num;
    }
  }
};

const solvePuzzle = (input, target = 2020) => {
  input = input.split('\n');

  for (let i = 0; i < input.length; i++) {
    const num = input[i];
    const threeSumProduct = twoSumProduct(input, target - num, i + 1) * num;
    if (threeSumProduct) {
      return threeSumProduct;
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
