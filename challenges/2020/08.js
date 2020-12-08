const operate = (ops) => {
  const visited = new Set();
  let [i, acc] = [0, 0];

  while (!visited.has(i) && i < ops.length) {
    visited.add(i);
    const [cmd, amt] = ops[i].split(' ');

    if (cmd === 'nop') {
      i += 1;
    } else if (cmd === 'acc') {
      acc += Number(amt);
      i += 1;
    } else {
      i += Number(amt);
    }
  }

  return [i, acc];
};

const getTerminatedResult = (input, indexes, newOp) => {
  for (let i = 0; i < indexes.length; i++) {
    const oldValue = input[indexes[i]];
    input[indexes[i]] = newOp + input[indexes[i]].slice(3);
    const [lastIndex, acc] = operate(input);

    if (lastIndex >= input.length) {
      return acc;
    } else {
      input[indexes[i]] = oldValue;
    }
  }
};

const recordOps = (input) => {
  const [jumps, nops] = [[], []];

  for (let i = 0; i < input.length; i++) {
    const [cmd] = input[i].split(' ');
    if (cmd === 'nop') {
      nops.push(i);
    } else if (cmd === 'jmp') {
      jumps.push(i);
    }
  }

  return [jumps, nops];
};

const solvePuzzle = (input) => {
  input = input.split('\n');
  const [jumps, nops] = recordOps(input);

  const jumpResult = getTerminatedResult(input, jumps, 'nop');
  if (jumpResult) return jumpResult;

  const nopResult = getTerminatedResult(input, nops, 'jmp');
  if (nopResult) return nopResult;
};

const solvePuzzlePart1 = (input) => operate(input.split('\n'))[1];

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
