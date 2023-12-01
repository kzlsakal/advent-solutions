// Part 1
const solvePuzzle1 = (input) => {
  let sum = 0;

  input.split('\n').forEach((line) => {
    let numbers = [null, null];

    // Find the first number
    for (let i = 0; i < line.length; i++) {
      if (!isNaN(Number(line[i]))) {
        numbers[0] = line[i];
        break;
      }
    }

    // Find the last number
    for (let i = line.length - 1; i >= 0; i--) {
      if (!isNaN(Number(line[i]))) {
        numbers[1] = line[i];
        break;
      }
    }

    sum += Number(numbers.join(''));
  });

  return sum;
};

// Part 2
const solvePuzzle2 = (input) => {
  let sum = 0;

  const numberStrings = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
  const numberPatterns = [/one/g, /two/g, /three/g, /four/g, /five/g, /six/g, /seven/g, /eight/g, /nine/g];

  input.split('\n').forEach((line) => {
    // Find `String` numbers
    const stringNumbers = [null, null];
    const stringNumberIndexes = [line.length - 1, 0];

    // Match each number pattern individually because if we have a `twone`
    // the `one` will not match after `two` is already matched
    numberPatterns.forEach((pattern) => {
      [...line.matchAll(pattern)].forEach((match) => {
        match.lastIndex = match.index + match[0].length;

        if (match.index < stringNumberIndexes[0]) {
          stringNumberIndexes[0] = match.index;
          stringNumbers[0] = numberStrings.indexOf(match[0]).toString();
        }

        if (match.lastIndex > stringNumberIndexes[1]) {
          stringNumberIndexes[1] = match.lastIndex;
          stringNumbers[1] = numberStrings.indexOf(match[0]).toString();
        }
      });
    });

    // Find `Number` numbers
    let numbers = [null, null];
    let numberIndexes = [line.length - 1, 0];

    // Find the first `Number` number and its index
    for (let i = 0; i < line.length; i++) {
      if (!isNaN(Number(line[i]))) {
        numbers[0] = line[i];
        numberIndexes[0] = i;
        break;
      }
    }

    // Find the last `Number` number and its index
    for (let i = line.length - 1; i >= 0; i--) {
      if (!isNaN(Number(line[i]))) {
        numbers[1] = line[i];
        numberIndexes[1] = i;
        break;
      }
    }

    // Choose the first number from `String` or `Number` number, whichever comes first
    if (stringNumberIndexes[0] < numberIndexes[0]) {
      numbers[0] = stringNumbers[0];
    }

    // Choose the last number from `String` or `Number` number, whichever comes last
    if (stringNumberIndexes[1] > numberIndexes[1]) {
      numbers[1] = stringNumbers[1];
    }

    sum += Number(numbers.join(''));
  });

  return sum;
};

require(__dirname + '/../../utils/test.js').test(__filename, __dirname, solvePuzzle1, '1');
require(__dirname + '/../../utils/test.js').test(__filename, __dirname, solvePuzzle2, '2');
