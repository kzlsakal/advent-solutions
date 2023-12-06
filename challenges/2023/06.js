// Part 1
const solvePuzzle1 = (input) => {
  const [times, distances] = input.split('\n').map((line) => {
    return line
      .split(':')[1]
      .split(/\s+/)
      .filter((num) => !!num[0])
      .map(Number);
  });

  let winning = 1;

  for (let i = 0; i < times.length; i++) {
    const time = times[i];
    const distanceRecord = distances[i];
    let currentWinning = 0;

    for (let m = time - 1; m >= 0; m--) {
      if ((time - m) * m > distanceRecord) {
        currentWinning++;
      }
    }

    currentWinning && (winning *= currentWinning);
  }

  return winning;
};

// Part 2
const solvePuzzle2 = (input) => {
  const [time, distanceRecord] = input.split('\n').map((line) => {
    return Number(line.split(':')[1].split(/\s+/).join(''));
  });

  let winning = 0;

  for (let m = time - 1; m >= 0; m--) {
    if ((time - m) * m > distanceRecord) {
      winning++;
    }
  }

  return winning;
};

require(__dirname + '/../../utils/test.js').test(__filename, __dirname, solvePuzzle1, '1');
require(__dirname + '/../../utils/test.js').test(__filename, __dirname, solvePuzzle2, '2');
