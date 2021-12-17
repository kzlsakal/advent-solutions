// Part 1
const solvePuzzle1 = (input) => {
  const [[minX, maxX], [minY, maxY]] = parseInput(input);

  for (let x = 1; x <= maxX; x++) {
    for (let y = -minY; y >= minY; y--) {
      const foundHighestY = shoot(x, y, minX, maxX, minY, maxY);
      if (foundHighestY) return foundHighestY;
    }
  }

  return input;
};

// Part 2
const solvePuzzle2 = (input) => {
  const [[minX, maxX], [minY, maxY]] = parseInput(input);

  let workedVelocityCount = 0;

  for (let x = 1; x <= maxX; x++) {
    for (let y = -minY; y >= minY; y--) {
      workedVelocityCount += shoot(x, y, minX, maxX, minY, maxY) !== null ? 1 : 0;
    }
  }

  return workedVelocityCount;
};

const shoot = (velX, velY, minX, maxX, minY, maxY) => {
  let [x, y] = [0, 0];
  let maxSeenY = 0;

  while (x <= maxX && y >= minY) {
    maxSeenY = Math.max(y, maxSeenY);

    if (x >= minX && y <= maxY) return maxSeenY;

    x += velX;
    y += velY;

    let velXChange = 0;

    if (velX > 0) {
      velXChange = -1;
    } else if (velX < 0) {
      velXChange = 1;
    }

    velX += velXChange;
    velY -= 1;
  }

  return null;
};

const parseInput = (input) =>
  input
    .replace("target area: ", "")
    .split(", ")
    .map((l) =>
      l
        .slice(2)
        .split("..")
        .map((n) => Number(n))
    );

require(__dirname + "/../../utils/test.js").test(__filename, __dirname, solvePuzzle1);
require(__dirname + "/../../utils/test.js").test(__filename, __dirname, solvePuzzle2);
