// Part 2
const solvePuzzle = (input) => {
  input = input.split("\n");
  return find(input, "O2") * find(input, "CO2");
};

const find = (input, measure, currIdx = 0) => {
  const mostFrequentBits = getMostFrequentBits(input);

  input = input.filter((str) =>
    measure === "O2" ? str[currIdx] === mostFrequentBits[currIdx] : str[currIdx] !== mostFrequentBits[currIdx]
  );

  return input.length <= 1 ? Number.parseInt(input[0], 2) : find(input, measure, currIdx + 1);
};

const getMostFrequentBits = (input) => {
  const frequencies = Array.from({ length: input[0].length }, () => [0, 0]);

  input.forEach((line) =>
    line.split("").forEach((bit, bitidx) => (frequencies[bitidx][bit] = frequencies[bitidx][bit] + 1))
  );

  return frequencies.map(([count0, count1]) => (count0 > count1 ? "0" : "1"));
};

require(__dirname + "/../../utils/test.js").test(__filename, __dirname, solvePuzzle);
