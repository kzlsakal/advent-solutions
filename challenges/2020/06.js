const solvePuzzle = (input) => {
  input = input.split('\n\n');

  let count = 0;

  input.forEach((group) => {
    const groupAnswers = new Set(group.replace(/\n/g, ''));

    group.split('\n').forEach((passenger) => {
      const individualAnswers = new Set(passenger);

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

  input.forEach((group) => (count += new Set(group.replace(/\n/g, '')).size));

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
