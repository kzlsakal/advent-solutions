// Part 1
const solvePuzzle1 = (input) => {
  const lines = input.split('\n\n').map((line) => {
    return line
      .split(/:\s/)[1]
      .split('\n')
      .map((nums) => nums.split(' ').map(Number));
  });

  const seeds = lines[0][0];

  let currNum;
  let lowest = Infinity;

  for (let i = 0; i < seeds.length; i++) {
    currNum = seeds[i];
    let j = 1;
    for (; j < lines.length; j++) {
      for (let k = 0; k < lines[j].length; k++) {
        const [target, source, length] = lines[j][k];
        if (currNum - source >= 0 && source + length >= currNum) {
          currNum = currNum - source + target;
          break;
        }
      }
    }
    if (j < lines.length) {
      currNum = seeds[i];
    }
    lowest = Math.min(lowest, currNum);
  }

  return lowest;
};

// Part 2 - todo
const solvePuzzle2 = (input) => {};

require(__dirname + '/../../utils/test.js').test(__filename, __dirname, solvePuzzle1, '1');
// require(__dirname + '/../../utils/test.js').test(__filename, __dirname, solvePuzzle2, '2');
