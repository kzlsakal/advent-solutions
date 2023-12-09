// Part 1
const solvePuzzle1 = (input) => {
  const histories = parseSequences(input);
  return addValues(histories, extrapolateForwards);
};

// Part 2
const solvePuzzle2 = (input) => {
  const histories = parseSequences(input);
  return addValues(histories, extrapolateBackwards);
};

// Helpers

const addValues = (histories, extraPolate) => {
  let sum = 0;

  histories.forEach((history) => {
    const sequences = iterate(history);
    sum += extraPolate(sequences);
  });

  return sum;
};

const getLast = (arr) => arr[arr.length - 1];
const parseSequences = (input) => input.split('\n').map((l) => l.split(' ').map((n) => Number(n)));

const iterate = (history) => {
  const currentSequences = [history];

  while (getLast(currentSequences).some((n) => n !== 0)) {
    const newSeq = [];
    const lastSeq = getLast(currentSequences);

    lastSeq.forEach((n, idx) => {
      idx && newSeq.push(n - lastSeq[idx - 1]);
    });

    currentSequences.push(newSeq);
  }

  return currentSequences;
};

const extrapolateBackwards = (sequences) => {
  getLast(sequences).unshift(0);

  for (let i = sequences.length - 2; i >= 0; i--) {
    sequences[i].unshift(sequences[i][0] - sequences[i + 1][0]);
  }

  return sequences[0][0];
};

const extrapolateForwards = (sequences) => {
  getLast(sequences).push(0);

  for (let i = sequences.length - 2; i >= 0; i--) {
    sequences[i].push(getLast(sequences[i]) + getLast(sequences[i + 1]));
  }

  return getLast(sequences[0]);
};

require(__dirname + '/../../utils/test.js').test(__filename, __dirname, solvePuzzle1, '1');
require(__dirname + '/../../utils/test.js').test(__filename, __dirname, solvePuzzle2, '2');
