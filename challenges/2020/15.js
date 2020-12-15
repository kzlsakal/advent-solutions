const solvePuzzle = (input, endTurn = 30000000) => {
  input = input.split(',').map((n, i) => [Number(n), i + 1]);
  const memo = new Map(input);

  let turn = input.length;
  let lastNum = Number(input[input.length - 1]);

  while (turn < endTurn) {
    const age = memo.get(lastNum);

    memo.set(lastNum, turn);

    lastNum = age ? turn - age : 0;

    turn += 1;
  }
  return lastNum;
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
