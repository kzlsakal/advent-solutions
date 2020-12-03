const skiDown = (input, right = 3, down = 1) => {
  const length = input[0].length;

  let treeCount = 0;
  let currCol = right;

  for (let i = down; i < input.length; i += down) {
    if (input[i][currCol] === '#') {
      treeCount += 1;
    }
    currCol = (currCol + right) % length;
  }

  return treeCount;
};

const solvePuzzle = (input) => {
  input = input.split('\n');
  const slopes = [
    [1, 1],
    [3, 1],
    [5, 1],
    [7, 1],
    [1, 2],
  ];
  return slopes.reduce((acc, slope) => acc * skiDown(input, ...slope), 1);
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
