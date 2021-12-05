// Part 1
const solvePuzzle1 = (input) => {
  const [lines, diagram] = parseInput(input);
  return findOverlaps(lines.filter(isHorizontalOrVertical), diagram).size;
};

// Part 2
const solvePuzzle2 = (input) => {
  const [lines, diagram] = parseInput(input);
  return findOverlaps(lines, diagram).size;
};

const parseInput = (input) => {
  let [maxX, maxY] = [0, 0];

  input = input.split("\n").map((line) =>
    line.split(" -> ").map((xy) =>
      xy.split(",").map((n, idx) => {
        n = Number(n);
        if (idx > 0) {
          maxY = Math.max(maxY, n);
        } else {
          maxX = Math.max(maxX, n);
        }
        return n;
      })
    )
  );

  const diagram = Array.from({ length: maxY + 1 }, () => new Array(maxX + 1).fill(0));

  return [input, diagram];
};

const findOverlaps = (lines, diagram) => {
  let overlaps = new Set();
  lines.forEach((line) => {
    const [[x1, y1], [x2, y2]] = line;

    const minX = Math.min(x1, x2);
    const maxX = Math.max(x1, x2);
    const minY = Math.min(y1, y2);
    const maxY = Math.max(y1, y2);
    const increasingX = minX < maxX;
    const decreasingY = isGoingNE(line);
    const increasingY = !decreasingY && minY < maxY;
    let x = minX;
    let y = decreasingY ? maxY : minY;

    while (x <= maxX && y <= maxY && y >= minY) {
      diagram[y][x]++;
      diagram[y][x] > 1 && overlaps.add(`${y},${x}`);
      increasingX && x++;
      increasingY && y++;
      decreasingY && y--;
    }
  });
  return overlaps;
};

const isHorizontal = ([[_, y1], [__, y2]]) => y1 === y2;
const isVertical = ([[x1, _], [x2, __]]) => x1 === x2;
const isHorizontalOrVertical = (line) => isHorizontal(line) || isVertical(line);
const isDiagonal = (line) => !isHorizontalOrVertical(line);
const isGoingNE = (line) => {
  const [[x1, y1], [x2, y2]] = line;
  return (isDiagonal(line) && x1 < x2 && y1 > y2) || (y1 < y2 && x1 > x2);
};

require(__dirname + "/../../utils/test.js").test(__filename, __dirname, solvePuzzle1);
require(__dirname + "/../../utils/test.js").test(__filename, __dirname, solvePuzzle2);
