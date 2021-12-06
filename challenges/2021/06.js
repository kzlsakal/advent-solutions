// Part 1
const solvePuzzle1 = (input) => {
  const fish = parseInput(input);
  return breed(fish, 80);
};

// Part 2
const solvePuzzle2 = (input) => {
  const fish = parseInput(input);
  return breed(fish, 256);
};

const breed = (fish, days) => {
  let state = Array(9).fill(0);

  fish.forEach((f) => state[f - 1]++);

  for (let i = 0; i < days - 1; i++) {
    const newState = state.slice(1).concat(state[0]);
    newState[6] += state[0];
    state = newState;
  }

  return state.reduce((a, b) => a + b, 0);
};

const parseInput = (input) => input.split(",").map((n) => Number(n));

require(__dirname + "/../../utils/test.js").test(__filename, __dirname, solvePuzzle1);
require(__dirname + "/../../utils/test.js").test(__filename, __dirname, solvePuzzle2);
