const searchRegion = (ticket, ticketBegin, ticketStop, regionN, upMove) => {
  let start = 0;
  let end = regionN - 1;
  let mid = Math.floor((start + end) / 2);

  for (let i = ticketBegin; i <= ticketStop; i++) {
    if (ticket[i] === upMove) {
      start = mid + 1;
    } else {
      end = mid;
    }
    mid = Math.floor((start + end) / 2);
  }
  return mid;
};

const getSeatNumber = (ticket) => {
  const row = searchRegion(ticket, 0, 6, 128, 'B');
  const col = searchRegion(ticket, 7, 9, 8, 'R');
  return row * 8 + col;
};

const solvePuzzle = (input) => {
  input = input.split('\n');

  const seats = new Set();
  let [min, max] = [+Infinity, -Infinity];

  input.forEach((s) => {
    const seatNo = getSeatNumber(s);
    [min, max] = [Math.min(min, seatNo), Math.max(max, seatNo)];
    seats.add(seatNo);
  });

  for (let i = min; i <= max; i++) {
    if (!seats.has(i)) {
      return i;
    }
  }
  return 'It turns out you do not have a seat. Please call customer service.';
};

const solvePuzzlePart1 = (input) => {
  input = input.split('\n');
  return input.reduce((acc, t) => Math.max(getSeatNumber(t), acc), 0);
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
