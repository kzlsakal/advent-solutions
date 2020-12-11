const isOccupied = (seats, row, col, rowDir, colDir, lookAhead) => {
  if (lookAhead) {
    while (seats[row + rowDir] && seats[row + rowDir][col + colDir] === '.') {
      row += rowDir;
      col += colDir;
    }
  }
  if (seats[row + rowDir] && seats[row + rowDir][col + colDir] === '#') {
    return true;
  }
  return false;
};

const countAdjacent = (seats, row, col, lookAhead) => {
  let count = 0;

  for (let rowDir = -1; rowDir <= 1; rowDir++) {
    for (let colDir = -1; colDir <= 1; colDir++) {
      // Do not check the seat itself
      if (!colDir && !rowDir) continue;
      if (isOccupied(seats, row, col, rowDir, colDir, lookAhead)) count += 1;
    }
  }

  return count;
};

const step = (seats, lookAhead, occThreshold) => {
  let madeChanges = false;
  const referenceSeats = seats.map((row) => [...row]);

  for (let row = 0; row < seats.length; row++) {
    for (let col = 0; col < seats[row].length; col++) {
      const adjacentSeats = countAdjacent(referenceSeats, row, col, lookAhead);

      if (referenceSeats[row][col] === 'L' && !adjacentSeats) {
        seats[row][col] = '#';
        madeChanges = true;
      }
      if (referenceSeats[row][col] === '#' && adjacentSeats >= occThreshold) {
        seats[row][col] = 'L';
        madeChanges = true;
      }
    }
  }
  if (!madeChanges) return seats;
};

const solve = (input, lookAhead, occThreshold) => {
  input = input.split('\n').map((row) => row.split(''));

  while (!step(input, lookAhead, occThreshold)) {
    step(input, lookAhead, occThreshold);
  }

  let occupiedSeats = 0;

  for (let row of input) {
    for (let seat of row) {
      if (seat === '#') {
        occupiedSeats += 1;
      }
    }
  }
  return occupiedSeats;
};

const solvePuzzlePart1 = (input) => solve(input, false, 4);
const solvePuzzle = (input) => solve(input, true, 5);

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
