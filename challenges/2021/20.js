// Part 1
const solvePuzzle1 = (input) => enhanceFor(input, 2);

// Part 3
const solvePuzzle2 = (input) => enhanceFor(input, 50);

const enhanceFor = (input, times) => {
  let [enhancer, image] = parseInput(input);
  enhancer = enhancer.split("").map((c) => (c === "#" ? 1 : 0));

  let enhancedImage = image
    .split("\n")
    .map((line) => line.split(""))
    .map((line) => line.map((c) => (c === "#" ? 1 : 0)));

  for (let i = 0; i < times; i++) {
    enhancedImage = enhance(enhancedImage, enhancer, i);
  }

  return enhancedImage.flat().reduce((a, b) => a + b, 0);
};

const enhance = (image, enhancer, step) => {
  const enhancedImage = getExtendedCopy(image, step, enhancer);
  const readOnlyImage = getCopy(enhancedImage);

  for (let y = 0; y < enhancedImage.length; y++) {
    for (let x = 0; x < enhancedImage[0].length; x++) {
      const idxBinary = getSurroundingSum(y, x, readOnlyImage, step, enhancer);
      const idx = Number.parseInt(idxBinary, 2);
      enhancedImage[y][x] = enhancer[idx];
    }
  }
  return enhancedImage;
};

const getCopy = (image) => image.map((l) => [...l]);

const getExtendedCopy = (image, step, enhancer) => {
  const voidValue = getVoidValue(step, enhancer);
  const extendedImage = image.map((line) => [voidValue].concat(...line.concat(voidValue)));
  const length = extendedImage[0].length;
  return [Array(length).fill(voidValue)].concat(extendedImage, [Array(length).fill(voidValue)]);
};

const getSurroundingSum = (y, x, array, step, enhancer) => {
  let sum = "";
  const voidValue = getVoidValue(step, enhancer);
  for (let h = y - 1; h <= y + 1; h++) {
    for (let w = x - 1; w <= x + 1; w++) {
      sum += array[h] ? (array[h][w] !== undefined ? array[h][w] : voidValue) : voidValue;
    }
  }
  return sum;
};

const getVoidValue = (step, enhancer) => (enhancer[0] ? step % 2 : 0);

const parseInput = (input) => input.split("\n\n");

require(__dirname + "/../../utils/test.js").test(__filename, __dirname, solvePuzzle1);
require(__dirname + "/../../utils/test.js").test(__filename, __dirname, solvePuzzle2);
