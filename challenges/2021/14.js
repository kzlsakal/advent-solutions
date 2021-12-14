// Part 1
const solvePuzzle1 = (input) => breedElements(input, 10);

// Part 2
const solvePuzzle2 = (input) => breedElements(input, 40);

const breedElements = (input, steps) => {
  input = parseInput(input);
  const [template, ...pairs] = input;
  const polymerTemplate = template.split("");

  const pairMap = new Map(pairs.map((l) => l.split(" -> ")));
  const pairCounts = new Map();

  const frequencies = {};
  polymerTemplate.forEach((x) => (frequencies[x] = (frequencies[x] || 0) + 1));

  for (let j = 0; j < polymerTemplate.length - 1; j++) {
    const pair = polymerTemplate[j] + polymerTemplate[j + 1];
    pairCounts.set(pair, (pairCounts.get(pair) || 0) + 1);
  }

  for (let i = 0; i < steps; i++) {
    const copyOfPairCounts = new Map(pairCounts);
    for (let [pair, count] of copyOfPairCounts) {
      const midChar = pairMap.get(pair);
      const [leftPair, rightPair] = [pair[0] + midChar, midChar + pair[1]];

      frequencies[midChar] = (frequencies[midChar] || 0) + count;

      pairCounts.set(pair, pairCounts.get(pair) - count);
      pairCounts.set(leftPair, (pairCounts.get(leftPair) || 0) + count);
      pairCounts.set(rightPair, (pairCounts.get(rightPair) || 0) + count);
    }
  }

  const sortedFrequencies = Array.from(Object.entries(frequencies)).sort(([_, a], [__, b]) => a - b);
  return sortedFrequencies[sortedFrequencies.length - 1][1] - sortedFrequencies[0][1];
};

const parseInput = (input) => input.split("\n").filter((x) => x !== "");

require(__dirname + "/../../utils/test.js").test(__filename, __dirname, solvePuzzle1);
require(__dirname + "/../../utils/test.js").test(__filename, __dirname, solvePuzzle2);
