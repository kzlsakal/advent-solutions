// Part 1
const solvePuzzle1 = (input) => {
  const lines = input.split('\n').filter((l) => !!l[0]);
  const [instructions] = lines;

  const nodes = {};
  addNodes(nodes, lines.slice(1));

  const [steps] = findSteps(['AAA'], instructions, nodes, (place) => place !== 'ZZZ');
  return steps;
};

// Part 2
const solvePuzzle2 = (input) => {
  const lines = input.split('\n').filter((l) => !!l[0]);
  const [instructions] = lines;

  const nodes = {};
  addNodes(nodes, lines.slice(1));

  const startingPlaces = Object.keys(nodes).filter((place) => place[2] === 'A');
  const endingSteps = findSteps(startingPlaces, instructions, nodes, (place) => place[2] !== 'Z');
  return lcmOfArray(endingSteps);
};

const addNodes = (nodes, mapping) => {
  mapping.forEach((line) => {
    const [place, leftRight] = line.split(' = ');
    nodes[place] = leftRight.replaceAll(/[^A-Z0-9,]/g, '').split(',');
  });
};

const findSteps = (startingPlaces, instructions, nodes, assertion) => {
  const endingSteps = [];

  startingPlaces.forEach((place) => {
    let currentPlace = place;
    let currentInstructionsStep = 0;
    let steps = 0;

    while (assertion(currentPlace)) {
      const currentDirection = instructions[currentInstructionsStep];
      currentPlace = nodes[currentPlace][currentDirection === 'L' ? 0 : 1];
      steps += 1;
      currentInstructionsStep += 1;

      if (currentInstructionsStep === instructions.length) {
        currentInstructionsStep = 0;
      }
    }

    endingSteps.push(steps);
  });

  return endingSteps;
};

const gcd = (a, b) => {
  while (b !== 0) {
    const prev = b;
    b = a % b;
    a = prev;
  }

  return a;
};

const lcmOfArray = (numbers) => {
  let result = numbers[0];

  for (let i = 1; i < numbers.length; i++) {
    const currentNumber = numbers[i];
    const currentGcd = gcd(result, currentNumber);

    result = (result * currentNumber) / currentGcd;
  }

  return result;
};

require(__dirname + '/../../utils/test.js').test(__filename, __dirname, solvePuzzle1, '1');
require(__dirname + '/../../utils/test.js').test(__filename, __dirname, solvePuzzle2, '2');
