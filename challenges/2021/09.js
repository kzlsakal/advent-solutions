// Part 1
const solvePuzzle1 = (input) => {
  input = parseInput(input);
  const lowPoints = [];
  input.forEach((row, y) =>
    row.forEach((num, x) => {
      if (isLowPoint(y, x, input)) lowPoints.push(num);
    })
  );
  return lowPoints.reduce((acc, val) => acc + val + 1, 0);
};

// Part 2
const solvePuzzle2 = (input) => {
  input = parseInput(input);
  const basinSizes = [];
  input.forEach((row, y) =>
    row.forEach((_, x) => {
      const basin = findBasin(y, x, input);
      if (basin.length) basinSizes.push(basin.length);
    })
  );
  return basinSizes
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((acc, val) => acc * val);
};

// Utils
const findBasin = (y, x, arr, basin = []) => {
  if (arr[y] === undefined || arr[y][x] === undefined) return basin;
  const num = arr[y][x];
  if (num === 9) return basin;
  basin.push(num);
  arr[y][x] = 9;
  findBasin(y - 1, x, arr, basin);
  findBasin(y + 1, x, arr, basin);
  findBasin(y, x + 1, arr, basin);
  findBasin(y, x - 1, arr, basin);
  return basin;
};

const isLowPoint = (y, x, arr) => {
  const num = arr[y][x];

  const left = arr[y][x - 1];
  if (left !== undefined && left <= num) return false;

  const right = arr[y][x + 1];
  if (right !== undefined && right <= num) return false;

  if (arr[y - 1]) {
    const up = arr[y - 1][x];
    if (up !== undefined && up <= num) return false;
  }

  if (arr[y + 1]) {
    const down = arr[y + 1][x];
    if (down !== undefined && down <= num) return false;
  }

  return true;
};

const parseInput = (input) => input.split("\n").map((l) => l.split("").map((n) => Number(n)));

require(__dirname + "/../../utils/test.js").test(__filename, __dirname, solvePuzzle1);
require(__dirname + "/../../utils/test.js").test(__filename, __dirname, solvePuzzle2);
