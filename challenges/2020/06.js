const makeAlphabet = () => new Set('abcdefghijklmnopqrstuvwxyz');

const solvePuzzle = (input) => {
  input = input.split('\n\n');
  input = input.map((group) => group.split('\n'));

  let count = 0;

  input.forEach((group) => {
    const groupAnswers = makeAlphabet();

    group.forEach((questions) => {
      const individualAnswers = new Set();

      for (let answer of questions) {
        individualAnswers.add(answer);
      }

      for (let answer of groupAnswers) {
        if (!individualAnswers.has(answer)) {
          groupAnswers.delete(answer);
        }
      }
    });

    count += groupAnswers.size;
  });

  return count;
};

const solvePuzzlePart1 = (input) => {
  input = input.split('\n\n');

  let count = 0;

  input = input.forEach(
    (grp) =>
      (count += new Set(grp.split('\n').reduce((acc, l) => (acc += l))).size)
  );

  return count;
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
});
