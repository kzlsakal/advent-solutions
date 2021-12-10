// Part 1
const solvePuzzle1 = (input) =>
  parseInput(input).reduce((acc, line) => {
    const [status, result] = closeChunks(line);
    return status === "illegal" ? acc + result : acc;
  }, 0);

// Part 2
const solvePuzzle2 = (input) => {
  const scores = [];

  parseInput(input).forEach((line) => {
    const [status, result] = closeChunks(line);
    if (status === "legit" && result.length) {
      let sum = 0;
      while (result.length) {
        const openingCharIdx = openingChars.indexOf(result[result.length - 1]);
        sum = sum * 5 + closingCharScores[openingCharIdx];
        result.pop();
      }
      scores.push(sum);
    }
  });

  return scores.sort((a, b) => a - b)[(scores.length - 1) / 2];
};

const openingChars = ["{", "[", "(", "<"];
const closingChars = ["}", "]", ")", ">"];
const illegalCharScores = [1197, 57, 3, 25137];
const closingCharScores = [3, 2, 1, 4];

const closeChunks = (line) => {
  const stack = [];

  for (const char of line) {
    const lastChar = stack[stack.length - 1];
    if (!lastChar || openingChars.includes(char)) {
      stack.push(char);
    } else {
      const closingCharIdx = closingChars.indexOf(char);
      if (lastChar === openingChars[closingCharIdx]) {
        stack.pop();
      } else {
        return ["illegal", illegalCharScores[closingCharIdx]];
      }
    }
  }

  return ["legit", stack];
};

const parseInput = (input) => input.split("\n").map((l) => l.split(""));

require(__dirname + "/../../utils/test.js").test(__filename, __dirname, solvePuzzle1);
require(__dirname + "/../../utils/test.js").test(__filename, __dirname, solvePuzzle2);
