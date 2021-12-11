// Part 1
const solvePuzzle1 = (input) => {
  input = parseInput(input);
  let flashed = 0;

  for (let i = 0; i < 100; i++) {
    const flashedCoords = new Set();
    for (let y = 0; y < input.length; y++) {
      for (let x = 0; x < input[0].length; x++) {
        flashed += increment(y, x, input, flashedCoords);
      }
    }
  }

  return flashed;
};

// Part 2
const solvePuzzle2 = (input) => {
  input = parseInput(input);
  const [width, height] = [input.length, input[0].length];
  const boardSize = width * height;
  let [step, flashedCoords] = [0, new Set()];

  while (flashedCoords.size < boardSize) {
    flashedCoords = new Set();
    step += 1;
    for (let y = 0; y < width; y++) {
      for (let x = 0; x < height; x++) {
        increment(y, x, input, flashedCoords);
      }
    }
  }

  return step;
};

const increment = (y, x, board, flashedCoords) => {
  let flashed = 0;
  if (board[y] === undefined || board[y][x] === undefined || flashedCoords.has(`${y},${x}`)) return flashed;

  if (board[y][x] >= 0 && board[y][x] < 9) {
    board[y][x]++;
  } else {
    flashedCoords.add(`${y},${x}`);
    flashed = 1;
    board[y][x] = 0;
    forEachSurrounding(y, x, (h, w) => (flashed += increment(h, w, board, flashedCoords)));
  }
  return flashed;
};

const parseInput = (input) => input.split("\n").map((l) => l.split("").map((x) => Number(x)));
const forEachSurrounding = (y, x, callback) => {
  for (let h = y - 1; h <= y + 1; h++) {
    for (let w = x - 1; w <= x + 1; w++) {
      if (h !== y || w !== x) callback(h, w);
    }
  }
};

require(__dirname + "/../../utils/test.js").test(__filename, __dirname, solvePuzzle1);
require(__dirname + "/../../utils/test.js").test(__filename, __dirname, solvePuzzle2);
