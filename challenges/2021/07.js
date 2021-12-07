// Part 1
const solvePuzzle1 = (input) => getMinFuel(input, Math.abs);

// Part 2
const calculateDistance2 = (diff, d = Math.abs(diff)) => (d * (d + 1)) / 2;
const solvePuzzle2 = (input) => getMinFuel(input, calculateDistance2);

const getMinFuel = (input, calculateDistance) => {
  const nums = parseInput(input).sort((a, b) => a - b);
  let minSum = Infinity;

  for (let i = nums[nums.length - 1]; i >= nums[0]; i--) {
    let currSum = 0;

    for (let j = 0; j < nums.length; j++) {
      currSum += calculateDistance(nums[j] - i);
      if (currSum > minSum) break;
    }

    minSum = Math.min(minSum, currSum);
  }

  return minSum;
};

const parseInput = (input) => input.split(",").map((n) => Number(n));

require(__dirname + "/../../utils/test.js").test(__filename, __dirname, solvePuzzle1);
require(__dirname + "/../../utils/test.js").test(__filename, __dirname, solvePuzzle2);
